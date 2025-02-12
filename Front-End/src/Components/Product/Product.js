// import img1 from "../Asserts/p1_product_i1.png";
// import img2 from "../Asserts/p1_product_i2.png";
// import img3 from "../Asserts/p1_product_i3.png";
// import img4 from "../Asserts/p1_product_i4.png";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";
import rightarrow from "../Asserts/rightarrow11.png";
import leftarrow from "../Asserts/leftarrow11.png";
import { useParams } from "react-router-dom";
import all_product from "../Asserts/all_product";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Outline heart

const Product = () => {
  const { productid } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [size, setsize] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [isFavorited, setIsFavorited] = useState(false); //for togling fav icon
  let qty = 1;

  console.log("helo world from prodct");
  console.log(productid);
  const getproductdetail = () => {
    console.log(productid);
    console.log("hello world from getdetails");
    const details = all_product.find((item) => item.id === parseInt(productid));
    // console.log(details.name);
    console.log(productid);
    console.log("hello world");
    if (details) {
      setProductDetails(details); // Update state with product details
    } else {
      console.warn("Product not found");
    }
    console.log(details);
  };

  const findfav = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let pid = productid;
    let result = await fetch(
      "https://fullstack-ecommerce-project-u1cr.onrender.com/favget",
      {
        method: "post",
        body: JSON.stringify({
          pid,
          userid,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.warn(result);
    if (result.pid) {
      setIsFavorited(!isFavorited);
    }
  };
  useEffect(() => {
    console.log("hello world from useEffect1111");
    findfav();
    getproductdetail();
    console.log("hello world from useEffect");
  }, [productid]);
  // ---------------------------------------------if there is no product found we will display loading-----------------------------
  if (!productDetails) {
    return <h1 style={{ margin: "200px", padding: "0px" }}>Loading...</h1>;
  }

  // const images = [img1, img2, img3, img4];
  const images = productDetails.images;

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length; // Loops back to first image
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length; // Loops back to last image
    setCurrentIndex(newIndex);
  };
  //will fetch userid from local storage

  const addproduct = async () => {
    let pid = productid;
    let price = productDetails.price;
    if (!size) {
      setError("Please select the size!");
      return;
    } else {
      setError("");
      setButtonText("Product Added to Cart");
      const userid = JSON.parse(localStorage.getItem("user"))._id;
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
      setTimeout(() => {
        setButtonText("Add to Cart");
      }, 1000);
    }
  };
  //handling fav icon toggle function

  const favoperationfunc = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let pid = productid;
    let price = productDetails.price;
    let result = await fetch(
      "https://fullstack-ecommerce-project-u1cr.onrender.com/favproductoperations",
      {
        method: "post",
        body: JSON.stringify({
          pid,
          userid,
          price,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.warn(result);
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="individualproducts">
      <div className="slides">
        <div
          className="slideimages"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        >
          {/* <img src={img1} /> */}
        </div>
        <div className="slidebutton1">
          <img src={leftarrow} onClick={prevSlide} />
        </div>
        <div className="slidebutton2">
          <img src={rightarrow} onClick={nextSlide} />
        </div>
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)} // Simplified approach
            ></span>
          ))}
        </div>
      </div>
      <div className="individualproductdata">
        <div className="individualproductdataname">
          <h1 style={{ margin: "0px", padding: "0px" }}>
            {productDetails.name}
          </h1>
          <h2 style={{ margin: "0px", padding: "0px" }}>
            Price:${productDetails.price}
          </h2>
          <h2 style={{ margin: "0px", padding: "0px" }}>
            Category:{productDetails.category}
          </h2>
          <h2 style={{ margin: "0px", padding: "0px" }}>
            Type:{productDetails.brand}
          </h2>
          <p style={{ margin: "0px", padding: "0px" }}>
            {productDetails.description}
          </p>
        </div>
        <div className="selectsizetag">
          <h2 style={{ margin: "0px", padding: "0px" }}>Select Size</h2>
          <span style={{ margin: "0px", padding: "0px", color: "red" }}>
            {error}
          </span>
        </div>
        <div className="individualproductsizelist">
          <div
            onClick={() => {
              setError("");
              setsize("small");
            }}
            className={size === "small" ? "selectedsize" : "notselectedsize"}
          >
            S
          </div>
          <div
            onClick={() => {
              setError("");
              setsize("Medium");
            }}
            className={size === "Medium" ? "selectedsize" : "notselectedsize"}
          >
            M
          </div>
          <div
            onClick={() => {
              setError("");
              setsize("Large");
            }}
            className={size === "Large" ? "selectedsize" : "notselectedsize"}
          >
            L
          </div>
          <div
            onClick={() => {
              setError("");
              setsize("extralarge");
            }}
            className={
              size === "extralarge" ? "selectedsize" : "notselectedsize"
            }
          >
            XL
          </div>
        </div>
        <div className="favandcart">
          <FontAwesomeIcon
            icon={isFavorited ? solidHeart : regularHeart}
            style={{
              color: isFavorited ? "rgb(255, 96, 5)" : "black", // Red when solid, gray when outline
              cursor: "pointer",
              transition: "color 0.3s ease", // Smooth transition
            }}
            onClick={favoperationfunc}
            className="chintu"
          />
          <button className="individualbutton" onClick={addproduct}>
            {buttonText}
          </button>
        </div>
      </div>
      {/* for mobile view */}
    </div>
  );
};

export default Product;
