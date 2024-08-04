/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import mascara from "../assets/mascara.png";
import gloss from "../assets/glossKiko.png";
import yvs from "../assets/yvs.png";
import loreal from "../assets/l'oreal.png";
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
  return (
    <div className="m-auto w-1/2 ">
      <Carousel responsive={responsive} infinite={true} swipeable={false}>
        <img className="w-full" src={mascara} alt="mascara" />
        <img className="w-full" src={gloss} alt="gloss" />
        <img className="w-full" src={yvs} alt="yvs" />
        <img className="w-full" src={loreal} alt="loreal" />
      </Carousel>
    </div>
  );
}
