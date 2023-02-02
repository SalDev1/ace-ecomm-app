import React from "react";
import playStore from "../../../images/playstore.png";
import AppStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS Mobile Phone</p>
        <img src={playStore} alt='playstore' />
        <img src={AppStore} alt='Appstore' />
      </div>
      <div className='midFooter'>
        <h1>Ace</h1>
        <p>High & Permium Quality is Our Priority.</p>

        <p>CopyRights 2023 &copy; MeSalUddin</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow Me</h4>
        <a href='https://www.instagram.com'>Instagram</a>
        <a href='https://www.facebook.com'>Facebook</a>
        <a href='https://www.twitter.com'>Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
