import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import SingleUser from './SingleUser';
import './ShowAllUsers.css';
import getUsersRequest from '../services/users/get-users-request';

const ShowAllUsers = () => {

  const [users, setUsers] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {

    getUsersRequest()
      .then(response => setUsers(response))
      .catch(err => console.error(err));

  }, [render]);

  return (
    <>
      {users.length ?
        <Table className='users-table' striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>user Id</th>
              <th>username</th>
              <th>avatar</th>
              <th>role</th>
              <th>ban status</th>
              <th>deleted</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <SingleUser
                setRender={setRender}
                key={user.id}
                userId={user.id}
                username={user.username}
                avatar={user.avatar}
                role={user.role}
              />)}
          </tbody>
        </Table> :
        <div>
          No users!
        </div>}
    </>
  );
};

export default ShowAllUsers;
