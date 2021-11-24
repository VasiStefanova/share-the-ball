import React from 'react';
import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/esm/Accordion';


const SingleUser = ({ setRender, userId, username, avatar, role, }) => {


  return (
    <tr>
      <td>{userId}</td>
      <td>{username}</td>
      <td>
        <Figure.Image
          src={`http://localhost:5000/${avatar}`}
          roundedCircle
          width={50}
          height={50}
        />
      </td>
      <td>{role}</td>
      <td>
        <Accordion defaultActiveKey="1" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Button>
              <h6>Ban User</h6>
            </Accordion.Button>
            <Accordion.Body />
          </Accordion.Item>
        </Accordion>
      </td>
      <td>
        <Badge pill bg="success" style={{ cursor: 'pointer' }}>
          active
        </Badge>
      </td>
    </tr>
  );
};

SingleUser.propTypes = {
  setRender: PropTypes.func,
  userId: PropTypes.number,
  username: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
};
export default SingleUser;
