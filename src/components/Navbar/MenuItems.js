import { Link } from "react-router-dom";

export function MenuItems() {
  return (
    <>
      <li className="menu-item">
        <b>
          <Link to="/">Home</Link>
        </b>
      </li>
      <li className="menu-item">
        <b>
          <Link to="/createroom" className="link-to">
            Create A Room
          </Link>
        </b>
      </li>
      <li className="menu-item">
        <b>
          <Link to="/closedrooms" className="link-to">
            Archieved Rooms
          </Link>
        </b>
      </li>
      <li className="menu-item">
        <b>
          <Link to="/account" className="link-to">
            Account
          </Link>
        </b>
      </li>
      {/* <li className="menu-item">
                <Link to="/products">Fruit Plants</Link>
            </li> */}
    </>
  );
}
