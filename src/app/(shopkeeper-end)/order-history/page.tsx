'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api } from "@/api/api";
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/utils/auth';
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  message: string;
  createdAt: Date;
  createdBy: string;
  device: string;
  issue: string;
  status: 'pending' | 'completed';
  appointmentDetails: {
    date: string;
    time: string;
  };
}

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [shopName, setShopname] = useState('My Shop');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const id = await getUserSession();
        await fetchData(id);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const fetchData = async (userId: string) => {
    try {
      const shopResponse = await api.get(`/shop/${userId}`);
      const shopData = shopResponse.data;
      setShopname(shopData.shopName || 'My Shop');
      
      const notificationsResponse = await api.get(`/shop/${userId}/notifications`);
      setNotifications(notificationsResponse.data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
      setErrorMessage('Failed to load shop data');
    }
  };

  const formatAppointmentDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (date: Date): string => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
          <AlertDescription>Please wait while we load your dashboard.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">{shopName}</h1> */}
      
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Order History</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100vh-200px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <Alert key={notification.id} className="mb-2 p-3">
                <AlertDescription>
                  <div className="space-y-1 p-4">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{notification.createdBy}</span>
                      <Badge 
                        variant={notification.status === 'completed' ? 'default' : 'secondary'}
                        className={`${
                          notification.status === 'completed' 
                            ? 'bg-green-100 text-green-800 text-xl py-2 px-4' 
                            : 'bg-yellow-100 text-yellow-800 text-xl py-2 px-4'
                        }`}
                      >
                        {notification.status}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Device:</span> {notification.device}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Issue:</span> {notification.issue}
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-600">Appointment Issue Date:</span>{' '}
                        {formatAppointmentDateTime(notification.appointmentDetails.date)},{' '}
                        {notification.appointmentDetails.time}
                      </div>
                      {/* <div className="text-xs text-gray-500">
                        {formatDateTime(notification.createdAt)}
                      </div> */}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;