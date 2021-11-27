import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';

const Posts = ({ userId }) => {

  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    const posts = await getPostsByUserIdRequest(userId);
    setUserPosts(posts);
    console.log(posts);
  };

  useEffect(() => {
    getUserPosts();
  }, [userId]);

  return ( userPosts.length?
    <>
      {userPosts.map(post => <SinglePost key={post.id} post={post} />)}
    </> :
    'No posts to show!'
  );
};

Posts.propTypes = {
  userId: PropTypes.string
};
export default Posts;
