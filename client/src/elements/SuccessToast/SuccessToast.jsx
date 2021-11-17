/* eslint-disable react/prop-types */
import Toast from 'react-bootstrap/Toast';

const SuccessToast = ({ header = '', body = '', showToast, setShowToast }) => {

  return (
    <>
      <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ display: 'grid', position: 'absolute' }}>
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body><strong className="me-auto">{body}</strong></Toast.Body>
      </Toast>
    </>
  );
};

export default SuccessToast;
