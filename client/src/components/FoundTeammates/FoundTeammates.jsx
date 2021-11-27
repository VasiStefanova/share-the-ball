import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import './FoundTeammates.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';
import { useContext, useState } from 'react';
import ConfirmDeleteUser from '../../admin/DeleteUserModal/ConfirmDeleteUserModal';
import AppContext from '../../context/AppContext';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import ConfirmBanUser from '../../admin/BanUserModal/ConfirmBanUserModal';
import { isCurrentURL } from '../../common/helpers';
import SingleUserBox from '../../elements/SingleUserBox/SingleUserBox';

const FoundTeammates = ({ teammates }) => {

  return (
    <>
      {teammates.map(teammate =>
        <SingleUserBox key={teammate.id} teammate={teammate} />
      )}
    </>
  );
};

FoundTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default FoundTeammates;
