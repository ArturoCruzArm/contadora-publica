# 🚀 Despliegue Automático con GitHub CLI

## Opción 1: Ejecutar Script Automático (Recomendado)

### Windows:
```bash
# Ejecutar el script automático
deploy-github.bat
```

### Linux/Mac:
```bash
# Hacer ejecutable y correr
chmod +x deploy-github.sh
./deploy-github.sh
```

## Opción 2: Comandos Manuales con GitHub CLI

### 1. Instalar GitHub CLI
```bash
# Windows (con winget)
winget install --id GitHub.cli

# Windows (con Chocolatey) 
choco install gh

# Mac (con Homebrew)
brew install gh

# Linux (Ubuntu/Debian)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### 2. Autenticar con GitHub
```bash
gh auth login
```

### 3. Configurar Git (si es necesario)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 4. Inicializar y crear repositorio
```bash
# Navegar a la carpeta del proyecto
cd C:\contadora-publica

# Inicializar git
git init
git branch -M main

# Crear repositorio en GitHub
gh repo create contadora-publica \
  --public \
  --description "Sitio web profesional para María Fabiola Calvillo Rocha - Contadora Pública certificada en León, Guanajuato" \
  --clone=false

# Agregar archivos y hacer commit
git add .
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

🚀 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Conectar y subir
git remote add origin https://github.com/$(gh api user --jq .login)/contadora-publica.git
git push -u origin main
```

### 5. Configurar GitHub Pages
```bash
# Activar GitHub Pages
gh api repos/$(gh api user --jq .login)/contadora-publica/pages \
  --method POST \
  --field source.branch=main \
  --field source.path=/
```

## ✅ Verificar Despliegue

Una vez completado, tu sitio estará en:
`https://TU-USUARIO.github.io/contadora-publica/`

## 🔧 Configuraciones Post-Despliegue

### 1. Google Analytics
- Ve a https://analytics.google.com
- Crea una propiedad 
- Reemplaza `GA_MEASUREMENT_ID` en `index.html`

### 2. Formspree (Formulario de contacto)
- Ve a https://formspree.io
- Crea cuenta gratuita
- Reemplaza `YOUR_FORM_ID` en `script.js`

### 3. Actualizar Sitemap
```bash
# Editar sitemap.xml y reemplazar URLs
sed -i 's/username.github.io/TU-USUARIO.github.io/g' sitemap.xml
git add sitemap.xml
git commit -m "🔧 Actualizar URLs del sitemap"
git push
```

### 4. Dominio Personalizado (Opcional)
```bash
# Agregar dominio personalizado
echo "tudominio.com" > CNAME
git add CNAME
git commit -m "🌐 Agregar dominio personalizado"
git push
```

## 📊 Monitoreo y Actualizaciones

### Ver estado del sitio
```bash
gh repo view --web
```

### Actualizar contenido
```bash
git add .
git commit -m "📝 Actualización del contenido"
git push
```

### Ver logs de GitHub Pages
```bash
gh api repos/$(gh api user --jq .login)/contadora-publica/pages/builds
```

## 🆘 Solución de Problemas

### Sitio no se ve después de 10 minutos
```bash
# Verificar estado de Pages
gh api repos/$(gh api user --jq .login)/contadora-publica/pages
```

### Error 404 en páginas internas
- Verificar que los archivos existan en GitHub
- Revisar mayúsculas/minúsculas en nombres de archivo
- Confirmar rutas relativas correctas

### Formulario no funciona
- Configurar Formspree correctamente
- Verificar que el Form ID esté correcto
- Revisar consola del navegador para errores

---

## 🎯 URLs Finales del Sitio

- **Principal:** `https://TU-USUARIO.github.io/contadora-publica/`
- **Servicios PYMES:** `/servicios/pymes.html`
- **Calculadora ISR:** `/calculadoras/isr.html`
- **Recursos:** `/recursos/guias.html`
- **Agendar Cita:** `/citas/agendar.html`
- **Política Privacidad:** `/privacy-policy.html`

## 📞 Información de Contacto del Sitio

- **Tel:** 477 498 0061
- **WhatsApp:** 477 386 8927  
- **Email:** alvillofabiola19@gmail.com
- **Ubicación:** León, Guanajuato, México

¡Tu sitio web profesional para María Fabiola Calvillo Rocha está listo! 🎉