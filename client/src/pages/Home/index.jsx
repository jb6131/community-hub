import auth from '../../utils/auth';

import { useQuery } from '@apollo/client';

import NeedList from '../../components/NeedList';
import NeedForm from '../../components/NeedForm';

import { QUERY_NEEDS } from '../../utils/queries';

import './index.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_NEEDS);
  const needs = data?.allNeeds || [];

  return (
      <div>
        <div
        >
          <NeedForm />
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NeedList
              needs={needs}
            />
          )}
        </div>
      </div>
  );
};

export default Home;





