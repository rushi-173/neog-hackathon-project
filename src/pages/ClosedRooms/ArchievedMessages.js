import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../contexts/roomContext";
import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";
import { ArchievedChats } from "./ArchievedChats";
import axios from "axios";

function getCurrenRoom(id, rooms) {
  return rooms && rooms.find((room) => room._id === id);
}

export function ArchievedMessages() {
  const { chatid } = useParams();
  const { auth, setAuth } = useAuth();
  const { rooms, setRooms } = useRoom();
  const { toast } = useToast();
  const [currentRoom, setCurrentRoom] = useState(getCurrenRoom(chatid, rooms));

  return (
    <div className="chat--app">
      <ArchievedChats currentRoom={currentRoom} auth={auth} />
    </div>
  );
}
