export function Search() {
  return (
    <div
      className="container search-container hide-in-main-nav"
      style={{ flexWrap: "nowrap", width: "30rem" }}
      id="search"
    >
      <input
        id="name"
        type="search"
        className="input-area"
        style={{
          borderRadius: "0px",
          width: "80%",
          margin: "0",
          outline: "none",
          border: "2px solid #51c84d"
        }}
        placeholder="Search..."
      />
      <button
        className="btn btn-primary"
        style={{
          display: "inline",
          width: "20%",
          margin: "0",
          borderRadius: "0px",
          border: "2px solid #51c84d"
        }}
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  );
}
