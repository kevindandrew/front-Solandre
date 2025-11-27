import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function useEmpleadosActions(refetch) {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const createEmpleado = async (formData) => {
    const payload = { ...formData };

    if (!payload.password) delete payload.password;
    if (payload.rol_id !== 3) delete payload.zona_reparto_id;

    const result = await fetchData("/admin/empleados", "POST", payload);

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Empleado creado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo crear el empleado",
      });
      return false;
    }
  };

  const updateEmpleado = async (empleadoId, formData) => {
    const payload = {
      email: formData.email,
      password: formData.password || "sin_cambio_password_temp_123",
      nombre_completo: formData.nombre_completo,
      telefono: formData.telefono,
      rol_id: formData.rol_id,
      zona_reparto_id: formData.zona_reparto_id || 0,
    };

    const result = await fetchData(
      `/admin/empleados/${empleadoId}`,
      "PUT",
      payload
    );

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Empleado actualizado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo actualizar el empleado",
      });
      return false;
    }
  };

  const deleteEmpleado = async (empleadoId) => {
    const result = await fetchData(`/admin/empleados/${empleadoId}`, "DELETE");

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Empleado desactivado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo desactivar el empleado.",
      });
      return false;
    }
  };

  const assignZona = async (empleadoId, zonaData) => {
    const result = await fetchData(
      `/admin/empleados/${empleadoId}/zona`,
      "PUT",
      zonaData
    );

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Zona asignada correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo asignar la zona",
      });
      return false;
    }
  };

  return { createEmpleado, updateEmpleado, deleteEmpleado, assignZona };
}
