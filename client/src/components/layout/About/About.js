import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import MyImage from "../../../images/MyProfile.jpg";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/salman_real01";
  };
  return (
    <div className='aboutSection'>
      <div></div>
      <div className='aboutSectionGradient'></div>
      <div className='aboutSectionContainer'>
        <Typography component='h1'>About A</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={MyImage}
              alt='Founder'
            />
            <Typography>Salman Uddin</Typography>
            <Button onClick={visitInstagram} color='primary'>
              Visit Instagram
            </Button>
            <span>
              This is an sample full stack ecommerce website made by Salman
              Uddin.
            </span>
          </div>
          <div className='aboutSectionContainer2'>
            <Typography component='h2'>Our Brands</Typography>
            <a href='https://www.youtube.com' target='blank'>
              <YouTubeIcon className='youtubeSvgIcon' />
            </a>

            <a href='https://instagram.com/salman_real01' target='blank'>
              <InstagramIcon className='instagramSvgIcon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
