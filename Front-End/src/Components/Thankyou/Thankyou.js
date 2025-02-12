import React, { useEffect } from "react";
import "./Thankyou.css";
const Thankyou = () => {
  useEffect(() => {
    deleteItem();
  }, []);
  const deleteItem = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:13000/buydelete`, {
      method: "post",
      body: JSON.stringify({
        userid,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    console.log(result);
  };
  return (
    <div className="thankyou">
      <div className="thankyoudata">
        <h1>Order placed</h1>
        <h2>Order will arrive in less than 7 days</h2>
        <h3>Thankyou</h3>
      </div>
    </div>
  );
};

export default Thankyou;
