import { useState } from "react";
import { Link } from "react-router-dom";
import './index.css';
import AuthService from "../../utils/auth";

const NeedList = ({ needs, title, showTitle = true, showFirstName = true }) => {
  const isAuthenticated = AuthService.loggedIn();
  const [message, setMessage] = useState("");

  const messageHandler = () => {
    setMessage("Please login or sign-up if you would like to participate!");
  }

  if (!needs.length) {
    return <h3 style={{textAlign: "center", marginTop: "11rem", marginBottom: "11rem"}}>No Community Needs Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {needs &&
        needs.map((need) => (
          <section className="needInfo">
          <div key={need._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showFirstName ? (
                <>
                  <Link
                    className="text-light"
                    to={`/profile/${need.needAuthor._id}`}
                  >
                    {need.needAuthor.firstName} {need.needAuthor.lastName}{" "}
                    <br />
                  </Link>
                  <span style={{ fontSize: "1rem" }}>
                    posted this community project on {need.createdAt}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You posted this community project on {need.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{need.needText}</p>
              <p>Project date: {need.needDate}</p>
            </div>
            { isAuthenticated ? (
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/needs/${need._id}`}
              >
                Participate in this community project.
              </Link>
            ) : (
              <Link
                className="btn btn-primary btn-block btn-squared"
                onClick={messageHandler}
              >
                Participate in this community project.
              </Link>
            )}
          </div>
          </section>
        ))}
    </div>
  );
};

export default NeedList;
