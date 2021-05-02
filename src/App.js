import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Navbar, Sidebar } from "./components";
import {
  Home,
  Login,
  Signup,
  Welcome,
  Account,
  CreateRoom,
  ChatRoom,
  ClosedRooms,
  ArchievedMessages
} from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import { useToast } from "./contexts/toastContext";
import { useRoom } from "./contexts/roomContext";
import axios from "axios";

export default function App() {
  const { auth, setAuth } = useAuth();
  const { ToastContainer } = useToast();
  const { rooms, setRooms } = useRoom();

  // console.log(rooms);
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
  //         console.log("rooms", res);
  //         res.data && setRooms(res.data);
  //       })();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // });

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
            <Route
              exact
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route exact path="/welcome" element={<Welcome />} />
            <Route
              exact
              path="/signup"
              element={!auth ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/account"
              element={auth ? <Account /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/createroom"
              element={auth ? <CreateRoom /> : <Login />}
            />
            <Route
              exact
              path="/chatroom"
              element={auth ? <ChatRoom /> : <Login />}
            />
            <Route
              exact
              path="/closedrooms"
              element={auth ? <ClosedRooms /> : <Login />}
            />
            <Route
              exact
              path="/chatroom/:chatid"
              element={auth ? <ChatRoom /> : <Login />}
            />
            <Route
              exact
              path="/closedrooms/:chatid"
              element={auth ? <ArchievedMessages /> : <Login />}
            />
          </Routes>
          <ToastContainer style={{ position: "fixed", right: "1rem" }} />
        </div>
      </div>
    </div>
  );
}
