export interface FlippaListing {
  id: string;
  title: string;
  niche: string;
  price: number | null;
  monthlyProfit: number;
  monthlyRevenue: number;
  monetization: string;
  multiple: number | null;
  firstMadeMoney: number;
  description: string;
  status: "active" | "under_offer" | "sold" | "auction";
  businessAge: number;
  listingType: "buy_now" | "auction" | "offer";
  verificationStatus: "verified" | "partial" | "unverified";
  offersCount: number;
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
    | "subscription"
    | "app"
    | "newsletter";
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

export const ELIMINATED_IDS = new Set<string>([]);


export const flippaListings: FlippaListing[] = [
  // #12101579 — Ecommerce | Sports and Outdoor | $74,110 | $2,952/mo | 48% ROI
  (() => {
    const a = 63, r = 67, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12101579",
      title: "Established eCommerce business in Fishing & Outdoor industry with $39K revenue and 44% profit margin",
      niche: "Sports and Outdoor",
      price: 74110,
      monthlyProfit: 2952,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 2.1,
      firstMadeMoney: 15,
      businessAge: 15,
      description: "Established eCommerce business in Fishing & Outdoor industry with $39K revenue and 44% profit margin. Don't miss out on this opportunity! Ecommerce Sports and Outdoor Business Location Bulgaria Site Age 15 years Monthly Profit GBP £2,227 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 74110),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 15+ years in operation",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12567523 — Ecommerce | Design and Style | $68,489 | $5,474/mo | 96% ROI
  (() => {
    const a = 50, r = 72, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12567523",
      title: "Established jewellery supplies ecom business generating ~$90k annual owner profit, with 68% repeat c",
      niche: "Design and Style",
      price: 68489,
      monthlyProfit: 5474,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.0,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Established jewellery supplies ecom business generating ~$90k annual owner profit, with 68% repeat customers. 20 hours a week, run from home. Ecommerce Design and Style Business Location Australia Site Age 9 years Monthly Profit GBP £4,035 /mo Profit Margin",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 68489),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 96% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11735360 — Content | Lifestyle | $17,000 | $538/mo | 38% ROI
  (() => {
    const a = 87, r = 67, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11735360",
      title: "Homesteading blog + ebooks. $8k/yr, proven SEO rankings, 5–15k sessions/mo. One focused owner could ",
      niche: "Lifestyle",
      price: 17000,
      monthlyProfit: 538,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 2.6,
      firstMadeMoney: 10,
      businessAge: 10,
      description: "Homesteading blog + ebooks. $8k/yr, proven SEO rankings, 5–15k sessions/mo. One focused owner could unlock serious growth. Content Lifestyle Business Location MT, United States Site Age 10 years Monthly Profit GBP £403 /mo Profit Margin 92% Page Views 8,160 p/mo Profit Mul",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 17000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 10+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12668926 — Ecommerce | Health and Beauty | $50,000 | $1,201/mo | 29% ROI
  (() => {
    const a = 63, r = 67, rs = 50, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12668926",
      title: "High-margin Canadian beard brand since 2018 ($30K+ yearly revenue, ~$20K profit), with brand collabo",
      niche: "Health and Beauty",
      price: 50000,
      monthlyProfit: 1201,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 3.5,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "High-margin Canadian beard brand since 2018 ($30K+ yearly revenue, ~$20K profit), with brand collaborations, high AOV, automated systems, and scalable growth. Ecommerce Health and Beauty Business Location Canada Site Age 8 years Monthly Profit GBP £8",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 50000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12641977 — Ecommerce | Design and Style | $42,239 | $2,489/mo | 71% ROI
  (() => {
    const a = 63, r = 72, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12641977",
      title: "Established 10-year jewelry brand with $70K annual revenue across markets, Shopify & wholesale. Incl",
      niche: "Design and Style",
      price: 42239,
      monthlyProfit: 2489,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.4,
      firstMadeMoney: 10,
      businessAge: 10,
      description: "Established 10-year jewelry brand with $70K annual revenue across markets, Shopify & wholesale. Includes inventory, booth&suppliers. Turnkey lifestyle business. Ecommerce Design and Style Business Location Canada Site Age 10 years Monthly Profit GBP £1,850 /m",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 42239),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 71% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 10+ years in operation",
      "Attractive 1.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12651448 — Content | General Knowledge | $83,610 | $3,147/mo | 45% ROI
  (() => {
    const a = 87, r = 57, rs = 75, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12651448",
      title: "A 2-year-old cryptocurrency news platform delivering updates, market insights, and the latest airdro",
      niche: "General Knowledge",
      price: 83610,
      monthlyProfit: 3147,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 2.2,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "A 2-year-old cryptocurrency news platform delivering updates, market insights, and the latest airdrop opportunities for crypto enthusiasts. Content General Knowledge Business Location India Site Age 2 years Monthly Profit GBP £2,353 /mo Profit Margin 91% Page Views",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 83610),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12267830 — Ecommerce | Hobbies and Games | $118,000 | $3,956/mo | 40% ROI
  (() => {
    const a = 68, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12267830",
      title: "7 years old SEO-driven Shopify baby float niche site with organic traffic, dropshipping supplier, Am",
      niche: "Hobbies and Games",
      price: 118000,
      monthlyProfit: 3956,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 2.5,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "7 years old SEO-driven Shopify baby float niche site with organic traffic, dropshipping supplier, Amazon affiliate revenue, strong reviews, seasonal upside. Shopify Ecommerce Hobbies and Games Editors Choice Sponsored Confidential Business Location France Site Age 7 years Monthly Profit GBP £2,902 /",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 118000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12274806 — Ecommerce | Lifestyle | $140,000 | $8,219/mo | 70% ROI
  (() => {
    const a = 68, r = 80, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12274806",
      title: "Leader in online pet lifestyle products with strong revenue and profit margins. Established brand wi",
      niche: "Lifestyle",
      price: 140000,
      monthlyProfit: 8219,
      monthlyRevenue: 0,
      monetization: "Other",
      multiple: 1.4,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Leader in online pet lifestyle products with strong revenue and profit margins. Established brand with a loyal customer base. Shopify Ecommerce Lifestyle Editors Choice Sponsored Confidential Business Location AL, United States Site Age 3 years Monthly Profit GBP £6,162 /mo Profit Margin 66% Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 140000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 70% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12268481 — Ecommerce | Design and Style | $89,359 | $3,843/mo | 52% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12268481",
      title: "8-year-old D2C Leather Belt Brand | €300k+ Revenue (2024) | High-Margin & Automated Shopify Model",
      niche: "Design and Style",
      price: 89359,
      monthlyProfit: 3843,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.9,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "8-year-old D2C Leather Belt Brand | €300k+ Revenue (2024) | High-Margin & Automated Shopify Model Shopify Ecommerce Design and Style Editors Choice Sponsored Confidential Business Location France Site Age 7 years Monthly Profit GBP £2,901 /mo Profit Margin 25% Page Views 14,900 p/mo Profit Multiple",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 89359),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 52% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12264167 — Amazon Store | Health and Beauty | $239,924 | $8,130/mo | 41% ROI
  (() => {
    const a = 67, r = 80, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12264167",
      title: "6 yo Amazon FBA | 2 Brands | 470k€ in revenue (2025) | Lean operation (8h per week)",
      niche: "Health and Beauty",
      price: 239924,
      monthlyProfit: 8130,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.5,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "6 yo Amazon FBA | 2 Brands | 470k€ in revenue (2025) | Lean operation (8h per week) FBA Store Health and Beauty Editors Choice Sponsored Confidential Business Location France Site Age 6 years Monthly Profit GBP £6,132 /mo Profit Margin 18% Profit Multiple 2.5x Revenue Multiple 0.4x View P&L View ins",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 239924),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12259051 — Ecommerce | Business | $192,000 | $5,116/mo | 32% ROI
  (() => {
    const a = 68, r = 80, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12259051",
      title: "Electric guitar bridge E-Com Business w/ 20 year track record. 68% profit margin, $100k+ in annual r",
      niche: "Business",
      price: 192000,
      monthlyProfit: 5116,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 3.1,
      firstMadeMoney: 21,
      businessAge: 21,
      description: "Electric guitar bridge E-Com Business w/ 20 year track record. 68% profit margin, $100k+ in annual revenue, solid growth opportunities Ecommerce Business Editors Choice Sponsored Confidential Business Location CO, United States Site Age 21 years Monthly Profit GBP £3,836 /mo Profit Margin 61% Page V",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 192000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 21+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11981836 — Ecommerce | Sports and Outdoor | $215,100 | $5,566/mo | 31% ROI
  (() => {
    const a = 68, r = 80, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11981836",
      title: "6-Year-Old Automated Brand selling Premium Outdoor Gear|$800K+ Lifetime Revenue|14K+ Emails|72% Gros",
      niche: "Sports and Outdoor",
      price: 215100,
      monthlyProfit: 5566,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 3.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "6-Year-Old Automated Brand selling Premium Outdoor Gear|$800K+ Lifetime Revenue|14K+ Emails|72% Gross Margin|$433K TTM Revenue|97% Dropshipping Niche. Ecommerce Sports and Outdoor Editors Choice Sponsored Confidential Business Location WY, United States Site Age 5 years Monthly Profit GBP £4,173 /mo",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 215100),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12012923 — Ecommerce | Lifestyle | $99,613 | $6,811/mo | 82% ROI
  (() => {
    const a = 55, r = 85, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12012923",
      title: "Shopify eCommerce Business Selling Modern Soft Play & Toys for Kids $3.7M+ Sales, High AOV, Strong R",
      niche: "Lifestyle",
      price: 99613,
      monthlyProfit: 6811,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Shopify eCommerce Business Selling Modern Soft Play & Toys for Kids $3.7M+ Sales, High AOV, Strong Retention Across AUS & NZ Shopify Ecommerce Lifestyle Editors Choice Sponsored Confidential Business Location Australia Site Age 5 years Monthly Profit GBP £4,971 /mo Profit Margin 29% Page Views 30,37",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 99613),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 82% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12193746 — Amazon Store | Health and Beauty | $91,854 | $3,761/mo | 49% ROI
  (() => {
    const a = 72, r = 80, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12193746",
      title: "10 years old Amazon FBA Hair beauty Brand | 247k€ in revenue | 40k€ EBITDA | Self operated with very",
      niche: "Health and Beauty",
      price: 91854,
      monthlyProfit: 3761,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.0,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "10 years old Amazon FBA Hair beauty Brand | 247k€ in revenue | 40k€ EBITDA | Self operated with very low maintenance FBA Store Health and Beauty Editors Choice Confidential Business Location France Site Age 9 years Monthly Profit GBP £2,757 /mo Profit Margin 15% Profit Multiple 2.0x Revenue Multiple",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 91854),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12273753 — SaaS | Automotive | $660,281 | $8,264/mo | 15% ROI
  (() => {
    const a = 90, r = 57, rs = 50, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12273753",
      title: "10 year established UK vehicle intelligence platform with B2C, B2B, C2B, content and affiliate reven",
      niche: "Automotive",
      price: 660281,
      monthlyProfit: 8264,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 6.7,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "10 year established UK vehicle intelligence platform with B2C, B2B, C2B, content and affiliate revenue streams SaaS Automotive Editors Choice Confidential Business Location United Kingdom Site Age 9 years Monthly Profit GBP £6,170 /mo Profit Margin 56% Profit Multiple 6.7x Revenue Mul",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 660281),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High 6.7x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12669306 — iOS App | Education | $1,000,000 | $18,350/mo | 22% ROI
  (() => {
    const a = 80, r = 62, rs = 50, e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12669306",
      title: "This app offers practice tests and resources for the UK citizenship test, helping users study and pr",
      niche: "Education",
      price: 1000000,
      monthlyProfit: 18350,
      monthlyRevenue: 0,
      monetization: "strategies and a multi-faceted approach to revenue generation. Primarily, the ap",
      multiple: 4.5,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "4.7 | 13 App Store reviews This app offers practice tests and resources for the UK citizenship test, helping users study and prepare effectively for the exam. iOS Android Education Sponsored Business Location United Kingdom App Age 3 years Monthly Profit GBP £13,758",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 1000000),
      aiManageable: aiM,
      category: "app",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12640827 — Ecommerce | Lifestyle | $399,999 | $32,821/mo | 98% ROI
  (() => {
    const a = 63, r = 62, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12640827",
      title: "An Approaching 3 Year Old Digital Product Store Selling In the Spiritual Niche. Total Revenue $3.3M ",
      niche: "Lifestyle",
      price: 399999,
      monthlyProfit: 32821,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.0,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "An Approaching 3 Year Old Digital Product Store Selling In the Spiritual Niche. Total Revenue $3.3M | Total Net Profit $790k+ | Over 75k Customers Ecommerce Lifestyle Sponsored Confidential Business Location CA, United States Site Age 2 years Monthly Profit GBP £",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 399999),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 98% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12525555 — Content | Education | $348,800 | $9,454/mo | 33% ROI
  (() => {
    const a = 92, r = 75, rs = 65, e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12525555",
      title: "High-performing content site portfolio in education and software reviews. Featuring strategic alignm",
      niche: "Education",
      price: 348800,
      monthlyProfit: 9454,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 3.1,
      firstMadeMoney: 21,
      businessAge: 21,
      description: "High-performing content site portfolio in education and software reviews. Featuring strategic alignment, strong brand authority, consistent, sustainable growth. Content Education Editors Choice Sponsored Confidential Business Location CA, United States Site Age 21 years",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 348800),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 21+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12302331 — Amazon Store | Lifestyle | $1,663,725 | $33,512/mo | 24% ROI
  (() => {
    const a = 72, r = 80, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12302331",
      title: "Amazon FBA Baby Brand | €2.62M TTM Revenue, €345K net profit | 50%+ Organic Sales | 5 EU Markets | P",
      niche: "Lifestyle",
      price: 1663725,
      monthlyProfit: 33512,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 4.1,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "3,725 Asking Price 0 Comments 1,801 Views 74 Watchers  Watch  FBA STOREFRONT  Amazon FBA Baby Brand | €2.62M TTM Revenue, €345K net profit | 50%+ Organic Sales | 5 EU Markets | Proprietary Designs | Clear Growth Path FBA Store Lifestyle Editors Choice Sponsored Confidential Business Location Spain S",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 1663725),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12285937 — Crypto App | Business | $6,500,000 | $248,203/mo | 46% ROI
  (() => {
    const a = 85, r = 80, rs = 75, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12285937",
      title: "Highly profitable regulated trading platform with a Mauritius license ~15,000 MAUs, 1,500 DAUs, live",
      niche: "Business",
      price: 6500000,
      monthlyProfit: 248203,
      monthlyRevenue: 0,
      monetization: "Other",
      multiple: 2.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "0,000 Asking Price 0 Comments 2,021 Views 96 Watchers  Watch  CRYPTO APP  Crypto App | Business Highly profitable regulated trading platform with a Mauritius license ~15,000 MAUs, 1,500 DAUs, live client transaction activity, USD $248k/Month Net Profits Other Crypto App Business Editors Choice Spons",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 6500000),
      aiManageable: aiM,
      category: "app",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12296287 — Ecommerce | Home and Garden | $621,594 | $23,484/mo | 45% ROI
  (() => {
    const a = 55, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12296287",
      title: "D2C Wall Art Ecom | £1.14M revenue, £207k SDE (18%), 212% Growth | 4.7x ROAS | Zero Inventory Dropsh",
      niche: "Home and Garden",
      price: 621594,
      monthlyProfit: 23484,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "D2C Wall Art Ecom | £1.14M revenue, £207k SDE (18%), 212% Growth | 4.7x ROAS | Zero Inventory Dropship | Email 26x ROI | Instant Margin Doubling Opportunity Ecommerce Home and Garden Editors Choice Sponsored Confidential Business Location United Kingdom Site Age 5 years Monthly Profit GBP £17,279 /m",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 621594),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12080201 — Ecommerce | Business | $845,500 | $21,313/mo | 30% ROI
  (() => {
    const a = 68, r = 75, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12080201",
      title: "Profitable Shopify DTC brand selling custom business stamps; $816K TTM revenue, $128 AOV, $137 LTV, ",
      niche: "Business",
      price: 845500,
      monthlyProfit: 21313,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 3.3,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Profitable Shopify DTC brand selling custom business stamps; $816K TTM revenue, $128 AOV, $137 LTV, 55–60% margins, made-to-order, scalable ads. Shopify Ecommerce Business Editors Choice Sponsored Confidential Business Location WY, United States Site Age 4 years Monthly Profit GBP £15,979 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 845500),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12287693 — Ecommerce | Electronics | $3,000,000 | $69,889/mo | 28% ROI
  (() => {
    const a = 68, r = 80, rs = 50, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12287693",
      title: "High Margin and Established DTC phone case brand | 60% YoY Growth | 30% Customer Return Rate | 80%+ ",
      niche: "Electronics",
      price: 3000000,
      monthlyProfit: 69889,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 3.6,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "0,000 Asking Price 0 Comments 3,721 Views 161 Watchers  Watch  ECOMMERCE STORE  High Margin and Established DTC phone case brand | 60% YoY Growth | 30% Customer Return Rate | 80%+ US Customers | Well-Positioned for Scalable Growth Ecommerce Electronics Editors Choice Sponsored Confidential Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 3000000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11993671 — Marketing Agency | Design and Style | $337,364 | $16,804/mo | 60% ROI
  (() => {
    const a = 95, r = 80, rs = 85, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11993671",
      title: "Profitable, remote digital marketing agency with strong margins, established team, and 20–30% growth",
      niche: "Design and Style",
      price: 337364,
      monthlyProfit: 16804,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 1.7,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Profitable, remote digital marketing agency with strong margins, established team, and 20–30% growth; woman-owned, serving women-owned businesses. Marketing Agency Design and Style Editors Choice Sponsored Confidential Business Location ID, United States Site Age 3 years Monthly Profit GBP £12,599 /",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 337364),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 60% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11767983 — Ecommerce | Health and Beauty | $900,000 | $26,110/mo | 35% ROI
  (() => {
    const a = 68, r = 80, rs = 65, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11767983",
      title: "Established 30+ Year Skincare Brand At Top Luxury Retailers & Online. Exponential Growth Potential. ",
      niche: "Health and Beauty",
      price: 900000,
      monthlyProfit: 26110,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.9,
      firstMadeMoney: 32,
      businessAge: 32,
      description: "Established 30+ Year Skincare Brand At Top Luxury Retailers & Online. Exponential Growth Potential. Standout Acquisition Opportunity. Serious Inquiries Only. Shopify Ecommerce Health and Beauty Editors Choice Sponsored Confidential Business Location NY, United States Site Age 32 years Monthly Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 900000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 32+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12249202 — Amazon Store | Home and Garden | $1,922,197 | $50,432/mo | 31% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12249202",
      title: "Category-leading Amazon FBA home-safety brand selling primarily in the US market. A hands-off, highl",
      niche: "Home and Garden",
      price: 1922197,
      monthlyProfit: 50432,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 3.2,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "2,197 Asking Price 0 Comments 2,310 Views 101 Watchers  Watch  FBA STOREFRONT  Category-leading Amazon FBA home-safety brand selling primarily in the US market. A hands-off, highly scalable operating model. FBA Store Home and Garden Editors Choice Sponsored Confidential Business Location Singapore S",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 1922197),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11342703 — Service | Business | $388,996 | $7,753/mo | 24% ROI
  (() => {
    const a = 45, r = 80, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11342703",
      title: "AI-driven agency with an existing MNC client. $400k+ recurring revenue paid 12 months in advance. Ex",
      niche: "Business",
      price: 388996,
      monthlyProfit: 7753,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 4.2,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "SD $388,996 Asking Price 0 Comments 3,010 Views 136 Watchers  Watching  SERVICE BUSINESS  AI-driven agency with an existing MNC client. $400k+ recurring revenue paid 12 months in advance. Exceptional cash flow, lean operations & 30% profit margins. Service Business Editors Choice Sponsored Confident",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 388996),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12231660 — Amazon Store | Lifestyle | $450,000 | $10,247/mo | 27% ROI
  (() => {
    const a = 67, r = 72, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12231660",
      title: "A turnkey, scalable FBA Amazon business with strong sales, premium products, unique designs, $90k+ i",
      niche: "Lifestyle",
      price: 450000,
      monthlyProfit: 10247,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 3.7,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "A turnkey, scalable FBA Amazon business with strong sales, premium products, unique designs, $90k+ inventory, US trademark, social media handles, domain FBA Store Lifestyle Editors Choice Sponsored Confidential Business Location FL, United States Site Age 5 years Monthly Profit GBP £7,683 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 450000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12203869 — Marketing Agency | Business | $655,768 | $23,296/mo | 43% ROI
  (() => {
    const a = 90, r = 62, rs = 75, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12203869",
      title: "A premium boutique email and SMS automation powerhouse agency with 81% profit margin, high LTV of AU",
      niche: "Business",
      price: 655768,
      monthlyProfit: 23296,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 2.3,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "A premium boutique email and SMS automation powerhouse agency with 81% profit margin, high LTV of AUD 27.7K, and systems built for effortless scale. Marketing Agency Business Editors Choice Sponsored Confidential Business Location Australia Site Age 2 years Monthly Profit GBP £17,278 /mo Profit Marg",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 655768),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11259011 — Marketplace | Internet | $3,810,000 | $28,511/mo | 9% ROI
  (() => {
    const a = 95, r = 70, rs = 50, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11259011",
      title: "Profitable talent booking platform connecting vetted fashion models and creators with brands for pai",
      niche: "Internet",
      price: 3810000,
      monthlyProfit: 28511,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 9.0,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Profitable talent booking platform connecting vetted fashion models and creators with brands for paid work$3.4M GMV, zero marketing spend, high retention. Marketplace Internet Editors Choice Sponsored Confidential Business Location OH, United States Site Age 5 years Monthly Profit GBP £21,376 /mo Pa",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 3810000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12084379 — Service | Design and Style | $700,000 | $17,166/mo | 29% ROI
  (() => {
    const a = 45, r = 80, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12084379",
      title: "Established and reputable design-driven merch powerhouse with 60% repeat revenue, global brand clien",
      niche: "Design and Style",
      price: 700000,
      monthlyProfit: 17166,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 3.4,
      firstMadeMoney: 17,
      businessAge: 17,
      description: "Established and reputable design-driven merch powerhouse with 60% repeat revenue, global brand clients, a full team, and 8,000+ customers. A scalable investment Service Design and Style Editors Choice Sponsored Confidential Business Location Singapore Site Age 17 years Monthly Profit GBP £12,870 /mo",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 700000),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 17+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12032980 — Content | Business | $342,383 | $14,908/mo | 52% ROI
  (() => {
    const a = 92, r = 80, rs = 85, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12032980",
      title: "Content - Business",
      niche: "Business",
      price: 342383,
      monthlyProfit: 14908,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 1.6,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Content business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 342383),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 52% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11825535 — Ecommerce | Design and Style | $900,000 | $19,919/mo | 27% ROI
  (() => {
    const a = 68, r = 80, rs = 50, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11825535",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 900000,
      monthlyProfit: 19919,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.5,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "Ecommerce business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 900000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12231415 — Ecommerce | Home and Garden | $459,000 | $55,103/mo | 144% ROI
  (() => {
    const a = 63, r = 77, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12231415",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 459000,
      monthlyProfit: 55103,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.7,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Ecommerce business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 459000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 144% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "High operational involvement — significant owner time required"
      ],
    };
  })()
];
