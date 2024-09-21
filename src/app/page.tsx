import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


export default function Home() {
  return (
    <div className="">

      <div className="flex flex-col items-center justify-center text-[#212121] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold my-6">
        <h1>Have a broken device?</h1>
        <h1>We'll find stores to fix it</h1>
      </div>

      <div className="flex justify-center items-center">
        <button className="bg-[#C6A86B] py-5 px-10 rounded-full text-white text-xl my-5">Lets fix it</button>
      </div>

      <div className="flex items-center justify-center my-10">
        <img src="/iPhone.png" alt="" className="relative z-10 max-h-[880px] max-w-[709px] h-[140vh] w-[80vw] sm:w-[60vw] md:w-[50vw] " />
        <div className="absolute max-h-[680px] w-[90%] h-[90%] bg-[#212121] rounded-[64px]">
          <h1 className="absolute left-[5%] bottom-[10%] text-white z-20 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">Why <br /> Tool Snitch?</h1>
        </div>
      </div>

      <img src="/group.png" alt="" className="w-full" />

      <div className="text-center max-w-[70%] text-[#212121] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-6 mx-auto">
        <h1>Get your device fixed with Tool Snitch in just 4 simple steps</h1>
      </div>

      <div className="bg-[#212121] my-10 py-16 px-10 sm:px-12 md:px-14 lg:px-20">
        <h1 className="text-white text-center text-5xl font-semibold">We can help you fix</h1>
        <div className="grid md:grid-cols-3 my-10 gap-10">
          <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
            <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]">Smartphones</h1>
          </div>
          <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
            <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]">Laptops</h1>
          </div>
          <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center">
            <h1 className="text-5xl sm:text-7xl md:text-3xl lg:text-5xl xl:text-6xl text-[#B7B7B7]">Laptops</h1>
          </div>
          <div className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center md:col-span-3">
            <h1 className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl text-[#878787] text-center">More comming soon</h1>
          </div>
        </div>
      </div>

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

      <div className="bg-[#212121] mt-10 py-16 px-10 sm:px-12 md:px-14 lg:px-20 flex flex-col justify-center items-center gap-3 ">
        
        <img src="toolsnitchlogo.png" alt="" />
        
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white" >TOOL SNITCH</h1>
        
        <div className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl flex justify-center items-center text-white gap-20 py-5 font-thin">
          <a href="/about">About Us</a>
          <a href="/repair">Repair</a>
          <a href="/track">Track Order</a>
          <a href="/contact">Contact Us</a>
        </div>

        <div className="flex justify-around w-full text-[#ffffff]/50 mt-5">
          <h1 className="" >&copy; 2035 Tool Snitch</h1>
          <div className="flex gap-10">
            <a href="" className="*:md:size-5 *:lg:size-6" target="_blank" >
              <FaTwitter />
            </a>
            <a href="" className="*:md:size-5 *:lg:size-6" target="_blank" >
              <FaInstagram />
            </a>
            <a href="" className="*:md:size-5 *:lg:size-6" target="_blank" >
              <FaLinkedinIn />
            </a>
          </div>
          <a href="" className="">Terms & Conditions</a>
        </div>
      </div>

    </div>
  );
}
