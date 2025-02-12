import React, { useEffect, useState } from "react";
import logo from "../Asserts/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./Navbarproctice.css";
<FontAwesomeIcon icon="fa-solid fa-user" />;
const Navproctice = () => {
  const [color, setcolor] = useState("shop");
  const auth = localStorage.getItem("user");
  const [auth1, setauth1] = useState("");
  useEffect(() => {
    if (auth) {
      setauth1(auth);
    }
  }, [auth]);
  return (
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
            <Link to={auth ? "/Logout" : "/profile"}>
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="fa-icon"
                onClick={() => setcolor("profile")}
                id={color === "profile" ? "change" : "ab"}
              />
            </Link>
          </div>
        </diV>
      </div>
    </div>
  );
};

export default Navproctice;
