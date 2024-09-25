import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import HeroCarousel from "../Carousel/HeroCarousel";
import { Button } from "@nextui-org/react";

interface ShopHeroProps {
  shopName: string;
  rating: number;
  address: string;
  timings: {
    open: string;
    close: string;
  };
  services: string[];
  description: string;
  images: { id: number; name?: string; url: string }[];
  city: string;
}

export default function ShopHero({
  shopName,
  rating,
  address,
  timings,
  services,
  description,
  images,
  city,
}: ShopHeroProps) {
  return (
    <div className="mx-3 mt-4 md:mx-8 lg:mx-16 xl:mx-20">
      <h1 className="text-5xl font-bold">{"QuickFix Tech Solutions"}</h1>
      <div className="mt-4 flex items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#FFD700]/20 px-2 py-1">
            {Array.from({ length: 5 }, (_, index) => {
              return (
                <FaStar
                  key={index}
                  className={`${
                    index < rating ? "text-[#FFD700]" : "text-gray-400"
                  }`}
                />
              );
            })}
          </span>
          <span className="ml-2 text-sm text-gray-800">{rating || 0 }</span>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Badge variant="outline">{city}</Badge>
          <Badge variant="outline">10 Year+</Badge>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 md:gap-8">
        <div className="">
          <HeroCarousel
            name="product"
            list={images || dummyData}
            orientation="horizontal"
          />
        </div>
        <div className="flex-1">
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="mt-2 text-gray-800">
              {description ||
              `
              At QuickFix Tech Solutions, we pride ourselves on offering fast,
              reliable repair services for smartphones, laptops, and tablets.
              With over 10 years of experience, our certified technicians ensure
              top-notch repairs using only genuine parts. Whether you need a
              screen replacement, battery change, or software update, QuickFix
              is your go-to destination for quality service at competitive
              prices. Visit us in Mumbai for a seamless repair experience, or
              take advantage of our doorstep service for ultimate convenience.m
              quos quas quae voluptatem nesciunt doloremque voluptatum.
              `
              }
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="text-lg font-semibold">Address: </span>
            <address className="text-gray-800">
             {address || "Shop No. 1, Ground Floor, Shree Sai Darshan CHS, Opp. Datta Mandir, Near Datta Mandir, Datta Mandir Rd, Datta Mandir, Malad East, Mumbai, Maharashtra 400097"}
            </address>
          </div>
          <p className="mt-4">
            <span className="text-lg font-semibold">Timings: </span>
            <span className="text-gray-800">
              {timings?.open || "10:00 AM"} - {timings?.close || "8:00 PM"}
            </span>
          </p>
          <div className="mt-4">
            <span className="text-lg font-semibold">Services: </span>
            <span className="text-gray-800">
              {services?.join(", ") || "Screen Replacement, Battery Change, Software Update"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button
              radius="full"
              className="bg-[#D8BA74] px-4 py-6 text-lg text-white"
            >
              Get Appinment{" "}
            </Button>
            <Button
              radius="full"
              variant="bordered"
              className="border-[#D8BA74] px-4 py-6 text-lg text-[#D8BA74]"
            >
              Look for Other Stores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const dummyData = Array.from({ length: 38 }, (_, index) => ({
  id: index + 1,
  name: `product${index + 1}`,
  url:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Aspect_ratio_-_16x9.svg",
}));
