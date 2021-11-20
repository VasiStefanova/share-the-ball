import './HomePrivate.css';
import NBAStandingsFeed from '../../components/NBAStandingsFeed/NBAStandingsFeed';
import CreatePost from '../../components/CreatePost/CreatePost';
import { useContext, useEffect, useState } from 'react';
import { getAllPostsRequest } from '../../services/feed/get-all-posts-request';
import SinglePost from '../../components/SinglePost/SinglePost';
import AppContext from '../../context/AppContext';

const HomePrivate = () => {
  const { createdPost } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const allPosts = await getAllPostsRequest();
      setPosts(allPosts);
    } catch (error) {
      console.error(error);
    }
  }, [createdPost]);

  return (
    <div className='homePrivateContainer'>
      <div className='homePrivateLeft'>
        <NBAStandingsFeed />
      </div>
      <div className='homePrivateCenter'>
        <CreatePost />
        <div className="privatePosts">
          {posts.map(post => (
            <div className="singlePost" key={post.id}>
              <SinglePost post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className='homePrivateRight'>
        <h3>Right</h3>
      </div>
    </div>
  );
};

export default HomePrivate;
