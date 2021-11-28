import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Avatar from '../../elements/Avatar/Avatax';
import { useState } from 'react';
import UploadFileButton from '../../elements/UploadFileButton/UploadFileButton';
import PropTypes from 'prop-types';
import { editPostRequest } from '../../services/posts/edit-post-request';
import { SERVER_URL } from '../../common/constants';

const UpdateUserPost = ({ post, setRender }) => {
  const [content, setContent] = useState(post.content);
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(post.picture ? `${SERVER_URL}/${post.picture}` : null);
  const [activeButton, setActiveButton] = useState(1);
  const [checkedDisabledBtn, setCheckedDisabledBtn] = useState(false);


  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setCheckedDisabledBtn(false);
  };

  const updatePost = async (e) => {
    e.preventDefault();

    editPostRequest(post.id, content, file, '', 0, 0, isPublic)
      .then(()=> {
        setRender({});
      })
      .catch(err => console.error(err));
  };


  return (
    <div className="create-post-box theme-border-style">
      <div className="post-header-bar">
        <div className="user-details">
          <Avatar user={post.author} style={{ maxWidth: '5vh' }} />
          <h6 className='author-username'>{post.author.username}</h6>
        </div>
        <div className="button-group theme-button-group-style">
          <UploadFileButton buttonText={<i className="bi bi-image" />} buttonId="create-post-upload-button" onChange={(e) => handleFileChange(e)} />
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
              id="remove-prievew-button" variant="outline-dark" onClick={() => {
                setImagePreview(false);
                setFile('');
                if (post?.picture) {
                  setCheckedDisabledBtn(true);
                }
              }}
            >
              <i className="bi bi-trash" />
            </Button>
          </div>}
        <Button disabled={checkedDisabledBtn} id="post-button" variant="dark" onClick={updatePost}>Update</Button>
      </div>
    </div>
  );
};

UpdateUserPost.propTypes = {
  post: PropTypes.object,
  setRender: PropTypes.func
};

export default UpdateUserPost;
