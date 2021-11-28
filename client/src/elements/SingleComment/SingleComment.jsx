/* eslint-disable react/prop-types */
import './SingleComment.css';
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import DeleteUserPost from '../../admin/DeleteUserPost/DeleteUserPost';
import UpdateUserPost from '../../admin/UpdateUserPost/UpdateUserPost';
import { isCurrentURL } from '../../common/helpers';


const SingleComment = ({ comment }) => {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className='comment-container'>
        <div className='comment-header'>
          <div className='author-details theme-text-style'>
            <Avatar user={comment.author} style={{ maxWidth: '5vh' }} />
            <h6 className='author-username'>{comment.author.username}</h6>
          </div>
          {user.role === 2 && isCurrentURL('posts') &&
            <div className='admin-buttons-box-comments'>
              {/* Make new components for comments (identical to those for posts) and replace those for posts on next two lines. Use the same classes for the buttons! */}
              <DeleteUserPost postId={comment.id} setRender={null} />
              <UpdateUserPost postId={comment.id} showUpdatePostsObj={null} setShowUpdatePostsObj={null} />
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


export default SingleComment;

