import "./Signup.css";
import { Link } from "react-router-dom";

export function Signup() {
  return (
    <div className="Signup container-center">
      <div className="container-center container-column Signup-form-container">
        <h2>Sign Up</h2>
        <form className="basic-form-container container-column">
          <div className="basic-input-group">
            <label for="username">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input id="username" type="text" className="input-area" />
          </div>
          <div className="basic-input-group">
            <label for="password">
              Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input id="password" type="password" className="input-area" />
            <small className="err-msg"></small>
          </div>
          <div className="basic-input-group">
            <label for="password">
              Re-enter Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input id="password" type="password" className="input-area" />
            <small className="err-msg"></small>
          </div>
          <button className="btn btn-primary btn-Signup">Sign Up</button>
          <div className="container-space-between btn-Signup">
            <Link to="/login">
              <p>Already Registered? Login🚀</p>
            </Link>
            <p></p>
          </div>
          <hr color="white" width="100%" className="btn-Signup" />
          <br />
          <p>
            <u>Or Signup With</u>
          </p>
          <div className="container-space-between social-Signup btn-Signup">
            <button class="btn btn-facebook" disabled>
              Facebook
              <i class="fa fa-facebook icon-right" aria-hidden="true"></i>
            </button>
            <button class="btn btn-twitter" disabled>
              Twitter<i class="fa fa-twitter icon-right" aria-hidden="true"></i>
            </button>
            <button class="btn btn-google" disabled>
              Google
              <i class="fa fa-google-plus icon-right" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
