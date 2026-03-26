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
  // Placeholder 1 — SaaS, verified, buy_now
  (() => {
    const a = 85, r = 70, rs = roiScore(roi(80000, 2000)), e = 80;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "12345678",
      title: "Placeholder SaaS Tool",
      niche: "SaaS / Productivity",
      price: 80000,
      monthlyProfit: 2000,
      monthlyRevenue: 2400,
      monetization: "SaaS Subscription",
      multiple: 40,
      firstMadeMoney: 2022,
      description: "Placeholder SaaS listing — real data to be filled in.",
      status: "active" as const,
      businessAge: 3,
      listingType: "buy_now" as const,
      verificationStatus: "verified" as const,
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 80000),
      aiManageable: aiM,
      category: "saas" as const,
      reasonsFor: ["Verified financials", "Recurring subscription revenue", "High autonomy"],
      reasonsAgainst: ["Placeholder — no real data yet"],
    };
  })(),
  // Placeholder 2 — Content, partial, buy_now
  (() => {
    const a = 75, r = 60, rs = roiScore(roi(45000, 1200)), e = 70;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "87654321",
      title: "Placeholder Content Site",
      niche: "Content / Display Ads",
      price: 45000,
      monthlyProfit: 1200,
      monthlyRevenue: 1400,
      monetization: "Display Advertising",
      multiple: 37,
      firstMadeMoney: 2021,
      description: "Placeholder content site listing — real data to be filled in.",
      status: "active" as const,
      businessAge: 4,
      listingType: "buy_now" as const,
      verificationStatus: "partial" as const,
      offersCount: 0,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 45000),
      aiManageable: aiM,
      category: "content_ads" as const,
      reasonsFor: ["Partial verification", "Display ads passive income"],
      reasonsAgainst: ["Placeholder — no real data yet"],
    };
  })(),
  // Placeholder 3 — Ecommerce, unverified, offer
  (() => {
    const a = 55, r = 50, rs = roiScore(roi(120000, 3000)), e = 65;
    const ov = overall(a, r, rs, e);
    const aiM = a >= 65;
    return {
      id: "11111111",
      title: "Placeholder Ecommerce Store",
      niche: "Ecommerce / Consumer Goods",
      price: 120000,
      monthlyProfit: 3000,
      monthlyRevenue: 8000,
      monetization: "eCommerce",
      multiple: 40,
      firstMadeMoney: 2020,
      description: "Placeholder ecommerce listing — real data to be filled in.",
      status: "active" as const,
      businessAge: 5,
      listingType: "offer" as const,
      verificationStatus: "unverified" as const,
      offersCount: 2,
      autonomyScore: a,
      riskScore: r,
      roiScore: rs,
      evergreenScore: e,
      overallScore: ov,
      recommendation: rec(ov, aiM, 120000),
      aiManageable: aiM,
      category: "ecommerce" as const,
      reasonsFor: ["Established 5-year track record", "Multiple revenue streams"],
      reasonsAgainst: ["Unverified financials", "Placeholder — no real data yet"],
    };
  })(),
];
