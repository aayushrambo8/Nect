'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CreatorLoginScreen from '../../../components/CreatorLoginScreen';

export default function LoginPage() {
  const router = useRouter();

  return (
    <CreatorLoginScreen
      onSuccess={() => {
        router.push('/creators/dashboard');
      }}
    />
  );
}
