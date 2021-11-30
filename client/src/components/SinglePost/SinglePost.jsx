import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Avatar from '../../elements/Avatar/Avatax';
import './SinglePost.css';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import CommentsAccordion from '../CommentsAccordion/CommentsAccordion';
import { Link } from 'react-router-dom';
import DeleteUserPost from '../../admin/DeleteUserPost/DeleteUserPost';
import UpdateUserPost from '../../admin/UpdateUserPost/UpdateUserPost';
import Reactions from '../../components/Reactions/Reactions';

const SinglePost = ({ post, setRender }) => {
  const { user } = useContext(AppContext);
  const [updatePostBtnClicked, setUpdatePostBtnCLicked] = useState(false);


  return (
    updatePostBtnClicked ?
      <UpdateUserPost post={post} setRender={setRender} /> :
      <>
        <div className='post-container theme-border-style'>
          {post.author &&
            <div className="single-post-header-bar">
              <Avatar user={post.author} style={{ width: '5vh', height: '5vh' }} />
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
              <Reactions postId={post.id} />
            </div>}
          {post.author &&
            <div className="comments-box">
              <CommentsAccordion user={user} post={post} />
            </div>}
          {user.role === 2 &&
            <div className='admin-buttons-box'>
              <DeleteUserPost postId={post.id} setRender={setRender} />
              <Button
                className='admin-update-post-btn'
                variant='outline-dark'
                onClick={() => setUpdatePostBtnCLicked(!updatePostBtnClicked)}
              >
                <i className="bi bi-pencil-fill" />
              </Button>
            </div>}
        </div>
      </>
  );
};

SinglePost.propTypes = {
  post: PropTypes.object,
  setRender: PropTypes.func
};

export default SinglePost;
