@echo off
REM 🚀 Script de despliegue automático a GitHub Pages con GitHub CLI (Windows)
REM Sitio web profesional para María Fabiola Calvillo Rocha - Contadora Pública

echo 🎯 Iniciando despliegue del sitio web profesional...
echo 👩‍💼 María Fabiola Calvillo Rocha - Contadora Pública
echo 📍 León, Guanajuato, México
echo.

REM Verificar que GitHub CLI esté instalado
gh --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: GitHub CLI no está instalado
    echo 📥 Instálalo desde: https://cli.github.com/
    echo 🔧 O con: winget install --id GitHub.cli
    pause
    exit /b 1
)

REM Verificar autenticación
gh auth status >nul 2>&1
if errorlevel 1 (
    echo 🔐 Autenticando con GitHub...
    gh auth login
)

echo ✅ GitHub CLI configurado correctamente
echo.

REM Configurar git si no está configurado
for /f "tokens=*" %%i in ('git config --global user.name 2^>nul') do set git_name=%%i
if "%git_name%"=="" (
    echo 📝 Configurando Git...
    set /p git_name="Introduce tu nombre para Git: "
    set /p git_email="Introduce tu email para Git: "
    git config --global user.name "%git_name%"
    git config --global user.email "%git_email%"
)

REM Inicializar repositorio si no existe
if not exist ".git" (
    echo 🔄 Inicializando repositorio Git...
    git init
    git branch -M main
)

REM Crear repositorio en GitHub
echo 🏗️ Creando repositorio en GitHub...
set REPO_NAME=contadora-publica

REM Verificar si el repositorio ya existe
gh repo view %REPO_NAME% >nul 2>&1
if errorlevel 1 (
    REM Crear nuevo repositorio
    gh repo create %REPO_NAME% --public --description "Sitio web profesional para María Fabiola Calvillo Rocha - Contadora Pública certificada en León, Guanajuato. Servicios contables para PYMES, emprendedores y organizaciones sociales."
    echo ✅ Repositorio creado exitosamente
) else (
    echo ⚠️ El repositorio %REPO_NAME% ya existe
    set /p continue_deploy="¿Deseas continuar y actualizar el contenido? (y/n): "
    if not "%continue_deploy%"=="y" (
        echo ❌ Despliegue cancelado
        pause
        exit /b 1
    )
)

REM Agregar archivos
echo 📦 Agregando archivos al repositorio...
git add .

REM Crear commit
echo 💾 Creando commit...
git commit -m "🎉 Sitio web profesional completo - ✨ Características principales: - 🏠 Página principal con secciones completas - 👩‍💼 Perfil profesional detallado - 💼 Portafolio con casos de éxito - ⭐ Testimonios de clientes - ❓ FAQ completa - 🏆 Certificaciones profesionales - 📱 Diseño responsive - 🌙 Modo oscuro/claro - 🌍 Multiidioma básico - 📧 Formulario funcional - 🗓️ Sistema de citas - 🧮 Calculadoras fiscales - 📚 Recursos descargables - 🔒 Política de privacidad - 🚀 SEO optimizado - 🚀 Generated with Claude Code - Co-Authored-By: Claude <noreply@anthropic.com>"

REM Obtener nombre de usuario de GitHub
for /f "tokens=*" %%i in ('gh api user --jq .login') do set GITHUB_USERNAME=%%i

REM Conectar con el repositorio remoto
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Subir archivos
echo ⬆️ Subiendo archivos a GitHub...
git push -u origin main --force

REM Configurar GitHub Pages
echo 🌐 Configurando GitHub Pages...
gh api repos/%GITHUB_USERNAME%/%REPO_NAME%/pages --method POST --field source.branch=main --field source.path=/ >nul 2>&1
if errorlevel 1 (
    echo ℹ️ GitHub Pages ya estaba configurado
) else (
    echo ✅ GitHub Pages configurado
)

echo.
echo 🎉 ¡DESPLIEGUE COMPLETADO EXITOSAMENTE!
echo.
echo 🌐 Tu sitio web estará disponible en:
echo    https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
echo ⏱️ GitHub Pages puede tardar hasta 10 minutos en procesar el sitio
echo.
echo 🔧 CONFIGURACIONES ADICIONALES NECESARIAS:
echo.
echo 1. 📊 Google Analytics:
echo    - Ve a: https://analytics.google.com
echo    - Crea una propiedad para tu sitio
echo    - Reemplaza 'GA_MEASUREMENT_ID' en index.html (líneas 89 y 94)
echo.
echo 2. 📧 Formulario de contacto (Formspree):
echo    - Ve a: https://formspree.io
echo    - Crea una cuenta gratuita  
echo    - Reemplaza 'YOUR_FORM_ID' en script.js (línea 52)
echo.
echo 3. 🗺️ Actualizar sitemap:
echo    - Edita sitemap.xml
echo    - Reemplaza 'username.github.io' con '%GITHUB_USERNAME%.github.io'
echo.
echo 4. 🔍 Google Search Console:
echo    - Ve a: https://search.google.com/search-console
echo    - Agrega tu sitio web
echo    - Envía el sitemap
echo.
echo 5. 🌐 Dominio personalizado (opcional):
echo    - Compra un dominio
echo    - Configura DNS CNAME apuntando a %GITHUB_USERNAME%.github.io
echo    - Actualiza el archivo CNAME
echo.
echo 📋 URLs del sitio:
echo    🏠 Principal: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo    💼 Servicios PYMES: /servicios/pymes.html
echo    🧮 Calculadora ISR: /calculadoras/isr.html
echo    📚 Recursos: /recursos/guias.html
echo    🗓️ Agendar cita: /citas/agendar.html
echo    🔒 Privacidad: /privacy-policy.html
echo.
echo ✨ ¡Tu sitio web profesional está listo!
echo 🎯 Sitio creado para: María Fabiola Calvillo Rocha
echo 📍 Contadora Pública en León, Guanajuato
echo.
pause