import React, { useContext, useEffect, useState } from "react";
import logo from "../Asserts/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, Navigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

<FontAwesomeIcon icon="fa-solid fa-user" />;
const Navbar = () => {
  const { value, setvalue } = useContext(AuthContext);
  const [search, setsearch] = useState();
  const [color, setcolor] = useState();
  const navigate = useNavigate();
  const searchhandle = (event) => {
    const query = event.target.value.trim(); // Trim whitespace for cleaner input
    setsearch(query);

    // Navigate based on query presence
    const path = query ? `/search/${query}` : "/search";
    navigate(path);
  };
  const auth = "aa";
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  console.log(value);
  return (
    <div>
      {value ? (
        <div className="Navbar">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="hii" />{" "}
            </NavLink>
            <span
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              Banti
            </span>
          </div>

          <diV className="divider">
            <div className="menu">
              <ul
                className="list1"
                style={{ padding: "0px", listStyle: "none" }}
              >
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setvalue("shop")}
                    className={({ isActive }) => (isActive ? "a active" : "a")}
                  >
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Men"
                    onClick={() => setvalue("men")}
                    className={({ isActive }) => (isActive ? "a active" : "a")}
                  >
                    Men
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Women"
                    onClick={() => setvalue("women")}
                    className={({ isActive }) => (isActive ? "a active" : "a")}
                  >
                    Women
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Kids"
                    onClick={() => setvalue("kids")}
                    className={({ isActive }) => (isActive ? "a active" : "a")}
                  >
                    Kids
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                onChange={searchhandle}
                value={search}
              />
            </div>
            {/* ------------------------------------------------------------------------------------------------------ */}
            <div className="operations">
              <NavLink
                to="/favourite"
                className={({ isActive }) => (isActive ? "a active" : "a")}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  id="fa-icon"
                  onClick={() => setcolor("favourite")}
                  // className={({ isActive }) => (isActive ? "a active" : "a")}
                />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "a active" : "a")}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="2x"
                  id="fa-icon"
                  onClick={() => setcolor("cart")}
                />
              </NavLink>

              <NavLink
                to={value ? "/Logout" : "/profile"}
                className={({ isActive }) => (isActive ? "a active" : "a")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  id="fa-icon"
                  onClick={() => setcolor("profile")}
                />
              </NavLink>
            </div>
          </diV>
        </div>
      ) : (
        //
        <div>
          <div className="Navbar1">
            <div className="logo1">
              <img src={logo} alt="hii" />
              <span
                className="textdata"
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
              >
                WELCOME TO E-COMMERCE PLATEFORM
              </span>
              <span
                className="textdata1"
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
              >
                Banti
              </span>
            </div>
            <diV className="divider1">
              <div />
              <div className="operations1">
                <NavLink
                  to={auth ? "/Logout" : "/profile"}
                  className={({ isActive }) => (isActive ? "a active" : "a")}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                    className="fa-icon"
                    onClick={() => setcolor("profile")}
                    id={color === "profile" ? "change" : "ab"}
                  />
                </NavLink>
              </div>
            </diV>
          </div>
        </div>
        //
      )}
    </div>
  );
};

export default Navbar;
