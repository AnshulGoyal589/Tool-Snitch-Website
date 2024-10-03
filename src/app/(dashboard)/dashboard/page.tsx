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
import { api } from "@/api/api";

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
  const [editingHours, setEditingHours] = useState(false);
  const [tempOpeningTime, setTempOpeningTime] = useState('09:00');
  const [tempClosingTime, setTempClosingTime] = useState('18:00');
  const [errorMessage, setErrorMessage] = useState('');
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

  const validateTime = (time: string): boolean => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  };

  const handleEditHours = () => {
    setEditingHours(true);
    setTempOpeningTime(openingTime);
    setTempClosingTime(closingTime);
  };

  const handleSaveHours = () => {
    if (!validateTime(tempOpeningTime) || !validateTime(tempClosingTime)) {
      setErrorMessage('Invalid time format. Please use HH:MM and ensure hours are 0-23 and minutes are 0-59.');
      return;
    }

    const openingMinutes = getMinutesFromTime(tempOpeningTime);
    const closingMinutes = getMinutesFromTime(tempClosingTime);

    if (closingMinutes <= openingMinutes) {
      setErrorMessage('Closing time must be later than opening time.');
      return;
    }

    setOpeningTime(tempOpeningTime);
    setClosingTime(tempClosingTime);
    setEditingHours(false);
    setErrorMessage('');

    // Simulate sending data to backend
    sendUpdatedHoursToBackend(tempOpeningTime, tempClosingTime);
  };

  const getMinutesFromTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const sendUpdatedHoursToBackend = async (opening: string, closing: string) => {
    try {
      const response = await api.post('/shopkeeperUpdate/dailyHours', {
        cognitoId: 'your-cognito-id-here', // You'll need to replace this with the actual Cognito ID
        openingTime: opening,
        closingTime: closing
      });

      if (response.status === 200) {
        console.log('Shop hours updated successfully');
        // You might want to show a success message to the user here
      }
    } catch (error) {
      console.error('Error updating shop hours:', error);
      setErrorMessage('Failed to update shop hours. Please try again.');
      // You might want to show an error message to the user here
    }
  };

  const handleOpeningTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempClosingTime(e.target.value);
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
            {editingHours ? (
              <>
                <div className="mb-4">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={tempOpeningTime}
                    onChange={handleOpeningTimeChange}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={tempClosingTime}
                    onChange={handleClosingTimeChange}
                  />
                </div>
                {errorMessage && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <Button onClick={handleSaveHours}>Save Changes</Button>
              </>
            ) : (
              <>
                <p className="mb-2">Opening Time: {openingTime}</p>
                <p className="mb-4">Closing Time: {closingTime}</p>
                <Button onClick={handleEditHours}>Edit Hours</Button>
              </>
            )}
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