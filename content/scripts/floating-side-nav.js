// Floating Side Navigation JavaScript
(function() {
    'use strict';
    
    // Initialize navigation when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initFloatingNav();
        setActiveNavItem();
        handleNavInteractions();
    });

    function initFloatingNav() {
        var nav = document.querySelector('.floating-nav');
        var trigger = document.querySelector('.floating-nav-trigger');
        var overlay = document.querySelector('.floating-nav-overlay');
        
        if (!nav || !trigger) {
            console.log('Floating nav elements not found');
            return;
        }

        // Toggle navigation
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            toggleNav();
        });

        // Close nav when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', function() {
                closeNav();
            });
        }

        // Close nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                closeNav();
            }
        });

        // Handle nav item clicks
        var navItems = document.querySelectorAll('.floating-nav-item');
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener('click', function(e) {
                // Don't close nav if it's an external link
                if (this.target !== '_blank') {
                    setTimeout(function() {
                        closeNav();
                    }, 150);
                }
            });
        }
    }

    function toggleNav() {
        var nav = document.querySelector('.floating-nav');
        var trigger = document.querySelector('.floating-nav-trigger');
        var overlay = document.querySelector('.floating-nav-overlay');
        
        if (nav.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    }

    function openNav() {
        var nav = document.querySelector('.floating-nav');
        var trigger = document.querySelector('.floating-nav-trigger');
        var overlay = document.querySelector('.floating-nav-overlay');
        
        nav.classList.add('open');
        trigger.classList.add('active');
        
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Prevent body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
        
        // Trigger entrance animations
        setTimeout(function() {
            var items = nav.querySelectorAll('.floating-nav-item');
            for (var i = 0; i < items.length; i++) {
                items[i].style.animationDelay = (i * 0.05) + 's';
            }
        }, 100);
    }

    function closeNav() {
        var nav = document.querySelector('.floating-nav');
        var trigger = document.querySelector('.floating-nav-trigger');
        var overlay = document.querySelector('.floating-nav-overlay');
        
        nav.classList.remove('open');
        trigger.classList.remove('active');
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    function setActiveNavItem() {
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop().toLowerCase();
        
        // Remove .html extension for comparison
        currentPage = currentPage.replace('.html', '');
        
        var navItems = document.querySelectorAll('.floating-nav-item');
        
        for (var i = 0; i < navItems.length; i++) {
            var item = navItems[i];
            var href = item.getAttribute('href');
            
            if (href) {
                var linkPage = href.split('/').pop().toLowerCase().replace('.html', '');
                
                // Check for exact matches or partial matches
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index') ||
                    (currentPage === 'index' && linkPage === '') ||
                    href.indexOf(currentPage) !== -1) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        }
    }

    function handleNavInteractions() {
        // Add hover effects for better UX
        var navItems = document.querySelectorAll('.floating-nav-item');
        
        for (var i = 0; i < navItems.length; i++) {
            var item = navItems[i];
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        }
        
        // Handle window resize
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                var nav = document.querySelector('.floating-nav');
                if (nav && nav.classList.contains('open') && window.innerWidth > 768) {
                    document.body.style.overflow = '';
                }
            }, 250);
        });
    }

    // Update notification badges (can be called from external scripts)
    window.updateNavBadge = function(navItemId, count) {
        var item = document.querySelector('[data-nav-id="' + navItemId + '"]');
        if (!item) return;
        
        var badge = item.querySelector('.floating-nav-item-badge');
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'floating-nav-item-badge';
                item.appendChild(badge);
            }
            badge.textContent = count > 99 ? '99+' : count.toString();
        } else if (badge) {
            badge.remove();
        }
    };

    // Add notification dot (can be called from external scripts)
    window.addNavNotification = function(navItemId) {
        var item = document.querySelector('[data-nav-id="' + navItemId + '"]');
        if (!item) return;
        
        var dot = item.querySelector('.notification-dot');
        if (!dot) {
            dot = document.createElement('span');
            dot.className = 'notification-dot';
            item.appendChild(dot);
        }
    };

    // Remove notification dot
    window.removeNavNotification = function(navItemId) {
        var item = document.querySelector('[data-nav-id="' + navItemId + '"]');
        if (!item) return;
        
        var dot = item.querySelector('.notification-dot');
        if (dot) {
            dot.remove();
        }
    };

    // Public API for external control
    window.FloatingNav = {
        open: openNav,
        close: closeNav,
        toggle: toggleNav,
        updateBadge: window.updateNavBadge,
        addNotification: window.addNavNotification,
        removeNotification: window.removeNavNotification
    };

    console.log('Floating Navigation initialized successfully');
})();