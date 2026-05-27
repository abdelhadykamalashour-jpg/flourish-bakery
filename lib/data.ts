// ─────────────────────────────────────────────
// FLOURISH BAKERY — Data Layer
// ─────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  category: 'baked-goods' | 'cakes-pastries' | 'desserts-sweets' | 'savory';
  categoryLabel: string;
  description: string;
  details: string[];
  badge?: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'sourdough-country-loaf',
    name: 'Sourdough Country Loaf',
    price: 185,
    originalPrice: 370,
    image: '/images/products/sourdough-country-loaf.avif',
    images: [
      '/images/products/sourdough-country-loaf.avif',
      '/images/products/menu-slide-01.avif',
      '/images/products/menu-slide-02.avif',
      '/images/products/menu-slide-03.avif',
    ],
    rating: 5.0,
    reviewCount: 48,
    category: 'baked-goods',
    categoryLabel: 'Baked Goods',
    description: 'Our signature sourdough loaf, slow-fermented for 24 hours with a wild starter that has been maintained for over a decade. The crust is perfectly crackling, while the interior stays moist and chewy.',
    details: ['Slow-fermented 24h', 'Wild sourdough starter', 'Organic flour', 'Sea salt', 'Baked fresh daily'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '2',
    slug: 'almond-croissants',
    name: 'Almond Croissants',
    price: 65,
    originalPrice: 65,
    image: '/images/products/almond-croissants.avif',
    images: ['/images/products/almond-croissants.avif'],
    rating: 5.0,
    reviewCount: 62,
    category: 'baked-goods',
    categoryLabel: 'Baked Goods',
    description: 'Flaky, buttery croissants layered with almond frangipane and topped with toasted almond slices. A classic French pastry perfected in our kitchen.',
    details: ['Pure butter lamination', 'Almond frangipane fill', 'Toasted almond topping', 'Baked fresh each morning'],
    inStock: true,
  },
  {
    id: '3',
    slug: 'triple-chocolate-fudge-cake',
    name: 'Triple Chocolate Fudge Cake',
    price: 220,
    originalPrice: 220,
    image: '/images/products/triple-chocolate-fudge-cake.avif',
    images: ['/images/products/triple-chocolate-fudge-cake.avif'],
    rating: 4.3,
    reviewCount: 34,
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description: 'Three layers of moist chocolate sponge cake with dark chocolate ganache and milk chocolate buttercream. Pure indulgence for the chocolate lover.',
    details: ['Three chocolate layers', 'Dark ganache frosting', 'Milk chocolate buttercream', 'Belgian chocolate'],
    inStock: true,
  },
  {
    id: '4',
    slug: 'vanilla-bean-cupcake',
    name: 'Vanilla Bean Cupcake',
    price: 55,
    originalPrice: 110,
    image: '/images/products/vanilla-bean-cupcake.avif',
    images: ['/images/products/vanilla-bean-cupcake.avif'],
    rating: 4.3,
    reviewCount: 29,
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description: 'Light and fluffy vanilla bean cupcake topped with a generous swirl of Madagascar vanilla bean buttercream. A timeless classic.',
    details: ['Madagascar vanilla bean', 'Light vanilla sponge', 'Silky buttercream swirl', 'Gluten option available'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '5',
    slug: 'strawberry-cheesecake-slice',
    name: 'Strawberry Cheesecake Slice',
    price: 149,
    originalPrice: 298,
    image: '/images/products/strawberry-cheesecake-slice.avif',
    images: ['/images/products/strawberry-cheesecake-slice.avif'],
    rating: 5.0,
    reviewCount: 41,
    category: 'desserts-sweets',
    categoryLabel: 'Desserts & Sweets',
    description: 'Creamy New York-style cheesecake on a buttery graham cracker base, crowned with a fresh strawberry compote. Chilled to perfection.',
    details: ['New York style', 'Graham cracker crust', 'Fresh strawberry compote', 'Cream cheese filling'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '6',
    slug: 'classic-butter-croissant',
    name: 'Classic Butter Croissant',
    price: 65,
    originalPrice: 130,
    image: '/images/products/classic-butter-croissant.avif',
    images: ['/images/products/classic-butter-croissant.avif'],
    rating: 5.0,
    reviewCount: 77,
    category: 'baked-goods',
    categoryLabel: 'Baked Goods',
    description: 'Our classic butter croissant — 72 layers of pure French butter laminated dough, baked until golden and irresistibly flaky.',
    details: ['72 butter layers', 'French AOP butter', 'Hand-rolled daily', 'Baked each morning'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '7',
    slug: 'chocolate-lava-muffin',
    name: 'Chocolate Lava Muffin',
    price: 95,
    originalPrice: 190,
    image: '/images/products/chocolate-lava-muffin.avif',
    images: ['/images/products/chocolate-lava-muffin.avif'],
    rating: 3.8,
    reviewCount: 19,
    category: 'desserts-sweets',
    categoryLabel: 'Desserts & Sweets',
    description: 'A tender chocolate muffin with a hidden molten chocolate center. Warm and decadent — best enjoyed fresh from the oven.',
    details: ['Molten chocolate center', '70% dark chocolate', 'Warm from the oven', 'Serves 1'],
    inStock: true,
  },
  {
    id: '8',
    slug: 'cinnamon-swirl-roll',
    name: 'Cinnamon Swirl Roll',
    price: 110,
    originalPrice: 220,
    image: '/images/products/cinnamon-swirl-roll.avif',
    images: ['/images/products/cinnamon-swirl-roll.avif'],
    rating: 5.0,
    reviewCount: 55,
    category: 'baked-goods',
    categoryLabel: 'Baked Goods',
    description: 'Soft, pillowy dough rolled with a rich cinnamon-sugar filling and finished with a tangy cream cheese glaze. A bakery staple.',
    details: ['Enriched dough', 'Ceylon cinnamon', 'Brown sugar filling', 'Cream cheese glaze'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '9',
    slug: 'rustic-sourdough-bread',
    name: 'Rustic Sourdough Bread',
    price: 155,
    originalPrice: 310,
    image: '/images/products/rustic-sourdough-bread.avif',
    images: ['/images/products/rustic-sourdough-bread.avif'],
    rating: 3.5,
    reviewCount: 22,
    category: 'savory',
    categoryLabel: 'Savory Items',
    description: 'A rustic artisan loaf with a deep, mahogany crust and an open crumb structure. Perfect for sandwiches or alongside soups.',
    details: ['Open crumb structure', 'Mahogany crust', 'Organic wheat', '18h cold ferment'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '10',
    slug: 'mini-fruit-tart',
    name: 'Mini Fruit Tart',
    price: 85,
    originalPrice: 170,
    image: '/images/products/mini-fruit-tart.avif',
    images: ['/images/products/mini-fruit-tart.avif'],
    rating: 4.8,
    reviewCount: 38,
    category: 'desserts-sweets',
    categoryLabel: 'Desserts & Sweets',
    description: 'A crisp pâte sucrée shell filled with vanilla pastry cream and topped with fresh seasonal fruits and an apricot glaze.',
    details: ['Pâte sucrée shell', 'Vanilla pastry cream', 'Fresh seasonal fruit', 'Apricot glaze'],
    badge: '50% Off',
    inStock: true,
  },
  {
    id: '11',
    slug: 'almond-biscotti-pack',
    name: 'Almond Biscotti Pack',
    price: 99,
    originalPrice: 198,
    image: '/images/products/almond-biscotti-pack.avif',
    images: ['/images/products/almond-biscotti-pack.avif'],
    rating: 5.0,
    reviewCount: 31,
    category: 'baked-goods',
    categoryLabel: 'Baked Goods',
    description: 'Traditional Italian twice-baked almond biscotti, lightly sweetened and perfectly crunchy. Ideal with coffee or tea.',
    details: ['Twice-baked Italian method', 'Whole Marcona almonds', 'Lightly sweetened', 'Pack of 6'],
    badge: '50% Off',
    inStock: true,
  },
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'baked-goods', label: 'Baked Goods' },
  { id: 'cakes-pastries', label: 'Cakes & Pastries' },
  { id: 'desserts-sweets', label: 'Desserts & Sweets' },
  { id: 'savory', label: 'Savory Items' },
];

export const reviews = [
  {
    id: '1',
    name: 'Emily Richards',
    location: 'Sodic East, Cairo',
    quote: '"The butter croissants were warm, flaky, and the best I\'ve had in years. It felt like a bite of Paris."',
    rating: 5,
    avatar: '/images/reviewers/emily-richards.avif',
  },
  {
    id: '2',
    name: 'James Connor',
    location: 'Maadi, Cairo',
    quote: '"Every visit feels like coming home. The sourdough loaf is extraordinary — crispy crust, perfect crumb."',
    rating: 4,
    avatar: '/images/reviewers/james-connor.avif',
  },
  {
    id: '3',
    name: 'Sophia Nguyen',
    location: 'Zamalek, Cairo',
    quote: '"The fruit tarts are beautiful and delicious. I order them for every occasion — people always ask where they\'re from."',
    rating: 4,
    avatar: '/images/reviewers/sophia-nguyen.avif',
  },
  {
    id: '4',
    name: 'Liam Patel',
    location: 'New Cairo, Egypt',
    quote: '"Worth every penny. The cinnamon rolls alone are reason enough to make the trip. Warm, pillowy, perfection."',
    rating: 4,
    avatar: '/images/reviewers/liam-patel.avif',
  },
  {
    id: '5',
    name: 'Carlos D\'Souza',
    location: 'Heliopolis, Cairo',
    quote: '"The almond croissants are layered with such care. You can taste the quality in every bite."',
    rating: 4,
    avatar: '/images/reviewers/carlos-dsouza.avif',
  },
  {
    id: '6',
    name: 'Rachel Thompson',
    location: 'Sheikh Zayed, Giza',
    quote: '"I discovered Flourish through a friend and now it\'s my weekly ritual. The cheesecake slice is dreamy."',
    rating: 4,
    avatar: '/images/reviewers/rachel-thompson.avif',
  },
  {
    id: '7',
    name: 'Grace Lee',
    location: 'October City, Giza',
    quote: '"The packaging is beautiful and the flavors are even better. A true artisan bakery — so glad it exists."',
    rating: 4,
    avatar: '/images/reviewers/grace-lee.avif',
  },
];

export const blogPosts = [
  {
    id: '1',
    slug: 'the-secret-behind-our-flaky-almond-croissants',
    title: 'The Craft Behind Our Flaky Almond Croissants',
    excerpt: 'Discover the meticulous lamination process and the finest French butters that make our almond croissants extraordinary.',
    date: 'May 12, 2025',
    category: 'Behind the Scenes',
    image: '/images/blog/almond-croissants-blog.avif',
    readTime: '4 min read',
    content: `Every morning before the city wakes, our bakers begin the ritual. It starts with the dough — a simple recipe of flour, sugar, salt, yeast, and the finest French AOP butter...`
  },
  {
    id: '2',
    slug: '5-perfect-pastries-to-pair-with-your-morning-coffee',
    title: 'Five Pastries to Elevate Your Morning Ritual',
    excerpt: 'Coffee deserves the perfect companion. We\'ve curated five pairings that turn an ordinary morning into a moment of pure pleasure.',
    date: 'April 28, 2025',
    category: 'Pairings',
    image: '/images/blog/morning-pastries-blog.avif',
    readTime: '3 min read',
    content: `There is an art to the morning. The right pastry paired with the right cup transforms routine into ritual...`
  },
  {
    id: '3',
    slug: 'why-freshly-baked-goods-always-taste-better',
    title: 'Why Freshness Is Everything We Bake For',
    excerpt: 'The science and soul behind why we bake every item fresh each morning — and why it makes all the difference.',
    date: 'April 15, 2025',
    category: 'Philosophy',
    image: '/images/blog/fresh-baked-blog.avif',
    readTime: '5 min read',
    content: `Freshness is not just a quality standard — it is our entire philosophy...`
  },
  {
    id: '4',
    slug: 'how-we-source-our-organic-ingredients',
    title: 'From Farm to Oven: Our Sourcing Philosophy',
    excerpt: 'We travel far to find the best — from Breton butter to Sicilian almonds. Here is how we choose every ingredient.',
    date: 'March 30, 2025',
    category: 'Ingredients',
    image: '/images/blog/ingredients-sourcing-blog.avif',
    readTime: '6 min read',
    content: `Quality cannot be faked. The moment you bite into a croissant made with mediocre butter, you know...`
  },
  {
    id: '5',
    slug: 'almond-vs-chocolate-croissants-which-one-reigns-supreme',
    title: 'Almond vs. Chocolate: The Croissant Debate Settled',
    excerpt: 'Our bakers have strong opinions. A lighthearted but passionate comparison of our two most beloved croissants.',
    date: 'March 10, 2025',
    category: 'Culture',
    image: '/images/blog/croissant-debate-blog.avif',
    readTime: '3 min read',
    content: `It is a question that divides breakfast tables and bakery counters alike...`
  },
  {
    id: '6',
    slug: 'celebrating-the-holidays-with-pastry-gift-boxes',
    title: 'The Art of Giving: Our Holiday Pastry Gift Boxes',
    excerpt: 'A beautifully curated gift box is more than packaging — it is a gesture of warmth. Discover this season\'s collections.',
    date: 'February 20, 2025',
    category: 'Seasonal',
    image: '/images/blog/holiday-gift-box-blog.avif',
    readTime: '4 min read',
    content: `There is something deeply personal about giving someone food you have made with your own hands...`
  },
];

export const teamMembers = [
  {
    id: '1',
    name: 'David Chen',
    role: 'Head Baker & Co-Founder',
    bio: 'Trained in Paris, David brings 20 years of classical French pastry technique to every item we bake.',
    image: '/images/team/david-chen.avif',
  },
  {
    id: '2',
    name: 'Olivia Bennett',
    role: 'Pastry Chef',
    bio: 'Olivia\'s precision and creativity are behind our cake and dessert menu. A James Beard nominee.',
    image: '/images/team/olivia-bennett.avif',
  },
  {
    id: '3',
    name: 'Marcus Wright',
    role: 'Head of Operations',
    bio: 'Marcus ensures every location delivers the same standard of quality and warmth our guests expect.',
    image: '/images/team/marcus-wright.avif',
  },
  {
    id: '4',
    name: 'Aisha Rahman',
    role: 'Flavor Development',
    bio: 'Aisha brings a global palate to our seasonal specials, drawing inspiration from her culinary travels.',
    image: '/images/team/aisha-rahman.avif',
  },
];

export const faqItems = [
  {
    question: 'What are your bakery hours?',
    answer: 'We are open Monday through Friday from 7:00 AM to 8:00 PM, and Saturday through Sunday from 8:00 AM to 6:00 PM. Our Sodic East location follows the same hours.'
  },
  {
    question: 'Are your baked goods made fresh daily?',
    answer: 'Yes — every single item is baked fresh each morning. We begin production at 4:00 AM so that when our doors open, everything is warm and at peak quality. We never carry over products from the previous day.'
  },
  {
    question: 'Can I place a custom or bulk order for events?',
    answer: 'Absolutely. We welcome custom orders for weddings, corporate events, birthdays, and any occasion. Please contact us at least 5–7 days in advance. Reach out via our contact form or call us at 01004852787.'
  },
  {
    question: 'Do you offer gluten-free or vegan options?',
    answer: 'We offer a small selection of gluten-free and vegan items that rotate seasonally. Please check our current menu or ask our staff in-store for today\'s available options. Our kitchen does handle gluten, so cross-contamination is possible.'
  },
  {
    question: 'Do you offer home delivery or online ordering?',
    answer: 'Yes — you can order online through our website for pickup or local delivery within Cairo. We partner with Swiss, Seoul, and Hudson delivery services. Same-day orders must be placed before 11:00 AM.'
  },
  {
    question: 'Do you ship your products nationwide?',
    answer: 'We currently offer delivery within the Greater Cairo area only. We are working on expanding our delivery range to Alexandria and other cities. Sign up for our newsletter to be notified when nationwide delivery launches.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, Apple Pay, Google Pay, and cash at our in-store locations. Online orders accept all major cards and digital wallets.'
  },
  {
    question: 'How should I store and reheat my pastries?',
    answer: 'For best results, enjoy pastries within 24 hours of purchase. Store at room temperature in a paper bag — never in plastic, which traps moisture. To refresh croissants or rolls, place in a 350°F oven for 5 minutes.'
  },
];
