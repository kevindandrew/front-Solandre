'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import DashboardView from './views/DashboardView';
import PersonalView from './views/PersonalView';
import MenuSemanalView from './views/MenuSemanalView';
import CatalogoView from './views/CatalogoView';
import PedidosView from './views/PedidosView';

export default function AdminLayout({ currentView, setCurrentView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'personal':
        return <PersonalView />;
      case 'menu':
        return <MenuSemanalView />;
      case 'catalogo':
        return <CatalogoView />;
      case 'pedidos':
        return <PedidosView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <MobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="md:pl-64">
        <main className="p-4 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
