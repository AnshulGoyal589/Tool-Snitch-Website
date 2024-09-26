"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type DeviceType = "smartphone" | "laptop" | "printer";

const Page = () => {
  const laptop = [
    { value: "broken screen", label: "broken screen", price: 100 },
    { value: "blacked out screen", label: "blacked out screen", price: 150 },
    { value: "broken keyboard", label: "broken keyboard", price: 80 },
    { value: "no audio output", label: "no audio output", price: 60 },
    { value: "Not charging", label: "Not charging", price: 120 },
  ];

  const printer = [
    { value: "cartridge empty", label: "cartridge empty", price: 40 },
    { value: "cartridge stuck", label: "cartridge stuck", price: 50 },
    { value: "paper stuck", label: "paper stuck", price: 30 },
  ];

  const smartphone = [
    { value: "broken screen", label: "broken screen", price: 120 },
    { value: "blacked out screen", label: "blacked out screen", price: 150 },
    { value: "no audio output", label: "no audio output", price: 70 },
    { value: "Touchscreen not working", label: "Touchscreen not working", price: 90 },
    { value: "Not charging", label: "Not charging", price: 100 },
  ];

  const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType | "">("");
  const [problems, setProblems] = useState<{ value: string; label: string; price: number }[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [otherProblem, setOtherProblem] = useState<string>("");
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    localStorage.removeItem('selectedProblems');
    localStorage.removeItem('otherProblem');
    const storedDeviceType = localStorage.getItem("selectedDeviceType") as DeviceType | "";
    setSelectedDeviceType(storedDeviceType);

    if (storedDeviceType === "smartphone") {
      setProblems(smartphone);
      setBasePrice(800);
    } else if (storedDeviceType === "laptop") {
      setProblems(laptop);
      setBasePrice(1500);
    } else if (storedDeviceType === "printer") {
      setProblems(printer);
      setBasePrice(1000);
    }

    const storedSelectedProblems = JSON.parse(localStorage.getItem("selectedProblems") || "[]");
    const storedOtherProblem = localStorage.getItem("otherProblem");

    if (storedSelectedProblems.length > 0) {
      setSelectedProblems(storedSelectedProblems);
    }
    if (storedOtherProblem) {
      setOtherProblem(storedOtherProblem);
    }
  }, []);

  const handleProblemSelect = (problem: string) => {
    setSelectedProblems((prevProblems) => {
      const updatedProblems = prevProblems.includes(problem)
        ? prevProblems.filter((p) => p !== problem)
        : [...prevProblems, problem];
      localStorage.setItem("selectedProblems", JSON.stringify(updatedProblems));
      return updatedProblems;
    });
  };

  const handleOtherProblemInput = (input: string) => {
    setOtherProblem(input);
    localStorage.setItem("otherProblem", input);
  };

  useEffect(() => {
    setIsNextDisabled(selectedProblems.length === 0 && otherProblem.trim() === "");

    // Calculate total price based on selected problems
    const calculateTotalPrice = () => {
      let price = 0;
      selectedProblems.forEach((problem) => {
        const foundProblem = problems.find(p => p.value === problem);
        if (foundProblem) {
          price += foundProblem.price;
        }
      });

      if (otherProblem.trim() !== "") {
        price += 100;
      }
      const total = basePrice+price;
      setTotalPrice(total);
      localStorage.setItem("totalPrice", total.toString());
    };

    calculateTotalPrice();
  }, [selectedProblems, otherProblem, problems]);

  const brand = localStorage.getItem("selectedBrand");

  return (
    <div className="flex flex-col items-center">
      <div className='max-w-xl px-4'>
        <h1 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-josefin font-bold text-[#212121]">
          Device Form
        </h1>

        <div className='flex sm:text-xl font-josefin text-gray-400 flex-wrap justify-center'>
          <h1 className="">What problems are you facing with your&nbsp;</h1>
          <h1 className='font-bold text-black'>{brand}</h1>
          <h1>?</h1>
        </div>

        <h1 className='sm:text-xl md:text-2xl font-josefin mt-6'>Common Problems</h1>
        <div className='flex flex-wrap gap-4 cursor-pointer my-2'>
          {problems.map((p, index) => (
            <div
              key={index}
              className={`flex justify-center items-center px-5 h-8 rounded-full border-2 
              ${selectedProblems.includes(p.value) ? "bg-[#C6A86B] text-white" : "hover:bg-[#C6A86B] hover:text-white"}`}
              onClick={() => handleProblemSelect(p.value)}
            >
              {p.label}
            </div>
          ))}
        </div>

        <h1 className='sm:text-xl md:text-2xl font-josefin mt-6'>Other Problem</h1>
        <Input
          className='rounded-full my-2 px-8 h-12'
          placeholder="Didn&apos;t find your problem? Type it down here"
          value={otherProblem}
          onChange={(e) => handleOtherProblemInput(e.target.value)}
        />

        <div className='flex justify-center items-center my-5'>
          <a
            href={isNextDisabled ? "#" : "/query/location"}
            className={`flex justify-center items-center h-11 px-14 mb-10 sm:h-14 rounded-3xl 
            ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#C6A86B] text-neutral-100"}`}
            onClick={(e) => {
              if (isNextDisabled) e.preventDefault(); // Prevent navigation if disabled
            }}
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
