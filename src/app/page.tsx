'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedFixSection from './AnimatedFixSection';


export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let intervalId: number | null = null;
    if (isAutoScrolling) {
      intervalId = window.setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          const newScrollLeft = scrollLeft + 2;
          if (newScrollLeft + clientWidth >= scrollWidth) {
            scrollContainerRef.current.scrollLeft = 0;
          } else {
            scrollContainerRef.current.scrollLeft = newScrollLeft;
          }
        }
      }, 20);
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoScrolling]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAutoScrolling(false);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const handleMouseUp = () => {
    setIsAutoScrolling(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || isAutoScrolling) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="">

      <div className="flex flex-col items-center justify-center text-[#212121] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold my-6">
        <h1>Have a broken device?</h1>
        <h1>We&apos;ll find stores to fix it</h1>
      </div>

      <div className="flex justify-center items-center">
        <Link href={"/query"} className="bg-[#C6A86B] py-4 px-8 md:py-5 md:px-10 rounded-full text-white md:text-xl my-5">
          Lets fix it
          </Link>
      </div>

      <div className="flex items-center justify-center my-10">
        <Image height={4000} width={3000} src="/iPhone.png" alt="" className="relative z-10 h-[330px] sm:h-[500px] md:h-[660px] lg:h-[770px] w-[50vw] sm:w-[480px] lg:w-[659px]" />
        <div className="absolute h-[230px] sm:h-[320px] md:h-[450px] lg:h-[550px] w-[90%] bg-[#212121] rounded-[48px] md:rounded-[64px]">
          <h1 className="absolute left-[5%] bottom-[10%] text-white z-20 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">Why <br /> Tool Snitch?</h1>
        </div>
      </div>

      <Image height={4000} width={3000} src="/group.png" alt="" className="w-full" />

      <div className="text-center max-w-[70%] text-[#212121] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mx-auto">
        <h1>Get your device fixed with Tool Snitch in just 4 simple steps</h1>
      </div>


      <div 
        className="flex overflow-x-scroll no-scrollbar gap-16 md:gap-20 my-10 ps-20 pe-10"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="h-[230px] md:h-[85vh] min-w-[40vw] md:min-w-[40vw]  sm:p-4 md:p-8 lg:p-10 xl:p-12">
          <Image src="/t.jpg" alt="" className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" height={4000} width={3000}/>
          <h1 className="text-[#212121] py-3 sm:py-4 md:py-6 lg:py-8 sm:text-lg md:text-xl lg:text-2xl">Tool Snitch needs to understand your problem to help you find the best stores possible.</h1>
          <Link href={"/query"} className="bg-[#C6A86B] py-4 px-8 md:py-5 md:px-10 rounded-full text-white md:text-xl my-5">
            Lets fix it
          </Link>
        </div>
        <Image height={4000} width={3000} src="/carousel1.jpg" className="h-[230px] md:h-[85vh] min-w-[85vw] md:min-w-[65vw] bg-[#D8BA74] rounded-[2rem]" alt="" />
        <Image height={4000} width={3000} src="/carousel2.jpg" className="h-[230px] md:h-[85vh] min-w-[85vw] md:min-w-[65vw] bg-[#D8BA74] rounded-[2rem]"  alt="" />
        <Image height={4000} width={3000} src="/carousel3.jpg" className="h-[230px] md:h-[85vh] min-w-[85vw] md:min-w-[65vw] bg-[#D8BA74] rounded-[2rem]"  alt="" />
        <Image height={4000} width={3000} src="/carousel4.jpg" className="h-[230px] md:h-[85vh] min-w-[85vw] md:min-w-[65vw] bg-[#D8BA74] rounded-[2rem]"  alt="" />
      </div>

      {/* <div className="bg-[#212121] my-10 py-16 px-10 sm:px-12 md:px-14 lg:px-20">
        <h1 className="text-white text-center text-5xl font-semibold">We can help you fix</h1>
        <div className="grid md:grid-cols-3 my-10 gap-10">
          <Link href={"/query"}>
              <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
                  <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]"> Smartphones</h1>
              </div>
          </Link>
          <Link href={"/query"}>
              <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
                <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]">Laptops</h1>
              </div>
          </Link>
          <Link href={"/query"}>
            <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
              <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]"> Printers </h1>
            </div>
          </Link>
          <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center md:col-span-3">
            <h1 className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl text-[#878787] text-center">More comming soon</h1>
          </div>
        </div>
      </div> */}
      <AnimatedFixSection />

      <div className="flex flex-col md:flex-row justify-around items-center md:items-start px-6 sm:px-10 my-16">
        
        <div className="flex md:flex-col items-start gap-3 py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">Frequently</h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">Asked</h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#C6A86B]">Questions</h1>
        </div>

        <div className="w-[90%] md:w-1/2 text-lg sm:text-lg md:text-xl lg:text-2xl">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start">How to contact customer service</AccordionTrigger>
              <AccordionContent className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus unde mollitia quo molestiae a iste beatae ea cum officiis, earum doloremque. Aspernatur odio aperiam tempora?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
            <AccordionTrigger className="text-start">How fast is the process</AccordionTrigger>
              <AccordionContent className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus unde mollitia quo molestiae a iste beatae ea cum officiis, earum doloremque. Aspernatur odio aperiam tempora?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
            <AccordionTrigger className="text-start">From where to list our own shop</AccordionTrigger>
              <AccordionContent className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus unde mollitia quo molestiae a iste beatae ea cum officiis, earum doloremque. Aspernatur odio aperiam tempora?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
            <AccordionTrigger className="text-start">From where to list our own shop</AccordionTrigger>
              <AccordionContent className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus unde mollitia quo molestiae a iste beatae ea cum officiis, earum doloremque. Aspernatur odio aperiam tempora?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
            <AccordionTrigger className="text-start">From where to list our own shop</AccordionTrigger>
              <AccordionContent className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus unde mollitia quo molestiae a iste beatae ea cum officiis, earum doloremque. Aspernatur odio aperiam tempora?
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="bg-[#212121] mt-10 py-16 px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col justify-center items-center gap-3 ">
        
      <Image 
        src="/toolsnitchlogo.png" 
        alt="Tool Snitch Logo" 
        width={150} 
        height={50}
      />
        
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white" >TOOL SNITCH</h1>
        
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex justify-around items-center text-white w-[90%] lg:w-[80%] py-8 font-thin">
          <a href="">About Us</a>
          <a href="/query">Repair</a>
          <a href="">Track Order</a>
          <a href="">Contact Us</a>
        </div>

        <div className="flex justify-around items-center w-full text-[#ffffff]/50 mt-5">
          <h1 className="text-sm sm:text-base md:text-lg" >&copy; 2024 Tool Snitch</h1>
          <div className="flex w-[20%] justify-around items-center">
            <a href="" className="" target="_blank" >
              <FaTwitter className="md:size-5 lg:size-6" />
            </a>
            <a href="" className="" target="_blank" >
              <FaInstagram className="md:size-5 lg:size-6"/>
            </a>
            <a href="" className="" target="_blank" >
              <FaLinkedinIn className="md:size-5 lg:size-6" />
            </a>
          </div>
          <a href="" className="text-sm sm:text-base md:text-lg">Terms & Conditions</a>
        </div>
      </div>

    </div>
  );
}
