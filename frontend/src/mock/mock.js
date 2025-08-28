/*
  Mock data for PopularSMM clone. All data here is placeholder/mocked.
  Replace via backend integration later.
*/

export const metrics = {
  orders: 247891,
  successRate: 98.7,
  platforms: 5,
};

export const hero = {
  title: "Buy TikTok & Go Viral Fast",
  subtitle:
    "Transform your social media presence with PayPal & credit card payments or anonymous crypto for privacy. Premium quality, lightning fast delivery.",
  bullets: [
    { label: "PayPal & Credit Cards" },
    { label: "Instant Automated Delivery" },
    { label: "Anonymous Crypto Available" },
  ],
  ctas: [
    { label: "Browse Packages", to: "/products" },
    { label: "Start Subscription", to: "/subscribe" },
  ],
};

export const platforms = [
  { key: "instagram", name: "Instagram", color: "#E1306C" },
  { key: "tiktok", name: "TikTok", color: "#000000" },
  { key: "youtube", name: "YouTube", color: "#FF0000" },
  { key: "twitter", name: "Twitter (X)", color: "#14171A" },
  { key: "facebook", name: "Facebook", color: "#1877F2" },
];

export const oneOffPackages = [
  // Instagram Followers
  {
    id: "ig-f-1k",
    platform: "instagram",
    title: "1K Instagram Followers",
    qtyLabel: "1K",
    price: 4.99,
    oldPrice: 5.99,
    discount: 17,
    delivery: "1-3 days",
    features: [
      "Real active followers",
      "Gradual delivery",
      "24/7 support",
      "Lifetime guarantee",
    ],
    type: "followers",
  },
  {
    id: "ig-f-5k",
    platform: "instagram",
    title: "5K Instagram Followers",
    qtyLabel: "5K",
    price: 24.99,
    oldPrice: 29.99,
    discount: 17,
    delivery: "3-5 days",
    features: [
      "Real active followers",
      "Gradual delivery",
      "24/7 support",
      "Lifetime guarantee",
      "5% discount",
    ],
    type: "followers",
  },
  {
    id: "ig-l-1k",
    platform: "instagram",
    title: "1K Instagram Likes",
    qtyLabel: "1K",
    price: 2.99,
    oldPrice: 3.59,
    discount: 17,
    delivery: "1-2 hours",
    features: [
      "Real likes from active users",
      "Fast delivery",
      "24/7 support",
      "Spread across posts",
    ],
    type: "likes",
  },
  // TikTok
  {
    id: "tt-f-1k",
    platform: "tiktok",
    title: "1K TikTok Followers",
    qtyLabel: "1K",
    price: 7.99,
    oldPrice: 9.59,
    discount: 17,
    delivery: "1-3 days",
    features: [
      "Real active followers",
      "Gradual delivery",
      "24/7 support",
      "Lifetime guarantee",
    ],
    type: "followers",
  },
  {
    id: "tt-v-10k",
    platform: "tiktok",
    title: "10K TikTok Views - LIMITED OFFER!",
    qtyLabel: "10K",
    price: 1.0,
    oldPrice: 10.0,
    discount: 90,
    delivery: "Instant",
    features: [
      "PROMOTIONAL PRICING",
      "Real views from active users",
      "Instant delivery",
      "24/7 support",
      "90% OFF!",
    ],
    type: "views",
    sale: true,
  },
  // YouTube
  {
    id: "yt-v-10k",
    platform: "youtube",
    title: "10K YouTube Views",
    qtyLabel: "10K",
    price: 14.99,
    oldPrice: 19.99,
    discount: 25,
    delivery: "12-24 hours",
    features: ["High-retention views", "Safe & gradual", "24/7 support"],
    type: "views",
  },
  {
    id: "yt-s-1k",
    platform: "youtube",
    title: "1K YouTube Subscribers",
    qtyLabel: "1K",
    price: 89.99,
    oldPrice: 109.99,
    discount: 18,
    delivery: "3-7 days",
    features: ["Real subscribers", "Drip feed", "Priority support"],
    type: "subscribers",
  },
  // Twitter (X)
  {
    id: "tw-f-1k",
    platform: "twitter",
    title: "1K Twitter (X) Followers",
    qtyLabel: "1K",
    price: 12.99,
    oldPrice: 16.99,
    discount: 23,
    delivery: "2-4 days",
    features: ["Real users", "Natural growth patterns", "24/7 support"],
    type: "followers",
  },
  {
    id: "tw-l-5k",
    platform: "twitter",
    title: "5K Twitter (X) Likes",
    qtyLabel: "5K",
    price: 19.99,
    oldPrice: 29.99,
    discount: 33,
    delivery: "4-8 hours",
    features: ["High-quality likes", "Fast rollout", "24/7 support"],
    type: "likes",
  },
  // Facebook
  {
    id: "fb-f-1k",
    platform: "facebook",
    title: "1K Facebook Page Followers",
    qtyLabel: "1K",
    price: 9.99,
    oldPrice: 12.99,
    discount: 23,
    delivery: "2-5 days",
    features: ["Real profiles", "Drip feed", "Support"],
    type: "followers",
  },
  {
    id: "fb-l-5k",
    platform: "facebook",
    title: "5K Facebook Post Likes",
    qtyLabel: "5K",
    price: 17.99,
    oldPrice: 24.99,
    discount: 28,
    delivery: "2-6 hours",
    features: ["Real likes", "Fast delivery", "Spread across posts"],
    type: "likes",
  },
];

export const subscriptions = [
  {
    id: "sub-growth",
    name: "Growth",
    price: 49.99,
    period: "/month",
    summary: "For serious creators who post regularly - double the engagement",
    features: [
      "10K Instagram Followers per month",
      "200K Video Views per month",
      "25K Instagram Post Likes per month",
      "Automatic delivery 1-10 minutes after posting",
      "Real active users",
      "Priority support",
      "Growth analytics dashboard",
    ],
    cta: "Start Growing",
  },
  {
    id: "sub-viralpro",
    name: "ViralPro",
    price: 99.99,
    period: "/month",
    summary: "Maximum impact for influencers and brands",
    features: [
      "25K Instagram Followers per month",
      "500K Video Views per month",
      "75K Instagram Post Likes per month",
      "Automatic delivery 1-10 minutes after posting",
      "Dedicated account manager",
      "Advanced analytics & insights",
    ],
    cta: "Start Growing",
  },
  {
    id: "sub-massive",
    name: "Massive Growth",
    price: 199.99,
    period: "/month",
    highlight: true,
    summary: "Serious scale for ambitious creators and established businesses",
    features: [
      "75K Instagram Followers per month",
      "2M Video Views per month",
      "200K Instagram Post Likes per month",
      "Express delivery within 2-5 minutes",
      "Premium customer support",
      "Growth acceleration algorithms",
      "Detailed analytics dashboard",
    ],
    cta: "Go Viral Now",
  },
];

export const testimonials = [
  {
    handle: "@sarah_f***",
    name: "Sarah M.",
    niche: "Fitness • Instagram",
    rating: 5,
    monthsAgo: 7,
    before: 847,
    after: 8400,
    growth: "+894%",
    package: "Instagram Auto-Growth Pro",
    quote:
      "I was stuck at 850 followers for months. After using the Instagram Auto-Growth subscription, my account exploded! Now I get 2,000+ new followers every month automatically.",
  },
  {
    handle: "@mike_t****",
    name: "Mike R.",
    niche: "Travel • Instagram",
    rating: 5,
    monthsAgo: 7,
    before: 1200,
    after: 15800,
    growth: "+1217%",
    package: "Instagram Auto-Growth Elite",
    quote:
      "Best investment for my travel blog! Brands started reaching out offering paid partnerships. My income went from $0 to $3,000/month!",
  },
  {
    handle: "@emily_f****",
    name: "Emily K.",
    niche: "Food • Instagram",
    rating: 5,
    monthsAgo: 7,
    before: 75,
    after: 1600,
    growth: "+2100%",
    package: "Instagram Auto-Growth Pro",
    quote:
      "My food account was dying. Now I consistently get 1,500+ likes and just signed my first cookbook deal.",
  },
];

export const blogPosts = [
  {
    id: "alg-boost",
    title: "How to Trigger Instagram\'s Algorithm in 2025",
    excerpt:
      "Understand ranking signals, exploit the golden 60-minute window, and build repeatable viral systems.",
    author: "PopularSMM Team",
    date: "Jul 12, 2025",
  },
  {
    id: "tiktok-views",
    title: "The Truth About TikTok Views: What Actually Matters",
    excerpt:
      "View quality vs quantity, watch time retention, and why immediate velocity still rules.",
    author: "Growth Lab",
    date: "Jun 28, 2025",
  },
  {
    id: "yt-subscribers",
    title: "Turning YouTube Views into Subscribers",
    excerpt:
      "CTA placement, session time, and human-first thumbnails that convert.",
    author: "PopularSMM Team",
    date: "May 9, 2025",
  },
];

export const faqs = [
  {
    q: "How quickly will I see results?",
    a: "Most subscribers see initial engagement within 24-48 hours. Full algorithm optimization typically occurs within the first week.",
  },
  {
    q: "Is this safe for my Instagram account?",
    a: "Yes. We use gradual, natural delivery patterns that mimic organic growth and comply with Instagram\'s terms.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel anytime and continue to receive services through the end of your billing period.",
  },
];

export const contacts = {
  email: "support@popularsmm.mock",
  address: "100 Market St, Suite 500, San Francisco, CA",
  phone: "+1 (555) 123-9876",
};