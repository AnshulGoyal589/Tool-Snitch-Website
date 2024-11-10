// src/app/(user)/orders/[slug]/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      onClick={() => router.push('/orders')}
    >
      Back to Order History
    </button>
  );
}