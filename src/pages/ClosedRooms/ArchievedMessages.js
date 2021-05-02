import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../contexts/roomContext";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";
import { Chats } from "./Chats";
import axios from "axios";

export function ArchievedMessages() {
  const { chatid } = useParams();
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    rooms.find((room) => room._id === id);
  }, []);

  return (
    <div className="chat--app">
      <Chats currentRoom={currentRoom} auth={auth} />
    </div>
  );
}
