/* eslint-disable react/prop-types */
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import './SinglePost.css';

const SinglePost = ({ post }) => {

  return (
    <>
      <div className='postContainer'>
        {post.author &&
          <Figure className='postImage'>
            <Figure.Image
              src={`http://localhost:5000/${post.author.avatar}`}
              roundedCircle
              width={50}
              height={50}
            />
            <div className='postUsername'>
              {post.author.username}
            </div>
          </Figure>}
        <div className="postContent">
          <p>
            {post.content}
          </p>
        </div>
        {post.author &&
          <div className="postButtons">
            <Button variant="outline-dark" style={{ border: 'none' }}>Like</Button>
            <Button variant="outline-dark" style={{ border: 'none' }}>Comment</Button>
          </div>}
      </div>
    </>
  );
};


export default SinglePost;
