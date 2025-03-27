import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="logo">Experience Sharer</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="nav-link">
              <FaUserPlus /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
