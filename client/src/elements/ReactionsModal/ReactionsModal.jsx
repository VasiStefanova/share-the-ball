import './ReactionsModal.css';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ReactionsModal = ({ show, onHide, likeReactions, laughReactions, loveReactions }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

ReactionsModal.propTypes = {
  show: PropTypes.func,
  onHide: PropTypes.func,
  likeReactions: PropTypes.array,
  laughReactions: PropTypes.array,
  loveReactions: PropTypes.array
};

export default ReactionsModal;
