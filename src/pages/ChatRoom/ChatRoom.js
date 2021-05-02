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

const ENDPOINT = "https://neog-hackathon-project.rushi173.repl.co/";

function getCurrenRoom(id, rooms) {
  return rooms.find((room) => room._id === id);
}

function isStageMemberOfRoom(user, room) {
  let temp = room.stageMembers.includes(user._id);
  console.log(temp, room.stageMembers);
  if (temp) {
    return true;
  } else {
    return false;
  }
}

export function ChatRoom() {
  const { chatid } = useParams();
  const [showEmoji, setShowEmoji] = useState(false);
  const [showModal, setShowModal] = useState("flex");
  const [input, setInput] = useState("");
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  // const [currentRoom, setCurrentRoom] = useState(getCurrenRoom(chatid, rooms));

  let currentRoom = getCurrenRoom(chatid, rooms);
  const socket = socketIOClient(ENDPOINT);

  console.log("rooms", currentRoom, chatid);
  useEffect(() => {
    currentRoom = getCurrenRoom(chatid, rooms);
  }, [rooms]);
  useEffect(() => {
    socket.on("connection");
    socket.emit("joinRoom", {
      user: auth.user,
      room: currentRoom
    });
  }, []);
  console.log(rooms);
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

  function raiseHand() {}
  return (
    <div className="chat--app">
      <div className="chat--details">
        <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "300" }}>
          <i className="fa fa-arrow-left" />
        </Link>
        <h4>{currentRoom && currentRoom.title}</h4>
        <button className="btn btn-primary" onClick={sendMessage}>
          <i className="fa fa-users" />
        </button>
      </div>
      <div className="div--chatend" style={{ height: "3rem" }}></div>
      <Chats currentRoom={currentRoom} auth={auth} />
      <div className="div--chatend"></div>
      {auth && isStageMemberOfRoom(auth.user, currentRoom) ? (
        <div className="chat--input">
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
        <div className="chat--input" style={{ justifyContent: "center" }}>
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
    </div>
  );
}
