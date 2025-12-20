/* ============================================
   JAGUAR MARKET - LÓGICA DE LA APLICACIÓN
   ============================================ */

// ESTADO GLOBAL DE LA APLICACIÓN
const AppState = {
    currentCategory: 'all',
    searchQuery: '',
    favorites: new Set(),
    currentBusiness: null,
    // Cargar configuración desde config.js (si existe) o usar valor por defecto
    allowDuplicates: (typeof CONFIG !== 'undefined') ? CONFIG.allowDuplicates : false
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Jaguar Market iniciando...');
    
    // Cargar favoritos del localStorage
    loadFavorites();
    
    // Renderizar todas las secciones
    renderFeaturedBusinesses();
    renderBusinessesByCategory();
    renderRecentBusinesses();
    
    // Actualizar estadísticas
    updateStatistics();
    
    // Detectar estado de negocios cada minuto
    setInterval(updateBusinessStatuses, 60000);
    
    console.log('✅ Jaguar Market listo');
});

// ============================================
// RENDERIZADO DE NEGOCIOS
// ============================================

function renderFeaturedBusinesses() {
    const container = document.getElementById('featuredGrid');
    const featured = getFeaturedBusinesses();
    
    if (featured.length > 0) {
        container.innerHTML = featured.map((business, index) => 
            createBusinessCard(business, index)
        ).join('');
    } else {
        // Si no hay destacados, ocultar la sección
        const section = container.closest('section');
        if (section) section.style.display = 'none';
    }
}

function renderBusinessesByCategory() {
    const categories = ['food', 'health', 'desserts'];
    
    // Solo filtrar duplicados si allowDuplicates es false
    let shownIds = new Set();
    if (!AppState.allowDuplicates) {
        const featuredIds = new Set(getFeaturedBusinesses().map(b => b.id));
        const recentIds = new Set(getRecentBusinesses(4).map(b => b.id));
        shownIds = new Set([...featuredIds, ...recentIds]);
    }
    
    categories.forEach(category => {
        const container = document.getElementById(`${category}Grid`);
        const allBusinesses = getBusinessesByCategory(category);
        
        // FILTRAR negocios según configuración
        const businesses = AppState.allowDuplicates 
            ? allBusinesses 
            : allBusinesses.filter(b => !shownIds.has(b.id));
        
        if (businesses.length > 0) {
            container.innerHTML = businesses.map((business, index) => 
                createBusinessCard(business, index)
            ).join('');
            
            // Asegurar que la sección sea visible
            const section = container.closest('section');
            if (section) section.style.display = 'block';
        } else {
            // Si no hay negocios, ocultar la sección
            const section = container.closest('section');
            if (section) section.style.display = 'none';
        }
    });
}

function renderRecentBusinesses() {
    const container = document.getElementById('newGrid');
    const recent = getRecentBusinesses(4);
    
    if (recent.length > 0) {
        container.innerHTML = recent.map((business, index) => 
            createBusinessCard(business, index)
        ).join('');
    } else {
        // Si no hay recientes, ocultar la sección
        const section = container.closest('section');
        if (section) section.style.display = 'none';
    }
}

// ============================================
// CREACIÓN DE TARJETAS DE NEGOCIO
// ============================================

function createBusinessCard(business, index) {
    const statusInfo = getCurrentStatus(business);
    const isFavorite = AppState.favorites.has(business.id);
    
    // Generar estrellas
    const stars = generateStars(business.rating);
    
    // Generar tiempo de entrega
    const deliveryInfo = business.deliveryTime 
        ? `<div class="meta-item delivery-time">
               <i class="fas fa-motorcycle"></i>
               <span>${business.deliveryTime.min}-${business.deliveryTime.max} min</span>
               ${business.features.isExpress ? '<span class="express-badge">Express</span>' : ''}
           </div>`
        : '';
    
    // Generar tags
    const tagsHTML = business.tags.slice(0, 3).map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    // Botón de acción principal
    const actionButton = business.siteUrl 
        ? `<a href="${business.siteUrl}" 
               class="btn btn-primary btn-business"
               aria-label="Ver catálogo completo de ${business.name}">
               <i class="fas fa-eye"></i> Ver Catálogo
           </a>`
        : `<button class="btn btn-primary btn-business"
                    onclick="showComingSoon('${business.name}')"
                    aria-label="Próximamente disponible">
               <i class="fas fa-clock"></i> Próximamente
           </button>`;
    
    return `
        <div class="business-card" 
             data-business-id="${business.id}"
             data-category="${business.category}"
             style="--card-index: ${index}">
            
            <!-- IMAGEN -->
            <div class="business-image-container">
                <img src="${business.image}" 
                     alt="${business.name}"
                     class="business-image" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/800x480?text=Sin+Imagen'">
            </div>
            
            <!-- CONTENIDO -->
            <div class="business-content">
                
                <!-- HEADER -->
                <div class="business-header">
                    <div class="business-info">
                        <h3 class="business-name">${business.name}</h3>
                        <div class="business-subtitle">
                            <i class="fas fa-${getCategoryIcon(business.category)}"></i>
                            ${CATEGORIES[business.category].name}
                        </div>
                    </div>
                    <span class="business-badge ${statusInfo.badge}">
                        <i class="fas fa-${getStatusIcon(statusInfo.status)}"></i>
                        ${statusInfo.text}
                    </span>
                </div>
                
                <!-- META INFORMACIÓN -->
                <div class="business-meta">
                    <!-- Rating -->
                    <div class="rating-container" 
                         data-rating="${business.rating}"
                         data-votes="${business.reviewCount}">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${business.rating} (${business.reviewCount})</span>
                    </div>
                    
                    <!-- Tiempo de entrega -->
                    ${deliveryInfo}
                    
                    <!-- Rango de precios -->
                    <div class="meta-item price-range">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${business.priceRange}</span>
                    </div>
                </div>
                
                <!-- DESCRIPCIÓN -->
                <p class="business-description" style="
                    font-size: 0.875rem;
                    color: var(--gray-600);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                ">${business.description}</p>
                
                <!-- TAGS -->
                <div class="business-tags">
                    ${tagsHTML}
                </div>
                
                <!-- FOOTER CON ACCIONES -->
                <!-- FOOTER CON ACCIONES -->
                <div class="business-footer">
                    ${actionButton}

                    <!-- WhatsApp -->
                    <button class="btn-icon btn-whatsapp"
                            onclick="openWhatsApp('${business.contact.whatsapp}', '${business.name}')"
                            aria-label="Contactar por WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>

                    <!-- Favorito -->
                    <button class="btn-icon btn-favorite ${isFavorite ? 'active' : ''}"
                            onclick="toggleFavorite('${business.id}')"
                            aria-label="Agregar a favoritos">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>

                    <!-- Calificar -->
                    <button class="btn-icon btn-rate"
                            onclick="showRatingModal('${business.id}', '${business.name}')"
                            aria-label="Calificar negocio">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                
            </div>
        </div>
    `;
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getCategoryIcon(category) {
    const icons = {
        food: 'utensils',
        health: 'heartbeat',
        services: 'concierge-bell',
        desserts: 'ice-cream'
    };
    return icons[category] || 'store';
}

function getStatusIcon(status) {
    const icons = {
        open: 'clock',
        closed: 'times-circle'
    };
    return icons[status] || 'clock';
}

// ============================================
// FILTRADO Y BÚSQUEDA
// ============================================

function filterByCategory(categoryId) {
    AppState.currentCategory = categoryId;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar/ocultar secciones
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        const sectionCategory = section.dataset.category;
        
        if (categoryId === 'all' || sectionCategory === categoryId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Animar scroll suave a la primera sección visible
    if (categoryId !== 'all') {
        const targetSection = document.querySelector(`[data-category="${categoryId}"]`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function handleSearch(query) {
    AppState.searchQuery = query.toLowerCase();
    
    const searchResults = document.getElementById('searchResults');
    const clearBtn = document.querySelector('.btn-clear');
    
    if (query.length === 0) {
        searchResults.innerHTML = '';
        clearBtn.style.display = 'none';
        return;
    }
    
    clearBtn.style.display = 'flex';
    
    const results = searchBusinesses(query);
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: var(--gray-500);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <p>No se encontraron resultados para "${query}"</p>
            </div>
        `;
        return;
    }
    
    searchResults.innerHTML = results.map(business => `
        <div class="search-result-item" 
             style="padding: 1rem; border-bottom: 1px solid var(--gray-200); cursor: pointer;
                    transition: background 0.2s;"
             onclick="scrollToBusiness('${business.id}')"
             onmouseover="this.style.background='var(--gray-50)'"
             onmouseout="this.style.background='transparent'">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${business.image}" 
                     alt="${business.name}"
                     style="width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.25rem;">
                        ${business.name}
                    </h4>
                    <p style="font-size: 0.75rem; color: var(--gray-600);">
                        ${business.category} • ${business.rating} ⭐
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    handleSearch('');
}

function toggleSearch() {
    const container = document.getElementById('searchContainer');
    const input = document.getElementById('searchInput');
    
    if (container.style.display === 'none' || !container.style.display) {
        container.style.display = 'block';
        input.focus();
    } else {
        container.style.display = 'none';
        clearSearch();
    }
}

function scrollToBusiness(businessId) {
    const card = document.querySelector(`[data-business-id="${businessId}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Efecto de highlight
        card.style.boxShadow = '0 0 0 4px rgba(255, 107, 53, 0.3)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 2000);
    }
    
    // Cerrar búsqueda
    toggleSearch();
}

// ============================================
// FAVORITOS
// ============================================

function toggleFavorite(businessId) {
    if (AppState.favorites.has(businessId)) {
        AppState.favorites.delete(businessId);
    } else {
        AppState.favorites.add(businessId);
    }
    
    // Guardar en localStorage
    saveFavorites();
    
    // Actualizar UI
    const btn = document.querySelector(`[data-business-id="${businessId}"] .btn-favorite`);
    const icon = btn.querySelector('i');
    
    if (AppState.favorites.has(businessId)) {
        btn.classList.add('active');
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        btn.classList.remove('active');
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

function saveFavorites() {
    localStorage.setItem('jaguarmarket_favorites', JSON.stringify([...AppState.favorites]));
}

function loadFavorites() {
    try {
        const saved = localStorage.getItem('jaguarmarket_favorites');
        if (saved) {
            AppState.favorites = new Set(JSON.parse(saved));
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

// ============================================
// WHATSAPP
// ============================================

function openWhatsApp(phone, businessName) {
    const message = encodeURIComponent(
        `Hola! Vi tu negocio "${businessName}" en Jaguar Market y me gustaría obtener más información.`
    );
    
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
}

// ============================================
// ESTADÍSTICAS
// ============================================

function updateStatistics() {
    const stats = getStatistics();
    
    // Animar números
    animateCounter('businessCount', 0, stats.businessCount, 1000);
    animateCounter('reviewCount', 0, stats.reviewCount, 1500);
    animateCounter('avgRating', 0, parseFloat(stats.avgRating), 1000, 1);
}

function animateCounter(elementId, start, end, duration, decimals = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = decimals > 0 
            ? current.toFixed(decimals) 
            : Math.floor(current);
    }, 16);
}

// ============================================
// ACTUALIZACIÓN DE ESTADOS
// ============================================

function updateBusinessStatuses() {
    BUSINESSES.forEach(business => {
        const card = document.querySelector(`[data-business-id="${business.id}"]`);
        if (!card) return;
        
        const statusInfo = getCurrentStatus(business);
        const badge = card.querySelector('.business-badge');
        
        if (badge) {
            badge.className = `business-badge ${statusInfo.badge}`;
            badge.innerHTML = `
                <i class="fas fa-${getStatusIcon(statusInfo.status)}"></i>
                ${statusInfo.text}
            `;
        }
    });
}

// ============================================
// MODAL DE REGISTRO
// ============================================

function showRegistration() {
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRegistration() {
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('registrationModal');
    if (e.target === modal) {
        closeRegistration();
    }
});

// ============================================
// PRÓXIMAMENTE
// ============================================

function showComingSoon(businessName) {
    const message = `
        🚧 Próximamente Disponible
        
        El sitio web de "${businessName}" estará disponible pronto.
        
        Por ahora puedes contactarlos directamente por WhatsApp.
    `;
    
    alert(message);
}

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error en Jaguar Market:', e.error);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
        }, 0);
    });
}

// ============================================
// PWA SUPPORT (FUTURO)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration aquí cuando esté listo
        console.log('💡 PWA support disponible');
    });
}

// ============================================
// EXPORTAR PARA USO GLOBAL
// ============================================

window.JaguarMarket = {
    filterByCategory,
    handleSearch,
    clearSearch,
    toggleSearch,
    toggleFavorite,
    openWhatsApp,
    showRegistration,
    closeRegistration,
    showComingSoon,
    scrollToBusiness
};

console.log('📱 Jaguar Market App cargada correctamente');
