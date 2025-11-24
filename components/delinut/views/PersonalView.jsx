'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const staffData = [
  { id: 1, nombre: 'Juan Pérez', rol: 'Chef', zona: 'Cocina Principal', estado: 'Activo' },
  { id: 2, nombre: 'María García', rol: 'Repartidor', zona: 'Zona Norte', estado: 'Activo' },
  { id: 3, nombre: 'Carlos López', rol: 'Chef Asistente', zona: 'Cocina Principal', estado: 'Ausente' },
  { id: 4, nombre: 'Ana Martínez', rol: 'Repartidor', zona: 'Zona Sur', estado: 'Activo' },
  { id: 5, nombre: 'Luis Rodríguez', rol: 'Nutricionista', zona: 'Oficina', estado: 'Activo' },
  { id: 6, nombre: 'Sofia Hernández', rol: 'Repartidor', zona: 'Zona Centro', estado: 'Activo' },
];

export default function PersonalView() {
  const [staff, setStaff] = useState(staffData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Personal</h1>
          <p className="text-gray-600 mt-2">Administra tu equipo de trabajo</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Empleado
        </Button>
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Zona
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  #{person.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{person.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {person.rol}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {person.zona}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={person.estado === 'Activo' ? 'default' : 'secondary'}
                    className={
                      person.estado === 'Activo'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {person.estado}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4">
        {staff.map((person) => (
          <Card key={person.id} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {person.nombre}
                  </h3>
                  <Badge
                    variant={person.estado === 'Activo' ? 'default' : 'secondary'}
                    className={
                      person.estado === 'Activo'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {person.estado}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">ID:</span>
                  <span className="text-gray-900">#{person.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Rol:</span>
                  <span className="text-gray-900">{person.rol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Zona:</span>
                  <span className="text-gray-900">{person.zona}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Button variant="outline" className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
