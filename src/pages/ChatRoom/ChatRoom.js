import "./Chatroom.css";
import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";

export function ChatRoom() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="chat--app">
      <div className="chat--container">
        <div className="chat__other">
          <small className="sender--name">Rushikesh</small>
          <p>Hello Shivam</p>
        </div>

        <div className="chat__self">
          <div className="reply--msg">
            <small>Rushikesh</small>
            <p>Hello Shivam</p>
          </div>
          <p>Hello Rushikesh</p>
        </div>
        <div className="chat__other">Hey</div>
        <div className="chat__self">Hello</div>
        <div className="chat__other">Hey</div>
        <div className="chat__self">Hello</div>
        <div className="chat__other">Hey</div>
        <div className="chat__self">Hello</div>
        <div className="chat__self">Hello</div>
        <div className="chat__other">Hey</div>
        <div className="chat__other">Hey</div>
        <div className="chat__self">Hello</div>
        <div className="chat__self">Hello</div>
        <div className="chat__other">Hey</div>
      </div>
      {/* <div style={{ height: "4rem" }}></div> */}
      <div className="chat--input">
        <GrEmoji size={36} onClick={() => setShowEmoji((prev) => !prev)} />
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn btn-primary">
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
