import React, { useState } from "react";
// import image from "../Asserts/p1_product.png";
import { Link } from "react-router-dom";
import "./Favourite.css";
const Favourite = (props) => {
  const { item, deleteItem, addtocartitem } = props;
  const [size, setsize] = useState("");
  const [error, setError] = useState("");
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
            <p style={{ margin: "0px", padding: "0px" }}>{item.description}</p>
          </div>
        </div>
      </div>
      <div className="cartitemsoperations">
        <button onClick={() => deleteItem(item.pid)} className="delete-btn11">
          Delete
        </button>
        <div className="cartitemsdelete11">
          <div className="cartitemssizeanderror">
            <span style={{ margin: "0px", padding: "0px", color: "red" }}>
              {error}
            </span>
            <div className="individualproductsizelist1">
              <div
                onClick={() => {
                  setError("");
                  setsize("small");
                }}
                className={
                  size === "small" ? "selectedsize11" : "notselectedsize11"
                }
              >
                S
              </div>
              <div
                onClick={() => {
                  setError("");
                  setsize("Medium");
                }}
                className={
                  size === "Medium" ? "selectedsize11" : "notselectedsize11"
                }
              >
                M
              </div>
              <div
                onClick={() => {
                  setError("");
                  setsize("Large");
                }}
                className={
                  size === "Large" ? "selectedsize11" : "notselectedsize11"
                }
              >
                L
              </div>
              <div
                onClick={() => {
                  setError("");
                  setsize("extralarge");
                }}
                className={
                  size === "extralarge" ? "selectedsize11" : "notselectedsize11"
                }
              >
                XL
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (size) {
                addtocartitem(item.pid, size, item.price);
                deleteItem(item.pid);
              } else {
                setError("select the size");
              }
            }}
            className="delete-btn11"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
