import "./Login.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="Login container-center">
      <div className="container-center container-column login-form-container">
        <h2>Login</h2>
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
          <button className="btn btn-primary btn-login">Login</button>
          <div className="container-space-between btn-login">
            <Link to="/signup">
              <p>Register Now 🚀</p>
            </Link>
            <p>🤔 Forgot Password?</p>
          </div>
          <hr color="white" width="100%" className="btn-login" />
          <br />
          <p>
            <u>Or Login With</u>
          </p>
          <div className="container-space-between social-login btn-login">
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
