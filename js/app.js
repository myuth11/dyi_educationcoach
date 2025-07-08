/**
 * DIY Education Coach - Modern Interactive Features
 * Republic Polytechnic
 * 
 * Features:
 * - Modern smooth scrolling with enhanced animations
 * - Advanced theme toggle (light/dark mode)
 * - Interactive chatbot section highlighting
 * - Modern responsive navigation
 * - Enhanced accessibility features
 * - Youth-friendly animations and interactions
 */

// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';
const STORAGE_KEY = 'diy-coach-theme';
const HIGHLIGHT_DURATION = 3000; // 3 seconds

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeModernFeatures();
    highlightChatbotSection();
    setupAccessibilityFeatures();
    setupSmoothScrolling();
    setupKeyboardNavigation();
    setupIntersectionObserver();
    setupModernAnimations();
    
    console.log('🚀 DIY Education Coach (Modern Edition) initialized successfully!');
});

// ===== MODERN FEATURES INITIALIZATION =====

/**
 * Initialize modern interactive features
 */
function initializeModernFeatures() {
    // Add modern hover effects to cards
    setupCardHoverEffects();
    
    // Initialize scroll-triggered animations
    setupScrollAnimations();
    
    // Add interactive button effects
    setupButtonEffects();
    
    // Initialize parallax effects for modern browsers
    if (window.CSS && CSS.supports('transform', 'translateZ(0)')) {
        setupParallaxEffects();
    }
}

/**
 * Setup modern card hover effects
 */
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-card-hover)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

/**
 * Create modern ripple effect
 */
function createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(182, 240, 0, 0.3) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add ripple animation
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== MODERN THEME MANAGEMENT =====

/**
 * Initialize theme from localStorage or system preference
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
    updateThemeToggleIcon();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            updateThemeToggleIcon();
        }
    });
}

/**
 * Toggle between light and dark themes with modern animation
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition effect
    document.documentElement.style.transition = 'all 0.3s ease-in-out';
    
    applyTheme(currentTheme);
    updateThemeToggleIcon();
    localStorage.setItem(STORAGE_KEY, currentTheme);
    
    // Announce theme change for screen readers
    announceToScreenReader(`Switched to ${currentTheme} theme`);
    
    // Add modern button feedback with bounce effect
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        toggleButton.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => {
            toggleButton.style.transform = '';
        }, 200);
    }
    
    // Remove transition after completion
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
    
    // Add theme change particle effect
    createThemeChangeEffect();
}

/**
 * Create modern theme change particle effect
 */
function createThemeChangeEffect() {
    const particles = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${currentTheme === 'dark' ? '#B6F000' : '#00D1C1'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: particleExplosion 1s ease-out forwards;
        `;
        
        particle.style.setProperty('--angle', `${(360 / particleCount) * i}deg`);
        document.body.appendChild(particle);
        particles.push(particle);
    }
    
    // Add particle animation styles
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleExplosion {
                0% {
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0px);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cleanup particles
    setTimeout(() => {
        particles.forEach(particle => particle.remove());
    }, 1000);
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
        
        // Modern smooth scroll with easing
        smoothScrollTo(targetPosition, 800);
        
        // Highlight section after scroll
        setTimeout(() => {
            highlightChatbotSection();
            addScrollSparkles();
        }, 400);
        
        // Focus management for accessibility
        setTimeout(() => {
            const chatbotTitle = document.getElementById('chatbot-title');
            if (chatbotTitle) {
                chatbotTitle.focus();
            }
        }, 900);
    }
}

/**
 * Enhanced smooth scroll implementation
 */
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = progress => {
            return progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        };
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

/**
 * Add sparkle effect during scroll
 */
function addScrollSparkles() {
    const sparkleCount = 8;
    const chatbotSection = document.getElementById('chatbot-section');
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-lime);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: sparkle 1.5s ease-out forwards;
        `;
        
        const rect = chatbotSection.getBoundingClientRect();
        sparkle.style.left = `${Math.random() * rect.width}px`;
        sparkle.style.top = `${Math.random() * rect.height}px`;
        
        chatbotSection.style.position = 'relative';
        chatbotSection.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
    
    // Add sparkle animation
    if (!document.getElementById('sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhanced chatbot section highlighting with modern effects
 */
function highlightChatbotSection() {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
        chatbotSection.classList.add('highlighted');
        
        // Add glow effect to chatbot wrapper
        const chatbotWrapper = document.querySelector('.chatbot-wrapper');
        if (chatbotWrapper) {
            chatbotWrapper.style.boxShadow = '0 0 30px rgba(182, 240, 0, 0.4)';
            setTimeout(() => {
                chatbotWrapper.style.boxShadow = '';
            }, HIGHLIGHT_DURATION);
        }
        
        setTimeout(() => {
            chatbotSection.classList.remove('highlighted');
        }, HIGHLIGHT_DURATION);
    }
}

// ===== MODERN SCROLL ANIMATIONS =====

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .info-card, .chatbot-wrapper');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Setup modern intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    if (!window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add special effects for different elements
                if (element.classList.contains('chatbot-wrapper')) {
                    element.style.animation = 'fadeInUp 0.8s ease-out';
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .info-card, .chatbot-wrapper, .intro-content');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Setup modern button effects
 */
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .cta-button, .nav-btn');
    
    buttons.forEach(button => {
        // Add magnetic effect for large screens
        if (window.innerWidth > 768) {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
        
        // Add click animation
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Setup parallax effects for modern browsers
 */
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.intro-section::before, .cta-section::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.style) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

/**
 * Modern smooth scroll with enhanced animation
 */
function scrollToChatbot() {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
        // Calculate offset for sticky header
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = chatbotSection.offsetTop - headerHeight - 20;
        
        // Modern smooth scroll with easing
        smoothScrollTo(targetPosition, 800);
        
        // Highlight section after scroll
        setTimeout(() => {
            highlightChatbotSection();
            addScrollSparkles();
        }, 400);
        
        // Focus management for accessibility
        setTimeout(() => {
            const chatbotTitle = document.getElementById('chatbot-title');
            if (chatbotTitle) {
                chatbotTitle.focus();
            }
        }, 900);
    }
}

/**
 * Enhanced smooth scroll implementation
 */
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = progress => {
            return progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        };
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

/**
 * Add sparkle effect during scroll
 */
function addScrollSparkles() {
    const sparkleCount = 8;
    const chatbotSection = document.getElementById('chatbot-section');
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-lime);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: sparkle 1.5s ease-out forwards;
        `;
        
        const rect = chatbotSection.getBoundingClientRect();
        sparkle.style.left = `${Math.random() * rect.width}px`;
        sparkle.style.top = `${Math.random() * rect.height}px`;
        
        chatbotSection.style.position = 'relative';
        chatbotSection.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
    
    // Add sparkle animation
    if (!document.getElementById('sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Enhanced chatbot section highlighting with modern effects
 */
function highlightChatbotSection() {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
        chatbotSection.classList.add('highlighted');
        
        // Add glow effect to chatbot wrapper
        const chatbotWrapper = document.querySelector('.chatbot-wrapper');
        if (chatbotWrapper) {
            chatbotWrapper.style.boxShadow = '0 0 30px rgba(182, 240, 0, 0.4)';
            setTimeout(() => {
                chatbotWrapper.style.boxShadow = '';
            }, HIGHLIGHT_DURATION);
        }
        
        setTimeout(() => {
            chatbotSection.classList.remove('highlighted');
        }, HIGHLIGHT_DURATION);
    }
}

// ===== FLOATING CHAT WIDGET =====

/**
 * Chat Widget Configuration
 */
const CHAT_CONFIG = {
    // Your actual Flowise API endpoint
    FLOWISE_API_URL: 'https://myuth-flowise.hf.space/api/v1/prediction/a6fd24f4-d31f-4547-a912-949c42cdc349',
    // You can customize these settings
    MAX_MESSAGE_LENGTH: 1000,
    TYPING_DELAY: 1500, // milliseconds
    AUTO_SCROLL_DELAY: 100,
    WELCOME_DELAY: 500
};

/**
 * Initialize chat widget
 */
function initializeChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatMinimize = document.getElementById('chat-minimize');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    let isChatOpen = false;
    let isTyping = false;
    let messageHistory = [];
    
    // Toggle chat box
    chatToggle.addEventListener('click', function() {
        toggleChat();
    });
    
    // Minimize chat
    chatMinimize.addEventListener('click', function() {
        toggleChat();
    });
    
    // Handle form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });
    
    // Handle enter key in textarea
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        autoResizeTextarea(this);
        updateSendButton();
    });
    
    // Initial setup
    updateSendButton();
    
    /**
     * Toggle chat box open/close
     */
    function toggleChat() {
        isChatOpen = !isChatOpen;
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');
        const chatBadge = document.querySelector('.chat-badge');
        
        if (isChatOpen) {
            chatBox.classList.add('open');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            chatBadge.style.display = 'none';
            chatInput.focus();
            scrollToBottom();
            
            // Announce for screen readers
            announceToScreenReader('Chat opened. You can now send messages to the DIY Coach.');
        } else {
            chatBox.classList.remove('open');
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            chatBadge.style.display = 'flex';
            
            announceToScreenReader('Chat closed.');
        }
    }
    
    /**
     * Send user message
     */
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        autoResizeTextarea(chatInput);
        updateSendButton();
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send to Flowise API
            const response = await sendToFlowise(message);
            
            // Hide typing indicator
            hideTypingIndicator();
            
            // Add bot response
            addMessage(response, 'bot');
            
        } catch (error) {
            hideTypingIndicator();
            addMessage('Sorry, I\'m having trouble connecting right now. Please try again in a moment! 🔧', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    /**
     * Send message to Flowise API
     * Updated to match your provided integration code
     */
    async function sendToFlowise(message) {
        const response = await fetch(CHAT_CONFIG.FLOWISE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: message
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Store in message history for context
        const botResponse = result.text || result.answer || result.response || JSON.stringify(result);
        messageHistory.push({
            human: message,
            ai: botResponse
        });
        
        return botResponse;
    }
    
    /**
     * Add message to chat
     */
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        messageContent.appendChild(messageText);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        setTimeout(() => {
            scrollToBottom();
        }, CHAT_CONFIG.AUTO_SCROLL_DELAY);
        
        // Announce new messages for screen readers
        if (sender === 'bot') {
            announceToScreenReader(`DIY Coach says: ${content}`);
        }
    }
    
    /**
     * Show typing indicator
     */
    function showTypingIndicator() {
        isTyping = true;
        const typingIndicator = document.getElementById('typing-indicator');
        typingIndicator.style.display = 'block';
        chatSend.disabled = true;
        scrollToBottom();
    }
    
    /**
     * Hide typing indicator
     */
    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        typingIndicator.style.display = 'none';
        chatSend.disabled = false;
    }
    
    /**
     * Auto-resize textarea
     */
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
    }
    
    /**
     * Update send button state
     */
    function updateSendButton() {
        const hasText = chatInput.value.trim().length > 0;
        chatSend.disabled = !hasText || isTyping;
        chatSend.style.opacity = hasText && !isTyping ? '1' : '0.5';
    }
    
    /**
     * Scroll chat to bottom
     */
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    /**
     * Add chat notification badge
     */
    function addNotificationBadge() {
        if (!isChatOpen) {
            const badge = document.querySelector('.chat-badge');
            badge.style.display = 'flex';
            badge.style.animation = 'pulse 2s infinite';
        }
    }
    
    /**
     * Handle chat widget visibility based on scroll
     */
    function handleChatVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const chatWidget = document.getElementById('chat-widget');
        
        if (scrollTop > 200) {
            chatWidget.style.transform = 'translateY(0)';
            chatWidget.style.opacity = '1';
        } else {
            chatWidget.style.transform = 'translateY(10px)';
            chatWidget.style.opacity = '0.9';
        }
    }
    
    // Add scroll listener for chat visibility
    window.addEventListener('scroll', handleChatVisibility);
    
    // Initial visibility setup
    handleChatVisibility();
}

/**
 * Enhanced chat features for better UX
 */
function setupChatEnhancements() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + C: Open/close chat
        if (e.altKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            const chatToggle = document.getElementById('chat-toggle');
            if (chatToggle) {
                chatToggle.click();
            }
        }
        
        // Escape: Close chat if open
        if (e.key === 'Escape') {
            const chatBox = document.getElementById('chat-box');
            if (chatBox && chatBox.classList.contains('open')) {
                document.getElementById('chat-toggle').click();
            }
        }
    });
    
    // Add click outside to close
    document.addEventListener('click', function(e) {
        const chatWidget = document.getElementById('chat-widget');
        const chatBox = document.getElementById('chat-box');
        
        if (chatBox && chatBox.classList.contains('open') && 
            !chatWidget.contains(e.target)) {
            // Don't close if clicking on other interactive elements
            if (!e.target.closest('button, input, textarea, a')) {
                document.getElementById('chat-toggle').click();
            }
        }
    });
}

/**
 * Initialize chat-specific accessibility features
 */
function setupChatAccessibility() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatInput) {
        // Add ARIA labels
        chatInput.setAttribute('aria-label', 'Type your message to the DIY Coach');
        chatInput.setAttribute('aria-describedby', 'chat-help-text');
        
        // Add help text for screen readers
        const helpText = document.createElement('div');
        helpText.id = 'chat-help-text';
        helpText.className = 'sr-only';
        helpText.textContent = 'Press Enter to send message, Shift+Enter for new line, Alt+C to toggle chat';
        document.body.appendChild(helpText);
    }
    
    if (chatMessages) {
        // Make chat messages region live for screen readers
        chatMessages.setAttribute('aria-live', 'polite');
        chatMessages.setAttribute('aria-label', 'Chat conversation with DIY Coach');
    }
    
    // Add screen reader only class
    const srOnlyStyles = document.createElement('style');
    srOnlyStyles.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(srOnlyStyles);
}

// ===== CHAT INITIALIZATION =====

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChatWidget();
    setupChatEnhancements();
    setupChatAccessibility();
    
    console.log('💬 DIY Coach Chat Widget initialized successfully!');
});

// Export chat functions for global access
window.toggleChat = function() {
    const chatToggle = document.getElementById('chat-toggle');
    if (chatToggle) {
        chatToggle.click();
    }
};

// ===== FLOWISE INTEGRATION TEST =====

/**
 * Test function to verify Flowise integration
 * Updated to match your provided test code
 * You can call this from browser console: testFlowiseConnection()
 */
async function testFlowiseConnection() {
    console.log('🧪 Testing Flowise connection...');
    console.log('📍 API Endpoint:', CHAT_CONFIG.FLOWISE_API_URL);
    
    try {
        const response = await fetch(CHAT_CONFIG.FLOWISE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: 'Hello, this is a test message'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📥 Response:', result);
        console.log('✅ Connection successful!');
        
        return result;
        
    } catch (error) {
        console.error('❌ Error:', error);
        console.log('🔧 Troubleshooting tips:');
        console.log('  1. Check if your Flowise instance is running');
        console.log('  2. Verify the API URL is correct');
        console.log('  3. Check for CORS issues');
        throw error;
    }
}

// Make test function available globally
window.testFlowiseConnection = testFlowiseConnection;

/**
 * Your specific Flowise API integration code
 */

// Alternative implementation using your provided code
async function sendToFlowiseOriginal(message) {
    const apiUrl = CHAT_CONFIG.FLOWISE_API_URL;
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: message
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.text || result.answer || result.response || JSON.stringify(result);
}

// Test function using your exact code
async function testFlowiseConnectionOriginal() {
    const apiUrl = CHAT_CONFIG.FLOWISE_API_URL;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: 'Hello, this is a test message'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Response:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Make these functions available globally for testing
window.sendToFlowiseOriginal = sendToFlowiseOriginal;
window.testFlowiseConnectionOriginal = testFlowiseConnectionOriginal;
