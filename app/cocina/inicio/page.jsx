"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Utensils,
  ChefHat,
} from "lucide-react";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const token = Cookies.get("token");
      // Fetch orders with status 'Confirmado' or 'En Cocina'
      const response = await fetch(
        "https://backend-solandre.onrender.com/admin/pedidos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Filter for kitchen relevant statuses
        const kitchenOrders = data
          .filter((order) => ["Confirmado", "En Cocina"].includes(order.estado))
          .sort((a, b) => new Date(a.fecha_pedido) - new Date(b.fecha_pedido)); // Oldest first

        setOrders(kitchenOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (pedidoId, newStatus) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `https://backend-solandre.onrender.com/admin/pedidos/${pedidoId}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nuevo_estado: newStatus }),
        }
      );

      if (response.ok) {
        toast({
          title: "Estado actualizado",
          description: `Pedido #${pedidoId} marcado como ${newStatus}`,
        });
        fetchOrders();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Cola de Pedidos</h2>
        <Badge variant="outline" className="text-lg px-4 py-1">
          {orders.length} Pendientes
        </Badge>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200">
          <ChefHat className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">¡Todo listo!</h3>
          <p className="text-gray-500">No hay pedidos pendientes en cocina.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card
              key={order.pedido_id}
              className={`border-l-4 ${
                order.estado === "En Cocina"
                  ? "border-l-orange-500"
                  : "border-l-blue-500"
              } shadow-md hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      #{order.pedido_id}
                      <Badge
                        className={
                          order.estado === "En Cocina"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {order.estado}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(order.fecha_pedido).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {/* Timer could go here */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-md p-3 space-y-2">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start border-b border-gray-200 last:border-0 pb-2 last:pb-0"
                      >
                        <div>
                          <p className="font-bold text-gray-900">
                            {item.cantidad}x {item.nombre_plato}
                          </p>
                          {item.exclusiones && item.exclusiones.length > 0 && (
                            <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
                              <AlertCircle className="h-3 w-3" />
                              Sin:{" "}
                              {item.exclusiones.map((e) => e.nombre).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    {order.estado === "Confirmado" ? (
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() =>
                          updateStatus(order.pedido_id, "En Cocina")
                        }
                      >
                        <Utensils className="mr-2 h-4 w-4" />
                        Empezar a Preparar
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          updateStatus(order.pedido_id, "Listo para Entrega")
                        }
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Marcar como Listo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
