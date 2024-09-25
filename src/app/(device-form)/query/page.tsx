"use client";

import { useState, useEffect } from "react";
import { Device } from "./component/device";

interface DeviceOption {
  value: string;
  label: string;
}

type DeviceType = "smartphone" | "laptop" | "printer";

export default function DeviceFormPage() {
  const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType | "">("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const deviceOptions: Record<DeviceType, DeviceOption[]> = {
    smartphone: [
      { value: "redmi note 9", label: "Redmi Note 9" },
      { value: "iphone 15", label: "iPhone 15" },
      { value: "samsung s24", label: "Samsung S24" },
    ],
    laptop: [
      { value: "dell xps 13", label: "Dell XPS 13" },
      { value: "macbook pro", label: "MacBook Pro" },
      { value: "hp spectre", label: "HP Spectre" },
    ],
    printer: [
      { value: "hp laserjet", label: "HP LaserJet" },
      { value: "canon pixma", label: "Canon Pixma" },
      { value: "epson eco-tank", label: "Epson EcoTank" },
    ],
  };

  useEffect(() => {
    if (selectedDeviceType) {
      localStorage.setItem("selectedDeviceType", selectedDeviceType);
    }
  }, [selectedDeviceType]);

  useEffect(() => {
    if (selectedBrand) {
      localStorage.setItem("selectedBrand", selectedBrand);
    }
  }, [selectedBrand]);

  const isNextDisabled = !selectedDeviceType || !selectedBrand;

  return (
    <div className="flex flex-col items-center md:min-h-screen">
      <h1 className="mt-3 mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
        Device Form
      </h1>

      <div className="flex justify-around items-center flex-col gap-5 sm:gap-0 sm:flex-row w-[90%] md:w-[700px] sm:my-4">
        <div
          className={`h-12 lg:h-32 w-44 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl flex justify-center items-center border-3 cursor-pointer ${selectedDeviceType === "smartphone" ? "bg-[#C6A86B] text-white" : "hover:bg-[#C6A86B] hover:text-white"}`}
          onClick={() => setSelectedDeviceType("smartphone")}
        >
          Smartphone
        </div>
        <div
          className={`h-12 lg:h-32 w-44 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl flex justify-center items-center border-3 cursor-pointer ${selectedDeviceType === "laptop" ? "bg-[#C6A86B] text-white" : "hover:bg-[#C6A86B] hover:text-white"}`}
          onClick={() => setSelectedDeviceType("laptop")}
        >
          Laptop
        </div>
        <div
          className={`h-12 lg:h-32 w-44 sm:w-40 lg:w-44 px-6 rounded-2xl sm:text-xl flex justify-center items-center border-3 cursor-pointer ${selectedDeviceType === "printer" ? "bg-[#C6A86B] text-white" : "hover:bg-[#C6A86B] hover:text-white"}`}
          onClick={() => setSelectedDeviceType("printer")}
        >
          Printer
        </div>
      </div>

      <div className="my-8 w-[85%] md:w-[640px] mx-auto">
        <Device
          options={deviceOptions[selectedDeviceType as DeviceType] || []}
          onBrandSelect={setSelectedBrand}
        />
      </div>

      <a
        href={`/query/problem`}
        className={`flex justify-center items-center h-11 px-8 mb-10 sm:h-14 rounded-3xl ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#C6A86B] text-neutral-100"} sm:text-xl`}
        onClick={(e) => {
          if (isNextDisabled) {
            e.preventDefault();
          }
        }}
      >
        Next
      </a>
    </div>
  );
}
