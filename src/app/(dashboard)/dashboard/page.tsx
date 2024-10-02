'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SalesDataPoint {
  month: string;
  sales: number;
}

interface Notification {
  id: number;
  message: string;
}

interface ClosingDateRange {
  id: number;
  startDate: Date;
  endDate: Date;
  notice: string;
}

const Dashboard = () => {
  const [shopName] = useState('My Shop');
  const [openingTime, setOpeningTime] = useState('09:00');
  const [closingTime, setClosingTime] = useState('18:00');
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [closingDateRanges, setClosingDateRanges] = useState<ClosingDateRange[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [notice, setNotice] = useState('');

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

  const handleOpeningTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClosingTime(e.target.value);
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date && (!endDate || date > endDate)) {
      setEndDate(date);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate && date >= startDate) {
      setEndDate(date);
    }
  };

  const handleAddClosingDateRange = () => {
    if (startDate && endDate && notice) {
      const newRange: ClosingDateRange = {
        id: Date.now(),
        startDate,
        endDate,
        notice
      };
      setClosingDateRanges([...closingDateRanges, newRange]);
      setStartDate(undefined);
      setEndDate(undefined);
      setNotice('');
    }
  };

  const handleRemoveClosingDateRange = (id: number) => {
    setClosingDateRanges(closingDateRanges.filter(range => range.id !== id));
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
      <h1 className="text-4xl font-bold mb-8 text-center">{shopName}</h1>
      
      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {/* Shop Hours Card */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="openingTime">Opening Time</Label>
              <Input
                id="openingTime"
                type="time"
                value={openingTime}
                onChange={handleOpeningTimeChange}
              />
            </div>
            <div>
              <Label htmlFor="closingTime">Closing Time</Label>
              <Input
                id="closingTime"
                type="time"
                value={closingTime}
                onChange={handleClosingTimeChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="max-h-48 overflow-y-auto">
            {notifications.map((notification) => (
              <Alert key={notification.id} className="mb-2">
                <AlertDescription>{notification.message}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Sales Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
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
      </div>

      {/* Store Closing Date Ranges Card */}
      <Card>
        <CardHeader>
          <CardTitle>Store Closing Date Ranges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex gap-4 mb-4">
                <div>
                  <Label>Start Date</Label>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateSelect}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateSelect}
                    disabled={(date) => date < (startDate ?? new Date())}
                    className="rounded-md border"
                  />
                </div>
              </div>
              <Label htmlFor="notice">Closing Notice</Label>
              <Textarea
                id="notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleAddClosingDateRange}>Add Closing Date Range</Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Closing Date Ranges:</h4>
              {closingDateRanges.map((range) => (
                <div key={range.id} className="mb-4 p-2 border rounded">
                  <p>From: {formatDate(range.startDate)} To: {formatDate(range.endDate)}</p>
                  <p>Notice: {range.notice}</p>
                  <Button variant="destructive" onClick={() => handleRemoveClosingDateRange(range.id)}>Remove</Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;