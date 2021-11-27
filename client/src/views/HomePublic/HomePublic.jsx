import { useEffect, useState } from 'react';
import LoginAccordion from '../../components/LoginAccordion/LoginAccordion';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPopularPostsRequest } from '../../services/feed/get-popular-posts-request';
import './HomePublic.css';

const HomePublic = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPopularPostsRequest()
      .then((popularPosts) => setPosts(popularPosts))
      .catch(console.error);
  }, []);

  return (
    <div className='home-public-container'>
      <div className='home-public-left'>
        <div className="popular-posts">
          {posts.map(post => (
            <div className="single-post" key={post.id}>
              <SinglePost post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className='home-public-right'>
        <LoginAccordion />
      </div>
    </div>
  );
};

export default HomePublic;
