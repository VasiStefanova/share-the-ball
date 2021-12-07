/* eslint-disable no-shadow */
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useContext, useState } from 'react';
import './SearchTeammates.css';
import getUsersRequest from '../../services/users/get-users-request';
import PropTypes from 'prop-types';
import { isCurrentURL } from '../../common/helpers';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

const SearchTeammates = ({ setTeammates, targetUserId = '' }) => {
  const { user } = useContext(AppContext);
  const [userInput, setUserInput] = useState('');
  const [usernameBtnClicked, setUsernameBtnClicked] = useState(true);
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const search = async () => {
    const searchQueries = {};
    searchQueries.count = 100;

    if (usernameBtnClicked) {
      searchQueries.name=`${userInput}`;
    }

    if (emailBtnClicked) {
      searchQueries.email=`${userInput}`;
    }

    const foundUsers = await getUsersRequest(searchQueries);
    const loggedUserFriends = foundUsers
      .filter(({ id: userId }) => user.friends
        .some(({ id: teammateId, friendshipStatus }) => userId === teammateId && friendshipStatus === 2));

    if (targetUserId) {
      const targetUserDetails = await getUserDetailsRequest(targetUserId);
      const targetUserFriends = foundUsers
        .filter(({ id: userId }) => targetUserDetails.friends
          .some(({ id: targetTeammateId, friendshipStatus }) => userId === targetTeammateId && friendshipStatus === 2));

      setTeammates(targetUserFriends);
    }

    if (isCurrentURL('my-teammates')) setTeammates(loggedUserFriends);
    if (isCurrentURL('user_list') || isCurrentURL('search')) setTeammates(foundUsers);

  };

  if (isCurrentURL('home')) return (null);

  return (
    <>
      <InputGroup className='mb-3 search-bar-box'>
        <FormControl
          disabled={inputDisabled}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search teammates"
          onChange={e => setUserInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && search()}
        />
        <Button
          className='input-group-append'
          variant="dark"
          disabled={inputDisabled}
          onClick={search}
        >
          Search
        </Button>
      </InputGroup>
      <span className="filter-buttons-box">
        <h3 className='filter-by-text'>Filter by |</h3>
        <ToggleButton
          className='filter-btn theme-btn-style'
          variant="outline-dark"
          onClick={() => {
            const toggleClick = !usernameBtnClicked;
            setUsernameBtnClicked(toggleClick);
            if (usernameBtnClicked && !emailBtnClicked) {
              setInputDisabled(true);
            } else {
              setInputDisabled(false);
            }
          }}
          type="checkbox"
          checked={usernameBtnClicked}
        >Username
        </ToggleButton>
        <ToggleButton
          className='filter-btn theme-btn-style'
          variant="outline-dark"
          onClick={() => {
            const toggleClick = !emailBtnClicked;
            setEmailBtnClicked(toggleClick);
            if (!usernameBtnClicked && emailBtnClicked) {
              setInputDisabled(true);
            } else {
              setInputDisabled(false);
            }
          }}
          type="checkbox"
          checked={emailBtnClicked}
        >Email
        </ToggleButton>
      </span>
    </>
  );
};

SearchTeammates.propTypes = {
  setTeammates: PropTypes.func,
  targetUserId: PropTypes.string
};
export default SearchTeammates;
