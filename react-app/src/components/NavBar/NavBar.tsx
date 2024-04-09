import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="NavBar">
      <ul>
        <li>
          <Link to="/events">YOUR EVENTS</Link>
        </li>
        <li>
          <Link to="/newEvent">CREATE EVENT</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
