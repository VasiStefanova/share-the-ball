import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { FRIENDSHIP_STATUS } from '../../common/constants';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

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
    if (!userInfo.friends) return () => {};

    const targetUserFriends = userInfo.friends.filter(friend => friend.friendshipStatus === FRIENDSHIP_STATUS.connected);
    setTeammates(targetUserFriends);

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
