import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export function useMenuActions(refetch) {
  const { fetchData } = useFetch();
  const { toast } = useToast();

  const createMenu = async (menuData) => {
    const result = await fetchData("/admin/menu", "POST", menuData);

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Menú del día creado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo crear el menú",
      });
      return false;
    }
  };

  const updateMenu = async (menuId, menuData) => {
    const result = await fetchData(`/admin/menu/${menuId}`, "PUT", menuData);

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Menú actualizado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo actualizar el menú",
      });
      return false;
    }
  };

  const deleteMenu = async (menuId) => {
    const result = await fetchData(`/admin/menu/${menuId}`, "DELETE");

    if (result.success) {
      toast({
        title: "Éxito",
        description: "Menú eliminado correctamente",
      });
      refetch();
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo eliminar el menú",
      });
      return false;
    }
  };

  return { createMenu, updateMenu, deleteMenu };
}
