import React, { useState } from "react";
import "./Home.scss";
import built2 from "../../assets/image/build-2.jpg"
import built3 from "../../assets/image/build-3.jpg";
import logo from "../../assets/image/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login/Login"

const images = [built2, built3];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container-fluid py-5 home-wrapper">
      <div className="row align-items-center">
  
        <div className="slider-box col-lg-6 d-none d-lg-block col-12">
          <div className="slider-box position-relative">
            <img
              src={images[currentIndex]}
              alt="building"
              className="slider-image"
            />
            <button className="arrow left" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="arrow right" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>

    
        <div className="col-12 col-md-6 twodiv text-center">
          <img src={logo} alt="logo" className="image-logo mb-4" />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;