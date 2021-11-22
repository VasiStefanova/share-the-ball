/* eslint-disable react/prop-types */
import './UploadFileButton.css';

const UploadFileButton = ({ buttonText = '', buttonId = '', onChange }) => {
  return (
    <>
      <label htmlFor={buttonId} className="custom-file-upload">
        {buttonText}
      </label>
      <input id={buttonId} type="file" onChange={onChange} />
    </>
  );
};

export default UploadFileButton;
