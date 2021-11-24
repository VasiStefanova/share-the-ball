/* eslint-disable react/prop-types */
import './SingleComment.css';
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';


const SingleComment = ({ comment }) => {

  return (
    <>
      <div className='comment-container'>
        <div className='author-details theme-text-style'>
          <Avatar user={comment.author} />
          <h6 className='comment-author-username'>{comment.author.username}</h6>
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
          <Button variant="outline-dark" style={{ border: 'none' }}>Like</Button>
        </div>
      </div>
    </>
  );
};


export default SingleComment;

