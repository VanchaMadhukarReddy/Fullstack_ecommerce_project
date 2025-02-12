import React, { useEffect, useState } from "react";
// import image from "../Asserts/p1_product.png";
import { Link } from "react-router-dom";
import "./Cartitems.css";
const Cartitems = (props) => {
  const { item, increaseQty, decreaseQty, deleteItem } = props;
  const [quantity, setQuantity] = useState(item.qty); // Default quantity is 1
  // useEffect(() => {}, [quantity]);
  // Increase quantity
  const increaseQtydemo = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQtydemo = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitemsdata">
        <div className="cartitemsimage">
          <Link to={`/product/${item.pid}`}>
            <img src={item.image} alt="aa" />
          </Link>
        </div>
        <div className="cartitemsdescription">
          <div className="cartitemsdescriptionpart1">
            <h2 style={{ margin: "0px", padding: "0px" }}>{item.name}</h2>
            <h3 style={{ margin: "0px", padding: "0px" }}>
              Price:${item.price}
            </h3>
            <h3 style={{ margin: "0px", padding: "0px" }}>
              Category:{item.category}
            </h3>
            <h3 style={{ margin: "0px", padding: "0px" }}>Type:{item.type}</h3>
            <h3 style={{ margin: "0px", padding: "0px" }}>Size:{item.size}</h3>
            <p style={{ margin: "0px", padding: "0px" }}>{item.description}</p>
          </div>
          <div className="price">
            <h2>${item.totalprice}</h2>
          </div>
        </div>
      </div>
      <div className="cartitemsoperations">
        <button
          onClick={() => deleteItem(item.pid, item.size)}
          className="delete-btn"
        >
          Delete
        </button>
        <div className="cartitemsdelete">
          <div className="quantity-controls">
            <button
              onClick={() => {
                decreaseQty(item.pid, item.size, item.qty);
                decreaseQtydemo();
              }}
              className="qty-btn"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => {
                increaseQty(item.pid, item.size);
                increaseQtydemo();
              }}
              className="qty-btn"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
