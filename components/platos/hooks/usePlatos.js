import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function usePlatos() {
  const [platos, setPlatos] = useState([]);
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const fetchPlatos = async () => {
    const result = await fetchData("/admin/platos");
    if (result.success) setPlatos(result.data);
  };

  const createPlato = async (platoData) => {
    const result = await fetchData("/admin/platos", "POST", platoData);
    if (result.success) {
      toast({ title: "Éxito", description: "Plato creado correctamente" });
      fetchPlatos();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description:
        result.error ||
        "No se pudo crear el plato. Verifica que tengas permisos de administrador.",
    });
    return false;
  };

  const updatePlato = async (platoId, platoData) => {
    const result = await fetchData(
      `/admin/platos/${platoId}`,
      "PUT",
      platoData
    );
    if (result.success) {
      toast({ title: "Éxito", description: "Plato actualizado correctamente" });
      fetchPlatos();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: result.error,
    });
    return false;
  };

  const deletePlato = async (platoId) => {
    if (!confirm("¿Estás seguro de eliminar este plato?")) return false;
    const result = await fetchData(`/admin/platos/${platoId}`, "DELETE");
    if (result.success) {
      toast({ title: "Éxito", description: "Plato eliminado correctamente" });
      fetchPlatos();
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: result.error,
    });
    return false;
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  return {
    platos,
    createPlato,
    updatePlato,
    deletePlato,
    refetch: fetchPlatos,
  };
}
