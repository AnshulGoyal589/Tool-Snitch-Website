'use client';

import { Button } from '@nextui-org/react'
import { Toast } from '@/components/ui/toast'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getUserSession } from '@/utils/auth'
import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"

interface DeviceInfo {
  deviceName: string;
  shopName: string;
  repairSummary: string[];
  totalPrice: string;
  userLocation: string;
  shopLocation: string;
}

interface DateObject {
  day: string;
  date: Date;
}

const Page = () => {
  const router = useRouter();
  
  // States
  const [selectedDay, setSelectedDay] = useState<DateObject | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dates, setDates] = useState<DateObject[]>([]);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceName: '',
    shopName: '',
    repairSummary: [],
    totalPrice: '',
    userLocation: '',
    shopLocation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  // Initialize dates and fetch device info
  useEffect(() => {
    try {
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
      const repairSummary = JSON.parse(localStorage.getItem('selectedProblems') || '[]');
      const totalPrice = localStorage.getItem('totalPrice') || '';
      const userLocation = localStorage.getItem('selectedLocation') || '';
      const shopLocation = localStorage.getItem('shopLocation') || '';

      // Validate required data
      if (!deviceName || !shopName) {
        throw new Error('Missing required device information');
      }

      setDeviceInfo({
        deviceName,
        shopName,
        repairSummary,
        totalPrice,
        userLocation,
        shopLocation
      });
    } catch (error) {
      console.error('Initialization error:', error);
      setError('Failed to load appointment information. Please try again.');
      showToastMessage('Error loading appointment information');
    }
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const validateAppointment = () => {
    if (!selectedDay) {
      showToastMessage('Please select a day for your appointment');
      return false;
    }
    if (!selectedTime) {
      showToastMessage('Please select a time for your appointment');
      return false;
    }
    return true;
  };

  const handleBookAppointment = async () => {
    try {
      if (!validateAppointment()) return;
      
      setIsLoading(true);
      setError(null);

      // Get user's Cognito ID
      const cognitoId = await getUserSession();
      
      // Get required data from localStorage
      const shopId = localStorage.getItem('shopID');
      const deviceName = localStorage.getItem('selectedBrand');
      const repairSummary = JSON.parse(localStorage.getItem('selectedProblems') || '[]');
      
      if (!shopId || !deviceName || !repairSummary.length) {
        throw new Error('Missing required booking information');
      }

      const response = await api.post('/appointments/book', {
        cognitoId,
        shopId,
        deviceName,
        repairSummary,
        appointmentDate: selectedDay?.date,
        appointmentTime: selectedTime
      });

      if (response.status === 200) {
        showToastMessage('Appointment booked successfully!');
        // Clear relevant localStorage items
        localStorage.removeItem('selectedProblems');
        localStorage.removeItem('totalPrice');
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          router.push('/get-it-fixed');
        }, 1500);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to book appointment');
      showToastMessage(error.message || 'Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <Button onClick={() => router.push('/get-it-fixed')}>
          Return to Shop Selection
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:justify-around">
        {/* Left Column */}
        <div className="lg:w-[60vw]">
          <p className="font-josefin font-bold lg:text-[64px] md:text-[50px] sm:text-[40px] text-neutral-800">
            Book an Appointment
          </p>
          <span className="text-gray-500 pt-10 font-inter p-2">Choose a day</span>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 pt-[16px]">
            {dates.map((dateObj, index) => (
              <Button
                key={index}
                className={`${selectedDay && selectedDay.day === dateObj.day
                  ? 'bg-[#C6A86B] text-white'
                  : 'bg-[transparent] hover:bg-[#C6A86B] hover:text-white'
                  } border border-[#C6A86B] w-full h-[60px] lg:h-[120px]`}
                onClick={() => setSelectedDay(dateObj)}
                disabled={isLoading}
              >
                {dateObj.day}
              </Button>
            ))}
          </div>

          <div className="pt-[32px] pb-[16px]">
            <span className="font-inter text-neutral-600">Pick a time on</span>
            <span className="font-bold font-inter text-neutral-600">
              {selectedDay ? ` ${selectedDay.day}, ${formatDate(selectedDay.date)}` : ''}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {times.map((time) => (
              <Button
                key={time}
                className={`${selectedTime === time
                  ? 'bg-[#C6A86B] text-white'
                  : 'bg-[transparent] hover:bg-[#C6A86B] hover:text-white'
                  } border lg:w-full lg:h-[51px]`}
                onClick={() => setSelectedTime(time)}
                disabled={isLoading}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="pt-[64px] flex flex-col gap-4 lg:max-w-[25vw]">
          <h1 className="font-bold font-inter text-neutral-500">Device Name</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.deviceName}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Your Location</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.userLocation}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Shop Name</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.shopName}</h1>
          <h1 className="font-bold font-inter text-neutral-500">Shop Location</h1>
          <h1 className="font-medium font-inter text-neutral-700 text-xl">{deviceInfo.shopLocation}</h1>

          <div className="pb-4">
            <span className="font-bold font-inter text-neutral-500">Estimated Price&nbsp;</span>
            <span className="pr-4 font-bold font-inter text-neutral-900">Rs {deviceInfo.totalPrice}</span>
            <Button
              className="w-[250px] mt-5 rounded-xl h-[50px] bg-[transparent] font-bold text-neutral-500 border border-neutral-400 hover:bg-[#C6A86B] hover:text-white flex justify-center items-center"
              onClick={handleBookAppointment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {/* {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )} */}
    </div>
  );
};

export default Page;