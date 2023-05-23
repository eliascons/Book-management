import { Link, Outlet } from "react-router-dom";
import "../styles/nav.css";
import GET_ME from "../api/users/queries/getUser";
import { useQuery } from "@apollo/client";

const NavBar = () => {
  const { data, client } = useQuery(GET_ME, { fetchPolicy: "network-only" });

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await client.resetStore();
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="link">
          Home
        </Link>
        {!data?.getMe ? (
          <Link to="/register" className="link">
            Register
          </Link>
        ) : null}
        <div className="right-align">
          {!data?.getMe ? (
            <div>
              <Link to="/login">
                <button className="fancy-btn">Login</button>
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="fancy-btn">
              Logout
            </button>
          )}
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
