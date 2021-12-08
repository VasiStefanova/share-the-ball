import './Reactions.css';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { reactToPostRequest } from '../../services/posts/react-to-post-request';
import { reactToCommentRequest } from '../../services/comments/react-to-comment-request';
import { hasUserReacted } from '../../common/helpers';
import { getSinglePostRequest } from '../../services/posts/get-single-post-request';
import Button from 'react-bootstrap/Button';
import ReactionsModal from '../../elements/ReactionsModal/ReactionsModal';

const Reactions = ({ postId, commentId }) => {
  const { user } = useContext(AppContext);
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(false);
  const [likeReactions, setLikeReactions] = useState([]);
  const [laughReactions, setLaughReactions] = useState([]);
  const [loveReactions, setLoveReactions] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const targetId = commentId? commentId : postId;

  const getReactions = (contentId) => {
    if (commentId) {
      getSinglePostRequest(postId)
        .then(post => post.comments.find(comment => comment.id === contentId))
        .then(comment => setReactions(comment.likes.filter(like => like.reaction < 4)))
        .catch(console.error);
    } else {
      getSinglePostRequest(postId)
        .then(post => setReactions(post.likes.filter(like => like.reaction < 4)))
        .catch(console.error);
    }
  };

  const reactWithLike = (contentId) => {
    if (commentId) {
      reactToCommentRequest(contentId, 1)
        .then(() => setUserReaction(true))
        .catch(console.error);
    } else {
      reactToPostRequest(contentId, 1)
        .then(() => setUserReaction(true))
        .catch(console.error);
    }
  };

  const reactWithLaugh = (contentId) => {
    if (commentId) {
      reactToCommentRequest(contentId, 2)
        .then(() => setUserReaction(true))
        .catch(console.error);
    } else {
      reactToPostRequest(contentId, 2)
        .then(() => setUserReaction(true))
        .catch(console.error);
    }
  };

  const reactWithLove = (contentId) => {
    if (commentId) {
      reactToCommentRequest(contentId, 3)
        .then(() => setUserReaction(true))
        .catch(console.error);
    } else {
      reactToPostRequest(contentId, 3)
        .then(() => setUserReaction(true))
        .catch(console.error);
    }

  };

  const takeBackReaction = (contentId) => {
    if (commentId) {
      reactToCommentRequest(contentId, 4)
        .then(() => setUserReaction(false))
        .catch(console.error);
    } else {
      reactToPostRequest(contentId, 4)
        .then(() => setUserReaction(false))
        .catch(console.error);
    }
  };

  useEffect(() => {
    getReactions(targetId);
  }, [userReaction]);

  useEffect(() => {
    setUserReaction(hasUserReacted(reactions, user.username));
    setLikeReactions(reactions.filter(r => r.reaction === 1));
    setLaughReactions(reactions.filter(r => r.reaction === 2));
    setLoveReactions(reactions.filter(r => r.reaction === 3));
  }, [reactions]);

  return (
    <span className='reactions-bar'>
      <span className='reaction-icons-box'>
        {userReaction?
          <Button
            variant="outline-light"
            size='sm'
            className='take-back-reaction-btn'
            onClick={() => takeBackReaction(targetId)}
            // onMouseDown={() => takeBackReaction(targetId)}
          >
            Take it back!
          </Button> :
          <>
            <Button
              variant="outline-primary"
              size='sm'
              className='like-reaction-btn'
              onClick={() => reactWithLike(targetId)}
            >
              <i className="bi bi-hand-thumbs-up-fill" />
            </Button>
            <Button
              variant="outline-warning"
              size='sm'
              className='laugh-reaction-btn'
              onClick={() => reactWithLaugh(targetId)}
            >
              <i className="bi bi-emoji-laughing-fill" />
            </Button>
            <Button
              variant="outline-danger"
              size='sm'
              className='love-reaction-btn'
              onClick={() => reactWithLove(targetId)}
            >
              <i className="bi bi-heart-fill" />
            </Button>
          </>}
      </span>
      <>
        <Button variant="dark" size='sm' className='all-reactions-btn' onClick={() => setModalShow(true)}>
          Reactions ({reactions.length})
        </Button>
        <ReactionsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          likeReactions={likeReactions}
          laughReactions={laughReactions}
          loveReactions={loveReactions}
        />
      </>
    </span>
  );
};

Reactions.propTypes = {
  postId: PropTypes.number,
  commentId: PropTypes.number
};

export default Reactions;
