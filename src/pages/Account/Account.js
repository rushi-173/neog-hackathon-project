import { useAuth } from "../../contexts/authContext";
import { useToast } from "../../contexts/toastContext";

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
    <div className="Home">
      <h1>Account</h1>
      {auth && <button onClick={handleLogout}>Log Out</button>}
    </div>
  );
}
