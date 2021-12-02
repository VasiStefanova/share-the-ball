import './HomePrivate.css';
import NBAStandingsFeed from '../../components/NBAStandingsFeed/NBAStandingsFeed';
import CreatePost from '../../components/CreatePost/CreatePost';
import { useContext, useEffect, useState } from 'react';
import { getAllPostsRequest } from '../../services/feed/get-all-posts-request';
import SinglePost from '../../components/SinglePost/SinglePost';
import AppContext from '../../context/AppContext';
import CardLinks from '../../components/CardLinks/CardLinks';
import MyTeammates from '../../my-profile-tabs/MyTeammates/MyTeammates';
import { intervalRequest } from '../../common/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { POSTS_PER_PAGE } from '../../common/constants';

const HomePrivate = () => {
  const { createdPost } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [interval, setInterval] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getInitialPosts = () => {
    getAllPostsRequest(0, POSTS_PER_PAGE)
      .then(initialPosts => {
        setPosts(initialPosts);
      })
      .catch(console.error);
  };

  const getMorePosts = () => {
    getAllPostsRequest(page, POSTS_PER_PAGE)
      .then(morePosts => {

        if (morePosts.length) {
          setPosts(prevPosts => [...prevPosts, ...morePosts]);
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

  // useEffect(() => {
  //   if (posts.length) {
  //     if (!interval) setInterval(intervalRequest(getInitialPosts, 10000));
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     setInterval(null);
  //   };
  // }, [posts]);

  return (
    <div className='home-private-container'>
      <div className='home-private-left'>
        <NBAStandingsFeed />
      </div>
      <div className='home-private-center'>
        <CardLinks />
        <CreatePost />
        <div className="private-posts">
          <InfiniteScroll
            dataLength={posts.length} // This is important field to render the next data
            next={getMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts.map(post => (
              <div className="single-post" key={post.id}>
                <SinglePost post={post} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <div className='home-private-right'>
        <div className='my-teammates-container'>
          <MyTeammates />
        </div>
      </div>
    </div>
  );
};

export default HomePrivate;
