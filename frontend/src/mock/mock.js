/* Expanded mock data for PopularSMM clone (dark theme). All data is mocked. */

export const metrics = { orders: 247891, successRate: 98.7, platforms: 7 };

export const hero = {
  title: "Social Media Growth\nPackages",
  subtitle:
    "Premium Instagram & TikTok services with instant delivery. Real users, lifetime guarantee.",
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
  { key: "youtube", name: "YouTube", color: "#FF0000" },
  { key: "facebook", name: "Facebook", color: "#1877F2" },
  { key: "tiktok", name: "TikTok", color: "#000000" },
  { key: "twitter", name: "Twitter (X)", color: "#14171A" },
  { key: "telegram", name: "Telegram", color: "#229ED9" },
  { key: "others", name: "Other Platforms", color: "#8b5cf6" },
];

// Helper to make product
const P = (id, platform, title, qtyLabel, price, oldPrice, delivery, features, type, extra = {}) => ({
  id,
  platform,
  title,
  qtyLabel,
  price,
  oldPrice,
  discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
  delivery,
  features,
  type,
  ...extra,
});

export const oneOffPackages = [
  // Instagram - Followers (General, Indian, Arab, USA)
  P("ig-f-1k-ind", "instagram", "1K Instagram Followers (India)", "1K", 4.99, 5.99, "1-3 days", ["Real active followers", "Gradual delivery", "24/7 support", "Lifetime guarantee"], "followers"),
  P("ig-f-1k-usa", "instagram", "1K Instagram Followers (USA)", "1K", 6.99, 8.49, "1-3 days", ["Real active followers", "Targeted region", "24/7 support", "Lifetime guarantee"], "followers"),
  P("ig-f-1k-arab", "instagram", "1K Instagram Followers (Arab)", "1K", 5.99, 7.49, "1-3 days", ["Real active followers", "Regional targeting", "24/7 support"], "followers"),
  // Instagram Likes / Views / Comments / Reels / Saves / Profile
  P("ig-l-1k", "instagram", "1K Instagram Likes (Posts)", "1K", 2.99, 3.59, "1-2 hours", ["Real likes", "Fast delivery", "Spread across posts"], "likes"),
  P("ig-rv-10k", "instagram", "10K Reels Views", "10K", 3.5, 4.2, "Instant", ["High retention views", "Viral optimization"], "views"),
  P("ig-c-50", "instagram", "50 Instagram Comments (Custom)", "50", 5.99, 7.99, "6-12 hours", ["Customizable comments", "Safe & gradual"], "comments"),
  P("ig-saves-1k", "instagram", "1K Saves / Reach Boost", "1K", 6.99, 8.99, "12-24 hours", ["SEO/Explore boost", "Real users"], "saves"),
  P("ig-profile-1k", "instagram", "1K Profile Visits / Mentions", "1K", 7.49, 9.99, "12-24 hours", ["Brand visibility", "Real users"], "visits"),

  // YouTube
  P("yt-s-1k", "youtube", "1K YouTube Subscribers", "1K", 89.99, 109.99, "3-7 days", ["Real subscribers", "Drip feed", "Priority support"], "subscribers"),
  P("yt-v-10k-ind", "youtube", "10K YouTube Views (India)", "10K", 12.99, 18.99, "12-24 hours", ["Country targeted", "Safe & gradual"], "views"),
  P("yt-l-1k", "youtube", "1K YouTube Likes", "1K", 14.99, 19.99, "6-12 hours", ["High-quality likes", "24/7 support"], "likes"),
  P("yt-c-100", "youtube", "100 YouTube Comments (Custom)", "100", 24.99, 31.99, "24-48 hours", ["Custom comments", "Manual moderation"], "comments"),
  P("yt-watch-1k", "youtube", "1,000 Watch Hours", "1Kh", 249.0, 299.0, "7-15 days", ["Monetization boost", "High retention"], "watchtime"),
  P("yt-shorts-50k", "youtube", "50K Shorts Views + Likes", "50K", 19.99, 29.99, "Instant", ["Velocity optimized", "Real users"], "shorts"),

  // Facebook
  P("fb-page-1k", "facebook", "1K Page Likes/Followers", "1K", 9.99, 12.99, "2-5 days", ["Real profiles", "Drip feed"], "followers"),
  P("fb-post-1k", "facebook", "1K Post Likes", "1K", 8.99, 11.99, "6-12 hours", ["Real likes", "Spread across posts"], "likes"),
  P("fb-comments-100", "facebook", "100 Post Comments", "100", 14.99, 19.99, "12-24 hours", ["Random or custom", "Manual QA"], "comments"),
  P("fb-views-50k", "facebook", "50K Video Views", "50K", 11.99, 15.99, "Instant", ["High retention", "Safe & gradual"], "views"),
  P("fb-react-1k", "facebook", "1K Reactions (Love/Wow/Haha)", "1K", 6.99, 8.99, "6-12 hours", ["Mixed reactions", "Real users"], "reactions"),
  P("fb-group-1k", "facebook", "1K Group Members", "1K", 39.99, 49.99, "3-7 days", ["Real members", "Gradual"], "members"),

  // TikTok
  P("tt-f-1k", "tiktok", "1K TikTok Followers", "1K", 7.99, 9.59, "1-3 days", ["Real active followers", "Gradual delivery"], "followers"),
  P("tt-v-10k", "tiktok", "10K TikTok Views - LIMITED OFFER!", "10K", 1.0, 10.0, "Instant", ["PROMOTIONAL PRICING", "90% OFF!"], "views", { sale: true }),
  P("tt-l-5k", "tiktok", "5K TikTok Likes", "5K", 19.95, 23.94, "2-4 hours", ["Real likes", "Fast delivery"], "likes"),
  P("tt-share-1k", "tiktok", "1K TikTok Shares", "1K", 5.99, 7.99, "Instant", ["Social shares", "Velocity boost"], "shares"),
  P("tt-live-500", "tiktok", "500 Live Views", "500", 6.5, 8.5, "Instant", ["Organic-looking", "Real viewers"], "liveviews"),

  // Twitter (X)
  P("tw-f-1k", "twitter", "1K Twitter Followers", "1K", 12.99, 16.99, "2-4 days", ["Real users", "Natural growth"], "followers"),
  P("tw-l-1k", "twitter", "1K Likes", "1K", 8.99, 11.99, "4-8 hours", ["High-quality likes"], "likes"),
  P("tw-rt-1k", "twitter", "1K Retweets", "1K", 14.99, 19.99, "6-12 hours", ["Real users", "Spread"], "retweets"),
  P("tw-c-100", "twitter", "100 Mentions/Comments", "100", 9.99, 12.99, "12-24 hours", ["Mentions", "Comments mix"], "comments"),
  P("tw-imp-100k", "twitter", "100K Views/Impressions", "100K", 11.99, 16.99, "Instant", ["Velocity boost"], "impressions"),

  // Telegram
  P("tg-mem-1k", "telegram", "1K Channel Members", "1K", 29.99, 39.99, "2-4 days", ["Real looking", "Gradual"], "members"),
  P("tg-sub-1k", "telegram", "1K Channel Subscribers", "1K", 24.99, 34.99, "2-4 days", ["Real looking", "Gradual"], "subscribers"),
  P("tg-views-50k", "telegram", "50K Post Views", "50K", 9.99, 14.99, "Instant", ["High retention"], "views"),
  P("tg-premium-100", "telegram", "100 Premium Accounts", "100", 59.0, 79.0, "1-3 days", ["Ranking boost"], "premium"),

  // Others (Spotify, SoundCloud, LinkedIn, Twitch, Discord, Website Traffic, PUBG)
  P("sp-plays-10k", "others", "10K Spotify Plays", "10K", 7.99, 11.99, "1-3 days", ["High-retention", "Real listeners"], "plays"),
  P("sp-follow-1k", "others", "1K Spotify Followers", "1K", 29.99, 39.99, "2-5 days", ["Artist growth"], "followers"),
  P("sc-plays-10k", "others", "10K SoundCloud Plays", "10K", 4.99, 7.99, "1-2 days", ["Real plays"], "plays"),
  P("li-con-500", "others", "500 LinkedIn Connections", "500", 49.99, 59.99, "3-7 days", ["B2B targeting"], "connections"),
  P("twch-f-1k", "others", "1K Twitch Followers", "1K", 19.99, 24.99, "2-4 days", ["Real looking"], "followers"),
  P("dc-mem-1k", "others", "1K Discord Members", "1K", 39.99, 49.99, "3-5 days", ["Engaged members"], "members"),
  P("web-traffic-50k", "others", "50K Website Traffic (SEO Country-Targeted)", "50K", 59.0, 79.0, "5-10 days", ["Geo targeting", "Analytics proof"], "traffic"),
  P("pubg-uc-660", "others", "PUBG UC 660 (Gaming)", "660", 8.99, 10.99, "Instant", ["Game top-up"], "gaming"),
];

export const subscriptions = [
  { id: "sub-growth", name: "Growth", price: 49.99, period: "/month", summary: "For serious creators who post regularly - double the engagement", features: ["10K Instagram Followers per month", "200K Video Views per month", "25K Instagram Post Likes per month", "Automatic delivery 1-10 minutes after posting", "Real active users", "Priority support", "Growth analytics dashboard"], cta: "Start Growing" },
  { id: "sub-viralpro", name: "ViralPro", price: 99.99, period: "/month", summary: "Maximum impact for influencers and brands", features: ["25K Instagram Followers per month", "500K Video Views per month", "75K Post Likes per month", "Automatic delivery 1-10 minutes", "Dedicated account manager", "Advanced analytics & insights"], cta: "Start Growing" },
  { id: "sub-massive", name: "Massive Growth", price: 199.99, period: "/month", highlight: true, summary: "Serious scale for ambitious creators and established businesses", features: ["75K Followers per month", "2M Video Views per month", "200K Post Likes per month", "Express delivery 2-5 minutes", "Premium customer support", "Growth acceleration algorithms", "Detailed analytics dashboard"], cta: "Go Viral Now" },
];

export const testimonials = [
  { handle: "@sarah_f***", name: "Sarah M.", niche: "Fitness • Instagram", rating: 5, monthsAgo: 7, before: 847, after: 8400, growth: "+894%", package: "Instagram Auto-Growth Pro", quote: "My account exploded! 2,000+ new followers every month automatically." },
  { handle: "@mike_t****", name: "Mike R.", niche: "Travel • Instagram", rating: 5, monthsAgo: 7, before: 1200, after: 15800, growth: "+1217%", package: "Instagram Auto-Growth Elite", quote: "Brands started offering paid partnerships. Best ROI!" },
  { handle: "@emily_f****", name: "Emily K.", niche: "Food • Instagram", rating: 5, monthsAgo: 7, before: 75, after: 1600, growth: "+2100%", package: "Instagram Auto-Growth Pro", quote: "Now I consistently get 1,500+ likes; signed a cookbook deal." },
];

export const blogPosts = [
  { id: "alg-boost", title: "How to Trigger Instagram's Algorithm in 2025", excerpt: "Understand ranking signals, exploit the golden 60-minute window, and build repeatable viral systems.", author: "PopularSMM Team", date: "Jul 12, 2025" },
  { id: "tiktok-views", title: "The Truth About TikTok Views: What Actually Matters", excerpt: "View quality vs quantity, watch time retention, and why immediate velocity still rules.", author: "Growth Lab", date: "Jun 28, 2025" },
  { id: "yt-subscribers", title: "Turning YouTube Views into Subscribers", excerpt: "CTA placement, session time, and human-first thumbnails that convert.", author: "PopularSMM Team", date: "May 9, 2025" },
];

export const faqs = [
  { q: "How quickly will I see results?", a: "Most subscribers see initial engagement within 24-48 hours. Full algorithm optimization typically occurs within the first week." },
  { q: "Is this safe for my Instagram account?", a: "Yes. We use gradual, natural delivery patterns that mimic organic growth and comply with Instagram's terms." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel anytime and continue to receive services through the end of your billing period." },
];

export const contacts = { email: "support@popularsmm.mock", address: "100 Market St, Suite 500, San Francisco, CA", phone: "+1 (555) 123-9876" };

export const defaultGateways = [
  { key: "stripe", name: "Stripe", enabled: false, fields: [{k:"publishableKey",l:"Publishable Key"},{k:"secretKey",l:"Secret Key"}] },
  { key: "sslcommerz", name: "SSLCommerz", enabled: false, fields: [{k:"storeId",l:"Store ID"},{k:"storePassword",l:"Store Password"},{k:"sandbox",l:"Sandbox (true/false)"}] },
  { key: "paypal", name: "PayPal", enabled: false, fields: [{k:"clientId",l:"Client ID"},{k:"secret",l:"Secret"},{k:"mode",l:"Mode (live/sandbox)"}] },
];