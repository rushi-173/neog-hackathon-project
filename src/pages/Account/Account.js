import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";
import "./Account.css";

export function Account() {
  const { auth, setAuth } = useAuth();
  const { toast } = useToast();

  function handleLogout() {
    setAuth(null);
    localStorage.clear();
    toast("Logged out Successfully", {
      type: "success"
    });
  }

  return (
    <div className="account--container">
      <h1>Account</h1>
      <h4>
        Name: <p style={{ display: "inline-block" }}>{auth.user.name}</p>{" "}
      </h4>
      <h4>
        Email: <p style={{ display: "inline-block" }}>{auth.user.email}</p>{" "}
      </h4>

      {auth && (
        <button
          style={{ width: "8rem" }}
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </div>
  );
}
