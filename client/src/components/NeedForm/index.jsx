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
  const [needDate, setNeedDate] = useState('')

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
          needDate,
        },
      });

      setNeedText('');
      setNeedDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'needText' && value.length <= 280) {
      setNeedText(value);
      setCharacterCount(value.length);
    };
    if (name === 'needDate' && value.length <= 180) {
      setNeedDate(value);
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
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="needText"
                placeholder="Here's a new community project..."
                value={needText}
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <br/>
              <label>Project date and time: </label>
              <input
                type="datetime-local"
                name="needDate"
                placeholder="Enter the project date and time"
                value={needDate}
                style={{ lineHeight: '2.0', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Project
              </button>
            </div>
            {error && (
              <div >
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your community project. Please{' '}
          <Link to="/login">login</Link>{' '} or {' '}<Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default styled (NeedForm) `
margin: auto;
color: white;
width: 50%;
background-color: #7f8537c3;
border-radius: 50px;
outline: 2px solid black;
font-size: 20px;
padding: .25%;
margin-top: 2rem;




  h3 {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
}

p {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    margin-top: 3rem;
}

a {
  padding-left: 3px;
  padding-right: 3px;
}

`