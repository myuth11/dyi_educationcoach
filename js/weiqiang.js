/**
 * DIY Education Coach - Enhanced JavaScript
 * Republic Polytechnic
 * 
 * Contains all the functionality used by weiqiang.html, with enhanced animations and interactions
 */

// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';
const STORAGE_KEY = 'diy-coach-theme';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeHoverEffects();
    initializeHeaderEffects();
    initializeMobileNavigation();
    initializeLogoEffects();
    initializeHeaderSearch();
    
    console.log('🚀 DIY Education Coach (Enhanced) initialized successfully!');
});

// ===== THEME MANAGEMENT =====

/**
 * Initialize theme based on user preference or system preference
 */
function initializeTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        }
    }
    
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
    
    // Add a subtle animation feedback
    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}

/**
 * Apply the selected theme to the document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add smooth transition for theme changes
    if (!document.body.style.transition) {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
}

/**
 * Update the theme toggle button icon
 */
function updateThemeToggleIcon() {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Listen for system theme changes and update accordingly
 */
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            updateThemeToggleIcon();
        }
    });
}

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// ===== SCROLL-BASED ANIMATIONS =====

/**
 * Initialize scroll-based animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.description-content, .page-header-content');
    animateElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

/**
 * Add smooth scroll behavior to navigation links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add a subtle click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Add parallax effect to page header
 */
function initializeParallaxEffects() {
    const pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        
        if (pageHeader) {
            pageHeader.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only add parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
}

/**
 * Add hover sound effects (optional)
 */
function initializeHoverEffects() {
    const interactiveElements = document.querySelectorAll('.nav-link, .theme-toggle, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            element.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = '';
        });
    });
}

// ===== HEADER ENHANCEMENTS =====

/**
 * Initialize header scroll effects
 */
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'header-scroll-indicator';
    header.appendChild(scrollIndicator);
    
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update scroll indicator
        scrollIndicator.style.width = `${scrollPercent}%`;
        
        // Add/remove scrolled class
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial call
    updateHeader();
}

/**
 * Initialize mobile navigation
 */
function initializeMobileNavigation() {
    // Create mobile toggle button
    const navActions = document.querySelector('.nav-actions');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Clone navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileMenu.appendChild(mobileLink);
    });
    
    // Add elements to DOM
    if (navActions) {
        navActions.appendChild(mobileToggle);
    }
    document.body.appendChild(overlay);
    document.body.appendChild(mobileMenu);
    
    // Toggle functionality
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Initialize logo interactions
 */
function initializeLogoEffects() {
    const logoSection = document.querySelector('.logo-section');
    
    if (logoSection) {
        logoSection.addEventListener('click', () => {
            // Add loading state
            const header = document.querySelector('.header');
            header.classList.add('loading');
            
            // Navigate to home or refresh
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
        
        // Add double-click easter egg
        let clickCount = 0;
        logoSection.addEventListener('click', () => {
            clickCount++;
            setTimeout(() => {
                if (clickCount === 2) {
                    // Easter egg: show a fun animation
                    const icon = logoSection.querySelector('i');
                    icon.style.animation = 'logoSpin 1s ease-in-out';
                    setTimeout(() => {
                        icon.style.animation = 'logoFloat 3s ease-in-out infinite';
                    }, 1000);
                }
                clickCount = 0;
            }, 300);
        });
    }
}

/**
 * Initialize header search functionality (optional)
 */
function initializeHeaderSearch() {
    const rpBranding = document.querySelector('.rp-branding');
    
    // Create search element
    const searchContainer = document.createElement('div');
    searchContainer.className = 'header-search';
    searchContainer.innerHTML = `
        <input type="search" placeholder="Search..." aria-label="Search">
        <i class="fas fa-search"></i>
    `;
    
    // Add search toggle functionality
    const searchToggle = document.createElement('button');
    searchToggle.className = 'search-toggle';
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
    searchToggle.setAttribute('aria-label', 'Toggle search');
    
    // Insert after RP branding
    if (rpBranding) {
        rpBranding.parentNode.insertBefore(searchContainer, rpBranding.nextSibling);
    }
    
    // Search functionality
    const searchInput = searchContainer.querySelector('input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
            // Implement search functionality here
            console.log('Searching for:', query);
        }
    });
    
    // Show search on larger screens
    if (window.innerWidth > 1024) {
        searchContainer.style.display = 'block';
    }
}
