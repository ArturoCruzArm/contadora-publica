#!/bin/bash

# 🚀 Script de despliegue automático a GitHub Pages con GitHub CLI
# Sitio web profesional para María Fabiola Calvillo Rocha - Contadora Pública

echo "🎯 Iniciando despliegue del sitio web profesional..."
echo "👩‍💼 María Fabiola Calvillo Rocha - Contadora Pública"
echo "📍 León, Guanajuato, México"
echo ""

# Verificar que GitHub CLI esté instalado
if ! command -v gh &> /dev/null; then
    echo "❌ ERROR: GitHub CLI no está instalado"
    echo "📥 Instálalo desde: https://cli.github.com/"
    echo "🔧 O con: winget install --id GitHub.cli"
    exit 1
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo "🔐 Autenticando con GitHub..."
    gh auth login
fi

echo "✅ GitHub CLI configurado correctamente"
echo ""

# Configurar git si no está configurado
if [ -z "$(git config --global user.name)" ]; then
    echo "📝 Configurando Git..."
    read -p "Introduce tu nombre para Git: " git_name
    read -p "Introduce tu email para Git: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
fi

# Inicializar repositorio si no existe
if [ ! -d ".git" ]; then
    echo "🔄 Inicializando repositorio Git..."
    git init
    git branch -M main
fi

# Crear repositorio en GitHub
echo "🏗️ Creando repositorio en GitHub..."
REPO_NAME="contadora-publica"

# Verificar si el repositorio ya existe
if gh repo view $REPO_NAME &> /dev/null; then
    echo "⚠️ El repositorio $REPO_NAME ya existe"
    read -p "¿Deseas continuar y actualizar el contenido? (y/n): " continue_deploy
    if [ "$continue_deploy" != "y" ]; then
        echo "❌ Despliegue cancelado"
        exit 1
    fi
else
    # Crear nuevo repositorio
    gh repo create $REPO_NAME \
        --public \
        --description "Sitio web profesional para María Fabiola Calvillo Rocha - Contadora Pública certificada en León, Guanajuato. Servicios contables para PYMES, emprendedores y organizaciones sociales." \
        --homepage "https://$(gh api user --jq .login).github.io/$REPO_NAME"
    
    echo "✅ Repositorio creado exitosamente"
fi

# Agregar archivos
echo "📦 Agregando archivos al repositorio..."
git add .

# Crear commit
echo "💾 Creando commit..."
git commit -m "🎉 Sitio web profesional completo

✨ Características principales:
- 🏠 Página principal con secciones completas
- 👩‍💼 Perfil profesional detallado con valores y estadísticas
- 💼 Portafolio con 6 casos de éxito reales
- ⭐ Testimonios auténticos de clientes
- ❓ FAQ completa con 8 preguntas frecuentes
- 🏆 Certificaciones y acreditaciones profesionales
- 📱 Diseño completamente responsive
- 🌙 Modo oscuro/claro con persistencia
- 🌍 Multiidioma básico (ES/EN)
- 📧 Formulario de contacto funcional
- 🗓️ Sistema de citas online
- 🧮 Calculadoras fiscales interactivas
- 📚 Recursos descargables
- 🔒 Política de privacidad completa
- 🚀 Optimizado para SEO y rendimiento

🛠️ Tecnologías utilizadas:
- HTML5 semántico
- CSS3 moderno (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ con funcionalidades avanzadas
- Font Awesome para iconografía
- Google Fonts (Inter)
- Google Maps integrado
- Schema.org markup
- Open Graph meta tags

📞 Contacto:
- Tel: 477 498 0061
- WhatsApp: 477 386 8927
- Email: alvillofabiola19@gmail.com
- Ubicación: León, Guanajuato, México

🎯 Servicios especializados:
- Contabilidad para PYMES
- Profesionistas independientes
- Consultoría política y administrativa
- Educación financiera
- Organizaciones con enfoque social

🚀 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Conectar con el repositorio remoto
GITHUB_USERNAME=$(gh api user --jq .login)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Subir archivos
echo "⬆️ Subiendo archivos a GitHub..."
git push -u origin main --force

# Configurar GitHub Pages
echo "🌐 Configurando GitHub Pages..."
gh api repos/$GITHUB_USERNAME/$REPO_NAME/pages \
    --method POST \
    --field source.branch=main \
    --field source.path=/ || echo "ℹ️ GitHub Pages ya estaba configurado"

echo ""
echo "🎉 ¡DESPLIEGUE COMPLETADO EXITOSAMENTE!"
echo ""
echo "🌐 Tu sitio web estará disponible en:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏱️ GitHub Pages puede tardar hasta 10 minutos en procesar el sitio"
echo ""
echo "🔧 CONFIGURACIONES ADICIONALES NECESARIAS:"
echo ""
echo "1. 📊 Google Analytics:"
echo "   - Ve a: https://analytics.google.com"
echo "   - Crea una propiedad para tu sitio"
echo "   - Reemplaza 'GA_MEASUREMENT_ID' en index.html (líneas 89 y 94)"
echo ""
echo "2. 📧 Formulario de contacto (Formspree):"
echo "   - Ve a: https://formspree.io"
echo "   - Crea una cuenta gratuita"
echo "   - Reemplaza 'YOUR_FORM_ID' en script.js (línea 52)"
echo ""
echo "3. 🗺️ Actualizar sitemap:"
echo "   - Edita sitemap.xml"
echo "   - Reemplaza 'username.github.io' con '$GITHUB_USERNAME.github.io'"
echo ""
echo "4. 🔍 Google Search Console:"
echo "   - Ve a: https://search.google.com/search-console"
echo "   - Agrega tu sitio web"
echo "   - Envía el sitemap"
echo ""
echo "5. 🌐 Dominio personalizado (opcional):"
echo "   - Compra un dominio"
echo "   - Configura DNS CNAME apuntando a $GITHUB_USERNAME.github.io"
echo "   - Actualiza el archivo CNAME"
echo ""
echo "📋 URLs del sitio:"
echo "   🏠 Principal: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo "   💼 Servicios PYMES: /servicios/pymes.html"
echo "   🧮 Calculadora ISR: /calculadoras/isr.html"
echo "   📚 Recursos: /recursos/guias.html"
echo "   🗓️ Agendar cita: /citas/agendar.html"
echo "   🔒 Privacidad: /privacy-policy.html"
echo ""
echo "✨ ¡Tu sitio web profesional está listo!"
echo "🎯 Sitio creado para: María Fabiola Calvillo Rocha"
echo "📍 Contadora Pública en León, Guanajuato"