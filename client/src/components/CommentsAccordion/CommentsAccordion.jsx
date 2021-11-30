/* eslint-disable react/prop-types */
import './CommentsAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import CreateComment from '../../elements/CreateComment/CreateComment';
import SingleComment from '../../elements/SingleComment/SingleComment';
import { useEffect, useState } from 'react';
import { getSinglePostRequest } from '../../services/posts/get-single-post-request';

const CommentsAccordion = ({ user, post }) => {
  const [comments, setComments] = useState(post.comments);
  const [createdComment, setCreatedComment] = useState(true);

  useEffect(() => {
    getSinglePostRequest(post.id)
      .then(singlePost => setComments(singlePost.comments))
      .catch(console.error);
  }, [createdComment]);

  return (
    <>
      <Accordion id="comments-accordion" className='comments-accordion'>
        <Accordion.Item eventKey="0" style={{ borderRadius: '1vh' }} className='theme-accordion-style'>
          <Accordion.Header id="accordion-header">Comments</Accordion.Header>
          <Accordion.Body style={{ padding: '0vh' }}>
            <CreateComment user={user} post={post} createdComment={createdComment} setCreatedComment={setCreatedComment} />
            <div className="post-comments">
              {comments.map(comment => (
                <div className="single-comment" key={comment.id}>
                  <SingleComment createdComment={createdComment} setCreatedComment={setCreatedComment} post={post} comment={comment} />
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default CommentsAccordion;
