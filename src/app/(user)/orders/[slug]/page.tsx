// src/app/(user)/orders/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { AppointmentHero } from './AppointmentHero';
import { BackButton } from './BackButton';
import { api } from '@/api/api';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getAppointmentDetails(appointmentId: string) {
  try {
    // console.log(appointmentId);
    const response = await api.get(`/order-track/${appointmentId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function AppointmentDetailsPage({ params }: PageProps) {
  const appointmentId = params.slug;

  if (!appointmentId || typeof appointmentId !== 'string') {
    notFound();
  }

  const data = await getAppointmentDetails(appointmentId);

  if (!data) {
    return (
      <div className="min-h-[40vh] flex justify-center items-center">
        <h1 className="text-8xl font-black text-gray-200 dark:text-gray-700">
          Appointment Not Found
        </h1>
      </div>
    );
  }

  // const appointmentDetails = {
  //   id: appointmentId,
  //   // Add other appointment details from your API response
  // };

  return (
    <>
      <AppointmentHero data = {data} />
      <div className="mt-6 px-8">
        <BackButton />
      </div>
    </>
  );
}