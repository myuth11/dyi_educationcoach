# DIY Education Coach

A student-friendly website for Republic Polytechnic students to plan, prepare, and reflect on their 15-hour DIY volunteering journey.

## 🎯 Project Overview

The DIY Education Coach is designed to empower RP students aged 17-22 from all diplomas with an interactive, AI-powered coaching experience. The website provides guidance through every stage of the volunteering process while maintaining Republic Polytechnic's brand identity and values.

## ✨ Features

### 🎨 Design & Branding
- **Republic Polytechnic Color Palette**
  - Primary: RP Green (#00703C)
  - Accent: RP Red (#C8102E)
  - Clean white background with dark gray text
- **Typography**: Roboto font family for modern readability
- **Responsive Design**: Optimized for mobile and desktop
- **Accessibility**: WCAG 2.1 AA compliant

### 🚀 Functionality
- **Interactive Chatbot**: Embedded HuggingFace AI coach
- **Smooth Navigation**: Scroll animations and section highlighting
- **Theme Toggle**: Light/dark mode support
- **Progressive Enhancement**: Works without JavaScript
- **Performance Optimized**: Lazy loading and efficient code

### ♿ Accessibility Features
- Semantic HTML5 structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion respect
- Focus management
- ARIA labels and live regions

## 📁 Project Structure

```
dyi_educationcoach/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet with RP branding
├── js/
│   └── app.js              # Interactive features and accessibility
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🛠 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Optional: Live Server extension for development

### Quick Start
1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **For development**: Use Live Server or similar tool for hot reload

### Using Live Server (Recommended)
1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Website will open at `http://localhost:5500`

## 🤖 Chatbot Integration

The website includes an embedded HuggingFace chatbot via iframe. To integrate your own chatbot:

1. Replace the iframe src in `index.html`:
   ```html
   <iframe src="https://huggingface.co/spaces/YOUR_SPACE/YOUR_FLOW">
   ```

2. Update the fallback URL in the same iframe element

## 🎨 Customization

### Colors
All colors are defined as CSS custom properties in `:root`:
```css
:root {
  --rp-green: #00703C;
  --rp-red: #C8102E;
  --rp-white: #FFFFFF;
  --rp-dark-gray: #2C2C2C;
  /* ... more variables */
}
```

### Typography
Font weights and sizes are also defined as variables:
```css
:root {
  --font-primary: 'Roboto', sans-serif;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  /* ... more typography variables */
}
```

### Spacing & Layout
Consistent spacing system using custom properties:
```css
:root {
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  /* ... more spacing variables */
}
```

## ⌨️ Keyboard Shortcuts

- **Alt + C**: Jump to chatbot section
- **Alt + T**: Toggle theme (light/dark)
- **Escape**: Remove highlights and return to top
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: > 1024px

## 🌐 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Code Structure
- **HTML**: Semantic, accessible markup
- **CSS**: Modern CSS with custom properties and Grid/Flexbox
- **JavaScript**: Vanilla JS with progressive enhancement

### Best Practices Applied
- Mobile-first responsive design
- Progressive enhancement
- Semantic HTML5
- Modern CSS Grid and Flexbox
- Accessible color contrast (4.5:1 minimum)
- Performance optimization
- Clean, maintainable code

### JavaScript Features
- Theme persistence with localStorage
- Smooth scrolling with header offset calculation
- Intersection Observer for performance
- Event delegation for efficiency
- Error handling and fallbacks

## 🎓 Educational Purpose

This project demonstrates:
- Modern web development practices
- Accessibility-first design
- Republic Polytechnic branding implementation
- Interactive user experience design
- Performance optimization techniques
- Progressive enhancement principles

## 📄 License

This project is created for educational purposes as part of Republic Polytechnic's curriculum. All RP branding and colors are used with respect to institutional guidelines.

## 🤝 Contributing

This is an educational project for Republic Polytechnic students. For improvements or suggestions:

1. Follow RP's coding standards
2. Maintain accessibility compliance
3. Test across different devices and browsers
4. Document any changes clearly

## 📞 Support

For technical support or questions about the DIY volunteering program:
- Email: diy@rp.edu.sg
- Website: [rp.edu.sg](https://www.rp.edu.sg)

---

**Made with ❤️ for Republic Polytechnic students**
