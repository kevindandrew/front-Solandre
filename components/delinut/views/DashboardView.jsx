'use client';

import { TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  {
    title: 'Ventas Hoy',
    value: '$2,450',
    change: '+12%',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Pedidos Activos',
    value: '24',
    change: '+3',
    icon: ShoppingCart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Personal Disponible',
    value: '18',
    change: '2 ausentes',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Ingresos Totales',
    value: '$45,280',
    change: '+8%',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

const weeklyData = [
  { day: 'Lun', value: 420 },
  { day: 'Mar', value: 380 },
  { day: 'Mié', value: 560 },
  { day: 'Jue', value: 490 },
  { day: 'Vie', value: 620 },
  { day: 'Sáb', value: 450 },
  { day: 'Dom', value: 340 },
];

export default function DashboardView() {
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen general del sistema Delinut</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{kpi.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                <p className="text-sm text-gray-600">{kpi.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Ventas Semanales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4">
            {weeklyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '200px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-500 cursor-pointer"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm font-medium text-gray-600">{item.day}</p>
                  <p className="text-xs md:text-sm font-bold text-gray-900">${item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
