/* eslint-disable react/prop-types */
import './UploadFileButton.css';

const UploadFileButton = ({ buttonText = '', onChange }) => {
  return (
    <>
      <label htmlFor="file-upload" className="custom-file-upload">
        {buttonText}
      </label>
      <input id="file-upload" type="file" onChange={onChange} />
    </>
  );
};

export default UploadFileButton;
