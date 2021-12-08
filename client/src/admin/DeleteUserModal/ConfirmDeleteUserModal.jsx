import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import deleteUserRequest from '../../services/admin/delete-user-request';
import PropTypes from 'prop-types';
import './ConfirmDeleteUserModal.css';
import AppContext from '../../context/AppContext';
import { useContext } from 'react';

const ConfirmDeleteUser = ({ userId, username, show, setShow }) => {

  const { toggleFriendship, setToggleFriendship } = useContext(AppContext);

  const handleClose = () => setShow(false);

  const deleteUser = () => {

    deleteUserRequest(userId)
      .then(response => {
        console.log(response);
        setShow(false);
        setToggleFriendship(!toggleFriendship);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Modal className='modal-warning' show={show} onHide={handleClose} animation backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${username}?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            No
          </Button>
          <Button variant="outline-dark" onClick={deleteUser}>
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
