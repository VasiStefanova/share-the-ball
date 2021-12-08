import './VideoEmbedPopover.css';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { isYouTubeUrl } from '../../common/helpers';

const VideoEmbedPopover = ({ videoUrl, setVideoUrl, imagePreview }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <OverlayTrigger
        trigger="click"
        show={showPopover}
        placement="top"
        overlay={
          <Popover id="video-embed-popover" show={showPopover}>
            <Popover.Body>
              <div className="video-embed-popover-content">
                <Form className="video-link-form">
                  <Form.Control
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="YouTube video URL"
                  />
                </Form>
                <Button
                  id={isYouTubeUrl(videoUrl) ? 'confirm-embed-button' : 'confirm-embed-button-disabled'} variant="dark"
                  disabled={!isYouTubeUrl(videoUrl)}
                  onClick={() => setShowPopover(!showPopover)}
                >
                  <i className="bi bi-check-square" />
                </Button>
                <Button
                  id="cancel-embed-button" variant="dark"
                  onClick={() => {
                    setShowPopover(!showPopover);
                    setVideoUrl('');
                  }}
                >
                  <i className="bi bi-x-square" />
                </Button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <Button
          variant="outline-dark"
          id="embed-popover-button"
          disabled={imagePreview}
          style={{ color: showPopover && 'white', background: showPopover && 'black' }}
          onClick={() => {
            setShowPopover(!showPopover);
          }}
        ><i className="bi bi-youtube" />
        </Button>
      </OverlayTrigger>
    </>
  );
};

VideoEmbedPopover.propTypes = {
  videoUrl: PropTypes.string,
  setVideoUrl: PropTypes.func,
  imagePreview: PropTypes.string,
};

export default VideoEmbedPopover;
