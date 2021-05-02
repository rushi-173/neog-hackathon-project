import { useHistory } from "react-router-dom";

export function InactiveChats({ startTime }) {
  const history = useHistory();
  return (
    <div className="chat--container">
      <h1>This room is scheduled at {startTime}, come back again later</h1>
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>
  );
}
