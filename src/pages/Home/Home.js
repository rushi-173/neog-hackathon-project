import { useEffect, useState } from "react";
import "./Home.css";
import { useRoom } from "../../contexts/roomContext";

export function Home() {
  const { rooms, setRooms } = useRoom();
  console.log(rooms);
  return (
    <div className="Home">
      <h1>Home</h1>
      {rooms &&
        rooms.map((chatroom) => {
          return (
            <div className="room--card">
              <h1>{chatroom.title}</h1>
              <small>{chatroom.topic}</small>
              <small>{chatroom.startTime}</small>
              <small>Duration</small>
            </div>
          );
        })}
    </div>
  );
}
