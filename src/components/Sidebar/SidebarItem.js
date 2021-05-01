import { Link } from "react-router-dom";

export function SidebarItem({ children, path }) {
  return (
    <Link to={path} className="container">
      <div className="avatar-badge-container sidebar-item" role="button">
        <div className="avatar-noborder container-center">{children}</div>
      </div>
    </Link>
  );
}
