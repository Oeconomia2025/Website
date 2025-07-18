// Enhanced Section Effects for Tokenomics and How-to-Buy (REVERSED ANIMATIONS)
class SectionEffectsManager {
  constructor() {
    this.observers = new Map();
    this.isInitialized = false;
    this.effectsConfig = {
      tokenomics: {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      },
      howToBuy: {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    };
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEffects());
    } else {
      this.setupEffects();
    }
    
    this.isInitialized = true;
  }

  setupEffects() {
    this.createAnimationStyles();
    this.setupTokenomicsEffects();
    this.setupHowToBuyEffects();
    this.setupParticleEffects();
  }

  createAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Base animation classes */
      .section-animate {
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .fade-in-up {
        opacity: 0;
        transform: translateY(60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .fade-in-up.animate {
        opacity: 1;
        transform: translateY(0);
      }

      .fade-in-down {
        opacity: 0;
        transform: translateY(-60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .fade-in-down.animate {
        opacity: 1;
        transform: translateY(0);
      }

      .fade-in-left {
        opacity: 0;
        transform: translateX(-60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .fade-in-left.animate {
        opacity: 1;
        transform: translateX(0);
      }

      .fade-in-right {
        opacity: 0;
        transform: translateX(60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .fade-in-right.animate {
        opacity: 1;
        transform: translateX(0);
      }

      .scale-in {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .scale-in.animate {
        opacity: 1;
        transform: scale(1);
      }

      .rotate-in {
        opacity: 0;
        transform: rotate(-10deg) scale(0.9);
        transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .rotate-in.animate {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }

      /* Stagger animation delays */
      .stagger-1 { transition-delay: 0.1s; }
      .stagger-2 { transition-delay: 0.2s; }
      .stagger-3 { transition-delay: 0.3s; }
      .stagger-4 { transition-delay: 0.4s; }
      .stagger-5 { transition-delay: 0.5s; }
      .stagger-6 { transition-delay: 0.6s; }

      /* Tokenomics specific animations */
      .tokenomics-glow {
        box-shadow: 0 0 0 rgba(255, 215, 0, 0);
        transition: box-shadow 1s ease-out;
      }

      .tokenomics-glow.animate {
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
      }

      .chart-pulse {
        animation: chartPulse 2s ease-in-out;
      }

      @keyframes chartPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }

      /* How-to-buy specific animations - REVERSED */
      .step-card-hover-reverse {
        transform: translateY(0);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .step-card-hover-reverse.animate {
        transform: translateY(10px); /* REVERSED: Move DOWN instead of up */
      }

      /* Floating particles */
      .floating-particle {
        position: absolute;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      }

      .floating-particle.animate {
        animation: floatUp 3s ease-out forwards;
      }

      @keyframes floatUp {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0);
        }
        20% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-100px) scale(0.5);
        }
      }

      /* Ripple effect */
      .ripple-effect {
        position: relative;
        overflow: hidden;
      }

      .ripple-effect::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.2);
        transform: translate(-50%, -50%);
        transition: width 1.5s ease-out, height 1.5s ease-out;
        z-index: 1;
      }

      .ripple-effect.animate::before {
        width: 200%;
        height: 200%;
      }
    `;
    document.head.appendChild(style);
  }

  setupTokenomicsEffects() {
    const tokenomicsSection = document.querySelector('#tokenomics');
    if (!tokenomicsSection) return;

    // Add animation classes to elements
    this.prepareTokenomicsElements(tokenomicsSection);

    // Create intersection observer for tokenomics
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerTokenomicsEffects(entry.target);
        } else {
          this.resetTokenomicsEffects(entry.target);
        }
      });
    }, this.effectsConfig.tokenomics);

    observer.observe(tokenomicsSection);
    this.observers.set('tokenomics', observer);
  }

  prepareTokenomicsElements(section) {
    // Header elements
    const header = section.querySelector('.tokenomics-header h1');
    const subtitle = section.querySelector('.tokenomics-header p');
    if (header) header.classList.add('fade-in-up', 'section-animate');
    if (subtitle) subtitle.classList.add('fade-in-up', 'section-animate', 'stagger-1');

    // Stat cards
    const statCards = section.querySelectorAll('.tokenomics-stat-card');
    statCards.forEach((card, index) => {
      card.classList.add('scale-in', 'section-animate', `stagger-${Math.min(index + 2, 6)}`);
      card.classList.add('tokenomics-glow');
    });

    // Chart sections
    const chartSections = section.querySelectorAll('.tokenomics-chart-section');
    chartSections.forEach((chart, index) => {
      chart.classList.add('fade-in-left', 'section-animate', `stagger-${index + 3}`);
      chart.classList.add('ripple-effect');
    });

    // Table
    const table = section.querySelector('.tokenomics-breakdown-table');
    if (table) {
      table.classList.add('fade-in-up', 'section-animate', 'stagger-4');
      
      // Table rows
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach((row, index) => {
        row.classList.add('fade-in-right', 'section-animate', `stagger-${index + 5}`);
      });
    }
  }

  triggerTokenomicsEffects(section) {
    // Trigger all animations
    const animatedElements = section.querySelectorAll('.section-animate');
    animatedElements.forEach(el => {
      el.classList.add('animate');
    });

    // Create floating particles
    this.createFloatingParticles(section, 15);

    // Trigger chart animations if charts exist
    setTimeout(() => {
      if (window.tokenomicsCharts) {
        Object.values(window.tokenomicsCharts).forEach(chart => {
          if (chart && typeof chart.update === 'function') {
            chart.update('active');
          }
        });
      }
    }, 500);

    // Add pulse effect to charts
    const chartContainers = section.querySelectorAll('.tokenomics-chart-container');
    chartContainers.forEach(container => {
      container.classList.add('chart-pulse');
      setTimeout(() => {
        container.classList.remove('chart-pulse');
      }, 2000);
    });
  }

  resetTokenomicsEffects(section) {
    const animatedElements = section.querySelectorAll('.section-animate');
    animatedElements.forEach(el => {
      el.classList.remove('animate');
    });

    // Remove existing particles
    const particles = section.querySelectorAll('.floating-particle');
    particles.forEach(particle => particle.remove());
  }

  setupHowToBuyEffects() {
    const howToBuySection = document.querySelector('#how-to-buy');
    if (!howToBuySection) return;

    this.prepareHowToBuyElements(howToBuySection);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerHowToBuyEffects(entry.target);
        } else {
          this.resetHowToBuyEffects(entry.target);
        }
      });
    }, this.effectsConfig.howToBuy);

    observer.observe(howToBuySection);
    this.observers.set('howToBuy', observer);
  }

  prepareHowToBuyElements(section) {
    // Title - REVERSED: slides down from above
    const title = section.querySelector('.how-to-buy-title');
    if (title) title.classList.add('fade-in-down', 'section-animate');

    // Step cards - REVERSED: even cards from right, odd cards from left
    const stepCards = section.querySelectorAll('.how-to-buy-step-card');
    stepCards.forEach((card, index) => {
      const animationType = index % 2 === 0 ? 'fade-in-right' : 'fade-in-left';
      card.classList.add(animationType, 'section-animate', `stagger-${index + 1}`);
      card.classList.add('step-card-hover-reverse', 'ripple-effect');
    });

    // Warning section
    const warningSection = section.querySelector('.how-to-buy-warning-section');
    if (warningSection) {
      warningSection.classList.add('scale-in', 'section-animate', 'stagger-6');
    }
  }

  triggerHowToBuyEffects(section) {
    const animatedElements = section.querySelectorAll('.section-animate');
    animatedElements.forEach(el => {
      el.classList.add('animate');
    });

    // Create floating particles for step cards
    const stepCards = section.querySelectorAll('.how-to-buy-step-card');
    stepCards.forEach((card, index) => {
      setTimeout(() => {
        this.createFloatingParticles(card, 3);
        // Add individual ripple effect
        card.classList.add('animate');
      }, index * 200);
    });

    // Special effect for step numbers
    const stepNumbers = section.querySelectorAll('.how-to-buy-step-number');
    stepNumbers.forEach((number, index) => {
      setTimeout(() => {
        number.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
          number.style.animation = '';
        }, 1000);
      }, index * 150);
    });
  }

  resetHowToBuyEffects(section) {
    const animatedElements = section.querySelectorAll('.section-animate');
    animatedElements.forEach(el => {
      el.classList.remove('animate');
    });

    // Remove particles
    const particles = section.querySelectorAll('.floating-particle');
    particles.forEach(particle => particle.remove());
  }

  createFloatingParticles(container, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random size
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const rect = container.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        container.appendChild(particle);
        
        // Trigger animation
        requestAnimationFrame(() => {
          particle.classList.add('animate');
        });
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 3000);
      }, i * 100);
    }
  }

  setupParticleEffects() {
    // Add background particle system for both sections
    const style = document.createElement('style');
    style.textContent = `
      .section-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
      }

      .background-particle {
        position: absolute;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 70%);
        border-radius: 50%;
        animation: backgroundFloat 6s ease-in-out infinite;
      }

      @keyframes backgroundFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);
  }

  // Public method to manually trigger effects
  triggerSectionEffects(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;

    if (sectionId === 'tokenomics') {
      this.triggerTokenomicsEffects(section);
    } else if (sectionId === 'how-to-buy') {
      this.triggerHowToBuyEffects(section);
    }
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.isInitialized = false;
  }
}

// Initialize the effects manager
let sectionEffectsManager;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    sectionEffectsManager = new SectionEffectsManager();
  });
} else {
  sectionEffectsManager = new SectionEffectsManager();
}

// Make it globally accessible for manual triggering
window.sectionEffectsManager = sectionEffectsManager;

// Add keyboard shortcuts for testing (optional)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey) {
    switch(e.key) {
      case 't':
        e.preventDefault();
        if (window.sectionEffectsManager) {
          window.sectionEffectsManager.triggerSectionEffects('tokenomics');
        }
        break;
      case 'h':
        e.preventDefault();
        if (window.sectionEffectsManager) {
          window.sectionEffectsManager.triggerSectionEffects('how-to-buy');
        }
        break;
    }
  }
});

// Enhanced integration with existing tokenomics functionality
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for existing scripts to load
  setTimeout(() => {
    // Enhance existing chart initialization with effects
    if (window.tokenomicsCharts) {
      Object.values(window.tokenomicsCharts).forEach(chart => {
        if (chart && chart.options) {
          // Add hover effects to charts
          const originalOnHover = chart.options.onHover;
          chart.options.onHover = function(event, activeElements, chart) {
            if (originalOnHover) {
              originalOnHover.call(this, event, activeElements, chart);
            }
            
            // Add glow effect when hovering
            const canvas = chart.canvas;
            if (activeElements.length > 0) {
              canvas.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))';
            } else {
              canvas.style.filter = '';
            }
          };
          
          chart.update('none');
        }
      });
    }
  }, 1000);
});