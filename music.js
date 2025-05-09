document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Hero Section Interaction
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `translateZ(50px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            
            this.style.backgroundPosition = `calc(50% + ${moveX * 2}px) calc(50% + ${moveY * 2}px)`;
        });
        
        hero.addEventListener('mouseleave', function() {
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
            this.style.backgroundPosition = '50% 50%';
        });
    }
    
    // Create enhanced cursor effects
    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);
    
    // Create cursor trail elements
    const numTrails = 7;
    const trails = [];
    
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.opacity = 0.7 - (i * 0.1);
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    // Enhanced cursor follower animation
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Detect if over interactive elements for special cursor effects
        const isOverInteractive = e.target.tagName === 'A' || 
                                  e.target.tagName === 'BUTTON' || 
                                  e.target.closest('a') || 
                                  e.target.closest('button') ||
                                  e.target.closest('.gallery-item') ||
                                  e.target.closest('.album');
        
        if (isOverInteractive) {
            follower.style.width = '70px';
            follower.style.height = '70px';
            follower.style.mixBlendMode = 'plus-lighter';
        } else {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.mixBlendMode = 'screen';
        }
    });
    
    // Psychedelic cursor trail animation
    let hue = 0;
    function updateCursorEffects() {
        // Smooth follower movement with easing
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        // Update main follower position
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        // Update trail positions with delay
        trails.forEach((trail, index) => {
            trail.x += (mouseX - trail.x) * (0.1 - index * 0.01);
            trail.y += (mouseY - trail.y) * (0.1 - index * 0.01);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });
        
        // Psychedelic color effect
        hue = (hue + 1) % 360;
        follower.style.background = `radial-gradient(circle, 
            hsla(${hue}, 100%, 60%, 0.7) 0%, 
            hsla(${(hue + 180) % 360}, 100%, 60%, 0.5) 100%)`;
        
        trails.forEach((trail, index) => {
            const trailHue = (hue + index * 30) % 360;
            trail.element.style.background = `radial-gradient(circle, 
                hsla(${trailHue}, 100%, 60%, 0.5) 0%, 
                hsla(${(trailHue + 180) % 360}, 100%, 60%, 0.3) 100%)`;
        });
        
        requestAnimationFrame(updateCursorEffects);
    }
    
    updateCursorEffects();
    
    // 3D hover effect for albums and gallery items
    const tiltElements = document.querySelectorAll('.album, .gallery-item');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            this.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) scale(1.05)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Audio visualizer for music players
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio, audioIndex) => {
        audio.volume = 0.7; // Set default volume
        
        // Create audio context and analyzer
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const analyzer = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);
        
        analyzer.fftSize = 64;
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Create visualizer container
        const visualizerContainer = document.createElement('div');
        visualizerContainer.classList.add('visualizer-container');
        audio.parentNode.appendChild(visualizerContainer);
        
        // Create visualizer bars
        const bars = [];
        for (let i = 0; i < bufferLength; i++) {
            const bar = document.createElement('div');
            bar.classList.add('visualizer-bar');
            visualizerContainer.appendChild(bar);
            bars.push(bar);
        }
        
        // Update visualizer when audio plays
        function updateVisualizer() {
            if (audio.paused) {
                requestAnimationFrame(updateVisualizer);
                return;
            }
            
            analyzer.getByteFrequencyData(dataArray);
            
            bars.forEach((bar, index) => {
                const barHeight = dataArray[index] / 255 * 50;
                bar.style.height = barHeight + 'px';
                
                // Color based on frequency
                const hue = 270 - (barHeight * 2);
                bar.style.background = `linear-gradient(to top, 
                    hsl(${hue}, 100%, 50%), 
                    hsl(${hue + 40}, 100%, 70%))`;
            });
            
            requestAnimationFrame(updateVisualizer);
        }
        
        updateVisualizer();
        
        // Start audio context when user interacts with player
        audio.addEventListener('play', function() {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        });
    });
    
    // Interactive gallery with modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const modalImage = document.createElement('img');
    modalContent.appendChild(modalImage);
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerHTML = '×';
    
    modalOverlay.appendChild(modalContent);
    modalOverlay.appendChild(closeButton);
    document.body.appendChild(modalOverlay);
    
    // Open modal when clicking gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImage.src = imgSrc;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal handlers
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add floating animation to various elements
    const floatingElements = document.querySelectorAll('.album h3, .about-content h3, .tour-date .date');
    floatingElements.forEach(el => {
        el.classList.add('floating');
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // This would typically be sent to a server
                alert('Thanks for subscribing to the Psychedelic Flies newsletter!');
                emailInput.value = '';
            }
        });
    }
});
