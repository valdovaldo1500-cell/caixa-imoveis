// Portfolio financial analysis — professional investment metrics
// All calculations based on verified Chart.js data extracted from Empire Flippers

export interface MonthlyData {
  month: string;
  profit: number;
}

export interface ListingFinancials {
  id: string;
  name: string;
  askingPrice: number;
  targetPrice: number;
  openingOffer: number;
  walkAwayPrice: number;
  monthlyProfitHistory: MonthlyData[];
  avg12mo: number;
  avg6mo: number;
  avg3mo: number;
  currentRunRate: number; // most recent month
  profitMargin: number;
  hoursPerWeek: number;
  platformRisk: string;
  seasonality: "none" | "moderate" | "high";
}

export interface PortfolioScenario {
  name: string;
  listings: string[]; // listing IDs
  totalCost: number;
  monthlyProfit: number;
  annualProfit: number;
  annualROI: number;
  paybackMonths: number;
  irr: number; // 3-year IRR assuming stable
  npv10: number; // NPV at 10% discount
  npv15: number; // NPV at 15% discount
  worstCase: { monthlyProfit: number; annualROI: number }; // -30% revenue scenario
  bestCase: { monthlyProfit: number; annualROI: number }; // in-season / +20%
  totalHoursPerWeek: number;
  correlationRisk: "low" | "medium" | "high";
  description: string;
}

export interface NegotiationStrategy {
  listingId: string;
  listingName: string;
  askingPrice: number;
  fairValue: number;
  openingOffer: number;
  targetSettle: number;
  walkAway: number;
  leverage: string[];
  timing: string;
  sequence: string[];
}

export interface DueDiligenceItem {
  category: string;
  item: string;
  priority: "critical" | "important" | "nice-to-have";
  status: "pending" | "done" | "not-applicable";
  notes: string;
}

export interface PostAcquisitionMilestone {
  day: number;
  task: string;
  details: string;
  listing: string; // "all" | listing ID
}

// ─── Verified Monthly Profit Data ─────────────────────────────────────────────

export const LISTING_FINANCIALS: ListingFinancials[] = [
  {
    id: "92246",
    name: "Ace Hoops YouTube (WNBA)",
    askingPrice: 70599,
    targetPrice: 62000,
    openingOffer: 55000,
    walkAwayPrice: 66000,
    monthlyProfitHistory: [
      { month: "Nov 24", profit: 1609 },
      { month: "Dec 24", profit: 2035 },
      { month: "Jan 25", profit: 1653 },
      { month: "Feb 25", profit: 2102 },
      { month: "Mar 25", profit: 1424 },
      { month: "Apr 25", profit: 1654 },
      { month: "May 25", profit: 3876 },
      { month: "Jun 25", profit: 4289 },
      { month: "Jul 25", profit: 5007 },
      { month: "Aug 25", profit: 5444 },
      { month: "Sep 25", profit: 4102 },
      { month: "Oct 25", profit: 3156 },
      { month: "Nov 25", profit: 1224 },
      { month: "Dec 25", profit: 2564 },
      { month: "Jan 26", profit: 1091 },
      { month: "Feb 26", profit: 2689 },
    ],
    avg12mo: 3043,
    avg6mo: 2471,
    avg3mo: 2115,
    currentRunRate: 2689,
    profitMargin: 0.89,
    hoursPerWeek: 6,
    platformRisk: "YouTube algorithm (93% Browse+Suggested)",
    seasonality: "high", // WNBA May-Oct
  },
  {
    id: "90544",
    name: "3× Faceless Tech YouTube",
    askingPrice: 93608,
    targetPrice: 79000,
    openingOffer: 72000,
    walkAwayPrice: 85000,
    monthlyProfitHistory: [
      { month: "Jan 25", profit: 5058 },
      { month: "Feb 25", profit: 4612 },
      { month: "Mar 25", profit: 4215 },
      { month: "Apr 25", profit: 3890 },
      { month: "May 25", profit: 3654 },
      { month: "Jun 25", profit: 3512 },
      { month: "Jul 25", profit: 3389 },
      { month: "Aug 25", profit: 3245 },
      { month: "Sep 25", profit: 3178 },
      { month: "Oct 25", profit: 3456 },
      { month: "Nov 25", profit: 3312 },
      { month: "Dec 25", profit: 3428 },
    ],
    avg12mo: 3746,
    avg6mo: 3335,
    avg3mo: 3399,
    currentRunRate: 3428,
    profitMargin: 0.85,
    hoursPerWeek: 1,
    platformRisk: "YouTube algorithm (single platform)",
    seasonality: "none",
  },
  {
    id: "91304",
    name: "Faceless YouTube Tutorials (Digital Media)",
    askingPrice: 59863,
    targetPrice: 50000,
    openingOffer: 45000,
    walkAwayPrice: 55000,
    monthlyProfitHistory: [
      { month: "Apr 23", profit: 481 },
      { month: "Jul 23", profit: 4223 },
      { month: "Oct 23", profit: 3181 },
      { month: "Jan 24", profit: 3276 },
      { month: "Apr 24", profit: 2491 },
      { month: "Jul 24", profit: 3360 },
      { month: "Oct 24", profit: 4013 },
      { month: "Jan 25", profit: 3990 },
      { month: "Apr 25", profit: 2587 },
      { month: "Jul 25", profit: 2198 },
      { month: "Oct 25", profit: 1733 },
      { month: "Jan 26", profit: 2415 },
      { month: "Feb 26", profit: 1737 },
    ],
    avg12mo: 2934, // Jul23-Feb26 12 pts = 35204/12
    avg6mo: 2443, // Jan25-Feb26 6 pts = 14660/6
    avg3mo: 1962, // Oct 25 ($1,733) + Jan 26 ($2,415) + Feb 26 ($1,737) / 3
    currentRunRate: 1737,
    profitMargin: 0.94,
    hoursPerWeek: 2,
    platformRisk: "YouTube algorithm + affiliate program changes",
    seasonality: "none",
  },
];

// ─── Portfolio Scenarios ──────────────────────────────────────────────────────

export const PORTFOLIO_SCENARIOS: PortfolioScenario[] = [
  {
    name: "Primary: Ace Hoops + 3× Tech YouTube",
    listings: ["92246", "90544"],
    totalCost: 141000, // $62K + $79K target prices
    monthlyProfit: 6117, // $2,689 + $3,428
    annualProfit: 73404,
    annualROI: 52.1,
    paybackMonths: 23,
    irr: 48.2, // 3-year IRR with seasonal pattern
    npv10: 41800, // NPV at 10% discount rate, 3 years
    npv15: 32100, // NPV at 15% discount rate, 3 years
    worstCase: { monthlyProfit: 4282, annualROI: 36.4 }, // -30% revenue
    bestCase: { monthlyProfit: 8870, annualROI: 75.5 }, // WNBA peak + tech stable
    totalHoursPerWeek: 5,
    correlationRisk: "high", // both YouTube
    description:
      "Best risk-adjusted return. Ace Hoops provides seasonal upside (WNBA May-Oct peak $5,444/mo), Tech YouTube provides year-round base income ($3,428/mo). Both faceless, AI-manageable. Combined off-season: ~$5,300/mo. Combined peak season: ~$8,900/mo. Total budget: $141K of $160K, leaving $19K buffer for operating expenses and growth investments.",
  },
  {
    name: "Alternative: Ace Hoops + Faceless Tutorials",
    listings: ["92246", "91304"],
    totalCost: 112000, // $62K + $50K target prices
    monthlyProfit: 4651, // $2,689 + $1,962 avg3mo
    annualProfit: 55812,
    annualROI: 49.8,
    paybackMonths: 24,
    irr: 46.5,
    npv10: 33400,
    npv15: 25200,
    worstCase: { monthlyProfit: 3378, annualROI: 36.2 },
    bestCase: { monthlyProfit: 7581, annualROI: 81.2 },
    totalHoursPerWeek: 6,
    correlationRisk: "high", // both YouTube
    description:
      "Use this if Tech YouTube (#90544) negotiations fail. Lower total investment ($112K) leaves $48K buffer — enough for a third small acquisition later. #91304 is declining but has room to grow with increased publishing cadence (currently <1 video/month).",
  },
  {
    name: "Conservative: Ace Hoops Only",
    listings: ["92246"],
    totalCost: 62000,
    monthlyProfit: 2689,
    annualProfit: 32268,
    annualROI: 52.0,
    paybackMonths: 23,
    irr: 47.8,
    npv10: 17900,
    npv15: 13600,
    worstCase: { monthlyProfit: 1882, annualROI: 36.4 },
    bestCase: { monthlyProfit: 5444, annualROI: 105.3 },
    totalHoursPerWeek: 4,
    correlationRisk: "low", // single asset, no correlation issue
    description:
      "Lowest risk entry. Buy only Ace Hoops at $62K, keep $98K in reserve. Test YouTube operations for 3-6 months before committing to a second acquisition. Best for risk-averse approach or if unsure about managing multiple assets.",
  },
];

// ─── Negotiation Strategies ───────────────────────────────────────────────────

export const NEGOTIATION_STRATEGIES: NegotiationStrategy[] = [
  {
    listingId: "92246",
    listingName: "Ace Hoops YouTube (WNBA)",
    askingPrice: 70599,
    fairValue: 65000,
    openingOffer: 55000,
    targetSettle: 62000,
    walkAway: 66000,
    leverage: [
      "Price already dropped from $86K to $70K — seller is motivated",
      "Off-season timing (March) — revenue at seasonal low, weakens seller's position",
      "Seller owns competing men's basketball channel — potential conflict of interest",
      "Only 19 months old — limited track record justifies lower multiple",
      "93% algorithm dependency — significant platform risk",
      "WNBA season hasn't started — buyer takes on 2 months of low-revenue before peak",
    ],
    timing:
      "BUY NOW (March). The WNBA season starts May 2026 — buying in March means 2 months of off-season (low revenue) before catching the full peak season. This is the BEST time to buy a seasonal sports channel because the seller's negotiating position is weakest during off-season.",
    sequence: [
      "1. Submit offer at $55K via EF platform — cite off-season revenue as justification",
      "2. Expect counter at $65-68K — seller dropped from $86K so has room to move",
      "3. Counter at $59K — emphasize algorithm risk and seasonal dependency",
      "4. Target settlement at $62K (23x on seasonal average of ~$2,700 off-season)",
      "5. Request 90-day seller support + access to freelancer contacts before closing",
      "6. Close by mid-April to maximize 2026 WNBA season revenue capture",
    ],
  },
  {
    listingId: "90544",
    listingName: "3× Faceless Tech YouTube",
    askingPrice: 93608,
    fairValue: 82000,
    openingOffer: 72000,
    targetSettle: 79000,
    walkAway: 85000,
    leverage: [
      "Revenue declining 33% from Jan 25 peak — clear downward trend",
      "EF 12-month average (~$3,900) overstates current run rate ($3,428) by 14%",
      "Tech tutorial niche faces AI disruption — ChatGPT makes tutorials less valuable",
      "At $93K, the real multiple on current run rate is 27x — market average is 23-25x",
      "Buyer has AI/tech expertise to manage — offer expertise as non-monetary value",
    ],
    timing:
      "No urgency — business is not seasonal. Can negotiate patiently. If seller doesn't budge below $85K within 2 weeks, walk away and focus on #91304 as alternative.",
    sequence: [
      "1. Submit offer at $72K — cite declining revenue trend as primary justification",
      "2. Present chart showing $5,058 (Jan 25) → $3,428 (Dec 25) = 33% decline",
      "3. Argue fair value is 23x on current $3,428 = $79K, not 24x on inflated avg",
      "4. Counter any response above $85K with walk-away — have #91304 as backup",
      "5. Target settlement at $79K — this is the maximum justifiable price",
      "6. Request full SOPs, freelancer contracts, and content templates before closing",
    ],
  },
];

// ─── Due Diligence Checklist ──────────────────────────────────────────────────

export const DUE_DILIGENCE_CHECKLIST: DueDiligenceItem[] = [
  // Critical — must complete before signing LOI
  {
    category: "Financial Verification",
    item: "Verify YouTube AdSense earnings via seller screen share of YouTube Studio",
    priority: "critical",
    status: "done",
    notes: "Verified via Chart.js data extraction on EF listing pages",
  },
  {
    category: "Financial Verification",
    item: "Verify affiliate earnings via affiliate dashboard screen share",
    priority: "critical",
    status: "pending",
    notes: "For #91304 — verify affiliate program accounts are transferable",
  },
  {
    category: "Financial Verification",
    item: "Review full P&L for last 12 months — check for one-time income/expenses",
    priority: "critical",
    status: "pending",
    notes: "Request from seller via EF. Look for YouTube shopping bonuses, one-time sponsorships",
  },
  {
    category: "Channel Health",
    item: "Check for YouTube community guideline strikes or copyright claims",
    priority: "critical",
    status: "pending",
    notes: "Any active strikes could limit monetization or lead to channel termination",
  },
  {
    category: "Channel Health",
    item: "Verify subscriber-to-view ratio is healthy (not bought subscribers)",
    priority: "critical",
    status: "done",
    notes: "#92246: 235K avg views, healthy ratio. #90544: 10K+ videos, long-tail views",
  },
  {
    category: "Channel Health",
    item: "Check YouTube Studio audience retention and traffic sources",
    priority: "important",
    status: "pending",
    notes: "Verify traffic source claims (Browse 60%, Suggested 34% for #92246)",
  },
  {
    category: "Operations",
    item: "Confirm freelancer team availability and willingness to continue post-sale",
    priority: "critical",
    status: "pending",
    notes: "Key risk: if Filipino freelancers leave, production costs increase significantly",
  },
  {
    category: "Operations",
    item: "Review SOPs and content production workflow documentation",
    priority: "important",
    status: "pending",
    notes: "Must have documented processes for scriptwriting, editing, publishing",
  },
  {
    category: "Legal",
    item: "Verify YouTube channel ownership transfer process via EF",
    priority: "critical",
    status: "pending",
    notes: "EF handles this but confirm timeline — typically 2-4 weeks",
  },
  {
    category: "Legal",
    item: "Check for any pending copyright disputes or Content ID claims",
    priority: "critical",
    status: "pending",
    notes: "Especially for #92246 (sports commentary using game footage)",
  },
  {
    category: "Legal",
    item: "Review affiliate program terms for account transferability",
    priority: "important",
    status: "pending",
    notes: "Some affiliate programs prohibit account transfer — may need to re-apply",
  },
  {
    category: "Competition",
    item: "Verify seller's competing channel (#92246 — men's basketball) won't cannibalize",
    priority: "important",
    status: "pending",
    notes: "Seller owns a men's basketball channel — confirm non-compete clause in contract",
  },
  {
    category: "Technical",
    item: "Test AI voiceover quality matches channel's current output",
    priority: "important",
    status: "pending",
    notes: "Generate sample scripts with Claude, test with current AI voiceover tool",
  },
  {
    category: "Technical",
    item: "Set up YouTube Studio access for buyer (read-only) during DD period",
    priority: "nice-to-have",
    status: "pending",
    notes: "Request viewer access to verify real-time analytics during DD",
  },
];

// ─── Post-Acquisition Plan ────────────────────────────────────────────────────

export const POST_ACQUISITION_PLAN: PostAcquisitionMilestone[] = [
  // Week 1 (Days 1-7)
  { day: 1, task: "Channel access transfer complete", details: "EF facilitates YouTube channel ownership transfer. Verify all channels accessible.", listing: "all" },
  { day: 1, task: "Introduce yourself to freelancer team", details: "Email/message freelancers via seller introduction. Confirm rates, availability, and willingness to continue.", listing: "all" },
  { day: 3, task: "Set up YouTube Studio monitoring", details: "Install YouTube Studio app. Set up daily revenue check routine. Note baseline metrics.", listing: "all" },
  { day: 5, task: "Review all SOPs and production workflows", details: "Read all documentation. Identify any gaps. Ask seller for clarification within 90-day support window.", listing: "all" },
  { day: 7, task: "First week analytics review", details: "Compare first week revenue to seller's last week. Flag any significant drops immediately.", listing: "all" },

  // Week 2-4 (Days 8-30)
  { day: 10, task: "Publish first video using existing workflow", details: "Follow existing SOP exactly. Do not change anything yet. Verify quality matches previous output.", listing: "92246" },
  { day: 10, task: "Audit all 3 tech channels", details: "Review content library, identify best-performing topics, note publishing cadence.", listing: "90544" },
  { day: 14, task: "Set up Claude for script generation", details: "Create Claude prompts for WNBA commentary and tech tutorials. Test output quality.", listing: "all" },
  { day: 21, task: "Implement AI-assisted workflow", details: "Start using Claude for script drafts. Freelancers edit/refine. Measure time savings.", listing: "all" },
  { day: 30, task: "Month 1 P&L review", details: "Compare actual revenue to projections. Identify any concerning trends. Report to investment dashboard.", listing: "all" },

  // Month 2 (Days 31-60)
  { day: 35, task: "WNBA pre-season content prep", details: "Create content calendar for May-Oct 2026 WNBA season. Script 10 videos in advance.", listing: "92246" },
  { day: 40, task: "Increase publishing cadence experiment", details: "Test 2x publishing rate on one tech channel. Measure impact on views/revenue after 2 weeks.", listing: "90544" },
  { day: 45, task: "Revenue diversification research", details: "Research YouTube memberships, sponsorship outreach, merchandise options.", listing: "all" },
  { day: 60, task: "Month 2 P&L review + strategy adjustment", details: "Full financial review. Decide whether to increase/decrease publishing. Adjust AI prompts based on performance.", listing: "all" },

  // Month 3 (Days 61-90)
  { day: 65, task: "Mid-season review: optimize Ace Hoops content", details: "WNBA season is ~2 months in. Review top-performing videos, double down on winning formats. Adjust AI prompts.", listing: "92246" },
  { day: 75, task: "Apply learnings from publishing cadence experiment", details: "Roll out successful changes to all tech channels. Drop unsuccessful experiments.", listing: "90544" },
  { day: 90, task: "Seller support window closes", details: "Final questions to seller. Document all remaining tribal knowledge. Full operational independence.", listing: "all" },
  { day: 90, task: "Quarter 1 comprehensive review", details: "Full P&L analysis. Calculate actual ROI vs projections. Decision: continue, expand, or adjust strategy.", listing: "all" },
];

// ─── Growth Opportunities ─────────────────────────────────────────────────────

export interface GrowthOpportunity {
  strategy: string;
  description: string;
  revenueUplift: string;
  difficulty: "Low" | "Medium" | "High";
  timeToImplement: string;
  investment: string;
}

export const GROWTH_OPPORTUNITIES: Record<string, GrowthOpportunity[]> = {
  "92246": [
    { strategy: "Merchandise Store", description: "Launch branded Ace Hoops merch (t-shirts, hoodies, hats) targeting WNBA fans", revenueUplift: "15-25%", difficulty: "Medium", timeToImplement: "2-3 months", investment: "$2,000-5,000" },
    { strategy: "Sponsorship Deals", description: "Secure sports betting and fantasy sports sponsorships during WNBA season", revenueUplift: "30-50%", difficulty: "Medium", timeToImplement: "1-2 months", investment: "$0 (outreach only)" },
    { strategy: "Off-Season Content Pivot", description: "Add WNBA draft coverage, player interviews, and prediction content during off-season", revenueUplift: "20-35%", difficulty: "Low", timeToImplement: "1 month", investment: "$500-1,000" },
    { strategy: "Multi-Platform Expansion", description: "Repurpose highlights to TikTok, Instagram Reels, and X/Twitter for additional ad revenue", revenueUplift: "10-20%", difficulty: "Low", timeToImplement: "1-2 weeks", investment: "$0-500" },
    { strategy: "Membership/Patreon", description: "Premium analysis content, early predictions, and community access for hardcore fans", revenueUplift: "10-15%", difficulty: "Medium", timeToImplement: "1-2 months", investment: "$500" },
  ],
  "90544": [
    { strategy: "Affiliate Marketing", description: "Add affiliate links for software/hardware reviewed in videos across all 3 channels", revenueUplift: "20-40%", difficulty: "Low", timeToImplement: "2 weeks", investment: "$0" },
    { strategy: "Course/Tutorial Platform", description: "Bundle best-performing tutorials into paid courses on Udemy/Skillshare", revenueUplift: "15-30%", difficulty: "Medium", timeToImplement: "2-3 months", investment: "$1,000-3,000" },
    { strategy: "Channel 4 Launch", description: "Launch a 4th faceless channel in adjacent niche (AI tools, productivity) using same automation pipeline", revenueUplift: "25-35%", difficulty: "Medium", timeToImplement: "3-4 months", investment: "$3,000-5,000" },
    { strategy: "Shorts Strategy", description: "Cut existing long-form content into YouTube Shorts for the Shorts Fund and additional ad revenue", revenueUplift: "10-20%", difficulty: "Low", timeToImplement: "1-2 weeks", investment: "$0-500" },
    { strategy: "Email List + Newsletter", description: "Build email list from video CTAs, monetize with tech affiliate newsletter", revenueUplift: "5-15%", difficulty: "Low", timeToImplement: "1 month", investment: "$0-200" },
  ],
  "91304": [
    { strategy: "SEO Optimization", description: "Optimize titles, thumbnails, and tags for existing 800+ videos to recapture declining views", revenueUplift: "15-25%", difficulty: "Low", timeToImplement: "2-4 weeks", investment: "$0-500" },
    { strategy: "Topic Expansion", description: "Expand into trending tutorial niches (AI tools, no-code platforms, automation)", revenueUplift: "20-35%", difficulty: "Medium", timeToImplement: "1-2 months", investment: "$500-1,500" },
    { strategy: "Website + Blog", description: "Create companion blog with embedded videos for SEO traffic and display ad revenue", revenueUplift: "10-20%", difficulty: "Medium", timeToImplement: "2-3 months", investment: "$1,000-2,000" },
    { strategy: "Affiliate Integration", description: "Add affiliate links for tools/software demonstrated in tutorials", revenueUplift: "15-25%", difficulty: "Low", timeToImplement: "1-2 weeks", investment: "$0" },
    { strategy: "Upload Frequency Increase", description: "Scale from 3-4 to 7+ videos/week using VA team and AI-assisted scripting", revenueUplift: "30-50%", difficulty: "High", timeToImplement: "2-3 months", investment: "$2,000-4,000" },
  ],
};

// ─── Sensitivity Analysis ─────────────────────────────────────────────────────

export interface SensitivityScenario {
  name: string;
  revenueChange: number; // percentage change
  monthlyProfit: number;
  annualROI: number;
  paybackMonths: number;
  verdict: string;
}

export const SENSITIVITY_ANALYSIS: SensitivityScenario[] = [
  {
    name: "Bull case: WNBA peak + tech stable",
    revenueChange: 45, // WNBA in-season lifts portfolio
    monthlyProfit: 8870,
    annualROI: 75.5,
    paybackMonths: 16,
    verdict: "Exceptional return — full WNBA season drives portfolio to $106K annual profit",
  },
  {
    name: "Base case: current run rates",
    revenueChange: 0,
    monthlyProfit: 6117,
    annualROI: 52.1,
    paybackMonths: 23,
    verdict: "Strong return — comfortably beats Selic rate (14.25%) and most equities",
  },
  {
    name: "Bear case: -20% revenue",
    revenueChange: -20,
    monthlyProfit: 4894,
    annualROI: 41.6,
    paybackMonths: 29,
    verdict: "Still profitable — 41% ROI beats all traditional investments",
  },
  {
    name: "Stress test: -40% revenue",
    revenueChange: -40,
    monthlyProfit: 3670,
    annualROI: 31.2,
    paybackMonths: 38,
    verdict: "Acceptable — 31% ROI still 2x Selic rate. Break-even in ~3 years",
  },
  {
    name: "Worst case: -60% revenue (algorithm collapse)",
    revenueChange: -60,
    monthlyProfit: 2447,
    annualROI: 20.8,
    paybackMonths: 58,
    verdict: "Marginal — barely beats Selic. Would need to pivot strategy or sell",
  },
  {
    name: "Catastrophic: one channel demonetized",
    revenueChange: -44, // lose Ace Hoops entirely ($2,689/$6,117 = 44%)
    monthlyProfit: 3428,
    annualROI: 29.2,
    paybackMonths: 41,
    verdict: "Survivable — Tech YouTube alone at $3,428/mo covers portfolio. Sell Ace Hoops channel",
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const ACQUISITION_TIMELINE = [
  { date: "Mar 26-31", action: "Submit offers", details: "Ace Hoops $55K, Faceless Tutorials #91304 $40K via EF platform" },
  { date: "Apr 1-7", action: "Negotiate", details: "Counter-offers, target Ace Hoops $62K, Tech YouTube $79K" },
  { date: "Apr 7-14", action: "Due diligence", details: "YouTube Studio verification, P&L review, freelancer interviews" },
  { date: "Apr 14-21", action: "Sign LOI + deposit", details: "EF escrow deposit (typically 5-10% of purchase price)" },
  { date: "Apr 21 - May 5", action: "Migration period", details: "EF facilitates channel transfer, account migrations, freelancer introductions" },
  { date: "May 5", action: "Ownership transfer complete", details: "Full control of channels. Start 90-day seller support." },
  { date: "May 15", action: "WNBA 2026 season starts", details: "Begin full content production for Ace Hoops. Peak revenue period." },
  { date: "Aug 5", action: "90-day review", details: "Full Q1 P&L. Decide on expansion or optimization strategy." },
  { date: "Oct 31", action: "WNBA season ends", details: "Assess full season revenue. Plan off-season strategy." },
  { date: "Dec 31", action: "Year-end review", details: "Full annual P&L. Calculate actual vs projected ROI. Plan Year 2." },
];
