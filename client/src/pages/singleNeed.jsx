// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SignUpForNeedList from '../components/SignUpList';
import SignUpForNeedForm from '../components/SignUpForm';

import { QUERY_SINGLE_NEED } from '../utils/queries';

const SingleNeed = () => {
  const { needId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_NEED, {
    variables: { needId: needId },
  });

  const need = data?.need || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {need.needAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          posted this need on {need.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {need.needText}
        </blockquote>
      </div>

      <div className="my-5">
        <SignUpForNeedList comments={need.signUpForNeed} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SignUpForNeedForm needId={need._id} />
      </div>
    </div>
  );
};

export default SingleNeed;
