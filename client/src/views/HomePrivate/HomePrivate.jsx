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
    <div className='home-private-container'>
      <div className='home-private-left'>
        <NBAStandingsFeed />
      </div>
      <div className='home-private-center'>
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
        <h3>Right</h3>
      </div>
    </div>
  );
};

export default HomePrivate;
