'use client';

import React from 'react';
import { useCreatorAuth } from '../context/CreatorAuthContext';
import CreatorLoginScreen from '../components/CreatorLoginScreen';
import CreatorDashboardPage from './creators/dashboard/page';

export default function HomePage() {
  const { isAuthenticated, user } = useCreatorAuth();

  // If authenticated, display their personalized dashboard
  if (isAuthenticated && user) {
    return <CreatorDashboardPage />;
  }

  // Otherwise, display just the clean Backstage login screen with sample logins
  return <CreatorLoginScreen />;
}
