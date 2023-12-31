import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import UserNeedList from '../../components/UserNeedList';

import { USER_PROFILE } from '../../utils/actions';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/store-context';

import './style.scss';

export default function Profile() {
  const [user, dispatch] = useStoreContext('user');
  const { data, loading, refetch } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data && data.user) {
      dispatch({ type: USER_PROFILE, payload: data.user })
    }
  }, [data]);

  return (
    <div id="profile-page">
      <h1 class="title">Profile</h1>

      {loading && (
        <h2 className="loading-data">
          Loading user data...
        </h2>
      )}

      {user?.profile && (
        <ul className="display-user">
          <li>
            <span className="display-user__label">Full Name:</span> <span>{user.profile.firstName} {user.profile.lastName}</span>
          </li>
          <li>
            <span className="display-user__label">Email:</span> <span>{user.profile.email}</span>
          </li>
        </ul>
      )}
      {user?.profile && (
        <UserNeedList needs={user.profile.createdNeeds} refetchNeeds={refetch} />
      )}
    </div>
  );
};

