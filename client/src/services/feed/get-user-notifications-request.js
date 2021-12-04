import { getPostsByUserIdRequest } from '../posts/get-posts-by-user-id-request';

export const getUserNotificationsRequest = async (userId = 0, currentPosts = []) => {
  const newPosts = await getPostsByUserIdRequest(userId);

  const notifications = (() => {
    const newComments = [];
    const newLikes = [];

    currentPosts.forEach(currentPost => {
      const newPost = newPosts.find(post => post.id === currentPost.id);

      // get new comments
      if (currentPost.comments.length !== newPost.comments.length) {
        const newOnes = newPost.comments.slice(currentPost.comments.length);
        newOnes.forEach(newOne => {
          const newComment = { postId: currentPost.id, ...newOne };
          newComments.push(newComment);
        });
      }

      // get new likes
      if (currentPost.likes.length !== newPost.likes.length) {
        const newOnes = newPost.likes.slice(currentPost.likes.length);
        newOnes.forEach(newOne => {
          const newLike = { postId: currentPost.id, ...newOne };
          newLikes.push(newLike);
        });
      }
    });

    return { newComments, newLikes };
  })();

  return notifications;
};
