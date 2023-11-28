import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

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
      <div>
        <h2>Your Projects</h2>
      </div>
      {needs &&
        needs.map((need) => (
          <div key={need._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              Need Title: {need.needText}
              <br />
            </h4>
            <div className="card-body bg-light p-2">
              <span style={{ fontSize: "1rem" }}>
                Need Date: {need.needDate}
              </span>
              <p>Created on: {need.createdAt}</p>
              <button onClick={() => handleRemove(need._id)}>Remove</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserNeedList;
