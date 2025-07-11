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
    initializeChatbot();
    
    console.log('🚀 DIY Education Coach (Enhanced with Chatbot) initialized successfully!');
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

// ===== CHATBOT FUNCTIONALITY =====

/**
 * CONFIGURATION - Update these values for your deployment
 */
const CHATBOT_CONFIG = {
    // Replace with your actual Flowise API endpoint
    FLOWISE_API_URL: 'https://weeiiqiang-flowise.hf.space/api/v1/prediction/bddaeb4d-4ca6-4f96-b2ed-24d933568a7f',
    
    // Optional: Add API key if required
    API_KEY: '', // Leave empty if not required
    
    // Chat configuration
    MAX_MESSAGES: 50, // Maximum messages to keep in memory
    TYPING_DELAY: 1000, // Delay before showing AI response (ms)
    
    // Message templates
    ERROR_MESSAGE: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
    NETWORK_ERROR: 'Unable to connect to the AI service. Please check your internet connection and try again.',
    RATE_LIMIT_ERROR: 'I\'m receiving too many requests right now. Please wait a moment and try again.',
};

// Chat state management
let chatHistory = [];
let isTyping = false;
const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

/**
 * Initialize chatbot functionality
 */
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (!chatInput || !sendButton) {
        console.error('Chatbot elements not found');
        return;
    }
    
    // Add CSS animations if not already present
    if (!document.getElementById('chatbot-animations')) {
        const style = document.createElement('style');
        style.id = 'chatbot-animations';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        
        // Enable/disable send button based on content
        const hasContent = this.value.trim().length > 0;
        sendButton.disabled = !hasContent || isTyping;
    });
    
    // Handle Enter key (Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Initialize send button state
    sendButton.disabled = true;
    
    console.log('🤖 Chatbot initialized successfully');
}

/**
 * Send a message (can be called from suggestion buttons or send button)
 */
async function sendMessage(messageText = null) {
    console.log('🤖 sendMessage called with:', messageText);
    
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (!chatInput || isTyping) {
        console.log('🤖 sendMessage aborted - no chatInput or isTyping:', { chatInput: !!chatInput, isTyping });
        return;
    }
    
    // Get message text from input or parameter
    const message = messageText || chatInput.value.trim();
    console.log('🤖 Final message to send:', message);
    
    if (!message) {
        console.log('🤖 No message to send');
        return;
    }
    
    // Clear input if message came from input field
    if (!messageText) {
        chatInput.value = '';
        chatInput.style.height = 'auto';
    }
    
    // Disable input while processing
    chatInput.disabled = true;
    sendButton.disabled = true;
    isTyping = true;
    
    console.log('🤖 Starting message processing...');
    
    try {
        // Add user message to chat
        console.log('🤖 Adding user message to chat');
        addMessage(message, 'user');
        
        // Show typing indicator
        console.log('🤖 Showing typing indicator');
        showTypingIndicator();
        
        // Send message to AI
        console.log('🤖 Sending to AI...');
        const response = await sendToAI(message);
        console.log('🤖 Received AI response:', response);
        
        // Hide typing indicator
        console.log('🤖 Hiding typing indicator');
        hideTypingIndicator();
        
        // Add AI response to chat
        console.log('🤖 Adding AI response to chat');
        addMessage(response, 'bot');
        
    } catch (error) {
        console.error('🤖 Error in sendMessage:', error);
        hideTypingIndicator();
        
        // Determine error message based on error type
        let errorMessage = CHATBOT_CONFIG.ERROR_MESSAGE;
        if (error.message.includes('NetworkError') || error.message.includes('fetch') || error.message.includes('CORS')) {
            errorMessage = CHATBOT_CONFIG.NETWORK_ERROR;
        } else if (error.message.includes('429')) {
            errorMessage = CHATBOT_CONFIG.RATE_LIMIT_ERROR;
        }
        
        console.log('🤖 Showing error message:', errorMessage);
        addMessage(errorMessage, 'bot');
    } finally {
        // Re-enable input
        console.log('🤖 Re-enabling input controls');
        chatInput.disabled = false;
        sendButton.disabled = false;
        isTyping = false;
        chatInput.focus();
    }
}

/**
 * Send a suggested message
 */
function sendSuggestion(suggestion) {
    console.log('🤖 sendSuggestion called with:', suggestion);
    sendMessage(suggestion);
}

/**
 * Send message to AI service (Flowise)
 */
async function sendToAI(message) {
    console.log('🤖 Sending message to AI:', message);
    
    // Prepare request payload for Flowise
    const payload = {
        question: message,
        // Add any additional context or parameters required by your Flowise chatflow
        overrideConfig: {
            // You can add specific configurations here if needed
        }
    };
    
    console.log('🤖 Request payload:', payload);
    console.log('🤖 API URL:', CHATBOT_CONFIG.FLOWISE_API_URL);
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add API key if required
            ...(CHATBOT_CONFIG.API_KEY && { 'Authorization': `Bearer ${CHATBOT_CONFIG.API_KEY}` })
        },
        body: JSON.stringify(payload)
    };
    
    try {
        console.log('🤖 Making fetch request...');
        const response = await fetch(CHATBOT_CONFIG.FLOWISE_API_URL, requestOptions);
        
        console.log('🤖 Response status:', response.status);
        console.log('🤖 Response headers:', response.headers);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('🤖 API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('🤖 AI Response data:', data);
        
        // Extract response text - adjust this based on your Flowise response format
        const aiResponse = data.text || data.response || data.answer || data.result || 'I received your message but had trouble formulating a response.';
        console.log('🤖 Extracted AI response:', aiResponse);
        
        return aiResponse;
        
    } catch (error) {
        console.error('🤖 AI API Error:', error);
        
        // Check if it's a CORS error
        if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
            console.error('🤖 CORS Error detected. The API might not allow cross-origin requests.');
            throw new Error('CORS error: The AI service is not accessible from this domain. Please check CORS settings.');
        }
        
        throw error;
    }
}

/**
 * Simple markdown-to-HTML renderer
 */
function parseMarkdown(text) {
    if (!text) return '';
    
    // Escape HTML first to prevent XSS
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    
    // Convert markdown to HTML
    html = html
        // Headers (### ## #)
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Bold (**text** or __text__)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        
        // Italic (*text* or _text_)
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        
        // Code blocks (```code```)
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        
        // Inline code (`code`)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Links [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        
        // Line breaks (double space or double newline)
        .replace(/  \n/g, '<br>')
        .replace(/\n\n/g, '</p><p>');
    
    // Process lists
    const lines = html.split('\n');
    let inList = false;
    let listType = '';
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isBulletList = /^[\-\*] (.+)$/.test(line);
        const isNumberedList = /^\d+\. (.+)$/.test(line);
        
        if (isBulletList || isNumberedList) {
            const newListType = isBulletList ? 'ul' : 'ol';
            const content = line.replace(/^[\-\*] /, '').replace(/^\d+\. /, '');
            
            if (!inList) {
                processedLines.push(`<${newListType}>`);
                inList = true;
                listType = newListType;
            } else if (listType !== newListType) {
                processedLines.push(`</${listType}>`);
                processedLines.push(`<${newListType}>`);
                listType = newListType;
            }
            
            processedLines.push(`<li>${content}</li>`);
        } else {
            if (inList) {
                processedLines.push(`</${listType}>`);
                inList = false;
                listType = '';
            }
            processedLines.push(line);
        }
    }
    
    // Close any remaining list
    if (inList) {
        processedLines.push(`</${listType}>`);
    }
    
    html = processedLines.join('\n');
    
    // Wrap in paragraphs if not already wrapped
    if (!html.includes('<p>') && !html.includes('<h') && !html.includes('<ul>') && !html.includes('<ol>') && !html.includes('<pre>')) {
        html = `<p>${html}</p>`;
    }
    
    return html;
}

/**
 * Add a message to the chat window
 */
function addMessage(text, sender, messageId = null) {
    console.log('🤖 addMessage called:', { text, sender, messageId });
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('🤖 chatMessages element not found');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Add unique ID for bot messages for feedback tracking
    if (sender === 'bot') {
        const id = messageId || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        messageDiv.setAttribute('data-message-id', id);
    }
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    if (sender === 'bot') {
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    } else {
        avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse markdown for bot messages, plain text for user messages
    if (sender === 'bot') {
        const parsedHtml = parseMarkdown(text);
        contentDiv.innerHTML = parsedHtml;
        
        // Add feedback buttons for bot messages
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'message-feedback';
        
        // Get theme-appropriate colors
        const colors = getThemeColors();
        
        // Add inline styles for feedback container
        feedbackDiv.style.cssText = `
            display: flex;
            gap: 8px;
            margin-top: 8px;
            justify-content: flex-start;
            opacity: 1;
        `;
        
        const thumbsUpBtn = document.createElement('button');
        thumbsUpBtn.className = 'feedback-btn feedback-thumbs-up';
        thumbsUpBtn.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        thumbsUpBtn.title = 'Good response';
        thumbsUpBtn.onclick = () => handleFeedback(messageDiv.getAttribute('data-message-id'), 'positive');
        
        // Add inline styles for thumbs up button
        thumbsUpBtn.style.cssText = `
            background: transparent;
            border: 1px solid ${colors.borderLight};
            border-radius: 8px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.8rem;
            color: ${colors.textMuted};
        `;
        
        const thumbsDownBtn = document.createElement('button');
        thumbsDownBtn.className = 'feedback-btn feedback-thumbs-down';
        thumbsDownBtn.innerHTML = '<i class="fas fa-thumbs-down"></i>';
        thumbsDownBtn.title = 'Poor response - provide feedback';
        thumbsDownBtn.onclick = () => handleFeedback(messageDiv.getAttribute('data-message-id'), 'negative');
        
        // Add inline styles for thumbs down button
        thumbsDownBtn.style.cssText = `
            background: transparent;
            border: 1px solid ${colors.borderLight};
            border-radius: 8px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.8rem;
            color: ${colors.textMuted};
        `;
        
        // Add hover effects
        thumbsUpBtn.addEventListener('mouseenter', () => {
            thumbsUpBtn.style.background = colors.bgHover;
            thumbsUpBtn.style.borderColor = colors.textSecondary;
            thumbsUpBtn.style.color = colors.textSecondary;
            thumbsUpBtn.style.transform = 'scale(1.05)';
        });
        
        thumbsUpBtn.addEventListener('mouseleave', () => {
            if (!thumbsUpBtn.classList.contains('active')) {
                thumbsUpBtn.style.background = 'transparent';
                thumbsUpBtn.style.borderColor = colors.borderLight;
                thumbsUpBtn.style.color = colors.textMuted;
                thumbsUpBtn.style.transform = 'scale(1)';
            }
        });
        
        thumbsDownBtn.addEventListener('mouseenter', () => {
            thumbsDownBtn.style.background = colors.bgHover;
            thumbsDownBtn.style.borderColor = colors.textSecondary;
            thumbsDownBtn.style.color = colors.textSecondary;
            thumbsDownBtn.style.transform = 'scale(1.05)';
        });
        
        thumbsDownBtn.addEventListener('mouseleave', () => {
            if (!thumbsDownBtn.classList.contains('active')) {
                thumbsDownBtn.style.background = 'transparent';
                thumbsDownBtn.style.borderColor = colors.borderLight;
                thumbsDownBtn.style.color = colors.textMuted;
                thumbsDownBtn.style.transform = 'scale(1)';
            }
        });
        
        feedbackDiv.appendChild(thumbsUpBtn);
        feedbackDiv.appendChild(thumbsDownBtn);
        contentDiv.appendChild(feedbackDiv);
    } else {
        const textP = document.createElement('p');
        textP.textContent = text;
        contentDiv.appendChild(textP);
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    console.log('🤖 Message added to DOM');
    
    // Store message in memory with ID for bot messages
    const messageData = { 
        text, 
        sender, 
        timestamp: new Date(),
        id: sender === 'bot' ? messageDiv.getAttribute('data-message-id') : null
    };
    chatHistory.push(messageData);
    console.log('🤖 Message stored in history. Total messages:', chatHistory.length);
    
    // Limit message history
    if (chatHistory.length > CHATBOT_CONFIG.MAX_MESSAGES) {
        const oldMessage = chatMessages.querySelector('.message');
        if (oldMessage) {
            oldMessage.remove();
        }
        chatHistory.shift();
        console.log('🤖 Removed old message. New total:', chatHistory.length);
    }
    
    // Scroll to bottom
    scrollToBottom();
    
    return messageDiv.getAttribute('data-message-id');
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const loadingDiv = document.getElementById('chatLoading');
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
        scrollToBottom();
    }
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const loadingDiv = document.getElementById('chatLoading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

/**
 * Scroll to bottom of chat
 */
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

/**
 * Handle feedback on bot messages
 */
function handleFeedback(messageId, feedbackType) {
    console.log('🤖 handleFeedback called:', { messageId, feedbackType });
    
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (!messageElement) {
        console.error('🤖 Message element not found for ID:', messageId);
        return;
    }
    
    // Find the feedback buttons
    const feedbackButtons = messageElement.querySelectorAll('.feedback-btn');
    
    if (feedbackType === 'positive') {
        // Handle positive feedback
        feedbackButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.disabled = true;
        });
        
        messageElement.querySelector('.feedback-thumbs-up').classList.add('active');
        
        // Show a brief thank you message
        showFeedbackToast('Thank you for your feedback! 👍');
        
        // Store positive feedback
        storeFeedback(messageId, feedbackType, null);
        
    } else if (feedbackType === 'negative') {
        // Handle negative feedback - show feedback form
        showFeedbackForm(messageId, messageElement);
    }
}

/**
 * Get theme-appropriate colors for styling
 */
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    return {
        modalBackground: isDark ? '#161B22' : 'white',
        textPrimary: isDark ? '#F0F6FC' : '#1a1c40',
        textSecondary: isDark ? '#8B949E' : '#6b7280',
        textMuted: isDark ? '#6E7681' : '#9ca3af',
        borderLight: isDark ? '#30363D' : '#e5e7eb',
        bgPrimary: isDark ? '#0D1117' : '#f9fafb',
        bgHover: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
        borderHover: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb'
    };
}

/**
 * Show feedback form for negative feedback
 */
function showFeedbackForm(messageId, messageElement) {
    console.log('🤖 showFeedbackForm called for message:', messageId);
    
    // Create feedback form modal
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    modal.innerHTML = `
        <div class="feedback-modal-content">
            <div class="feedback-modal-header">
                <h3>Improve This Response</h3>
                <button class="feedback-modal-close" onclick="closeFeedbackModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="feedback-modal-body">
                <p>Help us improve by telling us what was wrong with this response:</p>
                <div class="feedback-options">
                    <label class="feedback-checkbox">
                        <input type="checkbox" value="inaccurate"> Inaccurate information
                    </label>
                    <label class="feedback-checkbox">
                        <input type="checkbox" value="irrelevant"> Not relevant to my question
                    </label>
                    <label class="feedback-checkbox">
                        <input type="checkbox" value="incomplete"> Incomplete response
                    </label>
                    <label class="feedback-checkbox">
                        <input type="checkbox" value="unclear"> Unclear or confusing
                    </label>
                    <label class="feedback-checkbox">
                        <input type="checkbox" value="unhelpful"> Not helpful
                    </label>
                </div>
                <div class="feedback-text-area">
                    <label for="feedbackText">Additional feedback (optional):</label>
                    <textarea id="feedbackText" placeholder="Please provide more details about what you'd like to see improved..."></textarea>
                </div>
            </div>
            <div class="feedback-modal-footer">
                <button class="feedback-btn-cancel" onclick="closeFeedbackModal()">Cancel</button>
                <button class="feedback-btn-submit" onclick="submitFeedback('${messageId}')">Submit & Regenerate</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Get theme-appropriate colors
    const colors = getThemeColors();
    
    // Add inline styles for modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
    `;
    
    const modalContent = modal.querySelector('.feedback-modal-content');
    if (modalContent) {
        modalContent.style.cssText = `
            background: ${colors.modalBackground};
            color: ${colors.textPrimary};
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease-out;
        `;
    }
    
    const modalHeader = modal.querySelector('.feedback-modal-header');
    if (modalHeader) {
        modalHeader.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px;
            border-bottom: 1px solid ${colors.borderLight};
        `;
    }
    
    const modalBody = modal.querySelector('.feedback-modal-body');
    if (modalBody) {
        modalBody.style.cssText = `
            padding: 24px;
            color: ${colors.textPrimary};
        `;
    }
    
    const modalFooter = modal.querySelector('.feedback-modal-footer');
    if (modalFooter) {
        modalFooter.style.cssText = `
            display: flex;
            gap: 16px;
            padding: 24px;
            border-top: 1px solid ${colors.borderLight};
            justify-content: flex-end;
        `;
    }
    
    const feedbackOptions = modal.querySelector('.feedback-options');
    if (feedbackOptions) {
        feedbackOptions.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 24px;
        `;
    }
    
    const checkboxes = modal.querySelectorAll('.feedback-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.style.cssText = `
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 1px solid ${colors.borderLight};
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            background: transparent;
            color: ${colors.textPrimary};
        `;
        
        checkbox.addEventListener('mouseenter', () => {
            checkbox.style.background = colors.bgHover;
            checkbox.style.borderColor = '#00d1c1';
        });
        
        checkbox.addEventListener('mouseleave', () => {
            checkbox.style.background = 'transparent';
            checkbox.style.borderColor = colors.borderLight;
        });
    });
    
    const textarea = modal.querySelector('#feedbackText');
    if (textarea) {
        textarea.style.cssText = `
            width: 100%;
            min-height: 80px;
            padding: 16px;
            border: 1px solid ${colors.borderLight};
            border-radius: 12px;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            resize: vertical;
            transition: border-color 0.2s ease;
            box-sizing: border-box;
            background: ${colors.modalBackground};
            color: ${colors.textPrimary};
        `;
        
        textarea.addEventListener('focus', () => {
            textarea.style.outline = 'none';
            textarea.style.borderColor = '#00d1c1';
            textarea.style.boxShadow = '0 0 0 3px rgba(0, 209, 193, 0.1)';
        });
        
        textarea.addEventListener('blur', () => {
            textarea.style.borderColor = colors.borderLight;
            textarea.style.boxShadow = 'none';
        });
    }
    
    const cancelBtn = modal.querySelector('.feedback-btn-cancel');
    if (cancelBtn) {
        cancelBtn.style.cssText = `
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid ${colors.borderLight};
            font-size: 14px;
            background: transparent;
            color: ${colors.textSecondary};
        `;
        
        cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.style.background = colors.bgHover;
            cancelBtn.style.color = colors.textPrimary;
        });
        
        cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.style.background = 'transparent';
            cancelBtn.style.color = colors.textSecondary;
        });
    }
    
    const submitBtn = modal.querySelector('.feedback-btn-submit');
    if (submitBtn) {
        submitBtn.style.cssText = `
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid #00d1c1;
            font-size: 14px;
            background: #00d1c1;
            color: white;
        `;
        
        submitBtn.addEventListener('mouseenter', () => {
            submitBtn.style.background = '#00b8aa';
            submitBtn.style.borderColor = '#00b8aa';
            submitBtn.style.transform = 'translateY(-1px)';
            submitBtn.style.boxShadow = '0 4px 12px rgba(0, 209, 193, 0.3)';
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            submitBtn.style.background = '#00d1c1';
            submitBtn.style.borderColor = '#00d1c1';
            submitBtn.style.transform = 'translateY(0)';
            submitBtn.style.boxShadow = 'none';
        });
    }
    
    const closeBtn = modal.querySelector('.feedback-modal-close');
    if (closeBtn) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: ${colors.textMuted};
            transition: all 0.2s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = colors.bgHover;
            closeBtn.style.color = colors.textPrimary;
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'none';
            closeBtn.style.color = colors.textMuted;
        });
    }
    
    // Focus on the textarea
    setTimeout(() => {
        const textarea = modal.querySelector('#feedbackText');
        if (textarea) {
            textarea.focus();
        }
    }, 100);
}

/**
 * Close feedback modal
 */
function closeFeedbackModal() {
    const modal = document.querySelector('.feedback-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Submit feedback and regenerate response
 */
async function submitFeedback(messageId) {
    console.log('🤖 submitFeedback called for message:', messageId);
    
    const modal = document.querySelector('.feedback-modal');
    if (!modal) {
        console.error('🤖 Feedback modal not found');
        return;
    }
    
    // Collect feedback data
    const checkedOptions = Array.from(modal.querySelectorAll('.feedback-checkbox input:checked'))
        .map(input => input.value);
    
    const feedbackText = modal.querySelector('#feedbackText').value.trim();
    
    if (checkedOptions.length === 0 && !feedbackText) {
        alert('Please select at least one option or provide feedback text.');
        return;
    }
    
    // Store feedback
    const feedbackData = {
        options: checkedOptions,
        text: feedbackText,
        timestamp: new Date()
    };
    
    storeFeedback(messageId, 'negative', feedbackData);
    
    // Close modal
    closeFeedbackModal();
    
    // Find the original message and user's last message
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (!messageElement) {
        console.error('🤖 Message element not found for regeneration');
        return;
    }
    
    // Disable feedback buttons
    const feedbackButtons = messageElement.querySelectorAll('.feedback-btn');
    feedbackButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
    
    // Find the user's last message that prompted this bot response
    const userMessage = findUserMessageForBotResponse(messageId);
    
    if (userMessage) {
        // Show regeneration indicator
        showRegenerationIndicator(messageElement);
        
        try {
            // Regenerate response with feedback context
            const regeneratedResponse = await regenerateWithFeedback(userMessage, feedbackData);
            
            // Replace the message content
            updateMessageContent(messageElement, regeneratedResponse);
            
            // Show success toast
            showFeedbackToast('Response regenerated based on your feedback! 🔄');
            
        } catch (error) {
            console.error('🤖 Error regenerating response:', error);
            showFeedbackToast('Sorry, couldn\'t regenerate the response. Please try again.', 'error');
            
            // Re-enable feedback buttons
            feedbackButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled');
            });
        }
    } else {
        console.error('🤖 Could not find user message for regeneration');
        showFeedbackToast('Could not regenerate response. Please try asking your question again.', 'error');
    }
}

/**
 * Find the user message that prompted a bot response
 */
function findUserMessageForBotResponse(botMessageId) {
    // Find the bot message in history
    const botMessageIndex = chatHistory.findIndex(msg => msg.id === botMessageId);
    
    if (botMessageIndex === -1) {
        console.error('🤖 Bot message not found in history');
        return null;
    }
    
    // Find the previous user message
    for (let i = botMessageIndex - 1; i >= 0; i--) {
        if (chatHistory[i].sender === 'user') {
            return chatHistory[i].text;
        }
    }
    
    console.error('🤖 No user message found before bot response');
    return null;
}

/**
 * Regenerate response with feedback context
 */
async function regenerateWithFeedback(userMessage, feedbackData) {
    console.log('🤖 regenerateWithFeedback called:', { userMessage, feedbackData });
    
    // Create enhanced prompt with feedback context
    const feedbackContext = createFeedbackContext(feedbackData);
    const enhancedPrompt = `${userMessage}

[FEEDBACK CONTEXT - Previous response had issues: ${feedbackContext}. Please provide a better response addressing these concerns.]`;
    
    // Call the AI API with enhanced prompt
    const response = await sendToAI(enhancedPrompt);
    return response;
}

/**
 * Create feedback context string
 */
function createFeedbackContext(feedbackData) {
    let context = '';
    
    if (feedbackData.options.length > 0) {
        context += feedbackData.options.join(', ');
    }
    
    if (feedbackData.text) {
        if (context) context += '. ';
        context += `Additional feedback: ${feedbackData.text}`;
    }
    
    return context;
}

/**
 * Show regeneration indicator on a message
 */
function showRegenerationIndicator(messageElement) {
    console.log('🤖 Showing regeneration indicator');
    
    // Find the message content
    const messageContent = messageElement.querySelector('.message-content');
    if (!messageContent) {
        console.error('🤖 Message content not found');
        return;
    }
    
    // Create regeneration indicator
    const indicator = document.createElement('div');
    indicator.className = 'regeneration-indicator';
    indicator.innerHTML = `
        <div class="regeneration-spinner"></div>
        <span>Regenerating response based on your feedback...</span>
    `;
    
    // Add inline styles as fallback
    indicator.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px;
        margin-top: 8px;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-size: 14px;
        color: #6b7280;
        font-weight: 500;
    `;
    
    const spinner = indicator.querySelector('.regeneration-spinner');
    if (spinner) {
        spinner.style.cssText = `
            width: 16px;
            height: 16px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #00d1c1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
    }
    
    // Add to message content
    messageContent.appendChild(indicator);
    
    // Scroll to the message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Update message content with new response
 */
function updateMessageContent(messageElement, newContent) {
    console.log('🤖 Updating message content');
    
    const messageContent = messageElement.querySelector('.message-content');
    if (!messageContent) {
        console.error('🤖 Message content not found');
        return;
    }
    
    // Remove regeneration indicator if it exists
    const indicator = messageContent.querySelector('.regeneration-indicator');
    if (indicator) {
        indicator.remove();
    }
    
    // Remove existing feedback buttons and regenerated tags
    const existingFeedback = messageContent.querySelector('.message-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const existingRegenTag = messageContent.querySelector('.regenerated-tag');
    if (existingRegenTag) {
        existingRegenTag.remove();
    }
    
    // Clear the content and update with new content (with markdown parsing)
    messageContent.innerHTML = parseMarkdown(newContent);
    
    // Recreate feedback buttons for the regenerated message
    recreateFeedbackButtons(messageContent, messageElement.getAttribute('data-message-id'));
    
    // Update chat history
    const messageId = messageElement.dataset.messageId;
    if (messageId) {
        const historyItem = chatHistory.find(msg => msg.id === messageId);
        if (historyItem) {
            historyItem.text = newContent;
        }
    }
    
    // Scroll to the updated message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Recreate feedback buttons for a regenerated message
 */
function recreateFeedbackButtons(messageContent, messageId) {
    console.log('🤖 Recreating feedback buttons for message:', messageId);
    
    // Get theme-appropriate colors
    const colors = getThemeColors();
    
    // Create feedback container
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'message-feedback';
    
    // Add inline styles for feedback container
    feedbackDiv.style.cssText = `
        display: flex;
        gap: 8px;
        margin-top: 8px;
        justify-content: flex-start;
        opacity: 1;
    `;
    
    // Create thumbs up button
    const thumbsUpBtn = document.createElement('button');
    thumbsUpBtn.className = 'feedback-btn feedback-thumbs-up';
    thumbsUpBtn.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    thumbsUpBtn.title = 'Good response';
    thumbsUpBtn.onclick = () => handleFeedback(messageId, 'positive');
    
    // Add inline styles for thumbs up button
    thumbsUpBtn.style.cssText = `
        background: transparent;
        border: 1px solid ${colors.borderLight};
        border-radius: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.8rem;
        color: ${colors.textMuted};
    `;
    
    // Create thumbs down button
    const thumbsDownBtn = document.createElement('button');
    thumbsDownBtn.className = 'feedback-btn feedback-thumbs-down';
    thumbsDownBtn.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    thumbsDownBtn.title = 'Poor response - provide feedback';
    thumbsDownBtn.onclick = () => handleFeedback(messageId, 'negative');
    
    // Add inline styles for thumbs down button
    thumbsDownBtn.style.cssText = `
        background: transparent;
        border: 1px solid ${colors.borderLight};
        border-radius: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.8rem;
        color: ${colors.textMuted};
    `;
    
    // Add hover effects for thumbs up
    thumbsUpBtn.addEventListener('mouseenter', () => {
        thumbsUpBtn.style.background = colors.bgHover;
        thumbsUpBtn.style.borderColor = colors.textSecondary;
        thumbsUpBtn.style.color = colors.textSecondary;
        thumbsUpBtn.style.transform = 'scale(1.05)';
    });
    
    thumbsUpBtn.addEventListener('mouseleave', () => {
        if (!thumbsUpBtn.classList.contains('active')) {
            thumbsUpBtn.style.background = 'transparent';
            thumbsUpBtn.style.borderColor = colors.borderLight;
            thumbsUpBtn.style.color = colors.textMuted;
            thumbsUpBtn.style.transform = 'scale(1)';
        }
    });
    
    // Add hover effects for thumbs down
    thumbsDownBtn.addEventListener('mouseenter', () => {
        thumbsDownBtn.style.background = colors.bgHover;
        thumbsDownBtn.style.borderColor = colors.textSecondary;
        thumbsDownBtn.style.color = colors.textSecondary;
        thumbsDownBtn.style.transform = 'scale(1.05)';
    });
    
    thumbsDownBtn.addEventListener('mouseleave', () => {
        if (!thumbsDownBtn.classList.contains('active')) {
            thumbsDownBtn.style.background = 'transparent';
            thumbsDownBtn.style.borderColor = colors.borderLight;
            thumbsDownBtn.style.color = colors.textMuted;
            thumbsDownBtn.style.transform = 'scale(1)';
        }
    });
    
    // Append buttons to feedback container
    feedbackDiv.appendChild(thumbsUpBtn);
    feedbackDiv.appendChild(thumbsDownBtn);
    
    // Add feedback container to message content
    messageContent.appendChild(feedbackDiv);
    
    // Add regenerated indicator
    const regeneratedTag = document.createElement('div');
    regeneratedTag.className = 'regenerated-tag';
    regeneratedTag.innerHTML = '🔄 Regenerated';
    
    // Add inline styles as fallback
    regeneratedTag.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        margin-top: 8px;
        background: linear-gradient(135deg, #ecfdf5, #d1fae5);
        border: 1px solid #a7f3d0;
        border-radius: 8px;
        font-size: 12px;
        color: #065f46;
        font-weight: 500;
        width: fit-content;
    `;
    
    messageContent.appendChild(regeneratedTag);
    
    console.log('🤖 Feedback buttons recreated successfully');
}

/**
 * Store feedback data (you can enhance this to send to server)
 */
function storeFeedback(messageId, feedbackType, feedbackData) {
    console.log('🤖 Storing feedback:', { messageId, feedbackType, feedbackData });
    
    // Get existing feedback from localStorage
    let allFeedback = [];
    try {
        const stored = localStorage.getItem('chatbot_feedback');
        if (stored) {
            allFeedback = JSON.parse(stored);
        }
    } catch (error) {
        console.warn('🤖 Could not parse stored feedback:', error);
    }
    
    // Create feedback entry
    const feedbackEntry = {
        messageId,
        feedbackType,
        feedbackData,
        timestamp: new Date().toISOString(),
        sessionId: sessionId || 'unknown'
    };
    
    // Add to feedback array
    allFeedback.push(feedbackEntry);
    
    // Store back to localStorage
    try {
        localStorage.setItem('chatbot_feedback', JSON.stringify(allFeedback));
    } catch (error) {
        console.warn('🤖 Could not store feedback:', error);
    }
    
    // TODO: Send to server endpoint here
    // Example: sendFeedbackToServer(feedbackEntry);
    
    console.log('🤖 Feedback stored successfully');
}

/**
 * Show feedback toast notification
 */
function showFeedbackToast(message, type = 'success') {
    console.log('🤖 Showing feedback toast:', message, type);
    
    // Remove existing toast if any
    const existingToast = document.querySelector('.feedback-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `feedback-toast feedback-toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add inline styles as fallback
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        border: 1px solid #e5e7eb;
        border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const toastContent = toast.querySelector('.toast-content');
    if (toastContent) {
        toastContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 16px;
        `;
    }
    
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.style.cssText = `
            font-size: 14px;
            color: #1a1c40;
            font-weight: 500;
            line-height: 1.4;
        `;
    }
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Toggle resources section visibility with smooth animations
 */
function toggleResources() {
    console.log('🔧 toggleResources called');
    
    const resourcesContent = document.getElementById('resourcesContent');
    const toggleIcon = document.getElementById('resourcesToggleIcon');
    const toggleButton = document.querySelector('.resources-toggle');
    
    if (!resourcesContent || !toggleIcon || !toggleButton) {
        console.error('🔧 Resources elements not found');
        return;
    }
    
    const isVisible = resourcesContent.classList.contains('show');
    
    if (isVisible) {
        // Hide resources with animation
        resourcesContent.classList.remove('show');
        toggleIcon.className = 'fas fa-chevron-down';
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-label', 'Show additional resources');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            resourcesContent.style.display = 'none';
        }, 600);
    } else {
        // Show resources with animation
        resourcesContent.style.display = 'block';
        // Force reflow to ensure display change is applied
        resourcesContent.offsetHeight;
        
        setTimeout(() => {
            resourcesContent.classList.add('show');
            toggleIcon.className = 'fas fa-chevron-up';
            toggleButton.classList.add('active');
            toggleButton.setAttribute('aria-label', 'Hide additional resources');
            
            // Smooth scroll to the resources section after animation starts
            setTimeout(() => {
                resourcesContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        }, 50);
    }
    
    console.log('🔧 Resources toggled:', !isVisible ? 'shown' : 'hidden');
}

// Add click handler for the entire resources header
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Initialize resources toggle
    const resourcesHeader = document.querySelector('.resources-header');
    if (resourcesHeader) {
        resourcesHeader.addEventListener('click', toggleResources);
        console.log('🔧 Resources header click handler initialized');
    }
});
