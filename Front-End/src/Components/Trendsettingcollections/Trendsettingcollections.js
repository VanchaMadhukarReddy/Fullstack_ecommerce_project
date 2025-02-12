import React, { useEffect, useState } from "react";
import Item from "../Items/Item";
import all_product from "../Asserts/Trendsetting_collections";
import "../Men/Men.css";
import Navbar from "../Navbar/Navbar";
import Sample from "../Sample/Sample";
import "./Trendsettingcollections.css";
const Trendsettingcollections = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch(
      `https://fullstack-ecommerce-project-u1cr.onrender.com/jk`
    );
    console.log(result);
    result = await result.json();

    console.log(result);
    setproducts(result);
  };
  const mensIds = products.map((item) => item.pid); // we are extracting pid from products data
  const products_data = all_product.filter(
    (
      product //filtering pid from all_products adn storing all the information of product based on id in product_data variable
    ) => mensIds.includes(product.id)
  );

  return (
    <div className="kittuchintu">
      {/* <Navbar /> */}
      <div className="shop1">
        <div className="innerkittuchintu">
          <Sample />
        </div>
        <div className="products1">
          {products_data.map((item, index) => {
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
      </div>
    </div>
  );
};

export default Trendsettingcollections;
