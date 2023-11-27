import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { USER_PROFILE } from "../../utils/actions";
import { QUERY_USER } from "../../utils/queries";
import { WITHDRAW_FROM_NEED } from "../../utils/mutations";
// import { useStoreContext } from '../../utils/store-context';

const SignUpForNeedList = ({ needId, signedUpUsers = [] }) => {
  // const [person, dispatch] = useStoreContext('user');
  const { data, loading, refetch } = useQuery(QUERY_USER);

  const [withdrawFromNeed] = useMutation(WITHDRAW_FROM_NEED);

  const handleWithdraw = async () => {
    try {
      await withdrawFromNeed({ variables: { needId } });
      refetch();
    } catch (error) {
      console.error("Error withdrawing from need: ", error);
    }
  }

  if (!signedUpUsers.length) {
    return <h3>Nobody Signed Up Yet</h3>;
  }
  if (loading) {
    return <h3>Still loading...</h3>;
  }
  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Signed Up Users
      </h3>
      <div className="flex-row my-4">
        {signedUpUsers.map((user) => (
          <div key={user._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <h5 className="card-header">
                {user?.firstName} {user?.lastName}
                <span style={{ fontSize: "0.825rem" }}>
                  {/* You can add more user details here */}
                </span>
                {/* <p>{user._id}</p> */}
                {/* <p>{data.user._id}</p> */}
                {user._id == data.user._id ? (
                  <button onClick={handleWithdraw}>Withdraw</button>
                ) : null}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SignUpForNeedList;
