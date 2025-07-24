// Section navigation functionality for about.html
class SectionNavigator {
    constructor() {
        // Only sections that exist in about.html
        this.sections = ['home', 'tokenomics', 'how-to-buy', 'roadmap-section', 'footer']; 
        this.currentSectionIndex = 0;
        this.prevBtn = null;
        this.nextBtn = null;
        this.isScrolling = false;
        this.initialized = false;

        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            // DOM is already loaded, but wait a bit for other scripts
            setTimeout(() => this.setup(), 100);
        }
    }

    setup() {
        // Find navigation buttons
        this.prevBtn = document.getElementById('prevSectionBtn');
        this.nextBtn = document.getElementById('nextSectionBtn');

        // Check if buttons exist
        if (!this.prevBtn || !this.nextBtn) {
            console.error('Section navigation buttons not found in DOM');
            // Try again after a delay in case they're created later
            setTimeout(() => this.setup(), 500);
            return;
        }

        console.log('About page section navigator buttons found, initializing...');

        // Filter sections to only include ones that actually exist
        this.sections = this.sections.filter(sectionId => {
            const exists = document.getElementById(sectionId) !== null;
            if (!exists) {
                console.warn(`Section ${sectionId} not found in DOM`);
            }
            return exists;
        });

        console.log('Active sections for about page:', this.sections);

        // Show buttons after a brief delay
        setTimeout(() => {
            this.prevBtn.classList.add('show');
            this.nextBtn.classList.add('show');
        }, 1000);

        // Add event listeners for navigation buttons
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToSection('prev');
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToSection('next');
        });

        // Setup smooth scrolling for navbar links
        this.setupSmoothScrolling();

        // Update current section on scroll with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                if (!this.isScrolling) {
                    this.updateCurrentSection();
                }
            }, 100);
        });

        // Initial state - detect current section on load
        setTimeout(() => {
            this.updateCurrentSection();
            this.initialized = true;
        }, 500);

        console.log('About page section navigator initialized successfully');
    }

    // Setup smooth scrolling for navbar links
    setupSmoothScrolling() {
        // Handle all anchor links with smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                
                // Skip empty links
                if (!targetId) return;
                
                console.log('Navbar click on about page:', targetId);
                this.smoothScrollToTarget(targetId);
            });
        });
    }

    // Smooth scroll function
    smoothScrollToTarget(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) {
            console.warn(`Target section ${targetId} not found`);
            return;
        }

        console.log('Scrolling to:', targetId);
        this.isScrolling = true;

        // Section-specific offsets for about page
const sectionOffsets = {
    'home': 0,           // Scroll all the way to top
    'tokenomics': -2,      // Better positioning for tokenomics
    'how-to-buy': 24,       // Adjust for navbar
    'roadmap-section': 20,          // roadmap-section staRs the same
    'footer': 0             // Footer stays the same
};

        const scrollOffset = sectionOffsets[targetId] || 0; // Default offset
        const targetPosition = targetSection.offsetTop - scrollOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update current section index if this target is in our sections array
        const sectionIndex = this.sections.indexOf(targetId);
        if (sectionIndex !== -1) {
            this.currentSectionIndex = sectionIndex;
        }

        // Re-enable scroll detection after animation
        setTimeout(() => {
            this.isScrolling = false;
            this.updateButtons();
        }, 1000);
    }

    updateCurrentSection() {
        if (this.isScrolling || !this.initialized) return;

        const scrollPosition = window.scrollY + 150; // Offset for better detection
        let newIndex = 0;
        
        for (let i = 0; i < this.sections.length; i++) {
            const section = document.getElementById(this.sections[i]);
            if (section) {
                const sectionTop = section.offsetTop;
                
                if (scrollPosition >= sectionTop) {
                    newIndex = i;
                }
            }
        }

        if (newIndex !== this.currentSectionIndex) {
            this.currentSectionIndex = newIndex;
            this.updateButtons();
        }
    }

    navigateToSection(direction) {
        if (this.isScrolling) return;

        let targetIndex = this.currentSectionIndex;
        
        if (direction === 'next' && this.currentSectionIndex < this.sections.length - 1) {
            targetIndex = this.currentSectionIndex + 1;
        } else if (direction === 'prev' && this.currentSectionIndex > 0) {
            targetIndex = this.currentSectionIndex - 1;
        }

        if (targetIndex !== this.currentSectionIndex) {
            console.log(`Navigating ${direction} to section:`, this.sections[targetIndex]);
            this.scrollToSection(targetIndex);
        }
    }

    scrollToSection(index) {
        if (index < 0 || index >= this.sections.length) return;

        this.isScrolling = true;
        this.currentSectionIndex = index;
        
        const targetSection = document.getElementById(this.sections[index]);
        if (targetSection) {
            // Section-specific offsets for about page
const sectionOffsets = {
    'home': 0,           // Scroll all the way to top
    'tokenomics': -2,      // Better positioning for tokenomics
    'how-to-buy': 24,       // Adjust for navbar
    'roadmap-section': 20,         // roadmap-section staRs the same
    'footer': 0             // Footer stays the same    
};
            
            const sectionName = this.sections[index];
            const scrollOffset = sectionOffsets[sectionName] || 80; // Default to 80
            
            const targetPosition = targetSection.offsetTop - scrollOffset;
            
            console.log(`Scrolling to section ${sectionName} at position ${targetPosition}`);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            setTimeout(() => {
                this.isScrolling = false;
                this.updateButtons();
            }, 1000);
        }
    }

    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;

        // Update previous button
        if (this.currentSectionIndex === 0) {
            this.prevBtn.disabled = true;
            this.prevBtn.style.opacity = '0.3';
        } else {
            this.prevBtn.disabled = false;
            this.prevBtn.style.opacity = '1';
        }

        // Update next button
        if (this.currentSectionIndex === this.sections.length - 1) {
            this.nextBtn.disabled = true;
            this.nextBtn.style.opacity = '0.3';
        } else {
            this.nextBtn.disabled = false;
            this.nextBtn.style.opacity = '1';
        }

        // Update tooltips
        this.prevBtn.title = this.currentSectionIndex > 0 
            ? `Previous: ${this.formatSectionName(this.sections[this.currentSectionIndex - 1])}`
            : 'At top';
        
        this.nextBtn.title = this.currentSectionIndex < this.sections.length - 1
            ? `Next: ${this.formatSectionName(this.sections[this.currentSectionIndex + 1])}`
            : 'At bottom';

        console.log('Current section:', this.sections[this.currentSectionIndex], 'Index:', this.currentSectionIndex);
    }

    formatSectionName(sectionId) {
        // Convert section ID to readable name for about page
        const names = {
            'home': 'Home',
            'tokenomics': 'Tokenomics',
            'how-to-buy': 'How to Buy',
            'footer': 'Footer',
            'roadmap-section': 'Roadmap-section'
     };
        return names[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }
}

// Initialize section navigator 
let sectionNavigator;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        sectionNavigator = new SectionNavigator();
    });
} else {
    sectionNavigator = new SectionNavigator();
}

// Keep existing functions for compatibility
function launchDApp() {
    showNotification('Launching DApp interface...', 'info');
    setTimeout(() => {
        showNotification('DApp successfully launched!', 'success');
    }, 1500);
}

// Wallet connection state
let isWalletConnected = false;

function connectWallet() {
    const button = document.querySelector('.connect-btn');
    
    if (!button) return; // Button doesn't exist on this page
    
    if (isWalletConnected) {
        disconnectWallet();
        return;
    }
    
    button.textContent = 'Connecting...';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = 'Disconnect';
        button.style.background = 'linear-gradient(45deg, #ff4757, #ff6b7a)';
        button.style.opacity = '1';
        isWalletConnected = true;
        showNotification('Wallet connected successfully!', 'success');
    }, 2000);
}

function disconnectWallet() {
    const button = document.querySelector('.connect-btn');
    if (!button) return;
    
    button.textContent = 'Disconnecting';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = 'Connect';
        button.style.background = 'linear-gradient(45deg, #00d4ff, #ff00ff)';
        button.style.opacity = '1';
        isWalletConnected = false;
        showNotification('Wallet disconnected successfully!', 'info');
    }, 1000);
}

function signUp() {
    showNotification('Opening registration form...', 'info');
}

// Functions specific to about page
function copyTokenomicsContract() {
    const contractAddress = '0x742d35Cc6634C0532925a3b8D4C';
    
    // Try to copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showNotification('Contract address copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback method
            fallbackCopyTextToClipboard(contractAddress);
        });
    } else {
        // Fallback method for older browsers
        fallbackCopyTextToClipboard(contractAddress);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Contract address copied to clipboard!', 'success');
        } else {
            showNotification('Failed to copy contract address', 'error');
        }
    } catch (err) {
        showNotification('Failed to copy contract address', 'error');
    }
    
    document.body.removeChild(textArea);
}

function scrollToHowToBuySection() {
    const howToBuySection = document.getElementById('how-to-buy');
    if (howToBuySection) {
        howToBuySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff88, #00d4ff)' : 
                    type === 'error' ? 'linear-gradient(45deg, #ff4757, #ff6b7a)' : 
                    'linear-gradient(45deg, #00d4ff, #ff00ff)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: bold;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}