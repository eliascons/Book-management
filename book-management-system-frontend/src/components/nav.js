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
          <div>
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout} className="link">
            Logout
          </button>
        )}
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
