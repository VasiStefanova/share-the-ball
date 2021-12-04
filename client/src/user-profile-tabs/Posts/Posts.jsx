import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SinglePost from '../../components/SinglePost/SinglePost';
import { getPostsByUserIdRequest } from '../../services/posts/get-posts-by-user-id-request';
import './Posts.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { POSTS_PER_PAGE } from '../../common/constants';

const Posts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [render, setRender] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getInitialPosts = () => {
    getPostsByUserIdRequest(userId, 0, POSTS_PER_PAGE)
      .then(posts => setUserPosts(posts))
      .catch(console.error);
  };

  const getMorePosts = () => {
    getPostsByUserIdRequest(userId, page, POSTS_PER_PAGE)
      .then(morePosts => {

        if (morePosts.length) {
          setUserPosts(prevPosts => [...prevPosts, ...morePosts]);
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

    return () => setUserPosts({});
  }, [userId, render]);

  return ( userPosts.length?
    <>
      <InfiniteScroll
        dataLength={userPosts.length} // This is important field to render the next data
        next={getMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {userPosts.map(post =>
          <div className='single-post' key={post.id}>
            <SinglePost post={post} setRender={setRender} />
          </div>
        )}
      </InfiniteScroll>
    </> :
    <h3 className='theme-text-style' style={{ marginTop: '1vh' }}>No posts to show</h3>
  );
};

Posts.propTypes = {
  userId: PropTypes.string
};
export default Posts;
