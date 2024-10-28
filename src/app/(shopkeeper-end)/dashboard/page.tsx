'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/api/api";
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/utils/auth'

interface SalesDataPoint {
  month: string;
  sales: number;
}

interface Notification {
  id: number;
  message: string;
  createdAt: Date;
  createdBy: string;
  device: string;
  issue: string;
  appointmentDetails: {
    date: string;
    time: string;
  };
}

interface ClosingDateRange {
  id: number;
  startDate: Date;
  endDate: Date;
  notice: string;
}

const Dashboard = () => {
  const router = useRouter();

  const [cognitoId, setCognitoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [shopName,setShopname] = useState('My Shop');
  const [openingTime, setOpeningTime] = useState('09:00 AM');
  const [closingTime, setClosingTime] = useState('18:00 PM');
  const [tempOpeningTime, setTempOpeningTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  const [tempClosingTime, setTempClosingTime] = useState({ hour: '06', minute: '00', period: 'PM' });


  const [editingHours, setEditingHours] = useState(false);
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [closingDateRanges, setClosingDateRanges] = useState<ClosingDateRange[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const id = await getUserSession();
        setCognitoId(id);
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
      
      setOpeningTime(shopData.openingTime || '09:00');
      setClosingTime(shopData.closingTime || '18:00');
      setShopname(shopData.shopName || 'My Shop' );
      const salesResponse = await api.get(`/shop/${userId}/sales`);
      setSalesData(salesResponse.data);
      
      const notificationsResponse = await api.get(`/shop/${userId}/notifications`);
      setNotifications(notificationsResponse.data);
      
      const closingRangesResponse = await api.get(`/shop/${userId}/closingRanges`);
      setClosingDateRanges(closingRangesResponse.data.map((range: any) => ({
        ...range,
        startDate: new Date(range.startDate),
        endDate: new Date(range.endDate)
      })));
    } catch (error) {
      console.error('Error fetching shop data:', error);
      setErrorMessage('Failed to load shop data');
    }
  };

  // const convertTo24Hour = (time: { hour: string; minute: string; period: string }): number => {
  //   let hours = parseInt(time.hour, 10);
  //   const minutes = parseInt(time.minute, 10);
  //   if (time.period === 'PM' && hours !== 12) hours += 12;
  //   if (time.period === 'AM' && hours === 12) hours = 0;
  //   return hours * 60 + minutes;
  // };

  // const convertTo12Hour = (minutes: number): { hour: string; minute: string; period: string } => {
  //   let hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   const period = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12 || 12;
  //   return {
  //     hour: hours.toString().padStart(2, '0'),
  //     minute: mins.toString().padStart(2, '0'),
  //     period
  //   };
  // };

  // const validateTime = (time: { hour: string; minute: string }): boolean => {
  //   const hour = parseInt(time.hour, 10);
  //   const minute = parseInt(time.minute, 10);
  //   return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
  // };

  // Update the time conversion functions
const convertTo24Hour = (time: { hour: string; minute: string; period: string }): number => {
  let hours = parseInt(time.hour);
  const minutes = parseInt(time.minute);
  if (time.period === 'PM' && hours !== 12) hours += 12;
  if (time.period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

  const convertTo12Hour = (timeStr: string | number): { hour: string; minute: string; period: string } => {
    let totalMinutes: number;
    
    if (typeof timeStr === 'string') {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(num => parseInt(num));
      let totalHours = hours;
      if (period === 'PM' && hours !== 12) totalHours += 12;
      if (period === 'AM' && hours === 12) totalHours = 0;
      totalMinutes = totalHours * 60 + minutes;
    } else {
      totalMinutes = timeStr;
    }

    let hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    return {
      hour: hours.toString().padStart(2, '0'),
      minute: mins.toString().padStart(2, '0'),
      period
    };
  };

  const validateTime = (time: { hour: string; minute: string }): boolean => {
    const hour = parseInt(time.hour);
    const minute = parseInt(time.minute);
    return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
  };

  const capTimeValue = (value: string, max: number): string => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) return '00';
    if (numValue > max) return max.toString().padStart(2, '0');
    return numValue.toString().padStart(2, '0');
  };

  const handleTimeChange = (timeType: 'opening' | 'closing', field: 'hour' | 'minute' | 'period', value: string) => {
    const setTime = timeType === 'opening' ? setTempOpeningTime : setTempClosingTime;
    setTime(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveHours = async () => {
    if (!validateTime(tempOpeningTime) || !validateTime(tempClosingTime)) {
      setErrorMessage('Invalid time format. Hours must be between 1-12 and minutes between 0-59.');
      return;
    }

    const openingMinutes = convertTo24Hour(tempOpeningTime);
    const closingMinutes = convertTo24Hour(tempClosingTime);

    if (closingMinutes <= openingMinutes) {
      setErrorMessage('Closing time must be later than opening time.');
      return;
    }

    if (!cognitoId) {
      setErrorMessage('Authentication required');
      return;
    }

    try {
      const response = await api.post('/shopkeeperUpdate/dailyHours', {
        cognitoId,
        openingTime: `${tempOpeningTime.hour}:${tempOpeningTime.minute} ${tempOpeningTime.period}`,
        closingTime: `${tempClosingTime.hour}:${tempClosingTime.minute} ${tempClosingTime.period}`
      });

      if (response.status === 200) {
        setOpeningTime(`${tempOpeningTime.hour}:${tempOpeningTime.minute} ${tempOpeningTime.period}`);
        setClosingTime(`${tempClosingTime.hour}:${tempClosingTime.minute} ${tempClosingTime.period}`);
        setEditingHours(false);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error updating shop hours:', error);
      setErrorMessage('Failed to update shop hours. Please try again.');
    }
  };

  const handleEditHours = () => {
    setEditingHours(true);
    setTempOpeningTime(convertTo12Hour(convertTo24Hour(convertTo12Hour(openingTime))));
    setTempClosingTime(convertTo12Hour(convertTo24Hour(convertTo12Hour(closingTime))));
  };

  const handleTimeBlur = (timeType: 'opening' | 'closing', field: 'hour' | 'minute') => {
    const updatedOpeningTime = { ...tempOpeningTime };
    let updatedClosingTime = { ...tempClosingTime };

    if (timeType === 'opening') {
      if (field === 'hour') {
        updatedOpeningTime.hour = capTimeValue(updatedOpeningTime.hour, 12);
      } else if (field === 'minute') {
        updatedOpeningTime.minute = capTimeValue(updatedOpeningTime.minute, 59);
      }
    } else {
      if (field === 'hour') {
        updatedClosingTime.hour = capTimeValue(updatedClosingTime.hour, 12);
      } else if (field === 'minute') {
        updatedClosingTime.minute = capTimeValue(updatedClosingTime.minute, 59);
      }
    }

    const openingMinutes = convertTo24Hour(updatedOpeningTime);
    const closingMinutes = convertTo24Hour(updatedClosingTime);

    if (closingMinutes <= openingMinutes) {
      // Set closing time to 1 hour after opening time
      const newClosingMinutes = openingMinutes + 60;
      updatedClosingTime = convertTo12Hour(newClosingMinutes);
    }

    setTempOpeningTime(updatedOpeningTime);
    setTempClosingTime(updatedClosingTime);
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date && (!endDate || date > endDate)) {
      setEndDate(date);
    }
  };

  const formatAppointmentDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate && date >= startDate) {
      setEndDate(date);
    }
  };

  const handleAddClosingDateRange = async () => {
    if (!cognitoId || !startDate || !endDate || !notice) return;

    try {
      const response = await api.post(`/shop/${cognitoId}/closingRanges`, {
        startDate,
        endDate,
        notice
      });

      if (response.status === 200) {
        const newRange: ClosingDateRange = {
          id: response.data.id,
          startDate,
          endDate,
          notice
        };
        setClosingDateRanges([...closingDateRanges, newRange]);
        setStartDate(undefined);
        setEndDate(undefined);
        setNotice('');
      }
    } catch (error) {
      console.error('Error adding closing date range:', error);
      setErrorMessage('Failed to add closing date range');
    }
  };

  const handleRemoveClosingDateRange = async (id: number) => {
    if (!cognitoId) return;

    try {
      await api.delete(`/shop/${cognitoId}/closingRanges/${id}`);
      setClosingDateRanges(closingDateRanges.filter(range => range.id !== id));
    } catch (error) {
      console.error('Error removing closing date range:', error);
      setErrorMessage('Failed to remove closing date range');
    }
  };

  const formatDateTime = (date: Date): string => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
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
  
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{shopName}</h1>
      
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-12 gap-8">

        <Card  className="col-span-5" >
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

        <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Shop Hours</CardTitle>
        </CardHeader>
        <CardContent>
          {editingHours ? (
            <>
             <div className="mb-4">
      <Label>Opening Time</Label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={tempOpeningTime.hour}
          onChange={(e) => handleTimeChange('opening', 'hour', e.target.value)}
          onBlur={() => handleTimeBlur('opening', 'hour')}
          className="w-16"
        />
        <span>:</span>
        <Input
          type="number"
          value={tempOpeningTime.minute}
          onChange={(e) => handleTimeChange('opening', 'minute', e.target.value)}
          onBlur={() => handleTimeBlur('opening', 'minute')}
          className="w-16"
        />
        <Select
          value={tempOpeningTime.period}
          onValueChange={(value) => handleTimeChange('opening', 'period', value)}
        >
                    <SelectTrigger className="w-20">
                      <SelectValue>{tempOpeningTime.period}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <Label>Closing Time</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={tempClosingTime.hour}
                    onChange={(e) => handleTimeChange('closing', 'hour', e.target.value)}
                    className="w-16"
                  />
                  <span>:</span>
                  <Input
                    type="number"
                    value={tempClosingTime.minute}
                    onChange={(e) => handleTimeChange('closing', 'minute', e.target.value)}
                    className="w-16"
                  />
                  <Select
                    value={tempClosingTime.period}
                    onValueChange={(value) => handleTimeChange('closing', 'period', value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue>{tempClosingTime.period}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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

        <Card className="col-span-4 row-span-2">
          <CardHeader>
            <CardTitle>Appointment Notifications</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100vh-300px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <Alert key={notification.id} className="mb-4">
                  <AlertTitle className="font-semibold text-lg mb-2">
                    New Appointment Request
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-medium text-sm text-gray-600">Customer</p>
                          <p>{notification.createdBy}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-600">Device</p>
                          <p>{notification.device}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-600">Issue</p>
                        <p>{notification.issue}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-medium text-sm text-gray-600">Date</p>
                          <p>{formatAppointmentDateTime(notification.appointmentDetails.date)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-600">Time</p>
                          <p>{notification.appointmentDetails.time}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Requested: {formatDateTime(notification.createdAt)}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Add Closing Date Range</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Closing Date Ranges</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {closingDateRanges.map((range) => (
                <div key={range.id} className="p-4 border rounded-lg">
                  <p className="font-medium">
                    From: {formatDate(range.startDate)} To: {formatDate(range.endDate)}
                  </p>
                  <p className="mt-2 text-gray-600">{range.notice}</p>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleRemoveClosingDateRange(range.id)}
                    className="mt-2"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default Dashboard;