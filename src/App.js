import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Home, Login, Signup, Welcome } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const isLoggedIn = false;

  const PrivateRoute = ({ path, element, isLoggedIn }) => {
    if (isLoggedIn == true) {
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
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/welcome" element={<Welcome />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
