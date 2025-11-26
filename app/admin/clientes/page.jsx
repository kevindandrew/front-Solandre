"use client";

import { Suspense, lazy } from "react";
import { useState } from "react";
import { Search, Eye, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClientes } from "@/components/clientes/hooks/useClientes";

const GenericTable = lazy(() => import("@/components/shared/GenericTable"));
const HistorialModal = lazy(() =>
  import("@/components/clientes/HistorialModal")
);
const ClienteFormModal = lazy(() =>
  import("@/components/clientes/ClienteFormModal")
);

export default function ClientesPage() {
  const {
    clientes,
    fetchHistorial,
    createCliente,
    updateCliente,
    deleteCliente,
  } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentClienteId, setCurrentClienteId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    email: "",
    telefono: "",
    password: "",
  });

  const openFormModal = (
    cliente = null,
    viewMode = false,
    editMode = false
  ) => {
    setIsViewMode(viewMode);
    setIsEdit(editMode);
    setCurrentClienteId(cliente?.usuario_id || null);
    setFormData(
      cliente
        ? {
            nombre_completo: cliente.nombre_completo,
            email: cliente.email,
            telefono: cliente.telefono || "",
            password: "",
          }
        : { nombre_completo: "", email: "", telefono: "", password: "" }
    );
    setIsFormModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (isEdit) delete dataToSend.password;

    const success = isEdit
      ? await updateCliente(currentClienteId, dataToSend)
      : await createCliente(dataToSend);
    if (success) setIsFormModalOpen(false);
  };

  const handleDelete = async (cliente) => {
    if (confirm(`¿Eliminar cliente ${cliente.nombre_completo}?`)) {
      await deleteCliente(cliente.usuario_id);
    }
  };

  const handleViewHistorial = async (cliente) => {
    const data = await fetchHistorial(cliente.usuario_id);
    if (data) {
      setHistorial(data);
      setClienteSeleccionado(cliente);
      setIsModalOpen(true);
    }
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre_completo
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono?.includes(searchTerm)
  );

  const columns = [
    {
      key: "usuario_id",
      header: "ID",
      render: (item) => (
        <span className="font-mono text-sm">#{item.usuario_id}</span>
      ),
    },
    { key: "nombre_completo", header: "Nombre" },
    { key: "email", header: "Email" },
    {
      key: "telefono",
      header: "Teléfono",
      render: (item) =>
        item.telefono || <span className="text-gray-400">Sin teléfono</span>,
    },
    {
      key: "fecha_registro",
      header: "Fecha Registro",
      render: (item) => {
        if (!item.fecha_registro)
          return <span className="text-gray-400">Sin fecha</span>;
        return new Date(item.fecha_registro).toLocaleDateString("es-ES");
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los clientes registrados
          </p>
        </div>
        <Button
          onClick={() => openFormModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Suspense
        fallback={<div className="text-center py-8">Cargando tabla...</div>}
      >
        <GenericTable
          data={filteredClientes}
          columns={columns}
          onView={handleViewHistorial}
          onEdit={(cliente) => openFormModal(cliente, false, true)}
          onDelete={handleDelete}
          actions={{
            view: { icon: Eye, label: "Ver Historial" },
            edit: { icon: Pencil, label: "Editar" },
            delete: { icon: Trash2, label: "Eliminar" },
          }}
        />
      </Suspense>

      <Suspense fallback={null}>
        <HistorialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          historial={historial}
          cliente={clienteSeleccionado}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ClienteFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
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
