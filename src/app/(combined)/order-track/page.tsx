'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getUserSession } from "@/utils/auth";
import { api } from "@/api/api";

interface appointment {
    date: Date,
    time: string,
    _id: string
}

interface order {
    appointmentDetails: appointment,
    createdAt: Date,
    createdBy: string,
    device: string,
    issue: string,
    message: string,
    shopId: string,
    shopName: string,
    status: string,
    address: string,
    __v: number,
    _id: string,
    price: number,
    cancelled: boolean
}

const AppointmentTracking = () => {
    const [order, setOrder] = useState<order | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getOrder() {
            try {
                const cognitoId = await getUserSession();
                const response = await api.get(`/order-track/${cognitoId}`);
                setOrder(response.data[0]); // Assuming there's only one order
            } catch (err: any) {
                setError(err.message);
            }
        }
        getOrder();
    }, []);

    if (!order && !error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-gray-500">Loading appointment details...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-red-500">Error: {error}</h1>
            </div>
        );
    }

    const steps = [
        { label: 'Appointment Booked', status: order!.status === 'booked' },
        { label: 'Order Received by Shopkeeper', status: order!.status === 'received' },
        { label: 'Waiting for Spare Part Delivery', status: order!.status === 'in-progress' },
        { label: 'Successfully Completed', status: order!.status === 'completed' },
        { label: 'Cancelled by Customer', status: order!.status === 'cancelled' },
    ];

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Appointment Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center mb-8">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col items-center ${index > 0 ? 'ml-8' : ''}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step.status
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-500'
                                }`}
                            >
                                {index + 1}
                            </div>
                            <p className={`mt-2 ${step.status ? 'text-green-500' : 'text-gray-500'}`}>
                                {step.label}
                            </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-lg font-medium mb-2">Appointment Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500">Device:</p>
                            <p className="font-medium">{order!.device}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Reported Issues:</p>
                            <ul>
                                {order!.issue.split(',').map((issue, index) => (
                                    <li key={index} className="font-medium">{issue.trim()}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-500">Appointment Date and Time:</p>
                            <p className="font-medium">{order!.appointmentDetails.time}, {new Date(order!.appointmentDetails.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Shop Name:</p>
                            <p className="font-medium">{order!.shopName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Address:</p>
                            <p className="font-medium">{order!.address}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Price:</p>
                            <p className="font-medium">₹{order!.price}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppointmentTracking;