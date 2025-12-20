#!/bin/bash
echo "🛡️  PROTECTOR DE SITIOS PREMIUM"
echo "================================"

# Listar sitios premium (oro y diamante)
echo "📁 SITIOS PROTEGIDOS (no se modifican):"
echo "---------------------------------------"

for tier in gold diamond; do
    echo "Nivel ${tier^^}:"
    grep -l "\"tier\": \"$tier\"" data.js | while read -r line; do
        business=$(grep -B5 -A5 "\"tier\": \"$tier\"" data.js | grep "\"slug\":" | cut -d'"' -f4)
        if [ -n "$business" ]; then
            echo "  • $business"
            # Proteger la carpeta (hacerla de solo lectura)
            chmod -R 555 "mini-sites/$business" 2>/dev/null && echo "    ✅ Protegido (solo lectura)"
        fi
    done
done

echo ""
echo "🔒 Estos sitios NO serán modificados por generadores automáticos."
echo "📞 Para modificarlos, contacta al equipo de desarrollo premium."
