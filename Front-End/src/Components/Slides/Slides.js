import img1 from "../Asserts/p1_product_i1.png";
import img2 from "../Asserts/p1_product_i2.png";
import img3 from "../Asserts/p1_product_i3.png";
import img4 from "../Asserts/p1_product_i4.png";
import React, { useEffect, useState } from "react";
import "./Slides.css";
import rightarrow from "../Asserts/rightarrow11.png";
import leftarrow from "../Asserts/leftarrow11.png";
import { useParams } from "react-router-dom";
const Slides = () => {
  const params = useParams();
  useEffect(() =>
  {
console.warn(params)
  },[])
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length; // Loops back to first image
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length; // Loops back to last image
    setCurrentIndex(newIndex);
  };
  const [size, setsize] = useState("");
  const [sizeclass, setsizeclass] = useState("");
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
            Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket
          </h1>
          <h2 style={{ margin: "0px", padding: "0px" }}>Price:85</h2>
          <h2 style={{ margin: "0px", padding: "0px" }}>Category:men</h2>
          <h2 style={{ margin: "0px", padding: "0px" }}>Type:Tshirt</h2>
          <p style={{ margin: "0px", padding: "0px" }}>
            A lightweight,usually Knitted,pullover shirt,Close-fitting and Brand
            logo printed Regular length Round neck Short, regular sleeves Woven
            polyester fabric
          </p>
        </div>
        <div className="selectsizetag">
          <h2 style={{ margin: "0px", padding: "0px" }}>Select Size</h2>
        </div>

        <div className="individualproductsizelist">
          <div
            onClick={() => setsize("small")}
            className={size === "small" ? "selectedsize" : "notselectedsize"}
          >
            S
          </div>
          <div
            onClick={() => setsize("Medium")}
            className={size === "Medium" ? "selectedsize" : "notselectedsize"}
          >
            M
          </div>
          <div
            onClick={() => setsize("Large")}
            className={size === "Large" ? "selectedsize" : "notselectedsize"}
          >
            L
          </div>
          <div
            onClick={() => setsize("extralarge")}
            className={
              size === "extralarge" ? "selectedsize" : "notselectedsize"
            }
          >
            XL
          </div>
        </div>
        <button className="individualproductbutton">add to cart</button>
      </div>
      {/* for mobile view */}
    </div>
  );
};

export default Slides;
