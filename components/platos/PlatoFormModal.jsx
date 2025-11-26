"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useFetch } from "@/hooks/useFetch";

export default function PlatoFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEdit,
  isViewMode,
}) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { fetchData } = useFetch();

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Solo se permiten archivos de imagen",
      });
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://backend-solandre.onrender.com/upload/image",
        {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: formDataUpload,
        }
      );

      if (!response.ok) throw new Error("Error al subir imagen");

      const data = await response.json();
      setFormData({ ...formData, imagen_url: data.imagen_url });
      toast({
        title: "Éxito",
        description: "Imagen subida correctamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo subir la imagen",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imagen_url: null });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode
              ? "Ver Plato"
              : isEdit
              ? "Editar Plato"
              : "Crear Nuevo Plato"}
          </DialogTitle>
          <DialogDescription>
            {isViewMode ? "Detalles del plato" : "Completa los datos del plato"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Plato</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: Pollo al horno"
                disabled={isViewMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) =>
                  setFormData({ ...formData, tipo: value })
                }
                disabled={isViewMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Acompanamiento">Acompañamiento</SelectItem>
                  <SelectItem value="Bebida">Bebida</SelectItem>
                  <SelectItem value="Postre">Postre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagen">Imagen (opcional)</Label>
              {formData.imagen_url ? (
                <div className="relative">
                  <img
                    src={formData.imagen_url}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {!isViewMode && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                !isViewMode && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="imagen"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <label
                      htmlFor="imagen"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                      ) : (
                        <Upload className="h-10 w-10 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-600">
                        {uploading ? "Subiendo..." : "Click para subir imagen"}
                      </span>
                    </label>
                  </div>
                )
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción (opcional)</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describe el plato..."
                className="min-h-[80px]"
                disabled={isViewMode}
              />
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
                {isEdit ? "Guardar Cambios" : "Crear Plato"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
