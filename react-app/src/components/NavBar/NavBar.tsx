import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
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
