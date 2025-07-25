// SIMPLE SLIDE-IN FROM LEFT - Pure JavaScript, no CSS conflicts
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
    
    // Immediately position page off-screen to the LEFT
    document.body.style.transform = 'translateX(-100vw)';
    document.body.style.opacity = '0';
    document.body.style.overflow = 'hidden'; // Prevent scroll during animation
    
    console.log('🎯 Page positioned off-screen LEFT');
    
    // Function to start slide-in animation from LEFT
    function startSlideInFromLeft() {
        console.log('🎬 Starting slide-in from LEFT animation');
        
        // Apply transition and slide in
        document.body.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease';
        document.body.style.transform = 'translateX(0)'; // Slide to normal position
        document.body.style.opacity = '1'; // Fade in
        
        // Clean up after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
            document.body.style.overflow = '';
            console.log('✅ Slide-in from LEFT complete');
        }, 1200);
    }
    
    // Start animation after a short delay to ensure DOM is ready
    setTimeout(() => {
        startSlideInFromLeft();
    }, 100);
    
    // Debug functions
    window.testSlideInLeft = function() {
        console.log('🧪 Testing slide-in from LEFT');
        
        // Reset and test
        document.body.style.transition = '';
        document.body.style.transform = 'translateX(-100vw)';
        document.body.style.opacity = '0';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.body.style.transition = 'transform 1s ease, opacity 1s ease';
            document.body.style.transform = 'translateX(0)';
            document.body.style.opacity = '1';
            
            setTimeout(() => {
                document.body.style.transition = '';
                document.body.style.overflow = '';
            }, 1200);
        }, 100);
    };
    
    window.resetSlideInLeft = function() {
        console.log('🔄 Resetting slide-in LEFT');
        document.body.style.transition = '';
        document.body.style.transform = '';
        document.body.style.opacity = '';
        document.body.style.overflow = '';
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
            
            // Reset styles
            document.body.style.transition = '';
            document.body.style.transform = 'translateX(-100vw)';
            document.body.style.opacity = '0';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                document.body.style.transition = 'transform 1s ease, opacity 1s ease';
                document.body.style.transform = 'translateX(0)';
                document.body.style.opacity = '1';
                
                setTimeout(() => {
                    document.body.style.transition = '';
                    document.body.style.overflow = '';
                }, 1200);
            }, 100);
        } else {
            // Just reset any stuck styles
            document.body.style.transition = '';
            document.body.style.transform = '';
            document.body.style.opacity = '';
            document.body.style.overflow = '';
        }
    }
});