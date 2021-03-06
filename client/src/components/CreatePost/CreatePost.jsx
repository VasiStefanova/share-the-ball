import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './CreatePost.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { createNewPostRequest } from '../../services/posts/create-new-post-request';
import UploadFileButton from '../../elements/UploadFileButton/UploadFileButton';
import VideoEmbedPopover from '../../elements/VideoEmbedPopover/VideoEmbedPopover';
import VideoEmbed from '../../elements/VideoEmbed/VideoEmbed';
import { isYouTubeUrl } from '../../common/helpers';

const CreatePost = () => {
  const { user, createdPost, setCreatedPost } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeButton, setActiveButton] = useState(1);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await createNewPostRequest(content, videoUrl, file, 0, 0, isPublic);
      setContent('');
      setCreatedPost(!createdPost);
      setImagePreview('');
      setFile('');
      setVideoUrl('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="create-post-box">
      <div className="post-header-bar">
        <div className="user-details">
          <Avatar user={user} style={{ width: '5vh', height: '5vh' }} />
          <h6 className='author-username'>{user.username}</h6>
        </div>
        <div className="button-group theme-button-group-style">
          <VideoEmbedPopover videoUrl={videoUrl} setVideoUrl={setVideoUrl} imagePreview={imagePreview} />
          {isYouTubeUrl(videoUrl) ?
            <UploadFileButton
              buttonText={<i className="bi bi-image" />}
              buttonId="create-post-upload-button"
              applyClass="upload-image-button-disabled"
            /> :
            <UploadFileButton
              buttonText={<i className="bi bi-image" />}
              buttonId="create-post-upload-button"
              onChange={(e) => handleFileChange(e)}
              applyClass="upload-image-button"
            />}
          <ToggleButtonGroup type="radio" name="options" defaultValue={2} style={{ display: 'flex' }}>
            <ToggleButton
              variant="outline-dark"
              type="radio"
              id="private-post-button"
              size="small"
              value={1}
              checked={activeButton === 1}
              onClick={(e) => {
                setActiveButton(e.currentTarget.value);
                setIsPublic(false);
              }}
            >
              Private
            </ToggleButton>
            <ToggleButton
              type="radio"
              id="public-post-button"
              variant="outline-dark"
              value={2}
              checked={activeButton === 2}
              onClick={(e) => {
                setActiveButton(e.currentTarget.value);
                setIsPublic(true);
              }}
            >
              Public
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="post-form">
        <Form>
          <Form.Group className="post-text-area">
            <Form.Control
              as="textarea" rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind..."
            />
          </Form.Group>
        </Form>
        {imagePreview &&
          <div className="image-preview-container">
            <img src={imagePreview} id="image-preview" />
            <Button
              className="remove-prievew-button theme-btn-style" variant="outline-dark" onClick={() => {
                setImagePreview('');
                setFile('');
              }}
            >
              <i className="bi bi-trash" />
            </Button>
          </div>}
        {isYouTubeUrl(videoUrl) &&
          <VideoEmbed videoUrl={videoUrl} embededVideoClass="embeded-video-create-post" />}
        <Button className="post-button theme-btn-style" variant="dark" onClick={createPost}>Post</Button>
      </div>
    </div>
  );
};

export default CreatePost;
