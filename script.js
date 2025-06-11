document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Activar link de navegación según la sección visible
    const sections = document.querySelectorAll('.section, header#hero');
    const mainNavLinks = document.querySelectorAll('#main-nav ul li a');
    function activateNavLink() {
        let currentSectionId = '';
        const navHeight = document.getElementById('main-nav').offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }
        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', activateNavLink);
    activateNavLink();

    // Animación de entrada para elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.content-wrapper');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Tokenomics Pie Chart
    const ctx = document.getElementById('tokenomicsChart');
if (ctx) {
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Recompensas Play-to-Earn',
                'Comunity rewards',
                'Marketing',
                'Liquidez DEX y CEX',
                'Token Burning (Deflacion)',
                'Desarrolladores',
                'Tesorería',
                'Venta pública',
                'Venta privada'
            ],
            datasets: [{
                data: [30, 15, 10, 10, 10, 10, 5, 8, 2],
                backgroundColor: [
                    '#00ffe7', '#7c3aed', '#ffb300', '#1e90ff', '#ff4d4d', '#39ff14', '#fff', '#ff00ea', '#ffe600'
                ],
                borderWidth: 4, // <-- aquí
                borderColor: 'rgba(0,255,231,0.25)', // <-- aquí
                hoverOffset: 18 // <-- aquí
            }]
        },
        options: {
            plugins: {
                legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: { size: 16, family: 'Montserrat, Roboto, sans-serif' },
                    padding: 22,
                    boxWidth: 22,
                    boxHeight: 22,
                    // textStrokeColor y textStrokeWidth son experimentales, puedes omitirlos si no funcionan
                }
            },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#222b44',
                    titleColor: '#00ffe7',
                    bodyColor: '#fff',
                    borderColor: '#00ffe7',
                    borderWidth: 1,
                    padding: 12,
                    caretSize: 8,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

    // Modal para icon-carousel-quienessomos
    const modalBg = document.getElementById('carouselModal');
    const modalImg = document.getElementById('carouselModalImg');
    const modalClose = document.getElementById('carouselModalClose');
    document.querySelectorAll('.icon-carousel-quienessomos .carousel-icon img').forEach(img => {
        img.parentElement.addEventListener('click', function() {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalBg.classList.add('active');
        });
    });
    if (modalClose) {
        modalClose.addEventListener('click', () => modalBg.classList.remove('active'));
    }
    if (modalBg) {
        modalBg.addEventListener('click', e => {
            if (e.target === modalBg) modalBg.classList.remove('active');
        });
    }
});
