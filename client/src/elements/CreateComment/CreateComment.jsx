/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Avatar from '../Avatar/Avatax';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import './CreateComment.css';
import { useState } from 'react';
import { createCommentRequest } from '../../services/comments/create-comment-request';

const CreateComment = ({ user, post, createdComment, setCreatedComment }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const comment = async () => {
    try {
      await createCommentRequest(post.id, content, '', file);
      setContent(''); ;
      setImagePreview('');
      setFile('');
      setCreatedComment(!createdComment);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="create-comment-box">
      <div className="comment-header-bar">
        <div className="user-details theme-text-style">
          <Avatar user={user} style={{ maxWidth: '5vh' }} />
          <h6 className='author-username'>{user.username}</h6>
        </div>
        <div className="comment-button-group">
          {/* embed button will be added here in the future */}
          <UploadFileButton
            buttonText={<i className="bi bi-image" />}
            buttonId={`post-${post.id}-upload-button`}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      </div>
      <div className="comment-form">
        <Form>
          <Form.Group className="comment-text-area">
            <Form.Control
              as="textarea" rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Comment...."
            />
          </Form.Group>
        </Form>
        {imagePreview &&
          <div className="image-preview-container">
            <img src={imagePreview} id="image-preview" />
            <Button
              id="remove-prievew-button" variant="outline-dark" onClick={() => {
                setImagePreview(false);
                setFile('');
              }}
            ><i className="bi bi-trash" />
            </Button>
          </div>}
        <Button id="comment-button" variant="dark" onClick={() => comment()}>Comment</Button>
      </div>
    </div>
  );
};

export default CreateComment;
