import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export function useInventoryReduction() {
  const { toast } = useToast();

  /**
   * Calcula y reduce el inventario basado en los ingredientes del menú
   * @param {number} platoId - ID del plato principal
   * @param {number} bebidaId - ID de la bebida (opcional)
   * @param {number} postreId - ID del postre (opcional)
   * @param {number} cantidadMenus - Cantidad de menús a preparar
   * @returns {Promise<{success: boolean, lowStockWarnings: Array}>}
   */
  const reduceInventory = async (
    platoId,
    bebidaId,
    postreId,
    cantidadMenus
  ) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No estás autenticado",
        });
        return { success: false, lowStockWarnings: [] };
      }

      // 1. Obtener los ingredientes de cada plato
      const platosIds = [platoId, bebidaId, postreId].filter(Boolean);
      const ingredientesPorPlato = [];

      for (const id of platosIds) {
        const response = await fetch(
          `https://backend-solandre.onrender.com/admin/platos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const plato = await response.json();
          if (plato.ingredientes && plato.ingredientes.length > 0) {
            ingredientesPorPlato.push(...plato.ingredientes);
          }
        }
      }

      // 2. Agrupar ingredientes y calcular cantidad total necesaria
      const ingredientesAgrupados = {};
      ingredientesPorPlato.forEach((ing) => {
        const id = ing.ingrediente_id;
        if (!ingredientesAgrupados[id]) {
          ingredientesAgrupados[id] = {
            ingrediente_id: id,
            nombre: ing.ingrediente?.nombre || ing.nombre,
            cantidadPorMenu: ing.cantidad,
            unidad: ing.unidad,
            totalNecesario: ing.cantidad * cantidadMenus,
          };
        } else {
          ingredientesAgrupados[id].cantidadPorMenu += ing.cantidad;
          ingredientesAgrupados[id].totalNecesario +=
            ing.cantidad * cantidadMenus;
        }
      });

      // 3. Verificar stock disponible
      const lowStockWarnings = [];
      const inventarioResponse = await fetch(
        "https://backend-solandre.onrender.com/inventario",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!inventarioResponse.ok) {
        throw new Error("No se pudo obtener el inventario");
      }

      const inventario = await inventarioResponse.json();
      const inventarioMap = {};
      inventario.forEach((item) => {
        inventarioMap[item.ingrediente_id] = item;
      });

      // Verificar si hay suficiente stock
      const updates = [];
      for (const id in ingredientesAgrupados) {
        const ing = ingredientesAgrupados[id];
        const stockActual = inventarioMap[id];

        if (!stockActual) {
          lowStockWarnings.push({
            nombre: ing.nombre,
            motivo: "No encontrado en inventario",
            severity: "error",
          });
          continue;
        }

        const stockDisponible = parseFloat(stockActual.stock_actual);
        const stockNecesario = ing.totalNecesario;

        if (stockDisponible < stockNecesario) {
          lowStockWarnings.push({
            nombre: ing.nombre,
            necesario: stockNecesario,
            disponible: stockDisponible,
            unidad: ing.unidad,
            motivo: "Stock insuficiente",
            severity: "error",
          });
        } else {
          const nuevoStock = stockDisponible - stockNecesario;
          updates.push({
            ingrediente_id: id,
            stock_actual: nuevoStock,
            unidad: stockActual.unidad,
          });

          // Advertir si el nuevo stock quedará bajo
          if (nuevoStock < 20) {
            lowStockWarnings.push({
              nombre: ing.nombre,
              stockRestante: nuevoStock,
              unidad: ing.unidad,
              motivo: "Stock bajo después de la operación",
              severity: "warning",
            });
          }
        }
      }

      // Si hay errores críticos, no continuar
      const erroresCriticos = lowStockWarnings.filter(
        (w) => w.severity === "error"
      );
      if (erroresCriticos.length > 0) {
        return { success: false, lowStockWarnings };
      }

      // 4. Actualizar el inventario
      for (const update of updates) {
        const updateResponse = await fetch(
          `https://backend-solandre.onrender.com/inventario/${update.ingrediente_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              stock_actual: update.stock_actual,
              unidad: update.unidad,
            }),
          }
        );
      }

      return { success: true, lowStockWarnings };
    } catch (error) {
      console.error("Error al reducir inventario:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el inventario",
      });
      return { success: false, lowStockWarnings: [] };
    }
  };

  return { reduceInventory };
}
