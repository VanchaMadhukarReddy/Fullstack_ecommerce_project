import React from "react";
import "./Hero.css";
import hand_icon from "../Asserts/hand_icon.png";
import arrow_icon from "../Asserts/arrow.png";
import group_img from "../Asserts/group.png";
import { Link } from "react-router-dom";
const hero = () => {
  function scrollToTop() {
    window.scrollTo({
      top: 700,
      behavior: "smooth", // Optional: smooth scrolling behavior
    });
  }
  return (
    <div className="main">
      <div className="hero">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div className="part2">
            <div className="hero-hand-icon">
              <p>NEW</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
            {/* <div className="hero-latest-btn">
              <button className="button222" onClick={scrollToTop}>
                <p>Check Out</p>
              </button>
            </div> */}
          </div>
          <div className="chintuhero-latest-btn">
            <Link
              to="/trendsettingcollections"
              style={{ textDecoration: "none" }}
            >
              <button className="chintubutton222">
                <p>Latest collections</p> <img src={arrow_icon} alt="" />
              </button>
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <img src={group_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default hero;
