import React, { useContext } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import Navproctice from "../Navbar/Navproctice";
import profileimage from "../Asserts/profileimage.webp";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../Navbar/AppContext";
const Logout = () => {
  const { value, setvalue } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    console.warn("logout");
    localStorage.clear();
    navigate("/profile");
    window.dispatchEvent(new Event("storage"));
    setvalue(false);
  };

  return (
    <div>
      <Navbar />
      <div className="logout">
        <div className="profile1">
          <div className="heading">
            <h1>My Profile</h1>
          </div>
          <div className="portion2">
            <div className="profimg">
              <img src={profileimage} alt="hii" />
            </div>
            <div className="info111">
              <div className="box1234">
                <label>NAME</label>
                <h3>
                  <span>{JSON.parse(auth).name}</span>
                </h3>
              </div>
              <div className="box1234">
                <label>Email</label>
                <h3>
                  <span>{JSON.parse(auth).email}</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="box1" style={{ margin: "0px", padding: "0px" }}>
            <button className="btn11" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
