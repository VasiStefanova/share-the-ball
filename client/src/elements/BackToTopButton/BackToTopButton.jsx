import { useEffect, useState } from 'react';
import './BackToTopButton.css';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const BackToTopButton = ({ offsetRight = '', offsetLeft = '' }) => {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 1850) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    });
  }, [showBackToTopButton]);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  if (showBackToTopButton) {
    return (
      <Button
        className="back-to-top-button theme-btn-style"
        variant="dark"
        style={{ right: offsetRight && `${offsetRight}`, left: offsetLeft && `${offsetLeft}` }}
        onClick={() => scrollToTop()}
      ><i className="bi bi-arrow-up" /> Back to top
      </Button>
    );
  }

  return null;
};

BackToTopButton.propTypes = {
  offsetRight: PropTypes.string,
  offsetLeft: PropTypes.string
};

export default BackToTopButton;


