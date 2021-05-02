import "./Welcome.css";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="Welcome">
      <h1>Welcome</h1>
      <br />
      <br />
      <Link to="/signup" style={{ width: "8rem" }} className="btn btn-primary">
        Get Started
      </Link>
      <br />
      <Link
        to="/login"
        style={{ width: "8rem" }}
        className="btn btn-outline-primary"
      >
        Login
      </Link>
    </div>
  );
}
