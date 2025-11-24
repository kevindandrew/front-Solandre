'use client';

import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const pedidos = [
  {
    id: '#1245',
    cliente: 'Roberto Díaz',
    items: 'Bowl de Quinoa, Smoothie Verde',
    total: 17.00,
    estado: 'Pendiente',
    hora: '12:30 PM',
  },
  {
    id: '#1244',
    cliente: 'Laura Gómez',
    items: 'Salmón al Horno, Agua de Coco',
    total: 20.49,
    estado: 'En Preparación',
    hora: '12:15 PM',
  },
  {
    id: '#1243',
    cliente: 'Pedro Sánchez',
    items: 'Ensalada César, Yogurt',
    total: 18.99,
    estado: 'Completado',
    hora: '11:45 AM',
  },
  {
    id: '#1242',
    cliente: 'Carmen López',
    items: 'Poke Bowl',
    total: 14.50,
    estado: 'Cancelado',
    hora: '11:30 AM',
  },
];

const estadoConfig = {
  Pendiente: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  'En Preparación': {
    icon: Package,
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    iconColor: 'text-blue-600',
  },
  Completado: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700 hover:bg-green-100',
    iconColor: 'text-green-600',
  },
  Cancelado: {
    icon: XCircle,
    color: 'bg-red-100 text-red-700 hover:bg-red-100',
    iconColor: 'text-red-600',
  },
};

export default function PedidosView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-gray-600 mt-2">Gestiona los pedidos de tus clientes</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pedidos.map((pedido) => {
          const config = estadoConfig[pedido.estado];
          const Icon = config.icon;

          return (
            <Card key={pedido.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full ${config.color.split(' ')[0]} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{pedido.id}</h3>
                        <Badge className={config.color}>{pedido.estado}</Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{pedido.cliente}</p>
                      <p className="text-sm text-gray-600 truncate">{pedido.items}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{pedido.hora}</p>
                      <p className="text-lg font-bold text-emerald-600">
                        ${pedido.total.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
