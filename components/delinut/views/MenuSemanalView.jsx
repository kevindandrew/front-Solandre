'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const platosOptions = [
  'Ensalada César con Pollo',
  'Bowl de Quinoa y Vegetales',
  'Salmón al Horno con Espárragos',
  'Poke Bowl de Atún',
  'Pasta Integral con Pesto',
];

const bebidasOptions = [
  'Jugo Natural de Naranja',
  'Agua con Limón',
  'Smoothie Verde',
  'Té Verde Frío',
  'Agua de Coco',
];

const postresOptions = [
  'Yogurt Griego con Frutos Rojos',
  'Macedonia de Frutas',
  'Pudín de Chía',
  'Brownie Proteico',
  'Helado de Banana',
];

export default function MenuSemanalView() {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [menuData, setMenuData] = useState({
    platoId: '',
    bebidaId: '',
    postreId: '',
    stock: '',
    publicado: false,
  });

  const handleSave = () => {
    alert(`Menú para ${selectedDay} guardado correctamente`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Menú Semanal</h1>
        <p className="text-gray-600 mt-2">Configura el menú para cada día de la semana</p>
      </div>

      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 h-auto gap-2 bg-transparent p-0">
          {days.map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-3 py-2 text-xs sm:text-sm"
            >
              {day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day} value={day} className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Configurar Menú - {day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plato">Plato Principal</Label>
                    <Select
                      value={menuData.platoId}
                      onValueChange={(value) => setMenuData({ ...menuData, platoId: value })}
                    >
                      <SelectTrigger id="plato">
                        <SelectValue placeholder="Selecciona un plato" />
                      </SelectTrigger>
                      <SelectContent>
                        {platosOptions.map((plato, idx) => (
                          <SelectItem key={idx} value={`plato-${idx}`}>
                            {plato}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bebida">Bebida</Label>
                    <Select
                      value={menuData.bebidaId}
                      onValueChange={(value) => setMenuData({ ...menuData, bebidaId: value })}
                    >
                      <SelectTrigger id="bebida">
                        <SelectValue placeholder="Selecciona una bebida" />
                      </SelectTrigger>
                      <SelectContent>
                        {bebidasOptions.map((bebida, idx) => (
                          <SelectItem key={idx} value={`bebida-${idx}`}>
                            {bebida}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postre">Postre</Label>
                    <Select
                      value={menuData.postreId}
                      onValueChange={(value) => setMenuData({ ...menuData, postreId: value })}
                    >
                      <SelectTrigger id="postre">
                        <SelectValue placeholder="Selecciona un postre" />
                      </SelectTrigger>
                      <SelectContent>
                        {postresOptions.map((postre, idx) => (
                          <SelectItem key={idx} value={`postre-${idx}`}>
                            {postre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Disponible</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Ej: 50"
                      value={menuData.stock}
                      onChange={(e) => setMenuData({ ...menuData, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="publicar" className="text-base font-medium">
                      Publicar Menú
                    </Label>
                    <p className="text-sm text-gray-600">
                      El menú estará visible para los clientes
                    </p>
                  </div>
                  <Switch
                    id="publicar"
                    checked={menuData.publicado}
                    onCheckedChange={(checked) => setMenuData({ ...menuData, publicado: checked })}
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Menú del {day}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
