// ===== PAGE IMPLEMENTATIONS =====

// Extend the main app class with detailed page rendering
Object.assign(jameswilliamsonRealtorApp.prototype, {

  // ===== HOME PAGE =====
  async renderHomePage() {
    try {
      // Load data for home page
      const [featuredProperties, featuredProducts] = await Promise.all([
        fakeAPI.getFeaturedProperties(6),
        fakeAPI.getFeaturedProducts(8)
      ]);

      return `
        <div class="page home-page" id="home-page">
          <!-- Hero Section -->
          <section class="hero">
            <div class="hero-background">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" alt="Luxury Home Interior" class="hero-image">
              <div class="hero-overlay"></div>
            </div>
            <div class="hero-content">
              <div class="container">
                <div class="hero-text">
                  <h1 class="hero-title">Your Dream Home Awaits</h1>
                  <p class="hero-subtitle">Discover exceptional properties and create beautiful interiors with James Williamson LLC. Where luxury living meets impeccable design.</p>
                  <div class="hero-ctas">
                    <button class="btn btn-primary btn-lg" onclick="app.navigateTo('properties')">
                      <i class="fas fa-home"></i> Explore Properties
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="app.navigateTo('decor')">
                      <i class="fas fa-palette"></i> Shop Decor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Services Preview -->
          <section class="services-preview section-padding">
            <div class="container">
              <div class="section-header text-center">
                <h2>Complete Real Estate & Design Solutions</h2>
                <p>From finding your perfect home to creating stunning interiors, we're here for every step of your journey.</p>
              </div>
              <div class="services-grid grid grid-3 gap-8">
                <div class="service-card">
                  <div class="service-icon">
                    <i class="fas fa-home"></i>
                  </div>
                  <h3>Real Estate Excellence</h3>
                  <p>Expert guidance for buying, selling, and investing in premium properties.</p>
                  <button class="btn btn-outline" onclick="app.navigateTo('services')">Learn More</button>
                </div>
                <div class="service-card">
                  <div class="service-icon">
                    <i class="fas fa-palette"></i>
                  </div>
                  <h3>Interior Design</h3>
                  <p>Professional design services to transform your space into a masterpiece.</p>
                  <button class="btn btn-outline" onclick="app.navigateTo('services')">Learn More</button>
                </div>
                <div class="service-card">
                  <div class="service-icon">
                    <i class="fas fa-shopping-bag"></i>
                  </div>
                  <h3>Curated Decor</h3>
                  <p>Handpicked furniture and decor pieces to complete your perfect home.</p>
                  <button class="btn btn-outline" onclick="app.navigateTo('decor')">Shop Now</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Featured Properties -->
          <section class="featured-properties section-padding">
            <div class="container">
              <div class="section-header">
                <h2>Featured Properties</h2>
                <p>Discover our handpicked selection of exceptional homes and investment opportunities.</p>
                <button class="btn btn-outline" onclick="app.navigateTo('properties')">View All Properties</button>
              </div>
              <div class="properties-grid grid grid-3 gap-6" id="featured-properties">
                ${featuredProperties.map(property => Components.createPropertyCard(property)).join('')}
              </div>
            </div>
          </section>

          <!-- Featured Products -->
          <section class="featured-products section-padding">
            <div class="container">
              <div class="section-header">
                <h2>Featured Decor</h2>
                <p>Transform your space with our curated collection of premium furniture and decor.</p>
                <button class="btn btn-outline" onclick="app.navigateTo('decor')">Shop All Decor</button>
              </div>
              <div class="products-grid grid grid-4 gap-6" id="featured-products">
                ${featuredProducts.map(product => Components.createProductCard(product)).join('')}
              </div>
            </div>
          </section>

          <!-- Statistics -->
          <section class="statistics section-padding">
            <div class="container">
              <div class="stats-grid grid grid-4 gap-6">
                <div class="stat-item">
                  <div class="stat-number" data-target="500">0</div>
                  <div class="stat-label">Homes Sold</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number" data-target="98">0</div>
                  <div class="stat-label">Client Satisfaction %</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number" data-target="15">0</div>
                  <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number" data-target="1200">0</div>
                  <div class="stat-label">Happy Families</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Testimonials -->
          <section class="testimonials section-padding">
            <div class="container">
              <div class="section-header text-center">
                <h2>What Our Clients Say</h2>
                <p>Real stories from families who found their perfect homes with us.</p>
              </div>
              <div class="testimonials-grid grid grid-3 gap-8">
                ${this.renderTestimonials()}
              </div>
            </div>
          </section>

          <!-- Newsletter CTA -->
          <section class="newsletter-cta section-padding">
            <div class="container">
              <div class="newsletter-content text-center">
                <h2>Stay Updated</h2>
                <p>Get the latest property listings and design trends delivered to your inbox.</p>
                <form class="newsletter-form-inline" id="home-newsletter-form">
                  <input type="email" placeholder="Enter your email address" required>
                  <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering home page:', error);
      return this.renderErrorPage('Unable to load home page content.');
    }
  },

  // ===== PROPERTIES PAGE =====
  async renderPropertiesPage() {
    try {
      const params = URL.getParams();
      const filters = {
        page: parseInt(params.get('page')) || 1,
        status: params.get('status') || '',
        propertyType: params.get('type') || '',
        minPrice: parseInt(params.get('minPrice')) || 0,
        maxPrice: parseInt(params.get('maxPrice')) || 5000000,
        beds: parseInt(params.get('beds')) || '',
        baths: parseInt(params.get('baths')) || '',
        city: params.get('city') || '',
        sort: params.get('sort') || 'newest',
        view: params.get('view') || 'grid'
      };

      const propertiesData = await fakeAPI.getProperties(filters);

      return `
        <div class="page properties-page" id="properties-page">
          <div class="page-header">
            <div class="container">
              ${Components.createBreadcrumbs([
                {text: 'Home', url: '#home'},
                {text: 'Properties', url: '#properties'}
              ])}
              <h1>Properties</h1>
              <p>Find your perfect home from our curated selection of premium properties.</p>
            </div>
          </div>

          <div class="properties-content">
            <div class="container">
              <div class="properties-layout">
                <!-- Filters Sidebar -->
                <aside class="properties-sidebar">
                  ${Components.createFiltersHTML('properties')}
                </aside>

                <!-- Properties List -->
                <main class="properties-main">
                  <!-- Controls Bar -->
                  <div class="properties-controls">
                    <div class="controls-left">
                      <button class="btn btn-outline mobile-only" id="show-filters">
                        <i class="fas fa-filter"></i> Filters
                      </button>
                      <span class="results-count">${propertiesData.total} Properties Found</span>
                    </div>
                    <div class="controls-right">
                      <div class="sort-dropdown dropdown">
                        <button class="dropdown-toggle" id="sort-toggle">
                          <span>Sort: ${this.getSortLabel(filters.sort)}</span>
                          <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-content">
                          <a href="#" class="dropdown-item" data-sort="newest">Newest First</a>
                          <a href="#" class="dropdown-item" data-sort="oldest">Oldest First</a>
                          <a href="#" class="dropdown-item" data-sort="price-low">Price: Low to High</a>
                          <a href="#" class="dropdown-item" data-sort="price-high">Price: High to Low</a>
                        </div>
                      </div>
                      <div class="view-toggle">
                        <button class="view-btn ${filters.view === 'grid' ? 'active' : ''}" data-view="grid">
                          <i class="fas fa-th"></i>
                        </button>
                        <button class="view-btn ${filters.view === 'list' ? 'active' : ''}" data-view="list">
                          <i class="fas fa-list"></i>
                        </button>
                        <button class="view-btn ${filters.view === 'map' ? 'active' : ''}" data-view="map">
                          <i class="fas fa-map"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Properties Grid/List -->
                  ${filters.view === 'map' 
                    ? this.renderMapView(propertiesData.properties)
                    : `<div class="properties-grid ${filters.view}-view" id="properties-grid">
                         ${propertiesData.properties.length > 0 
                           ? propertiesData.properties.map(property => 
                               Components.createPropertyCard(property, filters.view)
                             ).join('')
                           : this.renderEmptyState('properties')
                         }
                       </div>`
                  }

                  <!-- Pagination -->
                  ${propertiesData.totalPages > 1 
                    ? Components.createPagination(filters.page, propertiesData.totalPages)
                    : ''
                  }
                </main>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering properties page:', error);
      return this.renderErrorPage('Unable to load properties.');
    }
  },

  // ===== DECOR SHOP PAGE =====
  async renderDecorPage() {
    try {
      const params = URL.getParams();
      const filters = {
        page: parseInt(params.get('page')) || 1,
        category: params.get('category') || '',
        room: params.get('room') || '',
        style: params.get('style') || '',
        minPrice: parseInt(params.get('minPrice')) || 0,
        maxPrice: parseInt(params.get('maxPrice')) || 1000,
        color: params.get('color') || '',
        sort: params.get('sort') || 'newest'
      };

      const productsData = await fakeAPI.getProducts(filters);

      return `
        <div class="page decor-page" id="decor-page">
          <div class="page-header">
            <div class="container">
              ${Components.createBreadcrumbs([
                {text: 'Home', url: '#home'},
                {text: 'Decor Shop', url: '#decor'}
              ])}
              <h1>Decor Shop</h1>
              <p>Transform your space with our curated collection of premium furniture and decor.</p>
            </div>
          </div>

          <div class="decor-content">
            <div class="container">
              <div class="decor-layout">
                <!-- Filters Sidebar -->
                <aside class="decor-sidebar">
                  ${Components.createFiltersHTML('products')}
                </aside>

                <!-- Products Grid -->
                <main class="decor-main">
                  <!-- Controls Bar -->
                  <div class="decor-controls">
                    <div class="controls-left">
                      <button class="btn btn-outline mobile-only" id="show-product-filters">
                        <i class="fas fa-filter"></i> Filters
                      </button>
                      <span class="results-count">${productsData.total} Products Found</span>
                    </div>
                    <div class="controls-right">
                      <div class="sort-dropdown dropdown">
                        <button class="dropdown-toggle" id="product-sort-toggle">
                          <span>Sort: ${this.getSortLabel(filters.sort, 'product')}</span>
                          <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-content">
                          <a href="#" class="dropdown-item" data-sort="newest">Newest</a>
                          <a href="#" class="dropdown-item" data-sort="price-low">Price: Low to High</a>
                          <a href="#" class="dropdown-item" data-sort="price-high">Price: High to Low</a>
                          <a href="#" class="dropdown-item" data-sort="rating">Highest Rated</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Products Grid -->
                  <div class="products-grid grid grid-4 gap-6" id="products-grid">
                    ${productsData.products.length > 0 
                      ? productsData.products.map(product => Components.createProductCard(product)).join('')
                      : this.renderEmptyState('products')
                    }
                  </div>

                  <!-- Pagination -->
                  ${productsData.totalPages > 1 
                    ? Components.createPagination(filters.page, productsData.totalPages)
                    : ''
                  }
                </main>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering decor page:', error);
      return this.renderErrorPage('Unable to load decor products.');
    }
  },

  // ===== TEAM PAGE =====
  async renderTeamPage() {
    try {
      const teamData = await fakeAPI.getTeam();
      const roleFilter = URL.getParams().get('role') || '';
      
      const filteredTeam = roleFilter 
        ? teamData.filter(member => member.role === roleFilter)
        : teamData;

      return `
        <div class="page team-page" id="team-page">
          <div class="page-header">
            <div class="container">
              ${Components.createBreadcrumbs([
                {text: 'Home', url: '#home'},
                {text: 'Our Team', url: '#team'}
              ])}
              <h1>Meet Our Team</h1>
              <p>Experienced professionals dedicated to helping you find your perfect home and create beautiful spaces.</p>
            </div>
          </div>

          <div class="team-content section-padding">
            <div class="container">
              <!-- Role Filters -->
              <div class="team-filters">
                <div class="filter-chips">
                  <button class="filter-chip ${!roleFilter ? 'active' : ''}" data-role="">All Team</button>
                  <button class="filter-chip ${roleFilter === 'Realtor' ? 'active' : ''}" data-role="Realtor">Realtors</button>
                  <button class="filter-chip ${roleFilter === 'Interior Consultant' ? 'active' : ''}" data-role="Interior Consultant">Designers</button>
                  <button class="filter-chip ${roleFilter === 'Operations' ? 'active' : ''}" data-role="Operations">Operations</button>
                  <button class="filter-chip ${roleFilter === 'Support' ? 'active' : ''}" data-role="Support">Support</button>
                </div>
              </div>

              <!-- Team Grid -->
              <div class="team-grid grid grid-4 gap-8" id="team-grid">
                ${filteredTeam.map(member => Components.createTeamCard(member)).join('')}
              </div>

              <!-- Team Stats -->
              <div class="team-stats section-padding">
                <div class="stats-grid grid grid-4 gap-6">
                  <div class="stat-item">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Years Combined Experience</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Homes Sold</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">200+</div>
                    <div class="stat-label">Design Projects</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">98%</div>
                    <div class="stat-label">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              <!-- Contact CTA -->
              <div class="team-cta text-center">
                <h2>Ready to Work Together?</h2>
                <p>Our team is here to help you with all your real estate and design needs.</p>
                <button class="btn btn-primary btn-lg" onclick="app.navigateTo('contact')">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering team page:', error);
      return this.renderErrorPage('Unable to load team information.');
    }
  },

  // ===== SERVICES PAGE =====
  async renderServicesPage() {
    return `
      <div class="page services-page" id="services-page">
        <div class="page-header">
          <div class="container">
            ${Components.createBreadcrumbs([
              {text: 'Home', url: '#home'},
              {text: 'Services', url: '#services'}
            ])}
            <h1>Our Services</h1>
            <p>Comprehensive real estate and interior design services to make your dream home a reality.</p>
          </div>
        </div>

        <div class="services-content section-padding">
          <div class="container">
            <!-- Real Estate Services -->
            <div class="service-category">
              <div class="service-category-header">
                <h2>Real Estate Services</h2>
                <p>Professional guidance through every step of your real estate journey.</p>
              </div>
              <div class="services-grid grid grid-3 gap-8">
                ${this.renderRealEstateServices()}
              </div>
            </div>

            <!-- Interior Design Services -->
            <div class="service-category">
              <div class="service-category-header">
                <h2>Interior Design Services</h2>
                <p>Transform your space with our expert design consultation and staging services.</p>
              </div>
              <div class="services-grid grid grid-3 gap-8">
                ${this.renderInteriorServices()}
              </div>
            </div>

            <!-- Process Section -->
            <div class="process-section section-padding">
              <h2 class="text-center">Our Process</h2>
              <div class="process-steps">
                ${this.renderProcessSteps()}
              </div>
            </div>

            <!-- CTA Section -->
            <div class="services-cta text-center">
              <h2>Ready to Get Started?</h2>
              <p>Contact us today for a free consultation and let's discuss your project.</p>
              <div class="cta-buttons">
                <button class="btn btn-primary btn-lg" onclick="app.navigateTo('contact')">
                  Schedule Consultation
                </button>
                <button class="btn btn-outline btn-lg" onclick="app.navigateTo('properties')">
                  View Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===== ABOUT PAGE =====
  async renderAboutPage() {
    return `
      <div class="page about-page" id="about-page">
        <div class="page-header">
          <div class="container">
            ${Components.createBreadcrumbs([
              {text: 'Home', url: '#home'},
              {text: 'About Us', url: '#about'}
            ])}
            <h1>About James Williamson LLC</h1>
            <p>Your trusted partner in real estate and interior design for over 15 years.</p>
          </div>
        </div>

        <div class="about-content section-padding">
          <div class="container">
            <!-- Story Section -->
            <div class="about-story">
              <div class="grid grid-2 gap-12 items-center">
                <div>
                  <h2>Our Story</h2>
                  <p>Founded in 2011, James Williamson LLC began with a simple vision: to provide exceptional real estate services while helping clients create beautiful, functional living spaces. What started as a boutique real estate firm has evolved into a comprehensive lifestyle brand that seamlessly blends property expertise with interior design excellence.</p>
                  <p>Our unique approach combines deep market knowledge with refined design sensibility, ensuring that our clients not only find their perfect home but also transform it into a space that truly reflects their lifestyle and aspirations.</p>
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" alt="About Us" class="about-image">
                </div>
              </div>
            </div>

            <!-- Mission & Values -->
            <div class="mission-values section-padding">
              <div class="grid grid-3 gap-8">
                <div class="value-card">
                  <div class="value-icon">
                    <i class="fas fa-star"></i>
                  </div>
                  <h3>Excellence</h3>
                  <p>We maintain the highest standards in everything we do, from property selection to design execution.</p>
                </div>
                <div class="value-card">
                  <div class="value-icon">
                    <i class="fas fa-heart"></i>
                  </div>
                  <h3>Personalized Service</h3>
                  <p>Every client receives individualized attention and solutions tailored to their unique needs and style.</p>
                </div>
                <div class="value-card">
                  <div class="value-icon">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <h3>Trust & Integrity</h3>
                  <p>We build lasting relationships through honest communication and transparent business practices.</p>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="timeline-section section-padding">
              <h2 class="text-center">Our Journey</h2>
              <div class="timeline">
                ${this.renderTimeline()}
              </div>
            </div>

            <!-- Awards & Recognition -->
            <div class="awards-section section-padding">
              <h2 class="text-center">Recognition & Awards</h2>
              <div class="awards-grid grid grid-4 gap-6">
                <div class="award-item">
                  <i class="fas fa-trophy"></i>
                  <h4>Top Realtor 2024</h4>
                  <p>Regional Real Estate Board</p>
                </div>
                <div class="award-item">
                  <i class="fas fa-medal"></i>
                  <h4>Design Excellence</h4>
                  <p>Interior Design Association</p>
                </div>
                <div class="award-item">
                  <i class="fas fa-star"></i>
                  <h4>Client Choice Award</h4>
                  <p>Customer Service Excellence</p>
                </div>
                <div class="award-item">
                  <i class="fas fa-certificate"></i>
                  <h4>Luxury Specialist</h4>
                  <p>High-End Property Division</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===== BLOG PAGE =====
  async renderBlogPage() {
    try {
      const blogPosts = await fakeAPI.getBlogPosts();
      const categoryFilter = URL.getParams().get('category') || '';
      
      const filteredPosts = categoryFilter 
        ? blogPosts.filter(post => post.category === categoryFilter)
        : blogPosts;

      return `
        <div class="page blog-page" id="blog-page">
          <div class="page-header">
            <div class="container">
              ${Components.createBreadcrumbs([
                {text: 'Home', url: '#home'},
                {text: 'Blog', url: '#blog'}
              ])}
              <h1>Blog</h1>
              <p>Expert insights on real estate trends, interior design tips, and home lifestyle.</p>
            </div>
          </div>

          <div class="blog-content section-padding">
            <div class="container">
              <!-- Category Filters -->
              <div class="blog-filters">
                <div class="filter-chips">
                  <button class="filter-chip ${!categoryFilter ? 'active' : ''}" data-category="">All Posts</button>
                  <button class="filter-chip ${categoryFilter === 'Real Estate' ? 'active' : ''}" data-category="Real Estate">Real Estate</button>
                  <button class="filter-chip ${categoryFilter === 'Interior Design' ? 'active' : ''}" data-category="Interior Design">Interior Design</button>
                  <button class="filter-chip ${categoryFilter === 'Home Staging' ? 'active' : ''}" data-category="Home Staging">Home Staging</button>
                  <button class="filter-chip ${categoryFilter === 'Market Analysis' ? 'active' : ''}" data-category="Market Analysis">Market Analysis</button>
                </div>
              </div>

              <!-- Blog Grid -->
              <div class="blog-grid grid grid-3 gap-8" id="blog-grid">
                ${filteredPosts.map(post => Components.createBlogCard(post)).join('')}
              </div>

              <!-- Load More Button -->
              ${filteredPosts.length >= 6 ? `
                <div class="text-center">
                  <button class="btn btn-outline" id="load-more-posts">Load More Posts</button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error rendering blog page:', error);
      return this.renderErrorPage('Unable to load blog posts.');
    }
  },

  // ===== CONTACT PAGE =====
  async renderContactPage() {
    return `
      <div class="page contact-page" id="contact-page">
        <div class="page-header">
          <div class="container">
            ${Components.createBreadcrumbs([
              {text: 'Home', url: '#home'},
              {text: 'Contact', url: '#contact'}
            ])}
            <h1>Contact Us</h1>
            <p>Ready to find your dream home or start your design project? Get in touch with our team.</p>
          </div>
        </div>

        <div class="contact-content section-padding">
          <div class="container">
            <div class="contact-layout grid grid-2 gap-12">
              <!-- Contact Form -->
              <div class="contact-form-section">
                <h2>Send us a Message</h2>
                <form class="contact-form" id="contact-form">
                  <div class="form-group">
                    <label class="form-label">Name *</label>
                    <input type="text" class="form-input" name="name" required>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Email *</label>
                      <input type="email" class="form-input" name="email" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Phone</label>
                      <input type="tel" class="form-input" name="phone">
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Subject *</label>
                    <select class="form-select" name="subject" required>
                      <option value="">Select a subject</option>
                      <option value="buying">I'm interested in buying</option>
                      <option value="selling">I want to sell my property</option>
                      <option value="renting">I'm looking to rent</option>
                      <option value="design">Interior design consultation</option>
                      <option value="staging">Home staging services</option>
                      <option value="general">General inquiry</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Message *</label>
                    <textarea class="form-textarea" name="message" rows="5" placeholder="Tell us about your needs, timeline, and any specific requirements..." required></textarea>
                  </div>
                  
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg">
                      <i class="fas fa-paper-plane"></i>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              <!-- Contact Information -->
              <div class="contact-info-section">
                <h2>Get in Touch</h2>
                
                <div class="contact-methods">
                  <div class="contact-method">
                    <div class="contact-icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Visit Our Office</h4>
                      <p>123 Main Street<br>Downtown District<br>City, State 12345</p>
                    </div>
                  </div>
                  
                  <div class="contact-method">
                    <div class="contact-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Call Us</h4>
                      <p>Main: (810) 288-5412<br>Mobile: (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div class="contact-method">
                    <div class="contact-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Email Us</h4>
                      <p>jamesghini@gmail.com<br>support@jameswilliamsonrealtor.com</p>
                    </div>
                  </div>
                  
                  <div class="contact-method">
                    <div class="contact-icon">
                      <i class="fas fa-clock"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Office Hours</h4>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>

                <!-- Map Placeholder -->
                <div class="contact-map">
                  <div class="map-placeholder">
                    <i class="fas fa-map"></i>
                    <p>Interactive Map</p>
                    <small>Click to view location</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===== HELPER METHODS =====
  
  renderTestimonials() {
    const testimonials = [
      {
        name: "Sarah & Mike Johnson",
        text: "Shawn and his team made our home buying experience seamless and enjoyable. Their attention to detail and professional guidance was exceptional.",
        rating: 5,
        image: getRandomImage('team')
      },
      {
        name: "Emily Rodriguez",
        text: "The interior design consultation transformed our space completely. Emma's vision and expertise brought our dream home to life.",
        rating: 5,
        image: getRandomImage('team')
      },
      {
        name: "David Chen",
        text: "Professional, knowledgeable, and genuinely caring. They helped us find the perfect investment property and guided us through every step.",
        rating: 5,
        image: getRandomImage('team')
      }
    ];

    return testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-rating">
          ${Components.createRatingStars(testimonial.rating)}
        </div>
        <div class="testimonial-text">
          "${testimonial.text}"
        </div>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
          <div class="testimonial-name">${testimonial.name}</div>
        </div>
      </div>
    `).join('');
  },

  getSortLabel(sort, type = 'property') {
    const labels = {
      newest: 'Newest First',
      oldest: 'Oldest First',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      rating: 'Highest Rated'
    };
    return labels[sort] || 'Newest First';
  },

  renderMapView(properties) {
    return `
      <div class="map-view">
        <div class="map-container">
          <div class="map-placeholder">
            <i class="fas fa-map-marked-alt"></i>
            <h3>Interactive Property Map</h3>
            <p>Map view would show ${properties.length} properties with interactive markers</p>
          </div>
        </div>
        <div class="map-sidebar">
          <div class="map-properties">
            ${properties.slice(0, 5).map(property => `
              <div class="map-property-card" data-property-id="${property.id}">
                <img src="${property.images[0]}" alt="${property.title}" class="map-property-image">
                <div class="map-property-details">
                  <div class="map-property-title">${property.title}</div>
                  <div class="map-property-price">${Format.currency(property.price)}</div>
                  <div class="map-property-meta">${property.beds} bed • ${property.baths} bath</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderEmptyState(type) {
    const messages = {
      properties: {
        title: 'No Properties Found',
        message: 'Try adjusting your search criteria or browse all properties.',
        action: 'View All Properties'
      },
      products: {
        title: 'No Products Found',
        message: 'Try different filters or browse our full collection.',
        action: 'Shop All Products'
      }
    };

    const config = messages[type] || messages.properties;

    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>${config.title}</h3>
        <p>${config.message}</p>
        <button class="btn btn-primary" onclick="this.clearFilters()">${config.action}</button>
      </div>
    `;
  },

  renderRealEstateServices() {
    const services = [
      {
        icon: 'fas fa-home',
        title: 'Home Buying',
        description: 'Find your perfect home with our expert guidance and market knowledge.',
        features: ['Property Search', 'Market Analysis', 'Negotiation', 'Closing Support']
      },
      {
        icon: 'fas fa-dollar-sign',
        title: 'Home Selling',
        description: 'Maximize your property value with our proven selling strategies.',
        features: ['Property Valuation', 'Marketing Plan', 'Professional Photography', 'Staging Consultation']
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Investment Properties',
        description: 'Build wealth through strategic real estate investments.',
        features: ['ROI Analysis', 'Market Research', 'Property Management', 'Portfolio Planning']
      }
    ];

    return services.map(service => `
      <div class="service-card">
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-features">
          ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="btn btn-outline" onclick="app.navigateTo('contact')">Learn More</button>
      </div>
    `).join('');
  },

  renderInteriorServices() {
    const services = [
      {
        icon: 'fas fa-palette',
        title: 'Interior Design',
        description: 'Complete interior design services to transform your space.',
        features: ['Space Planning', 'Color Consultation', 'Furniture Selection', 'Design Implementation']
      },
      {
        icon: 'fas fa-couch',
        title: 'Home Staging',
        description: 'Professional staging to help your property sell faster.',
        features: ['Property Assessment', 'Furniture Rental', 'Styling & Decor', 'Photography Ready']
      },
      {
        icon: 'fas fa-lightbulb',
        title: 'Design Consultation',
        description: 'Expert advice to guide your design decisions.',
        features: ['Design Planning', 'Style Assessment', 'Product Recommendations', 'Budget Guidance']
      }
    ];

    return services.map(service => `
      <div class="service-card">
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-features">
          ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="btn btn-outline" onclick="app.navigateTo('contact')">Learn More</button>
      </div>
    `).join('');
  },

  renderProcessSteps() {
    const steps = [
      {
        number: '01',
        title: 'Initial Consultation',
        description: 'We discuss your needs, preferences, and budget to create a tailored plan.'
      },
      {
        number: '02',
        title: 'Property Search/Design Planning',
        description: 'Find the perfect property or develop a comprehensive design strategy.'
      },
      {
        number: '03',
        title: 'Negotiation/Implementation',
        description: 'Handle negotiations and contracts or execute the design plan.'
      },
      {
        number: '04',
        title: 'Closing/Final Styling',
        description: 'Complete the transaction or add finishing touches to your space.'
      }
    ];

    return `
      <div class="process-steps-grid">
        ${steps.map((step, index) => `
          <div class="process-step">
            <div class="process-number">${step.number}</div>
            <h4>${step.title}</h4>
            <p>${step.description}</p>
            ${index < steps.length - 1 ? '<div class="process-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  renderTimeline() {
    const events = [
      { year: '2011', title: 'Company Founded', description: 'James Williamson starts boutique real estate firm' },
      { year: '2014', title: 'Team Expansion', description: 'Added interior design services and consultants' },
      { year: '2018', title: 'Luxury Division', description: 'Launched premium property and design division' },
      { year: '2021', title: 'Digital Innovation', description: 'Introduced virtual tours and online consultations' },
      { year: '2024', title: 'Award Recognition', description: 'Named Top Realtor and Design Team of the Year' }
    ];

    return events.map(event => `
      <div class="timeline-item">
        <div class="timeline-date">${event.year}</div>
        <div class="timeline-content">
          <h4>${event.title}</h4>
          <p>${event.description}</p>
        </div>
      </div>
    `).join('');
  },

  renderErrorPage(message = 'Something went wrong.') {
    return `
      <div class="page error-page">
        <div class="container">
          <div class="error-content text-center">
            <div class="error-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h1>Oops!</h1>
            <p>${message}</p>
            <div class="error-actions">
              <button class="btn btn-primary" onclick="app.navigateTo('home')">Go Home</button>
              <button class="btn btn-outline" onclick="location.reload()">Try Again</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

// Add page-specific event handlers after pages load
document.addEventListener('DOMContentLoaded', function() {
  // Statistics counter animation
  const animateStats = () => {
    document.querySelectorAll('[data-target]').forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const increment = target / 50;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + (target === 98 ? '%' : target >= 1000 ? '+' : '');
      }, 50);
    });
  };

  // Trigger stats animation when they come into view
  const statsObserver = Observer.create((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  // Observe stats elements
  document.querySelectorAll('.stats-grid').forEach(grid => {
    statsObserver.observe(grid);
  });
});