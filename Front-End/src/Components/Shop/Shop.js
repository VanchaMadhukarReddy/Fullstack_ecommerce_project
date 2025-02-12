import React from "react";
import Hero from "../Hero/Hero";
import "./Shop.css";
import Item from "../Items/Item";
import Offers from "../Offers/Offers";
import data_products from "../Asserts/data";
import new_collections from "../Asserts/new_collections";
import Navbar from "../Navbar/Navbar";
import Sample from "../Sample/Sample";
const Shop = () => {
  return (
    <div className="abcdef">
      {/* <Navbar /> */}
      <div className="Shop">
        {/* <h1 style={{ margin: "0px" }}>Trend-setting Collections</h1> */}
        {/* <diV className="line"></diV> */}
        <Hero />
        {/* <Sample /> */}
        <h1 style={{ marginTop: "3vw" }}> Old money Collections</h1>
        <diV className="line"></diV>
        {/* <div className="part3"> */}
        <div className="products">
          {data_products.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                brand={item.brand}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          })}
          {/* <Item /> */}

          <div className="data"></div>
          {/* </div> */}
        </div>
        <Offers />
        <div className="products">
          {new_collections.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                brand={item.brand}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          })}
          <div className="data"></div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Shop;
