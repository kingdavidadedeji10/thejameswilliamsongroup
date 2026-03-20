// ===== UTILITY FUNCTIONS =====

// Local Storage utilities
const Storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Cart management
const Cart = {
  get() {
    return Storage.get('cart') || [];
  },

  add(product, quantity = 1) {
    const cart = this.get();
    const existingItem = cart.find(item => item.id === product.id && item.variantId === product.variantId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        variantId: product.variantId || product.variants?.[0]?.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        addedAt: Date.now()
      });
    }
    
    Storage.set('cart', cart);
    this.updateBadge();
    Toast.show('Added to cart', 'success');
  },

  remove(productId, variantId) {
    const cart = this.get();
    const filtered = cart.filter(item => !(item.id === productId && item.variantId === variantId));
    Storage.set('cart', filtered);
    this.updateBadge();
    Toast.show('Removed from cart', 'info');
  },

  updateQuantity(productId, variantId, quantity) {
    const cart = this.get();
    const item = cart.find(item => item.id === productId && item.variantId === variantId);
    
    if (item) {
      if (quantity <= 0) {
        this.remove(productId, variantId);
      } else {
        item.quantity = quantity;
        Storage.set('cart', cart);
        this.updateBadge();
      }
    }
  },

  clear() {
    Storage.remove('cart');
    this.updateBadge();
  },

  getTotal() {
    return this.get().reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCount() {
    return this.get().reduce((total, item) => total + item.quantity, 0);
  },

  updateBadge() {
    const count = this.getCount();
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// Wishlist management
const Wishlist = {
  get() {
    return Storage.get('wishlist') || [];
  },

  add(item) {
    const wishlist = this.get();
    const exists = wishlist.find(w => w.id === item.id && w.type === item.type);
    
    if (!exists) {
      wishlist.push({
        id: item.id,
        type: item.type, // 'property' or 'product'
        name: item.name || item.title,
        price: item.price,
        image: Array.isArray(item.images) ? item.images[0] : item.image,
        addedAt: Date.now()
      });
      Storage.set('wishlist', wishlist);
      this.updateBadge();
      Toast.show('Added to favorites', 'success');
      return true;
    }
    return false;
  },

  remove(id, type) {
    const wishlist = this.get();
    const filtered = wishlist.filter(item => !(item.id === id && item.type === type));
    Storage.set('wishlist', filtered);
    this.updateBadge();
    Toast.show('Removed from favorites', 'info');
  },

  toggle(item) {
    const wishlist = this.get();
    const exists = wishlist.find(w => w.id === item.id && w.type === item.type);
    
    if (exists) {
      this.remove(item.id, item.type);
      return false;
    } else {
      this.add(item);
      return true;
    }
  },

  isInWishlist(id, type) {
    const wishlist = this.get();
    return wishlist.some(item => item.id === id && item.type === type);
  },

  updateBadge() {
    const count = this.get().length;
    const badge = document.getElementById('wishlist-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// Recently viewed management
const RecentlyViewed = {
  add(item, type) {
    const key = `recentlyViewed${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    let recent = Storage.get(key) || [];
    
    // Remove if already exists
    recent = recent.filter(r => r.id !== item.id);
    
    // Add to beginning
    recent.unshift({
      id: item.id,
      name: item.name || item.title,
      price: item.price,
      image: Array.isArray(item.images) ? item.images[0] : item.image,
      viewedAt: Date.now()
    });
    
    // Keep only last 10
    recent = recent.slice(0, 10);
    
    Storage.set(key, recent);
  },

  get(type) {
    const key = `recentlyViewed${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    return Storage.get(key) || [];
  }
};

// Toast notification system
const Toast = {
  show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
      success: 'fas fa-check',
      error: 'fas fa-times',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
      <div class="toast-icon">
        <i class="${iconMap[type] || iconMap.info}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Loading overlay
const Loader = {
  show() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  },

  hide() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
};

// Modal utilities
const Modal = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    if (modal && overlay) {
      modal.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  },

  close(modalId) {
    const modal = modalId ? document.getElementById(modalId) : document.querySelector('.modal.active');
    const overlay = document.getElementById('modal-overlay');
    
    if (modal) {
      modal.classList.remove('active');
    }
    
    if (overlay && !document.querySelector('.modal.active')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
  }
};

// Format utilities
const Format = {
  currency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  number(num) {
    return new Intl.NumberFormat('en-US').format(num);
  },

  date(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', {...defaultOptions, ...options}).format(new Date(date));
  },

  phone(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
  }
};

// Form validation utilities
const Validate = {
  email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  phone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  },

  required(value) {
    return value && value.trim().length > 0;
  },

  minLength(value, min) {
    return value && value.length >= min;
  },

  maxLength(value, max) {
    return !value || value.length <= max;
  }
};

// Animation utilities
const Animate = {
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  },

  slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease-in-out`;
    
    const height = element.scrollHeight;
    
    setTimeout(() => {
      element.style.height = height + 'px';
      
      setTimeout(() => {
        element.style.height = 'auto';
        element.style.overflow = '';
      }, duration);
    }, 10);
  },

  slideUp(element, duration = 300) {
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.height = '0';
    }, 10);
  }
};

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// URL utilities
const URL = {
  getParams() {
    return new URLSearchParams(window.location.search);
  },

  setParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  },

  removeParam(key) {
    const url = new URL(window.location);
    url.searchParams.delete(key);
    window.history.pushState({}, '', url);
  },

  getHash() {
    return window.location.hash.substring(1);
  },

  setHash(hash) {
    window.location.hash = hash;
  }
};

// Device detection
const Device = {
  isMobile() {
    return window.innerWidth <= 768;
  },

  isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  isDesktop() {
    return window.innerWidth > 1024;
  },

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Intersection Observer utility
const Observer = {
  create(callback, options = {}) {
    const defaultOptions = {
      rootMargin: '50px',
      threshold: 0.1
    };
    
    return new IntersectionObserver(callback, {...defaultOptions, ...options});
  },

  lazy(selector = '[data-src]') {
    const images = document.querySelectorAll(selector);
    const imageObserver = this.create((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  animation(selector = '[data-animate]') {
    const elements = document.querySelectorAll(selector);
    const animationObserver = this.create((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    elements.forEach(element => animationObserver.observe(element));
  }
};

// Cookie utilities
const Cookie = {
  set(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  },

  get(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  },

  delete(name) {
    this.set(name, '', -1);
  }
};

// Security utilities
const Security = {
  sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  },

  escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
};

// Performance utilities
const Performance = {
  measure(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  },

  debounce,
  throttle
};

// Initialize utilities on page load
document.addEventListener('DOMContentLoaded', function() {
  // Update cart and wishlist badges
  Cart.updateBadge();
  Wishlist.updateBadge();
  
  // Initialize lazy loading
  Observer.lazy();
  Observer.animation();

  // Header scroll shadow
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', throttle(function() {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, 100));
  }

  // Page transition progress bar on link clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (link && isInternalPageLink(link)) {
      const bar = document.getElementById('page-progress-bar');
      if (bar) {
        bar.style.width = '0';
        bar.classList.add('animating');
      }
    }
  });
  
  console.log('James Williamson LLC - Utilities Loaded');
});

// Global helper alias for toast notifications
function showToast(message, type, duration) {
  Toast.show(message, type, duration);
}

// Helper: returns true if a link navigates to another page on the same origin
function isInternalPageLink(link) {
  if (!link.href || link.hostname !== window.location.hostname) return false;
  const href = link.getAttribute('href') || '';
  return !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:');
}