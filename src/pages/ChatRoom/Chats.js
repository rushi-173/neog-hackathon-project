export function Chats({ currentRoom, auth }) {
  return (
    <div className="chat--container">
      {currentRoom &&
        currentRoom.messages.map((message) => {
          if (message?.sender._id === auth?.user._id) {
            if (message.repliedTo) {
              return (
                <div className="chat__self">
                  <div className="reply--msg">
                    <small>{message.repliedTo.user.name}</small>
                    <p>{message.repliedTo.message}</p>
                  </div>
                  <p>{message}</p>
                </div>
              );
            }
            return <div className="chat__self">{message.message}</div>;
          } else {
            if (message.repliedTo) {
              return (
                <div className="chat__other">
                  <small className="sender-name">{message.sender.name}</small>
                  <div className="reply--msg">
                    <small>{message.repliedTo.user.name}</small>
                    <p>{message.repliedTo.message}</p>
                  </div>
                  <p>{message}</p>
                </div>
              );
            }
            return (
              <div className="chat__other">
                <small className="sender-name">{message.sender.name}</small>
                <p>{message.message}</p>
              </div>
            );
          }
        })}
    </div>
  );
}
