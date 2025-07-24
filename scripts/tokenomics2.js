// Tokenomics JavaScript functionality

// Enhanced chart options with hover effects
const chartHoverOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "#ffffff",
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
  },
  // Enhanced hover animations
  onHover: (event, activeElements, chart) => {
    event.native.target.style.cursor =
      activeElements.length > 0 ? "pointer" : "default";
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 800,
    easing: "easeOutQuart",
  },
  // Add hover offset for segment enlargement
  elements: {
    arc: {
      hoverOffset: 20,
      hoverBorderWidth: 0,
      hoverBorderColor: "#ffffff",
    },
  },
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeTokenomicsCharts();
  setupTokenomicsInteractions();
});

function initializeTokenomicsCharts() {
  // Distribution Chart with enhanced hover effects
  const distributionCtx = document.getElementById("tokenomicsDistributionChart");
  if (!distributionCtx) return;
  
  const distributionChart = new Chart(distributionCtx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: [
        "Public",
        "Listing Purposes",
        "Marketing",
        "Treasury Initial",
        "Lead Dev (Locked)",
        "Future Team",
        "Lead Dev (Public)",
      ],
      datasets: [
        {
          data: [60, 20, 10, 5, 2, 2, 1],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6B9D",
          ],
          hoverBackgroundColor: [
            "#FF8FA3",
            "#54B8FF",
            "#FFD875",
            "#6DD6D6",
            "#B085FF",
            "#FFB85F",
            "#FF8BB3",
          ],
          cutout: "70%",
          borderWidth: 0,
          borderColor: "rgba(255, 255, 255, 0.1)",
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 0,
        },
      ],
    },
    options: {
      ...chartHoverOptions,
      plugins: {
        ...chartHoverOptions.plugins,
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#FFD700",
          bodyColor: "#ffffff",
          borderColor: "#FFD700",
          borderWidth: 0,
          cornerRadius: 10,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${percentage}% (${value}M tokens)`;
            },
          },
        },
      },
    },
  });

  // Fees Chart with enhanced hover effects
  const feesCtx = document.getElementById("tokenomicsFeesChart");
  if (!feesCtx) return;
  
  const feesChart = new Chart(feesCtx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["Operations (3%)", "Liquidity (2%)"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF8FA3", "#54B8FF"],
          borderWidth: 0,
          borderColor: "rgba(255, 255, 255, 0.1)",
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 0,
        },
      ],
    },
    options: {
      ...chartHoverOptions,
      cutout: "70%",
      plugins: {
        ...chartHoverOptions.plugins,
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#FFD700",
          bodyColor: "#ffffff",
          borderColor: "#FFD700",
          borderWidth: 0,
          cornerRadius: 10,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              return `${label}: ${value}% of fees`;
            },
          },
        },
      },
    },
  });

  // Store charts globally for interaction
  window.tokenomicsCharts = {
    distribution: distributionChart,
    fees: feesChart
  };

  // Add click interaction for table rows to highlight corresponding chart segments
  const tableRows = document.querySelectorAll(".tokenomics-breakdown-table tbody tr");
  tableRows.forEach((row, index) => {
    row.addEventListener("click", () => {
      // Highlight corresponding chart segment
      if (index < distributionChart.data.labels.length) {
        distributionChart.setActiveElements([
          {
            datasetIndex: 0,
            index: index,
          },
        ]);
        distributionChart.update("none");

        // Reset after 2 seconds
        setTimeout(() => {
          distributionChart.setActiveElements([]);
          distributionChart.update("none");
        }, 2000);
      }
    });
  });

  // Handle window resize for responsive charts
  let resizeTimeout;
  window.addEventListener("resize", () => {
    // Debounce resize event to avoid excessive redraws
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Force chart resize and redraw
      if (window.tokenomicsCharts) {
        window.tokenomicsCharts.distribution.resize();
        window.tokenomicsCharts.fees.resize();

        // Additional update to ensure proper rendering
        setTimeout(() => {
          window.tokenomicsCharts.distribution.update("resize");
          window.tokenomicsCharts.fees.update("resize");
        }, 100);
      }
    }, 150);
  });
}

function setupTokenomicsInteractions() {
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton && window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else if (backToTopButton) {
      backToTopButton.classList.remove('visible');
    }
  });
}

// Function to copy contract address
function copyTokenomicsContract() {
  const contractAddress = "0x742d35Cc6634C0532925a3b8D4C";
  
  navigator.clipboard.writeText(contractAddress).then(() => {
    // Determine which element triggered the copy
    const isFromButton = event.target.classList.contains('how-to-buy-copy-contract') || 
                        event.target.classList.contains('tokenomics-buy-button');
    
    if (isFromButton) {
      // Show feedback on the button with green background
      const originalBackground = event.target.style.background;
      event.target.style.background = "linear-gradient(45deg, #00ff00, #32ff32)";
      
      setTimeout(() => {
        if (event.target.classList.contains('how-to-buy-copy-contract')) {
          event.target.style.background = "linear-gradient(45deg, #9966FF, #B085FF)";
        } else {
          event.target.style.background = "linear-gradient(45deg, #FFD700, #FFA500)";
        }
      }, 1500);
    }
    
    // Always flash the contract address green regardless of which button was clicked
    const element = document.querySelector('.tokenomics-contract-address');
    if (element) {
      const originalColor = element.style.color || "#ffffff";
      element.style.color = "#00ff00";
      element.style.textShadow = "0 0 10px rgba(0, 255, 0, 0.8)";
      
      setTimeout(() => {
        element.style.color = originalColor;
        element.style.textShadow = "";
      }, 1500);
    }
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = contractAddress;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Same feedback logic as above
    const isFromButton = event.target.classList.contains('how-to-buy-copy-contract') || 
                        event.target.classList.contains('tokenomics-buy-button');
    
    if (isFromButton) {
      const originalBackground = event.target.style.background;
      event.target.style.background = "linear-gradient(45deg, #00ff00, #32ff32)";
      
      setTimeout(() => {
        if (event.target.classList.contains('how-to-buy-copy-contract')) {
          event.target.style.background = "linear-gradient(45deg, #9966FF, #B085FF)";
        } else {
          event.target.style.background = "linear-gradient(45deg, #FFD700, #FFA500)";
        }
      }, 1500);
    }
    
    // Always flash the contract address green
    const element = document.querySelector('.tokenomics-contract-address');
    if (element) {
      const originalColor = element.style.color || "#ffffff";
      element.style.color = "#00ff00";
      element.style.textShadow = "0 0 10px rgba(0, 255, 0, 0.8)";
      
      setTimeout(() => {
        element.style.color = originalColor;
        element.style.textShadow = "";
      }, 1500);
    }
  });
}

// Function to scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Function to scroll to how to buy section
function scrollToHowToBuySection() {
  const targetSection = document.querySelector('#how-to-buy');
  
  if (targetSection) {
    // Get the section's position and add offset for better viewing
    const sectionRect = targetSection.getBoundingClientRect();
    const absoluteTop = sectionRect.top + window.pageYOffset;
    const offset = 80; // Add offset for navigation
    
    // Smooth scroll with offset
    window.scrollTo({
      top: absoluteTop - offset,
      behavior: 'smooth'
    });
    
    // Add a temporary highlight effect
    targetSection.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
    setTimeout(() => {
      targetSection.style.boxShadow = "";
    }, 2000);
  }
}

// Ensure charts are properly sized on load
window.addEventListener("load", () => {
  setTimeout(() => {
    if (window.tokenomicsCharts) {
      window.tokenomicsCharts.distribution.resize();
      window.tokenomicsCharts.fees.resize();
    }
  }, 100);
});