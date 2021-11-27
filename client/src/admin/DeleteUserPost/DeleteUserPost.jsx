import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { deletePostRequest } from '../../services/posts/delete-post-request';
import './DeleteUserPost.css';

const DeleteUserPost = ({ postId, setRender }) => {

  const deletePost = () => {

    deletePostRequest(postId)
      .then(response => {
        setRender({});
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  return (
    <Button
      className='admin-delete-post-btn'
      variant='outline-dark'
      onClick={deletePost}
    >
      <i className="bi bi-trash-fill" />
    </Button>
  );
};

DeleteUserPost.propTypes = {
  postId: PropTypes.number,
  setRender: PropTypes.func
};
export default DeleteUserPost;
