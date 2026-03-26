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
    id: "92180",
    name: "ahoyvietnam.com",
    verdict: "CAUTION — PERSONAL BRAND",
    verdictColor: "amber",
    price: "$86,459",
    monthlyProfit: "$2,790",
    annualROI: "39%",
    trendProfit: "+41%",
    trendTraffic: "+581%",
    highlights: [
      "581% traffic growth — strongest growth trajectory of all finalists",
      "86.6% Google organic search traffic — best quality traffic source",
      "27,000+ Facebook group members across 3 Vietnam travel communities",
      "Display ads not yet implemented — adding Mediavine/Ezoic could add $1,000-2,000/mo immediately",
      "89% profit margin, US-registered, clean transfer",
      "Vietnam tourism is a rapidly growing market",
    ],
    risks: [
      "CRITICAL: Personal brand — seller 'Anthony' (US expat in Vietnam) is the face of the site with his photo, bio, and Google Local Guide credentials throughout",
      "27K Facebook group members know Anthony personally — community could disengage after sale",
      "Affiliate accounts not transferable — buyer must create own accounts before transfer",
      "Revenue recognized on accrual basis — travel cancellations apply conservative adjustment",
      "15hrs/week for solo ops (content writing + 3 Facebook group moderation)",
      "Single-destination niche (Vietnam only) — concentration risk",
    ],
    recommendation:
      "Strong SEO fundamentals, exceptional growth, and untapped monetization (no display ads yet). BUT the site is built around the seller's personal identity as 'Anthony', a US expat living in Da Nang. His face, bio, and Google Local Guide credibility are central to the site's authority. The 27K Facebook group members follow HIM. A new owner without Vietnam residency will struggle to maintain community authenticity. Consider only if you're comfortable rebranding the site or hiring a Vietnam-based writer as the new face. Negotiate to $70-75K given transition complexity.",
    aiPlan:
      "VA moderates Facebook groups (2hrs/day). Claude writes new travel guides in a neutral editorial style (removing personal pronouns, phasing out Anthony's persona). VA replies to comments and group posts. Owner manages affiliate account setup and site rebrand (1-2 month transition period). Display ads added in month 1. Target: 5hrs/week owner time post-transition.",
  },
  {
    id: "92105",
    name: "homemadegraceful.com",
    verdict: "STRONG BUY",
    verdictColor: "emerald",
    price: "$78,487",
    monthlyProfit: "$2,907",
    annualROI: "44%",
    trendProfit: "+44%",
    trendTraffic: "+206%",
    highlights: [
      "Fastest growing listing on the marketplace — profit up 44%, traffic up 206%",
      "100% profit margin — virtually zero operating costs",
      "Pinterest-driven traffic — diversified from Google algorithm risk",
      "Home/lifestyle niche is evergreen and AI can write all content",
      "Only 27x multiple — underpriced for a business growing this fast",
    ],
    risks: [
      "Only 18 months old — limited track record",
      "92% traffic from Pinterest — single platform dependency",
      "Requires 20hrs/week content creation (needs VA)",
      "Mediavine ad network has 50K sessions/month minimum requirement",
      "Registered in Vietnam — may complicate business transfer",
    ],
    recommendation:
      "Best growth opportunity on the marketplace. The 206% traffic growth is exceptional. Negotiate to $65-70K. Hire a VA (£400-500/mo) to handle content + Pinterest. AI writes all articles. Within 6 months this could be doing $4-5K/month if trends continue. Main risk is Pinterest algorithm dependency — mitigate by building email list and expanding to other social channels.",
    aiPlan:
      "Claude writes 3-5 blog posts per day on home decor, garden, lifestyle topics. VA creates Pinterest pins using Canva templates, schedules via Tailwind. Owner reviews analytics weekly (1hr). Total owner time: 2hrs/week.",
  },
  {
    id: "89555",
    name: "photopacks.ai (SaaS)",
    verdict: "RECONSIDERED BUY",
    verdictColor: "emerald",
    price: "$76,200",
    monthlyProfit: "$2,381",
    annualROI: "37%",
    trendProfit: "+30%",
    trendTraffic: "+64%",
    highlights: [
      "Profit GROWING 30%, traffic GROWING 64% — verified trend data",
      "AI headshot generator — SaaS with one-time purchase model",
      "Very diversified traffic: 30% email, 25% direct, 10% paid, 8% organic, 8% referral",
      "86% profit margin, 4,400+ orders since inception",
      "Tech stack: Python/Django + React/Next.js + Docker + AWS — buyer is a tech professional",
      "No paid marketing — uses SEO + Reddit marketing (AI automatable)",
      "695 referring domains, strong backlink profile",
    ],
    risks: [
      "AI headshot market is extremely competitive (Dreamwave, HeadShotPro)",
      "Fast-moving AI space — technology could be disrupted",
      "10hrs/week work required — moderate effort",
      "32x multiple is expensive relative to profit",
      "Needs ongoing web app maintenance (but buyer has the skills)",
    ],
    recommendation:
      "Initially dismissed due to AI market competition, but VERIFIED DATA shows 30% profit growth and 64% traffic growth — the numbers don't lie. The diversified traffic (no single source >30%) is the best traffic profile of any listing analyzed. The tech stack (Django, Next.js, Docker) aligns perfectly with the buyer's cybersecurity/Linux engineering background. Offer $60-65K. Main risk is AI market disruption, but the brand and SEO moat provide protection.",
    aiPlan:
      "Claude handles customer support emails via templates. VA manages Reddit marketing and social media. Buyer handles technical maintenance (familiar stack). Growth: expand B2B outreach, add new AI photo products. 5hrs/week with VA support.",
  },
  {
    id: "92062",
    name: "Unseen Horrors YouTube",
    verdict: "CONDITIONAL KEEP",
    verdictColor: "amber",
    price: "$124,255",
    monthlyProfit: "$5,177",
    annualROI: "50%",
    trendProfit: "+14%",
    trendTraffic: "393K views/mo",
    highlights: [
      "Growing — profit and revenue both up 14%",
      "107K subscribers, 175 videos, 8:41 avg watch time (excellent)",
      "99% profit margin — almost zero operating costs",
      "AI-generated horror stories — perfect for Claude to write",
      "Multiple videos over 500K views — proven viral potential",
      "Comprehensive SOPs and playbook included",
    ],
    risks: [
      "20 HOURS/WEEK required — practically part-time job",
      "Revenue drops when publishing stops (seller confirmed Feb-Mar 2025 dip)",
      "Only 16 months old — limited track record",
      "Algorithm-dependent (Browse 60%, Suggested 27%)",
      "Celebrity horror stories content could face legal issues",
      "At $124K, most expensive listing in consideration",
    ],
    recommendation:
      "The 20hrs/week is the dealbreaker for passive management. However, the content is perfect for AI (horror stories) and the engagement metrics are strong. Only buy if you can commit to hiring a dedicated VA (£500-600/mo) who handles ALL production. Negotiate to $95-100K. This is NOT passive — it's a content machine that needs feeding. But if you feed it, it pays well.",
    aiPlan:
      "Claude writes ALL scripts (horror stories are its strength). VA records voiceover via ElevenLabs, edits video with templates, designs thumbnails, uploads. Owner does topic selection and quality review. Could reduce to 8-10hrs/week with good VA. But still higher effort than content sites.",
  },
  {
    id: "89017",
    name: "Jackson Ridge KDP",
    verdict: "DOWNGRADED — CLOSE",
    verdictColor: "red",
    price: "$27,471",
    monthlyProfit: "$1,717",
    annualROI: "75%",
    trendProfit: "-35%",
    trendTraffic: "N/A",
    highlights: [
      "Very cheap at $27K — low absolute risk",
      "16x multiple = high ROI on paper",
      "AI-written books, 1hr/week — extremely passive",
      "Last month had a $9.4K profit spike",
    ],
    risks: [
      "VERIFIED 9-month trend: profit DOWN 35%, revenue DOWN 31%",
      "The $9.4K spike was anomalous — overall trajectory is negative",
      "Only 1 year 8 months old — unproven",
      "Niche (survival/religion) is narrow",
      "KDP account transfer has 30-90 day payment delays",
      "Amazon can suspend accounts for ToS violations",
    ],
    recommendation:
      "CLOSE. Initially kept as a budget pick based on last month's spike, but the verified 9-month trend shows -35% profit decline. One good month doesn't make a trend. The overall direction is down. At $27K the absolute risk is low, but there are better uses for that money.",
    aiPlan: "N/A — recommended to close this listing.",
  },
  {
    id: "92246",
    name: "Ace Hoops YouTube (WNBA)",
    verdict: "STRONG BUY",
    verdictColor: "emerald",
    price: "$70,599",
    monthlyProfit: "$3,070",
    annualROI: "52%",
    trendProfit: "+17%",
    trendTraffic: "896K views/mo",
    highlights: [
      "WNBA coverage — one of the fastest growing sports leagues globally",
      "896K monthly views, 235K average views per video — exceptional engagement",
      "8:02 average watch time — high RPM potential",
      "Profit growing 17%, revenue growing 15% — verified upward trend",
      "Super cheap production: €70/video (Filipino freelancers + AI voiceover)",
      "Price dropped to $70K from $86K — seller motivated",
      "23x multiple with growth = undervalued",
      "Caitlin Clark effect driving massive audience interest",
    ],
    risks: [
      "Only 19 months old — limited track record",
      "93% algorithm-dependent (Browse 60% + Suggested 34%)",
      "Seasonal business — WNBA season drives most revenue",
      "Sports commentary niche — trends can shift with player popularity",
      "Seller owns competing men's basketball channel",
      "100% YouTube AdSense — no revenue diversification yet",
    ],
    recommendation:
      "The WNBA is experiencing unprecedented growth driven by the Caitlin Clark effect. This channel is perfectly positioned in a growing niche with incredible engagement (235K avg views/video). At $70K (price already dropped from $86K), this is undervalued for a growing channel. Production costs are dirt cheap (€70/video). Offer $60-65K. The seasonal nature means you'll have quieter months, but the off-season content (trades, draft, player narratives) fills the gap. Pair with another non-seasonal business for year-round income.",
    aiPlan:
      "Claude writes all commentary scripts based on WNBA game results, player stories, and trending topics. Filipino freelancers handle editing (€40), scripting review (€20), and clipping (€10). AI generates voiceovers. Owner reviews final videos and thumbnails. 6hrs/week in-season, 3hrs off-season. Growth: expand to college basketball, add sponsorships.",
  },
];
