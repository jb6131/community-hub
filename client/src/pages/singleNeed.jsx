import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import SignUpForNeedList from "../components/SignUpList";

import { QUERY_SINGLE_NEED } from "../utils/queries";
import { SIGN_UP_FOR_NEED } from "../utils/mutations";

const SingleNeed = () => {
  const { needId } = useParams();
  const [signUpForNeed] = useMutation(SIGN_UP_FOR_NEED);

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_NEED, {
    variables: { needId: needId },
  });

  const need = data?.singleNeed || {};

  const handleSignUp = async () => {
    try {
      await signUpForNeed({ variables: { needId } });
      refetch();
    } catch (error) {
      console.error("Error signing up for need: ", error);
    }
  };

  console.log(loading);

  if (loading) {
    console.log(need);
    console.log(loading);

    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {need.needAuthor?.firstName} {need?.needAuthor?.lastName} <br />
        <span style={{ fontSize: "1rem" }}>
          posted this need on {need.createdAt}
        </span>
      </h3>
      <div>
        <blockquote
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {need.needText}
        </blockquote>
      </div>

      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      <div>
        <SignUpForNeedList
          needId={need._id}
          signedUpUsers={need.signedUpUsers}
        />
      </div>
    </div>
  );
};

export default SingleNeed;
