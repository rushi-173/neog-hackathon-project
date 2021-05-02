import "./Chatroom.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { GrEmoji } from "react-icons/gr";
import { useRoom } from "../../contexts/roomContext";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";
import socketIOClient from "socket.io-client";
import { Modal } from "../../components";
const ENDPOINT = "https://neog-hackathon-project.rushi173.repl.co/";

function getCurrenRoom(id, rooms) {
  return rooms.find((room) => room._id === id);
}
export function ChatRoom() {
  const { chatid } = useParams();
  const [showEmoji, setShowEmoji] = useState(false);
  const [showModal, setShowModal] = useState("flex");
  const [input, setInput] = useState("");
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  const currentRoom = getCurrenRoom(chatid, rooms);
  const socket = socketIOClient(ENDPOINT);

  console.log("rooms", currentRoom, chatid);

  useEffect(() => {
    socket.on("connection");
    socket.emit("joinRoom", {
      user: auth.user,
      room: currentRoom
    });
  }, []);
  console.log(rooms);
  useEffect(() => {
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
  }, [socket]);

  function sendMessage() {
    const msg = {
      sender: auth.user,
      message: input
    };
    socket.emit("chatMessage", { msg: msg, room: currentRoom });
    setInput("");
  }

  return (
    <div className="chat--app">
      <div className="chat--container">
        {currentRoom &&
          currentRoom.messages.map((message) => {
            if (message?.sender._id === auth?.user._id) {
              if (message.repliedTo) {
                return (
                  <div className="chat__self">
                    <div className="reply--msg">
                      <small>{message.repliedTo.user.name}</small>
                      <p>{message.repliedTo.message}</p>
                    </div>
                    <p>{message}</p>
                  </div>
                );
              }
              return <div className="chat__self">{message.message}</div>;
            } else {
              if (message.repliedTo) {
                return (
                  <div className="chat__other">
                    <small className="sender-name">{message.sender.name}</small>
                    <div className="reply--msg">
                      <small>{message.repliedTo.user.name}</small>
                      <p>{message.repliedTo.message}</p>
                    </div>
                    <p>{message}</p>
                  </div>
                );
              }
              return (
                <div className="chat__other">
                  <small className="sender-name">{message.sender.name}</small>
                  <p>{message.message}</p>
                </div>
              );
            }
          })}
      </div>
      {/* <div style={{ height: "4rem" }}></div> */}
      <div className="chat--input">
        <GrEmoji size={36} onClick={() => setShowEmoji((prev) => !prev)} />
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn btn-primary" onClick={sendMessage}>
          <i className="fa fa-send" />
        </button>
      </div>
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
