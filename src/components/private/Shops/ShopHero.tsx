import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import HeroCarousel from "../Carousel/HeroCarousel";
import { Button } from "@nextui-org/react";

export default function ShopHero() {
  return (
    <div className="mx-3 mt-4 md:mx-8 lg:mx-16 xl:mx-20">
      <h1 className="text-5xl font-bold">QuickFix Tech Solutions</h1>
      <div className="mt-4 flex items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#FFD700]/20 px-2 py-1">
            <FaStar className="size-4 text-[#FFD700]" />
            <FaStar className="size-4 text-[#FFD700]" />
            <FaStar className="size-4 text-[#FFD700]" />
            <FaStar className="size-4 text-[#FFD700]" />
            <FaStar className="size-4 text-[#FFD700]" />
          </span>
          <span className="ml-2 text-sm text-gray-800">4.5</span>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Badge variant="outline">Delhi</Badge>
          <Badge variant="outline">10 Year+</Badge>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 md:gap-8">
        <div className="">
          <HeroCarousel
            name="product"
            list={dummyData}
            orientation="horizontal"
          />
        </div>
        <div className="flex-1">
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="mt-2 text-gray-800">
              At QuickFix Tech Solutions, we pride ourselves on offering fast,
              reliable repair services for smartphones, laptops, and tablets.
              With over 10 years of experience, our certified technicians ensure
              top-notch repairs using only genuine parts. Whether you need a
              screen replacement, battery change, or software update, QuickFix
              is your go-to destination for quality service at competitive
              prices. Visit us in Mumbai for a seamless repair experience, or
              take advantage of our doorstep service for ultimate convenience.m
              quos quas quae voluptatem nesciunt doloremque voluptatum.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg font-semibold">Address: </span>
            <address className="text-gray-800">
              A- 577, Street No. -12, Tyagi Rd, Bank Colony, Area 56, Mandoli
              Extension, Delhi, 110093
            </address>
          </div>
          <p className="mt-4">
            <span className="text-lg font-semibold">Timings: </span>
            <span className="text-gray-800">10:00 AM - 8:00 PM</span>
          </p>
          <div className="mt-4">
            <span className="text-lg font-semibold">Services: </span>
            <span className="text-gray-800">
              Smartphone Repair, Tempered Glass, Laptop Repair, Laptop
              Servicing, RAM Upgrade, Storage Upgrade, Screen Replacement
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button
              radius="full"
              className="bg-[#D8BA74] px-4 py-6 text-lg text-white"
            >
              Get Appinment{" "}
            </Button>
            <Button radius="full" variant="bordered" className="text-lg border-[#D8BA74] text-[#D8BA74] py-6 px-4">
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
  image:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Aspect_ratio_-_16x9.svg",
}));
