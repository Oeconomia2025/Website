// Fixed Slide Out Effect JavaScript - Preserve Hash Navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Slide out effect initialized');
    
    // Find ALL tokeninfo links (with or without hash)
    const tokenInfoLinks = document.querySelectorAll('a[href^="tokeninfo"]');
    
    if (tokenInfoLinks.length === 0) {
        console.warn('No tokeninfo links found');
        return;
    }
    
    console.log(`Found ${tokenInfoLinks.length} tokeninfo link(s)`);
    
    // Get all sections that should slide out
    const sectionsToSlide = [
        document.querySelector('nav'),
        document.querySelector('.hero'),
        document.querySelector('.features'),
        document.querySelector('.products'),
        document.querySelector('.blockchain-networks'),
        document.querySelector('.cta'),
        document.querySelector('#threejs-background')
    ].filter(section => section !== null);
    
    console.log(`Found ${sectionsToSlide.length} sections to animate`);
    
    // Function to trigger the slide out animation
    function triggerSlideOut(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // CRITICAL: Get the original href with hash
        const targetHref = e.currentTarget.getAttribute('href');
        console.log(`tokeninfo link clicked: ${targetHref} - starting slide out animation`);
        
        // Close any open dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Prevent scrolling during animation
        document.body.classList.add('slide-out-active');
        
        // Add slide out class to all sections with stagger effect
        sectionsToSlide.forEach((section, index) => {
            if (section) {
                setTimeout(() => {
                    section.classList.add('slide-out-left');
                    console.log(`Sliding out section ${index + 1}: ${section.tagName}`);
                }, index * 25);
            }
        });
        
        // Navigate to the ORIGINAL href (preserving hash) after animation completes
        setTimeout(() => {
            console.log(`Animation complete - navigating to ${targetHref}`);
            window.location.href = targetHref; // Use original href, not hardcoded!
        }, 600);
    }
    
    // Add click event listener to ALL tokeninfo links
    tokenInfoLinks.forEach((link, index) => {
        const linkHref = link.getAttribute('href');
        console.log(`Setting up listener for tokeninfo link ${index + 1}: ${linkHref}`);
        link.addEventListener('click', triggerSlideOut);
        
        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Debug function
    window.triggerSlideOut = function() {
        if (tokenInfoLinks.length > 0) {
            tokenInfoLinks[0].click();
        }
    };
    
    console.log('Slide out effect ready! You can test with: triggerSlideOut()');
});

// Handle back navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log('Page restored from cache - resetting animations');
        // Reset all animations if user navigates back
        document.body.classList.remove('slide-out-active');
        document.querySelectorAll('.slide-out-left').forEach(element => {
            element.classList.remove('slide-out-left');
        });
    }
});