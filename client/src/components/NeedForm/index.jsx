import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UseUserContext } from '../../utils/user-context';
import styled from 'styled-components';

import { ADD_NEED } from '../../utils/mutations';
import { QUERY_NEEDS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const NeedForm = ( {className} ) => {
  const { user } = UseUserContext()
  const [needText, setNeedText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addNeed, { error }] = useMutation
  (ADD_NEED, {
    refetchQueries: [
      QUERY_NEEDS,
      'getNeeds',
    ]
  });
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addNeed({
        variables: {
          needText,
        },
      });

      setNeedText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'needText' && value.length <= 280) {
      setNeedText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className= { className }>
      <h3>What kind of community project do you need support for?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="needText"
                placeholder="Here's a new community project..."
                value={needText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Need
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your community project. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default styled (NeedForm) `
  h3 {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
}

p {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
}

`