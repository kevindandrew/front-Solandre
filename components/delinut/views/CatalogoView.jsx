'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const platos = [
  {
    id: 1,
    nombre: 'Ensalada César con Pollo',
    tipo: 'Principal',
    precio: 12.99,
    imagen: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    nombre: 'Bowl de Quinoa y Vegetales',
    tipo: 'Principal',
    precio: 11.50,
    imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    nombre: 'Salmón al Horno',
    tipo: 'Principal',
    precio: 15.99,
    imagen: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    nombre: 'Smoothie Verde',
    tipo: 'Bebida',
    precio: 5.50,
    imagen: 'https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 5,
    nombre: 'Yogurt con Frutos Rojos',
    tipo: 'Postre',
    precio: 6.00,
    imagen: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 6,
    nombre: 'Poke Bowl de Atún',
    tipo: 'Principal',
    precio: 14.50,
    imagen: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const tipoBadgeColor = (tipo) => {
  switch (tipo) {
    case 'Principal':
      return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100';
    case 'Bebida':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    case 'Postre':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

export default function CatalogoView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catálogo de Platos</h1>
          <p className="text-gray-600 mt-2">Administra tus productos disponibles</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Crear Plato
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {platos.map((plato) => (
          <Card
            key={plato.id}
            className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge className={tipoBadgeColor(plato.tipo)}>
                  {plato.tipo}
                </Badge>
                <span className="text-xl font-bold text-emerald-600">
                  ${plato.precio.toFixed(2)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {plato.nombre}
              </h3>
              <Button variant="outline" className="w-full mt-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
