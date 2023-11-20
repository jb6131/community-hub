import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SIGNUPFORNEED } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignUpForNeedForm = ({ needId }) => {
  const [signUpForNeedText, setSignUpForNeedText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addSignUpForNeed, { error }] = useMutation(ADD_SIGNUPFORNEED);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSignUpForNeed({
        variables: {
          needId,
          signUpForNeedTextText,
          signUpForNeedAuthor: Auth.getProfile().firstName
        },
      });

      setSignUpForNeedText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'signUpForNeedText' && value.length <= 280) {
      setSignUpForNeedText(value);
      setCharacterCount(value.length);
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
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="signUpForNeedText"
                placeholder="Add your name..."
                value={signUpForNeedText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
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