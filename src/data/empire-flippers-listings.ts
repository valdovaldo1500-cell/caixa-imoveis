export interface EFListing {
  id: string;
  niche: string;
  price: number | null;
  monthlyProfit: number;
  monthlyRevenue: number;
  monetization: string;
  multiple: number | null;
  firstMadeMoney: number;
  description: string;
  status: "for_sale" | "pending_sold" | "new_listing";
  autonomyScore: number;
  riskScore: number;
  roiScore: number;
  evergreenScore: number;
  overallScore: number;
  recommendation: "top_pick" | "strong" | "consider" | "avoid";
  aiManageable: boolean;
  reasonsFor: string[];
  reasonsAgainst: string[];
  category:
    | "content_ads"
    | "youtube"
    | "digital_product"
    | "saas"
    | "affiliate"
    | "ecommerce"
    | "amazon_fba"
    | "dropshipping"
    | "service"
    | "kdp"
    | "lead_gen"
    | "subscription";
}

// Helper: annual ROI % given price + monthlyProfit
function roi(price: number | null, mp: number): number {
  if (!price) return 0;
  return (mp * 12) / price * 100;
}

// ROI score scale
function roiScore(annualRoi: number): number {
  if (annualRoi >= 60) return 95;
  if (annualRoi >= 50) return 85;
  if (annualRoi >= 40) return 75;
  if (annualRoi >= 30) return 65;
  return 50;
}

function overall(a: number, r: number, roi: number, e: number): number {
  return Math.round(a * 0.40 + r * 0.25 + roi * 0.20 + e * 0.15);
}

function rec(score: number, aiM: boolean, price: number | null): "top_pick" | "strong" | "consider" | "avoid" {
  const budget = 160000;
  const withinBudget = price !== null && price <= budget;
  if (score >= 75 && aiM && withinBudget) return "top_pick";
  if (score >= 65 && aiM) return "strong";
  if (score >= 55) return "consider";
  return "avoid";
}

export const empireFlippersListings: EFListing[] = [
  // 1
  (() => {
    const a = 47, r = 50, rs = roiScore(roi(68686, 1908)), e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "83356", niche: "Pet Care", price: 68686, monthlyProfit: 1908, monthlyRevenue: 5227,
      monetization: "Amazon FBA, eCommerce", multiple: 36, firstMadeMoney: 2021,
      description: "Acquired in February 2021 from the original Canadian inventor, this lean and profitable Amazon FBA a...",
      status: "new_listing" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 68686),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Established 2021 — 3+ years old", "Niche pet care product with loyal customers", "Lean operations"],
      reasonsAgainst: ["Amazon FBA has physical inventory risk", "Single platform dependency", "Low autonomy — FBA logistics needs active management"],
    };
  })(),
  // 2
  (() => {
    const a = 90, r = 72, rs = roiScore(roi(82015, 2412)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92391", niche: "Travel, Lifestyle", price: 82015, monthlyProfit: 2412, monthlyRevenue: 2470,
      monetization: "Display Advertising", multiple: 34, firstMadeMoney: 2016,
      description: "Explore the opportunity to own an award-winning outdoor travel blog, established in 2014 and monetiz...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 82015),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["Award-winning blog — 10+ year track record since 2014", "Display ads = passive income, easy for AI content", "High revenue/profit ratio"],
      reasonsAgainst: ["Travel niche volatile post-COVID", "Display ad revenue fluctuates with Google updates", "May need content updates to stay current"],
    };
  })(),
  // 3
  (() => {
    const a = 85, r = 45, rs = roiScore(roi(86459, 2790)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92180", niche: "Travel", price: 86459, monthlyProfit: 2790, monthlyRevenue: 3121,
      monetization: "Affiliate", multiple: 31, firstMadeMoney: 2024,
      description: "This listing represents a WordPress affiliate site in the Travel niche, first monetized in August 2024...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 86459),
      aiManageable: aiM,
      category: "affiliate" as const,
      reasonsFor: ["Affiliate site — AI can write travel content", "Good profit margin (~89% ratio)"],
      reasonsAgainst: ["Only monetized since 2024 — very new, track record limited", "Travel affiliate commissions can be cut anytime", "New site penalty in risk score"],
    };
  })(),
  // 4
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(76720, 2740)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91990", niche: "Lifestyle, Health & Fitness", price: 76720, monthlyProfit: 2740, monthlyRevenue: 36691,
      monetization: "Amazon FBA", multiple: 28, firstMadeMoney: 2023,
      description: "This listing is for a brand started in early 2023 - focused on helping athletes and fitness enthusiasts...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 76720),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Health & fitness — evergreen niche", "Good monthly profit vs price ratio"],
      reasonsAgainst: ["Amazon FBA — physical inventory required", "Only 2 years old", "Low margins relative to revenue (7.5%)"],
    };
  })(),
  // 5
  (() => {
    const a = 52, r = 58, rs = roiScore(roi(90214, 3470)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92256", niche: "Occasions & Gifts, Art, Pet Care", price: 90214, monthlyProfit: 3470, monthlyRevenue: 7964,
      monetization: "eCommerce", multiple: 26, firstMadeMoney: 2019,
      description: "Launched in March 2019, this Shopify-based business operates in the Occasions & Gifts, Art, and Pet...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 90214),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["6-year track record since 2019", "Multiple niches — diversified product range", "Decent profit margin (~44%)"],
      reasonsAgainst: ["eCommerce needs VA for order management", "Physical product fulfillment complexity", "Gifts niche seasonal"],
    };
  })(),
  // 6
  (() => {
    const a = 82, r = 45, rs = roiScore(roi(102784, 3213)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92299", niche: "Music, Occasions & Gifts", price: 102784, monthlyProfit: 3213, monthlyRevenue: 5577,
      monetization: "Digital Product", multiple: 32, firstMadeMoney: 2024,
      description: "Launched in April 2024, this AI-driven business operates in the music niche, offering customized dig...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 102784),
      aiManageable: aiM,
      category: "digital_product" as const,
      reasonsFor: ["AI-driven digital products — zero inventory", "Music gifts — recurring gifting occasions", "High margin digital delivery"],
      reasonsAgainst: ["Only monetized since 2024 — very new", "Music niche competition intense", "Could be disrupted by free AI music tools"],
    };
  })(),
  // 7
  (() => {
    const a = 52, r = 65, rs = roiScore(roi(120516, 5479)), e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91436", niche: "Health & Fitness, Supplements, Medical, Pet Care", price: 120516, monthlyProfit: 5479, monthlyRevenue: 20147,
      monetization: "eCommerce", multiple: 22, firstMadeMoney: 2017,
      description: "This listing is for an eCommerce business operating in the Health & Wellness, Supplements, Medical...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 120516),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["8-year track record since 2017", "Diversified niches — health/supplements/pet", "Strong evergreen demand"],
      reasonsAgainst: ["eCommerce — needs VA for operations", "Medical/supplement regulations can change", "Above $120K budget constraint"],
    };
  })(),
  // 8
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(59267, 1734)), e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90605", niche: "Gaming, Lifestyle, Occasions & Gifts", price: 59267, monthlyProfit: 1734, monthlyRevenue: 11663,
      monetization: "Amazon FBA", multiple: 34, firstMadeMoney: 2020,
      description: "Founded in early 2020, this Amazon FBA business operates primarily in the German marketplace...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 59267),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["5-year track record", "Within budget at ~$59K"],
      reasonsAgainst: ["Gaming niche volatile", "German marketplace — language/legal complexity", "Amazon FBA physical inventory", "Low profit margins (~15%)"],
    };
  })(),
  // 9
  (() => {
    const a = 82, r = 40, rs = roiScore(roi(95209, 5289)), e = 48;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92295", niche: "Digital Media, Entertainment", price: 95209, monthlyProfit: 5289, monthlyRevenue: 6431,
      monetization: "YouTube", multiple: 18, firstMadeMoney: 2024,
      description: "Monetized in October 2024, this YouTube channel operates in the animated sitcom commentary niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 95209),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Strong monthly profit vs price ratio (low multiple 18x)", "YouTube AI content potential", "High profit margin (~82%)"],
      reasonsAgainst: ["Only monetized Oct 2024 — extremely new", "Entertainment/commentary — YouTube copyright risks", "Animated sitcom commentary — volatile niche"],
    };
  })(),
  // 10
  (() => {
    const a = 47, r = 55, rs = roiScore(roi(90652, 3022)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91193", niche: "Home, Hobbies, Lifestyle", price: 90652, monthlyProfit: 3022, monthlyRevenue: 20811,
      monetization: "Amazon FBA, eCommerce", multiple: 30, firstMadeMoney: 2021,
      description: "Founded in early 2021, this Amazon FBA business operates within a specialized home and hobby product...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 90652),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["4-year track record", "Home/hobbies — stable evergreen niche", "Dual channel FBA + eCommerce"],
      reasonsAgainst: ["Amazon FBA logistics — needs active management", "Low margins (~15%)", "Physical inventory risk"],
    };
  })(),
  // 11
  (() => {
    const a = 38, r = 65, rs = roiScore(roi(85636, 3723)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91868", niche: "Business, SEO", price: 85636, monthlyProfit: 3723, monthlyRevenue: 4672,
      monetization: "Agency", multiple: 23, firstMadeMoney: 2014,
      description: "Established in Texas, this digital marketing agency boasts a high lifetime customer value with a majority...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 85636),
      aiManageable: aiM,
      category: "service" as const,
      reasonsFor: ["11-year track record since 2014", "High LTV clients", "Good margin (~80%)"],
      reasonsAgainst: ["Agency requires active client management", "Not AI/VA manageable — needs human expertise", "SEO landscape changing with AI"],
    };
  })(),
  // 12
  (() => {
    const a = 52, r = 55, rs = roiScore(roi(110366, 3066)), e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91644", niche: "Pet Care", price: 110366, monthlyProfit: 3066, monthlyRevenue: 5418,
      monetization: "eCommerce", multiple: 36, firstMadeMoney: 2021,
      description: "This listing is for a specialized, well-branded, e-commerce store for pet rabbit accessories...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 110366),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["Niche pet care — loyal customers", "4-year track record", "Well-branded Shopify store"],
      reasonsAgainst: ["eCommerce needs order management VA", "Very niche (rabbit accessories) — limited TAM", "Above $110K — near budget limit"],
    };
  })(),
  // 13
  (() => {
    const a = 82, r = 40, rs = roiScore(roi(124255, 5177)), e = 48;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92062", niche: "Entertainment", price: 124255, monthlyProfit: 5177, monthlyRevenue: 5227,
      monetization: "YouTube", multiple: 24, firstMadeMoney: 2024,
      description: "This listing is for a YouTube channel first monetized in late 2024 - niched down to high-retention...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 124255),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["High margin ~99% (revenue≈profit)", "YouTube channel — AI scriptable", "High retention format"],
      reasonsAgainst: ["Only monetized late 2024 — very new", "Entertainment niche — volatile", "Above $124K budget"],
    };
  })(),
  // 14
  (() => {
    const a = 82, r = 40, rs = roiScore(roi(85947, 3070)), e = 58;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92246", niche: "Sports, News & Education", price: 85947, monthlyProfit: 3070, monthlyRevenue: 3391,
      monetization: "YouTube", multiple: 28, firstMadeMoney: 2024,
      description: "Launched in 2024, this YouTube channel focuses on coverage, analysis, and highlights within a specific...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 85947),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Sports + education — AI scriptable analysis", "Good profit margin (~91%)"],
      reasonsAgainst: ["Only launched 2024 — new", "Sports coverage may need rights clearance", "YouTube algorithm dependency"],
    };
  })(),
  // 15
  (() => {
    const a = 47, r = 35, rs = roiScore(roi(124750, 5198)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91885", niche: "Medical, Health & Fitness", price: 124750, monthlyProfit: 5198, monthlyRevenue: 21983,
      monetization: "Amazon FBA", multiple: 24, firstMadeMoney: 2024,
      description: "Founded in August 2024, this Amazon FBA business operates in the medical equipment category...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 124750),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Medical equipment — high evergreen demand", "Decent margin (~24%)"],
      reasonsAgainst: ["Only 7 months old — extremely new", "Medical regulatory risk", "FBA physical inventory", "Above $124K budget"],
    };
  })(),
  // 16
  (() => {
    const a = 90, r = 45, rs = roiScore(roi(78487, 2907)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "92105", niche: "Home", price: 78487, monthlyProfit: 2907, monthlyRevenue: 2913,
      monetization: "Display Advertising", multiple: 27, firstMadeMoney: 2024,
      description: "This listing is for a WordPress site and associated Pinterest account first monetized in September 2024...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 78487),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["Home niche — extremely evergreen", "Display ads — AI can write all content", "Pinterest traffic — diversified from Google", "Near 100% profit margin"],
      reasonsAgainst: ["Only monetized Sep 2024 — very new", "Pinterest + display ads can fluctuate", "New site risk — unproven longevity"],
    };
  })(),
  // 17
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(55213, 1673)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91098", niche: "Beauty", price: 55213, monthlyProfit: 1673, monthlyRevenue: 11069,
      monetization: "Amazon FBA", multiple: 33, firstMadeMoney: 2023,
      description: "Founded in June 2023, this Amazon FBA business operates in the hair and beauty niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 55213),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Within budget at $55K", "Beauty — solid evergreen niche"],
      reasonsAgainst: ["Only 2 years old", "FBA physical inventory", "Low margins (~15%)", "Beauty very competitive on Amazon"],
    };
  })(),
  // 18
  (() => {
    const a = 38, r = 42, rs = roiScore(roi(101001, 3367)), e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91893", niche: "Real Estate", price: 101001, monthlyProfit: 3367, monthlyRevenue: 3565,
      monetization: "Service", multiple: 30, firstMadeMoney: 2023,
      description: "Launched recently, this specialized real estate website provides a platform for paid guest/sponsored...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 101001),
      aiManageable: aiM,
      category: "service" as const,
      reasonsFor: ["Real estate — evergreen niche", "Good profit margin (~94%)"],
      reasonsAgainst: ["Service model — active sales/relationship management needed", "Only 2 years old", "Not AI/VA manageable without human touch"],
    };
  })(),
  // 19
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(99574, 2929)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91548", niche: "Jewelry", price: 99574, monthlyProfit: 2929, monthlyRevenue: 9180,
      monetization: "Amazon FBA", multiple: 34, firstMadeMoney: 2023,
      description: "This is an Amazon FBA business founded in July 2023, operating in the women's jewelry category...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 99574),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Jewelry — recurring gifting demand", "Within budget ~$100K"],
      reasonsAgainst: ["Only 2 years old", "FBA physical inventory", "Jewelry highly competitive on Amazon", "Low margins (~32%)"],
    };
  })(),
  // 20
  (() => {
    const a = 58, r = 32, rs = roiScore(roi(134160, 5591)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91213", niche: "Cleaning Products, Home, Bed & Bath", price: 134160, monthlyProfit: 5591, monthlyRevenue: 61225,
      monetization: "DropShipping", multiple: 24, firstMadeMoney: 2025,
      description: "This listing is for a dropshipping business launched in January 2025, specializing in cleaning products...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 134160),
      aiManageable: aiM,
      category: "dropshipping" as const,
      reasonsFor: ["Cleaning/home — extremely evergreen", "Dropshipping — no inventory"],
      reasonsAgainst: ["Only launched Jan 2025 — less than 1 year old", "Dropshipping margins razor-thin (~9%)", "Supplier dependency risk", "Above $134K budget"],
    };
  })(),
  // 21
  (() => {
    const a = 57, r = 60, rs = roiScore(roi(74101, 2555)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91566", niche: "Apparel & Accessories", price: 74101, monthlyProfit: 2555, monthlyRevenue: 14566,
      monetization: "eCommerce", multiple: 29, firstMadeMoney: 2019,
      description: "This listing is for an eCommerce business established in July 2019, operating within the apparel...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 74101),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["6-year track record since 2019", "eCommerce apparel — large TAM"],
      reasonsAgainst: ["eCommerce needs order management VA", "Apparel competitive and fashion-sensitive", "Low margins (~18%)"],
    };
  })(),
  // 22
  (() => {
    const a = 47, r = 60, rs = roiScore(roi(89476, 3196)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "89288", niche: "Home, Kitchenware, Occasions & Gifts", price: 89476, monthlyProfit: 3196, monthlyRevenue: 39148,
      monetization: "Amazon FBA, eCommerce", multiple: 28, firstMadeMoney: 2019,
      description: "This listing is for a brand started in 2019 - selling home goods/kitchenware primarily via Amazon FBA...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 89476),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["6-year track record", "Home/kitchenware — highly evergreen", "Dual channel diversification"],
      reasonsAgainst: ["FBA + eCommerce complexity", "Low margins (~8%)", "Physical inventory risk"],
    };
  })(),
  // 23
  (() => {
    const a = 88, r = 58, rs = roiScore(roi(43767, 1621)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91137", niche: "Travel", price: 43767, monthlyProfit: 1621, monthlyRevenue: 2261,
      monetization: "Affiliate, Display Advertising, Amazon Associates", multiple: 27, firstMadeMoney: 2022,
      description: "This listing is for a package of three WordPress sites, first established in 2022...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 43767),
      aiManageable: aiM,
      category: "affiliate" as const,
      reasonsFor: ["Package of 3 sites — diversified risk", "Triple monetization — affiliate, display, Amazon", "Budget-friendly at $44K", "AI can write all travel content"],
      reasonsAgainst: ["Travel niche — Google core update sensitivity", "3 years old — modest track record", "Lower absolute monthly profit"],
    };
  })(),
  // 24
  (() => {
    const a = 47, r = 58, rs = roiScore(roi(111138, 3473)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88804", niche: "Food & Beverages", price: 111138, monthlyProfit: 3473, monthlyRevenue: 7035,
      monetization: "eCommerce, Amazon FBA", multiple: 32, firstMadeMoney: 2019,
      description: "This is an established Amazon and eCommerce business in the food and beverages sector...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 111138),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["6-year track record since 2019", "Food — extremely evergreen niche", "Dual channel distribution"],
      reasonsAgainst: ["Food FBA — perishable/expiry risks", "eCommerce operations complexity", "Above $111K budget"],
    };
  })(),
  // 25
  (() => {
    const a = 85, r = 60, rs = roiScore(roi(127341, 4108)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88899", niche: "Information", price: 127341, monthlyProfit: 4108, monthlyRevenue: 4596,
      monetization: "YouTube, Amazon Associates, Affiliate", multiple: 31, firstMadeMoney: 2022,
      description: "Launched in early 2021, this YouTube channel has carved out a niche in offering in-depth product reviews...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 127341),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Triple monetization — YouTube + affiliate + Amazon Associates", "Product reviews — AI scriptable", "3+ year track record"],
      reasonsAgainst: ["Above $127K budget", "YouTube + affiliate algorithm dependency", "Information niche broad competition"],
    };
  })(),
  // 26
  (() => {
    const a = 58, r = 62, rs = roiScore(roi(135811, 4115)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91282", niche: "Apparel & Accessories", price: 135811, monthlyProfit: 4115, monthlyRevenue: 21809,
      monetization: "DropShipping", multiple: 33, firstMadeMoney: 2016,
      description: "Founded in 2016 and scaled aggressively from 2019 onward, this is a well-established print-on-demand...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 135811),
      aiManageable: aiM,
      category: "dropshipping" as const,
      reasonsFor: ["9-year track record since 2016", "Print-on-demand — no inventory needed", "Established brand"],
      reasonsAgainst: ["Above $135K budget", "Print-on-demand margins thin (~19%)", "Apparel trend-sensitive"],
    };
  })(),
  // 27
  (() => {
    const a = 58, r = 45, rs = roiScore(roi(45131, 2051)), e = 62;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87595", niche: "Electronics, Equipment", price: 45131, monthlyProfit: 2051, monthlyRevenue: 7172,
      monetization: "DropShipping", multiple: 22, firstMadeMoney: 2023,
      description: "Established in 2023, this high-ticket dropshipping business specializes in the sale of a specific niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 45131),
      aiManageable: aiM,
      category: "dropshipping" as const,
      reasonsFor: ["Low multiple 22x — better ROI", "High-ticket dropshipping — fewer orders needed", "Within budget"],
      reasonsAgainst: ["Only 2 years old", "Electronics — supplier/warranty complexity", "Dropshipping supplier dependency"],
    };
  })(),
  // 28
  (() => {
    const a = 88, r = 75, rs = roiScore(roi(127473, 3984)), e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91138", niche: "Lifestyle, Hobbies, Apparel & Accessories", price: 127473, monthlyProfit: 3984, monthlyRevenue: 4398,
      monetization: "Affiliate, Display Advertising, Subscription", multiple: 32, firstMadeMoney: 2010,
      description: "Established in 2010, this website is a vibrant online community dedicated to enthusiasts of a specific...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 127473),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["15-year track record — exceptional longevity", "Triple monetization — affiliate + display + subscription", "Community site — loyal audience", "High autonomy — AI can manage content"],
      reasonsAgainst: ["Above $127K budget", "Hobbies niche can be affected by trends", "Community management requires engagement"],
    };
  })(),
  // 29
  (() => {
    const a = 85, r = 48, rs = roiScore(roi(59863, 2603)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91304", niche: "Information, Digital Media, News & Education", price: 59863, monthlyProfit: 2603, monthlyRevenue: 2783,
      monetization: "YouTube, Affiliate", multiple: 23, firstMadeMoney: 2023,
      description: "This listing represents a faceless YouTube channel and companion website, first monetized in March 2023...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 59863),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Faceless YouTube — ideal for AI+VA", "Dual asset: YouTube channel + website", "Within budget at $60K", "Low multiple 23x"],
      reasonsAgainst: ["Only 2 years old", "YouTube + affiliate — dual algorithm dependency", "News/education — can be disrupted by AI"],
    };
  })(),
  // 30
  (() => {
    const a = 47, r = 50, rs = roiScore(roi(109551, 3534)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91348", niche: "Office Supply, Home", price: 109551, monthlyProfit: 3534, monthlyRevenue: 15192,
      monetization: "Amazon FBA, eCommerce", multiple: 31, firstMadeMoney: 2022,
      description: "This Amazon FBA business, launched in December 2022, operates within the office supply and home niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 109551),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Office + home — highly evergreen", "3 years old — decent track record", "Dual distribution"],
      reasonsAgainst: ["FBA physical inventory", "Low margins (~23%)", "Above $109K — near budget"],
    };
  })(),
  // 31
  (() => {
    const a = 52, r = 55, rs = roiScore(roi(137615, 5983)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91185", niche: "Pet Care, Occasions & Gifts, Art", price: 137615, monthlyProfit: 5983, monthlyRevenue: 49756,
      monetization: "eCommerce", multiple: 23, firstMadeMoney: 2020,
      description: "This is an opportunity to acquire a well-established eCommerce business based in Italy...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 137615),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["5-year track record", "Multi-niche — pets, gifts, art"],
      reasonsAgainst: ["Based in Italy — EU regulations, shipping complexity", "Above $137K budget", "eCommerce ops heavy", "Low margins (~12%)"],
    };
  })(),
  // 32
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(148012, 5920)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90572", niche: "Outdoors, Home, Bed & Bath", price: 148012, monthlyProfit: 5920, monthlyRevenue: 39741,
      monetization: "Amazon FBA, Other", multiple: 25, firstMadeMoney: 2022,
      description: "This listing is for an Amazon FBA and eCommerce business established in April 2022...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 148012),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Home/outdoors — evergreen", "Pending sold — strong market validation"],
      reasonsAgainst: ["Above $148K budget", "FBA physical inventory", "Already pending sold — not available"],
    };
  })(),
  // 33
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(105935, 5297)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91156", niche: "Jewelry, Occasions & Gifts", price: 105935, monthlyProfit: 5297, monthlyRevenue: 16654,
      monetization: "Amazon FBA", multiple: 20, firstMadeMoney: 2023,
      description: "This listing represents an Amazon FBA business that began generating revenue in May 2023...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 105935),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Low multiple 20x — best ROI potential", "Jewelry + gifts — recurring demand"],
      reasonsAgainst: ["Only 2 years old", "FBA single platform dependency", "Physical inventory risk", "Above $105K budget"],
    };
  })(),
  // 34
  (() => {
    const a = 65, r = 75, rs = roiScore(roi(42595, 1121)), e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87216", niche: "Business, Technology", price: 42595, monthlyProfit: 1121, monthlyRevenue: 1262,
      monetization: "SaaS", multiple: 38, firstMadeMoney: 2003,
      description: "This is a well-established SaaS business founded in 2003, operating in the business and technology sector...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 42595),
      aiManageable: aiM,
      category: "saas" as const,
      reasonsFor: ["22-year track record — exceptional stability", "SaaS recurring revenue model", "Business tech — strong evergreen", "Budget-friendly at $42K"],
      reasonsAgainst: ["Low monthly profit ($1,121)", "High multiple 38x for low profit", "SaaS needs technical maintenance"],
    };
  })(),
  // 35
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(90265, 2912)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90811", niche: "Occasions & Gifts", price: 90265, monthlyProfit: 2912, monthlyRevenue: 16699,
      monetization: "Amazon FBA", multiple: 31, firstMadeMoney: 2023,
      description: "Launched in 2023, this US-based Amazon FBA business operates in the 3D pop-up greeting card niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 90265),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Niche product — 3D greeting cards, defensible niche", "Gifts — recurring seasonal demand"],
      reasonsAgainst: ["Only 2 years old", "FBA single platform", "Physical inventory + seasonal spikes", "Low margins (~17%)"],
    };
  })(),
  // 36
  (() => {
    const a = 80, r = 45, rs = roiScore(roi(35319, 1536)), e = 48;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90674", niche: "Gaming, Digital Media", price: 35319, monthlyProfit: 1536, monthlyRevenue: 1538,
      monetization: "Digital Product, eCommerce", multiple: 23, firstMadeMoney: 2023,
      description: "This listing is for a digital product business established in June 2023 that sells video game assets...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 35319),
      aiManageable: aiM,
      category: "digital_product" as const,
      reasonsFor: ["Very budget-friendly at $35K", "Digital products — zero inventory, high margin (~100%)", "Game assets — AI can create new content"],
      reasonsAgainst: ["Gaming niche volatile and trend-driven", "Only 2 years old", "Small scale — limited growth ceiling"],
    };
  })(),
  // 37
  (() => {
    const a = 90, r = 60, rs = roiScore(roi(52419, 1456)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90541", niche: "Culinary", price: 52419, monthlyProfit: 1456, monthlyRevenue: 1552,
      monetization: "Display Advertising", multiple: 36, firstMadeMoney: 2020,
      description: "This listing is for a display advertising business established in 2020 and operating in the culinary...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 52419),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["5-year track record", "Culinary/food — highly evergreen", "Display ads — AI writes all recipes/content", "Budget-friendly at $52K"],
      reasonsAgainst: ["High multiple 36x for display ads", "Google algorithm dependency", "Relatively low monthly profit"],
    };
  })(),
  // 38
  (() => {
    const a = 85, r = 48, rs = roiScore(roi(57953, 2520)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90535", niche: "Information", price: 57953, monthlyProfit: 2520, monthlyRevenue: 8908,
      monetization: "Affiliate, Amazon Associates", multiple: 23, firstMadeMoney: 2023,
      description: "This dynamic online business leverages a highly efficient affiliate model by curating the best deals...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 57953),
      aiManageable: aiM,
      category: "affiliate" as const,
      reasonsFor: ["Affiliate model — AI can curate deals", "Low multiple 23x", "Within budget at $58K", "Dual affiliate + Amazon associates"],
      reasonsAgainst: ["Only 2 years old", "Deals curation can become stale without maintenance", "Affiliate link dependency"],
    };
  })(),
  // 39
  (() => {
    const a = 85, r = 58, rs = roiScore(roi(93608, 3900)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90544", niche: "Technology, Information, Digital Media", price: 93608, monthlyProfit: 3900, monthlyRevenue: 4589,
      monetization: "YouTube", multiple: 24, firstMadeMoney: 2022,
      description: "Launched in late 2022, this business operates three faceless YouTube channels that provide tutorials...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 93608),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Three faceless YouTube channels — diversified risk", "Tech tutorials — AI scripted perfectly", "3-year track record", "High profit margin (~85%)", "Within budget"],
      reasonsAgainst: ["YouTube algorithm single platform dependency", "Tech tutorial niche may get AI-disrupted", "Above $93K — close to budget"],
    };
  })(),
  // 40
  (() => {
    const a = 47, r = 35, rs = roiScore(roi(95731, 3191)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90289", niche: "Art", price: 95731, monthlyProfit: 3191, monthlyRevenue: 24986,
      monetization: "Amazon FBA", multiple: 30, firstMadeMoney: 2024,
      description: "This listing is for an Amazon FBA business operating in the art niche, established in January 2024...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 95731),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Art supplies — decent niche demand"],
      reasonsAgainst: ["Only 1 year old — extremely new", "FBA physical inventory", "Low margins (~13%)", "Art niche discretionary spending"],
    };
  })(),
  // 41
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(89001, 2472)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90430", niche: "Beauty", price: 89001, monthlyProfit: 2472, monthlyRevenue: 8726,
      monetization: "Amazon FBA", multiple: 36, firstMadeMoney: 2020,
      description: "This listing is for an Amazon FBA skincare business founded in December 2020, operating exclusively...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 46748),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["5-year track record", "Skincare — solid evergreen demand"],
      reasonsAgainst: ["High multiple 36x", "FBA single platform", "Beauty extremely competitive", "Low margins (~28%)"],
    };
  })(),
  // 42
  (() => {
    const a = 47, r = 45, rs = roiScore(roi(157646, 7882)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "85787", niche: "Food & Beverages", price: 157646, monthlyProfit: 7882, monthlyRevenue: 47030,
      monetization: "Amazon FBA, eCommerce", multiple: 20, firstMadeMoney: 2023,
      description: "This listing is for a turnkey Amazon FBA business in the food and beverages sector, founded in October 2023...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 157646),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Food & beverages — highly evergreen", "Low multiple 20x — better ROI potential"],
      reasonsAgainst: ["Above budget at $157K", "Food FBA — perishable/expiry/regulatory risk", "Only 2 years old"],
    };
  })(),
  // 43
  (() => {
    const a = 82, r = 55, rs = roiScore(roi(44742, 3196)), e = 62;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "90449", niche: "Automotive", price: 44742, monthlyProfit: 3196, monthlyRevenue: 3931,
      monetization: "YouTube", multiple: 14, firstMadeMoney: 2022,
      description: "Launched in 2022, this YouTube channel produces content centered around car TV shows...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 44742),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Exceptional multiple 14x — very low entry price vs profit", "Budget-friendly at $45K", "Automotive enthusiast — passionate audience", "AI can script car TV commentary"],
      reasonsAgainst: ["Automotive TV shows — potential copyright issues", "3 years old — moderate track record", "YouTube single platform"],
    };
  })(),
  // 44
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(111340, 3976)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88948", niche: "Automotive", price: 111340, monthlyProfit: 3976, monthlyRevenue: 44827,
      monetization: "Amazon FBA", multiple: 28, firstMadeMoney: 2020,
      description: "This Amazon FBA business specializes in LED lighting products for automotive and outdoor use...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 111340),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["5-year track record", "LED automotive — niche with defensible product"],
      reasonsAgainst: ["Above $111K budget", "FBA physical inventory + automotive returns", "Low margins (~9%)"],
    };
  })(),
  // 45
  (() => {
    const a = 47, r = 62, rs = roiScore(roi(134167, 3531)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "89278", niche: "Apparel & Accessories", price: 134167, monthlyProfit: 3531, monthlyRevenue: 22413,
      monetization: "Amazon FBA", multiple: 38, firstMadeMoney: 2018,
      description: "This Amazon FBA business, launched in October 2018, operates in the apparel and accessories category...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 134167),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["7-year track record", "Established brand in apparel"],
      reasonsAgainst: ["High multiple 38x", "Above $134K budget", "FBA physical inventory", "Low margins (~16%)"],
    };
  })(),
  // 46
  (() => {
    const a = 68, r = 42, rs = roiScore(roi(76200, 2381)), e = 62;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "89555", niche: "Photography, Digital Media", price: 76200, monthlyProfit: 2381, monthlyRevenue: 2753,
      monetization: "SaaS", multiple: 32, firstMadeMoney: 2024,
      description: "This is an AI-driven digital product business in the photography / digital media niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 76200),
      aiManageable: aiM,
      category: "saas" as const,
      reasonsFor: ["AI-powered tool — aligns with AI management theme", "Digital product — no inventory", "Good profit margin (~86%)"],
      reasonsAgainst: ["Only monetized 2024 — very new", "Photography SaaS — fast-moving competitive space", "AI face-swapping regulatory risk"],
    };
  })(),
  // 47
  (() => {
    const a = 47, r = 58, rs = roiScore(roi(154218, 5508)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88909", niche: "Apparel & Accessories", price: 154218, monthlyProfit: 5508, monthlyRevenue: 26485,
      monetization: "Amazon FBA", multiple: 28, firstMadeMoney: 2019,
      description: "This listing is for an established Amazon FBA business in the apparel and accessories niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 154218),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["6-year track record since 2019", "Established FBA brand"],
      reasonsAgainst: ["Above $154K budget", "FBA physical inventory", "Apparel trend risk", "Low margins (~21%)"],
    };
  })(),
  // 48
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(64361, 1839)), e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88517", niche: "Art, Personal Care, Outdoors, Home", price: 64361, monthlyProfit: 1839, monthlyRevenue: 20854,
      monetization: "Amazon FBA", multiple: 35, firstMadeMoney: 2023,
      description: "Founded in 2023, this Amazon FBA brand offers eight profitable, fast-selling SKUs...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 64361),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Multi-SKU — diversified within FBA", "Multi-niche approach"],
      reasonsAgainst: ["Only 2 years old", "FBA physical inventory across 8 SKUs", "Very low margins (~9%)", "High multiple 35x for low profit"],
    };
  })(),
  // 49
  (() => {
    const a = 47, r = 60, rs = roiScore(roi(84321, 3513)), e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87013", niche: "Apparel & Accessories, Medical", price: 84321, monthlyProfit: 3513, monthlyRevenue: 14971,
      monetization: "Amazon FBA, eCommerce", multiple: 24, firstMadeMoney: 2018,
      description: "This Amazon FBA and eCommerce business, founded by a husband-and-wife team, specializes in apparel...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 84321),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["7-year track record since 2018", "Medical apparel — niche defensible"],
      reasonsAgainst: ["FBA + eCommerce dual ops burden", "Low margins (~23%)", "Needs VA for order management"],
    };
  })(),
  // 50
  (() => {
    const a = 52, r = 65, rs = roiScore(roi(null, 87184)), e = 65;
    const ov = overall(a, r, 50, e); // null price → ROI n/a, use 50
    const aiM = a >= 65;
    return {
      id: "86610", niche: "Apparel & Accessories", price: null, monthlyProfit: 87184, monthlyRevenue: 601183,
      monetization: "eCommerce", multiple: null, firstMadeMoney: 2006,
      description: "For sale is a robust portfolio of 13 Shopify stores in the formal and workwear niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: 50, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, null),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["19-year track record — extraordinary longevity", "Portfolio of 13 stores — maximum diversification", "Massive monthly profit"],
      reasonsAgainst: ["Price not listed — likely millions, way above budget", "13 stores need significant operations team", "Make Offer pricing = very expensive"],
    };
  })(),
  // 51
  (() => {
    const a = 78, r = 38, rs = roiScore(roi(27471, 1717)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "89017", niche: "Survival & Security, Religion & Spirituality", price: 27471, monthlyProfit: 1717, monthlyRevenue: 2332,
      monetization: "Amazon KDP", multiple: 16, firstMadeMoney: 2024,
      description: "This listing is for an Amazon KDP business established in July 2024...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 27471),
      aiManageable: aiM,
      category: "kdp" as const,
      reasonsFor: ["Very low entry price at $27K", "KDP — AI can write and publish books", "Low multiple 16x — best ROI ratio", "No inventory — digital publishing"],
      reasonsAgainst: ["Only 7 months old — extremely new", "Religious/survival niche narrow", "KDP algorithm dependency"],
    };
  })(),
  // 52
  (() => {
    const a = 47, r = 65, rs = roiScore(roi(82336, 2058)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88493", niche: "Personal Care", price: 82336, monthlyProfit: 2058, monthlyRevenue: 8838,
      monetization: "Amazon FBA", multiple: 40, firstMadeMoney: 2014,
      description: "This Amazon FBA business, founded in December 2014, operates in the personal care niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 82336),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["11-year track record — exceptional longevity since 2014", "Personal care — evergreen niche"],
      reasonsAgainst: ["High multiple 40x", "FBA physical inventory", "Low margins (~23%)", "Personal care very competitive"],
    };
  })(),
  // 53
  (() => {
    const a = 47, r = 60, rs = roiScore(roi(null, 50069)), e = 88;
    const ov = overall(a, r, 50, e);
    const aiM = a >= 65;
    return {
      id: "88520", niche: "Supplements", price: null, monthlyProfit: 50069, monthlyRevenue: 266428,
      monetization: "Amazon FBA", multiple: null, firstMadeMoney: 2018,
      description: "This Amazon FBA brand in the supplements space has rapidly grown since its 2021 launch...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: 50, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, null),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Supplements — high evergreen demand", "Already pending sold — strong validation"],
      reasonsAgainst: ["Pending sold — not available", "Price not listed — far above budget", "FBA supplement regulatory compliance"],
    };
  })(),
  // 54
  (() => {
    const a = 68, r = 40, rs = roiScore(roi(150381, 4423)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88013", niche: "Technology", price: 150381, monthlyProfit: 4423, monthlyRevenue: 5560,
      monetization: "Subscription", multiple: 34, firstMadeMoney: 2023,
      description: "Launched in 2023, this Subscription-based business offers an AI-powered face-swapping tool...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 150381),
      aiManageable: aiM,
      category: "subscription" as const,
      reasonsFor: ["Subscription recurring revenue model", "AI tool — high autonomy potential", "Good profit margin (~80%)"],
      reasonsAgainst: ["Above $150K budget", "Only 2 years old", "AI face-swapping — regulatory/ethical risk", "Highly competitive AI tools space"],
    };
  })(),
  // 55
  (() => {
    const a = 58, r = 38, rs = roiScore(roi(92084, 3837)), e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88118", niche: "Home", price: 92084, monthlyProfit: 3837, monthlyRevenue: 19960,
      monetization: "DropShipping", multiple: 24, firstMadeMoney: 2024,
      description: "This UK-focused dropshipping store was set up in 2024, specializing in the sale of both trending and...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 92084),
      aiManageable: aiM,
      category: "dropshipping" as const,
      reasonsFor: ["Home niche — extremely evergreen", "No inventory dropshipping model", "UK market — strong consumer spending"],
      reasonsAgainst: ["Only set up 2024 — very new", "Dropshipping supplier dependency", "UK-focused — Brexit/import complications", "Low margins (~19%)"],
    };
  })(),
  // 56
  (() => {
    const a = 47, r = 62, rs = roiScore(roi(null, 78844)), e = 75;
    const ov = overall(a, r, 50, e);
    const aiM = a >= 65;
    return {
      id: "87195", niche: "Books", price: null, monthlyProfit: 78844, monthlyRevenue: 316245,
      monetization: "Amazon FBA", multiple: null, firstMadeMoney: 2018,
      description: "This listing is for a fast-growing, design-protected Amazon FBA brand in the day planning and journaling...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: 50, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, null),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Design-protected products — defensible brand", "Journals/planners — evergreen demand", "Already pending sold — validated"],
      reasonsAgainst: ["Pending sold — not available", "Price unlisted — far above budget", "FBA physical inventory at scale"],
    };
  })(),
  // 57
  (() => {
    const a = 57, r = 55, rs = roiScore(roi(61011, 1695)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88372", niche: "Beauty, Personal Care", price: 61011, monthlyProfit: 1695, monthlyRevenue: 9426,
      monetization: "eCommerce", multiple: 36, firstMadeMoney: 2020,
      description: "Established in late 2020, this Shopify business specializes in the sale of Korean beauty products...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 61011),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["Korean beauty — strong trend momentum", "5-year track record", "Within budget at $61K"],
      reasonsAgainst: ["eCommerce ops needed", "Beauty very competitive", "Low margins (~18%)", "K-beauty trend could fade"],
    };
  })(),
  // 58
  (() => {
    const a = 47, r = 55, rs = roiScore(roi(54533, 2097)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "79998", niche: "Equipment, Home", price: 54533, monthlyProfit: 2097, monthlyRevenue: 18112,
      monetization: "Amazon FBA", multiple: 26, firstMadeMoney: 2021,
      description: "Founded in 2021, this Amazon FBA brand in the home and equipment niche specializes in a range of 13 SKUs...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 54533),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Home/equipment — highly evergreen", "4-year track record", "13 SKUs — diversified", "Within budget at $55K"],
      reasonsAgainst: ["FBA physical inventory across 13 SKUs", "Very low margins (~12%)", "Amazon single platform"],
    };
  })(),
  // 59
  (() => {
    const a = 47, r = 35, rs = roiScore(roi(40499, 6750)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86415", niche: "Health & Fitness", price: 40499, monthlyProfit: 6750, monthlyRevenue: 21476,
      monetization: "Amazon FBA, eCommerce", multiple: null, firstMadeMoney: 2024,
      description: "This listing is for an Amazon FBA business in the health niche, specializing in oral hygiene products...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 40499),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Extraordinary ROI — $40K price vs $6750/mo profit", "Health/oral hygiene — extremely evergreen", "Budget-friendly"],
      reasonsAgainst: ["Only started 2024 — very new, may be artificially priced", "FBA oral hygiene — FDA regulatory risk", "Too good to be true — verify carefully"],
    };
  })(),
  // 60
  (() => {
    const a = 58, r = 42, rs = roiScore(roi(90700, 3779)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88028", niche: "Sports, Health & Fitness", price: 90700, monthlyProfit: 3779, monthlyRevenue: 70557,
      monetization: "DropShipping", multiple: 24, firstMadeMoney: 2023,
      description: "This listing is for a U.S.-based dropshipping business founded in July 2023, operating in the sports...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 90700),
      aiManageable: aiM,
      category: "dropshipping" as const,
      reasonsFor: ["Sports/fitness — solid evergreen niche", "Dropshipping — no inventory", "Low multiple 24x"],
      reasonsAgainst: ["Only 2 years old", "Extremely low margins (~5%) on $70K revenue", "Dropshipping supplier dependency"],
    };
  })(),
  // 61
  (() => {
    const a = 47, r = 62, rs = roiScore(roi(119725, 3991)), e = 90;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86273", niche: "Medical, Health & Fitness", price: 119725, monthlyProfit: 3991, monthlyRevenue: 31495,
      monetization: "Amazon FBA, eCommerce", multiple: 30, firstMadeMoney: 2015,
      description: "This established eCommerce business, launched in April 2015, operates in the medical and health niche...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 119725),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["10-year track record — exceptional", "Medical + health — max evergreen", "Pending sold — highly validated"],
      reasonsAgainst: ["Pending sold — not available", "FBA medical regulatory complexity", "Above $119K budget"],
    };
  })(),
  // 62
  (() => {
    const a = 75, r = 62, rs = roiScore(roi(32398, 1157)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86318", niche: "Home, Business", price: 32398, monthlyProfit: 1157, monthlyRevenue: 1219,
      monetization: "Affiliate, Lead Gen", multiple: 28, firstMadeMoney: 2020,
      description: "This listing is for a Canadian lead generation business, operating in the home services niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 32398),
      aiManageable: aiM,
      category: "lead_gen" as const,
      reasonsFor: ["Very affordable at $32K", "Home services lead gen — evergreen local demand", "5-year track record", "High profit margin (~95%)", "AI can manage SEO + content"],
      reasonsAgainst: ["Lead gen relies on steady search traffic", "Canadian market — geographic limitation", "Low absolute monthly profit ($1,157)"],
    };
  })(),
  // 63
  (() => {
    const a = 90, r = 68, rs = roiScore(roi(67828, 2055)), e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "88055", niche: "Health & Fitness, Lifestyle, Food & Beverages", price: 67828, monthlyProfit: 2055, monthlyRevenue: 2359,
      monetization: "Display Advertising, Affiliate, Amazon Associates", multiple: 33, firstMadeMoney: 2019,
      description: "This WordPress blog, founded in November 2016, is a resource hub for individuals exploring a lifestyle...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 67828),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["9-year track record since 2016", "Triple monetization — display + affiliate + Amazon", "Health/lifestyle/food — highly evergreen", "AI can write all content", "Within budget"],
      reasonsAgainst: ["Google algorithm dependency for organic traffic", "High multiple 33x for display ads site", "Lifestyle blogging competitive"],
    };
  })(),
  // 64
  (() => {
    const a = 38, r = 62, rs = roiScore(roi(101907, 5661)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87483", niche: "Technology, Business", price: 101907, monthlyProfit: 5661, monthlyRevenue: 13180,
      monetization: "Service", multiple: 18, firstMadeMoney: 2017,
      description: "Established in 2017, this innovative B2B service business specializes in a specific technology niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 101907),
      aiManageable: aiM,
      category: "service" as const,
      reasonsFor: ["8-year track record", "B2B service — stable recurring clients", "Low multiple 18x — excellent ROI"],
      reasonsAgainst: ["B2B service requires human relationships", "Not AI/VA manageable", "Technology niche requires expertise"],
    };
  })(),
  // 65
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(38110, 2242)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87428", niche: "Beauty, Bed & Bath", price: 38110, monthlyProfit: 2242, monthlyRevenue: 12373,
      monetization: "Amazon FBA", multiple: 17, firstMadeMoney: 2022,
      description: "This listing is for an established business, started in mid-2022, specializing in Fragrances...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 38110),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Very low multiple 17x — excellent ROI", "Budget-friendly at $38K", "Fragrances — recurring beauty demand"],
      reasonsAgainst: ["FBA physical inventory", "Fragrances — regulatory/shipping restrictions", "Only 3 years old"],
    };
  })(),
  // 66
  (() => {
    const a = 47, r = 60, rs = roiScore(roi(96669, 4603)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87466", niche: "Health & Fitness", price: 96669, monthlyProfit: 4603, monthlyRevenue: 16109,
      monetization: "Amazon FBA, eCommerce", multiple: 21, firstMadeMoney: 2018,
      description: "This listing is for a UK-focused brand selling health and fitness-related consumable goods...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 96669),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["7-year track record since 2018", "Low multiple 21x — good ROI", "Health consumables — high repeat purchase rate"],
      reasonsAgainst: ["UK-focused — Brexit/import complexity", "FBA physical inventory", "Low margins (~29%)"],
    };
  })(),
  // 67
  (() => {
    const a = 57, r = 42, rs = roiScore(roi(94116, 5536)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86851", niche: "Supplements, Health & Fitness", price: 94116, monthlyProfit: 5536, monthlyRevenue: 11186,
      monetization: "eCommerce", multiple: 17, firstMadeMoney: 2022,
      description: "Founded in July 2022, this BigCommerce-based eCommerce business specializes in male enhancement supplements...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 94116),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["Very low multiple 17x — excellent ROI potential", "High profit margin (~50%)", "Supplements — repeat purchase niche"],
      reasonsAgainst: ["Male enhancement — sensitive niche, advertising restrictions", "Only 3 years old", "eCommerce ops needed", "Regulatory risk for enhancement supplements"],
    };
  })(),
  // 68
  (() => {
    const a = 57, r = 65, rs = roiScore(roi(120416, 6690)), e = 72;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86780", niche: "Hobbies, Sports, Outdoors", price: 120416, monthlyProfit: 6690, monthlyRevenue: 41462,
      monetization: "eCommerce", multiple: 18, firstMadeMoney: 2015,
      description: "This well-established e-commerce business, started in 2015, specializes in electric mobility equipment...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 120416),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["10-year track record since 2015", "Electric mobility — growing trend", "Low multiple 18x — strong ROI", "High absolute profit ($6,690/mo)"],
      reasonsAgainst: ["eCommerce — needs VA for order management", "Electric equipment — warranty/returns complexity", "Above $120K budget"],
    };
  })(),
  // 69
  (() => {
    const a = 52, r = 60, rs = roiScore(roi(151043, 5809)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "84703", niche: "Home, Lifestyle, Personal Care, Beauty", price: 151043, monthlyProfit: 5809, monthlyRevenue: 27916,
      monetization: "eCommerce, Amazon FBA, Amazon FBM", multiple: 26, firstMadeMoney: 2019,
      description: "Established in the vibrant health and beauty sector, this business offers a curated range of niche products...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 151043),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["6-year track record since 2019", "Triple distribution: eCommerce + FBA + FBM", "Multi-niche diversification"],
      reasonsAgainst: ["Above $151K budget", "Complex multi-channel ops", "Low margins (~21%)"],
    };
  })(),
  // 70
  (() => {
    const a = 82, r = 30, rs = roiScore(roi(60007, 5001)), e = 42;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86361", niche: "News & Education", price: 60007, monthlyProfit: 5001, monthlyRevenue: 7210,
      monetization: "YouTube", multiple: 12, firstMadeMoney: 2024,
      description: "Launched in late 2024, this dynamic YouTube channel specializes in political content...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 60007),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Extraordinary multiple 12x — best price/profit ratio", "High monthly profit $5K on $60K price", "Within budget"],
      reasonsAgainst: ["Political content — extremely volatile and risky", "Only late 2024 monetized — very new", "Political YouTube — demonetization risk", "Not evergreen — depends on current events"],
    };
  })(),
  // 71
  (() => {
    const a = 90, r = 48, rs = roiScore(roi(76567, 3329)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "86127", niche: "Lifestyle, Beauty, Home", price: 76567, monthlyProfit: 3329, monthlyRevenue: 3366,
      monetization: "Display Advertising, Affiliate, Amazon Associates", multiple: 23, firstMadeMoney: 2023,
      description: "Launched in 2023, this Display Ads site operates in the beauty, home, and lifestyle niches...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 76567),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["Triple monetization — display + affiliate + Amazon", "Beauty/home/lifestyle — highly evergreen", "AI can write all content", "Low multiple 23x", "Near 100% profit margin"],
      reasonsAgainst: ["Only 2 years old", "Google core update sensitivity for display ads", "Affiliate/Amazon commissions can be cut"],
    };
  })(),
  // 72
  (() => {
    const a = 83, r = 45, rs = roiScore(roi(53326, 2051)), e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "85655", niche: "Coupons", price: 53326, monthlyProfit: 2051, monthlyRevenue: 2354,
      monetization: "YouTube, Affiliate, Other", multiple: 26, firstMadeMoney: 2024,
      description: "Launched in 2023, this YouTube and Affiliate business operates in the coupons and deals niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 53326),
      aiManageable: aiM,
      category: "youtube" as const,
      reasonsFor: ["Coupons — recession-proof demand", "Dual YouTube + affiliate", "Within budget at $53K"],
      reasonsAgainst: ["Only started 2024", "Coupon niche needs constant deal sourcing", "YouTube + affiliate algorithm exposure"],
    };
  })(),
  // 73
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(134610, 4807)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "85067", niche: "Sports, Health & Fitness", price: 134610, monthlyProfit: 4807, monthlyRevenue: 18507,
      monetization: "Amazon FBA", multiple: 28, firstMadeMoney: 2024,
      description: "Launched in 2023, this Amazon FBA business sells a home exercise product within the health & fitness niche...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 134610),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Health & fitness — strong evergreen niche", "Pending sold — market validated"],
      reasonsAgainst: ["Pending sold — not available", "Above $134K budget", "FBA physical inventory"],
    };
  })(),
  // 74
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(40071, 1431)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "83333", niche: "Kitchenware", price: 40071, monthlyProfit: 1431, monthlyRevenue: 12163,
      monetization: "Amazon FBA", multiple: 28, firstMadeMoney: 2023,
      description: "This Amazon FBA business was established in September 2022 and operates in the kitchenware niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 40071),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Budget-friendly at $40K", "Kitchenware — highly evergreen", "3-year track record"],
      reasonsAgainst: ["FBA physical inventory", "Very low margins (~12%)", "Kitchenware competitive on Amazon"],
    };
  })(),
  // 75
  (() => {
    const a = 80, r = 72, rs = roiScore(roi(87844, 3253)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "84353", niche: "Technology, News & Education", price: 87844, monthlyProfit: 3253, monthlyRevenue: 3960,
      monetization: "Digital Product, Display Advertising", multiple: 27, firstMadeMoney: 2017,
      description: "This listing is for a software engineering-related website started in 2016 to help educate developers...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 87844),
      aiManageable: aiM,
      category: "digital_product" as const,
      reasonsFor: ["9-year track record since 2016", "Tech education — extremely evergreen developer demand", "Dual monetization: digital product + display ads", "AI can create tutorials/content", "Within budget"],
      reasonsAgainst: ["Tech education — AI itself disrupting this space", "Google algorithm dependency for organic traffic"],
    };
  })(),
  // 76
  (() => {
    const a = 47, r = 38, rs = roiScore(roi(98952, 4948)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "84829", niche: "Home", price: 98952, monthlyProfit: 4948, monthlyRevenue: 30487,
      monetization: "Amazon FBA", multiple: 20, firstMadeMoney: 2024,
      description: "This EU-based Amazon FBA business operates in the Home niche, selling compact, lightweight attachments...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 98952),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Home niche — highly evergreen", "Low multiple 20x — good ROI potential"],
      reasonsAgainst: ["EU-based — complex EU regulations + VAT", "Only started 2024 — very new", "FBA physical inventory", "Low margins (~16%)"],
    };
  })(),
  // 77
  (() => {
    const a = 90, r = 42, rs = roiScore(roi(143043, 5298)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "83071", niche: "Information", price: 143043, monthlyProfit: 5298, monthlyRevenue: 5632,
      monetization: "Display Advertising, Other", multiple: 27, firstMadeMoney: 2024,
      description: "This listing is for a content site with a significant amount of organic traffic...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 143043),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["Very high profit margin (~94%)", "AI writes all content — perfect autonomy", "Display ads — fully passive"],
      reasonsAgainst: ["Above $143K budget", "Only monetized 2024 — new", "Google algorithm single dependency"],
    };
  })(),
  // 78
  (() => {
    const a = 80, r = 65, rs = roiScore(roi(139926, 3887)), e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "83260", niche: "Occasions & Gifts", price: 139926, monthlyProfit: 3887, monthlyRevenue: 6581,
      monetization: "Amazon Merch, Amazon KDP", multiple: 36, firstMadeMoney: 2019,
      description: "This listing is for a Merch business that comes with an additional KDP business attached...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 139926),
      aiManageable: aiM,
      category: "kdp" as const,
      reasonsFor: ["Amazon Merch + KDP — dual passive income streams", "6-year track record since 2019", "AI can design merch + write KDP books"],
      reasonsAgainst: ["Above $139K budget", "High multiple 36x", "Amazon-platform dependency for both channels"],
    };
  })(),
  // 79
  (() => {
    const a = 80, r = 48, rs = roiScore(roi(126545, 4218));
    const e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "83091", niche: "Business, Office Supply, Retail & Wholesale", price: 126545, monthlyProfit: 4218, monthlyRevenue: 7267,
      monetization: "Amazon KDP", multiple: 30, firstMadeMoney: 2023,
      description: "This listing is for an Amazon KDP business established in November 2022, operating in the Business...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 126545),
      aiManageable: aiM,
      category: "kdp" as const,
      reasonsFor: ["KDP — AI writes all books/content", "Business/office — evergreen B2B demand", "Good profit margin (~58%)"],
      reasonsAgainst: ["Above $126K budget", "Only 3 years old", "KDP algorithm and Amazon policy dependency"],
    };
  })(),
  // 80
  (() => {
    const a = 47, r = 60, rs = roiScore(roi(145521, 4851)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "80114", niche: "Travel", price: 145521, monthlyProfit: 4851, monthlyRevenue: 37092,
      monetization: "Amazon FBA, eCommerce", multiple: 30, firstMadeMoney: 2017,
      description: "This listing is for an Amazon FBA and eCommerce business in the travel niche - started in 2017...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 145521),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["8-year track record since 2017", "Travel accessories — steady demand", "Dual FBA + eCommerce distribution"],
      reasonsAgainst: ["Above $145K budget", "FBA physical inventory", "Travel accessories — discretionary spend", "Low margins (~13%)"],
    };
  })(),
  // 81
  (() => {
    const a = 47, r = 52, rs = roiScore(roi(134012, 4061)), e = 82;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "81294", niche: "Medical, Lifestyle, Equipment", price: 134012, monthlyProfit: 4061, monthlyRevenue: 31446,
      monetization: "Amazon FBA", multiple: 33, firstMadeMoney: 2022,
      description: "This listing is for an Amazon FBA business selling medical equipment niched down to specific purpose...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 134012),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Medical equipment — highly evergreen", "Niche-specific — defensible position", "3-year track record"],
      reasonsAgainst: ["Above $134K budget", "FBA medical equipment — regulatory risk", "Low margins (~13%)"],
    };
  })(),
  // 82
  (() => {
    const a = 47, r = 65, rs = roiScore(roi(110496, 5525)), e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "81363", niche: "Apparel & Accessories, Children, Health & Fitness", price: 110496, monthlyProfit: 5525, monthlyRevenue: 43360,
      monetization: "Amazon FBA", multiple: 20, firstMadeMoney: 2014,
      description: "This listing is for an FBA business with two brands - one focused on a niched-down type of apparel...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 110496),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["11-year track record — exceptional longevity", "Two brands — diversified", "Low multiple 20x — strong ROI", "Children + health — evergreen"],
      reasonsAgainst: ["FBA physical inventory at scale", "Low margins (~13%)", "Children products — strict safety regulations", "Above $110K budget"],
    };
  })(),
  // 83
  (() => {
    const a = 47, r = 42, rs = roiScore(roi(152867, 4368)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "91737", niche: "Supplements", price: 152867, monthlyProfit: 4368, monthlyRevenue: 17309,
      monetization: "Amazon FBA", multiple: 35, firstMadeMoney: 2023,
      description: "Launched in 2023, this Amazon FBA business specializes in selling supplements within the health and wellness...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 152867),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["Supplements — extreme evergreen demand", "Pending sold — strong market validation"],
      reasonsAgainst: ["Pending sold — not available", "Above $152K budget", "FBA supplement regulations"],
    };
  })(),
  // 84
  (() => {
    const a = 47, r = 65, rs = roiScore(roi(68063, 3582)), e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "79895", niche: "Health & Fitness, Medical", price: 68063, monthlyProfit: 3582, monthlyRevenue: 26077,
      monetization: "Amazon FBA", multiple: 19, firstMadeMoney: 2015,
      description: "This listing is for an Amazon FBA business created in October 2015 in the health & fitness and medical niche...",
      status: "pending_sold" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 68063),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["10-year track record — exceptional", "Health/medical — max evergreen", "Low multiple 19x", "Pending sold — validated"],
      reasonsAgainst: ["Pending sold — not available", "FBA medical complexity"],
    };
  })(),
  // 85
  (() => {
    const a = 47, r = 58, rs = roiScore(roi(72932, 3039)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "76419", niche: "Automotive", price: 72932, monthlyProfit: 3039, monthlyRevenue: 25651,
      monetization: "Amazon FBA", multiple: 24, firstMadeMoney: 2021,
      description: "This listing is for an Amazon FBA business created in April 2021 in the automotive niche...",
      status: "for_sale" as const,
      autonomyScore: a, riskScore: r, roiScore: rs, evergreenScore: e, overallScore: ov,
      recommendation: rec(ov, aiM, 72932),
      aiManageable: aiM,
      category: "amazon_fba" as const,
      reasonsFor: ["4-year track record", "Automotive accessories — steady demand", "Within budget at $73K"],
      reasonsAgainst: ["FBA physical inventory", "Automotive — niche specific", "Low margins (~12%)"],
    };
  })(),
];
