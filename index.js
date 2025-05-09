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

    // Audio player customization
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.volume = 0.7; // Set default volume
    });

    // Adding visual effect to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            this.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        });
    }
    
    // Create cursor follower element
    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);
    
    // Cursor follower animation
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Make cursor larger when hovering over interactive elements
        const isOverInteractive = e.target.tagName === 'A' || 
                                  e.target.tagName === 'BUTTON' || 
                                  e.target.closest('a') || 
                                  e.target.closest('button');
        
        if (isOverInteractive) {
            follower.style.width = '60px';
            follower.style.height = '60px';
        } else {
            follower.style.width = '40px';
            follower.style.height = '40px';
        }
    });
    
    // Psychedelic effect - change colors
    let hue = 0;
    function updateCursorFollower() {
        // Smooth follow with easing
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        // Update position
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        // Psychedelic color effect
        hue = (hue + 1) % 360;
        follower.style.background = `radial-gradient(circle, 
            hsla(${hue}, 100%, 50%, 0.5) 0%, 
            hsla(${(hue + 180) % 360}, 100%, 50%, 0.5) 100%)`;
        
        requestAnimationFrame(updateCursorFollower);
    }
    
    updateCursorFollower();
});
