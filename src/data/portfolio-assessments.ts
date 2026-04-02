export interface ExpertAssessment {
  id: string;
  name: string;
  verdict: string;
  verdictColor: "emerald" | "blue" | "amber" | "red";
  price: string;
  monthlyProfit: string;
  annualROI: string;
  trendProfit: string;
  trendTraffic: string;
  highlights: string[];
  risks: string[];
  recommendation: string;
  aiPlan: string;
  url?: string;
}

export const PORTFOLIO_ASSESSMENTS: ExpertAssessment[] = [
  {
    id: "F12195777",
    name: "14yr Affiliate Marketing Community ($25K)",
    verdict: "INVESTIGATE — oldest domain, community moat",
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
    id: "F12205406",
    name: "AI SaaS with DR72 + 35K Organic ($23K)",
    verdict: "INVESTIGATE — SEO goldmine, cheapest AI entry",
    verdictColor: "amber",
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
    verdict: "INVESTIGATE — install base + AI features",
    verdictColor: "amber",
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
    id: "MICR-FUNDRAISE-2",
    name: "AI Fundraising Infrastructure (Microns — $40K)",
    verdict: "INVESTIGATE — revenue exceeds asking price",
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
  {
    id: "F11987831",
    name: "No-Code SaaS — 0% Churn ($50K)",
    verdict: "INVESTIGATE — zero churn is exceptional",
    verdictColor: "amber",
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
    verdict: "INVESTIGATE — 9yr automated lead gen",
    verdictColor: "amber",
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
    verdict: "INVESTIGATE — automation-native, cheap entry",
    verdictColor: "amber",
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
