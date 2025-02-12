import React, { useEffect, useState } from "react";
import "./Buy.css";
import qrcode from "../Asserts/qrcode.png";
import { useNavigate } from "react-router-dom";

const Buy = () => {
  const [totalprice, settotalprice] = useState();
  const [carddetails, setcarddetails] = useState("");
  const [paymenterror, setpaymenterror] = useState("");
  const [paymenttype, setpaymenttype] = useState("");
  const [expdetails, setexpddetails] = useState("");
  const [cvvdetails, setcvvdetails] = useState("");
  const [carddetailserr, setcarddetailserrr] = useState("");
  const [cardaddressdetailserr, setcardaddressdetailserr] = useState("");
  const [display, setdisplay] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [country, setcountry] = useState("");
  const [streeterror, setstreeterror] = useState("");
  const [cityerror, setcityerror] = useState("");
  const [zipcodeerror, setzipcodeerror] = useState("");
  const [countryerror, setcountryerror] = useState("");
  const [clsname, setclsname] = useState();
  const navigate = useNavigate();
  console.log(display);
  useEffect(() => {
    totalpricefunc();
    getaddress();
  }, []);
  const totalpricefunc = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      `https://fullstack-ecommerce-project-u1cr.onrender.com/totalprice`,
      {
        method: "post",
        body: JSON.stringify({
          userid,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    result = await result.totalprice;
    settotalprice(result);
  };
  const getaddress = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userid);
    console.log("get address running");
    let result = await fetch(
      `https://fullstack-ecommerce-project-u1cr.onrender.com/getaddress`,
      {
        method: "post",
        body: JSON.stringify({ userid }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const responseData = await result.json();
    if (responseData.street && responseData.city && responseData.zipcode) {
      console.log(responseData);
      setstreet(responseData.street);
      setcity(responseData.city);
      setzipcode(responseData.zipcode);
      setcountry(responseData.country);
      setclsname("buymain2");
    } else {
      setclsname("buymain1");
    }
  };
  const onclickchangeaddress = () => {
    setclsname("buymain1");
  };

  // --------------------change address--------
  const changeaddress = async () => {
    console.log("jjjjjjjjjjjjjjjjj");
    console.log(clsname);
    //
    console.log(clsname);
    console.log("address function working");
    setstreeterror("");
    setcityerror("");
    setzipcodeerror("");
    setcountryerror("");
    let isValid = true;
    if (street.length < 2) {
      setstreeterror("Please enter a valid email");
      isValid = false;
    }
    if (city.length < 2) {
      setcityerror("Please enter a valid email");
      isValid = false;
    }
    if (
      zipcode.length < 2 ||
      isNaN(zipcode) ||
      !Number.isInteger(Number(zipcode))
    ) {
      setzipcodeerror("Please enter a valid zipcode (integer only).");
      isValid = false;
    }
    if (country.length < 2) {
      setcountryerror("Please enter a valid email");
      isValid = false;
    }
    if (isValid) {
      const userid = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch(
        `https://fullstack-ecommerce-project-u1cr.onrender.com/updateaddress`,
        {
          method: "post",
          body: JSON.stringify({ userid, street, city, zipcode, country }),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const responseData = await result.json();
      console.log(responseData);
      console.log(responseData.street);
      setclsname("buymain2");
    }
  };

  //-----------------buyfunction--------------------
  const buybuttonfunc = async () => {
    let isValid = true;
    console.log(carddetails);
    console.log(expdetails);
    console.log(cvvdetails);
    if (street?.length > 0 && city?.length > 0 && paymenttype === "card") {
      setpaymenterror("");
      console.log("qqqqqqqqqqqqqqqqqqqqqqq");
      if (carddetails.length < 2) {
        setcarddetailserrr("please check the card details");
        isValid = false;
      }
      if (expdetails.length < 2) {
        setcarddetailserrr("please check the card details");
        isValid = false;
      }
      if (cvvdetails.length < 2) {
        setcarddetailserrr("please check the card details");
        isValid = false;
      }
      if (isValid) {
        navigate("/Thankyou");
      }
    }
    if (street?.length > 0 && city?.length > 0 && paymenttype === "upi") {
      navigate("/Thankyou");
    }
    if (street?.length > 0 && city?.length > 0 && paymenttype === "cod") {
      navigate("/Thankyou");
    }
    if (paymenttype === "") {
      console.log(paymenttype);
      setpaymenterror("please select the payment");
    }
    if (street === "") {
      setcardaddressdetailserr("please enter the valid address");
      console.log(cardaddressdetailserr);
      console.log("aaaaaaaaaaaaaaaaaa");
    }
  };

  return (
    <div className="buy">
      <div className={clsname === "buymain1" ? "buymain1" : "displayof"}>
        <div className="buyportion1">
          <h1>Enter Address</h1>
          <div className="address">
            <div className="addressbox">
              <label>Street</label>
              <span style={{ margin: "0px", padding: "0px", color: "red" }}>
                {streeterror}
              </span>
              <input
                type="text"
                placeholder="street"
                className="addressboxfield"
                onChange={(e) => {
                  setstreet(e.target.value);
                  setstreeterror("");
                  setcardaddressdetailserr("");
                }}
                value={street}
              />
            </div>
            <div className="addressbox">
              <label>city</label>
              <span style={{ margin: "0px", padding: "0px", color: "red" }}>
                {cityerror}
              </span>
              <input
                type="text"
                placeholder="enter city"
                className="addressboxfield"
                onChange={(e) => {
                  setcity(e.target.value);
                  setcityerror("");
                  setcardaddressdetailserr("");
                }}
                value={city}
              />
            </div>
            <div className="addressbox">
              <label>zipcode</label>
              <span style={{ margin: "0px", padding: "0px", color: "red" }}>
                {zipcodeerror}
              </span>
              <input
                type="text"
                placeholder="Enter zipcode"
                className="addressboxfield"
                onChange={(e) => {
                  setzipcode(e.target.value);
                  setzipcodeerror("");
                  setcardaddressdetailserr("");
                }}
                value={zipcode}
              />
            </div>
            <div className="addressbox">
              <label>country</label>
              <span style={{ margin: "0px", padding: "0px", color: "red" }}>
                {countryerror}
              </span>
              <input
                type="text"
                placeholder="Enter country"
                className="addressboxfield"
                onChange={(e) => {
                  setcountry(e.target.value);
                  setcountryerror("");
                  setcardaddressdetailserr("");
                }}
                value={country}
              />
            </div>
          </div>
          <div className="adressbtncls">
            <button className="addressbtn" onClick={changeaddress}>
              Save Adrress
            </button>
          </div>
        </div>
      </div>
      {/* buymain2------------------------- */}
      <div className={clsname === "buymain2" ? "buymain2" : "displayof"}>
        <div className="buyportion1">
          <h1>Your Address</h1>
          <div className="address">
            <div className="addressbox">
              <label>Street</label>
              <h2 type="text" placeholder="street" className="addressboxfield">
                {street}
              </h2>
            </div>
            <div className="addressbox">
              <label>city</label>
              <h2
                type="text"
                placeholder="enter city"
                className="addressboxfield"
              >
                {city}
              </h2>
            </div>
            <div className="addressbox">
              <label>zipcode</label>
              <h2
                type="text"
                placeholder="Enter zipcode"
                className="addressboxfield"
              >
                {zipcode}
              </h2>
            </div>
            <div className="addressbox">
              <label>country</label>
              <h2
                type="text"
                placeholder="Enter country"
                className="addressboxfield"
              >
                {country}
              </h2>
            </div>
          </div>
          <div className="adressbtncls">
            <button className="addressbtn" onClick={onclickchangeaddress}>
              Change Adrress
            </button>
          </div>
        </div>
      </div>
      {/* ------------------------------------buy portion2------------------------------------------------ */}
      <div className="buyportion2">
        <div>
          <h1>Payment Method</h1>
        </div>
        <div className="buyprice">
          <h1 style={{ margin: "0px", padding: "0px" }}>Total Price</h1>
          <h1 style={{ margin: "0px", padding: "0px" }}>${totalprice}</h1>
        </div>

        <div class="payment-options">
          <div className="payment1">
            <div className="paymentheading">
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="payment"
                  value="card"
                  onClick={() => {
                    setdisplay("card");
                    setpaymenterror("");
                    setpaymenttype("card");
                  }}
                />
                Card Payment
              </label>
            </div>
            <div
              className={display === "card" ? "paymentdetailsaa" : "invisible"}
            >
              <span style={{ margin: "0px", padding: "0px", color: "red" }}>
                {carddetailserr}
              </span>
              <label className="cardnumber">
                <input
                  type="text"
                  placeholder="enter card number"
                  className="cardnumber"
                  onChange={(e) => {
                    setcarddetails(e.target.value);
                    setcarddetailserrr("");
                  }}
                  value={carddetails}
                />
              </label>
              <div className="outerexpcvv">
                <label className="cardexpcvv">
                  <input
                    type="text"
                    placeholder="expiry date"
                    className="cardexpcvv"
                    onChange={(e) => {
                      setexpddetails(e.target.value);
                      setcarddetailserrr("");
                    }}
                    value={expdetails}
                  />
                </label>
                <label className="cardexpcvv">
                  <input
                    type="text"
                    placeholder="cvv"
                    className="cardexpcvv"
                    onChange={(e) => {
                      setcvvdetails(e.target.value);
                      setcarddetailserrr("");
                    }}
                    value={cvvdetails}
                  />
                </label>
              </div>
              <div className="buybtncls">
                <button className="buybtn">Buy</button>
              </div>
            </div>
          </div>
          {/* --------------------------------upi payment------------- */}
          <div className="upipayment">
            <div className="paymentheading">
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="payment"
                  value="upi"
                  onClick={() => {
                    setdisplay("upi");
                    setpaymenterror("");
                    setpaymenttype("upi");
                  }}
                />
                UPI Payment
              </label>
            </div>
            <div
              className={display === "upi" ? "upipaymentdetail" : "invisible"}
            >
              <h4 style={{ margin: "0px", padding: "0px" }}>Scan and pay</h4>
              <div className="qrcode">
                <img src={qrcode} alt="img" />
              </div>
              <div className="buybtncls">
                <button className="buybtn">Buy</button>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------- */}
          <div className="codpayment">
            <div className="paymentheading">
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="payment"
                  value="cod"
                  onClick={() => {
                    setdisplay("cod");
                    setpaymenterror("");
                    setpaymenttype("cod");
                  }}
                />
                COD Payment
              </label>
            </div>
            <div
              className={display === "cod" ? "codpaymentdetail" : "invisible"}
            >
              <div className="buybtncls">
                <button className="buybtn">Buy</button>
              </div>
            </div>
          </div>
          <div>
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {cardaddressdetailserr}
            </span>
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {paymenterror}
            </span>
          </div>
          <div className="buybtnclss">
            <button className="buybtnn" onClick={buybuttonfunc}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
