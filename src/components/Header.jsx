import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <Link>REACT-CURD</Link>
        <div>
          <Link to="/">HOME</Link>
          <Link to="/add">CREATE_USER</Link>
          <Link to="/edit">edit_USER</Link>
          <Link to="/show">SHOW_USER</Link>
          <Link to="/search">SEARCH</Link>
        </div>
      </nav>
    </div>
  );
}
