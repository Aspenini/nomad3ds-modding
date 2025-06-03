document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for header
    setTimeout(() => {
        document.querySelector('header').classList.add('visible');
    }, 100);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('pricing-tier')) {
                    animatePricingTier(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    document.querySelectorAll('.about-section, .models-section, .pricing-section, .pricing-tier').forEach(section => {
        observer.observe(section);
    });

    // Enhanced parallax effect for background
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.01;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.01;
    });

    function updateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        document.body.style.background = `linear-gradient(135deg, 
            rgb(${74 + currentX}, ${144 + currentY}, ${226 + currentX}), 
            rgb(${138 + currentY}, ${43 + currentX}, ${226 + currentY})
        )`;
        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    // Smooth scroll for navigation with enhanced behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 20;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced hover effects for model items
    document.querySelectorAll('.model-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateY(-5px)';
            item.style.background = 'rgba(255, 255, 255, 0.2)';
            createRippleEffect(item);
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Ripple effect function
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        element.appendChild(ripple);

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        ripple.style.left = `${event.clientX - rect.left - size/2}px`;
        ripple.style.top = `${event.clientY - rect.top - size/2}px`;

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // Animate pricing tier features
    function animatePricingTier(tier) {
        const features = tier.querySelectorAll('.tier-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}); 