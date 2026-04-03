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
    trendProfit: "P&L verified: £266→£1,852 profit over 12 months, unbroken monthly growth — every single month higher than the last",
    trendTraffic: "15K monthly organic users, 140+ articles, 7% CTR (industry avg 2-4%) — Flippa-verified via GA. French vegan niche (vegourmet.fr). 100% SEO, 0 paid ads",
    highlights: [
      "P&L downloaded and verified: Feb 2025 £266 → Jan 2026 £1,852 — perfect growth curve, no dips",
      "Flippa-verified revenue, traffic and expenses — Stripe + GA connected",
      "97% margin: only £39/mo cost (hosting). Nearly pure cashflow",
      "140+ high-quality articles; 7% CTR is 2-3x industry average — strong content quality signal",
      "French vegan market: underserved niche with growing audience and affiliate/ebook monetization",
    ],
    risks: [
      "100% SEO dependency — single Google algorithm change could impact traffic",
      "1yr old site — limited history through core updates (but HCU targets thin content, this site has depth)",
      "Affiliate revenue may be concentrated in 1-2 programs — ask for affiliate dashboard breakdown",
      "No social following noted — no traffic diversification beyond organic search",
    ],
    recommendation:
      "BUY at full $8,000 ask — do not negotiate. This is the lowest-risk, highest-verified acquisition in the entire search. P&L shows unbroken 12-month growth from £266→£1,852. At 0.5x annual multiple for a Flippa-verified, 97%-margin, actively growing site, fair value is $14-18K. You're buying at a 45-55% discount to fair value. Before closing, request: (1) affiliate program names and commission rates, (2) GA screenshot showing traffic by country, (3) confirm hosting is transferable.",
    aiPlan:
      "Claude can generate 50+ vegan recipe articles/week targeting long-tail French keywords like 'recette vegan facile repas semaine' and 'alternatives vegan fromage'. Add automated Pinterest posting (vegan audience is Pinterest-heavy — 85% female, peak engagement). Build an email drip sequence with Claude for affiliate conversion on vegan product recommendations. Expand to ebooks (vegan meal prep guides) — zero marginal cost, high margin. Target seasonal content spikes: Veganuary (Jan), World Vegan Day (Nov). Estimated 3x revenue growth in 12 months through content velocity.",
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
    trendProfit: "P&L shows £16,461 annual revenue, £8,947 annual profit (54% margin). Monthly avg: £1,372 revenue, £746 profit. Margin lower than content sites due to Google Ads spend — this is real cost, not negligence",
    trendTraffic: "Google Ads-driven traffic to life insurance lead capture pages. Pureinsure.com confirmed. Lead networks include MediaAlpha, QuoteWizard, EverQuote — paying $15-60 per exclusive lead. Critical age discrepancy: listing says '1yr' but data says 5yr — WHOIS must be verified before any offer",
    highlights: [
      "Identified as pureinsure.com — confirmed live, automated CRM with tested sales funnel",
      "Google Ads account transfers with sale — enormous value: regulated-industry Ads accounts have years of quality score built up, new entrants face heavy scrutiny",
      "Life insurance CPC is among highest in Google Ads ($15-50/click) — high-value traffic niche",
      "54% margin reflects real Google Ads spend — not inflated 99% claims. This is honest economics",
      "$3,500 = 3.5 month payback even at current profit. Worst case: revenue halves, still recoups in 7 months",
    ],
    risks: [
      "CRITICAL: Age discrepancy — listing title says '1yr', scraped metadata says 5yr. Must verify domain WHOIS and Google Search Console history before paying",
      "Revenue is PPC arbitrage: buying Google clicks, selling leads. If CPC rises or lead network rates drop, margin compresses instantly",
      "54% margin means ~£626/mo in Google Ads spend. Get exact Ads account spend breakdown",
      "Insurance affiliates may require US-state licensing depending on lead type (must verify)",
    ],
    recommendation:
      "BUY at $3,500 asking price (do not overpay beyond ask). Verify the age discrepancy first — it determines whether this is a seasoned account or a new account claiming false history. If 5yr old: immediate buy, the quality score and lead network relationships are worth more than $3,500 alone. Request last 12 months of Google Ads account performance metrics (impressions, clicks, cost, conversions) and the list of active lead network contracts. Ask specifically which lead programs are currently paying and at what rate per lead.",
    aiPlan:
      "Claude can optimize Google Ads copy and bidding strategy — A/B test ad headlines for CTR improvements. Expand from life insurance to adjacent verticals: health insurance, final expense, annuities (same audience, complementary lead programs). Build an AI-powered landing page variant tester to improve lead capture conversion rate. Add SEO content targeting 'best life insurance quotes' type keywords to reduce Google Ads dependency over time. Email the existing lead database with Claude-written nurture sequences for re-engagement.",
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
    trendProfit: "P&L bank statements downloaded and verified: 12 months Jan-Dec 2025, range £710-£1,322/mo profit. Stable with no collapse. True baseline £944-£1,231/mo (8 of 12 months in that range). No single spike distorting the average",
    trendTraffic: "24 active recurring SEO clients. Flippa-verified via bank statements (Customer App Statement + 2× SEO invoices downloaded). SaaS + hosting + retainer model. 76% margin on £1,365/mo avg profit — real costs are primarily contractor/tool spend (~£264-567/mo)",
    highlights: [
      "Bank statements downloaded from Flippa: Customer App Summary + full bank statement verified — this is the most documentarily solid listing in the entire search",
      "24 active clients = no single client > 4% of revenue. Best revenue diversification of any listing found",
      "76% margin on a service business is exceptional — implies lean contractor model, no office costs",
      "Identified as 'SEO Supremacy' — 2yr track record, SaaS + hosting + retainer structure means recurring contract relationships",
      "$12,909 at 0.8x annual profit is below fair market for a verified, diversified, 2yr SEO agency",
    ],
    risks: [
      "Agency = client relationships are personal. Ask: are contracts in the business name or tied to the founder personally?",
      "P&L shows some volatility: July £869 and Aug £710 are weak months — verify why (summer churn? contractor cost spike?)",
      "SEO services face AI competition — clients may question ROI as AI tools improve",
      "2yr track record is decent but not long enough to confirm retention through a full market cycle",
    ],
    recommendation:
      "BUY at $11,500 (counter from $12,909). The bank statement verification is the strongest trust signal in the entire portfolio. Priority due diligence: (1) confirm client contracts are transferable to new business owner — ask for sample contract, (2) verify average contract length (monthly vs annual retainers), (3) check if any of the 24 clients represent more than 15% of revenue, (4) ask if seller will stay on 60 days for client introductions. Estimated fair value: $16,000-20,000. At $12.9K you're buying at 20-35% discount.",
    aiPlan:
      "Claude can automate SEO reporting for all 24 clients — generate monthly reports from GA/GSC data in seconds, saving 10+ hrs/week of VA time. Add AI content generation as a upsell service to existing clients (zero marginal cost, high perceived value). Build an automated client onboarding workflow. Pitch existing 24 clients on expanded 'AI SEO' tier at 1.5x current rate. Use Claude to generate standardized deliverables (keyword research reports, content calendars, competitor analyses) and sell as add-ons.",
  },
  {
    id: "F11854283",
    name: "Grid Maker iOS App ($15K)",
    verdict: "CONSIDER — P&L shows slight decline, £700-1,000/mo not £1,159",
    verdictColor: "amber",
    price: "$15,000",
    monthlyProfit: "$1,159/mo",
    annualROI: "93%",
    trendProfit: "P&L verified from Flippa (8 screenshots downloaded): Jul 2024 £998 → Jun 2025 £712. Clear gradual decline over 12 months. Last 3 months £745-£712. Headline £876/mo avg is real but trending down not up",
    trendTraffic: "App Store: 4.3/5 stars with 166 real reviews (solid for niche utility). 2,000 organic downloads/month. 100% organic — no paid acquisition. Turkey-based developer (MOBILIOJI type entity). 99% margin: expenses only £8/mo (tool subscriptions)",
    highlights: [
      "App Store verified: 4.3/5 stars, 166 reviews — genuine user satisfaction in Instagram grid planning niche",
      "Best price-to-cashflow in the mid-12 batch: 1.1x annual profit multiple at $15K",
      "99% margin — £8/mo in expenses. Essentially pure cashflow with zero operational overhead",
      "2,000 organic downloads/month with zero marketing spend — product has real App Store discovery",
      "Creator economy tailwind: Instagram content creation is growing, not shrinking",
    ],
    risks: [
      "P&L shows clear downward trend: £998 (Jul 2024) → £712 (Jun 2025) — 29% decline over 12 months. Not catastrophic but not reversing without action",
      "Instagram platform dependency: if Instagram adds native grid planning (they've tested this), demand drops sharply",
      "No subscriber count provided — unknown how many active paying users vs free tier",
      "Turkey-based seller: IP transfer requires careful legal review for App Store account handover",
      "Revenue unverified at bank level — Flippa vetted but no direct Stripe/App Store Connect connection",
    ],
    recommendation:
      "CONSIDER at $12,000-13,000 (counter down from $15,000, citing P&L decline trend). The 29% revenue decline over 12 months justifies a price reduction. The asset is still good — 166 real reviews, 2K organic downloads/mo, 99% margin — but you're buying a declining trend not a growing one. Key asks before any offer: (1) App Store Connect revenue screenshots for last 6 months, (2) subscriber count and monthly churn rate, (3) confirm App Store developer account is transferable (Apple requires a formal account transfer process), (4) any major Instagram API changes pending that would affect the app.",
    aiPlan:
      "Reverse the decline by adding AI features: Claude can generate 'optimal grid layout suggestions' based on content type, building a genuine AI differentiator. Add an Android version (none exists) to double the addressable market. Launch a 'grid template pack' as a one-time purchase to supplement subscription revenue. Create a content strategy tool (caption suggestions, hashtag recommendations) to expand from grid-only to full Instagram planning. Add a web dashboard companion — Instagram creators want to plan on desktop. Target 'Instagram feed planner' keywords in App Store and Google with Claude-written ASO copy.",
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
    trendProfit: "Ranked 10th of 13 in the cheap/niche batch: STRONG BUY verdict. Best content value in that batch. $1,043/mo profit on $23,926 ask = 1.9x multiple. CBD affiliate revenue with 99%+ margin typical of content sites",
    trendTraffic: "Two 14yr old domains with established CBD/cannabis affiliate organic traffic. 14yr domain age = survived all major Google updates (Panda, Penguin, Helpful Content). CBD affiliate programs include Charlotte's Web, cbdMD, cbdistillery — programs that pay $30-100 per conversion. STRONG BUY classification in cheap batch DD",
    highlights: [
      "14yr domain age — the single most durable SEO moat available. Google trusts old domains with established content libraries deeply",
      "TWO assets bundled — if one underperforms, the other provides income buffer",
      "STRONG BUY verdict in cheap-batch DD: ranked #10 best value of 13 candidates",
      "CBD/cannabis affiliate niche: growing market with loyal audience and high-commission programs ($30-100+ per sale)",
      "Cannabis regulatory tailwind: US state legalization spreading, global CBD market growing to $47B by 2028",
    ],
    risks: [
      "Cannabis regulatory uncertainty at federal level (US): affiliate programs can pause if federal enforcement changes",
      "Banking/payment processor discrimination against cannabis-adjacent businesses — may need specialist payment processor",
      "Content may contain health claims requiring legal review (FTC compliance for CBD marketing is strict)",
      "Niche stigma: some mainstream affiliate networks (Amazon) exclude cannabis products, limiting monetization options",
    ],
    recommendation:
      "CONSIDER with due diligence on affiliate program stability. The 14yr domain age is the core asset — this alone justifies serious attention. Request: (1) list of active affiliate programs and their commission structures, (2) Google Analytics 3yr traffic trend to confirm stability through HCU, (3) Ahrefs/SEMrush export showing keyword rankings and domain authority, (4) confirmation that both domains transfer cleanly (no trademark or legal disputes). The 'cannabis discount' on price is real — legitimate buyers avoid the niche due to stigma, which is why you're getting 14yr authority at a below-market multiple. Fair counter: $20,000-22,000.",
    aiPlan:
      "Claude can generate CBD product reviews and comparison articles at scale targeting long-tail keywords like 'best CBD oil for anxiety 2026' and 'CBD gummies vs capsules review'. Build email capture on both sites and develop a Claude-written drip sequence for affiliate conversion. Expand to adjacent niches: hemp, kratom, nootropics — same audience, same affiliate infrastructure. Add a price comparison tool for CBD products (builds free tool backlinks and captures bottom-of-funnel buyers). Leverage Pinterest for visual CBD content — female-dominant audience with high buyer intent.",
  },
  {
    id: "F12225207-2",
    name: "Content Gorilla SaaS — Negotiate to $30-35K",
    verdict: "CONSIDER — 6yr brand, Flippa-managed, volatile months",
    verdictColor: "amber",
    price: "$50,000 (negotiate to $30-35K)",
    monthlyProfit: "$2,000-3,000/mo (true baseline)",
    annualROI: "69-120% at negotiated price",
    trendProfit: "Full P&L from Flippa-managed listing: Jan 2025 £2,933 → Mar 2025 £13,644 spike → back to £618-1,712 for most months → Nov 2025 £17,648 spike → Dec 2025 £9,110. True base rate £1,000-3,000/mo. Headline £5,022/mo avg is dominated by 2 spike months",
    trendTraffic: "contentgorilla.ai confirmed live. 200 active subscribers, 5% monthly churn (~40% annual). Dual revenue: SaaS subscriptions + affiliate sales. 6yr operating history (since 2019). Stripe + PayPal + Wise triple-verified. Does NOT own contentgorilla.com — parked at HugeDomains for $30K",
    highlights: [
      "6yr established brand — contentgorilla.ai confirmed live and professional. Oldest SaaS in the mid-12 batch with genuine longevity signal",
      "Flippa-managed sale = highest trust tier (Flippa handles escrow, verification, and dispute resolution)",
      "Triple-verified revenue: Stripe + PayPal + Wise all connected. Best financial verification in mid-12 batch",
      "200 paying subscribers with genuine YouTube-to-blog use case — content creators have real workflow need for this",
      "Affiliate income component provides revenue diversification beyond pure SaaS subscriptions",
    ],
    risks: [
      "True baseline is £1,000-3,000/mo, NOT £5,022/mo — two spike months (Mar, Nov 2025) inflate the average by 2-3x. Normal months look like £618-£2,933",
      "40% annual churn (5%/mo) means nearly half the subscriber base turns over every year — requires constant acquisition to stay flat",
      "Does not own contentgorilla.com (parked for $30K) — brand confusion risk; anyone could buy that domain and create a competitor",
      "YouTube-to-blog AI is heavily commoditized: ChatGPT, Claude, Descript, Opus Clip all do this for free or cheap",
      "Volatile revenue makes financial planning difficult — the spikes appear to be affiliate promo launches, not recurring",
    ],
    recommendation:
      "CONSIDER at $30,000-35,000 maximum — do NOT pay $50K asking price. Justification: base run-rate is £1,000-3,000/mo (not £5,022), 40% annual churn is structurally concerning, and the .com domain is not included. At $32K you're paying roughly 1x the real annual baseline — reasonable for a 6yr brand with 200 subscribers. Key asks: (1) monthly breakdown of SaaS revenue vs affiliate revenue for last 12 months (to understand if spikes are repeatable), (2) explanation of what drives spike months (launch campaigns?), (3) churn trend data for last 6 months. If churn is improving, the $35K ceiling holds. If churn is worsening, walk away.",
    aiPlan:
      "Fix the churn problem first — Claude can build an automated onboarding sequence that walks new subscribers through their first 3 YouTube-to-blog conversions, dramatically improving activation rate. Add a 'content calendar AI' feature: users input their YouTube channel URL, Claude generates a 30-day content plan. Build affiliate email sequences targeting content creators, bloggers, and digital marketing agencies — the highest-value customer segments. Launch a YouTube channel marketing the tool, demonstrating the YouTube-to-blog workflow live. The affiliate spike months suggest product launches work — systematize this with quarterly launch campaigns.",
  },
  {
    id: "F12195777",
    name: "14yr Affiliate Marketing Community ($25K)",
    verdict: "CONSIDER — real business, founder-brand risk, cheap at 0.7x multiple",
    verdictColor: "amber",
    price: "$25,000",
    monthlyProfit: "~$2,958/mo",
    annualROI: "142%",
    trendProfit: "Flippa-verified: £26,842 annual profit (~$35K), £2,237/mo avg profit. Revenue bar chart shows consistent Apr 2025-Mar 2026 bars (no monthly table — chart only). Margin 89% confirmed. Expenses: £208/mo hosting + £132/mo website stack = £340/mo total",
    trendTraffic: "Identified as Powerhouse Affiliate (powerhouseaffiliate.com) — live and professional. 54,156 users / 172,899 page views trailing 12mo via Flippa GA. Traffic breakdown: Direct 66%, Organic Search 13%, Organic Video 5%. 11,000 email subscribers. YouTube: 17,200 subs (Joey Babineau's channel). Trustpilot: 2.8/5 with 3 reviews (very small sample)",
    highlights: [
      "Identified: powerhouseaffiliate.com — fully live, professional site with 5 CPA/affiliate marketing courses (paid traffic, Google Ads, Native, Push, email)",
      "14yr track record with 11K email subscribers and 17.2K YouTube subs — real audience with recurring community engagement",
      "Flippa triple-verified: GA + Stripe + PayPal. Revenue, expenses, and traffic all connected",
      "89% margin on £2,237/mo average = near-zero operational overhead. £340/mo total costs",
      "0.7x revenue multiple ($25K / $39K annual revenue) — significantly below fair market for a verified, 14yr community brand",
    ],
    risks: [
      "CRITICAL: Joey Babineau IS the brand. Courses are titled with his name and built on his '20-year CPA reputation.' Post-sale, members may churn if Joey disengages — ask for written commitment to stay as community contributor",
      "Only 13% organic search traffic — audience is returning members, not new organic discovery. Growth requires active marketing, not passive SEO",
      "Trustpilot: 2.8/5 with only 3 reviews — too small to be meaningful, but one negative complaint about 'not replying to reviews' is concerning",
      "No monthly P&L table provided — only chart visible without NDA. Cannot verify if any months had significant drops",
      "Affiliate marketing advice ages quickly — content from 2011-2018 may be outdated for TikTok/AI era",
    ],
    recommendation:
      "CONSIDER — get NDA and full member/revenue breakdown before committing. The 14yr brand and 11K email list are genuine assets, but the founder-dependency is a real risk. Key asks: (1) monthly member count and churn rate for last 12 months, (2) revenue split between new course sales vs recurring memberships, (3) what content has been updated in last 12 months, (4) written agreement for Joey to remain active community contributor for 24 months post-sale. If membership churn is under 10%/mo and Joey commits to 2yr transition, this is a strong buy at $25K. If membership is declining and Joey is stepping away fully, be cautious.",
    aiPlan:
      "Claude can generate weekly affiliate marketing case studies and tutorials, refreshing the content library with current TikTok Ads, AI-assisted campaigns, and 2025-relevant traffic methods. Build an AI-powered 'campaign analyzer' tool for community members — paste your ad data, get AI analysis. Generate a Claude-written email drip sequence for converting free workshop attendees to paid members. Expand the YouTube channel with Claude-scripted videos targeting affiliate marketing tutorial keywords. Create an AI chatbot trained on the 14yr content library to answer member questions 24/7.",
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
  // ── CONSIDER DD batch survivors (amber) ───────────────────────────────────
  {
    id: "F12250811",
    name: "AI SaaS — 80% Margins, 4% Churn, 130 Subs ($56K)",
    verdict: "CONDITIONAL — verified, best SaaS fundamentals in batch",
    verdictColor: "amber",
    price: "$56,457 (target $40-45K)",
    monthlyProfit: "$1,682/mo",
    annualROI: "36-50%",
    trendProfit: "80% margins, 4% churn, 130 subscribers",
    trendTraffic: "AI SaaS with verified revenue",
    highlights: [
      "Verified revenue on Flippa",
      "80% profit margins",
      "4% monthly churn — lowest SaaS churn found",
      "130 active subscribers",
    ],
    risks: [
      "Need NDA + full P&L to verify",
      "$56K at current profit = 2.8x — negotiate down",
      "AI SaaS space is crowded",
    ],
    recommendation:
      "CONDITIONAL — need NDA and P&L verification. If 4% churn and 80% margins confirm, offer $40-45K.",
    aiPlan:
      "Add AI features with Claude Code, expand subscriber base, optimize pricing.",
  },
  {
    id: "F12169050",
    name: "MenuSnap Restaurant B2B iOS ($33K)",
    verdict: "CONDITIONAL — 4.7/5 stars, real B2B niche",
    verdictColor: "amber",
    price: "$32,600 (target $28-30K)",
    monthlyProfit: "$1,392/mo",
    annualROI: "51-60%",
    trendProfit: "Restaurant menu AI, B2B SaaS model",
    trendTraffic: "4.7 stars, 166 ratings, growing",
    highlights: [
      "4.7/5 with 166 real App Store ratings",
      "Real B2B niche (restaurants)",
      "Growing user base",
      "AI-powered menu management",
    ],
    risks: [
      "Restaurant tech is competitive",
      "Need revenue verification",
      "B2B restaurant sales may need local presence",
    ],
    recommendation:
      "CONDITIONAL — strong App Store presence. Counter at $28-30K.",
    aiPlan:
      "Expand AI menu features, add multilingual support, target restaurant chains.",
  },
  {
    id: "F11894069",
    name: "WTMP Security App — 1,313 Ratings, 4.5/5 ($30K)",
    verdict: "CONDITIONAL — real security app, strong ratings",
    verdictColor: "amber",
    price: "$29,600 (target $22-25K)",
    monthlyProfit: "$1,067/mo",
    annualROI: "43-58%",
    trendProfit: "iOS security utility, 120K downloads",
    trendTraffic: "4.5 stars, 1,313 ratings, Lithuanian dev",
    highlights: [
      "1,313 App Store ratings — strongest social proof in batch",
      "4.5/5 star rating",
      "Security niche = Israel's domain",
      "120K total downloads",
    ],
    risks: [
      "Need revenue verification",
      "Lithuanian developer = transfer complexity",
      "Security apps face platform policy changes",
    ],
    recommendation:
      "CONDITIONAL — best social proof of any app candidate. Security niche matches Israel's expertise. Counter at $22-25K.",
    aiPlan:
      "Leverage cybersecurity expertise to improve the product, add enterprise features, expand to Android.",
  },
  {
    id: "F12242568",
    name: "Resolve Habit App — 1.0x Multiple ($12.5K)",
    verdict: "CONSIDER — underpriced at 1.0x annual",
    verdictColor: "amber",
    price: "$12,500 (target $10-12K)",
    monthlyProfit: "$1,044/mo",
    annualROI: "100-125%",
    trendProfit: "88% margin, habit-breaking app",
    trendTraffic: "iOS app, niche but sticky user base",
    highlights: [
      "1.0x annual multiple — underpriced",
      "88% profit margin",
      "Habit/wellness apps have high retention",
      "$12.5K = low risk entry",
    ],
    risks: [
      "Sensitive niche (addiction)",
      "Need to verify App Store presence",
      "May face content policy issues",
    ],
    recommendation:
      "CONSIDER at $10-12K. Low enough risk to experiment. Verify App Store listing is active.",
    aiPlan:
      "Add AI-powered coaching features, expand to other habits, add Android version.",
  },
  {
    id: "F11961187",
    name: "Jewelry Identifier iOS — 4.7/5, 204 Ratings ($20K)",
    verdict: "CONDITIONAL — best App Store credibility in batch",
    verdictColor: "amber",
    price: "$20,000 (target $14K)",
    monthlyProfit: "$1,027/mo",
    annualROI: "62-88%",
    trendProfit: "Jewelry identification AI, 100% organic",
    trendTraffic: "4.7 stars, 204 ratings, 2yr old",
    highlights: [
      "4.7/5 with 204 ratings — excellent credibility",
      "AI-powered = Claude can improve the model",
      "100% organic downloads",
      "Jewelry is high-value niche",
    ],
    risks: [
      "Need App Store Connect revenue verification",
      "$20K for $1K/mo = 1.6x — slightly high",
      "Jewelry ID is niche — limited TAM",
    ],
    recommendation:
      "CONDITIONAL at $14K. Strong App Store presence. Need revenue verification.",
    aiPlan:
      "Improve AI model accuracy with Claude, add price estimation feature, expand to watches/gems.",
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
