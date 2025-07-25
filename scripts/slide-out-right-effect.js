// SIMPLE SLIDE-RIGHT + FADE-OUT - Pure JavaScript, no CSS conflicts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Simple slide-right + fade effect initialized');
    
    setTimeout(() => {
        // Find the Main Site link
        let mainSiteLink = document.querySelector('a[href="index.html"]');
        
        if (!mainSiteLink) {
            const allLinks = document.querySelectorAll('a');
            for (let link of allLinks) {
                if (link.textContent.includes('Main Site')) {
                    mainSiteLink = link;
                    break;
                }
            }
        }
        
        if (!mainSiteLink) {
            console.warn('❌ No Main Site link found');
            return;
        }
        
        console.log('✅ Found Main Site link');
        
        function slideRightAndFade(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎬 Starting slide-right + fade-out');
            
            // Prevent scrolling during animation
            document.body.style.overflow = 'hidden';
            
            // Get the main container or use body
            const container = document.body;
            
            // Apply transition and slide right + fade
            container.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease';
            container.style.transform = 'translateX(100vw)'; // Slide entire page right
            container.style.opacity = '0'; // Fade out
            
            console.log('🎯 Applied slide-right transform and fade');
            
            // Optional: Add a subtle loading overlay during transition
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(102, 126, 234, 0.1);
                z-index: 9998;
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(overlay);
            
            // Fade in overlay slightly
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 200);
            
            // Navigate after animation completes
            setTimeout(() => {
                console.log('🏁 Animation complete - navigating to index.html');
                sessionStorage.setItem('slideFromLeft', 'true');
                window.location.href = 'index.html';
            }, 1200); // Wait for slide + fade to complete
        }
        
        // Add click listener
        mainSiteLink.addEventListener('click', slideRightAndFade);
        
        // Debug function
        window.testSlideRightFade = function() {
            console.log('🧪 Testing slide-right + fade');
            mainSiteLink.click();
        };
        
        // Reset function for testing
        window.resetSlideRightFade = function() {
            console.log('🔄 Resetting slide-right + fade');
            document.body.style.transition = '';
            document.body.style.transform = '';
            document.body.style.opacity = '';
            document.body.style.overflow = '';
            
            // Remove any overlay
            const overlay = document.querySelector('div[style*="position: fixed"]');
            if (overlay) overlay.remove();
        };
        
        console.log('✅ Simple slide-right + fade ready!');
        console.log('🔧 Test commands:');
        console.log('   testSlideRightFade() - Test the effect');
        console.log('   resetSlideRightFade() - Reset if stuck');
        
    }, 100);
});

// Handle back navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log('🔄 Page restored - resetting body styles');
        document.body.style.transition = '';
        document.body.style.transform = '';
        document.body.style.opacity = '';
        document.body.style.overflow = '';
    }
});