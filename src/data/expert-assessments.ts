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
}

export const EXPERT_ASSESSMENTS: ExpertAssessment[] = [
  {
    id: "92246",
    name: "Ace Hoops YouTube (WNBA)",
    verdict: "STRONG BUY — CORE PICK",
    verdictColor: "emerald",
    price: "$70,599",
    monthlyProfit: "$2,900",
    annualROI: "49%",
    trendProfit: "Seasonal — peak $5,444 Aug 25",
    trendTraffic: "896K views/mo",
    highlights: [
      "WNBA coverage — one of the fastest growing sports leagues globally",
      "896K monthly views, 235K average views per video — exceptional engagement",
      "8:02 average watch time — high RPM potential",
      "Verified Chart.js data: grew $1,609 (Nov 24) → $5,444 (Aug 25 WNBA peak)",
      "Super cheap production: €70/video (Filipino freelancers + AI voiceover)",
      "Price dropped to $70K from $86K — seller motivated",
      "23x multiple on seasonal average = undervalued",
      "Caitlin Clark effect driving massive audience interest",
      "Off-season (Feb 26): $2,689/mo — within expected range for March off-season",
    ],
    risks: [
      "Only 19 months old — limited track record",
      "93% algorithm-dependent (Browse 60% + Suggested 34%)",
      "SEASONAL: WNBA season (May–Oct) drives peak revenue; off-season dips to $1,600–2,700",
      "Sports commentary niche — trends can shift with player popularity",
      "Seller owns competing men's basketball channel",
      "100% YouTube AdSense — no revenue diversification yet",
      "YoY off-season: Nov -24%, Dec +26%, Jan -34%, Feb +2% — mixed signals on growth",
    ],
    recommendation:
      "Best single pick in the market. WNBA is experiencing unprecedented growth (Caitlin Clark effect). Verified data shows seasonal pattern: $1,609 (off-season) → $5,444 (in-season peak). This is NORMAL for a sports channel — not a declining business. Buying in March means you'll catch the full 2026 season starting May. Offer $60K, settle $62K. The seasonal nature requires a complementary non-seasonal business for year-round income stability. Pair with faceless Tech YouTube (#90544) for a fully YouTube-native portfolio, or with photopacks.ai if you want SaaS diversification.",
    aiPlan:
      "Claude writes all commentary scripts based on WNBA game results, player stories, and trending topics. Filipino freelancers handle editing (€40), scripting review (€20), and clipping (€10). AI generates voiceovers. Owner reviews final videos and thumbnails. 6hrs/week in-season, 3hrs off-season. Growth: expand to college basketball, add sponsorships.",
  },
  {
    id: "90544",
    name: "3× Faceless Tech YouTube",
    verdict: "BUY IF NEGOTIATED",
    verdictColor: "blue",
    price: "$93,608",
    monthlyProfit: "$3,428",
    annualROI: "44%",
    trendProfit: "-33% from Jan 25 peak",
    trendTraffic: "Tech tutorial niche",
    highlights: [
      "THREE faceless channels — diversified risk across topics",
      "Tech tutorial content — AI scripts perfectly (no persona, no face)",
      "3-year track record since 2022",
      "~85% profit margin — low operating cost",
      "10,000+ existing videos — established library with long-tail traffic",
      "Only ~1hr/week owner time required (outsourced production)",
      "No personal brand risk — any operator can run this",
    ],
    risks: [
      "Revenue DECLINING: peaked Jan 25 at $5,058/mo, now ~$3,428 (Dec 25) — 33% drop",
      "Last 6-month avg ~$3,389 vs EF-quoted 12-mo avg (~$4,200) — EF number overstates",
      "Asking $93K at 24x on inflated average — real multiple on current run rate is ~27x",
      "YouTube algorithm single-platform dependency",
      "Tech tutorial niche faces AI disruption risk (ChatGPT renders tutorials obsolete faster)",
      "Close to budget limit if combined with Ace Hoops",
    ],
    recommendation:
      "Verified data: revenue declining 33% from Jan 25 peak ($5,058) to Dec 25 ($3,428). EF's quoted 12-month average masks this drop. At current $3,428/month run rate, fair value is ~$79K (23x). Offer $72K, settle $79K. The key selling point is the 3-channel structure (diversified risk) and faceless format (AI/VA manageable). Tech tutorial content is exactly what Claude can generate at scale. Pair with Ace Hoops for a fully YouTube-native, AI-managed portfolio. Combined: $141K within the $160K budget.",
    aiPlan:
      "Claude scripts tech tutorials based on trending topics (Python, AI tools, cybersecurity). VA edits/renders videos from templates. Automated posting schedule. Owner reviews weekly analytics (1hr). No filming required — all screen recordings + AI voiceover. Growth: expand to new tech sub-niches, add YouTube memberships.",
  },
  {
    id: "89555",
    name: "photopacks.ai (SaaS)",
    verdict: "CAUTION — DECLINING",
    verdictColor: "amber",
    price: "$76,200",
    monthlyProfit: "$2,513",
    annualROI: "40%",
    trendProfit: "-37% from Feb 25 peak",
    trendTraffic: "-78% sessions (Oct→Nov 25)",
    highlights: [
      "SaaS model — subscription revenue buffers traffic drops short-term",
      "Diversified revenue channels: email, direct, paid, organic",
      "AI headshot generator — clear product-market fit proven by 4,400+ orders",
      "86% profit margin",
      "Tech stack (Python/Django + React/Next.js) suits a technical buyer",
      "695 referring domains — strong backlink profile",
    ],
    risks: [
      "CRITICAL: Traffic crashed from 48,984 sessions (Oct 25) to ~10,717 (Feb 26) — 78% drop",
      "Profit declining: peak Feb 25 $3,965 → Feb 26 $2,513 (-37%)",
      "New customer acquisition drying up — subscriptions will churn without new signups",
      "32x multiple at asking price is expensive for a business in traffic free-fall",
      "AI headshot market is extremely competitive (Dreamwave, HeadShotPro, LinkedIn native tools)",
      "Fast-moving AI space — product may be commoditised within 12-18 months",
    ],
    recommendation:
      "Verified data (Chart.js) shows traffic crashed 78% in November 2025 — from 49K sessions in Oct to ~11K in Nov-Feb. This is not a blip. The SaaS subscription model has buffered revenue so far ($3,965 peak → $2,513 now), but without new signups the churn will accelerate. At $76,200 asking price, the 32x multiple on declining metrics is unjustifiable. Pass unless you can negotiate to $45-50K (~19-20x on current run rate) AND you have a clear customer acquisition plan. Only consider if Ace Hoops and Tech YouTube aren't available.",
    aiPlan:
      "If purchased at $45-50K: Claude handles customer support. VA manages Reddit marketing and social channels. Buyer maintains Django/AWS stack. Priority: rebuild SEO traffic and add B2B outreach. 5hrs/week.",
  },
  {
    id: "92180",
    name: "ahoyvietnam.com",
    verdict: "DO NOT BUY — PERSONAL BRAND",
    verdictColor: "red",
    price: "$86,459",
    monthlyProfit: "$2,790",
    annualROI: "39%",
    trendProfit: "+41%",
    trendTraffic: "+581%",
    highlights: [
      "581% traffic growth — strongest growth trajectory reviewed",
      "86.6% Google organic search traffic",
      "27,000+ Facebook group members",
      "Display ads not yet implemented — untapped upside",
      "89% profit margin",
    ],
    risks: [
      "ELIMINATED: Seller 'Anthony' (US expat in Vietnam) is the face of the site — photo, bio, Google Local Guide credentials throughout",
      "27K Facebook group members know Anthony personally — community would disengage after sale",
      "Affiliate accounts not transferable",
      "15hrs/week for solo ops",
      "Single-destination niche (Vietnam only)",
    ],
    recommendation:
      "ELIMINATED. Despite strong growth, the site is built around Anthony's personal identity as a Vietnam expat. His face, bio, and local credibility are central to why readers trust the content. The 27K Facebook group follows HIM, not the brand. A new owner without Vietnam residency cannot authentically continue. Do not buy.",
    aiPlan:
      "N/A — eliminated from consideration.",
  },
  {
    id: "92105",
    name: "homemadegraceful.com",
    verdict: "DO NOT BUY — ELIMINATED",
    verdictColor: "red",
    price: "$78,487",
    monthlyProfit: "$2,907",
    annualROI: "44%",
    trendProfit: "+44%",
    trendTraffic: "+206%",
    highlights: [
      "206% traffic growth",
      "100% profit margin — near zero operating costs",
      "Evergreen home/lifestyle niche",
    ],
    risks: [
      "ELIMINATED: Content requires a female persona — writer's voice and style are embedded throughout; cannot swap to a generic/male author without destroying authenticity",
      "92% traffic from Pinterest — extreme single-platform dependency",
      "Pinterest algorithm changes would kill the business overnight",
      "Requires 20hrs/week content creation (needs VA with the right voice/style)",
      "Only 18 months old — no track record outside Pinterest",
    ],
    recommendation:
      "ELIMINATED. Two fatal flaws: (1) The content is written in a female domestic voice — the brand persona is inseparable from the content style; swapping the writer would destroy authenticity and reader trust. (2) 92% Pinterest dependency — any algorithm change ends the business. Pass.",
    aiPlan:
      "N/A — eliminated from consideration.",
  },
];
