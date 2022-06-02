import { Link, useNavigate } from "react-router-dom";
import message from "./message";

const Header = ({ setDomain }) => {
  const navigate = useNavigate();

  return (
    <header>
      <h1>no-google-auth practice</h1>
      <nav>
        {" "}
        <Link to={`/`}>
          <button>Home</button>
        </Link>
        <Link to={`/search`}>
          <button>Reviews</button>
        </Link>
        {!sessionStorage.getItem("token") && (
          <Link to={`/login`}>
            <button>Log in</button>
          </Link>
        )}
        {sessionStorage.getItem("token") && (
          <button
            className="nav-button"
            onClick={() => {
              sessionStorage.removeItem("token");
              setDomain("");
              message("User signed out.");
              navigate(`/`);
            }}
          >
            Sign out
          </button>
        )}
      </nav>
      <hr></hr>
    </header>
  );
};

export default Header;
