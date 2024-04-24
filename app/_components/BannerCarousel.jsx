import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function BannerCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src="https://getketchadmin.getketch.com/sale/1711705410Web%20banner.webp"
          width=""
        />
      </div>
      <div>
        {/* <img
          src="https://getketchadmin.getketch.com/salecarouselbanners/1710608847WEB-BANNER-699.webp"
          width=""
        /> */}
      </div>
      <div>
        {/* <img
          src="https://getketchadmin.getketch.com/salecarouselbanners/1710608847WEB-BANNER-699.webp"
          width=""
        /> */}
      </div>
    </Slider>
  );
}
