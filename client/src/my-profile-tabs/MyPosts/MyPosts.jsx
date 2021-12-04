import './MyPosts.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import SinglePost from '../../components/SinglePost/SinglePost';
import CreatePost from '../../components/CreatePost/CreatePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { POSTS_PER_PAGE } from '../../common/constants';

const MyPosts = () => {
  const { user, createdPost } = useContext(AppContext);
  const [myPosts, setMyPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getInitialPosts = () => {
    getPostsByUserIdRequest(user.id, 0, POSTS_PER_PAGE)
      .then(posts => Array.isArray(posts) && setMyPosts(posts))
      .catch(console.error);
  };

  const getMorePosts = () => {
    getPostsByUserIdRequest(user.id, page, POSTS_PER_PAGE)
      .then(morePosts => {

        if (morePosts.length) {
          setMyPosts(prevPosts => [...prevPosts, ...morePosts]);
          setPage(prev => prev + 1);
        }

        if (morePosts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    getInitialPosts();
  }, [createdPost]);

  return (
    <>
      <CreatePost />
      <div className="private-posts">
        <InfiniteScroll
          dataLength={myPosts.length} // This is important field to render the next data
          next={getMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {myPosts.map(post => (
            <div className="single-post" key={post.id}>
              <SinglePost post={post} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default MyPosts;
