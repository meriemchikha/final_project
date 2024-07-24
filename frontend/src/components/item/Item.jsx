/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./item.css";

import data from "../data/data.json";

export default function Item() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="item">
      <h1 className="text-4xl header">Popular in makeup</h1>

      <Slider {...settings}>
        {data.map(({ id, image, Description }) => (
          <div key={id}>
            <div className="w-full h-full">
              <img src={image} alt={Description} className="image-fixed" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
