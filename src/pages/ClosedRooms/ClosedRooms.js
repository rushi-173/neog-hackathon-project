import { useEffect, useState } from "react";
import { useRoom } from "../../contexts/roomContext";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

export function ClosedRooms() {
  const { rooms, setRooms } = useRoom();
  const { auth } = useAuth();

  // console.log(auth, "Auth");
  // useEffect(() => {
  //   if (auth) {
  //     try {
  //       (async function getData() {
  //         const res = await axios.get(
  //           "https://neog-hackathon-project.rushi173.repl.co/api/chatroom",
  //           {
  //             headers: {
  //               "auth-token": auth.token
  //             }
  //           }
  //         );
  //         // console.log("rooms", res);
  //         res.data && setRooms(res.data);
  //         res.data && localStorage.setItem("rooms", JSON.stringify(res.data));
  //       })();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, []);

  console.log(rooms);
  return (
    <div className="Home">
      <h1 style={{ color: "#1DA1F2" }}>Archieved Rooms</h1>
      <div className="active--rooms">
        {rooms &&
          rooms
            .filter((item) => !item.active)
            .filter((item) => item.visibility)
            .map((chatroom) => {
              return (
                <Link to={`/closedrooms/${chatroom._id}`}>
                  <div className="room--card">
                    <h1>{chatroom.title}</h1>
                    <small>{chatroom.topic}</small>
                    {/* <small>{getFormattedDate(chatroom.startTime)}</small> */}
                    <small>Duration</small>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
