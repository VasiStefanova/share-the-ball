import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const UpdateUserPost = ({ postId, showUpdatePostsObj, setShowUpdatePostsObj }) => {

  return (
    <Button
      className='admin-delete-post-btn'
      variant='outline-dark'
      onClick={() => {
        showUpdatePostsObj[postId] = !showUpdatePostsObj[postId];
        setShowUpdatePostsObj({ ...showUpdatePostsObj });
      }}
    >
      <i className="bi bi-pencil-fill" />
    </Button>
  );
};

UpdateUserPost.propTypes = {
  postId: PropTypes.number,
  showUpdatePostsObj: PropTypes.object,
  setShowUpdatePostsObj: PropTypes.func
};
export default UpdateUserPost;
