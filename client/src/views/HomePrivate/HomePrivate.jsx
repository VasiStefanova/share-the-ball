import './HomePrivate.css';
import NBAStandingsFeed from '../../components/NBAStandingsFeed/NBAStandingsFeed';

const HomePrivate = () => {
  return (
    <div className='homePrivateContainer'>
      <div className='homePrivateLeft'>
        <NBAStandingsFeed />
      </div>
      <div className='homePrivateCenter'>
        <h3>Center</h3>
      </div>
      <div className='homePrivateRight'>
        <h3>Right</h3>
      </div>
    </div>
  );
};

export default HomePrivate;
