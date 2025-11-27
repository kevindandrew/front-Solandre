# Migración a js-cookie para Gestión de Tokens

## 🔒 Cambios de Seguridad Implementados

Se ha migrado completamente el almacenamiento de tokens de autenticación desde `localStorage` a cookies seguras usando la librería `js-cookie`.

## 📦 Dependencias Agregadas

```json
{
  "js-cookie": "^3.0.5"
}
```

## 🔄 Archivos Modificados

### 1. **Componentes de Autenticación**

- `components/landing/AuthModal.jsx` - Login modal principal
- `app/admin/layout.jsx` - Verificación de autenticación en rutas admin
- `app/admin/login/page.jsx` - Página de login fallback
- `components/delinut/Sidebar.jsx` - Función de logout

### 2. **Hooks de API**

- `components/platos/hooks/usePlatos.js`
- `components/pedidos/hooks/usePedidos.js`
- `components/inventario/hooks/useIngredientes.js`
- `components/menu/hooks/useMenu.js`
- `components/menu/hooks/useMenuActions.js`
- `components/empleados/hooks/useEmpleados.js`
- `components/empleados/hooks/useEmpleadosActions.js`

## 🔐 Configuración de Seguridad

Las cookies ahora se configuran con las siguientes opciones de seguridad:

```javascript
Cookies.set("token", value, {
  expires: 7, // Expira en 7 días
  secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
  sameSite: "strict", // Protección CSRF
});
```

### Beneficios de Seguridad:

1. **Expiración Automática**: Las cookies expiran automáticamente después de 7 días
2. **Secure Flag**: En producción, el token solo se envía por HTTPS
3. **SameSite Strict**: Previene ataques CSRF al no enviar cookies en requests cross-site
4. **Menor Exposición a XSS**: Las cookies tienen mejor protección que localStorage contra ciertos ataques XSS

## 📝 API de Uso

### Guardar Token

```javascript
import Cookies from "js-cookie";

Cookies.set("token", accessToken, {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});
```

### Leer Token

```javascript
const token = Cookies.get("token");
```

### Eliminar Token (Logout)

```javascript
Cookies.remove("token");
```

## ⚡ Cambios en el Flujo de Autenticación

### Antes (localStorage)

```javascript
// ❌ Menos seguro
localStorage.setItem("token", data.access_token);
const token = localStorage.getItem("token");
localStorage.removeItem("token");
```

### Después (js-cookie)

```javascript
// ✅ Más seguro
Cookies.set("token", data.access_token, {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});
const token = Cookies.get("token");
Cookies.remove("token");
```

## 🧪 Testing

Para verificar que la migración funciona correctamente:

1. **Login**: Las cookies deben aparecer en DevTools → Application → Cookies
2. **API Calls**: Todas las peticiones deben incluir el header `Authorization: Bearer {token}`
3. **Logout**: La cookie debe eliminarse completamente
4. **Expiración**: Después de 7 días, el usuario debe ser redirigido al login

## 📊 Compatibilidad

- ✅ Todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Next.js 15.5.6
- ✅ React 18+
- ✅ SSR compatible

## 🚀 Próximos Pasos Recomendados

1. **HttpOnly Cookies**: Para máxima seguridad, considerar implementar cookies HttpOnly desde el backend
2. **Refresh Tokens**: Implementar un sistema de refresh tokens para mejorar la experiencia de usuario
3. **Token Rotation**: Rotar tokens periódicamente para mayor seguridad
4. **HTTPS**: Asegurar que producción siempre use HTTPS

## ⚠️ Notas Importantes

- Los datos del usuario (`localStorage.setItem("user", ...)`) aún se almacenan en localStorage
- Considerar migrar también los datos de usuario a cookies o almacenarlos en contexto de React
- Las cookies son específicas del dominio, verificar configuración de dominio en producción
