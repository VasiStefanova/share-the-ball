import SingleCard from '../../elements/SingleCard/SingleCard';
import { useHistory } from 'react-router';
import './CardLinks.css';


const CardLinks = () => {
  const history = useHistory();

  return (
    <div className='card-links-box'>
      <SingleCard
        redirectFunc={() => history.push('/search')}
        imgSrc="https://content.api.news/v3/images/bin/ea14cd233f701e6e29e7ba406203ada1"
        history={history}
        title="Find Teammates"
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

    </div>
  );

};

export default CardLinks;
