import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import DeleteUserPost from '../../admin/DeleteUserPost/DeleteUserPost';
import UpdateUserPost from '../../admin/UpdateUserPost/UpdateUserPost';
import CreatePost from '../../components/CreatePost/CreatePost';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import AppContext from '../../context/AppContext';
import './Posts.css';

const Posts = ({ userId }) => {
  const { user } = useContext(AppContext);
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

    return () => setUserPosts([]);
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
            /> :
            <SinglePost post={post} />}
          {user.role === 2 &&
            <div className='admin-buttons-box'>
              <DeleteUserPost postId={post.id} setRender={setRender} />
              <UpdateUserPost postId={post.id} showUpdatePostsObj={showUpdatePostsObj} setShowUpdatePostsObj={setShowUpdatePostsObj} />
            </div>}
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
