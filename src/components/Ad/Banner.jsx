"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
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

// Left and right bottom images
const leftBottomImage = { src: "/test.png", alt: "Left Image 1" };
const rightBottomImage = { src: "/test.png", alt: "Right Image 1" };

const Banner = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const mainAutoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    mainAutoplay.current.reset();
  }, []);

  return (
    <div className="container mt-2">
      <div className="mx-0 md:mx-15 lg:mx-10 flex flex-col gap-2">
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
                  <div className="relative w-full h-36 sm:h-72">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </CarouselItem>
              ))}
              {/* Conditionally render the bottom images in the main carousel if it's a small screen */}
              {isSmallScreen && (
                <>
                  <CarouselItem>
                    <div className="relative w-full h-36 ">
                      <Image
                        src={leftBottomImage.src}
                        alt={leftBottomImage.alt}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-36 ">
                      <Image
                        src={rightBottomImage.src}
                        alt={rightBottomImage.alt}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </CarouselItem>
                </>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>

        {/* Bottom Section with Two Carousels for larger screens */}
        {!isSmallScreen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Left Bottom Carousel */}
            <div className="relative w-full h-32 sm:h-48">
              <Image
                src={leftBottomImage.src}
                alt={leftBottomImage.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Right Bottom Carousel */}
            <div className="relative w-full h-32 sm:h-48">
              <Image
                src={rightBottomImage.src}
                alt={rightBottomImage.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
