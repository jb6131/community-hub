import { Link } from "react-router-dom";

import { useStoreContext } from "../../utils/store-context";
import Auth from "../../utils/auth";

import { StyledNav } from "../../styles/Nav.styled";


export default function Nav() {
  const [theme, dispatch] = useStoreContext('theme');

  return (
    <StyledNav>
      <div>
          <p className="title">CommunityHub</p>
      </div> 
      <div className="donate-link">
          <Link to="https://buy.stripe.com/test_dR6dTsbRW9vO2QMdQQ">Donate to CommunityHub!</Link>
      </div>

      <div className="navDiv">
        <nav className="nav">
          {Auth.loggedIn() && (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/profile">Profile</Link>
              <div className="nav-link" onClick={() => Auth.logout()}>Logout</div>
            </>
          )}
        </nav>


      </div>
    </StyledNav>
  );
}