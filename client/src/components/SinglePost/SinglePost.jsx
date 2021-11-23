/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';
import './SinglePost.css';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import CommentsAccordion from '../CommentsAccordion/CommentsAccordion';

const SinglePost = ({ post }) => {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className='post-container theme-border-style'>
        {post.author &&
          <div className='author-details'>
            <Avatar user={post.author} />
            <h6 className='author-username'>{post.author.username}</h6>
          </div>}
        <div className="post-content theme-text-style">
          <h5 className='post-text'>
            {post.content}
          </h5>
          {post.picture &&
            <div className="post-image-box">
              <img src={`http://localhost:5000/${post.picture}`} className='post-image' />
            </div>}
        </div>
        {post.author &&
          <div className="post-buttons">
            <Button variant="outline-dark" style={{ border: 'none' }}>Like</Button>
          </div>}
        {post.author &&
          <div className="comments-box">
            <CommentsAccordion user={user} post={post} />
          </div>}
      </div>
    </>
  );
};


export default SinglePost;
