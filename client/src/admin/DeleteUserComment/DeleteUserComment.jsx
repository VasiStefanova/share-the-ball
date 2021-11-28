import PropTypes from 'prop-types';
import { deleteCommentRequest } from '../../services/comments/delete-comment-request';
import Button from 'react-bootstrap/Button';

const DeleteUserComment = ({ commentId }) => {

  const deleteComment = () => {
    // to be completed after talk with trainers

    // deleteCommentRequest(commentId)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.error(err));
  };

  return (
    <Button
      className='admin-delete-post-btn'
      variant='outline-dark'
      onClick={deleteComment}
    >
      <i className="bi bi-trash-fill" />
    </Button>
  );
};

DeleteUserComment.propTypes = {
  commentId: PropTypes.number,
};

export default DeleteUserComment;
