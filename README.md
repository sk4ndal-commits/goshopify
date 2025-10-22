# saleafy - Multilingual Shopify Consulting Website

A professional, responsive, and multilingual single-page website for a Shopify consulting business that helps offline small and medium-sized enterprises (SMEs) transition to online sales.

## 🌟 Features

### 🌍 Multilingual Support
- **German (Default)**: Primary language for German-speaking markets
- **English**: Secondary language option
- Instant language switching without page reload
- User preference saved in localStorage
- Dynamic content updates including forms and meta data

### 📱 Responsive Design
- Mobile-first approach
- Optimized for desktop, tablet, and mobile devices
- Sticky navigation with smooth scrolling
- Hamburger menu for mobile devices

### 🎨 Modern UI/UX
- Clean, minimal, business-oriented design
- Teal accent color (#14b8a6) with professional color palette
- Inter font family for modern typography
- Smooth animations and hover effects
- Fade-in animations on scroll

### 🚀 Interactive Features
- Contact form with real-time validation
- Auto-rotating testimonial carousel
- FAQ accordion sections
- Back-to-top button
- Smooth scroll navigation
- Loading states and success messages

## 📁 Project Structure

```
shopify-consultant/
├── index.html          # Main HTML file with multilingual content
├── styling.css         # Complete CSS styles and responsive design
├── script.js          # JavaScript functionality and language switching
└── README.md          # Project documentation
```

## 🛠 Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and CSS Grid
- **Vanilla JavaScript**: No frameworks - pure JS functionality
- **Google Fonts**: Inter font family
- **Local Storage**: For language preference persistence

## 📄 Sections

1. **Header/Navigation**
   - Logo and brand name
   - Language switcher (DE/EN)
   - Smooth scroll navigation menu

2. **Hero Section**
   - Compelling headline and subheadline
   - Call-to-action buttons
   - Gradient background design

3. **Services Section**
   - 4 core service offerings with custom SVG icons
   - Shopify Store Setup
   - Platform Migration
   - Digital Branding & Product Digitization
   - Marketing & Growth Support

4. **Process Section**
   - 4-step timeline visualization
   - Analysis → Build → Launch → Growth

5. **About Section**
   - Company information and credentials
   - Client testimonial carousel
   - Trust indicators and certifications

6. **Contact Section**
   - Contact form with validation
   - Social media links
   - Free consultation CTA

7. **FAQ Section**
   - Expandable accordion interface
   - Common questions and answers

8. **Footer**
   - Legal links and copyright
   - Company tagline

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. No build process or server setup required

### Local Development
```bash
# Navigate to project directory
cd shopify-consultant

# Open with a simple HTTP server (optional)
python -m http.server 8000
# or
npx serve .

# Access at http://localhost:8000
```

## 🌐 Language Support

### German (Default)
- Complete German translations
- German-specific business terminology
- Localized contact form and messages

### English
- Professional English content
- International business focus
- Seamless switching between languages

### Adding New Languages
To add a new language:
1. Add `data-[lang]` attributes to HTML elements
2. Update the `switchLanguage()` function in `script.js`
3. Add new language button to the navigation
4. Include translations in the error messages object

## 📱 Browser Compatibility

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)
- ⚡ Progressive enhancement for older browsers

## 🎯 Performance Features

- Optimized scroll event handling with throttling
- Intersection Observer for animations
- Minimal external dependencies
- Compressed and efficient CSS
- Fast loading times

## 🔧 Customization

### Colors
Update CSS variables in `:root` selector:
```css
--primary-color: #14b8a6;  /* Teal accent */
--dark-color: #1e293b;     /* Dark gray */
--white-color: #ffffff;    /* White */
```

### Typography
Change font family in CSS:
```css
--body-font: 'Inter', sans-serif;
```

### Content
- Edit HTML content and data attributes for translations
- Update service descriptions and testimonials
- Modify contact information and social links

## 📞 Contact Information

**saleafy**
- Email: hello@saleafy.com
- Website: [Your Domain]
- LinkedIn: [Your LinkedIn Profile]

## 📄 License

This project is developed for saleafy consulting services.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers and devices
5. Submit a pull request

## 📈 Future Enhancements

- [ ] Blog integration
- [ ] Customer portal
- [ ] Live chat functionality
- [ ] Additional language support
- [ ] CMS integration
- [ ] Analytics dashboard
- [ ] SEO optimization tools

---

**Built with ❤️ for small and medium-sized enterprises looking to grow their online presence.**

# saleafy
