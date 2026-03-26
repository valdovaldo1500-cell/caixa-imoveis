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
    id: "88055",
    name: "soberish.co",
    verdict: "BUY",
    verdictColor: "emerald",
    price: "$67,828",
    monthlyProfit: "$2,055",
    annualROI: "36%",
    trendProfit: "+15%",
    trendTraffic: "+21%",
    highlights: [
      "10-year-old blog (since 2016) — battle-tested through multiple Google updates",
      "GROWING 15% profit, 21% traffic — rare for an established site",
      "Diversified: display ads + affiliate + Amazon Associates (triple monetization)",
      "Balanced traffic: 40% organic search + 37% Pinterest + 20% direct",
      "Already has VA handling daily tasks — truly passive (4hrs/week owner)",
      "4,839 email subscribers + digital products included",
      "Health/wellness niche is evergreen and AI-friendly",
    ],
    risks: [
      "33x multiple is on the higher side for the profit level",
      "Sobriety niche is somewhat narrow — limited scaling potential",
      "Mediavine minimum traffic requirement could be a transfer issue",
      ".co domain (not .com) — slightly less authoritative",
    ],
    recommendation:
      "Best risk-adjusted investment. Growing AND established is the rarest combination. The existing VA means you can take over with minimal disruption. Offer $55-60K (20-25% below asking). The health/wellness content is perfect for AI writing. This is the safest pick for someone who wants reliable monthly cash flow with minimal effort.",
    aiPlan:
      "Existing VA continues daily operations. Claude writes new blog posts and updates old ones for SEO. VA manages Pinterest + email campaigns. Owner oversight: 2hrs/week checking analytics. Monetization can be expanded with digital courses written by AI.",
  },
  {
    id: "92295",
    name: "Alex Griffin YouTube",
    verdict: "SPECULATIVE BUY",
    verdictColor: "blue",
    price: "$95,209",
    monthlyProfit: "$5,289",
    annualROI: "66%",
    trendProfit: "NEW",
    trendTraffic: "1.7M views/mo",
    highlights: [
      "18x multiple = cheapest per-profit-dollar on the marketplace",
      "1.68M monthly views, 262K average views per video — massive engagement",
      "7:54 average watch time — exceptional for YouTube (high RPM)",
      "AI scripts already used — proven AI+VA workflow",
      "Full contractor team (editors, voiceover, thumbnails) willing to stay",
      "60.7K subs growing +4,346/month",
      "Clean copyright history despite commentary niche",
    ],
    risks: [
      "Only 16 months old — very limited track record",
      "72% Browse Features traffic — heavily algorithm-dependent",
      "100% YouTube AdSense — zero revenue diversification",
      "Family Guy commentary — niche could saturate or face copyright claims",
      "6hrs/week required — more than content sites",
      "Entertainment content is NOT evergreen — trends can shift quickly",
    ],
    recommendation:
      "Highest ROI potential but highest risk. At 18x you're getting $5.3K/month for $95K. The engagement metrics are genuinely impressive. BUT this is a bet on the YouTube algorithm continuing to favor this channel. Negotiate hard to $75-80K. If you buy, immediately diversify revenue: add sponsorships ($2-5K per video possible), affiliate links in descriptions, and expand to other animated shows. Don't put all your money here.",
    aiPlan:
      "Claude writes video scripts (already proven). Contractors handle editing, voiceover, thumbnails. Owner selects topics and does quality review (5-6hrs/week). Growth: expand to Simpsons, South Park, other animated shows for audience diversification.",
  },
  {
    id: "90449",
    name: "Quick Shift YouTube",
    verdict: "VALUE BUY",
    verdictColor: "blue",
    price: "$44,742",
    monthlyProfit: "$3,196",
    annualROI: "86%",
    trendProfit: "-5%",
    trendTraffic: "stable",
    highlights: [
      "14x multiple = absolute lowest on marketplace (86% annual ROI)",
      "4 years old — proven track record",
      "63K subscribers, 343 videos — substantial content library",
      "Team of 3 contractors with SOPs in place — turnkey operation",
      "Only $44K — affordable entry, leaves budget for other investments",
      "Automotive content has broad appeal",
    ],
    risks: [
      "Profit declining 5%, revenue declining 15% — negative trend",
      "Has received copyright strikes (won on appeal, but risky pattern)",
      "Car TV show commentary could face more copyright challenges",
      "58% Browse Features — algorithm-dependent",
      "Automotive entertainment niche may not be sustainable long-term",
    ],
    recommendation:
      "Best value play. At $44K this is almost disposable money relative to your budget. Even if it declines 20% you're still making $2,500/mo on a $44K investment. Buy at asking price (already cheap). Use it as a cash cow while you learn YouTube operations. Could pair with Alex Griffin for a 2-channel YouTube portfolio. The copyright strike history is the main concern — verify this thoroughly with the seller.",
    aiPlan:
      "Claude writes commentary scripts. Existing team of 3 (editor, scriptwriter, thumbnail) continues working via SOPs. Owner picks 1-2 topics per week. Total time: 4hrs/week. Revenue can be supplemented with affiliate links to car products.",
  },
  {
    id: "92391",
    name: "atlasandboots.com",
    verdict: "HOLD / NEGOTIATE",
    verdictColor: "amber",
    price: "$82,015",
    monthlyProfit: "$2,412",
    annualROI: "35%",
    trendProfit: "-6%",
    trendTraffic: "-28%",
    highlights: [
      "Award-winning travel blog established in 2014 (12 years old)",
      "Strong brand recognition and authority in outdoor travel niche",
      "Display advertising — passive income model",
      "34x multiple but profit is relatively stable (only -6%)",
      "Travel content is evergreen — people always travel",
    ],
    risks: [
      "Traffic declining 28% — concerning trend",
      "Profit only slightly down (-6%) suggesting RPM improvements offsetting traffic loss",
      "34x multiple is expensive for a declining business",
      "Google algorithm dependency for organic traffic",
      "AI-generated travel content may lack the personal touch that made this blog successful",
    ],
    recommendation:
      "Only worth it at a significant discount. The 28% traffic decline is a red flag. Offer $55-60K maximum (30% below asking). The brand has value and travel is evergreen, but you're buying a declining asset. If the seller won't negotiate significantly, walk away. There are better options. If purchased cheaply enough, AI can refresh old content and Pinterest can supplement declining Google traffic.",
    aiPlan:
      "Claude refreshes and expands existing travel content library. VA manages Pinterest and social media to diversify traffic sources away from Google. Owner oversight: 2hrs/week. Build email list aggressively to reduce platform dependency.",
  },
  {
    id: "90544",
    name: "Thrive Media YouTube",
    verdict: "SOLID BUY",
    verdictColor: "blue",
    price: "$93,608",
    monthlyProfit: "$3,900",
    annualROI: "50%",
    trendProfit: "stable",
    trendTraffic: "stable",
    highlights: [
      "3 YouTube channels — built-in diversification",
      "Only 1 hour/week owner involvement — most passive listing analyzed",
      "10,000+ video library — massive long-tail content moat",
      "85% profit margin",
      "YouTube Search traffic (not algorithm) — more stable than Browse",
      "Freelancer team manages everything — true absentee ownership",
      "Includes Spanish language channel — growth opportunity",
    ],
    risks: [
      "55-second average watch time — very short, low RPM potential",
      "Monthly views at 409K (main) — not spectacular for 36K subs",
      "Tech tutorial niche increasingly competed by AI tools (ChatGPT, Gemini)",
      "Last month profit ($3,428) slightly below average ($3,900)",
      "Registered in UAE — potential complications for UK/BR entities",
    ],
    recommendation:
      "Most passive option available. If you want to buy ONE business and barely think about it, this is it. The 1hr/week commitment is verified. The freelancer team does everything. Offer $80-85K. The risk is that AI tools (ChatGPT) may reduce demand for 'how to' tutorial videos over time, but the 10K video library provides a long-tail moat that's hard to replicate. The Spanish channel is an untapped growth lever — your Portuguese could help expand to a PT-BR channel too.",
    aiPlan:
      "Freelancers continue all video production autonomously. Claude can generate keyword research and content briefs. Owner reviews weekly analytics report (1hr/week). Growth: add Portuguese language channel leveraging existing content.",
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
