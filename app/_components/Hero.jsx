"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";


const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    heroBanner();
  }, []);

  const heroBanner = () => {
    GlobalApi.getHeroBanner().then((res) => {
      setBanners(res?.data?.data);
    });
  };

  return (
    <section className="bg-transparent">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {
            banners.map(item => (
              <div className="embla__slide flex-grow flex-shrink-0 w-full min-w-0">
              <img
                src={item.attributes?.hero_banner?.data?.attributes?.url}
                className="w-full h-fit hidden md:block lg:block"
                loading="lazy"
              />
              <img
                src={item.attributes?.mobile_banner?.data?.attributes?.url}
                className="w-full h-fit block md:hidden lg:hidden aspect-[4/5]"
                loading="lazy"
              />
            </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Hero;
