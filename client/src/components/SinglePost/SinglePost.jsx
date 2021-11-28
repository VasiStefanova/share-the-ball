/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Avatar from '../../elements/Avatar/Avatax';
import './SinglePost.css';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import CommentsAccordion from '../CommentsAccordion/CommentsAccordion';
import { Link } from 'react-router-dom';

const SinglePost = ({ post }) => {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className='post-container theme-border-style'>
        {post.author &&
          <div className="single-post-header-bar">
            <Avatar user={post.author} style={{ maxWidth: '5vh' }} />
            <div className="single-post-headar-bar-text">
              <Link className="author-profile-link" to={`/user-profile/id=${post.author.id}/posts`}>
                <h6 className='author-username author-username-single-post'>{post.author.username}</h6>
              </Link>
              <p className="additional-author-info">{new Date(post.updatedOn).toLocaleDateString('en-UK')}</p>
            </div>
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
            <Button variant="outline-dark" className='post-like-btn'>Like</Button>
            <h5 className='post-likes-number'>{post.likes.length !== 1 ? `${post.likes.length} likes` : '1 like'}</h5>
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
