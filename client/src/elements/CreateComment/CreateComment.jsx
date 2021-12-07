/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Avatar from '../Avatar/Avatax';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import './CreateComment.css';
import { useState } from 'react';
import { createCommentRequest } from '../../services/comments/create-comment-request';
import VideoEmbedPopover from '../VideoEmbedPopover/VideoEmbedPopover';
import { isYouTubeUrl } from '../../common/helpers';
import VideoEmbed from '../VideoEmbed/VideoEmbed';

const CreateComment = ({ user, post, createdComment, setCreatedComment }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;

    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const comment = async () => {
    try {
      await createCommentRequest(post.id, content, videoUrl, file);
      setContent(''); ;
      setImagePreview('');
      setFile('');
      setVideoUrl('');
      setCreatedComment(!createdComment);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="create-comment-box">
      <div className="comment-header-bar">
        <div className="user-details theme-text-style">
          <Avatar user={user} style={{ width: '5vh', height: '5vh' }} />
          <h6 className='author-username'>{user.username}</h6>
        </div>
        <div className="button-group theme-button-group-style">
          <VideoEmbedPopover videoUrl={videoUrl} setVideoUrl={setVideoUrl} imagePreview={imagePreview} />
          {isYouTubeUrl(videoUrl) ?
            <UploadFileButton
              buttonText={<i className="bi bi-image" />}
              buttonId="create-comment-upload-button"
              applyClass="upload-image-button-disabled"
            /> :
            <UploadFileButton
              applyClass="upload-image-button"
              buttonText={<i className="bi bi-image" />}
              buttonId={`post-${post.id}-upload-button`}
              onChange={(e) => handleFileChange(e)}
            />}
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
                setImagePreview('');
                setFile('');
              }}
            ><i className="bi bi-trash" />
            </Button>
          </div>}
        {isYouTubeUrl(videoUrl) &&
          <VideoEmbed videoUrl={videoUrl} embededVideoClass="embeded-video-create-comment" />}
        <Button
          className="comment-button, theme-btn-style"
          disabled={!content}
          variant="dark"
          onClick={() => comment()}
        >Comment
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
