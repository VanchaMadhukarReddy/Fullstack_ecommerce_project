import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar2.css";
const Navbar2 = () => {
  const [color, setcolor] = useState("shop");
  return (
    <div className="menu1">
      <ul className="list1" style={{ padding: "0px", listStyle: "none" }}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "a active" : "a")}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Men"
            className={({ isActive }) => (isActive ? "a active" : "a")}
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Women"
            className={({ isActive }) => (isActive ? "a active" : "a")}
          >
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Kids"
            className={({ isActive }) => (isActive ? "a active" : "a")}
          >
            Kids
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar2;
