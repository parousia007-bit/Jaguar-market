/* ============================================
   JAGUAR MARKET - BASE DE DATOS DE NEGOCIOS
   ============================================ */

// DEFINICIÓN DE CATEGORÍAS
const CATEGORIES = {
    food: {
        id: 'food',
        name: 'Comida',
        icon: '🍕',
        color: '#FF6B35'
    },
    health: {
        id: 'health',
        name: 'Salud',
        icon: '🏥',
        color: '#E74C3C'
    },
    services: {
        id: 'services',
        name: 'Servicios',
        icon: '🛠️',
        color: '#3498DB'
    },
    desserts: {
        id: 'desserts',
        name: 'Postres',
        icon: '🍰',
        color: '#9B59B6'
    }
};

// BASE DE DATOS DE NEGOCIOS
const BUSINESSES = [
    // ============================================
    // COMIDA Y RESTAURANTES
    // ============================================
    {
        id: 'PIZZ001',
        name: 'Pizzería y Restaurante Tavolos',
        slug: 'pizzeria-tavolos',
        category: 'food',
        subcategory: 'pizza',
        description: 'Las mejores pizzas artesanales, alitas crujientes y pastas frescas de Tuxtla Gutiérrez. Ingredientes de primera calidad y atención excepcional.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
        
        // RATINGS
        rating: 4.8,
        reviewCount: 128,
        isRecommended: true,
        
        // HORARIOS Y TIEMPOS
        status: 'open',
        schedule: {
            monday: { open: '13:00', close: '23:00' },
            tuesday: { open: '13:00', close: '23:00' },
            wednesday: { open: '13:00', close: '23:00' },
            thursday: { open: '13:00', close: '23:00' },
            friday: { open: '13:00', close: '23:30' },
            saturday: { open: '13:00', close: '23:30' },
            sunday: { open: '13:00', close: '22:00' }
        },
        deliveryTime: { min: 30, max: 45 },
        priceRange: '$90-$425',
        
        // ETIQUETAS
        tags: ['Pizza Suprema', 'Hawaiana', 'Pepperoni', 'Alitas BBQ', 'Pastas'],
        
        // CONTACTO
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        // UBICACIÓN
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7516, lng: -93.1130 }
        },
        
        // FEATURES
        features: {
            isExpress: false,
            hasDelivery: true,
            acceptsCards: true,
            hasParking: true
        },
        
        // RUTA AL MINI SITIO
        siteUrl: '/mini-sites/pizzeria-tavolos/index.html',
        tier: 'diamond', // NIVEL DIAMANTE - Sitio premium personalizado
        
        // DESTACADO
        isFeatured: true,
        createdAt: '2024-01-15T10:00:00Z'
    },
    
    // ============================================
    // SALUD Y BIENESTAR
    // ============================================
    {
        id: 'FARM001',
        name: 'Farmacia San Rafael',
        slug: 'farmacia-san-rafael',
        category: 'health',
        subcategory: 'farmacia',
        description: 'Farmacia 24 horas con medicamentos genéricos y de patente, vitaminas, suplementos y productos de salud. Atención profesional garantizada.',
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&auto=format&fit=crop',
        
        rating: 4.9,
        reviewCount: 156,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            twentyFourHours: true
        },
        deliveryTime: { min: 15, max: 25 },
        priceRange: '$50-$150',
        
        tags: ['Medicamentos', 'Genéricos', 'Vitaminas', 'Suplementos', 'Emergencias'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7520, lng: -93.1135 }
        },
        
        features: {
            isExpress: true,
            hasDelivery: true,
            acceptsCards: true,
            hasParking: false,
            is24Hours: true
        },
        
        siteUrl: '/mini-sites/farmacia-san-rafael/index.html',
        
        isFeatured: true,
        createdAt: '2024-02-01T08:00:00Z'
    },
    
    {
        id: 'DENT001',
        name: 'Smile Dental',
        slug: 'smile-dental',
        category: 'health',
        subcategory: 'dentista',
        description: 'Consultorio dental profesional especializado en ortodoncia, limpieza dental, blanqueamiento y tratamientos estéticos. Tecnología de vanguardia.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop',
        
        rating: 4.7,
        reviewCount: 89,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '09:00', close: '19:00' },
            tuesday: { open: '09:00', close: '19:00' },
            wednesday: { open: '09:00', close: '19:00' },
            thursday: { open: '09:00', close: '19:00' },
            friday: { open: '09:00', close: '19:00' },
            saturday: { open: '09:00', close: '14:00' },
            sunday: { open: null, close: null }
        },
        deliveryTime: null,
        priceRange: '$300-$5,000',
        
        tags: ['Ortodoncia', 'Limpieza', 'Blanqueamiento', 'Extracciones', 'Estética Dental'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7525, lng: -93.1140 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: false,
            acceptsCards: true,
            hasParking: true,
            requiresAppointment: true
        },
        
        siteUrl: '/mini-sites/smile-dental/index.html',
        
        isFeatured: false,
        createdAt: '2024-01-20T11:00:00Z'
    },
    
    {
        id: 'LAB001',
        name: 'Laboratorio de Análisis Clínicos',
        slug: 'laboratorio-analisis',
        category: 'health',
        subcategory: 'laboratorio',
        description: 'Análisis clínicos completos con resultados rápidos y confiables. Química sanguínea, hematología, hormonales y más. Servicio a domicilio disponible.',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop',
        
        rating: 4.6,
        reviewCount: 74,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '07:00', close: '18:00' },
            tuesday: { open: '07:00', close: '18:00' },
            wednesday: { open: '07:00', close: '18:00' },
            thursday: { open: '07:00', close: '18:00' },
            friday: { open: '07:00', close: '18:00' },
            saturday: { open: '07:00', close: '13:00' },
            sunday: { open: null, close: null }
        },
        deliveryTime: null,
        priceRange: '$150-$2,000',
        
        tags: ['Análisis Clínicos', 'Química Sanguínea', 'Hormonales', 'A domicilio', 'Resultados Rápidos'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7530, lng: -93.1145 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: true,
            acceptsCards: true,
            hasParking: true,
            requiresAppointment: false
        },
        
        siteUrl: '/mini-sites/laboratorio/index.html',
        
        isFeatured: false,
        createdAt: '2024-01-25T09:00:00Z'
    },
    
    // ============================================
    // POSTRES Y DULCES
    // ============================================
    {
        id: 'GELE001',
        name: 'Gelée Dely',
        slug: 'gelee-dely',
        category: 'desserts',
        subcategory: 'postres',
        description: 'Gelatinas artesanales premium, postres únicos y decoraciones personalizadas para eventos. Sabores exclusivos y presentaciones espectaculares.',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
        
        rating: 4.9,
        reviewCount: 142,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '10:00', close: '20:00' },
            tuesday: { open: '10:00', close: '20:00' },
            wednesday: { open: '10:00', close: '20:00' },
            thursday: { open: '10:00', close: '20:00' },
            friday: { open: '10:00', close: '21:00' },
            saturday: { open: '10:00', close: '21:00' },
            sunday: { open: '11:00', close: '19:00' }
        },
        deliveryTime: { min: 20, max: 35 },
        priceRange: '$80-$350',
        
        tags: ['Gelatinas Artesanales', 'Postres', 'Eventos', 'Personalizados', 'Sin Azúcar'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7535, lng: -93.1150 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: true,
            acceptsCards: true,
            hasParking: false,
            acceptsOrders: true
        },
        
        siteUrl: '/mini-sites/gelee-dely/index.html',
        tier: 'gold', // NIVEL ORO - NO se modifica por scripts
        
        isFeatured: true,
        createdAt: '2024-02-05T12:00:00Z'
    },
    
    // ============================================
    // NEGOCIOS ASPIRACIONALES (PRÓXIMAMENTE)
    // ============================================
    {
        id: 'TACO001',
        name: 'Taquería El Fogón',
        slug: 'taqueria-el-fogon',
        category: 'food',
        subcategory: 'tacos',
        description: 'Los mejores tacos al pastor, gringas y quesadillas de Tuxtla. Carne selecta y tortillas hechas a mano. ¡El sabor auténtico que buscas!',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop',
        
        rating: 4.7,
        reviewCount: 95,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '18:00', close: '02:00' },
            tuesday: { open: '18:00', close: '02:00' },
            wednesday: { open: '18:00', close: '02:00' },
            thursday: { open: '18:00', close: '02:00' },
            friday: { open: '18:00', close: '03:00' },
            saturday: { open: '18:00', close: '03:00' },
            sunday: { open: '18:00', close: '01:00' }
        },
        deliveryTime: { min: 25, max: 40 },
        priceRange: '$15-$120',
        
        tags: ['Tacos al Pastor', 'Gringas', 'Quesadillas', 'Volcanes', 'Carne Asada'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7540, lng: -93.1155 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: true,
            acceptsCards: false,
            hasParking: true
        },
        
        siteUrl: null, // Próximamente
        
        isFeatured: true,
        createdAt: '2024-02-10T18:00:00Z'
    },
    
    {
        id: 'CAFE001',
        name: 'Ceramat Cafetería',
        slug: 'ceramat-cafeteria',
        category: 'food',
        subcategory: 'cafe',
        description: 'Café de especialidad, bebidas artesanales y repostería casera. El lugar perfecto para trabajar, estudiar o reunirte con amigos.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
        
        rating: 4.8,
        reviewCount: 112,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '07:00', close: '22:00' },
            tuesday: { open: '07:00', close: '22:00' },
            wednesday: { open: '07:00', close: '22:00' },
            thursday: { open: '07:00', close: '22:00' },
            friday: { open: '07:00', close: '23:00' },
            saturday: { open: '08:00', close: '23:00' },
            sunday: { open: '08:00', close: '21:00' }
        },
        deliveryTime: { min: 15, max: 30 },
        priceRange: '$45-$180',
        
        tags: ['Café Especialidad', 'Cappuccino', 'Repostería', 'WiFi Gratis', 'Pet Friendly'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7545, lng: -93.1160 }
        },
        
        features: {
            isExpress: true,
            hasDelivery: true,
            acceptsCards: true,
            hasParking: false,
            hasWifi: true
        },
        
        siteUrl: null, // Próximamente
        
        isFeatured: false,
        createdAt: '2024-02-12T07:30:00Z'
    },
    
    {
        id: 'SERV001',
        name: 'Agencia de Publicidad Digital',
        slug: 'agencia-publicidad',
        category: 'services',
        subcategory: 'marketing',
        description: 'Expertos en marketing digital, manejo de redes sociales, diseño gráfico y publicidad online. Impulsamos tu negocio al siguiente nivel.',
        image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop',
        
        rating: 4.9,
        reviewCount: 67,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '09:00', close: '18:00' },
            tuesday: { open: '09:00', close: '18:00' },
            wednesday: { open: '09:00', close: '18:00' },
            thursday: { open: '09:00', close: '18:00' },
            friday: { open: '09:00', close: '18:00' },
            saturday: { open: null, close: null },
            sunday: { open: null, close: null }
        },
        deliveryTime: null,
        priceRange: 'Cotización',
        
        tags: ['Marketing Digital', 'Redes Sociales', 'Diseño Gráfico', 'SEO', 'Publicidad Facebook'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7550, lng: -93.1165 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: false,
            acceptsCards: true,
            hasParking: true,
            requiresAppointment: true
        },
        
        siteUrl: null, // Próximamente
        
        isFeatured: false,
        createdAt: '2024-02-15T10:00:00Z'
    },
    
    {
        id: 'SERV002',
        name: 'Barbería Moderna',
        slug: 'barberia-moderna',
        category: 'services',
        subcategory: 'barberia',
        description: 'Cortes modernos, afeitado clásico y cuidado de barba. Ambiente relajado y profesional. Reserva tu cita y disfruta de un servicio de calidad.',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop',
        
        rating: 4.8,
        reviewCount: 103,
        isRecommended: true,
        
        status: 'open',
        schedule: {
            monday: { open: '10:00', close: '20:00' },
            tuesday: { open: '10:00', close: '20:00' },
            wednesday: { open: '10:00', close: '20:00' },
            thursday: { open: '10:00', close: '20:00' },
            friday: { open: '10:00', close: '21:00' },
            saturday: { open: '09:00', close: '21:00' },
            sunday: { open: '10:00', close: '18:00' }
        },
        deliveryTime: null,
        priceRange: '$80-$250',
        
        tags: ['Corte Moderno', 'Afeitado', 'Barba', 'Diseño', 'Tradicional'],
        
        contact: {
            phone: '+5219611010657',
            whatsapp: '+5219611010657',
            website: null
        },
        
        location: {
            address: 'Tuxtla Gutiérrez, Chiapas',
            zone: 'Centro',
            coordinates: { lat: 16.7555, lng: -93.1170 }
        },
        
        features: {
            isExpress: false,
            hasDelivery: false,
            acceptsCards: true,
            hasParking: false,
            requiresAppointment: true
        },
        
        siteUrl: null, // Próximamente
        
        isFeatured: false,
        createdAt: '2024-02-18T11:00:00Z'
    }
];

// FUNCIÓN AUXILIAR: Obtener negocios por categoría
function getBusinessesByCategory(categoryId) {
    if (categoryId === 'all') {
        return BUSINESSES;
    }
    return BUSINESSES.filter(business => business.category === categoryId);
}

// FUNCIÓN AUXILIAR: Obtener negocios destacados
function getFeaturedBusinesses() {
    return BUSINESSES.filter(business => business.isFeatured);
}

// FUNCIÓN AUXILIAR: Obtener negocios recientes
function getRecentBusinesses(limit = 4) {
    return [...BUSINESSES]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
}

// FUNCIÓN AUXILIAR: Buscar negocios
function searchBusinesses(query) {
    const lowerQuery = query.toLowerCase();
    return BUSINESSES.filter(business => 
        business.name.toLowerCase().includes(lowerQuery) ||
        business.description.toLowerCase().includes(lowerQuery) ||
        business.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

// FUNCIÓN AUXILIAR: Obtener estadísticas
function getStatistics() {
    const totalBusinesses = BUSINESSES.length;
    const totalReviews = BUSINESSES.reduce((sum, b) => sum + b.reviewCount, 0);
    const avgRating = BUSINESSES.reduce((sum, b) => sum + b.rating, 0) / totalBusinesses;
    
    return {
        businessCount: totalBusinesses,
        reviewCount: totalReviews,
        avgRating: avgRating.toFixed(1)
    };
}

// FUNCIÓN AUXILIAR: Calcular estado actual (abierto/cerrado)
function getCurrentStatus(business) {
    if (business.schedule.twentyFourHours) {
        return { status: 'open', text: '24 horas', badge: 'badge-24h' };
    }
    
    const now = new Date();
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const todaySchedule = business.schedule[day];
    
    if (!todaySchedule || !todaySchedule.open) {
        return { status: 'closed', text: 'Cerrado', badge: 'badge-closed' };
    }
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = todaySchedule.open.split(':').map(Number);
    const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    if (currentTime >= openTime && currentTime < closeTime) {
        return { status: 'open', text: 'Abierto', badge: 'badge-open' };
    }
    
    return { status: 'closed', text: 'Cerrado', badge: 'badge-closed' };
}
