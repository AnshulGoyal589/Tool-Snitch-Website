'use client'
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SalesDataPoint {
  month: string;
  sales: number;
}

interface Notification {
  id: number;
  message: string;
}

const Dashboard = () => {
  const [shopName, setShopName] = useState('My Shop');
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [closedDates, setClosedDates] = useState<Date[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulating data fetch
    const data: SalesDataPoint[] = [
      { month: 'Jan', sales: 4000 },
      { month: 'Feb', sales: 3000 },
      { month: 'Mar', sales: 5000 },
      { month: 'Apr', sales: 4500 },
      { month: 'May', sales: 6000 },
      { month: 'Jun', sales: 5500 },
    ];
    setSalesData(data);

    // Simulating notifications fetch
    const fakeNotifications: Notification[] = [
      { id: 1, message: "New booking: John Doe for 2023-10-05" },
      { id: 2, message: "Booking update: Jane Smith changed date to 2023-10-10" },
    ];
    setNotifications(fakeNotifications);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setClosedDates((prev) => {
        const isAlreadySelected = prev.some(date => 
          date.toDateString() === selectedDate.toDateString()
        );
        if (isAlreadySelected) {
          return prev.filter(date => 
            date.toDateString() !== selectedDate.toDateString()
          );
        } else {
          return [...prev, selectedDate];
        }
      });
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shop Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={shopName}
                onChange={handleShopNameChange}
                disabled={!isEditing}
              />
            </div>
            <Button onClick={handleEditToggle}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Closure Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={closedDates}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
            <div className="mt-4">
              <h4 className="font-semibold">Closed Dates:</h4>
              <ul>
                {closedDates.map((date) => (
                  <li key={date.toISOString()}>{formatDate(date)}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.map((notification) => (
              <Alert key={notification.id} className="mb-4">
                <AlertTitle>New Booking</AlertTitle>
                <AlertDescription>{notification.message}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;