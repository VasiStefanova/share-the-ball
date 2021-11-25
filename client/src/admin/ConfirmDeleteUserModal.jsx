import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import deleteUserRequest from '../services/admin/delete-user-request';
import PropTypes from 'prop-types';


const ConfirmDeleteUser = ({ userId, username, show, setShow }) => {

  const handleClose = () => setShow(false);

  const deleteUser = (id) => {

    deleteUserRequest(id)
      .then(response => {
        console.log(response);
        setShow(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>`Are you sure you want to delete ${username}!`</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => deleteUser(userId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ConfirmDeleteUser.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func
};
export default ConfirmDeleteUser;
