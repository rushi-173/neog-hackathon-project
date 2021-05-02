import { useEffect, useState } from "react";
import "./Home.css";
import { useRoom } from "../../contexts/roomContext";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

export function Home() {
  const { rooms, setRooms } = useRoom();
  console.log(rooms);
  return (
    <div className="Home">
      {rooms &&
        rooms.map((chatroom) => {
          return (
            <Link to={`/chatroom/${chatroom._id}`}>
              <div className="room--card">
                <h1>{chatroom.title}</h1>
                <small>{chatroom.topic}</small>
                <small>{chatroom.startTime}</small>
                <small>Duration</small>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
