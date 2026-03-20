// ===== MAIN APPLICATION LOGIC =====

class jameswilliamsonRealtorApp {
  constructor() {
    this.currentPage = 'home';
    this.isLoading = false;
    this.filters = {};
    this.init();
  }

  // Initialize the application
  init() {
    this.bindEvents();
    this.setupNavigation();
    this.handleInitialRoute();
    this.initializeComponents();
    console.log('James Williamson LLC App Initialized');
  }

  // Bind global event listeners
  bindEvents() {
    // Navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        e.preventDefault();
        const page = e.target.getAttribute('href').substring(1);
        this.navigateTo(page);
      }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-menu-close');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
      });

      mobileClose?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
      });

      mobileOverlay?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
      });
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('search-modal');
    
    searchBtn?.addEventListener('click', () => {
      Modal.open('search-modal');
      const searchInput = document.getElementById('search-input');
      searchInput?.focus();
    });

    // Search input handling
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    
    if (searchInput && searchSubmit) {
      const debouncedSearch = debounce(this.handleSearch.bind(this), 300);
      
      searchInput.addEventListener('input', debouncedSearch);
      searchSubmit.addEventListener('click', () => this.handleSearch());
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSearch();
      });
    }

    // Modal close functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
        Modal.closeAll();
      }
    });

    // Wishlist and cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.wishlist-btn')) {
        this.handleWishlistToggle(e);
      }
      
      if (e.target.closest('.cart-btn')) {
        Modal.open('cart-modal');
        this.loadCartItems();
      }
      
      if (e.target.closest('.add-to-cart-btn')) {
        this.handleAddToCart(e);
      }
    });

    // Form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'newsletter-form') {
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      }
    });

    // Scroll header effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', throttle(() => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, 100));

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Modal.closeAll();
      }
    });
  }

  // Setup navigation and routing
  setupNavigation() {
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const page = e.state?.page || this.getPageFromHash();
      this.loadPage(page, false);
    });
  }

  // Handle initial route on page load
  handleInitialRoute() {
    const page = this.getPageFromHash() || 'home';
    this.loadPage(page, false);
  }

  // Get current page from URL hash
  getPageFromHash() {
    const hash = window.location.hash.substring(1);
    return hash || 'home';
  }

  // Navigate to a page
  navigateTo(page, updateHistory = true) {
    if (this.isLoading) return;
    
    this.loadPage(page, updateHistory);
  }

  // Load a page
  async loadPage(page, updateHistory = true) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    Loader.show();
    
    try {
      // Update navigation state
      this.updateNavigation(page);
      
      // Update URL
      if (updateHistory) {
        window.history.pushState({page}, '', `#${page}`);
      }
      
      // Load page content
      await this.renderPage(page);
      
      // Update current page
      this.currentPage = page;
      
      // Scroll to top
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Error loading page:', error);
      Toast.show('Error loading page. Please try again.', 'error');
    } finally {
      this.isLoading = false;
      Loader.hide();
    }
  }

  // Update navigation active states
  updateNavigation(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${page}`) {
        link.classList.add('active');
      }
    });

    // Update mobile menu links
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${page}`) {
        link.classList.add('active');
      }
    });
  }

  // Render page content
  async renderPage(page) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    let content = '';

    switch (page) {
      case 'home':
        content = await this.renderHomePage();
        break;
      case 'properties':
        content = await this.renderPropertiesPage();
        break;
      case 'decor':
        content = await this.renderDecorPage();
        break;
      case 'services':
        content = await this.renderServicesPage();
        break;
      case 'team':
        content = await this.renderTeamPage();
        break;
      case 'about':
        content = await this.renderAboutPage();
        break;
      case 'blog':
        content = await this.renderBlogPage();
        break;
      case 'contact':
        content = await this.renderContactPage();
        break;
      default:
        content = await this.render404Page();
    }

    // Add page transition
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
      mainContent.innerHTML = content;
      mainContent.style.opacity = '1';
      this.initializePageComponents();
    }, 150);
  }

  // Initialize component event listeners after page load
  initializePageComponents() {
    // Property card interactions
    document.querySelectorAll('[data-property-id]').forEach(card => {
      const propertyId = card.dataset.propertyId;
      
      card.querySelector('.view-details-btn')?.addEventListener('click', () => {
        this.viewPropertyDetails(propertyId);
      });
      
      card.querySelector('.schedule-tour-btn')?.addEventListener('click', () => {
        this.openScheduleTourModal(propertyId);
      });
    });

    // Product card interactions
    document.querySelectorAll('[data-product-id]').forEach(card => {
      const productId = card.dataset.productId;
      
      card.querySelector('.view-product-btn')?.addEventListener('click', () => {
        this.viewProductDetails(productId);
      });
      
      card.querySelector('.quick-view-btn')?.addEventListener('click', () => {
        this.openQuickViewModal(productId);
      });
    });

    // Team member interactions
    document.querySelectorAll('[data-member-id]').forEach(card => {
      const memberId = card.dataset.memberId;
      
      card.querySelector('.contact-member-btn')?.addEventListener('click', () => {
        this.openContactMemberModal(memberId);
      });
    });

    // Blog post interactions
    document.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slug = e.target.dataset.postSlug;
        this.viewBlogPost(slug);
      });
    });

    // Filter functionality
    this.initializeFilters();
    
    // Dropdown functionality
    this.initializeDropdowns();
    
    // Contact forms
    this.initializeForms();
    
    // Filter chips and buttons
    this.initializeFilterChips();

    // Re-initialize lazy loading for new content
    Observer.lazy();
    Observer.animation();
  }

  // Initialize global components
  initializeComponents() {
    // Update badges on load
    Cart.updateBadge();
    Wishlist.updateBadge();

    // Initialize any existing components
    this.initializePageComponents();
  }

  // Handle search functionality
  async handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const query = searchInput?.value.trim();

    if (!query || query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    try {
      searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
      
      const results = await fakeAPI.search(query);
      searchResults.innerHTML = Components.createSearchResults(results);
      
      // Add click handlers for search results
      searchResults.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
          const type = item.dataset.type;
          const id = item.dataset.id;
          const slug = item.dataset.slug;
          
          Modal.close('search-modal');
          
          if (type === 'property') {
            this.viewPropertyDetails(id);
          } else if (type === 'product') {
            this.viewProductDetails(id);
          } else if (type === 'blog') {
            this.viewBlogPost(slug);
          }
        });
      });
      
    } catch (error) {
      console.error('Search error:', error);
      searchResults.innerHTML = '<div class="search-error">Search failed. Please try again.</div>';
    }
  }

  // Handle wishlist toggle
  handleWishlistToggle(e) {
    e.preventDefault();
    const button = e.target.closest('.wishlist-btn');
    const propertyId = button.dataset.propertyId;
    const productId = button.dataset.productId;

    if (propertyId) {
      const property = PROPERTIES_DATA.find(p => p.id === parseInt(propertyId));
      if (property) {
        const isInWishlist = Wishlist.toggle({
          id: property.id,
          type: 'property',
          name: property.title,
          price: property.price,
          images: property.images
        });
        button.classList.toggle('active', isInWishlist);
      }
    } else if (productId) {
      const product = DECOR_PRODUCTS.find(p => p.id === parseInt(productId));
      if (product) {
        const isInWishlist = Wishlist.toggle({
          id: product.id,
          type: 'product',
          name: product.name,
          price: product.price,
          images: product.images
        });
        button.classList.toggle('active', isInWishlist);
      }
    }
  }

  // Handle add to cart
  async handleAddToCart(e) {
    e.preventDefault();
    const button = e.target.closest('.add-to-cart-btn');
    const productId = button.dataset.productId;
    
    button.classList.add('loading');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const product = DECOR_PRODUCTS.find(p => p.id === parseInt(productId));
      if (product) {
        Cart.add(product);
      }
    } catch (error) {
      Toast.show('Error adding to cart', 'error');
    } finally {
      button.classList.remove('loading');
    }
  }

  // Handle newsletter submission
  async handleNewsletterSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!Validate.email(emailInput.value)) {
      Toast.show('Please enter a valid email address', 'error');
      return;
    }
    
    submitBtn.classList.add('loading');
    
    try {
      const result = await fakeAPI.submitNewsletterForm(emailInput.value);
      Toast.show(result.message, 'success');
      form.reset();
    } catch (error) {
      Toast.show(error.message || 'Subscription failed. Please try again.', 'error');
    } finally {
      submitBtn.classList.remove('loading');
    }
  }

  // Load cart items for modal
  loadCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = Cart.get();

    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      cartTotal.textContent = '$0.00';
      return;
    }

    const itemsHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${Format.currency(item.price)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-decrease" data-id="${item.id}" data-variant="${item.variantId}">-</button>
          <span class="cart-quantity">${item.quantity}</span>
          <button class="cart-increase" data-id="${item.id}" data-variant="${item.variantId}">+</button>
        </div>
        <button class="cart-remove" data-id="${item.id}" data-variant="${item.variantId}">×</button>
      </div>
    `).join('');

    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = Format.currency(Cart.getTotal());

    // Add event listeners for cart controls
    cartItems.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const variantId = parseInt(e.target.dataset.variant);
      
      if (e.target.matches('.cart-increase')) {
        const item = cart.find(item => item.id === id && item.variantId === variantId);
        Cart.updateQuantity(id, variantId, item.quantity + 1);
        this.loadCartItems();
      } else if (e.target.matches('.cart-decrease')) {
        const item = cart.find(item => item.id === id && item.variantId === variantId);
        Cart.updateQuantity(id, variantId, item.quantity - 1);
        this.loadCartItems();
      } else if (e.target.matches('.cart-remove')) {
        Cart.remove(id, variantId);
        this.loadCartItems();
      }
    });
  }

  // Placeholder methods for detailed views (to be implemented in pages.js)
  viewPropertyDetails(propertyId) {
    console.log('View property details:', propertyId);
    // Store in recently viewed
    const property = PROPERTIES_DATA.find(p => p.id === parseInt(propertyId));
    if (property) {
      RecentlyViewed.add(property, 'property');
      // Navigate to property details page
      this.navigateTo(`property/${propertyId}`);
    }
  }

  viewProductDetails(productId) {
    console.log('View product details:', productId);
    // Store in recently viewed
    const product = DECOR_PRODUCTS.find(p => p.id === parseInt(productId));
    if (product) {
      RecentlyViewed.add(product, 'product');
      // Navigate to product details page
      this.navigateTo(`product/${productId}`);
    }
  }

  viewBlogPost(slug) {
    console.log('View blog post:', slug);
    // Navigate to blog post page
    this.navigateTo(`blog/${slug}`);
  }

  openScheduleTourModal(propertyId) {
    const property = PROPERTIES_DATA.find(p => p.id === parseInt(propertyId));
    if (!property) return;

    const modalHTML = `
      <div class="modal schedule-tour-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Schedule a Tour</h2>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="tour-property-info">
              <img src="${property.images[0]}" alt="${property.title}" class="tour-property-image">
              <div class="tour-property-details">
                <h3>${property.title}</h3>
                <p>${property.address}, ${property.city}</p>
                <div class="tour-property-price">${Format.currency(property.price)}</div>
              </div>
            </div>
            <form class="tour-form" id="tour-form">
              <input type="hidden" name="propertyId" value="${propertyId}">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Name *</label>
                  <input type="text" class="form-input" name="name" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Phone *</label>
                  <input type="tel" class="form-input" name="phone" required>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" class="form-input" name="email" required>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Preferred Date *</label>
                  <input type="date" class="form-input" name="date" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Preferred Time *</label>
                  <select class="form-select" name="time" required>
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Additional Notes</label>
                <textarea class="form-textarea" name="notes" rows="3" placeholder="Any specific requirements or questions..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost modal-close">Cancel</button>
            <button class="btn btn-primary" id="submit-tour">Schedule Tour</button>
          </div>
        </div>
      </div>
    `;

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.querySelector('.schedule-tour-modal');
    modal.classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
    
    // Handle form submission
    document.getElementById('submit-tour').addEventListener('click', async () => {
      const form = document.getElementById('tour-form');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const submitBtn = document.getElementById('submit-tour');
      submitBtn.classList.add('loading');
      
      try {
        const result = await fakeAPI.schedulePropertyTour(propertyId, data);
        Toast.show(result.message, 'success');
        modal.remove();
        Modal.closeAll();
      } catch (error) {
        Toast.show(error.message || 'Error scheduling tour', 'error');
      } finally {
        submitBtn.classList.remove('loading');
      }
    });

    // Handle modal close
    modal.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close')) {
        modal.remove();
        Modal.closeAll();
      }
    });
  }

  openQuickViewModal(productId) {
    const product = DECOR_PRODUCTS.find(p => p.id === parseInt(productId));
    if (!product) return;

    const modalHTML = `
      <div class="modal quick-view-modal modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Quick View</h2>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="quick-view-content">
              <div class="quick-view-images">
                <img src="${product.images[0]}" alt="${product.name}" class="quick-view-main-image">
                ${product.images.length > 1 ? `
                  <div class="quick-view-thumbnails">
                    ${product.images.slice(0, 4).map((img, index) => `
                      <img src="${img}" alt="${product.name}" class="quick-view-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="quick-view-details">
                <div class="quick-view-rating">
                  ${Components.createRatingStars(product.rating)}
                  <span class="rating-count">(${product.reviewCount} reviews)</span>
                </div>
                <h3>${product.name}</h3>
                <div class="quick-view-price">${Format.currency(product.price)}</div>
                <div class="quick-view-description">
                  <p>${product.description}</p>
                </div>
                <div class="quick-view-meta">
                  <p><strong>Category:</strong> ${product.category}</p>
                  <p><strong>Room:</strong> ${product.room}</p>
                  <p><strong>Style:</strong> ${product.style}</p>
                  <p><strong>Dimensions:</strong> ${product.dimensions}</p>
                </div>
                ${product.colors.length > 1 ? `
                  <div class="quick-view-variants">
                    <label>Color:</label>
                    <div class="color-options">
                      ${product.colors.map((color, index) => `
                        <button type="button" class="color-option ${index === 0 ? 'active' : ''}" data-color="${color}" title="${color}">
                          <span class="color-swatch" style="background-color: ${this.getColorValue(color)}"></span>
                          ${color}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
                <div class="quick-view-actions">
                  <button class="btn btn-primary add-to-cart-btn" data-product-id="${productId}">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                  </button>
                  <button class="btn btn-outline wishlist-btn ${Wishlist.isInWishlist(product.id, 'product') ? 'active' : ''}" data-product-id="${productId}">
                    <i class="fas fa-heart"></i> ${Wishlist.isInWishlist(product.id, 'product') ? 'Remove from' : 'Add to'} Wishlist
                  </button>
                  <button class="btn btn-outline" onclick="app.viewProductDetails('${productId}')">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.querySelector('.quick-view-modal');
    modal.classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');

    // Handle image thumbnails
    modal.querySelectorAll('.quick-view-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index);
        modal.querySelector('.quick-view-main-image').src = product.images[index];
        modal.querySelectorAll('.quick-view-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Handle color options
    modal.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => {
        modal.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
      });
    });

    // Handle modal close
    modal.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close')) {
        modal.remove();
        Modal.closeAll();
      }
    });
  }

  openContactMemberModal(memberId) {
    const member = TEAM_DATA.find(m => m.id === parseInt(memberId));
    if (!member) return;

    const modalHTML = `
      <div class="modal contact-member-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Contact ${member.name}</h2>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="contact-member-info">
              <img src="${member.image}" alt="${member.name}" class="contact-member-avatar">
              <div class="contact-member-details">
                <h3>${member.name}</h3>
                <p>${member.title}</p>
                <div class="member-specialties">
                  ${member.specialty.map(s => `<span class="badge">${s}</span>`).join('')}
                </div>
              </div>
            </div>
            <form class="contact-member-form" id="contact-member-form">
              <input type="hidden" name="memberId" value="${memberId}">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Your Name *</label>
                  <input type="text" class="form-input" name="name" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="form-input" name="phone">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" class="form-input" name="email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <select class="form-select" name="subject" required>
                  <option value="">Select subject</option>
                  <option value="consultation">Schedule Consultation</option>
                  <option value="property">Property Inquiry</option>
                  <option value="design">Design Services</option>
                  <option value="general">General Question</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea class="form-textarea" name="message" rows="4" placeholder="Tell us how we can help..." required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost modal-close">Cancel</button>
            <button class="btn btn-primary" id="submit-contact">Send Message</button>
          </div>
        </div>
      </div>
    `;

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.querySelector('.contact-member-modal');
    modal.classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
    
    // Handle form submission
    document.getElementById('submit-contact').addEventListener('click', async () => {
      const form = document.getElementById('contact-member-form');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const submitBtn = document.getElementById('submit-contact');
      submitBtn.classList.add('loading');
      
      try {
        const result = await fakeAPI.submitContactForm(data);
        Toast.show(`Message sent to ${member.name}. We'll respond within 24 hours.`, 'success');
        modal.remove();
        Modal.closeAll();
      } catch (error) {
        Toast.show(error.message || 'Error sending message', 'error');
      } finally {
        submitBtn.classList.remove('loading');
      }
    });

    // Handle modal close
    modal.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close')) {
        modal.remove();
        Modal.closeAll();
      }
    });
  }

  // Initialize filters functionality
  initializeFilters() {
    // Property filters
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const showFiltersBtn = document.getElementById('show-filters');
    
    applyFiltersBtn?.addEventListener('click', () => {
      this.applyPropertyFilters();
    });
    
    clearFiltersBtn?.addEventListener('click', () => {
      this.clearPropertyFilters();
    });
    
    showFiltersBtn?.addEventListener('click', () => {
      document.getElementById('property-filters')?.classList.add('open');
      document.querySelector('.mobile-menu-overlay')?.classList.add('open');
    });

    // Product filters
    const applyProductFiltersBtn = document.getElementById('apply-product-filters');
    const clearProductFiltersBtn = document.getElementById('clear-product-filters');
    const showProductFiltersBtn = document.getElementById('show-product-filters');
    
    applyProductFiltersBtn?.addEventListener('click', () => {
      this.applyProductFilters();
    });
    
    clearProductFiltersBtn?.addEventListener('click', () => {
      this.clearProductFilters();
    });
    
    showProductFiltersBtn?.addEventListener('click', () => {
      document.getElementById('product-filters')?.classList.add('open');
      document.querySelector('.mobile-menu-overlay')?.classList.add('open');
    });

    // Filter button groups
    document.querySelectorAll('.filter-buttons').forEach(group => {
      group.addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
          group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          
          const input = group.nextElementSibling;
          if (input && input.type === 'hidden') {
            input.value = e.target.dataset.value;
          }
        }
      });
    });

    // Color filters
    document.querySelectorAll('.color-filter').forEach(filter => {
      filter.addEventListener('click', () => {
        document.querySelectorAll('.color-filter').forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const colorInput = document.getElementById('filter-color');
        if (colorInput) {
          colorInput.value = filter.dataset.color;
        }
      });
    });

    // Price range sliders
    const priceSlider = document.getElementById('filter-price');
    const priceValue = document.getElementById('price-value');
    const productPriceSlider = document.getElementById('filter-product-price');
    const productPriceValue = document.getElementById('product-price-value');
    
    priceSlider?.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      priceValue.textContent = value >= 3000000 ? '$3,000,000+' : Format.currency(value);
    });
    
    productPriceSlider?.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      productPriceValue.textContent = value >= 1000 ? '$1,000+' : Format.currency(value);
    });

    // Filters close button
    document.querySelectorAll('.filters-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.filters').forEach(filter => filter.classList.remove('open'));
        document.querySelector('.mobile-menu-overlay')?.classList.remove('open');
      });
    });
  }

  // Initialize dropdown functionality
  initializeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const content = dropdown.querySelector('.dropdown-content');
      
      toggle?.addEventListener('click', () => {
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
        dropdown.classList.toggle('active');
      });
      
      content?.addEventListener('click', (e) => {
        if (e.target.matches('.dropdown-item')) {
          e.preventDefault();
          const value = e.target.dataset.sort;
          if (value) {
            this.applySorting(value);
          }
          dropdown.classList.remove('active');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }

  // Initialize form handling
  initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleContactFormSubmit(e.target);
    });

    // Newsletter forms
    document.querySelectorAll('[id*="newsletter"]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleNewsletterSubmit(e.target);
      });
    });
  }

  // Initialize filter chips
  initializeFilterChips() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const parent = chip.parentElement;
        parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const filterType = chip.dataset.role || chip.dataset.category;
        if (filterType !== undefined) {
          this.applyChipFilter(filterType);
        }
      });
    });
    
    // View toggle buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.changeView(view);
      });
    });
  }

  // Filter application methods
  applyPropertyFilters() {
    const filters = {
      propertyType: document.getElementById('filter-property-type')?.value || '',
      status: document.getElementById('filter-status')?.value || '',
      maxPrice: document.getElementById('filter-price')?.value || '3000000',
      beds: document.getElementById('filter-beds')?.value || '',
      baths: document.getElementById('filter-baths')?.value || ''
    };
    
    const url = new URL(window.location);
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        url.searchParams.set(key, filters[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    
    window.history.pushState({}, '', url);
    this.loadPage('properties', false);
  }

  clearPropertyFilters() {
    // Reset all form elements
    document.getElementById('filter-property-type').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-price').value = '3000000';
    document.getElementById('filter-beds').value = '';
    document.getElementById('filter-baths').value = '';
    
    // Clear URL parameters
    const url = new URL(window.location);
    ['propertyType', 'status', 'maxPrice', 'beds', 'baths'].forEach(param => {
      url.searchParams.delete(param);
    });
    
    window.history.pushState({}, '', url);
    this.loadPage('properties', false);
  }

  applyProductFilters() {
    const filters = {
      category: document.getElementById('filter-category')?.value || '',
      room: document.getElementById('filter-room')?.value || '',
      style: document.getElementById('filter-style')?.value || '',
      maxPrice: document.getElementById('filter-product-price')?.value || '1000',
      color: document.getElementById('filter-color')?.value || ''
    };
    
    const url = new URL(window.location);
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        url.searchParams.set(key, filters[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    
    window.history.pushState({}, '', url);
    this.loadPage('decor', false);
  }

  clearProductFilters() {
    // Reset all form elements
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-room').value = '';
    document.getElementById('filter-style').value = '';
    document.getElementById('filter-product-price').value = '1000';
    document.getElementById('filter-color').value = '';
    
    // Clear URL parameters
    const url = new URL(window.location);
    ['category', 'room', 'style', 'maxPrice', 'color'].forEach(param => {
      url.searchParams.delete(param);
    });
    
    window.history.pushState({}, '', url);
    this.loadPage('decor', false);
  }

  applySorting(sortValue) {
    const url = new URL(window.location);
    url.searchParams.set('sort', sortValue);
    window.history.pushState({}, '', url);
    
    if (this.currentPage === 'properties') {
      this.loadPage('properties', false);
    } else if (this.currentPage === 'decor') {
      this.loadPage('decor', false);
    }
  }

  applyChipFilter(filterValue) {
    const url = new URL(window.location);
    if (filterValue) {
      if (this.currentPage === 'team') {
        url.searchParams.set('role', filterValue);
      } else if (this.currentPage === 'blog') {
        url.searchParams.set('category', filterValue);
      }
    } else {
      url.searchParams.delete('role');
      url.searchParams.delete('category');
    }
    
    window.history.pushState({}, '', url);
    this.loadPage(this.currentPage, false);
  }

  changeView(view) {
    const url = new URL(window.location);
    url.searchParams.set('view', view);
    window.history.pushState({}, '', url);
    this.loadPage('properties', false);
  }

  // Contact form submission
  async handleContactFormSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      Toast.show('Please fill in all required fields', 'error');
      return;
    }
    
    if (!Validate.email(data.email)) {
      Toast.show('Please enter a valid email address', 'error');
      return;
    }
    
    submitBtn.classList.add('loading');
    
    try {
      const result = await fakeAPI.submitContactForm(data);
      Toast.show(result.message, 'success');
      form.reset();
    } catch (error) {
      Toast.show(error.message || 'Error sending message. Please try again.', 'error');
    } finally {
      submitBtn.classList.remove('loading');
    }
  }

  // Helper method to get color values
  getColorValue(colorName) {
    const colors = {
      'White': '#ffffff',
      'Black': '#000000',
      'Gray': '#808080',
      'Navy': '#000080',
      'Natural': '#d2b48c',
      'Gold': '#ffd700',
      'Green': '#008000',
      'Blue': '#0000ff'
    };
    return colors[colorName] || '#cccccc';
  }

  // Page rendering methods (basic structure - detailed implementation in pages.js)
  async renderHomePage() {
    return '<div class="page" id="home-page"><h1>Loading...</h1></div>';
  }

  async renderPropertiesPage() {
    return '<div class="page" id="properties-page"><h1>Loading...</h1></div>';
  }

  async renderDecorPage() {
    return '<div class="page" id="decor-page"><h1>Loading...</h1></div>';
  }

  async renderServicesPage() {
    return '<div class="page" id="services-page"><h1>Loading...</h1></div>';
  }

  async renderTeamPage() {
    return '<div class="page" id="team-page"><h1>Loading...</h1></div>';
  }

  async renderAboutPage() {
    return '<div class="page" id="about-page"><h1>Loading...</h1></div>';
  }

  async renderBlogPage() {
    return '<div class="page" id="blog-page"><h1>Loading...</h1></div>';
  }

  async renderContactPage() {
    return '<div class="page" id="contact-page"><h1>Loading...</h1></div>';
  }

  async render404Page() {
    return `
      <div class="page" id="error-page">
        <div class="container">
          <div class="error-content">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <button class="btn btn-primary" onclick="app.navigateTo('home')">Go Home</button>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.app = new jameswilliamsonRealtorApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page is hidden - pause any animations or API calls
  } else {
    // Page is visible - resume operations
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  Toast.show('You\'re back online!', 'success');
});

window.addEventListener('offline', () => {
  Toast.show('You\'re offline. Some features may be limited.', 'warning');
});