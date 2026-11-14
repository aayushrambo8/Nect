import React from 'react';
import type { Metadata } from 'next';
import NotFoundPage from '../components/NotFoundPage';

export const metadata: Metadata = {
  title: 'Page Not Found | NECKT',
  description: 'The NECKT page you requested could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundPage />;
}
