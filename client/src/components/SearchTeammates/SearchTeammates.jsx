import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from 'react';
import './SearchTeammates.css';
import getUsersRequest from '../../services/users/get-users-request';


const SearchTeammates = () => {

  const [userInput, setUserInput] = useState('');
  const [usernameBtnClicked, setUsernameBtnClicked] = useState(true);
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);
  const [inputReadOnly, setInputReadOnly] = useState(false);

  const Search = async () => {
    const searchQueries = {};
    if (usernameBtnClicked) {
      searchQueries.name=`${userInput}`;
    }

    if (emailBtnClicked) {
      searchQueries.email=`${userInput}`;
    }

    const filteredUsers = await getUsersRequest(searchQueries);
    console.log(filteredUsers);

  };

  return (
    <>
      <InputGroup className="mb-3 search-bar">
        <FormControl
          disabled={inputReadOnly}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search teammates"
          onChange={e => setUserInput(e.target.value)}
        />
        <Button
          className='input-group-append'
          variant="outline-dark"
          disabled={inputReadOnly}
          onClick={Search}
        >
          Search
        </Button>
      </InputGroup>
      <span>
        <p>Filter by |</p>
      </span>
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
    </>
  );
};

export default SearchTeammates;
