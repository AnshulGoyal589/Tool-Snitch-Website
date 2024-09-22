import { ShopsSection } from "@/components";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { IoFilter } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

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

export default function DeviceFormPage() {
  return (
    <div className=" mx-4 my-8 md:mx-8 lg:mx-16">
      <div className="flex max-w-md">
        <div className="group flex items-center gap-2 rounded-full border-2 border-gray-200 focus-within:bg-gray-100 hover:bg-gray-100">
          <button className="rounded-l-full bg-transparent px-4 hover:bg-gray-100 focus:outline-none">
            <FaSearch className="text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Search for shops"
            className="text-md w-full rounded-r-full bg-transparent p-2 focus:outline-none"
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
      <ShopsSection />
    </div>
  );
}
