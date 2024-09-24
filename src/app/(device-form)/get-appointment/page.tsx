import { Button } from '@nextui-org/react'
import React from 'react'
import { DateCalendar } from './datecalendar'

const page = () => {
  return (
    <div>
        <div className="flex flex-col lg:justify-center sm:justify-left md:justify-left items-start lg:pl-[120px] md:pl-[20px] sm:ml-10">
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2'>
                <div className='lg:col-span-3 sm:col-span-1 md:col-span-1 lg:pr-72 md:pr-10'>
                <p className=" font-josefin font-bold lg:text-[64px] sm:text-[60px] text-neutral-800">Book an appointment</p>

           <span className='text-gray-500 pt-10 font-regular font-inter text-neutral-500 p-2'> Choose a date</span>
           
           <div className="">
           
            
           <div className='grid grid-cols-7 md:gap-24 sm:gap-24 lg:gap-0 pt-[16px]'>
            <div className=''><Button className='bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-[120px] md:w-[40px] md:h-[40px] sm:w-[30] sm:h-[30] border-[#C6A86B] lg:h-[120px]'>wed</Button></div>
            <div className=''><Button className='bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-[120px]  md:w-[40px] md:h-[40px] sm:w-[30] sm:h-[30] border-neutral-300 lg:h-[120px]'>Thu</Button></div>
            <div className=''><Button className='bg-[transparent]  hover:bg-[#C6A86B] hover:text-white border lg:w-[120px] md:w-[40px] md:h-[40px] sm:w-[30] sm:h-[30] border-neutral-300 lg:h-[120px]'>Fri</Button></div>
            <div><Button className='bg-[transparent]  hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[120px] border-neutral-300 h-[120px]'>Sat</Button></div>
            <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white hover:bg-[#C6A86B] hover:text-white border w-[120px] border-neutral-300 h-[120px]'>Sun</Button></div>
            <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[120px] border-neutral-300 h-[120px]'>Mon</Button></div>
            <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[120px] border-neutral-300 h-[120px]'>Tue</Button></div>            
           </div></div>

           <div className='pt-[32px] pb-[16px]'><span className='font-regular font-inter text-neutral-600'> Pick a time on</span><span className='font-bold font-inter text-neutral-600'> Wednesday,13th september</span></div>
           <div className="">
           <div className='grid grid-cols-5 sm:gap-24 md:gap-20 lg:gap-[12px]'>
           
           <div className=''><Button className='bg-[transparent] hover:bg-[#C6A86B] hover:text-white border  lg:w-[172px] lg:h-[51px] sm:w-[20px] sm:h-[40px]  md:w-[80px] md:h-[40px] border-neutral-300'>Anytime</Button></div>
           <div><Button className='bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-[172px] lg:h-[51px] sm:w-[20px] sm:h-[40px] md:w-[80px] md:h-[40px] border-neutral-300 font-regular font-inter text-neutral-700'>10:00 AM</Button></div>
           <div><Button className='bg-[transparent] hover:bg-[#C6A86B] hover:text-white border lg:w-[172px]  lg:h-[51px] sm:w-[20px] sm:h-[40px] md:w-[80px] md:h-[40px] border-neutral-300 font-regular font-inter text-neutral-700'>11:00 AM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>12:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>01:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>02:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>03:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>04:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>05:00 PM</Button></div>
           <div><Button className='bg-[transparent] hidden lg:block hover:bg-[#C6A86B] hover:text-white border w-[172px] border-neutral-300 h-[51px] font-regular font-inter text-neutral-700'>06:00 PM</Button></div>
           </div>
           </div>
           </div>
           <div className='pt-[138px] pl-[60px] '> 
            <div className='pb-[16px]'><span className='font-bold font-inter text-neutral-500'>Problem statement</span></div>
            <div className='flex items-center'><Button className='w-[80px] h-[80px] bg-[#C6A86B]'/><span className='pl-[16px] font-medium font-inter text-neutral-700'>Samsung S20 FE</span></div>
           <div className='pb-[16px] pt-[32px] '><span className='font-bold font-inter text-neutral-500'>Shop Summary</span></div>
           <div className='flex items-center'><Button className='w-[80px] h-[80px] bg-[#C6A86B]'/><span className='pl-[16px] font-medium font-inter text-neutral-700'>QuickFix Tech Solutions </span></div>


           <div className='pb-[5px] pt-[32px] '><span className='font-bold font-inter text-neutral-500'>Repair Summary</span></div>
           <div className='flex items-center pt-2'><Button className='w-[80px] h-[80px] bg-[#C6A86B]'/><span className='pl-[16px] font-medium font-inter text-neutral-700'>Screen Repair</span></div>
           <div className='flex items-center pt-2'><Button className='w-[80px] h-[80px] bg-[#C6A86B]'/><span className='pl-[16px] font-medium font-inter text-neutral-700'>Full Repair </span></div>
           <div className='flex items-center pt-2 pb-5'><Button className='w-[80px] h-[80px] bg-[#C6A86B]'/><span className='pl-[16px] font-medium font-inter text-neutral-700'>Complete Repair </span></div>

           
           <div className='pb-4'><span className='pr-4 font-bold font-inter text-neutral-900'>Rs 9999</span><Button className='w-[200px] rounded-xl h-[50px] bg-[transparent] font-bold font-inter text-neutral-500 border border-neutral-400 hover:bg-[#C6A86B] hover:text-white hover:border-white'> Book Appointment</Button></div>
         





           </div>


           </div>


        </div>
    </div>
  )
}

export default page