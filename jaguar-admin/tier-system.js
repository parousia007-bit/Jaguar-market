/* ============================================
   JAGUAR MARKET - CONFIGURACIÓN DE TIERS
   ============================================ */

const TIER_SYSTEM = {
    bronze: {
        id: 'bronze',
        name: 'Bronce',
        icon: '🥉',
        color: '#CD7F32',
        price: 0,
        priceMonthly: 0,
        features: {
            // PÁGINA WEB
            miniSite: true,
            siteType: 'basic', // Tarjeta de presentación
            customDomain: false,
            sitePages: 1, // Solo página principal
            
            // IMÁGENES
            maxImages: 3,
            imageStorage: '10MB',
            
            // CONTACTO
            phoneButton: true,
            whatsappButton: true,
            locationMap: false,
            contactForm: false,
            
            // MARKETPLACE
            appearInMarketplace: true,
            featuredBusiness: false,
            priorityListing: 0, // Sin prioridad
            
            // REVIEWS Y RATINGS
            enableReviews: true,
            respondToReviews: false,
            
            // ANALYTICS
            basicStats: true,
            detailedAnalytics: false,
            
            // PROMOCIONES
            promotions: 0, // Sin promociones
            discountCoupons: false,
            
            // DELIVERY
            fleetAccess: false,
            freeDeliveries: 0,
            deliveryDiscount: 0,
            
            // SOPORTE
            emailSupport: true,
            prioritySupport: false,
            dedicatedManager: false
        },
        limits: {
            monthlyViews: 1000,
            monthlyLeads: 50,
            productsOrServices: 10
        },
        description: 'Perfecto para empezar - Tarjeta de presentación digital'
    },
    
    silver: {
        id: 'silver',
        name: 'Plata',
        icon: '🥈',
        color: '#C0C0C0',
        price: 299,
        priceMonthly: 299,
        features: {
            // PÁGINA WEB
            miniSite: true,
            siteType: 'standard',
            customDomain: false,
            sitePages: 3, // Inicio, Productos, Contacto
            
            // IMÁGENES
            maxImages: 10,
            imageStorage: '50MB',
            
            // CONTACTO
            phoneButton: true,
            whatsappButton: true,
            locationMap: true,
            contactForm: true,
            
            // MARKETPLACE
            appearInMarketplace: true,
            featuredBusiness: false,
            priorityListing: 2,
            
            // REVIEWS Y RATINGS
            enableReviews: true,
            respondToReviews: true,
            
            // ANALYTICS
            basicStats: true,
            detailedAnalytics: true,
            
            // PROMOCIONES
            promotions: 2, // 2 promociones mensuales
            discountCoupons: true,
            
            // DELIVERY
            fleetAccess: true,
            freeDeliveries: 10, // 10 entregas gratis/mes
            deliveryDiscount: 10, // 10% descuento
            
            // SOPORTE
            emailSupport: true,
            prioritySupport: false,
            dedicatedManager: false
        },
        limits: {
            monthlyViews: 10000,
            monthlyLeads: 500,
            productsOrServices: 50
        },
        description: 'Ideal para negocios en crecimiento con delivery incluido'
    },
    
    gold: {
        id: 'gold',
        name: 'Oro',
        icon: '🥇',
        color: '#FFD700',
        price: 599,
        priceMonthly: 599,
        features: {
            // PÁGINA WEB
            miniSite: true,
            siteType: 'premium',
            customDomain: true,
            sitePages: 10, // Ilimitadas
            
            // IMÁGENES
            maxImages: 50,
            imageStorage: '500MB',
            
            // CONTACTO
            phoneButton: true,
            whatsappButton: true,
            locationMap: true,
            contactForm: true,
            chatWidget: true,
            
            // MARKETPLACE
            appearInMarketplace: true,
            featuredBusiness: true,
            priorityListing: 5,
            topBanner: true, // Aparece en banner superior
            
            // REVIEWS Y RATINGS
            enableReviews: true,
            respondToReviews: true,
            reviewManagement: true,
            
            // ANALYTICS
            basicStats: true,
            detailedAnalytics: true,
            advancedReports: true,
            
            // PROMOCIONES
            promotions: 5,
            discountCoupons: true,
            flashSales: true,
            
            // DELIVERY
            fleetAccess: true,
            freeDeliveries: 50,
            deliveryDiscount: 20,
            priorityDelivery: true,
            
            // SOPORTE
            emailSupport: true,
            prioritySupport: true,
            dedicatedManager: false
        },
        limits: {
            monthlyViews: 50000,
            monthlyLeads: 2000,
            productsOrServices: 200
        },
        description: 'Para negocios establecidos que buscan máxima visibilidad'
    },
    
    diamond: {
        id: 'diamond',
        name: 'Diamante',
        icon: '💎',
        color: '#B9F2FF',
        price: 1299,
        priceMonthly: 1299,
        features: {
            // PÁGINA WEB
            miniSite: true,
            siteType: 'enterprise',
            customDomain: true,
            sitePages: 999, // Ilimitadas
            customDevelopment: true,
            
            // IMÁGENES
            maxImages: 999,
            imageStorage: '5GB',
            videoSupport: true,
            
            // CONTACTO
            phoneButton: true,
            whatsappButton: true,
            locationMap: true,
            contactForm: true,
            chatWidget: true,
            callCenter: true,
            
            // MARKETPLACE
            appearInMarketplace: true,
            featuredBusiness: true,
            priorityListing: 10,
            topBanner: true,
            exclusiveSection: true,
            
            // REVIEWS Y RATINGS
            enableReviews: true,
            respondToReviews: true,
            reviewManagement: true,
            reputationMonitoring: true,
            
            // ANALYTICS
            basicStats: true,
            detailedAnalytics: true,
            advancedReports: true,
            customReports: true,
            apiAccess: true,
            
            // PROMOCIONES
            promotions: 999,
            discountCoupons: true,
            flashSales: true,
            exclusiveDeals: true,
            
            // DELIVERY
            fleetAccess: true,
            freeDeliveries: 200,
            deliveryDiscount: 30,
            priorityDelivery: true,
            dedicatedDriver: true,
            
            // SOPORTE
            emailSupport: true,
            prioritySupport: true,
            dedicatedManager: true,
            phone24x7: true
        },
        limits: {
            monthlyViews: 999999,
            monthlyLeads: 999999,
            productsOrServices: 999999
        },
        description: 'Solución enterprise completa con gerente dedicado y soporte 24/7'
    }
};

// ============================================
// CONFIGURACIÓN ADMINISTRATIVA
// ============================================

const ADMIN_CONFIG = {
    superAdmin: {
        name: 'Super Admin',
        phone: '+5219619702540',
        email: 'jaguarmarkett@gmail.com',
        permissions: ['all']
    },
    
    businessAdmin: {
        permissions: [
            'view_own_business',
            'edit_own_business',
            'view_analytics',
            'respond_reviews',
            'manage_products',
            'manage_promotions'
        ]
    },
    
    deliveryManager: {
        permissions: [
            'view_deliveries',
            'assign_drivers',
            'track_orders',
            'manage_fleet'
        ]
    }
};

// ============================================
// CONFIGURACIÓN DE FLOTILLA
// ============================================

const FLEET_CONFIG = {
    enabled: true,
    defaultDeliveryFee: 50, // MXN
    freeDeliveryMinimum: 200, // MXN
    
    zones: [
        {
            id: 'zone1',
            name: 'Centro',
            fee: 30,
            estimatedTime: 15
        },
        {
            id: 'zone2',
            name: 'Norte',
            fee: 40,
            estimatedTime: 20
        },
        {
            id: 'zone3',
            name: 'Sur',
            fee: 50,
            estimatedTime: 25
        },
        {
            id: 'zone4',
            name: 'Oriente',
            fee: 45,
            estimatedTime: 22
        },
        {
            id: 'zone5',
            name: 'Poniente',
            fee: 45,
            estimatedTime: 22
        }
    ],
    
    drivers: {
        defaultCommission: 60, // 60% para el conductor
        minimumOrders: 5
    }
};

// ============================================
// PRICING Y REVENUE
// ============================================

const REVENUE_MODEL = {
    // Subscripciones
    subscriptions: {
        bronze: 0,
        silver: 299,
        gold: 599,
        diamond: 1299
    },
    
    // Comisiones de delivery
    deliveryCommission: 0.40, // 40% para Jaguar Market
    
    // Comisiones de ventas (futuro)
    salesCommission: {
        bronze: 0.15, // 15%
        silver: 0.12,
        gold: 0.10,
        diamond: 0.05
    },
    
    // Servicios adicionales
    additionalServices: {
        customWebsite: 2000, // Una sola vez
        professionalPhotos: 500,
        videoProduction: 1500,
        socialMediaManagement: 800, // Mensual
        seoOptimization: 600 // Mensual
    }
};

// ============================================
// EXPORTAR
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TIER_SYSTEM,
        ADMIN_CONFIG,
        FLEET_CONFIG,
        REVENUE_MODEL
    };
}
