import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const fetchClientes = async () => {
    const result = await fetchData("/admin/clientes");
    if (result.success) setClientes(result.data);
  };

  const fetchHistorial = async (clienteId) => {
    const result = await fetchData(`/admin/clientes/${clienteId}/historial`);
    if (result.success) {
      return result.data;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: "No se pudo cargar el historial",
    });
    return null;
  };

  const createCliente = async (clienteData) => {
    const result = await fetchData("/admin/clientes", "POST", clienteData);
    if (result.success) {
      toast({ title: "Éxito", description: "Cliente creado correctamente" });
      fetchClientes();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: result.error || "No se pudo crear el cliente",
    });
    return false;
  };

  const updateCliente = async (clienteId, clienteData) => {
    const result = await fetchData(
      `/admin/clientes/${clienteId}`,
      "PUT",
      clienteData
    );
    if (result.success) {
      toast({
        title: "Éxito",
        description: "Cliente actualizado correctamente",
      });
      fetchClientes();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: result.error || "No se pudo actualizar el cliente",
    });
    return false;
  };

  const deleteCliente = async (clienteId) => {
    const result = await fetchData(`/admin/clientes/${clienteId}`, "DELETE");
    if (result.success) {
      toast({ title: "Éxito", description: "Cliente eliminado correctamente" });
      fetchClientes();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: result.error || "No se pudo eliminar el cliente",
    });
    return false;
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return {
    clientes,
    fetchHistorial,
    createCliente,
    updateCliente,
    deleteCliente,
  };
}
