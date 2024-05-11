import React from 'react';
import '../styles/Crousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
// import './componentone.css';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-arrow custom-prev-arrow ${className}`}
      style={{ ...style, display: 'block', background: '#FF5733' }} // Custom styling
      onClick={onClick}
    />
  );
};
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-arrow custom-next-arrow ${className}`}
      style={{ ...style, display: 'block', background: '#33FF57' }} // Custom styling
      onClick={onClick}
    />
  );
};
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
};
const CompOne = () => {
  const dynamicData=[
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
    {"name": "Men's Black Typographic Slim Fit Tracksuit"},
  ]
  return (
    <div className="app-container">
      <Slider {...settings}>
        {dynamicData.length > 0 ? (
          dynamicData.map((song) => (
            <div>
              <h3>{song.name}</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Slider>
    </div>
  );
};
export default CompOne;