import './ReactionsModal.css';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactedUserBox from '../ReactedUserBox/ReactedUserBox';

const ReactionsModal = ({ show, onHide, likeReactions, laughReactions, loveReactions }) => {
  const [activeReactions, setActiveReactions] = useState([]);
  const [activeTab, setActiveTab] = useState('likes');

  useEffect(() => {
    switch (activeTab) {
    case 'likes':
      setActiveReactions(likeReactions);
      break;
    case 'laughs':
      setActiveReactions(laughReactions);
      break;
    case 'hearts':
      setActiveReactions(loveReactions);
      break;
    }
  }, [activeTab]);

  useEffect(() => {
    setActiveReactions(likeReactions);
    setActiveTab('likes');
  }, [likeReactions, laughReactions, loveReactions]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='reactions-modal'
    >
      <Modal.Header className='reactions-modal-header' closeButton>
        <span className='reactions-tabs-bar'>
          <Button
            variant="outline-primary"
            size='md'
            className='like-reactions-tab'
            onClick={() => setActiveTab('likes')}
            active={activeTab === 'likes'}
          >
            <i className="bi bi-hand-thumbs-up-fill" /> Likes ({likeReactions.length})
          </Button>
          <Button
            variant="outline-warning"
            size='md'
            className='laugh-reactions-tab'
            onClick={() => setActiveTab('laughs')}
            active={activeTab === 'laughs'}
          >
            <i className="bi bi-emoji-laughing-fill" /> Laughs ({laughReactions.length})
          </Button>
          <Button
            variant="outline-danger"
            size='md'
            className='love-reactions-tab'
            onClick={() => setActiveTab('hearts')}
            active={activeTab === 'hearts'}
          >
            <i className="bi bi-heart-fill" /> Hearts ({loveReactions.length})
          </Button>
        </span>
      </Modal.Header>
      <Modal.Body className='reactions-modal-body'>
        <div className='reactedUsersContainer'>
          {activeReactions.map((reaction) => (
            <ReactedUserBox key={reaction.id} userId={reaction.id} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

ReactionsModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  likeReactions: PropTypes.array,
  laughReactions: PropTypes.array,
  loveReactions: PropTypes.array
};

export default ReactionsModal;
