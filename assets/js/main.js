// ===== VARIÁVEIS GLOBAIS =====
let currentTestimonialIndex = 1;
const totalTestimonials = 3;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeGSAP();
    initializeNavigation();
    initializeScrollEffects();
    initializeVideo();
    initializeFAQ();
    initializeWhatsApp();
    initializeTestimonials();
    initializeRevealAnimations();
    initializeHotmartTracking();
});

// ===== GSAP ANIMATIONS =====
function initializeGSAP() {
    // Registrar plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Animação da hero section
    gsap.timeline()
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
        })
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.3');
    
    // Animações de scroll para seções (excluindo a seção de bônus)
    gsap.utils.toArray('section:not(.bonus-section)').forEach(section => {
        gsap.from(section.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animação do mockup do e-book
    gsap.from('.ebook-mockup', {
        opacity: 0,
        rotationY: -30,
        duration: 1.5,
        scrollTrigger: {
            trigger: '.ebook-section',
            start: 'top 60%'
        }
    });
    
    // Animação específica apenas para os headers de seção, não para os cards de bônus
    gsap.from('.bonus-section .section-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.bonus-section',
            start: 'top 70%'
        }
    });
}

// ===== NAVEGAÇÃO PREMIUM =====
function initializeNavigation() {
    const navTrigger = document.getElementById('navTrigger');
    const navOverlay = document.getElementById('navOverlay');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Toggle do menu com animações premium
    navTrigger.addEventListener('click', function() {
        const isActive = navTrigger.classList.contains('active');
        
        if (!isActive) {
            // Abrindo menu
            navTrigger.classList.add('active');
            navOverlay.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animação sequencial dos links
            navLinks.forEach((link, index) => {
                link.style.animation = 'none';
                link.offsetHeight; // Force reflow
                link.style.animation = `slideInNav 0.6s ease-out ${0.1 + index * 0.08}s forwards`;
            });
            
            // Efeito de entrada do logo
            const navLogo = document.querySelector('.nav-logo');
            if (navLogo) {
                gsap.from(navLogo, {
                    opacity: 0,
                    y: -30,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power2.out"
                });
            }
            
            // Efeito de entrada do botão CTA
            const navCta = document.querySelector('.nav-cta');
            if (navCta) {
                gsap.from(navCta, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.8,
                    ease: "back.out(1.7)"
                });
            }
            
        } else {
            // Fechando menu
            closeNavigation();
        }
    });
    
    // Fechar menu ao clicar no overlay
    navOverlay.addEventListener('click', function() {
        closeNavigation();
    });
    
    // Navegação suave para seções com feedback visual
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Efeito visual no link clicado
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                
                // Delay para a animação visual antes de fechar o menu
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    closeNavigation();
                }, 200);
            }
        });
        
        // Efeitos de hover aprimorados
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                x: 15,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Indicador de scroll no menu com paralaxe
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (navMenu.classList.contains('active')) {
            const menuContent = document.querySelector('.nav-content');
            if (menuContent) {
                menuContent.style.transform = `translateY(${rate}px)`;
            }
        }
        
        // Atualizar estado ativo baseado na seção atual
        updateActiveNavItem();
    });
    
    // Efeitos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeNavigation();
        }
    });
}

function closeNavigation() {
    const navTrigger = document.getElementById('navTrigger');
    const navOverlay = document.getElementById('navOverlay');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuContent = document.querySelector('.nav-content');
    
    // Limpar imediatamente qualquer animação em andamento
    gsap.killTweensOf([navMenu, navLinks, menuContent]);
    
    // Reset imediato para evitar estados inconsistentes
    navTrigger.classList.remove('active');
    navOverlay.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset das transformações
    if (menuContent) {
        menuContent.style.transform = 'none';
    }
    
    // Reset dos links
    navLinks.forEach(link => {
        link.style.animation = 'none';
        link.style.transform = 'none';
        link.style.opacity = '1';
    });
    
    // Forçar atualização visual
    navMenu.offsetHeight;
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    // Scroll indicator
    gsap.to('.scroll-line', {
        scaleY: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
    
    // Fadeout do scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ===== VÍDEO =====
function initializeVideo() {
    const heroVideo = document.querySelector('.video-background video');
    const salesVideo = document.querySelector('.video-wrapper video');
    const playOverlay = document.querySelector('.video-overlay-play');
    const videoBackground = document.querySelector('.video-background');
    
    // Controle do vídeo hero com debug
    if (heroVideo && videoBackground) {
        console.log('Vídeo encontrado:', heroVideo);
        console.log('Src do vídeo:', heroVideo.src || heroVideo.currentSrc);
        
        // Forçar propriedades do vídeo
        heroVideo.style.display = 'block';
        heroVideo.style.visibility = 'visible';
        heroVideo.style.opacity = '1';
        heroVideo.style.zIndex = '1';
        
        // Tentar reproduzir o vídeo
        heroVideo.play().then(() => {
            console.log('Vídeo iniciado com sucesso');
        }).catch(err => {
            console.log('Erro ao iniciar vídeo (normal para autoplay):', err.message);
        });
        
        // Fallback: se o vídeo não carregar, usar gradient
        heroVideo.addEventListener('error', function(e) {
            console.error('Erro ao carregar vídeo hero:', e);
            heroVideo.style.display = 'none';
            videoBackground.style.background = 'linear-gradient(135deg, rgba(45, 80, 22, 1), rgba(74, 124, 89, 0.8))';
        });
        
        // Debug dos eventos de carregamento
        heroVideo.addEventListener('loadstart', () => console.log('Vídeo: loadstart'));
        heroVideo.addEventListener('loadedmetadata', () => console.log('Vídeo: loadedmetadata'));
        heroVideo.addEventListener('loadeddata', () => console.log('Vídeo: loadeddata'));
        heroVideo.addEventListener('canplay', () => console.log('Vídeo: canplay'));
        heroVideo.addEventListener('canplaythrough', () => console.log('Vídeo: canplaythrough'));
        
        // Verificar se o vídeo está visível após 2 segundos
        setTimeout(() => {
            const rect = heroVideo.getBoundingClientRect();
            console.log('Posição do vídeo:', rect);
            console.log('Estilos computados:', window.getComputedStyle(heroVideo));
        }, 2000);
    }
    
    // Controle do vídeo de vendas
    if (salesVideo && playOverlay) {
        // Mostrar overlay inicialmente
        playOverlay.classList.add('active');
        
        playOverlay.addEventListener('click', function() {
            salesVideo.play();
            playOverlay.classList.remove('active');
        });
        
        salesVideo.addEventListener('play', function() {
            playOverlay.classList.remove('active');
        });
        
        salesVideo.addEventListener('pause', function() {
            playOverlay.classList.add('active');
        });
        
        salesVideo.addEventListener('ended', function() {
            playOverlay.classList.add('active');
        });
    }
}

// ===== CARROSSEL DE DEPOIMENTOS =====
function initializeTestimonials() {
    // Verificar se os elementos existem antes de inicializar
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0 || dots.length === 0) {
        console.warn('Elementos do carrossel de depoimentos não encontrados');
        return;
    }
    
    // Garantir que o primeiro depoimento esteja ativo
    showTestimonial(currentTestimonialIndex);
    
    // Função de verificação periódica
    setInterval(() => {
        checkTestimonialsVisibility();
    }, 2000);
    
    // Auto-play do carrossel (opcional - pode comentar se não quiser)
    setInterval(() => {
        // Verificar se ainda existem elementos antes de mudar
        if (document.querySelectorAll('.testimonial-item').length > 0) {
            changeTestimonial(1);
        }
    }, 6000); // Aumentei para 6 segundos
}

function checkTestimonialsVisibility() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const hasActiveTestimonial = document.querySelector('.testimonial-item.active');
    
    // Se não há nenhum depoimento ativo, ativar o primeiro
    if (!hasActiveTestimonial && testimonials.length > 0) {
        console.log('Nenhum depoimento ativo encontrado, restaurando...');
        currentTestimonialIndex = 1;
        showTestimonial(currentTestimonialIndex);
    }
}

function showTestimonial(n) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    // Verificações de segurança
    if (testimonials.length === 0 || dots.length === 0) {
        console.warn('Elementos do carrossel não encontrados');
        return;
    }
    
    // Garantir que o índice esteja dentro dos limites
    if (n > totalTestimonials) currentTestimonialIndex = 1;
    if (n < 1) currentTestimonialIndex = totalTestimonials;
    
    // Ocultar todos os depoimentos
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.remove('active');
        testimonial.style.display = 'none';
        testimonial.style.opacity = '0';
    });
    
    // Remover classe active de todos os dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Mostrar depoimento atual
    const currentIndex = currentTestimonialIndex - 1;
    if (testimonials[currentIndex]) {
        testimonials[currentIndex].style.display = 'block';
        testimonials[currentIndex].style.opacity = '1';
        testimonials[currentIndex].classList.add('active');
        
        // Animação de entrada com verificação
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(testimonials[currentIndex], 
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }
    
    // Ativar dot atual
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
    
    console.log(`Depoimento ativo: ${currentTestimonialIndex} de ${totalTestimonials}`);
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(n) {
    currentTestimonialIndex = n;
    showTestimonial(currentTestimonialIndex);
}

// Funções globais para os botões
window.changeTestimonial = changeTestimonial;
window.currentTestimonial = currentTestimonial;

// ===== FAQ =====
function initializeFAQ() {
    console.log('🔧 FAQ: Inicializando...');
    
    // Não adicionar event listeners aqui para evitar conflito com onclick
    const questions = document.querySelectorAll('.faq-question');
    console.log(`📋 FAQ: ${questions.length} perguntas encontradas (apenas onclick)`);
    
    // Removi os addEventListener para evitar duplo evento
    // O onclick no HTML vai gerenciar tudo
}

function faqToggle(button) {
    console.log('🎯 FAQ: === INÍCIO DA FUNÇÃO ===');
    
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (!answer) {
        console.error('❌ FAQ: Resposta não encontrada');
        return;
    }
    
    console.log('📍 FAQ: Elementos encontrados');
    console.log('📍 Answer element:', answer);
    console.log('📍 Classes antes:', answer.className);
    
    const isCurrentlyOpen = answer.classList.contains('active');
    console.log(`📊 FAQ: Está aberto? ${isCurrentlyOpen}`);
    
    // SEMPRE fechar todas primeiro
    console.log('🔄 FAQ: Fechando todas as FAQ...');
    document.querySelectorAll('.faq-answer').forEach((a, index) => {
        const wasActive = a.classList.contains('active');
        a.classList.remove('active');
        a.previousElementSibling.classList.remove('active');
        const ic = a.previousElementSibling.querySelector('i');
        if (ic) ic.className = 'fas fa-plus';
        console.log(`   FAQ ${index + 1}: ${wasActive ? 'fechada' : 'já estava fechada'}`);
    });
    
    // Se NÃO estava aberto, abrir agora
    if (!isCurrentlyOpen) {
        console.log('🔓 FAQ: Abrindo esta FAQ...');
        answer.classList.add('active');
        button.classList.add('active');
        if (icon) icon.className = 'fas fa-minus';
        
        // Verificar se realmente aplicou
        setTimeout(() => {
            console.log('🔍 FAQ: Verificação após 100ms:');
            console.log('   Classes answer:', answer.className);
            console.log('   Classes button:', button.className);
            console.log('   Tem classe active?', answer.classList.contains('active'));
        }, 100);
        
        console.log('✅ FAQ: DEVERIA ESTAR ABERTO');
    } else {
        console.log('✅ FAQ: Manteve fechado (já estava aberto)');
    }
    
    console.log('🎯 FAQ: === FIM DA FUNÇÃO ===');
}

// Função global simples
window.simpleFAQ = faqToggle;

// ===== WHATSAPP =====
function initializeWhatsApp() {
    // Detectar dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Configurar URL base do WhatsApp
    window.whatsappConfig = {
        number: '5519931997815',
        message: 'Olá! Gostaria de saber mais sobre o método Todo dia um pouco',
        isMobile: isMobile
    };
    
    // Controlar visibilidade baseado no scroll
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero-section');
        const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : window.innerHeight;
        
        if (window.scrollY > heroBottom - 100) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    });
}

function openWhatsApp() {
    const { number, message, isMobile } = window.whatsappConfig;
    const encodedMessage = encodeURIComponent(message);
    
    let whatsappURL;
    
    if (isMobile) {
        // Para dispositivos móveis - abre o app nativo
        whatsappURL = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;
    } else {
        // Para desktop - abre o WhatsApp Web
        whatsappURL = `https://web.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;
    }
    
    // Animação do botão antes de abrir
    gsap.to('.whatsapp-float', {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            window.open(whatsappURL, '_blank');
        }
    });
    
    // Analytics (se necessário)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'WhatsApp',
            'event_label': 'CTA Button',
            'value': 1
        });
    }
}

// Função global para o HTML
window.openWhatsApp = openWhatsApp;

// ===== SCROLL PARA SEÇÃO =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função global para o HTML
window.scrollToSection = scrollToSection;

// ===== OTIMIZAÇÕES DE PERFORMANCE =====
// Lazy loading de imagens
if ('IntersectionObserver' in window) {
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
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload de recursos críticos
function preloadResources() {
    const criticalResources = [
        './assets/video/hero-section-video.mp4',
        './assets/image/gisele-figueredo.png'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.includes('.mp4') ? 'video' : 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Executar preload
preloadResources();

// ===== TRATAMENTO DE ERROS =====
window.addEventListener('error', function(e) {
    console.warn('Erro capturado:', e.error);
    
    // Fallback para funcionalidades críticas
    if (e.error && e.error.message.includes('gsap')) {
        console.warn('GSAP não carregou, usando fallbacks CSS');
        document.body.classList.add('no-js');
    }
});

// ===== SMOOTH SCROLL POLYFILL =====
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill para navegadores antigos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ACESSIBILIDADE =====
// Suporte a navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu
    if (e.key === 'Escape') {
        closeNavigation();
    }
    
    // Enter/Space para botões customizados
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('faq-question')) {
        e.preventDefault();
        toggleFAQ(e.target);
    }
});

// ===== ANALYTICS HELPERS =====
function trackEvent(eventName, category = 'General', label = '', value = 1) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

// Track de scroll depth
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    Object.keys(scrollDepthTracked).forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            trackEvent('scroll_depth', 'Engagement', `${depth}%`);
        }
    });
});

console.log('🚀 Todo Dia um Pouco - Landing Page carregada com sucesso!');

// ===== REVEAL ANIMATIONS =====
function initializeRevealAnimations() {
    console.log('Inicializando reveal animations...');
    
    // Revelar elementos na hero section imediatamente
    const heroElements = document.querySelectorAll('.hero-section .reveal-up');
    console.log('Elementos hero encontrados:', heroElements.length);
    
    heroElements.forEach((element, index) => {
        console.log(`Revelando elemento ${index}:`, element);
        setTimeout(() => {
            element.classList.add('revealed');
            console.log(`Elemento ${index} revelado`);
        }, 500 + (index * 200)); // Delay progressivo
    });
    
    // Revelar outros elementos com scroll
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar todos os elementos reveal (exceto os da hero que já foram revelados)
        document.querySelectorAll('.reveal-up:not(.hero-section .reveal-up), .reveal-left, .reveal-right').forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback para navegadores sem suporte
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(element => {
            element.classList.add('revealed');
        });
    }
}

// ===== TRACKING DE CONVERSÃO =====
function initializeHotmartTracking() {
    // Adicionar listener ao botão de compra
    const hotmartButton = document.querySelector('a[href*="hotmart"]');
    if (hotmartButton) {
        hotmartButton.addEventListener('click', function() {
            // Analytics do clique para compra
            trackEvent('hotmart_click', 'Conversion', 'Buy Button', 1);
            
            // Log para debug
            console.log('🛒 Redirecionando para Hotmart - Compra iniciada!');
        });
    }
} 