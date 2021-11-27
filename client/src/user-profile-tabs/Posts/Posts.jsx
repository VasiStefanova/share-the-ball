import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import DeleteUserPost from '../../admin/DeleteUserPost/DeleteUserPost';
import UpdateUserPost from '../../admin/UpdateUserPost/UpdateUserPost';
import CreatePost from '../../components/CreatePost/CreatePost';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import './Posts.css';

const Posts = ({ userId }) => {

  const [userPosts, setUserPosts] = useState([]);
  const [render, setRender] = useState({});

  const [showUpdatePostsObj, setShowUpdatePostsObj] = useState({});

  const getUserPosts = async () => {
    const posts = await getPostsByUserIdRequest(userId);
    const newPostsObj = posts.reduce((current, next) => {
      current[next.id] = false;
      return current;
    }, {});
    setShowUpdatePostsObj(newPostsObj);
    setUserPosts(posts);
  };

  useEffect(() => {
    getUserPosts();
  }, [userId, render]);

  return ( userPosts.length?
    <>
      {userPosts.map(post =>
        <div className='admin-manage-posts' key={post.id}>
          {showUpdatePostsObj[post.id] ?
            <CreatePost
              post={post} showUpdatePostsObj={showUpdatePostsObj}
              setShowUpdatePostsObj={setShowUpdatePostsObj}
              setRender={setRender}
            /> : <SinglePost post={post} />}
          <DeleteUserPost postId={post.id} setRender={setRender} />
          <UpdateUserPost postId={post.id} showUpdatePostsObj={showUpdatePostsObj} setShowUpdatePostsObj={setShowUpdatePostsObj} />
        </div>
      )}
    </> :
    'No posts to show!'
  );
};

Posts.propTypes = {
  userId: PropTypes.string
};
export default Posts;
