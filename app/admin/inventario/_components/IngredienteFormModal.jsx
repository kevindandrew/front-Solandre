"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function IngredienteFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEdit,
  isViewMode,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode
              ? "Ver Ingrediente"
              : isEdit
              ? "Editar Ingrediente"
              : "Crear Nuevo Ingrediente"}
          </DialogTitle>
          <DialogDescription>
            {isViewMode
              ? "Detalles del ingrediente"
              : "Completa los datos del ingrediente"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Ingrediente</Label>
              <Input
                id="nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: Arroz"
                disabled={isViewMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock_actual">Stock Actual</Label>
              <div className="flex gap-2">
                <Input
                  id="stock_actual"
                  type="number"
                  step="0.01"
                  value={formData.stock_actual || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock_actual: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Ej: 50.00"
                  disabled={isViewMode}
                  required
                  className="flex-1"
                />
                <Select
                  value={formData.unidad || "kg"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unidad: value })
                  }
                  disabled={isViewMode}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="kg">Kilogramos</SelectItem>
                    <SelectItem value="unidades">Unidades</SelectItem>
                    <SelectItem value="litros">Litros</SelectItem>
                    <SelectItem value="gramos">Gramos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {isViewMode ? "Cerrar" : "Cancelar"}
            </Button>
            {!isViewMode && (
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isEdit ? "Guardar Cambios" : "Crear Ingrediente"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
