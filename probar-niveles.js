console.log("🎯 SISTEMA DE NIVELES - PRUEBA");
console.log("==============================\n");

try {
    // Cargar data.js
    const data = require('./data.js');
    
    // Buscar negocios con tier
    console.log("🔍 BUSCANDO NEGOCIOS CON NIVEL:");
    
    // Convertir todo el contenido a string para buscar
    const fs = require('fs');
    const content = fs.readFileSync('./data.js', 'utf8');
    
    // Buscar patrones de objetos con tier
    const tierRegex = /name:\s*'([^']+)'[^}]+tier:\s*'([^']+)'/g;
    let match;
    const negociosConTier = [];
    
    while ((match = tierRegex.exec(content)) !== null) {
        negociosConTier.push({ nombre: match[1], nivel: match[2] });
    }
    
    if (negociosConTier.length > 0) {
        console.log(`✅ ${negociosConTier.length} negocio(s) con nivel:`);
        negociosConTier.forEach(n => {
            console.log(`   • ${n.nombre} -> ${n.nivel.toUpperCase()}`);
        });
    } else {
        console.log("⚠️  No se encontraron negocios con tier asignado");
        console.log("   Buscando en toda la estructura...");
        
        // Buscar nombres de negocios
        const nombres = content.match(/name:\s*'([^']+)'/g);
        if (nombres) {
            console.log(`   Negocios encontrados: ${nombres.length}`);
            nombres.slice(0, 5).forEach(n => console.log(`   - ${n}`));
        }
    }
    
    console.log("\n🎨 NIVELES IMPLEMENTADOS:");
    console.log("   💎 DIAMANTE: Sitios premium (no se tocan)");
    console.log("   🥇 ORO: Sitios personalizados (no se tocan)");
    console.log("   🥈 PLATA: Auto-generados mejorados");
    console.log("   🥉 BRONCE: Auto-generados básicos");
    
} catch (error) {
    console.log("❌ Error:", error.message);
}
