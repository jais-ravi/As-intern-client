"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Array for main carousel images
const mainImages = [
  { src: "/test.png", alt: "Image 1" },
  { src: "/test.png", alt: "Image 2" },
  { src: "/test.png", alt: "Image 3" },
];

// Array for the left bottom carousel images
const leftBottomImages = { src: "/test.png", alt: "Left Image 1" };

const rightBottomImages = { src: "/test.png", alt: "Right Image 1" };
const Banner = () => {
  const mainAutoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    mainAutoplay.current.reset();
  }, []);

  return (
    <div className="container mt-2  ">
      <div className=" mx-0 md:mx-20 flex flex-col gap-2">
        {/* Main Banner Image */}

        <div>
          <Carousel
            plugins={[mainAutoplay.current]}
            onMouseEnter={mainAutoplay.current.stop}
            onMouseLeave={mainAutoplay.current.reset}
          >
            <CarouselContent>
              {mainImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div
                    className="relative w-full h-36 sm:h-72"
                    
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>

        {/* Bottom Section with Two Carousels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Left Bottom Carousel */}

          <div className="relative w-full h-32 sm:h-48" >
            <Image
              src={leftBottomImages.src}
              alt={leftBottomImages.alt}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Bottom Carousel */}

          <div className="relative w-full h-32 sm:h-48">
            <Image
              src={rightBottomImages.src}
              alt={rightBottomImages.alt}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
