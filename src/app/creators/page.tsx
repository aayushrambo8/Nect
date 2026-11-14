'use client';

import React from 'react';
import { useCreatorAuth } from '../../context/CreatorAuthContext';
import CreatorLoginScreen from '../../components/CreatorLoginScreen';
import CreatorDashboardPage from './dashboard/page';

export default function CreatorsRootPage() {
  const { isAuthenticated, user } = useCreatorAuth();

  if (isAuthenticated && user) {
    return <CreatorDashboardPage />;
  }

  return <CreatorLoginScreen />;
}
