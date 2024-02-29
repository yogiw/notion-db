'use client';

import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push('/login');
      }}
      className="rounded-full bg-green-300 text-green-800 py-2  px-4 font-medium"
    >
      Logout
    </button>
  );
};
