import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Navproctice from "../Navbar/Navproctice";
import { AuthContext } from "../Navbar/AppContext";
import { useContext } from "react";
// import { json } from "react-router-dom";
const Profile = () => {
  const { value, setvalue } = useContext(AuthContext);
  const [loginerror, setloginerror] = useState();
  const [emailerror, emailseterror] = useState("");
  const [nameerror, nameseterror] = useState("");
  const [pswderror, pswdseterror] = useState("");
  const { setcolor } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      navigate("/Logout");
    }
  }, [auth]);
  const collectdata = async () => {
    emailseterror("");
    nameseterror("");
    pswdseterror("");
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      emailseterror("Please enter a valid email");
      console.log(emailerror);
      isValid = false;
    }
    if (name.length < 4) {
      nameseterror("please enter valid name min 4 char");
      console.log(nameerror);
      isValid = false;
    }
    if (password.length < 4) {
      pswdseterror("please enter valid password min 4 digits");
      console.log(pswderror);
      isValid = false;
    }
    if (isValid) {
      let result = await fetch(
        `https://fullstack-ecommerce-project-u1cr.onrender.com/signup`,
        {
          method: "post",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const responseData = await result.json();
      if (responseData.email === "Email is already in use") {
        emailseterror("email is already in use");
        isValid = false;
        console.log(result);
      } else {
        // result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(responseData));
        setvalue(true);
        setcolor("shop");
        console.log(value);
        navigate("/");
      }
    }
  };
  const login = async () => {
    setloginerror("");
    emailseterror("");
    nameseterror("");
    pswdseterror("");
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      emailseterror("Please enter a valid email");
      console.log(emailerror);
      isValid = false;
    }
    if (name.length < 4) {
      nameseterror("please enter valid name min 4 char");
      console.log(nameerror);
      isValid = false;
    }
    if (password.length < 4) {
      pswdseterror("please enter valid password min 4 digits");
      console.log(pswderror);
      isValid = false;
    }
    // console.warn("email,password", email, password);
    if (isValid) {
      console.log(name);
      console.log(email);
      console.log(password);
      let result = await fetch(
        `https://fullstack-ecommerce-project-u1cr.onrender.com/login`,
        {
          method: "post",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      let resultdata11 = await result.json();
      console.log(resultdata11);
      if (resultdata11.errordata === "No User Found") {
        console.log(resultdata11.result);
        setloginerror("No user found click Sign-up");
      } else if (resultdata11.name && resultdata11.email) {
        localStorage.setItem("user", JSON.stringify(resultdata11));
        console.log("==============navigate==========");
        setvalue(true);
        setcolor("shop");
        console.log(value);
        navigate("/");
      }
    }
  };
  return (
    <div>
      {/* <Navproctice /> */}
      <div className="outerprofile">
        <div className="profile">
          <h1>SIGN UP</h1>
          <div className="box">
            <label>Name</label>
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {nameerror}
            </span>
            <input
              type="text"
              placeholder="Enter Name"
              className="field"
              onChange={(e) => {
                setName(e.target.value);
                nameseterror("");
              }}
              value={name}
            />
          </div>
          <div className="box">
            <label>Enter Email</label>
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {emailerror}
            </span>
            <input
              type="text"
              placeholder="Enter Email"
              className="field"
              onChange={(e) => {
                setEmail(e.target.value);
                emailseterror("");
              }}
              value={email}
            />
          </div>
          <div className="box">
            <label>Enter password</label>
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {pswderror}
            </span>
            <input
              type="text"
              placeholder="Enter password"
              className="field"
              onChange={(e) => {
                setPassword(e.target.value);
                pswdseterror("");
              }}
              value={password}
            />
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {loginerror}
            </span>
          </div>
          <div className="box" style={{ margin: "0px", padding: "0px" }}>
            <button className="btn11" onClick={login}>
              login
            </button>
          </div>
          <div>
            <p style={{ margin: "0px", padding: "0px" }}>
              Dont have account click signup
            </p>
          </div>
          <div className="box" style={{ margin: "0px", padding: "0px" }}>
            <button className="btn11" onClick={collectdata}>
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
