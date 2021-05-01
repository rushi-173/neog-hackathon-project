import "./CreateRoom.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useToast } from "../../contexts/toastContext";
import { useAuth } from "../../contexts/authContext";
import { useRoom } from "../../contexts/roomContext";
import { TextField } from "@material-ui/core";

export function CreateRoom() {
  const { auth } = useAuth();
  const { setRooms } = useRoom();
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState("");
  // console.log(startTime, endTime);

  async function handleCreateRoom(e) {
    console.log(auth);
    e.preventDefault();
    if (auth) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://neog-hackathon-project.rushi173.repl.co/api/chatroom",
          {
            ownerId: auth.user._id,
            title: title,
            topic: topic,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            stageMembers: [auth.user._id],
            active: false,
            handraisedMembers: [],
            audience: [],
            messages: []
          },
          {
            headers: {
              "auth-token": auth.token
            }
          }
        );
        console.log("room create", res);
        setIsLoading(false);
        toast("Room created successfully", {
          type: "success"
        });
        setTitle("");
        setTopic("");
        setStartTime("");
        setEndTime("");
        setRooms((prev) => prev.concat(res));
      } catch (err) {
        toast("Somethig bad happened", {
          type: "error"
        });
        setIsLoading(false);
        console.log(err);
      }
    }
  }

  return (
    <div className="CreateRoom container-center">
      <div className="container-center container-column Signup-form-container">
        <h2>Create Room</h2>
        <form className="basic-form-container container-column">
          <div className="basic-input-group">
            <label for="name">
              Room Title: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="title"
              type="text"
              className="input-area"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="topic">
              Room Topic: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="topic"
              type="text"
              className="input-area"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="start-time">
              Start Time: <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className="input-area"
              InputLabelProps={{
                shrink: true
              }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="password">
              End Time: <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className="input-area"
              InputLabelProps={{
                shrink: true
              }}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <small style={{ color: "red" }} className="err-msg">
            {error}
          </small>
          <button
            className="btn btn-primary btn-Signup"
            onClick={handleCreateRoom}
          >
            {isLoading ? (
              <Loader type="TailSpin" color="#fff" height={20} width={20} />
            ) : (
              "Create Room"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
