# DIY Education Coach - Flowise Integration Setup

## 🔗 Configuring Your Flowise Chatbot

To connect your DIY Education Coach website to your Flowise chatbot, you need to update the API endpoint in the JavaScript file.

### Step 1: Get Your Flowise API Endpoint

1. Open your Flowise instance
2. Go to your chatflow
3. Click on the "API" button in the top menu
4. Copy the prediction API URL (it should look like this):
   ```
   https://your-flowise-instance.com/api/v1/prediction/your-chatflow-id
   ```

### Step 2: Update the Configuration

✅ **ALREADY CONFIGURED!** Your Flowise API endpoint has been integrated:

```javascript
FLOWISE_API_URL: 'https://myuth-flowise.hf.space/api/v1/prediction/a6fd24f4-d31f-4547-a912-949c42cdc349'
```

If you need to change it later, open `js/app.js` and find this line (around line 576).

### Step 3: Optional Configurations

You can also customize these settings in the `CHAT_CONFIG` object:

```javascript
const CHAT_CONFIG = {
    // Your actual Flowise API endpoint (already configured!)
    FLOWISE_API_URL: 'https://myuth-flowise.hf.space/api/v1/prediction/a6fd24f4-d31f-4547-a912-949c42cdc349',
    
    // Maximum message length (characters)
    MAX_MESSAGE_LENGTH: 1000,
    
    // Typing indicator delay (milliseconds)
    TYPING_DELAY: 1500,
    
    // Auto-scroll delay (milliseconds)
    AUTO_SCROLL_DELAY: 100,
    
    // Welcome message delay (milliseconds)
    WELCOME_DELAY: 500
};
```

### Step 4: Test the Integration

🚀 **Ready to Test!** Your Flowise chatbot is now integrated:

1. ✅ Configuration updated with your API endpoint
2. 🔄 Refresh your website (or it should work immediately)
3. 💬 Click the coral chat widget in the bottom-right corner
4. ✉️ Send a test message like "Hey, how are you?"
5. 🤖 You should see a response from your Flowise chatbot!

## 🔧 Troubleshooting

### Common Issues:

1. **Chat widget appears but messages don't send**
   - Check the browser console for errors
   - Verify your Flowise API URL is correct
   - Ensure your Flowise instance is running and accessible

2. **CORS (Cross-Origin) errors**
   - Configure CORS settings in your Flowise instance
   - Ensure your website domain is allowed

3. **Messages send but no response**
   - Check your Flowise chatflow configuration
   - Verify the API response format matches expected structure

### API Response Format

✅ **Your Flowise API Integration**

Your specific Flowise endpoint (`https://myuth-flowise.hf.space/...`) sends data in this format:

```javascript
// Request format (already configured):
{
  "question": "User message here"
}

// Expected response formats (handled automatically):
{
  "text": "Response message here"  // Most common
}
// OR
{
  "answer": "Response message here"
}
// OR
{
  "response": "Response message here"
}
```

The chat widget will automatically handle whichever format your Flowise chatbot returns!

## 🎨 Customization Options

### Chat Widget Colors

You can customize the chat widget colors by modifying the CSS variables in `css/styles.css`:

```css
/* Chat-specific color overrides */
.chat-toggle {
    background: linear-gradient(135deg, var(--cta-coral), var(--coral-hover));
}

.chat-header {
    background: linear-gradient(135deg, var(--navbar-midnight), var(--midnight-hover));
}

.user-message .message-content {
    background: var(--cta-coral);
}
```

### Welcome Message

To customize the welcome message, edit the HTML in `index.html` around line 171:

```html
<div class="message-content">
    <p>Your custom welcome message here! 👋</p>
</div>
```

### Chat Widget Position

To change the chat widget position, modify the CSS in `css/styles.css`:

```css
.chat-widget {
    bottom: 20px;    /* Distance from bottom */
    right: 20px;     /* Distance from right */
    /* Change to left: 20px; for left side */
}
```

## 📱 Mobile Responsiveness

The chat widget is fully responsive and will automatically adapt to different screen sizes:

- **Desktop**: Full-featured chat box (380px wide)
- **Tablet**: Slightly smaller chat box with optimized layout
- **Mobile**: Full-screen chat experience for better usability

## ♿ Accessibility Features

The chat widget includes comprehensive accessibility features:

- **Keyboard Navigation**: Use Alt+C to toggle chat, Enter to send, Escape to close
- **Screen Reader Support**: ARIA labels and live regions for announcements
- **Focus Management**: Proper focus handling for keyboard users
- **High Contrast**: Support for high contrast mode

## 🚀 Going Live

Once configured and tested:

1. Upload all files to your web server
2. Test the chat functionality in production
3. Monitor for any issues in the browser console
4. Consider setting up analytics to track chat usage

---

**Need help?** Contact the development team or check the browser console for detailed error messages.
