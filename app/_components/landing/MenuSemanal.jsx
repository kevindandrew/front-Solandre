"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Calendar,
  Clock,
  Utensils,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AuthModal from "./AuthModal";

export default function MenuSemanal() {
  const [menuSemanal, setMenuSemanal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchMenuSemanal();
  }, []);

  const fetchMenuSemanal = async () => {
    try {
      const response = await fetch(
        "https://backend-solandre.onrender.com/catalogo/menu-semanal"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("📋 Menú semanal recibido:", data);
        setMenuSemanal(data);
      } else {
        console.error("❌ Error en respuesta:", response.status);
      }
    } catch (error) {
      console.error("❌ Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const handleReservar = (menu) => {
    const token = Cookies.get("token");
    if (!token) {
      setSelectedMenu(menu);
      setIsLoginOpen(true);
    } else {
      // Redirigir a reservas con el menu seleccionado
      router.push(
        `/cliente/reservas?menu_id=${menu.menu_id}&fecha=${menu.fecha}`
      );
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, menuSemanal.length));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + menuSemanal.length) % Math.max(1, menuSemanal.length)
    );
  };

  if (loading) {
    return (
      <section id="menu" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Menú Semanal
            </h2>
            <p className="text-gray-600">Cargando menú...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Menú Semanal
          </h2>
          <p className="text-lg text-gray-600">
            Descubre nuestro delicioso menú de lunes a viernes
          </p>
        </div>

        {menuSemanal.length === 0 ? (
          <div className="text-center py-12">
            <Utensils className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-gray-600 text-lg">
              El menú semanal estará disponible próximamente
            </p>
          </div>
        ) : (
          <>
            {/* Desktop View - Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {menuSemanal.slice(0, 5).map((menu, index) => (
                <Card
                  key={menu.menu_id || menu.fecha || index}
                  className="hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="bg-orange-500 p-4">
                    <h3 className="text-white font-bold text-xl text-center">
                      {diasSemana[index] || "Día"}
                    </h3>
                    <p className="text-white/90 text-center text-sm mt-1">
                      {new Date(menu.fecha).toLocaleDateString("es-BO")}
                    </p>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Utensils
                          className="text-green-600 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {typeof menu.plato_principal === "string"
                              ? menu.plato_principal
                              : menu.plato_principal?.nombre ||
                                "Plato principal"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Plato Principal
                          </p>
                        </div>
                      </div>

                      {menu.entrada && (
                        <div className="text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Entrada:</span>{" "}
                            {typeof menu.entrada === "string"
                              ? menu.entrada
                              : menu.entrada?.nombre || ""}
                          </p>
                        </div>
                      )}

                      {menu.acompanamiento && (
                        <div className="text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Acompañamiento:</span>{" "}
                            {typeof menu.acompanamiento === "string"
                              ? menu.acompanamiento
                              : menu.acompanamiento?.nombre || ""}
                          </p>
                        </div>
                      )}

                      {menu.postre && (
                        <div className="text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Postre:</span>{" "}
                            {typeof menu.postre === "string"
                              ? menu.postre
                              : menu.postre?.nombre || ""}
                          </p>
                        </div>
                      )}

                      <div className="pt-2 border-t">
                        <p className="text-2xl font-bold text-green-600">
                          Bs. {menu.precio}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleReservar(menu)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-3"
                      >
                        Reservar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile View - Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {menuSemanal.slice(0, 5).map((menu, index) => (
                    <div
                      key={menu.menu_id || menu.fecha || index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <Card className="overflow-hidden">
                        <div className="bg-orange-500 p-6">
                          <h3 className="text-white font-bold text-2xl text-center">
                            {diasSemana[index] || "Día"}
                          </h3>
                          <p className="text-white/90 text-center mt-1">
                            {new Date(menu.fecha).toLocaleDateString("es-BO")}
                          </p>
                        </div>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <Utensils
                                className="text-green-600 flex-shrink-0 mt-1"
                                size={24}
                              />
                              <div>
                                <p className="font-semibold text-gray-900 text-lg">
                                  {typeof menu.plato_principal === "string"
                                    ? menu.plato_principal
                                    : menu.plato_principal?.nombre ||
                                      "Plato principal"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Plato Principal
                                </p>
                              </div>
                            </div>

                            {menu.entrada && (
                              <div>
                                <p className="text-gray-700">
                                  <span className="font-medium">Entrada:</span>{" "}
                                  {typeof menu.entrada === "string"
                                    ? menu.entrada
                                    : menu.entrada?.nombre || ""}
                                </p>
                              </div>
                            )}

                            {menu.acompanamiento && (
                              <div>
                                <p className="text-gray-700">
                                  <span className="font-medium">
                                    Acompañamiento:
                                  </span>{" "}
                                  {typeof menu.acompanamiento === "string"
                                    ? menu.acompanamiento
                                    : menu.acompanamiento?.nombre || ""}
                                </p>
                              </div>
                            )}

                            {menu.postre && (
                              <div>
                                <p className="text-gray-700">
                                  <span className="font-medium">Postre:</span>{" "}
                                  {typeof menu.postre === "string"
                                    ? menu.postre
                                    : menu.postre?.nombre || ""}
                                </p>
                              </div>
                            )}

                            <div className="pt-4 border-t">
                              <p className="text-3xl font-bold text-green-600">
                                Bs. {menu.precio}
                              </p>
                            </div>

                            <Button
                              onClick={() => handleReservar(menu)}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                            >
                              Reservar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controles de navegación móvil */}
              {menuSemanal.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
                  >
                    <ChevronLeft size={24} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
                  >
                    <ChevronRight size={24} className="text-gray-700" />
                  </button>

                  {/* Indicadores */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {menuSemanal.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-orange-500 w-6"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            onClick={() => handleReservar(menuSemanal[0])}
          >
            ¡Ordena Ahora!
          </Button>
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-4xl p-0">
          <VisuallyHidden>
            <DialogTitle>Iniciar Sesión</DialogTitle>
          </VisuallyHidden>
          <AuthModal
            onClose={() => {
              setIsLoginOpen(false);
              if (selectedMenu && Cookies.get("token")) {
                router.push(
                  `/cliente/reservas?menu_id=${selectedMenu.menu_id}&fecha=${selectedMenu.fecha}`
                );
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
