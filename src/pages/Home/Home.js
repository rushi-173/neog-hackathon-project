import { useEffect, useState } from "react";
import "./Home.css";
import { useRoom } from "../../contexts/roomContext";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { useAuth } from "../../contexts/authContext";

export function Home() {
  const { rooms, setRooms } = useRoom();
  const { auth } = useAuth();

  // console.log(auth, "Auth");
  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get(
            "https://neog-hackathon-project.rushi173.repl.co/api/chatroom",
            {
              headers: {
                "auth-token": auth.token
              }
            }
          );
          // console.log("rooms", res);
          res.data && setRooms(res.data);
          res.data && localStorage.setItem("rooms", JSON.stringify(res.data));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // console.log(rooms);
  return (
    <div className="Home">
      <h1 className="active--title" style={{ color: "#97bd30" }}>
        Active Rooms
      </h1>
      {!(
        rooms
          .filter((item) => item.active)
          .filter(
            (item) => new Date(`${item.startTime}`) < new Date(Date.now())
          ).length > 0
      ) && "No Active rooms"}
      <div className="active--rooms">
        {rooms &&
          rooms
            .filter((item) => item.active)
            .filter(
              (item) => new Date(`${item.startTime}`) <= new Date(Date.now())
            )
            .map((chatroom) => {
              return (
                <Link to={`/chatroom/${chatroom._id}`}>
                  <div className="room--card">
                    <h1>{chatroom.title}</h1>
                    <small>{chatroom.topic}</small>
                    <small>
                      {getFormattedDate(chatroom.startTime) + " to"}
                    </small>
                    <small>{getFormattedDate(chatroom.endTime)}</small>
                  </div>
                </Link>
              );
            })}
      </div>
      <h1 className="active--title" style={{ color: "#97bd30" }}>
        Upcoming Rooms
      </h1>
      {!(
        rooms
          .filter((item) => item.active)
          .filter(
            (item) => new Date(`${item.startTime}`) > new Date(Date.now())
          ).length > 0
      ) && "No Upcoming rooms"}
      <div className="upcoming--rooms">
        {rooms &&
          rooms
            .filter((item) => item.active)
            .filter(
              (item) => new Date(`${item.startTime}`) > new Date(Date.now())
            )
            .map((chatroom) => {
              return (
                <Link to={`/chatroom/${chatroom._id}`}>
                  <div className="room--card">
                    <h1>{chatroom.title}</h1>
                    <small>{chatroom.topic}</small>
                    <small>
                      {getFormattedDate(chatroom.startTime) + " to"}
                    </small>
                    <small>{getFormattedDate(chatroom.endTime)}</small>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
