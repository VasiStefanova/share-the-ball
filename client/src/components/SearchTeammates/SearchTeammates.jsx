import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from 'react';
import './SearchTeammates.css';
import getUsersRequest from '../../services/users/get-users-request';
import PropTypes from 'prop-types';


const SearchTeammates = ({ setTeammates }) => {

  const [userInput, setUserInput] = useState('');
  const [usernameBtnClicked, setUsernameBtnClicked] = useState(true);
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);
  const [inputReadOnly, setInputReadOnly] = useState(false);

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

  return (
    <>
      <InputGroup className="mb-3 search-bar-box">
        <FormControl
          disabled={inputReadOnly}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search teammates"
          onChange={e => setUserInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && search()}
        />
        <Button
          className='input-group-append'
          variant="outline-dark"
          disabled={inputReadOnly}
          onClick={search}
        >
          Search
        </Button>
      </InputGroup>
      <span className='filter-buttons-box'>
        <h3>Filter by |</h3>
        <ToggleButton
          className='filter-btn'
          variant="outline-dark"
          onClick={() => {
            const toggleClick = !usernameBtnClicked;
            setUsernameBtnClicked(toggleClick);
            if (usernameBtnClicked && !emailBtnClicked) {
              setInputReadOnly(true);
            } else {
              setInputReadOnly(false);
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
              setInputReadOnly(true);
            } else {
              setInputReadOnly(false);
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
