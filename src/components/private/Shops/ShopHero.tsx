"use client";

import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import HeroCarousel from "../Carousel/HeroCarousel";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ShopHeroProps {
  shopName?: string;
  rating?: number;
  address?: string;
  openingTime?: string;
  closingTime?: string;
  services?: string[];
  description?: string;
  images?: { id: number; name?: string; url: string }[];
  city?: string;
  path?: string;
}

export default function ShopHero({
  shopName,
  rating = 0,
  address,
  openingTime,
  closingTime,
  services,
  description,
  images,
  city,
  path,
}: ShopHeroProps) {

  if(path === "ab-rb-er-21") {
    if(typeof window !== 'undefined') {
      const shopData = JSON.parse(localStorage.getItem("shopData") || "{}");
      shopName = shopData.shopName;
      rating = shopData.rating;
      address = shopData.location;
      openingTime = shopData.openingTime;
      closingTime = shopData.closingTime;
      services = shopData.devicesDeal;
      description = shopData.desc;
      images = shopData.images.map((image:string, index:number) => ({id: index, url: image, name: `image-${index}`}));
      city = shopData.state;
    }
  }

  const convertTo12Hour = (time24: string | undefined): string => {
    if (!time24) return "";
    
    try {
      // Handle if time is already in 12-hour format
      if (time24.toLowerCase().includes('am') || time24.toLowerCase().includes('pm')) {
        return time24;
      }
  
      const [hours, minutes] = time24.split(':').map(num => parseInt(num, 10));
      
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Invalid time format');
      }
  
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
      
      // Ensure minutes are padded with leading zero if needed
      const minutesFormatted = minutes.toString().padStart(2, '0');
      
      return `${hours12}:${minutesFormatted} ${period}`;
    } catch (error) {
      console.error('Error converting time:', error);
      return time24 || ""; // Return original value if conversion fails
    }
  };
  

  return (
    <div className="mx-3 mt-4 md:mx-8 lg:mx-16 xl:mx-20" >
      <h1 className="text-5xl font-bold" suppressHydrationWarning >{shopName || "QuickFix Tech Solutions"}</h1>
      <div className="mt-4 flex items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#FFD700]/20 px-2 py-1">
            {Array.from({ length: 5 }, (_, index) => {
              return (
                <FaStar
                  key={index}
                  className={`${index < rating ? "text-[#FFD700]" : "text-gray-400"
                    }`}
                />
              );
            })}
          </span>
          <span className="ml-2 text-sm text-gray-800">{rating || 0}</span>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Badge variant="outline">{city || "Mumbai"}</Badge>
          <Badge variant="outline">10 Year+</Badge>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 md:gap-8">
        <div className="">
          <HeroCarousel
            name="product"
            list={images || dummyData}
            orientation="horizontal"
            className="h-[448px]"
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
            {openingTime || "10:00 AM"} - {closingTime || "8:00 PM"}
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
              as={Link}
              href="/get-appointment"
              radius="full"
              className="bg-[#D8BA74] px-4 py-6 text-lg text-white"
              onClick={() => {
                localStorage.setItem("shopName", shopName || "QuickFix Tech Solutions");
                localStorage.setItem("shopLocation" , address || "Shop No. 1, Ground Floor, Shree Sai Darshan CHS, Opp. Datta Mandir, Near Datta Mandir, Datta Mandir Rd, Datta Mandir, Malad East, Mumbai, Maharashtra 400097");
              }}
            >
              Get Appoinment{" "}
            </Button>
            <Button
              as={Link}
              href="/shops"
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
