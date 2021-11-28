import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import getUsersRequest from '../../services/users/get-users-request';

const Teammates = ({ userId }) => {
  const { toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    getUserDetailsRequest(userId)
      .then(userDetails => {
        setUserInfo(userDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    if (!userInfo) return () => {};

    getUsersRequest()
      .then(allUsers => {
        return allUsers
          .filter(({ id: currUserId }) => userInfo.friends
            .some(({ id: teammateId, friendshipStatus }) => currUserId === teammateId && friendshipStatus === 2));
      })
      .then(teammatesList => setTeammates(teammatesList))
      .catch(console.error);

    return () => setTeammates([]);
  }, [userInfo]);


  return teammates.length ?
    <>
      <SearchTeammates setTeammates={setTeammates} targetUserId={userId} />
      <FoundTeammates teammates={teammates} />
    </>:
    <h3 className='theme-text-style' style={{ marginTop: '1vh' }}>No teammates to show</h3>;
};

Teammates.propTypes = {
  userId: PropTypes.string,
};

export default Teammates;
