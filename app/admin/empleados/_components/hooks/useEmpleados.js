import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function useEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const fetchEmpleados = async () => {
    setLoading(true);
    const result = await fetchData("/admin/empleados");

    if (result.success) {
      setEmpleados(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los empleados",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return { empleados, loading, refetch: fetchEmpleados };
}

export function useZonas() {
  const [zonas, setZonas] = useState([]);
  const { fetchData } = useFetch();

  const fetchZonas = async () => {
    // El backend no tiene endpoint para listar todas las zonas
    // Las zonas se obtienen de los empleados con rol Delivery
    // Por ahora retornamos array vacío
    setZonas([]);
  };

  useEffect(() => {
    fetchZonas();
  }, []);

  return { zonas, refetchZonas: fetchZonas };
}
