import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Avatar from '../../elements/Avatar/Avatax';
import './SinglePost.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import CommentsAccordion from '../CommentsAccordion/CommentsAccordion';
import { Link } from 'react-router-dom';
import DeleteUserPost from '../../admin/DeleteUserPost/DeleteUserPost';
import UpdateUserPost from '../../admin/UpdateUserPost/UpdateUserPost';
import Reactions from '../../components/Reactions/Reactions';
import VideoEmbed from '../../elements/VideoEmbed/VideoEmbed';
import { isYouTubeUrl } from '../../common/helpers';
import { SERVER_URL, USER_ROLES } from '../../common/constants';

const SinglePost = ({ post, setRender }) => {
  const { user } = useContext(AppContext);
  const [updatePostBtnClicked, setUpdatePostBtnCLicked] = useState(false);

  // The next few lines are for example purposes. We have a way to translate coordinates to a city,
  // but it is paid after a certain amount of requests
  const cities = ['Sofia, Bulgaria', 'Ruse, Bulgaria', 'Plovdiv, Bulgaria'];
  const [location, setLocation] = useState('');

  useEffect(() => {
    const index = Math.floor(Math.random() * 3);
    setLocation(cities[index]);
  }, []);

  return (
    updatePostBtnClicked ?
      <UpdateUserPost post={post} setRender={setRender} /> :
      <>
        <div className='post-container theme-border-style theme-background-color'>
          {post.author &&
            <div className="single-post-header-bar">
              <Avatar user={post.author} style={{ width: '5vh', height: '5vh' }} />
              <div className="single-post-headar-bar-text">
                <Link className="author-profile-link" to={`/user-profile/id=${post.author.id}/posts`}>
                  <h6 className='author-username author-username-single-post'>{post.author.username}</h6>
                </Link>
                {/* Here you can set what location is shown in posts for example purposes. */}
                <p className="additional-author-info">{`${new Date(post.updatedOn).toLocaleDateString('en-UK')} - ${location}`}</p>
              </div>
            </div>}
          <div className="post-content theme-text-style">
            <h5 className='post-text'>
              {post.content}
            </h5>
            {post.picture &&
              <div className="post-image-box">
                <img src={`${SERVER_URL}/${post.picture}`} className='post-image' />
              </div>}
            {isYouTubeUrl(post.embed) &&
              <VideoEmbed videoUrl={post.embed} embededVideoClass="embeded-video-single-post" />}
          </div>
          {post.author &&
            <div className="post-buttons">
              <Reactions postId={post.id} />
            </div>}
          {post.author &&
            <div className="comments-box">
              <CommentsAccordion user={user} post={post} />
            </div>}
          {user.role === USER_ROLES.admin &&
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
