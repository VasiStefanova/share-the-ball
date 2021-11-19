import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './CreatePost.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { createNewPostRequest } from '../../services/posts/create-new-post-request';

const CreatePost = () => {
  const { user } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await createNewPostRequest(content, '', 0, 0, isPublic.toString());
      setContent('');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="createPostBox">
      <div className="headerBar">
        <div className="userDetails">
          <Avatar user={user} />
          <p id="username">{user.username}</p>
        </div>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} style={{ display: 'flex' }}>
          <ToggleButton id="privatePostBtn" variant="outline-dark" size="small" value={1} onClick={() => setIsPublic(false)}>
            Private post
          </ToggleButton>
          <ToggleButton id="publicPostBtn" variant="outline-dark" value={2} onClick={() => setIsPublic(true)}>
            Public post
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="textArea">
        <Form>
          <Form.Group className="postTextArea">
            <Form.Control
              as="textarea" rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind..."
            />
          </Form.Group>
          <Button id="postButton" variant="dark" onClick={(e) => createPost(e)}>Post</Button>
        </Form>
      </div>
    </div>
  );
};


export default CreatePost;
