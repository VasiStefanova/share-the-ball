import PropTypes from 'prop-types';
import { deleteCommentRequest } from '../../services/comments/delete-comment-request';
import Button from 'react-bootstrap/Button';

const DeleteUserComment = ({ commentId, createdComment, setCreatedComment }) => {

  const deleteComment = () => {

    deleteCommentRequest(commentId)
      .then(response => {
        console.log(response);
        setCreatedComment(!createdComment);
      })
      .catch(err => console.error(err));
  };

  return (
    <Button
      className='admin-delete-comment-btn'
      variant='outline-dark'
      onClick={deleteComment}
    >
      <i className="bi bi-trash-fill" />
    </Button>
  );
};

DeleteUserComment.propTypes = {
  commentId: PropTypes.number,
  createdComment: PropTypes.bool,
  setCreatedComment: PropTypes.func
};

export default DeleteUserComment;
