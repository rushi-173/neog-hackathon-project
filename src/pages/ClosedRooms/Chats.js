export function Chats({ currentRoom, auth, setReplyTo }) {
  return (
    <div className="chat--container">
      {currentRoom &&
        currentRoom.messages.map((message) => {
          if (message?.sender._id === auth?.user._id) {
            if (message.repliedTo) {
              return (
                <div className="chat__self">
                  <small>{message.sender.name}</small>
                  <div className="reply--msg">
                    <small>{message.repliedTo.user.name}</small>
                    <p>{message.repliedTo.message}</p>
                  </div>
                  <p>{message.message}</p>
                </div>
              );
            }
            return (
              <div className="chat__self">
                <small className="sender-name">{message.sender.name}</small>
                <p>{message.message}</p>
              </div>
            );
          } else {
            if (message.repliedTo) {
              return (
                <div className="chat__other">
                  <div>
                    <small className="sender-name">
                      {message.sender.name}{" "}
                    </small>
                  </div>
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
                <div>
                  <small className="sender-name">{message.sender.name} </small>
                  <button>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </button>
                </div>

                <p>{message.message}</p>
              </div>
            );
          }
        })}
    </div>
  );
}
