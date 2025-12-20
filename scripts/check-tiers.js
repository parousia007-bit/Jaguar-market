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
