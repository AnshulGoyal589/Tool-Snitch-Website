'use client'

import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface AppointmentDetails {
  date: string;
  time: string;
  _id: string;
}

interface OrderDetails {
  _id: string;
  message: string;
  createdAt: string;
  createdBy: string;
  device: string;
  issue: string;
  status: string;
  appointmentDetails: AppointmentDetails;
}

interface Order {
  status: AppointmentStatus;
  _id: string;
  order_id: string;
  shop_id: string;
  createdByCognitoId: string;
  createdAt: string;
  cancelled: boolean;
}

interface AppointmentData {
  success: boolean;
  order: Order[];
  order_details: OrderDetails;
}

interface AppointmentHeroProps {
  data?: AppointmentData | null;
}

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}

type AppointmentStatus = 
  | 'Appointment Booked'
  | 'Spare Parts Pending'
  | 'Device Collection'
  | 'In Progress'
  | 'Completed';

const LoadingSkeleton = () => (
  <div className="p-8 bg-white rounded-lg shadow-md animate-pulse">
    <Skeleton className="h-8 w-64 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-4">
          {[...Array(4)].map((_, j) => (
            <div key={j}>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-6 w-48" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const getStatusConfig = (status: AppointmentStatus, cancelled: boolean): StatusConfig => {
  if (cancelled) {
    return {
      label: 'Cancelled',
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800'
    };
  }

  const configs: Record<AppointmentStatus, StatusConfig> = {
    'Appointment Booked': {
      label: 'Appointment Booked',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    'Spare Parts Pending': {
      label: 'Spare Parts Pending',
      icon: Package,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800'
    },
    'Device Collection': {
      label: 'Collecting Device',
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    'In Progress': {
      label: 'Repair in Progress',
      icon: Truck,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    'Completed': {
      label: 'Repair Completed',
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    }
  };

  return configs[status];
};

const APPOINTMENT_STAGES: AppointmentStatus[] = [
  'Appointment Booked',
  'Spare Parts Pending',
  'Device Collection',
  'In Progress',
  'Completed'
];

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'PPP');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export function AppointmentHero({ data }: AppointmentHeroProps) {
  // Move useEffect to the top level
  useEffect(() => {
    if (data?.success && data.order?.length) {
      try {
        localStorage.setItem('appointmentId', data.order[0]._id);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [data]);

  if (!data) {
    return <LoadingSkeleton />;
  }

  if (!data.success || !data.order?.length || !data.order_details) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Appointment</h1>
        <p className="text-gray-600">Unable to load appointment details. Please try again later.</p>
      </div>
    );
  }

  try {
    const { order_details, order } = data;
    const statusConfig = getStatusConfig(order[0].status, order[0].cancelled);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Appointment Details</h1>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bgColor}`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            <span className={`text-sm font-medium ${statusConfig.textColor}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 font-medium mb-1">Appointment ID</p>
              <p className="text-gray-900">{order[0]._id}</p>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Created By</p>
              <p className="text-gray-900">{order_details.createdBy}</p>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Device</p>
              <p className="text-gray-900">{order_details.device}</p>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Issue</p>
              <p className="text-gray-900">{order_details.issue}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 font-medium mb-1">Appointment Date</p>
              <p className="text-gray-900">
                {formatDate(order_details.appointmentDetails.date)}
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Appointment Time</p>
              <p className="text-gray-900">{order_details.appointmentDetails.time}</p>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Current Stage</p>
              <div className="flex flex-wrap gap-2">
                {APPOINTMENT_STAGES.map((stage) => {
                  const stageConfig = getStatusConfig(stage, false);
                  const isCurrentOrPassed = stage === 'Completed' || 
                    APPOINTMENT_STAGES.indexOf(stage) <= APPOINTMENT_STAGES.indexOf(order[0].status);
                  
                  return (
                    <div
                      key={stage}
                      className={`flex items-center px-3 py-1 rounded-full ${
                        isCurrentOrPassed ? stageConfig.bgColor : 'bg-gray-100'
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        isCurrentOrPassed ? stageConfig.textColor : 'text-gray-500'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-1">Created At</p>
              <p className="text-gray-900">{formatDate(order_details.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering appointment details:', error);
    return (
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">An error occurred while displaying the appointment details.</p>
      </div>
    );
  }
}