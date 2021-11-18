import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import defaultAvatar from './default-avatar.png';
import defaultImg from './default-image.jpg';
import Button from 'react-bootstrap/Button';
import './SinglePost.css';

export const SinglePost = () => {

  return (
    <>
      <Container className='single-post'>
        <Figure className='single-post-image'>
          <Figure.Image
            src={defaultAvatar}
            roundedCircle
            width={50}
            height={50}
          />
          <span className='single-post-username'>
            Username
          </span>
        </Figure>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque sapiente velit atque sint at eos facere, quaerat quia,
            nam asperiores voluptatem reprehenderit ipsum, id explicabo qui ducimus?
            Deserunt, iste officiis.
          </p>
        </div>
        <Button className="single-post-button" variant="outline-dark">Like</Button>
        <Button className="single-post-button" variant="outline-dark">Comment</Button>
      </Container>

      <Container className='single-post'>
        <Figure className='single-post-image'>
          <Figure.Image
            src={defaultAvatar}
            roundedCircle
            width={50}
            height={50}
          />
          <span className='single-post-username'>
            Username
          </span>
        </Figure>
        <div>
          <Figure.Image
            src={defaultImg}
            rounded
          />
        </div>
        <Button className="single-post-button" variant="outline-dark">Like</Button>
        <Button className="single-post-button" variant="outline-dark">Comment</Button>
      </Container>
    </>
  );
};


export default SinglePost;
