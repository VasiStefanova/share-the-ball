/* eslint-disable no-shadow */
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from 'react';
import './SearchTeammates.css';
import getUsersRequest from '../../services/users/get-users-request';
import PropTypes from 'prop-types';
import { isCurrentURL } from '../../common/helpers';

const SearchTeammates = ({ setTeammates }) => {

  const [userInput, setUserInput] = useState('');
  const [usernameBtnClicked, setUsernameBtnClicked] = useState(true);
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const search = async () => {
    const searchQueries = {};
    if (usernameBtnClicked) {
      searchQueries.name=`${userInput}`;
    }

    if (emailBtnClicked) {
      searchQueries.email=`${userInput}`;
    }

    const filteredUsers = await getUsersRequest(searchQueries);
    setTeammates(filteredUsers);
    console.log(filteredUsers);
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
      <span className={isCurrentURL('home') ? 'filter-buttons-box-home' : 'filter-buttons-box'}>
        <h3>Filter by |</h3>
        <ToggleButton
          className='filter-btn'
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
        >username
        </ToggleButton>
        <ToggleButton
          className='filter-btn'
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
        >email
        </ToggleButton>
      </span>
    </>
  );
};

SearchTeammates.propTypes = {
  setTeammates: PropTypes.func,
};
export default SearchTeammates;
