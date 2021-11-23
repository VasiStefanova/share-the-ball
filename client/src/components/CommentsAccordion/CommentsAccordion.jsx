/* eslint-disable react/prop-types */
import './CommentsAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import CreateComment from '../../elements/CreateComment/CreateComment';

const CommentsAccordion = ({ user, post }) => {
  return (
    <>
      <Accordion id="comments-accordion" className='comments-accordion'>
        <Accordion.Item eventKey="0" style={{ borderRadius: '1vh' }}>
          <Accordion.Header id="accordion-header">Comments</Accordion.Header>
          <Accordion.Body style={{ padding: '0vh' }}>
            <CreateComment user={user} post={post} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default CommentsAccordion;
