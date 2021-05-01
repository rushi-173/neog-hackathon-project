import "./Sidebar.css";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="container-column sidebar">
      <SidebarItem path="/">
        <i className="fa fa-home" aria-hidden="true"></i>
        <small>Home</small>
      </SidebarItem>
      <SidebarItem path="/search">
        <i className="fa fa-search" aria-hidden="true"></i>
        <small>Search</small>
      </SidebarItem>
    </div>
  );
}

export default Sidebar;
