import React from "react";
import group_img from "../Asserts/group.png";
import grpv_img from "../Asserts/groupvc.png";
import grp_pondi from "../Asserts/grouppondiresize.png";
import grp4 from "../Asserts/group4.png";
import grp5 from "../Asserts/grp5.png";
import grp6 from "../Asserts/grp6.png";
import grp7 from "../Asserts/grp7jpg.png";
import Hero from "../Hero/Hero";
// sample checking

import "./Sample.css";
import { Link } from "react-router-dom";
const Sample = () => {
  return (
    <div className="outerrotatingslider">
      <div className="rotatingslider">
        <div className="innerrotatingslider">
          <span style={{ "--i": 1 }}>
            <img src={group_img} alt="" />
          </span>
          <span style={{ "--i": 2 }}>
            <img src={grpv_img} alt="" />
          </span>
          <span style={{ "--i": 3 }}>
            <img src={grp_pondi} alt="" />
          </span>

          <span style={{ "--i": 4 }}>
            <img src={grp4} alt="" />
          </span>
          <span style={{ "--i": 5 }}>
            <img src={grp5} alt="" />
          </span>
          <span style={{ "--i": 6 }}>
            <img src={grp6} alt="" />
          </span>
          <span style={{ "--i": 7 }}>
            <img src={grp7} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sample;
