import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Navbar, Sidebar } from "./components";
import { Home, Login, Signup, Welcome, Account, CreateRoom } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import { useToast } from "./contexts/toastContext";
import { useRoom } from "./contexts/roomContext";
import axios from "axios";

export default function App() {
  const { auth, setAuth } = useAuth();
  const { ToastContainer } = useToast();
  const { rooms, setRooms } = useRoom();

  console.log(rooms);
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
          console.log("rooms", res);
          res.data && setRooms(res.data);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth]);

  const PrivateRoute = ({ path, element }) => {
    if (auth) {
      return element;
    } else {
      return <Navigate to="/welcome" state={{ from: path }} />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-window">
        <Sidebar />
        <div className="main-window-container">
          <Routes>
            <PrivateRoute exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/welcome" element={<Welcome />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/createroom" element={<CreateRoom />} />
          </Routes>
          <ToastContainer style={{ position: "fixed", right: "1rem" }} />
        </div>
      </div>
    </div>
  );
}