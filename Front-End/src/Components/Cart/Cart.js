import React, { useEffect, useState } from "react";
import "./Cart.css";
import Cartitems from "./Cartitems";
import emptycartimage from "../Asserts/emptyshopingcart.png";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { Link } from "react-router-dom";
import all_product from "../Asserts/all_product";
const Cart = () => {
  const [cartproducts, setcartproducts] = useState();
  const [loading, setLoading] = useState(true);
  const [totalprice, settotalprice] = useState();
  useEffect(() => {
    Cartfunction();
    totalpricefunc();
  }, []);
  const Cartfunction = async () => {
    setLoading(true);
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:13000/cartitems`, {
      method: "post",
      body: JSON.stringify({
        userid,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
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
    await totalpricefunc();
  };

  //increase quantity
  const increaseQty = async (pid, size) => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:13000/cart/increase`, {
      method: "put",
      body: JSON.stringify({
        userid,
        pid,
        size,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    updateCart();
    totalpricefunc();
  };
  // Decrease quantity
  const decreaseQty = async (pid, size, qty) => {
    console.log("decrease---------");
    console.log(qty);
    console.log("decrease---------");
    if (qty > 1) {
      const userid = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch(`http://localhost:13000/cart/decrease`, {
        method: "put",
        body: JSON.stringify({
          userid,
          pid,
          size,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      updateCart();
      totalpricefunc();
    }
  };

  // Delete item
  const deleteItem = async (pid, size) => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:13000/cart/delete`, {
      method: "post",
      body: JSON.stringify({
        userid,
        pid,
        size,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    updateCart();
  };
  const totalpricefunc = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:13000/totalprice`, {
      method: "post",
      body: JSON.stringify({
        userid,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    result = await result.totalprice;
    settotalprice(result);
  };
  if (loading) {
    console.log("loading....................");
    return (
      <div className="loading">
        <h1 style={{ margin: "0px", padding: "0px" }}>Loading your cart...</h1>
      </div>
    );
  }
  if (cartproducts && cartproducts.length > 0) {
    console.log("if cartproducts");
    return (
      <div className="nonemptycart">
        <div className="productprice">
          <h1 style={{ margin: "0px", padding: "0px" }}>Products</h1>
          <h1 style={{ margin: "0px", padding: "0px" }}>Price</h1>
        </div>
        <div>
          {cartproducts.map((item, index) => {
            const matchedProduct = all_product.find(
              (product) => product.id === item.pid
            );
            return (
              <Cartitems
                key={index}
                item={{ ...item, ...matchedProduct }}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                deleteItem={deleteItem}
              />
            );
          })}
        </div>
        <div className="totalprice">
          <h1 style={{ margin: "0px", padding: "0px" }}>Totalprice</h1>
          <h1 style={{ margin: "0px", padding: "0px" }}>${totalprice}</h1>
        </div>
        <div>
          <div
            className="checkoutbox"
            style={{ margin: "0px", padding: "0px" }}
          >
            <Link to="/buy">
              <button className="checkoutbtn">Proceed to checkout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    console.log("else part");
    return (
      <div className="cart">
        <div className="emptycart">
          <div className="emptycartimage">
            <img src={emptycartimage} alt="aa" />
          </div>
          <h1 style={{ margin: "0px", padding: "0px" }}>
            Your cart is currently empty
          </h1>
          <Link to="/">
            <button className="cartbutton">start shoping</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;
