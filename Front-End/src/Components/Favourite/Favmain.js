import React, { useEffect, useState } from "react";
import "./Favmain.css";
import Favourite from "./Favourite";
import emptycartimage from "../Asserts/emptyshopingcart.png";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { Link } from "react-router-dom";
import emptyheart from "../Asserts/emptyheartnobackground.png";
import all_product from "../Asserts/all_product";
const Favmain = () => {
  const [cartproducts, setcartproducts] = useState();
  const [loading, setLoading] = useState(true);
  const [totalprice, settotalprice] = useState();
  useEffect(() => {
    Cartfunction();
  }, []);
  const Cartfunction = async () => {
    setLoading(true);
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      `https://fullstack-ecommerce-project-u1cr.onrender.com/favitems`,
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
    console.log(userid);
    console.log("fetching data......");
    result = await result.json();
    console.log(result);
    setcartproducts(result);
    setLoading(false);
    console.log("fetching data......");
  };

  //updating cart if any change in increase,decrease or delete
  const updateCart = async () => {
    await Cartfunction(); // Refresh the cart data
  };
  const addtocartitem = async (pid, size, price) => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let qty = 1;
    let result = await fetch(
      "https://fullstack-ecommerce-project-u1cr.onrender.com/addtocart",
      {
        method: "post",
        body: JSON.stringify({
          pid,
          userid,
          size,
          price,
          qty,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.warn(result);
    updateCart();
  };

  // Delete item
  const deleteItem = async (pid) => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      `https://fullstack-ecommerce-project-u1cr.onrender.com/favdelete`,
      {
        method: "post",
        body: JSON.stringify({
          userid,
          pid,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    updateCart();
  };

  if (loading) {
    console.log("loading....................");
    return (
      <div className="loading">
        <h1 style={{ margin: "0px", padding: "0px" }}>
          Loading your wishlist...
        </h1>
      </div>
    );
  }
  if (cartproducts && cartproducts.length > 0) {
    console.log("if cartproducts");
    return (
      <div className="nonemptycart">
        <div>
          {cartproducts.map((item, index) => {
            const matchedProduct = all_product.find(
              (product) => product.id === item.pid
            );
            return (
              <Favourite
                key={index}
                item={{ ...item, ...matchedProduct }}
                deleteItem={deleteItem}
                addtocartitem={addtocartitem}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    console.log("else part");
    return (
      <div className="cart">
        <div className="emptycart">
          <div className="emptycartimage">
            <img src={emptyheart} alt="aa" />
          </div>
          <h1 style={{ margin: "0px", padding: "0px" }}>
            Your wishlist is empty
          </h1>
          <Link to="/">
            <button className="cartbutton">start shoping</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Favmain;
