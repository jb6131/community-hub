import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_UP_FOR_NEED } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignUpForNeedForm = ({ needId }) => {
  const [characterCount, setCharacterCount] = useState(0);

  const [signUpForNeed, { error }] = useMutation(SIGN_UP_FOR_NEED);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signUpForNeed({
        variables: { needId },
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Sign up to volunteer for this project!</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span >{error.message}</span>}
          </p>
          <form
  
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="signUpForNeedText"
                placeholder="Add your name..."
                value={signUpForNeedText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div >
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to sign up. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SignUpForNeedForm;