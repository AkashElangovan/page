document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP REGISTRATION ---
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === 1 && self.progress > 0.01) {
                header.classList.add('scrolled');
            } else if (self.direction === -1 && self.progress < 0.01) {
                header.classList.remove('scrolled');
            }
        }
    });

    // --- HERO SECTION ENTRANCE ANIMATION ---
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
    heroTimeline
        .to('.main-heading', { opacity: 1, y: 0, delay: 0.2 })
        .to('.intro-paragraph', { opacity: 1, y: 0 }, '-=1')
        .to('.hero-cta', { opacity: 1, y: 0 }, '-=1');

    // --- "FLOAT IN" ON SCROLL FOR SECTIONS ---
    const sections = document.querySelectorAll('section:not(.hero-section)');
    sections.forEach(section => {
        const animatableElements = section.querySelectorAll('.section-title, .subsection-heading, .wbyh-link, .testimonial-card, .ad-content, .lead-form, .testimonial-nav');
        
        gsap.from(animatableElements, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 60,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    // --- TESTIMONIALS SMOOTH SCROLL ANIMATION ---
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');
    const cards = gsap.utils.toArray('.testimonial-card');
    let currentIndex = 0;

    // Function to update the disabled state of the navigation buttons
    function updateNavButtons() {
        scrollLeftButton.disabled = currentIndex === 0;
        scrollRightButton.disabled = currentIndex === cards.length - 1;
    }
    
    // Function to smoothly scroll to a specific card index
    function goToCard(index) {
        if (index < 0 || index >= cards.length) return; // Boundary check

        // Use GSAP's ScrollToPlugin for a smooth animation
        gsap.to(testimonialsContainer, {
            duration: 0.8, // Animation duration in seconds
            scrollTo: {
                x: cards[index].offsetLeft - (testimonialsContainer.offsetLeft),
            },
            ease: 'power3.inOut' // A nice easing function for acceleration/deceleration
        });

        currentIndex = index;
        updateNavButtons();
    }

    if (testimonialsContainer && scrollLeftButton && scrollRightButton) {
        scrollRightButton.addEventListener('click', () => {
            goToCard(currentIndex + 1);
        });

        scrollLeftButton.addEventListener('click', () => {
            goToCard(currentIndex - 1);
        });

        // Initialize button states on load
        updateNavButtons();
    }
});