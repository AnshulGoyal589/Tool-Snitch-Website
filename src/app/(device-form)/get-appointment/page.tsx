import { Button } from '@nextui-org/react'
import React from 'react'


const page = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:justify-center sm:justify-left items-start">
      
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-4">
        <div className="lg:col-span-3 sm:col-span-1">
          <p className="font-josefin font-bold lg:text-[64px] md:text-[50px] sm:text-[40px] text-neutral-800">
            Book an appointment
          </p>
          <span className="text-gray-500 pt-10 font-inter p-2">Choose a date</span>

          
          <div className="grid grid-cols-7 gap-4 pt-[16px]">
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border border-[#C6A86B] w-full h-[60px] lg:h-[120px]">Wed</Button>
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border border-neutral-300 w-full h-[60px] lg:h-[120px]">Thu</Button>
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border border-neutral-300 w-full h-[60px] lg:h-[120px]">Fri</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border border-neutral-300 h-[120px]">Sat</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border border-neutral-300 h-[120px]">Sun</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border border-neutral-300 h-[120px]">Mon</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border border-neutral-300 h-[120px]">Tue</Button>
          </div>

          
          <div className="pt-[32px] pb-[16px]">
            <span className="font-inter text-neutral-600">Pick a time on</span>
            <span className="font-bold font-inter text-neutral-600"> Wednesday, 13th September</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-full lg:h-[51px]">Anytime</Button>
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-full lg:h-[51px]">10:00 AM</Button>
            <Button className="bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-full lg:h-[51px]">11:00 AM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">12:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">01:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">02:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">03:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">04:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">05:00 PM</Button>
            <Button className="bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border lg:h-[51px]">06:00 PM</Button>
          </div>
        </div>
      

      
      <div className="pt-[64px] pl-16">
        <div className="pb-[16px]">
          <span className="font-bold font-inter text-neutral-500">Problem statement</span>
        </div>
        <div className="flex items-center">
          <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
          <span className="pl-[16px] font-medium font-inter text-neutral-700">Samsung S20 FE</span>
        </div>

        
        <div className="pb-[16px] pt-[32px]">
          <span className="font-bold font-inter text-neutral-500">Shop Summary</span>
        </div>
        <div className="flex items-center">
          <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
          <span className="pl-[16px] font-medium font-inter text-neutral-700">QuickFix Tech Solutions</span>
        </div>

        <div className="pb-[5px] pt-[32px]">
          <span className="font-bold font-inter text-neutral-500">Repair Summary</span>
        </div>
        <div className="flex items-center pt-2">
          <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
          <span className="pl-[16px] font-medium font-inter text-neutral-700">Screen Repair</span>
        </div>
        <div className="flex items-center pt-2">
          <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
          <span className="pl-[16px] font-medium font-inter text-neutral-700">Full Repair</span>
        </div>
        <div className="flex items-center pt-2 pb-5">
          <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
          <span className="pl-[16px] font-medium font-inter text-neutral-700">Complete Repair</span>
        </div>

        
        <div className="pb-4 flex items-center">
          <span className="pr-4 font-bold font-inter text-neutral-900">Rs 9999</span>
          <Button className="w-[250px] rounded-xl  h-[50px] bg-[transparent] font-bold text-neutral-500 border border-neutral-400 hover:bg-[#C6A86B] hover:text-white">
            Book Appointment
          </Button>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page