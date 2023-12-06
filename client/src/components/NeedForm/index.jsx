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
            {characterCount}/280
          </p>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea className="text"
                name="needText"
                placeholder="Enter information about your project"
                value={needText}
                // style={{ lineHeight: '4.5', width: '800px', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <br/>
              <h4>Project Date/Time</h4>
              <input
                type="datetime-local"
                name="needDate"
                className="date-picker"
                placeholder="Enter the project date and time"
                value={needDate}
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
        <div className='LISU'>
          Join us to participate in community projects! 
          <p>{' '}
          <Link to="/login">Login</Link>{' '} | {' '}<Link to="/signup">Signup</Link>
          </p>
        </div>
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

textarea {
  justify-content: center;
  width: 800px;
  max-width: 100%;
  font-size: 20px;
  resize: none;
}

.date-picker {
  line-height: 2.0;
  margin: 10px;
  width: 300px;
  max-width: 100%;
  font-size: 20px;
}

.LISU p {
  font-size: 35px;
}

@media screen and (max-width: 768px) {
  width: 75%;
}
`