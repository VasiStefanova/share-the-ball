/* eslint-disable react/prop-types */
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import './SinglePost.css';

const SinglePost = ({ post }) => {

  return (
    <>
      <div className='post-container'>
        {post.author &&
          <Figure className='user-avatar'>
            <Figure.Image
              src={`http://localhost:5000/${post.author.avatar}`}
              roundedCircle
              width={50}
              height={50}
            />
            <div className='post-username'>
              {post.author.username}
            </div>
          </Figure>}
        <div className="post-content">
          <p>
            {post.content}
          </p>
          {post.picture &&
            <div className="post-image">
              <img src={`http://localhost:5000/${post.picture}`} style={{ maxWidth: '35vw', maxHeight: '35vh', marginBottom: '1vh' }} />
            </div>}
        </div>
        {post.author &&
          <div className="post-buttons">
            <Button variant="outline-dark" style={{ border: 'none' }}>Like</Button>
            <Button variant="outline-dark" style={{ border: 'none' }}>Comment</Button>
          </div>}
      </div>
    </>
  );
};


export default SinglePost;
