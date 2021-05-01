export function Hamburger({
  setMenuStyles,
  setHamburgerStyles,
  hamburgerStyles
}) {
  const hamburgerClickHandler = () => {
    if (hamburgerStyles.includes("click")) {
      setHamburgerStyles("hamburger-menu pointer");
      setMenuStyles("menu hide-menu");
    } else {
      setHamburgerStyles("hamburger-menu pointer click");
      setMenuStyles("menu show-menu");
    }
  };

  return (
    <div
      className={hamburgerStyles}
      onClick={hamburgerClickHandler}
      id="menu-open-button"
      role="button"
    >
      <span className="hamburger-menu-line"></span>
      <span className="hamburger-menu-line"></span>
      <span className="hamburger-menu-line"></span>
    </div>
  );
}
