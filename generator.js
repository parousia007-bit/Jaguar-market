// generator.js - Generador Automático de Mini Sitios para Jaguar Market Pro

const fs = require('fs');
const path = require('path');

// 1. Cargar los datos de los negocios desde data.js
// Nota: Esto asume que data.js exporta un array llamado 'businesses'
// Si no, necesitaremos ajustar la forma de cargar los datos

// Para simplicidad, vamos a crear una versión que trabaje con la estructura actual
const data = require('./data.js'); // Si data.js exporta module.exports

// Si data.js es un archivo con variable global, podemos leerlo como texto y extraer el array
// Vamos a hacerlo de forma más flexible:

function loadBusinesses() {
    try {
        // Método 1: Si data.js usa module.exports
        if (typeof data === 'object' && data.businesses) {
            return data.businesses;
        }
        
        // Método 2: Si es un array directo
        if (Array.isArray(data)) {
            return data;
        }
        
        // Método 3: Leer como archivo y parsear
        const dataContent = fs.readFileSync('./data.js', 'utf8');
        
        // Buscar el array de negocios en el archivo
        const match = dataContent.match(/const businesses = (\[.*?\]);/s);
        if (match) {
            // Evaluar de forma segura (en un entorno real usaríamos un parser JSON)
            // Por ahora, vamos a hacer un reemplazo simple
            let jsonStr = match[1]
                .replace(/'/g, '"')
                .replace(/,\s*\]/g, ']')
                .replace(/,\s*\}/g, '}');
            
            return JSON.parse(jsonStr);
        }
        
        console.error('❌ No se pudo cargar los datos de negocios');
        return [];
    } catch (error) {
        console.error('❌ Error cargando datos:', error.message);
        return [];
    }
}

// 2. Plantilla HTML para mini sitios
const MINI_SITE_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Jaguar Market</title>
    
    <!-- Estilos principales desde Jaguar Market -->
    <link rel="stylesheet" href="../styles.css">
    
    <!-- Estilos específicos del mini sitio -->
    <style>
        .mini-site-header {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            padding: 2rem 1rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .back-to-market {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            text-decoration: none;
            font-weight: 500;
            margin-bottom: 1rem;
        }
        
        .business-hero {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        .business-info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem 3rem;
        }
        
        @media (min-width: 768px) {
            .business-info-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        .info-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
        }
        
        .business-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 1rem;
        }
        
        .whatsapp-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #25D366;
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            transition: transform 0.2s;
        }
        
        .whatsapp-button:hover {
            transform: translateY(-2px);
        }
        
        .tag {
            display: inline-block;
            background: var(--primary-light);
            color: var(--primary-dark);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .feature-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            background: var(--success-light);
            color: var(--success);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            margin-bottom: 1rem;
        }
    </style>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="mini-site-header">
        <a href="../index.html" class="back-to-market">
            <i class="fas fa-arrow-left"></i>
            Volver al Marketplace
        </a>
        
        <div class="business-hero">
            <h1>{{BUSINESS_NAME}}</h1>
            <div class="rating-display">
                <div class="stars">
                    {{STARS}}
                </div>
                <span>{{RATING}} ({{REVIEW_COUNT}} reseñas)</span>
            </div>
            
            <div class="status-badge {{STATUS_CLASS}}">
                {{STATUS_TEXT}}
            </div>
        </div>
    </header>
    
    <main>
        <div class="business-info-grid">
            <!-- Columna Izquierda: Información del negocio -->
            <div class="info-column">
                <div class="info-card">
                    <img src="{{IMAGE_URL}}" alt="{{BUSINESS_NAME}}" class="business-image">
                    
                    <h2><i class="fas fa-store"></i> Acerca de nosotros</h2>
                    <p>{{DESCRIPTION}}</p>
                    
                    <h2><i class="fas fa-tags"></i> Categorías</h2>
                    <p><strong>Categoría:</strong> {{CATEGORY}}</p>
                    <p><strong>Subcategoría:</strong> {{SUBCATEGORY}}</p>
                    
                    <h2><i class="fas fa-tags"></i> Etiquetas</h2>
                    <div class="tags-container">
                        {{TAGS}}
                    </div>
                </div>
                
                <div class="info-card">
                    <h2><i class="fas fa-dollar-sign"></i> Precios</h2>
                    <p><strong>Rango de precios:</strong> {{PRICE_RANGE}}</p>
                    
                    {{DELIVERY_INFO}}
                    
                    <h2><i class="fas fa-credit-card"></i> Métodos de pago</h2>
                    <p>{{PAYMENT_METHODS}}</p>
                </div>
            </div>
            
            <!-- Columna Derecha: Contacto y Horarios -->
            <div class="info-column">
                <div class="info-card">
                    <h2><i class="fas fa-clock"></i> Horarios</h2>
                    {{SCHEDULE}}
                    
                    <h2><i class="fas fa-map-marker-alt"></i> Ubicación</h2>
                    <p><strong>Dirección:</strong> {{ADDRESS}}</p>
                    <p><strong>Zona:</strong> {{ZONE}}</p>
                    
                    <a href="https://maps.google.com/?q={{COORDINATES}}" 
                       target="_blank" 
                       class="button secondary">
                        <i class="fas fa-map"></i> Ver en Google Maps
                    </a>
                </div>
                
                <div class="info-card">
                    <h2><i class="fas fa-phone"></i> Contacto</h2>
                    
                    <div class="contact-buttons">
                        <a href="tel:{{PHONE}}" class="button">
                            <i class="fas fa-phone"></i> Llamar
                        </a>
                        
                        <a href="https://wa.me/{{WHATSAPP}}" 
                           target="_blank" 
                           class="whatsapp-button">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        
                        {{WEBSITE_BUTTON}}
                    </div>
                    
                    <h2><i class="fas fa-star"></i> Características</h2>
                    <div class="features-list">
                        {{FEATURES}}
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <footer style="text-align: center; padding: 2rem; background: #f8f9fa; color: #666;">
        <p>© 2024 {{BUSINESS_NAME}} - Jaguar Market Pro</p>
        <p>Este sitio fue generado automáticamente por Jaguar Market Pro</p>
    </footer>
    
    <script>
        // Script para interactividad básica
        document.addEventListener('DOMContentLoaded', function() {
            // Actualizar estado en tiempo real
            function updateBusinessStatus() {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTime = currentHour * 60 + currentMinute;
                
                // Esta es una simplificación - en la versión real usaríamos los horarios del negocio
                const statusBadge = document.querySelector('.status-badge');
                if (currentHour >= 9 && currentHour < 21) {
                    statusBadge.textContent = '🟢 Abierto ahora';
                    statusBadge.className = 'status-badge open';
                } else {
                    statusBadge.textContent = '🔴 Cerrado ahora';
                    statusBadge.className = 'status-badge closed';
                }
            }
            
            // Actualizar cada minuto
            updateBusinessStatus();
            setInterval(updateBusinessStatus, 60000);
            
            // Smooth scroll para enlaces internos
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });
    </script>
</body>
</html>
`;

// 3. Función para generar estrellas de rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// 4. Función para generar el horario en HTML
function generateSchedule(schedule) {
    if (!schedule) return '<p>Horario no disponible</p>';
    
    const days = [
        { key: 'monday', label: 'Lunes' },
        { key: 'tuesday', label: 'Martes' },
        { key: 'wednesday', label: 'Miércoles' },
        { key: 'thursday', label: 'Jueves' },
        { key: 'friday', label: 'Viernes' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' }
    ];
    
    let html = '<div class="schedule-grid">';
    
    days.forEach(day => {
        const daySchedule = schedule[day.key];
        if (daySchedule && daySchedule.open && daySchedule.close) {
            html += `
                <div class="schedule-day">
                    <strong>${day.label}:</strong>
                    <span>${daySchedule.open} - ${daySchedule.close}</span>
                </div>
            `;
        } else if (schedule.twentyFourHours) {
            html += `
                <div class="schedule-day">
                    <strong>${day.label}:</strong>
                    <span>24 horas</span>
                </div>
            `;
        }
    });
    
    html += '</div>';
    return html;
}

// 5. Función para generar características
function generateFeatures(features) {
    if (!features) return '<p>Sin características especificadas</p>';
    
    let html = '<div class="features-grid">';
    
    if (features.isExpress) {
        html += '<div class="feature-badge"><i class="fas fa-bolt"></i> Entrega Express</div>';
    }
    if (features.hasDelivery) {
        html += '<div class="feature-badge"><i class="fas fa-motorcycle"></i> Delivery Disponible</div>';
    }
    if (features.acceptsCards) {
        html += '<div class="feature-badge"><i class="fas fa-credit-card"></i> Acepta Tarjetas</div>';
    }
    if (features.hasParking) {
        html += '<div class="feature-badge"><i class="fas fa-parking"></i> Estacionamiento</div>';
    }
    if (features.requiresAppointment) {
        html += '<div class="feature-badge"><i class="fas fa-calendar-check"></i> Cita Requerida</div>';
    }
    
    html += '</div>';
    return html || '<p>Sin características especificadas</p>';
}

// 6. Función principal para generar mini sitio
function generateMiniSite(business) {
    // Crear slug seguro para carpeta
    const slug = business.slug || business.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    
    // Determinar estado actual
    const now = new Date();
    const currentHour = now.getHours();
    const isOpen = currentHour >= 9 && currentHour < 21; // Simplificado
    
    // Reemplazar placeholders en la plantilla
    let html = MINI_SITE_TEMPLATE
        .replace(/{{BUSINESS_NAME}}/g, business.name)
        .replace(/{{IMAGE_URL}}/g, business.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=480&fit=crop')
        .replace(/{{DESCRIPTION}}/g, business.description || 'Descripción no disponible.')
        .replace(/{{CATEGORY}}/g, business.category || 'General')
        .replace(/{{SUBCATEGORY}}/g, business.subcategory || 'No especificada')
        .replace(/{{RATING}}/g, business.rating?.toFixed(1) || '0.0')
        .replace(/{{REVIEW_COUNT}}/g, business.reviewCount || '0')
        .replace(/{{STARS}}/g, generateStars(business.rating || 0))
        .replace(/{{PRICE_RANGE}}/g, business.priceRange || 'No especificado')
        .replace(/{{ADDRESS}}/g, business.location?.address || 'Dirección no disponible')
        .replace(/{{ZONE}}/g, business.location?.zone || 'No especificada')
        .replace(/{{COORDINATES}}/g, business.location?.coordinates ? 
            `${business.location.coordinates.lat},${business.location.coordinates.lng}` : 
            '16.7516,-93.1130') // Tuxtla por defecto
        .replace(/{{PHONE}}/g, business.contact?.phone || '')
        .replace(/{{WHATSAPP}}/g, business.contact?.whatsapp?.replace(/\+/g, '') || '')
        .replace(/{{STATUS_CLASS}}/g, isOpen ? 'open' : 'closed')
        .replace(/{{STATUS_TEXT}}/g, isOpen ? '🟢 Abierto ahora' : '🔴 Cerrado ahora');
    
    // Tags
    if (business.tags && Array.isArray(business.tags)) {
        const tagsHtml = business.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        html = html.replace('{{TAGS}}', tagsHtml);
    } else {
        html = html.replace('{{TAGS}}', '<p>No hay etiquetas disponibles</p>');
    }
    
    // Horario
    html = html.replace('{{SCHEDULE}}', generateSchedule(business.schedule));
    
    // Características
    html = html.replace('{{FEATURES}}', generateFeatures(business.features));
    
    // Información de delivery
    let deliveryInfo = '';
    if (business.deliveryTime) {
        deliveryInfo = `
            <p><strong>Tiempo de entrega:</strong> ${business.deliveryTime.min}-${business.deliveryTime.max} minutos</p>
        `;
    }
    html = html.replace('{{DELIVERY_INFO}}', deliveryInfo);
    
    // Métodos de pago
    let paymentMethods = 'Efectivo';
    if (business.features?.acceptsCards) {
        paymentMethods += ', Tarjetas de crédito/débito';
    }
    html = html.replace('{{PAYMENT_METHODS}}', paymentMethods);
    
    // Botón de sitio web
    let websiteButton = '';
    if (business.contact?.website) {
        websiteButton = `
            <a href="${business.contact.website}" target="_blank" class="button">
                <i class="fas fa-globe"></i> Visitar Sitio Web
            </a>
        `;
    }
    html = html.replace('{{WEBSITE_BUTTON}}', websiteButton);
    
    return {
        slug,
        html,
        business
    };
}

// 7. Función para actualizar data.js con las rutas correctas
function updateDataJsWithRoutes(businessSlugs) {
    try {
        let dataContent = fs.readFileSync('./data.js', 'utf8');
        
        // Buscar y actualizar cada negocio
        businessSlugs.forEach(slug => {
            const regex = new RegExp(`id:\\s*['"]${slug}['"][^}]*siteUrl:\\s*['"][^'"]*['"]`, 'g');
            const replacement = `siteUrl: '/mini-sites/${slug}/index.html'`;
            
            // Si no encuentra el patrón completo, intentamos añadir la propiedad
            if (!regex.test(dataContent)) {
                // Buscar el objeto del negocio y añadir siteUrl
                const businessRegex = new RegExp(`(id:\\s*['"]${slug}['"][^}]*)(\\})`, 's');
                dataContent = dataContent.replace(businessRegex, `$1    siteUrl: '/mini-sites/${slug}/index.html',$2`);
            } else {
                dataContent = dataContent.replace(regex, replacement);
            }
        });
        
        fs.writeFileSync('./data.js', dataContent, 'utf8');
        console.log('✅ data.js actualizado con las rutas de mini sitios');
    } catch (error) {
        console.error('❌ Error actualizando data.js:', error.message);
    }
}

// 8. Función principal
async function main() {
    console.log('🚀 Iniciando generación de mini sitios para Jaguar Market Pro...\n');
    
    // Cargar negocios
    const businesses = loadBusinesses();
    
    if (businesses.length === 0) {
        console.error('❌ No se encontraron negocios en data.js');
        console.log('💡 Asegúrate de que data.js tenga un array llamado "businesses"');
        return;
    }
    
    console.log(`📊 Encontrados ${businesses.length} negocios`);
    
    // Crear carpeta mini-sites si no existe
    const miniSitesDir = './mini-sites';
    if (!fs.existsSync(miniSitesDir)) {
        fs.mkdirSync(miniSitesDir, { recursive: true });
        console.log('📁 Carpeta mini-sites creada');
    }
    
    const generatedSlugs = [];
    
    // Generar mini sitio para cada negocio
    for (const business of businesses) {
        console.log(`\n🛠️  Generando mini sitio para: ${business.name}`);
        
        const miniSite = generateMiniSite(business);
        const businessDir = path.join(miniSitesDir, miniSite.slug);
        
        // Crear carpeta del negocio
        if (!fs.existsSync(businessDir)) {
            fs.mkdirSync(businessDir, { recursive: true });
        }
        
        // Guardar archivo HTML
        const htmlPath = path.join(businessDir, 'index.html');
        fs.writeFileSync(htmlPath, miniSite.html, 'utf8');
        
        // Crear archivo CSS personalizado opcional
        const cssPath = path.join(businessDir, 'styles.css');
        const customCSS = `
/* Estilos personalizados para ${business.name} */

.business-hero {
    background: linear-gradient(135deg, 
        var(--primary) 0%, 
        ${business.category === 'food' ? '#FF8E53' : 
          business.category === 'health' ? '#4CAF50' : 
          business.category === 'services' ? '#2196F3' : '#9C27B0'} 
        100%);
}

/* Añade tus estilos personalizados aquí */
`;
        
        fs.writeFileSync(cssPath, customCSS, 'utf8');
        
        console.log(`✅ Mini sitio creado: /mini-sites/${miniSite.slug}/`);
        generatedSlugs.push(miniSite.slug);
    }
    
    // Actualizar data.js con las rutas
    updateDataJsWithRoutes(generatedSlugs);
    
    console.log('\n🎉 ¡Generación completada!');
    console.log(`📋 Resumen:`);
    console.log(`   - Negocios procesados: ${businesses.length}`);
    console.log(`   - Mini sitios generados: ${generatedSlugs.length}`);
    console.log(`   - Carpeta principal: ${miniSitesDir}/`);
    console.log(`\n🔧 Siguientes pasos:`);
    console.log(`   1. Verifica que los archivos se crearon correctamente`);
    console.log(`   2. Revisa las rutas en data.js`);
    console.log(`   3. Abre index.html en tu navegador para probar`);
    console.log(`   4. Personaliza los mini sitios según sea necesario`);
    console.log(`\n💡 Para ejecutar nuevamente: node generator.js`);
}

// 9. Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    generateMiniSite,
    generateMiniSites: main
};
