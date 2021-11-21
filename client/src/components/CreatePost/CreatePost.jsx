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

const CreatePost = () => {
  const { user, createdPost, setCreatedPost } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await createNewPostRequest(content, '', file, 0, 0, isPublic);
      setContent('');
      setCreatedPost(!createdPost);
      setImagePreview('');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="create-post-box">
      <div className="post-header-bar">
        <div className="user-details">
          <Avatar user={user} />
          <p id="username">{user.username}</p>
        </div>
        <div className="button-group">
          <UploadFileButton buttonText={<i className="bi bi-image" />} onChange={(e) => handleFileChange(e)} />
          <ToggleButtonGroup type="radio" name="options" defaultValue={1} style={{ display: 'flex' }}>
            <ToggleButton id="privatePostBtn" variant="outline-dark" size="small" value={1} onClick={() => setIsPublic(false)}>
              Private
            </ToggleButton>
            <ToggleButton id="publicPostBtn" variant="outline-dark" value={2} onClick={() => setIsPublic(true)}>
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
          <div className="image-preview">
            <img src={imagePreview} style={{ maxWidth: '30vw', maxHeight: '30vh' }} />
          </div>}
        <Button id="post-button" variant="dark" onClick={(e) => createPost(e)}>Post</Button>
      </div>
    </div>
  );
};


export default CreatePost;
