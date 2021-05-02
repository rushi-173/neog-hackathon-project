import "./Chatroom.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { GrEmoji } from "react-icons/gr";
import { useRoom } from "../../contexts/roomContext";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";
import socketIOClient from "socket.io-client";
import { Chats } from "./Chats";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChatroomMembers } from "./ChatroomMembers";
import { InactiveChats } from "./InactiveChats";

const ENDPOINT = "https://neog-hackathon-project.rushi173.repl.co/";

function getCurrenRoom(id, rooms) {
  return rooms && rooms.find((room) => room._id === id);
}

function isStageMemberOfRoom(user, room) {
  if (room) {
    let temp = room.users.find((item) => item._id === user._id);
    console.log("from temp", temp);
    return temp && temp.status === "stageMember";
  }
}

export function ChatRoom() {
  const { chatid } = useParams();
  const [showEmoji, setShowEmoji] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showModal, setShowModal] = useState("flex");
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  // const [currentRoom, setCurrentRoom] = useState();
  // const [currentRoom, setCurrentRoom] = useState(getCurrenRoom(chatid, rooms));

  let currentRoom = getCurrenRoom(chatid, rooms);
  const socket = socketIOClient(ENDPOINT);

  console.log("rooms", currentRoom, chatid);
  useEffect(() => {
    currentRoom = getCurrenRoom(chatid, rooms);
  }, [rooms]);

  // useEffect(() => {
  //   return () => {
  //     socket.emit("exitRoom", {
  //       user: auth.user,
  //       room: currentRoom
  //     });
  //   };
  // }, []);
  // console.log(rooms);
  // console.log(new Date(`${currentRoom.startTime}`) < new Date(Date.now()));
  function alreadyIn() {
    const check = currentRoom.users.filter(
      (item) => item._id === auth.user._id
    );
    return check.length;
  }

  function joinRoom() {
    if (alreadyIn()) socket.on("connection");
    socket.emit("joinRoom", {
      user: auth.user,
      room: currentRoom
    });
  }

  async function exitRoom() {
    if (currentRoom.owner._id === auth.user._id) {
      //axios call to change room vsibility
    }
    console.log("exiting the user");
    // socket.emit("exitRoom", { user: auth.user, room: currentRoom });
    console.log("current room ka id", currentRoom._id);
    try {
      await axios.patch(
        `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/exituser/${currentRoom._id}`,
        {
          userId: auth.user._id
        },
        {
          headers: {
            "auth-token": auth.token
          }
        }
      );
    } catch (err) {
      console.log("error in exit");
    }
  }
  // useEffect(() => {
  socket.on("message", (data) => {
    console.log("from message", data);
    setRooms((prev) => {
      return prev.map((room) => {
        if (room._id === currentRoom._id) {
          return data;
        } else {
          return room;
        }
      });
    });
  });

  console.log("user", currentRoom);

  socket.on("updateUsersRoom", (data) => {
    console.log("from user room update", data);
    setRooms((prev) => {
      return prev.map((room) => {
        if (room._id === currentRoom._id) {
          return data;
        } else {
          return room;
        }
      });
    });
  });

  socket.on("error", (data) => {
    setRooms((prev) => {
      return prev.map((room) => {
        if (room._id === currentRoom._id) {
          return data;
        } else {
          return room;
        }
      });
    });
  });
  // }, []);
  function sendMessage(e) {
    if ((e.type === "click" || e.key === "Enter") && input) {
      const msg = {
        sender: auth.user,
        message: input
      };
      socket.emit("chatMessage", { msg: msg, room: currentRoom });
      setInput("");
    }
  }

  async function raiseHand() {
    console.log("sending raise hand req");
    try {
      const res = await axios.patch(
        `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/updateuser/${currentRoom._id}`,
        {
          userId: auth.user._id,
          handraised: true,
          status: "audience"
        },
        {
          headers: {
            "auth-token": auth.token
          }
        }
      );
      console.log("update ke bad ka room ", res);
      setRooms(res.data);
    } catch (err) {
      console.log("error in exit");
    }
  }
  return (
    <div className="chat--app">
      <div className="chat--details">
        <Link
          to="/"
          onClick={exitRoom}
          style={{ fontSize: "1.5rem", fontWeight: "300" }}
        >
          <i className="fa fa-arrow-left" />
        </Link>
        <h4>{currentRoom && currentRoom.title}</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowUsers((prev) => !prev);
          }}
        >
          <i className="fa fa-users" />
        </button>
      </div>
      <div className="div--chatend" style={{ height: "3rem" }}></div>
      {new Date(`${currentRoom.startTime}`) > new Date(Date.now()) ? (
        <InactiveChats startTime={currentRoom.startTime} />
      ) : showUsers ? (
        <ChatroomMembers currentRoomId={currentRoom._id} auth={auth} />
      ) : (
        <Chats currentRoom={currentRoom} auth={auth} />
      )}
      <div className="div--chatend"></div>
      {auth &&
      (currentRoom.owner._id === auth.user._id ||
        isStageMemberOfRoom(auth.user, currentRoom)) ? (
        <div
          className="chat--input"
          style={{
            display: Date(currentRoom.startTime) > Date.now() ? "none" : "flex"
          }}
        >
          {replyTo && (
            <div className="reply--msg--input">
              <div className="reply--msg">
                <small>reply user</small>
                <p>reply messege</p>
              </div>
              <button>
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          )}
          <GrEmoji size={36} onClick={() => setShowEmoji((prev) => !prev)} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={sendMessage}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            <i className="fa fa-send" />
          </button>
        </div>
      ) : (
        <div
          className="chat--input"
          style={{
            justifyContent: "center",
            display:
              new Date(`${currentRoom.startTime}`) > new Date(Date.now())
                ? "none"
                : "flex"
          }}
        >
          <button className="btn btn-primary" onClick={raiseHand}>
            <i className="fa fa-hand-paper-o" />
          </button>
        </div>
      )}
      <div
        style={{ display: showEmoji ? "" : "none" }}
        className="emoji--picker"
      >
        <Picker
          onEmojiClick={(e, em) =>
            setInput((prev) => prev.concat(" " + em.emoji))
          }
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
      </div>
      <div
        className="modal-err"
        id="modal"
        style={{
          display: alreadyIn() ? "none" : showModal
        }}
      >
        <div className="modal-content">
          <div className="modal-title">
            <h2>Confirm</h2>
          </div>
          <div className="modal-description">
            <p>
              Enter {currentRoom && currentRoom.title},{" "}
              {currentRoom && currentRoom.users.length} persons are watching
            </p>
          </div>
          <div className="modal-btn-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowModal((prev) => (prev === "none" ? "flex" : "none"));
                joinRoom();
              }}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
