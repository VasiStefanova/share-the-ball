/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';
import './SinglePost.css';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

const SinglePost = ({ post }) => {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className='post-container'>
        {post.author &&
          <div className='author-details'>
            <Avatar user={user} />
            <p id="username">{post.author.username}</p>
          </div>}
        <div className="post-content">
          <p>
            {post.content}
          </p>
          {post.picture &&
            <div className="post-image">
              <img src={`http://localhost:5000/${post.picture}`} style={{ maxWidth: '35vw', maxHeight: '35vh', marginBottom: '1vh' }} />
            </div>}
        </div>
        {post.author &&
          <div className="post-buttons">
            <Button variant="outline-dark" style={{ border: 'none' }}>Like</Button>
            <Button variant="outline-dark" style={{ border: 'none' }}>Comment</Button>
          </div>}
      </div>
    </>
  );
};


export default SinglePost;
