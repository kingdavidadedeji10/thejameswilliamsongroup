// ===== REUSABLE UI COMPONENTS =====

// Property Card Component
function createPropertyCard(property, viewType = 'grid') {
  const isWishlisted = Wishlist.isInWishlist(property.id, 'property');
  const badgeClass = property.status === 'For Sale' ? 'badge-success' : 'badge-primary';
  
  return `
    <div class="card property-card ${viewType}-view" data-property-id="${property.id}">
      <div class="card-image">
        <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
        <div class="card-badge ${badgeClass}">${property.status}</div>
        ${property.featured ? '<div class="card-badge badge-warning" style="top: 50px;">Featured</div>' : ''}
        <div class="card-actions">
          <button class="card-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-property-id="${property.id}" 
                  aria-label="Add to wishlist">
            <i class="fas fa-heart"></i>
          </button>
          <button class="card-action-btn share-btn" 
                  data-property-id="${property.id}"
                  aria-label="Share property">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${property.title}</div>
        <div class="card-price">${Format.currency(property.price)}</div>
        <div class="card-meta">
          <div class="property-meta-item">
            <i class="fas fa-bed"></i>
            <span class="property-meta-value">${property.beds}</span>
            <span>Beds</span>
          </div>
          <div class="property-meta-item">
            <i class="fas fa-bath"></i>
            <span class="property-meta-value">${property.baths}</span>
            <span>Baths</span>
          </div>
          <div class="property-meta-item">
            <i class="fas fa-ruler-combined"></i>
            <span class="property-meta-value">${Format.number(property.sqft)}</span>
            <span>Sq Ft</span>
          </div>
        </div>
        <div class="card-description">
          ${property.address}, ${property.city}, ${property.state}
        </div>
        <div class="card-footer">
          <button class="btn btn-outline btn-sm view-details-btn" data-property-id="${property.id}">
            View Details
          </button>
          <button class="btn btn-primary btn-sm schedule-tour-btn" data-property-id="${property.id}">
            Schedule Tour
          </button>
        </div>
      </div>
    </div>
  `;
}

// Product Card Component
function createProductCard(product) {
  const isWishlisted = Wishlist.isInWishlist(product.id, 'product');
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  return `
    <div class="card product-card" data-product-id="${product.id}">
      <div class="card-image">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${hasDiscount ? `<div class="card-badge badge-error">${discountPercent}% OFF</div>` : ''}
        ${product.featured ? '<div class="card-badge badge-primary">Featured</div>' : ''}
        <div class="card-actions">
          <button class="card-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-product-id="${product.id}"
                  aria-label="Add to favorites">
            <i class="fas fa-heart"></i>
          </button>
          <button class="card-action-btn quick-view-btn" 
                  data-product-id="${product.id}"
                  aria-label="Quick view">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-rating">
          <div class="rating-stars">
            ${createRatingStars(product.rating)}
          </div>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="card-title">${product.name}</div>
        <div class="card-meta">
          <span class="product-category">${product.category}</span>
          <span class="product-room">${product.room}</span>
        </div>
        <div class="card-price">
          ${Format.currency(product.price)}
          ${hasDiscount ? `<span class="original-price">${Format.currency(product.originalPrice)}</span>` : ''}
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-product-id="${product.id}">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn btn-outline btn-sm view-product-btn" data-product-id="${product.id}">
            View Details
          </button>
        </div>
      </div>
    </div>
  `;
}

// Team Member Card Component
function createTeamCard(member) {
  return `
    <div class="card team-card team-card-horizontal" data-member-id="${member.id}" style="display: flex; flex-direction: row;">
      <div class="team-card-image" style="flex: 0 0 40%; width: 40%;">
        <img src="${member.image}" alt="${member.name}" loading="lazy" style="width: 100%; height: 100%; min-height: 500px; object-fit: cover;">
      </div>
      <div class="team-card-content" style="flex: 1; width: 60%; padding: 40px;">
        <div class="team-card-header">
          <h2 class="team-card-name">${member.name}</h2>
          <div class="team-title">${member.title}</div>
          <div class="team-experience">${member.experience} of experience</div>
        </div>
        <div class="team-card-bio">
          <p>${member.bio}</p>
          <div class="team-specialties">
            ${member.specialty.map(s => `<span class="badge">${s}</span>`).join('')}
          </div>
        </div>
        <div class="team-card-footer">
          <div class="team-contact-info">
            <div class="contact-info-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:${member.email}">${member.email}</a>
            </div>
            <div class="contact-info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>3122 Nw 27th St, Gainesville, FL 32605</span>
            </div>
          </div>
          <button class="btn btn-primary contact-member-btn" data-member-id="${member.id}">
            <i class="fas fa-envelope"></i> Send Message
          </button>
        </div>
      </div>
    </div>
  `;
}

// Blog Post Card Component
function createBlogCard(post) {
  return `
    <div class="card blog-card" data-post-id="${post.id}">
      <div class="card-image">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <div class="card-badge">${post.category}</div>
      </div>
      <div class="card-body">
        <div class="blog-meta">
          <span class="blog-author">${post.author}</span>
          <span class="blog-date">${Format.date(post.publishDate)}</span>
          <span class="blog-read-time">${post.readTime}</span>
        </div>
        <div class="card-title">${post.title}</div>
        <div class="card-description">${post.excerpt}</div>
        <div class="blog-tags">
          ${post.tags.slice(0, 3).map(tag => `<span class="badge">${tag}</span>`).join('')}
        </div>
        <div class="card-footer">
          <button class="btn btn-primary read-more-btn" data-post-slug="${post.slug}">
            Read More
          </button>
          <div class="blog-stats">
            <span><i class="fas fa-eye"></i> ${Format.number(post.views)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Rating Stars Component
function createRatingStars(rating, maxStars = 5) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star rating-star"></i>';
  }
  
  // Half star
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt rating-star"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star rating-star empty"></i>';
  }
  
  return starsHTML;
}

// Skeleton Loading Components
function createSkeletonCard(type = 'property') {
  return `
    <div class="skeleton-card">
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      ${type === 'product' ? '<div class="skeleton skeleton-text" style="width: 30%"></div>' : ''}
    </div>
  `;
}

function createSkeletonGrid(count = 6, type = 'property') {
  return Array.from({length: count}, () => createSkeletonCard(type)).join('');
}

// Filters Component
function createFiltersHTML(type = 'properties') {
  if (type === 'properties') {
    return `
      <div class="filters" id="property-filters">
        <div class="filters-header mobile-only">
          <h3>Filter Properties</h3>
          <button class="filters-close">&times;</button>
        </div>
        <div class="filter-group">
          <label class="form-label">Property Type</label>
          <select class="form-select" id="filter-property-type">
            <option value="">All Types</option>
            <option value="Single Family">Single Family</option>
            <option value="Condo">Condo</option>
            <option value="Townhome">Townhome</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Status</label>
          <select class="form-select" id="filter-status">
            <option value="">All</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Price Range</label>
          <div class="price-range">
            <input type="range" class="range-slider" id="filter-price" min="0" max="3000000" value="3000000" step="50000">
            <div class="range-values">
              <span>$0</span>
              <span id="price-value">$3,000,000+</span>
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Bedrooms</label>
          <div class="filter-buttons">
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="">Any</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="1">1+</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="2">2+</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="3">3+</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="4">4+</button>
          </div>
          <input type="hidden" id="filter-beds" value="">
        </div>
        
        <div class="filter-group">
          <label class="form-label">Bathrooms</label>
          <div class="filter-buttons">
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="">Any</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="1">1+</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="2">2+</button>
            <button type="button" class="btn btn-outline btn-sm filter-btn" data-value="3">3+</button>
          </div>
          <input type="hidden" id="filter-baths" value="">
        </div>
        
        <div class="filter-group">
          <button class="btn btn-primary" id="apply-filters">Apply Filters</button>
          <button class="btn btn-ghost" id="clear-filters">Clear All</button>
        </div>
      </div>
    `;
  } else if (type === 'products') {
    return `
      <div class="filters" id="product-filters">
        <div class="filters-header mobile-only">
          <h3>Filter Products</h3>
          <button class="filters-close">&times;</button>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="filter-category">
            <option value="">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Decor">Decor</option>
            <option value="Lighting">Lighting</option>
            <option value="Rugs">Rugs</option>
            <option value="Textiles">Textiles</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Room</label>
          <select class="form-select" id="filter-room">
            <option value="">All Rooms</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Office">Office</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Style</label>
          <select class="form-select" id="filter-style">
            <option value="">All Styles</option>
            <option value="Modern">Modern</option>
            <option value="Traditional">Traditional</option>
            <option value="Scandinavian">Scandinavian</option>
            <option value="Industrial">Industrial</option>
            <option value="Boho">Boho</option>
            <option value="Contemporary">Contemporary</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Price Range</label>
          <div class="price-range">
            <input type="range" class="range-slider" id="filter-product-price" min="0" max="1000" value="1000" step="25">
            <div class="range-values">
              <span>$0</span>
              <span id="product-price-value">$1,000+</span>
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <label class="form-label">Color</label>
          <div class="color-filters">
            <button type="button" class="color-filter" data-color="White" style="background: white; border: 1px solid #ddd;"></button>
            <button type="button" class="color-filter" data-color="Black" style="background: black;"></button>
            <button type="button" class="color-filter" data-color="Gray" style="background: #808080;"></button>
            <button type="button" class="color-filter" data-color="Navy" style="background: navy;"></button>
            <button type="button" class="color-filter" data-color="Natural" style="background: #d2b48c;"></button>
            <button type="button" class="color-filter" data-color="Gold" style="background: gold;"></button>
          </div>
          <input type="hidden" id="filter-color" value="">
        </div>
        
        <div class="filter-group">
          <button class="btn btn-primary" id="apply-product-filters">Apply Filters</button>
          <button class="btn btn-ghost" id="clear-product-filters">Clear All</button>
        </div>
      </div>
    `;
  }
}

// Pagination Component
function createPagination(currentPage, totalPages, baseUrl = '') {
  if (totalPages <= 1) return '';
  
  let paginationHTML = '<div class="pagination">';
  
  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button class="pagination-btn" data-page="${currentPage - 1}">Previous</button>`;
  }
  
  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  if (startPage > 1) {
    paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
    if (startPage > 2) {
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === currentPage ? 'active' : '';
    paginationHTML += `<button class="pagination-btn ${activeClass}" data-page="${i}">${i}</button>`;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
    }
    paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
  }
  
  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button class="pagination-btn" data-page="${currentPage + 1}">Next</button>`;
  }
  
  paginationHTML += '</div>';
  return paginationHTML;
}

// Breadcrumb Component
function createBreadcrumbs(items) {
  if (!items || items.length === 0) return '';
  
  const breadcrumbHTML = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-current">${item.text}</span>`;
    } else {
      return `<a href="${item.url}" class="breadcrumb-link">${item.text}</a>`;
    }
  }).join('<span class="breadcrumb-separator">/</span>');
  
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbHTML}</nav>`;
}

// Image Gallery Component
function createImageGallery(images, title = '') {
  const thumbnailsHTML = images.map((image, index) => 
    `<img src="${image}" alt="${title} ${index + 1}" class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`
  ).join('');
  
  return `
    <div class="image-gallery">
      <div class="gallery-main">
        <img src="${images[0]}" alt="${title}" class="gallery-main-image" id="gallery-main-image">
        <button class="gallery-nav gallery-prev" id="gallery-prev">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="gallery-nav gallery-next" id="gallery-next">
          <i class="fas fa-chevron-right"></i>
        </button>
        <button class="gallery-fullscreen" id="gallery-fullscreen">
          <i class="fas fa-expand"></i>
        </button>
      </div>
      <div class="gallery-thumbnails">
        ${thumbnailsHTML}
      </div>
    </div>
  `;
}

// Search Results Component
function createSearchResults(results) {
  if (!results || (!results.properties?.length && !results.products?.length && !results.blog?.length)) {
    return '<div class="search-no-results">No results found</div>';
  }
  
  let resultsHTML = '';
  
  if (results.properties?.length) {
    resultsHTML += `
      <div class="search-section">
        <h4>Properties (${results.properties.length})</h4>
        <div class="search-items">
          ${results.properties.map(property => `
            <div class="search-item" data-type="property" data-id="${property.id}">
              <img src="${property.images[0]}" alt="${property.title}" class="search-item-image">
              <div class="search-item-content">
                <div class="search-item-title">${property.title}</div>
                <div class="search-item-meta">${Format.currency(property.price)} • ${property.city}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  if (results.products?.length) {
    resultsHTML += `
      <div class="search-section">
        <h4>Products (${results.products.length})</h4>
        <div class="search-items">
          ${results.products.map(product => `
            <div class="search-item" data-type="product" data-id="${product.id}">
              <img src="${product.images[0]}" alt="${product.name}" class="search-item-image">
              <div class="search-item-content">
                <div class="search-item-title">${product.name}</div>
                <div class="search-item-meta">${Format.currency(product.price)} • ${product.category}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  if (results.blog?.length) {
    resultsHTML += `
      <div class="search-section">
        <h4>Blog Posts (${results.blog.length})</h4>
        <div class="search-items">
          ${results.blog.map(post => `
            <div class="search-item" data-type="blog" data-slug="${post.slug}">
              <img src="${post.image}" alt="${post.title}" class="search-item-image">
              <div class="search-item-content">
                <div class="search-item-title">${post.title}</div>
                <div class="search-item-meta">${post.category} • ${Format.date(post.publishDate)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  return resultsHTML;
}

// Export components for global use
window.Components = {
  createPropertyCard,
  createProductCard,
  createTeamCard,
  createBlogCard,
  createRatingStars,
  createSkeletonCard,
  createSkeletonGrid,
  createFiltersHTML,
  createPagination,
  createBreadcrumbs,
  createImageGallery,
  createSearchResults
};