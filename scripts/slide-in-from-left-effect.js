// SIMPLE SLIDE-IN FROM LEFT - Fixed to not interfere with sticky nav
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Simple slide-in from LEFT effect initialized');
    
    // Check if we're coming from tokeninfo page
    const slideFromLeft = sessionStorage.getItem('slideFromLeft');
    const cameFromTokenInfo = document.referrer.includes('test.html') || 
                             document.referrer.includes('tokeninfo') ||
                             slideFromLeft === 'true';
    
    if (!cameFromTokenInfo) {
        console.log('ℹ️ Not coming from token info page - using normal load');
        return;
    }
    
    console.log('✅ Coming from token info page - using LEFT slide-in animation');
    
    // Clear the flag
    sessionStorage.removeItem('slideFromLeft');
    
    // Create a wrapper for the animation instead of using body
    const pageWrapper = document.createElement('div');
    pageWrapper.id = 'page-animation-wrapper';
    
    // Move all body content into the wrapper
    while (document.body.firstChild) {
        pageWrapper.appendChild(document.body.firstChild);
    }
    
    // Add wrapper to body
    document.body.appendChild(pageWrapper);
    
    // Apply styles to wrapper instead of body
    pageWrapper.style.transform = 'translateX(-100vw)';
    pageWrapper.style.opacity = '0';
    pageWrapper.style.width = '100%';
    pageWrapper.style.height = '100%';
    
    // Prevent scroll during animation
    document.body.style.overflow = 'hidden';
    
    console.log('🎯 Page positioned off-screen LEFT using wrapper');
    
    // Function to start slide-in animation from LEFT
    function startSlideInFromLeft() {
        console.log('🎬 Starting slide-in from LEFT animation');
        
        // Apply transition and slide in
        pageWrapper.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease';
        pageWrapper.style.transform = 'translateX(0)'; // Slide to normal position
        pageWrapper.style.opacity = '1'; // Fade in
        
        // Clean up after animation completes
        setTimeout(() => {
            // Move content back to body
            while (pageWrapper.firstChild) {
                document.body.appendChild(pageWrapper.firstChild);
            }
            
            // Remove the wrapper
            if (pageWrapper.parentNode) {
                pageWrapper.parentNode.removeChild(pageWrapper);
            }
            
            // Restore body overflow
            document.body.style.overflow = '';
            
            console.log('✅ Slide-in from LEFT complete and wrapper removed');
        }, 1200);
    }
    
    // Start animation after a short delay to ensure DOM is ready
    setTimeout(() => {
        startSlideInFromLeft();
    }, 100);
    
    // Debug functions
    window.testSlideInLeft = function() {
        console.log('🧪 Testing slide-in from LEFT');
        
        // Create wrapper if it doesn't exist
        let wrapper = document.getElementById('page-animation-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.id = 'page-animation-wrapper';
            
            // Move content to wrapper
            while (document.body.firstChild) {
                wrapper.appendChild(document.body.firstChild);
            }
            document.body.appendChild(wrapper);
        }
        
        // Reset and test
        wrapper.style.transition = '';
        wrapper.style.transform = 'translateX(-100vw)';
        wrapper.style.opacity = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            wrapper.style.transition = 'transform 1s ease, opacity 1s ease';
            wrapper.style.transform = 'translateX(0)';
            wrapper.style.opacity = '1';
            
            setTimeout(() => {
                // Move content back
                while (wrapper.firstChild) {
                    document.body.appendChild(wrapper.firstChild);
                }
                if (wrapper.parentNode) {
                    wrapper.parentNode.removeChild(wrapper);
                }
                document.body.style.overflow = '';
            }, 1200);
        }, 100);
    };
    
    window.resetSlideInLeft = function() {
        console.log('🔄 Resetting slide-in LEFT');
        
        // Remove wrapper if it exists and move content back
        const wrapper = document.getElementById('page-animation-wrapper');
        if (wrapper) {
            while (wrapper.firstChild) {
                document.body.appendChild(wrapper.firstChild);
            }
            if (wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
        }
        
        // Reset body styles
        document.body.style.overflow = '';
        document.body.style.transform = '';
        document.body.style.opacity = '';
        document.body.style.transition = '';
    };
    
    console.log('🎉 Simple slide-in from LEFT ready!');
    console.log('🔧 Test commands:');
    console.log('   testSlideInLeft() - Test the slide-in effect');
    console.log('   resetSlideInLeft() - Reset if stuck');
});

// Handle back navigation for LEFT slide
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log('🔄 Page restored from cache - checking for LEFT slide');
        
        // If we came from token info originally, re-apply the animation
        const slideFromLeft = sessionStorage.getItem('slideFromLeft');
        if (slideFromLeft === 'true') {
            console.log('🎬 Re-applying slide-in from LEFT after back navigation');
            
            // Clear flag
            sessionStorage.removeItem('slideFromLeft');
            
            // Create wrapper
            const pageWrapper = document.createElement('div');
            pageWrapper.id = 'page-animation-wrapper';
            
            // Move content to wrapper
            while (document.body.firstChild) {
                pageWrapper.appendChild(document.body.firstChild);
            }
            document.body.appendChild(pageWrapper);
            
            // Apply initial styles
            pageWrapper.style.transform = 'translateX(-100vw)';
            pageWrapper.style.opacity = '0';
            pageWrapper.style.width = '100%';
            pageWrapper.style.height = '100%';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                pageWrapper.style.transition = 'transform 1s ease, opacity 1s ease';
                pageWrapper.style.transform = 'translateX(0)';
                pageWrapper.style.opacity = '1';
                
                setTimeout(() => {
                    // Clean up
                    while (pageWrapper.firstChild) {
                        document.body.appendChild(pageWrapper.firstChild);
                    }
                    if (pageWrapper.parentNode) {
                        pageWrapper.parentNode.removeChild(pageWrapper);
                    }
                    document.body.style.overflow = '';
                }, 1200);
            }, 100);
        } else {
            // Make sure no wrapper is lingering and reset body styles
            const wrapper = document.getElementById('page-animation-wrapper');
            if (wrapper) {
                while (wrapper.firstChild) {
                    document.body.appendChild(wrapper.firstChild);
                }
                if (wrapper.parentNode) {
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            
            // Reset all body styles
            document.body.style.transition = '';
            document.body.style.transform = '';
            document.body.style.opacity = '';
            document.body.style.overflow = '';
        }
    }
});