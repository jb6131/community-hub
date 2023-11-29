import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import './index.css';
import { REMOVE_NEED } from "../../utils/mutations";

const UserNeedList = ({ needs, refetchNeeds }) => {
  const [removeNeed] = useMutation(REMOVE_NEED);

  const handleRemove = async (needId) => {
    try {
      await removeNeed({ variables: { needId } });
      refetchNeeds();
    } catch (error) {
      console.error("Error removing need: ", error);
    }
  }

  if (!needs || needs.length === 0) {
    return <h3 style={{textAlign: "center", marginTop: "11rem", marginBottom: "11rem"}}>No Needs Created Yet</h3>;
  }

  return (
    <div>
      <div class="projects">
        <h2>Your Projects</h2>
      </div>
      {needs &&
        needs.map((need) => (
          <div key={need._id} class="user-need">
            <h4>
              Need Title: {need.needText}
              <br />
            </h4>
            <div >
              <span style={{ fontSize: "1rem" }}>
                Need Date: {need.needDate}
              </span>
              <p>Created on: {need.createdAt}</p>
              <button class="btn" onClick={() => handleRemove(need._id)}>Remove</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserNeedList;
