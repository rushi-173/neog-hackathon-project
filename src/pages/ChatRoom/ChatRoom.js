import "./Chatroom.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [showDeleteModal, setShowDeleteModal] = useState("none");
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(undefined);
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  let navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState(getCurrenRoom(chatid, rooms));
  // const [currentRoom, setCurrentRoom] = useState(getCurrenRoom(chatid, rooms));

  // let currentRoom = getCurrenRoom(chatid, rooms);
  const socket = socketIOClient(ENDPOINT);

  console.log("rooms", currentRoom, chatid);
  useEffect(() => {
    setCurrentRoom(getCurrenRoom(chatid, rooms));
    // currentRoom = getCurrenRoom(chatid, rooms);
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

  function updateRoom() {
    socket.emit("addToStage", {
      user: auth.user,
      room: currentRoom
    });
    setCurrentRoom(getCurrenRoom(chatid, rooms));
  }

  async function archieveRoom() {
    try {
      await axios.patch(
        `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/close/${currentRoom._id}`,
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

  async function deleteRoom() {
    try {
      await axios.patch(
        `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/delete/${currentRoom._id}`,
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

  async function exitRoom() {
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

  function exitHandler() {
    if (auth.user._id === currentRoom.owner._id) {
      setShowDeleteModal("flex");
    } else {
      exitRoom();
      navigate("/");
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

  socket.on("updateAllRooms", (data) => {
    console.log("update all", data);
    setRooms(data);
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
        message: input,
        repliedTo: replyTo
      };
      socket.emit("chatMessage", { msg: msg, room: currentRoom });
      setInput("");
      setReplyTo(undefined);
      setShowUsers(false);
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
      setShowUsers(false);
    } catch (err) {
      console.log("error in exit");
    }
  }
  return (
    <div className="chat--app">
      <div className="chat--details">
        <button
          onClick={exitHandler}
          style={{ fontSize: "1.5rem", fontWeight: "300" }}
        >
          <i className="fa fa-arrow-left" />
        </button>
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
      {currentRoom &&
      new Date(`${currentRoom.startTime}`) > new Date(Date.now()) ? (
        <InactiveChats startTime={currentRoom.startTime} />
      ) : showUsers ? (
        <ChatroomMembers
          currentRoomId={currentRoom._id}
          auth={auth}
          setShowUsers={setShowUsers}
          updateRoom={updateRoom}
        />
      ) : (
        <Chats currentRoom={currentRoom} auth={auth} setReplyTo={setReplyTo} />
      )}
      <div className="div--chatend"></div>
      {auth &&
      ((currentRoom && currentRoom.owner._id === auth.user._id) ||
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
                <small>{replyTo.sender.name}</small>
                <p>{replyTo.message}</p>
              </div>
              <button
                onClick={() => {
                  setReplyTo(undefined);
                }}
              >
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
              currentRoom &&
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
      <div
        className="modal-err"
        id="modal"
        style={{
          display: showDeleteModal
        }}
      >
        <div className="modal-content">
          <div className="modal-title">
            <h2>Confirm</h2>
          </div>
          <div className="modal-description">
            <p>Do you want to archieve this room?</p>
          </div>
          <div className="modal-btn-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                archieveRoom();
                setShowDeleteModal((prev) =>
                  prev === "none" ? "flex" : "none"
                );
              }}
            >
              Archieve
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteRoom();
                setShowDeleteModal((prev) =>
                  prev === "none" ? "flex" : "none"
                );
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                setShowDeleteModal((prev) =>
                  prev === "none" ? "flex" : "none"
                );
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
