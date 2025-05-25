// Mouse-responsive abstract animation overlay
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element for the animation
    const canvas = document.createElement('canvas');
    canvas.id = 'mouse-animation-overlay';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    canvas.style.zIndex = '1'; // Above background but below content
    canvas.style.opacity = '0.7';
    document.body.appendChild(canvas);

    // Set canvas size
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Variables for animation
    let mouseX = width / 2;
    let mouseY = height / 2;
    let particles = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseRadius = 200;

    // Colors
    const primaryColor = '#4f46e5'; // Indigo
    const accentColor = '#06b6d4';  // Cyan

    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.25, // 50% slower
                speedY: (Math.random() - 0.5) * 0.25, // 50% slower
                color: Math.random() > 0.5 ? primaryColor : accentColor
            });
        }
    }

    // Update mouse position
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;

            // Boundary check
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;

            // Mouse interaction - particles are attracted to mouse position
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseRadius - distance) / mouseRadius;
                
                p.speedX += forceDirectionX * force * 0.02;
                p.speedY += forceDirectionY * force * 0.02;
                
                // Limit speed
                const maxSpeed = 1.5;
                const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
                if (currentSpeed > maxSpeed) {
                    p.speedX = (p.speedX / currentSpeed) * maxSpeed;
                    p.speedY = (p.speedY / currentSpeed) * maxSpeed;
                }
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = 1 - (distance / connectionDistance);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Draw mouse connection area
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.fill();

        // Draw mouse radius (subtle glow)
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, mouseRadius);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.1)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, mouseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        requestAnimationFrame(animate);
    }

    // Initialize
    createParticles();
    animate();

    // Log to console for debugging
    console.log('Mouse-responsive abstract animation overlay initialized');
    
    // Enhance background dots to respond to mouse movements
    enhanceBackgroundDots();
});

// Function to enhance background dots with mouse interaction
function enhanceBackgroundDots() {
    // Wait for the background dots to be created
    setTimeout(() => {
        const backgroundContainer = document.getElementById('animated-background');
        const dots = backgroundContainer.querySelectorAll('.dot');
        
        if (dots.length === 0) {
            console.log('No background dots found, retrying...');
            enhanceBackgroundDots();
            return;
        }
        
        console.log(`Enhancing ${dots.length} background dots with mouse interaction`);
        
        // Add mouse move event listener
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // For each dot, check if mouse is near and apply effect
            dots.forEach(dot => {
                const rect = dot.getBoundingClientRect();
                const dotX = rect.left + rect.width / 2;
                const dotY = rect.top + rect.height / 2;
                
                // Calculate distance between mouse and dot
                const dx = mouseX - dotX;
                const dy = mouseY - dotY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If mouse is close to dot, apply repulsion effect
                if (distance < 150) {
                    // Calculate repulsion force (stronger when closer)
                    const force = 1 - (distance / 150);
                    
                    // Calculate repulsion direction (away from mouse)
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    
                    // Apply transform to move dot away from mouse
                    const moveX = -directionX * force * 50;
                    const moveY = -directionY * force * 50;
                    
                    // Apply scale effect (grow slightly when mouse is near)
                    const scale = 1 + force * 0.5;
                    
                    // Apply transform with transition for smooth effect
                    dot.style.transition = 'transform 0.3s ease-out';
                    dot.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
                    
                    // Change opacity for visual effect
                    dot.style.opacity = Math.min(0.8, parseFloat(dot.style.opacity) + force * 0.3);
                } else {
                    // Reset transform when mouse is far away
                    dot.style.transition = 'transform 1s ease-out';
                    dot.style.transform = '';
                }
            });
        });
        
        console.log('Background dots enhanced with mouse interaction');
    }, 1000); // Wait for dots to be created
}
