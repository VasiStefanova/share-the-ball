/* eslint-disable react/prop-types */
import './UploadFileButton.css';

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

export default UploadFileButton;
