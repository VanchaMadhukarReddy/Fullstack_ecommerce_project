import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
const Item = (props) => {
  return (
    <div className="Item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt="aa" />
      </Link>
      <div className="part22">
        <div className="brand">
          <p>{props.brand}</p>
        </div>
        <div className="description">
          <p>{props.name}</p>
        </div>
        <div className="price">
          <p>${props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
