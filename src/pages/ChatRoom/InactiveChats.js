import { Link } from "react-router-dom";
import { getFormattedDate } from "../../utils/getFormattedDate";

export function InactiveChats({ startTime }) {
  return (
    <div className="chat--container">
      <h1>
        This room is scheduled at {getFormattedDate(startTime)}, come back again
        later
      </h1>
      <Link to="/" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
}
