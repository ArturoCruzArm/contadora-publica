// Navegación smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Manejo del formulario de contacto con Formspree
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validación básica
    if (!data.nombre || !data.email || !data.mensaje) {
        showNotification('Por favor, complete todos los campos obligatorios.', 'error');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor, introduzca un email válido.', 'error');
        return;
    }
    
    // Validación de teléfono (opcional pero si se proporciona debe ser válido)
    if (data.telefono && !/^[\d\s\-\+\(\)]{10,}$/.test(data.telefono)) {
        showNotification('Por favor, introduzca un teléfono válido.', 'error');
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Mostrar mensaje de contacto por WhatsApp en lugar de formulario roto
    showNotification('Por favor, contacte directamente por WhatsApp para una respuesta más rápida: 477 386 8927', 'info');
    
    // Redirigir a WhatsApp con mensaje preformateado incluyendo RFC
    const whatsappMessage = `Hola C.P. María Fabiola, me interesa contactar para: ${data.servicio || 'servicios contables'}. Mi nombre es ${data.nombre}, mi email es ${data.email}. ${data.mensaje}. Puedes responderme también a: calvillofabiola19@gmail.com`;
    const whatsappURL = `https://wa.me/524773868927?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    return;
    
    // Código original del formulario (deshabilitado)
    fetch('https://formspree.io/f/DISABLED', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('¡Gracias por su consulta! Me pondré en contacto con usted pronto.', 'success');
            this.reset();
            
            // Enviar evento a Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form',
                    'value': 1
                });
            }
        } else {
            throw new Error('Error en el envío');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Hubo un error al enviar el formulario. Por favor, intente nuevamente o contacte por WhatsApp.', 'error');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Navegación responsive
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.formacion-item, .servicio-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Destacar navegación activa al hacer scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Botones de WhatsApp y teléfono con funcionalidad
document.addEventListener('DOMContentLoaded', function() {
    // Crear botones flotantes de contacto rápido
    const quickContactHTML = `
        <div class="quick-contact">
            <a href="https://wa.me/524773868927" class="whatsapp-btn" target="_blank" title="Contactar por WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="tel:+524774980061" class="phone-btn" title="Llamar">
                <i class="fas fa-phone"></i>
            </a>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', quickContactHTML);
    
    // Agregar estilos para botones flotantes
    const quickContactStyles = `
        <style>
        .quick-contact {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 1000;
        }
        
        .whatsapp-btn, .phone-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 1.5rem;
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        }
        
        .whatsapp-btn {
            background-color: #25D366;
        }
        
        .phone-btn {
            background-color: var(--accent-color);
        }
        
        .whatsapp-btn:hover, .phone-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
            .quick-contact {
                bottom: 1rem;
                right: 1rem;
            }
            
            .whatsapp-btn, .phone-btn {
                width: 50px;
                height: 50px;
                font-size: 1.25rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', quickContactStyles);
});

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Activar efecto de escritura cuando se carga la página
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Contador de estadísticas animado
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (difference * progress));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Inicializar contadores cuando son visibles
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, 0, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todas las FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir la actual si no estaba activa
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Botón volver arriba
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal de política de privacidad
const privacyModal = document.getElementById('privacy-modal');
const privacyLink = document.getElementById('privacy-link');
const closeModalBtns = document.querySelectorAll('.close-modal');

if (privacyLink) {
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        privacyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', function(e) {
    if (e.target === privacyModal) {
        privacyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Theme toggle (modo oscuro/claro)
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema guardado
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Cambiar icono
    if (newTheme === 'dark') {
        this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        this.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Language toggle (multiidioma básico)
const langToggle = document.getElementById('lang-toggle');
const currentLang = document.getElementById('current-lang');
let isEnglish = false;

const translations = {
    es: {
        nav: {
            inicio: 'Inicio',
            sobreMi: 'Sobre Mí',
            formacion: 'Formación',
            servicios: 'Servicios',
            portafolio: 'Portafolio',
            testimonios: 'Testimonios',
            faq: 'FAQ',
            contacto: 'Contacto',
            blog: 'Blog'
        },
        hero: {
            title: 'C.P. María Fabiola Calvillo Rocha',
            subtitle: 'Contadora Pública Certificada | Cédula Profesional 11087841',
            cta1: 'Agendar Cita',
            cta2: 'Conocer Servicios'
        }
    },
    en: {
        nav: {
            inicio: 'Home',
            sobreMi: 'About Me',
            formacion: 'Education',
            servicios: 'Services',
            portafolio: 'Portfolio',
            testimonios: 'Testimonials',
            faq: 'FAQ',
            contacto: 'Contact',
            blog: 'Blog'
        },
        hero: {
            title: 'C.P. María Fabiola Calvillo Rocha',
            subtitle: 'Certified Public Accountant | Professional License 11087841',
            cta1: 'Schedule Appointment',
            cta2: 'Learn About Services'
        }
    }
};

langToggle.addEventListener('click', function() {
    isEnglish = !isEnglish;
    const lang = isEnglish ? 'en' : 'es';
    currentLang.textContent = isEnglish ? 'EN' : 'ES';
    
    // Cambiar textos principales (demo básico)
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const cta1 = document.querySelector('.hero-cta .btn-primary');
    const cta2 = document.querySelector('.hero-cta .btn-secondary');
    
    if (heroTitle) heroTitle.textContent = translations[lang].hero.title;
    if (heroSubtitle) heroSubtitle.textContent = translations[lang].hero.subtitle;
    if (cta1) cta1.textContent = translations[lang].hero.cta1;
    if (cta2) cta2.textContent = translations[lang].hero.cta2;
    
    // Cambiar navegación
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navItems = ['inicio', 'sobreMi', 'formacion', 'servicios', 'portafolio', 'testimonios', 'faq', 'contacto', 'blog'];
    
    navLinks.forEach((link, index) => {
        if (navItems[index]) {
            const key = navItems[index];
            if (translations[lang].nav[key]) {
                link.textContent = translations[lang].nav[key];
            }
        }
    });
    
    // Mostrar notificación de cambio de idioma
    showNotification(isEnglish ? 'Language changed to English' : 'Idioma cambiado a Español');
});

// Función para mostrar notificaciones mejorada
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mejorar navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase activa a navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Agregar estilos CSS dinámicos para navegación móvil
        const mobileNavStyles = `
            <style>
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 80px;
                    right: -100%;
                    width: 300px;
                    height: calc(100vh - 80px);
                    background-color: var(--background-color);
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding-top: 2rem;
                    box-shadow: var(--shadow-hover);
                    transition: right 0.3s ease;
                    z-index: 1000;
                }
                
                .nav-menu.active {
                    right: 0;
                }
                
                .nav-menu li {
                    margin: 1rem 0;
                }
                
                .nav-menu a {
                    font-size: 1.2rem;
                    padding: 1rem 2rem;
                    width: 100%;
                    text-align: center;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .nav-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .nav-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
            </style>
        `;
        
        if (!document.querySelector('style[data-mobile-nav]')) {
            const styleElement = document.createElement('div');
            styleElement.innerHTML = mobileNavStyles;
            styleElement.setAttribute('data-mobile-nav', 'true');
            document.head.appendChild(styleElement.firstElementChild);
        }
    }
    
    // Lazy loading para imágenes (si se agregan)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Mejorar accesibilidad
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', 'Botón o enlace');
        }
    });
    
    // Detectar scroll para header sticky
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/contadora-publica/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
                
                // Escuchar actualizaciones
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Nueva versión disponible
                            showNotification('Nueva versión disponible. Recarga la página para actualizar.', 'info');
                        }
                    });
                });
            })
            .catch(error => {
                console.log('❌ Error registrando Service Worker:', error);
            });
    });
}

// Detectar si está instalado como PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches;
}

// Mostrar prompt de instalación de PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botón de instalación después de 10 segundos
    setTimeout(() => {
        if (!isPWA()) {
            showInstallPrompt();
        }
    }, 10000);
});

function showInstallPrompt() {
    const installPrompt = document.createElement('div');
    installPrompt.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: linear-gradient(135deg, var(--accent-color), var(--success-color));
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInLeft 0.3s ease;
    `;
    
    installPrompt.innerHTML = `
        <div>
            <h4 style="margin: 0 0 0.5rem 0;">📱 Instalar App</h4>
            <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Accede más rápido a nuestros servicios</p>
        </div>
        <button id="install-btn" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
            Instalar
        </button>
        <button id="dismiss-install" style="background: none; color: white; border: none; font-size: 1.2rem; cursor: pointer; opacity: 0.7;">
            ×
        </button>
    `;
    
    document.body.appendChild(installPrompt);
    
    // Manejar instalación
    document.getElementById('install-btn').addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('✅ PWA instalada');
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'pwa_install', {
                            'event_category': 'PWA',
                            'event_label': 'Install Accepted'
                        });
                    }
                }
                deferredPrompt = null;
                document.body.removeChild(installPrompt);
            });
        }
    });
    
    // Cerrar prompt
    document.getElementById('dismiss-install').addEventListener('click', () => {
        document.body.removeChild(installPrompt);
    });
    
    // Auto-cerrar después de 15 segundos
    setTimeout(() => {
        if (document.body.contains(installPrompt)) {
            document.body.removeChild(installPrompt);
        }
    }, 15000);
}

// Escuchar mensajes del Service Worker
navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.type === 'FORM_SENT_OFFLINE') {
        if (event.data.success) {
            showNotification('Formulario enviado exitosamente cuando volvió la conexión', 'success');
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            
            // Enviar métricas a analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'event_category': 'Performance',
                    'event_label': 'Load Time',
                    'value': Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                });
            }
        }, 0);
    });
}

// Detectar conexión online/offline
window.addEventListener('online', () => {
    showNotification('Conexión restaurada', 'success');
    // Trigger sync si hay formularios pendientes
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then(registration => {
            return registration.sync.register('contact-form-sync');
        });
    }
});

window.addEventListener('offline', () => {
    showNotification('Sin conexión. El sitio seguirá funcionando en modo offline.', 'warning');
});

// Sistema de Búsqueda Interno
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Base de datos de contenido para búsqueda
    const searchData = [
        // Servicios principales
        {
            title: 'Contabilidad y Auditoría',
            description: 'Captura de pólizas contables, conciliaciones bancarias, ajustes a estados financieros, auditorías internas y externas',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'contabilidad auditoría pólizas conciliaciones bancarias estados financieros auditorías internas externas reportes'
        },
        {
            title: 'Cumplimiento Fiscal y SAT',
            description: 'Validación de CFDI ante el SAT, revisión de facturas con requisitos fiscales, elaboración de declaraciones',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'cfdi sat fiscal declaraciones facturas validación cumplimiento pagos previsionales normatividad'
        },
        {
            title: 'Nóminas y Recursos Humanos',
            description: 'Elaboración de nóminas, altas ante IMSS y SUA, gestión de incidencias de RRHH, cálculo de prestaciones',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'nominas imss sua recursos humanos prestaciones altas incidencias empleados'
        },
        {
            title: 'Cobro y Recuperación',
            description: 'Acciones de cobro persuasivo y coactivo, integración de expedientes PAE, conciliación de pagos',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'cobro coactivo persuasivo profeco pae expedientes recuperación multas conciliación'
        },
        {
            title: 'Administración Gubernamental',
            description: 'Manejo de plataforma Opergob, control y gestión de presupuestos, participación en licitaciones',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'opergob gobierno presupuestos licitaciones transparencia administración pública reportes'
        },
        {
            title: 'Consultoría Empresarial',
            description: 'Revisión de cuentas por pagar y cobrar, elaboración de presupuestos, análisis financiero empresarial',
            type: 'Servicio',
            url: '#servicios',
            keywords: 'consultoría empresarial cuentas presupuestos análisis financiero optimización procesos'
        },
        // Calculadoras y herramientas
        {
            title: 'Calculadora ISR',
            description: 'Calcula tu Impuesto Sobre la Renta para personas físicas y morales',
            type: 'Calculadora',
            url: 'calculadoras/isr.html',
            keywords: 'isr impuesto sobre la renta calculadora fiscal personas físicas morales anual mensual'
        },
        {
            title: 'Calculadora IVA',
            description: 'Herramienta para calcular IVA, retenciones y deducciones de productos y servicios',
            type: 'Calculadora',
            url: 'calculadoras/iva.html',
            keywords: 'iva impuesto valor agregado calculadora retenciones deducciones productos servicios'
        },
        {
            title: 'Calculadora de Nómina',
            description: 'Calcula salarios, deducciones IMSS, ISPT y prestaciones sociales para empleados',
            type: 'Calculadora',
            url: 'calculadoras/nomina.html',
            keywords: 'nomina salarios deducciones imss ispt prestaciones calcular empleados sueldo neto'
        },
        // Servicios especializados
        {
            title: 'Servicios para PYMES',
            description: 'Contabilidad integral, declaraciones fiscales, asesoría tributaria para pequeñas y medianas empresas',
            type: 'Servicio',
            url: 'servicios/pymes.html',
            keywords: 'pymes pequeñas medianas empresas contabilidad declaraciones fiscal tributaria integral'
        },
        {
            title: 'PROFECO - Cobro Coactivo',
            description: 'Experiencia especializada en cobro persuasivo y coactivo de multas administrativas',
            type: 'Experiencia',
            url: '#sobre-mi',
            keywords: 'profeco cobro coactivo persuasivo multas administrativas experiencia especializada'
        },
        // Información profesional
        {
            title: 'Sobre Mí - María Fabiola Calvillo',
            description: 'Contadora Pública con 19 años de experiencia en PROFECO, administración pública y empresas privadas',
            type: 'Información',
            url: '#sobre-mi',
            keywords: 'sobre mi fabiola calvillo contador experiencia profeco administración pública empresas'
        },
        {
            title: 'Experiencia Profesional',
            description: 'Trayectoria en PROFECO, DIF León, empresas privadas y despachos contables especializados',
            type: 'Información',
            url: '#formacion',
            keywords: 'experiencia trayectoria profeco dif león empresas privadas despachos contables'
        },
        {
            title: 'Competencias Técnicas',
            description: 'Especialización en software contable, sistemas gubernamentales, auditorías y gestión administrativa',
            type: 'Información',
            url: '#competencias',
            keywords: 'competencias técnicas software contable sistemas gubernamentales auditorías gestión'
        },
        {
            title: 'Testimonios de Clientes',
            description: 'Opiniones y experiencias de clientes satisfechos con los servicios contables profesionales',
            type: 'Información',
            url: '#testimonios',
            keywords: 'testimonios clientes opiniones experiencias satisfechos servicios contables'
        },
        {
            title: 'Preguntas Frecuentes (FAQ)',
            description: 'Respuestas a las dudas más comunes sobre servicios contables, fiscales y administrativos',
            type: 'Información',
            url: '#faq',
            keywords: 'faq preguntas frecuentes dudas servicios contables fiscales administrativos'
        },
        {
            title: 'Contacto y Ubicación',
            description: 'WhatsApp, teléfono, email y ubicación en León, Guanajuato para consultas profesionales',
            type: 'Contacto',
            url: '#contacto',
            keywords: 'contacto whatsapp teléfono email león guanajuato ubicación consultas'
        },
        // Recursos adicionales
        {
            title: 'Descargar CV Profesional',
            description: 'Curriculum Vitae completo de María Fabiola Calvillo Rocha con experiencia detallada',
            type: 'Recurso',
            url: 'recursos/cv.html',
            keywords: 'cv curriculum vitae experiencia profesional descargar fabiola calvillo'
        },
        {
            title: 'Guías Contables y Fiscales',
            description: 'Recursos descargables, guías fiscales actualizadas y herramientas para emprendedores',
            type: 'Recurso',
            url: 'recursos/guias.html',
            keywords: 'guías recursos contables fiscales descargar emprendedores herramientas'
        },
        {
            title: 'Agendar Cita de Consulta',
            description: 'Programa una consulta personalizada presencial o virtual para servicios contables',
            type: 'Servicio',
            url: 'citas/agendar.html',
            keywords: 'cita consulta personalizada presencial virtual agendar programar servicios'
        }
    ];
    
    // Abrir modal de búsqueda
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            searchModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 300);
        });
    }
    
    // Cerrar modal
    function closeSearchModal() {
        searchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Busca servicios como: contabilidad, auditoría, nóminas, CFDI, calculadoras ISR/IVA, PROFECO, consultoría...</p>';
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearchModal);
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.style.display === 'block') {
            closeSearchModal();
        }
    });
    
    // Cerrar al hacer clic fuera del modal
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
    
    // Funcionalidad de búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '<p class="search-hint">Escribe al menos 2 caracteres para buscar...</p>';
                return;
            }
            
            const results = searchData.filter(item => {
                return item.title.toLowerCase().includes(query) ||
                       item.description.toLowerCase().includes(query) ||
                       item.keywords.toLowerCase().includes(query);
            });
            
            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="search-no-results">
                        <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
                        <p class="search-hint">Intenta buscar: <strong>contabilidad</strong>, <strong>auditoría</strong>, <strong>nóminas</strong>, <strong>CFDI</strong>, <strong>calculadora ISR</strong>, <strong>PROFECO</strong>, <strong>consultoría</strong>, <strong>PYMES</strong></p>
                        <div class="search-suggestions">
                            <h4>Sugerencias populares:</h4>
                            <button onclick="document.getElementById('search-input').value='calculadora'; document.getElementById('search-input').dispatchEvent(new Event('input'));" class="search-suggestion-btn">Calculadoras</button>
                            <button onclick="document.getElementById('search-input').value='contabilidad'; document.getElementById('search-input').dispatchEvent(new Event('input'));" class="search-suggestion-btn">Contabilidad</button>
                            <button onclick="document.getElementById('search-input').value='PROFECO'; document.getElementById('search-input').dispatchEvent(new Event('input'));" class="search-suggestion-btn">PROFECO</button>
                            <button onclick="document.getElementById('search-input').value='nóminas'; document.getElementById('search-input').dispatchEvent(new Event('input'));" class="search-suggestion-btn">Nóminas</button>
                        </div>
                    </div>
                `;
                return;
            }
            
            const resultsHTML = results.map(result => `
                <div class="search-result-item" onclick="navigateToResult('${result.url}')">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-description">${result.description}</div>
                    <span class="search-result-type">${result.type}</span>
                </div>
            `).join('');
            
            searchResults.innerHTML = resultsHTML;
        });
    }
    
    // Navegación a resultados
    window.navigateToResult = function(url) {
        closeSearchModal();
        
        if (url.startsWith('#')) {
            // Navegación interna (anclas)
            const element = document.querySelector(url);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Navegación a otras páginas
            if (url.startsWith('/')) {
                url = url.substring(1); // Remover la barra inicial
            }
            window.location.href = url;
        }
    };
});

// ================================
// MOBILE MENU FUNCTIONALITY
// ================================

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const isOpen = navMenu.classList.contains('mobile-open');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    
    mobileMenuToggle.classList.add('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('mobile-open');
    navBackdrop.classList.add('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstMenuItem = navMenu.querySelector('a');
    if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 300);
    }
}

function closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    
    mobileMenuToggle.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('mobile-open');
    navBackdrop.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// ================================
// SCROLL TO TOP FUNCTIONALITY
// ================================

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
function updateScrollToTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
}

// ================================
// MOBILE OPTIMIZATIONS
// ================================

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ensure menu starts in correct state
    initializeMobileMenu();
    
    function initializeMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navBackdrop = document.getElementById('nav-backdrop');
        
        if (mobileMenuToggle && navMenu && navBackdrop) {
            // Force reset menu state on page load
            mobileMenuToggle.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('mobile-open');
            navBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    // Close mobile menu when clicking on menu links
    const navMenuLinks = document.querySelectorAll('.nav-menu a');
    
    navMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu if it's open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        }
    });
    
    // Close mobile menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        // Re-initialize menu state on resize
        initializeMobileMenu();
    });
    
    // Initialize scroll to top button
    window.addEventListener('scroll', throttle(updateScrollToTopButton, 100));
    updateScrollToTopButton(); // Check on load
    
    // Mobile performance optimizations
    if (window.innerWidth <= 768) {
        // Disable animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                .nav-menu,
                .mobile-menu-toggle,
                .scroll-top-btn {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            }
        `;
        
        // Only add performance optimizations for low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.head.appendChild(style);
        }
    }
});

// ================================
// MOBILE TOUCH OPTIMIZATIONS
// ================================

// Optimize touch events for mobile
if ('ontouchstart' in window) {
    // Add touch-friendly interactions
    const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-menu a, .social-link');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}