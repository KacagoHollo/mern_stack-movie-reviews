import { Link, useNavigate } from "react-router-dom";
import message from "./message";
import Button from '@mui/material/Button'

const Header = ({ setDomain }) => {
  const navigate = useNavigate();

  return (
    <header>
      <h1> The Shining Movie Database</h1>
      <nav>
        {" "}
        <Link to={`/`}>
          <Button
          size="small"
          color="secondary"
          variant="contained"
          >Home</Button>
        </Link>
        <Link to={`/search`}>
          <Button
          size="small"
          color="secondary"
          variant="contained"
          >Reviews</Button>
        </Link>
        {!sessionStorage.getItem("token") && (
          <Link to={`/login`}>
            <Button 
            size="small"
            color="warning"
            variant="contained"
            className="login">Log in</Button>
          </Link>
        )}
        {sessionStorage.getItem("token") && (
          <Button
          sx={{ mt: 5, mb: 5, borderRadius: "10px" }}
          color='error'
          variant="contained"
            className="nav-button"
            onClick={() => {
              sessionStorage.removeItem("token");
              setDomain("");
              message("User signed out.");
              navigate(`/`);
            }}
          >
            Sign out
          </Button>
        )}
      </nav>
      <hr></hr>
    </header>
  );
};

export default Header;
