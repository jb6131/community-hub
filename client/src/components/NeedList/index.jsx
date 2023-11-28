import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import './index.css';
import AuthService from "../../utils/auth";

Modal.setAppElement('#root');

const NeedList = ({ needs, title, showTitle = true, showFirstName = true }) => {
  const isAuthenticated = AuthService.loggedIn();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  if (!needs.length) {
    return <h3 style={{textAlign: "center", marginTop: "11rem", marginBottom: "11rem"}}>No Community Needs Yet</h3>;
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="ModalText">
          <h2>Please login or signup if you would like to participate!</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      {showTitle && <h3>{title}</h3>}
      {needs &&
        [...needs].reverse().map((need) => (
          <section key={need._id} className="needInfo">
          <div key={need._id} >
            <h4>
              {showFirstName ? (
                <>
                  <Link
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
            <div>
              <p>{need.needText}</p>
              <p>Project date: {need.needDate}</p>
            </div>
            { isAuthenticated ? (
              <Link
                to={`/needs/${need._id}`}
              >
                Participate in this community project.
              </Link>
            ) : (
              <Link
                className="btn btn-primary btn-block btn-squared"
                onClick={openModal}
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
