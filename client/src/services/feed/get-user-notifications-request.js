import { getPostsByUserIdRequest } from '../posts/get-posts-by-user-id-request';

export const getUserNotificationsRequest = async (userId = 0, currentPosts = []) => {
  const newPosts = await getPostsByUserIdRequest(userId, null, 100);

  const notifications = (() => {
    const newNotifications = [];

    currentPosts.forEach(currentPost => {
      const newPost = newPosts.find(post => post.id === currentPost.id);

      // get new comments
      const currentComments = currentPost.comments.filter(comment => comment.author.id !== userId);
      const newComments = newPost.comments.filter(comment => comment.author.id !== userId);

      if (currentComments.length !== newComments.length) {
        const newOnes = newPost.comments.slice(currentPost.comments.length);
        newOnes.forEach(newOne => {
          const newComment = { itemId: (newNotifications.length + 1), postId: currentPost.id, ...newOne };
          newNotifications.push(newComment);
        });
      }

      // get new likes
      const currentLikes = currentPost.likes.filter(like => like.reaction < 4 && like.id !== userId);
      const newLikes = newPost.likes.filter(like => like.reaction < 4 && like.id !== userId);

      if (currentLikes.length !== newLikes.length) {
        const newOnes = newLikes.slice(currentLikes.length);
        newOnes.forEach(newOne => {
          const newLike = { itemId: (newNotifications.length + 1), postId: currentPost.id, ...newOne };
          newNotifications.push(newLike);
        });
      }
    });

    return newNotifications;
  })();

  return notifications;
};
