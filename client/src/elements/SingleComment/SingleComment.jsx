import './SingleComment.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { isCurrentURL } from '../../common/helpers';
import { Link } from 'react-router-dom';
import DeleteUserComment from '../../admin/DeleteUserComment/DeleteUserComment';
import UpdateUserComment from '../../admin/UpdateUserComment/UpdateUserComment';


const SingleComment = ({ comment, post }) => {
  const { user } = useContext(AppContext);
  const [updateCommentBtnClicked, setUpdateCommentBtnCLicked] = useState(false);

  return (
    updateCommentBtnClicked ?
      <UpdateUserComment
        post={post}
        comment={comment}
        user={comment.author}
      /> :
      <>
        <div className='comment-container'>
          <div className='comment-header'>
            <div className='author-details theme-text-style'>
              <Avatar user={comment.author} style={{ width: '5vh', height: '5vh' }} />
              <div className='comment-header-text'>
                <Link className="author-profile-link" to={`/user-profile/id=${comment.author.id}/posts`}>
                  <h6 className='author-username author-username-single-comment'>{comment.author.username}</h6>
                </Link>
                <p className="additional-author-info">{new Date(comment.updatedOn).toLocaleDateString('en-UK')}</p>
              </div>
            </div>
            {user.role === 2 && isCurrentURL('posts') &&
              <div className='admin-buttons-box-comments'>
                {/* Make new components for comments (identical to those for posts) and replace those for posts on next two lines. Use the same classes for the buttons! */}
                <DeleteUserComment commentId={comment.id} />
                <Button
                  className='admin-update-post-btn'
                  variant='outline-dark'
                  onClick={() => setUpdateCommentBtnCLicked(!updateCommentBtnClicked)}
                >
                  <i className="bi bi-pencil-fill" />
                </Button>
              </div>}
          </div>
          <div className="comment-content">
            <div className="comment-text theme-text-style">
              <h5>
                {comment.content}
              </h5>
            </div>
            {comment.picture &&
              <div className="comment-image-box">
                <img src={`http://localhost:5000/${comment.picture}`} className='comment-image' />
              </div>}
          </div>
          <div className="comment-buttons">
            <Button variant="outline-dark" className='comment-like-btn'>Like</Button>
            <h5 className='comment-likes-number'>{comment.likes.length !== 1 ? `${comment.likes.length} likes` : '1 like'}</h5>
          </div>
        </div>
      </>
  );
};

SingleComment.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object
};

export default SingleComment;

