import { Link } from "react-router-dom";

import { useStoreContext } from "../../utils/store-context";
import Auth from "../../utils/auth";

import { StyledNav } from "../../styles/Nav.styled";
// import './style.scss';

export default function Nav() {
  const [theme, dispatch] = useStoreContext('theme');

  return (
    <StyledNav>
      <div>
          <p className="title">CommunityHub</p>
      </div>

      <div>
        <nav>
          {Auth.loggedIn() && (
            <>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <div className="logout-link" onClick={() => Auth.logout()}>Logout</div>
            </>
          )}
        </nav>
        
          {/* <section> */}
            {/* <Link className="btn btn-lg btn-info m-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-lg btn-light m-2" to="/signup">
              Signup
            </Link> */}
          {/* </ section> */}
        

      </div>
    </StyledNav>
  );
}