import { Link, Outlet } from "react-router-dom";
import "../styles/nav.css";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
