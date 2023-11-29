import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import SignUpForNeedList from "../components/SignUpList";

import { QUERY_SINGLE_NEED } from "../utils/queries";
import { SIGN_UP_FOR_NEED } from "../utils/mutations";

const SingleNeed = ( {className}) => {
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
    <div className= { className }>
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
            lineHeight: "1.5",
          }}
        >
          {need.needText}
        </blockquote>
      </div>

      <div>
        <button className="btn" onClick={handleSignUp}>Sign Up</button>
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

export default styled (SingleNeed) `

margin: auto;
width: 50%;
background-color: #7f8537c3;
border-radius: 50px;
outline: 2px solid black;
color:white;
padding: .75%;
margin-top: 4rem;

.btn {
  font-size: 1.5rem;
  padding: 1.5%;
  border-radius: 10%;
}

`
