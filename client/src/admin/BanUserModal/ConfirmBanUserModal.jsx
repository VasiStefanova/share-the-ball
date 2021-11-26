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

  const banUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValid(!valid);
    banUserRequest(userId, form)
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
          <Modal.Title>{`Are you sure you want to ban ${username}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={banUser} validated={valid} noValidate autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                required
                minLength={5}
                maxLength={50}
                onChange={e => setField('reason', e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Invalid reason! Reason must be at least 4 charcters long!
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
                Invalid description! Description must be between 5-50 charcters long!
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={banUser}>
            Ban
          </Button>
        </Modal.Footer>
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
