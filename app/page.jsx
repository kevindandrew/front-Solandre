'use client';

import { useState } from 'react';
import LoginView from '@/components/delinut/LoginView';
import AdminLayout from '@/components/delinut/AdminLayout';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout currentView={currentView} setCurrentView={setCurrentView} />
  );
}
