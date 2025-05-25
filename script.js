// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Hide loader after page loads
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create animated particles for hero background
    createParticles();
    
    // Create animated background dots
    createAnimatedBackground();
    
    // Create infinity loop for tech stack
    createInfinityLoop();
    
    // Enhanced Intersection Observer for scroll animations with different effects
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in-section, .slide-in-right, .slide-in-left, .zoom-in').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
    
    // Immediately trigger scroll animations for elements in viewport on load
    triggerInitialAnimations();
    
    // Add scroll event listener for manual animation triggering
    window.addEventListener('scroll', handleScrollAnimations);
});

// Function to trigger initial animations for elements in viewport
function triggerInitialAnimations() {
    setTimeout(() => {
        handleScrollAnimations();
        console.log('Initial animations triggered');
    }, 500);
}

// Function to handle scroll animations manually
function handleScrollAnimations() {
    const animatableElements = document.querySelectorAll('.fade-in-section:not(.is-visible), .slide-in-right:not(.is-visible), .slide-in-left:not(.is-visible), .zoom-in:not(.is-visible)');
    
    animatableElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (rect.top < windowHeight - 100) {
            element.classList.add('is-visible');
            console.log('Element animated:', element);
        }
    });
}

// Function to create animated particles in the hero background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random size between 50px and 150px
        const size = Math.random() * 100 + 50;
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Create animation with random duration
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.opacity = Math.random() * 0.2 + 0.1;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}

// Function to create animated background with moving dots
function createAnimatedBackground() {
    const backgroundContainer = document.getElementById('animated-background');
    const dotCount = 100; // Increased number of dots for more visibility
    
    // Clear any existing dots first
    backgroundContainer.innerHTML = '';
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random size between 5px and 40px (larger dots for more visibility)
        const size = Math.random() * 35 + 5;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Style the dot
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        
        // Explicitly set animation
        dot.style.animation = `floatDot ${duration}s ease-in-out infinite`;
        
        // Random delay
        dot.style.animationDelay = `${Math.random() * 5}s`;
        
        // Higher opacity for more visibility
        dot.style.opacity = Math.random() * 0.4 + 0.2;
        
        // Add to container
        backgroundContainer.appendChild(dot);
    }
    
    // Log to console for debugging
    console.log(`Created ${dotCount} animated background dots`);
}

// Function to create infinity loop for tech stack
function createInfinityLoop() {
    const infinityTrack = document.getElementById('infinity-track');
    
    // Expanded tech stack items with icons - including all technologies mentioned
    const techStack = [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Azure', icon: 'fab fa-microsoft' },
        { name: 'SQL', icon: 'fas fa-database' },
        { name: 'ETL', icon: 'fas fa-exchange-alt' },
        { name: 'Data Warehousing', icon: 'fas fa-server' },
        { name: 'Snowflake', icon: 'far fa-snowflake' },
        { name: 'Airflow', icon: 'fas fa-wind' },
        { name: 'Machine Learning', icon: 'fas fa-brain' },
        { name: 'AI', icon: 'fas fa-robot' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Jenkins', icon: 'fab fa-jenkins' },
        { name: 'Docker', icon: 'fab fa-docker' },
        { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
        { name: 'Oracle OCI', icon: 'fas fa-cloud' },
        { name: 'Bazel', icon: 'fas fa-tools' },
        { name: 'ThoughtSpot', icon: 'fas fa-lightbulb' },
        { name: 'OpenAI', icon: 'fas fa-brain' },
        { name: 'DevOps', icon: 'fas fa-infinity' },
        { name: 'Data Engineering', icon: 'fas fa-cogs' },
        { name: 'Harness', icon: 'fas fa-rocket' },
        { name: 'GitHub Actions', icon: 'fab fa-github-alt' },
        { name: 'SSIS', icon: 'fas fa-database' },
        { name: 'Data Migration', icon: 'fas fa-exchange-alt' },
        { name: 'Research', icon: 'fas fa-microscope' },
        { name: 'Big Data', icon: 'fas fa-chart-bar' },
        { name: 'Data Analytics', icon: 'fas fa-chart-line' },
        { name: 'Data Pipelines', icon: 'fas fa-stream' },
        { name: 'Cloud Computing', icon: 'fas fa-cloud-upload-alt' },
        { name: 'Microservices', icon: 'fas fa-cubes' }
    ];
    
    // Create three sets of tech items for seamless looping and to ensure full width coverage
    const createTechItems = () => {
        let html = '';
        techStack.forEach(tech => {
            html += `
                <div class="tech-item">
                    <i class="${tech.icon}"></i>${tech.name}
                </div>
            `;
        });
        return html;
    };
    
    // Add three sets of items to create the infinite loop effect and ensure full width
    infinityTrack.innerHTML = createTechItems() + createTechItems() + createTechItems();
    
    // Calculate the width of one set of items to set the animation properly
    const firstSetWidth = infinityTrack.scrollWidth / 3;
    infinityTrack.style.width = `${firstSetWidth * 3}px`;
    
    // Set the animation duration based on the number of items
    const animationDuration = techStack.length * 2; // 2 seconds per item
    infinityTrack.style.animationDuration = `${animationDuration}s`;
    
    // Add hover pause effect
    const infinityContainer = document.querySelector('.infinity-loop-container');
    infinityContainer.addEventListener('mouseenter', () => {
        infinityTrack.style.animationPlayState = 'paused';
    });
    
    infinityContainer.addEventListener('mouseleave', () => {
        infinityTrack.style.animationPlayState = 'running';
    });
    
    // Add initial visibility to hero section elements
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-in-section').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, index * 300);
        });
    }, 500);
    
    // Log to console for debugging
    console.log('Infinity loop created with animation duration:', animationDuration + 's');
}
