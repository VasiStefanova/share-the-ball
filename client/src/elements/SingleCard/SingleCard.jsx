import Card from 'react-bootstrap/Card';
import './SingleCard.css';
import PropTypes from 'prop-types';

const SingleCard = ({ redirectFunc, title, imgSrc }) => {

  return (
    <Card className='card-style'>
      <div className='img-wrapper'>
        <Card.Img
          onClick={redirectFunc}
          className='cover-image'
          variant="top" src={imgSrc}
        />
      </div>
      <Card.Body>
        <Card.Title className='card-title' onClick={() => console.log('img')}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

SingleCard.propTypes = {
  redirectFunc: PropTypes.func,
  title: PropTypes.string,
  imgSrc: PropTypes.string
};

export default SingleCard;
