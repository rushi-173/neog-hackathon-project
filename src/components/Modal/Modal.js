export function Modal({ showModal, setShowModal }) {
  return (
    <div className="modal-err" id="modal" style={{ display: showModal }}>
      <div className="modal-content">
        <div className="modal-title">
          <h2>Error !</h2>
        </div>
        <div className="modal-description">
          <p>Something Went Wrong During Chatting.</p>
        </div>
        <div className="modal-btn-container">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal((prev) => (prev === "none" ? "flex" : "none"));
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
