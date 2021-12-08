import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './ConfirmBanUserModal.css';
import AppContext from '../../context/AppContext';
import { useContext, useState } from 'react';
import banUserRequest from '../../services/admin/ban-user-request';
import Form from 'react-bootstrap/Form';

const ConfirmBanUser = ({ userId, username, show, setShow }) => {

  const { toggleFriendship, setToggleFriendship } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [valid, setValid] = useState(false);

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate()+1);

  const handleClose = () => setShow(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = (event) => {
    const formEvent = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValid(true);

    if (formEvent.checkValidity()) {
      setValid(false);
      handleClose();
      banUserRequest(userId, form)
        .then(response => {
          console.log(response);
          handleClose();
          setToggleFriendship(!toggleFriendship);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <Modal className='modal-warning' show={show} onHide={handleClose} animation backdrop>
        <Modal.Header closeButton>
          <Modal.Title>{`Are you sure you want to ban ${username}?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} validated={valid} noValidate autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                required
                minLength={4}
                onChange={e => setField('reason', e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Invalid reason! Reason must be at least 4 characters long!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ban Until</Form.Label>
              <Form.Control
                type="date"
                required
                min={tomorrowDate.toISOString().split('T')[0]}
                onChange={e => setField('period', Date.parse(e.target.value))}
              />
              <Form.Control.Feedback type='invalid'>
                You must specify ban date!
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleClose}>
                No
              </Button>
              <Button type="submit" variant="outline-dark">
                Ban
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ConfirmBanUser.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func
};
export default ConfirmBanUser;
