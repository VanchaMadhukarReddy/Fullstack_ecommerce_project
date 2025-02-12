import React, { useEffect, useState } from "react";
import Item from "../Items/Item";
import all_product from "../Asserts/all_product";
import { useParams } from "react-router-dom";
// import "./Men.css";
// import Navbar from "../Navbar/Navbar";

const Search = () => {
  const { query } = useParams();
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [query]);

  const getProducts = async () => {
    if (query) {
      let result = await fetch(
        `https://fullstack-ecommerce-project-u1cr.onrender.com/search/${query}`
      );
      console.log(result);
      result = await result.json();
      console.log(result);
      setproducts(result);
      console.log(query);
    } else {
      let result = await fetch(
        `https://fullstack-ecommerce-project-u1cr.onrender.com/search`
      );
      //   console.log(result);
      result = await result.json();
      console.log(result);
      setproducts(result);
    }
  };

  const mensIds = products.map((item) => item.pid); // we are extracting pid from products data
  const products_data = all_product.filter(
    (
      product //filtering pid from all_products adn storing all the information of product based on id in product_data variable
    ) => mensIds.includes(product.id)
  );

  return (
    <div>
      {/* <Navbar /> */}
      <div className="shop1">
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

export default Search;
