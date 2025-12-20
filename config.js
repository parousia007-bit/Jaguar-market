/* ============================================
   JAGUAR MARKET - CONFIGURACIÓN
   ============================================ */

// CONFIGURACIÓN GENERAL
const CONFIG = {
    // ========================================
    // COMPORTAMIENTO DE VISUALIZACIÓN
    // ========================================
    
    // Control de duplicados en secciones
    allowDuplicates: false,  
    // false: Cada negocio aparece solo UNA vez (recomendado)
    // true: Los negocios pueden aparecer en múltiples secciones
    
    // Número de negocios recientes a mostrar
    recentBusinessesLimit: 4,
    
    // Mostrar secciones vacías
    showEmptySections: false,  
    // false: Oculta secciones sin negocios (recomendado)
    // true: Muestra mensaje "No hay negocios..."
    
    // ========================================
    // ANIMACIONES Y PERFORMANCE
    // ========================================
    
    // Retraso entre animaciones de tarjetas (ms)
    cardAnimationDelay: 100,
    
    // Intervalo de actualización de estados (ms)
    statusUpdateInterval: 60000,  // 1 minuto
    
    // ========================================
    // BÚSQUEDA
    // ========================================
    
    // Caracteres mínimos para buscar
    minSearchLength: 1,
    
    // Número máximo de resultados de búsqueda
    maxSearchResults: 10,
    
    // ========================================
    // WHATSAPP
    // ========================================
    
    // Mensaje predeterminado de WhatsApp
    whatsappDefaultMessage: 'Hola! Vi tu negocio "{businessName}" en Jaguar Market y me gustaría obtener más información.',
    
    // ========================================
    // FAVORITOS
    // ========================================
    
    // Clave de localStorage para favoritos
    favoritesStorageKey: 'jaguarmarket_favorites',
    
    // ========================================
    // UI/UX
    // ========================================
    
    // Scroll suave al filtrar categorías
    smoothScrollOnFilter: true,
    
    // Cerrar búsqueda automáticamente al seleccionar resultado
    autoCloseSearchOnSelect: true,
    
    // Tiempo de highlight al hacer scroll a negocio (ms)
    highlightDuration: 2000,
    
    // ========================================
    // ESTADÍSTICAS
    // ========================================
    
    // Duración de animación de contadores (ms)
    counterAnimationDuration: 1000,
    
    // ========================================
    // CONTACTO Y SOPORTE
    // ========================================
    
    // Número de WhatsApp principal (para registro de negocios)
    supportWhatsApp: '+5219619702540',  // ← YA CON TU NÚMERO
    
    // Email de contacto
    supportEmail: 'soporte@jaguarmarket.com',
    
    // ========================================
    // SEO Y META
    // ========================================
    
    // Nombre del sitio
    siteName: 'Jaguar Market',
    
    // Descripción del sitio
    siteDescription: 'Marketplace local con negocios de calidad en Tuxtla Gutiérrez',
    
    // Ubicación principal
    mainLocation: 'Tuxtla Gutiérrez, Chiapas'
};

// ============================================
// TEXTOS Y MENSAJES PERSONALIZABLES
// ============================================

const TEXTS = {
    // HEADER
    mainTitle: '¿Qué se te antoja hoy?',
    mainSubtitle: 'Explora nuestras categorías más populares',
    
    // SECCIONES
    featuredTitle: 'Negocios Destacados',
    featuredSubtitle: 'Los más populares de Tuxtla Gutiérrez',
    recentTitle: 'Negocios Recientes',
    recentSubtitle: 'Recién agregados a la plataforma',
    
    // CATEGORÍAS
    categoryFood: 'Comida y Restaurantes',
    categoryHealth: 'Salud y Bienestar',
    categoryServices: 'Servicios',
    categoryDesserts: 'Postres y Dulces',
    
    // ESTADOS
    statusOpen: 'Abierto',
    statusClosed: 'Cerrado',
    status24h: '24 horas',
    
    // BÚSQUEDA
    searchPlaceholder: 'Buscar negocios, comida, servicios...',
    searchNoResults: 'No se encontraron resultados',
    
    // BOTONES
    btnViewCatalog: 'Ver Catálogo',
    btnComingSoon: 'Próximamente',
    btnWhatsApp: 'Contactar por WhatsApp',
    btnFavorite: 'Agregar a favoritos',
    
    // MODAL REGISTRO
    registrationTitle: 'Registra tu Negocio',
    registrationDescription: '¿Tienes un negocio local? Únete a Jaguar Market y llega a más clientes.',
    
    // FOOTER
    footerCopyright: '© 2024 Jaguar Market - Todos los negocios verificados',
    
    // ESTADÍSTICAS
    statBusinesses: 'Negocios',
    statReviews: 'Reseñas',
    statRating: 'Promedio'
};

// ============================================
// CATEGORÍAS PERSONALIZABLES
// ============================================

const CATEGORY_CONFIG = {
    food: {
        showInFilters: true,
        order: 1
    },
    health: {
        showInFilters: true,
        order: 2
    },
    desserts: {
        showInFilters: true,
        order: 3
    },
    services: {
        showInFilters: true,
        order: 4
    }
};

// ============================================
// COLORES PERSONALIZABLES (Opcionales)
// ============================================
// Estos colores también se pueden cambiar en styles.css

const COLORS = {
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    secondary: '#F7931E',
    
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
};

// ============================================
// VALIDACIÓN DE CONFIGURACIÓN
// ============================================

function validateConfig() {
    // Validar que los valores críticos sean correctos
    if (CONFIG.recentBusinessesLimit < 0) {
        console.warn('⚠️ recentBusinessesLimit debe ser positivo');
        CONFIG.recentBusinessesLimit = 4;
    }
    
    if (CONFIG.minSearchLength < 1) {
        console.warn('⚠️ minSearchLength debe ser al menos 1');
        CONFIG.minSearchLength = 1;
    }
    
    console.log('✅ Configuración validada');
}

// Validar configuración al cargar
validateConfig();

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================

// Hacer disponible globalmente
window.JaguarMarketConfig = {
    CONFIG,
    TEXTS,
    COLORS,
    CATEGORY_CONFIG
};
