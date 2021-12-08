import './SingleComment.css';
import PropTypes from 'prop-types';
import Avatar from '../../elements/Avatar/Avatax';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { isCurrentURL } from '../../common/helpers';
import { Link } from 'react-router-dom';
import DeleteUserComment from '../../admin/DeleteUserComment/DeleteUserComment';
import Reactions from '../../components/Reactions/Reactions';
import VideoEmbed from '../VideoEmbed/VideoEmbed';
import { SERVER_URL, USER_ROLES } from '../../common/constants';

const SingleComment = ({ post, comment, createdComment, setCreatedComment }) => {
  const { user } = useContext(AppContext);

  return (
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
          {user.role === USER_ROLES.admin && isCurrentURL('posts') &&
            <div className='admin-buttons-box-comments'>
              <DeleteUserComment createdComment={createdComment} setCreatedComment={setCreatedComment} commentId={comment.id} />
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
              <img src={`${SERVER_URL}/${comment.picture}`} className='comment-image' />
            </div>}
          {comment.embed &&
            <VideoEmbed videoUrl={comment.embed} embededVideoClass="embeded-video-single-comment" />}
        </div>
        <div className="comment-buttons">
          <Reactions postId={post.id} commentId={comment.id} />
        </div>
      </div>
    </>
  );
};

SingleComment.propTypes = {
  post: PropTypes.object,
  comment: PropTypes.object,
  createdComment: PropTypes.bool,
  setCreatedComment: PropTypes.func
};

export default SingleComment;
