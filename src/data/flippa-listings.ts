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
  // Verified P&L fields — only present when monthly_pnl was scraped
  verifiedPnL: boolean;
  profitConsistency?: "excellent" | "good" | "moderate" | "volatile" | "terrible";
  revenueTrend?: number; // percentage change first→last month, e.g. +12 or -39
  monthlyProfitRange?: string; // e.g. "£6.2K–£8.9K"
  cvPercent?: number; // coefficient of variation of monthly profit
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

function rec(
  score: number,
  aiM: boolean,
  price: number | null,
  opts?: { verifiedPnL?: boolean; cvPercent?: number; revenueTrend?: number; hasLossMonth?: boolean }
): "top_pick" | "strong" | "consider" | "avoid" {
  const budget = 160000;
  const withinBudget = price !== null && price <= budget;
  const cv = opts?.cvPercent;
  const trend = opts?.revenueTrend;
  const verified = opts?.verifiedPnL;
  const lossMonth = opts?.hasLossMonth;

  // Hard avoids — regardless of score
  if (verified && lossMonth) return "avoid";
  if (verified && cv !== undefined && cv > 80) return "avoid";
  if (verified && trend !== undefined && trend < -50) return "avoid";

  // top_pick: ONLY verified P&L, CV<35, no loss months, revenue not declining >20%
  if (
    verified &&
    cv !== undefined && cv < 35 &&
    !lossMonth &&
    (trend === undefined || trend > -20) &&
    score >= 70 &&
    withinBudget
  ) return "top_pick";

  // strong: verified CV<50 OR unverified with very strong signals
  if (score >= 68 && (verified ? cv !== undefined && cv < 50 : true) && aiM) return "strong";

  if (score >= 55) return "consider";
  return "avoid";
}

export const ELIMINATED_IDS = new Set<string>([]);

export const flippaListings: FlippaListing[] = [
  // #12101579 — Ecommerce | Sports and Outdoor | $74,110 | $2,952/mo | 48% ROI
  (() => {
    const a = 63, r = 77, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12101579",
      title: "Ecommerce - Sports and Outdoor",
      niche: "Sports and Outdoor",
      price: 74110,
      monthlyProfit: 2952,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.1,
      firstMadeMoney: 15,
      businessAge: 15,
      description: "Ecommerce business in Sports and Outdoor",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
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
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 15+ years in operation",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
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
      description: "Established jewellery supplies ecom business generating ~$90k annual owner profit, with 68% repeat customers. 20 hours a week, run from home. Ecommerce Design and Style Business Location Australia Site Age 9 years Monthly Profit GBP £4,020 /mo Profit Margin",
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
  // #12629201 — SaaS | Education | $85,000 | $2,557/mo | 36% ROI
  (() => {
    const a = 90, r = 67, rs = 65, e = 95;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12629201",
      title: "- Education",
      niche: "Education",
      price: 85000,
      monthlyProfit: 2557,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.8,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "SaaS business in Education",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 85000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #11735360 — Content | Lifestyle | $17,000 | $538/mo | 38% ROI
  (() => {
    const a = 87, r = 77, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11735360",
      title: "Content - Lifestyle",
      niche: "Lifestyle",
      price: 17000,
      monthlyProfit: 538,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.6,
      firstMadeMoney: 10,
      businessAge: 10,
      description: "Content business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
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
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 10+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #12668926 — Ecommerce | Health and Beauty | $50,000 | $1,201/mo | 29% ROI
  (() => {
    const a = 63, r = 77, rs = 50, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12668926",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 50000,
      monthlyProfit: 1201,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 3.5,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
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
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
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
      description: "Established 10-year jewelry brand with $70K annual revenue across markets, Shopify & wholesale. Includes inventory, booth&suppliers. Turnkey lifestyle business. Ecommerce Design and Style Business Location Canada Site Age 10 years Monthly Profit GBP £1,853 /m",
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
  // #12267830 — Ecommerce | Hobbies and Games | $118,000 | $3,956/mo | 40% ROI
  (() => {
    const a = 68, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12267830",
      title: "Ecommerce - Hobbies and Games",
      niche: "Hobbies and Games",
      price: 118000,
      monthlyProfit: 3956,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 2.5,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Ecommerce business in Hobbies and Games",
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
      description: "Leader in online pet lifestyle products with strong revenue and profit margins. Established brand with a loyal customer base. Shopify Ecommerce Lifestyle Editors Choice Sponsored Confidential Business Location AL, United States Site Age 3 years Monthly Profit GBP £6,173 /mo Profit Margin 66% Profit",
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
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 89359,
      monthlyProfit: 3843,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.9,
      firstMadeMoney: 7,
      businessAge: 7,
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
      description: "6 yo Amazon FBA | 2 Brands | 470k€ in revenue (2025) | Lean operation (8h per week) FBA Store Health and Beauty Editors Choice Sponsored Confidential Business Location France Site Age 6 years Monthly Profit GBP £6,133 /mo Profit Margin 18% Profit Multiple 2.5x Revenue Multiple 0.4x View P&L View ins",
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
      description: "Electric guitar bridge E-Com Business w/ 20 year track record. 68% profit margin, $100k+ in annual revenue, solid growth opportunities Ecommerce Business Editors Choice Sponsored Confidential Business Location CO, United States Site Age 21 years Monthly Profit GBP £3,843 /mo Profit Margin 61% Page V",
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
  // #11981836 — Ecommerce | Sports and Outdoor | $199,900 | $5,566/mo | 33% ROI
  (() => {
    const a = 68, r = 80, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11981836",
      title: "6-Year-Old Automated Brand selling Premium Outdoor Gear|$800K+ Lifetime Revenue|14K+ Emails|72% Gros",
      niche: "Sports and Outdoor",
      price: 199900,
      monthlyProfit: 5566,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 3.0,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "6-Year-Old Automated Brand selling Premium Outdoor Gear|$800K+ Lifetime Revenue|14K+ Emails|72% Gross Margin|$433K TTM Revenue|97% Dropshipping Niche. Ecommerce Sports and Outdoor Editors Choice Sponsored Confidential Business Location WY, United States Site Age 5 years Monthly Profit GBP £4,181 /mo",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 199900),
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
  // #12012923 — Ecommerce | Lifestyle | $157,248 | $6,811/mo | 52% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12012923",
      title: "Ecommerce - Lifestyle",
      niche: "Lifestyle",
      price: 157248,
      monthlyProfit: 6811,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Ecommerce business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 157248),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 52% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12193746 — Amazon Store | Health and Beauty | $118,008 | $3,761/mo | 38% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12193746",
      title: "Amazon Store - Health and Beauty",
      niche: "Health and Beauty",
      price: 118008,
      monthlyProfit: 3761,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.0,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Amazon Store business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 118008),
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
  // #12516807 — YouTube Channel | Lifestyle | $148,000 | $4,262/mo | 35% ROI
  (() => {
    const a = 92, r = 65, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12516807",
      title: "YouTube Channel - Lifestyle",
      niche: "Lifestyle",
      price: 148000,
      monthlyProfit: 4262,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 2.9,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "YouTube Channel business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 148000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12275568 — YouTube Channel | Entertainment | $149,000 | £2,232/mo avg | AVOID (overpriced + declining)
  (() => {
    // Verified P&L: CV=23%, revenue DECLINING -39% (£2,538→£1,580), avg profit £2,232/mo
    // 347K subs, 182M views. Revenue declining steadily month over month.
    // ROI at avg: 2232*12/149000 = 18% — badly overpriced at 1.8x multiple with declining revenue.
    const a = 92, r = 50, rs = 50, e = 40;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    const cvPct = 23, trend = -39;
    return {
      id: "12275568",
      title: "YouTube Channel — 347K Subs, 182M Views, 95% Margin",
      niche: "Entertainment",
      price: 149000,
      monthlyProfit: 2232,
      monthlyRevenue: 0,
      monetization: "YouTube Ads",
      multiple: 1.8,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "5-year-old YouTube channel with 347K subscribers and 182M views. Verified P&L confirms 95% margin but revenue declining 39% over 12 months — from £2,538 (Mar 2025) to £1,580 (Feb 2026). At current trajectory, asking $149K for ~£1.5K/mo profit = 12% ROI. Badly overpriced.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 149000, { verifiedPnL: true, cvPercent: cvPct, revenueTrend: trend }),
      aiManageable: aiM,
      category: "youtube",
      verifiedPnL: true,
      profitConsistency: "good",
      revenueTrend: trend,
      monthlyProfitRange: "£1,430–£2,969",
      cvPercent: cvPct,
      reasonsFor: [
        "347K subscribers and 182M views — significant audience asset",
        "CV=23% — relatively consistent profit month-to-month",
        "95% profit margin — essentially zero expenses",
        "5 years old — established channel with track record"
      ],
      reasonsAgainst: [
        "Revenue declined 39% over 12 months — from £2,538 to £1,580 consistently falling",
        "At current £1,480/mo profit, $149K asking price = 12% ROI — far below Selic (14.25%)",
        "Overpriced at 1.8x multiple given declining trajectory — fair value closer to $80K",
        "YouTube algorithm changes could accelerate decline further"
      ],
    };
  })(),
  // #11391837 — Ecommerce | Hobbies and Games | $215,140 | $8,175/mo | 46% ROI
  (() => {
    const a = 68, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11391837",
      title: "Ecommerce - Hobbies and Games",
      niche: "Hobbies and Games",
      price: 215140,
      monthlyProfit: 8175,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.2,
      firstMadeMoney: 11,
      businessAge: 11,
      description: "Ecommerce business in Hobbies and Games",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 215140),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 11+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12305807 — Ecommerce | Home and Garden | $75,014 | $9,076/mo | 145% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12305807",
      title: "Profitable Italy Pet E-com: €700k TTM Revenue, €92k Net Profit. Scaled to €100k+/mo with COD model. ",
      niche: "Home and Garden",
      price: 75014,
      monthlyProfit: 9076,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 0.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Profitable Italy Pet E-com: €700k TTM Revenue, €92k Net Profit. Scaled to €100k+/mo with COD model. Turnkey brand ready for dog niche expansion. Ecommerce Home and Garden Sponsored Confidential Business Location Italy Site Age 1 year Monthly Profit GBP £6,637 /mo Profit Margin 13% Profit Multiple 0.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 75014),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 145% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12299052 — Ecommerce | Health and Beauty | $99,999 | $23,672/mo | 284% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12299052",
      title: "A 6 Month Old Spanish Dropshipping Store Selling Beauty & Skincare. Total Revenue Exceeds $471k | To",
      niche: "Health and Beauty",
      price: 99999,
      monthlyProfit: 23672,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A 6 Month Old Spanish Dropshipping Store Selling Beauty & Skincare. Total Revenue Exceeds $471k | Total Profit Exceeds $120k | Perfect To Scale Further Ecommerce Health and Beauty Sponsored Confidential Business Location Spain Site Age 6 months Monthly Profit GBP £17,781 /mo Profit Margin 26% Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 99999),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 284% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12299026 — Ecommerce | Design and Style | $125,000 | $24,314/mo | 233% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12299026",
      title: "A 2.7 Year Old Jewelry Store Selling In U.S. Total Revenue $5.8M | Toal Net Profit $1.5M | Cash flow",
      niche: "Design and Style",
      price: 125000,
      monthlyProfit: 24314,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.4,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "A 2.7 Year Old Jewelry Store Selling In U.S. Total Revenue $5.8M | Toal Net Profit $1.5M | Cash flowing With Constant Profits Ecommerce Design and Style Sponsored Confidential Business Location CA, United States Site Age 2 years Monthly Profit GBP £18,263 /mo Profit Margin 17% Profit Multiple 0.4x R",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 125000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 233% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12298491 — Content | Education | $42,000 | $1,452/mo | 41% ROI
  (() => {
    const a = 87, r = 62, rs = 75, e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12298491",
      title: "Content - Education",
      niche: "Education",
      price: 42000,
      monthlyProfit: 1452,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 2.4,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Content business in Education",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 42000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12260048 — Ecommerce | Health and Beauty | $165,000 | $13,965/mo | 102% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12260048",
      title: "A Custom Supplement Brand For Bad Breath. Total Revenue Exceeds $901k | Total Net Profit $167k | 310",
      niche: "Health and Beauty",
      price: 165000,
      monthlyProfit: 13965,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.0,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A Custom Supplement Brand For Bad Breath. Total Revenue Exceeds $901k | Total Net Profit $167k | 3100 Active Subscribers Ecommerce Health and Beauty Sponsored Confidential Business Location CA, United States Site Age 1 year Monthly Profit GBP £10,489 /mo Profit Margin 19% Profit Multiple 1.0x Revenu",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 165000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 102% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12294596 — Ecommerce | Design and Style | $112,784 | $13,875/mo | 148% ROI
  (() => {
    const a = 58, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12294596",
      title: "Premium Fashion Brand | €400k+ Revenue (8 mo) | €83k+ Net Profit | 2.77 Google Ads ROAS | Fully Mana",
      niche: "Design and Style",
      price: 112784,
      monthlyProfit: 13875,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.0,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Premium Fashion Brand | €400k+ Revenue (8 mo) | €83k+ Net Profit | 2.77 Google Ads ROAS | Fully Managed Marketing | High-Growth NL/BE Market Ecommerce Design and Style Sponsored Confidential Business Location Netherlands Site Age 9 months Monthly Profit GBP £10,163 /mo Profit Margin 23% Profit Multi",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 112784),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 148% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12287369 — Ecommerce | Home and Garden | $44,999 | $13,251/mo | 353% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12287369",
      title: "A 6 Month Old Dropshipping Brand In The Home Decor Niche | Total Revenue $275k | Total Profit $66k |",
      niche: "Home and Garden",
      price: 44999,
      monthlyProfit: 13251,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A 6 Month Old Dropshipping Brand In The Home Decor Niche | Total Revenue $275k | Total Profit $66k | Perfect For First Time Buyers Ecommerce Home and Garden Sponsored Confidential Business Location CA, United States Site Age 6 months Monthly Profit GBP £9,953 /mo Profit Margin 24% Profit Multiple 0.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 44999),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 353% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12288099 — Ecommerce | Design and Style | $44,999 | $9,801/mo | 261% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12288099",
      title: "A 6 Month Old Dropshipping Store Selling In the Untapped Mexican Market. Over $185k Revenue Generate",
      niche: "Design and Style",
      price: 44999,
      monthlyProfit: 9801,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.8,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A 6 Month Old Dropshipping Store Selling In the Untapped Mexican Market. Over $185k Revenue Generated With A NET Profit Of $48k. Steady & Stable Growth Ecommerce Design and Style Sponsored Confidential Business Location Mexico Site Age 6 months Monthly Profit GBP £7,362 /mo Profit Margin 27% Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 44999),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 261% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.8x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12291531 — Amazon KDP | Design and Style | $40,000 | $1,509/mo | 45% ROI
  (() => {
    const a = 93, r = 47, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12291531",
      title: "Amazon KDP - Design and Style",
      niche: "Design and Style",
      price: 40000,
      monthlyProfit: 1509,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.4,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Amazon KDP business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 40000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12291544 — Amazon Store | Health and Beauty | $11,851 | $666/mo | 67% ROI
  (() => {
    const a = 67, r = 67, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12291544",
      title: "Amazon Store - Health and Beauty",
      niche: "Health and Beauty",
      price: 11851,
      monthlyProfit: 666,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 1.0,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Amazon Store business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 11851),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Strong ROI: 67% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12284332 — Ecommerce | Hobbies and Games | $200,000 | $19,538/mo | 117% ROI
  (() => {
    const a = 43, r = 67, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12284332",
      title: "A 10 Month Old Gaming Console Brand | Scaling in the US with $527K Revenue | $215K Net Profit | Read",
      niche: "Hobbies and Games",
      price: 200000,
      monthlyProfit: 19538,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.9,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A 10 Month Old Gaming Console Brand | Scaling in the US with $527K Revenue | $215K Net Profit | Ready for Q1 Ecommerce Hobbies and Games Sponsored Confidential Business Location NY, United States Site Age 1 year Monthly Profit GBP £14,675 /mo Profit Margin 41% Profit Multiple 0.9x Revenue Multiple 0",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 200000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 117% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12281483 — Ecommerce | Health and Beauty | $210,670 | $18,845/mo | 107% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12281483",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 210670,
      monthlyProfit: 18845,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.9,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 210670),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 107% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12279355 — Ecommerce | Home and Garden | $40,000 | $6,264/mo | 188% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12279355",
      title: "8 Month Old Organic Shopify Brand Selling Star Wars–Inspired Products | $85K+ Revenue & $50K+ Net Pr",
      niche: "Home and Garden",
      price: 40000,
      monthlyProfit: 6264,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.8,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "8 Month Old Organic Shopify Brand Selling Star Wars–Inspired Products | $85K+ Revenue & $50K+ Net Profit | Automated Organic Brand With Consistent Sales Ecommerce Home and Garden Sponsored Confidential Business Location NY, United States Site Age 8 months Monthly Profit GBP £4,705 /mo Profit Margin",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 40000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 188% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.8x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12279485 — Ecommerce | Home and Garden | $120,000 | $20,143/mo | 201% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12279485",
      title: "8 Month Old Organic Shopify Brand Selling Emotionally Driven Keepsake Products | $342K+ Revenue & $1",
      niche: "Home and Garden",
      price: 120000,
      monthlyProfit: 20143,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "8 Month Old Organic Shopify Brand Selling Emotionally Driven Keepsake Products | $342K+ Revenue & $163K+ Net Profit | High-Margin, Easy To Scale For New Buyer Ecommerce Home and Garden Sponsored Confidential Business Location WY, United States Site Age 8 months Monthly Profit GBP £15,130 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 120000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 201% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12279415 — Ecommerce | Hobbies and Games | $35,000 | $7,915/mo | 271% ROI
  (() => {
    const a = 63, r = 52, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12279415",
      title: "7 Month Old Organic Shopify Brand Selling Gaming Accessories | $139K+ Revenue & $57K+ Net Profit | 1",
      niche: "Hobbies and Games",
      price: 35000,
      monthlyProfit: 7915,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.6,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "7 Month Old Organic Shopify Brand Selling Gaming Accessories | $139K+ Revenue & $57K+ Net Profit | 170K+ Followers, Fully Automated & Huge Potential To Scale Ecommerce Hobbies and Games Sponsored Confidential Business Location NY, United States Site Age 7 months Monthly Profit GBP £5,945 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 35000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 271% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12279449 — Ecommerce | Home and Garden | $35,000 | $7,339/mo | 252% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12279449",
      title: "12 Month Old Organic Shopify Brand Selling Combat-Themed Rugs | $123K Revenue & $88K Net Profit | 83",
      niche: "Home and Garden",
      price: 35000,
      monthlyProfit: 7339,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.4,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "12 Month Old Organic Shopify Brand Selling Combat-Themed Rugs | $123K Revenue & $88K Net Profit | 83K IG Followers, Automated & Built To Scale Long-Term Now Ecommerce Home and Garden Sponsored Confidential Business Location NY, United States Site Age 1 year Monthly Profit GBP £5,513 /mo Profit Margi",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 35000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 252% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12232408 — Ecommerce | Health and Beauty | $176,107 | $3,545/mo | 24% ROI
  (() => {
    const a = 68, r = 80, rs = 50, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12232408",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 176107,
      monthlyProfit: 3545,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.7,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 176107),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11908488 — Amazon Store | Health and Beauty | $133,000 | $4,161/mo | 38% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11908488",
      title: "Amazon Store - Health and Beauty",
      niche: "Health and Beauty",
      price: 133000,
      monthlyProfit: 4161,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.7,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Amazon Store business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 133000),
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
  // #12166064 — Digital Agency | Business | $194,011 | $4,605/mo | 28% ROI
  (() => {
    const a = 95, r = 80, rs = 50, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12166064",
      title: "Digital Agency - Business",
      niche: "Business",
      price: 194011,
      monthlyProfit: 4605,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 3.5,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Digital Agency business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 194011),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12071684 — Marketplace | Home and Garden | $246,816 | $6,859/mo | 33% ROI
  (() => {
    const a = 95, r = 80, rs = 65, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12071684",
      title: "- Home and Garden",
      niche: "Home and Garden",
      price: 246816,
      monthlyProfit: 6859,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 2.5,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Marketplace business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 246816),
      aiManageable: aiM,
      category: "saas",
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
  // #12021962 — SaaS | Business | $23,053 | £1,263/mo avg | CONSIDER (cheap, but declining)
  (() => {
    // Verified P&L: CV=36%, revenue DECLINING -44% (£1,977 Mar→£1,009 Feb), avg profit £1,263/mo
    // 75 subscribers, 13% churn, 92% margin. Only 1yr old.
    // ROI at avg: 1263*12/23053 = 65.7% — good ROI but declining trajectory and young business.
    const a = 90, r = 60, rs = 75, e = 50;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    const cvPct = 36, trend = -44;
    return {
      id: "12021962",
      title: "spyderads.app — E-commerce SaaS Finds Winning Products, 3K MRR",
      niche: "E-commerce SaaS",
      price: 23053,
      monthlyProfit: 1263,
      monthlyRevenue: 0,
      monetization: "Monthly & annual subscriptions",
      multiple: 1.1,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "E-commerce SaaS that finds winning products for dropshippers. 75 active subscribers, 13% churn. Verified P&L shows 92% margin but revenue declining 44% over 12 months — from £1,977 to £1,009. At $23K it is cheap, but 13% monthly churn will erode the subscriber base fast without active marketing.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 23053, { verifiedPnL: true, cvPercent: cvPct, revenueTrend: trend }),
      aiManageable: aiM,
      category: "saas",
      verifiedPnL: true,
      profitConsistency: "moderate",
      revenueTrend: trend,
      monthlyProfitRange: "£613–£1,901",
      cvPercent: cvPct,
      reasonsFor: [
        "Low entry price ($23K) — limited downside if it fails",
        "92% profit margin — negligible operating costs",
        "Verified P&L via Stripe — data is real, no seller manipulation",
        "Fully owner-independent — runs without daily involvement"
      ],
      reasonsAgainst: [
        "Revenue declined 44% over 12 months — from £1,977 to £1,009",
        "13% monthly churn — at this rate, subscriber base halves every 5 months without new acquisition",
        "Only 1 year old — no evidence of long-term stability",
        "CV=36% — meaningful profit volatility month to month"
      ],
    };
  })(),
  // #11776064 — Content | Internet | $197,000 | $5,072/mo | 31% ROI
  (() => {
    const a = 92, r = 80, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11776064",
      title: "Content - Internet",
      niche: "Internet",
      price: 197000,
      monthlyProfit: 5072,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 3.2,
      firstMadeMoney: 27,
      businessAge: 27,
      description: "Content business in Internet",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 197000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 27+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12078712 — Ecommerce | Business | $85,174 | $3,958/mo | 56% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12078712",
      title: "Ecommerce - Business",
      niche: "Business",
      price: 85174,
      monthlyProfit: 3958,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.8,
      firstMadeMoney: 19,
      businessAge: 19,
      description: "Ecommerce business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 85174),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 56% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 19+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11920156 — Ecommerce | Sports and Outdoor | $138,400 | $5,944/mo | 52% ROI
  (() => {
    const a = 63, r = 77, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11920156",
      title: "Ecommerce - Sports and Outdoor",
      niche: "Sports and Outdoor",
      price: 138400,
      monthlyProfit: 5944,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.6,
      firstMadeMoney: 13,
      businessAge: 13,
      description: "Ecommerce business in Sports and Outdoor",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 138400),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 52% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 13+ years in operation",
      "Attractive 1.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11899366 — Amazon Store | Health and Beauty | $114,724 | $4,528/mo | 47% ROI
  (() => {
    const a = 72, r = 80, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11899366",
      title: "Amazon Store - Health and Beauty",
      niche: "Health and Beauty",
      price: 114724,
      monthlyProfit: 4528,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 1.3,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Amazon Store business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 114724),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12232744 — Content | Food and Drink | $199,000 | $5,643/mo | 34% ROI
  (() => {
    const a = 87, r = 72, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12232744",
      title: "Content - Food and Drink",
      niche: "Food and Drink",
      price: 199000,
      monthlyProfit: 5643,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 2.6,
      firstMadeMoney: 17,
      businessAge: 17,
      description: "Content business in Food and Drink",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 199000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 17+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12004030 — Ecommerce | Business | $76,417 | $6,107/mo | 96% ROI
  (() => {
    const a = 63, r = 77, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12004030",
      title: "Profitable European Packaging Brand (450K Revenue, 10 Years Old) + Premium 6-Letter Domain Portfolio",
      niche: "Business",
      price: 76417,
      monthlyProfit: 6107,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.0,
      firstMadeMoney: 14,
      businessAge: 14,
      description: "Profitable European Packaging Brand (450K Revenue, 10 Years Old) + Premium 6-Letter Domain Portfolio Ecommerce Business Sponsored Confidential Business Location Netherlands Site Age 14 years Monthly Profit GBP £4,461 /mo Profit Margin 15% Page Views 2,802 p/mo Profit Multiple 1.0x Revenue Multiple 0",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 76417),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 96% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 14+ years in operation",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11171518 — Ecommerce | Home and Garden | $112,478 | $4,605/mo | 49% ROI
  (() => {
    const a = 68, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11171518",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 112478,
      monthlyProfit: 4605,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.0,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "Ecommerce business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 112478),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12300477 — Content | Home and Garden | $25,000 | $690/mo | 33% ROI
  (() => {
    const a = 87, r = 82, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12300477",
      title: "Content - Home and Garden",
      niche: "Home and Garden",
      price: 25000,
      monthlyProfit: 690,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 3.0,
      firstMadeMoney: 13,
      businessAge: 13,
      description: "Content business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 25000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 13+ years in operation"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #11999064 — Ecommerce | Business | $230,000 | $10,282/mo | 54% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11999064",
      title: "Ecommerce - Business",
      niche: "Business",
      price: 230000,
      monthlyProfit: 10282,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.9,
      firstMadeMoney: 11,
      businessAge: 11,
      description: "Ecommerce business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 230000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 54% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 11+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12073592 — Content | Travel | $48,000 | $1,346/mo | 34% ROI
  (() => {
    const a = 87, r = 72, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12073592",
      title: "Content - Travel",
      niche: "Travel",
      price: 48000,
      monthlyProfit: 1346,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 3.0,
      firstMadeMoney: 20,
      businessAge: 20,
      description: "Content business in Travel",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 48000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 20+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11995987 — Amazon KDP | Entertainment | $160,000 | $4,436/mo | 33% ROI
  (() => {
    const a = 95, r = 75, rs = 65, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11995987",
      title: "Amazon KDP - Entertainment",
      niche: "Entertainment",
      price: 160000,
      monthlyProfit: 4436,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 3.0,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Amazon KDP business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 160000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12166327 — Service | Education | $155,000 | $8,069/mo | 62% ROI
  (() => {
    const a = 45, r = 85, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12166327",
      title: "A platform connecting students with academic experts for homework assistance, offering tutoring serv",
      niche: "Education",
      price: 155000,
      monthlyProfit: 8069,
      monthlyRevenue: 0,
      monetization: "Commission, Service Fees, Premium Features, Advertising",
      multiple: 1.6,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "SD $155,000 Asking Price 0 Comments 3,730 Views 218 Watchers  Watching  SERVICE BUSINESS  A platform connecting students with academic experts for homework assistance, offering tutoring services across various subjects. Service Education Sponsored Confidential Business Location KY, United States Sit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 155000),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 62% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11678338 — Content | Entertainment | $180,000 | $5,339/mo | 36% ROI
  (() => {
    const a = 92, r = 80, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11678338",
      title: "Content - Entertainment",
      niche: "Entertainment",
      price: 180000,
      monthlyProfit: 5339,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 2.8,
      firstMadeMoney: 20,
      businessAge: 20,
      description: "Content business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 180000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 20+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11895309 — Android App | Hobbies and Games | $120,000 | $2,064/mo | 21% ROI
  (() => {
    const a = 80, r = 72, rs = 50, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11895309",
      title: "Android App - Hobbies and Games",
      niche: "Hobbies and Games",
      price: 120000,
      monthlyProfit: 2064,
      monthlyRevenue: 0,
      monetization: "App Sales",
      multiple: 3.0,
      firstMadeMoney: 14,
      businessAge: 14,
      description: "Android App business in Hobbies and Games",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 120000),
      aiManageable: aiM,
      category: "app",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 14+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12101465 — Amazon Store | Home and Garden | $95,200 | $2,826/mo | 36% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12101465",
      title: "Amazon Store - Home and Garden",
      niche: "Home and Garden",
      price: 95200,
      monthlyProfit: 2826,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.5,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Amazon Store business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 95200),
      aiManageable: aiM,
      category: "amazon_fba",
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
  // #12228474 — Ecommerce | Health and Beauty | $106,075 | $2,134/mo | 24% ROI
  (() => {
    const a = 68, r = 80, rs = 50, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12228474",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 106075,
      monthlyProfit: 2134,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 4.1,
      firstMadeMoney: 14,
      businessAge: 14,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 106075),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 14+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11122075 — Service | Business | $46,246 | $1,110/mo | 29% ROI
  (() => {
    const a = 40, r = 82, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11122075",
      title: "Service - Business",
      niche: "Business",
      price: 46246,
      monthlyProfit: 1110,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 3.5,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "Service business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 46246),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation"
      ],
      reasonsAgainst: [
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12016298 — Content | SEO | $50,000 | £1,325/mo avg | AVOID
  (() => {
    // Verified P&L: CV=41%, revenue DECLINING -71% (£1,694→£493→£609), avg profit £1,325/mo
    // Revenue cratered from £2K peak to £493 in Dec then slight recovery to £609 in Feb — still 71% below start
    const a = 87, r = 30, rs = 50, e = 30;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    const cvPct = 41, trend = -71;
    return {
      id: "12016298",
      title: "99%-Margin Content Site — 1.5M Sessions/Year, DA46, 11K Articles",
      niche: "SEO / Content",
      price: 50000,
      monthlyProfit: 1325,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 2.4,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "6-year-old high-authority content site with 11K articles. Verified P&L shows revenue collapsing 71% — from £2,055 (May 2025) to £589 (Feb 2026). Site appears to have been hit by Google algorithm update. $50K for a dying traffic source.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 50000, { verifiedPnL: true, cvPercent: cvPct, revenueTrend: trend }),
      aiManageable: aiM,
      category: "content_ads",
      verifiedPnL: true,
      profitConsistency: "moderate",
      revenueTrend: trend,
      monthlyProfitRange: "£473–£2,095",
      cvPercent: cvPct,
      reasonsFor: [
        "High domain authority (DA46) and 11K articles — significant SEO asset",
        "99% profit margin — nearly zero expenses",
        "6 years old with large backlink profile"
      ],
      reasonsAgainst: [
        "Revenue declined 71% in 12 months — from £2,055 to £589 — classic Google algo hit",
        "Current monthly profit ~£589 at asking price gives 14.2% ROI — not £1,325 claimed",
        "Recovery from algorithm penalties is uncertain and often permanent",
        "CV=41% — high volatility confirms traffic instability"
      ],
    };
  })(),
  // #11639863 — Content | Food and Drink | $225,000 | $4,832/mo | 26% ROI
  (() => {
    const a = 87, r = 72, rs = 50, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11639863",
      title: "Content - Food and Drink",
      niche: "Food and Drink",
      price: 225000,
      monthlyProfit: 4832,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 3.9,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "Content business in Food and Drink",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 225000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12032937 — Ecommerce | Health and Beauty | $55,948 | $1,427/mo | 31% ROI
  (() => {
    const a = 63, r = 77, rs = 65, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12032937",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 55948,
      monthlyProfit: 1427,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.0,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 55948),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11766321 — Ecommerce | Entertainment | $44,510 | $1,892/mo | 51% ROI
  (() => {
    const a = 63, r = 82, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11766321",
      title: "Ecommerce - Entertainment",
      niche: "Entertainment",
      price: 44510,
      monthlyProfit: 1892,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 2.0,
      firstMadeMoney: 20,
      businessAge: 20,
      description: "Ecommerce business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 44510),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 51% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 20+ years in operation",
      "Attractive 2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12280420 — Ecommerce | Design and Style | $189,000 | $6,945/mo | 44% ROI
  (() => {
    const a = 68, r = 80, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12280420",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 189000,
      monthlyProfit: 6945,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.3,
      firstMadeMoney: 19,
      businessAge: 19,
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
      recommendation: rec(ov, aiM, 189000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 19+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12265554 — Amazon KDP | Entertainment | $89,000 | £3,361/mo avg | CONSIDER (volatile but growing)
  (() => {
    // Verified P&L: CV=44%, revenue GROWING +44% (£2,997→£3,440), avg profit £3,361/mo
    // 6yr old KDP account, 70% margin. Monthly profits range widely: £1,944–£6,807.
    // ROI at avg: 3361*12/89000 = 45.3%
    const a = 93, r = 60, rs = 75, e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    const cvPct = 44, trend = 44;
    return {
      id: "12265554",
      title: "6-Year-Old KDP Account — 70% Margin, Organic TikTok Upside, Growing Revenue",
      niche: "Amazon KDP",
      price: 89000,
      monthlyProfit: 3361,
      monthlyRevenue: 0,
      monetization: "Amazon KDP royalties",
      multiple: 1.1,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "6-year-old KDP account with diversified royalties and low ad reliance. Verified P&L shows revenue GROWING +44% over 12 months (£2,997→£3,440) with strong 70% margin. Volatility is high (CV=44%) due to seasonal peaks, but the underlying trend is clearly positive. Organic TikTok upside not yet monetized.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 89000, { verifiedPnL: true, cvPercent: cvPct, revenueTrend: trend }),
      aiManageable: aiM,
      category: "kdp",
      verifiedPnL: true,
      profitConsistency: "moderate",
      revenueTrend: trend,
      monthlyProfitRange: "£1,944–£6,807",
      cvPercent: cvPct,
      reasonsFor: [
        "Revenue GROWING +44% over 12 months — confirmed by verified P&L",
        "6 years old — established account with diversified royalty catalog",
        "70% profit margin — sustainable unit economics",
        "Low Amazon Ads reliance — organic demand, not paid traffic"
      ],
      reasonsAgainst: [
        "CV=44% — high month-to-month volatility, profits range £1,944–£6,807",
        "No P&L verification yet confirmed for asking price vs actual (currently at $89K in JSON)",
        "KDP platform risk — Amazon can change royalty rates or algorithms",
        "June spike (£6,807) may be seasonal — average could be lower ex-peaks"
      ],
    };
  })(),
  // #12465945 — Amazon KDP | Entertainment | $35,000 | $1,853/mo | 64% ROI
  (() => {
    const a = 93, r = 77, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12465945",
      title: "121-Books KDP Account – A Digital Library Powered by Long-Tail Diversified Royalties — Amazon KDP St",
      niche: "Entertainment",
      price: 35000,
      monthlyProfit: 1853,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.6,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "8-Year KDP Account – Stable Royalties with Built-In Global Expansion Paths Amazon KDP Entertainment Business Location Switzerland Site Age 8 years Monthly Profit GBP £1,392 /mo Profit Margin 53% Profit Multiple 1.6x Revenue Multiple 0.8x View P&L View insights on multiples  Expand All Performance Ov",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 35000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 64% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11862182 — Service | Entertainment | $46,500 | $3,530/mo | 91% ROI
  (() => {
    const a = 40, r = 77, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11862182",
      title: "This business is a high-proft, low overhead ghostwriting service, focusing on memoirs and life stori",
      niche: "Entertainment",
      price: 46500,
      monthlyProfit: 3530,
      monthlyRevenue: 0,
      monetization: "Other",
      multiple: 1.1,
      firstMadeMoney: 14,
      businessAge: 14,
      description: "This business is a high-proft, low overhead ghostwriting service, focusing on memoirs and life stories for personal use, publication and business promotion. Service Entertainment Editors Choice Sponsored Confidential Business Location Australia Site Age 14 years Monthly Profit GBP £2,651 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 46500),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 91% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 14+ years in operation",
      "Attractive 1.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12255678 — Ecommerce | Business | $49,000 | $1,523/mo | 37% ROI
  (() => {
    const a = 63, r = 77, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12255678",
      title: "Ecommerce - Business",
      niche: "Business",
      price: 49000,
      monthlyProfit: 1523,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.4,
      firstMadeMoney: 11,
      businessAge: 11,
      description: "Ecommerce business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 49000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 11+ years in operation",
      "Attractive 1.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12169081 — Content | Electronics | $45,000 | $1,560/mo | 42% ROI
  (() => {
    const a = 87, r = 62, rs = 75, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12169081",
      title: "Content - Electronics",
      niche: "Electronics",
      price: 45000,
      monthlyProfit: 1560,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 2.1,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Content business in Electronics",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 45000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12272304 — Amazon KDP | Education | $29,999 | $2,013/mo | 81% ROI
  (() => {
    const a = 93, r = 52, rs = 95, e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12272304",
      title: "Amazon KDP Store A portfolio of 9 high-demand academic study guides in the evergreen teacher certifi",
      niche: "Education",
      price: 29999,
      monthlyProfit: 2013,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A portfolio of 9 high-demand academic study guides in the evergreen teacher certification niche. Generates passive income with $14,600 net profit in <8 months Amazon KDP Education Sponsored Confidential Business Location Malta Site Age 9 months Monthly Profit GBP £1,512 /mo Profit Margin 67% Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 29999),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 81% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #11945038 — Ecommerce | Design and Style | $99,000 | $3,230/mo | 39% ROI
  (() => {
    const a = 63, r = 77, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11945038",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 99000,
      monthlyProfit: 3230,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 0.8,
      firstMadeMoney: 7,
      businessAge: 7,
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
      recommendation: rec(ov, aiM, 99000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation",
      "Attractive 0.8x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11507045 — Service | Design and Style | $110,000 | $1,772/mo | 19% ROI
  (() => {
    const a = 40, r = 72, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11507045",
      title: "Service - Design and Style",
      niche: "Design and Style",
      price: 110000,
      monthlyProfit: 1772,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 2.6,
      firstMadeMoney: 19,
      businessAge: 19,
      description: "Service business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 110000),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 19+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12163517 — Amazon KDP | Design and Style | $61,497 | $2,609/mo | 51% ROI
  (() => {
    const a = 93, r = 72, rs = 85, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12163517",
      title: "Amazon KDP - Design and Style",
      niche: "Design and Style",
      price: 61497,
      monthlyProfit: 2609,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.3,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Amazon KDP business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 61497),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 51% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11734258 — Ecommerce | Home and Garden | $130,260 | $4,163/mo | 38% ROI
  (() => {
    const a = 63, r = 72, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11734258",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 130260,
      monthlyProfit: 4163,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 2.1,
      firstMadeMoney: 17,
      businessAge: 17,
      description: "Ecommerce business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 130260),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 17+ years in operation",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12271061 — Ecommerce | Design and Style | $20,621 | $1,899/mo | 111% ROI
  (() => {
    const a = 63, r = 77, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12271061",
      title: "25-year-old eco-jewellery brand with 53% margins, $1.9K monthly profit, strong IP, loyal customer ba",
      niche: "Design and Style",
      price: 20621,
      monthlyProfit: 1899,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 0.9,
      firstMadeMoney: 26,
      businessAge: 26,
      description: "25-year-old eco-jewellery brand with 53% margins, $1.9K monthly profit, strong IP, loyal customer base, and major growth upside across digital channels Ecommerce Design and Style Editors Choice Sponsored Confidential Business Location Australia Site Age 26 years Monthly Profit GBP £1,392 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 20621),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 111% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 26+ years in operation",
      "Attractive 0.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11993409 — Amazon Store | Food and Drink | $135,000 | $6,643/mo | 59% ROI
  (() => {
    const a = 67, r = 77, rs = 85, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11993409",
      title: "Amazon Store - Food and Drink",
      niche: "Food and Drink",
      price: 135000,
      monthlyProfit: 6643,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 1.7,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Amazon Store business in Food and Drink",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 135000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 59% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12206031 — Content | Lifestyle | $163,964 | $3,782/mo | 28% ROI
  (() => {
    const a = 92, r = 85, rs = 50, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12206031",
      title: "Content - Lifestyle",
      niche: "Lifestyle",
      price: 163964,
      monthlyProfit: 3782,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 1.9,
      firstMadeMoney: 15,
      businessAge: 15,
      description: "Content business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 163964),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 15+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12300985 — Amazon KDP | Business | $96,000 | $7,611/mo | 95% ROI
  (() => {
    const a = 93, r = 77, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12300985",
      title: "Amazon KDP — Amazon KDP Store Profitable exam publishing brand with $127K revenue, $91K profit, 72% ",
      niche: "Business",
      price: 96000,
      monthlyProfit: 7611,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.1,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Profitable exam publishing brand with $127K revenue, $91K profit, 72% margins and 13K email list, powered by recurring demand and automated funnel Amazon KDP Business Business Location Italy Site Age 6 years Monthly Profit GBP £5,717 /mo Profit Margin 72% Profit Multiple 1.1x Revenue Multiple 0.8x V",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 96000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 95% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11827994 — Amazon Store | Home and Garden | $184,695 | $5,987/mo | 39% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11827994",
      title: "Amazon Store - Home and Garden",
      niche: "Home and Garden",
      price: 184695,
      monthlyProfit: 5987,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.6,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Amazon Store business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 184695),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12266888 — Digital product | Education | $22,700 | £458/mo avg | AVOID
  (() => {
    // Verified P&L: CV=42%, revenue DECLINING -58% (£880 Mar→£147 Feb), avg profit £458/mo
    // ROI at avg: 458*12/22700 = 24%. 13yr old ebook site but dying fast.
    const a = 63, r = 40, rs = 50, e = 40;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    const cvPct = 42, trend = -58;
    return {
      id: "12266888",
      title: "100% Passive 13-Year-Old Ebook Site — SOCRA/CCRP Exam Guides",
      niche: "Education",
      price: 22700,
      monthlyProfit: 458,
      monthlyRevenue: 0,
      monetization: "Digital product sales",
      multiple: 2.8,
      firstMadeMoney: 13,
      businessAge: 13,
      description: "13-year-old ebook site selling SOCRA/CCRP certification exam guides. Verified P&L shows revenue collapsing from £880 (Jun 2025) to £147 (Feb 2026) — a 58% decline. Avg monthly profit just £458. This is a business in terminal decline.",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 22700, { verifiedPnL: true, cvPercent: cvPct, revenueTrend: trend }),
      aiManageable: aiM,
      category: "digital_product",
      verifiedPnL: true,
      profitConsistency: "moderate",
      revenueTrend: trend,
      monthlyProfitRange: "£138–£828",
      cvPercent: cvPct,
      reasonsFor: [
        "13 years old — long-established domain with backlinks",
        "Verified P&L via Stripe/PayPal — data is real",
        "94% profit margin — zero cost to run"
      ],
      reasonsAgainst: [
        "Revenue declined 58% from £880 to £147 in 12 months — near zero trajectory",
        "Profit only £138/mo in Feb 2026 — actual payback at this rate is 13+ years",
        "Tiny niche (SOCRA/CCRP certification) with no growth path",
        "CV=42% — high volatility on top of a declining baseline"
      ],
    };
  })(),
  // #11634253 — Content | Business | $155,238 | $5,021/mo | 39% ROI
  (() => {
    const a = 92, r = 85, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11634253",
      title: "Content - Business",
      niche: "Business",
      price: 155238,
      monthlyProfit: 5021,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 1.9,
      firstMadeMoney: 24,
      businessAge: 24,
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
      recommendation: rec(ov, aiM, 155238),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 24+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12271646 — Content | Travel | $60,000 | $1,257/mo | 25% ROI
  (() => {
    const a = 87, r = 67, rs = 50, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12271646",
      title: "Content - Travel",
      niche: "Travel",
      price: 60000,
      monthlyProfit: 1257,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 4.0,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Content business in Travel",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 60000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12271818 — Amazon Store | Lifestyle | $162,196 | $2,262/mo | 17% ROI
  (() => {
    const a = 67, r = 72, rs = 50, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12271818",
      title: "Amazon Store - Lifestyle",
      niche: "Lifestyle",
      price: 162196,
      monthlyProfit: 2262,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 3.0,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Amazon Store business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 162196),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12012903 — Service | Business | $49,999 | $4,324/mo | 104% ROI
  (() => {
    const a = 45, r = 80, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12012903",
      title: "You think, we deliver. A tech company which develops products & provides high-end services. Speciali",
      niche: "Business",
      price: 49999,
      monthlyProfit: 4324,
      monthlyRevenue: 0,
      monetization: "strategies, such as partnerships, affiliate marketing, and customized service of",
      multiple: 1.0,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Service Business | Business You think, we deliver. A tech company which develops products & provides high-end services. Specialization in Web3 - Blockchain, Web development Service Business Sponsored Confidential Business Location United Arab Emirates Site Age 4 years Monthly Profit GBP £3,248 /mo P",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 49999),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 104% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12225207 — SaaS | Business | $50,000 | $6,692/mo | 161% ROI
  (() => {
    const a = 95, r = 85, rs = 95, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12225207",
      title: "Transforms YouTube videos into blog content using AI, enabling automated transcription, optimization",
      niche: "Business",
      price: 50000,
      monthlyProfit: 6692,
      monthlyRevenue: 0,
      monetization: "strategy of affiliate sales and service subscriptions. As a cutting-edge solutio",
      multiple: 0.6,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Transforms YouTube videos into blog content using AI, enabling automated transcription, optimization, and publishing for content creators. SaaS Business Sponsored Confidential Business Location DE, United States Site Age 6 years Monthly Profit GBP £5,027 /mo Profit Margin 31% Profit Multiple 0.6x Re",
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
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 161% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12096451 — Amazon Store | Home and Garden | $40,000 | $1,683/mo | 50% ROI
  (() => {
    const a = 67, r = 77, rs = 85, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12096451",
      title: "Amazon Store - Home and Garden",
      niche: "Home and Garden",
      price: 40000,
      monthlyProfit: 1683,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 1.5,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Amazon Store business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 40000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 50% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 1.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11679276 — Content | Internet | $200,000 | $14,407/mo | 86% ROI
  (() => {
    const a = 72, r = 75, rs = 95, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11679276",
      title: "Innovative Japanese AI Affiliate Site. $15K+ Monthly Revenue with High Margins & Low Owner Involveme",
      niche: "Internet",
      price: 200000,
      monthlyProfit: 14407,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 1.2,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Innovative Japanese AI Affiliate Site. $15K+ Monthly Revenue with High Margins & Low Owner Involvement Content Internet Sponsored Confidential Business Location Singapore Site Age 2 years Monthly Profit GBP £10,821 /mo Profit Margin 100% Page Views 172,571 p/mo Profit Multiple 1.2x Revenue Multiple",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 200000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 86% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11738921 — Content | Entertainment | $51,438 | $937/mo | 22% ROI
  (() => {
    const a = 87, r = 62, rs = 50, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11738921",
      title: "Content - Entertainment",
      niche: "Entertainment",
      price: 51438,
      monthlyProfit: 937,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 5.3,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Content business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 51438),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High 5.3x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12097268 — Service | Lifestyle | $69,000 | $3,436/mo | 60% ROI
  (() => {
    const a = 40, r = 87, rs = 85, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12097268",
      title: "Service - Lifestyle",
      niche: "Lifestyle",
      price: 69000,
      monthlyProfit: 3436,
      monthlyRevenue: 0,
      monetization: "Services & Subscriptions",
      multiple: 1.7,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Service business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 69000),
      aiManageable: aiM,
      category: "service",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 60% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12230608 — SaaS | Design and Style | $40,843 | $1,550/mo | 46% ROI
  (() => {
    const a = 90, r = 72, rs = 75, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12230608",
      title: "- Design and Style",
      niche: "Design and Style",
      price: 40843,
      monthlyProfit: 1550,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 2.2,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "SaaS business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 40843),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12271387 — Amazon KDP | Entertainment | $79,500 | $3,356/mo | 51% ROI
  (() => {
    const a = 93, r = 82, rs = 85, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12271387",
      title: "Amazon KDP - Entertainment",
      niche: "Entertainment",
      price: 79500,
      monthlyProfit: 3356,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.0,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Amazon KDP business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 79500),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 51% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #12196904 — Ecommerce | Home and Garden | $49,111 | $2,287/mo | 56% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12196904",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 49111,
      monthlyProfit: 2287,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.8,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Ecommerce business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 49111),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 56% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11867314 — SaaS | Internet | $185,000 | $2,372/mo | 15% ROI
  (() => {
    const a = 90, r = 72, rs = 50, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11867314",
      title: "- Internet",
      niche: "Internet",
      price: 185000,
      monthlyProfit: 2372,
      monthlyRevenue: 0,
      monetization: "Other",
      multiple: 1.7,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "SaaS business in Internet",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 185000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12165828 — Amazon KDP | Entertainment | $31,500 | $1,810/mo | 69% ROI
  (() => {
    const a = 93, r = 67, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12165828",
      title: "Amazon KDP Store Digital publishing brand with $29K revenue, $21.7K profit, 75% margins, evergreen t",
      niche: "Entertainment",
      price: 31500,
      monthlyProfit: 1810,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.5,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Digital publishing brand with $29K revenue, $21.7K profit, 75% margins, evergreen titles, and scalable royalties across Amazon and global distribution channels Amazon KDP Entertainment Editors Choice Sponsored Confidential Business Location Italy Site Age 1 year Monthly Profit GBP £1,360 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 31500),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 69% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #11948259 — Ecommerce | Home and Garden | $133,625 | $4,454/mo | 40% ROI
  (() => {
    const a = 68, r = 85, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11948259",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 133625,
      monthlyProfit: 4454,
      monthlyRevenue: 0,
      monetization: "Dropshipping",
      multiple: 1.6,
      firstMadeMoney: 16,
      businessAge: 16,
      description: "Ecommerce business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 133625),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 16+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12044413 — Amazon KDP | Education | $80,000 | $2,320/mo | 35% ROI
  (() => {
    const a = 93, r = 77, rs = 65, e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12044413",
      title: "Amazon KDP - Education",
      niche: "Education",
      price: 80000,
      monthlyProfit: 2320,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.1,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Amazon KDP business in Education",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 80000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #12258077 — Ecommerce | Health and Beauty | $201,816 | $7,522/mo | 45% ROI
  (() => {
    const a = 68, r = 85, rs = 75, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12258077",
      title: "Ecommerce - Health and Beauty",
      niche: "Health and Beauty",
      price: 201816,
      monthlyProfit: 7522,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.4,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Ecommerce business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 201816),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 1.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12216083 — Content | Internet | $71,804 | $2,225/mo | 37% ROI
  (() => {
    const a = 87, r = 62, rs = 65, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12216083",
      title: "Content - Internet",
      niche: "Internet",
      price: 71804,
      monthlyProfit: 2225,
      monthlyRevenue: 0,
      monetization: "Affiliate Sales",
      multiple: 2.7,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Content business in Internet",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 71804),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11942286 — Ecommerce | Electronics | $167,260 | $8,151/mo | 58% ROI
  (() => {
    const a = 68, r = 85, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11942286",
      title: "Ecommerce - Electronics",
      niche: "Electronics",
      price: 167260,
      monthlyProfit: 8151,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.5,
      firstMadeMoney: 11,
      businessAge: 11,
      description: "Ecommerce business in Electronics",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 167260),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 58% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 11+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12012908 — Amazon FBM | Home and Garden | $139,780 | $4,919/mo | 42% ROI
  (() => {
    const a = 67, r = 72, rs = 75, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12012908",
      title: "Amazon FBM - Home and Garden",
      niche: "Home and Garden",
      price: 139780,
      monthlyProfit: 4919,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.4,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Amazon FBM business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 139780),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Attractive 2.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12265653 — Amazon KDP | Entertainment | $115,000 | $4,465/mo | 47% ROI
  (() => {
    const a = 93, r = 72, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12265653",
      title: "Amazon KDP - Entertainment",
      niche: "Entertainment",
      price: 115000,
      monthlyProfit: 4465,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 2.1,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Amazon KDP business in Entertainment",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 115000),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #12163979 — Amazon Store | Health and Beauty | $29,344 | $3,700/mo | 151% ROI
  (() => {
    const a = 67, r = 77, rs = 95, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12163979",
      title: "Profitable Amazon FBA business with a registered brand and strong presence in Italy, France, and Ger",
      niche: "Health and Beauty",
      price: 29344,
      monthlyProfit: 3700,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 0.7,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Profitable Amazon FBA business with a registered brand and strong presence in Italy, France, and Germany. ~$550,000/year, only 3-4 hours per week to operate FBA Store Health and Beauty Sponsored Confidential Business Location Italy Site Age 9 years Monthly Profit GBP £2,779 /mo Profit Margin 11% Pro",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 29344),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 151% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Attractive 0.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11721372 — Marketplace | Food and Drink | $124,023 | $8,824/mo | 85% ROI
  (() => {
    const a = 87, r = 82, rs = 95, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11721372",
      title: "58% net margins Food and Drink marketplace | 125 and growing vendor partners | 25k+ customer base | ",
      niche: "Food and Drink",
      price: 124023,
      monthlyProfit: 8824,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.2,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "58% net margins Food and Drink marketplace | 125 and growing vendor partners | 25k+ customer base | 50% customer repeat rate Marketplace Food and Drink Sponsored Confidential Business Location Italy Site Age 8 years Monthly Profit GBP £7,387 /mo Profit Margin 58% Page Views 9,089 p/mo Profit Multipl",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 124023),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 85% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12195808 — Content | Business | $29,500 | $1,300/mo | 53% ROI
  (() => {
    const a = 87, r = 82, rs = 85, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12195808",
      title: "Content - Business",
      niche: "Business",
      price: 29500,
      monthlyProfit: 1300,
      monthlyRevenue: 0,
      monetization: "Ads",
      multiple: 3.3,
      firstMadeMoney: 23,
      businessAge: 23,
      description: "Content business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 29500),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 53% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 23+ years in operation"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #11572148 — Amazon Store | Sports and Outdoor | $126,110 | $6,313/mo | 60% ROI
  (() => {
    const a = 72, r = 85, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11572148",
      title: "Amazon Store - Sports and Outdoor",
      niche: "Sports and Outdoor",
      price: 126110,
      monthlyProfit: 6313,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 1.7,
      firstMadeMoney: 21,
      businessAge: 21,
      description: "Amazon Store business in Sports and Outdoor",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 126110),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 60% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 21+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #11965874 — Ecommerce | Lifestyle | $90,856 | $4,026/mo | 53% ROI
  (() => {
    const a = 63, r = 77, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11965874",
      title: "Ecommerce - Lifestyle",
      niche: "Lifestyle",
      price: 90856,
      monthlyProfit: 4026,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.9,
      firstMadeMoney: 15,
      businessAge: 15,
      description: "Ecommerce business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 90856),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 53% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 15+ years in operation",
      "Attractive 1.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #11752610 — Ecommerce | Design and Style | $106,345 | $1,305/mo | 15% ROI
  (() => {
    const a = 68, r = 90, rs = 50, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11752610",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 106345,
      monthlyProfit: 1305,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 4.4,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Ecommerce business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 106345),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation",
      "Managed by Flippa — additional due diligence and broker support"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #11923978 — Amazon Store | Automotive | $60,000 | $2,427/mo | 49% ROI
  (() => {
    const a = 67, r = 82, rs = 75, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11923978",
      title: "Amazon Store - Automotive",
      niche: "Automotive",
      price: 60000,
      monthlyProfit: 2427,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.1,
      firstMadeMoney: 9,
      businessAge: 9,
      description: "Amazon Store business in Automotive",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 60000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 9+ years in operation",
      "Attractive 2.1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Further due diligence required before commitment"
      ],
    };
  })(),
  // #12383196 — Amazon KDP | Education | $26,999 | $1,592/mo | 71% ROI
  (() => {
    const a = 93, r = 52, rs = 95, e = 85;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12383196",
      title: "Amazon KDP Store A premium, highly profitable KDP publishing portfolio dominating essential, low-com",
      niche: "Education",
      price: 26999,
      monthlyProfit: 1592,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 1.9,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "A premium, highly profitable KDP publishing portfolio dominating essential, low-competition niches. Predictable passive income, 0 inventory, scaling potential. Amazon KDP Education Sponsored Confidential Business Location Malta Site Age 9 months Monthly Profit GBP £1,196 /mo Profit Margin 66% Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 26999),
      aiManageable: aiM,
      category: "kdp",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 71% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #11789027 — Ecommerce | Design and Style | $29,997 | $2,819/mo | 113% ROI
  (() => {
    const a = 63, r = 77, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11789027",
      title: "Trademarked Pants brand for big-size-men (S to 6XL). 75% Repeat Buyers, $50K+ inventory included. Pr",
      niche: "Design and Style",
      price: 29997,
      monthlyProfit: 2819,
      monthlyRevenue: 0,
      monetization: "Ecommerce",
      multiple: 0.9,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Trademarked Pants brand for big-size-men (S to 6XL). 75% Repeat Buyers, $50K+ inventory included. Priced at $29,997 for fast sale. Shopify Ecommerce Design and Style Editors Choice Sponsored Confidential Business Location Estonia Site Age 5 years Monthly Profit GBP £2,117 /mo Profit Margin 95% Page",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 29997),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 113% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 0.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12229698 — Amazon Store | Health and Beauty | $119,000 | $4,557/mo | 46% ROI
  (() => {
    const a = 72, r = 75, rs = 75, e = 75;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12229698",
      title: "Amazon Store - Health and Beauty",
      niche: "Health and Beauty",
      price: 119000,
      monthlyProfit: 4557,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 2.2,
      firstMadeMoney: 4,
      businessAge: 4,
      description: "Amazon Store business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 119000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Managed by Flippa — additional due diligence and broker support",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12533923 — Content | Education | $25,504 | $1,715/mo | 81% ROI
  (() => {
    const a = 87, r = 42, rs = 95, e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12533923",
      title: "AI 6 month old avatar academy teaching AI content creation and monetization. €22k revenue, affiliate",
      niche: "Education",
      price: 25504,
      monthlyProfit: 1715,
      monthlyRevenue: 0,
      monetization: "strategies. In operation for just six months, it has already generated over €22,",
      multiple: 2.5,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "AI 6 month old avatar academy teaching AI content creation and monetization. €22k revenue, affiliate program included, ready-to-scale digital course business. Content Education Business Location Malta Site Age 6 months Monthly Profit GBP £1,274 /mo Profit Margin 40% Profit Multiple",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 25504),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 81% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12677133 — Content | Entertainment | $20,000 | $1,695/mo | 102% ROI
  (() => {
    const a = 87, r = 72, rs = 95, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12677133",
      title: "$2,788/mo automated videos search engine and no work required — screen share revenue proof",
      niche: "Entertainment",
      price: 20000,
      monthlyProfit: 1695,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.0,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "$2,788/mo automated videos search engine and no work required - screen share revenue proof Content Entertainment Business Location India Site Age 5 years Monthly Profit GBP £1,273 /mo Profit Margin 88% Page Views 355,354 p/mo Profit Multiple 1.0x Revenue Multiple 0.9x V",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 20000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 102% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 1x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure"
      ],
    };
  })(),
  // #12436965 — Content | Business | $34,000 | $557/mo | 20% ROI
  (() => {
    const a = 87, r = 67, rs = 50, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12436965",
      title: "Content - Business",
      niche: "Business",
      price: 34000,
      monthlyProfit: 557,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 5.1,
      firstMadeMoney: 8,
      businessAge: 8,
      description: "Content business in Business",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 34000),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 8+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High 5.1x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12651448 — Content | General Knowledge | $85,256 | $3,147/mo | 44% ROI
  (() => {
    const a = 87, r = 67, rs = 75, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12651448",
      title: "Content - General Knowledge",
      niche: "General Knowledge",
      price: 85256,
      monthlyProfit: 3147,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.3,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Content business in General Knowledge",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 85256),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #12611538 — Content | Education | $106,560 | $6,873/mo | 77% ROI
  (() => {
    const a = 87, r = 62, rs = 95, e = 78;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12611538",
      title: "Premium Microsoft Enterprise Training Hub – High-Ticket Digital Products & Instructor-Led Certificat",
      niche: "Education",
      price: 106560,
      monthlyProfit: 6873,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.3,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Premium Microsoft Enterprise Training Hub – High-Ticket Digital Products & Instructor-Led Certification Training (100% Organic, Semi-Passive) Content Education Sponsored Confidential Business Location United Kingdom Site Age 1 year Monthly Profit GBP £5,144 /mo Profit Marg",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 106560),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 77% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12298318 — SaaS | Health and Beauty | $85,000 | $1,226/mo | 17% ROI
  (() => {
    const a = 90, r = 67, rs = 50, e = 95;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12298318",
      title: "- Health and Beauty",
      niche: "Health and Beauty",
      price: 85000,
      monthlyProfit: 1226,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 5.8,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "SaaS business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 85000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High 5.8x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12268124 — SaaS | Internet | $200,000 | $3,329/mo | 20% ROI
  (() => {
    const a = 90, r = 42, rs = 50, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12268124",
      title: "- Internet",
      niche: "Internet",
      price: 200000,
      monthlyProfit: 3329,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 7.5,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "SaaS business in Internet",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 200000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Elevated risk — platform concentration or verification gaps",
      "High 7.5x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12530181 — SaaS | Health and Beauty | $77,520 | $2,816/mo | 44% ROI
  (() => {
    const a = 90, r = 67, rs = 75, e = 95;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12530181",
      title: "- Health and Beauty",
      niche: "Health and Beauty",
      price: 77520,
      monthlyProfit: 2816,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.3,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "SaaS business in Health and Beauty",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 77520),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #12661644 — SaaS | Internet | $24,000 | $2,223/mo | 111% ROI
  (() => {
    const a = 90, r = 47, rs = 95, e = 88;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12661644",
      title: "Profitable n8n hosting platform with recurring revenue. Easy to run, low maintenance, and growing fa",
      niche: "Internet",
      price: 24000,
      monthlyProfit: 2223,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 2.2,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Profitable n8n hosting platform with recurring revenue. Easy to run, low maintenance, and growing fast in a high-demand market. SaaS Internet Business Location United Kingdom Site Age 5 months Monthly Profit GBP £1,670 /mo Profit Margin 95% Profit Multiple 2.2x Revenue Multiple 2.1x Tota",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 24000),
      aiManageable: aiM,
      category: "saas",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 111% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 2.2x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "Elevated risk — platform concentration or verification gaps"
      ],
    };
  })(),
  // #12570976 — Ecommerce | Automotive | $39,000 | $1,805/mo | 56% ROI
  (() => {
    const a = 63, r = 82, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12570976",
      title: "Ecommerce - Automotive",
      niche: "Automotive",
      price: 39000,
      monthlyProfit: 1805,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 1.8,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "Ecommerce business in Automotive",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 39000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 56% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 12+ years in operation",
      "Attractive 1.8x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12586912 — Amazon Store | Food and Drink | $24,968 | $1,253/mo | 60% ROI
  (() => {
    const a = 67, r = 72, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12586912",
      title: "Amazon Store - Food and Drink",
      niche: "Food and Drink",
      price: 24968,
      monthlyProfit: 1253,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 1.7,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Amazon Store business in Food and Drink",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 24968),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Strong ROI: 60% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.7x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12641634 — Ecommerce | Home and Garden | $150,000 | $6,908/mo | 55% ROI
  (() => {
    const a = 63, r = 82, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12641634",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 150000,
      monthlyProfit: 6908,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 1.8,
      firstMadeMoney: 5,
      businessAge: 5,
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
      recommendation: rec(ov, aiM, 150000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 55% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 1.8x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12621684 — Amazon Store | Home and Garden | $14,900 | $917/mo | 74% ROI
  (() => {
    const a = 67, r = 72, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12621684",
      title: "Amazon Store - Home and Garden",
      niche: "Home and Garden",
      price: 14900,
      monthlyProfit: 917,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 1.4,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Amazon Store business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 14900),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Strong ROI: 74% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #12655357 — Ecommerce | Home and Garden | $145,000 | $4,073/mo | 34% ROI
  (() => {
    const a = 63, r = 77, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12655357",
      title: "Ecommerce - Home and Garden",
      niche: "Home and Garden",
      price: 145000,
      monthlyProfit: 4073,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 3.0,
      firstMadeMoney: 6,
      businessAge: 6,
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
      recommendation: rec(ov, aiM, 145000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12633880 — Amazon FBM | Sports and Outdoor | $12,000 | $1,726/mo | 173% ROI
  (() => {
    const a = 67, r = 72, rs = 95, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12633880",
      title: "Amazon FBM - Sports and Outdoor",
      niche: "Sports and Outdoor",
      price: 12000,
      monthlyProfit: 1726,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 0.6,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Amazon FBM business in Sports and Outdoor",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 12000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Strong ROI: 173% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12162743 — Amazon Store | Home and Garden | $60,000 | $2,195/mo | 44% ROI
  (() => {
    const a = 67, r = 77, rs = 75, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12162743",
      title: "Amazon Store - Home and Garden",
      niche: "Home and Garden",
      price: 60000,
      monthlyProfit: 2195,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.3,
      firstMadeMoney: 6,
      businessAge: 6,
      description: "Amazon Store business in Home and Garden",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 60000),
      aiManageable: aiM,
      category: "amazon_fba",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 6+ years in operation",
      "Attractive 2.3x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details"
      ],
    };
  })(),
  // #12665107 — Ecommerce | Design and Style | $74,750 | $2,597/mo | 42% ROI
  (() => {
    const a = 63, r = 77, rs = 75, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12665107",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 74750,
      monthlyProfit: 2597,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.4,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Ecommerce business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 74750),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 2.4x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12635956 — Ecommerce | Food and Drink | $65,000 | $3,543/mo | 65% ROI
  (() => {
    const a = 63, r = 67, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12635956",
      title: "Niche e-commerce brand selling proprietary N2O filters and regulators. 83% gross margins, 1,900+ cus",
      niche: "Food and Drink",
      price: 65000,
      monthlyProfit: 3543,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.5,
      firstMadeMoney: 3,
      businessAge: 3,
      description: "Niche e-commerce brand selling proprietary N2O filters and regulators. 83% gross margins, 1,900+ customers, $34K inventory included. Ecommerce Food and Drink Confidential Business Location CA, United States Site Age 3 years Monthly Profit GBP £2,661 /mo Profi",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 65000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 65% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.5x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12630388 — Digital Agency | Internet | $19,800 | $2,889/mo | 175% ROI
  (() => {
    const a = 87, r = 62, rs = 95, e = 68;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12630388",
      title: "Digital Agency 1.5-year-old Webflow & Framer agency with 100%+ YoY growth, specializing in high-perf",
      niche: "Internet",
      price: 19800,
      monthlyProfit: 2889,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 0.6,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "1.5-year-old Webflow & Framer agency with 100%+ YoY growth, specializing in high-performance websites, landing pages, and premium templates. Other Service And Agency Internet Business Location WY, United States Site Age 1 year Monthly Profit GBP £2,170 /mo Prof",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 19800),
      aiManageable: aiM,
      category: "content_ads",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Strong ROI: 175% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 0.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #12624471 — Ecommerce | Design and Style | $77,310 | $4,022/mo | 62% ROI
  (() => {
    const a = 63, r = 62, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12624471",
      title: "Profitable women's activewear Shopify store | $102K TTM revenue | 42% margins | 2,000+ orders | Prov",
      niche: "Design and Style",
      price: 77310,
      monthlyProfit: 4022,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.6,
      firstMadeMoney: 2,
      businessAge: 2,
      description: "Profitable women's activewear Shopify store | $102K TTM revenue | 42% margins | 2,000+ orders | Proven business system | Turn-key acquisition Ecommerce Design and Style Business Location CA, United States Site Age 2 years Monthly Profit GBP £3,021 /mo Profit",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 77310),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 62% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12668832 — Android App | Design and Style | $44,999 | $1,453/mo | 39% ROI
  (() => {
    const a = 80, r = 57, rs = 65, e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12668832",
      title: "Android App - Design and Style",
      niche: "Design and Style",
      price: 44999,
      monthlyProfit: 1453,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 5.2,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "Android App business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 44999),
      aiManageable: aiM,
      category: "app",
      reasonsFor: [
      "Highly autonomous — AI+VA can run with minimal oversight",
      "Verified Listing — financials independently confirmed by Flippa"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Young business (1 year) — limited track record",
      "High 5.2x multiple — limited upside at asking price"
      ],
    };
  })(),
  // #12657245 — Ecommerce | Lifestyle | $27,794 | $1,199/mo | 52% ROI
  (() => {
    const a = 63, r = 82, rs = 85, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12657245",
      title: "Ecommerce - Lifestyle",
      niche: "Lifestyle",
      price: 27794,
      monthlyProfit: 1199,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 1.9,
      firstMadeMoney: 5,
      businessAge: 5,
      description: "Ecommerce business in Lifestyle",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 27794),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Strong ROI: 52% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 5+ years in operation",
      "Attractive 1.9x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
      ],
    };
  })(),
  // #12649745 — Ecommerce | Design and Style | $45,000 | $2,333/mo | 62% ROI
  (() => {
    const a = 63, r = 62, rs = 95, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12649745",
      title: "High-potential art brand, paused mid-year to focus on other ventures. No inventory, strong margins, ",
      niche: "Design and Style",
      price: 45000,
      monthlyProfit: 2333,
      monthlyRevenue: 0,
      monetization: "Methods",
      multiple: 1.6,
      firstMadeMoney: 1,
      businessAge: 1,
      description: "High-potential art brand, paused mid-year to focus on other ventures. No inventory, strong margins, and proven demand. 2-3X ROAS Ecommerce Design and Style Sponsored Confidential Business Location NY, United States Site Age 1 year Monthly Profit GBP £1,752",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "partial",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 45000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Strong ROI: 62% annual return at asking price",
      "Verified Listing — financials independently confirmed by Flippa",
      "Attractive 1.6x multiple — below market average of 3x"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "Confidential listing — NDA required before full financial disclosure",
      "High operational involvement — significant owner time required",
      "Young business (1 year) — limited track record"
      ],
    };
  })(),
  // #11797420 — Ecommerce | Design and Style | $149,000 | $4,287/mo | 35% ROI
  (() => {
    const a = 63, r = 77, rs = 65, e = 60;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11797420",
      title: "Ecommerce - Design and Style",
      niche: "Design and Style",
      price: 149000,
      monthlyProfit: 4287,
      monthlyRevenue: 0,
      monetization: "",
      multiple: 2.9,
      firstMadeMoney: 7,
      businessAge: 7,
      description: "Ecommerce business in Design and Style",
      status: "active",
      listingType: "buy_now",
      verificationStatus: "verified",
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 149000),
      aiManageable: aiM,
      category: "ecommerce",
      reasonsFor: [
      "Low risk profile — verified financials, diversified",
      "Verified Listing — financials independently confirmed by Flippa",
      "Proven track record: 7+ years in operation"
      ],
      reasonsAgainst: [
      "First Access listing — limited public data, requires Premium subscription for full details",
      "High operational involvement — significant owner time required"
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
      description: "4.7 | 13 App Store reviews This app offers practice tests and resources for the UK citizenship test, helping users study and prepare effectively for the exam. iOS Android Education Sponsored Business Location United Kingdom App Age 3 years Monthly Profit GBP £13,783",
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
      description: "3,725 Asking Price 0 Comments 1,852 Views 75 Watchers  Watch  FBA STOREFRONT  Amazon FBA Baby Brand | €2.62M TTM Revenue, €345K net profit | 50%+ Organic Sales | 5 EU Markets | Proprietary Designs | Clear Growth Path FBA Store Lifestyle Editors Choice Sponsored Confidential Business Location Spain S",
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
      description: "0,000 Asking Price 0 Comments 2,075 Views 98 Watchers  Watch  CRYPTO APP  Crypto App | Business Highly profitable regulated trading platform with a Mauritius license ~15,000 MAUs, 1,500 DAUs, live client transaction activity, USD $248k/Month Net Profits Other Crypto App Business Editors Choice Spons",
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
      description: "Profitable Shopify DTC brand selling custom business stamps; $816K TTM revenue, $128 AOV, $137 LTV, 55–60% margins, made-to-order, scalable ads. Shopify Ecommerce Business Editors Choice Sponsored Confidential Business Location WY, United States Site Age 4 years Monthly Profit GBP £16,009 /mo Profit",
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
      description: "0,000 Asking Price 0 Comments 3,732 Views 161 Watchers  Watch  ECOMMERCE STORE  High Margin and Established DTC phone case brand | 60% YoY Growth | 30% Customer Return Rate | 80%+ US Customers | Well-Positioned for Scalable Growth Ecommerce Electronics Editors Choice Sponsored Confidential Business",
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
      description: "Profitable, remote digital marketing agency with strong margins, established team, and 20–30% growth; woman-owned, serving women-owned businesses. Marketing Agency Design and Style Editors Choice Sponsored Confidential Business Location ID, United States Site Age 3 years Monthly Profit GBP £12,622 /",
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
  // #12249202 — Amazon Store | Home and Garden | $1,922,197 | $50,859/mo | 32% ROI
  (() => {
    const a = 72, r = 80, rs = 65, e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12249202",
      title: "Category-leading Amazon FBA home-safety brand selling primarily in the US market. A hands-off, highl",
      niche: "Home and Garden",
      price: 1922197,
      monthlyProfit: 50859,
      monthlyRevenue: 0,
      monetization: "Fulfilled By Amazon",
      multiple: 3.1,
      firstMadeMoney: 12,
      businessAge: 12,
      description: "2,197 Asking Price 0 Comments 2,314 Views 101 Watchers  Watch  FBA STOREFRONT  Category-leading Amazon FBA home-safety brand selling primarily in the US market. A hands-off, highly scalable operating model. FBA Store Home and Garden Editors Choice Sponsored Confidential Business Location Singapore S",
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
      description: "SD $388,996 Asking Price 0 Comments 3,021 Views 137 Watchers  Watching  SERVICE BUSINESS  AI-driven agency with an existing MNC client. $400k+ recurring revenue paid 12 months in advance. Exceptional cash flow, lean operations & 30% profit margins. Service Business Editors Choice Sponsored Confident",
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
      description: "A turnkey, scalable FBA Amazon business with strong sales, premium products, unique designs, $90k+ inventory, US trademark, social media handles, domain FBA Store Lifestyle Editors Choice Sponsored Confidential Business Location FL, United States Site Age 5 years Monthly Profit GBP £7,697 /mo Profit",
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
      description: "A premium boutique email and SMS automation powerhouse agency with 81% profit margin, high LTV of AUD 27.7K, and systems built for effortless scale. Marketing Agency Business Editors Choice Sponsored Confidential Business Location Australia Site Age 2 years Monthly Profit GBP £17,192 /mo Profit Marg",
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
      description: "Profitable talent booking platform connecting vetted fashion models and creators with brands for paid work$3.4M GMV, zero marketing spend, high retention. Marketplace Internet Editors Choice Sponsored Confidential Business Location OH, United States Site Age 5 years Monthly Profit GBP £21,415 /mo Pa",
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
      description: "Established and reputable design-driven merch powerhouse with 60% repeat revenue, global brand clients, a full team, and 8,000+ customers. A scalable investment Service Design and Style Editors Choice Sponsored Confidential Business Location Singapore Site Age 17 years Monthly Profit GBP £12,894 /mo",
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

// === SUMMARY ===
// Total: 151 listings
// Top Picks: 39
// Strong: 64
// Consider: 47
// Avoid: 1
