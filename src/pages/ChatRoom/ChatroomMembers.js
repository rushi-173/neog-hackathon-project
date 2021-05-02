import { useEffect, useState } from "react";
import axios from "axios";
import { useRoom } from "../../contexts/roomContext";

export function ChatroomMembers({
  currentRoomId,
  auth,
  setShowUsers,
  updateRoom
}) {
  const [currentRoom, setCurrentRoom] = useState(null);
  const { setRooms } = useRoom();

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

  async function AddToStage(user, room) {
    try {
      const res = await axios.patch(
        `https://neog-hackathon-project.rushi173.repl.co/api/chatroom/updateuser/${room._id}`,
        {
          userId: user._id,
          handraised: false,
          status: "stageMember"
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
      console.log("error in adding to stage");
    }

    updateRoom();
  }

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
              <div className="container">
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
