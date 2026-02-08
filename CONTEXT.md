# Jaguar Market - Contexto del Proyecto

## Misión
Construir una vitrina digital ("mini-marketplace") para un bazar de 50 emprendedores. El sistema debe ser ligero, visualmente atractivo y fácil de escalar sin tocar código HTML.

## Arquitectura (Data-Driven)
El sistema ha migrado completamente a una arquitectura dinámica basada en datos.

*   **Backend:** Flask (`app_simple.py`).
*   **Data Engine:** `marketplace_data.json` (Fuente única de verdad).
*   **Frontend:** `templates/mini-sites/vendor_base.html` (Plantilla maestra universal).
*   **Routing:**
    *   `/` -> Vitrina Principal.
    *   `/<vendor_id>` -> Carga dinámica de la tienda del vendedor.
    *   Si un `vendor_id` no existe, redirige automáticamente a `/`.

## Flujo de Trabajo
1.  **Nuevo Vendedor:** Para agregar una tienda, simplemente añadir un objeto al array `vendors` en `marketplace_data.json`.
2.  **Imágenes:** Si no hay URL de imagen, el sistema usa placeholders de alta calidad (Unsplash).
3.  **Pedidos:** El carrito (`cart-universal.js`) genera pedidos vía WhatsApp con formato estandarizado.

## Estado Actual (Fase Final)
*   ✅ **Vitrina Dinámica:** Todos los negocios (Tavolos, Farmacia, Dental, etc.) cargan desde el JSON.
*   ✅ **Rutas Limpias:** URLs directas como `/tavolos`, `/dental`.
*   ✅ **Fallback:** Redirección automática a home para enlaces rotos.
*   🚫 **Archivos Estáticos:** Los archivos HTML individuales en `templates/mini-sites/` (ej. `tavolos.html`) son obsoletos y no deben usarse.

## Comandos Útiles
*   **Run Dev:** `python3 app_simple.py`
*   **Tests:** `python3 test_app.py`
