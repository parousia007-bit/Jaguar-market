// Test para verificar data.js
console.log("🧪 TEST DATA.JS");
console.log("===============\n");

try {
    // Intenta cargar data.js
    const data = require('./data.js');
    console.log("✅ data.js se carga sin errores");
    
    // Ver qué propiedades tiene
    console.log("\n🔍 PROPIEDADES EN DATA.JS:");
    const props = Object.keys(data).filter(k => !k.startsWith('_'));
    if (props.length > 0) {
        props.forEach(p => console.log(`   • ${p}`));
    } else {
        console.log("   No se encontraron propiedades exportadas");
    }
    
    // Buscar negocios manualmente
    console.log("\n🔎 BUSCANDO NEGOCIOS MANUALMENTE:");
    const fs = require('fs');
    const content = fs.readFileSync('./data.js', 'utf8');
    
    // Buscar names de negocios (no categorías)
    const businessNames = content.match(/name:\s*'([^']+)'/g)
        ?.filter(n => !n.includes("Comida") && !n.includes("Salud") && !n.includes("Servicios") && !n.includes("Postres"))
        .map(n => n.replace("name: '", "").replace("'", ""));
    
    if (businessNames && businessNames.length > 0) {
        console.log(`✅ ${businessNames.length} negocio(s) encontrado(s):`);
        businessNames.forEach((name, i) => console.log(`   ${i+1}. ${name}`));
    } else {
        console.log("⚠️  No se encontraron nombres de negocios");
    }
    
} catch (error) {
    console.log("❌ ERROR cargando data.js:", error.message);
}
