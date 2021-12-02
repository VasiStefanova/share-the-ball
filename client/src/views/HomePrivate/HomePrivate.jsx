import './HomePrivate.css';
import NBAStandingsFeed from '../../components/NBAStandingsFeed/NBAStandingsFeed';
import CreatePost from '../../components/CreatePost/CreatePost';
import { useContext, useEffect, useState } from 'react';
import { getAllPostsRequest } from '../../services/feed/get-all-posts-request';
import SinglePost from '../../components/SinglePost/SinglePost';
import AppContext from '../../context/AppContext';
import CardLinks from '../../components/CardLinks/CardLinks';
import MyTeammates from '../../my-profile-tabs/MyTeammates/MyTeammates';
import { intervalRequest } from '../../common/helpers';

const HomePrivate = () => {
  const { createdPost } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [interval, setInterval] = useState(null);

  const getAllPosts = () => {
    getAllPostsRequest()
      .then(allPosts => setPosts(allPosts))
      .catch(console.error);
  };

  useEffect(() => {
    getAllPosts();
  }, [createdPost]);

  useEffect(() => {
    if (posts.length) {
      if (!interval) setInterval(intervalRequest(getAllPosts, 10000));
    }

    return () => {
      clearInterval(interval);
      setInterval(null);
    };
  }, [posts]);

  return (
    <div className='home-private-container'>
      <div className='home-private-left'>
        <NBAStandingsFeed />
      </div>
      <div className='home-private-center'>
        <CardLinks />
        <CreatePost />
        <div className="private-posts">
          {posts.map(post => (
            <div className="single-post" key={post.id}>
              <SinglePost post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className='home-private-right'>
        <div className='my-teammates-container'>
          <MyTeammates />
        </div>
      </div>
    </div>
  );
};

export default HomePrivate;
