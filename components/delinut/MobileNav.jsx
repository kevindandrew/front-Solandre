'use client';

import { Menu, X, LayoutDashboard, Calendar, UtensilsCrossed, Users, ShoppingBag, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu', name: 'Menú Semanal', icon: Calendar },
  { id: 'catalogo', name: 'Catálogo Platos', icon: UtensilsCrossed },
  { id: 'personal', name: 'Personal', icon: Users },
  { id: 'pedidos', name: 'Pedidos', icon: ShoppingBag },
];

export default function MobileNav({ isOpen, setIsOpen, currentView, setCurrentView }) {
  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Salad className="w-7 h-7 text-emerald-600" />
          <span className="text-xl font-bold text-gray-900">Delinut</span>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
                <Salad className="w-8 h-8 text-emerald-600" />
                <span className="text-2xl font-bold text-gray-900">Delinut</span>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold">AD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                    <p className="text-xs text-gray-500 truncate">admin@delinut.com</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
