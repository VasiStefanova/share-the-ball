import './HomePrivate.css';
import NBAStandingsFeed from '../../components/NBAStandingsFeed/NBAStandingsFeed';
import CreatePost from '../../components/CreatePost/CreatePost';

const HomePrivate = () => {
  return (
    <div className='homePrivateContainer'>
      <div className='homePrivateLeft'>
        <NBAStandingsFeed />
      </div>
      <div className='homePrivateCenter'>
        <CreatePost />
      </div>
      <div className='homePrivateRight'>
        <h3>Right</h3>
      </div>
    </div>
  );
};

export default HomePrivate;
