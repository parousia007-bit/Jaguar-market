# Arquitectura y Estado del Sistema: Plataforma de Mini-Sitios

Este documento detalla la arquitectura técnica, el flujo de datos y el estado actual de los componentes de la plataforma. Su propósito es servir como contexto profundo ("deep dive") para que una IA comprenda las complejidades del sistema y pueda generar prompts o soluciones precisas en fases futuras.

## 1. Visión General de la Arquitectura

La plataforma opera bajo un modelo híbrido que transiciona de archivos estáticos heredados a una arquitectura dinámica basada en datos (Data-Driven).

### Backend (Flask)
El núcleo es `app_simple.py`, una aplicación Flask ligera que maneja dos tipos de enrutamiento:

1.  **Rutas Dinámicas (Nueva Arquitectura):**
    *   **Endpoint:** `/vendor/<vendor_id>`
    *   **Lógica:** Carga la configuración del vendedor desde `marketplace_data.json`.
    *   **Renderizado:** Inyecta los datos en la plantilla maestra `templates/mini-sites/vendor_base.html`.
    *   **Ventaja:** Permite escalar a cientos de tiendas sin duplicar archivos HTML.

2.  **Rutas Estáticas (Legacy/Fallback):**
    *   **Endpoint:** `/bazar/<slug>`
    *   **Lógica:** Sirve archivos HTML específicos (ej. `tavolos.html`) ubicados en `templates/mini-sites/`.
    *   **Estado:** Se mantiene por retrocompatibilidad pero está deprecado para nuevos desarrollos.

### Base de Datos (JSON Flatfile)
El "Motor de Datos" reside en `marketplace_data.json`. Este archivo actúa como una base de datos NoSQL ligera y contiene:
*   **Configuración Global:** Temas, colores, estilos por defecto.
*   **Datos de Vendedores:** Inventario anidado (Categorías -> Productos -> Precios), información de contacto, y metadatos de UI (imágenes, descripciones).

## 2. Flujo de Datos

### Carga de Página (Server-Side Rendering)
1.  **Request:** El usuario accede a `/vendor/tavolos`.
2.  **Controller (`app_simple.py`):**
    *   Busca "tavolos" en `marketplace_data.json`.
    *   Extrae el objeto `vendor` y el objeto `theme`.
3.  **View (`vendor_base.html`):**
    *   Jinja2 itera sobre `vendor.categories`.
    *   Jinja2 inyecta variables CSS (colores, fuentes) en el `<style>` del `head` basándose en la config del tema.
    *   Se generan los esqueletos de carga (`.skeleton`) y las tarjetas de producto.

### Interacción del Cliente (Client-Side)
1.  **Selección de Precios:**
    *   Al cargar, un script embebido en `vendor_base.html` selecciona automáticamente la primera opción de precio para cada producto.
    *   Actualiza los inputs ocultos (`input[name="price"]`, `input[name="product-name"]`) necesarios para el carrito.
2.  **Carrito de Compras (`cart-universal.js`):**
    *   **Trigger:** Clic en `.btn-add-cart`.
    *   **Captura:** El script lee el DOM buscando `.product-item` padre para extraer nombre, precio y cantidad.
    *   **Almacenamiento:** Persiste los items en `localStorage`.
    *   **Checkout:** Genera un enlace de WhatsApp codificado usando el número definido en el atributo `data-vendor-phone` del `body`.

## 3. Estado de los Componentes

### A. Plantilla Maestra (`vendor_base.html`)
Actualmente en **Fase 2 (UI High-End)**.
*   **Estilo:** Utiliza "Glassmorphism" (`backdrop-filter: blur(20px)`), sombras suaves y bordes redondeados.
*   **Imágenes:** Implementa `object-fit: cover` para uniformidad visual y placeholders de Unsplash si no hay imagen definida.
*   **Estructura:**
    *   Header fijo con búsqueda (funcionalidad visual por ahora).
    *   Navegación por categorías (Pills).
    *   Grid de productos responsivo.
    *   Botón flotante del carrito.

### B. Motor de Carrito (`cart-universal.js`)
*   **Estado:** Estable y desacoplado.
*   **Dependencias:** Es agnóstico al backend, pero espera una estructura HTML específica:
    *   Contenedor: `.product-item`
    *   Datos: `.product-name`, `.product-price` (input o texto), `data-vendor-phone` (en body).
*   **Funcionalidad:** Agregar/Quitar items, persistencia, cálculo de total, checkout a WhatsApp.

### C. Datos (`marketplace_data.json`)
*   **Integridad:** Contiene estructura completa para "Pizzería Tavolos".
*   **Imágenes:** Se han inyectado URLs de placeholders de alta calidad (Unsplash) para pruebas de UI.

## 4. Puntos Críticos para Prompts Futuros

Al instruir a la IA para futuras tareas, considerar:

1.  **Modificar Estilos:** No editar CSS inline arbitrariamente. Modificar las variables en `marketplace_data.json` (para cambios globales) o las clases CSS en `vendor_base.html` (para cambios estructurales).
2.  **Nuevas Funcionalidades JS:** Cualquier lógica de interacción con productos (ej. modificadores extra, notas de cocina) debe asegurar que actualiza los *hidden inputs* que `cart-universal.js` lee.
3.  **Escalabilidad:** Al agregar nuevos vendedores, simplemente se debe añadir una entrada en `marketplace_data.json`; no se deben crear nuevos archivos HTML.

---
*Última actualización: Fase 2 - UI Glassmorphism & Data Engine Integration.*
