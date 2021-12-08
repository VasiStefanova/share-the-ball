import './NotificationModal.css';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getSinglePostRequest } from '../../services/posts/get-single-post-request';
import SingleComment from '../SingleComment/SingleComment';
import SinglePost from '../../components/SinglePost/SinglePost';

const NotificationModal = ({ show, onHide, notification }) => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({});

  useEffect(() => {
    getSinglePostRequest(notification.postId)
      .then(targetPost => setPost(targetPost))
      .catch(console.error);

    if (notification.content) {
      setComment(notification);
    }
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='notification-modal'
    >
      <Modal.Body className='notification-modal-body'>
        {comment.content &&
          <>
            <h3 className='modal-text-style'>New comment:</h3>
            <SingleComment post={post} comment={comment} />
          </>}
        <h3 className='modal-text-style'>Your post:</h3>
        <SinglePost post={post} />
      </Modal.Body>
    </Modal>
  );
};

NotificationModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  notification: PropTypes.object
};

export default NotificationModal;
