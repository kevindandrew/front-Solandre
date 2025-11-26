"use client";

import { useState, useEffect } from "react";
import { Clock, User, Package, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePedidos } from "@/components/pedidos/hooks/usePedidos";

const ESTADOS_COLORES = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Confirmado: "bg-blue-100 text-blue-800",
  "En Cocina": "bg-purple-100 text-purple-800",
  "Listo para Entrega": "bg-green-100 text-green-800",
  "En Reparto": "bg-orange-100 text-orange-800",
  Entregado: "bg-emerald-100 text-emerald-800",
  Cancelado: "bg-red-100 text-red-800",
};

export default function PedidosPage() {
  const { pedidos, confirmarPedido, cancelarPedido } = usePedidos();
  const [pedidosHoy, setPedidosHoy] = useState([]);

  useEffect(() => {
    // Filtrar solo pedidos de hoy
    const hoy = new Date().toISOString().split("T")[0];
    const pedidosDelDia = pedidos.filter((pedido) => {
      const fechaPedido = new Date(pedido.fecha_pedido)
        .toISOString()
        .split("T")[0];
      return fechaPedido === hoy;
    });
    setPedidosHoy(pedidosDelDia);
  }, [pedidos]);

  const handleConfirmar = async (pedidoId) => {
    await confirmarPedido(pedidoId);
  };

  const handleCancelar = async (pedidoId) => {
    if (confirm("¿Cancelar este pedido?")) {
      await cancelarPedido(pedidoId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos de Hoy</h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Badge className="text-lg px-4 py-2 bg-orange-500 text-white">
          {pedidosHoy.length} Pedidos
        </Badge>
      </div>

      {pedidosHoy.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No hay pedidos para hoy</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pedidosHoy.map((pedido) => (
            <Card
              key={pedido.pedido_id}
              className="hover:shadow-lg transition-shadow"
            >
              <div
                className={`p-3 ${
                  pedido.estado === "Pendiente"
                    ? "bg-yellow-500"
                    : pedido.estado === "En Cocina"
                    ? "bg-purple-500"
                    : pedido.estado === "Listo para Entrega"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="font-bold">#{pedido.pedido_id}</span>
                  <Badge className={ESTADOS_COLORES[pedido.estado]}>
                    {pedido.estado}
                  </Badge>
                </div>
                <p className="text-white text-sm mt-1">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {new Date(pedido.fecha_pedido).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {pedido.cliente_nombre || "Cliente"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {pedido.cliente_email}
                      </p>
                    </div>
                  </div>

                  {pedido.items && pedido.items.length > 0 && (
                    <div className="border-t pt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Items:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {pedido.items.slice(0, 3).map((item, idx) => (
                          <li key={idx}>
                            • {item.cantidad}x {item.nombre_plato}
                          </li>
                        ))}
                        {pedido.items.length > 3 && (
                          <li className="text-gray-400">
                            + {pedido.items.length - 3} más...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {pedido.total && (
                    <div className="border-t pt-2">
                      <p className="text-lg font-bold text-green-600">
                        Bs. {pedido.total.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {pedido.estado === "Pendiente" && (
                      <Button
                        onClick={() => handleConfirmar(pedido.pedido_id)}
                        size="sm"
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirmar
                      </Button>
                    )}
                    {pedido.estado !== "Cancelado" &&
                      pedido.estado !== "Entregado" && (
                        <Button
                          onClick={() => handleCancelar(pedido.pedido_id)}
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancelar
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
