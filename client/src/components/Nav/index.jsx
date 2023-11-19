import { Link } from "react-router-dom";

import { useStoreContext } from "../../utils/store-context";
import Auth from "../../utils/auth";

import './style.scss';

export default function Nav() {
  const [theme, dispatch] = useStoreContext('theme');

  return (
    <header>
      <div>
        <container className ="titleSection">
        <p className="title">CommunityHub</p>
        </container>
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
        <>
                <Link className="btn btn-lg btn-info m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </>

      </div>
    </header>
  );
}