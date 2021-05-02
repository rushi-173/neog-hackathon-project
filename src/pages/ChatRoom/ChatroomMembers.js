import { useEffect, useState } from "react";
import axios from "axios";

export function ChatroomMembers({ currentRoomId, auth }) {
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    try {
      (async function getData() {
        const res = await axios.get(
          `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/${currentRoomId}`,
          {
            headers: {
              "auth-token": auth.token
            }
          }
        );
        // console.log("rooms", res);
        setCurrentRoom(res.data);
        console.log("specific get", res);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  function AddToStage(user, room) {}
  return (
    <div className="chatroom--members--container">
      <h3>Stage</h3>
      {currentRoom &&
        currentRoom.users.map((user) => {
          if (user.status === "stageMember") {
            return (
              <div>
                <p>{user.name}</p>
              </div>
            );
          }
          return <></>;
        })}
      <h3>HandRaised</h3>
      {currentRoom &&
        currentRoom.users.map((user) => {
          if (user.handraised === true) {
            return (
              <div className="container-space-between">
                <p>{user.name}</p>
                {currentRoom.owner._id === auth.user._id ? (
                  <button
                    onClick={() => {
                      AddToStage(user, currentRoom);
                    }}
                  >
                    <i
                      class="fa fa-plus"
                      className="badge bg-primary"
                      aria-hidden="true"
                    ></i>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            );
          }
          return <></>;
        })}
      <h3>Audience</h3>
      {currentRoom &&
        currentRoom.users.map((user) => {
          if (user.handraised === false && user.status === "audience") {
            console.log("audieence", user);
            return (
              <div>
                <p>{user.name}</p>
              </div>
            );
          }
          return <></>;
        })}
    </div>
  );
}
