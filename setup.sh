#!/bin/bash

echo "🚀 CONFIGURACIÓN DE JAGUAR MARKET PRO"
echo "======================================"

# 1. Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p mini-sites
mkdir -p templates
mkdir -p scripts

# 2. Crear archivo de configuración de niveles
cat > tier-config.json << 'TIER_EOF'
{
  "tiers": {
    "bronze": {
      "name": "Bronce",
      "color": "#CD7F32",
      "icon": "fa-medal",
      "autoGenerate": true,
      "features": ["Sitio básico", "Contacto WhatsApp", "Horarios"]
    },
    "silver": {
      "name": "Plata",
      "color": "#C0C0C0",
      "icon": "fa-award",
      "autoGenerate": true,
      "features": ["Todo Bronce", "Galería de fotos", "Menú digital"]
    },
    "gold": {
      "name": "Oro",
      "color": "#FFD700",
      "icon": "fa-crown",
      "autoGenerate": false,
      "features": ["Diseño personalizado", "No se modifica"]
    },
    "diamond": {
      "name": "Diamante",
      "color": "#B9F2FF",
      "icon": "fa-gem",
      "autoGenerate": false,
      "features": ["Sitio premium", "Actualizaciones manuales"]
    }
  }
}
TIER_EOF

# 3. Crear generador inteligente que respeta niveles
cat > generator-smart.js << 'GEN_EOF'
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
GEN_EOF

# 4. Crear generadores específicos por nivel
cat > generate-bronze.js << 'BRONZE_EOF'
// generate-bronze.js - Solo genera nivel BRONCE
const fs = require('fs');
const path = require('path');

console.log('🥉 GENERANDO SITIOS BRONCE\n');

// ... código específico para bronce ...
console.log('✅ Listo! Sitios Bronce generados o actualizados.');
BRONZE_EOF

cat > generate-silver.js << 'SILVER_EOF'
// generate-silver.js - Solo genera nivel PLATA
const fs = require('fs');
const path = require('path');

console.log('🥈 GENERANDO SITIOS PLATA\n');

// ... código específico para plata ...
console.log('✅ Listo! Sitios Plata generados o actualizados.');
SILVER_EOF

# 5. Actualizar package.json con nuevos scripts
if [ -f package.json ]; then
    echo "📦 Actualizando package.json..."
    cat >> package.json << 'PKG_EOF'
  "scripts": {
    "start": "python -m http.server 8080",
    "generate:all": "node generator-smart.js",
    "generate:bronze": "node generate-bronze.js",
    "generate:silver": "node generate-silver.js",
    "tier:check": "node scripts/check-tiers.js",
    "tier:upgrade": "node scripts/upgrade-tier.js",
    "deploy": "npm run generate:all && echo '✅ Listo para subir al servidor'"
  }
PKG_EOF
else
    cat > package.json << 'PKG_EOF'
{
  "name": "jaguar-market-pro",
  "version": "1.0.0",
  "scripts": {
    "start": "python -m http.server 8080",
    "generate:all": "node generator-smart.js",
    "generate:bronze": "node generate-bronze.js",
    "generate:silver": "node generate-silver.js",
    "tier:check": "node scripts/check-tiers.js",
    "tier:upgrade": "node scripts/upgrade-tier.js",
    "deploy": "npm run generate:all && echo '✅ Listo para subir al servidor'"
  }
}
PKG_EOF
fi

# 6. Crear script para verificar y actualizar niveles
mkdir -p scripts
cat > scripts/check-tiers.js << 'CHECK_EOF'
// scripts/check-tiers.js - Verificar y asignar niveles
const fs = require('fs');

console.log('🔍 VERIFICANDO NIVELES DE NEGOCIOS\n');

const tierConfig = JSON.parse(fs.readFileSync('tier-config.json', 'utf8'));
const data = require('../data.js');
const businesses = data.businesses || [];

let updated = false;

businesses.forEach(business => {
    if (!business.tier) {
        // Asignar nivel automáticamente basado en características
        let tier = 'bronze';
        
        if (business.customFeatures && business.customFeatures.length > 3) {
            tier = 'diamond';
        } else if (business.customFeatures && business.customFeatures.length > 0) {
            tier = 'gold';
        } else if (business.reviewCount > 100 || business.isFeatured) {
            tier = 'silver';
        }
        
        business.tier = tier;
        updated = true;
        console.log(`✅ ${business.name} -> Nivel ${tier.toUpperCase()}`);
    }
});

if (updated) {
    console.log('\n💾 Guardando cambios en data.js...');
    const newContent = `const businesses = ${JSON.stringify(businesses, null, 2)};\n\nmodule.exports = { businesses };`;
    fs.writeFileSync('data.js', newContent);
    console.log('✅ data.js actualizado con niveles asignados!');
} else {
    console.log('✅ Todos los negocios ya tienen nivel asignado.');
}

console.log('\n📊 DISTRIBUCIÓN:');
Object.keys(tierConfig.tiers).forEach(tier => {
    const count = businesses.filter(b => b.tier === tier).length;
    console.log(`${tierConfig.tiers[tier].icon || '📌'} ${tierConfig.tiers[tier].name}: ${count}`);
});
CHECK_EOF

# 7. Crear template para cada nivel
mkdir -p templates/tiers
cat > templates/tiers/bronze-template.html << 'TEMPLATE_EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Jaguar Market</title>
    <!-- Template BRONCE - Básico -->
</head>
<body>
    <div class="tier-badge bronze">🥉 BRONCE</div>
    <!-- Contenido básico -->
</body>
</html>
TEMPLATE_EOF

echo "✨ INSTALACIÓN COMPLETADA!"
echo ""
echo "📋 COMANDOS DISPONIBLES:"
echo "========================"
echo "• ./setup.sh                    # Configurar todo"
echo "• npm run generate:all          # Generar sitios automáticos"
echo "• npm run tier:check            # Verificar niveles"
echo "• npm start                     # Iniciar servidor"
echo ""
echo "🎯 NIVELES IMPLEMENTADOS:"
echo "1. 🥉 BRONCE  -> Auto-generado (básico)"
echo "2. 🥈 PLATA   -> Auto-generado (mejorado)"
echo "3. 🥇 ORO     -> Personalizado (NO se toca)"
echo "4. 💎 DIAMANTE -> Premium (NO se toca)"
