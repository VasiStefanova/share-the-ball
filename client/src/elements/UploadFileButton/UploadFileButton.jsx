import './UploadFileButton.css';
import PropTypes from 'prop-types';

const UploadFileButton = ({ buttonText = '', buttonId = '', onChange, style, applyClass }) => {
  return (
    <>
      <label htmlFor={buttonId} className={applyClass} style={style ? style : null}>
        {buttonText}
      </label>
      <input id={buttonId} type="file" accept="image/*" onChange={onChange} />
    </>
  );
};

UploadFileButton.propTypes = {
  buttonText: PropTypes.string,
  buttonId: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  applyClass: PropTypes.string
};
export default UploadFileButton;
