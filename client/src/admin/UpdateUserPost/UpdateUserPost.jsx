import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const UpdateUserPost = ({ postId, showUpdatePostsObj, setShowUpdatePostsObj }) => {
  const [btnActive, setBtnActive] = useState(false);

  return (
    <Button
      className='admin-delete-post-btn'
      variant='outline-dark'
      active={btnActive}
      onClick={() => {
        showUpdatePostsObj[postId] = !showUpdatePostsObj[postId];
        setShowUpdatePostsObj({ ...showUpdatePostsObj });
        setBtnActive(!btnActive);
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
