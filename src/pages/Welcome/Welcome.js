import "./Welcome.css";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="Welcome">
      <h1>Welcome</h1>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/signup" className="btn btn-primary">
        Sign Up
      </Link>
    </div>
  );
}
