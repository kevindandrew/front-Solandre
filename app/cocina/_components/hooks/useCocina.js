"use client";

import { useState, useCallback } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function useCocina() {
  const [pendientes, setPendientes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const fetchPendientes = useCallback(async () => {
    setLoading(true);
    const result = await fetchData("/cocina/pendientes");
    if (result.success) {
      setPendientes(result.data);
    } else {
      console.error("Error fetching pendientes:", result.error);
    }
    setLoading(false);
  }, [fetchData]);

  const fetchHistorial = useCallback(
    async (fecha = null) => {
      setLoading(true);
      const query = fecha ? `?fecha=${fecha}` : "";
      const result = await fetchData(`/cocina/historial${query}`);
      if (result.success) {
        setHistorial(result.data);
      } else {
        console.error("Error fetching historial:", result.error);
      }
      setLoading(false);
    },
    [fetchData]
  );

  const fetchEstadisticas = useCallback(
    async (fecha = null) => {
      setLoading(true);
      const query = fecha ? `?fecha=${fecha}` : "";
      const result = await fetchData(`/cocina/estadisticas${query}`);
      if (result.success) {
        setEstadisticas(result.data);
      } else {
        console.error("Error fetching estadisticas:", result.error);
      }
      setLoading(false);
    },
    [fetchData]
  );

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    const result = await fetchData(
      `/cocina/pedidos/${pedidoId}/estado`,
      "PATCH",
      { nuevo_estado: nuevoEstado }
    );

    if (result.success) {
      toast({
        title: "Estado actualizado",
        description: `Pedido #${pedidoId} marcado como ${nuevoEstado}`,
      });
      // Recargar pendientes después del cambio
      fetchPendientes();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo actualizar el estado",
      });
      return false;
    }
  };

  return {
    pendientes,
    historial,
    estadisticas,
    loading,
    fetchPendientes,
    fetchHistorial,
    fetchEstadisticas,
    cambiarEstado,
  };
}
