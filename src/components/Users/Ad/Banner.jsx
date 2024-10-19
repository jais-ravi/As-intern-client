// components/AdBanner.js
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const AdBanner = () => {
  const images = {
    specialOffer: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR0M_NgkSZHX9Jsubv35tHsFxbxrxpY1hzNfAKzznR7E0YpgtsqVBxY4IJkWh7OAbI7CMuwQxx6jw8m6hnk1DAauYwdJ_YFlNYEQzPoYxlEITvJKdZISxFawXhVzfXOUenSIrYrZi2a6Qs7548WmcmcT07AsSun-Kc1DFuD9a8Z9CpYTUqxZGBCrMcj6wM/s2000/IMG_20231001_235343.jpg",
    ],
    newArrivals: [
      "https://png.pngtree.com/thumb_back/fw800/background/20240322/pngtree-modern-background-banner-designe-vector-image_15650757.jpg",
    ],
    dealOfTheDay: ["/images/deal1.jpg", "/images/deal2.jpg"],
    flashSale: ["/images/sale1.jpg", "/images/sale2.jpg", "/images/sale3.jpg"],
    trendingNow: ["/images/trend1.jpg", "/images/trend2.jpg"],
  };

  return (
    <div className="container section">
      <Card className="flex gap-3 p-5">
        <Card className="md:col-span-1   rounded-lg shadow-lg  w-[25%]">
          {/* <CardContent className=""> */}
            <Carousel autoPlay>
              {images.specialOffer.map((src, index) => (
                <CarouselContent key={index} className="">
                  <Image
                    src={src}
                    alt={`Special Offer ${index + 1}`}
                    className="w-full  object-cover rounded-lg "
                  />
                </CarouselContent>
              ))}
            </Carousel>
          {/* </CardContent> */}
        </Card>
        <Card className=" rounded-lg shadow-lg overflow-hidden w-[75%]">
          <CardContent className="pb-0 px-0">
            <Carousel autoPlay>
              {images.newArrivals.map((src, index) => (
                <CarouselContent key={index} className="h-full">
                  <Image
                    src={src}
                    alt={`New Arrival ${index + 1}`}
                    className="w-full  object-cover  rounded-lg"
                  />
                </CarouselContent>
              ))}
            </Carousel>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default AdBanner;