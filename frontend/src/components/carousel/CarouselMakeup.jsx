/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import pub1 from "../../assets/pub1.png";
import pub5 from "../../assets/pub5.png";
import pub3 from "../../assets/pub3.png";
import pub4 from "../../assets/pub4.png";
import "./carousel.css";

export default function CarouseMakeup() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const makeupBaner = [
    { id: 1, name: "pub1", img: pub1, text: "Collection BEAUTY" },
    { id: 2, name: "pub5", img: pub5, text: "Gardez votre beauté avec nous" },
    { id: 3, name: "pub3", img: pub3, text: "Les essentiels d'été pour elle" },
    { id: 4, name: "pub", img: pub4, text: "Prenez soin de vous" },
  ];

  return (
    <div className="m-auto xl:w-3/2">
      <div className="carousel-makeup">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          dots={true}
        >
          {makeupBaner.map(({ id, img, name, text }) => (
            <div key={id} className="carousel-slide relative">
              <img src={img} alt={name} className="image-fixed" />
              <div className="text-overlay">
                <h2>{text}</h2>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
