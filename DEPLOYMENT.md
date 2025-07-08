# Deployment Guide - DIY Education Coach

## 🚀 Quick Deployment Options

### Option 1: Static Web Hosting
Upload all files to any web server that supports static HTML:
- **Netlify**: Drag & drop the entire folder
- **Vercel**: Connect GitHub repository for automatic deployment
- **GitHub Pages**: Push to GitHub and enable Pages
- **Firebase Hosting**: Use Firebase CLI
- **RP Web Server**: Upload via FTP/SFTP

### Option 2: Local Development Server

#### Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Website opens at `http://localhost:5500`

#### Using Node.js
```bash
# Install live-server globally
npm install -g live-server

# Navigate to project directory
cd dyi_educationcoach

# Start server
live-server --port=5500 --browser=chrome
```

#### Using Python
```bash
# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500
```

## 🔧 Pre-Deployment Checklist

### ✅ Content Updates
- [ ] Update chatbot iframe URL to your HuggingFace space
- [ ] Verify all contact information is correct
- [ ] Check that all links work properly
- [ ] Ensure Republic Polytechnic branding is accurate

### ✅ Technical Validation
- [ ] HTML validates (use W3C Validator)
- [ ] CSS validates
- [ ] JavaScript has no console errors
- [ ] All images have alt text
- [ ] Site works without JavaScript (progressive enhancement)

### ✅ Performance & Accessibility
- [ ] Test on mobile devices
- [ ] Verify keyboard navigation works
- [ ] Check color contrast ratios
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Validate loading speed

### ✅ Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Hosting Recommendations

### For Educational Use (Free)
1. **GitHub Pages**
   - Free hosting for public repositories
   - Custom domain support
   - HTTPS included
   - Easy to update via Git

2. **Netlify**
   - Drag & drop deployment
   - Form handling capabilities
   - Branch previews
   - Custom domain support

### For Production (Republic Polytechnic)
1. **RP Web Servers**
   - Follow RP's hosting guidelines
   - Use institutional domain
   - Ensure security compliance

2. **Cloud Hosting**
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps

## 📁 File Structure for Deployment

```
/public_html (or web root)
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── .htaccess (optional, for Apache servers)
```

## 🔒 Security Considerations

### Content Security Policy (Optional)
Add to `<head>` section for enhanced security:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
  font-src fonts.gstatic.com; 
  frame-src huggingface.co;
  img-src 'self' data:;
">
```

### HTTPS Requirements
- Always serve over HTTPS in production
- Update any mixed content references
- Ensure chatbot iframe uses HTTPS

## 📊 Analytics Integration (Optional)

### Google Analytics
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Update Process

### For Git-based Deployment
1. Make changes locally
2. Test thoroughly
3. Commit changes: `git add . && git commit -m "Description"`
4. Push to repository: `git push origin main`
5. Deployment happens automatically (if configured)

### For Manual Deployment
1. Make changes locally
2. Test with local server
3. Upload modified files to web server
4. Clear any caches
5. Test live site

## 📱 Mobile Optimization Verification

### Test Checklist
- [ ] Responsive layout works on all screen sizes
- [ ] Touch targets are at least 44px
- [ ] Text is readable without zooming
- [ ] Chatbot iframe works on mobile
- [ ] Theme toggle functions properly
- [ ] Navigation is thumb-friendly

## 🆘 Troubleshooting

### Common Issues

1. **Chatbot not loading**
   - Check iframe URL is correct
   - Verify HuggingFace space is public
   - Ensure HTTPS is used

2. **Styles not applying**
   - Check CSS file path
   - Verify file permissions
   - Clear browser cache

3. **JavaScript not working**
   - Check browser console for errors
   - Verify file paths are correct
   - Ensure strict mode compatibility

### Debug Tools
- Browser Developer Tools (F12)
- W3C HTML Validator
- W3C CSS Validator
- Google PageSpeed Insights
- Wave Accessibility Evaluator

---

**Ready to deploy? Follow the checklist above and your DIY Education Coach website will be live and helping RP students! 🎓**
