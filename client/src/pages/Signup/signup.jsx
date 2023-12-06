import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = ( {className} ) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });


      Auth.login(data.signup.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={ className }>
      <div>
        <div className="title">
          <h4>Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="form" onSubmit={handleFormSubmit}>
                <input className="input"
                  placeholder="Your first name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input className="input"
                  placeholder="Your last name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <input className="input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input className="input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default styled (Signup)`
text-align: center;
  form {
    text-align: center;
  }
`;