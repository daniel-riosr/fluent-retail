# ShopHub - Sistema de Gestión de Pedidos

## 📋 Descripción

ShopHub es una plataforma completa de comercio electrónico con sistema de gestión de pedidos, desarrollada siguiendo principios de diseño centrado en el usuario, con enfoque en accesibilidad (WCAG 2.1 AA), usabilidad y experiencia de usuario optimizada.

## 🎯 Características Principales

### Para Clientes
- 🏠 **Home Page**: Landing con hero, categorías destacadas y productos promocionados
- 📦 **Catálogo de Productos**: Navegación con filtros avanzados, búsqueda y ordenamiento
- 🔍 **Fichas de Producto**: Vista detallada con galería, especificaciones, stock en tiempo real
- 🛒 **Carrito de Compras**: Gestión completa con cálculo automático de totales, IVA y envío
- 💳 **Checkout Optimizado**: Formulario con validación en tiempo real y simulación de pago
- ✅ **Confirmación de Pedido**: Resumen detallado con número de tracking
- 👤 **Cuenta de Usuario**: Historial de pedidos y seguimiento de estado

### Para Empleados/Administradores
- 📊 **Dashboard**: Métricas clave (pedidos recientes, inventario bajo, ingresos)
- 📋 **Gestión de Pedidos**: Vista completa con filtros, búsqueda y actualización de estados
- 📦 **Gestión de Inventario**: CRUD de productos, actualización de stock, alertas de inventario bajo
- 🔔 **Notificaciones**: Sistema de alertas para pedidos nuevos y stock crítico

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primario**: `#0B71EB` (Azul) - CTAs principales, enlaces, elementos de marca
- **Secundario**: `#FF7A59` (Naranja) - Acentos, destacados, promociones
- **Success**: Verde - Estados positivos, confirmaciones, stock disponible
- **Warning**: Amarillo - Alertas, stock bajo, pendientes
- **Destructive**: Rojo - Errores, eliminaciones, estados críticos

### Tipografía
- **Familia**: Inter (sans-serif moderna)
- **Escala**:
  - H1: 32-40px (desktop) / 28-32px (mobile)
  - H2: 24-28px
  - H3: 20-24px
  - Body: 16px
  - Small: 14px

### Componentes
- **Botones**: 5 variantes (primary, secondary, success, outline, ghost)
- **Badges**: Estados de pedido con código de color semántico
- **Cards**: Elevación sutil con hover interactions
- **Forms**: Validación inline con mensajes de error accesibles

## ♿ Accesibilidad

### Cumplimiento WCAG 2.1 AA
✅ **Contraste de Color**
- Textos normales: ≥ 4.5:1
- Textos grandes: ≥ 3:1
- Elementos UI: ≥ 3:1

✅ **Navegación por Teclado**
- Tab order lógico en todos los formularios
- Focus visible en elementos interactivos
- Skip links para navegación rápida

✅ **Lectores de Pantalla**
- Roles ARIA apropiados
- Labels en todos los inputs
- Estados anunciados (loading, errores, éxito)
- Alt text descriptivo en imágenes

✅ **Formularios Accesibles**
- Labels asociados con `for/id`
- Mensajes de error con `aria-invalid` y `aria-describedby`
- Validación con feedback visual y de texto
- Placeholders informativos

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ y npm

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd shophub

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:8080`

### Build para Producción
```bash
npm run build
```

## 👥 Usuarios de Prueba

### Cliente
- **Email**: `cliente@ejemplo.com`
- **Contraseña**: `cliente123`
- **Funcionalidades**: Navegar catálogo, agregar al carrito, realizar pedidos, ver historial

### Administrador
- **Email**: `admin@ejemplo.com`
- **Contraseña**: `admin123`
- **Funcionalidades**: Dashboard, gestión de pedidos, actualización de inventario

## 📱 Responsive Design

### Breakpoints
- **Mobile**: ≤ 480px
- **Tablet**: 481-768px
- **Desktop**: 769-1024px
- **Large Desktop**: ≥ 1025px

### Estrategia Mobile-First
Todos los componentes son diseñados primero para mobile y progresivamente mejorados para pantallas más grandes.

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base (shadcn)
│   ├── Navbar.tsx       # Navegación principal
│   ├── Footer.tsx       # Pie de página
│   └── ProductCard.tsx  # Card de producto reutilizable
├── contexts/
│   ├── CartContext.tsx  # Estado global del carrito
│   └── AuthContext.tsx  # Autenticación y gestión de usuarios
├── data/
│   └── mock-products.json  # Datos de productos (12 productos)
├── pages/
│   ├── Home.tsx         # Landing page
│   ├── Catalog.tsx      # Listado de productos
│   ├── ProductDetail.tsx # Detalle de producto
│   ├── Cart.tsx         # Carrito de compras
│   ├── Checkout.tsx     # Proceso de pago
│   ├── OrderConfirmation.tsx # Confirmación
│   ├── Account.tsx      # Cuenta del usuario
│   ├── Login.tsx        # Inicio de sesión
│   └── admin/
│       ├── Dashboard.tsx    # Panel admin
│       ├── Orders.tsx       # Gestión de pedidos
│       └── Inventory.tsx    # Gestión de inventario
└── index.css            # Sistema de diseño global
```

## 🎯 Flujos de Usuario Principales

### Flujo de Compra (Cliente)
1. Navegar al catálogo o ver productos destacados en Home
2. Filtrar/buscar productos según necesidades
3. Ver detalle de producto y seleccionar cantidad
4. Agregar al carrito (con feedback inmediato)
5. Revisar carrito y ajustar cantidades si necesario
6. Proceder al checkout
7. Completar formulario de envío y pago (con validación en tiempo real)
8. Confirmar pedido y recibir número de tracking
9. Ver confirmación con detalles completos

### Flujo de Gestión (Administrador)
1. Login como administrador
2. Ver dashboard con métricas clave
3. Revisar pedidos recientes y actualizaciones necesarias
4. Gestionar pedidos: cambiar estados (pendiente → confirmado → enviado → entregado)
5. Gestionar inventario: actualizar stock, revisar productos con bajo inventario
6. Recibir alertas de stock crítico

## 🔒 Seguridad y Validación

### Validación de Formularios
- **Email**: Regex pattern para formato válido
- **Teléfono**: Solo números y caracteres permitidos
- **Código Postal**: Formato argentino (4 dígitos)
- **Tarjeta**: Validación de longitud y formato
- **Inputs**: Sanitización contra XSS

### Autenticación
- Simulación de login con usuarios mock
- Protected routes para páginas privadas
- Verificación de rol para panel admin
- Sesión persistente en localStorage

## 📊 Datos Mock

El proyecto incluye 12 productos de ejemplo en `src/data/mock-products.json` con:
- Información completa (nombre, SKU, precio, categoría)
- Imágenes de alta calidad (Unsplash)
- Especificaciones técnicas detalladas
- Stock variable para testing
- Ratings y reviews simuladas

## 🎨 Microinteracciones

### Feedback Visual
- ✅ **Toast Notifications**: Confirmaciones de acciones (agregar al carrito, actualizar pedido)
- 🔄 **Loading States**: Spinners en procesos asíncronos
- ✨ **Hover Effects**: Elevación de cards, cambio de color en botones
- 📊 **Badge Updates**: Contador del carrito en tiempo real
- 🎯 **Form Validation**: Mensajes inline con iconos y colores semánticos

### Animaciones
- Fade-in en carga de páginas
- Slide-up en secciones
- Scale-in en modales
- Smooth transitions en cambios de estado

## 🧪 Testing Manual

### Checklist de Accesibilidad
- [ ] Navegación completa solo con teclado (Tab, Enter, Esc)
- [ ] Focus visible en todos los elementos interactivos
- [ ] Contraste de color adecuado (verificado con herramientas)
- [ ] Textos alternativos en imágenes
- [ ] Labels asociados con inputs
- [ ] Mensajes de error accesibles
- [ ] Estados comunicados claramente

### Checklist de Funcionalidad
- [ ] Agregar productos al carrito
- [ ] Actualizar cantidades en carrito
- [ ] Remover productos del carrito
- [ ] Aplicar filtros en catálogo
- [ ] Búsqueda de productos
- [ ] Ordenamiento de productos
- [ ] Completar checkout con validación
- [ ] Ver confirmación de pedido
- [ ] Login como cliente y admin
- [ ] Gestionar estados de pedidos (admin)
- [ ] Actualizar stock de productos (admin)

### Checklist de Responsive
- [ ] Layout adaptado en mobile (≤480px)
- [ ] Layout adaptado en tablet (481-768px)
- [ ] Layout adaptado en desktop (769-1024px)
- [ ] Imágenes responsive con lazy loading
- [ ] Menú colapsable en mobile
- [ ] Formularios usables en mobile

## 🔄 Próximas Mejoras Sugeridas

### Backend Integration
- Conectar con API real para productos y pedidos
- Implementar autenticación JWT
- Sistema de pagos real (Stripe/MercadoPago)
- Envío de emails de confirmación

### Features Adicionales
- Sistema de reviews y ratings
- Wishlist / Lista de deseos
- Comparación de productos
- Chat de soporte en vivo
- Cupones y descuentos
- Seguimiento de envío en tiempo real
- Notificaciones push
- Exportación de reportes (CSV/PDF)

### Optimizaciones
- Server-Side Rendering (SSR)
- Image optimization avanzada
- Code splitting por ruta
- Service Worker para PWA
- Analytics y tracking

## 📝 Notas Técnicas

### Stack Tecnológico
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: Shadcn/ui (Radix UI)
- **State Management**: React Context API
- **Forms**: Validación manual con TypeScript
- **Notifications**: Sonner

### Performance
- Lazy loading de imágenes
- Optimización de re-renders con React.memo
- Context API para estado global eficiente
- CSS crítico inline
- Bundle size optimizado

## 📞 Soporte

Para consultas técnicas o reportar issues:
- Email: soporte@shophub.com
- Teléfono: +54 9 11 1234-5678

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Licencia**: MIT
