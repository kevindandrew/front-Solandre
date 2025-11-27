"use client";

import { Suspense, lazy } from "react";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { usePlatos } from "./_components/hooks/usePlatos";

const GenericTable = lazy(() => import("@/components/shared/GenericTable"));
const PlatoFormModal = lazy(() => import("./_components/PlatoFormModal"));

export default function PlatosPage() {
  const { platos, createPlato, updatePlato, deletePlato } = usePlatos();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPlatoId, setCurrentPlatoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    imagen_url: null,
    ingredientes: [],
  });

  const openModal = (plato = null, viewMode = false, editMode = false) => {
    setIsViewMode(viewMode);
    setIsEdit(editMode);
    setCurrentPlatoId(plato?.plato_id || null);
    setFormData(
      plato
        ? {
            nombre: plato.nombre,
            descripcion: plato.descripcion || "",
            tipo: plato.tipo,
            imagen_url: plato.imagen_url || null,
            ingredientes: plato.ingredientes || [],
          }
        : {
            nombre: "",
            descripcion: "",
            tipo: "",
            imagen_url: null,
            ingredientes: [],
          }
    );
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El nombre es requerido",
      });
      return;
    }
    if (!formData.tipo) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El tipo es requerido",
      });
      return;
    }

    // Convertir descripción vacía a null para el backend
    const dataToSend = {
      ...formData,
      descripcion: formData.descripcion.trim() || null,
    };

    const success = isEdit
      ? await updatePlato(currentPlatoId, dataToSend)
      : await createPlato(dataToSend);
    if (success) setIsModalOpen(false);
  };

  const filteredPlatos = platos.filter(
    (plato) =>
      plato.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plato.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const platosColumns = [
    {
      header: "Nº",
      key: "index",
      render: (_, index) => index + 1,
    },
    {
      header: "Nombre",
      key: "nombre",
      cellClassName: "font-medium",
    },
    {
      header: "Tipo",
      key: "tipo",
      render: (plato) => {
        const colors = {
          Principal: "bg-orange-100 text-orange-800",
          Bebida: "bg-blue-100 text-blue-800",
          Postre: "bg-purple-100 text-purple-800",
        };
        return (
          <Badge className={colors[plato.tipo] || "bg-gray-100 text-gray-800"}>
            {plato.tipo}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platos</h1>
        <p className="text-gray-600 mt-1">
          Gestiona el catálogo de platos disponibles
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar platos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => openModal()}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Plato
          </Button>
        </div>

        <Suspense
          fallback={<div className="text-center py-8">Cargando tabla...</div>}
        >
          <GenericTable
            data={filteredPlatos.map((p, idx) => ({
              ...p,
              index: idx,
              id: p.plato_id,
            }))}
            columns={platosColumns}
            onView={(plato) => openModal(plato, true, false)}
            onEdit={(plato) => openModal(plato, false, true)}
            onDelete={(plato) => deletePlato(plato.plato_id)}
            emptyMessage="No hay platos registrados"
          />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <PlatoFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isEdit={isEdit}
          isViewMode={isViewMode}
        />
      </Suspense>
    </div>
  );
}
