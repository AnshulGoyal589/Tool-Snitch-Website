'use client';

import { Button } from '@nextui-org/react'
import local from 'next/font/local';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [selectedDay, setSelectedDay] = useState<{ day: string, date: Date } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dates, setDates] = useState<{ day: string, date: Date }[]>();
  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: '',
    shopName: '',
    repairSummary: [],
    totalPrice: '',
    userLocation: '',
    shopLocation: ''
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['Anytime', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  useEffect(() => {
    // Calculate dates
    const today = new Date();
    const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        day: days[date.getDay()],
        date: date
      };
    });
    setDates(nextSevenDays);
    setSelectedDay(nextSevenDays[0]);

    // Fetch data from localStorage
    const deviceName = localStorage.getItem('selectedBrand') || '';
    const shopName = localStorage.getItem('shopName') || '';
    const repairSummary = JSON.parse(localStorage.getItem('repairSummary') || '[]');
    const totalPrice = localStorage.getItem('totalPrice') || '';
    const userLocation = localStorage.getItem('selectedLocation') || '';
    const shopLocation = localStorage.getItem('shopLocation') || '';

    setDeviceInfo({
      deviceName,
      shopName,
      repairSummary,
      totalPrice,
      userLocation,
      shopLocation
    });
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:justify-around">
        <div className="lg:w-[60vw]">
          <p className="font-josefin font-bold lg:text-[64px] md:text-[50px] sm:text-[40px] text-neutral-800">
            Book an Appointment
          </p>
          <span className="text-gray-500 pt-10 font-inter p-2">Choose a date</span>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 pt-[16px]">
            {dates && dates.map((dateObj, index) => (
              <Button
                key={index}
                className={`${selectedDay && selectedDay.day === dateObj.day
                  ? 'bg-[#C6A86B] text-white'
                  : 'bg-[transparent] hover:bg-[#C6A86B] hover:text-white'
                  } border border-[#C6A86B] w-full h-[60px] lg:h-[120px]`}
                onClick={() => setSelectedDay(dateObj)}
              >
                {dateObj.day}
              </Button>
            ))}
          </div>

          <div className="pt-[32px] pb-[16px]">
            <span className="font-inter text-neutral-600">Pick a time on</span>
            <span className="font-bold font-inter text-neutral-600"> {selectedDay ? `${selectedDay.day}, ${formatDate(selectedDay.date)}` : ''}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {times.map((time, index) => (
              <Button
                key={time}
                className={`${selectedTime === time
                  ? 'bg-[#C6A86B] text-white'
                  : 'bg-[transparent] hover:bg-[#C6A86B] hover:text-white'
                  } border lg:w-full lg:h-[51px]`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-[64px] flex flex-col gap-4 max-w-[25vw]">
          <h1 className="font-bold font-inter text-neutral-500">Device Name</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.deviceName}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Your Location</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.userLocation}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Shop Name</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.shopName}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Shop Location</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.shopLocation}</h1>

          {/* <div className="pb-[5px] pt-[24px]">
              <span className="font-bold font-inter text-neutral-500">Repair Summary</span>
            </div>
            {deviceInfo.repairSummary.map((repair, index) => (
              <div key={index} className="flex items-center pt-2">
                <Button className="w-[80px] h-[80px] bg-[#C6A86B]" />
                <span className="pl-[16px] font-medium font-inter text-neutral-700">{repair}</span>
              </div>
            ))} */}

          <div className="pb-4">
            <span className="font-bold font-inter text-neutral-500">Estimated Price&nbsp;</span>
            <span className="pr-4 font-bold font-inter text-neutral-900">Rs {deviceInfo.totalPrice}</span>
            <Link href={"/get-it-fixed"} className="w-[250px] mt-5 rounded-xl  h-[50px] bg-[transparent] font-bold text-neutral-500 border border-neutral-400 hover:bg-[#C6A86B] hover:text-white flex justify-center items-center">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page