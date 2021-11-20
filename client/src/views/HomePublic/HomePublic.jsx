import { useEffect, useState } from 'react';
import LoginAccordion from '../../components/LoginAccordion/LoginAccordion';
import RegisterAccordion from '../../components/RegisterAccordion/RegisterAccordion';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPopularPostsRequest } from '../../services/feed/get-popular-posts-request';
import './HomePublic.css';

const HomePublic = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const popularPosts = await getPopularPostsRequest();
      setPosts(popularPosts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className='homePublicContainer'>
      <div className='homePublicLeft'>
        <div className="privatePosts">
          {posts.map(post => (
            <div className="singlePost" key={post.id}>
              <SinglePost post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className='homePublicRight'>
        <LoginAccordion />
        <RegisterAccordion />
      </div>
    </div>
  );
};

export default HomePublic;
