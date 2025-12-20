// generator-smart.js - Generador Inteligente con Niveles
const fs = require('fs');
const path = require('path');

console.log('💎 GENERADOR INTELIGENTE - SISTEMA DE NIVELES');
console.log('=============================================\n');

// Cargar configuración de niveles
const tierConfig = JSON.parse(fs.readFileSync('tier-config.json', 'utf8'));

// Función para detectar nivel de un negocio
function detectBusinessTier(business) {
    if (business.tier === 'diamond' || business.isCustomSite === true) {
        return 'diamond';
    }
    if (business.tier === 'gold' || business.customFeatures) {
        return 'gold';
    }
    if (business.tier === 'silver' || business.reviewCount > 50) {
        return 'silver';
    }
    return 'bronze'; // Default
}

// Función para verificar si se puede generar
function canAutoGenerate(tier) {
    return tierConfig.tiers[tier]?.autoGenerate || false;
}

// Cargar negocios
let businesses = [];
try {
    const data = require('./data.js');
    businesses = data.businesses || [];
} catch (error) {
    console.log('⚠️  No se pudo cargar data.js, usando ejemplo...');
    businesses = [{
        id: 'EXAMPLE',
        name: 'Negocio Ejemplo',
        slug: 'ejemplo',
        tier: 'bronze'
    }];
}

console.log(`📊 Total negocios: ${businesses.length}\n`);

// Procesar cada negocio
businesses.forEach((business, index) => {
    const tier = detectBusinessTier(business);
    const tierInfo = tierConfig.tiers[tier];
    
    console.log(`${index + 1}. ${business.name}`);
    console.log(`   Nivel: ${tierInfo.name} ${tierInfo.icon ? String.fromCharCode(parseInt(tierInfo.icon.replace('fa-', '0x'), 16)) : '🎯'}`);
    console.log(`   Auto-generable: ${canAutoGenerate(tier) ? '✅ SÍ' : '❌ NO'}`);
    
    const siteDir = path.join('mini-sites', business.slug || business.id.toLowerCase());
    
    if (fs.existsSync(siteDir)) {
        console.log(`   Estado: ⚠️  Ya existe (${canAutoGenerate(tier) ? 'Se puede actualizar' : 'NO se toca'})\n`);
    } else {
        if (canAutoGenerate(tier)) {
            console.log(`   Estado: 🆕 Se creará automáticamente\n`);
            // Aquí iría la lógica para crear el sitio
        } else {
            console.log(`   Estado: 🔒 Requiere desarrollo manual (nivel ${tier})\n`);
        }
    }
});

console.log('\n🎯 RESUMEN:');
console.log('==========');
Object.entries(tierConfig.tiers).forEach(([key, tier]) => {
    const count = businesses.filter(b => detectBusinessTier(b) === key).length;
    console.log(`${tier.icon ? String.fromCharCode(parseInt(tier.icon.replace('fa-', '0x'), 16)) : '•'} ${tier.name}: ${count} negocios`);
});

console.log('\n💡 COMANDOS DISPONIBLES:');
console.log('=======================');
console.log('• node generator-smart.js          # Ver análisis');
console.log('• node generate-bronze.js          # Generar solo nivel Bronce');
console.log('• node generate-silver.js          # Generar solo nivel Plata');
console.log('• npm run generate:all             # Generar auto-generables');
console.log('• npm run tier:check               # Verificar niveles');
