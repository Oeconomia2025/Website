// navigation.js

class NavigationManager {
  constructor() {
    this.mobileToggle = document.getElementById('mobileToggle');
    this.mobileNav = document.getElementById('mobileNav');
    this.mainNav = document.querySelector('.main-nav');
    this.pageActionBar = document.getElementById('pageActionBar');
    
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handlePageSpecificSetup();
    this.handleScrollEffects();
    this.simulateWalletConnection();
    this.handleActionTabs();
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.mobileNav.contains(e.target) && !this.mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Handle scroll events
    window.addEventListener('scroll', () => this.handleScroll());

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileToggle.classList.add('active');
    this.mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation to mobile nav content
    setTimeout(() => {
      const content = document.querySelector('.mobile-nav-content');
      if (content) {
        content.classList.add('fade-in-up');
      }
    }, 100);
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileToggle.classList.remove('active');
    this.mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    
    const content = document.querySelector('.mobile-nav-content');
    if (content) {
      content.classList.remove('fade-in-up');
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
      this.mainNav.classList.add('scrolled');
    } else {
      this.mainNav.classList.remove('scrolled');
    }

    // Hide/show navigation on scroll (optional)
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scrolling down
      this.mainNav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      this.mainNav.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 992 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  handleKeyboard(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  handlePageSpecificSetup() {
    // Show page action bar on specific pages
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('flowcharts.html')) {
      this.setupFlowChartsPage();
    }
  }

  setupFlowChartsPage() {
    if (this.pageActionBar) {
      this.pageActionBar.style.display = 'block';
      
      // Adjust main content top margin
      const container = document.querySelector('.container');
      if (container) {
        container.style.paddingTop = '180px'; // Adjust for nav + action bar
      }
    }
  }

  handleActionTabs() {
    const actionTabs = document.querySelectorAll('.action-tab');
    
    actionTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        actionTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Handle tab content switching (if needed)
        const tabType = tab.getAttribute('data-tab');
        this.switchTabContent(tabType);
      });
    });
  }

  switchTabContent(tabType) {
    // Handle tab content switching
    const sections = document.querySelectorAll('.section');
    
    switch (tabType) {
      case 'overview':
        // Show overview sections
        sections.forEach(section => {
          if (section.id === 'oeconomia') {
            section.style.display = 'block';
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        break;
      case 'protocols':
        // Show protocol sections
        sections.forEach(section => {
          if (['alluria', 'eloqura', 'artivya', 'iridescia'].includes(section.id)) {
            section.style.display = 'block';
          }
        });
        break;
    }
  }

  simulateWalletConnection() {
    const connectWalletBtns = document.querySelectorAll('#connectWallet');
    
    connectWalletBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleWalletConnection(btn);
      });
    });
  }

  handleWalletConnection(btn) {
    // Simulate wallet connection process
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    btn.disabled = true;
    
    setTimeout(() => {
      // Simulate successful connection
      btn.innerHTML = '<i class="fas fa-check"></i> Connected: 0x742d...35B1';
      btn.classList.remove('nav-btn-secondary');
      btn.classList.add('nav-btn-success');
      btn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
      
      // Show disconnect option after a few seconds
      setTimeout(() => {
        btn.addEventListener('click', () => {
          this.handleWalletDisconnection(btn, originalText);
        });
      }, 1000);
      
    }, 2000);
  }

  handleWalletDisconnection(btn, originalText) {
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.classList.remove('nav-btn-success');
    btn.classList.add('nav-btn-secondary');
    btn.style.background = '';
    
    // Re-enable connection handler
    setTimeout(() => {
      btn.addEventListener('click', () => {
        this.handleWalletConnection(btn);
      });
    }, 100);
  }

  // Public methods for external use
  showPageActionBar() {
    if (this.pageActionBar) {
      this.pageActionBar.style.display = 'block';
    }
  }

  hidePageActionBar() {
    if (this.pageActionBar) {
      this.pageActionBar.style.display = 'none';
    }
  }

  updateActionBarTitle(title) {
    const actionTitle = document.querySelector('.action-title');
    if (actionTitle) {
      actionTitle.textContent = title;
    }
  }

  // Utility methods
  smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = this.pageActionBar ? 180 : 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  addDropdownClickHandlers() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.closest('.nav-dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Toggle dropdown visibility
        menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
        menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
        menu.style.transform = menu.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
      });
    });
  }
}

// Launch app simulation
function simulateLaunchApp() {
  const launchBtns = document.querySelectorAll('#launchApp');
  
  launchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching...';
      btn.disabled = true;
      
      setTimeout(() => {
        // Simulate app launch
        btn.innerHTML = '<i class="fas fa-rocket"></i> Launched!';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const navigation = new NavigationManager();
  simulateLaunchApp();
  
  // Make navigation instance globally available
  window.navigationManager = navigation;
  
  // Add any page-specific initialization
  if (window.location.pathname.includes('flowcharts.html')) {
    navigation.updateActionBarTitle('Interactive Protocol Flow Charts');
  }
  
  // Highlight active navigation links
  navigation.highlightActiveNavLink();
  
  // Add click handlers for dropdown menus (mobile fallback)
  navigation.addDropdownClickHandlers();
  
  console.log('🚀 Enhanced Navigation System loaded successfully!');
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}

// Additional utility functions
function updatePageTitle(title) {
  document.title = `${title} - Oeconomia Protocol`;
  
  const actionTitle = document.querySelector('.action-title');
  if (actionTitle) {
    actionTitle.textContent = title;
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: rgba(15, 15, 15, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
    border-radius: 8px;
    padding: 1rem;
    color: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
    z-index: 1002;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add notification animations to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-content i {
    font-size: 1.2rem;
  }
`;
document.head.appendChild(notificationStyles);