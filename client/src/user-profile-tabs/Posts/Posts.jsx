import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import './Posts.css';

const Posts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState({});
  const [render, setRender] = useState({});


  const getUserPosts = async () => {
    const posts = await getPostsByUserIdRequest(userId);
    setUserPosts(posts);
  };

  useEffect(() => {
    getUserPosts();

    return () => setUserPosts({});
  }, [userId, render]);

  return ( userPosts.length?
    <>
      {userPosts.map(post =>
        <div className='admin-manage-posts' key={post.id}>
          <SinglePost post={post} setRender={setRender} />
        </div>
      )}
    </> :
    <h3 className='theme-text-style' style={{ marginTop: '1vh' }}>No posts to show</h3>
  );
};

Posts.propTypes = {
  userId: PropTypes.string
};
export default Posts;
