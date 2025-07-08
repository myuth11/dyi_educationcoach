/**
 * DIY Education Coach - Interactive Features
 * Republic Polytechnic
 * 
 * Features:
 * - Smooth scrolling to chatbot section
 * - Theme toggle (light/dark mode)
 * - Chatbot section highlighting
 * - Responsive navigation
 * - Accessibility enhancements
 */

// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';
const STORAGE_KEY = 'diy-coach-theme';
const HIGHLIGHT_DURATION = 3000; // 3 seconds

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    highlightChatbotSection();
    setupAccessibilityFeatures();
    setupSmoothScrolling();
    setupKeyboardNavigation();
    
    console.log('🚀 DIY Education Coach initialized successfully!');
});

// ===== THEME MANAGEMENT =====

/**
 * Initialize theme from localStorage or system preference
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
    updateThemeToggleIcon();
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    updateThemeToggleIcon();
    localStorage.setItem(STORAGE_KEY, currentTheme);
    
    // Announce theme change for screen readers
    announceToScreenReader(`Switched to ${currentTheme} theme`);
    
    // Add subtle animation feedback
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        toggleButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            toggleButton.style.transform = '';
        }, 150);
    }
}

/**
 * Apply theme to document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    }
}

/**
 * Update theme toggle button icon
 */
function updateThemeToggleIcon() {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== NAVIGATION & SCROLLING =====

/**
 * Smooth scroll to chatbot section with highlighting
 */
function scrollToChatbot() {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
        // Calculate offset for sticky header
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = chatbotSection.offsetTop - headerHeight - 20;
        
        // Smooth scroll
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight section after scroll
        setTimeout(() => {
            highlightChatbotSection();
        }, 500);
        
        // Focus management for accessibility
        setTimeout(() => {
            const chatbotTitle = document.getElementById('chatbot-title');
            if (chatbotTitle) {
                chatbotTitle.focus();
            }
        }, 1000);
    }
}

/**
 * Highlight chatbot section temporarily
 */
function highlightChatbotSection() {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
        chatbotSection.classList.add('highlighted');
        
        setTimeout(() => {
            chatbotSection.classList.remove('highlighted');
        }, HIGHLIGHT_DURATION);
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ACCESSIBILITY FEATURES =====

/**
 * Setup accessibility enhancements
 */
function setupAccessibilityFeatures() {
    // Add skip to content link
    addSkipToContentLink();
    
    // Enhance focus indicators
    enhanceFocusIndicators();
    
    // Setup ARIA live region for announcements
    setupLiveRegion();
    
    // Monitor for reduced motion preference
    respectReducedMotion();
}

/**
 * Add skip to content link for keyboard users
 */
function addSkipToContentLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#chatbot-section';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--rp-green);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Enhance focus indicators for better visibility
 */
function enhanceFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
        .enhanced-focus:focus {
            outline: 3px solid var(--rp-green) !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 6px rgba(0, 112, 60, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add enhanced focus class to interactive elements
    document.querySelectorAll('button, a, input, textarea, select').forEach(element => {
        element.classList.add('enhanced-focus');
    });
}

/**
 * Setup ARIA live region for screen reader announcements
 */
function setupLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

/**
 * Respect user's reduced motion preference
 */
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
    
    // Listen for changes
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        } else {
            document.documentElement.style.removeProperty('--transition-fast');
            document.documentElement.style.removeProperty('--transition-normal');
            document.documentElement.style.removeProperty('--transition-slow');
        }
    });
}

// ===== KEYBOARD NAVIGATION =====

/**
 * Setup enhanced keyboard navigation
 */
function setupKeyboardNavigation() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + C: Jump to chatbot
        if (e.altKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            scrollToChatbot();
            announceToScreenReader('Navigated to chatbot section');
        }
        
        // Alt + T: Toggle theme
        if (e.altKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Escape: Remove highlights and return focus to top
        if (e.key === 'Escape') {
            const highlighted = document.querySelector('.highlighted');
            if (highlighted) {
                highlighted.classList.remove('highlighted');
                document.querySelector('.logo-section h1')?.focus();
            }
        }
    });
    
    // Improve button keyboard interaction
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===== CHATBOT INTERACTION HELPERS =====

/**
 * Monitor chatbot iframe for loading state
 */
function monitorChatbotLoading() {
    const chatbotFrame = document.querySelector('.chatbot-wrapper iframe');
    if (chatbotFrame) {
        chatbotFrame.addEventListener('load', function() {
            announceToScreenReader('Chatbot loaded successfully');
            
            // Add loading indicator removal
            const loadingIndicator = document.querySelector('.chatbot-loading');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
        });
        
        chatbotFrame.addEventListener('error', function() {
            announceToScreenReader('Error loading chatbot. Please try refreshing the page.');
            showChatbotError();
        });
    }
}

/**
 * Show chatbot error message
 */
function showChatbotError() {
    const chatbotWrapper = document.querySelector('.chatbot-wrapper');
    if (chatbotWrapper) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chatbot-error';
        errorMessage.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--rp-red);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <h3>Unable to load chatbot</h3>
                <p>Please check your internet connection and try refreshing the page.</p>
                <button onclick="location.reload()" style="
                    background: var(--rp-green);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">Refresh Page</button>
            </div>
        `;
        
        chatbotWrapper.appendChild(errorMessage);
    }
}

// ===== RESPONSIVE UTILITIES =====

/**
 * Handle responsive layout changes
 */
function handleResponsiveChanges() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // Mobile layout adjustments
            setupMobileInteractions();
        } else {
            // Desktop layout adjustments
            setupDesktopInteractions();
        }
    }
    
    // Initial check
    handleMediaQueryChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);
}

/**
 * Setup mobile-specific interactions
 */
function setupMobileInteractions() {
    // Adjust scroll offset for mobile
    const originalScrollToChatbot = window.scrollToChatbot;
    window.scrollToChatbot = function() {
        const chatbotSection = document.getElementById('chatbot-section');
        if (chatbotSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = chatbotSection.offsetTop - headerHeight - 10;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                highlightChatbotSection();
            }, 300);
        }
    };
}

/**
 * Setup desktop-specific interactions
 */
function setupDesktopInteractions() {
    // Restore original scroll behavior for desktop
    // (Implementation would depend on specific desktop enhancements needed)
}

// ===== PERFORMANCE OPTIMIZATION =====

/**
 * Optimize performance for better user experience
 */
function optimizePerformance() {
    // Lazy load non-critical elements
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load chatbot when it comes into view
                    if (entry.target.classList.contains('chatbot-wrapper')) {
                        monitorChatbotLoading();
                    }
                }
            });
        });
        
        const chatbotWrapper = document.querySelector('.chatbot-wrapper');
        if (chatbotWrapper) {
            observer.observe(chatbotWrapper);
        }
    }
}

// ===== ERROR HANDLING =====

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
    console.error('DIY Education Coach Error:', e.error);
    
    // Show user-friendly error message for critical failures
    if (e.error && e.error.message.includes('critical')) {
        announceToScreenReader('An error occurred. Please refresh the page if you experience issues.');
    }
});

// ===== INITIALIZATION CALL =====
// Initialize responsive handling and performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveChanges();
    optimizePerformance();
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
// Make key functions available globally
window.scrollToChatbot = scrollToChatbot;
window.toggleTheme = toggleTheme;
window.highlightChatbotSection = highlightChatbotSection;
