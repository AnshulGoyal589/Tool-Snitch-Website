"use client";
import { ShopsSection } from "@/components";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { IoFilter } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { use, useCallback, useEffect, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { api } from "@/api/api";

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [shops, setShops] = useState<any>([]);
  const [filteredShops, setFilteredShops] = useState<any>([]);
  const [dataScraped, setDataScraped] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "rating",
    direction: "ascending",
  });

  const featchShopsByRating = async () => {
    try {
      setMessage("");
      const response = await api.get("/read/shopsData");
      // console.log(response.data);
      let localData;
      if(typeof window !== 'undefined') {
        localData = JSON.parse(localStorage.getItem("shopData") || "{}");
        if(localData?.status === "Visible") {
          setDataScraped([...response.data, {
            _id : "ab-rb-er-21",
            ...localData
          }]);
        }
      }
      setDataScraped(response.data);
    } catch (error:any) {
      if(typeof window !== 'undefined') {
        const localData = JSON.parse(localStorage.getItem("shopData") || "{}");
        if(localData?.status === "Visible") {
          setDataScraped([{
            _id : "ab-rb-er-21",
            ...localData
          }]);
        }
      }
      console.error(error?.response?.data?.message);
      setMessage(error?.response?.data?.message);
    }
  }
  

  useEffect(() => {
    featchShopsByRating();
  }, []);

  useEffect(() => {
    setFilteredShops(
      shops.filter((shop:any) =>
        shop.shopName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, shops]);

  useEffect(() => {
    let shop;
    if (dataScraped.length > 0) {
      shop = dataScraped.map((shop:any) => {
        return {
          id : shop._id,
          shopName: shop.shopName,
          rating: shop.rating,
          location : shop.shopLocation,
          picture: shop.images[0],
          yearOfService: shop?.yearOfService || "10 Year",
          aproximateDistance: "1.2 km",
        };
      });
      console.log(shop);
      setShops(shop);
      setFilteredShops(shop);
    }
  }
  , [dataScraped]);


  return (
    <div className="mx-4 my-8 md:mx-8 lg:mx-16" suppressHydrationWarning>
      <div className="flex max-w-md">
        <div className="group flex items-center gap-2 rounded-full border-2 border-gray-200 focus-within:bg-gray-100 hover:bg-gray-100">
          <button className="rounded-l-full bg-transparent px-4 hover:bg-gray-100 focus:outline-none">
            <FaSearch className="text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Search for shops"
            className="text-md w-full rounded-r-full bg-transparent p-2 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          radius="full"
          variant="bordered"
          className="ml-4 flex items-center gap-2"
        >
          <IoFilter className="text-gray-500" size={20} />
          <span className="text-gray-500">Filter</span>
        </Button>
      </div>
      <div className="mt-4 flex gap-4">
        <FilterButton>
          <FaStar className="text-yellow-500" />
          <span>Top Rated</span>
        </FilterButton>
        <FilterButton>
          <span>Price: Low to High</span>
        </FilterButton>
        <FilterButton>
          <span>Price: High to Low</span>
        </FilterButton>
      </div>
      <ShopsSection shops={filteredShops} />
    </div>
  );
}

const FilterButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      radius="full"
      variant="bordered"
      className="flex h-6 items-center gap-2 text-xs"
    >
      {children}
    </Button>
  );
};
