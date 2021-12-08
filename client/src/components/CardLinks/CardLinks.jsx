import SingleCard from '../../elements/SingleCard/SingleCard';
import { useHistory } from 'react-router';
import './CardLinks.css';

const CardLinks = () => {
  const history = useHistory();

  return (
    <div className='card-links-box'>
      <SingleCard
        redirectFunc={() => history.push('/nba-news')}
        imgSrc="https://cdn.nba.com/manage/2020/11/GettyImages-458406138-scaled.jpg"
        history={history}
        title="News"
      />
      <SingleCard
        redirectFunc={() => history.push('/about-us')}
        imgSrc="/jordan-rodman-pippen.png"
        history={history}
        title="About Us"
      />
      <SingleCard
        redirectFunc={() => history.push('/search')}
        imgSrc="https://content.api.news/v3/images/bin/ea14cd233f701e6e29e7ba406203ada1"
        history={history}
        title="Find Teammates"
      />
    </div>
  );
};

export default CardLinks;
