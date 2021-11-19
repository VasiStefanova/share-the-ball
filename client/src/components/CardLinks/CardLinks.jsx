import SingleCard from './SingleCard';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';


const CardLinks = ({ history }) => {

  return (
    <Container>
      <SingleCard
        redirectFunc={() => history.push('/home')}
        imgSrc="https://content.api.news/v3/images/bin/ea14cd233f701e6e29e7ba406203ada1"
        history={history}
        title="Players"
      />
      <SingleCard
        redirectFunc={() => history.push('/home')}
        imgSrc="https://media.newyorker.com/photos/5f472a24704116b9739daa94/master/pass/Cunningham-MilwaukeeBucks.jpg"
        history={history}
        title="Places"
      />
      <SingleCard
        redirectFunc={() => history.push('/home')}
        imgSrc="https://cdn.nba.com/manage/2020/11/GettyImages-458406138-scaled.jpg"
        history={history}
        title="News"
      />
    </Container>
  );

};

CardLinks.propTypes = {
  history: PropTypes.object,
};
export default CardLinks;
