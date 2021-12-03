import './AboutUs.css';
import Image from 'react-bootstrap/Image';
import { SHARE_THE_BALL_FACEBOOK_URL, SHARE_THE_BALL_INSTAGRAM_URL, SHARE_THE_BALL_TWITTER_URL } from '../../common/constants';

const AboutUs = () => {

  return (
    <>
      <div className="about-us-container">
        <div className="eighth-wonder-logo-box">
          <img className='eighth-wonder-logo-image' src='/8th-wonder-logo.png' />
        </div>
        <div className="theme-background-box theme-background-color">
          <div className="cards-container">
            <div className="single-card theme-border-style">
              <div className="single-card-image-box">
                <Image roundedCircle src='/Konstantin_Gushterov_profile_img.jpg' alt="Konstantin Gushterov" className="single-card-image" />
              </div>
              <div className="single-card-text theme-text-style">
                <h4 className="primary-card-text">Konstantin Gushterov</h4>
                <h6 className="secondary-card-text">Former Lawyer</h6>
              </div>
            </div>
            <div className="single-card theme-border-style ">
              <div className="single-card-image-box">
                <Image roundedCircle src='/Vasilka_Stefanova_profile_img.jpg' alt="Vasilka Stefanova" className="single-card-image" />
              </div>
              <div className="single-card-text theme-text-style">
                <h4 className="primary-card-text">Vasilka Stefanova</h4>
                <h6 className="secondary-card-text">Former Architect</h6>
              </div>
            </div>
            <div className="single-card theme-border-style">
              <div className="single-card-image-box">
                <Image roundedCircle src='/Martin_Petrov_profile_img.jpg' alt="Martin Petrov" className="single-card-image" />
              </div>
              <div className="single-card-text theme-text-style">
                <h4 className="primary-card-text">Martin Petrov</h4>
                <h6 className="secondary-card-text">Former Engineer</h6>
              </div>
            </div>
          </div>
          <div className="about-us-main-text-box">
            <h3 className="about-us-main-text theme-text-style">Now Junior  JavaScript Developers!</h3>
          </div>
        </div>
        <div className="social-medias-box">
          <h3 className="social-medias-header-text theme-text-style">Share the Ball on:</h3>
          <div className="social-medias">
            <a href={SHARE_THE_BALL_FACEBOOK_URL} target="_blank" rel="noreferrer">
              <img className="social-media-logo" src='/facebook-logo.png' alt="facebook-logo" />
            </a>
            <a href={SHARE_THE_BALL_INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <img className="social-media-logo" src='/instagram-logo.png' alt="instagram-logo" />
            </a>
            <a href={SHARE_THE_BALL_TWITTER_URL} target="_blank" rel="noreferrer">
              <img className="social-media-logo" src='/twitter-logo.png' alt="twitter-logo" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
