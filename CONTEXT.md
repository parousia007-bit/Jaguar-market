# Jaguar Market Platform - Technical Deep Dive & Context

## 1. Architecture Overview

**Type:** Server-Side Rendered (SSR) Web Application with Client-Side Micro-Interactions.
**Stack:**
*   **Backend:** Python 3.9+ with Flask 2.3.3.
*   **Server:** Gunicorn 21.2.0 (Production WSGI).
*   **Frontend:** HTML5, CSS3 (Custom Design System), Vanilla JavaScript.
*   **Deployment:** Configured for Render (`.render.yaml`).

### Directory Structure
*   `app_simple.py`: **Core Controller**. Defines all URL routes and renders specific HTML templates. It acts as a router mapping URLs to views.
*   `templates/`: **View Layer**. Contains HTML files.
    *   `index.html`: Main landing page / directory.
    *   `pizzeria_tavolos.html`: A specialized SPA-like (Single Page Application) view for a specific business with cart logic.
    *   `consultorio_dental.html`, `laboratorio_analisis.html`, etc.: Informational pages for services.
*   `static/`: **Assets**.
    *   `css/main.css`: Global styles, responsive grid, variables.
    *   `js/main.js`: Global UI logic (nav behavior, animations).
    *   `tavolos_v2.css`: Specific styles for the Tavolos business page.

## 2. Data Flow

The application currently operates without a backend database. Data is static (hardcoded in HTML) or ephemeral (client-side state).

1.  **Request**: User requests a page (e.g., `/` or `/pizzerias/tavolos`).
2.  **Routing & Serving**: Flask (`app_simple.py`) routes the request and serves the pre-defined HTML template.
3.  **Client-Side Interaction**:
    *   **Browsing**: Users navigate via standard hyperlinks.
    *   **Ordering (e.g., Tavolos)**: Users add items to a "Cart". This state is managed entirely in the browser using JavaScript and persisted via `localStorage`.
4.  **Checkout / Conversion**:
    *   **Mechanism**: WhatsApp-First.
    *   **Process**: When a user confirms an order, the JS constructs a formatted string containing all order details.
    *   **Action**: The browser redirects to `wa.me/<phone>?text=<order_details>`.
    *   **Result**: The transaction is finalized off-platform in the WhatsApp chat between the user and the business.

## 3. Component State & Logic

### 3.1 Backend (`app_simple.py`)
*   **State**: Stateless. Pure routing.
*   **Key Routes**:
    *   `/`: Landing page.
    *   `/pizzerias/tavolos`: Interactive menu app.
    *   `/servicios/*`: Informational pages for professional services.

### 3.2 Frontend Components

#### **A. Landing Page (`index.html`)**
*   **Role**: Directory and entry point.
*   **Logic**:
    *   **Navigation**: Sticky header with scroll-aware transparency.
    *   **Search**: Client-side redirection (or simple JS filtering in some versions).
    *   **Design**: Uses a CSS Variable system (`--primary`, `--secondary`) for theming.

#### **B. Micro-App: Pizzería Tavolos (`pizzeria_tavolos.html`)**
*   **Role**: Fully functional ordering interface.
*   **State Management (JavaScript)**:
    *   `cart`: Array of objects `{name, size, price, qty}`.
    *   `localStorage('tavolos_cart')`: Persists cart data across page reloads.
    *   `currentFilter`: Manages menu category visibility.
*   **UI Components**:
    *   **Menu Grid**: Dynamic filtering by category.
    *   **Cart Modal**: Displays items, allows quantity adjustment, collects user details (Name, Phone, Address).
    *   **Floating Actions**: Cart button and WhatsApp contact.

## 4. Current Limitations & Issues (Technical Debt)

### 4.1 Missing Templates
The router (`app_simple.py`) defines several routes that point to **non-existent files**. Calling these routes will result in a 500 Internal Server Error (Template Not Found):
*   `pizzeria_tavolos_menu_completo.html` (Route: `/pizzerias/tavolos/menu-pdf`)
*   `dental_agendar_cita.html` (Route: `/servicios/dental/agendar-cita`)
*   `laboratorio_solicitud.html` (Route: `/servicios/laboratorio/solicitar-estudio`)
*   `admin_dashboard.html` (Route: `/admin/dashboard`)
*   `plaza/index.html` (Route: `/plaza`)
*   `mall_3d.html` (Route: `/mall-3d`)

### 4.2 Artifacts
*   **Core Dump**: A binary `core` file exists in the root, likely from a previous crash or environment issue. It should be removed.

## 5. Guidelines for AI & Future Development

*   **Database-Free Philosophy (Current)**: Any new content features currently require editing HTML templates directly. To make content dynamic, a database (SQLite/Postgres) would need to be introduced.
*   **WhatsApp Dependency**: The business model relies on WhatsApp for closing sales. Do not alter this flow without a specific requirement. All "Orders" must eventually become a WhatsApp message.
*   **Visual Consistency**: Use the variables defined in `static/css/main.css` (`var(--primary)`, `var(--radius-lg)`, etc.) for any new UI elements.
*   **Mobile-First**: The majority of users are expected to be on mobile. Ensure all click targets are touch-friendly (min 44px).
