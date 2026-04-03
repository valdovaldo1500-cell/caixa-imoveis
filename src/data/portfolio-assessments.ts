export interface ExpertAssessment {
  id: string;
  name: string;
  verdict: string;
  verdictColor: "emerald" | "blue" | "amber" | "red";
  url?: string;
  price: string;
  monthlyProfit: string;
  annualROI: string;
  trendProfit: string;
  trendTraffic: string;
  highlights: string[];
  risks: string[];
  recommendation: string;
  aiPlan: string;
}

export const PORTFOLIO_ASSESSMENTS: ExpertAssessment[] = [
  // ── BUY (emerald) ──────────────────────────────────────────────────────────
  {
    id: "F12290776",
    name: "Vegan Content Site — Verified ($8K)",
    verdict: "BUY — verified, 97% margin, growing",
    verdictColor: "emerald",
    price: "$8,000",
    monthlyProfit: "$1,433/mo",
    annualROI: "215%",
    trendProfit: "97% profit margin, growing traffic trend",
    trendTraffic: "15K monthly users, 100% organic SEO",
    highlights: [
      "Verified revenue via Flippa (Stripe + GA)",
      "97% profit margin",
      "15K monthly users, 100% organic SEO",
      "Growing traffic trend",
      "$8K = 5.6 month payback",
    ],
    risks: [
      "Content site = Google algorithm dependency",
      "Niche (vegan) may limit growth ceiling",
      "Need to verify: is traffic stable post-HCU?",
    ],
    recommendation:
      "BUY at full asking. At 0.5x annual multiple this is the best value-for-money in the entire search. Verified revenue, high margins, organic traffic.",
    aiPlan:
      "Use Claude to generate 50+ vegan articles/month, expand SEO footprint, add newsletter monetization.",
  },
  {
    id: "F11771332",
    name: "15yr Content Site — Nearly Free ($2.1K)",
    verdict: "AVOID — P&L shows revenue collapsed to £26-204/mo in recent months",
    verdictColor: "red",
    price: "$2,118",
    monthlyProfit: "$950/mo",
    annualROI: "538%",
    trendProfit: "$950/mo with minimal work",
    trendTraffic: "15yr domain age, established organic presence",
    highlights: [
      "15yr domain age",
      "0.2x multiple — nearly free",
      "$950/mo with minimal work",
      "Max downside is $2K",
    ],
    risks: [
      "Suspiciously cheap — verify traffic source",
      "15yr old may have legacy issues",
      "P&L VERIFIED: revenue collapsed to £26-204/mo in recent months",
      "The $950/mo claim is historical peak, not current",
    ],
    recommendation:
      "AVOID — P&L shows revenue collapsed to £26-204/mo in recent months. The $950/mo claim is historical peak, not current.",
    aiPlan:
      "Refresh content with Claude, modernize site, add email capture.",
  },
  {
    id: "F11015517",
    name: "Life Insurance Lead Gen — 5yr ($3.5K)",
    verdict: "BUY — transferable Google Ads account has standalone value",
    verdictColor: "emerald",
    price: "$3,500",
    monthlyProfit: "$987/mo",
    annualROI: "338%",
    trendProfit: "$987/mo at $3,500 = 3.5 month payback",
    trendTraffic: "5yr track record, Google Ads traffic",
    highlights: [
      "$987/mo at $3,500 = 3.5 month payback",
      "5yr track record",
      "Google Ads account transfers with sale",
      "Life insurance leads = high value niche",
    ],
    risks: [
      "Age discrepancy: listing says 1yr, data says 5yr — clarify",
      "Lead gen depends on Google Ads performance",
      "Insurance niche is competitive",
    ],
    recommendation:
      "BUY after resolving the age discrepancy. The Google Ads account alone may be worth $3.5K.",
    aiPlan:
      "Optimize Google Ads with AI, expand to other insurance verticals.",
  },
  {
    id: "F12043262",
    name: "Dating Platform iOS — 250 Members ($10.8K)",
    verdict: "AVOID — P&L shows revenue collapsed from £25K to near zero",
    verdictColor: "red",
    price: "$10,850 (offer $7.5-9K)",
    monthlyProfit: "$3,646/mo",
    annualROI: "403-583%",
    trendProfit: "$58K revenue in 7 months, 44% profit margin",
    trendTraffic: "250 paying members, iOS App Store",
    highlights: [
      "$3,646/mo at $10.8K asking = 0.2x multiple",
      "250 paying members = real traction",
      "$58K revenue in 7 months",
      "44% profit margin",
    ],
    risks: [
      "Dating apps have high churn",
      "1yr old — limited track record",
      "iOS platform dependency",
      "P&L VERIFIED: revenue collapsed from £25K to near zero in recent months",
    ],
    recommendation:
      "AVOID — P&L shows revenue collapsed from £25K to near zero. The $3,646/mo claim is historical, current revenue is near zero.",
    aiPlan:
      "Add AI matching features with Claude, expand to Android, improve retention.",
  },
  {
    id: "F12248731",
    name: "SEO Agency — 24 Clients Verified ($12.9K)",
    verdict: "BUY — 24 verified clients, 76% margin, recurring",
    verdictColor: "emerald",
    price: "$12,909 (offer $11.5K)",
    monthlyProfit: "$1,365/mo",
    annualROI: "127%",
    trendProfit: "76% profit margin, recurring SEO revenue",
    trendTraffic: "24 verified clients, Flippa-verified",
    highlights: [
      "24 verified clients",
      "76% profit margin",
      "Recurring SEO service revenue",
      "Verified on Flippa",
    ],
    risks: [
      "Agency = client retention risk",
      "SEO services face AI competition",
      "2yr old — moderate track record",
    ],
    recommendation:
      "BUY at $11,500. The 24 verified clients provide revenue diversification.",
    aiPlan:
      "Use AI for SEO reporting automation, add content services, upsell existing clients.",
  },
  {
    id: "F11854283",
    name: "Grid Maker iOS App ($15K)",
    verdict: "CONSIDER — P&L shows slight decline, £700-1,000/mo not £1,159",
    verdictColor: "amber",
    price: "$15,000",
    monthlyProfit: "$1,159/mo",
    annualROI: "93%",
    trendProfit: "99% profit margin, 3yr track record",
    trendTraffic: "App Store organic, Instagram grid planning niche",
    highlights: [
      "4.3 stars with 166 real reviews",
      "99% profit margin",
      "3yr track record",
      "Instagram grid planning = evergreen niche",
    ],
    risks: [
      "Instagram could add native grid feature",
      "iOS platform dependency",
      "App maintenance requires developer",
      "P&L VERIFIED: slight decline, actual revenue £700-1,000/mo not £1,159",
    ],
    recommendation:
      "CONSIDER — P&L shows slight decline, £700-1,000/mo not £1,159. Still profitable but downgraded from BUY.",
    aiPlan:
      "Add AI-powered grid suggestions, expand to Android, add premium templates.",
  },
  // ── CONSIDER (amber) ───────────────────────────────────────────────────────
  {
    id: "F11627815",
    name: "Two Cannabis Sites — 14yr Domains ($24K)",
    verdict: "CONSIDER — 14yr domains, CBD affiliate revenue",
    verdictColor: "amber",
    price: "$23,926",
    monthlyProfit: "$1,043/mo",
    annualROI: "52%",
    trendProfit: "Best content profit/price ratio in batch",
    trendTraffic: "Two 14yr domains, CBD affiliate organic traffic",
    highlights: [
      "Two 14yr old domains — significant authority",
      "Cannabis/CBD niche growing",
      "Best content profit/price ratio in batch",
      "CBD affiliates monetize cleanly",
    ],
    risks: [
      "Cannabis regulatory uncertainty",
      "May face banking/payment processor issues",
      "Content may need legal review",
      "Niche stigma could limit partnerships",
    ],
    recommendation:
      "CONSIDER. The 14yr domains have genuine authority. Cannabis discount on price but not on revenue.",
    aiPlan:
      "Expand CBD content with Claude, add newsletter, grow affiliate partnerships.",
  },
  {
    id: "F12225207-2",
    name: "Content Gorilla SaaS — Negotiate to $30-35K",
    verdict: "CONSIDER — 6yr brand, Flippa-managed, volatile months",
    verdictColor: "amber",
    price: "$50,000 (negotiate to $30-35K)",
    monthlyProfit: "$2,000-3,000/mo (true baseline)",
    annualROI: "69-120% at negotiated price",
    trendProfit: "Volatile — true baseline £2-3K/mo, not £6.7K headline",
    trendTraffic: "6yr brand, YouTube-to-blog AI tool",
    highlights: [
      "6yr established brand",
      "Flippa-managed sale = cleaner process",
      "Stripe-verified revenue",
      "YouTube-to-blog AI has real market demand",
    ],
    risks: [
      "True baseline is £2-3K/mo, not the £6.7K headline",
      "Monthly revenue is volatile",
      "AI content market getting crowded",
      "Declining from 2023 peak",
    ],
    recommendation:
      "CONSIDER at $30-35K only. Do NOT pay $50K. The brand and tech have value but revenue is volatile.",
    aiPlan:
      "Stabilize revenue, improve AI output quality, add enterprise clients.",
  },
  {
    id: "F12195777",
    name: "14yr Affiliate Marketing Community ($25K)",
    verdict: "CONSIDER — real business, founder-brand risk, cheap at 0.7x multiple",
    verdictColor: "amber",
    price: "$25,000",
    monthlyProfit: "~$2,958/mo",
    annualROI: "142%",
    trendProfit: "14yr old community site, automated, recurring content",
    trendTraffic: "Affiliate marketing niche, established audience",
    highlights: [
      "14 years old — exceptional domain age and authority",
      "Community moat — harder to replicate than content",
      "AI can automate and expand content library at scale",
      "$25K = 8.5 month payback at current profit",
      "Affiliate marketing is evergreen niche",
    ],
    risks: [
      "14yr old could mean legacy tech stack",
      "Affiliate marketing community = may be outdated advice",
      "Need to verify traffic trend — could be declining",
      "Community requires engagement to maintain",
    ],
    recommendation:
      "INVESTIGATE. At $25K with $2,958/mo profit this is a strong portfolio entry point. The 14yr domain age is the real asset — AI can rebuild the content. Deep dive needed on traffic trend and tech stack.",
    aiPlan:
      "Use Claude to generate daily content, modernize the platform, add AI-powered affiliate tools, grow email list.",
  },
  {
    id: "MICR-FUNDRAISE-2",
    url: "https://microns.io/startup-listings/ai-powered-fundraising-infrastructure-platform",
    name: "AI Fundraising Infrastructure (Microns — $40K)",
    verdict: "CONDITIONAL — still available, sub-1x revenue, but verify Stripe data first",
    verdictColor: "amber",
    price: "$40,000",
    monthlyProfit: "~$3,535/mo",
    annualROI: "106%",
    trendProfit: "$42K annual revenue at $40K asking = 0.94x revenue multiple",
    trendTraffic: "White-label fundraising platform, 50 customers",
    highlights: [
      "Revenue ($42K/yr) EXCEEDS asking price ($40K) — priced below 1x",
      "White-label model = scalable without per-client work",
      "50 existing customers",
      "AI-powered fundraising is a growing niche",
    ],
    risks: [
      "Previously flagged as ALREADY SOLD on Microns — verify availability",
      "AngularJS tech stack (EOL since 2021) — technical debt",
      "Solo founder selling due to debt — distressed sale",
      "Cyrillic code comments suggest Eastern European dev",
      "Part of revenue is hourly work, not pure MRR",
    ],
    recommendation:
      "INVESTIGATE IF STILL AVAILABLE. The sub-1x revenue multiple is extraordinary if the business is real and transferable. The AngularJS tech debt is a concern but Claude Code could help migrate. Verify availability first.",
    aiPlan:
      "Migrate from AngularJS to React/Next.js using Claude Code, stabilize existing 50 customers, add AI features to the fundraising toolkit.",
  },
  // ── AVOID (red) ────────────────────────────────────────────────────────────
  {
    id: "F12205406",
    name: "AI SaaS with DR72 + 35K Organic ($23K)",
    verdict: "AVOID — DR72 claim is fake (actual AS 22), revenue declining, LTD cash grab",
    verdictColor: "red",
    price: "$23,000",
    monthlyProfit: "~$1,212/mo",
    annualROI: "63%",
    trendProfit: "DR72 domain, 35K organic visitors, 99% margins",
    trendTraffic: "Strong SEO foundation — 35K monthly organic visitors",
    highlights: [
      "DR72 domain authority — took years to build, incredibly valuable",
      "35K organic visitors/mo = free traffic",
      "99% margins — near-zero operating costs",
      "$23K is dirt cheap for a DR72 domain alone",
      "AI SaaS product already built",
    ],
    risks: [
      "Only $1,212/mo profit — below threshold but growable",
      "2yr old — limited track record",
      "Need to verify DR72 claim independently",
      "AI SaaS space is competitive",
    ],
    recommendation:
      "INVESTIGATE. The DR72 domain alone may be worth more than $23K. With 35K organic visitors and an AI product already built, Claude Code could add features and grow revenue significantly. This is a buy-the-asset-cheap play.",
    aiPlan:
      "Use Claude Code to improve the SaaS product, add premium features, leverage DR72 SEO to rank for high-value keywords, add content marketing.",
  },
  {
    id: "F12042663",
    name: "8yr WordPress Plugin — 8,300+ Sales ($40K)",
    verdict: "AVOID — declining theme (not plugin), 30-60 hrs/mo support, seller is flipper",
    verdictColor: "red",
    price: "$40,000",
    monthlyProfit: "~$986/mo",
    annualROI: "30%",
    trendProfit: "8yr old WP plugin, 97% margin, $92K lifetime earnings",
    trendTraffic: "WordPress ecosystem — 8,300+ sales, established install base",
    highlights: [
      "8 years old — proven longevity in WP ecosystem",
      "8,300+ sales = large install base to upsell",
      "97% profit margin — near-zero costs",
      "WordPress plugin market is massive",
      "Claude Code can add AI features to differentiate",
    ],
    risks: [
      "Only $986/mo current — needs growth to justify $40K",
      "WordPress ecosystem changes could affect compatibility",
      "8yr old code may be legacy PHP",
      "Plugin market is crowded",
    ],
    recommendation:
      "INVESTIGATE. The install base of 8,300+ is the real asset. Current revenue is low but adding AI-powered features with Claude Code could unlock premium pricing. Need to verify: what does the plugin do? What's the install base doing (growing/declining)?",
    aiPlan:
      "Add AI features to the plugin, create premium tier, email the 8,300+ existing customers about new AI capabilities, add content marketing.",
  },
  {
    id: "F11987831",
    name: "No-Code SaaS — 0% Churn ($50K)",
    verdict: "AVOID — one-time payments not SaaS, orders shrinking, Bubble lock-in",
    verdictColor: "red",
    price: "$49,725",
    monthlyProfit: "~$2,746/mo",
    annualROI: "66%",
    trendProfit: "93% margin, 0% churn, $2.7K/mo profit",
    trendTraffic: "No-code SaaS built on Bubble",
    highlights: [
      "0% churn claimed — if true, this is the stickiest product in the search",
      "93% profit margin — lean operation",
      "$2,746/mo with minimal work",
      "2yr track record",
    ],
    risks: [
      "0% churn on one-time payment model = misleading metric",
      "Built on Bubble (no-code) = vendor lock-in",
      "One-time payment model means no guaranteed recurring revenue",
      "Need to verify if 'subscribers' are actually one-time buyers",
    ],
    recommendation:
      "INVESTIGATE but skeptically. The '0% churn' needs verification — this may be a one-time payment model where churn doesn't apply. If it's genuinely recurring subscription with 0% churn, it's a gem. If one-time payments, it's an info product.",
    aiPlan:
      "If acquired: convert one-time model to subscription, add AI features, use Claude to expand the content library.",
  },
  {
    id: "F12225068",
    name: "9yr B2B Lead Gen Agency — Automated ($46K)",
    verdict: "AVOID — only 4 clients, 'automated' needs 6 staff, cold email headwinds",
    verdictColor: "red",
    price: "$46,463",
    monthlyProfit: "~$3,920/mo",
    annualROI: "101%",
    trendProfit: "9yr old B2B lead gen, automated systems, premium clients",
    trendTraffic: "Established B2B relationships, automated marketing",
    highlights: [
      "9 years old — long track record",
      "$3,920/mo at 101% annual ROI",
      "Automated systems in place",
      "B2B lead gen = high-value, sticky clients",
      "Israel's enterprise background is relevant",
    ],
    risks: [
      "'Agency' implies service work — may not be passive",
      "9yr old could mean stale client relationships",
      "Need to verify automation level — how many hours/week?",
      "B2B lead gen depends on outbound which needs constant effort",
    ],
    recommendation:
      "INVESTIGATE. At $46K with $3,920/mo this is a strong cash cow candidate if genuinely automated. The 9yr track record adds confidence. Key question: how automated is it really?",
    aiPlan:
      "Use AI to automate outreach, personalize emails at scale, add Claude-powered lead qualification, expand to cybersecurity/IT lead gen niches.",
  },
  {
    id: "F12661644",
    name: "n8n Hosting Platform — Recurring ($24K)",
    verdict: "AVOID — competes with n8n's own cloud hosting, license restrictions",
    verdictColor: "red",
    price: "$24,000",
    monthlyProfit: "~$2,223/mo",
    annualROI: "111%",
    trendProfit: "n8n hosting with recurring subscription revenue",
    trendTraffic: "Automation/workflow market growing rapidly",
    highlights: [
      "n8n is a fast-growing open-source automation platform",
      "Hosting = recurring revenue with minimal support",
      "$24K entry point with $2.2K/mo = 11 month payback",
      "Automation market is booming (Make, Zapier competitors)",
    ],
    risks: [
      "0yr old — brand new, no track record",
      "n8n could offer their own hosted solution (platform risk)",
      "Hosting is a commodity — low moat",
      "Customer acquisition without n8n's endorsement is hard",
    ],
    recommendation:
      "INVESTIGATE. The n8n ecosystem is growing fast and hosting is a real need. At $24K the risk is minimal. But verify: does n8n already offer hosted? If so, this competes with the platform itself.",
    aiPlan:
      "Add managed workflows, templates, AI-powered automation suggestions, target specific niches (e-commerce, marketing agencies).",
  },
];
