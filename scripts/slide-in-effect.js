// Updated slide-in-effect.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Slide-in effect initialized - checking for slide-out transition');
    
    const currentHash = window.location.hash;
    console.log(`Page loaded with hash: ${currentHash}`);
    
    // Get all sections that should slide in
    const sectionsToSlide = [
        document.querySelector('nav'),
        document.querySelector('.hero'),
        document.querySelector('.tokenomics-section'),
        document.querySelector('.how-to-buy-section'), 
        document.querySelector('.roadmap-section'),
        document.querySelector('.footer'),
        document.querySelector('#threejs-background')
    ].filter(section => section !== null);
    
    // Position elements off-screen to the RIGHT
    sectionsToSlide.forEach((section) => {
        if (section) {
            section.style.transform = 'translateX(100vw)';
            section.style.opacity = '0';
        }
    });
    
    // Function to start slide-in animation
    function startSlideInAnimation() {
        console.log('Starting slide-in animation');
        
        // Check if we have a hash in the URL
        if (currentHash && currentHash !== '#home') {
            document.body.classList.add('direct-hash-nav');
        }
        
        document.body.classList.add('slide-in-active');
        
        setTimeout(() => {
            document.body.classList.add('slide-in-complete');
            console.log('Slide-in complete');
            
            // Remove direct-hash-nav class after animation completes
            if (document.body.classList.contains('direct-hash-nav')) {
                setTimeout(() => {
                    document.body.classList.remove('direct-hash-nav');
                }, 1000);
            }
        }, 2500);
    }
    
    // Calculate delay based on how we arrived
    let animationDelay;
    const cameFromIndex = document.referrer.includes('index.html') || 
                         document.referrer.endsWith('/') ||
                         window.performance?.navigation?.type === 0;
    
    if (cameFromIndex) {
        // Coming from index.html - wait for slide-out to complete visually
        animationDelay = 600;
        console.log('Coming from index.html - using extended transition delay');
    } else {
        // Direct navigation/refresh - start sooner but still let browser settle
        animationDelay = currentHash && currentHash !== '#home' ? 100 : 50;
        console.log('Direct navigation - using shorter delay');
    }
    
    // Start animation with calculated delay
    setTimeout(() => {
        startSlideInAnimation();
    }, animationDelay);
});

// Handle back navigation (keep existing code)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log('Page restored from cache');
        
        const sectionsToReset = [
            document.querySelector('nav'),
            document.querySelector('.hero'),
            document.querySelector('.tokenomics-section'),
            document.querySelector('.how-to-buy-section'), 
            document.querySelector('.roadmap-section'),
            document.querySelector('.footer'),
            document.querySelector('#threejs-background')
        ].filter(section => section !== null);
        
        sectionsToReset.forEach(section => {
            if (section) {
                section.style.transform = 'translateX(100vw)';
                section.style.opacity = '0';
            }
        });
        
        document.body.classList.remove('slide-in-active', 'slide-in-complete', 'direct-hash-nav');
        
        setTimeout(() => {
            document.body.classList.add('slide-in-active');
            setTimeout(() => {
                document.body.classList.add('slide-in-complete');
            }, 2500);
        }, 50);
    }
});