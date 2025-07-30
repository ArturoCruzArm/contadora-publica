# 🚀 Guía de Despliegue a GitHub Pages

## Pasos para subir el sitio a GitHub

### 1. Crear Repositorio en GitHub
1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en "New repository" (botón verde)
3. Nombra el repositorio: `contadora-publica`
4. Marca "Public" para GitHub Pages gratuito
5. NO marques "Initialize with README" (ya tenemos uno)
6. Haz clic en "Create repository"

### 2. Subir archivos desde línea de comandos

```bash
# Navegar a la carpeta del proyecto
cd C:\contadora-publica

# Inicializar repositorio git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "🎉 Sitio web profesional completo para María Fabiola Calvillo Rocha"

# Agregar el remoto (reemplaza USERNAME con tu usuario de GitHub)
git remote add origin https://github.com/USERNAME/contadora-publica.git

# Subir archivos
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (en el menú superior)
3. Scroll hacia abajo hasta "Pages" (menú izquierdo)
4. En "Source", selecciona "Deploy from a branch"
5. Selecciona "main" branch y "/ (root)"
6. Haz clic en "Save"
7. ¡Tu sitio estará disponible en: `https://USERNAME.github.io/contadora-publica/`

### 4. Configuraciones adicionales requeridas

#### A. Configurar Google Analytics
1. Ve a [Google Analytics](https://analytics.google.com)
2. Crea una propiedad para tu sitio
3. Copia tu Measurement ID (empieza con G-)
4. Reemplaza `GA_MEASUREMENT_ID` en `index.html` línea 89 y 94

#### B. Configurar Formspree para el formulario
1. Ve a [Formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia tu Form ID
5. Reemplaza `YOUR_FORM_ID` en `script.js` línea 52

#### C. Actualizar URLs en sitemap.xml
1. Abre `sitemap.xml`
2. Reemplaza `username.github.io` con tu URL real
3. Haz commit y push:
```bash
git add sitemap.xml
git commit -m "🔧 Actualizar URLs del sitemap"
git push
```

#### D. Configurar dominio personalizado (opcional)
1. Compra un dominio (ej: contadorafabiola.com)
2. En tu proveedor de dominio, crea un CNAME record apuntando a `USERNAME.github.io`
3. En GitHub Settings > Pages, agrega tu dominio personalizado
4. Descomenta y actualiza el archivo `CNAME`

### 5. Optimizaciones post-despliegue

#### Comprimir imágenes
```bash
# Instalar herramientas de optimización
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

# Optimizar imágenes (cuando las agregues)
imagemin images/*.{jpg,png} --out-dir=images/optimized --plugin=mozjpeg --plugin=pngquant
```

#### Configurar PWA
1. El archivo `site.webmanifest` ya está listo
2. Para PWA completa, agregar service worker:
```javascript
// En script.js, agregar:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/contadora-publica/sw.js');
}
```

### 6. Monitoreo y mantenimiento

#### A. Google Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu sitio web
3. Verifica la propiedad
4. Envía tu sitemap: `https://tudominio.com/sitemap.xml`

#### B. Actualizaciones
```bash
# Para hacer cambios y subirlos:
git add .
git commit -m "📝 Descripción del cambio"
git push
```

### 7. URLs del sitio final

Una vez desplegado, las URLs serán:
- **Página principal:** `https://USERNAME.github.io/contadora-publica/`
- **Servicios PYMES:** `https://USERNAME.github.io/contadora-publica/servicios/pymes.html`
- **Calculadora ISR:** `https://USERNAME.github.io/contadora-publica/calculadoras/isr.html`
- **Recursos:** `https://USERNAME.github.io/contadora-publica/recursos/guias.html`
- **Agendar cita:** `https://USERNAME.github.io/contadora-publica/citas/agendar.html`
- **Política privacidad:** `https://USERNAME.github.io/contadora-publica/privacy-policy.html`

### 8. Checklist final ✅

- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos correctamente  
- [ ] GitHub Pages configurado
- [ ] Google Analytics configurado
- [ ] Formspree configurado
- [ ] URLs del sitemap actualizadas
- [ ] Sitio accesible públicamente
- [ ] Formulario de contacto funcionando
- [ ] Enlaces internos funcionando
- [ ] Sitio responsive en móviles
- [ ] SEO tags configurados

### 9. Próximos pasos recomendados

1. **Agregar imágenes reales** de María Fabiola
2. **Configurar dominio personalizado**
3. **Agregar más contenido al blog**
4. **Integrar redes sociales reales**
5. **Configurar Google My Business**
6. **Agregar testimonios en video**
7. **Implementar chat de WhatsApp Business**

---

## 🆘 Soporte

Si tienes problemas con algún paso:

1. **GitHub Pages no funciona:** Verifica que el repositorio sea público
2. **Formulario no envía:** Configura Formspree correctamente
3. **Analytics no funciona:** Verifica el Measurement ID
4. **Errores 404:** Verifica que las rutas de archivos sean correctas

**¡Tu sitio web profesional está listo para funcionar!** 🎉