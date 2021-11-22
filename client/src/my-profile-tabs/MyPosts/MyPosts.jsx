import './MyPosts.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import SinglePost from '../../components/SinglePost/SinglePost';
import CreatePost from '../../components/CreatePost/CreatePost';

const MyPosts = () => {
  const { user } = useContext(AppContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(async () => {
    const posts = await getPostsByUserIdRequest(user.id);
    setMyPosts(posts);
  }, []);

  return (
    <>
      <CreatePost />
      <div className="private-posts">
        {myPosts.map(post => (
          <div className="single-post" key={post.id}>
            <SinglePost post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPosts;
