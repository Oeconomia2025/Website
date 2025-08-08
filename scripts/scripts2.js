// Mobile Menu Functionality for tokeninfo.html
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    const nav = document.querySelector('nav');
    
    // Create mobile menu container
    function createMobileMenu() {
        // Check if mobile menu already exists
        if (document.querySelector('.mobile-menu')) return;
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-content">
                <ul class="mobile-nav-links">
                    <li><a href="#home">Top</a></li>
                    <li><a href="#tokenomics">Tokenomics</a></li>
                    <li><a href="#how-to-buy">How to Buy</a></li>
                    <li><a href="#roadmap-section">Roadmap</a></li>
                    <li><a href="#footer">More</a></li>
                    <li><a href="../">Main Site</a></li>
                </ul>
                <div class="mobile-nav-buttons">
                    <a href="https://oeconomia.io/" target="_blank" rel="noopener noreferrer">
                        <button class="dapp-btn" onclick="launchDApp()">Launch DApp</button>
                    </a>
                </div>
            </div>
        `;
        
        // Insert after nav
        nav.parentNode.insertBefore(mobileMenu, nav.nextSibling);
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    const mobileMenu = document.querySelector('.mobile-menu');
    let isMenuOpen = false;
    
    // Toggle menu function
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Restore scroll
        }
    }
    
    // Add click event to hamburger button
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close menu on window resize if going back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });
});
