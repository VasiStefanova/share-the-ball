import PropTypes from 'prop-types';
import { getVideoId } from '../../common/helpers';
import './VideoEmbed.css';

const VideoEmbed = ({ videoUrl, embededVideoClass = '' }) => {
  const videoId = getVideoId(videoUrl);

  return (
    <div className="video-box">
      <iframe
        className={embededVideoClass}
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

VideoEmbed.propTypes = {
  videoUrl: PropTypes.string,
  embededVideoClass: PropTypes.string
};

export default VideoEmbed;
