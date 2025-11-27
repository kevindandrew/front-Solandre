# Endpoints Públicos Necesarios para el Landing

## Problema Actual
Los endpoints `/admin/menu` y `/admin/platos` requieren autenticación (Bearer token), pero el menú semanal en el landing necesita mostrarse a usuarios no autenticados.

## Solución Requerida en Backend

### 1. Crear endpoint público para menú semanal
```
GET /catalogo/menu-semanal
```
**Descripción**: Debe retornar los menús publicados de la semana actual con TODA la información de platos, bebidas y postres incluida.

**Response esperado:**
```json
[
  {
    "menu_dia_id": 1,
    "fecha": "2025-11-25",
    "precio_menu": "22.00",
    "cantidad_disponible": 50,
    "publicado": true,
    "plato_principal": {
      "plato_id": 1,
      "nombre": "Milanesa de Pollo",
      "descripcion": "Clásica milanesa con guarniciones",
      "imagen_url": "https://...",
      "tipo": "Principal"
    },
    "bebida": {
      "plato_id": 2,
      "nombre": "Refresco de Mocochinchi",
      "descripcion": "Bebida tradicional refrescante",
      "imagen_url": "https://...",
      "tipo": "Bebida"
    },
    "postre": {
      "plato_id": 3,
      "nombre": "Flan Casero",
      "descripcion": "Postre de leche y huevo",
      "imagen_url": "https://...",
      "tipo": "Postre"
    }
  }
]
```

### 2. Alternativa: Hacer públicos ciertos endpoints
Si es más fácil, pueden hacer que estos endpoints NO requieran autenticación:
- `GET /admin/menu?publicado=true` (solo lectura de menús publicados)
- `GET /admin/platos` (solo lectura del catálogo de platos)

## Estado Actual
❌ Los endpoints requieren autenticación y dan error 403 Forbidden
❌ El endpoint `/catalogo/menu-semanal` existe pero no retorna la información completa de los platos

## Impacto
Los usuarios no pueden ver el menú semanal en el landing page sin iniciar sesión, lo cual reduce conversiones y ventas.
