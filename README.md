# James Williamson LLC

A modern, professional website combining real estate listings with interior decor shopping. Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.

## Features

### 🏠 Real Estate
- Browse 35+ property listings
- Advanced filtering by type, price, bedrooms, and location
- Interactive property modals with detailed information
- Schedule tour functionality
- Wishlist system for favorite properties

### 🏡 Interior Decor Shop
- 70+ curated home decor products
- Shopping cart with persistent storage
- Product categories and filtering
- Quick view modals
- Secure checkout process

### 👥 Team & Services
- Professional team member profiles
- Contact individual agents
- Service descriptions and packages
- Interactive contact forms

### 📱 Modern Experience
- Fully responsive mobile-first design
- Smooth animations and transitions
- Loading states with realistic delays
- Toast notifications for user feedback
- Dark mode system preference support
- Accessibility optimized

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Grid, Flexbox
- **Icons**: Font Awesome 5
- **Fonts**: Inter (body), Playfair Display (headings)
- **Data**: Mock API with localStorage persistence

## Quick Start

1. **Clone or Download**: Get the project files to your local machine
2. **Open**: Simply open `index.html` in any modern web browser
3. **Explore**: Navigate through properties, decor, team, and other sections

No build process, dependencies, or server required!

## Project Structure

```
jameswilliamsonrealtor/
├── index.html              # Main HTML document
├── styles/
│   ├── main.css            # Core styles & design system
│   ├── components.css      # Reusable UI components
│   └── responsive.css      # Mobile-responsive styles
├── js/
│   ├── data.js            # Mock data & fake API
│   ├── utils.js           # Utility functions
│   ├── components.js      # UI component generators
│   ├── app.js            # Main application logic
│   └── pages.js          # Page rendering methods
└── README.md             # This file
```

## Key Features Explained

### Realistic Backend Simulation
- All API calls include realistic delays (600-1400ms)
- Error states and loading spinners
- Persistent cart and wishlist using localStorage

### Advanced Filtering
- Multi-criteria property search
- Price range sliders
- Category-based product filtering
- Real-time search with debouncing

### Mobile Optimization
- Touch-friendly interface (44px+ tap targets)
- Smooth mobile menu animations
- Responsive breakpoints at 480px, 768px, 1024px, 1280px
- Optimized for both portrait and landscape orientations

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Respect for reduced motion preferences

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Customization

### Colors & Branding
Edit CSS custom properties in `styles/main.css`:

```css
:root {
  --color-primary: #2c2c2c;    /* Main brand color */
  --color-accent: #ff9b55;     /* Accent color */
  --color-neutral-50: #fafafa; /* Light backgrounds */
  /* ... */
}
```

### Content & Data
Modify mock data in `js/data.js`:

```javascript
// Add new properties
properties.push({
  id: 36,
  title: "Your Property",
  price: 450000,
  // ... other properties
});
```

### Styling Components
Customize component appearance in `styles/components.css`:

```css
.card {
  /* Modify card styling */
}

.btn {
  /* Customize button appearance */
}
```

## Performance Features

- Lazy loading simulation
- Debounced search inputs
- Efficient DOM updates
- GPU-accelerated animations
- Optimized for mobile devices

## Development Notes

This project demonstrates:
- Modern vanilla JavaScript patterns
- CSS Grid and Flexbox mastery
- Mobile-first responsive design
- Component-based architecture
- Realistic UX with loading states
- Professional real estate website functionality

## License

This project is part of a portfolio demonstration. Feel free to use as inspiration for your own projects.

---

**Built with ❤️ for modern web experiences**