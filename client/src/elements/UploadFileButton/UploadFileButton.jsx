/* eslint-disable react/prop-types */
import './UploadFileButton.css';

const UploadFileButton = ({ buttonText = '', buttonId = '', onChange, style }) => {
  return (
    <>
      <label htmlFor={buttonId} className="custom-file-upload" style={style ? style : null}>
        {buttonText}
      </label>
      <input id={buttonId} type="file" accept="image/*" onChange={onChange} />
    </>
  );
};

export default UploadFileButton;
