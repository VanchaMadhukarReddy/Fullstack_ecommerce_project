import React from "react";
import logo from "../Asserts/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import insta from "../Asserts/insta.png";
import linkdin from "../Asserts/linkdin.png";
import gmail from "../Asserts/gmail.png";
import "./Footer.css";
import {
  faUser,
  faHeart,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="line1"></div>
      <div className="footer_img">
        <h1>
          Created by <span>Vancha Madhukar reddy</span>
        </h1>
      </div>
      <div className="icons">
        <a
          href="https://www.instagram.com/banti_reddi?igsh=MWM2bmJoY3NuMjdxNQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={insta} alt="Instagram" />
        </a>

        <a
          href="https://www.linkedin.com/in/vancha-madhukar-reddy-755114237"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkdin} alt="LinkedIn" />
        </a>

        <a href="mailto:vanchamadhukarreddy581@gmail.com">
          <img src={gmail} alt="Gmail" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
