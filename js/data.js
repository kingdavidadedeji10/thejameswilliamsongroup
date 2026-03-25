// ===== MOCK DATA & FAKE API SYSTEM =====

// Image placeholder URLs (using realistic real estate and interior design images)
const PLACEHOLDER_IMAGES = {
  properties: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  ],
  decor: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    'https://images.unsplash.com/photo-1571898670383-9cfca2940356?w=600&q=80',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80'
  ],
  team: [
    'images/batts.jpeg',
  ],
  blog: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
  ]
};

// Generate random images
const getRandomImage = (category, count = 1) => {
  const images = PLACEHOLDER_IMAGES[category];
  if (count === 1) {
    return images[Math.floor(Math.random() * images.length)];
  }
  return Array.from({length: count}, () => 
    images[Math.floor(Math.random() * images.length)]
  );
};

// ===== PROPERTIES DATA =====
const PROPERTIES_DATA = [
  {
    id: 1,
    title: "Modern Downtown Penthouse",
    price: 1250000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    address: "456 High Street",
    city: "Metropolitan City",
    state: "CA",
    zipCode: "90210",
    lat: 34.0522,
    lng: -118.2437,
    status: "For Sale",
    propertyType: "Penthouse",
    tags: ["Luxury", "City View", "Modern"],
    images: getRandomImage('properties', 5),
    description: "Stunning modern penthouse with panoramic city views. This luxury residence features floor-to-ceiling windows, premium finishes, and a private rooftop terrace. Perfect for entertaining with an open-concept design and state-of-the-art appliances.",
    amenities: ["Rooftop Terrace", "City Views", "Hardwood Floors", "Granite Counters", "Stainless Appliances", "In-Unit Laundry", "Parking", "Doorman"],
    yearBuilt: 2018,
    featured: true,
    listingDate: "2026-02-01"
  },
  {
    id: 2,
    title: "Charming Victorian Home",
    price: 875000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    address: "789 Heritage Lane",
    city: "Historic District",
    state: "CA",
    zipCode: "94102",
    lat: 37.7749,
    lng: -122.4194,
    status: "For Sale",
    propertyType: "Single Family",
    tags: ["Historic", "Garden", "Character"],
    images: getRandomImage('properties', 6),
    description: "Beautiful Victorian home with original architectural details and modern updates. Features include restored hardwood floors, ornate moldings, and a lovely garden. Located in the heart of the historic district.",
    amenities: ["Original Details", "Garden", "Updated Kitchen", "Hardwood Floors", "Period Features", "Private Parking"],
    yearBuilt: 1895,
    featured: true,
    listingDate: "2026-01-15"
  },
  {
    id: 3,
    title: "Contemporary Waterfront Condo",
    price: 950000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    address: "321 Marina Drive",
    city: "Coastal City",
    state: "CA",
    zipCode: "90401",
    lat: 34.0195,
    lng: -118.4912,
    status: "For Sale",
    propertyType: "Condo",
    tags: ["Waterfront", "Contemporary", "Luxury"],
    images: getRandomImage('properties', 4),
    description: "Luxurious waterfront condo with stunning ocean views. Features an open floor plan, designer kitchen, and private balcony. Building amenities include pool, gym, and concierge service.",
    amenities: ["Ocean Views", "Balcony", "Pool", "Gym", "Concierge", "Parking", "Storage"],
    yearBuilt: 2020,
    featured: true,
    listingDate: "2026-02-10"
  },
  {
    id: 4,
    title: "Family Suburban Home",
    price: 650000,
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    address: "123 Maple Street",
    city: "Suburban Heights",
    state: "CA",
    zipCode: "91801",
    lat: 34.1064,
    lng: -117.8743,
    status: "For Sale",
    propertyType: "Single Family",
    tags: ["Family", "Suburban", "Quiet"],
    images: getRandomImage('properties', 5),
    description: "Perfect family home in quiet suburban neighborhood. Features large backyard, updated kitchen, and close proximity to excellent schools. Move-in ready with fresh paint and new flooring.",
    amenities: ["Large Yard", "Updated Kitchen", "Near Schools", "Quiet Street", "2-Car Garage", "Storage"],
    yearBuilt: 2005,
    featured: false,
    listingDate: "2026-01-28"
  },
  // Add more properties...
  {
    id: 5,
    title: "Luxury Mountain Retreat",
    price: 1850000,
    beds: 5,
    baths: 4,
    sqft: 3500,
    address: "987 Pine Ridge Road",
    city: "Mountain View",
    state: "CA",
    zipCode: "95041",
    lat: 37.3861,
    lng: -122.0839,
    status: "For Sale",
    propertyType: "Single Family",
    tags: ["Luxury", "Mountain View", "Private"],
    images: getRandomImage('properties', 6),
    description: "Exceptional mountain retreat offering privacy and luxury. Features include vaulted ceilings, stone fireplace, gourmet kitchen, and wraparound deck with mountain views.",
    amenities: ["Mountain Views", "Stone Fireplace", "Gourmet Kitchen", "Wraparound Deck", "Privacy", "Hiking Trails"],
    yearBuilt: 2015,
    featured: true,
    listingDate: "2026-02-05"
  }
];

// Generate additional properties programmatically
for (let i = 6; i <= 35; i++) {
  const propertyTypes = ["Single Family", "Condo", "Townhome", "Penthouse"];
  const statuses = ["For Sale", "For Rent"];
  const cities = ["Metropolitan City", "Suburban Heights", "Coastal City", "Historic District", "Mountain View"];
  const randomType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  PROPERTIES_DATA.push({
    id: i,
    title: `Beautiful ${randomType} #${i}`,
    price: Math.floor(Math.random() * 2000000) + 300000,
    beds: Math.floor(Math.random() * 4) + 1,
    baths: Math.floor(Math.random() * 3) + 1,
    sqft: Math.floor(Math.random() * 3000) + 800,
    address: `${Math.floor(Math.random() * 9999) + 100} ${["Main", "Oak", "Pine", "Elm", "Maple"][Math.floor(Math.random() * 5)]} Street`,
    city: randomCity,
    state: "CA",
    zipCode: `9${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    lat: 37.7749 + (Math.random() - 0.5) * 2,
    lng: -122.4194 + (Math.random() - 0.5) * 2,
    status: randomStatus,
    propertyType: randomType,
    tags: ["Modern", "Updated", "Convenient"].slice(0, Math.floor(Math.random() * 3) + 1),
    images: getRandomImage('properties', Math.floor(Math.random() * 4) + 3),
    description: `Wonderful ${randomType.toLowerCase()} in desirable ${randomCity}. Features modern amenities and great location.`,
    amenities: ["Updated Kitchen", "Parking", "Storage", "Laundry"].slice(0, Math.floor(Math.random() * 4) + 2),
    yearBuilt: Math.floor(Math.random() * 50) + 1975,
    featured: Math.random() < 0.2,
    listingDate: `2026-0${Math.floor(Math.random() * 2) + 1}-${Math.floor(Math.random() * 28) + 1}`
  });
}

// ===== DECOR PRODUCTS DATA =====
const DECOR_PRODUCTS = [
  {
    id: 1,
    name: "Scandinavian Oak Coffee Table",
    category: "Furniture",
    subcategory: "Tables",
    room: "Living Room",
    style: "Scandinavian",
    materials: ["Oak Wood", "Steel"],
    colors: ["Natural", "White"],
    price: 599,
    originalPrice: 699,
    rating: 4.8,
    reviewCount: 124,
    images: getRandomImage('decor', 4),
    description: "Beautiful handcrafted oak coffee table with clean Scandinavian design. Features sturdy construction and a minimalist aesthetic perfect for modern living spaces.",
    dimensions: "48\" W x 24\" D x 18\" H",
    weight: "45 lbs",
    stockStatus: "In Stock",
    variants: [
      {id: 1, color: "Natural", price: 599, stock: 15},
      {id: 2, color: "White", price: 619, stock: 8}
    ],
    tags: ["Bestseller", "Eco-Friendly"],
    featured: true,
    brand: "Nordic Home",
    care: "Dust regularly with soft cloth"
  },
  {
    id: 2,
    name: "Velvet Accent Chair",
    category: "Furniture",
    subcategory: "Seating",
    room: "Living Room",
    style: "Modern",
    materials: ["Velvet", "Hardwood"],
    colors: ["Navy", "Emerald", "Blush"],
    price: 899,
    originalPrice: 999,
    rating: 4.6,
    reviewCount: 89,
    images: getRandomImage('decor', 3),
    description: "Luxurious velvet accent chair with elegant curved design. Perfect statement piece for any room with comfortable cushioning and solid hardwood frame.",
    dimensions: "32\" W x 30\" D x 34\" H",
    weight: "38 lbs",
    stockStatus: "In Stock",
    variants: [
      {id: 1, color: "Navy", price: 899, stock: 12},
      {id: 2, color: "Emerald", price: 899, stock: 6},
      {id: 3, color: "Blush", price: 919, stock: 9}
    ],
    tags: ["Premium", "Comfortable"],
    featured: true,
    brand: "Luxury Living",
    care: "Professional cleaning recommended"
  },
  {
    id: 3,
    name: "Abstract Wall Art Set",
    category: "Decor",
    subcategory: "Wall Art",
    room: "Any",
    style: "Contemporary",
    materials: ["Canvas", "Wood Frame"],
    colors: ["Multicolor"],
    price: 259,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 156,
    images: getRandomImage('decor', 2),
    description: "Set of 3 contemporary abstract prints on premium canvas. Ready to hang with included hardware. Adds modern artistic flair to any space.",
    dimensions: "16\" x 20\" each",
    weight: "3 lbs total",
    stockStatus: "In Stock",
    variants: [
      {id: 1, color: "Multicolor", price: 259, stock: 25}
    ],
    tags: ["Set", "Ready to Hang"],
    featured: false,
    brand: "Art Studio Co",
    care: "Dust lightly, avoid direct sunlight"
  },
  {
    id: 4,
    name: "Ceramic Table Lamp",
    category: "Lighting",
    subcategory: "Table Lamps",
    room: "Bedroom",
    style: "Transitional",
    materials: ["Ceramic", "Linen"],
    colors: ["White", "Gray", "Blue"],
    price: 189,
    originalPrice: 229,
    rating: 4.7,
    reviewCount: 203,
    images: getRandomImage('decor', 3),
    description: "Elegant ceramic table lamp with linen shade. Perfect for bedside use or accent lighting. Features convenient on/off switch and quality construction.",
    dimensions: "8\" W x 8\" D x 24\" H",
    weight: "6 lbs",
    stockStatus: "In Stock",
    variants: [
      {id: 1, color: "White", price: 189, stock: 18},
      {id: 2, color: "Gray", price: 189, stock: 14},
      {id: 3, color: "Blue", price: 199, stock: 11}
    ],
    tags: ["Bedside", "Elegant"],
    featured: true,
    brand: "Illuminate",
    care: "Wipe with damp cloth"
  },
  {
    id: 5,
    name: "Woven Jute Area Rug",
    category: "Rugs",
    subcategory: "Area Rugs",
    room: "Living Room",
    style: "Natural",
    materials: ["Jute"],
    colors: ["Natural"],
    price: 279,
    originalPrice: 319,
    rating: 4.5,
    reviewCount: 178,
    images: getRandomImage('decor', 2),
    description: "Natural jute area rug with beautiful woven texture. Adds warmth and natural beauty to any space. Durable and eco-friendly construction.",
    dimensions: "8' x 10'",
    weight: "15 lbs",
    stockStatus: "In Stock",
    variants: [
      {id: 1, color: "Natural", price: 279, stock: 22}
    ],
    tags: ["Natural", "Eco-Friendly"],
    featured: false,
    brand: "Earth Textiles",
    care: "Vacuum regularly, spot clean"
  }
];

// Generate additional decor products
for (let i = 6; i <= 70; i++) {
  const categories = [
    {name: "Furniture", subcategories: ["Tables", "Seating", "Storage", "Beds"]},
    {name: "Decor", subcategories: ["Wall Art", "Decorative Objects", "Mirrors", "Plants"]},
    {name: "Lighting", subcategories: ["Table Lamps", "Floor Lamps", "Ceiling", "Pendant"]},
    {name: "Rugs", subcategories: ["Area Rugs", "Runners", "Bath Mats"]},
    {name: "Textiles", subcategories: ["Pillows", "Throws", "Curtains", "Bedding"]}
  ];
  
  const rooms = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Bathroom", "Office", "Any"];
  const styles = ["Modern", "Traditional", "Scandinavian", "Industrial", "Boho", "Contemporary"];
  const colors = ["White", "Black", "Gray", "Navy", "Natural", "Gold", "Green", "Blue"];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomSubcategory = randomCategory.subcategories[Math.floor(Math.random() * randomCategory.subcategories.length)];
  
  DECOR_PRODUCTS.push({
    id: i,
    name: `${styles[Math.floor(Math.random() * styles.length)]} ${randomSubcategory.slice(0, -1)} ${i}`,
    category: randomCategory.name,
    subcategory: randomSubcategory,
    room: rooms[Math.floor(Math.random() * rooms.length)],
    style: styles[Math.floor(Math.random() * styles.length)],
    materials: ["Wood", "Metal", "Fabric", "Glass"].slice(0, Math.floor(Math.random() * 3) + 1),
    colors: colors.slice(0, Math.floor(Math.random() * 3) + 1),
    price: Math.floor(Math.random() * 800) + 50,
    originalPrice: Math.random() < 0.4 ? Math.floor(Math.random() * 200) + 600 : null,
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 300) + 5,
    images: getRandomImage('decor', Math.floor(Math.random() * 3) + 2),
    description: `Beautiful ${styles[Math.floor(Math.random() * styles.length)].toLowerCase()} piece perfect for your ${rooms[Math.floor(Math.random() * rooms.length)].toLowerCase()}.`,
    dimensions: "Various sizes available",
    weight: `${Math.floor(Math.random() * 50) + 5} lbs`,
    stockStatus: Math.random() < 0.8 ? "In Stock" : "Low Stock",
    variants: [{id: 1, color: colors[0], price: Math.floor(Math.random() * 800) + 50, stock: Math.floor(Math.random() * 30) + 1}],
    tags: ["Quality", "Stylish"].slice(0, Math.floor(Math.random() * 2) + 1),
    featured: Math.random() < 0.15,
    brand: ["Design Co", "Home Style", "Modern Living", "Classic Decor"][Math.floor(Math.random() * 4)],
    care: "Follow care instructions"
  });
}

// ===== TEAM DATA =====
const TEAM_DATA = [
  {
    id: 1,
    name: "James Williamson",
    title: "CEO & Founder",
    role: "Realtor",
    specialty: ["Luxury Homes", "Investment Properties", "First-Time Buyers"],
    bio: "With over 20 years of experience, Shawn founder of James Williamson LLC to provide a seamless experience combining real estate excellence with interior design expertise. He has helped over 500 families find their dream homes.",
    image: "images/batts.jpeg",
    phone: "+1 660-275-3903",
    email: "jamesghini@gmail.com",
    experience: "20 years",
    certifications: ["Certified Residential Specialist", "Luxury Home Marketing Specialist"],
    achievements: ["Top Agent 2024", "500+ Homes Sold", "Client Satisfaction 99%"],
    socialMedia: {
      linkedin: "shawn-hicks-realtor",
      instagram: "jameswilliamsonrealtor",
      facebook: "jameswilliamsonrealty"
    },
    featured: true
  }
];

// ===== BLOG DATA =====
const BLOG_DATA = [
  {
    id: 1,
    title: "10 Interior Design Trends Dominating 2026",
    slug: "interior-design-trends-2026",
    excerpt: "Discover the hottest interior design trends that are shaping homes in 2026, from sustainable materials to bold color palettes.",
    content: "Full blog post content would go here...",
    category: "Interior Design",
    tags: ["Trends", "Design", "2026", "Home Decor"],
    author: "Emma Rodriguez",
    authorRole: "Senior Interior Consultant",
    publishDate: "2026-02-15",
    image: getRandomImage('blog'),
    featured: true,
    readTime: "5 min read",
    views: 2847
  },
  {
    id: 2,
    title: "First-Time Homebuyer's Complete Guide",
    slug: "first-time-homebuyer-guide",
    excerpt: "Everything you need to know about buying your first home, from mortgage pre-approval to closing day.",
    content: "Comprehensive guide content...",
    category: "Real Estate",
    tags: ["First-Time Buyers", "Guide", "Mortgage", "Home Buying"],
    author: "David Park",
    authorRole: "First-Time Buyer Specialist",
    publishDate: "2026-02-10",
    image: getRandomImage('blog'),
    featured: true,
    readTime: "8 min read",
    views: 1923
  },
  {
    id: 3,
    title: "Staging Your Home for Maximum Impact",
    slug: "home-staging-tips",
    excerpt: "Professional staging tips to help your home sell faster and for more money.",
    content: "Staging tips and techniques...",
    category: "Home Staging",
    tags: ["Staging", "Selling", "Tips", "Home Improvement"],
    author: "Sarah Johnson",
    authorRole: "Interior Design Director",
    publishDate: "2026-02-05",
    image: getRandomImage('blog'),
    featured: false,
    readTime: "6 min read",
    views: 1456
  },
  {
    id: 4,
    title: "Understanding the Current Real Estate Market",
    slug: "real-estate-market-analysis",
    excerpt: "An in-depth analysis of current market trends and what they mean for buyers and sellers.",
    content: "Market analysis content...",
    category: "Market Analysis",
    tags: ["Market", "Trends", "Analysis", "Real Estate"],
    author: "James Williamson",
    authorRole: "Founder & Principal Realtor",
    publishDate: "2026-01-28",
    image: getRandomImage('blog'),
    featured: true,
    readTime: "10 min read",
    views: 3241
  }
];

// ===== FAKE API SYSTEM =====
class FakeAPI {
  constructor() {
    this.requestCount = 0;
  }

  // Simulate network delay
  async delay(min = 600, max = 1400) {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Simulate occasional network errors
  shouldError(errorRate = 0.05) {
    return Math.random() < errorRate;
  }

  // Generic fake fetch function
  async fakeFetch(data, options = {}) {
    const {
      delay: customDelay,
      errorRate = 0.02,
      transform = (d) => d
    } = options;

    this.requestCount++;
    
    // Add delay
    if (customDelay) {
      await this.delay(customDelay.min || 600, customDelay.max || 1400);
    } else {
      await this.delay();
    }

    // Simulate errors
    if (this.shouldError(errorRate)) {
      throw new Error('Network error occurred. Please try again.');
    }

    // Return transformed data
    return transform(data);
  }

  // Properties API
  async getProperties(filters = {}) {
    return this.fakeFetch(PROPERTIES_DATA, {
      transform: (data) => {
        let filtered = [...data];

        // Apply filters
        if (filters.status) {
          filtered = filtered.filter(p => p.status === filters.status);
        }
        if (filters.propertyType) {
          filtered = filtered.filter(p => p.propertyType === filters.propertyType);
        }
        if (filters.minPrice) {
          filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }
        if (filters.beds) {
          filtered = filtered.filter(p => p.beds >= filters.beds);
        }
        if (filters.baths) {
          filtered = filtered.filter(p => p.baths >= filters.baths);
        }
        if (filters.city) {
          filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
        }

        // Apply sorting
        if (filters.sort) {
          switch (filters.sort) {
            case 'price-low':
              filtered.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filtered.sort((a, b) => b.price - a.price);
              break;
            case 'newest':
              filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
              break;
            case 'oldest':
              filtered.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate));
              break;
          }
        }

        // Apply pagination
        const page = filters.page || 1;
        const limit = filters.limit || 12;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = filtered.slice(start, end);

        return {
          properties: paginatedData,
          total: filtered.length,
          page,
          totalPages: Math.ceil(filtered.length / limit),
          hasMore: end < filtered.length
        };
      }
    });
  }

  async getProperty(id) {
    return this.fakeFetch(PROPERTIES_DATA.find(p => p.id === parseInt(id)), {
      transform: (property) => {
        if (!property) {
          throw new Error('Property not found');
        }
        return property;
      }
    });
  }

  async getFeaturedProperties(limit = 6) {
    return this.fakeFetch(PROPERTIES_DATA.filter(p => p.featured).slice(0, limit));
  }

  // Decor Products API
  async getProducts(filters = {}) {
    return this.fakeFetch(DECOR_PRODUCTS, {
      transform: (data) => {
        let filtered = [...data];

        // Apply filters
        if (filters.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.room) {
          filtered = filtered.filter(p => p.room === filters.room);
        }
        if (filters.style) {
          filtered = filtered.filter(p => p.style === filters.style);
        }
        if (filters.minPrice) {
          filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }
        if (filters.color) {
          filtered = filtered.filter(p => p.colors.includes(filters.color));
        }
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
          );
        }

        // Apply sorting
        if (filters.sort) {
          switch (filters.sort) {
            case 'price-low':
              filtered.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filtered.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filtered.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              filtered.sort((a, b) => b.id - a.id);
              break;
          }
        }

        // Apply pagination
        const page = filters.page || 1;
        const limit = filters.limit || 16;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = filtered.slice(start, end);

        return {
          products: paginatedData,
          total: filtered.length,
          page,
          totalPages: Math.ceil(filtered.length / limit),
          hasMore: end < filtered.length
        };
      }
    });
  }

  async getProduct(id) {
    return this.fakeFetch(DECOR_PRODUCTS.find(p => p.id === parseInt(id)), {
      transform: (product) => {
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      }
    });
  }

  async getFeaturedProducts(limit = 8) {
    return this.fakeFetch(DECOR_PRODUCTS.filter(p => p.featured).slice(0, limit));
  }

  // Team API
  async getTeam() {
    return this.fakeFetch(TEAM_DATA);
  }

  async getTeamMember(id) {
    return this.fakeFetch(TEAM_DATA.find(t => t.id === parseInt(id)), {
      transform: (member) => {
        if (!member) {
          throw new Error('Team member not found');
        }
        return member;
      }
    });
  }

  // Blog API
  async getBlogPosts(filters = {}) {
    return this.fakeFetch(BLOG_DATA, {
      transform: (data) => {
        let filtered = [...data];

        if (filters.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(search) ||
            p.excerpt.toLowerCase().includes(search) ||
            p.tags.some(tag => tag.toLowerCase().includes(search))
          );
        }

        return filtered;
      }
    });
  }

  async getBlogPost(slug) {
    return this.fakeFetch(BLOG_DATA.find(p => p.slug === slug), {
      transform: (post) => {
        if (!post) {
          throw new Error('Blog post not found');
        }
        return post;
      }
    });
  }

  // Form submission APIs
  async submitContactForm(formData) {
    return this.fakeFetch({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
      referenceNumber: `REF-${Date.now()}`
    });
  }

  async submitNewsletterForm(email) {
    return this.fakeFetch({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });
  }

  async schedulePropertyTour(propertyId, formData) {
    return this.fakeFetch({
      success: true,
      message: 'Your tour has been scheduled. We\'ll confirm the details via email.',
      confirmationNumber: `TOUR-${propertyId}-${Date.now()}`
    });
  }

  async submitPropertyInquiry(propertyId, formData) {
    return this.fakeFetch({
      success: true,
      message: 'Your inquiry has been sent to our team. Expect a response within 2 hours.',
      inquiryId: `INQ-${propertyId}-${Date.now()}`
    });
  }

  // Authentication (fake)
  async login(credentials) {
    return this.fakeFetch({
      success: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        avatar: getRandomImage('team')
      },
      token: 'fake-jwt-token'
    });
  }

  async logout() {
    return this.fakeFetch({ success: true });
  }
  
  // Search API
  async search(query) {
    return this.fakeFetch({
      properties: PROPERTIES_DATA.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5),
      products: DECOR_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.room.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5),
      blog: BLOG_DATA.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    });
  }
}

// Create global API instance
window.fakeAPI = new FakeAPI();

// Export data for direct access if needed
window.PROPERTIES_DATA = PROPERTIES_DATA;
window.DECOR_PRODUCTS = DECOR_PRODUCTS;
window.TEAM_DATA = TEAM_DATA;
window.BLOG_DATA = BLOG_DATA;