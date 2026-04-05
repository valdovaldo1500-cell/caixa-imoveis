// AUTO-GENERATED — do not edit manually
// Source: all_extractions_merged.json + overrides.json
// Generated: 2026-04-05T07:54:35Z

export interface FlippaListing {
  // Core
  id: string;
  title: string;
  revealedName?: string;
  url: string;
  domain?: string;
  type: "saas" | "content" | "newsletter" | "marketplace" | "leadgen" | "service" | "app" | "other";
  dataLevel: "full_pnl" | "stats" | "header";

  // Financials
  askingPrice: number;
  monthlyPL?: { month: string; revenue: number; expenses: number; profit: number }[];
  avgMonthlyRevenue: number;
  avgMonthlyProfit: number;
  profitMargin?: string;
  annualRevenue?: string;
  annualProfit?: string;
  expensesLastMonth?: string;

  // Business info
  ageYears: number;
  monetisation: string;
  techStack: string;
  ownerHoursPerWeek?: number;
  churn?: string;
  subscribers?: string;
  country?: string;
  platform?: string;

  // Verification
  hasStripe?: boolean;
  hasPaypal?: boolean;
  isVetted?: boolean;
  managedByFlippa?: boolean;
  ndaApproved?: boolean;

  // Scores
  scores: {
    stability: number;
    diversification: number;
    operatorIndependence: number;
    roi: number;
    growthPotential: number;
    overall: number;
  };
  recommendation: "TOP_PICK" | "STRONG" | "CONSIDER" | "AVOID" | "top_pick" | "strong" | "consider" | "avoid";
  redFlags: string[];
  greenFlags: string[];

  // Enriched fields
  seller?: { name: string; location?: string; verified?: boolean; transactions?: string };
  socialMedia?: string[];
  expenses?: { item: string; amount: string }[];
  saleIncludes?: string[];
  postSaleSupport?: string;
  badges?: string[];
  comments?: { author: string; date: string; text: string }[];
  ga?: {
    users?: string;
    totalPageViews?: string;
    pagesPerSession?: string;
    avgDuration?: string;
    engagementRate?: string;
    topCountries?: { country: string; views: number }[];
  };
  integrations?: string[];
  tech?: string[];
  views?: number;
  watchers?: number;
  commentCount?: number;
  about?: string;

  // Legacy optional fields for UI compatibility
  status?: string;
  category?: string | null;
  niche?: string | null;
  description?: string | null;
  price?: number | null;
  multiple?: number | null;
  monthlyRevenue?: number | null;
  monthlyProfit?: number | null;
  overallScore?: number | null;
  autonomyScore?: number | null;
  riskScore?: number | null;
  roiScore?: number | null;
  evergreenScore?: number | null;
  aiManageable?: boolean;
  listingType?: "buy_now" | "auction" | "make_offer" | "offer" | null;
  verificationStatus?: "verified" | "partial" | "unverified" | null;
  firstMadeMoney?: string | number | null;
  monetization?: string | null;
  businessAge?: number | null;
  offersCount?: number | null;
  reasonsFor?: string[] | null;
  reasonsAgainst?: string[] | null;
  verifiedPnL?: boolean | null;
}


export const FLIPPA_UPDATED_AT = "2026-03-29";

export const FLIPPA_PIPELINE = { harvested: 284, sieved: 155, deepDived: 155, ndaSigned: 119, namesRevealed: 106 };

export const ELIMINATED_IDS = new Set<string>();

export const flippaListings: FlippaListing[] = [
  {
    id: `12225207`,
    title: `Content Gorilla`,
    revealedName: `Content Gorilla`,
    url: `https://flippa.com/12225207`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 50000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 23543.26, expenses: 19818.35, profit: 3724.91 },
      { month: `Feb 2025`, revenue: 19620.23, expenses: 18780.76, profit: 839.47 },
      { month: `Mar 2025`, revenue: 33376.87, expenses: 16048.99, profit: 17327.88 },
      { month: `Apr 2025`, revenue: 18016.22, expenses: 11634.47, profit: 6381.75 },
      { month: `May 2025`, revenue: 8691.88, expenses: 7364.73, profit: 1327.15 },
      { month: `Jun 2025`, revenue: 10476.23, expenses: 9691.37, profit: 784.86 },
      { month: `Jul 2025`, revenue: 15400.02, expenses: 5518.15, profit: 9881.87 },
      { month: `Aug 2025`, revenue: 9033.51, expenses: 9715.5, profit: -681.99 },
      { month: `Sep 2025`, revenue: 10365.74, expenses: 9575.8, profit: 789.94 },
      { month: `Oct 2025`, revenue: 10137.14, expenses: 7964.17, profit: 2174.24 },
      { month: `Nov 2025`, revenue: 63259.97, expenses: 40845.74, profit: 22412.96 },
      { month: `Dec 2025`, revenue: 21606.51, expenses: 10036.81, profit: 11569.7 },
    ],
    avgMonthlyRevenue: 20294.0,
    avgMonthlyProfit: 6378.0,
    profitMargin: `31%`,
    annualRevenue: `GBP £191,754`,
    annualProfit: `GBP £60,262`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `5%`,
    subscribers: `200`,
    country: `DE, United States`,
    platform: `appeals`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 72.5,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 75.7,
    },
    recommendation: `STRONG`,
    redFlags: [
      `High revenue volatility (CV 112%)`,
      `Has 1 loss month (Aug 2025)`,
      `Does NOT own contentgorilla.com — domain parked at HugeDomains for $30K. Product runs on .co`,
      `46% annual churn (5% monthly) — nearly half the customer base replaces each year`,
      `YouTube-to-blog niche is commoditized — dozens of AI tools do this now`,
      `High revenue volatility (CV 73%)`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `6 years old — established`,
      `Strong profit $6,407/mo`,
      `Revenue growing (24.1%)`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `Attachments`,
      `XLSX`,
      `[External] Content Gorilla - PnL (2)`,
      `No comments`,
      `Managed by Flippa`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $50,000`,
      `GBP £37,522`,
      `Watch`,
      `Share & Earn up to $1.0K*`,
      `Have a similar`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 5256,
    watchers: 448,
    about: `Key Highlights

Content Gorilla, a software as a service (SaaS) platform, has carved out a niche in the bustling world of business-focused tools by leveraging its dual monetization strategy of affiliate sales and service subscriptions. As a cutting-edge solution aimed at empowering businesses, Content Gorilla facilitates the seamless conversion of video content into written materials, thereby broadening access to content creation. Since its inception, the company has strategically employed digital payment titans Stripe, PayPal, and Wise to streamline its financial transactions. These platforms enable both swift and secure payments, underscoring Content Gorilla's commitment to efficient service delivery in the digital age.

Operations

At the core of Content Gorilla's operations is its broad channel repertoire designed to maximize revenue streams. The organization's primary revenue channel is its subscription model, which grants users access to a suite of tools designed to enhance content creation. Customers, ranging from small startups to well-established firms, can subscribe to varying service tiers tailored to their specific needs, ensuring scalability and flexibility.

An equally pivotal component of Content Gorilla’s operations is its affiliate marketing program. The company has developed a robust network of affiliates who promote the service, incentivized by a commission framework that rewards conversions. This approach not only extends Content Gorilla's reach across diverse markets but also significantly boosts its revenue through a performance-based model.

The integration of digital payment solutions such as Stripe, PayPal, and Wise further streamlines operations. These platforms are fundamental in managing the business’s vast and varied financial transactions, ensuring smooth, secure payment processes. This operational efficiency fosters a frictionless user experience, boosting customer retention and satisfaction in the long term.

Customers

Content Gorilla's customer base includes a broad spectrum of businesses seeking to optimize their content creation processes. Primarily, the platform appeals to digital marketers, content creators, and agencies who require efficient transcription and content generation solutions. Its reputation for combining user-friendly functionality with powerful features has made it a preferred choice among business professionals.

New and existing users are drawn to Content Gorilla's ability to effectively convert videos into written content, a task that traditionally demands substantial resources and time. By providing a cost-effective and automated alternative, the service enables businesses to streamline operations, reduce overhead costs, and dedicate resources to other critical areas, thereby accelerating growth and innovation.

Technology

Content Gorilla capitalizes on innovative technologies to deliver its services. At its core is an AI-powered engine that proficiently transcribes video content into writ`,
  },
  {
    id: `12204499`,
    title: `SaaS | Business`,
    revealedName: `imMail`,
    url: `https://flippa.com/12204499`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 162000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 7955.28, expenses: 3628.39, profit: 4326.89 },
      { month: `Mar 2025`, revenue: 3415.03, expenses: 1892.3, profit: 1521.46 },
      { month: `Apr 2025`, revenue: 3675.38, expenses: 963.93, profit: 2710.18 },
      { month: `May 2025`, revenue: 3514.09, expenses: 811.53, profit: 2702.56 },
      { month: `Jun 2025`, revenue: 3567.43, expenses: 527.05, profit: 3040.38 },
      { month: `Jul 2025`, revenue: 3766.82, expenses: 478.79, profit: 3288.03 },
      { month: `Aug 2025`, revenue: 4053.84, expenses: 406.4, profit: 3647.44 },
      { month: `Sep 2025`, revenue: 3534.41, expenses: 375.92, profit: 3159.76 },
      { month: `Oct 2025`, revenue: 4138.93, expenses: 412.75, profit: 3726.18 },
      { month: `Nov 2025`, revenue: 4846.32, expenses: 165.1, profit: 4681.22 },
      { month: `Dec 2025`, revenue: 4593.59, expenses: 1468.12, profit: 3125.47 },
      { month: `Jan 2026`, revenue: 4133.85, expenses: 323.85, profit: 3810.0 },
    ],
    avgMonthlyRevenue: 4266.0,
    avgMonthlyProfit: 3312.0,
    profitMargin: `78%`,
    annualRevenue: `GBP £40,312`,
    annualProfit: `GBP £31,292`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe, Zimbra`,
    churn: `1%`,
    subscribers: `10`,
    country: `Canada`,
    platform: `serving`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 81.2,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 40,
      growthPotential: 80,
      overall: 70.0,
    },
    recommendation: `STRONG`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `6 years old — established`,
      `Stable revenue history`,
      `Zero loss months in P&L`,
    ],
    seller: {
      name: `Leonardo`,
      location: `Brazil`,
      verified: true,
    },
    socialMedia: [
      `123 followers`,
      `3,716 followers`,
    ],
    expenses: [
      {
        item: `Development`,
        amount: `GBP £901 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £150 /month`,
      },
      {
        item: `Accountant`,
        amount: `GBP £101 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Nextcloud`,
      `Included.`,
      `123 followers`,
      `3,716 followers`,
      `300,000 subscribers`,
      `Attachments`,
      `imMail P&L - 2025 (Flippa).xlsx - P&L (US$)`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $202,536`,
      `USD $162,000`,
      `Reduced 20%`,
      `GBP £121,571`,
      `Contact Seller Submit LOI Make Offer`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `121,547`,
      totalPageViews: `93,645`,
      pagesPerSession: `2.18`,
      avgDuration: `00:00:11`,
      engagementRate: `0.61%`,
      topCountries: [
        {
          country: `Italy`,
          views: 58697,
        },
        {
          country: `India`,
          views: 16183,
        },
        {
          country: `Brazil`,
          views: 11915,
        },
        {
          country: `El Salvador`,
          views: 4732,
        },
        {
          country: `Argentina`,
          views: 644,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
      `Zimbra`,
    ],
    views: 2236,
    watchers: 24,
    about: `imMail: Business Overview

imMail is a mature B2B SaaS communication and collaboration platform serving privacy-focused organizations across EMEA and LATAM. With a six-year operating history, a profitable and stable revenue base, and an exceptionally low 1% churn rate, imMail delivers a compelling combination of product depth, operational stability, and long-term contract value. The business generates an average of $5,707 in monthly revenue and $3,594 in monthly profit, supported by 10+ paying customer relationships and strong global distribution via channel partners. imMail’s unique positioning around secure, compliant workplace communication and its Zimbra integration has created a defensible niche with high switching costs and organic inbound demand.

The product consolidates chat, video conferencing, file sharing, task management, and collaboration into a single workspace that can be deployed either in the cloud or fully on-premises. This hybrid deployment model differentiates imMail from mainstream communication tools, making it attractive to government institutions, large enterprises, regulated industries, and organizations requiring strict control over data sovereignty. The platform appeals to IT teams seeking a secure, cost-efficient internal communication solution that avoids the complexity or compliance risks of consumer-oriented tools.

Key Financials

Financial performance shows stability across the year with consistently positive margins. Monthly revenue ranges from $3,583 to $12,366 depending on contract cycles, renewal timing, and service billing. Profitability remains strong despite variable operational expenses. A review of the P&L shows fluctuations tied to consultancy and infrastructure costs, but profitability strengthens mid-year as expenses normalize. Examples include the January–March 2025 P&L, where revenue totaled $20,264 in Q1 with gross margins between 35% and 39% and operational expenses trending downward through Q2, supporting rising EBITDA margins later in the year

Product Overview

imMail provides a centralized communication hub designed to replace fragmented messaging and meeting solutions within organizations. Key capabilities include instant chat, group chat, HD video conferencing, file sharing, task management, and integrated collaborative tools. The platform’s flexibility allows deployment either in the cloud or on an organization’s own servers, enabling full control of data governance and compliance. This level of privacy and configurability is one of imMail’s strongest value propositions, especially in markets where data regulations restrict reliance on third-party SaaS architectures.

A notable advantage is the native integration with Zimbra, giving the platform a built-in user base among enterprises and governments already using Zimbra’s communication suite. imMail’s ability to embed itself into existing infrastructure rather than require wholesale replacement greatly reduces friction in the buying process`,
  },
  {
    id: `11897139`,
    title: `Firstoff`,
    revealedName: `Firstoff`,
    url: `https://flippa.com/11897139`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 37520.0,
    monthlyPL: [
      { month: `Jul 2024`, revenue: 4605.02, expenses: 248.92, profit: 4356.1 },
      { month: `Aug 2024`, revenue: 4532.63, expenses: 91.44, profit: 4441.19 },
      { month: `Sep 2024`, revenue: 4488.18, expenses: 91.44, profit: 4396.74 },
      { month: `Oct 2024`, revenue: 4842.51, expenses: 516.89, profit: 4325.62 },
      { month: `Nov 2024`, revenue: 4532.63, expenses: 91.44, profit: 4441.19 },
      { month: `Dec 2024`, revenue: 5030.47, expenses: 91.44, profit: 4939.03 },
      { month: `Jan 2025`, revenue: 4288.79, expenses: 67.31, profit: 4222.75 },
      { month: `Feb 2025`, revenue: 4100.83, expenses: 67.31, profit: 4033.52 },
      { month: `Mar 2025`, revenue: 4709.16, expenses: 261.62, profit: 4447.54 },
      { month: `Apr 2025`, revenue: 4465.32, expenses: 67.31, profit: 4398.01 },
      { month: `May 2025`, revenue: 4088.13, expenses: 67.31, profit: 4022.09 },
      { month: `Jun 2025`, revenue: 4998.72, expenses: 163.83, profit: 4834.89 },
    ],
    avgMonthlyRevenue: 4557.0,
    avgMonthlyProfit: 4405.0,
    profitMargin: `97%`,
    annualRevenue: `GBP £43,056`,
    annualProfit: `GBP £41,620`,
    ageYears: 0.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Switzerland`,
    platform: `designed`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 81.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 69.8,
    },
    recommendation: `STRONG`,
    redFlags: [
      `Switzerland-focused iOS app — market may be limited geographically`,
    ],
    greenFlags: [
      `CV 5.9% — most stable P&L in entire dataset`,
      `£3,468/mo avg with £53-206/mo expenses`,
      `111% ROI at $37.5K asking price`,
      `12 months perfectly consistent — never below £3,167`,
      `98% profit margin, zero loss months`,
      `Digital platform — iOS app + web`,
    ],
    seller: {
      name: `Martino Ceroni`,
      location: `Switzerland`,
      verified: false,
    },
    expenses: [
      {
        item: `Domains & Web Hosting`,
        amount: `GBP £95 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Custom technology`,
      `Source Code`,
      `Android App`,
      `Included.`,
      `Attachments`,
      `XLSX`,
      `Profit and Loss Statement - Firstoff`,
      `Firstoff - Company Valuation Report - ENG`,
      `Martino Ceroni Jul 03, 2025 09:30 PM`,
      `Trailing 12 months update:`,
      `📊 Average Monthly Revenue: £3,450`,
      `💰 Average Monthly Profit: £3,330`,
      `📉 Lowest Profit: £3,055 (May 2025)`,
      `📈 Highest Profit: £3,752 (Dec 2024)`,
      `🏆 12-Month Total Profit: £39,755`,
      `🔥 Recent Trend: Profits rebounded in Jun`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Martino Ceroni`,
        date: `Jul 03, 2025 09:30 PM`,
        text: `Trailing 12 months update:
📊 Average Monthly Revenue: £3,450
💰 Average Monthly Profit: £3,330
📉 Lowest Profit: £3,055 (May 2025)
📈 Highest Profit: £3,752 (Dec 2024)
🏆 12-Month Total Profit: £39,755
🔥 Recent Trend: Profits rebounded in June (£3,673) after May’s dip.
💸 Expenses: Extremely low, averaging ~£118/month

_
Direct message for inquiries`,
      },
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2115,
    watchers: 131,
    commentCount: 1,
    about: `Firstoff is an innovative platform designed to connect locals and tourists with regional venues and event organizers. By matching users’ interests with curated local offerings, Firstoff helps them discover everything the region has to offer — from cultural events and nightlife to food experiences and outdoor activities — all in one intuitive, personalized interface.



Principal strong points of the Firstoff App:

- Native IOS App + Native Android App + WebSite all interrelated thanks to an immediately responsive admin platform, to quickly manage and modify all parameters, contents and metadata (wich can also be quickly downloaded for statistical analysis);

- Platform completely translated in four languages (English, German, French, Italian);

- Easy and immediate user profile creation, with the possibility of logging in via Facebook, Google, Apple account or simple email address;

- Fully customizable experience for users, including the setting of targeted weekly push notifications, based on categories of interest and favorite venues to follow;

- Targeted search for venues, offers and events (more than 80 filters + keyword searches);

- All results also visible on dynamic geolocalising and navigation maps;

- Content sharing systems & calendars;

- Extremely fast and intuitive content loading for managers accounts;

- Platform tested during a 3 year period.

Selling overview:

We are offering the source code of Firstoff online platform (iOS App, Android App and responsive Website), currently active in the Canton of Ticino, Switzerland. The platform represents a highly valuable asset, with its robust architecture, proven user engagement, and a well-established foundation for scaling operations. With the excellent results obtained in two years of testing, Firstoff is ready for expansion into the global market (N.B. with an immediate Time to Market thanks to the extensive testing work already carried out).

Business Model:

The Firstoff App functions as a regional social network designed to promote and allow users and tourists to discover local events and activities according to their interests.

- Free Basic Service:

Users can use the App as a social network to discover venues, events and activities.

- Revenue Streams:

Businesses owners and event organizers paying annual subscription fee to publish content.
Business advertising & promotions: advertising spaces and promotional push notifications payable via the in-app currency FirstToken.
FirstoffCard Loyalty Program: a virtual membership card offering users exclusive discounts and special deals, driving engagement and customer retention.
Partnerships & Collaborations: visibility and sponsorship packages for companies and brands, to reach a target audience for the sale of their products and services.

Expansion Potential:

The platform's success over this 3 year testing period demonstrates its scalability. Its proven model and robust architecture make it an excellent candidate for wider implem`,
  },
  {
    id: `11822365`,
    title: `Lion Legion`,
    revealedName: `Lion Legion`,
    url: `https://flippa.com/11822365`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 131444.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 19455.13, expenses: 17440.91, profit: 2014.22 },
      { month: `Feb 2025`, revenue: 18611.85, expenses: 17653.0, profit: 958.85 },
      { month: `Mar 2025`, revenue: 29281.12, expenses: 24936.45, profit: 4344.67 },
      { month: `Apr 2025`, revenue: 51997.61, expenses: 43281.6, profit: 8716.01 },
      { month: `May 2025`, revenue: 25262.84, expenses: 22523.45, profit: 2739.39 },
      { month: `Jun 2025`, revenue: 25040.59, expenses: 20213.32, profit: 4827.27 },
      { month: `Jul 2025`, revenue: 22414.23, expenses: 18642.33, profit: 3771.9 },
      { month: `Aug 2025`, revenue: 44425.87, expenses: 34687.51, profit: 9738.36 },
      { month: `Sep 2025`, revenue: 26978.61, expenses: 23910.29, profit: 3068.32 },
      { month: `Oct 2025`, revenue: 26004.52, expenses: 21291.55, profit: 4712.97 },
      { month: `Nov 2025`, revenue: 41116.25, expenses: 34260.79, profit: 6855.46 },
      { month: `Dec 2025`, revenue: 41415.97, expenses: 32167.83, profit: 9248.14 },
    ],
    avgMonthlyRevenue: 31000.0,
    avgMonthlyProfit: 5083.0,
    profitMargin: `16%`,
    annualRevenue: `GBP £292,917`,
    annualProfit: `GBP £48,027`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 87.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 68.7,
    },
    recommendation: `STRONG`,
    redFlags: [],
    greenFlags: [
      `Deep verified — website live, product confirmed`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `38,000 followers`,
      `1,789 followers`,
      `79 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £3,852 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £13,762 /month`,
      },
      {
        item: `Card & Paypal Processing Fees`,
        amount: `GBP £1,611 /month`,
      },
      {
        item: `Support Staff`,
        amount: `GBP £681 /month`,
      },
      {
        item: `Shopify Fees`,
        amount: `GBP £286 /month`,
      },
      {
        item: `Klaviyo`,
        amount: `GBP £527 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £582 Included in sale price`,
      `Shopify`,
      `Included.`,
      `38,000 followers`,
      `1,789 followers`,
      `79 followers`,
      `46 subscribers`,
      `72,980 subscribers`,
      `Attachments`,
      `XLSX`,
      `Lion Legion P&L Dec 2025`,
      `JPEG`,
      `WhatsApp Im`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `387,720`,
      totalPageViews: `101,742`,
      pagesPerSession: `2.75`,
      avgDuration: `00:00:38`,
      engagementRate: `0.55%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 46985,
        },
        {
          country: `United States`,
          views: 3225,
        },
        {
          country: `China`,
          views: 1771,
        },
        {
          country: `India`,
          views: 488,
        },
        {
          country: `(not set)`,
          views: 395,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 4729,
    watchers: 72,
    about: `Business Overview

Lion Legion is a UK-based eCommerce brand operating in the print-on-demand apparel market. The business focuses on humor-driven designs with themes tied to British culture, patriotism, film references, and veteran humor. Founded by a Royal Navy veteran, the brand has built a strong following and expanded beyond its original niche to appeal to a broad UK audience.

The brand has generated millions in lifetime revenue and has built a large customer base and strong review footprint, with thousands of verified five-star reviews.

Key Business Highlights

Geographical Reach
Primarily UK customers, with strong engagement from men aged 35+. The brand has broad organic visibility through SEO, ranking highly for multiple high-intent keywords in its category.

Customer Retention
The business benefits from strong repeat buying behavior driven by email marketing and ongoing new design releases. There is a large and active subscriber list that consistently drives returning customer revenue.

Marketing Efficiency
Paid ads perform well, with efficient customer acquisition supported by strong brand recognition and existing audiences. Continued SEO improvements support steady organic traffic and reduce reliance on paid acquisition.

Social Proof
The brand has thousands of five-star reviews and an engaged audience across social channels. User-generated content continues to support trust, conversion, and community loyalty.

Team Structure
Operations run lean with a part-time UK customer service role, a VA managing social and reviews, and a freelance designer available when needed. The owner spends limited daily time overseeing new designs and admin.

Operations
Fulfillment is fully print-on-demand through a trusted UK partner, ensuring no bulk inventory, fast delivery times, and low operational overhead.

Product & Market Position

Lion Legion has one of the broadest and most unique design libraries within its niche, with more than 1,500 published designs and a large backlog ready for future release. Best-selling categories include film-inspired humor, patriotic themes, and demographic-specific designs.

Customer feedback frequently highlights print quality, delivery speed, and originality as core strengths.

Growth Opportunities

Geographical Expansion
There is untapped potential in markets such as the United States, Australia, and Canada where patriotic and humor-based apparel trends mirror the UK.

Product Expansion
The business could expand into new product categories including hats, sportswear, homewares, and accessories. Existing unreleased designs allow for seamless expansion without additional creative cost.

Marketing Scaling
Increasing paid advertising, affiliate partnerships, and influencer collaborations could boost reach and customer acquisition. The existing subscriber base offers strong leverage for cross-sells and new product launches.

SEO & Content
Further investment in SEO, blog content, and niche keyword targeting could streng`,
  },
  {
    id: `11963797`,
    title: `RPG Tabletops`,
    revealedName: `RPG Tabletops`,
    url: `https://flippa.com/11963797`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 95000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 38336.22, expenses: 30021.53, profit: 8314.69 },
      { month: `Apr 2025`, revenue: 47721.52, expenses: 30966.41, profit: 16755.11 },
      { month: `May 2025`, revenue: 52404.01, expenses: 41686.48, profit: 10717.53 },
      { month: `Jun 2025`, revenue: 36788.09, expenses: 29268.42, profit: 7519.67 },
      { month: `Jul 2025`, revenue: 32912.05, expenses: 24150.32, profit: 8761.73 },
      { month: `Aug 2025`, revenue: 23914.1, expenses: 19476.72, profit: 4437.38 },
      { month: `Sep 2025`, revenue: 22838.41, expenses: 17435.83, profit: 5402.58 },
      { month: `Oct 2025`, revenue: 36706.81, expenses: 29895.8, profit: 6811.01 },
      { month: `Nov 2025`, revenue: 43019.98, expenses: 27536.14, profit: 15483.84 },
      { month: `Dec 2025`, revenue: 48056.8, expenses: 34086.8, profit: 13970.0 },
      { month: `Jan 2026`, revenue: 42525.95, expenses: 33304.48, profit: 9221.47 },
      { month: `Feb 2026`, revenue: 32528.51, expenses: 27265.63, profit: 5261.61 },
    ],
    avgMonthlyRevenue: 38146.0,
    avgMonthlyProfit: 9388.0,
    profitMargin: `25%`,
    annualRevenue: `GBP £360,435`,
    annualProfit: `GBP £88,706`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Arab Emirates`,
    platform: `priced`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 68.7,
    },
    recommendation: `STRONG`,
    redFlags: [],
    greenFlags: [
      `Deep verified — website live, product confirmed`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    socialMedia: [
      `42,000 followers`,
      `12,700 followers`,
    ],
    expenses: [
      {
        item: `month
Shopify Subscription`,
        amount: `GBP £281 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `42,000 followers`,
      `12,700 followers`,
      `9,360 subscribers`,
      `Attachments`,
      `XLSX`,
      `RPG Tabletops - P&L - Updated JANUARY 2026`,
      `XLSX`,
      `RPG Tabletops P&L`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3260,
    watchers: 260,
    about: `Simple and efficient digital business with a fully automated setup and a loyal niche audience.

RPG Tabletops is a lean and profitable digital product business designed for hands-off operation and scalable growth. With a proven track record of over $775,255.45 in revenue in 14 months, a net profit of ~$332,000 USD (~€310,000), and a high-performing team already in place, it’s a powerful, ready-to-scale opportunity for digital entrepreneurs.

Digital products are delivered automatically via email, ensuring a smooth customer experience and saving you time.



Advertising is handled through Meta (Facebook & Instagram) and Google, with email marketing generating over $10K in April alone, plus affiliate revenue (~$1K/month) and growing organic performance.



Email marketing consists of a set of 6 flows already set in place with expertly designed custom graphics, copywriting, and multiple if-else conditions to handle different scenarios.



Refund rate around 5%, mainly due to our 30-day money-back guarantee — a policy that builds trust and lowers friction at checkout, increasing margins. Overall customer satisfaction remains high.



Customer care, organic posting, email marketing, and order fulfillment are fully automated, with clear roles already delegated across the team — freeing you up to focus purely on scaling.



RPG Tabletops has a wide and highly passionate audience, making it ideal for global expansion through localized creatives or by launching new, related digital products.



The only major operating cost is paid advertising on Meta and Google, making the financial structure simple, transparent, and easy to manage too.



Includes access to over 100 professionally designed creatives, many of which are proven winners, ready to scale or test across new markets.



A custom landing page boasting a 2.2% conversion rate, plus multiple strategically built upsells (pre- and post-checkout)  to increase average order value as much as possible.



Product catalog includes 6 high-converting digital products, with strong cross-sell and upsell potential:

The Ultimate Maps Bundle – 15,000 Designs

408 Printable DnD Spell Cards (2014 & 2024 Editions)

Tales from the Lost Archives: The Solmyra Trilogy

1,000+ Token Bundle for Any Campaign

All-in-One RPG Digital Journal

Commercial License for RPG Tabletops Maps



Active and well-established Facebook page with strong engagement and community presence (40k+ followers).



Linked Instagram account with a consistent and visually appealing feed (12k+ followers).



Built on Shopify, fully integrated for seamless product delivery and customer communication, including tested email templates.



Integrated with PayPal for streamlined payments and cash flow management, with an automatic system to handle the PayPal needs for tracking delivered orders, so you don’t have to do it manually.

Structured revenue and bookkeeping system via Google Sheets simplifies operations and financial tracking.

Lean and effect`,
  },
  {
    id: `11738063`,
    title: `packagedisabler.com`,
    revealedName: `packagedisabler.com`,
    url: `https://flippa.com/11738063`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 195000.0,
    avgMonthlyRevenue: 5161.0,
    avgMonthlyProfit: 5020.0,
    profitMargin: `97%`,
    annualRevenue: `GBP £48,779`,
    annualProfit: `GBP £47,428`,
    expensesLastMonth: `GBP £19 /month`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `2%`,
    subscribers: `11,313`,
    country: `United Kingdom`,
    platform: `ProfessionalService`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 65,
      growthPotential: 80,
      overall: 65.9,
    },
    recommendation: `STRONG`,
    redFlags: [
      `Samsung Knox API dependency — OS updates can break compatibility`,
      `Google Play Store policy risk — needs active developer account`,
      `$195K at ~49x monthly — premium pricing`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `12 years old — established`,
      `Strong profit $5,043/mo`,
      `11,313 real subscribers with 2% churn — genuine customer base`,
      `97% margin — almost zero ongoing costs`,
      `Android utility app — fully digital, remote-operable`,
    ],
    seller: {
      name: `Rajiv Azhapilli`,
      location: `United Kingdom`,
      verified: true,
      transactions: `1 transaction totalling USD $165,000`,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £19 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Unique content`,
      `Unique design`,
      `ProfessionalService Schema`,
      `Included.`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `1,000 subscribers`,
      `2,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `Azzy May 26, 2025 12:49 AM`,
      `Report this comment Reply`,
      `Rajiv Azhapilli Feb 19, 2025`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Azzy`,
        date: `May 26, 2025 12:49 AM`,
        text: `Can you please share the CAC, LTV, and total customers? That info seems to be missing`,
      },
      {
        author: `Rajiv Azhapilli`,
        date: `Feb 19, 2025 09:45 PM`,
        text: `@User 1a12c64b we removed google analytics tracking to improve page loading times and removed google ads.`,
      },
      {
        author: `Rajiv Azhapilli`,
        date: `Feb 19, 2025 09:20 PM`,
        text: `@User 1a12c64b lower sales of smartphones in some countries due to economic slowdown`,
      },
      {
        author: `Junior`,
        date: `Dec 01, 2024 12:31 PM`,
        text: `Hi, just wondering what's the reason for the drop in traffic in the past few months. Thanks`,
      },
    ],
    ga: {
      users: `48,966`,
      totalPageViews: `8,700`,
      pagesPerSession: `1.63`,
      avgDuration: `00:00:19`,
      engagementRate: `0.41%`,
      topCountries: [
        {
          country: `United States`,
          views: 693,
        },
        {
          country: `Kenya`,
          views: 479,
        },
        {
          country: `Mexico`,
          views: 351,
        },
        {
          country: `Brazil`,
          views: 279,
        },
        {
          country: `China`,
          views: 221,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 7481,
    watchers: 134,
    commentCount: 4,
    about: `Packagedisabler.com is an established SaaS & Software business in the Business industry, providing a unique solution to its users. With a revenue of $64,201 annually and a remarkable profit margin of 91%, the business has proven its profitability and potential for growth. 

Packagedisabler started as a utility tool aimed at improving security and battery life of mobile device by blocking pre-installed system applications.

Listening to customer feedback and innovation, we have enhanced package disabler app, it is now a competitor to standard MDM with cloud support.

Last year, with a new subscription model, we have acquired more than 11000 active subscribers and it is growing everyday. 

All this growth has been obtained organically. We strongly believe that with a professional marketing campaign a 10X growth can be attained.

Recently we have added many productivity applications such as Power Cleaner ( cleaner application) , Hardware Key Mapper (launch apps based on hardware key press),  URL Blocker ( Blocks thousands of inappropriate website ), Power Chat , Power On Boot ( Power management) etc.

The new applications are also showing strong growth interest.

All applications are sold via packagedisabler.com website and payment subscriptions are managed by stripe. All forms of payment ( Google pay, Apple pay, Paypal, Alipay, Card payment, Link) has been integrated. Entire purchase and software delivery process is automated.

Package disabler also provides administrator dashboard to manage users, growth, analytics etc.`,
  },
  {
    id: `12098876`,
    title: `ESCUELA DE GOBIERNO`,
    revealedName: `ESCUELA DE GOBIERNO`,
    url: `https://flippa.com/12098876`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 83140.0,
    avgMonthlyRevenue: 7465.0,
    avgMonthlyProfit: 5559.0,
    profitMargin: `74%`,
    annualRevenue: `GBP £70,541`,
    annualProfit: `GBP £52,531`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `DE, United States`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `STRONG`,
    redFlags: [],
    greenFlags: [
      `Escuela de Gobierno — Spanish ISO certification school`,
      `Fully virtual online courses`,
      `Spanish language = natural fit for Brazil`,
      `Premium niche: ISO governance certs for executives`,
      `Defensible and accredited (ISO 9001/21001)`,
    ],
    seller: {
      name: `Dr. Mercedes Pitaluga (Dual Doctorate PhDEd & PhDPsy)`,
      location: `Armenia`,
      verified: true,
    },
    socialMedia: [
      `7,000 followers`,
    ],
    expenses: [
      {
        item: `Marketing`,
        amount: `GBP £1,501 /month`,
      },
      {
        item: `Subscriptions`,
        amount: `GBP £375 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `WordPress 6.5`,
      `Included.`,
      `7,000 followers`,
      `Attachments`,
      `Due Diligence First Delivery- CPI`,
      `7a455a5c-24f8-4b90-825f-e0aaaf179b5f`,
      `def18028-6529-48a0-9dcd-a6256da36ffa`,
      `Contact Seller`,
      `Send message`,
      `No co`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 516,
    watchers: 8,
    about: `Business Overview

Ingles Constant – Escuela de Gobierno, founded in 2022 and located in Delaware (US), is a nimble, growing online education platform focused on public-sector leadership and governance. The business delivers high-quality, specialized courses for individuals pursuing or currently holding roles in government, public policy, civic leadership and adjacent areas. With a subscription-based model and strong profit margins (74 %), it offers an excellent opportunity for a buyer to step in and scale a proven concept.

Business Highlights & Market Position

The Escuela de Gobierno establishes a clear niche in the direct-to-learner education sector by focusing exclusively on governance, public policy, security and related government-sector competencies. This specialization sets it apart from general e-learning platforms. Course topics include public defense policy, human security, hybrid warfare, cybersecurity, and official protocols. The platform offers tiers of certification such as “Advanced Diploma in Government and Public Policy.”

The company harnesses a subscription model enabling recurring revenue and higher retention, combined with upsell potential via certification upgrade paths, exclusive webinars and workshops. Digital marketing channels (SEO, targeted social media) and content collaborations position the brand for organic and paid traffic growth. With technology that supports multi-device accessibility, Stripe integration for seamless payments and analytics-driven content updates, the business is operationally accessible and scalable.

Target Customers & Retention Strategies

Target users are government officials, policy professionals, civic-leaders-in-training, and other public-sector employees seeking career advancement or deeper expertise in governance and security domains. Personalized dashboards, progress tracking and feedback loops are in place to enhance engagement and repeat subscription behaviour. With structured curricula and industry-relevant certification branding, the platform appeals broadly to a globally distributed customer base.

Operations & Technology Infrastructure

The business is built on a WordPress 6.5 platform with Stripe payment and subscription management. Marketing spend averages USD 2,000/month and other subscription overheads USD 500/month. The technology architecture supports mobile and desktop users and is optimized for user experience, low friction enrollment and reliable payment processing. Backend analytics gather data on course uptake, user progression and trending topics, enabling rapid content refresh and responsiveness to learner demand.

Growth Opportunities

There is substantial upside for a new owner to accelerate growth through multiple vectors:

Content expansion into adjacent fields such as regulatory compliance, public procurement, digital governance, international relations or regional specializations.
Geographical expansion into Spanish-speaking markets or translation of existing c`,
  },
  {
    id: `12251299`,
    title: `Studyquick`,
    revealedName: `Studyquick`,
    url: `https://flippa.com/12251299`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 46591.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 281.94, expenses: 1609.09, profit: -1327.15 },
      { month: `Apr 2025`, revenue: 812.8, expenses: 2645.41, profit: -1832.61 },
      { month: `May 2025`, revenue: 913.13, expenses: 2362.2, profit: -1449.07 },
      { month: `Jun 2025`, revenue: 52036.98, expenses: 2697.48, profit: 49339.5 },
      { month: `Jul 2025`, revenue: 816.61, expenses: 5709.92, profit: -4893.31 },
      { month: `Aug 2025`, revenue: 222.25, expenses: 21245.83, profit: -21023.58 },
      { month: `Sep 2025`, revenue: 440.69, expenses: 9706.61, profit: -9264.65 },
      { month: `Oct 2025`, revenue: 1104.9, expenses: 3493.77, profit: -2390.14 },
      { month: `Nov 2025`, revenue: 1192.53, expenses: 2000.25, profit: -807.72 },
      { month: `Dec 2025`, revenue: 1446.53, expenses: 1992.63, profit: -546.1 },
      { month: `Jan 2026`, revenue: 1233.17, expenses: 1871.98, profit: -638.81 },
      { month: `Feb 2026`, revenue: 55551.07, expenses: 1455.42, profit: 54095.65 },
    ],
    avgMonthlyRevenue: 9671.0,
    avgMonthlyProfit: 4938.0,
    profitMargin: `51%`,
    annualRevenue: `GBP £91,380`,
    annualProfit: `GBP £46,662`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `10%`,
    subscribers: `125`,
    country: `Germany`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 52.5,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 69.7,
    },
    recommendation: `CONSIDER`,
    redFlags: [
      `High revenue volatility (CV 204%)`,
      `10 loss-making months in P&L`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `Revenue growing (2800.1%)`,
    ],
    seller: {
      name: `Jonas Schmidt`,
      location: `Germany`,
      verified: true,
    },
    socialMedia: [
      `142 followers`,
      `26 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `142 followers`,
      `26 followers`,
      `45 subscribers`,
      `6,700 subscribers`,
      `Attachments`,
      `XLSX`,
      `P&L Statement Studyquick`,
      `Traffic Report Studyquick`,
      `Contact Seller`,
      `Send message`,
      `Jonas Schmidt Mar 27, 2026 10:05 PM`,
      `Updated P&L`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Jonas Schmidt`,
        date: `Mar 27, 2026 10:05 PM`,
        text: `Updated P&L statement is out incl. February results: This month 49.000€ in Profit! If you're interested in acquiring a low maintenance but highly profitable SAAS, send me a message.`,
      },
      {
        author: `Jonas Schmidt`,
        date: `Mar 26, 2026 11:23 PM`,
        text: `Hey, January and February performance results are here: Studyquick is constantly making 1000,00€ in revenue with 500,00€ of profit! And this without any active involvement or working effort. It just keeps running.

PS: The financial sheets will be updated soon.`,
      },
      {
        author: `Jonas Schmidt`,
        date: `Jan 27, 2026 01:56 AM`,
        text: `Just received another ⭐️⭐️⭐️⭐️⭐️ review on Trustpilot: "Simple to use, intuitive, and it actually saved my time for my economics studies. In just a few minutes, I could organize my study sessions, focus on what really matters, move faster and get a better grade. Obv it doesn’t study for you, it just helps you study the right way." by Martina Campione (find original here: https://de.trustpilot.com/reviews/69613e0d60123346dfd834a5)`,
      },
      {
        author: `Jonas Schmidt`,
        date: `Jan 12, 2026 05:13 AM`,
        text: `‼️ New document for all who are currently watching: I attached a traffic report where you can see all impressions and clicks of Studyquick of the last 6 months (screenshot from Google Analytics). The keyword "Studyquick" alone achieved 730 clicks which shows the strong positioning on Instagram, TikTok, YouTube and other outbound channels.

PS: Note also the second strongest keyword "lernzettel erstellen ki" generating 534 new clicks. That means users come not only through organic outreach but al`,
      },
      {
        author: `Jonas Schmidt`,
        date: `Jan 07, 2026 11:06 PM`,
        text: `2 quick but relevant updates:

1. The attached "Studyquick Startup Tracking" has been updated to "Studyquick Startup Tracking (Updated 07.01.2026)". This PDF now reflects the whole last 3 years from 2023 to 2025 incl. all financials and (anonymous) customer data. Feel free to check it out!

2. I also uploaded an easy to understand P&L statement in the finance section of the listing. If you want to get comfortable with the main, aggregated numbers - this is your way to go.

And if anything else c`,
      },
    ],
    ga: {
      users: `4,044`,
      totalPageViews: `4,735`,
      pagesPerSession: `8.79`,
      avgDuration: `00:05:54`,
      engagementRate: `0.68%`,
      topCountries: [
        {
          country: `Germany`,
          views: 7697,
        },
        {
          country: `India`,
          views: 1382,
        },
        {
          country: `United States`,
          views: 23,
        },
        {
          country: `Ireland`,
          views: 16,
        },
        {
          country: `Netherlands`,
          views: 11,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2129,
    watchers: 40,
    commentCount: 5,
    about: `Key Highlights (what you will get):

✅ 6,700 software users

✅ 125 paying customers

✅ 10,000€ in ARR

✅ 45,766 page views (`,
  },
  {
    id: `11894471`,
    title: `Rapidesim.com`,
    revealedName: `Rapidesim.com`,
    url: `https://flippa.com/11894471`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 120000.0,
    avgMonthlyRevenue: 16894.0,
    avgMonthlyProfit: 5321.0,
    profitMargin: `31%`,
    annualRevenue: `GBP £159,634`,
    annualProfit: `GBP £50,276`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `NM, United States`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 85,
      growthPotential: 80,
      overall: 68.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `Strong profit $5,321/mo`,
    ],
    seller: {
      name: `Hassan`,
      location: `Spain`,
      verified: true,
    },
    expenses: [
      {
        item: `Marketing`,
        amount: `GBP £1,126 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £2,627 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Richpanel`,
      `Included.`,
      `Contact Seller`,
      `Send message`,
      `Hassan Jul 31, 2025 08:11 PM`,
      `Report this comment Reply`,
      `Hassan Jul 31, 2025 08:`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Hassan`,
        date: `Jul 31, 2025 08:11 PM`,
        text: `@Ramin Siroosi Thank you for your interest. Please contact me in private message and I can provide all the information you'll need`,
      },
      {
        author: `Hassan`,
        date: `Jul 31, 2025 08:11 PM`,
        text: `@Ramin Siroosi Thank you for your interest. Please contact me in private message and I can provide all the information you'll need`,
      },
      {
        author: `Ramin`,
        date: `Jul 31, 2025 12:17 PM`,
        text: `Hi I am interested to know more about your e-sim business. Please provide me with PNL since inception. What challenges have you had so far and any relevant information`,
      },
    ],
    ga: {
      users: `111,092`,
      totalPageViews: `23,116`,
      pagesPerSession: `1.65`,
      avgDuration: `00:00:19`,
      engagementRate: `0.40%`,
      topCountries: [
        {
          country: `Morocco`,
          views: 3668,
        },
        {
          country: `United States`,
          views: 1136,
        },
        {
          country: `China`,
          views: 929,
        },
        {
          country: `Singapore`,
          views: 205,
        },
        {
          country: `Vietnam`,
          views: 122,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2153,
    watchers: 79,
    commentCount: 3,
    about: `Hi there! I’m thrilled to offer you Rapid eSIM.com, a fully automated business in a fast-growing market. It runs itself with organic traffic in over five languages and already turns a profit.

Why You’ll Love It

Automated & Profitable: Nearly zero day-to-day effort needed.

Strong Traction: 13,000+ customers and 200,000+ sales to date.

Loyal Audience: 46% of buyers return for more.

AI-Powered Upsells: Innovative tools boost revenue.

Email Automation: Pre-built campaigns nurture leads.

Global Reach: Easy to scale into new markets.

Minimal Marketing: Growth driven by SEO and word-of-mouth.

Passive Income: Perfect side project or full-time venture.

Your Next Steps
You’ll handle customer support and top-up credit with our SIM provider. For new features or tweaks, our developer is on standby to help.

Why I’m Selling
I juggle multiple ventures, so I can’t give Rapid eSIM the focus it deserves. Plus, one of our managing partners fell ill and, sadly, passed away about a month ago. It’s time to pass the torch to someone who can take it to the next level.

Seize this chance to own a structured, growth-ready eSIM platform—built for effortless scaling and real results.`,
  },
  {
    id: `12059528`,
    title: `intercoolstudio.com`,
    revealedName: `intercoolstudio.com`,
    url: `https://flippa.com/12059528`,
    type: `content`,
    dataLevel: `stats`,
    askingPrice: 96892.0,
    avgMonthlyRevenue: 4765.0,
    avgMonthlyProfit: 3574.0,
    profitMargin: `75%`,
    annualRevenue: `GBP £45,026`,
    annualProfit: `GBP £33,770`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `React, Django, WordPress, Shopify, Stripe`,
    churn: `1%`,
    subscribers: `100`,
    country: `Serbia`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 65,
      operatorIndependence: 80.0,
      roi: 75,
      growthPotential: 75,
      overall: 67.5,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `5 years old — established`,
    ],
    seller: {
      name: `Andrej Fedek`,
      location: `Serbia`,
      verified: true,
    },
    socialMedia: [
      `84 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £2 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £2 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £301 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `WordPress 6.8`,
      `Included.`,
      `84 followers`,
      `Attachments`,
      `PayPal Jul 2025 (1)`,
      `Paypal Jun 2025 (1)`,
      `PayPal Maj 2025`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $155,930`,
      `USD $96,892`,
      `Reduced 38%`,
      `GBP £72,712`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & E`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Django`,
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1487,
    watchers: 15,
    about: `Intercool Studio is a content-driven digital blog and resource hub launched by Linkstudio in Serbia. The site focuses on topics such as online business tools, digital marketing, remote work, and career development. It primarily generates traffic through organic content and monetizes via display ads, affiliate links, and occasional sponsored posts.

The platform is built on WordPress and features a regularly updated blog with articles tailored to small businesses, freelancers, and digital professionals. While it is not a full-fledged SaaS company, it integrates useful tools, promotes software solutions, and drives referral traffic to partner platforms.

Business Highlights

Content Site Model: No products or client services, content-based monetization only.

Monetization: Google AdSense, affiliate programs (e.g., Impact, ShareASale), and some sponsored placements.

Traffic: Primarily SEO-based; content ranks for niche long-tail keywords.

Low Maintenance: Can be run by a single owner or with a freelance content writer.

Revenue: Modest, with potential to grow via SEO optimization or expanded content offerings.

Assets Included

Domain: Intercoolstudio.com (established and clean history)

Website: Fully operational WordPress-based blog

Content: Dozens of evergreen blog posts and affiliate guides

Ad Approval: Active AdSense integration

Brand: Light branding and logo included

Social: Small Facebook following, ready for expansion`,
  },
  {
    id: `11864987`,
    title: `The Auto Experts`,
    revealedName: `The Auto Experts`,
    url: `https://flippa.com/11864987`,
    type: `content`,
    dataLevel: `stats`,
    askingPrice: 121761.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 4520.0,
    profitMargin: `84%`,
    annualRevenue: `GBP £50,556`,
    annualProfit: `GBP £42,702`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 65,
      operatorIndependence: 80.0,
      roi: 75,
      growthPotential: 75,
      overall: 67.5,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `2 transactions totalling USD $115,628`,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `Attachments`,
      `image (4)`,
      `image (5)`,
      `image (8)`,
      `Jaro Nov 02, 2025 05:33 AM`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Jaro`,
        date: `Nov 02, 2025 05:33 AM`,
        text: `🚀 Update: We recently upgraded to our premium domain AutoExperts.co.uk (previously TheAutoExperts.co.uk). Google is currently migrating our search visibility to the new domain, This process expected to complete by end of November 2025.

Traffic fluctuations during this phase are temporary and part of the transition. We’re holding the sale until the migration is fully stabilized. Excited to see the stronger long-term growth this premium domain will bring!`,
      },
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2538,
    watchers: 146,
    commentCount: 1,
    about: `Financials

Revenue & Profit: The business has successfully reached £15K in monthly revenue and has the potential to scale to £200K with the right marketing strategy. The cost of operations is just 11%, resulting in significant profitability.
Growth Potential: With strategic marketing and expansion of the customer base, the business can reach significant revenue growth. Additionally, affiliate marketing, content partnerships, and the strong SEO foundation create new revenue opportunities.

Key Highlights

Target Market: Auto Experts is a UK-based data business specializing in car history checks, targeting over 40 million drivers and 18,000+ car dealers.
Strong Profitability: The business boasts an EBITDA margin of up to 85%, highlighting its high profitability and efficient operations.
Scalable Growth: With minimal marketing budgets, the business has already achieved up to £15K in monthly revenue. There is a huge opportunity to scale to £200K in revenue with strategic marketing planning.
Low Operating Costs: Operational costs are just 11%, leaving a significant portion of revenue for profit and marketing activities.
Average Order Value: £100-£150
Easy to Manage: The business is simple to manage and does not require constant updates or heavy involvement. It can be efficiently run with minimal time commitment, making it ideal for a full-time or part-time resource handling support and marketing tasks.
Affiliate Marketing Potential: Huge opportunities for affiliate marketing with established partnerships with WeBuyAnyCar, Motorway, Carwow, Car Finance, and Car Insurance partners.
Content Revenue Opportunities: The website also generates revenue through content marketing by allowing partners to share automotive-related blogs, creating a passive income stream.
Strong SEO Foundation: The business has built a robust SEO foundation, with thousands of backlinks and a solid focus on organic traffic. This has led to increased visibility and higher conversion rates.

Operations

Business Model: Auto Experts generates revenue by offering car history checks, which are essential for car buyers, sellers, and dealers. The platform is easy to navigate, providing instant access to comprehensive vehicle histories.
Key Tasks: The primary responsibilities include handling customer support, executing marketing strategies, managing affiliate partnerships, and exploring content revenue opportunities. The business also invests in SEO to drive organic growth.
Time Commitment: Managing the business requires only 10-15 hours per week, mainly for support and marketing activities, making it easily manageable for a full-time or part-time employee.

Customers

Customer Base: The business serves a diverse range of customers, including car dealers and private buyers across the UK, with many repeat customers.
Customer Acquisition: Customers are mainly acquired through digital marketing, dealer partnerships, and word-of-mouth referrals. With a strong reputation and primarily SEO-driv`,
  },
  {
    id: `12516038`,
    title: `SaaS | Business`,
    revealedName: `SaaS App Analytics (Premium-gated)`,
    url: `https://flippa.com/12516038`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 188100.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 5462.0,
    profitMargin: `93%`,
    annualRevenue: `and boasts a 91% profit margin, indicative of low overhead costs and effective cost management strategies. Its subscription-based SaaS model ensures predictable income and scalability while maintaining simplicity in operations. The website has a Domain Authority of 25, which contributes to established search visibility and the potential for organic traffic, aiding in customer acquisition. This SaaS enterprise is poised for ongoing growth through the development of new features, strategic partnerships, and focused marketing efforts. The current infrastructure of the business requires minimal daily oversight, making it an attractive option for operators seeking a simplified software asset with the potential for expansion. With strong profit margins, robust branding, and consistent revenue streams, this company presents a compelling opportunity within the SaaS market landscape.`,
    annualProfit: `GBP £51,605`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `10%`,
    subscribers: `47`,
    country: `Portugal`,
    platform: `offers`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 65,
      growthPotential: 80,
      overall: 65.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `Strong profit $5,462/mo`,
    ],
    seller: {
      name: `Alerts`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      totalPageViews: `1,828`,
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 205,
    watchers: 19,
    about: `profitable SaaS company in the Internet and software sector, founded in 2021, provides efficient reporting solutions specifically designed for app developers and digital businesses. The platform offers automated and user-friendly reporting tools that help clients save time and make informed, data-driven decisions. With a clear value proposition and a streamlined operational structure, this business has established a solid position in the growing digital ecosystem. The company generates $57,000 in annual revenue and boasts a 91% profit margin, indicative of low overhead costs and effective cost management strategies. Its subscription-based SaaS model ensures predictable income and scalability while maintaining simplicity in operations. The website has a Domain Authority of 25, which contributes to established search visibility and the potential for organic traffic, aiding in customer acquisition. This SaaS enterprise is poised for ongoing growth through the development of new features, strategic partnerships, and focused marketing efforts. The current infrastructure of the business requires minimal daily oversight, making it an attractive option for operators seeking a simplified software asset with the potential for expansion. With strong profit margins, robust branding, and consistent revenue streams, this company presents a compelling opportunity within the SaaS market landscape.`,
  },
  {
    id: `12224855`,
    title: `CGAA`,
    revealedName: `CGAA`,
    url: `https://flippa.com/12224855`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 89000.0,
    monthlyPL: [
      { month: `Nov 2024`, revenue: 353.06, expenses: 33.02, profit: 318.77 },
      { month: `Dec 2024`, revenue: 674.37, expenses: 33.02, profit: 640.08 },
      { month: `Jan 2025`, revenue: 803.91, expenses: 33.02, profit: 770.89 },
      { month: `Feb 2025`, revenue: 1000.76, expenses: 33.02, profit: 967.74 },
      { month: `Mar 2025`, revenue: 1832.61, expenses: 43.18, profit: 1789.43 },
      { month: `Apr 2025`, revenue: 2231.39, expenses: 33.02, profit: 2198.37 },
      { month: `May 2025`, revenue: 3303.27, expenses: 33.02, profit: 3270.25 },
      { month: `Jun 2025`, revenue: 3091.18, expenses: 33.02, profit: 3056.89 },
      { month: `Jul 2025`, revenue: 3219.45, expenses: 34.29, profit: 3185.16 },
      { month: `Aug 2025`, revenue: 2722.88, expenses: 33.02, profit: 2689.86 },
      { month: `Sep 2025`, revenue: 3576.32, expenses: 33.02, profit: 3543.3 },
      { month: `Oct 2025`, revenue: 1950.72, expenses: 33.02, profit: 1917.7 },
      { month: `Nov 2025`, revenue: 3060.7, expenses: 0.0, profit: 3060.7 },
      { month: `Dec 2025`, revenue: 3312.16, expenses: 0.0, profit: 3312.16 },
      { month: `Jan 2026`, revenue: 3454.4, expenses: 0.0, profit: 3454.4 },
      { month: `Feb 2026`, revenue: 3432.81, expenses: 0.0, profit: 3432.81 },
    ],
    avgMonthlyRevenue: 2376.0,
    avgMonthlyProfit: 2351.0,
    profitMargin: `98%`,
    annualRevenue: `GBP £29,936`,
    annualProfit: `GBP £29,612`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Vue, Nuxt, Shopify, MongoDB, Cloudflare`,
    country: `Sweden`,
    platform: `within`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 78.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 64.5,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `Stable revenue history`,
      `Zero loss months in P&L`,
      `Revenue growing (456.9%)`,
    ],
    seller: {
      name: `Maximilian Helmersson`,
      location: `Sweden`,
      verified: true,
    },
    socialMedia: [
      `0 followers`,
      `3 followers`,
    ],
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £26 /month`,
      },
      {
        item: `Domain Renewal`,
        amount: `GBP £1 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Nuxt.js`,
      `Included.`,
      `0 followers`,
      `3 followers`,
      `5 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $89,000`,
      `GBP £66,789`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $1.7K*`,
      `Have a similar business? Get a free valuation`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `3,286,519`,
      totalPageViews: `322,768`,
      pagesPerSession: `1.02`,
      avgDuration: `00:00:28`,
      engagementRate: `0.43%`,
      topCountries: [
        {
          country: `United States`,
          views: 248761,
        },
        {
          country: `United Kingdom`,
          views: 10264,
        },
        {
          country: `Germany`,
          views: 7717,
        },
        {
          country: `Japan`,
          views: 5952,
        },
        {
          country: `Hong Kong`,
          views: 5609,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Vue`,
      `Nuxt`,
      `Shopify`,
      `MongoDB`,
      `Cloudflare`,
    ],
    views: 853,
    watchers: 11,
    about: `CGAA.org is a fast-growing, US dominant business & finance content platform founded in 2022 and designed for scalable, low-maintenance growth. Built on Nuxt.js (Vue) with a MongoDB database backend and powered by a proprietary AI article-generation system, the platform publishes high-quality, search-optimized business content at scale.

Over the past 12 months, CGAA.org has attracted 2.5M users with strong engagement (1:56 avg. session duration) and highly valuable demographics: 74.7% U.S. traffic with a balanced device mix across mobile (56%) and desktop (40%). Traffic is diversified across Bing, Yahoo, DuckDuckGo, and direct sources, giving the site strong resilience and stability.

Monetization is primarily via advertising, with Google AdSense proving the most profitable after testing multiple networks (Ezoic, MonetizeMore, R2B2, Optad360, etc.). The current manual-tag AdSense setup consistently outperforms alternatives. Additional revenue has been generated through paid guest posts and link insertions, offering immediate upside for the new owner. Operating costs are minimal, limited to hosting and annual domain renewal, resulting in super strong profit efficiency and low overhead.

The sale can also include the proprietary AI article generator used to create the site’s content, giving a buyer with sufficient technical skills the ability to scale output further or launch new properties.

In addition to the primary asset, the buyer may opt to acquire a set of smaller supporting sites in the pet, household, and tech niches. These sites generate ~20% additional views and revenue, but their performance is not included in the stated traffic or financial figures above.

Hosting is on reliable Netcup infrastructure, with Cloudflare providing DNS and bot protection, ensuring stability and security.

The owner is selling to free up liquidity for a capital-intensive physical product venture, creating a rare opportunity to acquire a lean, automated, U.S.-heavy content business with proven monetization and significant growth potential.`,
  },
  {
    id: `11532448`,
    title: `NutritioApp`,
    revealedName: `NutritioApp`,
    url: `https://flippa.com/11532448`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 190000.0,
    avgMonthlyRevenue: 3592.0,
    avgMonthlyProfit: 3202.0,
    profitMargin: `89%`,
    annualRevenue: `GBP £33,941`,
    annualProfit: `GBP £30,249`,
    ageYears: 8.0,
    monetisation: ``,
    techStack: `React, Vue, Django, Shopify, PHP, MySQL, Stripe`,
    country: `Romania`,
    platform: `requires`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 40,
      growthPotential: 80,
      overall: 62.2,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `8 years old — established`,
    ],
    seller: {
      name: `Laurentiu Nicolae`,
      location: `Romania`,
      verified: true,
    },
    socialMedia: [
      `0 followers`,
      `505 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £1 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £113 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £56 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `GeneratePress`,
      `Included.`,
      `0 followers`,
      `505 followers`,
      `0 followers`,
      `9,709 subscribers`,
      `Attachments`,
      `P&L Statement NutritioApp`,
      `No comments`,
      `Mana`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `20,101`,
      totalPageViews: `4,178`,
      pagesPerSession: `1.49`,
      avgDuration: `00:00:28`,
      engagementRate: `0.46%`,
      topCountries: [
        {
          country: `United States`,
          views: 651,
        },
        {
          country: `Romania`,
          views: 576,
        },
        {
          country: `India`,
          views: 199,
        },
        {
          country: `Brazil`,
          views: 101,
        },
        {
          country: `United Kingdom`,
          views: 97,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Vue`,
      `Django`,
      `Shopify`,
      `PHP`,
      `MySQL`,
      `Stripe`,
    ],
    views: 5784,
    watchers: 345,
    about: `Profitable SaaS that helps nutrition professionals (dietitians, nutritionists, nutrition coaches, and nutrition clinics) to grow and scale their nutrition business.

It's mission is to simplify and democratize nutrition through technology for professionals and for their clients.

✅ $26,340 in TTM revenue

✅ $21,228 in TTM profit

We are onboarding a new big client at the moment (nutrition franchise) that will add another $20k in revenue and profit per year. After the onboarding is done (in 1 month), the numbers will be 

✅ $45.000 in TTM revenue

✅ $39.800 in TTM profit

Intro video and reason for selling (Loom)

App demo (Loom)

After speaking to 500+ nutrition professionals I discovered multiple growth opportunities and I will be happy to share all of them in a call.

Business model

B2B startup that charges monthly subscriptions based on the number of active clients a nutrition professional has per month.

Upgrade options (monthly or yearly):

- whitelabel client portal (with client's colors, on their domain)
- custom mobile app for their clients, on their account
- support for clinics/teams/multiple practitioners

Most of the income comes from the US based clients, but we have clients from all over the world: US & Canada, Europe, Australia, South Africa, Middle East.

Tech stack: this product is built on VueJS, PHP/Laravel, Capacitor for the mobile app. Hosted on Google Cloud and using MySQL as database.

Growth opportunity:

We have done only SEO and some content to get to this number of clients so far.

There is a huge opportunity for someone to do outreach and paid ads in order to get more clients. Increase digital marketing. Hire a B2B sales team. Expand to new markets. Social media marketing. Increase content marketing.

Key assets

The SaaS (codebase) including the database of foods & recipes (over 100,000)
the web portal (codebase, database, clients)
the mobile apps (codebase, Apple Store and Google Play accounts, integration with the backend)
Website + blog, SEO optimized
Social media accounts (Facebook, Instagram, LinkedIn)
Brand
Customers
Domain
Mobile application
Marketing materials
CRM with about 6000 contacts database of former clients, free users, academic users
Drip campaigns

Reason for selling

We know how to build apps and we did mostly SEO to get to this number of clients. We have a strong conviction that there is a bigger potential for someone that does outreach to take this startup and grow it exponentially because so far what we did was to just optimize the website and wait for them to come. 

After taking his pilot licence, the founder got very passionate about aviation and decided to start a startup in the business aviation field. He does no longer have enough mental bandwidth to focus on growing 2 startups in the same time.

Financing: Bootstrapped

Benefits of using the app as a nutrition professional:

- Grow your income – Handle far more clients in less time

- Win more clients

- Offer premium experience for premi`,
  },
  {
    id: `11660786`,
    title: `Bananatic`,
    revealedName: `Bananatic`,
    url: `https://flippa.com/11660786`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 59920.0,
    avgMonthlyRevenue: 15964.0,
    avgMonthlyProfit: 4448.0,
    profitMargin: `28%`,
    annualRevenue: `GBP £150,839`,
    annualProfit: `GBP £42,025`,
    ageYears: 11.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `FL, United States`,
    platform: `helping`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `11 years old — established`,
    ],
    seller: {
      name: `Michal Jedrzejczak`,
      location: `United States`,
      verified: true,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £1,501 Included in sale price`,
      `250,000 followers`,
      `5,000,000 subscribers`,
      `Attachments`,
      `2024`,
    ],
    postSaleSupport: `Included. Founder 4 months availability. Tech 5 months, SEO 5 months. Support/Management - 5 month or stay full time`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `124,121`,
      totalPageViews: `53,721`,
      pagesPerSession: `3.33`,
      avgDuration: `00:00:37`,
      engagementRate: `0.48%`,
      topCountries: [
        {
          country: `France`,
          views: 8103,
        },
        {
          country: `United States`,
          views: 7822,
        },
        {
          country: `Germany`,
          views: 5844,
        },
        {
          country: `Spain`,
          views: 3769,
        },
        {
          country: `Italy`,
          views: 1878,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3900,
    watchers: 277,
    about: `Pack includes

Unique loyalty websites with huge community and very strong SEO backgroud (8y on the market)
- bananatic.com
- bananki.pl
- prizesdrop.com 
- grabfreemoney.com
- lootprizes.com


Support websites / content and giveaways (traffic generators)
- gramlab.pl
- gamingimpact.com
- crazygamerspot.com
- graczol.pl
- grabfreegame.com
- grabsteamkey.com


Huge social media presence:
- https://www.facebook.com/bananaticcom
- https://twitter.com/bananatic_com
- https://twitter.com/bananatic_com
- https://www.facebook.com/Banankipl/
- https://www.youtube.com/channel/UCL1L4ERGWeqK9O0g0FXOf4g


Steam Publishing 
https://store.steampowered.com/publisher/SedocLLC/#browse


unique backend systems to monitor and manage websites
- monitor digital rewards
- monitor income and expenses
- monitor campaigns and traffic
(huge set of backend systems with external integrations and stats)



Operations

The business has been on the market for over 10 years and it has very strong SEO presence with organic traffic. It generates stable income and is very easy to manage. Perfect fit for any agency or anyone who needs a simple, but profitable business. 

Customers

Huge gaming community on the websites and its Social Media. 

Financials

Attached actual financials. 

Additional Notes

That online business is well established and has a huge growth potential. Its easily scalable / more traffic = more income. I have no time due to another business I am involved in and that doesn't allow me to step out (I sold another business and now I have exclusivity that doesnt allow me to work anywhere) . I put a lot of heart to that project, and there has been massive tech and seo work done by my team. I hope someone can drive that business forward!. 

Contact me for more details / If you are interested I am sure we can make a good deal. 

Note from the owner:
I started this project in 2015 and achieved significant financial results with minimal expenses. The success of these websites is due to the unique systems we developed, seamless integrations, extensive SEO work, and effective backlinking efforts, which together have driven organic gaming traffic.

Since 2018, the websites became more of a side business, as I shifted my focus elsewhere. By 2020, I had fully transitioned to another category (gift cards), but I still made efforts to keep the sites operational.

Income Summary Over the Years:
2016: $388k
2017: $311k (Note: This year, I started a gift card business that required 80% of my time.)
2018: $274k
2019: $235k
2020: $240k (Note: I sold the gift card business and secured an exclusivity contract.)
2021: $230k
2022: $211k
2023: $151k
The decline in revenue is straightforward: the business has been managed with minimal investment, just enough to stay operational.

While I’ve attempted to work with a few individuals, finding the right person to manage these projects has been challenging. These websites require regular involvement, including social media activity, campaigns,`,
  },
  {
    id: `11883560`,
    title: `Venues.org.uk`,
    revealedName: `Venues.org.uk`,
    url: `https://flippa.com/11883560`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 51353.0,
    avgMonthlyRevenue: 3564.0,
    avgMonthlyProfit: 2682.0,
    profitMargin: `75%`,
    annualRevenue: `GBP £33,674`,
    annualProfit: `GBP £25,340`,
    ageYears: 25.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `with`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [
      `25yr claim misleading — company est. 2011, domain was redirect before that`,
      `Only 356 venue pages vs competitors with 10-16K+`,
      `Sitemap frozen since Dec 2018`,
      `Ancient tech: CodeIgniter PHP, Bootstrap 3, jQuery UI 1.11.4 (Laravel 12 migration in progress)`,
      `Multiple 404 pages linked from navigation (/about, /contact, /advertise)`,
      `Special offers page shows 2014 content`,
      `GA4 verified: 33% bot traffic (China 0% engagement/0s, Singapore 0.3%/0s)`,
      `Organic search collapsed 90% in March 2026 (48/day → 5/day) — server issue claimed`,
      `Real UK traffic only ~5/day in March 2026 vs ~60/day in 2025`,
      `Sales requires phone calls to venues — not self-serve`,
      `Product unclear: may be a service business (social posts, news features per venue) not a directory`,
      `Admin person may be essential to delivering the product`,
    ],
    greenFlags: [
      `55 paying venues × £550/yr = £30K/yr — verified from 3yr ring-fenced transaction data`,
      `75% renewal rate`,
      `35K email subscribers untapped since COVID`,
      `Pre-COVID peak £120K+/yr — proven ceiling`,
      `Premium .org.uk domain, 10.3K backlinks, 957 referring domains`,
      `Non-compete agreed, exhibitions.co.uk already sold`,
      `Team (admin + dev) willing to stay on`,
      `6K+ venue database included`,
      `Seller cooperative and transparent`,
    ],
    seller: {
      name: `Paul Sung`,
      location: `United Kingdom`,
      verified: false,
    },
    expenses: [
      {
        item: `Server`,
        amount: `GBP £304 /month`,
      },
      {
        item: `Web Developer`,
        amount: `GBP £253 /month`,
      },
      {
        item: `Admin staff`,
        amount: `GBP £353 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `620 followers`,
      `914 followers`,
      `11,083 followers`,
      `1,100 followers`,
      `35,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $60,291`,
      `USD $51,353`,
      `Reduced 15%`,
      `GBP £38,541`,
      `Contact Seller Submit LOI Make O`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `45,611`,
      totalPageViews: `6,082`,
      pagesPerSession: `1.26`,
      avgDuration: `00:00:10`,
      engagementRate: `0.16%`,
      topCountries: [
        {
          country: `China`,
          views: 3559,
        },
        {
          country: `United Kingdom`,
          views: 1785,
        },
        {
          country: `Singapore`,
          views: 241,
        },
        {
          country: `United States`,
          views: 116,
        },
        {
          country: `Mexico`,
          views: 23,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1040,
    watchers: 35,
    about: `Venues.org.uk is one of the longest-standing and most recognized online venue discovery platforms in the UK, serving the events industry since 2001. As a trusted portal for venue bookers, corporate clients, and event planners, the business provides a streamlined experience for finding and showcasing event spaces across the country. With a 25-year-old domain, highly engaged email list of 35,000 subscribers, and an SEO authority score of 27 supported by 10.3K backlinks and 957 referring domains, Venues.org.uk is a cornerstone of digital real estate in the UK events industry.

The platform operates on a profitable and stable business model, with 75% profit margins and monthly net earnings of USD $3000+. Revenue is derived from a mix of subscription-based listings for venues and advertising services, providing both predictable cash flow and upside through content-driven traffic. Its niche positioning, high organic search traffic (79% of pageviews), and recurring income base make it a valuable asset for investors or acquirers seeking a defensible and established foothold in the events and hospitality sector.

Monetization Model
The primary revenue stream comes from annual subscription fees paid by venues for profile listings, enhanced visibility, and promotional placements. Secondary monetization includes advertising placements and upsell features on the platform. The subscription model provides recurring and predictable revenue, while organic content and SEO drive low-cost lead acquisition. With minimal operating costs and no physical overhead, the business runs lean and profitably.

Customer Base
The platform serves a wide range of clientele in the UK events sector including:

Corporate event organizers
Wedding and party planners
Venue managers and marketing teams
Agencies and venue bookers

Operations & Team
The business is highly automated with minimal staffing. The only recurring operational costs are web development and server maintenance. No full-time team is required to operate the business, offering strong passive income potential or a base to build a more hands-on sales and growth team. Ownership involvement is light, primarily focused on admin, renewals, and content moderation.

Growth Opportunities

SEO Optimization: With a strong organic base and over 10K ranking keywords, additional SEO investment could exponentially increase traffic.
Sales Expansion: Introduce direct sales outreach to target underrepresented venue categories (e.g. outdoor, corporate retreats, heritage venues).
Enhanced CRM: Leverage the 35,000-email subscriber list for automated campaigns and retargeting funnels.
Platform Modernization: A UX refresh or feature expansion (e.g. bookings, calendar integrations) could boost engagement and conversion.
Partnerships: Collaborate with wedding planners, corporate event agencies, and event tech providers to broaden monetization.
International Expansion: Explore additional listing revenue by opening up to Irish, European, or Commo`,
  },
  {
    id: `12195937`,
    title: `Woodbury Learning Academy Limited`,
    revealedName: `Woodbury Learning Academy Limited`,
    url: `https://flippa.com/12195937`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 81487.0,
    avgMonthlyRevenue: 7365.0,
    avgMonthlyProfit: 4604.0,
    profitMargin: `62%`,
    annualRevenue: `GBP £69,597`,
    annualProfit: `GBP £43,498`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `Ireland`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `6 years old — established`,
    ],
    seller: {
      name: `Shane Ormsby`,
      location: `Ireland`,
      verified: false,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Subscriptions`,
        amount: `GBP £218 /month`,
      },
      {
        item: `Delivery`,
        amount: `GBP £426 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £1,223 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `Attachments`,
      `Balance Sheet 31st December 2024`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $81,487`,
      `GBP £61,151`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $1.6K`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 771,
    watchers: 12,
    about: `Learnful.ie: Business Overview

Learnful.ie, operated by Woodbury Learning Academy Limited and founded in 2019, is a future-focused online education platform based in Ireland, offering university-verified, industry-endorsed professional diplomas. With a fully automated enrolment system and a mobile-first learning interface, Learnful delivers flexible, high-quality upskilling opportunities that meet the evolving needs of today’s professionals. Over the last five years, the brand has built a reputation as a credible, scalable provider of practical, job-ready qualifications for adult learners, career switchers, and upskillers across key growth industries.

Learnful has generated consistent profitability, with a 62% net margin and USD $58,205 in annual net profit on revenue of USD $93,127 (TTM ending October 2025). Profitability has been achieved through lean operations, a high average order value (USD $749), zero refund rate, and a tightly managed cost base. The platform currently supports 86 verified active customers, with a unique educational product mix validated by both universities and employers.

Key Business Highlights

Brand Strength: Learnful is a verified, trademarked brand with “Learnful,” “Learnful Business,” and “Learnful Prime” all registered and included in the sale. The company maintains a strong digital identity supported by professional brand guidelines, active social channels, and over 350 content-rich blog articles.
Course Design & Technology: Learnful’s programs are university-reviewed and industry-validated, delivered via a mobile-optimized LMS (Learning Management System) that includes full student progress tracking and secure digital credentialing. All learning content, templates, and assessment frameworks are included.
Platform & Operations: The business is powered by a custom-developed WordPress website created by Hidden Depth, a higher education web specialist. The site features a full e-commerce backend with Stripe integration, enabling fully automated registration and enrollment. A “Buy Now, Pay Later” (BNPL) function allows students to pay in interest-free installments, further boosting accessibility.
Customer Experience: The platform maintains a 0% refund rate and features high-impact student testimonials, both video and written, reinforcing the brand’s credibility and outcomes.
Traffic & SEO: Learnful has earned 1.47K organic keywords, a growing backlink profile (129 referring domains), and strong search placement across career-focused queries like “What Is A First Line Manager” and “New Career 40.” The SEO content strategy is evergreen, and further investment would amplify traffic growth.
Credibility & Compliance: Learnful includes a complete Higher Education Quality Assurance (QA) manual and support documents suitable for external programme validation, providing strong regulatory readiness and long-term scalability.
Founder Support: The founder brings 20+ years of operational and education experience and is willing `,
  },
  {
    id: `11930835`,
    title: `officialhtc.com`,
    revealedName: `officialhtc.com`,
    url: `https://flippa.com/11930835`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 150000.0,
    avgMonthlyRevenue: 20490.0,
    avgMonthlyProfit: 8578.0,
    profitMargin: `42%`,
    annualRevenue: `GBP £193,614`,
    annualProfit: `GBP £81,048`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Nuxt, Shopify, Stripe`,
    country: `NV, United States`,
    platform: `Nuxt`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [
      `Only 2 months QuickBooks data available (Jan+Mar 2025)`,
      `Margin inconsistent: 11% (Jan) vs 36% (Mar)`,
      `Heavy contractor dependency — video production for realtors`,
      `Ad-dependent: $6K/mo ad spend`,
      `thehighticketclub.com was offline during earlier research`,
      `Service business requiring US realtor market knowledge`,
    ],
    greenFlags: [
      `Verified QuickBooks P&L with real Stripe revenue ($28K/mo)`,
      `Net income $6,387/mo (~£5K) meets target`,
      `Q1 2025 total: $80.8K revenue verified`,
    ],
    seller: {
      name: `Adrian Sampayo`,
      location: `United States`,
      verified: true,
    },
    socialMedia: [
      `526 followers`,
      `2,900 followers`,
      `740 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £11 /month`,
      },
      {
        item: `Advertising`,
        amount: `GBP £3,002 /month`,
      },
      {
        item: `Subscriptions`,
        amount: `GBP £1,051 /month`,
      },
      {
        item: `Employees & virtual assistants`,
        amount: `GBP £4,015 /month`,
      },
      {
        item: `Content Partners`,
        amount: `GBP £3,677 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Nuxt.js`,
      `Included.`,
      `526 followers`,
      `2,900 followers`,
      `740 followers`,
      `Attachments`,
      `Profit and Loss-HTC-March`,
      `Profit and Loss-HTC-Jan`,
      `Profit and Loss-HTC-Q1`,
      `Contact Seller`,
      `Send message`,
      `Jennifer Cline Jun 25, 2025 11:50 P`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Jennifer Cline`,
        date: `Jun 25, 2025 11:50 PM`,
        text: `Curious why you are wanting to sell?`,
      },
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Nuxt`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1658,
    watchers: 71,
    commentCount: 1,
    about: `The High Ticket Club is a premier real estate content agency that helps realtors establish a dominant online presence. We create and post professional, viral-style home walkthrough videos on your social media accounts three times a week. Our service includes free video editing, ensuring each video showcases properties with high-quality visuals that capture attention and generate leads. This subscription-based service allows realtors to focus on selling while we handle their content strategy and execution.`,
  },
  {
    id: `11939684`,
    title: `pawandglory.com`,
    revealedName: `pawandglory.com`,
    url: `https://flippa.com/11939684`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 115000.0,
    avgMonthlyRevenue: 18611.0,
    avgMonthlyProfit: 6223.0,
    profitMargin: `33%`,
    annualRevenue: `GBP £175,848`,
    annualProfit: `GBP £58,802`,
    expensesLastMonth: `GBP £7,554 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `6 years old — established`,
      `Strong profit $6,223/mo`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    socialMedia: [
      `8,000 followers`,
      `63,800 followers`,
      `3,916 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £7,554 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `8,000 followers`,
      `63,800 followers`,
      `3,916 followers`,
      `41,217 subscribers`,
      `Attachments`,
      `XLSX`,
      `Paw & Glory P&L 2021-2025 USD`,
      `XLSX`,
      `Paw & Glory P&L 2021-2025 GBP`,
      `No comments`,
      `Managed by Flippa`,
      `Show all`,
      `Open fo`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `75,540`,
      totalPageViews: `36,810`,
      pagesPerSession: `3.99`,
      avgDuration: `00:01:16`,
      engagementRate: `0.68%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 12354,
        },
        {
          country: `United States`,
          views: 4542,
        },
        {
          country: `Australia`,
          views: 160,
        },
        {
          country: `India`,
          views: 106,
        },
        {
          country: `China`,
          views: 25,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2996,
    watchers: 200,
    about: `Key Highlights

Paw & Glory is a fast-growing, pet-centric e-commerce brand that specializes in custom pet portraits with a humorous, regal twist. Since launching in October 2020, the company has generated just under £1 million in total revenue, built a loyal customer base of over 21,000 pet lovers, and grown an active email list of 35,000+ subscribers.

Operating through a streamlined print-on-demand model via Shopify, Paw & Glory has fulfilled thousands of personalized orders across the UK, US, and beyond—without the burden of holding inventory. With over 2,000 five-star reviews and consistent top-3 rankings on Google Ads for pet portraits in the UK, the brand has cemented its reputation as a go-to destination for high-quality, humorous pet gifts.

Business Model & Operations

Paw & Glory operates on a direct-to-consumer, print-on-demand model, enabling rapid scalability with minimal fixed costs. All products are made to order, removing inventory risks and allowing for a highly personalized customer experience.

The business leverages Shopify for its e-commerce infrastructure, paired with integrated print-on-demand partners and automated order flows. This efficient backend allows the small team to remain agile, test new offerings quickly, and focus heavily on brand, design, and customer acquisition.

This lean operational structure has allowed Paw & Glory to maintain strong gross profit margins while investing in growth and customer retention.

Market Opportunity

The global pet market continues to grow, with consumers increasingly seeking personalized, premium products to celebrate their furry companions. Paw & Glory’s unique blend of humor, custom artwork, and quality craftsmanship puts it in a strong position within the booming pet gift and home decor sector.

While the brand has established a dominant presence in the UK, international expansion—particularly in the US—is underway and showing promising early traction.

Customer Profile

Paw & Glory’s customers are predominantly pet owners aged 25–55, with disposable income and a high emotional investment in their pets. Most purchases are either gifts or keepsakes, making the product offering inherently shareable and sentiment-driven.

Repeat purchase rates are strong, and much of the brand’s growth is fueled by referrals, word of mouth, and social proof—as evidenced by thousands of verified reviews and strong social media engagement.

Technology & Marketing

The company’s tech stack includes:

Shopify for e-commerce and operations`,
  },
  {
    id: `12206256`,
    title: `Juca Nery Guitar`,
    revealedName: `Juca Nery Guitar`,
    url: `https://flippa.com/12206256`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 93288.0,
    avgMonthlyRevenue: 5526.0,
    avgMonthlyProfit: 5434.0,
    profitMargin: `98%`,
    annualRevenue: `GBP £52,210`,
    annualProfit: `GBP £51,340`,
    ageYears: 13.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `Portugal`,
    platform: `complemented`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `13 years old — established`,
      `Strong profit $5,434/mo`,
    ],
    seller: {
      name: `Juca Nery`,
      location: `Portugal`,
      verified: false,
    },
    socialMedia: [
      `2,500 followers`,
      `900 followers`,
      `300 followers`,
      `126 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email subscriber list`,
      `Unique content`,
      `Unique design`,
      `Product Schema`,
      `Included.`,
      `2,500 followers`,
      `900 followers`,
      `300 followers`,
      `126 followers`,
      `25 subscribers`,
      `4,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `Partial Sale of 25% Equity`,
      `USD $114,889`,
      `USD $93,288`,
      `Reduced 19%`,
      `GBP £70,007`,
      `Total Business Valuation`,
      `GBP £280,029`,
      `Contact Seller Subm`,
    ],
    postSaleSupport: `and onboarding`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 653,
    watchers: 9,
    about: `Juca Nery Guitar: Business Overview

Juca Nery Guitar is a long-established, high-margin e-commerce brand specializing in premium digital guitar tones, artist bundles, and custom-crafted patches for musicians worldwide. Founded in 2013 and powered by WooCommerce, the business has built a strong market position within the entertainment and music-production niche, delivering highly specialized products that cater to both professional and amateur guitarists seeking studio-quality sound. With a 12-year operating history, a refined digital product catalog, and exceptional profitability of 98%, the business represents a mature, stable, and scalable digital commerce asset with minimal overhead and diversified payment infrastructure.

Key Financials (Trailing Twelve Months ending November 2025)

Revenue: USD $68,934
Profit: USD $67,785
Monthly Revenue: USD $5,744
Monthly Profit: USD $5,648
Profit Margin: 98%
Profit Multiple: 5.5x
Revenue Multiple: 5.4x
Orders: 625
Customers: 498
Average Order Value: USD $31
Refund Rate: 0%

Business Overview & Market Positioning

Juca Nery Guitar has built a defensible foothold in the global guitar and digital tone marketplace by blending technical expertise, niche product development, and content-driven marketing. The brand caters to a broad audience ranging from hobbyists to professional musicians, offering high-quality, plug-and-play patches designed for popular guitar processors, boutique amp simulations, and artist-inspired sound collections. Demand for digital tones continues to grow as more musicians transition to digital rigs and home studio environments, positioning the business in a lucrative, expanding niche with recurrent search volume and long-term customer loyalty.

Operating on WooCommerce ensures a flexible, scalable, and cost-efficient sales environment. Product pages are optimized for discovery and conversion, allowing customers to make frictionless purchases through secure payment gateways including Stripe and PayPal. With complete ownership of its content library and digital inventory, the business maintains exceptionally low operating expenses and near-total profit capture.

Product & Revenue Model

The company generates revenue exclusively through digital product sales, offering a catalogue of high-performance tone packs, bundles, and amp simulations. Top sellers include the Artist Bundles, Boutique Amps Collection, Max Bundle Pack, Marshal Plexi, and GT-1000 premium packs. These products are evergreen, require no replenishment, and offer instant global delivery, creating an operational model that is highly scalable with no dependency on physical logistics.

The diversified product suite is optimized for repeat purchasing, with customers often expanding their collection after an initial purchase. The absence of returns or refunds underscores strong product-market fit and high customer satisfaction. Digital delivery eliminates inventory risks and allows the business to maintain a strong margin profil`,
  },
  {
    id: `12003824`,
    title: `myelegantwebsites.com`,
    revealedName: `myelegantwebsites.com`,
    url: `https://flippa.com/12003824`,
    domain: `https://www.facebook.com/profile.php?id=100072581376225`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 72920.0,
    avgMonthlyRevenue: 3336.0,
    avgMonthlyProfit: 3293.0,
    profitMargin: `99%`,
    annualRevenue: `GBP £31,519`,
    annualProfit: `GBP £31,113`,
    ageYears: 15.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `Philippines`,
    platform: `Client`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `15 years old — established`,
    ],
    seller: {
      name: `Mark Tristan`,
      location: `Philippines`,
      verified: true,
      transactions: `2 transactions totalling USD $40,400`,
    },
    socialMedia: [
      `26 followers`,
    ],
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £38 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email subscriber list`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `WordPress`,
      `Included.`,
      `26 followers`,
      `1,500 subscribers`,
      `Attachments`,
      `Audited-Financial-Statement`,
      `XLSX`,
      `Aug-2025-Profit_and_Loss`,
      `Contact Seller`,
      `Send message`,
      `The seller deleted a comment from chand`,
      `The seller deleted a comment from Ryan Rambajohn`,
      `The seller deleted a comment from CJ Rosenbaum`,
      `Show all`,
      `Open for negotiation`,
      `Indic`,
    ],
    postSaleSupport: `and strategic transition guidance.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 2482,
    watchers: 65,
    about: `Update:

Consistent offers ongoing. Still open to negotiation. Feel free to drop me a message.

For immediate sale as the owner doesn’t have time to manage the business. Price is negotiable. Contact me for any questions and inquiries.


My Elegant Websites: Business Overview

My Elegant Websites, founded in 2010, is a long-standing software development and digital design agency that specializes in delivering elegant, high-performance web solutions for global businesses. Over the past 14 years, the business has established a loyal base of 1,500 clients by offering high-quality website development, UI/UX design, and application solutions tailored to meet specific business objectives.

Operating with a lean cost structure and a 99% profit margin, the agency generated USD $41,580 in profit over the past 12 months ending May 2025—representing a near-complete conversion of revenue to net earnings. This is a true lifestyle business with robust profitability, flexible operations, and significant scalability potential, particularly for a buyer with full-time involvement and marketing reactivation.

Reason for Selling

Over the past years, the business has generated an average annual income of approximately $100,000, with a peak valuation of $168,000 in 2023. The owner has transitioned in Food and Beverage venture with capitalization from the same business - myelegantwebsites.com company. The venture comprises of 3 restaurants. The owner  wants to free up time prompting the decision to explore a sale now. Currently, the owner is not accepting new work at the moment aside from maintenance and small edits. It’s worth noting that, with focused ownership, the business still has the potential to reach or exceed $100,000 in annual earnings.

Key Business Highlights

Geographical Reach: Fully remote agency with global clients in the USA, Canada, UK, EU, and Australia
Client Base: 1,500+ active and recurring clients across multiple industries
Customer Retention: Many clients return for repeat work, particularly via LinkedIn and partner referrals
Service Pricing: Shopify projects range from USD $5,000–$10,000+, with Shopify Plus packages reaching USD $20,000
Agency Partnerships: Positioned as a trusted white-label provider to agencies unable to fulfill technical capacity
Operations: Managed by a senior software engineer owner with scalable contractor support in the Philippines, India, USA, and UK

Marketing Efficiency

The business has sustained growth purely through word of mouth, LinkedIn engagement, and organic referrals. There are no current paid marketing efforts, representing a high-impact growth opportunity for a buyer ready to invest in acquisition campaigns. Historically, the founder has secured projects via:

Shopify Partner Network
LinkedIn outreach and referrals
Direct tie-ups with white-label web development firms

Team & Operations

The agency is owner-operated with a flexible, contractor-based delivery model. Contractors are activated as needed to fu`,
  },
  {
    id: `12166064`,
    title: `The Social Content Factory`,
    revealedName: `The Social Content Factory`,
    url: `https://flippa.com/12166064`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 194011.0,
    avgMonthlyRevenue: 17877.0,
    avgMonthlyProfit: 4301.0,
    profitMargin: `24%`,
    annualRevenue: `GBP £168,913`,
    annualProfit: `GBP £40,651`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `CONSIDER`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `6 years old — established`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `6 transactions totalling USD $7,904,502`,
    },
    socialMedia: [
      `144 followers`,
      `16,400 followers`,
      `21 followers`,
    ],
    expenses: [
      {
        item: `Subscriptions`,
        amount: `GBP £633 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `144 followers`,
      `16,400 followers`,
      `21 followers`,
      `3,374 subscribers`,
      `Attachments`,
      `XLSX`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `13,283`,
      totalPageViews: `2,458`,
      pagesPerSession: `1.33`,
      avgDuration: `00:00:18`,
      engagementRate: `0.38%`,
      topCountries: [
        {
          country: `Australia`,
          views: 383,
        },
        {
          country: `United States`,
          views: 376,
        },
        {
          country: `India`,
          views: 205,
        },
        {
          country: `China`,
          views: 109,
        },
        {
          country: `Singapore`,
          views: 85,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1447,
    watchers: 82,
    about: `A Scalable, Proven Content Creation Agency

Founded in 2019, this Australian-based creative agency has become a trusted partner for leading FMCG and lifestyle brands. Specialising in high-impact, social-first content, the business blends creative strategy, storytelling, and automation to deliver assets that consistently drive engagement and brand growth across Instagram, TikTok, and Facebook.

From food and beverage to skincare, alcohol, pet, and lifestyle, the agency has built a strong reputation for creating scroll-stopping, on-brand content. Its subscription-based model ensures predictable recurring revenue, complemented by one-off campaigns and long-term retainer clients.

With streamlined systems, a remote team of creative professionals, and a loyal client base, this business is a turnkey opportunity for anyone looking to step into or expand within the digital content and influencer marketing space.

Key Highlights

Established Client Base: 10 active clients, including 8 on recurring packages. The largest client group contributes 28% of revenue, representing four separately managed brand accounts.

Strong Retention: Average client tenure of 2 years; long-term relationships form the foundation of predictable monthly income.

High-Value Packages: Subscription packages range from $2,500–$5,000/month, with an average client value of $3,800/month.

Streamlined Operations: Project-managed via ClickUp with automated workflows, ensuring low overheads and reliable delivery.

Lean, Distributed Team: A hybrid team of full-time and freelance specialists based in Australia and the Philippines manages creative direction, content design, marketing, and client communication.

Flexible Operations: Can be managed remotely with an average owner input of just 5 hours per week.

Operations

Each month, the agency delivers a full content cycle for its clients — including one content shoot, editing, and production of around 12 posts (photos, reels, or graphics). Clients receive detailed monthly performance reports, and all work is planned one month in advance to ensure seamless execution.

Team Overview

Owner (Limited-Hours, Australia) – Oversees operations, accounting, invoicing, and provides strategic guidance. (~5 hrs/week)

Head of Creative (Full-Time, Australia) – Leads all projects, manages client relationships, and briefs the creative team. (~37.5 hrs/week)

Marketing Specialist (Freelance, Australia) – Manages website, EDMs, blog content, and PPC campaigns. (~30 hrs/week)

Graphic Designer (Freelance, Philippines) – Designs and edits content for client accounts. (~37.5 hrs/week)

Lead Generator (Freelance, Philippines) – Manages inbound Instagram enquiries and outbound prospecting. (~37.5 hrs/week)

Freelance Photographers & UGC Creators (Australia) – Provide lifestyle and product content for client campaigns. (~1 day/week per shoot)

Workflow & Tools

Project Management: ClickUp (with automation and content tracking)

Communications & File Storage: Googl`,
  },
  {
    id: `11920011`,
    title: `AI Restore old photo quality`,
    revealedName: `AI Restore old photo quality`,
    url: `https://flippa.com/11920011`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 110000.0,
    avgMonthlyRevenue: 5163.0,
    avgMonthlyProfit: 4496.0,
    profitMargin: `87%`,
    annualRevenue: `GBP £48,779`,
    annualProfit: `GBP £42,475`,
    ageYears: 0.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Ukraine`,
    platform: `Android`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 40,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 54.4,
    },
    recommendation: `CONSIDER`,
    redFlags: [
      `Ukraine-based developer — geopolitical risk`,
      `Stats only — no P&L chart to verify consistency`,
    ],
    greenFlags: [
      `AI photo restoration Android app — fully digital`,
      `£3,540/mo profit`,
      `500K+ downloads on Google Play`,
    ],
    seller: {
      name: `Kyrylo Shadrintsev`,
      location: `Ukraine`,
      verified: true,
      transactions: `2 transactions totalling USD $3,350`,
    },
    expenses: [
      {
        item: `Server rent`,
        amount: `GBP £563 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Website files`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Custom technology`,
      `Source Code`,
      `Android`,
      `Included.`,
      `Attachments`,
      `Screenshot_20250313_121216_Chrome`,
      `Contact Seller`,
      `Send message`,
      `PUSHKAR SINGH Sep 03, 2025 05:10 PM`,
      `Report this comment Reply`,
      `Kyrylo Shadrintsev Aug 12, 2025 08:08 AM`,
      `@radupanait yes`,
      `Report this comment Reply`,
      `Radu Pa`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `PUSHKAR SINGH`,
        date: `Sep 03, 2025 05:10 PM`,
        text: `Please share your app statistics regarding impression install churn etc`,
      },
      {
        author: `Kyrylo Shadrintsev`,
        date: `Aug 12, 2025 08:08 AM`,
        text: `@radupanait yes`,
      },
      {
        author: `Radu Panait`,
        date: `Jun 06, 2025 01:37 AM`,
        text: `Is the app still available for purchase?`,
      },
      {
        author: `Harshid patel`,
        date: `May 30, 2025 09:25 PM`,
        text: `Can you share some more details? I mean daily install, Active users, Total users.`,
      },
    ],
    ga: {},
    integrations: [
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2921,
    watchers: 77,
    commentCount: 4,
    about: `**Key Highlights**

Launched in 2023,  This application stands out as a pivotal tool for individuals looking to breathe new life into aged or deteriorated photographs. It capitalizes on Google's Play Store for distribution and employs an innovative combination of artificial intelligence features to restore, enhance, and colorize old photos, fostering both artistic expression and nostalgic preservation. Monetization is strongly anchored in a dual strategy, leveraging both in-app advertising and subscription services, thereby creating a balanced revenue stream.

**Operations**

The financial engine of this business is fueled by two primary channels: ads and subscriptions. The ad channel is extensively powered by Google's AdMob platform, supplemented by other advertising networks, allowing the app to generate revenue from every user interaction. AdMob’s integration ensures a seamless and targeted ad delivery mechanism, capitalizing on the vast Android user base to optimize ad impressions and clicks. Further enriching its revenue canvas, the application offers a premium subscription service strategically tailored to users who wish to experience the app ad-free and unlock exclusive features and tools. This service not only provides a consistent stream of income but also fosters a dedicated user community committed to long-term engagement with the platform. As a young enterprise, maximizing both these revenue streams is critical to building a sustainable operational model in such a competitive app marketplace.

**Customers**

The core customer base for the app primarily consists of individuals passionate about photography, digital art, and historical preservation. This diverse demographic ranges from amateur photographers to professional designers looking for robust tools to revitalize old images. Additionally, families and historians are drawn to the app's capabilities as it allows them to preserve and appreciate their heritage through enhanced visuals. The app has tailored its marketing strategy to appeal to these diverse segments via targeted campaigns, leveraging social media and Google’s ad networks to reach potential users with pinpoint precision.

**Technology**

The backbone of the application’s success lies in its advanced AI technology, which uses sophisticated algorithms to analyze, enhance, and colorize photographs. This technology is constantly evolving, with the development team continually working to refine the AI models, ensuring improvements in speed, accuracy, and the overall quality of photo restoration. By leveraging cloud processing capabilities, the application delivers quick and efficient results, making it a versatile and scalable solution for users globally. The platform's seamless integration with the Google ecosystem ensures that the UI and UX are consistently optimized, providing a smooth and intuitive user experience on all devices.

**Financials**

Since its inception in 2023, the business has swiftly established a solid f`,
  },
  {
    id: `12229753`,
    title: `itradeaims.net`,
    revealedName: `itradeaims.net`,
    url: `https://flippa.com/12229753`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 32640.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 453.39, expenses: 35.56, profit: 417.83 },
      { month: `Apr 2025`, revenue: 181.61, expenses: 35.56, profit: 146.05 },
      { month: `May 2025`, revenue: 1696.72, expenses: 35.56, profit: 1661.16 },
      { month: `Jun 2025`, revenue: 1313.18, expenses: 35.56, profit: 1277.62 },
      { month: `Jul 2025`, revenue: 1303.02, expenses: 35.56, profit: 1267.46 },
      { month: `Aug 2025`, revenue: 2794.0, expenses: 35.56, profit: 2758.44 },
      { month: `Sep 2025`, revenue: 4748.53, expenses: 226.06, profit: 4522.47 },
      { month: `Oct 2025`, revenue: 3491.23, expenses: 130.81, profit: 3360.42 },
      { month: `Nov 2025`, revenue: 9775.19, expenses: 321.31, profit: 9453.88 },
      { month: `Dec 2025`, revenue: 2278.38, expenses: 214.63, profit: 2063.75 },
      { month: `Jan 2026`, revenue: 815.34, expenses: 35.56, profit: 781.05 },
      { month: `Feb 2026`, revenue: 900.43, expenses: 457.2, profit: 443.23 },
    ],
    avgMonthlyRevenue: 2479.0,
    avgMonthlyProfit: 2346.0,
    profitMargin: `95%`,
    annualRevenue: `GBP £23,425`,
    annualProfit: `GBP £22,168`,
    ageYears: 15.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    churn: `2%`,
    subscribers: `14`,
    country: `United Kingdom`,
    platform: `built`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 77.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue is a one-off spike — Nov 2025 spike then crash to near-zero`,
      `£1,952/mo average is inflated by single month outlier`,
      `Page views show same spike pattern — not organic growth`,
      `Trading education/signals — persona-dependent, no moat`,
      `CV 110% — extreme volatility, some months near zero ($146)`,
      `High revenue volatility (CV 102%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Sheryar`,
      location: `Pakistan`,
      verified: true,
      transactions: `3 transactions totalling USD $7,715`,
    },
    socialMedia: [
      `2,700 followers`,
      `2,300 followers`,
      `384 followers`,
      `17 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £1 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £14 /month`,
      },
      {
        item: `TradingView Premium Subscription`,
        amount: `GBP £13 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `WordPress`,
      `2,700 followers`,
      `2,300 followers`,
      `384 followers`,
      `17 followers`,
      `0 followers`,
      `4,600 subscribers`,
      `4,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Profit`,
    ],
    postSaleSupport: `and full documentation`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `30,303`,
      totalPageViews: `3,319`,
      pagesPerSession: `1.21`,
      avgDuration: `00:00:18`,
      engagementRate: `0.34%`,
      topCountries: [
        {
          country: `China`,
          views: 522,
        },
        {
          country: `United States`,
          views: 312,
        },
        {
          country: `Singapore`,
          views: 222,
        },
        {
          country: `Australia`,
          views: 101,
        },
        {
          country: `United Kingdom`,
          views: 78,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1927,
    watchers: 35,
    about: `Business Overview

iTradeAIMS is a highly profitable, low-maintenance SaaS and digital education business offering proprietary trading software, structured trading courses, and a loyal community of retail traders. Established in 2011 and monetized since 2012, the business has evolved into a comprehensive digital platform built on WordPress and aMember Pro, with full automation, downloadable content protection, and minimal operational overhead.

The business delivers a 96% profit margin and generated over USD $27,800 in revenue with USD $26,786 in net profit over the trailing 12 months ending November 2025. This reflects a monthly average profit of USD $2,232, largely driven by high-ticket lifetime product sales and low churn recurring memberships. The revenue model is bolstered by digital tools and expert trading indicators for MT4 and TradingView, with strategic upsells and cross-promotions across products and services.

iTradeAIMS benefits from a 14-year history and strong brand equity in the Forex trading education space. It boasts a clean, scalable tech stack, proprietary content, and a systematized acquisition funnel that includes YouTube, Google Search, and three automated lead magnets feeding into a 50-part email warm-up sequence.

Key Financials (Trailing Twelve Months Ending Nov 2025)

Revenue: USD $27,830
Net Profit: USD $26,786
Profit Margin: 96%
Monthly Recurring Revenue (MRR): USD $1,022
Average Order Value (AOV): USD $205
Lifetime Value (LTV): USD $465
Churn: 38% (mostly due to lifetime model preference)
Total Orders: 129
Refund Rate: 1%
Active Subscribers: 14
Overall Churn: 2%

Platform & Operations

The site runs on a stable WordPress architecture integrated with aMember Pro, FluentCRM, and Stripe/PayPal for billing automation. Members access protected content via a dedicated portal with LMS functionality and downloadable assets. Operations require less than one hour per week, focused on monitoring email sequences and community updates.

Support overhead is minimal, as the educational content is self-paced and the trading tools are delivered digitally with documentation. A Discord group and phpBB forum of over 2,000 members provide peer support and foster community-driven learning.

Product Offering

The business monetizes through both one-time and subscription-based products:

Education: Structured online courses priced between $497–$1997, targeting beginner to advanced traders.
Software: Custom-built indicators and Expert Advisors (EAs) for MetaTrader 4 and TradingView, including flagship tools like the Banana Indicator and AIMSBox.
Bundles & Upsells: Strategic promotional bundles offered seasonally, with dynamic pricing tiers and discounts to stimulate conversions.

All products are proprietary, unique, and have been validated by a decade of active market use and community feedback.

Marketing & Traffic

iTradeAIMS attracts traffic primarily through direct (47%) and paid search (43%) channels, with supporting traffic from organ`,
  },
  {
    id: `11890246`,
    title: `Repricehub.com`,
    revealedName: `Repricehub.com`,
    url: `https://flippa.com/11890246`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 138000.0,
    monthlyPL: [
      { month: `Jun 2024`, revenue: 5393.69, expenses: 1559.56, profit: 3832.86 },
      { month: `Jul 2024`, revenue: 5875.02, expenses: 1743.71, profit: 4132.58 },
      { month: `Aug 2024`, revenue: 6043.93, expenses: 1572.26, profit: 4471.67 },
      { month: `Sep 2024`, revenue: 5901.69, expenses: 1582.42, profit: 4319.27 },
      { month: `Oct 2024`, revenue: 5669.28, expenses: 1574.8, profit: 4094.48 },
      { month: `Nov 2024`, revenue: 5279.39, expenses: 1573.53, profit: 3705.86 },
      { month: `Dec 2024`, revenue: 5320.03, expenses: 1574.8, profit: 3745.23 },
      { month: `Jan 2025`, revenue: 4754.88, expenses: 1572.26, profit: 3182.62 },
      { month: `Feb 2025`, revenue: 4462.78, expenses: 1573.53, profit: 2889.25 },
      { month: `Mar 2025`, revenue: 4450.08, expenses: 1573.53, profit: 2876.55 },
      { month: `Apr 2025`, revenue: 4390.39, expenses: 1574.8, profit: 2815.59 },
      { month: `May 2025`, revenue: 5115.56, expenses: 1574.8, profit: 3542.03 },
    ],
    avgMonthlyRevenue: 5221.0,
    avgMonthlyProfit: 3634.0,
    profitMargin: `70%`,
    annualRevenue: `GBP £49,336`,
    annualProfit: `GBP £34,336`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `3%`,
    subscribers: `52`,
    country: `Bulgaria`,
    platform: `to`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 85.0,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 65,
      growthPotential: 80,
      overall: 74.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -26% — Repricehub.com`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `2 transactions totalling USD $115,628`,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Heroku Proxy`,
      `Included.`,
      `12,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Repricehub P&L Statement (3)`,
      `Jaro May 16, 2025 01:37 AM`,
      `Report this comment Re`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Jaro`,
        date: `May 16, 2025 01:37 AM`,
        text: `Financials updated until April 2025. MRR sitting at $4.5k, multiple at 3.0x. Send me a direct message for serious buyers`,
      },
    ],
    ga: {
      users: `4,698`,
      totalPageViews: `899`,
      pagesPerSession: `1.16`,
      avgDuration: `00:00:10`,
      engagementRate: `0.25%`,
      topCountries: [
        {
          country: `United States`,
          views: 373,
        },
        {
          country: `China`,
          views: 86,
        },
        {
          country: `Singapore`,
          views: 66,
        },
        {
          country: `United Kingdom`,
          views: 42,
        },
        {
          country: `India`,
          views: 36,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 4771,
    watchers: 169,
    commentCount: 1,
    about: `Key Highlights

All-in-One Solution for Amazon Resellers – RepriceHub automates repricing, helping sellers win the Buy Box, maximize profits, and stay competitive without manual effort.
Recurring Revenue – With Amazon sellers always needing optimization, this SaaS has a built-in demand, making it a scalable and reliable subscription business.
High-Demand Niche – Amazon resellers are constantly seeking automation tools to improve efficiency, providing strong growth potential for an acquirer.
Optimization Opportunities – Very little has been done in the way of marketing, so the growth potential is significant

Operations

RepriceHub.com is an all-in-one AI-powered repricing solution for Amazon resellers, helping them automatically adjust prices to stay competitive and maximize profits. The business operates on a subscription-based SaaS model, generating recurring revenue from users who rely on the platform to optimize their pricing strategies. Currently, the platform runs with minimal maintenance, requiring only occasional customer support, minor updates, and marketing efforts to acquire new users. Estimated time commitment is 5-10 hours per week, mainly for handling customer inquiries, monitoring system performance, and implementing growth strategies. With automation in place, it’s a low-maintenance business with strong potential for scaling.

Customers

All of our customers are Amazon resellers mostly based in the US. Currently, we have 52 paying subs that pay for Repricehub every month`,
  },
  {
    id: `12295763`,
    title: `megasboutique.shop`,
    revealedName: `megasboutique.shop`,
    url: `https://flippa.com/12295763`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 45000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `Mar 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `Apr 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `May 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `Jun 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `Jul 2025`, revenue: 12454.89, expenses: 6849.11, profit: 5604.51 },
      { month: `Aug 2025`, revenue: 12458.7, expenses: 6851.65, profit: 5607.05 },
      { month: `Sep 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Oct 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Nov 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Dec 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 12455.0,
    avgMonthlyProfit: 3270.0,
    profitMargin: `45%`,
    annualRevenue: `GBP £68,650`,
    annualProfit: `GBP £30,895`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `React, Shopify, Stripe`,
    country: `Trinidad and Tobago`,
    platform: `Instapage`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 95.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 73.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (megasboutique.shop) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Omega Raymond`,
      location: `Trinidad and Tobago`,
      verified: true,
    },
    socialMedia: [
      `20,600 followers`,
    ],
    expenses: [
      {
        item: `month
Merchant & Transactions fees`,
        amount: `GBP £315 /month`,
      },
      {
        item: `fedex`,
        amount: `GBP £193 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £8 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Other`,
      `Instapage`,
      `Included.`,
      `20,600 followers`,
      `Attachments`,
      `Financial Summary`,
      `Bank Statements Due Diligence`,
      `Bank statements`,
      `Business Registration`,
      `Flippa suggested price range`,
      `Contact Seller`,
      `Send message`,
      `Omega Raymond Mar 20,`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Omega Raymond`,
        date: `Mar 20, 2026 08:59 AM`,
        text: `@User adf21b6d Thank you, I have reviewed your offer and responded in the Deal Room. Looking forward to continuing there.`,
      },
      {
        author: `Josie Tyron`,
        date: `Mar 20, 2026 08:54 AM`,
        text: `Broker please respond sent a offer awaiting response good afternoon`,
      },
      {
        author: `Kareem Seales`,
        date: `Mar 20, 2026 08:32 AM`,
        text: `Hello I am highly interested please check messages thanks`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 20, 2026 07:53 AM`,
        text: `@superman9152001 We understand your concerns. The listing is now under structured broker management to ensure a stable and consistent process for this asset. All communication and due diligence will be handled through the Deal Room for serious buyers. We wish you the best in your search.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 20, 2026 07:53 AM`,
        text: `@User efb2d5b3 We understand your concerns. The listing is now under structured broker management to ensure a stable and consistent process for this asset. All communication and due diligence will be handled through the Deal Room for serious buyers. We wish you the best in your search.`,
      },
      {
        author: `Darnell Thompson`,
        date: `Mar 20, 2026 07:41 AM`,
        text: `@superman9152001 I waited too my inbox has been getting contant messages from this sale im sick of this also if you dont know a guarantee price then you should consider checking with a broker or someone with knowledge I'm about to cancel my looking at this`,
      },
      {
        author: `claude cote`,
        date: `Mar 20, 2026 07:18 AM`,
        text: `@User efb2d5b3 I don’t think she understands. This is not helping her sale at all.. flip-flopping all over the place with the price, I was thinking about getting the site it at $25,000 I waited to get home first and now it’s almost doubled within, just a few hours with no time to even contact her and now it’s a higher price than ever. She’s definitely undermining her sale.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 20, 2026 06:50 AM`,
        text: `@User efb2d5b3 Understood. The price has now been fixed at $45,000 for a structured broker managed sale. We will no longer be adjusting pricing going forward. Thank you for the honest feedback.`,
      },
      {
        author: `Darnell Thompson`,
        date: `Mar 20, 2026 06:45 AM`,
        text: `@superman9152001 right can we just stick to one price im sick of these consant emails I keep getting from 25K to 35 K and just reversing`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 20, 2026 06:22 AM`,
        text: `@superman9152001 We were initially trying to facilitate a quick liquidation due to the owner’s upcoming medical leave. However, the decision has now been made to keep the listing at a fixed price and allow it to be handled through a broker process until the right buyer comes forward. Appreciate you pointing that out.`,
      },
      {
        author: `claude cote`,
        date: `Mar 20, 2026 06:16 AM`,
        text: `You’ve changed the price like 10 times in the last two days?`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 17, 2026 07:46 AM`,
        text: `Final Update
With less than 16 hours remaining, I’ve uploaded a 12-Month Performance Summary showing the operating year immediately prior to the medical pause, including $61k net profit and 45% margins.

The sale includes supplier introductions and transition support to assist the new owner with relaunch. An additional bonus will be included for a Buy It Now buyer.

I’m available via private message for any final due diligence questions before the auction closes.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 15, 2026 04:19 AM`,
        text: `Update for the 50 Watchers:
As we enter the final week of the auction, I want to clarify the transition process. The $35,000 reserve includes a direct introduction to our hair suppliers and a full walkthrough of the Caribbean–USA shipping workflow.

My goal is to ensure the new owner can take over smoothly and resume operations immediately, leveraging the brand’s existing audience and approximately 30k organic views over the past 90 days.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 14, 2026 03:49 AM`,
        text: `With a few days remaining in the auction, serious buyers can bid toward the $35,000 reserve or select the $45,000 'Buy It Now' option for an immediate acquisition. This turnkey business featuring 20k followers, established supplier pipelines, and a proven 45% net margin is priced significantly below its 2x annual profit valuation to facilitate a swift handoff. All verified financials and SOPs are ready for a seamless transition.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 13, 2026 07:51 AM`,
        text: `Quick Update for Watchers:
The auction has 8 days remaining.
For clarity, this sale includes -
100% ownership of Mega Boutique brand assets
Instagram account with 20k followers
Domain name
Documented supplier contacts and SOPs
Historical revenue verification
Customer Instagram database (with past orders and engagement)
This is a turnkey brand, so the buyer can take over operations without starting from scratch.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 12, 2026 09:59 AM`,
        text: `FAQ / Reserve Clarification -
To assist serious bidders, I am confirming the reserve is $35,000 USD. This is a deliberate, low-entry price, reflecting the current operational pause and providing an opportunity for a fast, smooth transition. I am seeking a buyer ready to reactivate and scale this proven 20K-follower brand, which has historically generated consistent high-margin revenue with minimal marketing.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 11, 2026 01:25 AM`,
        text: `Thank you to everyone following the listing. For clarity, The pause over the past months was due to medical reasons, not operational issues, and it presents a clear opportunity for a new owner to scale via Shopify, email marketing, or partial in-stock inventory. Full financial documentation and transition support are available for serious buyers, ensuring a smooth handoff and immediate revenue potential.`,
      },
      {
        author: `Omega Raymond`,
        date: `Mar 10, 2026 02:49 PM`,
        text: `Thank you for the interest and questions regarding the business.
To clarify for buyers: the brand has historically operated as a social-commerce model, with customers placing orders directly via Instagram and WhatsApp, which is common in the Caribbean market. The business has not operated through a formal website, which presents a clear growth opportunity for a new owner to implement an Shopify store.`,
      },
      {
        author: `Omega Raymond`,
        date: `Feb 22, 2026 05:06 AM`,
        text: `Hey Thank You For inquiries , To clarify for international bidders/Buyers - The public RBC statement showing $258,847.50 TTD represents $38,150 USD in revenue for a single quarter. This confirms the $677k USD lifetime revenue and the 45% net margin.`,
      },
      {
        author: `Omega Raymond`,
        date: `Feb 21, 2026 02:22 AM`,
        text: `Thank you to the watchers for the interest so far & Private messages . I know there is a lot of data to digest! I wanted to let everyone know I am available for private DMs if you have specific questions about the supplier handoff or the organic growth strategy. My goal is a 100% transparent and smooth transition for the next owner.`,
      },
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Shopify`,
      `Stripe`,
    ],
    views: 665,
    watchers: 51,
    commentCount: 20,
    about: `High-Margin Organic E-Commerce Hair Extensions Brand – $677K Verified Revenue – Pre-Order Model

Overview

For sale is a fully remote, organic e-commerce business specializing in premium hair extensions, established and trusted across the Caribbean and US markets for 6 years. This profitable brand boasts $677,421 USD in verified lifetime revenue and averages a robust 45% net profit margin with minimal advertising spend. Utilizing a proven pre-order model that delivers consistent positive cash flow and minimal inventory risk, the business is operated entirely online—no lease, no physical storefront, and no long-term obligations.

Key Financial Highlights

Location: Trinidad and Tobago (fully remote, global reach)
Years in Operation: 6 Years
Average Monthly Profit: USD $3,431
Profit Margin: 45%
Total Verified Revenue: $677,421 USD
Seller’s Discretionary Earnings (SDE): $300,000+ USD (over 4 years)
Average Monthly Revenue: USD $7,623 (pre-pause)
Order Volume: 3,500+ transactions
Instagram Community: 20,600+ followers
Verified Testimonials: 300+ customer highlights
Operational Commitment: 10–15 hours/week
No debt, leases, or long-term liabilities
Profit Multiple: 1.1x | Revenue Multiple: 0.5x

Business Model & Operations

100% remote operation based out of Trinidad & Tobago—sales funnel runs through Instagram & WhatsApp with a streamlined landing page for lead capture.
Efficient pre-order process: Customers order via Instagram/WhatsApp, pay upfront, and then orders are placed with suppliers (China/US) via PayPal. Delivery is managed via FedEx or local courier.
Minimal ad spend—organic social growth and word-of-mouth have driven nearly all revenue.
Supports dropshipping or 3PL fulfillment, with flexible expansion paths available.
All customer, supplier, and operational contacts included for seamless handoff.

Brand Assets & Community

Dominant Instagram brand with over 20,600 engaged followers and 300+ public customer testimonials.
Recognized market presence and authority in the Caribbean/US hair extensions space.
Loyal customer base familiar with the pre-order process and high-intent buying behavior.
Complete asset package: Domains, social media, all branding/logos/creative, supplier contracts, customer lists, and website files.

Current Status & Growth Opportunities

Operations paused for 5–6 months in 2025 due to medical reasons (no business performance impact).
All infrastructure—accounts, assets, supplier links—are intact and ready for relaunch.
Brand equity and community retention remain strong despite pause.
Significant scaling potential via:
Migrating to Shopify for greater automation and higher conversion rates.
Launching systematic paid advertising—currently untapped.
Implementing automated email/SMS marketing strategies.
Offering in-stock inventory for faster fulfillment and impulse purchases.
Geographical expansion beyond Caribbean & US markets and/or into additional product lines.

Industry Context

The global hair extensions/wigs market `,
  },
  {
    id: `12250349`,
    title: `Lottery Whiz`,
    revealedName: `Lottery Whiz`,
    url: `https://flippa.com/12250349`,
    domain: `https://lotterywhiz.com/`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 200000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 1220.47, expenses: 612.14, profit: 609.6 },
      { month: `Feb 2025`, revenue: 14257.02, expenses: 612.14, profit: 13644.88 },
      { month: `Mar 2025`, revenue: 24892.0, expenses: 612.14, profit: 24279.86 },
      { month: `Apr 2025`, revenue: 15734.03, expenses: 612.14, profit: 15121.89 },
      { month: `May 2025`, revenue: 41871.9, expenses: 612.14, profit: 41259.76 },
      { month: `Jun 2025`, revenue: 28356.56, expenses: 612.14, profit: 27744.42 },
      { month: `Jul 2025`, revenue: 17099.28, expenses: 612.14, profit: 16487.14 },
      { month: `Aug 2025`, revenue: 11986.26, expenses: 612.14, profit: 11374.12 },
      { month: `Sep 2025`, revenue: 19150.33, expenses: 612.14, profit: 18539.46 },
      { month: `Oct 2025`, revenue: 15401.29, expenses: 612.14, profit: 14789.15 },
      { month: `Nov 2025`, revenue: 12513.31, expenses: 612.14, profit: 11902.44 },
      { month: `Dec 2025`, revenue: 4522.47, expenses: 612.14, profit: 3910.33 },
    ],
    avgMonthlyRevenue: 17250.0,
    avgMonthlyProfit: 16639.0,
    profitMargin: `96%`,
    annualRevenue: `GBP £162,996`,
    annualProfit: `GBP £157,214`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Next.js, Shopify, Stripe`,
    subscribers: `1,375`,
    country: `WY, United States`,
    platform: `offers`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 63.8,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 73.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Online lottery SaaS/platform in the US entertainment sector; lottery-related services face heavy regulatory scrutiny and`,
      `High revenue volatility (CV 60%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Stephen`,
      location: `Canada`,
      verified: true,
    },
    socialMedia: [
      `37,200 followers`,
    ],
    expenses: [
      {
        item: `API Data`,
        amount: `GBP £225 /month`,
      },
      {
        item: `month
Transactional Email`,
        amount: `GBP £62 /month`,
      },
      {
        item: `Zendesk`,
        amount: `GBP £44 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Next.js`,
      `37,200 followers`,
      `Attachments`,
      `stripe-2025`,
      `digistore24-2024`,
      `digistore24-2025`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $200,000`,
      `GBP £150,088`,
      `Contact Seller Submit LO`,
    ],
    postSaleSupport: `Included. I will help you to setup the domains, websites, databases. I will introduce you to the data provider & digistore24 reps.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Next.js`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1939,
    watchers: 153,
    about: `**Key Highlights**

Lottery Whiz is a Software as a Service (SaaS) company operating within the entertainment sector. The platform offers a unique blend of technology and leisure, allowing users to engage with lottery services in a streamlined, user-friendly manner. Founded on innovation and consumer engagement, Lotterywhiz.com has carved a niche in the digital entertainment market. The company capitalizes on the growing trend of online entertainment consumption, tapping into an audience that is continually seeking new and exciting ways to indulge in leisure activities. Its strategic use of technology not only enhances user experiences but also ensures operational efficiency.



Lottery Whiz is currently set up for the US (every game in every state), UK, & Ireland. It currently sells at £149 gbp or $189 respectively with an "International Addon" (same price) that enables the other 2 countries in the user account. We've been building lottery data for Spain and France for over a year so the site is ready to add those as mains and to the addons, it just needs to be coded and to have the locales added to the site. We believe there is a massive opportunity in subscriptions instead of the current one-off model, but as we're focused on another business we'll let the new owners decide if it makes sense for them to test the subscription model.

Very low upkeep required. Everything is automated. Accounts are created/disabled/upgraded/downgraded automatically when there's a billing event and all of the in-account features are on autopilot. 


LotteryWhiz.com is on digistore24 (UK, US, IE)
LotteryWhiz.co.uk (same backend etc) is using Stripe and is UK only

Both are included in the sale.The .co.uk could be redirected to https://lotterywhiz.com/en-gb for simplicity.`,
  },
  {
    id: `11787310`,
    title: `gptboss.com`,
    revealedName: `gptboss.com`,
    url: `https://flippa.com/11787310`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 29414.0,
    monthlyPL: [
      { month: `Aug 2023`, revenue: 5929.63, expenses: 2080.26, profit: 3850.64 },
      { month: `Sep 2023`, revenue: 6202.68, expenses: 2211.07, profit: 3991.61 },
      { month: `Oct 2023`, revenue: 5627.37, expenses: 1968.5, profit: 3658.87 },
      { month: `Nov 2023`, revenue: 4771.39, expenses: 1649.73, profit: 3122.93 },
      { month: `Dec 2023`, revenue: 3525.52, expenses: 1068.07, profit: 2457.45 },
      { month: `Jan 2024`, revenue: 3477.26, expenses: 970.28, profit: 2505.71 },
      { month: `Feb 2024`, revenue: 3176.27, expenses: 452.12, profit: 2724.15 },
      { month: `Mar 2024`, revenue: 2722.88, expenses: 270.51, profit: 2452.37 },
      { month: `Apr 2024`, revenue: 2378.71, expenses: 445.77, profit: 1932.94 },
      { month: `May 2024`, revenue: 2109.47, expenses: 934.72, profit: 1174.75 },
      { month: `Jun 2024`, revenue: 1982.47, expenses: 195.58, profit: 1786.89 },
      { month: `Jul 2024`, revenue: 1732.28, expenses: 557.53, profit: 1174.75 },
    ],
    avgMonthlyRevenue: 3636.0,
    avgMonthlyProfit: 2569.0,
    profitMargin: `71%`,
    annualRevenue: `GBP £34,359`,
    annualProfit: `GBP £24,278`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Next.js, WordPress, Shopify, Stripe`,
    churn: `25%`,
    subscribers: `54`,
    country: `Canada`,
    platform: `focusing`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 63.8,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 73.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -64% — gptboss.com`,
      `Revenue declining sharply (-67.2% trend)`,
      `High churn: 25%`,
    ],
    greenFlags: [],
    seller: {
      name: `Mackenzie Bowes`,
      location: `Canada`,
      verified: false,
    },
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £1 /month`,
      },
      {
        item: `Backend Hosting`,
        amount: `GBP £222 /month`,
      },
      {
        item: `OpenAI`,
        amount: `GBP £555 /month`,
      },
      {
        item: `Database Hosing`,
        amount: `GBP £44 /month`,
      },
      {
        item: `Email Automation`,
        amount: `GBP £167 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Next.js`,
      `Included.`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $29,414`,
      `GBP £22,073`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn up to $588*`,
      `Have a similar business? Get a free valuation`,
      `Data Verified Listing`,
      `Stripe`,
      `Lear`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Next.js`,
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 4999,
    watchers: 429,
    about: `WHY I'M SELLING:

I have had some lifestyle changes - I took a contract to develop an app for another person and don't personally have the time to grow and manage this app. As you can see from the chart, MRR has atrophied, mostly from me having turned off new subscriptions.

I chose to use an auction to let buyers state how much they value this.

WHY YOU SHOULD BUY:

It can easily grow, the structure of the site works better than ChatGPT for certain busy industries (SEOs, Solopreneurs). Easy to market, popular product :)



Key Highlights:

- http://gptboss.com/ is a Software as a Service (SaaS) platform focusing on Business, offering businesses a tool to generate high-quality content using artificial intelligence.
- The platform monetizes its services through service subscriptions, providing companies with access to the latest AI technology for content creation.
- Key platform used for payment processing is Stripe, allowing for secure and seamless transactions for customers.

Operations:

- http://gptboss.com/ generates revenue primarily through service subscriptions, offering businesses different tiers of access to its AI content generation tool.
- The platform uses various marketing channels to attract new customers, including social media advertising, content marketing, and partnerships with industry influencers.
- By providing businesses with an innovative and efficient solution for content creation, http://gptboss.com/ is able to retain customers and generate recurring revenue through subscription renewals.

Customers:

- http://gptboss.com/ caters to a wide range of businesses, from small startups to large corporations, looking to streamline their content creation processes.
- Customers value the platform for its ease of use, accuracy in generating content, and cost-effectiveness compared to traditional content creation methods.
- With a growing customer base, http://gptboss.com/ continues to expand its reach in the business community, establishing itself as a leader in AI-powered content creation tools.

Technology:

- http://gptboss.com/ leverages cutting-edge artificial intelligence technology to provide businesses with a powerful tool for content generation.
- The platform continuously improves its technology through research and development, staying ahead of the competition in the fast-paced field of AI content creation.
- With a user-friendly interface and reliable performance, http://gptboss.com/ ensures a seamless experience for customers looking to enhance their content creation capabilities.

Financials:

- http://gptboss.com/ has been operating since 2023, steadily growing its revenue stream through service subscriptions and expanding its customer base.
- The platform's use of Stripe as a key platform for payment processing ensures secure and efficient transactions, contributing to its financial success.
- With a solid business model and a focus on innovation, http://gptboss.com/ is well-positioned for continued growth and profi`,
  },
  {
    id: `12365444`,
    title: `homypost.pl`,
    revealedName: `homypost.pl`,
    url: `https://flippa.com/12365444`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 47126.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 16978.63, expenses: 12608.56, profit: 4371.34 },
      { month: `Apr 2025`, revenue: 15354.3, expenses: 13027.66, profit: 2326.64 },
      { month: `May 2025`, revenue: 17266.92, expenses: 10382.25, profit: 6884.67 },
      { month: `Jun 2025`, revenue: 17487.9, expenses: 11813.54, profit: 5673.09 },
      { month: `Jul 2025`, revenue: 16950.69, expenses: 12313.92, profit: 4635.5 },
      { month: `Aug 2025`, revenue: 16586.2, expenses: 10716.26, profit: 5869.94 },
      { month: `Sep 2025`, revenue: 18925.54, expenses: 10088.88, profit: 8836.66 },
      { month: `Oct 2025`, revenue: 10281.92, expenses: 6144.26, profit: 4137.66 },
      { month: `Nov 2025`, revenue: 13616.94, expenses: 10035.54, profit: 3581.4 },
      { month: `Dec 2025`, revenue: 21247.1, expenses: 12430.76, profit: 8816.34 },
      { month: `Jan 2026`, revenue: 13555.98, expenses: 8077.2, profit: 5478.78 },
      { month: `Feb 2026`, revenue: 18147.03, expenses: 12105.64, profit: 6041.39 },
    ],
    avgMonthlyRevenue: 16367.0,
    avgMonthlyProfit: 5554.0,
    profitMargin: `34%`,
    annualRevenue: `with a strong 35% profit margin. Specializing in hand-drawn cartoon and pet portraits, acrylic prints, and custom décor, it operates fully online with in-house production and minimal direct competition. The sale includes Shopify and WordPress stores, active ad accounts, automation tools, UV printing equipment, and inventory—offering scalable growth or optional asset-light dropshipping expansion.`,
    annualProfit: `GBP £52,484`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, WooCommerce, Stripe`,
    country: `Poland`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 91.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 72.8,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical custom-printed posters business in Poland (homypost.pl)`,
      `Polish language, Polish market, local print fulfillment`,
      `Not remotely operable from Brazil`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `6 years old — established`,
      `Stable revenue history`,
      `Strong profit $5,554/mo`,
      `Zero loss months in P&L`,
    ],
    seller: {
      name: `Sławomir`,
      location: `Poland`,
      verified: true,
    },
    socialMedia: [
      `3,100 followers`,
      `12,800 followers`,
      `460 followers`,
    ],
    expenses: [
      {
        item: `Advertising`,
        amount: `GBP £3,979 /month`,
      },
      {
        item: `Delivery`,
        amount: `GBP £1,326 /month`,
      },
      {
        item: `Artists salary`,
        amount: `GBP £1,150 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £1,768 Included in sale price`,
      `Shopify`,
      `Included.`,
      `3,100 followers`,
      `12,800 followers`,
      `460 followers`,
      `2,669 subscribers`,
      `Attachments`,
      `XLSX`,
      `Homypost.pl P&L Flippa`,
      `Contact Seller`,
      `Send message`,
      `Sławo`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `awomir`,
        date: `Mar 19, 2026 05:51 AM`,
        text: `Updated Feb. 26 performance. Feel free to ask me if any questions.`,
      },
    ],
    ga: {
      users: `93,019`,
      totalPageViews: `22,003`,
      pagesPerSession: `2.61`,
      avgDuration: `00:01:15`,
      engagementRate: `0.68%`,
      topCountries: [
        {
          country: `Poland`,
          views: 27736,
        },
        {
          country: `China`,
          views: 1098,
        },
        {
          country: `Germany`,
          views: 145,
        },
        {
          country: `United States`,
          views: 44,
        },
        {
          country: `Netherlands`,
          views: 36,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 528,
    watchers: 21,
    commentCount: 1,
    about: `Homypost.pl: Profitable Poland-Based D2C Brand in Personalized Gifts & Design

Overview:

Homypost.pl is a thriving, Poland-based eCommerce brand established in 2020, specializing in high-quality, personalized printed gifts within the Design and Style sector. Operating entirely online, the business has become a leading provider of unique, hand-drawn cartoon portraits, pet portraits, custom posters, keychains, and acrylic photo prints. In-house production processes, custom design services, and direct shipping ensure a seamless, ready-to-gift experience for every customer.

Key Financials:

Annual Revenue: EUR €187,625
Annual Profit: EUR €64,754
Monthly Revenue: EUR €15,635 (Avg)
Monthly Profit: EUR €5,396 (Avg)
Profit Margin: 35%
Profit Multiple: 0.6x
Revenue Multiple: 0.2x
Page Views: 22,003/month

Business Highlights:

Established Market Position: Recognized for unique, hand-drawn cartoon portraits and custom gift products with minimal local competition in Poland.
End-to-End Control: Full in-house design, printing, and fulfillment ensure product quality and efficient operation.
100% Online Sales: Streamlined, scalable eCommerce operations via Shopify and WordPress storefronts.
Expanding Digital Presence: Domain Authority of 17, with strong foundations across SEO, Google Ads, and Facebook Ads for ongoing digital marketing and organic reach growth.
Strong Social Proof: Over 12,800 Instagram followers, 3,100 Facebook fans, engaged Tiktok audience, and 2,669 email subscribers.
Customer Base: Loyal and growing customer segments, driven by high-quality personalized gifting and unique designs.
Flexible Growth Models: Option to continue operating with physical assets or shift to a dropshipping/outsourced fulfillment model.
Trusted by Customers: more than 1000 positive reviews on Google Maps, Trustpilot and Judge.me

Assets Included in Sale:

Homypost.pl domain
Shopify and WordPress (requires refinement) ecommerce sites
Developed Google Ads and Facebook Ads campaigns/accounts
All process automation software accounts
All partner and supplier contacts
UV printer (60x90cm print area) & warehouse equipment (optional)
All inventory/stock (negotiable)
Brand assets: logos, product designs, custom technologies
Active social media profiles (Instagram, Facebook, Tiktok)
Email subscriber list
Other necessary business accounts, unique content, and intellectual property
Initial transition and onboarding support

Growth Opportunities:

Geographical Expansion: Expand further into the Polish and wider EU market, targeting untapped segments seeking personalized gifts.
Product Diversification: Leverage the capabilities of the UV printer for new material types and product categories.
B2B & Wholesale: Develop relationships with local boutiques and gift retailers to expand wholesale distribution.
Digital Marketing & SEO: Scale up paid campaigns, enhance SEO, and deepen engagement through social and email marketing.
Dropshipping/Outsourcing: Option to operate via local manufa`,
  },
  {
    id: `10849485`,
    title: `Newcomerneeds.com`,
    revealedName: `Newcomerneeds.com`,
    url: `https://flippa.com/10849485`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 39690.0,
    monthlyPL: [
      { month: `Sep 2020`, revenue: 2621.28, expenses: 59.69, profit: 2561.59 },
      { month: `Oct 2020`, revenue: 2867.66, expenses: 72.39, profit: 2795.27 },
      { month: `Nov 2020`, revenue: 2200.91, expenses: 48.26, profit: 2152.65 },
      { month: `Dec 2020`, revenue: 2764.79, expenses: 105.41, profit: 2659.38 },
      { month: `Jan 2021`, revenue: 2273.3, expenses: 83.82, profit: 2189.48 },
      { month: `Feb 2021`, revenue: 1865.63, expenses: 88.9, profit: 1776.73 },
      { month: `Mar 2021`, revenue: 2548.89, expenses: 85.09, profit: 2465.07 },
      { month: `Apr 2021`, revenue: 2520.95, expenses: 69.85, profit: 2451.1 },
      { month: `May 2021`, revenue: 1573.53, expenses: 57.15, profit: 1516.38 },
      { month: `Jun 2021`, revenue: 1827.53, expenses: 19.05, profit: 1808.48 },
      { month: `Jul 2021`, revenue: 2391.41, expenses: 88.9, profit: 2302.51 },
      { month: `Aug 2021`, revenue: 3305.81, expenses: 213.36, profit: 3092.45 },
    ],
    avgMonthlyRevenue: 2397.0,
    avgMonthlyProfit: 2314.0,
    profitMargin: `97%`,
    annualRevenue: `GBP £22,647`,
    annualProfit: `GBP £21,866`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `React, Shopify, Stripe`,
    country: `Canada`,
    platform: `for`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 91.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 72.8,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian job platform for new immigrants with 700+ employer network; geo-specific to Canada job market with no global re`,
    ],
    greenFlags: [],
    seller: {
      name: `Reza Heidari`,
      location: `Canada`,
      verified: true,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Create React App`,
      `Included.`,
      `Attachments`,
      `YTD report of Stripe`,
      `1Year Stripe report`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $49,000`,
      `USD $39,690`,
      `Reduced 19%`,
      `GBP £29,785`,
      `Watching`,
      `Share & Earn up to $794*`,
      `Have a similar business? Get a free val`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `172`,
      totalPageViews: `49`,
      pagesPerSession: `0.00`,
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Shopify`,
      `Stripe`,
    ],
    views: 6815,
    watchers: 481,
    about: `What does your business do?

A special job search platform for newcomers In Canada with a revenue generation system through job post-sales. The target market is employers who want to hire newcomers. we have already +700 employers on the website and a list of email subscriptions (+2.1K)

WOW!! there is an email support system and you should support 3-5 customer's emails per week.

We are one of the leading online career and recruitment resources with cutting-edge technology providing relevant profiles to employers and relevant jobs to job seekers across Canada. We are one of the top choices of new immigrants and employers who support them.

How does your business make money?

Sell job posting ads ($29.99 per job)

Why are you selling this business?

I am an entrepreneur and always launch businesses and sell to others

Who would this business be perfect for?

For how like recruitment platform and want to work with HR and employers

Assets

Brand assets
Customer databases
Domains
Hosting accounts
Website files, source code, and content

Social Media

Mailing List: 2.1K email addresses

Post sale support

Included`,
  },
  {
    id: `12080065`,
    title: `MyMentor.life`,
    revealedName: `MyMentor.life`,
    url: `https://flippa.com/12080065`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 200000.0,
    monthlyPL: [
      { month: `Sep 2024`, revenue: 16531.59, expenses: 590.55, profit: 15941.04 },
      { month: `Oct 2024`, revenue: 23254.97, expenses: 792.48, profit: 22461.22 },
      { month: `Nov 2024`, revenue: 6078.22, expenses: 260.35, profit: 5817.87 },
      { month: `Dec 2024`, revenue: 4257.04, expenses: 201.93, profit: 4055.11 },
      { month: `Jan 2025`, revenue: 4933.95, expenses: 242.57, profit: 4691.38 },
      { month: `Feb 2025`, revenue: 4229.1, expenses: 222.25, profit: 4006.85 },
      { month: `Mar 2025`, revenue: 4114.8, expenses: 218.44, profit: 3896.36 },
      { month: `Apr 2025`, revenue: 24016.97, expenses: 815.34, profit: 23201.63 },
      { month: `May 2025`, revenue: 23445.47, expenses: 798.83, profit: 22646.64 },
      { month: `Jun 2025`, revenue: 6811.01, expenses: 299.72, profit: 6512.56 },
      { month: `Jul 2025`, revenue: 6868.16, expenses: 300.99, profit: 6567.17 },
      { month: `Aug 2025`, revenue: 15629.89, expenses: 609.6, profit: 15021.56 },
    ],
    avgMonthlyRevenue: 11681.0,
    avgMonthlyProfit: 11235.0,
    profitMargin: `96%`,
    annualRevenue: `GBP £110,371`,
    annualProfit: `GBP £106,156`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    churn: `10%`,
    subscribers: `475`,
    country: `FL, United States`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 62.5,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 95,
      growthPotential: 80,
      overall: 72.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -36% — MyMentor.life`,
      `Revenue declining sharply (-36.1% trend)`,
      `High revenue volatility (CV 68%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Tony Gaskins`,
      location: `United States`,
      verified: true,
      transactions: `1 transaction totalling USD $90,000`,
    },
    socialMedia: [
      `5,431 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £2 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £75 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `WordPress 6.4`,
      `Included.`,
      `5,431 followers`,
      `1,700 subscribers`,
      `Attachments`,
      `Screenshot 2025-09-05 at 11.34.17 AM`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $200,000`,
      `GBP £150,088`,
      `Contact Seller S`,
    ],
    postSaleSupport: `to transition mentoring operations, support functions, and customer relationships.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 3577,
    watchers: 119,
    about: `MyMentor.Life: Business Overview

MyMentor.Life is a subscription-based SaaS platform that connects users with vetted, certified mentors for virtual coaching and personalized guidance. Founded in 2020 and run from Florida, the platform serves mentees looking for growth in business, personal development, leadership, relationships, and wellness. It also supports coaches who wish to offer services through a structured marketplace. The service is fully remote and digital, requiring minimal physical overhead, and built to scale with recurring revenue and low churn.

Operations & Platform Details

Payment processing handled via Stripe, ensuring recurring billing, secure payments, and reliability. Technology stack includes user-matching, coach directory, scheduling, and content delivery for virtual sessions. Minimal support overhead; coaching sessions are virtual (phone/video). The platform has been refined over five years, with tested features and a growing user / mentor base.

Brand, Traffic & Audience

Positioned as a premium, yet affordable coaching platform; messaging emphasizes trust, integrity, and respect, appealing to professionals, entrepreneurs, and individuals seeking life or business mentorship. Public website shows certified, experienced coaches across varied domains. The matching process between mentor and mentee is streamlined. Organic channels (SEO, content, direct) are primary traffic drivers, supported by digital marketing and community engagement.

Strengths & Competitive Advantages

Extremely high margins (~96%) because recurring revenue is nearly all profit once fixed costs are covered.
Scalable model: new subscribers don’t require new physical infrastructure; mentors use existing digital infrastructure.
Low churn relative to many subscription services, indicating stickiness of value and satisfaction.
Refund risk minimal (reported 0% refund rate), enhancing net revenue stability.
Very lean fixed cost structure (hosting, domain, etc.), enabling high profitability once growth ramps.

Growth & Expansion Opportunities

Increase subscription acquisition via more aggressive digital marketing (ads, content, partnerships).
Expand mentor service verticals or vertical specialization (e.g. executive coaching, wellness coaching) to attract higher-ARPU segments.
Introduce tiered pricing or premium plans (e.g. access to exclusive content, group calls, workshops) for upsell.
Grow affiliate or partnership channels (university programs, corporate leadership training).
International expansion by recruiting mentors certified globally, offering sessions in new languages or markets.

Assets & What’s Included

Full domain and website platform; user interface, backend tools, mentor directory.
Stripe account setup and subscription billing system.
Coaching network (mentors), onboarding materials, content or training materials if any.
Email lists, branding assets, marketing materials.
Post-sale support to transition mentoring operations, support functions, `,
  },
  {
    id: `11662972`,
    title: `Bondi Lash Lab`,
    revealedName: `Bondi Lash Lab`,
    url: `https://flippa.com/11662972`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 41524.0,
    monthlyPL: [
      { month: `Mar 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Apr 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `May 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Jun 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Jul 2023`, revenue: 9558.02, expenses: 7548.88, profit: 2009.14 },
      { month: `Aug 2023`, revenue: 9559.29, expenses: 7551.42, profit: 2007.87 },
      { month: `Sep 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Oct 2023`, revenue: 9559.29, expenses: 7551.42, profit: 2006.6 },
      { month: `Nov 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2006.6 },
      { month: `Dec 2023`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Jan 2024`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
      { month: `Feb 2024`, revenue: 9558.02, expenses: 7551.42, profit: 2005.33 },
    ],
    avgMonthlyRevenue: 9558.0,
    avgMonthlyProfit: 2006.0,
    profitMargin: `21%`,
    annualRevenue: `GBP £90,314`,
    annualProfit: `GBP £18,956`,
    expensesLastMonth: `GBP £1,116 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 95.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 72.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Bondi Lash Lab) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Yaz N`,
      location: `Australia`,
      verified: true,
    },
    socialMedia: [
      `13,000 followers`,
      `500 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £1,116 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £21,012 Included in sale price`,
      `13,000 followers`,
      `500 followers`,
      `8,800 subscribers`,
      `Attachments`,
      `BONDI_LASH_LAB_-_Profit_and_Loss (2)`,
    ],
    postSaleSupport: `Included. The business is fully automated, and will come with a full time Virtual Assistant.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2577,
    watchers: 219,
    about: `Key Highlights:

Over 2,500 website hits per month total of 50,000 over the past 12 months which offers a lot of exposure. 
Average 3-4% conversion.
30-40% returning customer rate 
4,000+ Subscribers
Business compliant with Australian EDMG grant which subsidises up to $24,000 AUD per annum on marketing expenses outside of Australia.
Low operating cost.

Several world wide publishings and articles - Daily Mail - Buzzfeed Aus, USA, Canada - Beauty Magazine - Elle ETC

BuzzFeed - https://click.pstmrk.it/2s/www.buzzfeed.com%2Fzoelouisesmith%2Fshop-the-best-cult-lash-and-brow-serum/lSVLRzIN/a-tV/sal8jjU8CR
PubFeed - https://pubfeed.linkby.com/preview/?lbpf_lcid=4872985d-7ebe-483c-b7cc-736d34e4fb09&lbpf_cid=2900
DailyMail - https://www.dailymail.co.uk/femail/article-10154387/Before-photos-effective-serum-helping-create-naturally-thicker-lashes.html
Beauty Space - https://www.beautyspace.com.au/best-eyelash-serums-australia/
Refinery29 - https://www.refinery29.com/en-us/bondi-lash-lab-lash-brow-growth-serum-review

Operations:

The business runs itself for the most part. As the owner, I spend 3 - 8 a week setting up new contract agreements. Our VA handles everything else from emails, postage follow ups, and handling our transition into listing our products on Amazon. She would like to continue her job with the new owner, which will also allow for a smooth transition as she's been a valuable role in the business. 

Inventory comes from our manufacturer in China. We currently have $29,000 worth of stock over two warehouse locations in Australia and USA (Nevada). This is enough stock for about 12 months, however, ordering more stock from the manufacturer to the warehouse's takes about 8-10 weeks. US and AUS customers receive their order between 1-5 days, everywhere else is about 3 -10 days.

Instagram, Facebook and TikTok Assets on offer with full time automated social network partner doing an amazing job. #bondilashlab @bondilashlab

Financials:

We have qualified for the EMDG grant for the next three years, so the new owner can continue to take advantage or this by continuing marketing efforts to procure international customers. 

We also have an accounting firm whom handles the EMDG we've been working with that can be introduced to the new owner if needed. 

Additional Information

Opportunities for growth:

The new owner can further scale the business by getting the products into shops in person.
Utilise Tiktok and Social media accounts for more exposure.
Wholesale
Optimal for business that can run its own marketing in-house, therefore increasing margins and leveraging on current loyal customer base. 

Reason for the sale:

I run multiple businesses and haven't had time to focus on growing this one. I'd like to pass this opportunity to someone who can invest the time  needed to further scale the business as the business is operational with all major setup costs covered.`,
  },
  {
    id: `11905362`,
    title: `AI-Powered E-commerce B2B Automation Hub – 1 Million Monthly Price Adjustments & 180K Managed SKUs`,
    revealedName: `AI-Powered E-commerce B2B Automation Hub – 1 Million Monthly Price Adjustments & 180K Managed SKUs`,
    url: `https://flippa.com/11905362`,
    type: `marketplace`,
    dataLevel: `full_pnl`,
    askingPrice: 45000.0,
    monthlyPL: [
      { month: `Dec 2024`, revenue: 3318.51, expenses: 233.68, profit: 3084.83 },
      { month: `Jan 2025`, revenue: 2555.24, expenses: 233.68, profit: 2321.56 },
      { month: `Feb 2025`, revenue: 3364.23, expenses: 242.57, profit: 3121.66 },
      { month: `Mar 2025`, revenue: 2807.97, expenses: 238.76, profit: 2569.21 },
      { month: `Apr 2025`, revenue: 1558.29, expenses: 210.82, profit: 1347.47 },
      { month: `May 2025`, revenue: 2520.95, expenses: 226.06, profit: 2294.89 },
      { month: `Jun 2025`, revenue: 2051.05, expenses: 217.17, profit: 1833.88 },
      { month: `Jul 2025`, revenue: 2180.59, expenses: 144.78, profit: 2035.81 },
      { month: `Aug 2025`, revenue: 2844.8, expenses: 477.52, profit: 2367.28 },
      { month: `Sep 2025`, revenue: 2654.3, expenses: 476.25, profit: 2178.05 },
      { month: `Oct 2025`, revenue: 1677.67, expenses: 276.86, profit: 1400.81 },
      { month: `Nov 2025`, revenue: 1216.66, expenses: 266.7, profit: 949.96 },
    ],
    avgMonthlyRevenue: 2396.0,
    avgMonthlyProfit: 2125.0,
    profitMargin: `89%`,
    annualRevenue: `GBP £22,638`,
    annualProfit: `GBP £20,083`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, PHP, Stripe, Redis`,
    churn: `2%`,
    subscribers: `31`,
    country: `Estonia`,
    platform: `Laravel`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 65.0,
      diversification: 75,
      operatorIndependence: 73.3,
      roi: 85,
      growthPotential: 65,
      overall: 72.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -47% — AI-Powered E-commerce B2B Automation Hub – 1 Million Monthly Price Adjustments & 180K Managed SKUs`,
      `Revenue declining sharply (-39.9% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Roman Ruzin`,
      location: `Estonia`,
      verified: true,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Laravel`,
      `Included.`,
      `4,551 subscribers`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $45,000`,
      `GBP £33,770`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn up to $900*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
      `This quality l`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `Stripe`,
      `Redis`,
    ],
    views: 2275,
    watchers: 134,
    about: `Overview:

Advanced AI-powered B2B SaaS hub comprising three sophisticated e-commerce solutions: BuyBox Pricing Automation, Supplier Feed Integration, and Price Aggregator Synchronization.

Buybox:

Our flagship BuyBox solution dynamically automates pricing strategies across multiple marketplaces, ensuring maximum sales competitiveness.

Operating within user-defined price ranges, the AI algorithm collects live competitor data from four major marketplaces and executes real-time adjustments—up to 30,000 daily or 1 million monthly price changes.

With proven customer retention and satisfaction, it successfully serves EU-based e-commerce store owners across four strategic markets.

Aggregators:

Addressing the demanding price aggregation platforms, our aggregator solution automatically synchronizes and optimizes product pricing data across 90* leading pricing comparison platforms and localized Google Shopping.

This empowers merchants to remain consistently competitive and responsive, avoiding costly manual interventions and outdated listings.

Key numbers

Monthly price adjustments: 1 million

Managed SKUs: 180,000

Current active customers: 31 EU-based legal entities

Average monthly income per customer: $150 USD

Recent 4x revenue growth post billing model upgrade (PAYG)

Total untapped audience: over 4,000 potential clients

Additional secured contracts: €5,000 in upcoming revenue

Financial and Operational Highlights:

Last 4 months revenue: $11,250 USD (expenses $870 USD)

Last 12 months revenue: $20,783 USD (expenses $3,000 USD)

Significant efficiency improvements post-PAYG pricing transition, with single-customer revenues increasing by up to 225%

Minimal ongoing maintenance requirements (~2 hours/week)

Technical Infrastructure:

Backend: PHP Laravel, Linux servers, Redis

Frontend: Tailwind

Infrastructure: Object storage, virtual machines, managed cloud MYSQL databases

Payments: Stripe integration

Customers

100% EU-based customers, legal entities
Persona: E-commerce store owners having their accounts on a specific marketplace
Location: 4 EU countries
Current customers were engaged using email marketing

Financials

We performed a significant service upgrade in September 2024 and moved all the users from fixed price subscriptions to unlimited PAYG plans
Users aim to pay via Stripe or via bank TT transfer
Which resulted in almost zero income that month, because we compensated actual contracts with the new unlimited pricing plans
As the result we were able to optimize costs and grow income from 1250 USD to 2800 USD / monthly
Now the subscriptions are not limited by any tiers and allowed to collect +225% more from a single customer

Opportunities

B2BLIX is poised for further exponential growth with scalable architecture designed for rapid market entry.
All solutions can effortlessly adapt to additional marketplaces, suppliers, and aggregator platforms, significantly expanding your competitive advantage and potential market reach.

Suppor`,
  },
  {
    id: `12067986`,
    title: `The Rug Collective`,
    revealedName: `The Rug Collective`,
    url: `https://flippa.com/12067986`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 200000.0,
    monthlyPL: [
      { month: `Aug 2024`, revenue: 27818.08, expenses: 18624.55, profit: 9193.53 },
      { month: `Sep 2024`, revenue: 26903.68, expenses: 19387.82, profit: 7515.86 },
      { month: `Oct 2024`, revenue: 26696.67, expenses: 17967.96, profit: 8728.71 },
      { month: `Nov 2024`, revenue: 53602.89, expenses: 19048.73, profit: 34554.16 },
      { month: `Dec 2024`, revenue: 50472.34, expenses: 18841.72, profit: 31630.62 },
      { month: `Jan 2025`, revenue: 51224.18, expenses: 19127.47, profit: 32096.71 },
      { month: `Feb 2025`, revenue: 26809.7, expenses: 18925.54, profit: 7884.16 },
      { month: `Mar 2025`, revenue: 31948.12, expenses: 9828.53, profit: 22118.32 },
      { month: `Apr 2025`, revenue: 34297.62, expenses: 27617.42, profit: 6681.47 },
      { month: `May 2025`, revenue: 37829.49, expenses: 30490.16, profit: 7338.06 },
      { month: `Jun 2025`, revenue: 43205.4, expenses: 34156.65, profit: 9048.75 },
      { month: `Jul 2025`, revenue: 60695.84, expenses: 43154.6, profit: 17541.24 },
    ],
    avgMonthlyRevenue: 39292.0,
    avgMonthlyProfit: 16194.0,
    profitMargin: `41%`,
    annualRevenue: `GBP £371,261`,
    annualProfit: `GBP £153,016`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `FL, United States`,
    platform: `all`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 87.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 71.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US (Florida) ecommerce brand on Amazon/major platforms selling washable, spill-proof rugs for American households. Physi`,
    ],
    greenFlags: [],
    seller: {
      name: `Axel Wilson`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `11,000 followers`,
      `39,600 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £352,707 Included in sale price`,
      `Shopify`,
      `Included.`,
      `11,000 followers`,
      `39,600 followers`,
      `Attachments`,
      `XLSX`,
      `therugcollective_12_months`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Pric`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2723,
    watchers: 255,
    about: `Over the last 12 months, The Rug Collective generated USD $553,676 in revenue with a strong $189 average order value and consistent demand across the U.S. market. However, the business currently shows a net loss due to aggressive advertising spend, high fulfillment fees, and operational overhead during the period.

It’s important to note that the brand was intentionally scaling through paid ads, and as a result:

Meta & Google ad spend was significantly higher than normal

Fulfillment and freight costs were elevated due to peak-season shipping

Operational tools, apps, and warehouse services added additional overhead

Marketing was not optimized in the final months, impacting profitability

This means the business appears unprofitable on paper, but the unit economics and demand remain strong. A buyer with:

More efficient ad buying

Lower agency or creative costs

Cheaper fulfillment rates

A stronger marketing strategy

…can immediately restore profitability. The core business model is healthy; the losses are tied to scaling decisions and heavy advertising, not product or brand weakness.

In addition, the sale includes approximately USD $500,000 worth of inventory, offered for only $200,000, creating a built-in margin advantage for the buyer. This provides:

Immediate ability to relaunch ads profitably

Zero stock-out risk

Lower cost of goods for months of sales

Instant cashflow opportunity

The brand comes with 166,118 email subscribers, strong social presence, a full U.S. warehouse operation, and a proven Shopify Plus growth platform all ready for a buyer to optimize and scale.`,
  },
  {
    id: `11867314`,
    title: `topicmojo.com`,
    revealedName: `topicmojo.com`,
    url: `https://flippa.com/11867314`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 49142.0,
    monthlyPL: [
      { month: `Jul 2024`, revenue: 1869.44, expenses: 474.98, profit: 1394.46 },
      { month: `Aug 2024`, revenue: 2216.15, expenses: 474.98, profit: 1739.9 },
      { month: `Sep 2024`, revenue: 3958.59, expenses: 474.98, profit: 3483.61 },
      { month: `Oct 2024`, revenue: 6299.2, expenses: 474.98, profit: 5822.95 },
      { month: `Nov 2024`, revenue: 3230.88, expenses: 474.98, profit: 2755.9 },
      { month: `Dec 2024`, revenue: 3968.75, expenses: 474.98, profit: 3492.5 },
      { month: `Jan 2025`, revenue: 2096.77, expenses: 474.98, profit: 1621.79 },
      { month: `Feb 2025`, revenue: 1430.02, expenses: 474.98, profit: 953.77 },
      { month: `Mar 2025`, revenue: 2382.52, expenses: 474.98, profit: 1907.54 },
      { month: `Apr 2025`, revenue: 1906.27, expenses: 474.98, profit: 1430.02 },
      { month: `May 2025`, revenue: 1811.02, expenses: 474.98, profit: 1334.77 },
      { month: `Jun 2025`, revenue: 1667.51, expenses: 474.98, profit: 1192.53 },
    ],
    avgMonthlyRevenue: 2736.0,
    avgMonthlyProfit: 2261.0,
    profitMargin: `83%`,
    annualRevenue: `GBP £25,856`,
    annualProfit: `GBP £21,362`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Next.js, Shopify, Stripe`,
    subscribers: `134`,
    country: `Canada`,
    platform: `designed`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 63.8,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 85,
      growthPotential: 80,
      overall: 71.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -40% — topicmojo.com`,
      `Revenue declining sharply (-33.1% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Rob`,
      location: `Canada`,
      verified: true,
      transactions: `1 transaction totalling USD $140,000`,
    },
    expenses: [
      {
        item: `Server`,
        amount: `GBP £113 /month`,
      },
      {
        item: `Data Cost`,
        amount: `GBP £487 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Next.js`,
      `Included.`,
      `Attachments`,
      `Screenshot_31`,
      `Screenshot_30`,
      `Screenshot_29`,
      `Screenshot_32`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $185,000`,
      `USD $49,142`,
      `Reduced 73%`,
      `GBP £36,878`,
      `Contact Seller Submit LOI Make Offer`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `17,781`,
      totalPageViews: `21,685`,
      pagesPerSession: `8.45`,
      avgDuration: `00:00:45`,
      engagementRate: `0.76%`,
      topCountries: [
        {
          country: `United States`,
          views: 2140,
        },
        {
          country: `United Kingdom`,
          views: 715,
        },
        {
          country: `India`,
          views: 662,
        },
        {
          country: `China`,
          views: 237,
        },
        {
          country: `Singapore`,
          views: 153,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Next.js`,
      `Shopify`,
      `Stripe`,
    ],
    views: 12596,
    watchers: 780,
    about: `Overview
TopicMojo is a well-established and revenue-generating SaaS platform designed to help content creators, marketers, and SEO professionals discover and optimize content topics effectively. With a strong brand reputation and a loyal user base, TopicMojo is an invaluable asset for anyone looking to enter or expand in the SEO industry.

Key Features

Topic Model: Generates comprehensive topical maps from seed keywords, revealing related queries, comparisons, and subtopics.
Question Finder: Extracts user questions from sources like Google, Quora, and Reddit, helping users address audience-specific needs.
Search Listener: Monitors real-time trends and search behavior to guide timely content creation.
SEO Insights: Provides actionable data on search volume, keyword trends, and competition to optimize strategies.

Why TopicMojo is Unique

Proven Market Fit: Trusted by thousands of SEO professionals and content creators globally.
Highly Scalable: A robust SaaS model with untapped potential for growth through targeted marketing and feature expansion.
Established Brand: 4 years of history, strong domain authority, and positive user reviews.
Low Maintenance: Operates with minimal overhead, making it an attractive opportunity for passive income or scaling efforts.

Growth Opportunities

Global Expansion: Increase marketing efforts in international markets.
Feature Enhancements: Introduce AI-driven suggestions, multilingual support, or integrations with popular tools like HubSpot and SEMrush.
Affiliate Programs: Collaborate with industry influencers to drive more subscriptions.
Enterprise Solutions: Offer premium plans tailored for large SEO agencies and corporations.

Why Buy TopicMojo?
This is a rare opportunity to own a profitable and established SaaS business in the high-demand SEO industry. With a proven track record, robust features, and ample growth potential, TopicMojo is perfectly positioned for the next owner to scale operations and maximize revenue.

-------

In addition to TopicMojo, we have developed DataForSaaS, a robust SEO Data API platform that powers all of TopicMojo's data needs. By integrating DataForSaaS, we have significantly reduced operational costs and enhanced the scalability of TopicMojo. This exclusive platform offers an opportunity to not only sustain TopicMojo's current operations but also open new revenue streams by monetizing data APIs for SaaS developers and enterprises. While TopicMojo is available as a standalone acquisition, we are open to selling DataForSaaS as part of the package for an additional cost, creating a powerful, end-to-end SEO solution for the buyer. This is a rare chance to acquire a comprehensive ecosystem that dominates both SaaS and SEO data markets.`,
  },
  {
    id: `11626578`,
    title: `3DHub`,
    revealedName: `3DHub`,
    url: `https://flippa.com/11626578`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 91288.0,
    monthlyPL: [
      { month: `Jan 2023`, revenue: 10843.26, expenses: 4381.5, profit: 6460.49 },
      { month: `Feb 2023`, revenue: 9084.31, expenses: 4212.59, profit: 4871.72 },
      { month: `Mar 2023`, revenue: 8924.29, expenses: 3956.05, profit: 4968.24 },
      { month: `Apr 2023`, revenue: 13163.55, expenses: 4384.04, profit: 8779.51 },
      { month: `May 2023`, revenue: 8632.19, expenses: 6271.26, profit: 2360.93 },
      { month: `Jun 2023`, revenue: 7923.53, expenses: 4391.66, profit: 3531.87 },
      { month: `Jul 2023`, revenue: 8462.01, expenses: 5800.09, profit: 2661.92 },
      { month: `Aug 2023`, revenue: 5835.65, expenses: 4460.24, profit: 1375.41 },
      { month: `Sep 2023`, revenue: 8437.88, expenses: 5392.42, profit: 3044.19 },
      { month: `Oct 2023`, revenue: 14424.66, expenses: 7412.99, profit: 7011.67 },
      { month: `Nov 2023`, revenue: 10669.27, expenses: 8906.51, profit: 1762.76 },
      { month: `Dec 2023`, revenue: 10600.69, expenses: 9423.4, profit: 1178.56 },
    ],
    avgMonthlyRevenue: 9750.0,
    avgMonthlyProfit: 4001.0,
    profitMargin: `41%`,
    annualRevenue: `GBP £92,128`,
    annualProfit: `GBP £37,802`,
    expensesLastMonth: `GBP £10,010 /month`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 91.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 71.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Electronics ecommerce store (Canada), sells physical 3D-related products. Requires inventory/shipping — not operable fro`,
    ],
    greenFlags: [],
    seller: {
      name: `BO LUO`,
      location: `Canada`,
      verified: true,
    },
    socialMedia: [
      `62 followers`,
      `260 followers`,
      `38 followers`,
      `23 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £10,010 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `62 followers`,
      `260 followers`,
      `38 followers`,
      `23 followers`,
      `Attachments`,
      `XLSX`,
      `Profit_and_Loss`,
      `No comments`,
      `Sponsored`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $200,059`,
      `USD $91,288`,
      `Reduced 54%`,
      `GBP £68,506`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn up to $1.0K*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `8,012`,
      totalPageViews: `2,444`,
      pagesPerSession: `2.90`,
      avgDuration: `00:00:27`,
      engagementRate: `0.78%`,
      topCountries: [
        {
          country: `Canada`,
          views: 1193,
        },
        {
          country: `United States`,
          views: 472,
        },
        {
          country: `China`,
          views: 367,
        },
        {
          country: `Vietnam`,
          views: 33,
        },
        {
          country: `Singapore`,
          views: 26,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3241,
    watchers: 235,
    about: `Key Highlights

US and EU Trademark
$126.89 Average Order Value
1.84% Conversion Rate
25.45% Returning Customer Rate
~7K Email List
>1% Refund Rate
Over 65% of sales from direct traffic
~$400K in Sales since January 2020

Operations

Ownership & Management: Single founder-operated business, requiring approximately 2 hours per day primarily for shipping and fulfillment tasks.
Facilities: Operations are conducted from a leased warehouse located in Markham, Ontario, Canada.
Suppliers: Our suppliers are based in China. We have cultivated strong relationships with premium suppliers in the 3D printing parts and accessories industry, including OEM factories that collaborate with renowned brands in both consumer and industrial 3D printer sectors.
Shipping: Orders are primarily self-fulfilled. We also leverage Amazon FBA and Deliverr.com for US order fulfillment.
Marketing: Our marketing efforts focus on Google Ads, with occasional Facebook ads for product promotion. The average monthly marketing expense is around USD 500. We have received highly-rated customer reviews for our service and products.
Operation Improvement Opportunities: There is potential for increased exposure in the USA, as most of our orders are from there. Expanding marketing efforts on US-based social media channels could be beneficial.

Customers

Location & Revenue: About 50% of our customers are from the USA, with the remaining nearly 50% from Canada.
Marketing Efforts: Our primary marketing strategy involves Google Ads and organic recommendations within hobbyist communities, thanks to our high-quality products and service.

Financials

Development: The business has witnessed steady growth over the past 12 months, with consistent revenue and customer base expansion.

Additional Information

Trademarks owned in the USA and EU
Amazon brand registered
Exclusive rights to sell or distribute one of the carried brand products in Canada.

Growth Opportunities

International Expansion: Exploring the European market could be a significant opportunity, though the EU VAT tax is a current challenge.
3D Printing Services: Plans to expand into offering 3D printing services are underway, with competitive pricing and logistics arrangements in place.
Advertising Expansion: Utilizing additional advertising platforms, especially targeting the US market, could further propel growth.

Reason for Sale

Personal commitments and a shift in career focus are the primary reasons for selling the business.`,
  },
  {
    id: `12081719`,
    title: `SellVNTG`,
    revealedName: `SellVNTG`,
    url: `https://flippa.com/12081719`,
    type: `marketplace`,
    dataLevel: `stats`,
    askingPrice: 26499.0,
    avgMonthlyRevenue: 2383.0,
    avgMonthlyProfit: 1985.0,
    profitMargin: `83%`,
    annualRevenue: `GBP £22,513`,
    annualProfit: `GBP £18,760`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `React, Shopify, Stripe`,
    country: `MS, United States`,
    platform: `built`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 75,
      operatorIndependence: 73.3,
      roi: 95,
      growthPotential: 65,
      overall: 70.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
    ],
    greenFlags: [],
    seller: {
      name: `Owen RIdgeway`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `3,500 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `3,500 followers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $26,499`,
      `GBP £19,886`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $530*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Ve`,
    ],
    postSaleSupport: `from the founder to ensure a smooth handover`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Shopify`,
      `Stripe`,
    ],
    views: 788,
    watchers: 18,
    about: `SellVNTG: Business Overview

SellVNTG, founded in 2023, is a niche marketplace platform built to connect vintage fashion resellers with buyers seeking unique, curated apparel and accessories. Combining a fully functional website with an iOS app, the platform offers seller storefronts, buyer messaging, integrated payments, and Instagram Shop connectivity. In just two years, SellVNTG attracted hundreds of vintage sellers, generating USD $30,000 in annual revenue with an 83% profit margin before being paused in May 2025 for personal reasons. With its infrastructure, integrations, and existing seller base intact, SellVNTG represents a turnkey acquisition opportunity for an operator looking to relaunch or pivot into the fast-growing resale economy.

Key Business Highlights

Geographical Reach: Primarily U.S.-based sellers and buyers, with room to expand into global vintage and streetwear markets.
Customer Demographics: Fashion-conscious buyers seeking unique, second-hand and sustainable clothing; sellers ranging from independent resellers to small vintage boutiques.
Platform Functionality: Includes seller storefronts, inventory management, in-app messaging, Stripe Connect for payouts, and Meta Commerce Manager integration for Instagram Shop syncing.
Technology: Built with modern frameworks including HTML, Tailwind, C#, ASP.NET, Azure, and Flutter for iOS, creating a scalable and future-proof infrastructure.
Community Engagement: Early adoption on Instagram with 3,500 followers and product sync capability, providing a foundation for community-driven growth.
Additional Innovation: Prototype QR code POS system designed for in-person market sellers, syncing with online inventory.

Operations

SellVNTG was designed to be low-maintenance, with seller-managed storefronts and Stripe Connect automating payment flows. The platform’s architecture ensures seamless scalability, while integrations with Instagram Shop and Meta Commerce Manager provide instant cross-platform exposure for sellers. Buyer-seller communication is facilitated by in-app chat, further enhancing the community-driven nature of the marketplace.

Market Leadership

Positioned within the growing second-hand and resale fashion market, SellVNTG taps into consumer demand for sustainable, unique, and nostalgic apparel. With resale projected to outpace the broader fashion industry in growth, SellVNTG is well-placed to capture buyers shifting away from fast fashion and toward curated vintage experiences. The platform’s curated focus differentiates it from broader resale marketplaces such as eBay or Depop, offering a dedicated community for vintage enthusiasts.

Growth Opportunities

Seller Reactivation: Launch email and social campaigns to re-engage the existing seller base and stimulate immediate platform activity.
Cross-Listing Capabilities: Introduce integrations with Depop, Grailed, and eBay, allowing sellers to streamline listings across multiple platforms.
Category Expansion: Extend the marketpl`,
  },
  {
    id: `12195777`,
    title: `PowerhouseAffiliate.com`,
    revealedName: `PowerhouseAffiliate.com`,
    url: `https://flippa.com/12195777`,
    type: `content`,
    dataLevel: `stats`,
    askingPrice: 25000.0,
    avgMonthlyRevenue: 3176.0,
    avgMonthlyProfit: 2819.0,
    profitMargin: `89%`,
    annualRevenue: `GBP £30,018`,
    annualProfit: `GBP £26,641`,
    ageYears: 14.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `Canada`,
    platform: `that`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 65,
      operatorIndependence: 80.0,
      roi: 95,
      growthPotential: 75,
      overall: 70.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
    ],
    greenFlags: [],
    seller: {
      name: `Melissa Babineau`,
      location: `Canada`,
      verified: true,
      transactions: `3 transactions totalling USD $124,497`,
    },
    socialMedia: [
      `2,900 followers`,
      `700 followers`,
    ],
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £206 /month`,
      },
      {
        item: `Website Stack`,
        amount: `GBP £131 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `WordPress`,
      `Included.`,
      `2,900 followers`,
      `700 followers`,
      `17,200 subscribers`,
      `11,000 subscribers`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $25,000`,
      `GBP £18,761`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn up to $500*`,
      `Have a similar business? Get a free`,
    ],
    postSaleSupport: `+ optional ongoing consulting/coach agreement`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `49,890`,
      totalPageViews: `14,153`,
      pagesPerSession: `1.79`,
      avgDuration: `00:00:34`,
      engagementRate: `0.26%`,
      topCountries: [
        {
          country: `United States`,
          views: 3216,
        },
        {
          country: `Singapore`,
          views: 532,
        },
        {
          country: `Hong Kong`,
          views: 507,
        },
        {
          country: `China`,
          views: 460,
        },
        {
          country: `Germany`,
          views: 375,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1776,
    watchers: 156,
    about: `Highlights at a Glance

Established Since 2011 – Trusted brand with global recognition in affiliate & digital marketing

Profitable & Automated – ~75 % profit margins / $450 monthly overhead

Evergreen Courses & Community – 5 core certification courses + additional lessons, case studies and active member community

Founder Support – Founder willing to stay as an active community member and affiliate coach post-sale

⚙️ Modern Tech Stack – available after NDA

Organic Traffic Base – 95 % organic/direct visits and 11K email subscribers

Multiple Growth Paths – (Growth plan available after NDA) Includes AI-driven updates, new funnels, and affiliate partnership expansion

Priced to sell - Open Auction – Reserve $30 000 USD – Serious buyers only, private access after NDA

About the Business

Powerhouse Affiliate is a long-standing, automated education brand teaching affiliate marketing, media buying, and digital growth strategies.

Originally started by Joey Babineau’s youtube brand, the business has transitioned into a community-driven platform that now operates independently on strong systems, evergreen content, and brand authority.

After 14 years, the owner is shifting focus to new projects but remains committed to supporting the next owner and community through a clear transition plan — and is open to continuing as an active, coach and community mentor after the sale.

Financial Snapshot (2025 YTD to Oct 20)

Revenue $31 922 USD

Owner Time Required < 8 hrs / week

Mainly oversight & updates

Automated lead capture, checkout, onboarding, and support workflows mean the business practically runs itself.

Audience & Market

Targets beginner-to-intermediate digital marketers looking to generate income online — a $17 B + industry that continues to grow.

Primary markets: U.S., Canada, U.K., Australia.


Strong Brand/SEO presence and long-term domain authority ensure steady organic traffic.

Included in Sale

Domain & brand IP ownership

Complete library of evergreen courses & templates

Community and membership platform 

CRM + automation flows

Email sequences, funnels, landing pages, and ad assets

Documentation & plugin licenses

30 days post-sale support + optional ongoing consulting/coach agreement

Transition & Continuity Plan

Powerhouse Affiliate has evolved from a founder-led brand to a self-sustaining platform, but to ensure seamless continuity and trust, the transition includes:

Phase 1 – Ownership Transfer (Weeks 1–2)
Full technical handover and system walkthrough

Phase 2 – Community Continuity (Weeks 3–4)
Optional joint announcement introducing new owner

Phase 3 – Advisory Support (Month 2–3)
Owner available as coach or community mentor under new management

This structure ensures members remain engaged and the new owner gains credibility from day one.

Growth Opportunities

Add AI-driven training modules (“Affiliate AI Academy”)

Launch low-ticket tripwire offers ($7–$27)

Expand affiliate program & tool partnerships

Host paid live w`,
  },
  {
    id: `12258077`,
    title: `Strands of Silk`,
    revealedName: `Strands of Silk`,
    url: `https://flippa.com/12258077`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 123030.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 22368.51, expenses: 19105.88, profit: 3263.9 },
      { month: `Apr 2025`, revenue: 31407.1, expenses: 20908.01, profit: 10499.09 },
      { month: `May 2025`, revenue: 29504.64, expenses: 22772.37, profit: 6732.27 },
      { month: `Jun 2025`, revenue: 23652.48, expenses: 28971.24, profit: -5320.03 },
      { month: `Jul 2025`, revenue: 36357.56, expenses: 18929.35, profit: 17428.21 },
      { month: `Aug 2025`, revenue: 37271.96, expenses: 27752.04, profit: 9518.65 },
      { month: `Sep 2025`, revenue: 33719.77, expenses: 25565.1, profit: 8154.67 },
      { month: `Oct 2025`, revenue: 27354.53, expenses: 25445.72, profit: 1908.81 },
      { month: `Nov 2025`, revenue: 60998.1, expenses: 47294.8, profit: 13703.3 },
      { month: `Dec 2025`, revenue: 52198.27, expenses: 38928.04, profit: 13270.23 },
      { month: `Jan 2026`, revenue: 24207.47, expenses: 22965.41, profit: 1242.06 },
      { month: `Feb 2026`, revenue: 24356.06, expenses: 21235.67, profit: 3120.39 },
    ],
    avgMonthlyRevenue: 33616.0,
    avgMonthlyProfit: 6960.0,
    profitMargin: `21%`,
    annualRevenue: `GBP £317,635`,
    annualProfit: `GBP £65,765`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Vite`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 82.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 70.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian female-owned brand selling physical silk hair/skin products (scrunchies, pillowcases, etc.) for 6+ years. Phy`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `3 transactions totalling USD $5,399,907`,
    },
    expenses: [
      {
        item: `COGS`,
        amount: `GBP £12,169 /month`,
      },
      {
        item: `OPEX`,
        amount: `GBP £10,183 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £50,352 Excluded from sale price`,
      `Vite`,
      `Included.`,
      `3,600 followers`,
      `17,900 followers`,
      `69 followers`,
      `612 followers`,
      `328 subscribers`,
      `24,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Strands of Silk P&L Ending February 2026 (1)`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `121,511`,
      totalPageViews: `44,882`,
      pagesPerSession: `3.47`,
      avgDuration: `00:00:41`,
      engagementRate: `0.56%`,
      topCountries: [
        {
          country: `Australia`,
          views: 25928,
        },
        {
          country: `United States`,
          views: 639,
        },
        {
          country: `China`,
          views: 100,
        },
        {
          country: `India`,
          views: 91,
        },
        {
          country: `Singapore`,
          views: 35,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1217,
    watchers: 91,
    about: `Executive Summary

Strands of Silk is a small female-owned Australian brand specializing in silk products for your hair and skin. Established over six years ago by two young regional Queenslanders, the brand has built a strong reputation in the silk beauty and wellness space. It offers a range of high-quality products, including Sleeping Caps, Pillowcases, Eye Masks, Scrunchies, and more. Requiring less than 10 hours per week for operations, this is a rare opportunity to acquire a thriving business with scalable potential. 

Investment Highlights

Minimal Operational Time – Only 10 hours per week required to run the business.

Established Premium Brand – One of the first brands to introduce Silk Sleeping Caps in Australia.

Loyal & Growing Customer Base – A growing 19.9% repeat purchase rate in 2025.

Strong Online Presence – 4.4% website conversion rate, over 1,333 5-star reviews, and 24k+ engaged email subscribers. 

Sustainability Appeal – Natural mulberry silk products with eco-friendly packaging.

High Customer Satisfaction – Low product return rate (0.01%), driven by excellent customer service.

Marketing Success – Featured in Mamma Mia, driving organic traffic and brand awareness.

Ads Specialist - Running the account with a proven track record. 

Range of colours and styles - Unique prints designed and launched seasonally. Exclusive prints stand out in the market. 

Financial Performance (AUD)
TTM (ending Nov 2025) Snapshot:

Total Revenue: $660,079

Gross Profit: $328,858

Annual Adjusted Net Profit: $132,065 (including add-backs)

Adjusted Profit Margin: 21%

Average Order Value (AOV): $74.88

Conversion Rate: 4.4%

Operations

Strands of Silk is a low-maintenance, highly automated business. Operations are streamlined, with outsourced fulfillment and ads management, allowing an owner to run the business in just 10 hours per week and remotely.

Customer Service – Minimal inquiries, 2-3 hours per week.

Marketing & Advertising – Google Ads management and email marketing flows.

Order Fulfillment – Managed by a 3rd party Melbourne-based distribution center, handling shipments four times daily. Using Robotic software to minimise human mistakes. 

Inventory – The sale includes approx. AUD $114K worth of stock currently housed in the warehouse.

Technology Stack – Shopify-powered website with Klaviyo for email automation and Meta/Google Ads + organic for customer acquisition.

Customer Base & Market Position

Strands of Silk serves a premium, highly engaged customer base, including:

Luxury Shoppers – Seeking high-quality silk products for self-care and beauty.

Beauty & Wellness Enthusiasts – Individuals focused on skincare, haircare, and sleep health.

Gifting Market – Strong seasonal demand for holidays, special occasions, and corporate gifts.

The brand's strong repeat purchase rate (19.9%) and high customer retention demonstrate the quality of its products and the loyalty of its customer base.

Growth Opportunities

A new owner has signi`,
  },
  {
    id: `11171518`,
    title: `Essential Dog`,
    revealedName: `Essential Dog`,
    url: `https://flippa.com/11171518`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 112478.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 8585.2, expenses: 5972.81, profit: 2612.39 },
      { month: `Mar 2025`, revenue: 14305.28, expenses: 7188.2, profit: 7117.08 },
      { month: `Apr 2025`, revenue: 13098.78, expenses: 6743.7, profit: 6355.08 },
      { month: `May 2025`, revenue: 6950.71, expenses: 4899.66, profit: 2049.78 },
      { month: `Jun 2025`, revenue: 10523.22, expenses: 5631.18, profit: 4892.04 },
      { month: `Jul 2025`, revenue: 11026.14, expenses: 5990.59, profit: 5034.28 },
      { month: `Aug 2025`, revenue: 11374.12, expenses: 7181.85, profit: 4192.27 },
      { month: `Sep 2025`, revenue: 11818.62, expenses: 7729.22, profit: 4090.67 },
      { month: `Oct 2025`, revenue: 13690.6, expenses: 8883.65, profit: 4808.22 },
      { month: `Nov 2025`, revenue: 12019.28, expenses: 8314.69, profit: 3704.59 },
      { month: `Dec 2025`, revenue: 8826.5, expenses: 7504.43, profit: 1323.34 },
      { month: `Jan 2026`, revenue: 14397.99, expenses: 9135.11, profit: 5264.15 },
    ],
    avgMonthlyRevenue: 11385.0,
    avgMonthlyProfit: 4287.0,
    profitMargin: `38%`,
    annualRevenue: `GBP £107,572`,
    annualProfit: `GBP £40,506`,
    expensesLastMonth: `GBP £8,489 /month`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, PHP, Stripe`,
    country: `Australia`,
    platform: `accounts`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 91.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 69.8,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian premium dog grooming brand with physical products manufactured in Australia with registered Australian Made s`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `1,100 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £8,489 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £23,375 Excluded from sale price`,
      `1,100 followers`,
      `0 followers`,
      `7,000 subscribers`,
      `Attach`,
    ],
    postSaleSupport: `Included. I can provide up to 6 months of support and introduce you to our contract manufacturers and suppliers.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `31,148`,
      totalPageViews: `6,486`,
      pagesPerSession: `1.88`,
      avgDuration: `00:00:44`,
      engagementRate: `0.57%`,
      topCountries: [
        {
          country: `Australia`,
          views: 4214,
        },
        {
          country: `United States`,
          views: 431,
        },
        {
          country: `China`,
          views: 75,
        },
        {
          country: `India`,
          views: 50,
        },
        {
          country: `(not set)`,
          views: 33,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `Stripe`,
    ],
    views: 605,
    watchers: 52,
    about: `Overview

Founded in 2012, Essential Dog is a long-established, 100% Australian Made and Owned premium brand specialising in natural dog shampoos, conditioners, deodorisers and skin remedies.

Built over 12 years, the business combines strong brand credibility, exceptional online reviews, proprietary formulations and diversified revenue across direct-to-consumer and wholesale channels. All core skincare products are manufactured in Australia, with registered Australian Made status and a trademarked logo.

This is a fully developed brand with intellectual property, supplier relationships and scalable infrastructure already in place.

Products

Essential Dog was developed after two years of intensive research into the impact of synthetic fragrances and sulphates on canine skin health. The result is a premium, pH-balanced grooming range formulated specifically for dogs with sensitive skin, allergies and dermatitis.

Key features:

Sulphate-free, paraben-free and free from synthetic fragrances

Eco Cert approved, plant-derived ingredients

100% biodegradable formulations

Developed with veterinarians, naturopaths, chemists and natural perfumers

Thick, foamy natural shampoo achieved without sulphates

Artisan aromatherapy blends crafted by a leading Australian natural pet perfumer

100% recyclable and biodegradable PET packaging



The brand is positioned at the premium end of the market, focusing on quality, safety and performance rather than competing on price.

Revenue Model

Hybrid structure:

50% Direct-to-Consumer (BigCommerce website, Amazon)

50% B2B (Wholesale, Distributors, Chemist Warehouse, Faire marketplace)

Sales Channels:

BigCommerce website

Amazon (smaller portion)

Chemist Warehouse

Wholesale accounts

Dropship distributors

Faire marketplace

Recently approached by Woolworths Marketplace to have their products in their marketplace

Geographic split:

Australia: ~90%

Singapore: ~10%

Distributor presence in Singapore and Europe

This diversified structure reduces reliance on any single channel or customer.

Operations

Fulfilment handled in-house from Sydney

Products shipped to owner’s location (no 3PL currently)

1 Australian manufacturer for skincare range

3 Chinese suppliers (brushes, towels, collars)

Lead times:

China: 12–16 weeks including shipping

Australian skincare: 8–12 weeks

Current inventory:

Approximately AUD 40–45K in finished goods

Sale price excludes stock (stock sold at cost price, approx. AUD 50K)

Owner involvement:

Around 3 hours per day

Picking and packing

Customer emails

Supplier management

Google Shopping oversight

Approximately 20 hours per week at full operating capacity

Documented SOPs and training manuals are in place to support a smooth transition and enable a new owner to step in with clarity and structure.

Marketing

100% Google

Paid advertising currently active and profitable

Minimal reliance on other paid channels

The Google Ads campaigns are only for B2C sales. In addition to pa`,
  },
  {
    id: `12218817`,
    title: `B-Kat Boards`,
    revealedName: `B-Kat Boards`,
    url: `https://flippa.com/12218817`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 111065.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 16598.9, expenses: 12018.01, profit: 4580.89 },
      { month: `Apr 2025`, revenue: 18096.23, expenses: 13897.61, profit: 4198.62 },
      { month: `May 2025`, revenue: 17238.98, expenses: 13328.65, profit: 3910.33 },
      { month: `Jun 2025`, revenue: 17641.57, expenses: 12823.19, profit: 4817.11 },
      { month: `Jul 2025`, revenue: 14930.12, expenses: 10454.64, profit: 4475.48 },
      { month: `Aug 2025`, revenue: 15436.85, expenses: 10617.2, profit: 4819.65 },
      { month: `Sep 2025`, revenue: 14999.97, expenses: 10814.05, profit: 4185.92 },
      { month: `Oct 2025`, revenue: 15605.76, expenses: 9673.59, profit: 5933.44 },
      { month: `Nov 2025`, revenue: 15115.54, expenses: 9255.76, profit: 5859.78 },
      { month: `Dec 2025`, revenue: 16323.31, expenses: 10759.44, profit: 5562.6 },
      { month: `Jan 2026`, revenue: 13542.01, expenses: 9405.62, profit: 4136.39 },
      { month: `Feb 2026`, revenue: 12100.56, expenses: 8301.99, profit: 3798.57 },
    ],
    avgMonthlyRevenue: 15636.0,
    avgMonthlyProfit: 4690.0,
    profitMargin: `30%`,
    annualRevenue: `GBP £147,742`,
    annualProfit: `GBP £44,315`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `TN, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 85.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 69.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (B-Kat Boards) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `23 transactions totalling USD $8,469,233`,
    },
    socialMedia: [
      `2,600 followers`,
      `20 followers`,
    ],
    expenses: [
      {
        item: `COGS`,
        amount: `GBP £4,166 /month`,
      },
      {
        item: `Amazon Referral Fees`,
        amount: `GBP £1,084 /month`,
      },
      {
        item: `eBay Fees`,
        amount: `GBP £53 /month`,
      },
      {
        item: `PayPal Fees`,
        amount: `GBP £142 /month`,
      },
      {
        item: `Domain`,
        amount: `GBP £2 /month`,
      },
      {
        item: `Email Provider`,
        amount: `GBP £6 /month`,
      },
      {
        item: `Amazon Paid Traffic`,
        amount: `GBP £614 /month`,
      },
      {
        item: `Meta Paid Traffic`,
        amount: `GBP £1,010 /month`,
      },
      {
        item: `eBay Sponsored Listings`,
        amount: `GBP £47 /month`,
      },
      {
        item: `Google Paid Traffic`,
        amount: `GBP £302 /month`,
      },
      {
        item: `Shipping Supplies`,
        amount: `GBP £224 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £33,770 Excluded from sale price`,
      `Shopify`,
      `2,600 f`,
    ],
    postSaleSupport: `Included. 30 days of email, text, and video support with training, supplier introductions, asset transfer, and ongoing email help.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `29,324`,
      totalPageViews: `6,159`,
      pagesPerSession: `2.00`,
      avgDuration: `00:00:33`,
      engagementRate: `0.41%`,
      topCountries: [
        {
          country: `United States`,
          views: 4781,
        },
        {
          country: `China`,
          views: 104,
        },
        {
          country: `Singapore`,
          views: 34,
        },
        {
          country: `Canada`,
          views: 22,
        },
        {
          country: `Germany`,
          views: 20,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1788,
    watchers: 131,
    about: `This listing is for a profitable eCommerce business in the outdoor and fishing niche, operating primarily on Shopify and Amazon. The business generates consistent revenue, strong margins, and has a loyal customer base with excellent reviews.

What the Business Does

The brand sells a niche fishing product line. The brand has established a strong reputation in its niche, with high customer satisfaction and repeat buyers. The brand is trademark protected and Amazon Brand Registry registered. Key digital assets are copyright protected.

How the Business Makes Money

Revenue is generated through B2C (direct online sales via Shopify and Amazon and a small amount on eBay). Amazon orders are both MF and FBA and could be fully one or the other. Over the trailing twelve months ending 2/28/2025 the business produced:

Revenue: $196,874
SDE/Net Profit:  $59,053
Net Margin: 30%
TACOS: 16%
Revenue Mix: 38% Shopify, 59% Amazon, 3% eBay

Fulfillment & Operations:

The business runs with minimal owner involvement - typically 5-7 hours per week. Tasks include light inventory coordination, basic kitting, customer service, and fulfillment. A reliable US-based contract partner handles the bulk of assembly work, and processes are simple, documented, and easy to transition if you wanted to bring that in house. Orders from Shopify and eBay are currently fulfilled in-house. Amazon orders are fulfilled with FBA or MF when inventory isn't available at FBA.

Inventory & Supplier Relationships

Inventory is sourced from several long-term suppliers including both domestic and international partners. The business currently has around $45k of inventory on hand at cost. Assembly is completed by a contractor, and the final kitting/stickers process is fast, consistent, and easily trainable.

Why the Owner is Selling

The owner is streamlining workload and reallocating time toward some family priorities.

Advertising & Marketing

The primary source of customers is organic word of mouth, driven by a the brand's Pro-Staff. These are unpaid anglers and content creators who are loyal to the brand and produce content and social media engagement. (They are compensated with free replacement gear 1x / year).

Amazon and Facebook ads drive profitable returns.

Amazon ROAS: 5.5x
Meta/Facebook ROAS: 2.9x

Opportunities for Growth

Paid Search ads (currently unused)
Additional product variations or complementary accessories (samples are in hand for a line of accessories to add)
Retail/wholesale outreach to independent or chain outdoor stores

Increased Profit Opportunities

Transition to overseas manufacturing for lower product costs
Or, bring assembly in house to an hourly employee for higher margin

Ideal Buyers

Existing eCommerce Operators: plug this brand into your existing systems for profits starting day 1
Hands-Off Buyers: Transition to 3PL for fulfillment or overseas manufacturing for a more automated model
Owner-Operators: operate this business part-time with high margins and minima`,
  },
  {
    id: `11825343`,
    title: `DZXCOVER.COM - Premium Custom Car Seat Cover`,
    revealedName: `DZXCOVER.COM - Premium Custom Car Seat Cover`,
    url: `https://flippa.com/11825343`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 56000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 2981.96, expenses: 0.0, profit: 2981.96 },
      { month: `Feb 2025`, revenue: 3454.4, expenses: 0.0, profit: 3454.4 },
      { month: `Mar 2025`, revenue: 7270.75, expenses: 476.25, profit: 6794.5 },
      { month: `Apr 2025`, revenue: 5969.0, expenses: 476.25, profit: 5492.75 },
      { month: `May 2025`, revenue: 5572.76, expenses: 476.25, profit: 5096.51 },
      { month: `Jun 2025`, revenue: 8209.28, expenses: 476.25, profit: 7731.76 },
      { month: `Jul 2025`, revenue: 6295.39, expenses: 476.25, profit: 5819.14 },
      { month: `Aug 2025`, revenue: 9306.56, expenses: 476.25, profit: 8830.31 },
      { month: `Sep 2025`, revenue: 6242.05, expenses: 476.25, profit: 5764.53 },
      { month: `Oct 2025`, revenue: 9206.23, expenses: 952.5, profit: 8252.46 },
      { month: `Nov 2025`, revenue: 9110.98, expenses: 952.5, profit: 8158.48 },
      { month: `Dec 2025`, revenue: 11159.49, expenses: 1430.02, profit: 9729.47 },
    ],
    avgMonthlyRevenue: 7065.0,
    avgMonthlyProfit: 6509.0,
    profitMargin: `92%`,
    annualRevenue: `GBP £66,754`,
    annualProfit: `GBP £61,501`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `China`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 80.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 69.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (DZXCOVER.COM - Premium Custom Car Seat C) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Zhiyuan Yu`,
      location: `China`,
      verified: true,
      transactions: `1 transaction totalling USD $5,000`,
    },
    socialMedia: [
      `135 followers`,
      `188 followers`,
      `255 followers`,
      `211 followers`,
      `500 followers`,
    ],
    expenses: [
      {
        item: `Marketing`,
        amount: `GBP £825 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £68 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Organization Schema`,
      `Included.`,
      `135 followers`,
      `188 followers`,
      `255 followers`,
      `211 followers`,
      `500 followers`,
      `200 subscribers`,
      `1,158 subscribers`,
      `Attachments`,
      `XLSX`,
      `新德智兴利润表-核算_`,
      `Back`,
      `Zhiyuan Yu Nov 05, 2024 09:21 PM`,
      `If interested contact me for the price . Thank you`,
      `Report this comment Repl`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Zhiyuan Yu`,
        date: `Nov 05, 2024 09:21 PM`,
        text: `If interested contact me for the price . Thank you`,
      },
    ],
    ga: {
      users: `84,433`,
      totalPageViews: `19,372`,
      pagesPerSession: `1.45`,
      avgDuration: `00:00:09`,
      engagementRate: `0.58%`,
      topCountries: [
        {
          country: `United States`,
          views: 7203,
        },
        {
          country: `(not set)`,
          views: 1221,
        },
        {
          country: `United Kingdom`,
          views: 510,
        },
        {
          country: `China`,
          views: 476,
        },
        {
          country: `Canada`,
          views: 456,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1848,
    watchers: 144,
    commentCount: 1,
    about: `Summary

This eCommerce store sells most different famous brand car seat covers.

1. Executive Summary

This brand was built for  , The website mostly different brand car seat covers market is target to North American and Europe who have cars and need to replace car seat covers , and the each product price is between $300-$700 , the profit of product is 40%-50%.

2. Highlights

Approaching $100K in total revenue 
Google Merchant Center 
Supplier contact easy
Unique website design.

3. Operations

When you use Google ads to promote the website , and get the order , you can use the supplier WhatsApp or email to buy the products they will ship the items for you . the supplier is located in China , you just need to pay him ,and him will do the reset .

4. Customers

Our majority of customers are of the age group 25-50+ . Our main sales came from the United States and Canada who has cars and want to buy seat covers for their cars.

*Advertising Costs:

about 1000-2000 USD per month in Google and you will get 7000-10000USD Sales

*Additional Costs:

App Subscriptions:$10
Shopify: $29.99 (Monthly)

7. Seller Notes

 In addition to the store some included in the price I provide:


- Premium Theme Site
- Automated retargeting emails.
- customer's reviews
- high quality supplier
- Attractive purchase upsells
- Proven advertising strategy
- Ad copy
- domain

-Google Merchant Center 

-Google Ads Teach ( Need fee: $20/h )`,
  },
  {
    id: `12164348`,
    title: `Kashaya Probiotics`,
    revealedName: `Kashaya Probiotics`,
    url: `https://flippa.com/12164348`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 121500.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 7931.15, expenses: 4591.05, profit: 3340.1 },
      { month: `Mar 2025`, revenue: 10198.1, expenses: 6562.09, profit: 3637.28 },
      { month: `Apr 2025`, revenue: 11070.59, expenses: 8298.18, profit: 2772.41 },
      { month: `May 2025`, revenue: 11064.24, expenses: 7618.73, profit: 3445.51 },
      { month: `Jun 2025`, revenue: 9041.13, expenses: 7128.51, profit: 1912.62 },
      { month: `Jul 2025`, revenue: 10359.39, expenses: 5074.92, profit: 5283.2 },
      { month: `Aug 2025`, revenue: 10661.65, expenses: 7327.9, profit: 3333.75 },
      { month: `Sep 2025`, revenue: 9480.55, expenses: 6203.95, profit: 3276.6 },
      { month: `Oct 2025`, revenue: 9480.55, expenses: 6203.95, profit: 3276.6 },
      { month: `Nov 2025`, revenue: 8491.22, expenses: 6226.81, profit: 2264.41 },
      { month: `Dec 2025`, revenue: 13121.64, expenses: 5515.61, profit: 7606.03 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 10082.0,
    avgMonthlyProfit: 3346.0,
    profitMargin: `36%`,
    annualRevenue: `GBP £87,324`,
    annualProfit: `GBP £31,614`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `FL, United States`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 95.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 69.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Kashaya Probiotics) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `23 transactions totalling USD $8,469,233`,
    },
    socialMedia: [
      `510 followers`,
      `12,900 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £4,503 Excluded from sale price`,
      `Included.`,
      `510 followers`,
      `12,900 followers`,
      `5,000 subscribers`,
      `Attachments`,
      `Sept 25`,
      `Jan 25`,
      `Feb 25`,
      `Mar 25`,
      `Apr 25`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `12,996`,
      totalPageViews: `1,825`,
      pagesPerSession: `1.32`,
      avgDuration: `00:00:13`,
      engagementRate: `0.28%`,
      topCountries: [
        {
          country: `United States`,
          views: 891,
        },
        {
          country: `China`,
          views: 528,
        },
        {
          country: `Singapore`,
          views: 182,
        },
        {
          country: `Vietnam`,
          views: 33,
        },
        {
          country: `United Kingdom`,
          views: 27,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1253,
    watchers: 129,
    about: `Business Overview

Kashaya Probiotics is a clinically supported, practitioner-trusted probiotic brand with a reputation for integrity, authenticity, and proven results. Built around a proprietary fermentation process and clean, whole-food ingredients, Kashaya offers a truly differentiated product in the booming gut health market.

Key Highlights

Clinically Proven & Practitioner Trusted: Backed by independent clinical studies demonstrating its effectiveness in restoring gut health, improving digestion, and balancing the microbiome. Recommended by naturopathic doctors, chiropractors, and functional medicine practitioners nationwide.

Exclusive Fermentation Process: A multi-stage, food-based fermentation creates a living probiotic ecosystem that survives digestion and successfully colonizes the gut—delivering results far beyond typical capsule-based probiotics.

Premium, Whole-Food Formula: Dairy-free, filler-free, and crafted entirely from whole foods. Kashaya stands apart as a high-integrity, premium wellness brand.

Loyal Customer Base: Deep practitioner and consumer trust, with high subscription retention and strong word-of-mouth. Known across wellness communities for authenticity and tangible results.

Untapped Growth Potential: Minimal reliance on paid advertising to date. Major opportunities exist in wholesale expansion, practitioner networks, retail channels, and strategic digital marketing.

Operations

The business operates primarily through a Shopify storefront and practitioner partnerships. Day-to-day operations include:

Overseeing production and packaging (flexible to in-house or outsourced models)

Managing Shopify sales, subscriptions, and fulfillment

Maintaining practitioner and wholesale relationships

Executing light email marketing and community engagement

Quality control, sourcing, and inventory tracking

All processes are documented with SOPs for a smooth handover.

Customers

Kashaya’s customer base includes wellness-conscious consumers, patients referred by practitioners, and individuals managing digestive health.

Primarily U.S.-based

Acquisition via SEO, referrals, practitioner networks, and educational content

High retention driven by recurring subscriptions and practitioner follow-up

The combination of clinical results and practitioner credibility has built a uniquely loyal and educated customer community.

Financial Overview

Revenue is generated through Shopify direct sales (one-time and subscription) and wholesale accounts with practitioners and clinics.

Growth achieved organically with minimal paid spend

Seasonal sales peaks in January and spring, steady baseline year-round

No financial anomalies; clean, consistent performance

Detailed P&L is available upon request.

Included in Sale

Shopify storefront and all brand assets

Trademark, email list, and social channels

Clinical study data, SOPs, and recipes

Practitioner contacts and marketing materials

Ideal Buyer

Perfect for a wellness entrepreneur, CPG o`,
  },
  {
    id: `12090571`,
    title: `Barbarossa Brothers`,
    revealedName: `Barbarossa Brothers`,
    url: `https://flippa.com/12090571`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 99870.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 12843.51, expenses: 8068.31, profit: 4775.2 },
      { month: `Mar 2025`, revenue: 11640.82, expenses: 7240.27, profit: 4400.55 },
      { month: `Apr 2025`, revenue: 11430.0, expenses: 7941.31, profit: 3488.69 },
      { month: `May 2025`, revenue: 11724.64, expenses: 7838.44, profit: 3886.2 },
      { month: `Jun 2025`, revenue: 10520.68, expenses: 6099.81, profit: 4420.87 },
      { month: `Jul 2025`, revenue: 10833.1, expenses: 8448.04, profit: 2385.06 },
      { month: `Aug 2025`, revenue: 13746.48, expenses: 10920.73, profit: 2825.75 },
      { month: `Sep 2025`, revenue: 14766.29, expenses: 12076.43, profit: 2689.86 },
      { month: `Oct 2025`, revenue: 13327.38, expenses: 10374.63, profit: 2952.75 },
      { month: `Nov 2025`, revenue: 21640.8, expenses: 14781.53, profit: 6859.27 },
      { month: `Dec 2025`, revenue: 22522.18, expenses: 18473.42, profit: 4048.76 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 14091.0,
    avgMonthlyProfit: 3561.0,
    profitMargin: `28%`,
    annualRevenue: `GBP £122,044`,
    annualProfit: `GBP £33,648`,
    ageYears: 8.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Person`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 87.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 68.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical grooming products (Barbarossa Brothers)`,
      `Handcrafted British shaving products — UK fulfillment`,
      `No Stripe/PayPal verified`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `8 years old — established`,
      `Stable revenue history`,
      `Zero loss months in P&L`,
      `Revenue growing (60.1%)`,
    ],
    seller: {
      name: `Tom`,
      location: `United Kingdom`,
      verified: false,
      transactions: `1 transaction totalling USD $15,000`,
    },
    socialMedia: [
      `10,000 followers`,
      `13,600 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,097 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £2,494 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Person Schema`,
      `Included.`,
      `10,000 followers`,
      `13,600 followers`,
      `20,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $99,870`,
      `GBP £73,000`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share &`,
    ],
    postSaleSupport: `included`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `75,884`,
      totalPageViews: `20,356`,
      pagesPerSession: `2.44`,
      avgDuration: `00:00:19`,
      engagementRate: `0.39%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 12265,
        },
        {
          country: `China`,
          views: 2230,
        },
        {
          country: `United States`,
          views: 1502,
        },
        {
          country: `(not set)`,
          views: 268,
        },
        {
          country: `Singapore`,
          views: 83,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1024,
    watchers: 25,
    about: `Barbarossa Brothers: Business Overview

Barbarossa Brothers is a premium men’s grooming eCommerce brand, founded in the UK in 2014. Specialising in electric beard trimmers and high-quality beard care products, the brand has carved out a distinct and trusted position in the male grooming sector. Over the past eight years, Barbarossa Brothers has grown a loyal domestic customer base with a highly recognisable brand aesthetic and a sharp focus on premium product quality. With a 100% direct-to-consumer (DTC) model via Shopify and 10% of sales attributed to subscriptions, the business is lean, efficient, and ready for international expansion. The brand currently maintains a 35% profit margin and generated USD $187,867 in revenue over the trailing twelve months, with an average monthly profit of USD $5,531.

Growth Performance & Traffic

Barbarossa Brothers has processed over 39,000 customers with zero refunds and a 100% fulfilment rate over the past year, demonstrating high operational reliability. The brand receives approximately 12,800 monthly page views, with traffic driven across multiple channels including cross-network ads (40%), paid shopping (21%), organic search (14%), and direct access (13%). The email list includes over 38,000 opt-in subscribers, and the brand benefits from a 20,000-strong active email database. Top-performing keywords such as “Japanese Cut Throat Razor” and “Barbarossa Brothers Razor” contribute to organic traffic, supported by over 397 referring domains and 1,330 backlinks.

Customer Base & Marketing Efficiency

Barbarossa Brothers' brand positioning blends traditional craftsmanship with modern grooming culture, creating a premium experience that resonates with men seeking style, precision, and quality. The business has cultivated a loyal following primarily within the UK, with some international traction in the US, Australia, and India. It maintains a strong social presence with 13,600 Instagram followers, 10,000 Facebook followers, and robust engagement through its email marketing. The site’s average session includes 2.51 pages per visit and a bounce rate below industry average. A significant opportunity lies in increasing marketing ROI by further developing subscription products and launching US-focused acquisition campaigns.

Product & Operations Overview

The product range includes electric trimmers, grooming kits, beard oils, balms, and accessories. All products are self-fulfilled with well-established supplier relationships and consistent inventory access. The brand holds a trademark on key assets and retains full rights to its packaging design, product imagery, and branded creative content. Operations are streamlined through the Shopify platform, with zero reliance on third-party fulfillment partners, giving a buyer full control over logistics and customer experience. Orders are processed with near-perfect accuracy, and the business maintains a 0% refund rate, speaking to product satisfaction and operational effic`,
  },
  {
    id: `11689190`,
    title: `livefast.com`,
    revealedName: `livefast.com`,
    url: `https://flippa.com/11689190`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 50000.0,
    monthlyPL: [
      { month: `Oct 2023`, revenue: 4491.99, expenses: 3931.92, profit: 560.07 },
      { month: `Nov 2023`, revenue: 6856.73, expenses: 4721.86, profit: 2134.87 },
      { month: `Dec 2023`, revenue: 6772.91, expenses: 4921.25, profit: 1851.66 },
      { month: `Jan 2024`, revenue: 2693.67, expenses: 1296.67, profit: 1395.73 },
      { month: `Feb 2024`, revenue: 4004.31, expenses: 2792.73, profit: 1211.58 },
      { month: `Mar 2024`, revenue: 6494.78, expenses: 2607.31, profit: 3887.47 },
      { month: `Apr 2024`, revenue: 14912.34, expenses: 6282.69, profit: 8629.65 },
      { month: `May 2024`, revenue: 12809.22, expenses: 6090.92, profit: 6718.3 },
      { month: `Jun 2024`, revenue: 5279.39, expenses: 2752.09, profit: 2526.03 },
      { month: `Jul 2024`, revenue: 4993.64, expenses: 2109.47, profit: 2885.44 },
      { month: `Aug 2024`, revenue: 4371.34, expenses: 1473.2, profit: 2896.87 },
      { month: `Sep 2024`, revenue: 8074.66, expenses: 2461.26, profit: 5612.13 },
    ],
    avgMonthlyRevenue: 6813.0,
    avgMonthlyProfit: 3359.0,
    profitMargin: `49%`,
    annualRevenue: `GBP £64,374`,
    annualProfit: `GBP £31,741`,
    ageYears: 8.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 68.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian motorcycle apparel brand (bandanas, sublimated gloves, decals) with US/Canada trademarks and retail dealership `,
      `High revenue volatility (CV 51%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Allan Heath`,
      location: `Canada`,
      verified: true,
    },
    socialMedia: [
      `21,000 followers`,
      `33,800 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £450 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £225 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £75,044 Included in sale price`,
      `Shopify`,
      `Included.`,
      `21,000 followers`,
      `33,800 followers`,
      `39,952 subscribers`,
      `Attachments`,
      `Screenshot 2024-01-10 at 12.49.11 PM`,
      `Screenshot 2024-01-10 at 12.48.42 PM`,
      `No c`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `32,158`,
      totalPageViews: `19,351`,
      pagesPerSession: `5.19`,
      avgDuration: `03:46:39`,
      engagementRate: `0.90%`,
      topCountries: [
        {
          country: `United States`,
          views: 11234,
        },
        {
          country: `Canada`,
          views: 1673,
        },
        {
          country: `United Kingdom`,
          views: 265,
        },
        {
          country: `Pakistan`,
          views: 215,
        },
        {
          country: `China`,
          views: 127,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 8339,
    watchers: 743,
    about: `Founded in 2018 as Fast Mask, we set out to be an alternative source for Tubular bandanas. In 2019 We launched our sublimated Motorcycle gloves with the slogan Live Fast adorned on the straps and never looked back.

We admit it. Our Fast Mask tubular bandanas were our firstborn, so they’ll always have a special place in our hearts. But our family has grown since we launched and we don’t pick favorites. We also offer motorcycle gloves, apparel, and accessories such as decals, hats, and shoe shields. Like our Fast Masks, these products are made with premium quality, attention to detail, and eye-catching artwork to help you stand out from the crowd.

Key Features

Product in 5 Retailers/ Dealerships ( Motorcycle Gloves)
Trademark on in the USA ( Registration Number 5980634) and Canada ( Registration numberTMA1057286) for Fast Mask 
Over 5000 5-star reviews on the Website, 396 reviews on Etsy & 201 Reviews on Google Business Listing

Customers

90% of our customers are from the USA, having fulfilled over 70,000 orders Live Fast has a great loyal following of repeat purchasers and many brand advocates on social media.

Our customers buy directly from our website, Plus additional marketplaces such as Amazon, Etsy and Walmart.

We are currently using Deliverr/ Flexport as a 3PL for fulfilling most orders and also have inventory in Canada, which is self-fulfilled. The sale will include all inventory.

Finances

The total revenue from 2018 to now is just shy of 3 million USD.

Marketing

From 2018 - 2022, the company sold under the URL and Brand of Fast Mask - www.Fastmask.com. We rebranded and switched URLs due to advertising issues. Google and Facebook disqualified our ads due to the term Mask being in the URL and Brand.

We were able to keep the URL domain rank in place when we switched over to www.livefast.com.

Please see the attached images for reference.

Included in the sale are the following Urls

FASTMASK.COM
FASTMASK.CA
LIVEFAST.COM
LIVEFASTGLOVES.COM
LIVEFASTGLOVES.CA
LIVEFASTDIELAST.COM - SLOGAN USED IN MARKETING
LIVEFASTDIELAST.CA - SLOGAN USED IN MARKETING`,
  },
  {
    id: `11789027`,
    title: `https://rangetrotter.com/`,
    revealedName: `https://rangetrotter.com/`,
    url: `https://flippa.com/11789027`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 29997.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 2686.05, expenses: 127.0, profit: 2560.32 },
      { month: `Mar 2025`, revenue: 2378.71, expenses: 127.0, profit: 2251.71 },
      { month: `Apr 2025`, revenue: 1090.93, expenses: 127.0, profit: 963.93 },
      { month: `May 2025`, revenue: 922.02, expenses: 127.0, profit: 795.02 },
      { month: `Jun 2025`, revenue: 1235.71, expenses: 127.0, profit: 1108.71 },
      { month: `Jul 2025`, revenue: 1188.72, expenses: 127.0, profit: 1061.72 },
      { month: `Aug 2025`, revenue: 1559.56, expenses: 127.0, profit: 1433.83 },
      { month: `Sep 2025`, revenue: 1482.09, expenses: 127.0, profit: 1355.09 },
      { month: `Oct 2025`, revenue: 9744.71, expenses: 127.0, profit: 9617.71 },
      { month: `Nov 2025`, revenue: 5467.35, expenses: 127.0, profit: 5340.35 },
      { month: `Dec 2025`, revenue: 3618.23, expenses: 127.0, profit: 3492.5 },
      { month: `Jan 2026`, revenue: 2385.06, expenses: 127.0, profit: 2258.06 },
    ],
    avgMonthlyRevenue: 2813.0,
    avgMonthlyProfit: 2687.0,
    profitMargin: `95%`,
    annualRevenue: `with $23.5K net profit (11% margin), it operates in just five hours per week via a 3PL model. With 33% repeat customers, 25K+ email subscribers, and strong appeal to the underserved big-size men’s market, the brand offers clear upside through retail, influencer, and B2B expansion.`,
    annualProfit: `GBP £25,384`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Estonia`,
    platform: `Shopify`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 68.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (https://rangetrotter.com/) — identified from listing description`,
      `High revenue volatility (CV 86%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Kevin Labat`,
      location: `Italy`,
      verified: true,
    },
    socialMedia: [
      `12,000 followers`,
      `2,865 followers`,
      `90 followers`,
    ],
    expenses: [
      {
        item: `Shipping & Products`,
        amount: `GBP £3,880 /month`,
      },
      {
        item: `META Ads`,
        amount: `GBP £3,227 /month`,
      },
      {
        item: `Google Ads`,
        amount: `GBP £1,501 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £37,522 Included in sale price`,
      `Shopify`,
      `12,000 followers`,
      `2,865 followers`,
      `90 fol`,
    ],
    postSaleSupport: `Included. I can provide handover support. I can offer my customer service email templates. eMeet suppliers.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Kevin Labat`,
        date: `Feb 27, 2026 06:26 AM`,
        text: `Quick context for serious buyers:

You'll notice the revenue difference between the original listing and recent numbers. Here's exactly why:

Before Sep 2024: Normal ad spend → $215K/year

Sep 2024–Feb 2026: Intentional near-zero ad spend ($2,105 total) → ~$39K/year run rate

This is good news, not bad. It proves:

The business runs profitably on autopilot (75.8% repeat rate happened with no ads)

The email list is pure gold ($67K in email-only sales)

The product has genuine loyalty

The $215K `,
      },
      {
        author: `Kevin Labat`,
        date: `Jan 28, 2026 09:24 PM`,
        text: `Since listing the business, it has continued to operate profitably with minimal overhead — generating $67,000 in sales over the last 16 months through email marketing alone, with no ad spend. This shows a loyal customer base and a solid foundation for growth. The inventory included has a retail value of over $51,000 (detailed breakdown available), which at wholesale represents a significant portion of the offer.
This reflects both the tangible inventory value and the revenue-generating assets (w`,
      },
      {
        author: `Kevin Labat`,
        date: `Oct 04, 2024 07:38 PM`,
        text: `P&L Available since brand inception in May 2020.`,
      },
    ],
    ga: {
      users: `8,410`,
      totalPageViews: `5,821`,
      pagesPerSession: `7.53`,
      avgDuration: `00:00:36`,
      engagementRate: `0.88%`,
      topCountries: [
        {
          country: `United States`,
          views: 2685,
        },
        {
          country: `Netherlands`,
          views: 1468,
        },
        {
          country: `Canada`,
          views: 630,
        },
        {
          country: `Australia`,
          views: 495,
        },
        {
          country: `China`,
          views: 88,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 993,
    watchers: 71,
    commentCount: 3,
    about: `RangeTrotter is a USA-trademarked eCommerce brand selling comfortable cargo sweatpants, inspired by the hip-hop era, catering to nostalgic Baby Boomers and Millennials. Established in 2020, the brand specializes in sizes up to 6XL, serving the growing and underserved "big size men" market.

This business has two proven gears.

The first gear represents its current state, running with low effort and high efficiency. Since September 2024, we have intentionally run the business on near-zero ad spend, totaling just $1,584 on Meta in the last 12 months. During this period:

$58,614 in gross sales over the last 18 months with an exceptional 75.8% returning customer rate

Email list grown to 26,035 subscribers

568 orders fulfilled with an average order value of $92.75

Profit margin on recent sales: 95%

The second gear is the proven scale. Prior to September 2024, with normal ad spend, the business generated $215,000 in annual revenue. The infrastructure, supplier relationships, and brand equity to return to that level are all still in place.

What you are actually buying (all included in the $29,997 price):

Over $50,000 in retail-value inventory — physical product, ready to ship

A 26,035-person email list with a 75.8% repeat customer rate

A registered USA trademark

A five-year-old Shopify website, fully functional

Stable supplier relationships with sixteen bestselling SKUs

Operations require just five hours per week total between two founders. Customers are 80% USA, 14% Canada, and 6% Australia/New Zealand. A longstanding partnership with a 3PL and sourcing agent is in place, and untapped channels include influencers, retail partnerships, and B2B collaborations.

The price is $29,997 for a fast sale. Full financials, bank statements, and inventory photos are available to serious buyers immediately.

Message me to close.`,
  },
  {
    id: `12302017`,
    title: `Coca Coffee`,
    revealedName: `Coca Coffee`,
    url: `https://flippa.com/12302017`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 100592.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 10483.85, expenses: 6394.45, profit: 4088.13 },
      { month: `Apr 2025`, revenue: 11436.35, expenses: 6976.11, profit: 4460.24 },
      { month: `May 2025`, revenue: 12390.12, expenses: 7557.77, profit: 4832.35 },
      { month: `Jun 2025`, revenue: 13342.62, expenses: 8139.43, profit: 5203.19 },
      { month: `Jul 2025`, revenue: 14296.39, expenses: 8721.09, profit: 5575.3 },
      { month: `Aug 2025`, revenue: 15248.89, expenses: 9301.48, profit: 5947.41 },
      { month: `Sep 2025`, revenue: 16202.66, expenses: 9883.14, profit: 6318.25 },
      { month: `Oct 2025`, revenue: 15248.89, expenses: 9301.48, profit: 5947.41 },
      { month: `Nov 2025`, revenue: 13342.62, expenses: 8139.43, profit: 5203.19 },
      { month: `Dec 2025`, revenue: 11436.35, expenses: 6976.11, profit: 4460.24 },
      { month: `Jan 2026`, revenue: 9530.08, expenses: 5814.06, profit: 3717.29 },
      { month: `Feb 2026`, revenue: 9912.35, expenses: 6046.47, profit: 3865.88 },
    ],
    avgMonthlyRevenue: 12739.0,
    avgMonthlyProfit: 4968.0,
    profitMargin: `39%`,
    annualRevenue: `GBP £120,371`,
    annualProfit: `GBP £46,945`,
    expensesLastMonth: `GBP £6,407 /month`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Egypt`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 81.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 68.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical coffee brand from Egypt — ships actual coffee beans + merch`,
      `P&L shows suspicious arithmetic progression`,
      `Egyptian supplier dependency doesn't transfer`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `Stable revenue history`,
      `Zero loss months in P&L`,
    ],
    seller: {
      name: `keroles gamal`,
      location: `Egypt`,
      verified: true,
    },
    socialMedia: [
      `13,000 followers`,
      `6,000 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £6,407 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £11,257 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `13,000 followers`,
      `6,000 followers`,
      `Attachments`,
      `JPEG`,
      `WhatsApp Image 2026-03-05 at 3.38.49 PM`,
      `Contact Seller`,
      `Send message`,
      `keroles`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `keroles gamal`,
        date: `Mar 13, 2026 11:57 PM`,
        text: `Update for buyers:

We have just reduced the asking price to $117,000 to attract serious buyers and accelerate the sale process.

Happy to answer any questions from interested buyers.`,
      },
      {
        author: `keroles gamal`,
        date: `Mar 08, 2026 03:38 AM`,
        text: `Additional note for interested buyers:

The brand includes 22 coffee products, full recipes, roasting profiles, and all brand assets.

This is a turnkey opportunity ready for expansion.`,
      },
      {
        author: `keroles gamal`,
        date: `Mar 06, 2026 12:44 AM`,
        text: `Additional note for buyers:

The brand has strong recognition in the Egyptian and Arab coffee market, supported by a marketing partnership with former international goalkeeper Essam El Hadary, one of the most well-known football figures in the Arab world.

This partnership has helped strengthen brand credibility and visibility in the market.

The business generates revenue through Shopify and additional B2B/offline channels.

Happy to answer any questions.`,
      },
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 247,
    watchers: 4,
    commentCount: 3,
    about: `Coca&Hadary: Premium Coffee Brand with Celebrity Endorsement – High-Growth, High-Margin Middle East Market

Business Overview

Coca&Hadary is a dynamic, fully integrated premium coffee brand based in Egypt, founded in 2022. In just four years, it has achieved impressive growth, establishing itself as a recognized market leader across the Middle East with a unique blend of B2B and B2C sales channels. The brand offers 22 high-quality products, including specialty blends and single-origin coffees, all roasted and packaged in-house for superior quality and freshness.

Celebrity Partnership & Powerful Brand Positioning

A standout asset is the exclusive partnership with Essam El-Hadary—one of the region’s most celebrated athletes—which brings unprecedented visibility, trust, and differentiation. This association drives regional brand equity and opens doors to scalable marketing and expansion opportunities throughout Arab markets.

Key Financials (Trailing Twelve Months)

Annual Revenue: USD $160,400
Annual Profit: USD $62,556
Monthly Revenue: USD $13,366 (AVG)
Monthly Profit: USD $5,213 (AVG)
Profit Margin: 39‎%‎
Profit Multiple: 2.0x
Revenue Multiple: 0.8x

Business Highlights

Geographical Reach: Nationwide coverage in Egypt, ready for regional expansion across GCC markets.
Diversified Revenue: Income from wholesale distribution, retail partnerships, cafés, restaurants, supermarkets, and direct-to-consumer channels ensures stability and scalability.
Customer Base: Thousands of satisfied B2B and B2C customers, with excellent brand recall and engagement.
Brand Visibility: Over 13,000 Facebook followers and 6,000 Instagram followers, with established digital marketing presence and recognized packaging and identity.
Lean Operations: End-to-end roasting, packaging, and quality control carried out in-house for cost efficiency and consistency.
Celebrity Endorsement: Partnership with Essam El-Hadary significantly increases customer trust and accelerates regional marketing effectiveness.

Assets Included in Sale

Domain & website files
Social media accounts (Instagram, Facebook)
Email address & subscriber list
Full brand and trademark ownership
22 commercial products & unique roasting profiles
Complete packaging designs and visual identity
Supplier contracts & trusted supply chain
Inventory (in stock)
Phone number(s)
Product documentation & recipes

Growth Opportunities

Regional Expansion: Tap into GCC and international markets, leveraging the brand’s trusted identity and celebrity backing.
Online Sales: Drive increased e-commerce growth with enhanced digital marketing and direct customer engagement.
Wholesale & Retail: Expand product reach by building new B2B partnerships and exploring branded retail locations.
Product Innovation: Develop new blends, limited editions, and branded collaborations to maintain customer excitement and loyalty.

Competitive Advantages

Strong visual branding and storytelling create meaningful customer connections and support pre`,
  },
  {
    id: `12004030`,
    title: `Shingyo`,
    revealedName: `Shingyo`,
    url: `https://flippa.com/12004030`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 76417.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 46743.62, expenses: 34370.01, profit: 12373.61 },
      { month: `Feb 2025`, revenue: 31299.15, expenses: 34370.01, profit: -3070.86 },
      { month: `Mar 2025`, revenue: 44340.78, expenses: 34370.01, profit: 9970.77 },
      { month: `Apr 2025`, revenue: 50862.23, expenses: 34370.01, profit: 16489.68 },
      { month: `May 2025`, revenue: 46622.97, expenses: 34370.01, profit: 12251.69 },
      { month: `Jun 2025`, revenue: 31582.36, expenses: 34370.01, profit: -2788.92 },
      { month: `Jul 2025`, revenue: 28613.1, expenses: 34370.01, profit: -5756.91 },
      { month: `Aug 2025`, revenue: 29457.65, expenses: 34370.01, profit: -4912.36 },
      { month: `Sep 2025`, revenue: 43729.91, expenses: 34370.01, profit: 9358.63 },
      { month: `Oct 2025`, revenue: 39993.57, expenses: 34370.01, profit: 5623.56 },
      { month: `Nov 2025`, revenue: 53033.93, expenses: 34370.01, profit: 18663.92 },
      { month: `Dec 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 40571.0,
    avgMonthlyProfit: 5684.0,
    profitMargin: `15%`,
    annualRevenue: `strong B2B client loyalty (40% repeat customers)`,
    annualProfit: `GBP £53,703`,
    ageYears: 14.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `Netherlands`,
    platform: `WooCommerce`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 73.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 67.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `EU-based sustainable packaging B2B brand (Netherlands) with €450K revenue, physical products, high AOV €345, EU supplier`,
      `4 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    socialMedia: [
      `149 followers`,
      `22 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,302 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £2,746 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £5,396 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £432 /month`,
      },
      {
        item: `Management fee`,
        amount: `GBP £3,268 /month`,
      },
      {
        item: `website & software`,
        amount: `GBP £1,725 /month`,
      },
      {
        item: `sales agent fee`,
        amount: `GBP £872 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £74,207 Excluded from sale price`,
      `WooCommerce`,
      `Included. i can provide two months of post sales assistence`,
      `149 followers`,
      `22 followers`,
      `122 subscribers`,
      `5,200 subscribers`,
      `Attachments`,
      `Shingyo BV`,
    ],
    postSaleSupport: `Included. i can provide two months of post sales assistence`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `11,875`,
      totalPageViews: `2,802`,
      pagesPerSession: `1.93`,
      avgDuration: `00:00:43`,
      engagementRate: `0.47%`,
      topCountries: [
        {
          country: `France`,
          views: 1607,
        },
        {
          country: `Belgium`,
          views: 132,
        },
        {
          country: `China`,
          views: 130,
        },
        {
          country: `United States`,
          views: 49,
        },
        {
          country: `Germany`,
          views: 20,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 4377,
    watchers: 213,
    about: `Why the change?

The previous price reflected only the website + operations.

The new €150,000 asking price includes EVERYTHING, including:

full domain portfolio (10 premium 6-letter EU domains)

verified financials

brand assets, customers & systems

established supplier relationships

external fulfilment setup 

EXECUTIVE SUMMARY

This is a rare opportunity to acquire a 10-year-old, EU-based sustainable packaging brand with:

€450,000 annual revenue

strong B2B client loyalty (40% repeat customers)

high AOV (€345)

stable fulfilment in place

no employees, no complex operations, just two freelancers

premium 6-letter domain portfolio for international expansion

The business is ideal for:

a buyer who wants an asset-backed e-commerce brand

agencies wanting a proven niche brand

first-time buyers seeking a turnkey operation

Amazon FBA operators who want to expand into EU markets

wholesalers looking for instant expansion without long lead times

Seller is exiting to focus on financial markets and trading full-time.

ABOUT THE BUSINESS

Founded in 2013, this brand has become a trusted European source for sustainable, high-quality packaging, including:

linen pouches (multiple sizes)

cotton and GOTS drawstring bags

biodegradable jute bags

recycled paper packaging

custom-printed options for branding & promotional use

The brand serves:

gifting companies

retail chains

event agencies

restaurants

craft & artisan businesses

wholesale distributors

The business model is simple:

B2B e-commerce (WooCommerce webshop)

B2C orders (growing)

bulk wholesale orders

repeat customers across multiple EU markets

No employees.

10–15 hours a week needed from the owner.

Metric

Value

Revenue

€450,000+ / year

Net Profit

€53,710 / year

Profit Margin

16%

Average Order Value

€345

Repeat Customer Rate

40%

Traffic

~4,300/month

Email List

5,200 subscribers

Paid & ready-to-ship stock for 12 months of turnover

Time Required

10–15 hours/week

Platform

WooCommerce (easy to migrate to Shopify if desired)

? EUROPEAN DOMAIN PORTFOLIO (STRATEGIC ASSET)

Included in the sale:

10 rare 6-letter country-specific domains, perfect for:

multi-region SEO

local landing pages

brand expansion across EU markets

Shopify Markets setup

international wholesale deals

This adds strategic long-term value far beyond the current revenue.

✔ 12–15 months of ready-to-ship inventory included

→ No reorders required

→ No cash tied up for first year

→ Immediate fulfilment capacity

→ Massive advantage for scaling ads, Amazon, or wholesale

→ Zero lead-time risk

For a buyer wanting to grow aggressively or stabilise cashflow, this is a built-in launchpad.`,
  },
  {
    id: `11873808`,
    title: `OnlyKnives`,
    revealedName: `OnlyKnives`,
    url: `https://flippa.com/11873808`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 126811.0,
    monthlyPL: [
      { month: `Jan 2024`, revenue: 4410.71, expenses: 353.06, profit: 4056.38 },
      { month: `Feb 2024`, revenue: 8482.33, expenses: 524.51, profit: 7957.82 },
      { month: `Mar 2024`, revenue: 7142.48, expenses: 407.67, profit: 6734.81 },
      { month: `Apr 2024`, revenue: 6477.0, expenses: 365.76, profit: 6111.24 },
      { month: `May 2024`, revenue: 5184.14, expenses: 330.2, profit: 4853.94 },
      { month: `Jun 2024`, revenue: 2778.76, expenses: 200.66, profit: 2578.1 },
      { month: `Jul 2024`, revenue: 2980.69, expenses: 236.22, profit: 2744.47 },
      { month: `Aug 2024`, revenue: 6292.85, expenses: 506.73, profit: 5784.85 },
      { month: `Sep 2024`, revenue: 4732.02, expenses: 701.04, profit: 4030.98 },
      { month: `Oct 2024`, revenue: 9084.31, expenses: 843.28, profit: 8242.3 },
      { month: `Nov 2024`, revenue: 10273.03, expenses: 1103.63, profit: 9168.13 },
      { month: `Dec 2024`, revenue: 8241.03, expenses: 675.64, profit: 7564.12 },
    ],
    avgMonthlyRevenue: 6340.0,
    avgMonthlyProfit: 5819.0,
    profitMargin: `92%`,
    annualRevenue: `of $65,000 and an impressive profit margin of 62%, this business shows great potential for growth and profitability.`,
    annualProfit: `GBP £54,982`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Switzerland`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 78.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 67.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (OnlyKnives) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Andri Thomann`,
      location: `Switzerland`,
      verified: false,
    },
    expenses: [
      {
        item: `Shipping costs`,
        amount: `GBP £359 /month`,
      },
      {
        item: `Apps`,
        amount: `GBP £83 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Inventory value`,
      `GBP £41,315 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `Attachments`,
      `Gesamtumsatz im Zeitverlauf - 2024-01-01 - 2024-12-31 (1)`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $143,141`,
      `USD $126,811`,
      `Reduced 11%`,
      `GBP £95,164`,
      `Excludes USD $55,054 of inventor`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1098,
    watchers: 65,
    about: `This fast-growing eCommerce business, operating under the domain onlyknives.ch, caters to the sports and outdoor industry with a focus on high-quality knives. Established in 2022, the business has quickly gained traction and built a loyal customer base. With an annual revenue of $65,000 and an impressive profit margin of 62%, this business shows great potential for growth and profitability.

The website's Domain Authority of 9 reflects its strong online presence and credibility within its niche market. The business has leveraged digital marketing strategies to drive traffic to the site and convert visitors into customers. With an established revenue stream and a solid foundation, this business is well-positioned for expansion and further success in the rapidly growing eCommerce industry.

Investing in this promising business offers a unique opportunity to enter the lucrative sports and outdoor market with a well-established brand and proven track record. With a strong financial performance and growth potential, this business is set to provide a solid return on investment for the right buyer. Don't miss out on the chance to own a thriving eCommerce business in a growing industry segment.

Business is still up and running. I handle everything by myself. Please mind that i'm only 24 years old and have never sold a business before. If you need more insight into anything not mentioned please let me know.

Would agree to settle for less if this can speed up the process.`,
  },
  {
    id: `11982861`,
    title: `twodogs.ch`,
    revealedName: `twodogs.ch`,
    url: `https://flippa.com/11982861`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 95000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 3392.17, expenses: 1404.62, profit: 1987.55 },
      { month: `Apr 2025`, revenue: 2727.96, expenses: 1163.32, profit: 1564.64 },
      { month: `May 2025`, revenue: 5901.69, expenses: 2293.62, profit: 3609.34 },
      { month: `Jun 2025`, revenue: 4333.24, expenses: 1958.34, profit: 2374.9 },
      { month: `Jul 2025`, revenue: 3430.27, expenses: 1879.6, profit: 1550.67 },
      { month: `Aug 2025`, revenue: 3679.19, expenses: 2082.8, profit: 1597.66 },
      { month: `Sep 2025`, revenue: 4362.45, expenses: 2684.78, profit: 1677.67 },
      { month: `Oct 2025`, revenue: 6691.63, expenses: 3530.6, profit: 3159.76 },
      { month: `Nov 2025`, revenue: 14226.54, expenses: 6540.5, profit: 7686.04 },
      { month: `Dec 2025`, revenue: 37318.95, expenses: 16073.12, profit: 21245.83 },
      { month: `Jan 2026`, revenue: 6704.33, expenses: 3731.26, profit: 2973.07 },
      { month: `Feb 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 8433.0,
    avgMonthlyProfit: 4119.0,
    profitMargin: `53%`,
    annualRevenue: `GBP £73,046`,
    annualProfit: `GBP £38,919`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Switzerland`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 67.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (twodogs.ch) — identified from listing description`,
      `High revenue volatility (CV 114%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `2 transactions totalling USD $115,628`,
    },
    socialMedia: [
      `312 followers`,
      `2,089 followers`,
    ],
    expenses: [
      {
        item: `advertising`,
        amount: `GBP £1,526 /month`,
      },
      {
        item: `processing fees`,
        amount: `GBP £200 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £113 /month`,
      },
      {
        item: `labor costs`,
        amount: `GBP £426 /month`,
      },
      {
        item: `VA costs`,
        amount: `GBP £47 /month`,
      },
      {
        item: `Shipping costs`,
        amount: `GBP £300 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £11,257 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `312 followers`,
      `2,089 followers`,
      `8,670 subscribers`,
      `Attachments`,
      `XLSX`,
      `Flippa_P&L_2022-2025_September_FINAL`,
      `No comments`,
      `Managed by Flippa`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `41,294`,
      totalPageViews: `17,764`,
      pagesPerSession: `3.76`,
      avgDuration: `00:00:20`,
      engagementRate: `0.58%`,
      topCountries: [
        {
          country: `Switzerland`,
          views: 9842,
        },
        {
          country: `China`,
          views: 1016,
        },
        {
          country: `(not set)`,
          views: 746,
        },
        {
          country: `United States`,
          views: 576,
        },
        {
          country: `Saudi Arabia`,
          views: 247,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1278,
    watchers: 56,
    about: `6-Year-Old Swiss Brand Offering High-Quality Personalized Socks – Profitable, Recognizable, and Primed for Expansion.

This established Swiss e-commerce brand has built a strong reputation for high-quality, personalized socks featuring original designs by local Swiss artists. With strong brand recognition, high customer satisfaction, and word-of-mouth-driven growth, it enjoys a stable and profitable operation — particularly during Q4, its peak season.

The business experiences heightened seasonality around Christmas, largely because less is invested in marketing during the rest of the year. During the summer, the owner shifts focus to another business that is in its peak season.


Business Highlights


Consistently stable year-over-year revenue

Strong customer loyalty: 18.6% returning customer rate

Original Swiss designs: created by local artists

Seasonal strength with most revenue generated in Q4

P&L: https://docs.google.com/spreadsheets/d/1v53JXytrDu2uAOF-Lt6G1MeSoP5wcben/edit?usp=sharing&ouid=101531971416567038072&rtpof=true&sd=true

Financial Snapshot

2023 Revenue: $162k

2024 Revenue: $179k

2025 Revenue: $104k
EBITDA %: 50%+

Returning Customer Rate: 18.6%

Low operational overhead



Operations & Logistics

All orders are printed and shipped from a dedicated warehouse in Switzerland

Partnership with Swiss Post and DPD enables next-day delivery on nearly all orders

Option to take over warehouse lease and inventory for a seamless transition



Transition & Support

Immediate handover possible

Full support for 2 months included, covering fulfilment, customer service, and supplier onboarding



Reason for Sale

Owner is stepping away due to family commitments and a new project. This is a turnkey opportunity to acquire a proven, profitable business with strong brand equity and significant room for growth.


_____

1. Operations

Production Model
The business operates a hybrid production model:

Blank textile products are sourced from suppliers.

Printing is conducted in-house in a dedicated rented workspace.

During peak season (November–December), temporary staff are hired for production.

During off-season periods, printing may be handled directly by the owner or minimal staff.

Production equipment is relatively simple and inexpensive, making replication feasible.

Outsourcing Potential
The business can be:

Fully outsourced to a third-party print-on-demand provider, or

Integrated into an existing printing company as an additional brand line.

The current infrastructure is not complex and could be transitioned with supplier and process documentation.

Marketing
Primary channel:

Google Ads (core acquisition driver)

Secondary channel:

Email marketing (database of approximately 8,000–10,000 subscribers)

Facebook Ads have been tested but are considered expensive and less effective in Switzerland.

Marketing outside peak Q4 season has been limited. The owner believes there is untapped growth potential, particularly in:

Email marketi`,
  },
  {
    id: `12289785`,
    title: `108 SPORTIF`,
    revealedName: `108 SPORTIF`,
    url: `https://flippa.com/12289785`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 183143.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 34784.03, expenses: 23436.58, profit: 11347.45 },
      { month: `Apr 2025`, revenue: 22230.08, expenses: 18947.13, profit: 3282.95 },
      { month: `May 2025`, revenue: 22147.53, expenses: 18280.38, profit: 3867.15 },
      { month: `Jun 2025`, revenue: 36177.22, expenses: 22915.88, profit: 13260.07 },
      { month: `Jul 2025`, revenue: 14099.54, expenses: 11690.35, profit: 2409.19 },
      { month: `Aug 2025`, revenue: 22711.41, expenses: 19253.2, profit: 3456.94 },
      { month: `Sep 2025`, revenue: 12070.08, expenses: 10783.57, profit: 1286.51 },
      { month: `Oct 2025`, revenue: 25805.13, expenses: 19211.29, profit: 6593.84 },
      { month: `Nov 2025`, revenue: 67724.02, expenses: 39991.03, profit: 27732.99 },
      { month: `Dec 2025`, revenue: 20996.91, expenses: 19993.61, profit: 1003.3 },
      { month: `Jan 2026`, revenue: 25074.88, expenses: 23914.1, profit: 1160.78 },
      { month: `Feb 2026`, revenue: 39160.45, expenses: 25709.88, profit: 13450.57 },
    ],
    avgMonthlyRevenue: 28582.0,
    avgMonthlyProfit: 7404.0,
    profitMargin: `26%`,
    annualRevenue: `GBP £270,064`,
    annualProfit: `GBP £69,963`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 82.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 67.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (108 SPORTIF) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `1,600 followers`,
      `21,500 followers`,
      `1,100 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,506 /month`,
      },
      {
        item: `Advertising`,
        amount: `GBP £7,724 /month`,
      },
      {
        item: `Cost of Goods Sold`,
        amount: `GBP £3,630 /month`,
      },
      {
        item: `Subscription Fees`,
        amount: `GBP £836 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £104,296 Included in sale price`,
      `Shopify`,
      `Included.`,
      `1,600 followers`,
      `21,500 followers`,
      `1,100 followers`,
      `11,704 subscribers`,
      `Attachments`,
      `XLSX`,
      `108 Sportif P&L Feb 2026 (AUD)`,
      `XLSX`,
      `108 SportIF PTY LTD -`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 402,
    watchers: 22,
    about: `Customer Review: https://open.spotify.com/episode/6I8USjfoQo7DwI5MU9Re5H?si=aZbT9sMsTA-U57vPJMF3ww&t=46

Business Overview

108 SPORTIF is an Australian-founded conscious luxury activewear brand built at the intersection of performance, athleisure, and slow fashion. Designed for modern, affluent women, the brand focuses on timeless silhouettes, premium sustainable fabrics, and seasonless collections that prioritise longevity over trends.

The brand was created to move away from fast fashion cycles. Products are intentionally designed to last in both quality and style, allowing customers to buy less but better. Limited capsule collections are released to integrate seamlessly into an existing wardrobe, reinforcing brand loyalty and repeat purchasing.

Operating primarily as a DTC business, 108 SPORTIF has established a strong international customer base and a clear premium positioning in a highly competitive category.

Attached FY22/23 and FY23/24 financials (June 2022 – July 2024) reflect an important strategic shift. Up to 2023, the business had a stronger wholesale footprint. Following the bankruptcy of one of its largest US stockists, Bandier, which left an outstanding balance unpaid, the owner made a deliberate decision to reduce wholesale exposure and focus on higher-margin, more controllable eCommerce sales. This shift has strengthened operational control and reduced reliance on external retail partners.

In late 2024, the business transitioned from operating as a sole trader under Christina Faraonio to a Pty Ltd structure. During the same period, accounting migrated from Xero to QuickBooks, resulting in a short adjustment period reflected in the financial reporting.

Products & Brand Positioning

Luxury women’s activewear and athleisure

60+ SKUs across core, best-selling categories

Exclusive sustainable fabric sourcing from Italy, USA, South Korea and China

Seasonless, non-trend-driven designs

Premium price point supported by quality and differentiation

Designs are difficult to replicate, creating defensibility in the market

The brand appeals to customers with high disposable income who value quality, sustainability, and timeless design over fast-fashion alternatives.

Customers & Market

Affluent, highly engaged customer base

Strong repeat purchasing behaviour (31% repeat rate over the last 12 months)

Geographic revenue split:

60% United States

30% Australia

5% Southeast Asia

5% Middle East

Customers are primarily acquired through paid social and retained via email marketing, resulting in strong engagement and brand loyalty rather than discount-driven sales.

Marketing & Growth

Primary acquisition channel: Meta paid advertising

Retention driven by Klaviyo email marketing

Advertising is currently profitable, averaging ~2.16x ROAS

Creatives produced in-house, supported by influencers and organic customer reviews

The brand has remained conservative in scaling paid media. A buyer with stronger creative systems or agency suppo`,
  },
  {
    id: `12279616`,
    title: `Club Stamping`,
    revealedName: `Club Stamping`,
    url: `https://flippa.com/12279616`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 99000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 4278.63, expenses: 2715.26, profit: 1563.37 },
      { month: `Apr 2025`, revenue: 4456.43, expenses: 3242.31, profit: 1214.12 },
      { month: `May 2025`, revenue: 3121.66, expenses: 2113.28, profit: 1008.38 },
      { month: `Jun 2025`, revenue: 3023.87, expenses: 2112.01, profit: 911.86 },
      { month: `Jul 2025`, revenue: 3771.9, expenses: 2350.77, profit: 1421.13 },
      { month: `Aug 2025`, revenue: 6417.31, expenses: 3175.0, profit: 3241.04 },
      { month: `Sep 2025`, revenue: 5392.42, expenses: 2797.81, profit: 2594.61 },
      { month: `Oct 2025`, revenue: 7467.6, expenses: 3755.39, profit: 3713.48 },
      { month: `Nov 2025`, revenue: 6621.78, expenses: 4283.71, profit: 2338.07 },
      { month: `Dec 2025`, revenue: 9199.88, expenses: 4390.39, profit: 4809.49 },
      { month: `Jan 2026`, revenue: 6808.47, expenses: 3154.68, profit: 3653.79 },
      { month: `Feb 2026`, revenue: 8672.83, expenses: 4343.4, profit: 4329.43 },
    ],
    avgMonthlyRevenue: 5769.0,
    avgMonthlyProfit: 2567.0,
    profitMargin: `44%`,
    annualRevenue: `GBP £54,515`,
    annualProfit: `GBP £24,251`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `NY, United States`,
    platform: `and`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 87.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 67.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Ecommerce brand selling DIY golf club stamping/customization kits (New York). Physical product with US warehouse; not ea`,
    ],
    greenFlags: [],
    seller: {
      name: `Kori Donath`,
      location: `United States`,
      verified: true,
    },
    expenses: [
      {
        item: `COGS`,
        amount: `GBP £668 /month`,
      },
      {
        item: `Shipping & Handling`,
        amount: `GBP £347 /month`,
      },
      {
        item: `Google Ads`,
        amount: `GBP £868 /month`,
      },
      {
        item: `Shopify Transaction Fees`,
        amount: `GBP £156 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £4,503 Included in sale price`,
      `Shopify`,
      `Included.`,
      `1,592 followers`,
      `5,383 subscribers`,
      `Attachments`,
      `XLSX`,
      `Club Stamping MASTER P&L (4)`,
      `XLSX`,
      `Club Stamping MASTER P&L (4)`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicati`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `33,762`,
      totalPageViews: `8,893`,
      pagesPerSession: `2.39`,
      avgDuration: `00:00:00`,
      engagementRate: `0.34%`,
      topCountries: [
        {
          country: `United States`,
          views: 8944,
        },
        {
          country: `Canada`,
          views: 422,
        },
        {
          country: `United Kingdom`,
          views: 118,
        },
        {
          country: `China`,
          views: 90,
        },
        {
          country: `(not set)`,
          views: 39,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 712,
    watchers: 50,
    about: `Club Stamping: Business Overview

Club Stamping is a profitable e-commerce brand specializing in DIY golf club customization kits, including stamping tools and paint fill products. Established over 8 years ago and based in New York, the business has grown into a market leader in this high-barrier niche with minimal competition, strong SEO rankings, and a loyal customer base of over 6,600 customers. With strong profitability and year-over-year revenue growth of 81%, Club Stamping presents a compelling opportunity for a buyer seeking a lean, efficient business in a growing enthusiast market.

The business operates on the Shopify platform and leverages self-fulfillment with a lean expense structure. The average order value is USD $108, and with an average of one item per order, customers are purchasing high-ticket, specialized kits designed for a growing base of golf enthusiasts, pro shops, and boutique golf retailers. Notably, the brand has maintained a 43% profit margin across the last 12 months, with net profits increasing 255% year-over-year—demonstrating a clear product-market fit and operational scalability.

Key Financials (TTM Ending January 2026)

Revenue: USD $66,832
Profit: USD $28,616
Average Monthly Revenue: USD $5,569
Average Monthly Profit: USD $2,384
Profit Margin: 43%
YoY Revenue Growth: 81%
YoY Profit Growth: 255%

Monthly revenue has shown consistent growth, peaking in December 2025 at USD $9,653 with over USD $5,000 in profit. The business runs efficiently with low overhead costs, including monthly COGS of $890, shipping and handling of $462, and modest ad spend on Google Ads at $1,156 per month. The refund rate is 0.0% and fulfillment stands at 98.9%, signaling strong operational execution and product satisfaction.

Key Business Highlights

Established Brand: 9 years of operating history and proven product-market fit in a high-engagement niche.
Strong Customer Base: 6,657 total customers and a Shopify email list of 6,632 subscribers.
High SEO Value: Top organic rankings for keywords such as “Golf Club Stamping Kit” and “Wedge Stamping,” with 316 total keywords and 136 referring domains.
Scalable Infrastructure: Self-fulfillment model and included inventory valued at USD $3,500.
Robust Traffic: 103,700 page views over the past 12 months, with 55% of traffic from cross-network sources and 22% from organic search.
Operational Simplicity: Shopify-powered storefront with minimal refund rates, high fulfillment, and efficient supply chain.

Customer Demographics & Reach

The business primarily serves customers in the United States, which contributes the largest share of its 103,700 total page views, followed by Canada, China, and the UK. While the customer return rate sits at a modest 8%, the total addressable market of amateur golfers, collectors, and boutique golf shops continues to expand.

The brand’s domain, www.clubstamping.com, commands authority in the space, supported by strong keyword ranking and niche relevance. Social prese`,
  },
  {
    id: `12358381`,
    title: `Nestor Avenue`,
    revealedName: `Nestor Avenue`,
    url: `https://flippa.com/12358381`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 20905.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 6457.95, expenses: 7951.47, profit: -1493.52 },
      { month: `Apr 2025`, revenue: 7839.71, expenses: 8028.94, profit: -189.23 },
      { month: `May 2025`, revenue: 8497.57, expenses: 11447.78, profit: -2950.21 },
      { month: `Jun 2025`, revenue: 12012.93, expenses: 10016.49, profit: 1996.44 },
      { month: `Jul 2025`, revenue: 9641.84, expenses: 10758.17, profit: -1117.6 },
      { month: `Aug 2025`, revenue: 8536.94, expenses: 15118.08, profit: -6581.14 },
      { month: `Sep 2025`, revenue: 6791.96, expenses: 8775.7, profit: -1983.74 },
      { month: `Oct 2025`, revenue: 16328.39, expenses: 11376.66, profit: 4951.73 },
      { month: `Nov 2025`, revenue: 15184.12, expenses: 5949.95, profit: 9234.17 },
      { month: `Dec 2025`, revenue: 12621.26, expenses: 7190.74, profit: 5430.52 },
      { month: `Jan 2026`, revenue: 16506.19, expenses: 7658.1, profit: 8849.36 },
      { month: `Feb 2026`, revenue: 12466.32, expenses: 2585.72, profit: 9880.6 },
    ],
    avgMonthlyRevenue: 11074.0,
    avgMonthlyProfit: 2169.0,
    profitMargin: `20%`,
    annualRevenue: `GBP £104,633`,
    annualProfit: `GBP £20,492`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Premium`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 70.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 66.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian baby and toddler feeding products brand with physical D2C inventory; requires Australian-based supplier relat`,
      `6 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Megan Brunton`,
      location: `Australia`,
      verified: false,
    },
    socialMedia: [
      `500 followers`,
      `3,200 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,118 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £1,589 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £265 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £26,485 Excluded from sale price`,
      `Google Cloud Functions`,
      `Included.`,
      `500 followers`,
      `3,200 followers`,
      `4,500 subscribers`,
      `Attachments`,
      `Nestor_Avenue_Pty_Ltd_-_Profit_and_Loss (2)`,
      `No comm`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `51,345`,
      totalPageViews: `27,775`,
      pagesPerSession: `5.82`,
      avgDuration: `00:01:01`,
      engagementRate: `0.88%`,
      topCountries: [
        {
          country: `Australia`,
          views: 32342,
        },
        {
          country: `China`,
          views: 573,
        },
        {
          country: `United States`,
          views: 369,
        },
        {
          country: `Singapore`,
          views: 240,
        },
        {
          country: `Vietnam`,
          views: 57,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 291,
    watchers: 29,
    about: `Nestor Avenue – Leading Australian Baby & Toddler E-Commerce Brand with Unique Product Innovation

Industry: Baby & Toddler Feeding Products | Location: Australia (Online, Home-Based) | Business Model: Direct-to-Consumer E-Commerce

Business Overview

Nestor Avenue is an established, five-year-old Australian D2C e-commerce brand specializing in premium silicone feeding accessories, recycled plastic dinnerware, and modern silicone toys for babies and toddlers. Designed with busy parents in mind, the brand has delivered practical, high-quality, and affordable solutions to families nationwide, building a reputation for quality and innovation within the parenting community.

Product Portfolio Includes:

Silicone suction plates and bowls (featuring patented, removable and dividable inserts)
Recycled plastic dinnerware
Silicone lunchboxes
Teething and bath toys
Feeding accessories

Unique Selling Proposition:
Nestor Avenue is the only Australian brand offering a suction baby plate with removable, dividable inserts—a proprietary design solving a key pain point for parents. This exclusive feature differentiates the brand, ensuring strong customer demand and setting the stage for dynamic growth across the baby feeding market.

Key Financials (Trailing 12 Months)

Annual Revenue: AUD $201,622
Annual Profit: AUD $39,486
Monthly Revenue (Avg): AUD $16,801
Monthly Profit (Avg): AUD $3,291
Profit Margin: 20%
Profit Multiple: 1.0x
Revenue Multiple: 0.2x

Operations & Fulfilment

100% online, home-based fulfilment (easily relocatable)
Owner-managed, streamlined operation—orders processed, picked, packed, and shipped direct to customers Australia-wide
Low overhead, lean cost structure, and simple systems for effortless owner transition
Scalable—ready to transition to outsourced 3PL warehousing as the business grows

Supply Chain & Intellectual Property

Exclusive, custom-moulded product designs with proprietary features
Established, reliable supplier relationships in China supporting both custom and standard product ranges
Transferable moulds, supplier contracts, and developed processes
Registered brand assets, trademarks/patents, and custom technology included

Brand Reach & Online Presence

Instagram: 3,200 followers
Facebook: 500 followers
Email list: 4,500+ engaged subscribers
Average Monthly Page Views: 27,775

Growth Opportunities

Scale paid ads and influencer marketing
Expand wholesale partnerships with baby boutiques and specialty retailers
Launch on additional marketplaces (Amazon, etc.)
Grow the product range & launch new innovations
Introduce subscription or bundle offerings
Enable international shipping to capture global demand

Why Buy Nestor Avenue?

Turnkey, home-based e-commerce business with streamlined operations
Strong foundation with unique, in-demand product offering
Established brand recognition and highly engaged audience
Significant upside for a motivated acquirer to scale through product, marketing, and B2B expansion
Ideal for entreprene`,
  },
  {
    id: `11755001`,
    title: `The Web Hunters`,
    revealedName: `The Web Hunters`,
    url: `https://flippa.com/11755001`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 130000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 8315.96, expenses: 4916.17, profit: 3401.06 },
      { month: `Mar 2025`, revenue: 6384.29, expenses: 4282.44, profit: 2101.85 },
      { month: `Apr 2025`, revenue: 8089.9, expenses: 3975.1, profit: 4114.8 },
      { month: `May 2025`, revenue: 8989.06, expenses: 4319.27, profit: 4669.79 },
      { month: `Jun 2025`, revenue: 9919.97, expenses: 4114.8, profit: 5805.17 },
      { month: `Jul 2025`, revenue: 10218.42, expenses: 4466.59, profit: 5753.1 },
      { month: `Aug 2025`, revenue: 13173.71, expenses: 4762.5, profit: 8411.21 },
      { month: `Sep 2025`, revenue: 8699.5, expenses: 5228.59, profit: 3470.91 },
      { month: `Oct 2025`, revenue: 7980.68, expenses: 4654.55, profit: 3326.13 },
      { month: `Nov 2025`, revenue: 6681.47, expenses: 4649.47, profit: 2032.0 },
      { month: `Dec 2025`, revenue: 5153.66, expenses: 4135.12, profit: 1018.54 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 8510.0,
    avgMonthlyProfit: 3675.0,
    profitMargin: `47%`,
    annualRevenue: `GBP £73,708`,
    annualProfit: `GBP £34,728`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, PHP, Stripe`,
    country: `DE, United States`,
    platform: `WordPress`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 85.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 66.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -68% — The Web Hunters`,
    ],
    greenFlags: [],
    seller: {
      name: `Salman M.`,
      location: `Pakistan`,
      verified: true,
      transactions: `2 transactions totalling USD $120,200`,
    },
    expenses: [
      {
        item: `Salaries`,
        amount: `GBP £2,852 /month`,
      },
      {
        item: `Online Tools`,
        amount: `GBP £375 /month`,
      },
      {
        item: `Commissions`,
        amount: `GBP £362 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `WordPress`,
      `Included.`,
      `863 followers`,
      `118 followers`,
      `42 followers`,
      `8 subscribers`,
      `141 subscribers`,
      `Attachments`,
      `XLSX`,
      `TWH P&L 2021-2025`,
      `Contact Seller`,
      `Send message`,
      `Salman M. Oct 04, 2025 05:00 PM`,
      `@mike.aquilia All team membe`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Salman M.`,
        date: `Oct 04, 2025 05:00 PM`,
        text: `@mike.aquilia All team members are from Pakistan but company is registered in USA and also have 50% clients from USA. Rest 50% are from UK, Europe, and Canada.

Company needs to be a leadership and sales person to grow the business. Managers can handle the current operations and new clients as well.

13 and 14 team members are co founders.`,
      },
      {
        author: `Salman M.`,
        date: `Jul 23, 2024 09:04 PM`,
        text: `Hello @Krishan Jhalani
Thanks for your interest.

Our remote employees are from Pakistan and 99% of clients are based in the United States, Canada, and the UK.

Our company is also registered as an LLC.

Let me know if you have any more questions.

Thanks!
Salman`,
      },
      {
        author: `Krishan Jhalani`,
        date: `Jul 23, 2024 06:36 PM`,
        text: `Hello - is this business in the US or in Pakistan`,
      },
    ],
    ga: {
      users: `3,254`,
      totalPageViews: `1,144`,
      pagesPerSession: `1.47`,
      avgDuration: `00:00:23`,
      engagementRate: `0.30%`,
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `PHP`,
      `Stripe`,
    ],
    views: 4904,
    watchers: 163,
    commentCount: 4,
    about: `I will be with you for 3 months to ensure a smooth transition. I love this business and want to see it grow. You can reach out to me anytime after that as well.

ℹ️ Description:
The business launched in Nov 2018. Since then, it has grown from a startup into a thriving digital agency. It has maintained profitability since its start.

Our agency is in a very stable state and focuses on growth this year again like 2021 and 2022. We were more focused on team and system building in the last year.

This business is a full-service digital agency with capabilities across web design & development, marketing, and branding, we work with clients to unlock value through creativity, technology, and business-minded thinking.

Churn Rate: 2.1

LTV of top 5 customers in last 3 years:
Customer 1: $104,599.57
Customer 2: $73,345.21
Customer 3: $26,120.42
Customer 4: $25,308.49
Customer 5: $21,464.00

CAC: There is not any significant CAC as our clients reached out to us through Affiliate marketing.

Our Services:
Web Design and Development: Expertise in WordPress, Shopify, Webflow, Wix, PHP, JavaScript, jQuery, and HTML
Zapier and Make automation
API integration
Graphics and UX/UI Design
Search Engine Optimization (SEO)
Social Media Management
WordPress Support

⚙️ Operations:
We have a robust team setup with multiple departs based on service (Web Dev, Design, SEO, Social Media) and each department has a separate manager who manages the team and communicates with the clients.

Team and Potential:
We have a dedicated team of 12 remote professionals. Below is the breakdown of team members:

Team Members: 12
Project Manager: 1
SEO Manager: 1
Social media manager: 1
Web developers: 3
Graphics designer: 2
Content writer: 2
SEO Expert: 2

Financial Viability:
The business has maintained profitability since its inception. There are no significant obstacles to continued success, making this a lucrative opportunity for the right buyer. With the current team, there is potential to triple our profit under the management of someone from North America, Canada, the UK, Europe, the Middle East, or any other developed region. These markets can support higher-budget services more easily compared to living in Pakistan and reach out online.

It can grow in multiple ways:
✅ Cold outreach Niche based
✅ Upwork or any other good freelance platforms
✅ Build partnerships
✅ Onboard more Affiliate Marketers
✅ Staff Augmentation

Total Served Clients to date: 183
Affiliates: 8 Affiliate Members
Partners: Shopify Partners, Gorgias Partner
Digital Partner: 3
Subscription Revenue: 45% revenue from subscription-based services of the last 12 month

Reason to Sell:
I have another company and am building a product, so I need to be fully focused on that.

Owner Responsibility:
Meetings with managers
Business development
Overview performance
Financial Management`,
  },
  {
    id: `12079020`,
    title: `SimpleScents`,
    revealedName: `SimpleScents`,
    url: `https://flippa.com/12079020`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 100448.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 11537.95, expenses: 8058.15, profit: 3479.8 },
      { month: `Mar 2025`, revenue: 13365.48, expenses: 12907.01, profit: 458.47 },
      { month: `Apr 2025`, revenue: 10900.41, expenses: 7495.54, profit: 3406.14 },
      { month: `May 2025`, revenue: 10153.65, expenses: 5993.13, profit: 4160.52 },
      { month: `Jun 2025`, revenue: 9154.16, expenses: 7120.89, profit: 2032.0 },
      { month: `Jul 2025`, revenue: 9757.41, expenses: 5694.68, profit: 4062.73 },
      { month: `Aug 2025`, revenue: 9709.15, expenses: 7377.43, profit: 2331.72 },
      { month: `Sep 2025`, revenue: 10454.64, expenses: 6426.2, profit: 4028.44 },
      { month: `Oct 2025`, revenue: 9573.26, expenses: 6844.03, profit: 2729.23 },
      { month: `Nov 2025`, revenue: 9297.67, expenses: 5101.59, profit: 4196.08 },
      { month: `Dec 2025`, revenue: 10995.66, expenses: 5181.6, profit: 5814.06 },
      { month: `Jan 2026`, revenue: 9444.99, expenses: 6377.94, profit: 3067.05 },
    ],
    avgMonthlyRevenue: 10362.0,
    avgMonthlyProfit: 3314.0,
    profitMargin: `32%`,
    annualRevenue: `GBP £97,909`,
    annualProfit: `GBP £31,312`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, PHP, Stripe`,
    country: `Ireland`,
    platform: `helps`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 85.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 66.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Irish subscription box service delivering monthly 8ml perfume samples at €15.95/month. Physical product fulfillment in I`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `8 transactions totalling USD $2,771,196`,
    },
    socialMedia: [
      `800 followers`,
      `5,500 followers`,
    ],
    expenses: [
      {
        item: `s`,
        amount: `GBP £368 /month`,
      },
      {
        item: `Shipping`,
        amount: `GBP £1,370 /month`,
      },
      {
        item: `Advertising Expenses`,
        amount: `GBP £1,051 /month`,
      },
      {
        item: `Subscriptions`,
        amount: `GBP £218 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `800 followers`,
      `5,500 followers`,
      `6,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `SimpleScents_12_mo_p_l with JAN`,
      `Website Features (Front-End) DR (1)`,
      `Key Metrics DR`,
      `Forecast Market Size UK`,
      `2025-11-12T07-01 Tra`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `25,368`,
      totalPageViews: `18,118`,
      pagesPerSession: `5.56`,
      avgDuration: `00:01:38`,
      engagementRate: `0.72%`,
      topCountries: [
        {
          country: `Ireland`,
          views: 13304,
        },
        {
          country: `United Kingdom`,
          views: 333,
        },
        {
          country: `United States`,
          views: 280,
        },
        {
          country: `Spain`,
          views: 156,
        },
        {
          country: `Germany`,
          views: 40,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `Stripe`,
    ],
    views: 535,
    watchers: 33,
    about: `A "Netflix-style" monthly subscription service for brand name perfume.

Members pay €15.95/month to receive a 30-day supply (8ml) of a designer or niche fragrance delivered directly to their door. In simple terms, customers get to “date” luxury perfumes before they “marry” them (by buying a full bottle).

The Problem:

Perfume is notoriously hard to sell online – you can’t smell through a screen, and a quick in-store spray doesn’t show how a scent wears over a full day. As a result, the $60bn fragrance industry has struggled to adapt to e-commerce. Our platform helps digitise fragrance discovery, reducing blind buys and expensive mistakes.

Our Solution
We solve this in two steps:

Prediction  (Digital Consultant): Our proprietary Digital Consultant engine uses a Molecular Framework (accords, longevity, structure, style) to predict which scents a user is most likely to love based on their preferences.

Physical Trial – (30 Days of Wear) : We then send a 30-day supply so the customer can live with the scent they chose in real life. When they buy a full bottle, it’s a confident decision, not a blind gamble. 

Traditional fragrance relies on blind buys, celebrity marketing, and limited shelf space. SimpleScents combines data-driven prediction with real-world testing, giving both customers and brands a smarter way to discover and sell fragrance in the digital age. 

Key Metrics

Total Revenue: $300,000+ with minimal ad spend (<€20k)

Current MRR: ~$10,000 (operating in a very small market).

Margins: 50–60% gross margains with a clear path to 70%+ as you scale brand partnerships. 

LTV: $200+ per subscriber.

LTV:CAC Ratio: Consistently >4:1 via Meta Ads, even when underperforming.

Churn Rate: ~11% (lower than the 15%+ industry average).

Key Highlights

High-Value for Consumers: Subscribers get to discover a new fragrance every month and gradually build a collection of luxury scents from well known brands, without paying €100+ per bottle. It’s both a sampling & disocvery engine and an affordable way to build a collection of expensive designer perfumes.

“Queue” Technology – Customers build a 'playlist' of scents they want to try over the coming months, making revenue more predictable and retention much stronger than a standard one-off e-commerce store.

High-Margin Partnerships – Direct supply agreements with 14 global luxury fragrance houses, delivering 50–60% margins with a clear path to 70%+ as volume grows.

Proven in a Small Market – Model validated in Ireland (a tiny sandbox market) with ~$300k total revenue and ~$10k MRR. The engine is built and tested; it now needs a bigger geography.

Tech Asset – Custom PHP backend and Digital Consultant / quiz engine handling complex subscription logic (skips, swaps, queues) that off-the-shelf Shopify stacks can’t replicate.

Retention Automations: Pre-built Email automation flows (welcome, winback, churn, reviews, loyalty rewards etc.) baked into the acquisition funnel.
National Award Winning Website: W`,
  },
  {
    id: `12381849`,
    title: `Digiluxxe`,
    revealedName: `Digiluxxe`,
    url: `https://flippa.com/12381849`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 165000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 5961.38, expenses: 2462.53, profit: 3498.85 },
      { month: `Apr 2025`, revenue: 4975.86, expenses: 2301.24, profit: 2674.62 },
      { month: `May 2025`, revenue: 4744.72, expenses: 2343.15, profit: 2401.57 },
      { month: `Jun 2025`, revenue: 5756.91, expenses: 3458.21, profit: 2298.7 },
      { month: `Jul 2025`, revenue: 4775.2, expenses: 2537.46, profit: 2236.47 },
      { month: `Aug 2025`, revenue: 3780.79, expenses: 2136.14, profit: 1644.65 },
      { month: `Sep 2025`, revenue: 5671.82, expenses: 3247.39, profit: 2424.43 },
      { month: `Oct 2025`, revenue: 7871.46, expenses: 4886.96, profit: 2984.5 },
      { month: `Nov 2025`, revenue: 6623.05, expenses: 4973.32, profit: 1649.73 },
      { month: `Dec 2025`, revenue: 4688.84, expenses: 3201.67, profit: 1487.17 },
      { month: `Jan 2026`, revenue: 3992.88, expenses: 2642.87, profit: 1350.01 },
      { month: `Feb 2026`, revenue: 3032.76, expenses: 1963.42, profit: 1069.34 },
    ],
    avgMonthlyRevenue: 5156.0,
    avgMonthlyProfit: 2143.0,
    profitMargin: `42%`,
    annualRevenue: `GBP £48,720`,
    annualProfit: `GBP £20,253`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `RI, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 40,
      growthPotential: 80,
      overall: 66.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification`,
    ],
    greenFlags: [],
    seller: {
      name: `Siena Velasco`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `1,600 followers`,
    ],
    expenses: [
      {
        item: `Facebook ads`,
        amount: `GBP £2,126 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Social media accounts`,
      `Email subscriber list`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Not included.`,
      `1,600 followers`,
      `5,599 subscribers`,
      `Attachments`,
      `digiluxxe.com-plReport-2026-03-13-10_28_18`,
      `Screenshot 2026-02-24 at 11.10.08 AM`,
      `Screenshot 2026-02-24 at 11.34.23 AM`,
      `Screenshot 2026-02-24 at 12.05.04 PM`,
      `Screenshot 2026-02-24 at 12.04.56 PM`,
      `Screenshot 2026-02-24 at 12.02.16 PM`,
    ],
    postSaleSupport: `Not included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 201,
    watchers: 5,
    about: `Digiluxxe.com is a premier digital product Shopify store specializing in premium Master Resell Rights (MRR) content and creative assets. Launched in 2023, the business has evolved into a highly automated "Digital Utility" model that removes the traditional headaches of e-commerce. With zero inventory, zero shipping costs, and 100% digital fulfillment, Digiluxxe operates at a near-perfect profit margin. The brand is anchored by a proprietary VIP Subscription program that generates stable, predictable weekly cash flow, making it an ideal acquisition for a lifestyle entrepreneur or a portfolio investor seeking a turnkey, low-maintenance asset.

Business Model

The revenue model is diversified across two high-performing streams:

Recurring Subscription (VIP Access): A "sticky" weekly rebill model at $5.99/week. This provides high cash-flow velocity and predictable forecasting.

High-Margin Digital Bundles: One-time sales of premium MRR assets (e.g., coloring book bundles, digital planners) with 100% profit margins and instant delivery.

Master Resell Rights: All products are sourced with MRR licenses, allowing the owner to sell the same asset infinitely without ongoing royalties or licensing fees.

Key Metrics

Monthly Net Profit: $2,000 – $5,000 (Scalable based on ad spend).

Customer Database: 7,223 verified buyers (Premium "Seed List" for AI targeting).

Email List: 5,599 active subscribers (High-ROI owned traffic).

Subscription Power: 92 active weekly VIP members ($2,200+ in Monthly Recurring Revenue).

Historical Proof: Over 2,000 historical VIP enrollments, proving a massive long-term market fit.

SEO Dominance: Page 1 Rank for high-intent keywords like "mrr coloring book bundle." See attached image.

Profit Margin: 95%+ (Post-ad spend, the only costs are software subscriptions).

Operations

The business is designed for maximum efficiency, requiring only 6 hours per week of management:

Marketing (3 hours): Overseeing Facebook Ad sets and monitoring ROAS.

Content/Email (2 hours): Sending weekly newsletters to the 5.5k subscriber list.

Customer Service (1 hour): Minimal inquiries due to 100% automated digital delivery.

Team: 0 employees. The entire operation is handled by the owner using automated Shopify apps.

Customers

Digiluxxe serves a global audience of creators, side-hustlers, and digital art enthusiasts.

The Moat: A verified list of 7,223 buyers worldwide who have already spent money on digital goods.

Retention: The weekly subscription model fosters high engagement and lower "sticker shock" compared to monthly fees.

Acquisition: Traffic is a balanced mix of Organic SEO (Stable) and Facebook Ads (Scalable).

Financials

The business is exceptionally stable with a clear trajectory for growth.

Stable Cash Flow: The weekly rebill structure ensures payouts hit the bank account 4x per month.

Low Overhead: Outside of marketing spend, monthly expenses are limited to Shopify and a few essential apps.

Profitability: Because there are n`,
  },
  {
    id: `11411904`,
    title: `toughworkz.com`,
    revealedName: `toughworkz.com`,
    url: `https://flippa.com/11411904`,
    type: `marketplace`,
    dataLevel: `stats`,
    askingPrice: 110589.0,
    avgMonthlyRevenue: 9434.0,
    avgMonthlyProfit: 2790.0,
    profitMargin: `30%`,
    annualRevenue: `GBP £89,139`,
    annualProfit: `GBP £26,362`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 75,
      operatorIndependence: 73.3,
      roi: 65,
      growthPotential: 65,
      overall: 66.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `10-year-old Canadian Amazon FBA + DTC workwear and safety brand with Made-in-Canada positioning. Physical inventory, Can`,
    ],
    greenFlags: [],
    seller: {
      name: `John`,
      location: `Canada`,
      verified: true,
    },
    socialMedia: [
      `682 followers`,
    ],
    expenses: [
      {
        item: `Amazon Advertising`,
        amount: `GBP £441 /month`,
      },
      {
        item: `Apps Platform fees`,
        amount: `GBP £44 /month`,
      },
      {
        item: `Insurance`,
        amount: `GBP £25 /month`,
      },
      {
        item: `ShipStation`,
        amount: `GBP £23 /month`,
      },
      {
        item: `Bookkeeper`,
        amount: `GBP £125 /month`,
      },
      {
        item: `Packing Supplies`,
        amount: `GBP £28 /month`,
      },
      {
        item: `Packaging Graphics & Stickers`,
        amount: `GBP £14 /month`,
      },
      {
        item: `Canva`,
        amount: `GBP £10 /month`,
      },
      {
        item: `GeekSeller Platfrom Fees for Walmart`,
        amount: `GBP £5 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £750 Included in sale price`,
      `682 followers`,
      `1,486 subscribers`,
      `Attachments`,
    ],
    postSaleSupport: `and supplier introductions`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 271,
    watchers: 1,
    about: `Established Canadian Amazon FBA & DTC Brand in Workwear, Safety & Functional Fashion

Business Overview

ToughWorkz is a proven and highly reputable Canadian D2C and marketplace brand, operating for over 10 years in the health & safety and functional workwear sector. The company stands out for its uniquely curated, in-demand product mix — including workwear, safety supplies, and legally required first-aid kits. With multiple #1 ranked SKUs on Amazon and a rare specialty in “Made in Canada” products, ToughWorkz commands top positions in a non-cyclical category with ongoing demand from individuals, businesses, institutions, and government agencies.

ToughWorkz operates seamlessly across leading channels: Amazon Canada FBM & FBA (with a high-performing Brand Store), Walmart (both Canada & USA), eBay, and a branded Shopify site with significant US and Canadian market reach. The brand’s strong foundation is powered by consistent sales, robust product-market fit, and an established reputation for reliability and quality.

Financial Highlights

Annual Revenue: CAD $164,389
Annual Profit: CAD $48,617
Monthly Revenue: CAD $13,699 (avg)
Monthly Profit: CAD $4,051 (avg)
Profit Margin: 30%
Profit Multiple: 3.1x
Revenue Multiple: 0.9x

Key Business Highlights

10+ years market presence; trusted, recognizable brand
Amazon Canada: Six #1 ranked SKUs; rare “Made in Canada” positioning
Multi-channel selling: Amazon, Walmart, eBay, and Shopify (Canada & USA)
Broad customer base: Individuals, businesses, government, community organizations
High repeat order rates on consumable/required SKUs (e.g. eyewash, first aid)
Scalable with proven advertising, ready-to-activate FBA and international expansion

Growth Opportunities

Prime Market Timing: Canada is undergoing its largest infrastructure and construction investment cycle, driving sustained demand for workwear & safety essentials.
Channel Expansion: FBA (Amazon Prime eligibility) is ready to deploy, offering immediate access to higher volume, margins, and conversion rates. Walmart & Shopify (especially in the US) are performing but underleveraged — high growth potential with focused resourcing and strategic marketing.
Email & Social Monetization: The brand has an established email list (1,486 subscribers) and functioning social presence, ready for enhanced automation, content marketing, and campaign deployment.
Operational Scale: Well-documented processes, strong supplier relationships (with a focus on Canadian manufacturing), and a proven, hands-on foundation built for scaling via additional capital, team capacity, or M&A synergy.

Customers

Nationwide reach on Amazon Canada, supporting recurring and institutional clients (government, businesses, communities)
Legal mandate for recurring orders on first aid and eyewash supplies in many provinces
Growing US customer base through Shopify and Walmart USA

Why Acquire ToughWorkz?

Established Brand Equity: Decade-long reputation, extensive customer base, and defensibl`,
  },
  {
    id: `11856626`,
    title: `NEObirdie`,
    revealedName: `NEObirdie`,
    url: `https://flippa.com/11856626`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 32000.0,
    monthlyPL: [
      { month: `Aug 2024`, revenue: 6512.56, expenses: 1974.85, profit: 4537.71 },
      { month: `Sep 2024`, revenue: 6512.56, expenses: 1974.85, profit: 4537.71 },
      { month: `Oct 2024`, revenue: 6512.56, expenses: 1974.85, profit: 4537.71 },
      { month: `Nov 2024`, revenue: 6512.56, expenses: 1974.85, profit: 4537.71 },
      { month: `Dec 2024`, revenue: 5504.18, expenses: 3356.61, profit: 2147.57 },
      { month: `Jan 2025`, revenue: 8351.52, expenses: 4457.7, profit: 3893.82 },
      { month: `Feb 2025`, revenue: 2964.18, expenses: 1842.77, profit: 1121.41 },
      { month: `Mar 2025`, revenue: 5831.84, expenses: 3599.18, profit: 2232.66 },
      { month: `Apr 2025`, revenue: 6729.73, expenses: 3887.47, profit: 2842.26 },
      { month: `May 2025`, revenue: 4917.44, expenses: 2922.27, profit: 1995.17 },
      { month: `Jun 2025`, revenue: 5215.89, expenses: 2131.06, profit: 3084.83 },
      { month: `Jul 2025`, revenue: 3346.45, expenses: 1935.48, profit: 1410.97 },
    ],
    avgMonthlyRevenue: 5743.0,
    avgMonthlyProfit: 3073.0,
    profitMargin: `54%`,
    annualRevenue: `GBP £54,260`,
    annualProfit: `GBP £29,038`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `OH, United States`,
    platform: `Sales`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 66.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business — patented cotton rope stair baskets sold via Amazon/Shopify/Etsy`,
      `Amazon FBA/MCF dependency — fulfillment breaks if account suspended`,
      `Only 2 products, 5 SKUs — extreme concentration risk`,
      `Chinese supplier for inventory — requires active supplier management`,
      `Revenue declining -31% trend`,
      `US LLC entity required — Dahlia Design LLC in Ohio`,
      `Price reduced from $40K to $32K — motivated seller`,
      `Revenue declining sharply (-31.0% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Tiffany Nicholson`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `79 followers`,
      `360 followers`,
      `0 followers`,
      `417 followers`,
    ],
    expenses: [
      {
        item: `Advertising and Marketing`,
        amount: `GBP £450 /month`,
      },
      {
        item: `Software and tools`,
        amount: `GBP £75 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £10,506 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `79 followers`,
      `360 followers`,
      `0 followers`,
      `417 followers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show al`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1628,
    watchers: 75,
    about: `NEObirdie Business Overview

NEObirdie is a woman-owned e-commerce brand headquartered in Tallmadge, Ohio, founded in 2021 and specializing in a unique, patented L‑shaped cotton rope stair basket designed to elevate home organization with both style and functionality. Loved by busy families, the baskets fit securely on staircases and double as décor-forward storage solutions, providing a modern aesthetic while solving everyday household clutter. The business operates across Amazon, Etsy, Shopify, and TikTok Shop, leveraging Amazon FBA and optimized listings to deliver streamlined operations and consistent sales momentum.

Key Business Highlights

Standout Product Design: USPTO Patented stair basket in natural cotton rope blends function with modern home décor, solving organization challenges in a fashionable way. Search listings and reviews confirm its popularity and design appeal.
Marketplace Reach: Strong presence on Amazon (1,318 orders, USD 55 AOV, 9% refund rate, 103 customers) alongside Etsy, Shopify, and TikTok Shop exposure ensures diversified sales channels and reduced dependency on any one platform.
Efficient Fulfillment: Amazon FBA ensures fast, reliable delivery and allows for seamless scaling, while direct fulfillment provides flexibility.
High Profitability: 54% margins reflect effective sourcing, pricing, and cost control.
Brand Defensibility: Trademarked and design-patented product adds long-term protection and strategic value.
Operational Simplicity: Shopify operations, supplier workflows, and Amazon infrastructure allow for a well-managed, low-overhead business.

Product & Market Leadership

NEObirdie’s stair baskets occupy a unique niche, combining décor and utility in a category with limited competition. The L-shaped design and natural cotton craftsmanship distinguish the product in home storage and décor, creating a premium appeal that resonates with design-conscious consumers. Social presence and marketplace trust underscore brand strength and market recognition.

Growth Opportunities

Catalog Expansion: Potential to introduce complementary products in home organization—such as wall-mounted baskets, storage bins, or seasonal décor—increasing wallet share with existing customers.
Marketing Acceleration: Scale TikTok Shop, influencer partnerships, and targeted Amazon advertising to drive new customer acquisition.
Geographic Expansion: Create localized versions, color variants, or exclusive bundles to appeal to broader audiences.
Private Label Extensions: Launch branded accessories (lids, labels, matching storage bundles) to increase average order value and repeat purchase.
Retail Partnerships: Explore home décor boutiques, baby stores, and niche retailers to expand offline presence.

Assets Included in Sale

Domain and Shopify Store Files
Amazon, Etsy, and TikTok Shop Accounts
Inventory (Excluded—but supplier contacts included)
Brand Assets: Trademark, patents, logos, content, unique design files
Email Address and Social Accou`,
  },
  {
    id: `12277107`,
    title: `Maynox`,
    revealedName: `Maynox`,
    url: `https://flippa.com/12277107`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 110000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 48414.94, expenses: 42221.15, profit: 6195.06 },
      { month: `Apr 2025`, revenue: 56230.52, expenses: 36597.59, profit: 19632.93 },
      { month: `May 2025`, revenue: 53371.75, expenses: 48605.44, profit: 4765.04 },
      { month: `Jun 2025`, revenue: 64331.85, expenses: 54324.25, profit: 10007.6 },
      { month: `Jul 2025`, revenue: 45746.67, expenses: 36216.59, profit: 9530.08 },
      { month: `Aug 2025`, revenue: 42887.9, expenses: 34310.32, profit: 8577.58 },
      { month: `Sep 2025`, revenue: 35262.82, expenses: 29067.76, profit: 6195.06 },
      { month: `Oct 2025`, revenue: 38122.86, expenses: 32404.05, profit: 5718.81 },
      { month: `Nov 2025`, revenue: 32404.05, expenses: 27639.01, profit: 4765.04 },
      { month: `Dec 2025`, revenue: 30497.78, expenses: 21920.2, profit: 8577.58 },
      { month: `Jan 2026`, revenue: 48605.44, expenses: 38122.86, profit: 10483.85 },
      { month: `Feb 2026`, revenue: 36920.17, expenses: 31436.31, profit: 5483.86 },
    ],
    avgMonthlyRevenue: 44400.0,
    avgMonthlyProfit: 8328.0,
    profitMargin: `19%`,
    annualRevenue: `GBP £419,526`,
    annualProfit: `GBP £78,687`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `DE, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 66.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Maynox) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `4 transactions totalling USD $1,015,856`,
    },
    socialMedia: [
      `1,800 followers`,
      `606 followers`,
    ],
    expenses: [
      {
        item: `Meta Ads`,
        amount: `GBP £23,763 /month`,
      },
      {
        item: `Shopify`,
        amount: `GBP £375 /month`,
      },
      {
        item: `Fees`,
        amount: `GBP £1,501 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £2,627 Included in sale price`,
      `Shopify`,
      `Included. I can provide for 1 month to help the transition.`,
      `1,800 followers`,
      `606 followers`,
      `82,934 subscribers`,
      `Attachments`,
    ],
    postSaleSupport: `Included. I can provide for 1 month to help the transition.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 975,
    watchers: 78,
    about: `Key Highlights

Founded: May 2024

Model: 100% direct-to-consumer e-commerce

Product Range: Single-product focus (VitaBoost compression t-shirts) with 21 variants (sizes/colors)

Performance: Reached $1 million in revenue within the first 3 months of launch (Summer 2024)

Sales Channels: 100% direct Shopify sales

Customer Base: 83,000 client emails (opt-in)

Retention: 13–14% recurring customers across 51,000 total orders

Social Reach: Active Facebook and Instagram presence

----------------------------------------------------------------------------------------------

Business Overview

Maynox is a Shopify e-commerce brand specializing in compression apparel for the US male market.

The brand specifically targets men looking to address physical concerns like "Big Belly" or "Man Boobs" through high-quality compression t-shirts.

Launched in May 2024, the business transitioned from a dropshipping test to a full e-commerce brand with custom logos, professional photography, and personalized packaging.

After an explosive start reaching $1M in revenue in three months, the owner shifted focus to other projects in 2025, during which the store operated "on autopilot."

----------------------------------------------------------------------------------------------

Tech & Infrastructure

CMS: Shopify

Key Tools: Klaviyo for email marketing; Shopify-integrated apps for Chinese logistics agents

Domains Included: Maynox-official.com

Maintenance: Managed by the owner; no external technical team currently required

Recent Optimization: Historically used Shopify Plus; significant cost savings are available by switching to standard plans for the current scale (switch made recently)

----------------------------------------------------------------------------------------------

Human Resources

Current Setup: Managed entirely by the solo founder (who handles marketing, SAV, and management)

Transition Support: The seller offers 1 month of support to facilitate the handover

Operations: Logistics are fully outsourced to a trusted agent team in China who handle fulfillment automatically via Shopify

----------------------------------------------------------------------------------------------

Customer Base & Acquisition

Primary Acquisition: Meta Ads (70% of revenue)

Retention Channels: Email marketing (15%) and recurring customers (15%)

Email Database: 83,000 opt-in subscribers

Campaigns: Sent 2x per week via Klaviyo

Target Audience: 100% B2C US-based males

----------------------------------------------------------------------------------------------

Products

Top Seller: VitaBoost compression t-shirt (99% of revenue)

Stock: ~21 SKUs (variations of the core product)

Inventory Value: Typically $5,000–$7,000; currently ~$10,000 due to anticipation of the Chinese New Year buffer

Production: 2-week lead time; works on a "just-in-time" (flux tendu) basis

----------------------------------------------------------------------------------------------

Logi`,
  },
  {
    id: `11818312`,
    title: `Little Loua`,
    revealedName: `Little Loua`,
    url: `https://flippa.com/11818312`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 169000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 5577.84, expenses: 1569.72, profit: 4008.12 },
      { month: `Apr 2025`, revenue: 6576.06, expenses: 1851.66, profit: 4724.4 },
      { month: `May 2025`, revenue: 5370.83, expenses: 1494.79, profit: 3876.04 },
      { month: `Jun 2025`, revenue: 7505.7, expenses: 2113.28, profit: 5393.69 },
      { month: `Jul 2025`, revenue: 8978.9, expenses: 2528.57, profit: 6450.33 },
      { month: `Aug 2025`, revenue: 6715.76, expenses: 1893.57, profit: 4822.19 },
      { month: `Sep 2025`, revenue: 8075.93, expenses: 2274.57, profit: 5801.36 },
      { month: `Oct 2025`, revenue: 8564.88, expenses: 1915.16, profit: 6649.72 },
      { month: `Nov 2025`, revenue: 9053.83, expenses: 2230.12, profit: 6823.71 },
      { month: `Dec 2025`, revenue: 8577.58, expenses: 1753.87, profit: 6823.71 },
      { month: `Jan 2026`, revenue: 7625.08, expenses: 1953.26, profit: 5670.55 },
      { month: `Feb 2026`, revenue: 7147.56, expenses: 1601.47, profit: 5547.36 },
    ],
    avgMonthlyRevenue: 7481.0,
    avgMonthlyProfit: 5549.0,
    profitMargin: `74%`,
    annualRevenue: `GBP £70,686`,
    annualProfit: `GBP £52,434`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, WooCommerce, Stripe`,
    country: `Belgium`,
    platform: `WordPress`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 83.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 66.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Belgium-based baby cot mobile ecommerce brand with outsourced production; physical product requires EU-based supplier ma`,
    ],
    greenFlags: [],
    seller: {
      name: `Harvi`,
      location: `United Kingdom`,
      verified: true,
      transactions: `2 transactions totalling USD $177,998`,
    },
    socialMedia: [
      `2,000 followers`,
    ],
    expenses: [
      {
        item: `Products`,
        amount: `GBP £1,501 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £26,265 Excluded from sale price`,
      `WordPress`,
      `Included.`,
      `2,000 followers`,
      `Attachments`,
      `Scherm­afbeelding 2024-10-25 om 16.47.42`,
      `Scherm­afbeelding 2024-10-08 om 09.56.15`,
      `XLSX`,
      `p&l Little loua`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `45,413`,
      totalPageViews: `10,818`,
      pagesPerSession: `2.19`,
      avgDuration: `00:00:37`,
      engagementRate: `0.60%`,
      topCountries: [
        {
          country: `Netherlands`,
          views: 2910,
        },
        {
          country: `Belgium`,
          views: 1584,
        },
        {
          country: `France`,
          views: 1159,
        },
        {
          country: `Germany`,
          views: 714,
        },
        {
          country: `China`,
          views: 310,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 1661,
    watchers: 97,
    about: `Overview & Operations

Little Loua is a 3 year-old ecommerce business that started out locally in Belgium with the owners who are husband and wife creating handmade products (baby/cot mobiles) themselves. Due to the increasing number of orders, production was outsourced. This setup has been in place for 1 year and there is a contract available to assure production for next 3 years.

The percentage split of sales between platforms is 90% WooCommerce and 10% Etsy. Products are also sold on local (to Belgium) marketplaces like bol.com, c-discount & kaufland. 

There is also a wholesale side to the business which has not been accounted for. Only the online sales element of the business has been considered in the financials. 

Team

The day-to-day running of the business involves replying to customers, ordering products, packaging products, taking images, social media management etc.
1 of the owners works on it and spends about 3-4 hours per day. 75% of this time is spent on shipping & handling, creating new designs and customer support.

Shipping

Products are shipped globally from the warehouse in Belgium.
Self fulfilment is in place at the moment.

Manufacturers

The manufacturer is located in Belgium and the owners have their own warehouse where all inventory is stored. They ship daily from there themselves and drop it to the local post office

B2B Wholesale to Retail Stores

There are about 40 stores selling Little Loua products in Belgium and France.
The average margin for B2B wholesale is about x2.5 and B2C online sales is x6.
Revenue from B2B wholesale in Belgium and France has not been taken into account for the sale of this business as a new owner who is local in this region would be required to take over this part of the business if it is to continue. If you are located in Belgium, taking over the wholesale side of the business can be discussed.

Product & Customer Base

There are approximately 25 - 30 different designs of baby mobiles. 
The competitive advantage is Little Loua’s unique designs, the products are handmade and can be personalised.
The vast majority of customers are based in Belgium, The Netherlands, France and Germany and are aged between 25 - 35.
The refund rate is zero
There is over 50 reviews with rating between 4 and 5 stars
The only issue raised by customers is delivery when the location is far away from source (Belgium) e.g. Australia or the US as it takes a long time for the product to arrive.A local shipping service could be opened by the new owner. This hasn’t been done by the existing owner as they don’t have any prior experience with this and have chosen not to delve into it. 

Marketing

There has been investments into SEO optimisation and a premium product is sold.
A marketing campaign has just been started with Klaviyo email.
There are approximately 1,000 email subscribers and over 2,000 instagram followers. 

Financials

Please see attached table at the bottom of the listing.

Primary Expenses

Last year, 10,00`,
  },
  {
    id: `12283554`,
    title: `Saas Urge/WinFeds`,
    revealedName: `Saas Urge/WinFeds`,
    url: `https://flippa.com/12283554`,
    type: `saas`,
    dataLevel: `full_pnl`,
    askingPrice: 98324.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 1427.48, expenses: 92.71, profit: 1334.77 },
      { month: `Feb 2025`, revenue: 1836.42, expenses: 92.71, profit: 1743.71 },
      { month: `Mar 2025`, revenue: 1256.03, expenses: 92.71, profit: 1163.32 },
      { month: `Apr 2025`, revenue: 7014.21, expenses: 92.71, profit: 6921.5 },
      { month: `May 2025`, revenue: 5370.83, expenses: 92.71, profit: 5279.39 },
      { month: `Jun 2025`, revenue: 6183.63, expenses: 92.71, profit: 6090.92 },
      { month: `Jul 2025`, revenue: 0.0, expenses: 92.71, profit: -92.71 },
      { month: `Aug 2025`, revenue: 0.0, expenses: 92.71, profit: -92.71 },
      { month: `Sep 2025`, revenue: 0.0, expenses: 92.71, profit: -92.71 },
      { month: `Oct 2025`, revenue: 3332.48, expenses: 92.71, profit: 3241.04 },
      { month: `Nov 2025`, revenue: 1903.73, expenses: 92.71, profit: 1811.02 },
      { month: `Dec 2025`, revenue: 185.42, expenses: 92.71, profit: 93.98 },
    ],
    avgMonthlyRevenue: 3168.0,
    avgMonthlyProfit: 2283.0,
    profitMargin: `96%`,
    annualRevenue: `and $28.7K annual profit with an extraordinary 96% margin. SaaS Urge / WinFeds combines a custom-built GovTech application, an evergreen webinar funnel, and a 1M+ contractor contact database, delivering recurring upside with minimal operational overhead. The platform features automated AI sales and chat agents, zero churn on its SaaS subscribers, and highly under-monetized potential. A turnkey B2G SaaS and education asset, ready for growth through SaaS scaling, licensing, and paid acquisition campaigns.`,
    annualProfit: `with an extraordinary 96% margin. SaaS Urge / WinFeds combines a custom-built GovTech application, an evergreen webinar funnel, and a 1M+ contractor contact database, delivering recurring upside with minimal operational overhead. The platform features automated AI sales and chat agents, zero churn on its SaaS subscribers, and highly under-monetized potential. A turnkey B2G SaaS and education asset, ready for growth through SaaS scaling, licensing, and paid acquisition campaigns.`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Python, Stripe`,
    churn: `0%`,
    subscribers: `1`,
    country: `VA, United States`,
    platform: `generating`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 60.0,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 55,
      growthPotential: 80,
      overall: 65.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Virginia-based GovTech SaaS for US federal government contractors — B2G (business-to-government) matching platform and e`,
      `High revenue volatility (CV 73%)`,
      `3 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Wissem Sghaier`,
      location: `United States`,
      verified: true,
      transactions: `1 transaction totalling USD $295`,
    },
    socialMedia: [
      `561 followers`,
    ],
    expenses: [
      {
        item: `Domain registration`,
        amount: `GBP £8 /month`,
      },
      {
        item: `Hosting`,
        amount: `GBP £17 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £225 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `561 followers`,
      `1,000,000 subscribers`,
      `Attachments`,
      `Stripe account revenue`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $114,999`,
      `USD $98,324`,
      `Reduced 15%`,
      `GBP £73,786`,
      `Contact Seller Su`,
    ],
    postSaleSupport: `included`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `10,855`,
      totalPageViews: `1,252`,
      pagesPerSession: `1.13`,
      avgDuration: `00:00:09`,
      engagementRate: `0.33%`,
      topCountries: [
        {
          country: `United States`,
          views: 460,
        },
        {
          country: `India`,
          views: 25,
        },
        {
          country: `Canada`,
          views: 9,
        },
        {
          country: `United Kingdom`,
          views: 8,
        },
        {
          country: `Puerto Rico`,
          views: 6,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Python`,
      `Stripe`,
    ],
    views: 1518,
    watchers: 79,
    about: `SaaS Urge / WinFeds: Business Overview

SaaS Urge / WinFeds is a Virginia-based SaaS and GovTech education business serving contractors targeting the $1.8 trillion U.S. government market. Operating for approximately five years, the company combines automation software, proprietary opportunity-matching technology, and high-ticket education into a vertically integrated B2G ecosystem. Over the trailing twelve months, the business generated USD $29,916 in revenue and USD $28,752 in net profit, reflecting a 96% profit margin supported by extremely low fixed operating costs. The model is driven by an evergreen webinar funnel that consistently generates leads and conversions for its Federal Government Accelerator training program while supporting expansion of its SaaS product, GovOppx. With a 1,000,000+ contact database, integrated AI sales infrastructure, and custom-built software assets, the business represents a turnkey and highly scalable GovTech platform.

Key Financials (Trailing Twelve Months)

Revenue: USD $29,916
Net Profit: USD $28,752
Average Monthly Revenue: USD $2,493
Average Monthly Profit: USD $2,396
Profit Margin: 96%
Revenue Multiple: 3.7x
Profit Multiple: 3.8x
Monthly Recurring Revenue: USD $298
Total Active SaaS Subscribers: 2
Overall Churn: 0%
Average Order Value: USD $741
Refund Rate: 1%

Primary recurring expenses include domain registration at approximately USD $11 per month, hosting at USD $22 per month, and marketing software costs averaging USD $300 per month. Revenue spikes occurred in April, May, and June, generating USD $7,360, USD $5,636, and USD $6,488 respectively, demonstrating strong monetization during active campaign cycles.

Core Revenue Model

The primary revenue driver is the Federal Government Accelerator training program delivered through a structured webinar funnel powered by WebinarJam. This evergreen system runs on demand, automatically capturing leads and converting them into high-ticket educational sales with minimal manual intervention. Stripe-verified data confirms 39 total orders and 17 customers during the last 12-month period, reinforcing validated buyer demand. The business also generates subscription revenue through GovOppx, a proprietary SaaS product priced at USD $149 per month.

SaaS Component – WinFeds Platform

WinFeds operates via a white-labeled GoHighLevel SaaS instance hosted on app.saasurge.com. The platform includes CRM pipelines, automated email and SMS workflows, lead nurturing sequences, and funnel-building tools. This infrastructure supports both internal sales operations and client-facing automation capabilities, creating opportunities for licensing, agency expansion, or SaaS scaling.

GovOppx – Custom GovTech Software
GovOppx is a custom-built Python and SQL application hosted on Microsoft Azure. The software ingests federal contracting opportunities and matches them against a built-in contact database, generating fit scores, summarizing opportunity details, estimating contract value,`,
  },
  {
    id: `12199300`,
    title: `Writers Work`,
    revealedName: `Writers Work`,
    url: `https://flippa.com/12199300`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 170000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 91921.33, expenses: 72188.07, profit: 19734.53 },
      { month: `Feb 2025`, revenue: 57251.6, expenses: 44496.99, profit: 12754.61 },
      { month: `Mar 2025`, revenue: 64568.07, expenses: 55911.75, profit: 8656.32 },
      { month: `Apr 2025`, revenue: 71699.12, expenses: 52708.81, profit: 18990.31 },
      { month: `May 2025`, revenue: 56400.7, expenses: 44856.4, profit: 11545.57 },
      { month: `Jun 2025`, revenue: 46605.19, expenses: 32884.11, profit: 13721.08 },
      { month: `Jul 2025`, revenue: 39237.92, expenses: 29738.32, profit: 9499.6 },
      { month: `Aug 2025`, revenue: 31005.78, expenses: 23020.02, profit: 7985.76 },
      { month: `Sep 2025`, revenue: 21009.61, expenses: 13809.98, profit: 7199.63 },
      { month: `Oct 2025`, revenue: 28481.02, expenses: 21440.14, profit: 7040.88 },
      { month: `Nov 2025`, revenue: 32195.77, expenses: 25011.38, profit: 7184.39 },
      { month: `Dec 2025`, revenue: 27143.71, expenses: 20234.91, profit: 6908.8 },
    ],
    avgMonthlyRevenue: 47293.0,
    avgMonthlyProfit: 10935.0,
    profitMargin: `23%`,
    annualRevenue: `GBP £446,865`,
    annualProfit: `GBP £103,323`,
    ageYears: 8.0,
    monetisation: ``,
    techStack: `Shopify, PHP, AWS, Stripe`,
    country: `WA, United States`,
    platform: `helps`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 67.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 65.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -49% — Writers Work`,
      `Revenue declining sharply (-58.9% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Mark Harrell`,
      location: `United States`,
      verified: true,
    },
    socialMedia: [
      `29,000 followers`,
      `36,000 followers`,
    ],
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £705 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £18,761 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `29,000 followers`,
      `36,000 followers`,
      `350,000 subscribers`,
      `Attachments`,
      `Nov 25`,
      `P&L 01-25`,
      `P&L 12-24`,
      `P&L 11-24`,
      `P&L 10-24`,
      `P&L 08-25`,
      `P&L 07-25`,
      `P&L 06-25`,
      `P&L 05-25`,
      `P&L 04-25`,
      `P&L 03-25`,
      `P&L 02-25`,
      `P&L 9-25`,
      `Nov 25`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Manuel`,
        date: `Dec 30, 2025 08:25 AM`,
        text: `@J. Claude Tenday Hi J. Claude, thank you for your question. The dip in Q3 was primarily due to a specific Google Ads billing update (net-30 switch) that temporarily disrupted the ad engine, rather than a decline in market demand . We have just uploaded the October and November 2025 P&L statements to the 'Attachments' section, which demonstrate a clear recovery with revenue bouncing back to $33,781 in November. Regarding AI, it as a significant growth lever for product stickiness rather than a t`,
      },
      {
        author: `J. Claude`,
        date: `Dec 23, 2025 05:08 AM`,
        text: `Why are revenues plunging so precipitously, e.g., see Sept 2015? What are they for Oct, Nov., and Dec.? What is the effect of AI tools on this "business model"? Are declining revenues consequences of AI?`,
      },
    ],
    ga: {
      users: `862,068`,
      totalPageViews: `169,718`,
      pagesPerSession: `1.96`,
      avgDuration: `00:01:46`,
      engagementRate: `0.62%`,
      topCountries: [
        {
          country: `United States`,
          views: 109663,
        },
        {
          country: `Canada`,
          views: 10825,
        },
        {
          country: `India`,
          views: 5252,
        },
        {
          country: `China`,
          views: 1495,
        },
        {
          country: `Singapore`,
          views: 1101,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `AWS`,
      `Stripe`,
    ],
    views: 2153,
    watchers: 76,
    commentCount: 2,
    about: `Profitable Freelance Writing Platform — $933K TTM, 5,000+ Customers, 47% GrowthThis all-in-one platform helps aspiring and professional writers launch and grow freelance careers. Users find quality gigs, submit work to paying outlets, and improve faster with deep-focus writing tools, grammar help, project tracking, habit builder, portfolio, and step-by-step training—everything in one place with instant access.

Launched in 2017 and bootstrapped in the U.S., it runs lean yet scales: 5,000+ customers, $933k TTM revenue, $164k TTM profit, 47% growth, and consistent monthly performance ($40.4k revenue, $8k profit). One-time purchase with upsells powers strong cash flow.

Key Highlights

✅ Proven demand in a large, evergreen creator market

✅ Lifetime access model reduces friction and increases customer value

✅ Robust toolset: job finder, instant submission finder, focus mode, grammar, project org, habits, portfolio, training

✅ Simple stack (PHP/AWS/JS) and solo operations keep costs low

✅ Clear growth levers: conversion optimization, SEO/content, pricing tests, paid/digital marketing

✅ Priced at $229k to enable a smooth transition due to personal and new venture focus

HUGE opportunity to add AI to the products features and roadmap.  Integrate with ChatGPT/OpenAI/Google's Gemini directly into the document editor experience and job finding/matching for immediate short term revenue and long term product stickiness.`,
  },
  {
    id: `12232408`,
    title: `K. B. Trend OHG`,
    revealedName: `K. B. Trend OHG`,
    url: `https://flippa.com/12232408`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 71019.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 18183.86, expenses: 14479.27, profit: 3704.59 },
      { month: `Mar 2025`, revenue: 17447.26, expenses: 14479.27, profit: 2967.99 },
      { month: `Apr 2025`, revenue: 26804.62, expenses: 22783.8, profit: 4020.82 },
      { month: `May 2025`, revenue: 22995.89, expenses: 19546.57, profit: 3449.32 },
      { month: `Jun 2025`, revenue: 24175.72, expenses: 20549.87, profit: 3625.85 },
      { month: `Jul 2025`, revenue: 19424.65, expenses: 16118.84, profit: 3305.81 },
      { month: `Aug 2025`, revenue: 19749.77, expenses: 16788.13, profit: 2961.64 },
      { month: `Sep 2025`, revenue: 21828.76, expenses: 18117.82, profit: 3709.67 },
      { month: `Oct 2025`, revenue: 21893.53, expenses: 18172.43, profit: 3721.1 },
      { month: `Nov 2025`, revenue: 17100.55, expenses: 14193.52, profit: 2908.3 },
      { month: `Dec 2025`, revenue: 11222.99, expenses: 9836.15, profit: 1385.57 },
      { month: `Jan 2026`, revenue: 15292.07, expenses: 11202.67, profit: 4089.4 },
    ],
    avgMonthlyRevenue: 19677.0,
    avgMonthlyProfit: 3321.0,
    profitMargin: `17%`,
    annualRevenue: `with a consistent ~17% net profit margin. Strong customer loyalty with a repeat customer rate of over 36% in 2024 and over 21% in 2025. Established customer base of 15,000 customers, supported by 790 email subscribers and 3,700 TikTok Shop customers. Strong organic social presence with 26,000+ TikTok followers, 3,200+ Instagram followers, a total reach of approximately 4.23 million views, and an average engagement rate of 1.6%. High trust and social proof with Trustpilot rating of 4.8/5 (126 reviews) and TikTok Shop rating of 4.7/5. The business achieves a solid 2.31% conversion rate and is open to a full acquisition or strategic equity partnership.`,
    annualProfit: `GBP £31,379`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Germany`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 72.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 65.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (K. B. Trend OHG) — identified from listing description`,
      `Revenue declining sharply (-30.1% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `18 transactions totalling USD $11,490,398`,
    },
    socialMedia: [
      `3,200 followers`,
      `26,000 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,604 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £248 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £699 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £262 /month`,
      },
      {
        item: `Other costs`,
        amount: `GBP £1,207 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £26,052 Excluded from sale price`,
      `AggregateOffer Schema`,
      `Included.`,
      `3,200 followers`,
      `26,000 followers`,
      `0 subscribers`,
      `778 subscribers`,
      `Attachments`,
      `Umsatz_2022-2025`,
      `Sopify_No-Makeup_Beauty_446245933`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3333,
    watchers: 103,
    about: `No-Makeup Beauty (K. B. Trend OHG) is an established Germany-based direct-to-consumer e-commerce business specializing exclusively in authentic Korean skincare and cosmetic products. The company has been operating successfully for over four years and is positioned within the rapidly growing K-Culture trend in Europe, driven by increasing interest in K-Beauty, K-Pop, and Korean lifestyle content.

Key Highlights

Profitable German DTC beauty brand with a clear focus on authentic Korean skincare and cosmetics. Approx. €216,000 in annual revenue with a consistent ~17% net profit margin. Strong customer loyalty with a repeat customer rate of over 36% in 2024 and over 21% in 2025. Established customer base of 15,000 customers, supported by 790 email subscribers and 3,700 TikTok Shop customers. Strong organic social presence with 26,000+ TikTok followers, 3,200+ Instagram followers, a total reach of approximately 4.23 million views, and an average engagement rate of 1.6%. High trust and social proof with Trustpilot rating of 4.8/5 (126 reviews) and TikTok Shop rating of 4.7/5. The business achieves a solid 2.31% conversion rate and is open to a full acquisition or strategic equity partnership.

Operations

The business is efficiently structured with lean internal processes and fast decision-making, providing a clear operational advantage. Operations are run from Germany, combining office and integrated warehouse infrastructure with dedicated warehouse staff. This setup enables same-day shipping for customer orders and ensures smooth, scalable fulfillment with low operational complexity.

Customers

The core customer base consists primarily of women aged 16 to 45, located across Germany and the European Union. The brand has built a clearly defined K-Beauty-focused audience over four years of specialization. A significant share of customers are repeat buyers, reflecting strong brand loyalty and trust. Growth has been achieved almost entirely through organic channels, primarily TikTok, Instagram, and influencer collaborations, with a strong emphasis on authentic content, education, and community engagement rather than paid advertising.

Products & Positioning

The assortment is carefully curated and focused exclusively on Korean skincare products with proven demand and high repurchase potential. Product selection emphasizes trends, ingredients, and brands that generate organic interest and effectively sell through education, reviews, and community trust rather than aggressive marketing.

Financials

Over the past 12 months, the business has generated approximately €216,000 in revenue with a stable ~17% net profit margin. Monthly sales and profitability have remained consistent, with no extreme seasonality. A detailed financial overview, including P&L and performance metrics, can be provided under NDA upon request.

Additional Information

The business operates in a structurally growing niche driven by sustained demand for Korean skincare in Europe, suppor`,
  },
  {
    id: `12268481`,
    title: `kazartt.com`,
    revealedName: `kazartt.com`,
    url: `https://flippa.com/12268481`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 89359.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 15609.57, expenses: 12984.48, profit: 2625.09 },
      { month: `Mar 2025`, revenue: 12973.05, expenses: 10137.14, profit: 2835.91 },
      { month: `Apr 2025`, revenue: 5449.57, expenses: 4100.83, profit: 1348.74 },
      { month: `May 2025`, revenue: 11383.01, expenses: 8313.42, profit: 3069.59 },
      { month: `Jun 2025`, revenue: 20274.28, expenses: 14805.66, profit: 5467.35 },
      { month: `Jul 2025`, revenue: 2975.61, expenses: 1275.08, profit: 1700.53 },
      { month: `Aug 2025`, revenue: 5436.87, expenses: 3815.08, profit: 1621.79 },
      { month: `Sep 2025`, revenue: 1691.64, expenses: 570.23, profit: 1122.68 },
      { month: `Oct 2025`, revenue: 5701.03, expenses: 3929.38, profit: 1771.65 },
      { month: `Nov 2025`, revenue: 26875.74, expenses: 18530.57, profit: 8345.17 },
      { month: `Dec 2025`, revenue: 68224.4, expenses: 55581.55, profit: 12641.58 },
      { month: `Jan 2026`, revenue: 3415.03, expenses: 1685.29, profit: 1729.74 },
    ],
    avgMonthlyRevenue: 15001.0,
    avgMonthlyProfit: 3690.0,
    profitMargin: `25%`,
    annualRevenue: `with peak conversion rates of nearly 3% during holiday seasons. Currently operating on just 5 hours of weekly founder involvement, this is a turnkey opportunity primed for growth through retail expansion or international marketing.`,
    annualProfit: `GBP £34,866`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `France`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 77.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 65.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (kazartt.com) — identified from listing description`,
      `High revenue volatility (CV 118%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `4 transactions totalling USD $1,015,856`,
    },
    socialMedia: [
      `2,600 followers`,
      `8,000 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £53,422 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `2,600 followers`,
      `8,000 followers`,
      `52 subscribers`,
      `20,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `P&L KAZARTT`,
      `No comments`,
      `Managed by Flippa`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `61,557`,
      totalPageViews: `14,900`,
      pagesPerSession: `1.84`,
      avgDuration: `00:00:20`,
      engagementRate: `0.34%`,
      topCountries: [
        {
          country: `China`,
          views: 1288,
        },
        {
          country: `France`,
          views: 655,
        },
        {
          country: `Belgium`,
          views: 308,
        },
        {
          country: `Germany`,
          views: 297,
        },
        {
          country: `United States`,
          views: 273,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1402,
    watchers: 56,
    about: `Key Highlights

Founded: 2017

Business Model: 100% direct-to-consumer (D2C) e-commerce model with a focus on original, high-quality leather belts.

Product Catalog: 13 different models with 32 variations (colors).

FY2024 Revenue: €305k 

FY 2025 Revenue : €170k

Return Rate: Exceptionally low at less than 1%.

Email Database: 21,737 client emails (100% opt-in and GDPR compliant).

Logistics : externalized with a 3PL until january 2026 ; now managed internally due to lower volumes

Customer Trust: Excellent rating on TrustPilot; complaints are typically related to transport rather than product quality.

Social Reach: Active on Instagram, Facebook, and TikTok.

----------------------------------------------------------------------------------------------

Business Overview

Kazartt.com is a specialized e-commerce brand that transforms everyday belts into meaningful accessories by associating each design with a value (e.g., determination, freedom, roots). The brand targets the "accessible premium" segment, primarily men aged 25–55, but a significant portion of buyers are women purchasing gifts.

Originally launched in 2017, the brand underwent a full relaunch in 2021 with new branding and a structured side-business model. In 2024, the business scaled significantly after migrating to Shopify and securing "family and friends" funding to optimize stock levels. The products are manufactured in Europe (Spain) using locally sourced high-quality leather and components.

----------------------------------------------------------------------------------------------

Tech stack

CMS: Shopify (migrated from WordPress in 2024).

Key Tools: Klaviyo for email marketing, Google Drive for operations.

Features: Integrated with Meta Business Manager and Google Ads.

Maintenance: Managed primarily by the founder; Shopify is noted for its ease of use and wide integration capabilities.

----------------------------------------------------------------------------------------------

Human Resources

Guillaume Loiseau – Founder & CEO:

Manages all aspects: Marketing, logistics, branding, product development, and design.

Current time commitment: 5 hours per week (operating in "auto-pilot" mode since becoming a father in 2025).

Handover: Available for up to 1 year post-sale support.

Staffing: No additional employees;

External providers : a 3PL managed the logistics until january 2026. The founder now manages it.

----------------------------------------------------------------------------------------------

Customer Base and Acquisition

Traffic Acquisition: Primarily Meta Ads and direct traffic in 2025.

Email Marketing: Database of 21,737 emails; campaigns sent roughly once a month, increasing during the year-end peak.

Customer Profile: 95% B2C hobbyists and gift-seekers; 5% B2B (boutique sales).

Recurrence: 1.78% return customer rate since moving to Shopify in 2024.

----------------------------------------------------------------------------------------------

P`,
  },
  {
    id: `12044899`,
    title: `OdorGo`,
    revealedName: `OdorGo`,
    url: `https://flippa.com/12044899`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 108460.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 61376.56, expenses: 53417.47, profit: 7959.09 },
      { month: `Mar 2025`, revenue: 90384.63, expenses: 75363.07, profit: 15021.56 },
      { month: `Apr 2025`, revenue: 61686.44, expenses: 56281.32, profit: 5405.12 },
      { month: `May 2025`, revenue: 29116.02, expenses: 27536.14, profit: 1578.61 },
      { month: `Jun 2025`, revenue: 35032.95, expenses: 32952.69, profit: 2080.26 },
      { month: `Jul 2025`, revenue: 30203.14, expenses: 27768.55, profit: 2434.59 },
      { month: `Aug 2025`, revenue: 17773.65, expenses: 15582.9, profit: 2190.75 },
      { month: `Sep 2025`, revenue: 45907.96, expenses: 49071.53, profit: -3163.57 },
      { month: `Oct 2025`, revenue: 26548.08, expenses: 26668.73, profit: -120.65 },
      { month: `Nov 2025`, revenue: 104761.03, expenses: 94675.96, profit: 10085.07 },
      { month: `Dec 2025`, revenue: 63027.56, expenses: 57110.63, profit: 5916.93 },
      { month: `Jan 2026`, revenue: 57156.35, expenses: 49773.84, profit: 7382.51 },
    ],
    avgMonthlyRevenue: 51915.0,
    avgMonthlyProfit: 4731.0,
    profitMargin: `9%`,
    annualRevenue: `GBP £490,530`,
    annualProfit: `GBP £44,700`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `AL, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 64.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US-based Shopify D2C brand selling physical odor-neutralizing home products via Meta Ads (founded 2023); physical produc`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `26,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `OdorGo P&L Jan 2026`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indic`,
    ],
    postSaleSupport: `via Zoom and email`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2120,
    watchers: 145,
    about: `OdorGo.store is a direct-to-consumer Shopify brand in the evergreen home-products niche. Founded in 2023, the business quickly scaled through a proven paid acquisition system built around Meta Ads and conversion-optimized landing pages.

Its hero product, OdorGo, solves a recurring problem for everyday households—helping customers neutralize indoor odors caused by smoking or pets. The product’s strong repeat-purchase behavior, multiple color variants, and trusted supplier relationships make it a reliable performer in a stable market.

The business runs on lean operations with fulfillment handled by a warehouse in China. The owner invests roughly 5–10 hours weekly overseeing ads, supplier coordination, and light customer support.

Key Highlights

Consistent five-figure monthly revenue with strong margins

25K+ engaged Klaviyo subscribers

High-performing Meta Ads campaigns with proven creative library

Conversion-optimized Shopify storefront and funnels

Multiple color variants and product bundles

Non-seasonal demand with stable year-round sales

Documented SOPs and ready-to-scale infrastructure

Minimal owner time requirement (5–10 hrs/week)

Competitive Advantages

Premium Creative Assets

Extensive B-roll and user-generated content library

Professional photography and ad creatives ready for use

Optimized ad scripts and landing pages tested for performance

Proven Marketing System

Data-rich Meta Ads account with valuable pixel history

High-converting Shopify + Funnelish setup

Engaged customer email list ready for remarketing

Product Strengths

Multiple color options and long-term supplier partnership

Competitive pricing with reliable quality control

Evergreen appeal across home-care and lifestyle segments

Operations

Owner Input: 5–10 hrs per week

Fulfillment: Warehouse in Dongguan, China

Delivery Times: 5–10 days globally

Support Staff: Lean setup with outsourced logistics

Systems: Documented SOPs covering ads, supplier coordination, and customer service

Assets Included

Shopify store and custom landing pages

Domain: OdorGo.store

Facebook Ads account and pixel data

Full creative library (B-roll, UGC, product photography)

Customer database and 25K+ email subscribers

Supplier introductions and favorable pricing terms

SOP documentation for marketing, operations, and fulfillment

Growth Opportunities

Short-Term Levers

Build automated email flows and campaigns

Launch Google Ads to complement Meta performance

Expand SKU range and introduce complementary products

Reduce delivery times through regional fulfillment (US/EU)

Long-Term Scalability

Add subscription or repeat-purchase models

Develop Amazon FBA and marketplace presence

Introduce influencer and affiliate marketing

Test additional ad channels such as TikTok

Reason for Sale

The owner is shifting focus to a new business venture, presenting an opportunity to acquire a high-margin, low-maintenance Shopify brand with strong fundamentals and immediate growth potential`,
  },
  {
    id: `12245077`,
    title: `Relaxor Therapy`,
    revealedName: `Relaxor Therapy`,
    url: `https://flippa.com/12245077`,
    domain: `https://relaxortherapy.com.au/`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 42763.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 13163.55, expenses: 7354.57, profit: 5808.98 },
      { month: `Apr 2025`, revenue: 11503.66, expenses: 6777.99, profit: 4725.67 },
      { month: `May 2025`, revenue: 9518.65, expenses: 6315.71, profit: 3201.67 },
      { month: `Jun 2025`, revenue: 7446.01, expenses: 5336.54, profit: 2110.74 },
      { month: `Jul 2025`, revenue: 7973.06, expenses: 5906.77, profit: 2067.56 },
      { month: `Aug 2025`, revenue: 8200.39, expenses: 5524.5, profit: 2675.89 },
      { month: `Sep 2025`, revenue: 4850.13, expenses: 4378.96, profit: 471.17 },
      { month: `Oct 2025`, revenue: 6827.52, expenses: 4602.48, profit: 2225.04 },
      { month: `Nov 2025`, revenue: 14518.64, expenses: 10848.34, profit: 3670.3 },
      { month: `Dec 2025`, revenue: 10613.39, expenses: 9142.73, profit: 1469.39 },
      { month: `Jan 2026`, revenue: 5552.44, expenses: 5232.4, profit: 320.04 },
      { month: `Feb 2026`, revenue: 4001.77, expenses: 3935.73, profit: 66.04 },
    ],
    avgMonthlyRevenue: 8681.0,
    avgMonthlyProfit: 2401.0,
    profitMargin: `28%`,
    annualRevenue: `GBP £82,021`,
    annualProfit: `GBP £22,686`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 63.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 64.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian ecommerce Shopify brand selling physical therapeutic/posture products (braces, supports, compression gear). P`,
      `Revenue declining sharply (-41.0% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `41 followers`,
      `2,360 followers`,
      `96 followers`,
    ],
    expenses: [
      {
        item: `COG`,
        amount: `GBP £320 /month`,
      },
      {
        item: `Google Ad`,
        amount: `GBP £2,923 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `41 followers`,
      `2,360 followers`,
      `96 followers`,
      `Attachments`,
      `XLSX`,
      `RELAXOR THERAPY 3 Year P&L end Feb 2026`,
      `Screenshot 2025-12-10 at 12.51.38 pm`,
      `Screenshot 2025-12-10 at 12.50.03 pm`,
      `Screenshot 2025-12-10 at 12.54.01 pm`,
      `XLSX`,
      `RELAXOR THERAPY 3 Year P&L end Feb 2026`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $106,000`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `73,435`,
      totalPageViews: `10,574`,
      pagesPerSession: `1.89`,
      avgDuration: `00:00:22`,
      engagementRate: `0.52%`,
      topCountries: [
        {
          country: `Australia`,
          views: 7939,
        },
        {
          country: `United States`,
          views: 312,
        },
        {
          country: `China`,
          views: 130,
        },
        {
          country: `(not set)`,
          views: 99,
        },
        {
          country: `Singapore`,
          views: 51,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1208,
    watchers: 98,
    about: `This Australian eCommerce brand in the Health and Wellness space specialises in practical solutions for posture, joint support and everyday pain relief. Built on Shopify, the store offers a focused range of therapeutic products including posture correctors, knee supports, back braces, compression gear and related wellness accessories.

The business operates with a lean structure, strong product–market fit and a sizeable customer base stored across Shopify and Klaviyo. Its customer list provides meaningful room for improved CRM, email flows and remarketing.

Sales are currently driven almost entirely through Google Ads, with little to no spend on Meta, TikTok, YouTube or SEO. This leaves clear expansion potential across new channels, markets and product lines.

Key Highlights

Consistent revenue with healthy net margins

Large customer base across Shopify and Klaviyo

Sales generated solely via Google Ads

Simple, low-maintenance operation that can be run remotely

Evergreen niche: posture, pain relief and mobility support

Strong upside across new paid channels, SEO, international markets and product expansion



Included in the Sale

Shopify store and theme

Social media accounts

Google Ads account and associated data

Klaviyo account with profiles, flows, segments and campaign history

Branding, creatives, product photos and lifestyle imagery

Supplier and fulfilment relationships

SOPs and operational documentation



Drop in Sales Explained

Any softer recent performance is due to reduced focus and ad spend rather than demand issues. The owner redirected time and budget to another project, and minimal new testing has been done. The product range remains evergreen, and the existing Google Ads structure is already proven. Consistent spend, fresh creatives and audience testing can reasonably restore performance.

Customers

The brand serves customers seeking non-invasive, at-home relief for posture issues, joint pain and general discomfort. Key audiences include office workers, active adults and older customers.

Primary sales come from Australia, with clear expansion potential across other English-speaking markets. Acquisition is currently driven by search intent, and there is strong room to increase lifetime value through email/SMS, bundles and repeat-purchase paths.

Financials

The business maintains healthy margins supported by efficient unit economics, strong product costs and lean operations. Results have been achieved without paid social, influencer campaigns or meaningful email/SMS monetisation. 

Inventory Model

The business uses a simple, low-SKU model. Fulfilment is handled through a 3PL, making operations largely hands-off. Suppliers are established, and inventory replenishment is straightforward with reliable lead times. A buyer can continue with the current setup or adjust providers as needed.

Growth Opportunities

Build and optimise email/SMS flows and ongoing campaigns

Launch Meta, Instagram, TikTok and YouTube ads

Develop `,
  },
  {
    id: `12206076`,
    title: `ArticleReword.com`,
    revealedName: `ArticleReword.com`,
    url: `https://flippa.com/12206076`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 91906.0,
    avgMonthlyRevenue: 2176.0,
    avgMonthlyProfit: 1967.0,
    profitMargin: `90%`,
    annualRevenue: `GBP £20,565`,
    annualProfit: `GBP £18,586`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, PHP, MySQL, Stripe`,
    churn: `28%`,
    country: `United Kingdom`,
    platform: `established`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 55,
      growthPotential: 80,
      overall: 64.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
      `High churn: 28%`,
    ],
    greenFlags: [],
    seller: {
      name: `Chloe Rowland`,
      location: `United Kingdom`,
      verified: false,
    },
    expenses: [
      {
        item: `AI Text Humanizer`,
        amount: `GBP £38 /month`,
      },
      {
        item: `Moz da pa`,
        amount: `GBP £38 /month`,
      },
      {
        item: `deepseek`,
        amount: `GBP £4 /month`,
      },
      {
        item: `openai`,
        amount: `GBP £22 /month`,
      },
      {
        item: `Paraphraser`,
        amount: `GBP £38 /month`,
      },
      {
        item: `hosting`,
        amount: `GBP £22 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Email subscriber list`,
      `Unique content`,
      `Unique design`,
      `PHP 8`,
      `Included.`,
      `23,447 subscribers`,
      `Attachments`,
      `googleadsense`,
      `93f38a527927ea63c98c57c629449727`,
      `deepseek`,
      `hosting`,
      `openai`,
      `paraphrase`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $91,906`,
      `GBP £69,827`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `280,685`,
      totalPageViews: `355,669`,
      pagesPerSession: `6.51`,
      avgDuration: `00:01:46`,
      engagementRate: `0.76%`,
      topCountries: [
        {
          country: `United States`,
          views: 61503,
        },
        {
          country: `India`,
          views: 43086,
        },
        {
          country: `Philippines`,
          views: 22639,
        },
        {
          country: `United Kingdom`,
          views: 18863,
        },
        {
          country: `Pakistan`,
          views: 14629,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `MySQL`,
      `Stripe`,
    ],
    views: 866,
    watchers: 15,
    about: `Key Highlights

ArticleReword.com is a profitable AI-powered SaaS platform established in 2019, helping users instantly create high-quality, human-like rewritten content. It serves writers, marketers, and agencies who need reliable, natural text rewording for content creation and SEO.

Operating in the fast-growing AI writing and content automation sector, the business has generated over £20,600 in total revenue with an impressive 90%+ profit margin. The system is fully automated and requires minimal owner involvement.

Operations

ArticleReword.com runs smoothly on PHP + Tailwind CSS, integrated with Stripe for secure, automated subscription billing.

It offers tiered pricing plans (free, standard, premium) to serve both individuals and professionals. The owner currently spends less than 1 hour per week managing the site — mainly checking payments and responding to light customer support.

Customers

The platform attracts a global mix of loyal users, including:

✍️ Writers & Bloggers producing unique articles

? SEO Experts & Agencies improving content quality

? Businesses managing content marketing workflows

? Students & Educators refining academic writing

Its ease of use, accuracy, and affordability lead to high customer retention and steady recurring revenue.

Technology

Built with PHP + MySQL and a modern Tailwind CSS interface, ArticleReword.com integrates advanced AI rewriting APIs to generate fluent, natural-sounding text.
Key features include:

Secure Stripe payment gateway

Automated subscription management

Scalable infrastructure

Low hosting and maintenance costs

The platform is reliable, fast, and ready for further scaling or white-labelling.

Financials

? Revenue: £20,600 total

? Profit Margin: ~90%

? Established: 2019

? Business Model: Subscription-based SaaS

? Main Expenses: Hosting and API usage

With extremely low overhead and consistent income, ArticleReword.com offers strong cash flow and passive ownership potential.

Growth Opportunities

Introduce lifetime or agency plans for instant sales boosts

Expand into multilingual rewriting markets

Launch an affiliate/referral programme to grow user base

Invest in SEO and paid ads targeting “AI Rewriter,” “Text Humanizer,” “Content Paraphrasing”

Bundle or cross-sell with other AI tools for higher average revenue per user

In summary:
ArticleReword.com is a turnkey, profitable, and low-maintenance SaaS business positioned in the booming AI content creation industry. With over £20,600 in revenue, 90% profit margins, and strong branding, it’s an ideal opportunity for investors seeking a scalable, proven AI SaaS asset.`,
  },
  {
    id: `11839737`,
    title: `Bagaholic`,
    revealedName: `Bagaholic`,
    url: `https://flippa.com/11839737`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 68000.0,
    monthlyPL: [
      { month: `Nov 2023`, revenue: 6049.01, expenses: 285.75, profit: 5763.26 },
      { month: `Dec 2023`, revenue: 3817.62, expenses: 285.75, profit: 3530.6 },
      { month: `Jan 2024`, revenue: 4366.26, expenses: 285.75, profit: 4080.51 },
      { month: `Feb 2024`, revenue: 4066.54, expenses: 285.75, profit: 3780.79 },
      { month: `Mar 2024`, revenue: 3862.07, expenses: 285.75, profit: 3576.32 },
      { month: `Apr 2024`, revenue: 3208.02, expenses: 285.75, profit: 2922.27 },
      { month: `May 2024`, revenue: 2221.23, expenses: 285.75, profit: 1934.21 },
      { month: `Jun 2024`, revenue: 2293.62, expenses: 285.75, profit: 2007.87 },
      { month: `Jul 2024`, revenue: 2668.27, expenses: 285.75, profit: 2382.52 },
      { month: `Aug 2024`, revenue: 3002.28, expenses: 284.48, profit: 2717.8 },
      { month: `Sep 2024`, revenue: 1940.56, expenses: 285.75, profit: 1654.81 },
      { month: `Oct 2024`, revenue: 1822.45, expenses: 285.75, profit: 1536.7 },
    ],
    avgMonthlyRevenue: 3276.0,
    avgMonthlyProfit: 2991.0,
    profitMargin: `91%`,
    annualRevenue: `GBP £30,958`,
    annualProfit: `GBP £28,257`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Netherlands`,
    platform: `fees`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 67.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 64.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -56% — Bagaholic`,
      `Revenue declining sharply (-52.5% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Anastasiia`,
      location: `Netherlands`,
      verified: true,
    },
    socialMedia: [
      `2,836 followers`,
      `500 followers`,
    ],
    expenses: [
      {
        item: `month
Accounting`,
        amount: `GBP £75 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `2,836 followers`,
      `500 followers`,
      `12,745 subscribers`,
      `Attachments`,
      `Screenshot 2024-11-18 093211`,
      `Screenshot 2024-11-18 093232`,
      `Screenshot 2024-11-18 093249`,
      `Screenshot 2024-11-18 093307`,
      `Screenshot 2024-11-18 093335`,
      `Screenshot 2024-11-18 093412`,
      `mediavi`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `638,141`,
      totalPageViews: `67,317`,
      pagesPerSession: `1.11`,
      avgDuration: `00:00:25`,
      engagementRate: `0.31%`,
      topCountries: [
        {
          country: `China`,
          views: 40038,
        },
        {
          country: `United States`,
          views: 17826,
        },
        {
          country: `Italy`,
          views: 5499,
        },
        {
          country: `France`,
          views: 4128,
        },
        {
          country: `Germany`,
          views: 3121,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3375,
    watchers: 283,
    about: `Key Highlights

DA 61, organic links from Forbes, The Guardian, Wikipedia, Business Insider, Bloomberg etc
Unlimited passive income up to $2,000 (and even more!) with ads and courses
One of the best websites in the niche
12,000 high-ticket loyal customers information
Learn a new profession, designer handbag authentication, and earn from any place in the world
No paid ads were ever explored, the business ran exclusively on organic traffic and recommendations
No email marketing ever used, another great opportunity

Operations

I am the only person serving this business. The main tasks are responding to orders and writing content.

We are offering a service of designer goods authentication on a 24-hour basis. This is an online service that requires a human beside it. The customer sends the pictures of their designer item. We send back the verdict on whether the item is authentic or not within 24 hours.

Naturally, I'll teach the new owner all the intricacies of the profession and will support and double-check everything for 3 months. I've taught many people the craft, including my employees so I know it can be done. All is needed from your side is interest and commitment as you will already have the orders.

Currently the business takes about 4 hours a week as the only thing I'm supporting are ongoing orders. There are up to 5 orders a day. If you know how to authenticate, then each case takes you just a glance and you can be done in less than half an hour.

When I was actively running engaged in the business, operations required from 4 to 5 hours daily (2 hours for authenticating the items and 3 for article writing, these are the 2 most important tasks).

If you don't want to provide the service and learn the profession yourself, I can recommend a person who knows all the intricacies (she used to be one of my employees). Another option is to discontinue the service altogether and rely only on ad revenue, add some courses etc.

Customers

We are proud to have 12,000 customers in 90+ countries around the globe. The website has been visited by over 8 mln people. Customers find us via organic channels, no paid channels were ever explored, which is a huge opportunity for a new owner.

We didn't focus on growing our social media too so that's another opportunity that can be explored.

Financials

For 5 years the revenue has been around $4,000 monthly. Starting this year I rarely published new content as my focus shifted to another project.

There are several revenue streams:

Authentication services: 70% of the revenue
Authentication courses: 5-10% of the revenue
Mediavine: 20% of the revenue
Guest posts: occasional
Amazon affiliate: $10-$50 a month
Impact.com - only one sale was made, I guess you might grow this revenue stream further

The site needs regular high-quality content and a person who's into fashion and who's willing to continue creating high-quality content in this niche.

Opportunities

Selling preloved designer goods. That's what we starte`,
  },
  {
    id: `11765541`,
    title: `manory.de`,
    revealedName: `manory.de`,
    url: `https://flippa.com/11765541`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 25748.0,
    monthlyPL: [
      { month: `Jul 2023`, revenue: 154640.28, expenses: 117887.75, profit: 36751.26 },
      { month: `Aug 2023`, revenue: 93060.52, expenses: 80531.97, profit: 12529.82 },
      { month: `Sep 2023`, revenue: 32512.0, expenses: 27901.9, profit: 4611.37 },
      { month: `Oct 2023`, revenue: 6487.16, expenses: 3413.76, profit: 3073.4 },
      { month: `Nov 2023`, revenue: 4024.63, expenses: 1869.44, profit: 2155.19 },
      { month: `Dec 2023`, revenue: 16714.47, expenses: 11724.64, profit: 4989.83 },
      { month: `Jan 2024`, revenue: 10524.49, expenses: 7608.57, profit: 2915.92 },
      { month: `Feb 2024`, revenue: 11945.62, expenses: 7575.55, profit: 4370.07 },
      { month: `Mar 2024`, revenue: 10694.67, expenses: 7294.88, profit: 3399.79 },
      { month: `Apr 2024`, revenue: 6647.18, expenses: 4240.53, profit: 2406.65 },
      { month: `May 2024`, revenue: 11303.0, expenses: 8028.94, profit: 3272.79 },
      { month: `Jun 2024`, revenue: 4645.66, expenses: 2724.15, profit: 1921.51 },
    ],
    avgMonthlyRevenue: 30267.0,
    avgMonthlyProfit: 6866.0,
    profitMargin: `23%`,
    annualRevenue: `GBP £285,983`,
    annualProfit: `GBP £64,878`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Germany`,
    platform: `Organization`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 62.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 64.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (manory.de) — identified from listing description`,
      `Revenue declining sharply (-91.9% trend)`,
      `High revenue volatility (CV 146%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Mustafa`,
      location: `Germany`,
      verified: true,
      transactions: `1 transaction totalling USD $29,873`,
    },
    socialMedia: [
      `90 followers`,
      `8,160 followers`,
      `1,900 followers`,
      `90 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,448 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £10,000 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £162 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £9,748 Included in sale price`,
      `Organization Schema`,
      `Included.`,
      `90 followers`,
      `8,160 followers`,
      `1,900 followers`,
      `90 followers`,
      `12,819 subscribers`,
      `Attachments`,
      `Bildschirmfoto 2024-07-09 um 10.41.34`,
      `Contact Seller`,
      `Send message`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Penny larason`,
        date: `Mar 01, 2026 08:41 AM`,
        text: `Hi,

Could this be transfered and run from US?

Thanks,
Penny`,
      },
    ],
    ga: {
      users: `5,154`,
      totalPageViews: `375`,
      pagesPerSession: `0.69`,
      avgDuration: `00:00:29`,
      engagementRate: `0.49%`,
      topCountries: [
        {
          country: `Germany`,
          views: 70,
        },
        {
          country: `United States`,
          views: 21,
        },
        {
          country: `Italy`,
          views: 5,
        },
        {
          country: `Switzerland`,
          views: 2,
        },
        {
          country: `Canada`,
          views: 0,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 4880,
    watchers: 204,
    commentCount: 1,
    about: `Profitable Online Jewelry Shop "MANORY" for Sale

Founded: February 2020
Location: Southern Germany
Inventory Value: Approximately €12,000

Take advantage of the opportunity to acquire an established and profitable online jewelry shop. "MANORY" has been successfully operating since its inception in February 2020 and has shown remarkable profitability. With the right team, this shop has the potential to be even more profitable.

Shop Highlights:

Automated Fulfillment: Efficiently managed with DHL shipping at a cost of €2.75, ensuring delivery within 1-2 business days.
Personalized Jewelry: Dropshipped with a delivery time of 5-6 business days.
Reliable Supplier: Our supplier in China manufactures our jewelry, made from 18k gold-plated stainless steel, with a lead time of 30 days.
Advertising: Currently, only Instagram has been used as an advertising channel, leaving other channels untapped with significant potential for growth.
Product Costs: Our jewelry pieces cost between €2-4.
Average Order Value (AOV): €45.30
Net Margin: 20.47%

Included in the Sale:

All creative assets
Social media channels
Facebook Pixel

"MANORY" is being sold to focus on a new project. This is an excellent opportunity for anyone looking to invest in a profitable and scalable e-commerce business.

For more details and to discuss this exciting opportunity, please contact us.`,
  },
  {
    id: `12102441`,
    title: `UpgradeRC`,
    revealedName: `UpgradeRC`,
    url: `https://flippa.com/12102441`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 45776.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 19461.48, expenses: 20671.79, profit: -1210.31 },
      { month: `Apr 2025`, revenue: 15314.93, expenses: 15247.62, profit: 67.31 },
      { month: `May 2025`, revenue: 29974.54, expenses: 24390.35, profit: 5584.19 },
      { month: `Jun 2025`, revenue: 26130.25, expenses: 23089.87, profit: 3039.11 },
      { month: `Jul 2025`, revenue: 25966.42, expenses: 27929.84, profit: -1963.42 },
      { month: `Aug 2025`, revenue: 30716.22, expenses: 25219.66, profit: 5496.56 },
      { month: `Sep 2025`, revenue: 25491.44, expenses: 26633.17, profit: -1141.73 },
      { month: `Oct 2025`, revenue: 25937.21, expenses: 0.0, profit: 25937.21 },
      { month: `Nov 2025`, revenue: 52236.37, expenses: 0.0, profit: 52236.37 },
      { month: `Dec 2025`, revenue: 44432.22, expenses: 0.0, profit: 44432.22 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Feb 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 29566.0,
    avgMonthlyProfit: 11040.0,
    profitMargin: `45%`,
    annualRevenue: `with USD 22,477 in annual profit, representing a 6% profit margin. With an average monthly revenue of about USD 29,000 and consistent order volume, UpgradeRC presents a solid acquisition opportunity for a buyer seeking a growing ecommerce platform in a passionate enthusiast-driven market.`,
    annualProfit: `GBP £104,313`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Belgium`,
    platform: `in`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 61.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 63.8,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Belgian ecommerce business (founded 2023) selling RC cars, drones, airplanes, accessories, and construction kits. Physic`,
      `3 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Antonio Neus`,
      location: `Belgium`,
      verified: true,
    },
    socialMedia: [
      `2,400 followers`,
      `863 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £714 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £3,163 /month`,
      },
      {
        item: `Transaction fees`,
        amount: `GBP £374 /month`,
      },
      {
        item: `Staff`,
        amount: `GBP £690 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £265 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Custom technology`,
      `Inventory value`,
      `GBP £52,850 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `2,400 followers`,
      `863 followers`,
      `6,700 subscribers`,
      `Attachments`,
      `XLSX`,
      `Profit and Loss Statement - Flippa (1)`,
      `UpgradeRC Sales Memorandum`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Editor`,
    ],
    postSaleSupport: `is provided to ensure a seamless transition.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 521,
    watchers: 9,
    about: `UpgradeRC: Business Overview

UpgradeRC is an established ecommerce business operating in the remote-controlled models and building sets niche, offering a wide range of RC cars, airplanes, boats, drones, accessories, and construction kits. Founded in 2023 and headquartered in Belgium, the company has quickly built a strong presence within the European hobby market through a hybrid fulfillment model and an extensive supplier network.

The business generates approximately USD 348,004 in annual revenue with USD 22,477 in annual profit, representing a 6% profit margin. With an average monthly revenue of about USD 29,000 and consistent order volume, UpgradeRC presents a solid acquisition opportunity for a buyer seeking a growing ecommerce platform in a passionate enthusiast-driven market.

Operating on Shopify with integrated payment processing and logistics workflows, the business combines in-house inventory with dropshipping to balance margin control and product breadth. This structure allows scalability while maintaining flexibility across product categories.

Product Range & Market Position

UpgradeRC offers a comprehensive catalog covering multiple RC segments, including off-road crawlers, model vehicles, drones, and hobbyist construction sets. The company has strategically focused on high-growth segments such as RC crawlers and Lego-style building kits, which appeal strongly to collectors and dedicated hobbyists.

The brand has developed recognition within the RC community through sponsorship of industry events and active engagement with enthusiasts, strengthening credibility and customer loyalty. This positioning supports repeat purchases and reinforces the company’s role as a specialized retailer rather than a generalist ecommerce store.

The customer base primarily consists of hobbyists aged 30 to 55 with discretionary income and a strong interest in technical and collectible products, creating a resilient demand profile.

Operations & Supplier Network

The company operates a hybrid logistics model with both stocked inventory and supplier-direct fulfillment. It maintains contracts with approximately ten established European suppliers alongside partnerships with multiple Chinese manufacturers, ensuring product availability, competitive pricing, and supply chain resilience.

As of late 2025, owned inventory is valued at roughly EUR 59,000, providing immediate operational continuity and faster fulfillment for core products. Daily operations are supported by the owner and a freelance team member responsible for catalog management and supplier coordination, while core business management and customer support are handled internally.

This streamlined structure allows efficient operations while leaving room for scaling through additional staffing or automation.

Financial Performance (Trailing 12 Months)

Annual Revenue: USD 348,004
Annual Profit: USD 22,477
Average Monthly Revenue: USD 29,000
Average Monthly Profit: USD 1,873
Profit Margin: 6%

Key`,
  },
  {
    id: `11998742`,
    title: `Insidr AI`,
    revealedName: `Insidr AI`,
    url: `https://flippa.com/11998742`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 50000.0,
    monthlyPL: [
      { month: `Dec 2024`, revenue: 2716.53, expenses: 895.35, profit: 1821.18 },
      { month: `Jan 2025`, revenue: 5152.39, expenses: 533.4, profit: 4618.99 },
      { month: `Feb 2025`, revenue: 3317.24, expenses: 533.4, profit: 2785.11 },
      { month: `Mar 2025`, revenue: 4568.19, expenses: 610.87, profit: 3957.32 },
      { month: `Apr 2025`, revenue: 2571.75, expenses: 610.87, profit: 1960.88 },
      { month: `May 2025`, revenue: 4033.52, expenses: 915.67, profit: 3117.85 },
      { month: `Jun 2025`, revenue: 4225.29, expenses: 610.87, profit: 3614.42 },
      { month: `Jul 2025`, revenue: 1635.76, expenses: 610.87, profit: 1024.89 },
      { month: `Aug 2025`, revenue: 1637.03, expenses: 610.87, profit: 1024.89 },
      { month: `Sep 2025`, revenue: 2089.15, expenses: 610.87, profit: 1478.28 },
      { month: `Oct 2025`, revenue: 2706.37, expenses: 610.87, profit: 2095.5 },
      { month: `Nov 2025`, revenue: 2706.37, expenses: 610.87, profit: 2094.23 },
    ],
    avgMonthlyRevenue: 3113.0,
    avgMonthlyProfit: 2466.0,
    profitMargin: `79%`,
    annualRevenue: `GBP £29,417`,
    annualProfit: `GBP £23,303`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Denmark`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 63.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 63.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -39% — Insidr AI`,
      `Revenue declining sharply (-32.9% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    socialMedia: [
      `876 followers`,
      `60,000 followers`,
    ],
    expenses: [
      {
        item: `Google ads`,
        amount: `GBP £345 /month`,
      },
      {
        item: `Software & Hosting`,
        amount: `GBP £290 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Other`,
      `Included.`,
      `876 followers`,
      `60,000 followers`,
      `1,050 subscribers`,
      `61,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Profit_and_Loss (5)`,
      `XLSX`,
      `Profit_and_Loss (1)`,
      `Contact Seller`,
      `Send message`,
      `Vinod Oct 13, 2025 06:17 AM`,
      `What issues faced w the busin`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Vinod`,
        date: `Oct 13, 2025 06:17 AM`,
        text: `What issues faced w the business being in Denmark and high tax bracket? Any issues relocating to say the US?`,
      },
      {
        author: `Joseph`,
        date: `Aug 15, 2025 01:55 AM`,
        text: `Good morning,
Can you tell me what you did in August and September to have your best sales month? Dr. Arevalo`,
      },
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 6588,
    watchers: 209,
    commentCount: 2,
    about: `Key Highlights

Highly Profitable Digital Brand: Insidr AI is a lean, high-margin business with ~$55,000 in annual net profit from $70,000 in revenue (2024) — built from digital assets.

Established Multi-Channel Presence: Includes 61,000+ email subscribers, 60,000 TikTok followers, a private Skool community with 5,000+ members, and consistent website traffic (600k+ annual sessions).

Online Presence: Early established AI-brand and AI tools directory; featured in Forbes twice and built a custom AI tools directory for the UAE Gov.

Revenue Streams: Income is diversified across sponsorships, AI tool/SaaS affiliate partnerships, program/course sales, and business consulting services.

Complete Transfer of Assets: Sale includes the domain, website, newsletter, Skool community, email list, existing digital products/courses, and all backend systems and content. The only exclusion: the seller's personal face.

Growth Potential: High growth potential through existing revenue streams; affiliate, sponsorships, consulting/coaching and very high potential for selling programs and online courses/resources to the audience. A buyer can scale using YouTube, paid ads, or by upselling inside the growing Skool platform and email list.

Additional`,
  },
  {
    id: `12256820`,
    title: `Layl Group`,
    revealedName: `Layl Group`,
    url: `https://flippa.com/12256820`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 47815.0,
    monthlyPL: [
      { month: `Dec 2024`, revenue: 8167.37, expenses: 5895.34, profit: 2273.3 },
      { month: `Jan 2025`, revenue: 12082.78, expenses: 8717.28, profit: 3365.5 },
      { month: `Feb 2025`, revenue: 15624.81, expenses: 11280.14, profit: 4344.67 },
      { month: `Mar 2025`, revenue: 33940.75, expenses: 24491.95, profit: 9447.53 },
      { month: `Apr 2025`, revenue: 3953.51, expenses: 2856.23, profit: 1098.55 },
      { month: `May 2025`, revenue: 7414.26, expenses: 5351.78, profit: 2062.48 },
      { month: `Jun 2025`, revenue: 5685.79, expenses: 4103.37, profit: 1581.15 },
      { month: `Jul 2025`, revenue: 3882.39, expenses: 2800.35, profit: 1080.77 },
      { month: `Aug 2025`, revenue: 3761.74, expenses: 2713.99, profit: 1047.75 },
      { month: `Sep 2025`, revenue: 3418.84, expenses: 2465.07, profit: 955.04 },
      { month: `Oct 2025`, revenue: 8194.04, expenses: 5905.5, profit: 2287.27 },
      { month: `Nov 2025`, revenue: 3741.42, expenses: 2703.83, profit: 1038.86 },
    ],
    avgMonthlyRevenue: 9156.0,
    avgMonthlyProfit: 2549.0,
    profitMargin: `28%`,
    annualRevenue: `GBP £86,510`,
    annualProfit: `and 28% margins`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `React, Shopify, Stripe`,
    country: `France`,
    platform: `fees`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 58.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 63.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Layl Group) — identified from listing description`,
      `Revenue declining sharply (-57.2% trend)`,
      `High revenue volatility (CV 91%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Bilal Elboughlamy`,
      location: `France`,
      verified: true,
    },
    socialMedia: [
      `1,008 followers`,
      `939 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £353 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £1,414 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £106 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £9,543 Included in sale price`,
      `AggregateRating Schema`,
      `Social M`,
    ],
    postSaleSupport: `(2 hrs/week)`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `75,452`,
      totalPageViews: `28,367`,
      pagesPerSession: `3.33`,
      avgDuration: `00:00:41`,
      engagementRate: `0.60%`,
      topCountries: [
        {
          country: `France`,
          views: 77482,
        },
        {
          country: `Belgium`,
          views: 3642,
        },
        {
          country: `Switzerland`,
          views: 1043,
        },
        {
          country: `Réunion`,
          views: 455,
        },
        {
          country: `United States`,
          views: 201,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `React`,
      `Shopify`,
      `Stripe`,
    ],
    views: 453,
    watchers: 10,
    about: `Layl Group: Business Overview

Layl Group is a profitable, low-maintenance e-commerce brand operating on Shopify, specializing in men’s traditional clothing such as qamis, gandouras, and djellabas. With over $119,000 in annual revenue, a healthy 28% profit margin, and $2,764 in average monthly profit, the business offers a simple, scalable asset in a culturally rich and recurring demand niche. Based in France, Layl serves a growing customer base across Europe and internationally, with peak sales during key Islamic seasons such as Ramadan and Eid.

Unlike dropshipping operations, the business includes over $12,000 of paid inventory, enabling faster shipping, higher margins, and greater control over customer satisfaction. It has served over 9,600 customers to date and captured 9,200+ email subscribers—creating a valuable owned audience for re-engagement and lifetime value growth.

With diversified traffic across SEO, organic social, Google Ads, and direct return customers, the brand maintains strong page view volume and high order intent, supported by an average order value of $49 and a 0% refund rate on Shopify. Layl has been built on efficiency and brand trust, offering a buyer an operationally light, asset-rich opportunity with clear seasonal spikes and scalable growth levers.

Key Financials (Jan 2025 – Dec 2025)

Annual Revenue: USD $119,155
Annual Profit: USD $33,166
Monthly Revenue: USD $9,929 avg
Monthly Profit: USD $2,764 avg
Profit Margin: 28%
Profit Multiple: 1.6x
Revenue Multiple: 0.4x
Inventory Value: USD $12,716 (included in sale)

Performance Highlights

Orders: 2,258 via Shopify | 1,977 via Stripe
AOV: USD $50 (Shopify) | USD $49 (Stripe)
Refund Rate: 0% (Shopify) | 4% (Stripe)
Fulfilment Rate: 98.7%
Email Subscribers: 9,256
Stripe Revenue: USD $113,301
Website Users: 70,925
Monthly Page Views: 26,169 avg | Total Views: 314,034
Top Organic Keywords: Qamis Blanc, Qamis Manche Courte, Al Layl
Top Markets: France, US, Belgium, Switzerland, Algeria

Key Business Highlights

Cultural Niche with Predictable Demand: Serves Muslim lifestyle segment with consistent seasonality (Ramadan, Eid, weddings)
Organic and Paid Traffic: Diverse sources include SEO, Google Ads, and social, limiting risk from single-channel dependency
High-Converting Website: Strong UX with 3.12 pages/session and highly engaged shopping flow
Low Workload: 2–4 hours per week, no employees or freelancers
High Customer Satisfaction: 0% refund rate on Shopify, reflecting strong product quality and logistics
Email-Driven Revenue: 9K+ email list drives significant revenue during sales and holidays
Brand Recognition: Operated for 3 years with strong recognition in its niche and highly rated customer experience

Product & Market Leadership

Layl is positioned as a go-to brand for premium, ready-to-wear Islamic garments for men, combining traditional aesthetics with modern retail ease. Its clothing is worn for both religious and formal occasions, giving the brand strong seasonal`,
  },
  {
    id: `11844784`,
    title: `Horizon`,
    revealedName: `Horizon`,
    url: `https://flippa.com/11844784`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 34072.0,
    monthlyPL: [
      { month: `Apr 2024`, revenue: 10149.84, expenses: 8696.96, profit: 1452.88 },
      { month: `May 2024`, revenue: 27418.03, expenses: 17321.53, profit: 10096.5 },
      { month: `Jun 2024`, revenue: 30620.97, expenses: 20257.77, profit: 10363.2 },
      { month: `Jul 2024`, revenue: 8079.74, expenses: 4958.08, profit: 3121.66 },
      { month: `Aug 2024`, revenue: 1149.35, expenses: 400.05, profit: 749.3 },
      { month: `Sep 2024`, revenue: 7133.59, expenses: 6104.89, profit: 1028.7 },
      { month: `Oct 2024`, revenue: 5280.66, expenses: 4870.45, profit: 410.21 },
      { month: `Nov 2024`, revenue: 1894.84, expenses: 1323.34, profit: 571.5 },
      { month: `Dec 2024`, revenue: 953.77, expenses: 350.52, profit: 603.25 },
      { month: `Jan 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Feb 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Mar 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 10298.0,
    avgMonthlyProfit: 2366.0,
    profitMargin: `31%`,
    annualRevenue: `GBP £72,977`,
    annualProfit: `GBP £22,360`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 58.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 63.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue collapsed -100% — Horizon`,
      `Revenue declining sharply (-88.1% trend)`,
      `High revenue volatility (CV 102%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Sam Lee`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `386 followers`,
      `5,264 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £936 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £936 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £47 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £94 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £11,188 Excluded from sale price`,
      `Organization Schema`,
      `Included.`,
      `386 followers`,
      `5,264 followers`,
      `8,824 subscribers`,
      `Attachments`,
      `XLSX`,
      `2024 - Horizon Financials`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show a`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `20,053`,
      totalPageViews: `4,958`,
      pagesPerSession: `1.48`,
      avgDuration: `00:00:12`,
      engagementRate: `0.30%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 105,
        },
        {
          country: `United States`,
          views: 95,
        },
        {
          country: `China`,
          views: 8,
        },
        {
          country: `Singapore`,
          views: 7,
        },
        {
          country: `India`,
          views: 5,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1400,
    watchers: 49,
    about: `Key Highlights


Eco-Friendly & Sustainable: Horizon is a sustainable brand offering eco-friendly quick-dry travel towels made from 100% recycled materials. Each towel is crafted with unique designs that resonate with environmentally conscious consumers.
Proven Profitability: The business has demonstrated strong profitability during summer months, with revenues exceeding £20,000 and profits ranging from £3,000–£5,000 in peak months over the past two years.
Exceptional Customer Feedback: Boasting hundreds of 5-star reviews and a return rate of less than 1%, Horizon has established itself as a trusted brand with minimal product quality issues.
Minimal Operational Overhead: Day-to-day operations are streamlined through a 3PL partner, requiring just a few hours per week to manage.
Massive Growth Potential: Significant opportunities exist to scale the business further by addressing stock shortages and leveraging successful marketing campaigns, which have consistently delivered strong ROAS.

Operations

Horizon operates as a direct-to-consumer e-commerce business powered by Shopify, with seamless integration to a UK-based 3PL provider for fulfillment. All customer orders are automatically processed and shipped, minimizing the need for manual intervention.

Key tools and platforms include:

Shopify: For e-commerce management.
Klaviyo: For email marketing to an engaged list of 8,500 subscribers.
Meta Ads: A proven channel for scaling revenue profitably.

Additionally, Horizon works with a reliable supplier in China and employs a social media manager to handle content creation and engagement. This setup ensures minimal time commitment—just a few hours per week—allowing the new owner to focus on scaling the business further.



Customers


Primary Demographic: Horizon’s customer base consists primarily of eco-conscious individuals aged 25–45, with a slight skew toward women. Customers value sustainability, functionality, and stylish design.
Customer Location: The majority of customers are based in the UK, with a growing international customer segment.
Customer Acquisition: Customers are acquired through a combination of high-performing Meta Ads campaigns, email marketing via Klaviyo, and organic social media engagement.
Customer Loyalty: With hundreds of 5-star reviews and a return rate of less than 1%, Horizon enjoys a loyal customer base. Repeat purchases are frequent, and positive word-of-mouth further drives sales.
Audience Size: The business boasts an engaged email list of 8,500 subscribers and a growing social media following (5000+ on Instagram), providing ample opportunity for re-engagement and repeat sales.

Financials

Revenue and Profit: Over the past 12 months, Horizon generated £93,000 in revenue with a net profit around £10,000. During peak summer months, revenues exceeded £20,000, with profits ranging from £3,000–£5,000 in these periods.
Seasonal Trends: The business experiences strong seasonal spikes in the summer, driven by demand for trav`,
  },
  {
    id: `11790785`,
    title: `RetroCyclingGear.com`,
    revealedName: `RetroCyclingGear.com`,
    url: `https://flippa.com/11790785`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 100000.0,
    monthlyPL: [
      { month: `Apr 2024`, revenue: 6837.68, expenses: 2602.23, profit: 4235.45 },
      { month: `May 2024`, revenue: 21024.85, expenses: 11054.08, profit: 9969.5 },
      { month: `Jun 2024`, revenue: 32532.32, expenses: 19448.78, profit: 13084.81 },
      { month: `Jul 2024`, revenue: 36700.46, expenses: 20388.58, profit: 16311.88 },
      { month: `Aug 2024`, revenue: 34223.96, expenses: 21353.78, profit: 12870.18 },
      { month: `Sep 2024`, revenue: 37183.06, expenses: 25894.03, profit: 11290.3 },
      { month: `Oct 2024`, revenue: 19568.16, expenses: 7899.4, profit: 11668.76 },
      { month: `Nov 2024`, revenue: 8601.71, expenses: 4514.85, profit: 4088.13 },
      { month: `Dec 2024`, revenue: 6784.34, expenses: 2830.83, profit: 3954.78 },
      { month: `Jan 2025`, revenue: 2542.54, expenses: 906.78, profit: 1635.76 },
      { month: `Feb 2025`, revenue: 5593.08, expenses: 2835.91, profit: 2755.9 },
      { month: `Mar 2025`, revenue: 10509.25, expenses: 6455.41, profit: 4053.84 },
    ],
    avgMonthlyRevenue: 18508.0,
    avgMonthlyProfit: 7993.0,
    profitMargin: `43%`,
    annualRevenue: `GBP £174,884`,
    annualProfit: `| 25% Repeat Customers & 2.6x ROAS`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `China`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 58.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 63.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (RetroCyclingGear.com) — identified from listing description`,
      `Revenue declining sharply (-69.1% trend)`,
      `High revenue volatility (CV 70%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Meng Wang`,
      location: `Hong Kong`,
      verified: true,
    },
    socialMedia: [
      `1,806 followers`,
      `4,514 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,355 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £5,498 /month`,
      },
      {
        item: `Jersey cost`,
        amount: `GBP £1,355 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £550 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Organization Schema`,
      `Included.`,
      `1,793 followers`,
      `4,488 followers`,
      `0 followers`,
      `0 followers`,
      `0 subscribers`,
      `28,098 subscribers`,
      `Attachments`,
      `XLSX`,
      `www.retrocyclinggear.com - 副本`,
      `XLSX`,
      `www.retrocyclinggear.com - 副本`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `214,419`,
      totalPageViews: `128,522`,
      pagesPerSession: `4.62`,
      avgDuration: `00:00:51`,
      engagementRate: `0.64%`,
      topCountries: [
        {
          country: `United States`,
          views: 14632,
        },
        {
          country: `Germany`,
          views: 5989,
        },
        {
          country: `United Kingdom`,
          views: 5139,
        },
        {
          country: `Australia`,
          views: 4497,
        },
        {
          country: `China`,
          views: 743,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1967,
    watchers: 129,
    about: `Executive Summary

RetroCyclingGear.com is a well-positioned e-commerce brand specializing in retro-style cycling apparel. The business has established itself as a leader in the niche market, combining vintage aesthetics with modern performance materials to attract a dedicated customer base. With a proven revenue model, strong operational efficiency, and a scalable supply chain, the business presents an excellent acquisition opportunity for buyers looking to enter or expand in the sports and outdoor sector.

Business Overview Key Highlights:

Established Brand: Operating since 2017, with a dedicated niche in vintage cycling gear.
High-Growth E-commerce Model: Built on Shopify, benefiting from direct-to-consumer (DTC) sales.
Scalable Business: No inventory holding; orders are produced on demand, ensuring minimal overhead costs.
Multi-Channel Marketing: Driven by Facebook Ads, Google search, and repeat customers.
Consistent Performance: Strong revenue generation with high fulfillment rates.
Global Customer Base: Strong sales in US, UK, Germany, and France, with growth opportunities in other markets.

Operations & Business Model:

Direct Fulfillment Model: Orders are placed with two suppliers in China, eliminating the need for inventory storage.
Lean Operation: Only two employees manage the business—one for operations and marketing, another for packaging and shipping.
High Customer Retention: 25% of revenue comes from repeat customers.
Low Refund Rate: 0.0% refund rate, indicating high customer satisfaction and quality assurance.
Technology & Analytics: Shopify and`,
  },
  {
    id: `12378164`,
    title: `unboxingheaven.com`,
    revealedName: `unboxingheaven.com`,
    url: `https://flippa.com/12378164`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 68492.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 2801.62, expenses: 4390.39, profit: -1588.77 },
      { month: `Apr 2025`, revenue: 9329.42, expenses: 9245.6, profit: 83.82 },
      { month: `May 2025`, revenue: 12882.88, expenses: 10488.93, profit: 2393.95 },
      { month: `Jun 2025`, revenue: 20273.01, expenses: 16619.22, profit: 3653.79 },
      { month: `Jul 2025`, revenue: 29218.89, expenses: 23588.98, profit: 5629.91 },
      { month: `Aug 2025`, revenue: 18448.02, expenses: 13750.29, profit: 4697.73 },
      { month: `Sep 2025`, revenue: 19978.37, expenses: 16047.72, profit: 3930.65 },
      { month: `Oct 2025`, revenue: 15242.54, expenses: 11463.02, profit: 3779.52 },
      { month: `Nov 2025`, revenue: 14608.81, expenses: 11748.77, profit: 2860.04 },
      { month: `Dec 2025`, revenue: 8213.09, expenses: 8890.0, profit: -676.91 },
      { month: `Jan 2026`, revenue: 18291.81, expenses: 13761.72, profit: 4530.09 },
      { month: `Feb 2026`, revenue: 13270.23, expenses: 11193.78, profit: 2076.45 },
    ],
    avgMonthlyRevenue: 15213.0,
    avgMonthlyProfit: 2614.0,
    profitMargin: `17%`,
    annualRevenue: `with ~17% profit margins, while operating only 52 sale days per year. The brand has cultivated a highly engaged audience through limited Thursday product drops that routinely sell out within hours, supported by 7.5K Instagram followers, 9.6K TikTok followers, and 8.8K email subscribers. With lean inventory management, minimal operational overhead, and clear growth opportunities—such as additional drop days, influencer marketing, and subscription boxes—UnboxingHeaven offers a differentiated, turnkey eCommerce brand primed for scalable expansion.`,
    annualProfit: `GBP £24,700`,
    expensesLastMonth: `GBP £8,733 /month`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 63.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (unboxingheaven.com) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Ranib jamal`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `7,490 followers`,
      `9,680 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £8,733 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £5,059 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `7,490 followers`,
      `9,680 followers`,
      `8,835 subscribers`,
      `Attachments`,
      `XLSX`,
      `Profit and Loss Statement - Flippa (version 1)`,
      `XLSX`,
      `Profit and Loss Statement - Flippa`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 205,
    watchers: 17,
    about: `UnboxingHeaven.com – Highly Profitable & Scalable Lifestyle eCommerce Brand with Limited Sale-Window Model

Overview

UnboxingHeaven.com is a fast-rising UK-based lifestyle eCommerce brand leveraging the viral “unboxing” trend and a dynamic weekly drop model. Launched in 2020, the business has quickly established strong brand recognition, customer excitement, and unwavering loyalty by curating sell-out product drops that consistently generate urgency and buzz every Thursday. With only 52 sale days per year, the brand achieves GBP £143,747 in annual revenue and delivers reliable 17–18% profit margins, proving out an operationally efficient and low-stress business model.

Key Financials

Annual Revenue: GBP £143,747
Annual Profit: GBP £24,700
Monthly Revenue (Avg): GBP £11,978
Monthly Profit (Avg): GBP £2,058
Profit Margin: 17%
Profit Multiple: 3.2x
Revenue Multiple: 0.6x

Business Model & Highlights

Limited Drop Model: All sales occur only on Thursdays at 10am. Stock routinely sells out within hours.
Operational Simplicity: Minimal overhead, no daily fulfilment pressure, and no constant ad spend. Exceptionally efficient handling of inventory and shipments.
Customer Loyalty: A cultivated culture of anticipation drives high repeat purchase rates and low return rates.
Strong Digital Presence: 7,490 Instagram followers, 9,680 TikTok followers, and a robust 8,835-strong email subscriber list.
Brand Authority: Established domain (DA 9) and meaningful organic visibility in a highly engaged segment.

Growth Opportunities

Scale up Drops: Increase SKU volume or frequency (add a second weekly drop) to unlock higher revenue.
Subscriptions & Memberships: Launch mystery box or membership tiers for recurring revenue and even greater community stickiness.
Product Expansion: Venture into related lifestyle categories for broadened appeal and higher average order value.
Influencer & Paid Marketing: Leverage untapped influencer partnerships and performance marketing to reach new audiences quickly.

Operational Overview

4 Years Operating History: Stable, proven operations in the UK lifestyle & digital commerce sector.
Inventory & Fulfilment: Drop model keeps inventory lean, virtually eliminating unsold stock and cash flow strain.
Turnkey & Owner-Light: Highly systemised, requiring minimal daily management.

Assets Included in Sale

Premium domain: UnboxingHeaven.com
Complete website files and technology stack
Email subscriber list (8,835)
Social media accounts (Instagram, TikTok)
All current inventory (transfer negotiable)
Brand assets: logos, creatives, unique design/content
Supplier contracts and relationships
Email address, phone number(s), and full IP ownership

Why Acquire UnboxingHeaven.com?

Proven Demand & Scarcity-Driven Sales: Consistent sell-outs and appointment-based buying behaviour.
Low Complexity, High Margin: Simple operations, efficient cost control, and stress-free fulfilment cycles.
Immediate Scale Potential: Clear action steps available for the `,
  },
  {
    id: `11634253`,
    title: `Prowess: Women in Business`,
    revealedName: `Prowess: Women in Business`,
    url: `https://flippa.com/11634253`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 115657.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 5913.12, expenses: 67.31, profit: 5845.81 },
      { month: `Feb 2025`, revenue: 5815.33, expenses: 66.04, profit: 5749.29 },
      { month: `Mar 2025`, revenue: 5826.76, expenses: 0.0, profit: 5826.76 },
      { month: `Apr 2025`, revenue: 5059.68, expenses: 74.93, profit: 4984.75 },
      { month: `May 2025`, revenue: 5925.82, expenses: 0.0, profit: 5925.82 },
      { month: `Jun 2025`, revenue: 7607.3, expenses: 0.0, profit: 7607.3 },
      { month: `Jul 2025`, revenue: 5160.01, expenses: 120.65, profit: 5039.36 },
      { month: `Aug 2025`, revenue: 6614.16, expenses: 0.0, profit: 6614.16 },
      { month: `Sep 2025`, revenue: 3622.04, expenses: 10.16, profit: 3611.88 },
      { month: `Oct 2025`, revenue: 3271.52, expenses: 40.64, profit: 3230.88 },
      { month: `Nov 2025`, revenue: 1275.08, expenses: 0.0, profit: 1275.08 },
      { month: `Dec 2025`, revenue: 1405.89, expenses: 0.0, profit: 1405.89 },
    ],
    avgMonthlyRevenue: 4791.0,
    avgMonthlyProfit: 4760.0,
    profitMargin: `99%`,
    annualRevenue: `GBP £45,273`,
    annualProfit: `GBP £44,974`,
    expensesLastMonth: `GBP £31 /month`,
    ageYears: 24.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `highly`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 67.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 62.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -66% — Prowess: Women in Business`,
      `Revenue declining sharply (-66.1% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `111 transactions totalling USD $9,242,993`,
    },
    socialMedia: [
      `869 followers`,
      `127 followers`,
      `5,764 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £31 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Other`,
      `Unique content`,
      `Included.`,
      `869 followers`,
      `127 followers`,
      `5,764 followers`,
      `8,079 subscribers`,
      `Attachments`,
      `Prowess Sales Prospectus`,
      `XLSX`,
      `Annex 1. Prowess Financials`,
      `No comments`,
      `Managed by Flippa`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $155,238`,
      `USD $115,657`,
      `Reduced 25%`,
      `GBP £86,330`,
      `Contact Sell`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `20,868`,
      totalPageViews: `2,411`,
      pagesPerSession: `1.37`,
      avgDuration: `00:00:34`,
      engagementRate: `0.43%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 551,
        },
        {
          country: `Pakistan`,
          views: 479,
        },
        {
          country: `China`,
          views: 106,
        },
        {
          country: `India`,
          views: 78,
        },
        {
          country: `United States`,
          views: 75,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 3197,
    watchers: 149,
    about: `IMPORTANT NOTICE: 

Traffic has declined rapidly since the beginning of the year. Despite this, the site still benefits from solid SEO foundations, including a domain rating of 58 on Ahrefs.

This acquisition opportunity is best suited to someone with the right skill set - particularly an SEO expert - to revitalise and grow the business.

Key Highlights

See financials and full prospectus attached at the end of this page

24-year-old authority site supporting women in business; continuously online since 2001.

High SEO strength: DR58, 1,500+ referring domains, backlinks from major institutions (Wikipedia, The Guardian, .gov.uk, universities).

Strong search presence: 27.6M impressions and 30.7K clicks in the past 12 months; average position 14.1; CTR ~5%.

Low workload + high profitability: ~10 hours/week, minimal expenses, two-year profit history >£50k annually.

Simple, passive operational model: clients provide content; owner edits, publishes and invoices.

Major upside potential for SEO professionals, publishers, agencies, or women-in-business service providers.

Unutilised growth assets include:

8,079-subscriber email list

1,000+ CRM contacts incl. 635 past customers

Strong brand reputation within the UK women-in-business ecosystem

Retirement sale, presenting a rare opportunity to acquire a long-established, defensible authority brand with deep SEO equity.

Operations

Business Model:

Primary revenue from SEO article placements and backlink insertions.

Clients come organically through search or industry relationships.

Payments via PayPal (GBP/USD) and bank transfer.

Workflow (light and consistent):

Edit and upload client-supplied articles.

Source free-stock images.

Publish and invoice.

Chase late payments (<2% historic non-payment).

Occasional new in-house content to maintain freshness.

Time Requirement: ~10 hours/week covering uploads, emails, invoicing, light SEO refreshes.

Tools & Outsourcing:

Premium plugins: WP Rocket, Wordfence, GeneratePress.

Ad-hoc freelancer support (~£200–£300/yr).

Included Assets:

Full website & content library; 2,390 indexed pages.

Email list (8,079 subscribers).

CRM with 635 paid customers and additional prospects.

Social media accounts (Twitter, Facebook, Instagram).

Brand identity and operational templates.

Customers

Primary Audience: women entrepreneurs, small business owners, startup founders, business professionals.

Content themes include business, finance, technology, careers, and lifestyle for women.

Customer Base:

SEO agencies and consultants purchasing editorial placements.

Historic contacts via CRM (1,000+ warm leads).

Large dormant email list suitable for immediate reactivation.

Brand Positioning:

Trusted UK resource; long-standing credibility backed by government origins (original network for women’s enterprise).

Strong goodwill and recognition make the platform highly appealing for partners in the women-in-business and SME sectors.

Technology

SEO & Analytics Infras`,
  },
  {
    id: `12211534`,
    title: `Nutbags Grooming`,
    revealedName: `Nutbags Grooming`,
    url: `https://flippa.com/12211534`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 95200.0,
    monthlyPL: [
      { month: `Nov 2024`, revenue: 76363.83, expenses: 46551.85, profit: 29811.98 },
      { month: `Dec 2024`, revenue: 59452.51, expenses: 51428.65, profit: 8023.86 },
      { month: `Jan 2025`, revenue: 43084.75, expenses: 39725.6, profit: 3359.15 },
      { month: `Feb 2025`, revenue: 37749.48, expenses: 32936.18, profit: 4813.3 },
      { month: `Mar 2025`, revenue: 35543.49, expenses: 36075.62, profit: -532.13 },
      { month: `Apr 2025`, revenue: 36221.67, expenses: 37595.81, profit: -1374.14 },
      { month: `May 2025`, revenue: 24523.7, expenses: 22538.69, profit: 1985.01 },
      { month: `Jun 2025`, revenue: 22950.17, expenses: 18040.35, profit: 4909.82 },
      { month: `Jul 2025`, revenue: 23225.76, expenses: 17575.53, profit: 5650.23 },
      { month: `Aug 2025`, revenue: 25575.26, expenses: 19076.67, profit: 6498.59 },
      { month: `Sep 2025`, revenue: 21266.15, expenses: 12867.64, profit: 8397.24 },
      { month: `Oct 2025`, revenue: 17876.52, expenses: 14159.23, profit: 3717.29 },
    ],
    avgMonthlyRevenue: 35319.0,
    avgMonthlyProfit: 6272.0,
    profitMargin: `18%`,
    annualRevenue: `with strong margins and low overhead.`,
    annualProfit: `GBP £59,262`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 57.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 62.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian men's self-care D2C brand with physical products generating six-figure revenue; requires Australian-based inv`,
      `Revenue declining sharply (-63.8% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Will`,
      location: `United States`,
      verified: true,
      transactions: `2 transactions totalling USD $332,000`,
    },
    socialMedia: [
      `23,000 followers`,
      `4,400 followers`,
      `3,500 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,501 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £9,756 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £21,763 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `23,000 followers`,
      `4,400 followers`,
      `3,500 followers`,
      `23 subscribers`,
      `75,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Nutbags Grooming TTM and P&L`,
      `No comments`,
      `Show all`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 949,
    watchers: 93,
    about: `Key Highlights

5-year-old profitable DTC e-commerce brand in the growing men’s self-care niche.

Generates consistent six-figure annual revenue with strong margins and low overhead.

Built on Shopify with proven systems, established fulfillment, and reliable suppliers.

98k+ email database and highly engaged 72k active subscribers drive repeat sales.

Strong social media presence across multiple platforms with loyal community.

Minimal owner involvement (3–5 hrs/week)—mostly ad management and oversight.

Massive potential to scale globally, expand into wholesale, Amazon, or subscription models.

Operations

This is a lean, well-systemized online business that sells branded consumer products through its Shopify storefront. Revenue is generated via direct-to-consumer sales driven by paid media (Meta, Google) and automated email flows.
Day-to-day operations are light: the owner typically spends 3–5 hours per week managing ads, checking performance, approving content, and coordinating restocks with suppliers. Third-party partners handle fulfillment, bookkeeping, and customer support, allowing a smooth handover and easy management for a new owner.

Customers

The customer base consists primarily of men aged 20–45, focused on personal care and grooming. The brand has cultivated strong loyalty and repeat purchase behavior through consistent communication, excellent product quality, and lifestyle-driven marketing.
Customer acquisition is achieved through paid social, email marketing, and organic engagement on major platforms. The database of nearly 100k customers/subscribers provides a valuable asset for remarketing and retention. While currently focused on domestic and UK markets, there is clear demand and infrastructure readiness for international expansion.

Financials

The business maintains steady, profitable revenue, with seasonal peaks around Black Friday and Christmas. Margins are healthy due to strong brand positioning and favorable supplier terms. Inventory typically ranges from $45k–$100k in landed value, and advertising ROAS remains consistent year-round.
All financials are professionally managed in Xero with support from a long-term bookkeeper. The operation runs debt-free, with all business expenses and performance clearly documented.

Additional Notes

Founded in 2020 and launched in 2021, this brand has achieved remarkable traction within a short time—combining humor, authenticity, and strong product-market fit in a niche that continues to expand globally.
The owner is selling to redirect capital into another venture but is offering post-sale assistance.
With established branding, a sizable engaged audience, and untapped growth channels (Amazon, retail, subscription, new SKUs), this is an ideal opportunity for an investor or operator looking to scale an already successful e-commerce brand with strong fundamentals.`,
  },
  {
    id: `12196904`,
    title: `THE SALAD PEOPLE PTY LTD`,
    revealedName: `THE SALAD PEOPLE PTY LTD`,
    url: `https://flippa.com/12196904`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 49111.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 22360.89, expenses: 17740.63, profit: 4621.53 },
      { month: `Apr 2025`, revenue: 13139.42, expenses: 11478.26, profit: 1661.16 },
      { month: `May 2025`, revenue: 13346.43, expenses: 10520.68, profit: 2824.48 },
      { month: `Jun 2025`, revenue: 18152.11, expenses: 17077.69, profit: 1074.42 },
      { month: `Jul 2025`, revenue: 12627.61, expenses: 11314.43, profit: 1313.18 },
      { month: `Aug 2025`, revenue: 11367.77, expenses: 12131.04, profit: -762.0 },
      { month: `Sep 2025`, revenue: 12331.7, expenses: 11228.07, profit: 1103.63 },
      { month: `Oct 2025`, revenue: 22590.76, expenses: 21308.06, profit: 1282.7 },
      { month: `Nov 2025`, revenue: 30501.59, expenses: 23925.53, profit: 6576.06 },
      { month: `Dec 2025`, revenue: 10533.38, expenses: 9878.06, profit: 655.32 },
      { month: `Jan 2026`, revenue: 10163.81, expenses: 6221.73, profit: 3943.35 },
      { month: `Feb 2026`, revenue: 4185.92, expenses: 2584.45, profit: 1601.47 },
    ],
    avgMonthlyRevenue: 15108.0,
    avgMonthlyProfit: 2158.0,
    profitMargin: `14%`,
    annualRevenue: `GBP £142,758`,
    annualProfit: `GBP £20,390`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 62.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 62.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (THE SALAD PEOPLE PTY LTD) — identified from listing description`,
      `Revenue declining sharply (-49.1% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `8,800 followers`,
      `2,420 followers`,
      `366 followers`,
    ],
    expenses: [
      {
        item: `Shipping Expenses`,
        amount: `GBP £1,649 /month`,
      },
      {
        item: `Marketing Spend`,
        amount: `GBP £2,189 /month`,
      },
      {
        item: `Subscriptions`,
        amount: `GBP £743 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £122 /month`,
      },
      {
        item: `Merchant Fees`,
        amount: `GBP £198 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £38,853 Excluded from sale price`,
      `Included.`,
      `8,800 followers`,
      `2,420 followers`,
      `366 followers`,
      `1,440 subscribers`,
      `12,712 subscribers`,
      `Attachments`,
      `XLSX`,
      `Salad Table Feb 2026 P&L`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `55,838`,
      totalPageViews: `24,458`,
      pagesPerSession: `4.54`,
      avgDuration: `00:00:58`,
      engagementRate: `0.88%`,
      topCountries: [
        {
          country: `Australia`,
          views: 6863,
        },
        {
          country: `United States`,
          views: 474,
        },
        {
          country: `China`,
          views: 163,
        },
        {
          country: `Singapore`,
          views: 58,
        },
        {
          country: `India`,
          views: 21,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1123,
    watchers: 92,
    about: `About The Salad Table 

The Salad Table is a proudly Australian family business with humble beginnings and a powerful vision — to create the farmer in everyone. 

Born in a backyard shed in Coominya, QLD, in 2013, The Salad Table started as a passion project by husband-and-wife duo Denis and Karen Matthews. Frustrated by how long it took for fresh produce to reach supermarket shelves — Denis set out to make it possible for anyone, anywhere, to grow their own fresh herbs and vegetables at home. 

What began as hand-built hydroponic systems sold through Facebook and word of mouth quickly gained traction. Despite working two other jobs, Denis kept refining his designs, and soon, sales grew organically to $20K–$30K annually, peaking at $50K in 2020. The concept was simple yet powerful — a compact, easy-to-use hydroponic system that delivered the freshness, flavour, and satisfaction of homegrown produce without the hassle. 

In 2022, Denis partnered with entrepreneur Klaeton Sheehan, who recognised the brand’s enormous potential. Together, they scaled operations, transitioning manufacturing to China for consistency and growth while preserving the authenticity and heart of the original idea. 

Today, The Salad Table has grown into a fast-rising Australian home-growing brand — a high-performing eCommerce business generating over $275K per year. Many customers continue to buy from The Salad Table beyond their first purchase, regularly returning for essential growing supplies like nutrients, grow cubes, and other accessories, ensuring a strong repeat customer base. From kitchens and balconies to backyards across the country, Australians of all ages — from children to seniors — are discovering the joy of growing their own food with The Salad Table. 

A Brand Built for Growth 

The Salad Table stands at the intersection of authenticity and opportunity — a trusted, proven brand ready to thrive in the global movement toward self-sufficiency and sustainable living. 

Why You Should Buy This Business 

Proven foundation with room to scale: A strong operational base, growing sales, and streamlined manufacturing in China make this an ideal acquisition for expansion. 

Recurring revenue potential: Customers don’t just buy once — they regularly return for nutrients, grow cubes, and accessories, ensuring continuous income. The business model is similar to that of a printer and its ink — customers purchase the Salad Table once, but continue buying nutrients, grow cubes, and other essentials regularly to keep their system running. 

Expanding market: With the rising cost of living in Australia, more households are seeking affordable, self-sufficient ways to grow their own food. The Salad Table fits perfectly into this trend, allowing families to enjoy fresh, healthy produce at a fraction of supermarket costs. Beyond Australia, the global demand for health, sustainability, and urban gardening continues to expand, creating strong opportunities for international growth. `,
  },
  {
    id: `12259051`,
    title: `SuperVee Tremolo Systems`,
    revealedName: `SuperVee Tremolo Systems`,
    url: `https://flippa.com/12259051`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 192000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 11005.82, expenses: 3285.49, profit: 7720.33 },
      { month: `Apr 2025`, revenue: 12901.93, expenses: 3294.38, profit: 9606.28 },
      { month: `May 2025`, revenue: 6805.93, expenses: 3167.38, profit: 3638.55 },
      { month: `Jun 2025`, revenue: 5875.02, expenses: 3153.41, profit: 2721.61 },
      { month: `Jul 2025`, revenue: 7381.24, expenses: 3196.59, profit: 4184.65 },
      { month: `Aug 2025`, revenue: 9893.3, expenses: 3232.15, profit: 6662.42 },
      { month: `Sep 2025`, revenue: 4864.1, expenses: 3112.77, profit: 1751.33 },
      { month: `Oct 2025`, revenue: 9820.91, expenses: 3216.91, profit: 6604.0 },
      { month: `Nov 2025`, revenue: 3822.7, expenses: 3108.96, profit: 713.74 },
      { month: `Dec 2025`, revenue: 8865.87, expenses: 3205.48, profit: 5660.39 },
      { month: `Jan 2026`, revenue: 7998.46, expenses: 2943.86, profit: 5054.6 },
      { month: `Feb 2026`, revenue: 6252.21, expenses: 2062.48, profit: 4189.73 },
    ],
    avgMonthlyRevenue: 7957.0,
    avgMonthlyProfit: 4876.0,
    profitMargin: `61%`,
    annualRevenue: `GBP £75,188`,
    annualProfit: `GBP £46,070`,
    ageYears: 21.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `CO, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 72.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 62.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (SuperVee Tremolo Systems) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `102 transactions totalling USD $56,906,392`,
    },
    socialMedia: [
      `6,700 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £98 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £83 /month`,
      },
      {
        item: `Packaging`,
        amount: `GBP £32 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £25,515 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `6,700 followers`,
      `10,100 subscribers`,
      `Attachments`,
      `XLSX`,
      `SuperVee Monthly P&L`,
      `XLSX`,
      `SuperVee Monthly P&L`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `21,596`,
      totalPageViews: `8,354`,
      pagesPerSession: `3.02`,
      avgDuration: `00:00:51`,
      engagementRate: `0.46%`,
      topCountries: [
        {
          country: `United States`,
          views: 5161,
        },
        {
          country: `United Kingdom`,
          views: 304,
        },
        {
          country: `China`,
          views: 262,
        },
        {
          country: `Canada`,
          views: 215,
        },
        {
          country: `Singapore`,
          views: 124,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2321,
    watchers: 114,
    about: `Key Highlights

High performance "drop-in" hardware upgrades for all Strat and Tele guitars.
Engineered, technically advanced products covered under 3 US patents.
Our bridges dramatically improve tone, sustain and tuning stability.
E-commerce sales all over the world with 25K+ units sold.
Simply put, we make guitars play better and sound better.

Operations

We design, build and market custom electric guitar bridges to thousands of guitarists world-wide. We ship to every country in the world..  Simply stated, our products make guitars play better and sound better. Using a solid engineering design. we have patented products including the BladeRunner bridge (designed for Strats and Strat copies), the Maverick bridge (designed for Tele's and Tele copies) , the newly re-designed Maglok tremolo stablizer (keeps guitar in tune during string bends) and our one-of-a kind SuperVee Custom Shop.  We are the only company that offers full customization of guitar bridges including 5 different finishes, 4 choices of saddles, 3 choices in tone blocks combined with a wide variety of tremolo arms.  Built exactly like the customer wants it.   This turnkey operation comes with established supply chains and parts suppliers. ready to go.  The entire operation can be run with just two part time employees working just 2 days per week. 

Customers

Our customers are discriminating and professional musicians that understand quality design.  Many customers perform live and own 7+ guitars or more. Trusted performance on stage or off.  We have a long list of well known musicians that use our products including Eric Johnson, Brad Whitford, Jimmy Page, Eric Gales, Mayavi, and Joe Walsh- to just name a few.  We have some customers that have purchased 10 or more bridges for all their guitars and dozens of boutique builders that use our BladeRunner bridge.  Fender Japan buys our Maverick bridge for a custom Mayavi-designed Tele.

Financials

It takes many years to get established in the aftermarket guitar hardware business and SuperVee has done the hard work already. Guitarists are very particular about their prize guitars.  Our "drop-in" design requires no permanent modifications so even rare guitars can be returned back to original.

  We have had many back to back fantastic sales years.  We also believe that in the right hands the best years are yet to come.  For example, a lower cost version of the product , would open the doors to OEM opportunities- easily exceeding 1000 units per month.   SuperVee just put an agreement in place with a major distributor to sell  an estimated 100 Magloks per month.  All that aside, our last 3 years of sales have been negatively impacted by the loss of one our founders (for health reasons) on the marketing side of the business.   The other owner/founder is ready to retire.  A great opportunity awaits for a new owner that has a vision for SuperVee.     A few or our competitors are going strong after 60 or more years so SuperVee has just scratch`,
  },
  {
    id: `11936054`,
    title: `Forget Me Not Oils Europe`,
    revealedName: `Forget Me Not Oils Europe`,
    url: `https://flippa.com/11936054`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 133200.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 9122.41, expenses: 3877.31, profit: 5245.1 },
      { month: `Apr 2025`, revenue: 7499.35, expenses: 7961.63, profit: -463.55 },
      { month: `May 2025`, revenue: 8962.39, expenses: 5849.62, profit: 3112.77 },
      { month: `Jun 2025`, revenue: 6466.84, expenses: 2670.81, profit: 3796.03 },
      { month: `Jul 2025`, revenue: 7910.83, expenses: 3369.31, profit: 4541.52 },
      { month: `Aug 2025`, revenue: 6852.92, expenses: 7879.08, profit: -1026.16 },
      { month: `Sep 2025`, revenue: 8774.43, expenses: 5068.57, profit: 3705.86 },
      { month: `Oct 2025`, revenue: 12651.74, expenses: 8435.34, profit: 4216.4 },
      { month: `Nov 2025`, revenue: 19297.65, expenses: 4230.37, profit: 15067.28 },
      { month: `Dec 2025`, revenue: 7701.28, expenses: 3006.09, profit: 4695.19 },
      { month: `Jan 2026`, revenue: 9316.72, expenses: 6837.68, profit: 2479.04 },
      { month: `Feb 2026`, revenue: 7334.25, expenses: 2589.53, profit: 4744.72 },
    ],
    avgMonthlyRevenue: 9324.0,
    avgMonthlyProfit: 4176.0,
    profitMargin: `45%`,
    annualRevenue: `and maintains a healthy 42% profit margin, backed by a 70% customer return rate and a loyal, growing audience.`,
    annualProfit: `GBP £39,460`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Spain`,
    platform: `fees`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 72.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 62.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Award-winning Spanish fragrance oil brand selling physical products across Europe with local supplier/fulfillment relati`,
    ],
    greenFlags: [],
    seller: {
      name: `Julie`,
      location: `United Kingdom`,
      verified: true,
    },
    socialMedia: [
      `761 followers`,
      `2,445 followers`,
      `58 followers`,
      `201 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,234 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £353 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £332 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £100 /month`,
      },
      {
        item: `Remote Staff Member`,
        amount: `GBP £275 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Google Cloud Functions`,
      `761 followers`,
      `2,445 followers`,
      `58 followers`,
      `201 followers`,
      `55 subscribers`,
      `3,560 subscribers`,
      `Attachments`,
      `XLSX`,
      `1767795744-1944370357975`,
    ],
    postSaleSupport: `Included. There would be 1 month of support afterwards, but i am very happy to help ad hoc for a further 6 months`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `53,429`,
      totalPageViews: `38,461`,
      pagesPerSession: `5.49`,
      avgDuration: `00:00:57`,
      engagementRate: `0.67%`,
      topCountries: [
        {
          country: `Spain`,
          views: 22856,
        },
        {
          country: `Germany`,
          views: 1137,
        },
        {
          country: `(not set)`,
          views: 379,
        },
        {
          country: `United States`,
          views: 376,
        },
        {
          country: `China`,
          views: 135,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2712,
    watchers: 127,
    about: `Forget Me Not Oils Europe: Business Overview

Forget Me Not Oils Europe is a well-established, award-winning Spanish fragrance oil brand serving the vibrant home fragrance and candle-making community across Europe. With a strong foundation built over five years, the brand generates over $124,000 in annual revenue and maintains a healthy 42% profit margin, backed by a 70% customer return rate and a loyal, growing audience.

Renowned for premium-quality fragrance oils and top-tier customer service, the business combines direct-to-consumer eCommerce with a thriving presence on Faire and a 1,700-member VIP community. Forget Me Not Oils Europe is more than a store—it’s a trusted, niche lifestyle brand with exceptional retention, high average order value, and scalable operations.

Key Financials (12 Months Ending January 2026)

Annual Revenue: USD $124,771
Annual Profit: USD $53,002
Monthly Revenue (Avg): USD $10,397
Monthly Profit (Avg): USD $4,417
Profit Margin: 42%
Orders: 1,136
Customers: 6,983
Average Order Value (AOV): USD $125.00
Average Items per Order: 4.0
Fulfilment Rate: 99.6%
Refund Rate: 0.0%
Email Subscribers: 6,828

Business Model & Operations

Forget Me Not Oils operates on a product-based direct-to-consumer eCommerce model through its Shopify storefront, with parallel wholesale revenue generated via Faire. The brand fulfills orders internally and maintains strong supplier relationships to ensure consistent quality and restock speed.

Operations are streamlined and partially delegated to a highly capable remote assistant, enabling the business to run with minimal owner oversight. The business can be run fully remotely or from anywhere within Europe. Daily tasks include processing orders, managing stock, answering customer queries, and overseeing marketing communications.

Monthly operating expenses remain modest, with costs allocated primarily to shipping, marketing, warehousing, and staffing.

Customer Base & Market Reach

70% of the customer base is located in Spain, with the remaining orders distributed across Europe. This strong regional presence—especially in the high-value niche of candle and wax product creators—has produced a loyal following, reflected in a 70% repeat purchase rate.

With over 6,983 customers and a highly engaged audience, the brand benefits from strong retention and word-of-mouth referrals. The email subscriber base of over 6,800 and active VIP community of 1,700 members further enhance customer lifetime value and offer a direct channel for future promotions, product launches, and education-based sales.

Marketing & Traffic

Traffic to the site averages over 35,000 page views per month, with top acquisition channels including organic search (39%), direct traffic (24%), and paid social (13%). With an average of 5.5 pages per session and a high engagement duration, the site shows strong user interaction and buyer intent.

The brand’s authority score of 10, combined with consistent content, a learning academy, and`,
  },
  {
    id: `11912957`,
    title: `effectivenp.com`,
    revealedName: `effectivenp.com`,
    url: `https://flippa.com/11912957`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 185600.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 9805.67, expenses: 960.12, profit: 8845.55 },
      { month: `Feb 2025`, revenue: 14559.28, expenses: 847.09, profit: 13712.19 },
      { month: `Mar 2025`, revenue: 13357.86, expenses: 11142.98, profit: 2214.88 },
      { month: `Apr 2025`, revenue: 10744.2, expenses: 8628.38, profit: 2115.82 },
      { month: `May 2025`, revenue: 8037.83, expenses: 2868.93, profit: 5168.9 },
      { month: `Jun 2025`, revenue: 9446.26, expenses: 7920.99, profit: 1525.27 },
      { month: `Jul 2025`, revenue: 10604.5, expenses: 5591.81, profit: 5012.69 },
      { month: `Aug 2025`, revenue: 7099.3, expenses: 5591.81, profit: 1507.49 },
      { month: `Sep 2025`, revenue: 7720.33, expenses: 3836.67, profit: 3883.66 },
      { month: `Oct 2025`, revenue: 9133.84, expenses: 5734.05, profit: 3399.79 },
      { month: `Nov 2025`, revenue: 10345.42, expenses: 4384.04, profit: 5961.38 },
      { month: `Dec 2025`, revenue: 9690.1, expenses: 7541.26, profit: 2148.84 },
    ],
    avgMonthlyRevenue: 10045.0,
    avgMonthlyProfit: 4625.0,
    profitMargin: `46%`,
    annualRevenue: `GBP £94,918`,
    annualProfit: `GBP £43,699`,
    ageYears: 22.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `IN, United States`,
    platform: `to`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 76.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 62.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US health supplement e-commerce store founded 2004 with direct shipping model. Physical product inventory and US regulat`,
    ],
    greenFlags: [],
    seller: {
      name: `Mark Workman`,
      location: `United States`,
      verified: true,
      transactions: `1 transaction totalling USD $235,000`,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,251 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £375 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £750 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £52,531 Excluded from sale price`,
      `Organization Schema`,
      `Included.`,
      `Attachments`,
      `XLSX`,
      `ENP - PL 2022`,
      `XLSX`,
      `ENP PL 2023`,
      `XLSX`,
      `2024 Effective Natural Products_Profit and Loss`,
      `XLSX`,
      `2025 Effective Natural Products_Profit and Loss`,
      `No comments`,
      `Show all`,
      `Open for`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 6039,
    watchers: 544,
    about: `**Key Highlights**

EffectiveNP.com is a prominent player in the health and supplement e-commerce sector, leveraging a robust online platform to deliver an array of products directly to the consumer. Established in 2004, the company has consistently expanded its operations, capitalizing on both traditional e-commerce and direct shipping models to carve out a distinctive niche within the market. This strategic focus has allowed the business to effectively compete with both established brands and emerging players in the digital retail space.

**Operations**

The operational prowess of EffectiveNP.com is underscored by its diverse revenue channels, which together contribute to a comprehensive business model aimed at maximizing reach and profitability. Predominantly, the company operates through its e-commerce store, which serves as the primary engine for sales of health supplements. 

In addition to its direct online sales, EffectiveNP.com leverages direct shipping as a strategic channel, ensuring that customers receive products without intermediaries, thereby enhancing customer satisfaction and retention. This method streamlines the supply chain and requires little time from the owner.  

To amplify its market presence, the company collaborates with major retail platforms such as Amazon Seller, Walmart, and Square, broadening its reach and tapping into diverse consumer bases. These partnerships are pivotal, enabling EffectiveNP.com to diversify its sales channels and mitigate risks associated with reliance on a single stream.

**Customers**

EffectiveNP.com has a loyal customer base based on a commitment to quality and customer service excellence. Its clientele spans various consumer segments, individuals and retailers seeking premium supplements. The company has also expanded effectively into liquid supplement products for pets - canine, feline and equine.

The business places a strong emphasis on customer engagement, utilizing feedback mechanisms and analytics to refine its offerings and personalize the shopping experience. This approach not only drives repeat business but also fosters word-of-mouth referrals, contributing to sustainable growth.

**Technology**

The technological infrastructure at EffectiveNP.com is integral to its operations and competitive advantage. The company employs Shopify as its e-commerce backbone, facilitating scalable and secure transactions. Payment processing is streamlined through Stripe, ensuring a seamless and trustworthy checkout experience for customers.

EffectiveNP.com harnesses the power of`,
  },
  {
    id: `12246350`,
    title: `croom-sanitair.nl`,
    revealedName: `croom-sanitair.nl`,
    url: `https://flippa.com/12246350`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 179995.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 34060.13, expenses: 30713.68, profit: 3347.72 },
      { month: `Apr 2025`, revenue: 25986.74, expenses: 20908.01, profit: 5078.73 },
      { month: `May 2025`, revenue: 27379.93, expenses: 22148.8, profit: 5229.86 },
      { month: `Jun 2025`, revenue: 25924.51, expenses: 21518.88, profit: 4405.63 },
      { month: `Jul 2025`, revenue: 20990.56, expenses: 19062.7, profit: 1927.86 },
      { month: `Aug 2025`, revenue: 15681.96, expenses: 15553.69, profit: 128.27 },
      { month: `Sep 2025`, revenue: 20497.8, expenses: 14215.11, profit: 6282.69 },
      { month: `Oct 2025`, revenue: 22147.53, expenses: 14879.32, profit: 7268.21 },
      { month: `Nov 2025`, revenue: 18859.5, expenses: 15466.06, profit: 3393.44 },
      { month: `Dec 2025`, revenue: 15816.58, expenses: 15469.87, profit: 346.71 },
      { month: `Jan 2026`, revenue: 23693.12, expenses: 17609.82, profit: 6083.3 },
      { month: `Feb 2026`, revenue: 23693.12, expenses: 17131.03, profit: 6562.09 },
    ],
    avgMonthlyRevenue: 22894.0,
    avgMonthlyProfit: 4171.0,
    profitMargin: `18%`,
    annualRevenue: `GBP £216,323`,
    annualProfit: `GBP £39,412`,
    expensesLastMonth: `GBP £4,691 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Netherlands`,
    platform: `visibility`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 76.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 62.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Dutch DTC e-commerce brand selling taps and sinks (sanitary hardware) in the Netherlands. Physical goods, local European`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: false,
    },
    socialMedia: [
      `471 followers`,
      `900 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £4,691 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £19,819 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `471 followers`,
      `900 followers`,
      `10,500 subscribers`,
      `Attachments`,
      `Screenshot 2026-03-02 at 14.42.43`,
      `Screenshot 2026-03-02 at 14.44.34`,
      `Screenshot 202`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 485,
    watchers: 24,
    about: `Croom Sanitair is a design focused, digitally native sanitary brand operating within the Home and Living segment in the Netherlands. Established in 2020, the company has built a scalable ecommerce foundation centered around a focused assortment of taps and sinks, combining modern aesthetics with competitive pricing.

The brand operates through a direct to consumer webshop as well as selected high value marketplaces, creating diversified revenue streams and strong platform visibility. This multi channel presence enhances brand recognition, reduces dependency on a single sales channel and strengthens long term scalability.

Croom Sanitair positions itself in the affordable design segment. By leveraging efficient supply chain partnerships and a lean operational model, the business maintains healthy margins while offering sharp consumer pricing. The company avoids showroom overhead and operates with a streamlined inventory strategy, contributing to capital efficiency and operational flexibility.

Core Strengths

Focused product category with clear positioning in taps and sinks
Competitive pricing strategy within a design oriented segment
Operational efficiency through digital infrastructure
Presence across both owned ecommerce and established marketplaces
Strong foundation for international expansion
Brand built around trust and reliability, supported by verified customer reviews

Technology and Infrastructure

Croom Sanitair operates on a robust Shopify based ecommerce infrastructure, enabling scalability, international expansion and efficient inventory management. Data driven decision making is supported through analytics integration, allowing continuous optimization of performance marketing, customer acquisition and conversion rates.

Growth Potential

The brand is strategically positioned for geographic expansion into international markets. With a proven digital model, marketplace integration and a focused product range, Croom Sanitair offers strong potential for scaling through:

Expansion into additional European marketplaces
Broader B2B penetration within installation and project markets
Product line extensions within adjacent sanitary categories
International localized storefront launches

The operational model is asset light, scalable and well suited for integration into a larger ecommerce portfolio or strategic buyer ecosystem.

Investment Rationale

Croom Sanitair represents an opportunity to acquire a lean, digitally structured sanitary brand with:

Established market presence
Clear category focus
Efficient supply model
Multi channel distribution
Strong margin potential
International scalability

The brand combines accessible design positioning with operational discipline, making it well positioned for accelerated growth under new ownership.`,
  },
  {
    id: `11941404`,
    title: `Ecommerce | Sales Spy tool`,
    revealedName: `Ecommerce | Sales Spy tool`,
    url: `https://flippa.com/11941404`,
    type: `saas`,
    dataLevel: `stats`,
    askingPrice: 149000.0,
    avgMonthlyRevenue: 3176.0,
    avgMonthlyProfit: 2899.0,
    profitMargin: `91%`,
    annualRevenue: `GBP £30,018`,
    annualProfit: `GBP £27,390`,
    expensesLastMonth: `GBP £218 /month`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    churn: `20%`,
    subscribers: `80`,
    country: `DE, United States`,
    platform: `that`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 60,
      operatorIndependence: 83.3,
      roi: 40,
      growthPotential: 80,
      overall: 62.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
    ],
    greenFlags: [],
    seller: {
      name: `Harvi`,
      location: `United Kingdom`,
      verified: true,
      transactions: `2 transactions totalling USD $177,998`,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £218 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `80,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `Shalom Dec 31, 2025 04:48 AM`,
      `as well can you please provide more detailed P&L`,
      `Report this comment Reply`,
      `Show all`,
    ],
    postSaleSupport: `included`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Shalom`,
        date: `Dec 31, 2025 04:48 AM`,
        text: `HI,
Why did the page/site visitors plunged so dramatically in the past few months?
as well can you please provide more detailed P&L`,
      },
    ],
    ga: {
      users: `33,136`,
      totalPageViews: `4,365`,
      pagesPerSession: `1.27`,
      avgDuration: `00:00:09`,
      engagementRate: `0.36%`,
      topCountries: [
        {
          country: `Morocco`,
          views: 457,
        },
        {
          country: `United Kingdom`,
          views: 311,
        },
        {
          country: `United States`,
          views: 281,
        },
        {
          country: `France`,
          views: 125,
        },
        {
          country: `China`,
          views: 75,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2346,
    watchers: 52,
    commentCount: 1,
    about: `Business Overview

Spysales is a profitable, fully automated SaaS platform that tracks and analyzes sales for any Shopify store, providing real-time and historical insights with approximately 90% accuracy—effectively acting as the backend for competitive intelligence. Founded in 2022 (site launched ~2023), it operates remotely from Delaware, USA, serving a global e-commerce market. The platform uniquely combines live sales data, top-product rankings, pricing insights, and trend analysis—all with zero ongoing maintenance.

Operational Excellence

Fully automated system; owner involvement limited to server upkeep
0% support costs; no manual intervention required
Integrated via Stripe,`,
  },
  {
    id: `11933850`,
    title: `trendingus.com`,
    revealedName: `trendingus.com`,
    url: `https://flippa.com/11933850`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 49000.0,
    avgMonthlyRevenue: 3813.0,
    avgMonthlyProfit: 3454.0,
    profitMargin: `91%`,
    annualRevenue: `GBP £36,021`,
    annualProfit: `GBP £32,644`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `India`,
    platform: `since`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
    ],
    greenFlags: [],
    seller: {
      name: `Suraj`,
      location: `India`,
      verified: true,
    },
    expenses: [
      {
        item: `Content writing and editors`,
        amount: `GBP £259 /month`,
      },
      {
        item: `Cloud Server`,
        amount: `GBP £23 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `WordPress 6.6`,
      `Included.`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $135,000`,
      `USD $49,000`,
      `Reduced 64%`,
      `GBP £36,772`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $980*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
      `This quality l`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `958,705`,
      totalPageViews: `143,170`,
      pagesPerSession: `1.25`,
      avgDuration: `00:00:16`,
      engagementRate: `0.98%`,
      topCountries: [
        {
          country: `India`,
          views: 52967,
        },
        {
          country: `United States`,
          views: 5123,
        },
        {
          country: `China`,
          views: 3661,
        },
        {
          country: `Pakistan`,
          views: 3178,
        },
        {
          country: `Bangladesh`,
          views: 1513,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1637,
    watchers: 40,
    about: `The Business industry continues to evolve, and TrendingUS has positioned itself as a reputable online platform since its establishment in 2015. With a focus on Content & Publishing, the website has generated steady annual revenue of $48,000, boasting an impressive profit margin of 90%+. TrendingUS has established itself as a trusted source for engaging content, attracting a diverse audience and generating consistent revenue streams.

Driven by its dedicated team, TrendingUS has achieved 120,000 organic traffic every month with a Domain Authority of 61, showcasing its strong online presence and credibility within the industry. The platform's content strategy has effectively resonated with its audience, leading to a loyal following and high engagement rates. With a focus on quality content and user experience, TrendingUS has created a compelling digital destination that offers valuable insights and entertainment to its visitors.

As the digital landscape continues to expand, TrendingUS presents a unique opportunity for growth and expansion within the Content & Publishing sector. With a proven track record of success and a strong foundation, this business is poised to capitalize on emerging trends and new revenue opportunities. TrendingUS represents a valuable investment for entrepreneurs looking to enter the dynamic world of online publishing and content creation.`,
  },
  {
    id: `12026246`,
    title: `Reasons To Skip The Housework`,
    revealedName: `Reasons To Skip The Housework`,
    url: `https://flippa.com/12026246`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 55000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 6323.33, expenses: 36.83, profit: 6287.77 },
      { month: `Feb 2025`, revenue: 6678.93, expenses: 36.83, profit: 6643.37 },
      { month: `Mar 2025`, revenue: 5066.03, expenses: 36.83, profit: 5029.2 },
      { month: `Apr 2025`, revenue: 4187.19, expenses: 36.83, profit: 4150.36 },
      { month: `May 2025`, revenue: 4013.2, expenses: 36.83, profit: 3977.64 },
      { month: `Jun 2025`, revenue: 1985.01, expenses: 36.83, profit: 1949.45 },
      { month: `Jul 2025`, revenue: 2992.12, expenses: 36.83, profit: 2956.56 },
      { month: `Aug 2025`, revenue: 2301.24, expenses: 36.83, profit: 2264.41 },
      { month: `Sep 2025`, revenue: 1247.14, expenses: 36.83, profit: 1210.31 },
      { month: `Oct 2025`, revenue: 535.94, expenses: 36.83, profit: 499.11 },
      { month: `Nov 2025`, revenue: 1883.41, expenses: 36.83, profit: 1846.58 },
      { month: `Dec 2025`, revenue: 1620.52, expenses: 36.83, profit: 1583.69 },
    ],
    avgMonthlyRevenue: 3236.0,
    avgMonthlyProfit: 3200.0,
    profitMargin: `99%`,
    annualRevenue: `GBP £30,577`,
    annualProfit: `GBP £30,235`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `WA, United States`,
    platform: `to`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -78% — Reasons To Skip The Housework`,
      `Revenue declining sharply (-77.6% trend)`,
      `High revenue volatility (CV 60%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Jean Renaud Desvernay`,
      location: `United States`,
      verified: true,
      transactions: `2 transactions totalling USD $59,500`,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `87,800 followers`,
    ],
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £36 /month`,
      },
      {
        item: `Domain name`,
        amount: `GBP £2 /month`,
      },
      {
        item: `Full Domain Protection`,
        amount: `GBP £2 /month`,
      },
      {
        item: `WP Rocket`,
        amount: `GBP £6 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `WordPress 6.8`,
      `Included.`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `87,800 followers`,
      `Attachments`,
      `Raptive-payment`,
      `PAYPAL_9:30:25 - 10:31:25`,
      `PAYPAL_8:31:25 - 9:30:25`,
      `PAYPAL_7:31:25 - 8:31:25`,
      `PAYPAL_6:30:25 - 7:31:25`,
      `PAYPAL_5:31:25 - 6:30:25`,
      `PAYPAL_4:30`,
    ],
    postSaleSupport: `from the seller`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Zack Hall`,
        date: `Dec 18, 2025 03:20 PM`,
        text: `Can you explain the sudden steep decline in page views and revenue over the course of this year?`,
      },
    ],
    ga: {
      users: `186,420`,
      totalPageViews: `22,128`,
      pagesPerSession: `1.63`,
      avgDuration: `00:00:52`,
      engagementRate: `0.61%`,
      topCountries: [
        {
          country: `China`,
          views: 11128,
        },
        {
          country: `United States`,
          views: 10668,
        },
        {
          country: `Singapore`,
          views: 8129,
        },
        {
          country: `United Kingdom`,
          views: 1648,
        },
        {
          country: `(not set)`,
          views: 751,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 862,
    watchers: 41,
    commentCount: 1,
    about: `Reasons To Skip The Housework: Business Overview

Reasons To Skip The Housework is a high-margin, low-maintenance content business generating consistent profits from a loyal, home-focused audience. Launched in 2011 and operated under its current monetization model for the past 2 years, the site delivers seasonal and evergreen lifestyle content in the home, DIY, and recipe categories. It earns 99% net margins and nearly $4,000/month in pure profit through a mix of AdThrive display ads, guest posting fees, and affiliate commissions — all while requiring minimal ongoing effort.

With over 261,000 pageviews in the past year, 10,500+ keywords ranked, and 87,800 Pinterest followers, the site benefits from strong organic visibility and growing social momentum. For a buyer seeking a hands-free revenue stream, a content portfolio addition, or a platform to scale further via social and SEO, this site presents a rare opportunity.

Key Financials (Trailing Twelve Months Ending November 2025)

Annual Revenue: USD $46,528
Annual Profit: USD $46,072
Average Monthly Profit: USD $3,839
Profit Margin: 99%
Profit Multiple: 1.8x
Revenue Multiple: 1.8x
Top Earning Month: USD $7,266 (Dec 2024)
Lowest Earning Month: USD $524 (Oct 2025)

Monetization

Reasons To Skip The Housework monetizes through three primary streams:
Advertising: The site is approved by AdThrive, the highest-paying display ad network in the industry. RPMs average $28.18 across devices, with mobile traffic earning $28.20 RPM and tablet RPMs peaking at $29.75. Ads are well-optimized across formats including video, footer, and sticky placements.
Guest Posting: Brands and writers pay to publish sponsored articles. This provides recurring revenue, new content, and SEO benefits, while allowing the owner to maintain control over editorial quality.
Affiliate Links: Primarily Amazon Associates, with curated product mentions integrated organically into content. While not the main income driver today, affiliate earnings offer scalable upside through improved placement and volume.

Traffic & Audience

The site receives 21,800 monthly pageviews and has had 199,842 unique users over the past year. Readers primarily come from the United States, followed by China, Canada, the UK, and Singapore.

Top Channels:

Direct: 48%
Organic Social: 27%
Organic Search: 17%
Email: 7.4%

Notably, Pinterest drives a major share of social traffic. With 87,800 followers and hundreds of pins already live, Pinterest is a proven growth engine for both content distribution and monetization. Organic Search brings in 47% of non-direct sessions, with the highest engagement rate (61.4%) and longest average session duration (1:01). The site’s returning visitor base and 10.5K ranked keywords signal strong brand and content authority.

SEO & Domain Strength

Domain Authority: 27
Backlinks: 19,500
Referring Domains: 6,250
Total Indexed Keywords: 10,500+
Top Organic Keywords: “Easy Snacks to Make in 5 Minutes”, “Christmas Dinner Ideas”, “April `,
  },
  {
    id: `11892319`,
    title: `Noomadic Herbals`,
    revealedName: `Noomadic Herbals`,
    url: `https://flippa.com/11892319`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 75000.0,
    avgMonthlyRevenue: 8343.0,
    avgMonthlyProfit: 5084.0,
    profitMargin: `61%`,
    annualRevenue: `GBP £78,828`,
    annualProfit: `GBP £48,034`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian herbal health/wellness brand with 8 years of history and proprietary physical formulations; requires Canadian-b`,
    ],
    greenFlags: [],
    seller: {
      name: `Darcy Mason`,
      location: `Canada`,
      verified: false,
      transactions: `2 transactions totalling USD $5,400`,
    },
    socialMedia: [
      `1,414 followers`,
    ],
    expenses: [
      {
        item: `Production & Supplies`,
        amount: `GBP £1,876 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £542 /month`,
      },
      {
        item: `Shopify Store Fee`,
        amount: `GBP £74 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £18,761 Excluded from sale price`,
      `Included.`,
      `1,414 followers`,
      `3,277 subscribers`,
      `Attachments`,
      `juTD4FA`,
      `Contact Seller`,
      `Send message`,
      `Suja Thomas Sep 03, 2025 02:17 AM`,
      `@Suja Thomas ap`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Suja Thomas`,
        date: `Sep 03, 2025 02:17 AM`,
        text: `@Suja Thomas apologies I replied on wrong page!`,
      },
      {
        author: `Suja Thomas`,
        date: `Sep 03, 2025 02:11 AM`,
        text: `@Yannis Souris Hi Yannis, yes sure I will message you.`,
      },
      {
        author: `Yannis Souris`,
        date: `Aug 19, 2025 01:27 AM`,
        text: `Can you please contact me about this opportunity. Thank you.`,
      },
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2045,
    watchers: 87,
    commentCount: 3,
    about: `Noomadic Herbals: Business Overview

Noomadic Herbals is a trusted ecommerce brand in the health and wellness sector with 8 years of operational history. Founded in 2016 and based in Canada, the company has built a reputation for high-quality, proprietary formulations that differentiate it from private-label competitors. With sales diversified across Shopify and Amazon, the business has maintained consistent profitability and loyal customer demand, underpinned by strong margins and a lean operational model. It represents a rare opportunity to acquire a long-standing consumables brand with proven stability, high lifetime value (LTV), and clear scalability pathways.

Business Highlights

8 years of operational history with consistent profitability and strong customer base
Proprietary formulations with exclusive supplier relationships, not private label
Diversified sales channels across Amazon and Shopify with >1,000 reviews averaging 4+ stars
Minimal workload: less than 1 hour per week required for restocking and basic customer service
Inventory valued at USD $25,000 included with the sale
High gross margins and strong LTV due to consumable product line
Professional image generation software included, eliminating product photography costs
Seller offering 6 months of transition support for smooth handover

Sales &`,
  },
  {
    id: `12567523`,
    title: `Ecommerce Store | Design and Style`,
    revealedName: `Ecommerce Store | Design and Style`,
    url: `https://flippa.com/12567523`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 68489.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 5118.0,
    profitMargin: `33%`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian Shopify store selling jewellery-making materials with laser cutting — requires 20 hrs/week of hands-on work i`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 327,
    watchers: 3,
    about: `n established e-commerce business in Australia, specializing in jewellery-making materials and acrylic components, is for sale. Operating on a well-developed Shopify store, the business requires about 20 hours of work weekly for tasks like order processing, customer service, laser cutting, and inventory management. It has a strong brand presence, a loyal customer base, and marketing systems in place, making it a lucrative opportunity for potential buyers. Financially, the business shows consistency, with the total owner benefit in 2023 being $238,478, and in 2025 $90,987, despite a weaker year in 2024 due to high rent and advertising costs. However, the decision to focus on in-house products rather than third-party items improved profit margins and reduced inventory needs, allowing the business to operate from a garage rather than a warehouse. Key business metrics include a 2.75% conversion rate, an average order value of $104, and a repeat customer rate of 69.48%. The business also showcases a strong online presence across platforms like Facebook, Instagram, and TikTok, with robust email and SMS subscriber lists. The sale includes equipment like a Trotec Speedy 360 Laser Cutter, and a complete e-commerce infrastructure with software subscriptions and a comprehensive handover package. This package offers video tutorials, 90 days of support, and unlimited email assistance, ensuring a smooth transition for new ownership. With a focus on maintaining consistent cash flow and profitability, this opportunity is designed for seamless home operation.`,
  },
  {
    id: `12166872`,
    title: `Goddess.com.ua`,
    revealedName: `Goddess.com.ua`,
    url: `https://flippa.com/12166872`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 43200.0,
    avgMonthlyRevenue: 35660.0,
    avgMonthlyProfit: 13826.0,
    profitMargin: `39%`,
    annualRevenue: `GBP £336,948`,
    annualProfit: `GBP £130,652`,
    expensesLastMonth: `GBP £3,752 /month`,
    ageYears: 11.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Ukraine`,
    platform: `Strength`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Ukraine-based beauty eCommerce store with 210+ brands and exclusive distribution agreements; active war zone adds extrem`,
    ],
    greenFlags: [],
    seller: {
      name: `Serhii Kondratiev`,
      location: `Ukraine`,
      verified: true,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £3,752 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `19,100 followers`,
      `11,158 subscribers`,
      `Attachments`,
      `sales`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $72,000`,
      `USD $43,200`,
      `Reduced 40%`,
      `GBP £32,419`,
      `Contact Sel`,
    ],
    postSaleSupport: `Included. All necessary steps will be taken to help transfer and launch business under new management.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `72,895`,
      totalPageViews: `11,594`,
      pagesPerSession: `1.62`,
      avgDuration: `00:00:00`,
      engagementRate: `0.28%`,
      topCountries: [
        {
          country: `Ukraine`,
          views: 9189,
        },
        {
          country: `United States`,
          views: 292,
        },
        {
          country: `(not set)`,
          views: 283,
        },
        {
          country: `Germany`,
          views: 236,
        },
        {
          country: `United Kingdom`,
          views: 116,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1013,
    watchers: 27,
    about: `Goddess.com.ua: Business Overview

Goddess.com.ua is a premium beauty eCommerce brand with a 10-year operating history, strong brand equity, and a fully developed technology infrastructure. Based in Ukraine and built on a custom Magento 2.1 platform, the business has grown into one of the country's top 10 beauty stores, offering over 210 global brands with exclusive distribution agreements. With annual revenue of USD $449K and a profit margin of 39%, the company delivers a consistent monthly profit of USD $14.5K and represents a compelling turnkey opportunity for buyers looking to scale in the Eastern European and global beauty markets.

Key Financials (Trailing Twelve Months ending December 2025)

Revenue: USD $449,000
Profit: USD $174,100
Monthly Revenue: USD $37,416 (Average)
Monthly Profit: USD $14,508 (Average)
Profit Margin: 39%
AOV: USD $45.68 (Standard) / USD $1,679 (High-ticket category)
Orders: 120,000+ lifetime
Clients: 30,000 total
Page Views: 13,057 per month
Refund Rate: 0.0%

Traffic & SEO Performance

Monthly Users: 79,968
Monthly Page Views: 156,689
Engagement Rate: 31%
Authority Score: 28
Referring Domains: 610
Backlinks: 1,690
Total Keywords Ranked: 3,660+
Top Channels: Organic Search (50%), Direct (28%), Paid Social (15%)
Top Geo Markets: Ukraine, United States, Germany, UK, Spain

Product & Platform Strength

The store operates on a fully customized Magento 2.1 build with 112 advanced modules, designed by Red Dot Award–winning agency Twid Studio. The platform is tightly integrated with CRM 1C for inventory, finance, and tax compliance. Also included is an optimized UX/UI, automated email marketing (ESP Sputnik), PPC ad infrastructure, and a polished corporate identity, including branded packaging and gift box systems.

The store features 210+ global brands with 30 official distribution contracts, including high-demand labels such as Dr.Jart+, Elemis, COSRX, Davines, Patchology, Beauty Blender, and Thalgo. The business serves both budget and premium customer segments through curated product collections and regular launches.

Growth Potential

Goddess.com.ua is well-positioned for international expansion. It currently sees international traffic from the U.S., Germany, and the UK without any dedicated localization or outbound marketing. There is an untapped opportunity to expand the catalog, activate new regions, optimize CRO, and scale paid marketing. The SEO foundation is robust, with long-standing authority in beauty-related search terms and product categories.

Strategic Investments to Date

Over USD $245,000 has been invested in platform, brand, and growth assets including:
$100,000 into custom Magento development
$89,182 on SEO
$16,838 on PPC setup
$6,800 on email marketing infrastructure
$29,000 on visual identity
$3,200 on CRM systems

Assets Included in Sale

Primary Domain: goddess.com.ua
Magento 2 store with 112 custom modules
Registered Trademark
CRM 1C with tax integration
Social Media Accounts: Instagram (19.1K fol`,
  },
  {
    id: `11700917`,
    title: `sportstrading.cards`,
    revealedName: `sportstrading.cards`,
    url: `https://flippa.com/11700917`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 80768.0,
    avgMonthlyRevenue: 7941.0,
    avgMonthlyProfit: 7932.0,
    profitMargin: `100%`,
    annualRevenue: `GBP £75,041`,
    annualProfit: `GBP £74,951`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `OR, United States`,
    platform: `that`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Oregon-based e-commerce specializing in collectible sports trading cards. Physical collectibles with US market focus, ca`,
    ],
    greenFlags: [],
    seller: {
      name: `Richard`,
      location: `United States`,
      verified: true,
    },
    expenses: [
      {
        item: `Platform fees`,
        amount: `GBP £22 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £131,327 Included in sale price`,
      `Included. I can provide you with 6 months of support`,
      `200 subscribers`,
      `Contact Seller`,
      `Send message`,
      `Richard May 08, 2025 02:27 AM`,
      `@Alex Namel you c`,
    ],
    postSaleSupport: `Included. I can provide you with 6 months of support`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Richard`,
        date: `May 08, 2025 02:27 AM`,
        text: `@Alex Namel you can contact me at 971-346-6364 thx Rick`,
      },
      {
        author: `Alex Namel`,
        date: `May 08, 2025 02:22 AM`,
        text: `Can you provide an list of inventory that will be confirmed with sale?`,
      },
      {
        author: `Richard`,
        date: `May 06, 2025 08:21 AM`,
        text: `@Milo Sullo I own all my inventory and I hunt down all my inventory… all inventory goes with the sale:) 971-346-6364 Rick`,
      },
      {
        author: `Milo`,
        date: `May 06, 2025 07:59 AM`,
        text: `Where are you getting your inventory?

Does this come with inventory or is it dropshipping -- Please advise
Thank You`,
      },
      {
        author: `Roy Bielewicz`,
        date: `Aug 21, 2024 11:24 PM`,
        text: `Can you include sales trends, as well as profit and expenses? Also, where are you getting your inventory?`,
      },
      {
        author: `Taylor`,
        date: `Aug 02, 2024 09:35 PM`,
        text: `Can you share a P + L?`,
      },
    ],
    ga: {
      users: `7,078`,
      totalPageViews: `1,742`,
      pagesPerSession: `1.65`,
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3975,
    watchers: 175,
    commentCount: 6,
    about: `Key Highlights:
- eCommerce store Sportstrading.cards is a thriving business in the Hobbies and Games industry, specializing in collectible sports trading cards.
- The company utilizes various key platforms, including`,
  },
  {
    id: `12201388`,
    title: `Le Teremoana`,
    revealedName: `Le Teremoana`,
    url: `https://flippa.com/12201388`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 50000.0,
    avgMonthlyRevenue: 8786.0,
    avgMonthlyProfit: 5869.0,
    profitMargin: `67%`,
    annualRevenue: `GBP £83,012`,
    annualProfit: `GBP £55,455`,
    expensesLastMonth: `GBP £113 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `WA, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Le Teremoana) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Sia Singh`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `12,000 followers`,
      `6,500 followers`,
      `4,340 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £113 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `12,000 followers`,
      `6,500 followers`,
      `4,340 followers`,
      `6,748 subscribers`,
      `Attachments`,
      `IMG_5316`,
      `JPEG`,
      `IMG_5314`,
      `annual_sales_report`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $130,000`,
      `USD $50,000`,
      `Reduced 62%`,
      `GBP £37,522`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $1.0K*`,
      `Have a similar business? Ge`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 723,
    watchers: 19,
    about: `This is a trusted 5 year Shopify store with strong branding, loyal customers, and a well-established online presence. With 6K+ customers, 12K Facebook followers, and over 700 verified 5 star reviews, the business has a solid foundation and a clear reputation for quality. The backend is clean and easy to use, making day-to-day operations simple for any new owner. The store consistently attracts organic traffic and return buyers. Most growth has been achieved without paid ads, leaving significant upside for a buyer who wants to scale through marketing, influencer partnerships, or new product additions. This is a great opportunity for someone who wants a ready-made brand with proven demand and strong growth potential. If you are in Washington state or able to drive to Washington State, I would be willing to give all of the shelves, bins, any remaining inventory, packing supplies, boxes, and business supplies I would have left over.`,
  },
  {
    id: `12274569`,
    title: `TSF NY INC`,
    revealedName: `TSF NY INC`,
    url: `https://flippa.com/12274569`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 100000.0,
    avgMonthlyRevenue: 47653.0,
    avgMonthlyProfit: 11914.0,
    profitMargin: `25%`,
    annualRevenue: `GBP £450,265`,
    annualProfit: `GBP £112,566`,
    ageYears: 11.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `NY, United States`,
    platform: `files`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `New York-based DTC ecommerce brand (since 2014) selling Korean beauty sheet masks and skincare products via Shopify. Phy`,
    ],
    greenFlags: [],
    seller: {
      name: `Sang Young Kim`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $100,000`,
      `GBP £75,044`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $2.0K*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
      `This q`,
    ],
    postSaleSupport: `to ensure a seamless transition.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 547,
    watchers: 24,
    about: `Masksheets.com: Business Overview

Masksheets.com is a profitable direct-to-consumer e-commerce brand specializing in Korean beauty and skincare products, with a core focus on sheet masks and related facial care items. Established in 2014 and headquartered in New York, the business has built a strong reputation as a trusted destination for authentic K-beauty products, serving a global customer base through its Shopify-powered storefront.

Over more than a decade of operation, the brand has evolved into a recognized niche authority within the fast-growing Korean skincare segment, supported by a broad product catalog, strong supplier relationships, and an engaged community of beauty enthusiasts. With consistent profitability, stable demand, and a scalable direct shipping model, the business presents an attractive acquisition opportunity for buyers seeking a well-established e-commerce asset in the health and beauty category.

The business operates on Shopify and utilizes a self-fulfillment model, enabling tight control over inventory and customer experience. Customers typically purchase multiple items per order, reflected in an average order value of approximately USD $66 and an average of three products per transaction. Over the last twelve months, the company has maintained a profit margin of around twenty-five percent, demonstrating efficient operations and strong product-market fit.

Key Financials (TTM)

Revenue: Approximately USD $600,000 annually
Profit: Approximately USD $150,000 annually
Average Monthly Revenue: Approximately USD $50,000
Average Monthly Profit: Approximately USD $12,500
Profit Margin: 25 percent

The business has shown steady performance driven by repeat purchases and sustained consumer interest in Korean skincare. Shopify store activity over the past year recorded more than 11,000 orders and over USD $725,000 in sales, highlighting consistent transaction volume and reliable revenue generation.

Key Business Highlights

Masksheets.com benefits from a long operating history and established brand equity within the K-beauty market, supported by a large customer base exceeding 175,000 customers and an email subscriber list of similar scale. The brand maintains strong operational performance with a fulfillment rate of 99.7 percent and virtually no refund rate, reflecting efficient logistics and high customer satisfaction.

The business also demonstrates solid digital authority with thousands of referring domains and tens of thousands of ranking keywords, providing a foundation for ongoing organic traffic and brand visibility.

Customer Demographics and Reach

The company primarily serves beauty-conscious consumers seeking authentic Korean skincare products, with a customer base spanning the United States and international markets. The target audience includes both individual consumers and skincare enthusiasts who value product variety, authenticity, and convenience.

Digital presence is anchored by the e-commerce website and a `,
  },
  {
    id: `12267391`,
    title: `instockeire.com`,
    revealedName: `instockeire.com`,
    url: `https://flippa.com/12267391`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 116395.0,
    avgMonthlyRevenue: 19454.0,
    avgMonthlyProfit: 8023.0,
    profitMargin: `41%`,
    annualRevenue: `GBP £183,820`,
    annualProfit: `GBP £75,808`,
    expensesLastMonth: `GBP £10,596 /month`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Ireland`,
    platform: `achieved`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Ireland-based premium sneaker and streetwear resale (hype economy). Physical inventory procurement and local EU market e`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `18 transactions totalling USD $11,490,398`,
    },
    socialMedia: [
      `156 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £10,596 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £305 Included in sale price`,
      `Included.`,
      `156 followers`,
      `Attachments`,
      `monthly pnl. INSTOCK - Sheet1`,
      `2nd October 2025`,
      `6th January 2026`,
      `7th August 2025`,
      `9th June 2025`,
      `9th September 2025`,
      `10th No`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 483,
    watchers: 20,
    about: `Investment Opportunity: High-Growth Breakout in the Premium Streetwear & Sneaker Market

Instockeire.com is an agile e-commerce leader that has dominated the Sneaker and Premium Streetwear resale niche in 2025. Unlike traditional slow-growth startups, this platform achieved a rapid breakout performance in FY 2025, generating €211,247.86 in gross revenue within a single calendar year, while maintaining an elite 41.2% Net Operating Margin (SDE).

Financial Highlights (FY 2025 Audited)

2025 Gross Revenue: €211,247.86

2025 Net Operating Profit (SDE): €87,120.50

Net Profit Margin: 41.2% (Forensically Verified)

Operational Efficiency: 5.3% OpEx (Highly Scalable)

Asking Price: €240,000 (2.75x SDE)

The "Rapid-Growth" Competitive Edge

The 2025 performance record highlights a business that has mastered the "hype economy" through superior procurement and conversion strategies:

Velocity of Sales: Achieving €211k in 12 months demonstrates intense market demand and a high inventory turnover rate.

Proven Authenticity: In the high-ticket streetwear market, the brand has quickly established the trust necessary to command premium margins on items like ACG Fleece and limited-run footwear.

Lean Global Infrastructure: The business utilizes a modernized supply chain (integrated with Wise/Revolut) that allows for global sourcing with zero "bloat" in the overhead.

Strategic Scaling: The "Phase 2" Opportunity

Because this volume was achieved in a single year without established SEO (DA 0), the upside for an incoming owner is unprecedented:

Organic Dominance: The business is currently "invisible" to Google search. Implementing a foundational SEO strategy will capture the massive search volume for streetwear brands, effectively "unlocking" a second major revenue stream.

Marketing Expansion: With a 41% profit cushion, the business can aggressively scale via Meta and Google Ads, a lever that has not yet been fully pulled.

Global Export Potential: The 2025 success in the local market serves as a validated blueprint for expansion across the EU.

Investment Thesis

Instockeire.com is a rare opportunity to acquire a high-velocity, high-margin asset at the peak of its growth curve. By generating over €211k and €87k in profit in 2025 alone, the business has proven its viability. At an entry price of €240,000, a buyer is acquiring a validated "profit machine" with a clear path to full ROI in under 33 months, plus significant low-hanging fruit for technical scaling.`,
  },
  {
    id: `11721437`,
    title: `irishdancepro.com`,
    revealedName: `irishdancepro.com`,
    url: `https://flippa.com/11721437`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 28000.0,
    avgMonthlyRevenue: 7863.0,
    avgMonthlyProfit: 3249.0,
    profitMargin: `41%`,
    annualRevenue: `GBP £74,294`,
    annualProfit: `GBP £30,699`,
    ageYears: 8.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Ireland`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Irish company selling custom practice mats for Irish dance, over EUR 1M in sales. Physical product in niche community wi`,
    ],
    greenFlags: [],
    seller: {
      name: `Shane McAvinchey`,
      location: `Ireland`,
      verified: true,
    },
    socialMedia: [
      `10,000 followers`,
      `9,300 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £750 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £1,126 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £55 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £195 /month`,
      },
      {
        item: `Manufacturing stock`,
        amount: `GBP £1,501 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £7,504 Included in sale price`,
      `Shopify`,
      `Included.`,
      `10,000 followers`,
      `9,300 followers`,
      `8,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `Travis Dec 31, 2024 12:04 AM`,
      `Try to visit site link you have in post on fli`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Travis`,
        date: `Dec 31, 2024 12:04 AM`,
        text: `Try to visit site link you have in post on flippa and link says site is down`,
      },
      {
        author: `Travis`,
        date: `Dec 31, 2024 12:02 AM`,
        text: `Why are you looking to get an investor or to sell whole business? If get an investor what type of revenue share are you open to?`,
      },
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 3292,
    watchers: 118,
    commentCount: 2,
    about: `Irish Dance Pro: Custom Practice Mats for Irish Dance

Key Highlights

Innovative Product Offering: Specializing in high-quality, custom practice mats for Irish dance, catering to dancers practicing at home.
Strong Financial Performance: Consistently generating $100K in annual revenue, with total sales exceeding 1 million euros in practice pads over six years.
Established Brand Presence: A well-recognized brand with a loyal following of over 10,000 social media followers.
Significant Growth Potential: Opportunity to expand product range, customize designs further, and explore new markets.
Robust Operational Framework: Streamlined processes from manufacturing to customer delivery, ensuring efficiency and customer satisfaction.

Operations

Irish Dance Pro operates by designing, producing, and selling custom dance mats tailored for Irish dance enthusiasts. These mats are sold directly to consumers through our online platform. The business model is straightforward and has been refined over six years to ensure operational efficiency and customer satisfaction.

Revenue Generation: Sales are primarily made through our e-commerce site, supplemented by social media marketing and word-of-mouth referrals.
Time Commitment: Currently, the business requires approximately 15-20 hours per week to manage, including order fulfillment, customer service, and marketing activities.
Business Management: Day-to-day operations include processing orders, liaising with manufacturers, managing inventory, and executing marketing campaigns.

Customers

Our customers are predominantly Irish dance students and enthusiasts, ranging from beginners to advanced practitioners, seeking to improve their skills at home.

Customer Acquisition: Through targeted social media campaigns, SEO, and our strong community presence.
Demographics: A mix of domestic and international customers, with a notable loyalty and repeat purchase rate, reflecting the high quality and uniqueness of our products.

Financials

Steady Revenue Stream: The business has maintained a steady revenue stream, with a $100K annual turnover and over 1 million euros in total sales from practice pads alone.
Growth Opportunities: There's room for financial growth by expanding the product line, increasing marketing efforts, and exploring wholesale or retail partnerships.
Financial Transparency: Detailed financial records are available, showcasing a clear picture of the business's profitability and operational costs.

Additional Notes

Business Evolution: Over six years, we've honed our product offerings and established a reputable brand in the Irish dance community. The sale includes all assets, from social media accounts to customer lists and inventory.
Reason for Seeking Investment: To inject cash flow with the aim of doubling revenue by the end of this year, recognizing Irish Dance Pro's significant growth potential.

This is an exceptional opportunity for anyone passionate about the dance industry or looking for a proven`,
  },
  {
    id: `12080278`,
    title: `nordicsglow.se`,
    revealedName: `nordicsglow.se`,
    url: `https://flippa.com/12080278`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 50003.0,
    monthlyPL: [
      { month: `Sep 2024`, revenue: 8531.86, expenses: 6640.83, profit: 1889.76 },
      { month: `Oct 2024`, revenue: 20340.32, expenses: 13822.68, profit: 6517.64 },
      { month: `Nov 2024`, revenue: 40805.1, expenses: 32175.45, profit: 8629.65 },
      { month: `Dec 2024`, revenue: 8870.95, expenses: 6211.57, profit: 2659.38 },
      { month: `Jan 2025`, revenue: 16209.01, expenses: 13787.12, profit: 2421.89 },
      { month: `Feb 2025`, revenue: 8981.44, expenses: 7330.44, profit: 1651.0 },
      { month: `Mar 2025`, revenue: 6451.6, expenses: 4796.79, profit: 1654.81 },
      { month: `Apr 2025`, revenue: 9215.12, expenses: 6036.31, profit: 3178.81 },
      { month: `May 2025`, revenue: 71177.15, expenses: 42409.11, profit: 28766.77 },
      { month: `Jun 2025`, revenue: 2787.65, expenses: 2750.82, profit: 36.83 },
      { month: `Jul 2025`, revenue: 439.42, expenses: 60.96, profit: 378.46 },
      { month: `Aug 2025`, revenue: 351.79, expenses: 40.64, profit: 311.15 },
    ],
    avgMonthlyRevenue: 16180.0,
    avgMonthlyProfit: 4841.0,
    profitMargin: `30%`,
    annualRevenue: `GBP £152,882`,
    annualProfit: `GBP £45,746`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Sweden`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Swedish premium skincare brand targeting Nordic market via Shopify and Facebook Ads. Physical product sold to Scandinavi`,
      `Revenue declining sharply (-94.9% trend)`,
      `High revenue volatility (CV 121%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `111 transactions totalling USD $9,242,993`,
    },
    socialMedia: [
      `0 followers`,
      `682 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,721 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £7,943 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £239 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £101,207 Included in sale price`,
      `Shopify`,
      `Included.`,
      `0 followers`,
      `682 followers`,
      `13,542 subscribers`,
      `Attachments`,
      `Screenshot 2025-09-05 at 09.20.31`,
      `XLSX`,
      `Kopia av Profit and Loss Statement - Yusuf`,
      `No comments`,
      `Show all`,
      `Open f`,
    ],
    postSaleSupport: `including transition, ad account setup, and supplier handover`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1047,
    watchers: 52,
    about: `Nordics Glow: Business Overview

Nordics Glow is a premium Swedish skincare brand with validated product-market fit, strong creative assets, and over $200,000 in verified revenue. Launched in 2024, the brand quickly carved out a loyal customer base in the Nordic beauty space — an affluent, under-served region with growing demand for high-quality skincare solutions. At its peak, Nordics Glow generated over $18,000 in a single day via Facebook Ads and has demonstrated profitability with margins up to 30%.

With a conversion-optimized Shopify storefront, 50+ high-quality creative assets, and supplier relationships already in place, this business offers a turnkey acquisition for buyers looking to enter or expand in the fast-growing health and beauty category. Although the business is currently paused, all infrastructure and assets are intact, primed for a rapid relaunch and scale — particularly heading into Q4.

Key Financials (12 Months Ending November 2025)

Annual Revenue: USD $203,406
Annual Profit: USD $60,864
Monthly Revenue (Avg): USD $16,950
Monthly Profit (Avg): USD $5,072
Profit Margin: 30%
Customers: 13,591
Orders: 4,486
Average Order Value (AOV): USD $38.00
Fulfilment Rate: 98.6%
Refund Rate: 0.0%
Email Subscribers: 13,542

Business Model & Operations

Nordics Glow operates on a direct-to-consumer eCommerce model using Shopify as its platform. Orders are fulfilled through reliable third-party partners, with all inventory self-managed and included in the sale (valued at USD $134,864). The store leverages performance marketing (Facebook Ads) to drive traffic and sales, supported by a warm Meta Pixel and a proven set of ad creatives.

Operations are lean and require minimal technical expertise. The owner currently handles ad oversight, supplier coordination, and customer service. All digital systems are in place — from payment integrations specific to the Nordic market to automated email flows — ensuring an efficient, scalable backend.

Brand & Creative Assets

The brand comes with a complete suite of high-quality assets to support immediate relaunch and scaling:

50+ ad creatives including user-generated content, studio shoots, and testimonials
Conversion-optimized Shopify store with Nordic payment processors
Warm Facebook Pixel with campaign data from past performance
Email marketing list of 13,542 subscribers
Brand assets including logos, product packaging, and visual content
Social media accounts with consistent brand identity
Supplier contracts and inventory worth over $134,000 included

These assets offer significant time and cost savings, especially for buyers looking to scale quickly during high-volume retail seasons.

Customer Base & Market Reach

Nordics Glow serves primarily customers in Sweden and across the Nordic region, with clear expansion potential into Norway, Denmark, Finland, and broader EU markets. The audience is responsive to performance ads and email marketing, with strong engagement and a 0% refund rate — underscorin`,
  },
  {
    id: `12276151`,
    title: `Digital Ebook Academy`,
    revealedName: `Digital Ebook Academy`,
    url: `https://flippa.com/12276151`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 100000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 206785.21, expenses: 157532.07, profit: 49253.14 },
      { month: `Mar 2025`, revenue: 374610.63, expenses: 348495.62, profit: 26115.01 },
      { month: `Apr 2025`, revenue: 222418.91, expenses: 197849.49, profit: 24569.42 },
      { month: `May 2025`, revenue: 356262.94, expenses: 303869.09, profit: 52393.85 },
      { month: `Jun 2025`, revenue: 217092.53, expenses: 206053.69, profit: 11038.84 },
      { month: `Jul 2025`, revenue: 171192.19, expenses: 158111.19, profit: 13082.27 },
      { month: `Aug 2025`, revenue: 132126.99, expenses: 117401.34, profit: 14726.92 },
      { month: `Sep 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Oct 2025`, revenue: 33769.3, expenses: 29960.57, profit: 3808.73 },
      { month: `Nov 2025`, revenue: 78301.85, expenses: 72751.95, profit: 5549.9 },
      { month: `Dec 2025`, revenue: 84688.68, expenses: 76669.9, profit: 8018.78 },
      { month: `Jan 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 187725.0,
    avgMonthlyProfit: 17380.0,
    profitMargin: `11%`,
    annualRevenue: `GBP £1,478,150`,
    annualProfit: `GBP £164,218`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `integrations`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Failed deep verification — website/product issues`,
      `Revenue declining sharply (-75.5% trend)`,
      `High revenue volatility (CV 57%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `2 transactions totalling USD $115,628`,
    },
    socialMedia: [
      `3,312 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `3,312 followers`,
      `60,000 subscribers`,
      `Attachments`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $100,000`,
      `GBP £75,044`,
      `Contact Seller Submit LOI Make Offer`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1171,
    watchers: 120,
    about: `1. Executive Summary

Digital Ebook Academy is an online education business operating in the digital products space, primarily selling candle-making and other courses via a paid advertising funnel. The business leverages Meta (Facebook) ads, a proven funnel system, and a large email list to generate consistent revenue from a global DTC audience.

Established in 2023, the business has generated over $2.07M in gross revenue with $258,805 in net profit over the reported period(2025), while being operated with minimal owner involvement.

The company is being offered for sale as the owner is reallocating focus to a separate, non-competing business (supplement brand).

2. Business Overview

Business Name: Digital Ebook Academy

Website: digitalebookacademy.com

Year Established: 2023

Business Model: Direct-to-Consumer (DTC), Digital Products

Monetization: One-time course sales with upsells

Owner Involvement: <15 minutes per day

3. Reason for Sale

The owner is shifting focus to another business venture (a supplement brand), which does not compete with Digital Ebook Academy.

4. Products & Pricing 

Candle Making Course (Main Offer) | Beginner-focused candle making course | $17

Candle Making Pro Video Course (Upsell 1) | Advanced candle-making techniques | $147

Candle Marketing Toolkit (Upsell 2) | Marketing resources for candle businesses | $57

Candle Making Kit (Upsell 3) | Supplementary digital resources | $97

Course Production Cost:

Initial creation cost: $3,000–$4,000

Update costs (optional):

Full course update: < $1,000

Ebook updates: $50–$100

All content was produced internally in collaboration with a subject-matter expert, who may be introduced to the buyer post-sale.

5. Assets Included in the Sale

The sale includes all assets required to operate the business:

Domain: digitalebookacademy.com

Shopify Store

Funnelish account & funnels

Email list (100,000+)

Facebook Pixel

Google Workspace (content, creatives, data, SOPs)

Course content & creatives

Intellectual property (unregistered)

Platform integrations (Zapier)

All software subscriptions are transferable.

6. Intellectual Property

All courses and materials are original and internally produced

Subject expert introduction available (non-exclusive)

7. Target Market

Primary Geography:

United States: ~80% of revenue

Rest of World: ~20%

Demographics:

Primarily women aged 35+

Hobbyists and aspiring small business owners

Sales Channels: DTC (no B2B)

8. Operations Overview | Customer Journey

Traffic generated via Facebook Ads

Customer purchases through Funnelish checkout

Order processed in Shopify

Zapier integration automatically grants course access via:

Circle

Podia

9. Marketing & TrafficAcquisition Channels

Primary: Meta (Facebook) Ads

Secondary: Email marketing (12.59% of revenue in last 6 months)

10. Email Marketing Performance

Email Subscribers: 100,000+

Open Rate (last 6 months): 46.2%

Click Rate (last 6 months): 0.76%

Repeat Customer Rate: 3%

11.`,
  },
  {
    id: `12272664`,
    title: `Total Futbol Cards`,
    revealedName: `Total Futbol Cards`,
    url: `https://flippa.com/12272664`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 75814.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 3472.18, expenses: 1104.9, profit: 2367.28 },
      { month: `Feb 2025`, revenue: 6630.67, expenses: 1657.35, profit: 4973.32 },
      { month: `Mar 2025`, revenue: 8177.53, expenses: 2762.25, profit: 5415.28 },
      { month: `Apr 2025`, revenue: 24202.39, expenses: 5525.77, profit: 18676.62 },
      { month: `May 2025`, revenue: 32045.91, expenses: 8840.47, profit: 23205.44 },
      { month: `Jun 2025`, revenue: 14918.69, expenses: 4420.87, profit: 10499.09 },
      { month: `Jul 2025`, revenue: 3315.97, expenses: 994.41, profit: 2320.29 },
      { month: `Aug 2025`, revenue: 1215.39, expenses: 220.98, profit: 994.41 },
      { month: `Sep 2025`, revenue: 1657.35, expenses: 331.47, profit: 1325.88 },
      { month: `Oct 2025`, revenue: 1325.88, expenses: 276.86, profit: 1050.29 },
      { month: `Nov 2025`, revenue: 1104.9, expenses: 220.98, profit: 883.92 },
      { month: `Dec 2025`, revenue: 2541.27, expenses: 883.92, profit: 1657.35 },
    ],
    avgMonthlyRevenue: 8384.0,
    avgMonthlyProfit: 6114.0,
    profitMargin: `73%`,
    annualRevenue: `GBP £79,220`,
    annualProfit: `GBP £57,770`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `Spain`,
    platform: `Flatsome`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Total Futbol Cards) — identified from listing description`,
      `Revenue declining sharply (-72.8% trend)`,
      `High revenue volatility (CV 116%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Fran Murillo`,
      location: `Spain`,
      verified: true,
      transactions: `4 transactions totalling USD $16,415`,
    },
    socialMedia: [
      `1,500 followers`,
      `834 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £263 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £875 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £1,751 Included in sale price`,
      `Flatsome`,
      `Included.`,
      `1,500 followers`,
      `834 followers`,
      `11,317 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $75,814`,
      `GBP £56,894`,
      `Includes US`,
    ],
    postSaleSupport: `from seller`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 347,
    watchers: 2,
    about: `Total Futbol Cards: Business Overview

Total Futbol Cards is a profitable, high-margin ecommerce business based in Spain, offering personalized football trading cards and custom fan gifts. Built in 2024 and powered by WooCommerce, the business has rapidly gained traction by tapping into the emotional engagement of football fans, parents, and collectors. With a strong product-market fit, low overhead, and scalable print-on-demand infrastructure, the brand generated USD $106,186 in revenue and USD $77,434 in profit over the last 12 months, with a 73% profit margin and an average monthly profit of USD $6,452.

This business is fully automated and ready to scale. Orders are processed via a streamlined on-demand production model, requiring only 5–8 hours of weekly involvement for basic customer service, marketing checks, and supplier coordination. With 2,019 orders completed, zero refunds, and over 11,000 email subscribers, Total Futbol Cards combines exceptional unit economics with brand loyalty and massive growth potential.

Key Financials (Trailing 12 Months)

Revenue: USD $106,186
Profit: USD $77,434
Profit Margin: 73%
Monthly Revenue (Avg): USD $8,848
Monthly Profit (Avg): USD $6,452
Primary Expenses: Marketing USD $1,166/mo, Shipping USD $350/mo
Profit Multiple: 1.0x
Revenue Multiple: 0.7x

Key Business Highlights

High-Margin Model: 73% profit margin thanks to digital design + print-on-demand fulfillment
Zero Refund Rate: 2,019 fulfilled orders with no customer refunds reported
Strong Seasonal Peaks: High-volume months during Father’s Day, Christmas, and football season
Top Products: Custom trading cards and metallic collector packs with strong emotional appeal
Organic and Paid Traffic: Acquired via social, word of mouth, and targeted paid campaigns
Loyal Audience: 11,317 email subscribers, 1,500 Instagram followers, and 834 on TikTok
Growing Demand: 2,019 customers in 2025 and rising interest across Spain and beyond

Operations

Total Futbol Cards is designed for ease and automation. Orders are processed through WooCommerce and sent to print-on-demand suppliers. There’s no physical inventory risk, and fulfillment is handled externally. The business currently runs with a weekly time commitment of 5–8 hours, mainly focused on order monitoring, customer support, and marketing performance optimization.

The system is fully remote and scalable, with supplier contracts and SOPs already in place. Inventory value of USD $2,333 is included in the sale, representing packaging materials and branded items used for fulfillment.

Customer & Market Positioning

The business targets football fans, parents buying personalized gifts for their children, and memorabilia collectors. Emotional connection, perceived uniqueness, and giftability drive conversions. Orders spike around key seasonal events, but the demand is evergreen due to constant football fandom and new product drops.

The personalized nature of the offering also creates opportunities for repeat purc`,
  },
  {
    id: `11913876`,
    title: `Frisk Chocolates`,
    revealedName: `Frisk Chocolates`,
    url: `https://flippa.com/11913876`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 33514.0,
    avgMonthlyRevenue: 29936.0,
    avgMonthlyProfit: 10050.0,
    profitMargin: `34%`,
    annualRevenue: `GBP £282,864`,
    annualProfit: `GBP £94,961`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `UK-based physical chocolate brand with product manufacturing/fulfillment in UK; perishable goods require local cold-chai`,
    ],
    greenFlags: [],
    seller: {
      name: `Joel`,
      location: `United Kingdom`,
      verified: true,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,923 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £9,614 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £673 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £721 /month`,
      },
      {
        item: `COGS`,
        amount: `GBP £3,845 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £5,038 Included in sale price`,
      `13,000 subscribers`,
      `Attachments`,
      `Screenshot 2025-03-06 at 12.08.48`,
      `Screenshot 2025-03-06 at 12.1`,
    ],
    postSaleSupport: `Included. I can provide 1-1 ongoing support for up to 12 months post sale.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `70,442`,
      totalPageViews: `16,243`,
      pagesPerSession: `1.60`,
      avgDuration: `00:00:22`,
      engagementRate: `0.54%`,
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2254,
    watchers: 177,
    about: `**To be noted first - The reason for the recent reduction is due to a pause/descaling of ads post valentines this year (Feb 2025). During this period we changed fulfilment methods and improved the current product, however experienced multiple delays causing forcing us to refund customers who were in pre-order positions. This has now been resolved and since mid 2025 ads have completely paused. 

Once running again, the brand is profitable year round with little maintenance due to the nature of the Google advertising and the lean setup.

The brand is also highly profitable during Q4 and through to valentines. 40% margins with ease of setup and fulfilment. 

I see this sale now as an IP acquisition, or to someone looking for a profitable brand at a low price. 

I am also willing to negotiate and help the new owner setup and scale for a period of time post purchase. 

-------

Frisk has been running 18 months and already generated over 367,000gbp. In the niche of sex chocolate, Frisk predominantly sells to the UK, with the EU sales beginning at a low level for the past 2 months.  

Frisk also maintains a trademark on the brand name itself. 

Being highly profitable through the google adswords marketing, the scope for growth on this young business is exponential. With organic, meta, and affiliates yet to be maximised. Frisk has the potential to be radically scaled.


Frisk is currently listed across shopify and amazon. Generating the majority of revenue through Google Adwords. Product is fulfilled through a co-packing centre, with boxes and chocolates supplied from abroad. Supplier connection will be transferred with the successful sale of the business. Both accredited, reputable, and of the highest quality and attention to detail. Lead times and scalability is no problem. 


Amazon's global audience has also been a great step in diversifying the sales channels available. Along with our launch across meta channels. Both profitable, and with headroom to grow into. Our array of organic content has also been a huge driver of awareness and sales through top of funnel audiences. The novelty, and quality of this product, allows frisk to be an easy choice for a broad range of audiences. 


Our customer base stretches to over 13,000 active profiles. With our new email marketing strategy, retention and LTV has increased drastically since implementation. Frisk appeals to a broad range of buyers, for various reasons. As expected younger couples are the main base. However reaching into older generations of customers is not far fetched due to its friendly and intriguing nature. 


A key to Frisk Chocolates' success is its adept use of technology, which ensures efficient operations and a superior customer experience.`,
  },
  {
    id: `12021625`,
    title: `Scentini Candles`,
    revealedName: `Scentini Candles`,
    url: `https://flippa.com/12021625`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 150000.0,
    avgMonthlyRevenue: 62945.0,
    avgMonthlyProfit: 10780.0,
    profitMargin: `17%`,
    annualRevenue: `GBP £594,759`,
    annualProfit: `GBP £101,863`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `AZ, United States`,
    platform: `Shopify`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US-based ecommerce brand (Arizona) selling premium physical candles via multi-channel retail. Physical product manufactu`,
    ],
    greenFlags: [],
    seller: {
      name: `Noah Brewer`,
      location: `United States`,
      verified: true,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £48,779 Included in sale price`,
      `Shopify`,
      `Included.`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `0 subscribers`,
      `15,000 subscribers`,
      `Attachments`,
      `ScentiniProfitandLoss-2024`,
      `No comments`,
      `Show all`,
    ],
    postSaleSupport: `from the founder for a smooth handoff`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2085,
    watchers: 194,
    about: `Scentini Candles: Business Overview

Scentini Candles is a high-growth, high-margin U.S.-based eCommerce brand offering premium candles tailored to modern home and gifting trends. Founded in 2023, the brand has quickly scaled into a profitable, multi-channel enterprise with a strong operational foundation, viral marketing traction, and an optimized fulfillment model. In its first full year of operations (2024), Scentini generated $792K in revenue with $135K in net profit, translating to a 17% net margin — all without external funding or inventory risk. With diversified revenue streams across TikTok Shop, Amazon, and Shopify, and over 15,000 customers served, Scentini is poised for significant scale ahead of the Q4 2025 gifting season.

Key Business Highlights

Multi-Channel Sales: Profitable presence across Shopify, TikTok Shop, Amazon (Brand Registered), and Meta Ads.
Viral Traction: Over 7,900 units sold on TikTok Shop, supported by viral videos and organic creator campaigns.
Strong Unit Economics: $62 AOV and a 99.7% fulfillment rate; minimal refund rates across platforms.
Operational Simplicity: 30–60 minutes/day required for maintenance. Third-party fulfillment and a fully trained customer support VA in place.
Ready for Scale: Comes with a deep content library (UGC, raw footage, photography), SOPs, backend documentation, and marketing playbooks developed by an 8-figure DTC operator.
Amazon Growth: 500+ units live in Amazon FBA; AOV $35; traction building with PPC strategy implemented.
Customer Loyalty & Engagement: 15,000+ email subscribers and a growing base of repeat customers.

Operations

All products are crafted in Tampa, Florida and exceed competitor benchmarks in quality, scent throw, and packaging. The business uses a lean operational model with outsourced fulfillment and customer service, allowing the owner to focus solely on growth levers. Current owner spends ~1–2 hours/day with the ability to step back further if needed.

A detailed growth playbook, system documentation, and trained VAs ensure a seamless operational transition for a new owner. All inventory, assets, and brand IP are included in the sale.

Customer Base & Marketing

Scentini has served over 15,000 U.S. customers with an average of 1 item per order. While Q4 contributes ~70% of sales due to the gifting nature of the product, the brand maintains profitable performance year-round. Marketing is diversified across:

TikTok Shop: 7,900+ units sold, multiple viral videos
Meta Ads: Proven paid performance with strong ROAS
Google Ads: Conversion-focused SEM campaigns in place
Amazon: Brand-registered, FBA-enabled, PPC optimized
Email & Social: 15,000+ subscribers; Instagram, TikTok, and Facebook pages included

Product & Market Leadership

Scentini operates in the highly defensible premium home fragrance niche, offering uniquely designed candles that appeal to millennial and Gen Z gifting behaviors. Top-selling SKUs include cocktail-inspired candles such as the “Espresso M`,
  },
  {
    id: `11795224`,
    title: `Resincollections`,
    revealedName: `Resincollections`,
    url: `https://flippa.com/11795224`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 51821.0,
    avgMonthlyRevenue: 9769.0,
    avgMonthlyProfit: 4606.0,
    profitMargin: `47%`,
    annualRevenue: `GBP £92,304`,
    annualProfit: `GBP £43,525`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Italy`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Resincollections) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Leonardo`,
      location: `Italy`,
      verified: true,
    },
    socialMedia: [
      `1,026 followers`,
      `66 followers`,
      `150 followers`,
    ],
    expenses: [
      {
        item: `Statues`,
        amount: `GBP £2,376 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Inventory (stock)`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £18,761 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `1,026 followers`,
      `66 followers`,
      `150 followers`,
      `150 subscribers`,
      `Attachments`,
      `XLSX`,
      `79746 - resincollections (version 1)`,
      `XLSX`,
      `79746 - resincollections (version 1)`,
      `Resincollections · Storico vendite · Shopify`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1011,
    watchers: 12,
    about: `About the business

I opened the ecommerce store in the year 2023 alone, creating the site and starting to create a large community.
Sales were made only in organic and strategic advertising, limited and easily sellable products, in fact on my site you can see not too many items but they are all sold.
Little Google or Facebook advertising, working only with influencers I managed to generate a lot of revenueResincollections is a well-established eCommerce business operating in the Hobbies and Games industry. The company has a strong revenue stream, generating $125,000 annually, with an impressive profit margin of 64%. 

Key Highlights 

The business focuses on curating and selling a wide range of resin-related products, catering to the growing demand among hobbyists and enthusiasts. Its successful eCommerce business model has proven to be effective in driving sales and profitability, making it an attractive investment opportunity for those looking to enter or expand in the Hobbies and Games sector. With a solid track record of financial performance, Resincollections is positioned for further growth and success in the market in europe.Official distributor of limited collectible statues.
Products sought after from all over the world

Resincollections has built a loyal customer base and established a strong online presence through its website, offering a seamless shopping experience for customers. The business's strong revenue and profit figures, combined with its niche market positioning, make it a unique opportunity for investors seeking a profitable eCommerce business. Products registered and regulated by copyright, All products on sale are the property of the sales company, We have control over the rapidly expanding European market, but there is a large market in America, the best reference shops are sideshow.com.

These types of stores are niche and ready to expand their customer network 

customers - 85% USA, 15%Europe

What are we looking for in this sale?

We have 1 supplier in China, we have been working with them since 2023. They also manage our shipments, making the whole process very simple.
We are European distributors
We place the order with our supplier as needed and send it directly to the Logistics warehouse

We also sometimes use a third-party fulfillment service, only when we have a lot of stock
Will be willing to work for the new owner.
As a business owner, I do a very small amount of CS beyond just account monitoring. Most of my time is spent placing new orders with suppliers and our SEO. We still have a batch of statues,action figures for sale in stock ready for shipment

Opportunities

THE Site is 100% sold with the right offer, but we can try to work together,
I can manage social media, sales and purchases.
I can help you choose the best products for your sale.

I'm also looking for a 50% partner to help me with capital because the site has great potential with the right resources.

I strongly believe in this site, because the`,
  },
  {
    id: `12635956`,
    title: `Ecommerce Store | Food and Drink`,
    revealedName: `Ecommerce Store | Food and Drink`,
    url: `https://flippa.com/12635956`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 65000.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 3377.0,
    profitMargin: `57%`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `CA, United States`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Ecommerce brand selling N2O filtration/pressure products for culinary use (California). Physical goods with 400-unit inv`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 209,
    watchers: 17,
    about: `niche e-commerce brand specializes in N2O filtration and pressure regulation products tailored for culinary uses. The company boasts an 83.3% gross margin, with an average selling price of $101 per unit and a cost of goods sold (COGS) at $19 per unit. Revenue distribution includes 81% from Shopify, 14% from Amazon, and 5% from shipping income. Inventory includes 400 units valued at $33,700 in retail terms, which covers nearly half of the business's asking price. Over 1,900 verified customer emails present untapped potential for repeat purchases. Google organic search drives 26% of Shopify's revenue, enhancing profitability without ad expenses. The product line features six proprietary SKUs, including a flagship bundle, filters, regulators, and deluxe models, with certain SKUs boasting higher margins and zero return rates. Operations demand 5-8 hours weekly for order fulfillment, customer service, and maintenance. Fulfillment is outsourced, with the Shopify and Amazon platforms requiring minimal oversight. Low customer service volume is noted, with a return rate of 1.5%. Financially, the business reports $78,969 revenue over 14 months, with an annualized Seller's Discretionary Earnings (SDE) of $43,307. Seasonal peaks occur between April and July. The business is poised for growth through Amazon listing optimization, email marketing, SEO expansion, community engagement via Reddit, and bundling strategies. The sale includes existing inventory, fully operational Shopify and Amazon accounts, a comprehensive customer email list, entrenched Google SEO standings, supplier relationships, IP rights, established brand and financial history, and a month of transitional support from the current owners. The sale is due to the owners seeking new business endeavors, providing an opportunity for a dedicated buyer to capitalize on the business's potential and upcoming peak season.`,
  },
  {
    id: `12641977`,
    title: `Ecommerce Store | Design and Style`,
    revealedName: `Ecommerce Store | Design and Style`,
    url: `https://flippa.com/12641977`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 42239.0,
    avgMonthlyRevenue: 3886.0,
    avgMonthlyProfit: 2343.0,
    profitMargin: `60%`,
    annualRevenue: `across markets, Shopify & wholesale. Includes inventory, booth&suppliers. Turnkey lifestyle business.`,
    annualProfit: `GBP £22,144`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `that`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Handmade gemstone jewelry brand (Western Canada) with in-person markets as major revenue stream. Physically dependent, c`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 112,
    watchers: 2,
    about: `well-established jewelry brand, specializing in handmade gemstone pieces, has been successfully operating for nearly a decade, primarily in Western Canada and online. The business generates annual revenues between $65,000 and $80,000 through a diverse blend of in-person markets, online sales via an e-commerce platform, and wholesale through a known third-party vendor. It boasts a strong gross margin and offers flexible operation, making it ideal for a creative entrepreneur seeking a lifestyle business. Revenue streams include participation in in-person markets and seasonal events across a proven circuit, an online store, an established wholesale account, and retail pop-ups. Prior to the pandemic, the brand expanded into over 25 retail stores in North America, indicating further growth potential in the wholesale domain. The sale of the business includes the brand’s name, designs, intellectual property, and an e-commerce platform that are fully transferable. It also includes a wholesale account, introductions to a production partner in Brazil, inventory, and professional market booth equipment. Additional assets include a proven market list and event strategy, trained sales staff, a social media following of approximately 10,000, and transition support for 30 to 45 days. Attractive features of this business include strong gross margins, low fixed overheads, flexible operating hours, established sales channels, and turnkey systems, all presenting opportunities for growth in additional markets, wholesale outreach, or online marketing. The current owner aims to transition into a new career in spa and skincare, offering a rare opportunity to acquire an established, creative business with immediate revenue potential and room for expansion.`,
  },
  {
    id: `12230008`,
    title: `Rude Rainbow`,
    revealedName: `Rude Rainbow`,
    url: `https://flippa.com/12230008`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 41768.0,
    avgMonthlyRevenue: 7381.0,
    avgMonthlyProfit: 2460.0,
    profitMargin: `33%`,
    annualRevenue: `GBP £69,741`,
    annualProfit: `GBP £23,247`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `data`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian festival/lifestyle brand selling physical custom fans, swimwear, and accessories primarily in Sydney events/M`,
    ],
    greenFlags: [],
    seller: {
      name: `Mitchell Petropoulos`,
      location: `Australia`,
      verified: false,
    },
    socialMedia: [
      `2,000 followers`,
      `14,600 followers`,
      `155 followers`,
      `5,390 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £611 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £788 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £527 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £8,861 Included in sale price`,
      `Shopify`,
      `Included.`,
      `2,000 followers`,
      `14,600 followers`,
      `155 followers`,
      `5,390 followers`,
      `8 subscribers`,
      `6,500 subscribers`,
      `Attachments`,
      `Rude_Rainbow_Pty_Ltd_-_Profit_and_Loss`,
      `Comm`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 424,
    watchers: 8,
    about: `Rude Rainbow: Business Overview

Rude Rainbow, established in 2020, is a trademarked, high-margin Australian festival and lifestyle brand celebrated for its bold aesthetic, vibrant product range, and strong cultural presence. Over the past six years, the brand has developed a loyal national following, particularly within Sydney’s summer event and Mardi Gras circuits, while also expanding into ecommerce, wholesale, and corporate gifting. Known for its distinctive colour-forward identity and custom-designed fans, swimwear, and accessories, Rude Rainbow has attracted a broad demographic that includes festival goers, families, tourists, and retail partners.

The brand’s growing audience, 14.6K Instagram followers, and multi-channel presence underpin a steady revenue stream driven by Shopify, Square, and direct event sales. A lean, part-time operation to date, Rude Rainbow presents substantial upside for a full-time owner with digital or retail expertise.

Key Financials (Trailing Twelve Months ending Nov 2025)

Revenue: AUD $128,125 (USD $85,775). 1 USD = 1.493 AUD
Gross Profit: AUD $50,648 (USD $33,923)
Profit Margin: 39.5% gross | 33% reported net (based on ecommerce platform data)
Reported Net Profit: AUD ($15,568) due to discretionary and non-operational costs

SDE (Adjusted Net Profit): Approx. AUD $49,000, including addbacks for owner salary, tax optimization, and non-core expenses
Inventory Value: USD $11,808 (included in sale)

Sales Channels & Operational Model

Shopify Revenue: AUD $81,934

Total Revenue incl. Wholesale & Events: Approx. AUD $128,000
Shopify AOV: USD $44 | Square AOV: USD $38 | Stripe AOV: USD $1,218
Fulfilment Rate: 98.9% | Refund Rate: 0.0%
Pop-Up & Market Revenue: Up to $25,000/day at peak events

Rude Rainbow operates a fully digital storefront on Shopify with integrated payments via Stripe, PayPal, and Square. Sales occur year-round, with major seasonal spikes during Mardi Gras and summer festivals. Wholesale and corporate orders (up to AUD $10,000 per order) have proven viability but remain underdeveloped.

The business is run part-time by two owners with minimal operational overhead. It requires no warehouse, runs on lean inventory management, and relies on long-standing supplier relationships in Australia and Asia.

Brand Positioning & Customer Base

Rude Rainbow is a lifestyle brand at the intersection of fashion, inclusivity, and event culture. While the LGBTQ+ community was an early adopter, the brand now serves:

Festival and event attendees
Families and children (for colourful fans and party gear)
Tourists and beachgoers
Corporate buyers and event organisers
Retail stores and boutique wholesalers

With 10,821 total Shopify customers and over 6,500 email subscribers, the brand has a demonstrable foundation for recurring revenue and strong customer loyalty.

Marketing & Reach

Instagram: 14,600 followers
TikTok: 5,390 followers
Facebook: 2,000 followers
Email Subscribers: 6,500
Authority Score: 18 | 544 referring`,
  },
  {
    id: `12282678`,
    title: `JOCKBOX`,
    revealedName: `JOCKBOX`,
    url: `https://flippa.com/12282678`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 21000.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 2144.0,
    profitMargin: `54%`,
    annualRevenue: `GBP £37,522`,
    annualProfit: `GBP £20,261`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `MO, United States`,
    platform: `with`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US-based curated men's underwear retailer targeting LGBTQ+ market; physical inventory-based ecommerce requires US wareho`,
    ],
    greenFlags: [],
    seller: {
      name: `daniel lyons`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `2,400 followers`,
      `9,000 followers`,
      `2,999 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £7,504 Included in sale price`,
      `Shopify`,
      `Included.`,
      `2,400 followers`,
      `9,000 followers`,
      `2,999 followers`,
      `8,000 subscribers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $25,000`,
      `USD $21`,
    ],
    postSaleSupport: `is provided to ensure a smooth transition and operational continuity.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `74,038`,
      totalPageViews: `17,451`,
      pagesPerSession: `2.17`,
      avgDuration: `00:00:28`,
      engagementRate: `0.60%`,
      topCountries: [
        {
          country: `United States`,
          views: 6672,
        },
        {
          country: `United Kingdom`,
          views: 1833,
        },
        {
          country: `China`,
          views: 1626,
        },
        {
          country: `Canada`,
          views: 539,
        },
        {
          country: `Brazil`,
          views: 450,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 377,
    watchers: 15,
    about: `JOCKBOX: Business Overview

JOCKBOX is a niche direct-to-consumer ecommerce retailer specializing in curated men’s underwear, with a strong focus on the LGBTQ+ market. Established in 2021 and now operating from the United States, the business has built a distinct brand positioned as a one-stop destination for premium and fashion-forward underwear from leading global labels. By combining a curated product assortment with a community-driven identity, the company has developed strong customer loyalty and repeat purchasing behavior.

The business generates approximately USD 50,000 in annual revenue and USD 27,000 in annual profit, representing a healthy 54% profit margin. Average monthly revenue stands at roughly USD 4,166 with average monthly profit of about USD 2,249, supported by a mix of direct ecommerce sales and recurring subscription revenue. The subscription offering provides predictable baseline income and reduces reliance on constant customer acquisition.

Operations are streamlined through a US-based third-party logistics provider, allowing the business to function as a flexible, low-touch ecommerce operation. With established supplier relationships across recognized underwear brands and an engaged customer base spanning the United States and the United Kingdom, JOCKBOX presents a scalable platform with strong fundamentals already in place.

Key Financials (TTM Ending February 2026)

Revenue: USD 50,000
Profit: USD 27,000
Average Monthly Revenue: USD 4,166
Average Monthly Profit: USD 2,249
Profit Margin: 54%

The business demonstrates consistent profitability with controlled operating costs. Primary expenses include warehousing and platform fees, enabling strong contribution margins and operational efficiency. Performance is supported by recurring subscription revenue and steady ecommerce demand across core product categories.

Business Model & Revenue Streams

JOCKBOX operates as a Shopify-based ecommerce retailer monetizing through direct product sales and a subscription program that delivers recurring shipments of underwear to customers. This hybrid model combines predictable recurring revenue with transactional sales, improving cash flow stability.

The curated assortment includes products from well-known brands within the niche, allowing the business to benefit from existing brand recognition while maintaining its own identity as a specialist retailer. Established supplier relationships ensure reliable inventory sourcing and consistent product quality.

Customers & Market Position

The business serves a global customer base with a strong concentration in the United States and United Kingdom. Since launch, the store has acquired more than ten thousand customers and maintains a sizable email database, providing a foundation for repeat purchases and targeted marketing campaigns.
Average order value is approximately USD 52 with customers purchasing roughly two items per transaction. A zero percent refund rate indicates strong customer sat`,
  },
  {
    id: `12001239`,
    title: `ELOHIM BIJOUX`,
    revealedName: `ELOHIM BIJOUX`,
    url: `https://flippa.com/12001239`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 47679.0,
    monthlyPL: [
      { month: `Jul 2024`, revenue: 3990.34, expenses: 66.04, profit: 3924.3 },
      { month: `Aug 2024`, revenue: 3891.28, expenses: 66.04, profit: 3825.24 },
      { month: `Sep 2024`, revenue: 2858.77, expenses: 66.04, profit: 2792.73 },
      { month: `Oct 2024`, revenue: 3215.64, expenses: 66.04, profit: 3149.6 },
      { month: `Nov 2024`, revenue: 5287.01, expenses: 66.04, profit: 5220.97 },
      { month: `Dec 2024`, revenue: 8327.39, expenses: 66.04, profit: 8260.08 },
      { month: `Jan 2025`, revenue: 1758.95, expenses: 66.04, profit: 1692.91 },
      { month: `Feb 2025`, revenue: 1954.53, expenses: 66.04, profit: 1887.22 },
      { month: `Mar 2025`, revenue: 4561.84, expenses: 66.04, profit: 4493.26 },
      { month: `Apr 2025`, revenue: 2696.21, expenses: 66.04, profit: 2630.17 },
      { month: `May 2025`, revenue: 1826.26, expenses: 66.04, profit: 1758.95 },
      { month: `Jun 2025`, revenue: 943.61, expenses: 66.04, profit: 876.3 },
    ],
    avgMonthlyRevenue: 3443.0,
    avgMonthlyProfit: 3376.0,
    profitMargin: `98%`,
    annualRevenue: `GBP £32,530`,
    annualProfit: `GBP £31,900`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `France`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `French Christian jewelry brand with €21K physical inventory. Physical product shipped from France; not operatable from B`,
      `Revenue declining sharply (-49.1% trend)`,
      `High revenue volatility (CV 56%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Lune Dieu`,
      location: `France`,
      verified: true,
    },
    socialMedia: [
      `6,500 followers`,
      `37,000 followers`,
    ],
    expenses: [
      {
        item: `marketing`,
        amount: `GBP £44 /month`,
      },
      {
        item: `Frais de plateforme`,
        amount: `GBP £86 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £18,415 Included in sale price`,
      `Shopify`,
      `6,500 followers`,
      `37,000 followers`,
      `4,289 subscribers`,
      `Attachments`,
      `IMG_5733`,
      `IMG_5732`,
      `IMG_2073`,
    ],
    postSaleSupport: `package`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1288,
    watchers: 31,
    about: `ELOHIM BIJOUX – Profitable Christian Jewelry Brand | €21K Inventory | 98% Margin

Business Overview

Elohim Bijoux is a fast-growing, purpose-driven e-commerce brand based in France, specializing in high-quality Christian jewelry. Launched in October 2023, the brand has quickly gained traction by blending spiritual symbolism with modern aesthetics—offering cross necklaces, bracelets, rings, and earrings in stainless steel and 18 K gold plating. Designed for individuals who wish to express their faith through stylish, durable accessories.

Traffic, Marketing & Audience

Shopify store optimized for SEO; 96 ranking keywords, domain authority score 10, 23 referring domains, 30 backlinks
Social presence: Instagram 6,500 followers; TikTok 37,000 followers—all included in the sale
Engaged email list: 4,200+ subscribers with automated email sequences driving repeat purchases
Organic & ad performance: product videos on-site; TikTok and Instagram growing with active engagement

Inventory & Fulfillment

Inventory on hand valued at approximately USD $24,539 (€21,000), included in sale
Self-fulfilled logistics with in-house stock—flexible to continue or outsource
Supplier contracts transferable to buyer

Brand Position & Market Opportunity

Positioning: Underserved Christian niche with strong emotional resonance and modern design
Product quality: Durable materials, water-resistant stainless steel, 18 K gold plated, embedded zircon
Website product collections include “Best‑Seller,” “Évangiles,” “Exode,” “Lévitiques,” “Corinthiens,” supported by blog content on spiritual jewelry
Market growth: Spiritual and ethical accessories gaining popularity; few competitors match Elohim Bijoux’s quality/style combo

Growth Opportunities

Expand product line to include new jewelry types or accessories
Scale paid social and influencer campaigns (TikTok/Instagram) to drive awareness
Launch collaborations with complementary faith‑based brands/events
Target international markets (Belgium, Canada, Switzerland, US) using existing Shopify multi‑currency setup
Boost SEO and content marketing—shop rankings already solid (96 keywords)

Why Invest & Transition

Immediate cashflow: high-margin business with minimal overhead and recurring sales
Turnkey operation: store, domain, inventory, brand visuals, social channels, email system, supplier agreements, supplier relationships
Owner support: post-sale training and onboarding included
Reason for sale: Owner shifting focus to family and offline life project; brand is healthy, profitable and scalable

What You’ll Receive

Fully‑optimized Shopify store with global multi-currency capabilities
€21,000 stock inventory
Social media accounts: Instagram + TikTok (43,500+ combined followers)
Email list of 4,200+ subscribers and active flows
Supplier contracts and logistics setup
Brand assets: logos, visuals, product photos, video library
Post-sale support package

Conclusion

Elohim Bijoux is a rare opportunity to acquire a profitable, emotionally`,
  },
  {
    id: `11972492`,
    title: `Sun Tallow`,
    revealedName: `Sun Tallow`,
    url: `https://flippa.com/11972492`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 40000.0,
    avgMonthlyRevenue: 3872.0,
    avgMonthlyProfit: 2935.0,
    profitMargin: `76%`,
    annualRevenue: `GBP £36,590`,
    annualProfit: `GBP £27,731`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `SC, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Sun Tallow) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Kyle Gagliano`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `471 followers`,
      `127 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Cost of goods`,
        amount: `GBP £438 /month`,
      },
      {
        item: `Shopify fees`,
        amount: `GBP £44 /month`,
      },
      {
        item: `Payment processing`,
        amount: `GBP £88 /month`,
      },
      {
        item: `Shipping charges`,
        amount: `GBP £146 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `471 followers`,
      `127 followers`,
      `0 followers`,
      `3,140 subscribers`,
      `Contact Seller`,
      `Send message`,
      `Kyle Gagliano Mar 12, 2026 11:53 AM`,
      `Report this c`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Kyle Gagliano`,
        date: `Mar 12, 2026 11:53 AM`,
        text: `@smurk75 No not really. Some uptick in summer because people are trying to be healthier.`,
      },
      {
        author: `Sam Ruiz`,
        date: `Mar 12, 2026 11:38 AM`,
        text: `Is there seasonality to this? Looking at last 12 months traffic and see trending down with the exception of October.`,
      },
    ],
    ga: {
      users: `6,093`,
      totalPageViews: `1,079`,
      pagesPerSession: `1.83`,
      avgDuration: `00:00:27`,
      engagementRate: `0.42%`,
      topCountries: [
        {
          country: `United States`,
          views: 430,
        },
        {
          country: `Canada`,
          views: 43,
        },
        {
          country: `United Kingdom`,
          views: 29,
        },
        {
          country: `China`,
          views: 24,
        },
        {
          country: `Singapore`,
          views: 8,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1739,
    watchers: 60,
    commentCount: 2,
    about: `I started this business in Sept of 2023. It grew quickly and has a solid base of return customers that love and swear by the product. This product has since become an extremely hot niche, there is huge potential for scale. I started running paid social around Spring of 2024 and the business erupted. April of 2024 it had a $20k month, with an average ROAS of something crazy like 5. It started off as one product and grew to two. Morning and night product bundle. This increased the average order value for the year to about $64. I have not put much effort into paid social. This could be a huge success with Amazon. And an even bigger success with Tiktok shop and the opportunity for virality on this product.

It was a nice side business for me. It needs someone who understand Google ads and paid social. There is so much opportunity here for the right person. It has a very unique selling point in that it uses USDA certified organic ingredients. I have not seen skincare in this niche that has that selling point.

Big profits, potential for virality, hot niche, and Amazon/Tiktok is open for the taking.

This is a physical product that you will have to make, pack, and ship. It's not hard, but requires the knowledge I have accrued through many mistakes and learning. It's an easy setup that you can run from your own home. This is the ultimate business for someone who wants something with longevity. I will give you all of the ideas I have for more product additions that have low competition and infinite potential.`,
  },
  {
    id: `11859646`,
    title: `lashhuggers.com`,
    revealedName: `lashhuggers.com`,
    url: `https://flippa.com/11859646`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 31334.0,
    avgMonthlyRevenue: 4897.0,
    avgMonthlyProfit: 2522.0,
    profitMargin: `51%`,
    annualRevenue: `GBP £46,273`,
    annualProfit: `GBP £23,830`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Organization`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 61.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (lashhuggers.com) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Abdirahman Ahmed`,
      location: `United Kingdom`,
      verified: true,
    },
    socialMedia: [
      `19,496 followers`,
      `35,000 followers`,
    ],
    expenses: [
      {
        item: `shipping`,
        amount: `GBP £1,576 /month`,
      },
      {
        item: `Amazon mcf fees`,
        amount: `GBP £188 /month`,
      },
      {
        item: `Shopify fees`,
        amount: `GBP £140 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Organization Schema`,
      `Included.`,
      `19,496 followers`,
      `35,000 followers`,
      `10,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Lashhuggers P&L 2024`,
      `XLSX`,
      `Lashhuggers P&L 2023`,
      `XLSX`,
      `Lashhuggers P&L 2024`,
      `Lashhuggers P&L 2025.`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1425,
    watchers: 42,
    about: `Lashhuggers.com is a boutique brand that has made a name for itself in the thriving health and beauty industry. Since launching in 2021, the business has steadily grown, generating $86,000 in annual revenue with an impressive 55% profit margin. This is more than just a business—it's a turnkey opportunity to step into a lucrative and established brand with clear potential for expansion.

What Sets Lashhuggers.com Apart:

Proven Track Record:
Over the past few years, Lashhuggers.com has earned a reputation for quality and reliability, becoming a trusted destination for premium beauty and wellness products.

Consistent Performance:
With steady, year-over-year revenue, the business has carved out a niche in a competitive market and shows no signs of slowing down.

Strong Profitability:
With a healthy 55% profit margin, the business model is lean, efficient, and primed for scaling—offering excellent returns on investment.

Established Digital Footprint:
The brand’s domain authority of 9 reflects a solid online presence and lays the foundation for continued growth through targeted digital marketing.

Why Invest in Lashhuggers.com?

Brand Loyalty:
A loyal customer base and a reputation for exceptional service are the cornerstones of this business. Buyers can step in with confidence, knowing they’re acquiring more than just a store—they’re inheriting a brand with real staying power.

Growth Potential:
The health and beauty market continues to thrive, and Lashhuggers.com is perfectly positioned to ride that wave. From launching new product lines to enhancing marketing strategies, the growth opportunities are vast.

At a Glance:

Annual Revenue: $86,000

Profit Margin: 55%

Founded: 2021

Niche: Health & Beauty eCommerce

Looking Ahead:

This is an ideal opportunity for an entrepreneur or investor looking to enter (or expand within) the health and beauty space. With a strong foundation already in place, a new owner can build on existing success, unlock untapped potential, and elevate Lashhuggers.com to the next level.

Why Now?

We're incredibly proud of what we've built, and it’s been a rewarding journey. However, due to changing personal circumstances, we're ready to pass the torch to someone who shares the same passion for beauty and wellness. The brand is poised for even greater success with the right leadership.

Your next great venture could begin here. Lashhuggers.com is ready—are you?`,
  },
  {
    id: `12095963`,
    title: `Casedodo`,
    revealedName: `Casedodo`,
    url: `https://flippa.com/12095963`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 75000.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 13483.59, expenses: 11517.63, profit: 1965.96 },
      { month: `Apr 2025`, revenue: 9624.06, expenses: 8896.35, profit: 727.71 },
      { month: `May 2025`, revenue: 14886.94, expenses: 12294.87, profit: 2592.07 },
      { month: `Jun 2025`, revenue: 21423.63, expenses: 16836.39, profit: 4588.51 },
      { month: `Jul 2025`, revenue: 19061.43, expenses: 14296.39, profit: 4765.04 },
      { month: `Aug 2025`, revenue: 10960.1, expenses: 8220.71, profit: 2740.66 },
      { month: `Sep 2025`, revenue: 15422.88, expenses: 11579.86, profit: 3844.29 },
      { month: `Oct 2025`, revenue: 12096.75, expenses: 10543.54, profit: 1551.94 },
      { month: `Nov 2025`, revenue: 9201.15, expenses: 7799.07, profit: 1402.08 },
      { month: `Dec 2025`, revenue: 8801.1, expenses: 6927.85, profit: 1873.25 },
      { month: `Jan 2026`, revenue: 7771.13, expenses: 6216.65, profit: 1554.48 },
      { month: `Feb 2026`, revenue: 3656.33, expenses: 1313.18, profit: 2343.15 },
    ],
    avgMonthlyRevenue: 12199.0,
    avgMonthlyProfit: 2496.0,
    profitMargin: `20%`,
    annualRevenue: `GBP £115,268`,
    annualProfit: `GBP £23,582`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `India`,
    platform: `transaction`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 67.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 61.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Indian D2C brand selling iPhone cases and Apple accessories (since 2014). Physical inventory in India; complex cross-bor`,
      `Revenue declining sharply (-46.8% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `3 transactions totalling USD $5,399,907`,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £798 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £3,315 /month`,
      },
      {
        item: `warehousing & operational expenses`,
        amount: `GBP £529 /month`,
      },
      {
        item: `Customer Support`,
        amount: `GBP £400 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £37,522 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `76,000 followers`,
      `41,000 followers`,
      `700 followers`,
      `279,104 subscribers`,
      `Attachments`,
      `XLSX`,
      `Case Dodo P&L`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for nego`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `876,860`,
      totalPageViews: `187,391`,
      pagesPerSession: `1.94`,
      avgDuration: `00:00:18`,
      engagementRate: `0.43%`,
      topCountries: [
        {
          country: `India`,
          views: 37070,
        },
        {
          country: `Germany`,
          views: 456,
        },
        {
          country: `China`,
          views: 375,
        },
        {
          country: `United States`,
          views: 342,
        },
        {
          country: `Singapore`,
          views: 100,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 1149,
    watchers: 57,
    about: `Business Overview

Founded in 2014, Casedodo is a profitable, legacy Indian direct-to-consumer (D2C) brand specializing in ultra-thin iPhone cases, charging cables, and Apple Watch bands. Over the past decade, Casedodo has established itself as a go-to destination for minimal, sleek accessories — racking up over ₹25 Cr (~US$3.3M) in total revenue from 278,000+ online orders on its flagship Shopify store alone

With 179,000 paying customers, over 277,000 customer records, and 41K+ followers on Instagram, the business has a strong brand moat and robust operating infrastructure. Operating at 22–25% net margins, Casedodo runs lean and is built for scale.

Now available for acquisition as the founder focuses on a fast-scaling paper goods venture, this is a rare opportunity to acquire a 9-year-old brand with a solid foundation, large customer base, and optional turnkey operations in India.

Key Features

277,000 email subscribers
Operating at a 22-25% net margin
ROAS of 4+
Team with tenure of over 7 years 

Operations & Team

Casedodo operates from a fully established warehouse and office in India, with fulfillment capacity of up to 3,000 orders per month comfortably and 5,000 in the busy periods. 3 long term suppliers with additional supporting suppliers, all located in China. The team comprises two operational staff members managing pick-and-pack logistics (one acting as the senior operator), one part-time accountant, and a freelance designer responsible for all content and creative assets. All team members have been with Casedodo for 7+ years. 

The current owner is only marginally involved in the day-to-day (approximately 5% of operations), focusing primarily on product development.

Post-acquisition, the existing infrastructure and team can be retained, or the business can be transitioned to a third-party logistics (3PL) provider if preferred.

Product, Brand & Marketing

The brand offers a curated catalog of approximately 200 SKUs, led by its hero product: ultra-thin iPhone cases that have remained best-sellers since launch. This core offering is complemented by colorful charging cables and a growing range of Apple Watch bands. Casedodo is known for its high-quality packaging, efficient fulfillment processes, and a clean, minimalistic brand identity that resonates with design-conscious consumers. The brand is further protected by a registered Indian trademark with nine years of goodwill and recognition, lending long-term credibility and defensibility.

On the marketing front, Casedodo runs high-performing paid campaigns primarily through Meta and Twitter Ads, achieving a blended Return on Ad Spend (ROAS) of 4.0x or more. Marketing spend currently sits between 20–25% of total revenue, and all media buying is handled internally by the founder.

Notably, the business has not yet leveraged retargeting ads, email marketing flows, or influencer partnerships making these immediate growth levers for a new owner. With strong product-market fit and a high-`,
  },
  {
    id: `12163685`,
    title: `HARRY AUSTIN`,
    revealedName: `HARRY AUSTIN`,
    url: `https://flippa.com/12163685`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 37227.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 15203.17, expenses: 10069.83, profit: 5133.34 },
      { month: `Apr 2025`, revenue: 28046.68, expenses: 18000.98, profit: 10046.97 },
      { month: `May 2025`, revenue: 11710.67, expenses: 10506.71, profit: 1205.23 },
      { month: `Jun 2025`, revenue: 30657.8, expenses: 4766.31, profit: 25891.49 },
      { month: `Jul 2025`, revenue: 14857.73, expenses: 21078.19, profit: -6219.19 },
      { month: `Aug 2025`, revenue: 14959.33, expenses: 18428.97, profit: -3468.37 },
      { month: `Sep 2025`, revenue: 9081.77, expenses: 19356.07, profit: -10273.03 },
      { month: `Oct 2025`, revenue: 12147.55, expenses: 7122.16, profit: 5026.66 },
      { month: `Nov 2025`, revenue: 29356.05, expenses: 14307.82, profit: 15046.96 },
      { month: `Dec 2025`, revenue: 18319.75, expenses: 19885.66, profit: -1564.64 },
      { month: `Jan 2026`, revenue: 7792.72, expenses: 15501.62, profit: -7708.9 },
      { month: `Feb 2026`, revenue: 8949.69, expenses: 7821.93, profit: 1129.03 },
    ],
    avgMonthlyRevenue: 16757.0,
    avgMonthlyProfit: 2854.0,
    profitMargin: `17%`,
    annualRevenue: `GBP £158,335`,
    annualProfit: `GBP £26,961`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 50.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (HARRY AUSTIN) — identified from listing description`,
      `Revenue declining sharply (-36.2% trend)`,
      `5 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `6 transactions totalling USD $7,904,502`,
    },
    expenses: [
      {
        item: `month
Subscriptions`,
        amount: `GBP £197 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £29,846 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `2,200 followers`,
      `11,100 followers`,
      `0 subscribers`,
      `12,043 subscribers`,
      `Attachments`,
      `XLSX`,
      `_Harry Austin P&L (March 2025 - Feb 2026)`,
      `No comments`,
      `Managed by F`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `90,681`,
      totalPageViews: `32,142`,
      pagesPerSession: `3.31`,
      avgDuration: `00:00:21`,
      engagementRate: `0.96%`,
      topCountries: [
        {
          country: `Australia`,
          views: 18828,
        },
        {
          country: `United States`,
          views: 1317,
        },
        {
          country: `New Zealand`,
          views: 236,
        },
        {
          country: `United Kingdom`,
          views: 62,
        },
        {
          country: `China`,
          views: 57,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1157,
    watchers: 72,
    about: `Founded in Australia in 2019, Harry Austin Bags is a premium, direct-to-consumer handbag brand specializing in high-quality Italian leather products that bridge the gap between ultra-expensive designer bags and fast-fashion alternatives. The brand was born from the founder’s years of design experience and immersion in Florence, Italy, working alongside master artisans at iconic luxury brands.

Since launch, the product line has evolved from niche baby bags to versatile, timeless handbags for all women. The brand combines practicality, durability, and elevated design, setting it apart from competitors and cultivating a loyal following.

Marketing channels driving growth include Meta Ads, Google Ads, email campaigns, influencer partnerships, and PR in digital and print media. Word-of-mouth continues to be a strong contributor to sales.

---

Financials and Business Model

Average Order Value (AOV): $269 (12 months), $253 (last 90 days)

Revenue Channels: 100% DTC via Shopify

Repeat Purchase Rate: 30% annually

Refund/Return Rate: 2.36%

Peak months during November (Black Friday/Cyber Monday), we are also see strong sale periods during Easter and End of financial year June.

Wholesale opportunities remain largely untapped, with numerous inquiries from potential partners.

----

Reason for Selling: The founder is looking to focus on other professional commitments and passions. The business is turnkey and ready for a buyer to scale internationally, expand product lines, and optimise marketing.

Training and support will be provided post-sale and is negotiatble

---

Operations

Supply Chain & Manufacturing:

Sourced in Italy and China; imported to Australia.

Longstanding relationships: 1 Italian supplier, 3 Chinese suppliers (5+ years each).

Fulfillment:

Warehouse in Australia handles all pick, pack, and shipping.

Team (Contractors):

Email Marketer: 4x campaigns/month, 20 hrs/mo

Digital Marketing Agency: 3–4 people, Meta media buying & content creation

Social Media Manager: 20 hrs/mo

Accountant: part-time

Fulfillment Warehouse Staff: retainer + per shipment cost

Lifestyle Photo Shoot Stylist/Manager & Photographer: ½ day per annum per shoot

Owner Involvement: ~5–10 hours/week (marketing, brand direction, product management, content oversight, strategic decisions).

Tasks like customer service, media buying, social content, and product design could be further outsourced.

Customer Base & Marketing

Target: Australian women, 35–64

Acquisition Channels: SEO, Google Ads, Meta Ads, email, social media, influencers, PR

Email List: 12K+ subscribers via Klaviyo

Social Media: Instagram 11.1K, Facebook 2.2K, YouTube

Repeat Purchase: 30% annually

Marketing underutilized in some areas: influencer collaborations, international expansion, Amazon, wholesale

---

Growth Opportunities

International expansion through targeted marketing and paid advertising

Expansion of Meta, Google, and influencer campaigns

Wholesale distribution (100+ inquiries fr`,
  },
  {
    id: `11863533`,
    title: `LinenFriday`,
    revealedName: `LinenFriday`,
    url: `https://flippa.com/11863533`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 58576.0,
    avgMonthlyRevenue: 7642.0,
    avgMonthlyProfit: 2929.0,
    profitMargin: `38%`,
    annualRevenue: `GBP £72,213`,
    annualProfit: `GBP £27,668`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Slovenia`,
    platform: `fees`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Slovenia-based EU-registered linen textile brand selling on Shopify, Amazon EU/US, and eBay.de; physical product invento`,
    ],
    greenFlags: [],
    seller: {
      name: `Denis`,
      location: `Slovenia`,
      verified: true,
    },
    socialMedia: [
      `587 followers`,
      `943 followers`,
      `1 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £352 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £313 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £334 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £820 /month`,
      },
      {
        item: `Accounting`,
        amount: `GBP £122 /month`,
      },
      {
        item: `Goods`,
        amount: `GBP £3,126 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `587 followers`,
      `943 followers`,
      `1 followers`,
      `11 subscribers`,
      `130 subscribers`,
      `Attachments`,
      `XLSX`,
      `P_L LinenFriday 2023`,
      `XLSX`,
      `P_L LinenFriday 2024`,
      `XLSX`,
      `P_L LinenFriday 2025`,
      `Denis Apr 15, 2025 03:45 AM`,
      `Please find the monthly financi`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Denis`,
        date: `Apr 15, 2025 03:45 AM`,
        text: `Please find the monthly financials for 2024 and 2025 attached for your review.`,
      },
    ],
    ga: {
      users: `44,503`,
      totalPageViews: `4,954`,
      pagesPerSession: `1.18`,
      avgDuration: `00:00:15`,
      engagementRate: `0.03%`,
      topCountries: [
        {
          country: `Slovenia`,
          views: 947,
        },
        {
          country: `Romania`,
          views: 582,
        },
        {
          country: `India`,
          views: 570,
        },
        {
          country: `China`,
          views: 270,
        },
        {
          country: `Poland`,
          views: 250,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1170,
    watchers: 68,
    commentCount: 1,
    about: `Digital assets for sale:


LinenFriday is an EU-registered brand (classes 24, 25) specializing in high-quality linen home textiles and fashion accessories. The brand is established across multiple platforms, including Shopify, Amazon (EU & US), eBay.de, and Instagram.

I have developed this business over the past 8.5 years, and it is now positioned to reach the next level.

What LinenFriday is about: A DTC, B2C, and B2B eCommerce business that offers:

Home Textiles: Linen bed linens, table linens, kitchen towels.
Fashion Accessories: Linen scarves.
Fabrics
Expansion Opportunity: There’s plenty of room to grow. You could add: home decor, tableware, kitchenware, curtains, apparel, furniture and more

Sales Channels:

Shopify Store: linenfriday.com domen age - 7 years.
Amazon EU & US (FBM & FBA).
eBay.de
Instagram account @linenfriday
FB, TikTok, Youtube, Pinterest

Right now, it’s just me running everything, but I’ve used freelancers for things like SEO and website fixes. I manage the day-to-day operations, including order fulfillment. I’ll also provide you with all the details of the suppliers I work with, so you can easily keep things going.

LinenFriday offers a stable base for a successful business with a loyal customer base, with over 500 positive reviews across Shopify, Etsy, Amazon, and eBay. The brand has a good reputation, and the structure is in place for you to scale quickly. Whether you're looking to add more products, improve marketing, or expand into new markets, the foundation is strong for future growth.



Please find the monthly financials for 2024 and 2025 attached for your review.

To provide some context on recent performance: toward the end of 2024, I encountered some financial challenges that limited my ability to restock inventory and invest in advertising, which impacted revenue growth. Additionally, in January 2025, I underwent a planned surgery, requiring over a month of recovery. During this time, I significantly reduced my involvement in daily operations and paused nearly all advertising efforts.

Now that I’m fully recovered, I’ve resumed operations at full capacity, working to rebuild momentum by restocking products and restarting advertising campaigns. I believe the business still holds great potential and would thrive under new ownership, especially with the right resources and team to scale it further.

Feel free to reach out with any questions, or to schedule a call if you'd like to discuss this in more detail.`,
  },
  {
    id: `12291759`,
    title: `Alpsland`,
    revealedName: `Alpsland`,
    url: `https://flippa.com/12291759`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 150000.0,
    avgMonthlyRevenue: 20700.0,
    avgMonthlyProfit: 6820.0,
    profitMargin: `33%`,
    annualRevenue: `GBP £195,586`,
    annualProfit: `GBP £64,444`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Italy`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Shopify store selling Alpine/outdoor lifestyle physical products (Italy). Physical inventory and shipping required — not`,
    ],
    greenFlags: [],
    seller: {
      name: `Anton Dandler`,
      location: `Italy`,
      verified: true,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,123 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £2,268 /month`,
      },
      {
        item: `Goods`,
        amount: `GBP £1,873 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `10,400 followers`,
      `44,000 followers`,
      `10,700 subscribers`,
      `Attachments`,
      `Bildschirmfoto 2026-02-02 um 11.53.28`,
      `Bildschirmfoto 2026-01-26 um 16.26.19`,
      `Bildschirmfoto 2026-01-26 um 16.27.05`,
      `Bildschirmfoto 2026-02-02 um 14.26.`,
    ],
    postSaleSupport: `To ensure your success, I will provide a 30 days of comprehensive email support.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `270,089`,
      totalPageViews: `54,654`,
      pagesPerSession: `1.57`,
      avgDuration: `00:00:10`,
      engagementRate: `0.12%`,
      topCountries: [
        {
          country: `China`,
          views: 75030,
        },
        {
          country: `Germany`,
          views: 14738,
        },
        {
          country: `Switzerland`,
          views: 4482,
        },
        {
          country: `Italy`,
          views: 4417,
        },
        {
          country: `Austria`,
          views: 3756,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 304,
    watchers: 9,
    about: `For sale is a highly profitable, 5-year-old Shopify store in the evergreen "Alpine & Outdoor Lifestyle" niche. The business has demonstrated consistent growth over three years, culminating in $260,629 in revenue and $85,875 in net profit in the last twelve months (2025).

The brand has a strong history of growth, including an explosive 87.2% YoY profit increase from 2023 to 2024, and has doubled its net profit over the last three years.

This is a unique opportunity to acquire a beloved brand with a strong identity, a loyal customer base, and a highly automated operational structure. This business was started by a solo founder with a passion for the outdoors, who has successfully grown it into a profitable, streamlined operation.

Our main competitors are other general outdoor apparel brands, but our unique selling proposition is our authentic focus on the Alpine niche and our highly automated marketing systems.


Monetization & Financials

The business makes money through a primary, straightforward monetization method: E-commerce Sales.

We sell a curated collection of physical products directly to consumers via our Shopify store. All revenue and profit figures are verifiable through the attached P&L statements and connected Shopify/PayPal accounts.

Key Financials (2025):

Revenue: $260,629
Net Profit: $85,875
Seller Discretionary Earnings (SDE): $91,649
Profit Margin: 32.9%


Operations & Day-to-Day

This business is built for efficiency, allowing it to be run with minimal time commitment (<10 hours per week).

1. Hybrid Fulfillment Model:

Apparel (Hoodies, Shirts, etc.): Currently self-fulfilled from a small, manageable inventory. This ensures maximum quality control and higher profit margins. The entire process is documented in SOPs and can be easily outsourced to a 3PL.


Art Prints & Posters: 100% automated via Print-on-Demand (POD) with Gelato. Orders are automatically produced and shipped directly to the customer worldwide without any manual intervention.

2. Fully Automated Social Media Marketing:

Our entire social media presence (Instagram, Facebook) is managed by a sophisticated, custom-built n8n workflow. This system autonomously creates and schedules high-quality content, driving engagement and sales on autopilot. This is a significant, custom-built asset included in the sale.

A typical week involves:
Responding to a few customer service emails.
Packing and shipping apparel orders (2-3 times a week).
Monitoring ad performance (optional).


** The Opportunity: Massive Scaling Potential **

This business is perfectly positioned for explosive growth. The foundation is solid, but numerous high-impact growth levers remain untouched.

1. Transition to 100% Print-on-Demand (The #1 Opportunity):
The Path to a Fully Passive Business: The most significant opportunity is to transition the apparel fulfillment to a POD provider like Printful, Printify, or Gelato. This would make the business 100% location-independent and reduce the time commi`,
  },
  {
    id: `12641634`,
    title: `Ecommerce Store | Home and Garden`,
    revealedName: `Ecommerce Store | Home and Garden`,
    url: `https://flippa.com/12641634`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 150000.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 6584.0,
    profitMargin: `35%`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `TN, United States`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Local firewood delivery business in Tennessee, US — requires physical trucks, local supply chain, and geographic presenc`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 160,
    watchers: 1,
    about: `n established and reputable firewood delivery business offers services to both residential and commercial clients, effectively capitalizing on local market demands. With a straightforward and proven business model, it ensures immediate cash flow and operates with high margins, bolstered by scalable delivery operations. Situated in a region with consistent demand, the business can leverage seasonal demand peaks and capitalize on year-round opportunities. The operational framework, which includes sourcing logs, processing firewood, managing customer relations, and delivery logistics, is streamlined and efficient, requiring minimal staffing and time commitment, making it ideal for potential scaling. The customer base comprises primarily residential homeowners, along with restaurants and other commercial entities, ensuring repeat weekly revenue. The business benefits significantly from local word-of-mouth referrals and engagement through social media platforms, ensuring a robust and loyal customer network. The revenue model, underpinned by profitable pricing that includes delivery, can be expanded through increased production, advertising, or diversifying product offerings like bundled wood and subscriptions. Financially, the business is healthy, with steady cash flow and lucrative margins. It is positioned for potential expansion with strategic marketing, enhanced delivery areas, and additional staffing. The operation is built on a solid foundation of validated customer demand, efficient workflow, and effective pricing strategies, making it an attractive opportunity for those interested in a hands-on, profitable enterprise. Whether run as a side business or scaled to a full-time operation, the venture offers multiple growth avenues, appealing particularly to individuals desiring to scale a service business or grow an already functioning system.`,
  },
  {
    id: `12028546`,
    title: `Aluxury®`,
    revealedName: `Aluxury®`,
    url: `https://flippa.com/12028546`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 133861.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 5973.0,
    profitMargin: `49%`,
    annualRevenue: `GBP £115,157`,
    annualProfit: `GBP £56,431`,
    expensesLastMonth: `GBP £6,392 /month`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `DTC ecommerce brand selling physical home fragrance products (diffusers, candles, oils) from UK. Physical goods require `,
    ],
    greenFlags: [],
    seller: {
      name: `Andrew Gaugler`,
      location: `United Kingdom`,
      verified: true,
      transactions: `1 transaction totalling USD $105,000`,
    },
    socialMedia: [
      `1,300 followers`,
      `5,000 followers`,
      `6 followers`,
      `1,200 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £6,392 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £11,555 Included in sale price`,
      `Shopify`,
      `Included.`,
      `1,300 followers`,
      `5,000 followers`,
      `6 followers`,
      `1,200 followers`,
      `400 subscribers`,
      `4,124 subscribers`,
      `Attachments`,
      `XLSX`,
      `_PNL Aluxury®`,
      `aluxur`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Wayne`,
        date: `Aug 25, 2025 03:03 AM`,
        text: `Hi

Interested in having an informal chat regarding the business please let me know your thoughts so we can arrange.

Many Thanks

Wayne`,
      },
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2244,
    watchers: 109,
    commentCount: 1,
    about: `Aluxury® is a premium, trademarked DTC eCommerce brand selling high-quality home fragrance products—including waterless diffusers, essential oils, and candles—via a Shopify store. Launched in late 2022, the brand has grown organically into a top-ranking player in its niche, with over 6,000 customers and 1,800+ verified reviews.​

The business was built by an experienced full-stack developer and marketing specialist with 15+ years in online ventures and a track record of multiple six- and eight-figure business exits. Rather than chase vanity metrics, the founder focused on building genuine competitive advantages: superior product features, top-tier organic search rankings, and exceptional unit economics that deliver 50%+ net margins.

Financial Overview

Revenue & Profitability:

2023: £82,318 revenue / -£17,858 net profit (launch/investment phase)

2024: £165,613 revenue / £32,138 net profit (19.4% margin)

2025 (full year): £115,157 revenue / £56,430 net profit (49% margin)​

Key Context on 2025 Performance:

The 2025 revenue appears lower than 2024, but this masks the real story. The bestselling Nebula diffuser was completely out of stock from May-September (5 months during peak season), with only limited inventory in April. During the stock-out period, the business survived purely on oil sales driven by organic search rankings, averaging £3,700/month. When inventory returned in late August/September, monthly revenue immediately jumped to £8,700-£18,500/month. This demonstrates both the challenge (undercapitalization) and the opportunity (proven demand + suppressed revenue potential).​

Unit Economics:

Average Order Value: £45.00​

COGS: 20% of revenue (£23,081 on £115,157 sales in 2025)​

Gross Margin: 80%​

Refund/Chargeback Rate: 0%​

Cost Structure (2025 Full Year):

Direct Cost of Goods: £9,763​

Shipping & Handling: £11,237​

Payment Processing: £2,081​

Total COGS: £23,081 (20% of revenue)​

Google Advertising: £18,259​

Facebook/Meta Advertising: £6,673​

Warehouse/Storage: £2,945​

Salaries/Wages: £7,119 (solo founder)​

Telecommunications: £518​

Other Operating: £132​

Total Operating Expenses: £35,645​

Advertising Performance:

Current ROAS approximately 300% across Google Shopping and Meta campaigns. Ad spend has been deliberately limited during stock-out periods, indicating significant room for profitable scaling once inventory is secured.

Recurring Revenue:
None currently, but the 26.29% repeat customer rate and consumable product nature (oils) make subscription implementation straightforward.​

Sales & Traffic

Platform & Distribution:

95% Shopify, 5% other channels​

Payment providers: Shopify Payments, PayPal, Klarna, Clearpay​

Recently enabled worldwide shipping (currently 99% UK customers)​

Product Portfolio:

SKUs: 80-90 across diffusers, essential oils, candles, and accessories​

Best Seller: Nebula™ Waterless Diffuser (enhanced features vs. competitors)​

Product Differentiation: Additional timing/mist modes, larger`,
  },
  {
    id: `12196542`,
    title: `Cork Company`,
    revealedName: `Cork Company`,
    url: `https://flippa.com/12196542`,
    domain: `https://oakviva.com/`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 74990.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 1116.33, expenses: 3507.74, profit: -2392.68 },
      { month: `Mar 2025`, revenue: 14246.86, expenses: 12867.64, profit: 1379.22 },
      { month: `Apr 2025`, revenue: 11695.43, expenses: 6522.72, profit: 5172.71 },
      { month: `May 2025`, revenue: 2874.01, expenses: 3840.48, profit: -965.2 },
      { month: `Jun 2025`, revenue: 4386.58, expenses: 3298.19, profit: 1088.39 },
      { month: `Jul 2025`, revenue: 11898.63, expenses: 11535.41, profit: 361.95 },
      { month: `Aug 2025`, revenue: 2736.85, expenses: 2603.5, profit: 132.08 },
      { month: `Sep 2025`, revenue: 2628.9, expenses: 1473.2, profit: 1155.7 },
      { month: `Oct 2025`, revenue: 1883.41, expenses: 915.67, profit: 967.74 },
      { month: `Nov 2025`, revenue: 1386.84, expenses: 709.93, profit: 676.91 },
      { month: `Dec 2025`, revenue: 3186.43, expenses: 1736.09, profit: 1449.07 },
      { month: `Jan 2026`, revenue: 33959.8, expenses: 11520.17, profit: 22438.36 },
    ],
    avgMonthlyRevenue: 7667.0,
    avgMonthlyProfit: 2622.0,
    profitMargin: `34%`,
    annualRevenue: `GBP £72,439`,
    annualProfit: `GBP £24,775`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `delivering`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 60.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Premium cork wall panels, tiles, and furniture brand (Canada, ships from Portugal). Physical goods business requiring Eu`,
      `High revenue volatility (CV 118%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Slava`,
      location: `Canada`,
      verified: true,
      transactions: `1 transaction totalling USD $24,000`,
    },
    socialMedia: [
      `712 followers`,
      `18 followers`,
    ],
    expenses: [
      {
        item: `Shopify`,
        amount: `GBP £60 /month`,
      },
      {
        item: `Salesforce`,
        amount: `GBP £21 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £132 /month`,
      },
      {
        item: `Operations`,
        amount: `GBP £124 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Inventory value`,
      `GBP £11,365 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `712 followers`,
      `18 followers`,
      `874 subscribers`,
      `Attachments`,
      `XLSX`,
      `OakViva Interiors Inc._Profit and Loss Feb 2025-Jan 2026`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `15,073`,
      totalPageViews: `2,869`,
      pagesPerSession: `1.62`,
      avgDuration: `00:00:27`,
      engagementRate: `0.41%`,
      topCountries: [
        {
          country: `United States`,
          views: 1317,
        },
        {
          country: `China`,
          views: 158,
        },
        {
          country: `Canada`,
          views: 122,
        },
        {
          country: `United Kingdom`,
          views: 86,
        },
        {
          country: `Singapore`,
          views: 27,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 150,
    watchers: 1,
    about: `Cork Company is a premium sustainable interior design brand specializing in high-quality Portuguese cork wall panels, tiles, rugs, and furniture — all sustainably created in Portugal from the highest-grade natural materials in collaboration with trusted suppliers and expert artisans. The business combines timeless natural materials with modern aesthetics, appealing to architects, designers, and eco-conscious homeowners. Cork Company operates through a fully optimized Shopify store, with active sales channels on Google Shopping, Pinterest and Instagram, supported by strong SEO, product photography, and analytics integrations. The brand has been featured in notable commercial projects across the U.S., including installations for T-Mobile, Coinbase, and Google. With a growing interest in biophilic and acoustic design, Cork Company is ideally positioned for scale through both B2B and DTC markets.

Operations

Cork Company operates primarily through a streamlined e-commerce model built on Shopify, with automated order processing, inventory management, and integrated analytics. The business sources its products directly from established suppliers and manufacturers in Portugal, ensuring consistent quality and sustainable production standards. Orders are fulfilled on demand, with most products shipped directly from partner facilities or local inventory to minimize overhead and logistics complexity. Marketing and lead generation are driven by organic SEO, Google Shopping, Pinterest, and affiliate partnerships, supported by a growing database of trade and retail customers. The operation is fully remote and requires minimal daily management, making it easy to scale or transition to new ownership.

Customers

Cork Company serves a diverse and loyal customer base that includes interior designers, architects, installers, and eco-conscious homeowners seeking premium natural materials for both residential and commercial projects. The brand has built strong relationships within the architecture and design community, with products specified in high-profile projects such as corporate offices, restaurants, and hospitality spaces across the United States. Online, Cork Company attracts steady organic traffic through search, Pinterest, and Google Shopping, with customers drawn to its distinctive combination of aesthetic appeal, acoustic benefits, and sustainable sourcing.

Technology

Cork Company is built on a modern Shopify infrastructure optimized for performance, SEO, and multi-channel sales. The store integrates seamlessly with Google Shopping, Pinterest, and Instagram for automated product feeds and dynamic pricing updates. Marketing automation and analytics are managed through Shopify, GA4, Google Merchant Center, and email campaigns software, providing clear insights into traffic, conversions, and customer behavior. The backend includes custom data handling for product dimensions and square-foot pricing, streamlining updates across marketing platforms. All syst`,
  },
  {
    id: `12032376`,
    title: `Rowarth Design Ltd`,
    revealedName: `Rowarth Design Ltd`,
    url: `https://flippa.com/12032376`,
    domain: `https://quitsnoringsolution.com/`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 56170.0,
    avgMonthlyRevenue: 3446.0,
    avgMonthlyProfit: 2418.0,
    profitMargin: `70%`,
    annualRevenue: `GBP £32,554`,
    annualProfit: `GBP £22,850`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `New Zealand`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `New Zealand ecommerce brand selling physical anti-snoring/sleep apnea devices (mouthguards, chin straps). Physical produ`,
    ],
    greenFlags: [],
    seller: {
      name: `Michael Rowarth`,
      location: `New Zealand`,
      verified: false,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £338 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £327 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £150 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £29 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £8,180 Included in sale price`,
      `Organization Schema`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $56,17`,
    ],
    postSaleSupport: `ensures continuity and smooth ownership transition`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 791,
    watchers: 12,
    about: `Quit Snoring Solution: Business Overview

Quit Snoring Solution is a fast-growing ecommerce business dedicated to helping individuals reduce or eliminate snoring and sleep apnea through innovative, comfortable, and harm-free solutions. Founded in New Zealand in 2023, the brand has quickly established itself in the health and wellness niche with products designed to improve sleep quality for individuals and couples worldwide. With 4,700+ customers served in its first two years and a 70% profit margin, the business demonstrates strong traction, high scalability, and global operational flexibility. The assets are being sold independently of the parent company, making this a location-agnostic opportunity.

Business Highlights

Profitable, growing ecommerce brand with a mission-driven focus on health and sleep wellness
70% net margins supported by lean expenses and efficient fulfillment
High repeat potential from a broad, underserved global market
Product range positioned as innovative, comfortable, and differentiated from mainstream competitors
Scalable ecommerce model supported by Shopify with strong back-end infrastructure
Assets include domain, trademarks, custom technology, inventory, and full brand package
Seller offering 6 months of support, including supplier introductions, ensuring a smooth transition

Operations

Business operates primarily through Shopify with direct-to-consumer sales
Lean cost structure with monthly expenses under USD $1,200 (shipping, marketing, warehousing, platform fees)
Self-fulfillment of inventory with strong supplier relationships in place
No employees required; run directly by the owner with minimal oversight
Can be operated from anywhere globally with suppliers already handling logistics
Seller support available for six months post-sale for onboarding and continuity

Customers & Market

Target demographics include middle-aged adults experiencing snoring or sleep apnea, couples seeking solutions for better rest, and wellness-focused consumers
Customer base spans global markets, with the U.S., Europe, and Australasia representing core regions
Website offers detailed product descriptions, reviews, and guidance to improve conversion and satisfaction
High customer loyalty and satisfaction demonstrated by a 0% refund rate and strong email subscriber growth

Technology & Platform

Built on Shopify with robust infrastructure for secure transactions, scalable hosting, and analytics
Custom technology and product designs provide differentiation and defensibility
Advanced analytics integrated to track consumer behavior and optimize sales funnel
Personalized recommendations powered by tailored data improve user experience

Growth Opportunities

Expand distribution via Amazon, eBay, and other marketplaces
Leverage SEO, social media marketing, and influencer partnerships — currently untapped
Develop recurring subscription models for repeat customers seeking consistent solutions
Grow international footprint, targeting high-demand`,
  },
  {
    id: `12207713`,
    title: `Grow With Me`,
    revealedName: `Grow With Me`,
    url: `https://flippa.com/12207713`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 40962.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 13053.06, expenses: 14270.99, profit: -1217.93 },
      { month: `Apr 2025`, revenue: 12961.62, expenses: 12185.65, profit: 775.97 },
      { month: `May 2025`, revenue: 12100.56, expenses: 11761.47, profit: 339.09 },
      { month: `Jun 2025`, revenue: 28494.99, expenses: -12782.55, profit: 41276.27 },
      { month: `Jul 2025`, revenue: 10623.55, expenses: 9859.01, profit: 764.54 },
      { month: `Aug 2025`, revenue: 10311.13, expenses: 15867.38, profit: -5556.25 },
      { month: `Sep 2025`, revenue: 9956.8, expenses: 15340.33, profit: -5383.53 },
      { month: `Oct 2025`, revenue: 9392.92, expenses: 5388.61, profit: 4005.58 },
      { month: `Nov 2025`, revenue: 7984.49, expenses: 2689.86, profit: 5294.63 },
      { month: `Dec 2025`, revenue: 8368.03, expenses: 4909.82, profit: 3458.21 },
      { month: `Jan 2026`, revenue: 6463.03, expenses: 2208.53, profit: 4254.5 },
      { month: `Feb 2026`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
    ],
    avgMonthlyRevenue: 11792.0,
    avgMonthlyProfit: 4001.0,
    profitMargin: `37%`,
    annualRevenue: `with annual profit of around USD $49,804, equating to average monthly revenue of about USD $12,708 and average monthly profit of approximately USD $4,149. The business operates at a profit margin of roughly 33%, supported by a gross margin near the high 30% range.`,
    annualProfit: `of around USD $49,804, equating to average monthly revenue of about USD $12,708 and average monthly profit of approximately USD $4,149. The business operates at a profit margin of roughly 33%, supported by a gross margin near the high 30% range.`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `United Kingdom`,
    platform: `runs`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 50.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `UK subscription box for baby development products (toys + books shipped monthly); physical subscription box model requir`,
      `Revenue declining sharply (-40.1% trend)`,
      `3 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Vishal`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `3,700 followers`,
      `8,900 followers`,
    ],
    expenses: [
      {
        item: `Toys & books`,
        amount: `GBP £4,501 /month`,
      },
      {
        item: `Packaging & box construction`,
        amount: `GBP £1,053 /month`,
      },
      {
        item: `Customer shipment`,
        amount: `GBP £1,403 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `3,700 followers`,
      `8,900 followers`,
      `34,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `1763030817-161223484123329-0099-7245_GWM_P_L`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $40,962`,
      `GBP £`,
    ],
    postSaleSupport: `is available to ensure a smooth transition.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Shopify`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 504,
    watchers: 14,
    about: `Grow With Me: Business Overview

Grow With Me is a UK-based direct-to-consumer subscription eCommerce brand focused on early childhood development products for children aged 0 to 2 years. Founded in 2019, the business delivers curated monthly boxes containing toys and books tailored to developmental stages, positioning itself as a trusted resource for parents seeking convenient, educational play solutions.

The brand has built a loyal domestic customer base supported by a strong value proposition centered on saving parents time while supporting cognitive and sensory development. With a subscription-only revenue model, the business benefits from predictable recurring income and high customer engagement.

Operations are highly streamlined, with fulfillment handled by a third-party logistics partner and minimal owner involvement required for day-to-day management. The platform runs primarily on Shopify with legacy subscribers on WooCommerce, creating a scalable infrastructure capable of supporting future growth initiatives.

Key Financials (TTM)

The business generated approximately USD $152,501 in annual revenue with annual profit of around USD $49,804, equating to average monthly revenue of about USD $12,708 and average monthly profit of approximately USD $4,149. The business operates at a profit margin of roughly 33%, supported by a gross margin near the high 30% range.
Primary operating costs include product procurement, packaging, and shipping, with monthly averages of roughly USD $6,146 for toys and books, USD $1,438 for packaging, and approximately USD $1,915 for customer delivery.

Operational Model & Infrastructure

Grow With Me operates a fully subscription-driven model, with approximately 300 active subscribers and historically peaking at over 1,000. All revenue is generated through recurring monthly plans, providing predictable cash flow and strong customer lifetime value potential.

Physical assembly and packaging are outsourced to a 3PL provider, while content cards and educational materials are produced through a simple, low-time process. The owner’s ongoing involvement is limited to light customer service and procurement oversight, making the business suitable for hands-off ownership.

Customer Base & Brand Positioning

The core customer segment consists of parents of infants and toddlers, with additional purchases from relatives and gift buyers. The brand has cultivated strong trust through its curated product selection and developmental focus, differentiating itself through value pricing and inclusion of educational books in each box.

An engaged audience supports future marketing initiatives, including an email database exceeding 30,000 subscribers and active social media communities across major platforms.

Market Position & Competitive Landscape

Grow With Me operates within the expanding early childhood education and subscription commerce sector, benefiting from sustained demand for developmental products and convenient parenti`,
  },
  {
    id: `12083465`,
    title: `Hex Outdoors`,
    revealedName: `Hex Outdoors`,
    url: `https://flippa.com/12083465`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 148520.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 39829.74, expenses: 35302.19, profit: 4528.82 },
      { month: `Mar 2025`, revenue: 42486.58, expenses: 34058.86, profit: 8427.72 },
      { month: `Apr 2025`, revenue: 56290.21, expenses: 41158.16, profit: 15133.32 },
      { month: `May 2025`, revenue: 21111.21, expenses: 21756.37, profit: -645.16 },
      { month: `Jun 2025`, revenue: 20761.96, expenses: 21372.83, profit: -612.14 },
      { month: `Jul 2025`, revenue: 20471.13, expenses: 16353.79, profit: 4118.61 },
      { month: `Aug 2025`, revenue: 32664.4, expenses: 30199.33, profit: 2463.8 },
      { month: `Sep 2025`, revenue: 21483.32, expenses: 22091.65, profit: -609.6 },
      { month: `Oct 2025`, revenue: 24291.29, expenses: 23651.21, profit: 640.08 },
      { month: `Nov 2025`, revenue: 59401.71, expenses: 66752.47, profit: -7352.03 },
      { month: `Dec 2025`, revenue: 51569.62, expenses: 34828.48, profit: 16741.14 },
      { month: `Jan 2026`, revenue: 25618.44, expenses: 22235.16, profit: 3383.28 },
    ],
    avgMonthlyRevenue: 34665.0,
    avgMonthlyProfit: 3851.0,
    profitMargin: `11%`,
    annualRevenue: `GBP £327,543`,
    annualProfit: `GBP £36,394`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Product`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 65.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 60.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Hex Outdoors) — identified from listing description`,
      `4 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `6 transactions totalling USD $7,904,502`,
    },
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £3,164 /month`,
      },
      {
        item: `Advertising & Marketing`,
        amount: `GBP £10,131 /month`,
      },
      {
        item: `COGS`,
        amount: `GBP £9,177 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £916 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £193,043 Excluded from sale price`,
      `Product Schema`,
      `Included.`,
      `11,800 followers`,
      `6,700 followers`,
      `35,000 subscribers`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Pr`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1611,
    watchers: 90,
    about: `About the Business

Hex Outdoors, originally launched as Hex Pegs in 2017, is a direct-to-consumer (D2C) eCommerce brand in the outdoor and camping equipment sector. Rebranded in 2022 to Hex Outdoors, the business expanded its product line beyond the original Hex Pegs to include Hex Straps and other outdoor accessories.

The brand is known for high-quality, problem-solving products with warranties: Hex Pegs feature a lifetime warranty, and Hex Straps come with a 12-month warranty. Hex Outdoors has built a strong reputation in the Australian market through its online store and wholesale partnerships with outdoor retailers. The business gained early exposure and credibility from Shark Tank (2018) and participation in major caravan and camping expos nationwide.

---

Financials and Business Model

Revenue Channels: 80% online/DTC, 20% wholesale

Average Order Value (AOV): AUD 143.47.

Repeat Purchase Rate: 13%

Return Rate: 0.55%

Margins: Strong gross margins due to direct sourcing and efficient fulfillment

---

Reason for Selling: The owner is seeking to sell to focus on other ventures and acknowledges the capital and resources required to scale Hex Outdoors to its full potential. The business is ready for a buyer who can expand its product line and international reach. The seller is happy to provide training and support post-sale.

---

Operations

Team Structure: Owner-managed with support from a marketing agency and outsourced IT; teenage family members assist with packing

Order Fulfillment:

Australia: Orders picked and packed on-site, shipped via StarShippit and Australia Post

USA/International: Fulfilled via pre-established 3PL in China capable of global shipping

Owner Involvement: 20–25 hours/week focused on strategic decisions and product management

Outsourcing Potential: Fulfillment, product research, and additional operational tasks could be fully outsourced

---

Customer Base and Marketing

Typical Customer: Predominantly male, 45+, outdoor enthusiasts, located Australia-wide

Marketing Channels: Meta Ads, email marketing via Klaviyo, and referrals; potential to expand into TikTok, Google Ads, and other international channels

Email Marketing: Current campaigns 4x per week, effective during Black Friday and peak summer months

Seasonality: Summer months (Oct–Feb) drive strongest sales; evergreen products maintain baseline revenue

---

Growth Opportunities

International Expansion: Leverage existing 3PL in China and develop new international sales channels

Product Line Expansion: Potential to introduce new outdoor accessories and camping gear

B2B/Wholesale Growth: Existing wholesale partnerships can be expanded nationally and internationally

Marketing Optimization: Untapped channels include SEO, Google Shopping, TikTok, micro-influencers, and YouTube content

---

Assets Included in Sale

Domains: hexoutdoors.com, hexpegs.com.au

Shopify Store: hexoutdoors.com

Social Media Accounts: Instagram, Facebook (@hexoutdoors)

Email Li`,
  },
  {
    id: `11900818`,
    title: `Cardboard Creations`,
    revealedName: `Cardboard Creations`,
    url: `https://flippa.com/11900818`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 68584.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 18764.25, expenses: 10424.16, profit: 8340.09 },
      { month: `Feb 2025`, revenue: 14142.72, expenses: 10486.39, profit: 3656.33 },
      { month: `Mar 2025`, revenue: 10546.08, expenses: 12656.82, profit: -2110.74 },
      { month: `Apr 2025`, revenue: 10199.37, expenses: 5161.28, profit: 5036.82 },
      { month: `May 2025`, revenue: 10759.44, expenses: 6127.75, profit: 4632.96 },
      { month: `Jun 2025`, revenue: 11316.97, expenses: 7980.68, profit: 3336.29 },
      { month: `Jul 2025`, revenue: 13304.52, expenses: 8919.21, profit: 4386.58 },
      { month: `Aug 2025`, revenue: 8872.22, expenses: 4318.0, profit: 4551.68 },
      { month: `Sep 2025`, revenue: 6136.64, expenses: 2976.88, profit: 3158.49 },
      { month: `Oct 2025`, revenue: 6009.64, expenses: 2459.99, profit: 3549.65 },
      { month: `Nov 2025`, revenue: 4204.97, expenses: 4164.33, profit: 40.64 },
      { month: `Dec 2025`, revenue: 1920.24, expenses: 2230.12, profit: -309.88 },
    ],
    avgMonthlyRevenue: 9681.0,
    avgMonthlyProfit: 3189.0,
    profitMargin: `33%`,
    annualRevenue: `of $300,000 with a 35% gross profit margin and an average order value of $250.`,
    annualProfit: `GBP £30,134`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Ireland`,
    platform: `Organization`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 53.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 85,
      growthPotential: 50,
      overall: 60.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Event decor and prop business (Ireland) — sells physical cardboard decorations. Requires local operations/production in `,
      `Revenue declining sharply (-72.1% trend)`,
    ],
    greenFlags: [],
    seller: {
      name: `Cardboard Creations`,
      location: `Ireland`,
      verified: false,
    },
    expenses: [
      {
        item: `subscriptions`,
        amount: `GBP £140 /month`,
      },
      {
        item: `advertising`,
        amount: `GBP £314 /month`,
      },
      {
        item: `general`,
        amount: `GBP £392 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £34,970 Included in sale price`,
      `Organization Schema`,
      `687 followers`,
      `1,822 followers`,
    ],
    postSaleSupport: `Included. We can provide advice and support for a clean transition for the months following the sale, including design changes`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2003,
    watchers: 43,
    about: `BUSINESS OVERVIEW

Websites:
www.cardboardcreate.com / www.cardboardcreations.ie

Cardboard Creations offers a fully-developed digital business blueprint, providing a turnkey opportunity for entrepreneurs looking to tap into the booming event décor and prop market. With a streamlined system covering everything from design to multi-channel digital sales, this brand is ready to scale—especially in the US market.

WHAT’S INCLUDED IN THE SALE Digital Assets & Brand Infrastructure

Original Design Files: Fully custom CAD and graphic design files for all products—ready for manufacturing or digital adaptation.

Complete Content Library: High-quality product photography, promotional videos, and marketing-ready content catalogs.

Web Assets:

Two premium domains

Website files and full access to backend platforms

Branded email addresses

Brand Identity: Logos, color palettes, style guides, and all brand collateral.

Technology & Sales Channels

Custom-Built Website (Shopify)

Established Marketplaces: Fully built-out accounts (or transferable templates) on Amazon, eBay, and Sellbrite. (Note: Etsy account cannot be transferred, but listings and assets are included for new setup.)

Subscriber List: Over 5,000 active email subscribers—80% USA-based.

Social Media Accounts: Engaged followers and active profiles across major platforms.

Custom Tech: Any proprietary digital tools or systems used for content or sales management.

Intellectual Property

All product designs are 100% original and exclusive to the brand.

Trademarks and full ownership of all creative assets ensure protection and differentiation in the market.

ABOUT THE BUSINESS

Cardboard Creations was founded by two brothers with 20+ years of experience in design engineering. Their goal? Revolutionize event décor by offering affordable, flat-packed, and sustainable props made from materials like cardboard and PET foam—items that are easier to ship, store, and set up.

This digital brand has developed a strong customer base, primarily in the United States, and built a reputation for high-quality, creative event solutions. Over the past three years, it has generated an average annual revenue of $300,000 with a 35% gross profit margin and an average order value of $250.

MARKET & GROWTH POTENTIAL

With a deeply loyal audience and strong branding already in place, the brand is well-positioned for continued growth, particularly in the US market. A new owner could easily:

Launch domestic production with US-based suppliers

License or white-label the designs

Expand the product range or adapt the assets for digital-only décor or DIY kits

Deepen digital marketing efforts with the existing email and social media base

REASON FOR SALE

The business is currently operated from Ireland, which has created logistical and cost-related challenges in serving its USA-heavy customer base. The owners are now shifting focus to local ventures and are looking for a buyer who can unlock the next level of growth, especi`,
  },
  {
    id: `12273363`,
    title: `HAIRFREE`,
    revealedName: `HAIRFREE`,
    url: `https://flippa.com/12273363`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 190000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Mar 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Apr 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `May 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Jun 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Jul 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Aug 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Sep 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Oct 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Nov 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Dec 2025`, revenue: 5370.83, expenses: 2426.97, profit: 2943.86 },
      { month: `Jan 2026`, revenue: 1905.0, expenses: 666.75, profit: 1238.25 },
    ],
    avgMonthlyRevenue: 5082.0,
    avgMonthlyProfit: 2802.0,
    profitMargin: `55%`,
    annualRevenue: `and $37K profit (55% margin), the business benefits from exceptional gross margins, 61,000+ customers, and defensible IP assets. With underutilized channels including Amazon, influencer marketing, and retail expansion, Hairfree offers high-margin scalability and strong rebound potential under focused ownership.`,
    annualProfit: `of USD $37,063. Over the 2022–2025 period, the business produced total sales of approximately USD $1.73 million with average annual EBITDA of around USD $180,000. Gross margins have historically reached up to 98% due to low manufacturing costs and premium pricing. The business trades at a 5.1x profit multiple and a 2.8x revenue multiple.`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `CA, United States`,
    platform: `for`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 76.2,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 40,
      growthPotential: 50,
      overall: 60.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical hair removal cream brand (HAIRFREE/SoftSkin London)`,
      `UK beauty compliance and fulfillment required`,
      `Revenue declining -19%`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Managed by Flippa`,
      `12 years old — established`,
      `Stable revenue history`,
      `Zero loss months in P&L`,
    ],
    seller: {
      name: `A J Green`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £6,374 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £4,902 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £2,032 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £1,977 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £18,761 Excluded from sale price`,
      `0 followers`,
      `0 follower`,
    ],
    postSaleSupport: `for six months to ensure a smooth transition across marketing, logistics, fulfilment, inventory management, and customer service.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `21,660`,
      totalPageViews: `4,164`,
      pagesPerSession: `2.15`,
      avgDuration: `00:01:29`,
      engagementRate: `0.48%`,
      topCountries: [
        {
          country: `Philippines`,
          views: 1028,
        },
        {
          country: `United States`,
          views: 920,
        },
        {
          country: `India`,
          views: 78,
        },
        {
          country: `China`,
          views: 69,
        },
        {
          country: `Canada`,
          views: 44,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 246,
    watchers: 3,
    about: `Hairfree: Business Overview

Hairfree is a 12-year-established direct-to-consumer hair removal brand operating in the health and beauty sector, built around proprietary depilatory products and protected intellectual property. Founded in 2013 and headquartered in the United States, the business has developed a strong reputation as a specialist niche brand offering targeted, effective, and easy-to-use hair removal solutions. Unlike short-term e-commerce projects, Hairfree represents a durable consumer brand with original products, defensible assets, and a long operating history.

The business has generated consistent revenue and profitability over more than a decade, supported by exceptional gross margins, a loyal U.S.-based customer base, and a proven direct-response marketing model. With minimal competition in its niche and multiple untapped growth channels, Hairfree is positioned as a scalable platform for a buyer seeking to expand a premium beauty brand globally.

Key Financials (Recent Performance)

Hairfree generates average monthly revenue of USD $5,634 with average monthly profit of USD $3,088, delivering a net profit margin of approximately 55%. Annual revenue for the most recent period was USD $67,615 with annual profit of USD $37,063. Over the 2022–2025 period, the business produced total sales of approximately USD $1.73 million with average annual EBITDA of around USD $180,000. Gross margins have historically reached up to 98% due to low manufacturing costs and premium pricing. The business trades at a 5.1x profit multiple and a 2.8x revenue multiple.

Average order value is USD $76 with an average customer lifetime value of USD $102, average items per order of four, and a refund and return rate below 1%, reflecting strong product satisfaction and brand trust.

Brand & Market Positioning

Hairfree operates as a specialist hair removal brand with a focused product range designed for face, body, men’s grooming, and intimate areas. The brand differentiates itself through patented depilatory tools, proprietary formulations, and targeted solutions that offer long-lasting results and cleaner application compared to mass-market alternatives. Approximately 90% of customers are based in the United States, with the remainder coming from Canada, the UK, Australia, and South Africa.

Over more than a decade, Hairfree has achieved consistent exposure to U.S. consumers, positioning it as a recognizable and trusted niche brand within the beauty category.

Intellectual Property & Competitive Moat

Hairfree benefits from substantial defensive assets rarely found in e-commerce businesses of this size. These include a registered U.S. trademark, a U.S. utility patent covering three proprietary depilatory tools, two full sets of injection moulding tools, and rights to 16 additional new product designs. These assets create meaningful barriers to entry and protect the brand’s unique product offering from imitation.

The business also owns all formulations, pa`,
  },
  {
    id: `12209557`,
    title: `Quarter Moon Bazaar`,
    revealedName: `Quarter Moon Bazaar`,
    url: `https://flippa.com/12209557`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 180000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 18030.19, expenses: 12018.01, profit: 6012.18 },
      { month: `Feb 2025`, revenue: 15467.33, expenses: 10389.87, profit: 5077.46 },
      { month: `Mar 2025`, revenue: 17618.71, expenses: 11393.17, profit: 6225.54 },
      { month: `Apr 2025`, revenue: 16225.52, expenses: 11135.36, profit: 5090.16 },
      { month: `May 2025`, revenue: 16263.62, expenses: 11788.14, profit: 4474.21 },
      { month: `Jun 2025`, revenue: 12954.0, expenses: 9697.72, profit: 3256.28 },
      { month: `Jul 2025`, revenue: 12418.06, expenses: 8924.29, profit: 3493.77 },
      { month: `Aug 2025`, revenue: 14838.68, expenses: 9039.86, profit: 5798.82 },
      { month: `Sep 2025`, revenue: 11598.91, expenses: 9010.65, profit: 2586.99 },
      { month: `Oct 2025`, revenue: 9042.4, expenses: 7353.3, profit: 1690.37 },
      { month: `Nov 2025`, revenue: 7052.31, expenses: 5571.49, profit: 1480.82 },
      { month: `Dec 2025`, revenue: 7585.71, expenses: 6158.23, profit: 1427.48 },
    ],
    avgMonthlyRevenue: 13258.0,
    avgMonthlyProfit: 3885.0,
    profitMargin: `29%`,
    annualRevenue: `GBP £125,271`,
    annualProfit: `GBP £36,704`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `MI, United States`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 68.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 60.0,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US-based home décor ecommerce brand (pillow covers, decorative accents) with physical inventory and US shipping. Physica`,
      `Revenue declining sharply (-53.7% trend)`,
      `Potential personal brand dependency`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `23 transactions totalling USD $8,469,233`,
    },
    socialMedia: [
      `3,500 followers`,
      `1,446 followers`,
      `29 followers`,
      `94 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,126 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £4,503 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £315 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £38 /month`,
      },
      {
        item: `Subscriptions`,
        amount: `GBP £225 /month`,
      },
      {
        item: `Credit Card Processing`,
        amount: `GBP £375 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Offer Schema`,
      `Included.`,
      `3,500 followers`,
      `1,446 followers`,
      `29 followers`,
      `94 followers`,
      `17,500 subscribers`,
      `Attachments`,
      `XLSX`,
      `XLSX`,
      `Profit and Loss Statement Quarter Moon Bazaar`,
      `No comments`,
      `Editor's Choice`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `98,912`,
      totalPageViews: `17,782`,
      pagesPerSession: `1.96`,
      avgDuration: `00:00:26`,
      engagementRate: `0.90%`,
      topCountries: [
        {
          country: `United States`,
          views: 8653,
        },
        {
          country: `China`,
          views: 170,
        },
        {
          country: `Canada`,
          views: 52,
        },
        {
          country: `India`,
          views: 33,
        },
        {
          country: `Germany`,
          views: 11,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 742,
    watchers: 47,
    about: `Overview

Quarter Moon Bazaar is an established home décor ecommerce brand specializing in high quality, curated pillow covers and distinctive decorative accents. Built on warm, lifestyle focused photography and an authentic handmade appeal, the brand has earned a loyal national audience, strong repeat purchase behavior, and consistently low return rates. Customers value the brand’s craftsmanship, seasonal designs, and the personal small shop feel that distinguishes it from mass market décor retailers.

The business generates steady revenue through a multi channel mix that includes Shopify, Meta ads, Pinterest ads, email marketing, and historically a successful Etsy shop. Sales are driven by a combination of direct traffic, repeat buyers, seasonal demand, and paid and organic campaigns. Operations are organized, documented, and designed for simplicity, making this a turnkey lifestyle brand with proven demand and meaningful growth potential.

Operations

Quarter Moon Bazaar sells embroidered and seasonal pillow covers through its Shopify storefront. Revenue is supported by Meta advertising, automated email flows, and seasonal promotional campaigns. Daily operations include light customer service, order fulfillment, inventory management, and campaign management. Processes are streamlined and easy to maintain.

Workload is estimated at ten to fifteen hours per week depending on campaign cadence. Many tasks can be automated or delegated for an even lighter operational footprint.

The brand also operates a successful Etsy shop. While the Etsy account cannot be transferred, the performance of that channel confirms strong product market fit and provides a clear pathway for a new owner to quickly re establish that income stream with a fresh account.

Customers

The brand serves a primarily United States based audience of home décor lovers, educators, and gift buyers who appreciate quality materials, thoughtful design, and warm, personal branding. Customers often purchase in multiples and return seasonally for new holiday and home refresh designs. The brand benefits from strong organic engagement, paid traffic, email nurturing, and high satisfaction that drives repeat purchases and very low return rates.

Financials

Revenue is generated through Shopify sales supported by paid and organic marketing. The business follows a seasonal pattern, with peak periods in fall and winter driven by holiday demand and home décor spending. Margins remain healthy due to low overhead, direct sourcing, and efficient ad management.

Shopify and ad based revenue are fully included in the financials. Etsy revenue is not included because Etsy accounts are non transferable, but historical Etsy sales have been substantial and present a significant and verifiable growth channel for a new owner. Full P&L, COGS details, and ad performance data are available to qualified buyers.

Included Assets

• Shopify store and domain
• All brand creative assets including imagery, lifestyle pho`,
  },
  {
    id: `12033582`,
    title: `Amputee Sock Prints`,
    revealedName: `Amputee Sock Prints`,
    url: `https://flippa.com/12033582`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 195000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 2270.76, expenses: 2526.03, profit: -254.0 },
      { month: `Mar 2025`, revenue: 3689.35, expenses: 2358.39, profit: 1330.96 },
      { month: `Apr 2025`, revenue: 3420.11, expenses: 1725.93, profit: 1694.18 },
      { month: `May 2025`, revenue: 3359.15, expenses: 2453.64, profit: 906.78 },
      { month: `Jun 2025`, revenue: 7033.26, expenses: 6609.08, profit: 425.45 },
      { month: `Jul 2025`, revenue: 6718.3, expenses: 4104.64, profit: 2613.66 },
      { month: `Aug 2025`, revenue: 3729.99, expenses: 1697.99, profit: 2033.27 },
      { month: `Sep 2025`, revenue: 5634.99, expenses: 811.53, profit: 4823.46 },
      { month: `Oct 2025`, revenue: 4066.54, expenses: 1531.62, profit: 2534.92 },
      { month: `Nov 2025`, revenue: 6139.18, expenses: 1418.59, profit: 4720.59 },
      { month: `Dec 2025`, revenue: 9377.68, expenses: 2016.76, profit: 7360.92 },
      { month: `Jan 2026`, revenue: 2312.67, expenses: 593.09, profit: 1720.85 },
    ],
    avgMonthlyRevenue: 4813.0,
    avgMonthlyProfit: 2493.0,
    profitMargin: `52%`,
    annualRevenue: `GBP £45,474`,
    annualProfit: `GBP £23,549`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, PHP, Stripe`,
    country: `FL, United States`,
    platform: `risk`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 73.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 40,
      growthPotential: 50,
      overall: 59.3,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Niche ecommerce brand selling custom-printed socks for amputees (Florida). Physical product requiring US-based productio`,
    ],
    greenFlags: [],
    seller: {
      name: `Sidney Muniz`,
      location: `United States`,
      verified: true,
      transactions: `1 transaction totalling USD $15,000`,
    },
    socialMedia: [
      `3,700 followers`,
      `549 followers`,
      `294 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £300 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £75 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £75 /month`,
      },
    ],
    saleIncludes: [
      `Premium domain(s)`,
      `Shopify store & multi-channel marketplace accounts`,
      `Branded email address(es)`,
      `Social media accounts`,
      `Email subscriber database`,
      `Inventory/stock (as required)`,
      `All brand assets (logos, copyrighted slogan)`,
      `Unique content & 900+ original product designs`,
      `Phone number(s)`,
      `Post-sale transition and support`,
      `Why Acquire AmputeeSockPrints?`,
      `Clear Growth Path: Mul`,
    ],
    postSaleSupport: `Included. I will provide support for 3-6months and introduce you to supplies and the Amputee Community in my FaceBook Groups`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `46,588`,
      totalPageViews: `12,012`,
      pagesPerSession: `2.50`,
      avgDuration: `00:00:37`,
      engagementRate: `0.24%`,
      topCountries: [
        {
          country: `United States`,
          views: 3273,
        },
        {
          country: `China`,
          views: 198,
        },
        {
          country: `Brazil`,
          views: 59,
        },
        {
          country: `Singapore`,
          views: 47,
        },
        {
          country: `Vietnam`,
          views: 42,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `PHP`,
      `Stripe`,
    ],
    views: 419,
    watchers: 2,
    about: `World’s First & Only Custom Amputee Sock Brand – Niche Ecommerce Business (4 Years Old, FL, USA)

Overview

Available for acquisition is AmputeeSockPrints, the world’s only e-commerce brand specializing in custom-designed socks tailored exclusively for amputees. Founded in 2021 and based in Florida, this unique and mission-driven business sits at the intersection of adaptive fashion and personalized self-expression. Operated entirely online with steady, profitable growth, the company has developed a loyal, engaged customer base within a highly defined and underserved market segment.

Key Metrics

Location: Florida, United States
Years in Operation: 4
Annual Revenue: USD $60,597
Annual Profit: USD $31,380
Average Monthly Revenue: USD $5,049
Average Monthly Profit: USD $2,615
Profit Margin: 52%
Profit Multiple: 6.2x
Revenue Multiple: 3.2x
Monthly Page Views: 12,012

Business Highlights

Market Leadership: The only dedicated provider of fully customizable amputee socks, operating under the distinctive slogan, “HEAL with APPEAL.”
Extensive Product Library: Over 900 proprietary, original sock designs, plus ability for customers to personalize with family photos, artwork, pets, and more.
Supplementary Offerings: Prosthetic sleeves and graphic T-shirts, increasing average order value while focusing on the adaptive wear niche.
Strong Brand Positioning: Recognized for meaningful, mission-oriented products supporting the amputee community, as well as gift buyers, caregivers, and family members.
Multiple Sales Channels: Shopify, Amazon, Etsy, eBay, and Walmart—diversifying revenue streams and minimizing platform risk.
Inventory-Light Operations: Print-on-demand and direct-ship fulfillment model supports low overhead, enables easy transferability and scaling.
Efficient Technology Stack: Shopify-powered storefront, streamlined product customization, integrated accounting (QuickBooks via A2X), and robust e-commerce analytics.
Loyal, Engaged Audience: Highly defined niche with strong repeat purchase behavior and outstanding product satisfaction.

Operations & Team

Owner Involvement: Streamlined, low-touch operations manageable by a single owner or small team (ideal for non-technical operators).
Fulfillment: No inventory to manage; print-on-demand and direct-shipping partners handle production and distribution.
Customer Engagement: Highly personalized shopping experience, supported by custom technology and attentive customer support.

Marketing & Growth

Social Channels:
Facebook: 3,700 followers
Instagram: 549 followers
TikTok: 294 followers
YouTube: 43 subscribers
Email Marketing: 3,500 email subscribers, active and primed for retargeting or cross-selling campaigns.
Traffic Sources: Multi-channel revenue with strong page view numbers—significant opportunity to expand digital marketing, influencer partnerships, and SEO to further scale.
Growth Opportunities:
Expand into additional adaptive apparel and prosthetic accessories
Develop partnerships with rehab cent`,
  },
  {
    id: `12012923`,
    title: `theplaytimestore.com.au`,
    revealedName: `theplaytimestore.com.au`,
    url: `https://flippa.com/12012923`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 99613.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 42684.7, expenses: 24691.34, profit: 17993.36 },
      { month: `Apr 2025`, revenue: 20923.25, expenses: 21901.15, profit: -977.9 },
      { month: `May 2025`, revenue: 32854.9, expenses: 17833.34, profit: 15021.56 },
      { month: `Jun 2025`, revenue: 26738.58, expenses: 21078.19, profit: 5661.66 },
      { month: `Jul 2025`, revenue: 13337.54, expenses: 15651.48, profit: -2313.94 },
      { month: `Aug 2025`, revenue: 8446.77, expenses: 8194.04, profit: 251.46 },
      { month: `Sep 2025`, revenue: 44484.29, expenses: 22111.97, profit: 22372.32 },
      { month: `Oct 2025`, revenue: 24578.31, expenses: 14846.3, profit: 9732.01 },
      { month: `Nov 2025`, revenue: 32151.32, expenses: 19387.82, profit: 12764.77 },
      { month: `Dec 2025`, revenue: 3967.48, expenses: 8126.73, profit: -4159.25 },
      { month: `Jan 2026`, revenue: 3008.63, expenses: 5703.57, profit: -2696.21 },
      { month: `Feb 2026`, revenue: 5408.93, expenses: 2995.93, profit: 2414.27 },
    ],
    avgMonthlyRevenue: 21549.0,
    avgMonthlyProfit: 6339.0,
    profitMargin: `29%`,
    annualRevenue: `Double-digit year-over-year growth`,
    annualProfit: `GBP £59,892`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 45.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (theplaytimestore.com.au) — identified from listing description`,
      `Revenue declining sharply (-87.2% trend)`,
      `High revenue volatility (CV 66%)`,
      `4 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `1 transaction totalling USD $400,000`,
    },
    socialMedia: [
      `5,000 followers`,
      `68,300 followers`,
      `1,998 followers`,
    ],
    expenses: [
      {
        item: `Customer Service`,
        amount: `GBP £386 /month`,
      },
      {
        item: `Computer Expenses`,
        amount: `GBP £580 /month`,
      },
      {
        item: `Owners Wage`,
        amount: `GBP £1,547 /month`,
      },
      {
        item: `month
Meta Ads`,
        amount: `GBP £1,451 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £13,047 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `5,000 followers`,
      `68,300 followers`,
      `1,998 followers`,
      `35,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Playtime Store P&L Feb 2026`,
      `Shopify Analytics Screenshot 1`,
      `Shopify Analytics`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `125,142`,
      totalPageViews: `30,377`,
      pagesPerSession: `2.18`,
      avgDuration: `00:00:26`,
      engagementRate: `0.50%`,
      topCountries: [
        {
          country: `Australia`,
          views: 12763,
        },
        {
          country: `United States`,
          views: 435,
        },
        {
          country: `China`,
          views: 165,
        },
        {
          country: `United Kingdom`,
          views: 92,
        },
        {
          country: `Singapore`,
          views: 53,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 7622,
    watchers: 517,
    about: `Founded in 2020, The Playtime Store is a mum-founded eCommerce brand specialising in high-quality, design-led soft play and activity products for young children. It caters to families who want stylish, functional play equipment that complements modern home interiors.

The brand has built a strong reputation across Australia and New Zealand, with thousands of loyal customers and products that frequently sell out. High average order value, low refund rates, and repeat purchases highlight a clear product-market fit and strong customer trust.

The business is supported by a 3PL warehouse in Brisbane and runs efficiently with low fixed costs. The owner works part-time with key roles outsourced, making it a scalable, easy-to-manage operation.

Key Highlights

Consistent seven-figure annual revenue

Double-digit year-over-year growth

High average order value and strong repeat-purchase rate

200K+ annual website visitors

30K+ active Klaviyo profiles

75K+ combined social media followers

6 registered trademarks across Australia & New Zealand

Winner of multiple national awards, including “Best Homewares Brand”

Low refund rate and efficient ad performance

Business Operations

Owner Involvement

10–15 hours per week

Focus areas: stock ordering, content planning, marketing strategy, and overall management

Support Team

1 contractor for customer service

1 ad hoc graphic designer for creative and EDMs

Fulfillment fully outsourced to a Brisbane 3PL (includes returns)

Products & Supply

20+ active SKUs with colour variants

Bestsellers: soft play sets and ball pits

Single long-term supplier in China

Production and shipping completed every few months

Sales & Marketing

Channels

100% D2C via Shopify (.com, .com.au, .co.nz domains)

Advertising

Currently focused on Meta Ads

Untapped potential across Google, Pinterest, and TikTok

Email Marketing

Large Klaviyo list with regular campaigns

High engagement and conversion rates

Growth Opportunities

Marketing & Brand Expansion

Introduce founder-led storytelling and behind-the-scenes content

Expand advertising to Google, Pinterest, and TikTok

Develop new product lines for older age groups

Launch into international markets (US, UK, Canada)

Explore wholesale and retail partnerships

Operational Improvements

Optimise supplier terms and pricing

Further automate processes through the 3PL

Increase inventory efficiency to support growth seasons

Reason for Sale

After several years of steady growth, the founder is stepping back to focus on family, presenting an opportunity for a new owner to take over a trusted, design-led brand with strong foundations and scalable infrastructure.

Transition Support

4 weeks of post-sale handover

Full SOPs and documentation provided`,
  },
  {
    id: `12041914`,
    title: `Vet Study Bundle`,
    revealedName: `Vet Study Bundle`,
    url: `https://flippa.com/12041914`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 63130.0,
    monthlyPL: [
      { month: `Oct 2024`, revenue: 5156.2, expenses: 2914.65, profit: 2242.82 },
      { month: `Nov 2024`, revenue: 6780.53, expenses: 3587.75, profit: 3194.05 },
      { month: `Dec 2024`, revenue: 9190.99, expenses: 5156.2, profit: 4034.79 },
      { month: `Jan 2025`, revenue: 19391.63, expenses: 10872.47, profit: 8519.16 },
      { month: `Feb 2025`, revenue: 16925.29, expenses: 11697.97, profit: 5227.32 },
      { month: `Mar 2025`, revenue: 9919.97, expenses: 8406.13, profit: 1512.57 },
      { month: `Apr 2025`, revenue: 1681.48, expenses: 784.86, profit: 896.62 },
      { month: `May 2025`, revenue: 4259.58, expenses: 4147.82, profit: 111.76 },
      { month: `Jun 2025`, revenue: 4259.58, expenses: 3362.96, profit: 896.62 },
      { month: `Jul 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Aug 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Sep 2025`, revenue: 4422.14, expenses: 2209.8, profit: 2212.34 },
    ],
    avgMonthlyRevenue: 8199.0,
    avgMonthlyProfit: 2404.0,
    profitMargin: `35%`,
    annualRevenue: `GBP £64,556`,
    annualProfit: `GBP £22,714`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Italy`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue declining -77% — Vet Study Bundle`,
      `Revenue declining sharply (-38.7% trend)`,
      `High revenue volatility (CV 67%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Mattia Mari`,
      location: `Italy`,
      verified: false,
    },
    socialMedia: [
      `2,243 followers`,
      `4,962 followers`,
      `2,425 followers`,
    ],
    expenses: [
      {
        item: `Meta ADS`,
        amount: `GBP £4,222 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `2,243 followers`,
      `4,962 followers`,
      `2,425 followers`,
      `Attachments`,
      `Screenshot 2025-07-28 alle 10.07.50`,
      `Contact Seller`,
      `Send message`,
      `Ayush Kumar Jan 01, 2026 03:59 PM`,
      `Why is there a dip in revenue like it just goes to zero ?`,
      `Report this comment Reply`,
      `Editor's Choice`,
    ],
    postSaleSupport: `and training to ensure a smooth handover`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Ayush Kumar`,
        date: `Jan 01, 2026 03:59 PM`,
        text: `Why is there a dip in revenue like it just goes to zero ?`,
      },
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1037,
    watchers: 21,
    commentCount: 1,
    about: `Vet Study Bundle – Business Overview

Vet Study Bundle is a profitable digital product store launched in February 2024 and built on Shopify. The brand serves a niche yet global market: veterinary students preparing for coursework and exams. By offering 100% digital products such as comprehensive study notes, anatomy flashcards, cheatsheets, and international exam prep guides, the business combines high-value content with a lean, scalable model that eliminates the costs and complexities of physical inventory.

Over the past twelve months, the business has generated USD $99,162 in revenue and USD $36,997 in net profit, delivering an average monthly profit of USD $3,083 at a 37% margin. With sales primarily driven by optimized Meta Ads and zero reliance on logistics, Vet Study Bundle is designed for efficiency and automation. Current owner involvement is minimal, limited to occasional customer support and light social media updates, totaling less than one hour per week.

Operational Model

Vet Study Bundle operates as a fully digital store. Products are instantly downloadable, with zero shipping costs, stock management, or fulfillment delays. This ensures customer satisfaction, demonstrated by the brand’s 100% fulfillment rate and zero refund rate to date. Marketing is handled via a proven Meta Ads strategy, supported by pre-tested creatives that consistently deliver profitable returns. Post-sale, a new owner will inherit a seamless operational system with virtually no overhead beyond ad spend.

Market & Growth Opportunities

The veterinary education market is growing steadily, supported by increasing numbers of students worldwide preparing for exams such as the VTNE, NAVLE, and regional certifications. Demand for efficient, accessible, and affordable digital study aids continues to rise, positioning Vet Study Bundle for long-term scalability. Current sales are concentrated in select markets, leaving significant expansion potential in regions such as the UK, Australia, Canada, and across Europe. Beyond geographical growth, opportunities exist to expand the product catalog into related niches such as continuing education for professionals, nursing, and pre-medical studies.

Performance Highlights

3,357 customers acquired in 12 months, supported by a strong repeat buyer base
2,205 orders processed with an average order value of USD $43
Zero refunds and a 100% fulfillment rate underscore customer trust and product-market fit
Social media presence includes 2,243 Facebook followers, 4,962 Instagram followers, and 2,425 TikTok followers, offering a base for organic growth alongside paid ads

Included Assets in Sale

Custom Shopify domain and full website files
Complete portfolio of digital study products and future-proof content IP
Active email subscriber list (3,357 contacts)
Established Facebook, Instagram, and TikTok pages
All ad creatives and marketing assets used in existing campaigns
Brand assets including logos, unique designs, and course material`,
  },
  {
    id: `12096575`,
    title: `Turbion Carrera Watches`,
    revealedName: `Turbion Carrera Watches`,
    url: `https://flippa.com/12096575`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 82500.0,
    avgMonthlyRevenue: 5168.0,
    avgMonthlyProfit: 3325.0,
    profitMargin: `64%`,
    annualRevenue: `GBP £48,830`,
    annualProfit: `GBP £31,409`,
    expensesLastMonth: `GBP £2,177 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `TX, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Turbion Carrera Watches) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Angel Ovalles`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `1,900 followers`,
      `26,300 followers`,
      `225 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £2,177 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £15,009 Included in sale price`,
      `Shopify`,
      `1,900 followers`,
      `26,300 followers`,
    ],
    postSaleSupport: `Included. I will provide up to 6 months of post-sale transition support and introductions to all key suppliers.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `26,048`,
      totalPageViews: `6,408`,
      pagesPerSession: `2.01`,
      avgDuration: `00:00:21`,
      engagementRate: `0.37%`,
      topCountries: [
        {
          country: `United States`,
          views: 1703,
        },
        {
          country: `China`,
          views: 67,
        },
        {
          country: `Vietnam`,
          views: 31,
        },
        {
          country: `Singapore`,
          views: 29,
        },
        {
          country: `India`,
          views: 17,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 308,
    watchers: 4,
    about: `Turbion Carrera Watches: Business Overview

Turbion Carrera Watches is a profitable direct-to-consumer lifestyle brand founded in 2020, operating in the premium yet accessible watch segment. Based in Texas and built on Shopify, the brand combines strong visual identity, premium product positioning, and a streamlined operating model that produces consistent cash flow with minimal owner involvement. With a 64% profit margin, an average order value of USD $236, and over 26,000 Instagram followers, the business demonstrates clear product-market fit and meaningful brand traction within the lifestyle and fashion category.

The business sells directly to consumers through its professionally designed website, with revenue generated exclusively from product sales. The product catalog is intentionally simple, allowing for efficient inventory management, high fulfillment reliability, and a low operational burden. Over the past 12 months, the brand has generated USD $65,068 in revenue and USD $41,855 in profit, supported by lean monthly expenses and a self-fulfillment model. Fulfillment performance is strong, with a 99.6% fulfillment rate and a 0% refund rate, reflecting high customer satisfaction and operational consistency.

Key Financials (Trailing Twelve Months)

Revenue: USD $65,068
Profit: USD $41,855
Average Monthly Revenue: USD $5,422
Average Monthly Profit: USD $3,487
Profit Margin: 64%

Revenue performance has remained consistent, with fluctuations driven primarily by seasonality and variable owner focus on marketing rather than demand-side constraints. Current profitability and modest valuation multiples of 2.6x profit and 1.7x revenue position the business attractively for buyers seeking immediate cash flow with upside.

Key Business Highlights

Established lifestyle brand with professional branding and market positioning
High-margin operating model with low overhead and simple logistics
Strong digital footprint with 26,300 Instagram followers and 4,700+ email subscribers
High average order value driven by premium product perception
Turnkey operation requiring approximately 3–6 hours per week to manage
Inventory included in sale valued at approximately USD $20,000

Customers & Market Positioning

The customer base is primarily U.S.-based and aligned with a lifestyle-focused demographic drawn to the brand’s aesthetic and positioning. The business has served over 4,800 customers, with repeat purchases and brand engagement already present despite limited retention marketing. Traffic is driven by a balanced mix of direct, organic search, and organic social channels, indicating brand recognition alongside SEO-driven discovery. Organic keyword rankings around wrist sizing and watch-related queries provide a stable foundation for continued inbound traffic.

Marketing & Traffic Profile

The website generates approximately 8,400 page views per month, with over 100,000 page views recorded across the last year. Traffic composition shows strong direct and or`,
  },
  {
    id: `12251484`,
    title: `modesportif.com`,
    revealedName: `modesportif.com`,
    url: `https://flippa.com/12251484`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 198004.0,
    avgMonthlyRevenue: 193535.0,
    avgMonthlyProfit: 6861.0,
    profitMargin: `4%`,
    annualRevenue: `GBP £1,828,677`,
    annualProfit: `GBP £64,832`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `that`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian upscale fashion/lifestyle e-commerce boutique with 70% consignment and exclusive brand partnerships in Austra`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `6 transactions totalling USD $7,904,502`,
    },
    socialMedia: [
      `77,000 followers`,
      `1,204 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `77,000 followers`,
      `1,204 followers`,
      `94,176 subscribers`,
      `Attachments`,
      `XLSX`,
      `P&L Dec 24 to Nov 25`,
      `No comments`,
      `Ecommerce Lifestyle`,
      `Managed by Flippa`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $19`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 654,
    watchers: 28,
    about: `**Key Highlights**

Mode Sportif, established in 2013, is an upscale e-commerce platform that seamlessly merges fashion and functionality with a distinct focus on lifestyle products. With its keen eye for curated selections, the online boutique capitalizes on the burgeoning demand for high-quality styled fashion. Leveraging its established brand awareness, 70% of the brands mix are consignment, the ONLY retailer in the Australian market that has strong brands partnerships.

**Operations**

At the heart of Mode Sportif's operations is its robust e-commerce platform, which serves as the primary channel for revenue generation. Utilizing the Shopify platform, the company has crafted a user-friendly online shopping experience that caters to a discerning, style-conscious clientele. This digital-first approach allows Mode Sportif to reach a global audience, unbounded by the geographical constraints of traditional physical storefronts.

In addition to its core e-commerce business, Mode Sportif engages in strategic collaborations and partnerships. These efforts frequently involve exclusive collections and limited-edition pieces that draw in a dedicated customer base, eager for unique, trend-setting items. Such collaborations are instrumental in keeping the Mode Sportif brand at the forefront of lifestyle fashion, ensuring sustained consumer interest and engagement.

**Customers**

Mode Sportif’s customer base consists primarily of fashion-forward individuals who value a blend of style and functionality in their lifestyle choices. Predominantly, these are urban professionals and fitness enthusiasts who appreciate high-end, versatile fashion that transitions effortlessly between work, social gatherings, and daily activities.

This target demographic is characterized by an inclination toward brands that emphasize quality, contemporary design, and sustainable practices. Mode Sportif meets these expectations with its curated selections of premium brands. Additionally, the platform’s personalized shopping experience, through detailed style guides and 'how to wear it with', resonates well with its clientele, fostering customer loyalty and repeat business.

**Technology**

Shopify serves as the technological backbone of Mode Sportif’s e-commerce operations, providing a scalable and customizable platform vital for handling online retail transactions. This robust infrastructure supports seamless website navigation, secure payment processing, and customer data analytics—all critical components for improving user experience and enhancing operational efficiency.

The integration of advanced data analytics tools enables Mode Sportif to gain valuable insights into consumer behaviors and preferences. This data-driven approach allows for effective inventory management and personalized marketing strategies, ensuring that customers receive tailored recommendations and targeted promotions that align with their interests and shopping habits.

**Financials**

Mode Sportif has `,
  },
  {
    id: `12230702`,
    title: `https://vidya.shop/`,
    revealedName: `https://vidya.shop/`,
    url: `https://flippa.com/12230702`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 120749.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 4919.0,
    profitMargin: `40%`,
    annualRevenue: `GBP £116,186`,
    annualProfit: `GBP £46,474`,
    expensesLastMonth: `GBP £5,628 /month`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, WooCommerce, Stripe`,
    country: `Belgium`,
    platform: `specializing`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Belgium-based e-commerce for niche organic and specialty food/beverage products with direct shipping. Physical perishabl`,
    ],
    greenFlags: [],
    seller: {
      name: `Gregory DAHAN`,
      location: `Belgium`,
      verified: false,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £5,628 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `WordPress 5.5`,
      `Included.`,
      `Attachments`,
      `invoice-53087682-51d4-8d9d-15e3-c847e390921e`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $130,396`,
      `USD $120,749`,
      `Reduced 7%`,
      `GBP £90,615`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $2.4K*`,
      `Have a similar bus`,
    ],
    postSaleSupport: `is included to facilitate onboarding and ensure continuity.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `47,504`,
      totalPageViews: `9,730`,
      pagesPerSession: `1.64`,
      avgDuration: `00:00:49`,
      engagementRate: `0.61%`,
      topCountries: [
        {
          country: `United States`,
          views: 408,
        },
        {
          country: `Canada`,
          views: 263,
        },
        {
          country: `China`,
          views: 196,
        },
        {
          country: `Morocco`,
          views: 138,
        },
        {
          country: `Réunion`,
          views: 104,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 155,
    watchers: 1,
    about: `Vidya.shop: Business Overview

Vidya.shop is an established ecommerce platform specializing in curated food and beverage products, with a focus on niche, organic, and specialty items that are often difficult to source through traditional retail channels. Founded in 2016 and based in Belgium, the business has developed a loyal customer base by combining a carefully selected product assortment with a streamlined direct shipping model that reduces overhead while maintaining competitive pricing.

The company generates USD 158,260 in annual revenue and USD 63,304 in annual profit, representing a 40% profit margin. Average monthly revenue is approximately USD 13,188 with average monthly profit of USD 5,275, reflecting consistent demand and strong unit economics. With nearly two thousand customers and over two thousand orders recorded within the latest reporting period, the business demonstrates stable transactional volume and repeat purchasing behavior.

Vidya.shop operates on a WooCommerce infrastructure integrated with analytics tools that enable data-driven decision-making, targeted marketing, and ongoing optimization of product performance and customer experience.

Key Financials (TTM Ending November 2025)

Revenue: USD 158,260
Profit: USD 63,304
Average Monthly Revenue: USD 13,188
Average Monthly Profit: USD 5,275
Profit Margin: 40%

Financial performance reflects steady ecommerce demand supported by a diversified product catalog and efficient cost management. Monthly operating expenses are primarily related to product sourcing, logistics, and platform operations, allowing the business to maintain strong contribution margins while scaling revenue.

Product Offering & Market Position

Vidya.shop offers a curated selection of food and beverage products spanning organic ingredients, specialty health items, and niche culinary goods. This positioning allows the business to cater to consumers seeking premium and hard-to-find products, creating differentiation within the broader online grocery and specialty food market.

The focused assortment supports higher average order values, with customers spending approximately USD 95 per transaction. Product categories allow for cross-selling opportunities and repeat purchases, contributing to customer lifetime value.

Customer Base & Geographic Reach

The platform serves a primarily European audience with strong traffic from France and Belgium, complemented by international customers across North America and other regions. The business has built a base of nearly two thousand customers, supported by ongoing demand for specialty products and consistent organic discovery.

Website analytics indicate steady engagement levels and a diversified traffic mix led by organic search, followed by direct visits, social channels, and email marketing. This balanced acquisition profile provides resilience and multiple touchpoints for customer retention.

Operations & Fulfillment

Vidya.shop operates using a hybrid fulfillment a`,
  },
  {
    id: `11706917`,
    title: `Glowfully Skin`,
    revealedName: `Glowfully Skin`,
    url: `https://flippa.com/11706917`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 160772.0,
    avgMonthlyRevenue: 8654.0,
    avgMonthlyProfit: 5817.0,
    profitMargin: `67%`,
    annualRevenue: `GBP £81,764`,
    annualProfit: `GBP £54,965`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Singapore`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Singapore-based clean beauty brand with physical skincare products and local supplier relationships; requires managing p`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `3 transactions totalling USD $5,399,907`,
    },
    socialMedia: [
      `2,100 followers`,
      `10,300 followers`,
    ],
    expenses: [
      {
        item: `COGS`,
        amount: `GBP £2,505 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £1,400 /month`,
      },
      {
        item: `Staff`,
        amount: `GBP £2,794 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £37,527 Excluded from sale price`,
      `Included.`,
      `2,100 followers`,
      `10,300 followers`,
      `Attachments`,
      `XLSX`,
      `Glowfully P&L Ending Jan 2026xlsx`,
      `No comments`,
      `Managed by Flippa`,
      `Sponsored`,
      `Show all`,
      `Video`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $160,772`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `14,942`,
      totalPageViews: `5,355`,
      pagesPerSession: `2.62`,
      avgDuration: `00:00:35`,
      engagementRate: `0.49%`,
      topCountries: [
        {
          country: `Singapore`,
          views: 2049,
        },
        {
          country: `China`,
          views: 167,
        },
        {
          country: `United States`,
          views: 119,
        },
        {
          country: `Malaysia`,
          views: 111,
        },
        {
          country: `India`,
          views: 40,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 4823,
    watchers: 394,
    about: `Glowfully was started in 2018 at a time when Charlene, the owner was researching what ingredients to avoid as she was caring for my mum who was undergoing chemotherapy for her breast cancer. She wanted her to only use products that are clean and avoid any harsh chemicals going on her body. While conducting her research Charlene realised the ingredients in most off the shelf products that she had been using daily were toxic and harmful to the body. It was settled, the Glowfully was established with the intention to create a brand that resonated with Charlene’s belief that skincare could be clean, simple and effective.

Glowfully products are formulated without Paraben, Phthalates, Sulfates and Formadelhyde.

Besides creating clean beauty products, Glowfully also hopes to have formulations that would cater specially to the hot and humid environment of Southeast Asia. Thus when the Glowfully products are formulated the focus is to make sure that the products are nourishing yet not too rich or overpowering for daily use in the climatic conditions.

Key Metrics 

90% customers are based in Singapore

16 SKUs

AOV of $83

Award Winning Brand including Harpers Bazaar: Best Night Cream for Sensitive Skin and Singapore Small Business Award. 

The Brand

The brand has been featured in a number of highly regarded beauty publications including:
- Harpers Bazaar featured as the Best Night Cream for Sensitve Skin and the Best Sheet Masks For Every Skin Condition
- Vogue as one of The New Vogue Approved Beauty Products
- Her World with multiple publications including The Best Brightening Skincare Products for the Glowup You Deserve
- Vanilla Luxury featuring many articles including Our Favorite Anti-Aging Serums In Singpore 

More importantly customers love the product and their testimonials and reviews show this.

Glowfully is trademarked in Singapore, Indonesia, China and Australia. 

Operations 

Glowfully is a bootstrapped business based out of Singapore with the majority of their  customers in Southeast Asia. 

Their products are sold on the Glowfully website, Shopee, Lazada and Amazon. Manufacturing of the products is done in Singapore, Taiwan, Korea, and Charlene has recently been speaking with a potential partner in the US to move into hair and body products. The warehouse location is based in Singapore where the team of 2 people ship the Glowfully products out to customers. 

Marketing 

The traffic for Glowfully Skin is organic. 

Customer acquisition is made up by the customer referral program, social media marketing and some influencer/affiliate marketing

Financial 

The financial information shown on the Flippa listing is not net profit but EBITDA with the highlighted expenses in the attached P&L added back in to show a more accurate version of the operating expenses. 

Opportunity To Scale 

Expanding to AU, China and Indonesia including further global expansion. 

Expand into hair and beauty products 

Glowfully can scale with a focus on paid ma`,
  },
  {
    id: `12233315`,
    title: `ldbduel.com`,
    revealedName: `ldbduel.com`,
    url: `https://flippa.com/12233315`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 96750.0,
    avgMonthlyRevenue: 11913.0,
    avgMonthlyProfit: 3574.0,
    profitMargin: `30%`,
    annualRevenue: `GBP £112,565`,
    annualProfit: `GBP £33,770`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `diversification`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian e-commerce brand selling custom TCG accessories (Pokémon, Yu-Gi-Oh, MTG deck boxes, playmats). Custom physical `,
    ],
    greenFlags: [],
    seller: {
      name: `Tristan Rousset`,
      location: `Canada`,
      verified: false,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £12,758 Included in sale price`,
      `1,420 followers`,
      `66 followers`,
      `386 subscribers`,
      `4,500 subscri`,
    ],
    postSaleSupport: `and onboarding`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `44,082`,
      totalPageViews: `12,935`,
      pagesPerSession: `2.22`,
      avgDuration: `00:00:19`,
      engagementRate: `0.37%`,
      topCountries: [
        {
          country: `United States`,
          views: 10095,
        },
        {
          country: `Brazil`,
          views: 3520,
        },
        {
          country: `China`,
          views: 491,
        },
        {
          country: `Ecuador`,
          views: 178,
        },
        {
          country: `Argentina`,
          views: 159,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 634,
    watchers: 8,
    about: `LDB Duel: Business Overview

LDB Duel is a profitable ecommerce brand operating in the high-demand niche of custom trading card game (TCG) accessories and PC gaming gear. Launched in 2018, the business has carved out a loyal global customer base by offering uniquely designed, high-quality items tailored to collectors and competitive players of top franchises such as Pokémon, Yu-Gi-Oh!, Magic: The Gathering, and more.

With a product line spanning custom deck boxes, playmats, field centers, and gaming peripherals, the brand enjoys high margins, low refunds, and sticky repeat-buying behavior. Over the trailing 12 months, the business generated USD $135,000 in total revenue and USD $45,000 in net profit, operating at a healthy 30% margin and requiring minimal owner involvement.

LDB Duel is fully relocatable, easily operable with limited workload, and comes with broad untapped growth potential across marketplaces, paid acquisition, and influencer marketing. With robust fundamentals, platform diversification (Shopify, Amazon, eBay), and over 32,000 engaged users, this is a turnkey asset for ecommerce operators, collectors, or aggregators seeking a defensible, high-margin digital brand in a growing market.

Key Financials (TTM Ending Jan 2026)

Revenue: USD $135,000
Profit: USD $45,000
Monthly Revenue: USD $11,250 avg
Monthly Profit: USD $3,750 avg
Profit Margin: 30%
Profit Multiple: 2.1x
Revenue Multiple: 0.6x
Inventory Value: USD $17,000 (included in sale)

Key Business Highlights

Established Brand: 6 years of trading history with strong community recognition in the global TCG niche
Diversified Revenue Streams: Multi-platform presence across Shopify, Amazon, and eBay
DTC Performance: Shopify generated USD $54,911 in sales from 817 orders and 2,986 customers over 12 months
Marketplace Reach: 558 Amazon orders and 216 eBay orders with strong AOV and low refund rates
High Organic Engagement: 157,773 annual page views from 32,744 users; top countries include the U.S., China, Japan, and Canada
Strong Direct Traffic: 35% of all pageviews are direct, indicating high brand recall and loyalty
Zero Refunds on Shopify: 0.0% refund rate across DTC orders with a 98.7% fulfillment rate
SEO Authority: 706 total keywords, 160 referring domains, and a domain authority score of 24
Email Marketing List: 4,500 subscribers with high conversion potential for repeat launches
Social Proof: 1,420 Instagram followers, 386 YouTube subscribers, and growing organic search footprint
Lean Operations: Self-fulfillment with low overhead and straightforward logistics

Product & Market Positioning

LDB Duel is strategically positioned at the intersection of collectible gaming culture and functional gear for serious players. The brand offers limited-edition, fandom-driven accessories that are as aesthetically appealing as they are practical. Customers include competitive tournament players, casual fans, and collectors who value premium, stylized gaming tools that enhance their play a`,
  },
  {
    id: `12101579`,
    title: `Ecommerce Store | Sports and Outdoor`,
    revealedName: `Ecommerce Store | Sports and Outdoor`,
    url: `https://flippa.com/12101579`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 74110.0,
    avgMonthlyRevenue: 4022.0,
    avgMonthlyProfit: 2833.0,
    profitMargin: `70%`,
    annualRevenue: `GBP £38,009`,
    annualProfit: `GBP £26,766`,
    ageYears: 15.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Bulgaria`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Bulgarian e-commerce fishing gear store founded 2010 — EU-based physical inventory and fulfillment; requires local wareh`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 81,
    watchers: 2,
    about: `n e-commerce platform, known for its specialization in fishing gear and outdoor products, has been leveraging digital opportunities since its founding in 2010. The platform's unique appeal is its extensive collection of curated products that cater to diverse outdoor enthusiasts and sports lovers. The company has strategically anchored itself in the e-commerce space using modern technology and strategic collaborations to maintain a competitive edge and drive revenue. The platform's success is attributed to its well-coordinated operations, comprising primarily e-commerce and direct shipping revenue streams. Through a sophisticated online store, customers can explore a broad range of fishing and outdoor products, supported by a robust digital marketing strategy utilizing SEO, social media, and targeted ads. Direct shipping further enhances efficiency, enabling rapid deliveries. The company also serves as a distributor for a notable cooler brand, distributing these products to retailers. Its customer base is diverse, including outdoor enthusiasts, sports professionals, and casual fishing hobbyists. By offering products that range from entry-level to high-performance gear, the company appeals to all segments of the outdoor community. Commitment to quality and customer service has built a loyal customer base, with initiatives in feedback and community engagement refining their offerings. Underpinning its operations is a strong technology infrastructure facilitating seamless and secure transactions. Integration with payment gateways and analytics tools assures high security and allows the company to analyze consumer behavior. Demonstrating financial growth since 2010, the company benefits from a scalable model and market positioning, focusing on fishing and outdoor niches, maintaining competitive pricing, and enhancing customer experience through technology.`,
  },
  {
    id: `12016134`,
    title: `rocksolidfitness.ca`,
    revealedName: `rocksolidfitness.ca`,
    url: `https://flippa.com/12016134`,
    domain: `http://www.rocksolidfitness.ca/`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 49999.0,
    avgMonthlyRevenue: 4907.0,
    avgMonthlyProfit: 1958.0,
    profitMargin: `40%`,
    annualRevenue: `GBP £46,364`,
    annualProfit: `GBP £18,510`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `ready`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian adjustable dumbbell brand sold via Shopify and Amazon with physical manufacturing in Canada. Heavy physical fit`,
    ],
    greenFlags: [],
    seller: {
      name: `Mazin Jillood`,
      location: `Oman`,
      verified: false,
    },
    socialMedia: [
      `918 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £37,899 Included in sale price`,
      `Brand Schema`,
      `Included.`,
      `918 followers`,
      `Attachments`,
      `XLSX`,
      `RSF Finances`,
      `Contact Seller`,
      `Send message`,
      `Joshua Jan 27, 2026 12:15 AM`,
      `Can you create variants of the product in poun`,
    ],
    postSaleSupport: `is provided to ensure a smooth handover.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    comments: [
      {
        author: `Joshua`,
        date: `Jan 27, 2026 12:15 AM`,
        text: `Can you create variants of the product in pounds for US based consumers? If so, what does the cost look like to do that?`,
      },
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1369,
    watchers: 43,
    commentCount: 1,
    about: `Rock Solid Fitness – Business Overview

Rock Solid Fitness is a Canadian home-strength brand known for a uniquely engineered line of adjustable dumbbells sold via Shopify and Amazon. The flagship TectonicPlates series offers compact, fast-adjusting mechanisms with refined 1kg, 2kg, and 4kg increment options and maximum weights up to 32–40kg, delivering a premium feel without the bulky “skeleton” seen on many competitors. The brand’s Canadian roots and London, Ontario presence enhance trust with domestic buyers, while Amazon distribution expands reach across North America. The Rock Solid name is protected in Canada, supporting long-term brand equity and defensibility.

Key Financials

The business historically performed at higher run rates when actively marketed, with peak months reaching $6,000–$8,000 CAD net profit and per-unit contribution of $100–$170 CAD. A slowdown in 2023 was driven by owner focus shifting to another venture rather than demand or product issues, leaving an established platform ready to scale.

Products, Channels & Performance

The TectonicPlates lineup spans multiple models: Lite (2kg increments, up to 34kg), Premium (1kg increments, up to 32kg), and 1.0/3.0 variants (4kg increments, up to 40kg). Listings and product pages highlight tool-free, wrist-turn weight changes and precise click indexing, positioning the range against well-known rivals while emphasizing compact geometry and finish quality. Sales flow through Shopify and Amazon, with Shopify reporting 507 customers, $24,743 in sales, 55 orders, $449 AOV, 98.2% fulfillment, and 0% refunds; Amazon shows 305 orders, $170 AOV, and a 14% refund rate over the same period, validating multi-channel demand and the need for simple post-purchase education to lower Amazon returns.

Operations

The brand runs lean with self-fulfillment and established supplier relationships. Processes cover inventory intake, order pick/pack, and customer support. Included inventory is valued at USD $58,861 and is part of the sale, enabling immediate continuity of supply. The trademark position in Canada, combined with distinctive industrial design and model naming, underpins differentiation at retail and in marketplaces.

Growth Opportunities

Restart always-on Amazon PPC and Meta campaigns to recapture prior peak net profit performance. Expand the SKU tree with heavier max-weight sets, colorways, storage stands, and barbell/bench upsells to raise AOV and LTV. Add structured post-purchase onboarding (videos, email flows) to reduce Amazon refunds and improve reviews. Re-engage email, influencer, and affiliate programs; target Canadian PR features leveraging the brand’s local story. Explore B2B channels with boutique gyms/physio clinics and bundle pricing for garage-gym builders. Benchmark positioning against major adjustable dumbbell roundups to sharpen messaging on increments, speed of change, footprint, and finish.

Assets Included in the Sale

Domain and Shopify store, website files, email addr`,
  },
  {
    id: `12294438`,
    title: `Crux Gear`,
    revealedName: `Crux Gear`,
    url: `https://flippa.com/12294438`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 85000.0,
    avgMonthlyRevenue: 7184.0,
    avgMonthlyProfit: 3059.0,
    profitMargin: `43%`,
    annualRevenue: `GBP £67,890`,
    annualProfit: `GBP £28,902`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Crux Gear) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Neil Waldbaum`,
      location: `Australia`,
      verified: true,
    },
    socialMedia: [
      `19 followers`,
      `1,820 followers`,
      `1 followers`,
      `58 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £2,611 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `19 followers`,
      `1,820 followers`,
      `1 followers`,
      `58 followers`,
      `1,600 subscribers`,
      `3,000 subscribers`,
      `Attachments`,
      `CRUX_GEAR-Profit_an`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `41,846`,
      totalPageViews: `10,038`,
      pagesPerSession: `2.15`,
      avgDuration: `00:00:34`,
      engagementRate: `0.44%`,
      topCountries: [
        {
          country: `United States`,
          views: 2690,
        },
        {
          country: `Australia`,
          views: 2615,
        },
        {
          country: `United Kingdom`,
          views: 614,
        },
        {
          country: `Germany`,
          views: 506,
        },
        {
          country: `Spain`,
          views: 400,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 154,
    watchers: 12,
    about: `Crux Gear – Rock Climbing & Bouldering Strength Training Brand | AUD $130K Revenue | 43% Profit Margin | High-Margin Proprietary Product Line | Global Reach & Relocatable Model

Business Overview

Crux Gear is a leading Australian eCommerce brand specializing in high-margin grip strength and performance training equipment for climbers and strength athletes. Established two years ago, the business has rapidly developed proprietary products and a scalable, cost-efficient production model, generating strong revenue and consistent profits while serving customers globally. The brand is fully relocatable, with robust international logistics and a lightweight manufacturing framework designed for growth.

Location: Australia (relocatable, global sales)
Site Age: 2 years
Annual Revenue: AUD $130,814 (≈ USD $91,000)
Annual Profit: AUD $55,690
Profit Margin: 43%
Monthly Profit: AUD $4,641 average
Profit Multiple: 2.2x
Revenue Multiple: 0.9x
Pages Views: 10,038 per month

Key Business Highlights

Proprietary Products: Portfolio anchored by flagship Magboard (51% of sales), with 60 SKUs including 11 proprietary products and branded accessories
Production Model: In-house 3D printing keeps variable costs low (33.1%) and maintains high gross margins (80–90%). Production can be scaled or relocated with minimal capital investment; current inventory at cost is under AUD $5,000.
Growth: Recent three-month revenues grew to AUD $40,000, representing 30% of the trailing 12-month sales; Black Friday/Cyber Monday (BFCM) period alone brought in AUD $20,300.
International Demand: Over 53% of online revenue is from outside Australia—AUD $32,800 (USA), AUD $32,900 (Europe), and AUD $56,400 (Australia).
Customer Base: 1,291 Shopify orders (2,921 items sold) in the last 12 months; average order value is AUD $98; 6.31% return customer rate (standard for non-consumables); proven and growing first-time purchase demand.
Marketing Efficiency: Marketing spend of AUD $28,854 yielded a 4.5x return on ad spend (MER).
Debt-Free Structure: No debt; clean financials; all assets consolidated under Crux Gear Pty Ltd.

Operations & Production

Efficient in-house production using 5 low-cost 3D printers—scalable and portable.
Average fulfilment in 1–2 days; print and assembly documentation included.
Supplier relationships for raw materials are established and transferrable.
All intellectual property, proprietary CAD files, and branding assets included.

Transferable Brand & Digital Assets

Registered Australian trademark (no disputes)
Domains: cruxgear.com.au, cruxgear.com, cruxgear.shop
Shopify storefront (with GA4)
Email database (3,000 subscribers)
Social media: Instagram (1,820), YouTube (1,600), Facebook, Pinterest, TikTok, LinkedIn
Professional product photography, barcodes, supplier contracts, and custom technology
Full inventory and optional transfer of production equipment for Australian buyer

Business Structure & History

Established August 2022; transitioned to Crux Gear Pty Ltd in`,
  },
  {
    id: `12269929`,
    title: `IMPERIAL LUXURY LTD`,
    revealedName: `IMPERIAL LUXURY LTD`,
    url: `https://flippa.com/12269929`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 73775.0,
    avgMonthlyRevenue: 12201.0,
    avgMonthlyProfit: 3051.0,
    profitMargin: `25%`,
    annualRevenue: `GBP £115,288`,
    annualProfit: `GBP £28,821`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `UK e-commerce brand selling handmade abayas and mukhawars (Islamic fashion); handmade physical products require UK-based`,
    ],
    greenFlags: [],
    seller: {
      name: `Radya`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `37,400 followers`,
      `14,300 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £5 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £200 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £1,000 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £259 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Offer Schema`,
      `Included.`,
      `37,400 followers`,
      `14,300 followers`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $100,520`,
      `USD $73,775`,
      `Reduced 27%`,
      `GBP £55,027`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $1.4K*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + D`,
    ],
    postSaleSupport: `Why Acquire Imperial Luxury Ltd?`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 208,
    watchers: 2,
    about: `Imperial Luxury Ltd Up

Imperial Luxury Ltd is a fast-growing UK-based e-commerce brand specializing in handmade, high-quality abayas and mukhawars that blend traditional elegance with modern luxury styling. Established in 2020, the business has positioned itself as a premium online destination for culturally inspired women’s fashion, serving customers seeking distinctive occasion wear, gifting pieces, and elevated everyday garments. Operating primarily through Shopify, the company leverages a direct-to-consumer model supported by organic social media traction and SEO visibility. With a strong brand identity and visually compelling product presentation, Imperial Luxury has cultivated a loyal audience across the UK and US, alongside international demand. The brand’s focus on craftsmanship, exclusivity, and modern styling has enabled it to differentiate itself within the modest fashion and luxury cultural wear market. Over the past twelve months, the company has demonstrated consistent sales performance, healthy margins, and efficient cost management, validating both product-market fit and operational scalability.

Key Financials (TTM)

Revenue: USD $154,567
Profit: USD $38,640
Average Monthly Revenue: USD $12,880
Average Monthly Profit: USD $3,219
Profit Margin: 25%
Average Order Value: USD $90
Total Customers: 4,453
Total Orders: 1,583
Fulfilment Rate: 92.2%
Refund Rate: 0.0%
Email Subscribers: 3,877

The business maintains a lean cost structure, with primary recurring expenses consisting of warehousing at USD $1,341 per month, platform fees at USD $347 per month, marketing spend of USD $268 per month, and minimal shipping costs due to an efficient direct-to-customer model. Strong operational discipline combined with premium pricing supports sustainable profitability and ongoing reinvestment capacity.

Key Business Highlights

Imperial Luxury benefits from a highly engaged social audience, including 37,400 Instagram followers and 14,300 TikTok followers, driving organic brand visibility and customer acquisition. The brand has built authority within its niche, supported by 92 referring domains, 101 backlinks, and 69 ranking keywords, with strong visibility for terms related to mukhawars and modest luxury fashion in the UK market. The company operates with a lean team structure consisting of a full-time director and part-time staff, ensuring quality control while maintaining operational flexibility. Each garment is handcrafted, reinforcing exclusivity and premium positioning. The Shopify-powered storefront enables streamlined inventory management, customer relationship management, and seamless checkout functionality. A zero percent refund rate reflects strong customer satisfaction and product alignment with expectations.

Customer Demographics & Reach

Imperial Luxury primarily serves style-conscious women in the United Kingdom and the United States, with additional international reach through cross-border shipping. Customers are typically seeking `,
  },
  {
    id: `11744499`,
    title: `bikerjewelryshop.com`,
    revealedName: `bikerjewelryshop.com`,
    url: `https://flippa.com/11744499`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 75000.0,
    avgMonthlyRevenue: 7525.0,
    avgMonthlyProfit: 2785.0,
    profitMargin: `37%`,
    annualRevenue: `GBP £71,102`,
    annualProfit: `GBP £26,313`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `FL, United States`,
    platform: `ready`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Shopify jewelry e-commerce with 400+ SKUs (sterling silver) based in Florida. Ships physical inventory; US-centric fulfi`,
    ],
    greenFlags: [],
    seller: {
      name: `Tony`,
      location: `United States`,
      verified: true,
    },
    socialMedia: [
      `5,000 followers`,
      `1,200 followers`,
      `65 followers`,
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £7,504 Excluded from sale price`,
      `Organization Schema`,
      `Social Medi`,
    ],
    postSaleSupport: `Included. Will provide 25 Hours of training or more if needed. This is a very easy business to learn and operate with one person`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2555,
    watchers: 242,
    about: `Turnkey U.S.-Based Jewelry E-commerce Store – High Growth, High Margins, Ready for Q4 Surge

This is a rare chance to acquire a fully operational, profit-generating U.S. based jewelry e-commerce business just in time for the peak holiday buying season. Built on Shopify in 2022 and already showing impressive year-over-year growth, this turnkey opportunity offers a fast track to ROI and long-term scalability in a lucrative niche.

Why This Business Stands Out

Proven Performance: Consistently growing with 90%+ profit margins on over 400 high-quality jewelry SKUs—including sterling silver and stainless-steel pieces for both men and women.

High Customer Satisfaction: 4.9-star average seller rating, $43+ AOV, and a 13+% repeat customer rate.

Organic & Paid Growth: Strong SEO foundation, established PPC campaigns (Facebook & Google), and active social media channels with strong community engagement.

Holiday-Ready: With Q3-4 just around the corner, the timing couldn't be better to capitalize on seasonal demand.

Built by Industry Experts

This website was developed by a seasoned U.S. wholesale jewelry e-commerce company with over 23 years in the business. They will continue to supply inventory to the new owner if desired, ensuring seamless product sourcing and consistency. Unlike many competitors, this store is not affected by Chinese import tariffs, including those using the De Minimis rule, thanks to domestic fulfillment based in Florida — giving you a strategic advantage.

Operational Simplicity, Maximum Flexibility

10 Hours/Week Operation: Can be managed solo from a small space, or scaled with team support.

In-House Fulfillment or Dropshipping: Inventory is currently handled in-house, but drop shipping is available via the existing supplier if preferred (subject to negotiated terms).

Optional Experienced Team: Access to specialists in PPC, SEO, content, and customer support available if you'd like to hit the ground running.

Comprehensive Support for a Smooth Handoff

The current owner is committed to your success, offering:

Up to 25 hours of onboarding and training over 4 weeks

Ongoing consultation as needed

Access to all SOPs, marketing platforms, and tools used to drive growth

Endless Scaling Potential

The foundation is set for major expansion. Future growth opportunities include:

Selling on additional marketplaces (Amazon, Walmart, Etsy, eBay)

Leveraging influencers and social commerce

Tapping into international markets

Enhancing email marketing and retention funnels

Invest in a Business That’s Already Winning

Whether you're an established investor looking to add a high-margin asset to your portfolio or an entrepreneur ready to dive into a thriving niche, this is a smart, strategic acquisition. With all the systems in place and support from seasoned experts, you're not just buying a business—you’re stepping into a proven platform ready to scale.

Let’s talk further—I’d be happy to share more details or schedule a call to walk yo`,
  },
  {
    id: `12256610`,
    title: `Stretch mx`,
    revealedName: `Stretch mx`,
    url: `https://flippa.com/12256610`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 70339.0,
    monthlyPL: [
      { month: `Dec 2024`, revenue: 7717.79, expenses: 3506.47, profit: 4211.32 },
      { month: `Jan 2025`, revenue: 7847.33, expenses: 3566.16, profit: 4281.17 },
      { month: `Feb 2025`, revenue: 11715.75, expenses: 5323.84, profit: 6391.91 },
      { month: `Mar 2025`, revenue: 3723.64, expenses: 1691.64, profit: 2032.0 },
      { month: `Apr 2025`, revenue: 2456.18, expenses: 1116.33, profit: 1339.85 },
      { month: `May 2025`, revenue: 2625.09, expenses: 1192.53, profit: 1432.56 },
      { month: `Jun 2025`, revenue: 3644.9, expenses: 1656.08, profit: 1988.82 },
      { month: `Jul 2025`, revenue: 5589.27, expenses: 2540.0, profit: 3049.27 },
      { month: `Aug 2025`, revenue: 5115.56, expenses: 2325.37, profit: 2790.19 },
      { month: `Sep 2025`, revenue: 1217.93, expenses: 553.72, profit: 664.21 },
      { month: `Oct 2025`, revenue: 721.36, expenses: 327.66, profit: 393.7 },
      { month: `Nov 2025`, revenue: 9513.57, expenses: 4323.08, profit: 5190.49 },
    ],
    avgMonthlyRevenue: 5157.0,
    avgMonthlyProfit: 2814.0,
    profitMargin: `55%`,
    annualRevenue: `GBP £48,731`,
    annualProfit: `with 55% margins, $210 AOV, near-zero returns, and proprietary 3D configurator.`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `France`,
    platform: `Product`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Stretch mx) — identified from listing description`,
      `Revenue declining sharply (-58.0% trend)`,
      `High revenue volatility (CV 64%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Steven Maginot`,
      location: `France`,
      verified: false,
    },
    socialMedia: [
      `501 followers`,
      `2,391 followers`,
      `1,015 followers`,
    ],
    expenses: [
      {
        item: `Sous traitance usine`,
        amount: `GBP £1 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £1,283 Included in sale price`,
      `Product Schema`,
      `Included.`,
      `501 followers`,
      `2,391 followers`,
      `1,015 followers`,
      `850 subscribers`,
      `Attachments`,
      `Capture d’écran 2025-12-31 à 10`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 246,
    watchers: 3,
    about: `Stretch MX: Business Overview

Stretch MX is a premium motocross and sportswear e-commerce brand specializing in fully customizable riding apparel through an intuitive online 3D configurator. Founded in France two years ago, the brand sits at the intersection of performance, style, and personalization, offering riders the ability to design high-end motocross gear tailored to their identity. With strong brand recognition, excellent customer reviews, and a proven customization workflow, Stretch MX has established itself as a differentiated player in the European motocross apparel market.

The business operates on Shopify with a hybrid logistics model combining stocked items and made-to-order sublimated products. This structure supports high margins, minimal returns, and strong customer satisfaction. Over the past 12 months, Stretch MX generated USD $65,645 in revenue and USD $35,812 in profit, supported by an average order value of approximately USD $210 and a near-zero return rate driven by bespoke customization.

Key Financials (Trailing Twelve Months)

Revenue: USD $65,645
Profit: USD $35,812
Average Monthly Revenue: USD $5,470
Average Monthly Profit: USD $2,984
Profit Margin: 55%

Revenue performance shows healthy seasonality aligned with motocross demand cycles, with strong peak months exceeding USD $10K in revenue. Current valuation multiples of 2.0x profit and 1.1x revenue present an attractive entry point relative to brand strength, margins, and technology moat.

Product & Brand Differentiation

Stretch MX’s core value proposition is full customization. Customers design their own motocross kits using a visual 3D module that significantly improves conversion rates and reduces purchase hesitation. The product range includes complete riding kits, gloves, accessories, and masks, all produced using high-quality sublimation printing validated by consistent customer feedback and an average rating of 4.8/5.

The brand benefits from a high perceived value, reflected in its strong basket size and repeat engagement. Because products are personalized, return rates are virtually nonexistent, materially improving unit economics and operational efficiency.

Customers & Market Positioning

Stretch MX serves motocross riders and enthusiasts seeking individuality, performance, and premium aesthetics. The audience is passion-driven and brand-loyal, making it highly receptive to upsells, limited editions, and team or club orders. In 2025 alone, the site attracted approximately 21,400 visitors without paid advertising, demonstrating strong organic traction and brand-driven discovery.

The customer base includes over 900 buyers with an active email list and growing social media presence across Instagram, Facebook, and TikTok, creating a solid owned-audience foundation for future launches.

Operations & Technology

Daily operations are straightforward and include order validation, coordination with manufacturing partners, and customer communication. Production is`,
  },
  {
    id: `12101019`,
    title: `Dec Art Srls`,
    revealedName: `Dec Art Srls`,
    url: `https://flippa.com/12101019`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 142508.0,
    monthlyPL: [
      { month: `Oct 2024`, revenue: 2961.64, expenses: 20218.4, profit: -17256.76 },
      { month: `Nov 2024`, revenue: 16065.5, expenses: 16214.09, profit: -148.59 },
      { month: `Dec 2024`, revenue: 8595.36, expenses: 8185.15, profit: 410.21 },
      { month: `Jan 2025`, revenue: 350.52, expenses: 2341.88, profit: -1991.36 },
      { month: `Feb 2025`, revenue: 1258.57, expenses: 4048.76, profit: -2790.19 },
      { month: `Mar 2025`, revenue: 128.27, expenses: 3729.99, profit: -3601.72 },
      { month: `Apr 2025`, revenue: 3191.51, expenses: 3275.33, profit: -83.82 },
      { month: `May 2025`, revenue: 2409.19, expenses: 3576.32, profit: -1167.13 },
      { month: `Jun 2025`, revenue: 77511.91, expenses: 4832.35, profit: 72679.56 },
      { month: `Jul 2025`, revenue: 29190.95, expenses: 10088.88, profit: 19103.34 },
      { month: `Aug 2025`, revenue: 7330.44, expenses: 17049.75, profit: -9718.04 },
      { month: `Sep 2025`, revenue: 3318.51, expenses: 3759.2, profit: -439.42 },
    ],
    avgMonthlyRevenue: 12693.0,
    avgMonthlyProfit: 4583.0,
    profitMargin: `36%`,
    annualRevenue: `GBP £119,933`,
    annualProfit: `GBP £43,302`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Italy`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 60.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 58.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Italian art brand selling physical artbooks, tarot decks, and fine-art prints. Physical inventory in Italy; not feasible`,
      `High revenue volatility (CV 166%)`,
      `9 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `5 transactions totalling USD $846,172`,
    },
    socialMedia: [
      `152,033 followers`,
      `242,000 followers`,
      `166,600 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £17 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £625 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £90 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £564 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £3,752 Included in sale price`,
      `Shopify`,
      `Included.`,
      `152,033 followers`,
      `242,000 followers`,
      `166,600 followers`,
      `5,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `EBITDA DEC`,
      `No comments`,
      `Show all`,
      `Video`,
      `Open for negotiatio`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 568,
    watchers: 25,
    about: `Summary

Founded in 2021, Dec-Art is a profitable art and e-commerce brand combining creativity, community, and proven market traction. Selling artbooks, tarot decks, and fine-art prints, the brand leverages a strong social media ecosystem to generate rapid sales bursts around new launches.

With €137,819 revenue and €54K net profit (~39% margin) in the past 12 months, the latest product launch drove standout performance in June–July 2025, confirming robust demand and scalable brand equity. The brand’s large organic audience and streamlined operations make it ideal for a buyer seeking a distinctive digital brand with built-in reach and a repeatable sales model.

Key Highlights

€205K+ raised across two campaigns; latest launch peaked at €75K+ in a single month.

Strong and growing audience: 254K Instagram, 166K TikTok, 1.5K Facebook group, 8K email list.

High-performing funnel: Meta Ads + organic social = 3.5–10x ROAS.

BackerKit partnership provides ad funding and data-driven targeting.

5,000 customers in CRM, with ~30% repeat purchasing.

Global reach: ~70% U.S., ~30% Europe.

Outsourced operations: Printful + Chinese & Italian partners; zero warehouse.

Owner workload: 10–15 hrs/week, 0 employees.

Distinct artistic identity with strong collector appeal and scalable brand IP.

Growth Opportunities

Scale direct e-commerce: Convert 290K+ followers into regular Shopify customers with retargeting, bundles, and upsells.

Launch calendar: Use the existing funnel to roll out new themed drops quarterly.

Expand in the U.S.: Move logistics and fulfillment stateside to lower costs and improve margins.

Wholesale distribution: Partner with boutique and art retailers.

Membership model: Offer exclusive editions or early-access sales for collectors and fans.

Products / Services

Core products: Tarot decks, collectible artbooks, and high-quality art prints.

AOV: ~€80 per order.

Revenue mix: ~70% launch-based sales, 30% ongoing e-commerce.

Manufacturing: Cartamundi & WJPC (decks), Italian printer (books), Printful (on-demand).

Fulfillment: 5–6 day average delivery to U.S.; zero in-house stock.

Customer & Market Overview

Audience: Primarily art and lifestyle consumers aged 25–45.

Geography: 70% U.S., 30% EU/UK.

Retention: ~30% repeat buyers.

Market: Positioned between art collectibles and spiritual lifestyle products — both categories showing consistent online growth.

Social proof: Large, active community with strong engagement and hundreds of positive public reviews.

Route to Market & Supply Chain

Sales Channels: Shopify (main store), Kickstarter (launch platform).

Marketing: Organic social, Meta Ads, influencer content, and email automation.

Funding: BackerKit supports ad spend for major launches.

Fulfillment: Print-on-demand and outsourced production partners; no inventory risk.

Operations & Time Commitment

Owner hours: 10–15 per week (campaign management, creative direction, customer communication).

Team: Founder + artist; occasional`,
  },
  {
    id: `12260990`,
    title: `wildclouds.com`,
    revealedName: `wildclouds.com`,
    url: `https://flippa.com/12260990`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 97064.0,
    monthlyPL: [
      { month: `Mar 2025`, revenue: 6873.24, expenses: 3298.19, profit: 3575.05 },
      { month: `Apr 2025`, revenue: 13807.44, expenses: 12059.92, profit: 1747.52 },
      { month: `May 2025`, revenue: 14587.22, expenses: 6141.72, profit: 8445.5 },
      { month: `Jun 2025`, revenue: 13388.34, expenses: 2998.47, profit: 10388.6 },
      { month: `Jul 2025`, revenue: 23414.99, expenses: 15911.83, profit: 7501.89 },
      { month: `Aug 2025`, revenue: 15830.55, expenses: 15527.02, profit: 303.53 },
      { month: `Sep 2025`, revenue: 14345.92, expenses: 13385.8, profit: 960.12 },
      { month: `Oct 2025`, revenue: 9989.82, expenses: 6548.12, profit: 3442.97 },
      { month: `Nov 2025`, revenue: 3726.18, expenses: 5325.11, profit: -1597.66 },
      { month: `Dec 2025`, revenue: 4841.24, expenses: 3567.43, profit: 1273.81 },
      { month: `Jan 2026`, revenue: 5693.41, expenses: 1512.57, profit: 4180.84 },
      { month: `Feb 2026`, revenue: 4611.37, expenses: 2264.41, profit: 2346.96 },
    ],
    avgMonthlyRevenue: 10926.0,
    avgMonthlyProfit: 3547.0,
    profitMargin: `32%`,
    annualRevenue: `GBP £103,236`,
    annualProfit: `GBP £33,519`,
    ageYears: 4.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Metrics`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 53.8,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `UK-based B Corp certified slow fashion apparel brand with physical inventory and sustainability identity tied to UK mark`,
      `Revenue declining sharply (-57.1% trend)`,
      `High revenue volatility (CV 52%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Franny Collingham`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `791 followers`,
      `9,311 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £503 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £1,005 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £1,004 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £101 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Vite`,
      `Included.`,
      `791 followers`,
      `9,311 followers`,
      `2,000 subscribers`,
      `Attachments`,
      `CompanyOverview`,
      `ProfitandLossbyMonth`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $105,077`,
      `USD $97,064`,
      `Reduced 8%`,
      `GBP £72,398`,
      `Cont`,
    ],
    postSaleSupport: `to ensure a smooth handover.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `PayPal`,
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 432,
    watchers: 14,
    about: `Wild Clouds: Business Overview

Wild Clouds is a purpose-driven, B Corp certified fashion brand based in the UK, offering gender-inclusive, slow fashion apparel with a strong sustainability ethos. Since its inception four years ago, the business has built a highly engaged customer base and established a strong foundation in the ethical fashion space. With a highly recognizable aesthetic, outstanding customer reviews, and established supplier relationships, the brand is primed for both margin optimization and scalable growth.

In the twelve months ending December 2025, Wild Clouds generated £94.6k in revenue (USD $132.8k), with a net profit of USD $37.1k and an average monthly profit margin of 28%. The sale includes approximately £22k of inventory at cost, along with all IP, future design assets, and fully transferable operations.

Key Financials (TTM Ending Dec 2025)

Revenue: USD $132,767 (GBP £94.6k)
Profit: USD $37,077
Monthly Average Revenue: USD $11,063
Monthly Average Profit: USD $3,089
Profit Margin: 28%
Peak Monthly Revenue: USD $24.6k (July 2025)
Inventory: ~£22,000 (included at cost)

Operations

Wild Clouds operates on a streamlined direct-to-consumer (DTC) model via a Shopify storefront, selling sustainably made, uniquely designed garments. All manufacturing is outsourced to vetted ethical production partners, while fulfilment is managed externally. The business currently requires 5–10 hours per week from the founder, focused on product planning, marketing oversight, and customer service. All operations are documented and will be seamlessly transferable to a new owner. The sale includes up to 2 months of post-sale support to ensure a smooth handover.

Brand Positioning & Reputation

The brand occupies a differentiated space in the UK ethical fashion market, with a strong focus on slow fashion, inclusivity, and environmental responsibility. Certified B Corp status further enhances brand credibility, positioning Wild Clouds to benefit from increased consumer demand for transparent and sustainable fashion. The brand maintains a 4.8/5 review score on Trustpilot and JudgeMe, reflecting high customer satisfaction and product quality.

The aesthetic is distinctive and memorable, contributing to brand stickiness and organic word-of-mouth growth. With 9.3k Instagram followers, 2.5k email subscribers, and excellent repeat customer engagement, Wild Clouds has all the hallmarks of a brand ready to scale.

Customer Base

The core customer base is UK-based, but international orders are consistently received and present a clear expansion opportunity. The brand attracts a values-driven audience, with acquisition driven by organic search, social media, email marketing, and word-of-mouth. An average order value of $109 and a 0.0% refund rate underscore the quality and fit of the product to its market.

Performance & Platform Metrics

Orders (TTM): 792
Customers: 2,919
Average Order Value: $109
Fulfilment Rate: 98.4%
Refund Rate: 0.0%
Email List: 2,491 `,
  },
  {
    id: `11913581`,
    title: `Art Of Techno`,
    revealedName: `Art Of Techno`,
    url: `https://flippa.com/11913581`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 140917.0,
    monthlyPL: [
      { month: `Dec 2024`, revenue: 170700.7, expenses: 161945.32, profit: 8755.38 },
      { month: `Jan 2025`, revenue: 59950.35, expenses: 64372.49, profit: -4422.14 },
      { month: `Feb 2025`, revenue: 47499.27, expenses: 48073.31, profit: -574.04 },
      { month: `Mar 2025`, revenue: 45210.73, expenses: 40151.05, profit: 5058.41 },
      { month: `Apr 2025`, revenue: 41075.61, expenses: 32193.23, profit: 8882.38 },
      { month: `May 2025`, revenue: 32937.45, expenses: 28672.79, profit: 4265.93 },
      { month: `Jun 2025`, revenue: 32476.44, expenses: 30345.38, profit: 2131.06 },
      { month: `Jul 2025`, revenue: 83813.65, expenses: 70006.21, profit: 13808.71 },
      { month: `Aug 2025`, revenue: 58606.69, expenses: 51424.84, profit: 7181.85 },
      { month: `Sep 2025`, revenue: 36137.85, expenses: 33655.0, profit: 2482.85 },
      { month: `Oct 2025`, revenue: 42491.66, expenses: 38373.05, profit: 4118.61 },
      { month: `Nov 2025`, revenue: 79682.34, expenses: 71687.69, profit: 7994.65 },
    ],
    avgMonthlyRevenue: 60882.0,
    avgMonthlyProfit: 4974.0,
    profitMargin: `8%`,
    annualRevenue: `GBP £575,263`,
    annualProfit: `Potential: €100,000+ (with full-time management)`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Germany`,
    platform: `Hyros`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 52.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 75,
      growthPotential: 50,
      overall: 58.2,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Techno music fashion brand (Germany) with 85K+ followers selling physical clothing/merchandise. Physical inventory in Eu`,
      `Revenue declining sharply (-43.1% trend)`,
      `High revenue volatility (CV 60%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Thomas Selenski`,
      location: `Germany`,
      verified: true,
    },
    socialMedia: [
      `6,600 followers`,
      `55,500 followers`,
      `31,400 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,970 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £23,028 /month`,
      },
      {
        item: `Software`,
        amount: `GBP £967 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Organization Schema`,
      `Included.`,
      `6,600 followers`,
      `55,500 followers`,
      `31,400 followers`,
      `198,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `Zahlen_nach_Monat`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $140,917`,
      `GBP £105,750`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `364,000`,
      totalPageViews: `87,013`,
      pagesPerSession: `2.10`,
      avgDuration: `00:00:00`,
      engagementRate: `0.27%`,
      topCountries: [
        {
          country: `Germany`,
          views: 27015,
        },
        {
          country: `France`,
          views: 12968,
        },
        {
          country: `United Kingdom`,
          views: 4396,
        },
        {
          country: `Spain`,
          views: 3282,
        },
        {
          country: `Switzerland`,
          views: 3110,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1129,
    watchers: 79,
    about: `Key Highlights

Since its inception in 2019, Art of Techno has established itself as one of the largest techno fashion brands in Europe, catering to a highly engaged audience of techno music lovers. The brand boasts over 85,000 social media followers, nearly 200,000 email contacts, and a strong presence on platforms like TikTok, where its unique designs are frequently promoted by influencers.

Despite its success, the business has only been actively managed during Q4 each year, generating six-figure revenues in just three months. With full-time dedication, a new owner could significantly scale operations year-round and tap into the brand’s untapped potential.

Operations

Art of Techno is a fully automated eCommerce store powered by Shopify and a self-owned print-on-demand (POD) production facility. Unlike many competitors relying on third-party suppliers, the business has complete control over its production, ensuring fast shipping and premium quality.

Products: Oversized T-shirts & hoodies, sweatshirts, tank tops, crop tops, and jewelry
Fulfillment: Print-on-demand model with in-house production
Shipping Partner: DHL
Automation: All processes are fully automated

Minimal effort is required to maintain operations, with only 8 hours per week spent on management from January to September. The bulk of sales occur in Q4, during which around 20 hours per week are invested, leading to peak revenue performance.

Customers & Growth Potential

With an engaged audience of techno enthusiasts, Art of Techno has built a strong brand identity in the electronic music scene. The customer base consists of fashion-forward individuals who value unique, high-quality designs.

Average Monthly Orders:
January–September: ~386 orders/month
October–December: ~2,616 orders/month
Returning Customer Rate: 11.82%
Marketing Channels:
Meta Ads, Google Ads, TikTok Ads, Email Marketing, and Influencer Marketing
Collaborations with top influencers in the techno niche

With year-round marketing efforts, expansion into new markets (e.g., USA & other European countries), and the introduction of additional product lines, there is massive potential to scale this business further.

Technology & Automation

Art of Techno is built on a Shopify-powered eCommerce system, ensuring a seamless shopping experience. Key integrations include:

Shopify – Main eCommerce platform
Hyros – Advanced ad-tracking software
Klaviyo – Email marketing automation
DHL – Shipping & fulfillment partner

All processes are fully automated, meaning a new owner can step in and start generating revenue with minimal operational effort.

Financials & Profitability

Art of Techno is a highly profitable eCommerce business, with a proven ability to generate six-figure revenues in Q4 alone.

Annual Profit Potential: €100,000+ (with full-time management)
Gross Margin: ~60% (before ad spend)
Fixed Costs: Minimal (Shopify, Hyros, Klaviyo)
No Employees Needed

The business is primed for rapid scale with additional marketing`,
  },
  {
    id: `12612950`,
    title: `Service Business | Health and Beauty`,
    revealedName: `Service Business | Health and Beauty`,
    url: `https://flippa.com/12612950`,
    type: `service`,
    dataLevel: `stats`,
    askingPrice: 74500.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 2383.0,
    profitMargin: `30%`,
    annualRevenue: `GBP £75,044`,
    annualProfit: `GBP £22,513`,
    ageYears: 12.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `NV, United States`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 55,
      operatorIndependence: 60.0,
      roi: 65,
      growthPotential: 55,
      overall: 57.5,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US telehealth SaaS platform with HIPAA compliance, EHR, e-prescribing for US physician networks. Heavily US-regulated he`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      totalPageViews: `2,807`,
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 152,
    watchers: 1,
    about: `he text outlines an opportunity for acquiring a turnkey telehealth platform designed for physician networks and concierge medicine models, offering a comprehensive suite including patient onboarding, electronic health records (EHR), video visits, messaging, e-prescribing integration, and subscription billing. The platform supports both recurring patient memberships and one-time telehealth consultations, tailored for Direct Primary Care (DPC), telehealth startups, and physician groups. Featuring integrations for SMS notifications, email messaging, and e-prescribing, it is structured with a HIPAA-compliant architecture to handle protected health information workflows. Developed by a practicing physician with authentic clinical workflow design, the platform offers a branded experience, and a new owner could choose to relaunch it as a telehealth Software as a Service (SaaS) product, a physician marketplace, or a consumer-facing telehealth service. Acquiring this platform, which would otherwise cost between $250k and $750k to develop, provides a quicker market entry. The operational demands are modest, requiring tasks like physician onboarding, technical support, and maintaining integrations, usually needing a commitment of 5–10 hours per week. Primarily serving U.S. physicians and patients, the platform's financial model includes revenue from patient subscriptions, consultation fees, and service fees. Due to a shift in focus from the founder towards a traditional medical practice, the platform is offered for acquisition. This provides a potential buyer with a ready-made system that can be expanded and relaunched with the founder's transitional support, exploiting the growing telehealth and healthcare SaaS market.`,
  },
  {
    id: `12028052`,
    title: `Herr Beauty`,
    revealedName: `Herr Beauty`,
    url: `https://flippa.com/12028052`,
    domain: `http://herrbeauty.ca/`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 79999.0,
    avgMonthlyRevenue: 9666.0,
    avgMonthlyProfit: 2153.0,
    profitMargin: `22%`,
    annualRevenue: `GBP £91,336`,
    annualProfit: `GBP £20,341`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Canada`,
    platform: `Organization`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Canadian D2C DIY beauty brand with physical products ($1.25M lifetime sales); requires managing physical inventory and f`,
    ],
    greenFlags: [],
    seller: {
      name: `Connie Masters`,
      location: `Canada`,
      verified: true,
    },
    socialMedia: [
      `218 followers`,
      `12,600 followers`,
      `290 followers`,
    ],
    expenses: [
      {
        item: `Purchases`,
        amount: `GBP £1,743 /month`,
      },
      {
        item: `Shipping & Freight`,
        amount: `GBP £1,525 /month`,
      },
      {
        item: `Marketing & Advertising`,
        amount: `GBP £523 /month`,
      },
      {
        item: `Wages`,
        amount: `GBP £1,638 /month`,
      },
      {
        item: `Bank Charges`,
        amount: `GBP £398 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £13,398 Included in sale price`,
      `Organization Schema`,
      `Included. I can provide support for up to 90 days.`,
      `218 followers`,
      `12,600 followers`,
      `290 followers`,
      `63 subscribers`,
      `9,111 subscribers`,
      `Attachments`,
      `Herr_Beauty_Co_Ltd__-_Profit_and_`,
    ],
    postSaleSupport: `Why This Business`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1319,
    watchers: 18,
    about: `• $1.25M lifetime sales
• 2025 revenue: ~$169K
• 2025 net profit: ~$37.7K see uploaded P&L

• Lean owner involvement
• Clear margin and growth levers
• Cleaner, more investor-grade language

Business Overview

Herr Beauty is an award-winning, four-year-old direct-to-consumer (D2C) brand in the DIY beauty space, specializing in at-home lash and nail systems. Built on Shopify and designed for efficiency, the business operates with strong customer loyalty, a recognizable brand identity, and a lean owner workload of approximately 5 hours per week.

Since launch, Herr Beauty has generated $1.25M in lifetime sales, with $169K in revenue and ~$37.7K in net profit in 2025. The brand is established, systemized, and ready for a new owner to scale or operate as a semi-passive acquisition.

Herr Beauty’s DIY Lash Kit won the She-Com Award, validating both product quality and market appeal.

Financial Snapshot (2025)

• Revenue: $169,184
• Gross Profit: $123,431
• Net Profit: $37,679
• Inventory on hand: ~$25K USD
• Lifetime sales: $1.25M

Full P&L available and uploaded for verification.

Operations & Time Commitment

This business is intentionally lean and owner-friendly.

Average weekly time requirement: 5-8 hours

• Order packing: twice per week
• Customer DMs & socials: ~30 minutes per day
• Marketing & content oversight: ~2 hours per week
• Inventory syncing & admin: ~2 hours per month

Current fulfillment: Newfoundland, Canada
Relocating fulfillment to mainland Canada or a 3PL would materially improve shipping costs and margins.

Marketing & Customer Base

Herr Beauty has built an exceptionally loyal customer base without reliance on aggressive paid advertising.

• 10,000+ email subscribers
• High repeat purchase rate, consistently exceeding 65% with peak months above 80%
• Strong organic traffic driven by social, community engagement, and affiliates
• Active influencer and affiliate partnerships, including prior Love Island collaborations

Platforms & Technology

• Shopify storefront with automated order flow
• Klaviyo email marketing fully set up with flows
• Affiliate program active and transferable
• Social platforms included:
– Instagram (12K+)
– TikTok
– Facebook
– YouTube

• SEO footprint with 180+ indexed keywords, including branded and high-intent terms

Growth Opportunities

Clear, realistic upside opportunities include:

• Scaling paid ads (Meta, TikTok, Google)
• Moving fulfillment to mainland Canada or U.S. 3PL to improve margins
• Expanding U.S. and international shipping
• Wholesale or salon kits
• Product extensions into accessories, prep products, or bundles
• Scaling influencer programs with proven templates

The foundation is built. Growth has intentionally been conservative.

Assets Included in Sale

• Shopify store and website
• Domain
• Email list (8K+)
• All social media accounts
• Branded packaging, product designs, and supplier relationships
• Inventory (~$18K USD at landed cost) - changing as the business is still operating.
•`,
  },
  {
    id: `12268596`,
    title: `Norlii`,
    revealedName: `Norlii`,
    url: `https://flippa.com/12268596`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 179000.0,
    avgMonthlyRevenue: 12667.0,
    avgMonthlyProfit: 5387.0,
    profitMargin: `43%`,
    annualRevenue: `GBP £119,695`,
    annualProfit: `GBP £50,904`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, WooCommerce, Stripe`,
    country: `NC, United States`,
    platform: `fees`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `US-based Scandinavian lifestyle subscription box (quarterly boxes shipped from US); physical subscription box requires U`,
    ],
    greenFlags: [],
    seller: {
      name: `Linda Hasselbalch`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `1,500 followers`,
      `4,300 followers`,
      `0 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £1,501 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £1,501 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £62 /month`,
      },
      {
        item: `Buying stock`,
        amount: `GBP £1,501 /month`,
      },
      {
        item: `Accounting`,
        amount: `GBP £150 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Rating Schema`,
      `Included.`,
      `1,500 followers`,
      `4,300 followers`,
      `0 followers`,
      `0 subscribers`,
      `Attachments`,
      `P&L (Resultatopgørelse) 2025`,
      `Norlii DK accounting 2025`,
      `Norlii Inc Profit and Loss 2025`,
      `Norlii, revenue 12 months`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for`,
    ],
    postSaleSupport: `is included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `47,179`,
      totalPageViews: `7,716`,
      pagesPerSession: `1.49`,
      avgDuration: `00:00:20`,
      engagementRate: `0.36%`,
      topCountries: [
        {
          country: `United States`,
          views: 2920,
        },
        {
          country: `China`,
          views: 989,
        },
        {
          country: `United Kingdom`,
          views: 295,
        },
        {
          country: `Canada`,
          views: 269,
        },
        {
          country: `Singapore`,
          views: 227,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 358,
    watchers: 6,
    about: `Norlii: Business Overview

Founded in 2016, Norlii is an established and design-led ecommerce brand offering curated Scandinavian home and lifestyle products through a premium quarterly subscription box model. The brand was created to bring the values of slow living, clean design, and Nordic comfort into the homes of an international audience, with a strong emphasis on storytelling and visual identity. With seven years of consistent operation, Norlii has cultivated a loyal subscriber base and earned recognition as a distinctive voice in the home décor and lifestyle space.

Currently operated from Denmark, Norlii is strategically primed for growth under U.S.-based ownership. With most Scandinavian design products already distributed in the U.S., the brand can be efficiently sourced and fulfilled locally, removing operational barriers related to international shipping and tariffs. The result is a high-potential, low-complexity business with ample room for scale across the U.S., Canada, and other English-speaking markets.

Financial Performance (Trailing Twelve Months)

Annual Revenue: USD $174,000
Annual Profit: USD $74,000
Average Monthly Revenue: USD $14,500
Average Monthly Profit: USD $6,166
Profit Margin: 43%
Average Order Value (AOV): USD $154
Orders in 2025: 1,087
Customers: 406
Refund Rate: 20%

Revenue is primarily derived from recurring subscriptions supplemented by webshop sales. Financial performance has remained consistent, with predictable quarterly peaks aligned with new subscription box launches and minimal reliance on seasonality. The brand operates with lean expenses, including shipping, warehousing, and stock acquisition, and has significant marketing ROI upside due to underutilized paid channels.

Products & Market Positioning

Norlii’s flagship product is its premium quarterly subscription box featuring 4–5 curated Scandinavian design items, accompanied by printed stories that deepen the customer’s connection with Nordic living. The product line is rooted in values of minimalism, coziness (hygge), and intentional living, with each box designed to evoke emotional resonance as well as aesthetic appeal.

The brand’s niche positioning within the Scandinavian home décor segment differentiates it from general lifestyle boxes. It caters to an audience seeking both physical and emotional value—customers who appreciate the tactile experience of beautifully designed objects and the deeper cultural narrative that comes with them.

Marketing & Traffic

Norlii’s traffic mix is primarily driven by direct and organic sources, including long-standing SEO value, email marketing, YouTube mentions, and social referrals. The site attracts over 46,000 users and 96,000 pageviews annually, with strong interest from the U.S., Canada, and emerging international audiences.

Digital assets include 4,300 Instagram followers and 1,500 Facebook followers, along with a highly engaged email list (not quantified here but included in the sale). Organic search tr`,
  },
  {
    id: `11797420`,
    title: `Ecommerce Store | Design and Style`,
    revealedName: `Ecommerce Store | Design and Style`,
    url: `https://flippa.com/11797420`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 149000.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 4086.0,
    profitMargin: `41%`,
    annualRevenue: `of $185,000 and a healthy profit margin of 51%. The company has demonstrated consistent growth and profitability since its inception. Its strong online presence, demonstrated by a Domain Authority of 9, provides a solid foundation for future digital marketing efforts. The business is dedicated to delivering exceptional customer service and providing a seamless online shopping experience, contributing to a loyal customer base and positive reviews. Known for its unique product offerings and strategic marketing initiatives, it has established itself as a reputable player in the Lifestyle industry. This turnkey eCommerce business presents an excellent opportunity for a new owner to further build on its established brand presence and revenue-generating potential. With a proven track record of success and a scalable business model, it is well-positioned for continued growth and expansion in the expanding eCommerce landscape.`,
    ageYears: 7.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `FL, United States`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business () — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 22,
    watchers: 4,
    about: `well-established eCommerce business in the Lifestyle industry has been successfully operating since 2019, specializing in high-quality, coastal-inspired products. This enterprise has carved out a niche market, reflected in its annual revenue of $185,000 and a healthy profit margin of 51%. The company has demonstrated consistent growth and profitability since its inception. Its strong online presence, demonstrated by a Domain Authority of 9, provides a solid foundation for future digital marketing efforts. The business is dedicated to delivering exceptional customer service and providing a seamless online shopping experience, contributing to a loyal customer base and positive reviews. Known for its unique product offerings and strategic marketing initiatives, it has established itself as a reputable player in the Lifestyle industry. This turnkey eCommerce business presents an excellent opportunity for a new owner to further build on its established brand presence and revenue-generating potential. With a proven track record of success and a scalable business model, it is well-positioned for continued growth and expansion in the expanding eCommerce landscape.`,
  },
  {
    id: `11846700`,
    title: `Liberty Charms`,
    revealedName: `Liberty Charms`,
    url: `https://flippa.com/11846700`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 130000.0,
    avgMonthlyRevenue: 31768.0,
    avgMonthlyProfit: 3971.0,
    profitMargin: `12%`,
    annualRevenue: `GBP £300,176`,
    annualProfit: `GBP £37,521`,
    expensesLastMonth: `GBP £21,887 /month`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Liberty Charms) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `2 transactions totalling USD $115,628`,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £21,887 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `No comments`,
      `Managed by Flippa`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $130,000`,
      `GBP £97,557`,
      `Contact Seller Submit LOI Make Offer`,
      `Watching`,
      `Share & Earn up to $2.6K*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
      `Our vetting team h`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `154,799`,
      totalPageViews: `58,350`,
      pagesPerSession: `3.24`,
      avgDuration: `00:01:07`,
      engagementRate: `0.57%`,
      topCountries: [
        {
          country: `United Kingdom`,
          views: 38097,
        },
        {
          country: `Hong Kong`,
          views: 2434,
        },
        {
          country: `China`,
          views: 216,
        },
        {
          country: `United States`,
          views: 188,
        },
        {
          country: `Singapore`,
          views: 31,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 2346,
    watchers: 145,
    about: `Key Highlights

2024 Revenue was £300K / $370K
Consistent profits and high profit margin
25,000 subscribed customers and 110,000 customers in the database
Over 10,000 5* reviews
Product designs owned by the company
Reliable supply source

Financials

Sales have been consistent and over the past 4 years the average revenue was £400K / $500K
The profit margin remains around 80%
TTM profit is £30,000 (2024)
There are no outstanding debts, financial obligations, or significant financial risks and all stock they hold at present has been paid for.

Expenses

There are 3 major costs in running this business –

Product: A profit margin of 85% is worked towards
Advertising: Predominantly Google PPC, Facebook Ads and Microsoft Ads
Salaries: 3 Employees

Founder's Overview

In 2017, an Amazon business was purchased by the current owner which was turning over around £100,000 annually, selling Children's bracelets. He identified that the growth potential of the business was limited due to the narrow product range and by only making use of one sales channel. Therefore, the current owner created a new brand and launched a Shopify store to expand the business. The owner has grown the revenue by an impressive 350% to £350,000 GBP over the past 7 years.

There is still huge growth potential for the new owner to tap into and take the business to the next level.

Operations

Team

The business is run by a team of 3, plus minimal input from the owner. The new owner is not required to have input if they prefer to be completely detached from the business. At present the owner holds 1 meeting per month with the marketing agency to review performance and that is their only input.  
The 3 employees are based in South Yorkshire (Northern England) and are all happy to stay on in the business.
Each employee has a contract:

2 are for 24 hours total per week

1 is for 12 hours total per week 

Seasonal overtime e.g. Christmas 

Tasks are shared between the team and all can be easily taught to the new owner.
The team work from a rented office which is part of a building with a few businesses in. All stock is stored there too. 
Tasks involved in the day-to-day running of the business include:

Printing off the orders

Putting together the jewellery so the products are ready for dispatch

Ordering new stock

Updating the website

Monitor the marketing, reviewing performance of the agency

Customer support - a central email address is used. 

Monitor social channels

Making the bracelets is very straightforward and can be taught to anyone. No specialist skills are required as such and it is done by the 3 employees.
Earrings are put into branded packaging - this has been sourced and is reasonably priced.

Shipping

Royal Mail and DPD are used to ship the products
Packages are collected daily
DPD is predominantly for international shipping
These accounts are part of the sale 
Send to FBA e.g. 50 bracelets for stock

Stock and Manufacturers / Suppliers

The suppliers are very reliab`,
  },
  {
    id: `12224549`,
    title: `CALIGIO.COM`,
    revealedName: `CALIGIO.COM`,
    url: `https://flippa.com/12224549`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 175000.0,
    avgMonthlyRevenue: 18730.0,
    avgMonthlyProfit: 4608.0,
    profitMargin: `25%`,
    annualRevenue: `GBP £176,981`,
    annualProfit: `GBP £43,532`,
    expensesLastMonth: `GBP £8,755 /month`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `CA, United States`,
    platform: `Shopify`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `DTC mens accessories brand (300+ SKUs, California). Physical inventory and US-based shipping required.`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `23 transactions totalling USD $8,469,233`,
    },
    socialMedia: [
      `5,000 followers`,
      `5,000 followers`,
      `460 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £8,755 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £30,018 Excluded from sale price`,
      `Shopify`,
      `Included.`,
      `5,000 followers`,
      `5,000 followers`,
      `460 followers`,
      `24,000 subscribers`,
      `Attachments`,
      `Screenshot 2026-02-27 at 7.06.59 PM`,
      `Screenshot 2026-02-27 at 7.06.47`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `106,680`,
      totalPageViews: `20,105`,
      pagesPerSession: `1.58`,
      avgDuration: `00:00:00`,
      engagementRate: `0.20%`,
      topCountries: [
        {
          country: `United States`,
          views: 15797,
        },
        {
          country: `(not set)`,
          views: 135,
        },
        {
          country: `Germany`,
          views: 128,
        },
        {
          country: `China`,
          views: 103,
        },
        {
          country: `Canada`,
          views: 63,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 116,
    watchers: 14,
    about: `Overview

Caligio is a profitable direct to consumer men’s accessories brand founded in 2019 with a structured catalog of 300+ SKUs across 24 collections. Operating in the $39 to $77 price range, the brand has maintained profitability every year since launch while building a recognized presence in the men’s lifestyle accessories segment.

Unlike short term trend stores, Caligio has been developed as a long term brand with strong infrastructure, a registered trademark, and a premium .com domain. Nearly $1M has been invested in Meta advertising over the life of the business, providing extensive data on winning products, creatives, and customer behavior.

Financial Performance

The business generated approximately $233,000 in revenue in 2024 with $58,000 in net profit, supported by strong product margins and repeat customers.

Key metrics include:

Average Order Value: ~$60

Returning Customer Rate: ~33%

Total Orders: 34,000+

Customers Served: 30,000+

Inventory valued at approximately $30K–$40K at cost is available separately.

Brand & Product Position

Caligio has developed a meaningful customer base and strong brand infrastructure over its seven year history.

Highlights include:

~ $964K invested in Meta advertising

24,000+ email subscribers

6,000+ SMS subscribers

300+ accessory designs across 24 collections

Registered trademark and premium .com domain

Many customers are repeat buyers, with some placing more than 15 orders, demonstrating strong product market fit.

In addition to the core men’s catalog, the store includes approximately 150 women’s accessory SKUs that have received minimal marketing focus, representing additional upside.

Operations

The business is designed to operate efficiently with minimal overhead. Products are small, lightweight accessories that require limited storage and low shipping costs.

The company has been operated entirely by the founder without employees, with daily operations typically requiring 3 to 4 hours per day.

Products also benefit from strong gross margins, with most items marked up approximately 5x to 12x product cost, providing flexibility to absorb returns, run promotions, and scale paid traffic.

Marketing & Growth Opportunities

While nearly $1M has been invested in Meta advertising historically, the brand has never undergone professional scaling or advanced channel diversification.

Significant growth opportunities include:

Professional Meta ad optimization and creative testing

Full Google Ads deployment (Search, Shopping, Performance Max)

TikTok Ads and TikTok Shop

Marketplace expansion (Amazon, Walmart, Etsy, eBay)

SEO and AI search optimization

Email and SMS marketing expansion

International expansion

Currently, all sales occur through the website, leaving several acquisition channels untapped.

Investment Perspective

Caligio represents a profitable ecommerce brand with established infrastructure, strong margins, and meaningful untapped growth potential. The business is not perso`,
  },
  {
    id: `12655357`,
    title: `Ecommerce Store | Home and Garden`,
    revealedName: `Ecommerce Store | Home and Garden`,
    url: `https://flippa.com/12655357`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 145000.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 3882.0,
    profitMargin: `60%`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `IL, United States`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business () — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 81,
    watchers: 3,
    about: `he featured brand is a distinguished artisanal home goods business, recognized for its culturally inspired and unique product offerings that set it apart from typical dropshipping operations. It has a diverse range of products, including dinnerware, glassware, textiles, and specialty teas and spices, which lend themselves to significant cross-selling opportunities. The brand maintains a robust marketing asset with over 8,300 email subscribers. Over the past year, it has generated $86,457 in revenue, with seasonal peaks during November and December accounting for roughly 35% of annual earnings. Operations include an established online presence, supported by a Shop app and wholesale channels, and leverage automation and email marketing tools. This setup requires an estimated 15–25 hours weekly for management tasks such as product sourcing and customer service. The customer base is primarily domestic, acquired through search engines, social media, and apps, with a strong inclination towards purchasing during special occasions. The business shows potential for growth in email automation, loyalty programs, and targeted advertising. Financially, the business reflects seasonal revenue patterns, with notable earnings in the holiday period. Shipping charges contribute significantly to the revenue stream, and existing inventory is valued at over $78,000. Strategically, the business is poised for expansion through enhanced email marketing, loyalty programs, and international market penetration, using its established Shopify infrastructure. It offers promising opportunities for a new owner with expertise in marketing to enhance growth prospects without overhaul. Operational assets, supplier ties, and SOPs are available for transfer to new ownership.`,
  },
  {
    id: `12539485`,
    title: `Ecommerce Store | Design and Style`,
    revealedName: `Ecommerce Store | Design and Style`,
    url: `https://flippa.com/12539485`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 130000.0,
    avgMonthlyRevenue: 19652.0,
    avgMonthlyProfit: 4022.0,
    profitMargin: `20%`,
    annualRevenue: `GBP £185,693`,
    annualProfit: `GBP £37,999`,
    ageYears: 6.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `TX, United States`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `DTC clothing brand for tall women (Texas, since 2019), physical apparel with inventory. Physical goods; would require US`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Paypal`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 103,
    watchers: 1,
    about: `niche direct-to-consumer ecommerce brand, established in 2019, specializes in offering clothing designed for tall women, addressing a gap in the fashion industry for appropriately fitting apparel. The business focuses on extended inseam options, including jeans, trousers, and skirts, tailored specifically for taller body types, with inseams reaching up to 36–38 inches. This specific focus has allowed the brand to serve a dedicated market of women seeking well-fitting clothing. Over the past year, the brand has generated approximately $247,445 in revenue through its online operations, bypassing the need for physical retail storefronts. It has cultivated a loyal customer base within the tall women’s fashion community by selling directly to consumers through its ecommerce platform. The business leverages digital assets, including social media presence, an active email subscriber list, trademarks, and established supplier relationships, to continue growing its online presence and operations seamlessly. The brand has gained strong recognition in the tall women’s market due to organic traffic and repeat business, driven by a dedicated audience seeking height-inclusive fashion options. With increasing demand for such specialized clothing, the company is well-positioned for growth through new product lines, enhanced marketing efforts, influencer collaborations, and broader customer acquisition strategies. This presents a valuable opportunity for potential buyers interested in an established ecommerce apparel brand with a significant growth prospect in an underserved niche market, characterized by its recognizable identity and loyal customer base.`,
  },
  {
    id: `12200383`,
    title: `Portafly`,
    revealedName: `Portafly`,
    url: `https://flippa.com/12200383`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 75000.0,
    avgMonthlyRevenue: 36106.0,
    avgMonthlyProfit: 26575.0,
    profitMargin: `74%`,
    annualRevenue: `GBP £341,168`,
    annualProfit: `GBP £251,106`,
    ageYears: 1.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `AZ, United States`,
    platform: `walkthroughs`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 40,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Beauty e-commerce brand with physical inventory/fulfilment infrastructure in the US. Physical product business — invento`,
    ],
    greenFlags: [],
    seller: {
      name: `Michael`,
      location: `United States`,
      verified: true,
      transactions: `1 transaction totalling USD $136,000`,
    },
    expenses: [
      {
        item: `Fulfillment and shipping costs`,
        amount: `GBP £8,932 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £10,806 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £532 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `3,100 followers`,
      `1,029 followers`,
      `35 followers`,
      `86,908 subscribers`,
      `Attachments`,
      `PORTAFLY-P&L-2024-2025-Folio`,
      `PORTAFLY-P&L-2024-2025-Folio`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $150,000`,
      `USD $75,000`,
      `Reduced 50%`,
    ],
    postSaleSupport: `included:`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `57,817`,
      totalPageViews: `5,299`,
      pagesPerSession: `0.70`,
      avgDuration: `00:00:43`,
      engagementRate: `0.43%`,
      topCountries: [
        {
          country: `United States`,
          views: 54,
        },
        {
          country: `Australia`,
          views: 8,
        },
        {
          country: `France`,
          views: 1,
        },
        {
          country: `India`,
          views: 0,
        },
        {
          country: `Spain`,
          views: 0,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1282,
    watchers: 90,
    about: `Portafly: Business Overview

Portafly is being offered as a strategic asset acquisition rather than a traditional earnings-multiple business sale.

This opportunity includes a fully built beauty e-commerce infrastructure with significant transferable assets, making it ideal for:

An existing beauty brand seeking to expand into a new niche

An operator looking to leverage a large, verified customer base

A digital marketer wanting to monetize an established list

Included Assets

85,474 verified opt-in email subscribers (Klaviyo & Brevo)

Fully built Shopify store

Established supplier relationship (China-based fulfillment)

Historical Meta & TikTok ad accounts with pixel data

Brand assets (logo, product photography, UGC library)

Documented SOPs and transition training

Social media accounts

Historical Performance

$541,000+ in revenue generated

Established customer base in the beauty niche

Proven paid traffic campaigns across Meta & TikTok

Why This Is Valuable

The core value of Portafly lies in its customer database and infrastructure.
The email list alone represents a highly targeted beauty audience that can be monetized through:

Cross-sell offers

Product expansion

Complementary beauty products

Subscription models

Transition Support

30 days of post-sale support included:

Platform walkthroughs

Supplier introduction

Marketing overview

Operational Q&A

Founded in April 2024, Portafly is a fast-growing, direct-to-consumer e-commerce beauty brand specializing in magnetic eyelashes that require no eyeliner — a key point of differentiation in the competitive lash space. Despite its recent launch, Portafly has demonstrated strong traction, profitability, and operational stability, making it an exceptional turnkey acquisition opportunity. Built on a lean, supplier-fulfilled model with no physical inventory requirements, the brand combines impressive margins with scalable infrastructure. The business generated over USD $454K in revenue and USD $334K in profit in its first full year of operations, with a 74% net margin and average monthly profit of $27,884, driven by effective paid social campaigns and high conversion rates.

Key Financials (Trailing Twelve Months ending December 2025)

Revenue: USD $454,623
Net Profit: USD $334,611
Monthly Revenue: USD $37,885
Monthly Profit: USD $27,884
Profit Margin: 74%
Monthly Orders: 1,394
Average Order Value: USD $32
Orders Per Customer: 2.0
Fulfillment Rate: 99.9%
Refund Rate: 0.0%

Cost Structure

Marketing: USD $14,400/month
COGS & Fulfillment: USD $11,902/month
Platform Fees: USD $709/month

Business Model & Operations

Portafly runs on a streamlined D2C model through Shopify, with all fulfillment handled by established Chinese suppliers. Products ship within 1–3 business days and deliver globally in 5–9 days. The current owner spends limited time on operations, with outsourced support for customer service. The business includes a comprehensive suite of brand assets: product packaging, marketing`,
  },
  {
    id: `12665107`,
    title: `Ecommerce Store | Design and Style`,
    revealedName: `Ecommerce Store | Design and Style`,
    url: `https://flippa.com/12665107`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 74750.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 2487.0,
    profitMargin: `87%`,
    ageYears: 5.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Italy`,
    platform: `showcases`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 65,
      growthPotential: 50,
      overall: 57.4,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Vintage/unique fashion ecommerce (Italy) on Shopify, Etsy, and Amazon. Physical goods business; Italian inventory and so`,
    ],
    greenFlags: [],
    seller: {
      name: `Become a Premium subscriber to unlock this business`,
      location: `Join Premium`,
      verified: false,
    },
    saleIncludes: [
      `Join Premium to gain First Access`,
      `and unlock this business`,
      `Join Premium`,
      `USD 49.0/month (Save 16% for Annual)`,
      `Join Premium`,
      `Included with Premium:`,
      `Premium Buyer Status`,
      `First Access`,
      `Get deals first, 21 days before the rest.`,
      `Comparisons & Benchmarking`,
      `Dive deep with advanced prici`,
    ],
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      totalPageViews: `674`,
    },
    integrations: [
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 65,
    watchers: 1,
    about: `ince its inception in 2020, a notable e-commerce company focusing on design and style has become a significant entity in the online retail landscape. Specializing in vintage and unique fashion, the company operates as an online store, providing a seamless shopping experience globally through platforms like Shopify, Etsy, and Amazon Seller.`,
  },
  {
    id: `12078553`,
    title: `etohh.com`,
    revealedName: `etohh.com`,
    url: `https://flippa.com/12078553`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 27680.0,
    monthlyPL: [
      { month: `Nov 2024`, revenue: 0.0, expenses: 195.58, profit: -195.58 },
      { month: `Dec 2024`, revenue: 299.72, expenses: 3252.47, profit: -2954.02 },
      { month: `Jan 2025`, revenue: 6346.19, expenses: 2287.27, profit: 4058.92 },
      { month: `Feb 2025`, revenue: 6109.97, expenses: 10617.2, profit: -4507.23 },
      { month: `Mar 2025`, revenue: 7500.62, expenses: 3820.16, profit: 3680.46 },
      { month: `Apr 2025`, revenue: 93.98, expenses: 4913.63, profit: -4819.65 },
      { month: `May 2025`, revenue: 995.68, expenses: 4052.57, profit: -3056.89 },
      { month: `Jun 2025`, revenue: 14254.48, expenses: 1600.2, profit: 12654.28 },
      { month: `Jul 2025`, revenue: 24094.44, expenses: 1758.95, profit: 22335.49 },
      { month: `Aug 2025`, revenue: 4122.42, expenses: 1916.43, profit: 2205.99 },
      { month: `Sep 2025`, revenue: 3239.77, expenses: 5394.96, profit: -2156.46 },
      { month: `Oct 2025`, revenue: 53.34, expenses: 952.5, profit: -899.16 },
    ],
    avgMonthlyRevenue: 6101.0,
    avgMonthlyProfit: 2196.0,
    profitMargin: `39%`,
    annualRevenue: `GBP £52,843`,
    annualProfit: `GBP £20,748`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify`,
    platform: `in`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 37.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 56.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Very early-stage (2024) design/style e-commerce with only $20k annual revenue. Likely dropship but unverified, too new a`,
      `Revenue declining sharply (-41.9% trend)`,
      `High revenue volatility (CV 114%)`,
      `7 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Erin Macias`,
      location: `United States`,
      verified: false,
    },
    socialMedia: [
      `1,041 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £150 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £375 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £75 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Inventory (stock)`,
      `Brand assets (logos, etc)`,
      `Trademarks/patents`,
      `Unique content`,
      `Unique design`,
      `Inventory value`,
      `GBP £22,513 Included in sale price`,
      `Shopify`,
      `Included.`,
      `1,041 followers`,
      `Attachments`,
      `IMG_7181`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $27,680`,
      `GBP £20,772`,
      `Includes USD $30,000 of inventory`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Amazon`,
    ],
    tech: [
      `Shopify`,
    ],
    views: 503,
    watchers: 10,
    about: `ETOHH is a promising eCommerce platform in the Design and Style industry, offering a curated selection of unique products to its discerning customers. Established in 2024, the platform has quickly gained traction with a revenue of $20,000 annually and a remarkable profit margin of 100%, showcasing its potential for growth and profitability. With a domain authority of 6, ETOHH has carved a niche for itself in the competitive market, catering to consumers seeking distinctive, stylish products.

The business model of ETOHH revolves around the seamless online shopping experience it offers to customers looking for aesthetically pleasing and high-quality products in the design and style sector. By maintaining a profit margin of 100%, the platform demonstrates its ability to capitalize on its unique product selection and efficient operational strategies. With its eye-catching website and user-friendly interface, ETOHH's focus on customer satisfaction and product quality has positioned it as a trusted destination for design enthusiasts.

As a well-established player in the industry, ETOHH presents a turnkey opportunity for potential buyers looking to enter the lucrative design and style market. With a solid foundation in place, including a strong revenue stream and a growing customer base, the platform is primed for further expansion and success in the hands of a new owner. ETOHH's promising metrics and curated product offerings make it an attractive investment for entrepreneurs seeking a profitable eCommerce venture with significant growth potential.`,
  },
  {
    id: `12271295`,
    title: `Agent Incubator`,
    revealedName: `Agent Incubator`,
    url: `https://flippa.com/12271295`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 25000.0,
    monthlyPL: [
      { month: `Jan 2025`, revenue: 10144.76, expenses: 0.0, profit: 10144.76 },
      { month: `Feb 2025`, revenue: 64455.04, expenses: 0.0, profit: 64455.04 },
      { month: `Mar 2025`, revenue: 26375.36, expenses: 0.0, profit: 26375.36 },
      { month: `Apr 2025`, revenue: 13437.87, expenses: 0.0, profit: 13437.87 },
      { month: `May 2025`, revenue: 21089.62, expenses: 0.0, profit: 21089.62 },
      { month: `Jun 2025`, revenue: 16711.93, expenses: 0.0, profit: 16711.93 },
      { month: `Jul 2025`, revenue: 2856.23, expenses: 0.0, profit: 2856.23 },
      { month: `Aug 2025`, revenue: 5718.81, expenses: 0.0, profit: 5718.81 },
      { month: `Sep 2025`, revenue: 0.0, expenses: 0.0, profit: 0.0 },
      { month: `Oct 2025`, revenue: 0.0, expenses: 4014.47, profit: -4014.47 },
      { month: `Nov 2025`, revenue: 3241.04, expenses: 5507.99, profit: -2266.95 },
      { month: `Dec 2025`, revenue: 3238.5, expenses: 6258.56, profit: -3020.06 },
    ],
    avgMonthlyRevenue: 16727.0,
    avgMonthlyProfit: 12624.0,
    profitMargin: `91%`,
    annualRevenue: `GBP £131,707`,
    annualProfit: `GBP £119,281`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Arab Emirates`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 37.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 95,
      growthPotential: 50,
      overall: 56.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Agent Incubator) — identified from listing description`,
      `Revenue declining sharply (-87.9% trend)`,
      `High revenue volatility (CV 106%)`,
      `3 loss-making months in P&L`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `51 transactions totalling USD $13,062,617`,
    },
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `Attachments`,
      `XLSX`,
      `Agent Incubator - Monthly Profit and Loss`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Digital Agency Business`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $25,000`,
      `GBP £18,761`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $500*`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 965,
    watchers: 44,
    about: `Key Highlights

Turnkey Real Estate Marketing Agency – Fully operational with clients and proven systems.

Google Ads + Funnels = Game Changer – Switched from Facebook ads to Google Ads, resulting in higher-quality leads that often book themselves directly with agents.

Automated Onboarding & Fulfillment – Clients are onboarded through automations and fulfillment is streamlined with SOPs and a media buyer in place.

Retention Requires Accountability – Agents close deals when they follow up, and holding them accountable is the key to renewals.

Scalable & Remote-Friendly – Run it from anywhere with minimal overhead.

Owner Stepping Away – Selling because my heart isn’t in it anymore, but the system works and is ready to scale with the right energy.

Operations

This business provides done-for-you marketing services for real estate agents. The focus is on Google Ads campaigns and conversion funnels, which consistently generate high-quality leads.

We handle everything:

Lead sourcing & outreach systems (SMS, DM, email)

Google Ads campaign setup & management (media buyer + SOPs included)

Funnels that convert leads into booked calls for agents

Fully automated client onboarding

Owner involvement:

Minimal day-to-day work thanks to automations.

Main responsibility is keeping clients accountable and making sure they follow up with their leads — this is where retention comes from.

Customers

Our clients are real estate agents, teams, and brokers who want a predictable pipeline.

Better lead quality – Since shifting to Google Ads, agents often get leads booking calls with them directly.

Retention tied to accountability – When agents follow up properly, they close deals and happily renew.

Churn exists – Some agents don’t put in the effort, but those who do tend to stay long-term.

Referral-friendly – Agents refer colleagues once they see results.

Financials

The business generates revenue through our 6-month packages priced between 5k-10k and performance-based referral fees (5–10% at closing).

Google Ads campaigns = higher ROI compared to Facebook-only strategies.

Predictable growth potential: scaling outreach + ad spend = more clients and more closings.

Average churn exists, but strong retention with accountability and Google Ads quality.

Additional Notes

Comes with media buyer + Google Ads SOPs so campaigns can continue running seamlessly.

Comes with trained customer success manager & SDR/cold caller too.

Includes sales scripts, outreach templates, ad campaigns, and onboarding automations.

Transition support provided for smooth handover.

Selling because my focus is elsewhere — this is a great opportunity for someone who wants to run and scale a proven system`,
  },
  {
    id: `11997664`,
    title: `numerostelefono.com`,
    revealedName: `numerostelefono.com`,
    url: `https://flippa.com/11997664`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 105265.0,
    monthlyPL: [
      { month: `Jun 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Jul 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Aug 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Sep 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Oct 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Nov 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Dec 2024`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Jan 2025`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Feb 2025`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Mar 2025`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Apr 2025`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `May 2025`, revenue: 2348.23, expenses: 8.89, profit: 2338.07 },
      { month: `Jun 2025`, revenue: 95.25, expenses: 0.0, profit: 95.25 },
      { month: `Jul 2025`, revenue: 118.11, expenses: 0.0, profit: 118.11 },
      { month: `Aug 2025`, revenue: 115.57, expenses: 0.0, profit: 115.57 },
      { month: `Sep 2025`, revenue: 105.41, expenses: 0.0, profit: 105.41 },
      { month: `Oct 2025`, revenue: 138.43, expenses: 0.0, profit: 138.43 },
      { month: `Nov 2025`, revenue: 149.86, expenses: 0.0, profit: 149.86 },
      { month: `Dec 2025`, revenue: 77.47, expenses: 0.0, profit: 77.47 },
      { month: `Jan 2026`, revenue: 62.23, expenses: 0.0, profit: 62.23 },
      { month: `Feb 2026`, revenue: 46.99, expenses: 0.0, profit: 46.99 },
    ],
    avgMonthlyRevenue: 1385.0,
    avgMonthlyProfit: 1379.0,
    annualRevenue: `GBP £22,893`,
    annualProfit: `GBP £22,807`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, PHP, MySQL, Stripe`,
    country: `Spain`,
    platform: `functions`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 62.5,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 40,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Revenue collapsed -97% — numerostelefono.com`,
      `Revenue declining sharply (-97.3% trend)`,
      `High revenue volatility (CV 80%)`,
    ],
    greenFlags: [],
    seller: {
      name: `Jaime Martínez`,
      location: `Spain`,
      verified: false,
    },
    expenses: [
      {
        item: `Hosting`,
        amount: `GBP £68 /month`,
      },
      {
        item: `Domain`,
        amount: `GBP £8 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Brand assets (logos, etc)`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `0 subscribers`,
      `Attachments`,
      `generado-1-año`,
      `Numerostelefono.com - desde 2022`,
      `Numerostelefono.com - últimos 12 meses`,
      `Numerostelefono.com - últimos 12 meses adquisicion`,
      `Numerostelefono.com - últimos 12 meses consultas`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `1,639,087`,
      totalPageViews: `143,290`,
      pagesPerSession: `0.95`,
      avgDuration: `00:00:07`,
      engagementRate: `0.27%`,
      topCountries: [
        {
          country: `United States`,
          views: 78417,
        },
        {
          country: `Spain`,
          views: 27077,
        },
        {
          country: `Brazil`,
          views: 13254,
        },
        {
          country: `Germany`,
          views: 11912,
        },
        {
          country: `Hong Kong`,
          views: 9786,
        },
      ],
    },
    integrations: [
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `PHP`,
      `MySQL`,
      `Stripe`,
    ],
    views: 1346,
    watchers: 8,
    about: `Business Overview

Numerostelefono.com is a 9-year-old, high-traffic digital property in the telecommunications and online safety niche, built to serve a growing need for spam call identification and user-generated phone number reporting. Operating on a multi-country WordPress architecture supported by custom PHP logic, this platform functions as an SEO-optimized spam phone directory, serving millions of users across Spanish-speaking markets. The site generated over 3.1M users and 4.2M pageviews in the last 12 months, monetized entirely through automated ad placements via Google AdSense and Ezoic. With zero paid marketing, ultra-low overhead, and strong passive profitability, Numerostelefono.com offers a compelling acquisition opportunity for buyers seeking a revenue-ready, easily scalable online asset.

Performance & Trends

The site maintained consistent high-volume traffic through early 2025, averaging 290k+ page views per month, with over 88% of sessions generated by organic search. Engagement metrics show fast turnaround visits (avg. session 13 seconds), driven by intent-focused queries such as reverse number lookups. Monthly profit was stable at $2,467 until a decline began in April 2025 due to paused maintenance and optimization. Despite this, the platform retains strong infrastructure, traffic indexation, and ad revenue base — creating significant rebound potential with minimal effort.

Operations

The business is almost fully passive. Content is generated dynamically via structured number data, while users submit spam reports through the platform. These are currently manually reviewed before publication — a process that can be easily automated. All monetization is handled by Ezoic and Google AdSense with AI-based ad optimization. The only ongoing tasks include hosting management and periodic validation of submissions. No development or technical expertise is required.

Audience & Reach

Users primarily originate from Spain, Mexico, Argentina, Colombia, and Brazil. The core use case is checking and reporting unknown or suspicious phone numbers — particularly those associated with telemarketing or fraud. Over 723 keywords rank organically, with 93% of all traffic driven by search engines. Sessions show a high degree of intent, offering future opportunities for monetization through APIs, premium data access, or lead generation for telecom/blocking services.

Technology Stack

Numerostelefono.com runs on multiple localized WordPress installations, linked through custom PHP logic and a streamlined MySQL backend. The system is designed for low-cost, high-speed page generation with automatic number listing management by region and operator. All traffic and performance data is tracked through`,
  },
  {
    id: `11267855`,
    title: `www.stealth-london.com`,
    revealedName: `www.stealth-london.com`,
    url: `https://flippa.com/11267855`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 87480.0,
    avgMonthlyRevenue: 0.0,
    avgMonthlyProfit: 2184.0,
    profitMargin: `50%`,
    annualRevenue: `GBP £41,274`,
    annualProfit: `GBP £20,641`,
    expensesLastMonth: `GBP £2,226 /month`,
    ageYears: 10.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `is`,
    hasStripe: false,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (www.stealth-london.com) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `M Ismail Khan`,
      location: `United Kingdom`,
      verified: false,
    },
    socialMedia: [
      `0 followers`,
      `36,200 followers`,
      `5,049 followers`,
    ],
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £2,226 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `0 followers`,
      `36,200 followers`,
      `5,049 followers`,
      `0 subscribers`,
      `7,043 subscribers`,
      `Attachments`,
      `XLSX`,
      `Prof`,
    ],
    postSaleSupport: `from the seller, including factory intros, design guidance, and operational insights`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 1021,
    watchers: 12,
    about: `Stealth London – Premium Streetwear Brand for Sale

Business Overview

Stealth London is a London‑born streetwear brand, founded in 2015 and deeply rooted in bold design, technical detailing, and a strong community ethos. Over the past six years, this DTC-focused e‑commerce business has achieved a consistent monthly revenue of approximately USD 8,000, equating to USD 55,000 annual sales, with a 50% profit margin (~USD 27,505 yearly profit) . Operating via Shopify, it enjoys streamlined order fulfilment (~447 orders, £58K sales, 98.7% fulfilment, zero refunds) backed by reliable supplier relations and tight logistics.

Brand Identity & Operations

Stealth is characterized by heavyweight hoodies, tech-infused outerwear, standout graphics, tracksuits and accessories like goggles, facemasks, gloves, belts, and caps. The brand’s aesthetic—“stealth, individuality, and freedom”—resonates in London’s urban landscape. Multiple sell‑out collections supported by high‑quality content and polished branding validate strong product‑market fit.

Market & Growth Opportunity

Community & Reach: 36K+ followers on Instagram, 5K+ on TikTok, and 7K+ on the e‑mail list, establishing a solid organic base
Customer Loyalty: 153 Trustpilot reviews at a 4.2/5 TrustScore, with 85% at 5 stars reflecting quality and customer satisfaction
Scale Potential: Opportunity to scale product range (e.g., cargos, outerwear, accessories), expand into wholesale/B2B, international markets, brand collaborations, paid marketing and SEO given existing brand equity.

Assets Included in the Sale

Domains, website files, Shopify store & analytics data
Social media accounts (Instagram, TikTok), e‑mail list (7,043 subscribers)
Brand assets: logos, designs, content, trademarks, supplier contracts, custom tech
Four months post-sale support from the seller, including factory intros, design guidance, and operational insights

Why Acquire Stealth London?

Established Brand with Identity: Six years of curation, consistent sales, cohesive aesthetic and mission
Healthy Profit Profile: 50% margins and clear profitability at modest scale
Growth-Ready Framework: Strong community, sell‑out launches, scalable operations, and untapped marketing channels
Fully Packaged Operation: Turnkey ecommerce business with supply chain, marketing assets, and seller transition support—ready for next-stage brand building

Stealth London is an excellent opportunity for investors, fashion entrepreneurs, or creatives seeking a premium streetwear label with established traction, authentic design DNA, and high scalability potential.`,
  },
  {
    id: `11838502`,
    title: `Physio123`,
    revealedName: `Physio123`,
    url: `https://flippa.com/11838502`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 147360.0,
    avgMonthlyRevenue: 6333.0,
    avgMonthlyProfit: 3655.0,
    profitMargin: `58%`,
    annualRevenue: `GBP £59,851`,
    annualProfit: `GBP £34,529`,
    expensesLastMonth: `GBP £2,109 /month`,
    ageYears: 19.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, Stripe`,
    country: `United Kingdom`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (Physio123) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Steven`,
      location: `United Kingdom`,
      verified: false,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £2,109 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Included.`,
      `Contact Seller`,
      `Send message`,
      `No comments`,
      `Show all`,
      `Open for negotiation`,
      `Indicative Price`,
      `USD $147,360`,
      `GBP £110,000`,
      `Contact Seller Submit LOI Make Offer`,
      `Watch`,
      `Share & Earn up to $2.9K*`,
      `Have a similar business? Get a free valuation`,
      `Vetted + Data Verified Listing`,
      `This quality listing has`,
    ],
    postSaleSupport: `from the current owner to ensure smooth transition`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `12,409`,
      totalPageViews: `2,172`,
      pagesPerSession: `2.26`,
      avgDuration: `00:00:02`,
      engagementRate: `0.33%`,
      topCountries: [
        {
          country: `Iran`,
          views: 2913,
        },
        {
          country: `China`,
          views: 631,
        },
        {
          country: `Singapore`,
          views: 337,
        },
        {
          country: `Germany`,
          views: 260,
        },
        {
          country: `United States`,
          views: 244,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `Stripe`,
    ],
    views: 795,
    watchers: 19,
    about: `Physio123: Business Overview

Physio123 is a specialized digital marketing agency with an 18-year operating history, dedicated to providing web design, marketing, and business solutions tailored to physiotherapy clinics and practitioners. Established in 2007, the company has built a reputation as the go-to provider for physiotherapists seeking to grow their online presence, attract more patients, and streamline their digital operations. Its subscription-based service model generates stable recurring revenue, with 74 active clients and a strong record of customer retention. With a niche focus, long-standing market presence, and lean operating structure, Physio123 combines profitability with scalability in the high-demand healthcare marketing sector.

Key Business Highlights

Long-established business with 18 years of history in physiotherapy-focused digital marketing
Profitable subscription-driven model with recurring revenue and strong retention
Active client base of 74 clinics and practitioners with 0% churn, demonstrating loyalty and satisfaction
Niche market expertise, providing tailored solutions that competitors cannot easily replicate
Strong online visibility with 788K backlinks, 312 referring domains, and authority in physiotherapy-related keywords
Stable and growing financial performance, delivering USD $46K annual profit at 58% margins

Operations

Physio123 operates with a lean structure, leveraging digital tools to deliver scalable services. The core offering includes website design and development, SEO optimization, content marketing, social media support, and online advertising tailored for physiotherapists. Clients subscribe to recurring packages, ensuring predictable revenue streams. Customer management is facilitated through email communication, Stripe-based billing, and integrated analytics reporting, keeping operations efficient and highly automated. With just USD $2,825 in monthly operating expenses, the business maintains a strong balance between costs and profitability.

Customers

The customer base includes physiotherapy clinics, private practices, and individual practitioners in the UK and internationally. With 74 active clients and 0% churn over the last 12 months, the business demonstrates strong customer satisfaction and long-term partnerships. Average order value stands at USD $98, with a customer lifetime value of USD $1,017. Clients benefit from consistent digital marketing support that improves online visibility, drives patient acquisition, and ensures business growth.

Technology

The business uses Stripe for secure, recurring subscription billing and`,
  },
  {
    id: `12272079`,
    title: `Dolls and Accessories`,
    revealedName: `Dolls and Accessories`,
    url: `https://flippa.com/12272079`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 115757.0,
    avgMonthlyRevenue: 13476.0,
    avgMonthlyProfit: 2581.0,
    profitMargin: `19%`,
    annualRevenue: `GBP £127,330`,
    annualProfit: `GBP £24,392`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `Australia`,
    platform: `fees`,
    hasStripe: false,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Australian ecommerce brand selling handcrafted dolls and European imports. Physical goods requiring Australian/European `,
    ],
    greenFlags: [],
    seller: {
      name: `Candice`,
      location: `Australia`,
      verified: true,
    },
    socialMedia: [
      `852 followers`,
      `3,907 followers`,
      `144 followers`,
    ],
    expenses: [
      {
        item: `Shipping`,
        amount: `GBP £2,012 /month`,
      },
      {
        item: `Marketing`,
        amount: `GBP £3,521 /month`,
      },
      {
        item: `Warehousing`,
        amount: `GBP £603 /month`,
      },
      {
        item: `Platform fees`,
        amount: `GBP £251 /month`,
      },
    ],
    saleIncludes: [
      `Shopify websites across AU, NZ, USA, CA, UK, and EU`,
      `Faire wholesale shop`,
      `Brand name and trademarks`,
      `5,500+ email subscribers`,
      `Social media accounts`,
      `Wholesale portal and lead database`,
      `Customer database and SOPs`,
      `Supplier agreements`,
      `Google Ads data and tracking`,
      `Inventory (negotiated separately)`,
      `Reason for Sale`,
    ],
    postSaleSupport: `and training`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `89,331`,
      totalPageViews: `23,187`,
      pagesPerSession: `2.27`,
      avgDuration: `00:00:15`,
      engagementRate: `0.68%`,
      topCountries: [
        {
          country: `Australia`,
          views: 13962,
        },
        {
          country: `China`,
          views: 418,
        },
        {
          country: `United States`,
          views: 162,
        },
        {
          country: `(not set)`,
          views: 104,
        },
        {
          country: `Germany`,
          views: 90,
        },
      ],
    },
    integrations: [
      `PayPal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 338,
    watchers: 14,
    about: `Dolls and Accessories: Business Overview

Dolls and Accessories is a premium Australian ecommerce brand offering high-quality handcrafted dolls, accessories, and exclusive European imports. Since launching two years ago, the business has quickly carved out a leading niche in the dolls and collectibles category, with exclusive distribution rights across Australia and New Zealand. Backed by strong SEO, defensible supplier agreements, and a scalable Shopify infrastructure, the brand is primed for continued expansion both domestically and internationally.

This fast-growing ecommerce asset generated AUD $245K in revenue over the last 12 months with a 19% net profit margin. Profit and revenue have nearly doubled in the last six months alone, underpinned by product-market fit, efficient operations, and seasonal performance. The brand enjoys exceptional customer sentiment and repeat buyers across both DTC and wholesale channels, making it a highly attractive opportunity for investors, aggregators, or operators seeking a turnkey, high-potential ecommerce brand.

Key Financials (Trailing Twelve Months)

Revenue: AUD $245,485
Net Profit: AUD $47,027
Profit Margin: 19%
Revenue (Last 6 Months): AUD $164,246
Net Profit (Last 6 Months): AUD $30,400
Average Monthly Sessions: 25,000
Average Order Value: AUD $204
Fulfillment Rate: 99.5%
Inventory Value: AUD $60,000 (negotiated separately)
Asking Price: AUD $165,000 + Inventory at Cost

Geographical Reach

The business holds exclusive Australian and New Zealand distribution rights for all brands carried, eliminating direct competition in those territories. Products are also sold across Shopify storefronts in the United States, Canada, United Kingdom, and Europe—positioning the brand for international scalability.

Digital Authority & Customer Metrics

Dolls and Accessories has built a trusted brand with powerful organic reach and engagement. It ranks in the top 3 on Google for high-value keywords like “baby dolls,” “reborn dolls,” and “doll prams.” The website receives over 25,000 monthly page views, and its email list of 5,500+ subscribers and 3,900+ Instagram followers generate steady engagement and conversion. Over 1,000 verified product reviews and a 5-star Google rating further establish strong brand trust.

Marketing and Acquisition Performance

Cross-channel marketing continues to drive high-quality traffic, with 57% of pageviews coming from paid ads, 22% from organic search, and 15% direct. Paid marketing has been kept intentionally conservative in the off-season, with major upside potential for scaling campaigns in peak retail windows. Marketing expenses average AUD $4,758/month across a 12 month period, with significant room for ROAS improvement via better segmentation and automation.

Wholesale & B2B Growth Channel

The brand operates a fully functional wholesale portal with automated onboarding, tiered pricing, and backend fulfillment flows. Active retail stockists are already in place, and a database `,
  },
  {
    id: `12367637`,
    title: `MrFurem`,
    revealedName: `MrFurem`,
    url: `https://flippa.com/12367637`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 112000.0,
    avgMonthlyRevenue: 8377.0,
    avgMonthlyProfit: 2687.0,
    profitMargin: `32%`,
    annualRevenue: `GBP £79,148`,
    annualProfit: `GBP £25,397`,
    ageYears: 3.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `NY, United States`,
    platform: `Shopify`,
    hasStripe: true,
    hasPaypal: true,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 55,
      growthPotential: 50,
      overall: 55.9,
    },
    recommendation: `AVOID`,
    redFlags: [
      `Physical product business (MrFurem) — identified from listing description`,
    ],
    greenFlags: [],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `23 transactions totalling USD $8,469,233`,
    },
    socialMedia: [
      `95,800 followers`,
      `27,500 followers`,
    ],
    expenses: [
      {
        item: `Gelato subscriptions`,
        amount: `GBP £26 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Unique content`,
      `Unique design`,
      `Shopify`,
      `Included.`,
      `95,800 followers`,
      `27,500 followers`,
      `15,455 subscribers`,
      `Attachments`,
      `invoice_471181128_2-2`,
      `GELATO-`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {
      users: `123,792`,
      totalPageViews: `37,780`,
      pagesPerSession: `3.20`,
      avgDuration: `00:00:39`,
      engagementRate: `0.58%`,
      topCountries: [
        {
          country: `United States`,
          views: 15888,
        },
        {
          country: `Mexico`,
          views: 1709,
        },
        {
          country: `Canada`,
          views: 1056,
        },
        {
          country: `France`,
          views: 816,
        },
        {
          country: `Vietnam`,
          views: 175,
        },
      ],
    },
    integrations: [
      `Stripe`,
      `PayPal`,
      `Paypal`,
      `Google Analytics`,
      `Shopify`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 350,
    watchers: 20,
    about: `Overview

This is a rare opportunity to acquire a design-led anime art brand positioned as a premium collector-style merchandise experience rather than a typical fan merchandise store. The brand focuses on minimalist, high-quality anime-inspired artwork and limited-style product drops that appeal to dedicated fans and collectors.

Unlike mass-market anime merchandise stores, the brand has intentionally positioned itself with clean aesthetics, high-end design, and curated collections that resemble art drops rather than commodity products. This positioning has helped build strong brand loyalty and an engaged audience.

The business operates on a fully automated print-on-demand model with no inventory, minimal operational overhead, and a streamlined technology stack.

Financial Performance (TTM Feb 2025 – Jan 2026)

Revenue: $105,468

Net Profit: $33,843

Net Margin: ~32%

Year-over-Year Growth: +93%

Marketing Efficiency Ratio (MER): 5.88x

Best Month: January 2026 – $14,500

The business demonstrates strong marketing efficiency and recent growth momentum with clear room for additional scaling.

Business Model

Operations are extremely lean and largely automated.

Key infrastructure includes:

Shopify storefront

Print-on-demand fulfillment via Gelato

Stripe and PayPal payment processing

Meta Ads for customer acquisition

Email marketing for retention

Products are produced on demand and shipped automatically, eliminating inventory risk and reducing operational complexity.

The current owner spends approximately 5 to 10 hours per week overseeing marketing and product launches.

Brand Assets & Audience

The brand has built a strong organic moat driven by its audience and design positioning.

Key assets include:

95,000+ Instagram followers with strong engagement

15,000+ email subscribers

4.9 / 5 average rating across hundreds of reviews

0% historical refund rate

98% US customer base

Traffic is primarily organic, with approximately 70% coming from social and brand awareness, significantly lowering marketing dependency.

Importantly, the brand maintains a clean DMCA record by focusing on transformative artwork rather than using protected character names or trademarks.

Product Catalog

The store currently includes:

11 curated collections

127+ unique premium designs

Apparel, accessories, and digital products

The catalog has been validated through real sales and customer feedback. Many designs are well suited for expansion into additional merchandise formats.

Growth Opportunities

Several clear growth levers remain available:

Scaling Meta ads with proven MER performance

Launching TikTok Shop, which remains completely untapped

Expanding product lines into high-margin collectibles such as pins, stickers, and stationery

Improving email marketing monetization

Expanding paid channels including Google Ads, TikTok Ads, and Pinterest

With nearly all customers located in the US, the brand is well positioned to scale within the largest anime mer`,
  },
  {
    id: `11885362`,
    title: `Chatbots Life: AI Education & Workshops`,
    revealedName: `Chatbots Life: AI Education & Workshops`,
    url: `https://flippa.com/11885362`,
    type: `other`,
    dataLevel: `stats`,
    askingPrice: 99999.0,
    avgMonthlyRevenue: 2417.0,
    avgMonthlyProfit: 1941.0,
    profitMargin: `80%`,
    annualRevenue: `GBP £22,839`,
    annualProfit: `GBP £18,336`,
    expensesLastMonth: `GBP £375 /month`,
    ageYears: 9.0,
    monetisation: ``,
    techStack: `Shopify, Stripe`,
    country: `CA, United States`,
    platform: `with`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 55,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 40,
      growthPotential: 50,
      overall: 53.7,
    },
    recommendation: `AVOID`,
    redFlags: [],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
      `9 years old — established`,
    ],
    seller: {
      name: `Stefan Kojouharov`,
      location: `United States`,
      verified: false,
    },
    expenses: [
      {
        item: `Expenses last month`,
        amount: `GBP £375 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Other`,
      `Unique content`,
      `Unique design`,
      `Beehiiv`,
      `36,900 followers`,
      `2,000 followers`,
      `1,666 subscribers`,
      `Attachments`,
      `Workshops Income - Workshops P_L (1)`,
      `Workshops Income - Followers & SM`,
      `Contact Seller`,
      `Send message`,
      `No co`,
    ],
    postSaleSupport: `Included. I can help you plan the next workshop and guide you through the process.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Amazon`,
    ],
    tech: [
      `Shopify`,
      `Stripe`,
    ],
    views: 817,
    watchers: 29,
    about: `Chatbots Life: AI Education Brand with $624K+ Lifetime Revenue and Premier Conference Assets

Chatbots Life is a category-leading media, events, and education brand in the fast-growing AI and conversational technology sector. Founded in 2017, the business has evolved from a blog into a global authority in the chatbot and conversational AI space. With a Domain Authority (DA) of 73 and 137,000+ followers across platforms, Chatbots Life operates as both a publication and an event organizer, running one of the most recognizable conferences in the space — The Chatbot Conference.

Backed by eight years of profitability and $624K in cumulative revenue from workshops alone, the brand has demonstrated strong performance across in-person events, online education, and digital monetization channels. While current revenues are modest due to personal time constraints, historical performance, brand strength, and clear expansion paths make this a high-potential acquisition.

Business Model & Revenue

Chatbots Life is monetized through a blend of high-margin in-person and online workshops, consulting services, paid subscriptions, sponsorships, and newsletter advertising. Workshop profit margins historically exceed 75%, with several years reaching over 79%. In peak years, like 2019, the business generated over $162K in event revenue and $100K+ in net income.

In 2024, revenue from a single workshop and conference totaled $30,434, supported by sponsorship deals and ticket sales through platforms like Wix and Eventbrite. Newsletter monetization was added via Beehiiv, contributing $4,444 in 2024 from ads and subscriptions, and offering a recurring revenue base with growth potential.

Audience & Brand Reach

Chatbots Life maintains a highly engaged and loyal audience. The combined email subscriber base includes 46,000 Chatbots Life subscribers and 15,000 for the conference series. This is complemented by a powerful social media footprint totaling over 137,000 followers across Facebook, Medium, YouTube, LinkedIn, Twitter (X), and Instagram.

Top organic keywords such as “What is a Telegram Bot,” “Who Made Chatbot,” and “AI Powered” reflect strong SEO authority. The site ranks for 21.7K total keywords and maintains 154K backlinks from over 6,300 referring domains — significantly enhancing discoverability and traffic potential.

Platform & Operations

The business is currently operated through Beehiiv (newsletter platform), Stripe (payments), and standard CMS tools. It is run by a single operator and is 90% automated. Operations require minimal time investment — mostly planning and coordinating events, issuing newsletters, and managing sponsorships. A complete post-sale handover with guidance on future events is included.

Growth Opportunities

Return to pre-pandemic and pre-family cadence of 2–3 annual conferences and workshops, restoring historical revenue highs.
Expand high-ticket B2B services and corporate training offerings, which generated over $300K in earlier yea`,
  },
  {
    id: `12098365`,
    title: `Folder Fort`,
    revealedName: `Folder Fort`,
    url: `https://flippa.com/12098365`,
    type: `other`,
    dataLevel: `full_pnl`,
    askingPrice: 179000.0,
    monthlyPL: [
      { month: `Feb 2025`, revenue: 6440.17, expenses: 4201.16, profit: 2240.28 },
      { month: `Mar 2025`, revenue: 4362.45, expenses: 388.62, profit: 3973.83 },
      { month: `Apr 2025`, revenue: 17811.75, expenses: 388.62, profit: 17423.13 },
      { month: `May 2025`, revenue: 3313.43, expenses: 528.32, profit: 2783.84 },
      { month: `Jun 2025`, revenue: 3274.06, expenses: 2564.13, profit: 708.66 },
      { month: `Jul 2025`, revenue: 3966.21, expenses: 2618.74, profit: 1346.2 },
      { month: `Aug 2025`, revenue: 3618.23, expenses: 9919.97, profit: -6300.47 },
      { month: `Sep 2025`, revenue: 5764.53, expenses: 2618.74, profit: 3144.52 },
      { month: `Oct 2025`, revenue: 11334.75, expenses: 3097.53, profit: 8237.22 },
      { month: `Nov 2025`, revenue: 9495.79, expenses: 3336.29, profit: 6160.77 },
      { month: `Dec 2025`, revenue: 7161.53, expenses: 3288.03, profit: 3873.5 },
      { month: `Jan 2026`, revenue: 3364.23, expenses: 3390.9, profit: -26.67 },
    ],
    avgMonthlyRevenue: 6659.0,
    avgMonthlyProfit: 3630.0,
    profitMargin: `55%`,
    annualRevenue: `GBP £62,918`,
    annualProfit: `GBP £34,303`,
    ageYears: 2.0,
    monetisation: ``,
    techStack: `WordPress, Shopify, WooCommerce, Stripe`,
    country: `Canada`,
    platform: `is`,
    hasStripe: true,
    hasPaypal: false,
    isVetted: true,
    managedByFlippa: true,
    ndaApproved: true,
    scores: {
      stability: 45.0,
      diversification: 50,
      operatorIndependence: 68.3,
      roi: 40,
      growthPotential: 50,
      overall: 50.7,
    },
    recommendation: `AVOID`,
    redFlags: [
      `High revenue volatility (CV 63%)`,
    ],
    greenFlags: [
      `Flippa-vetted`,
      `Stripe revenue verified`,
      `Managed by Flippa`,
    ],
    seller: {
      name: `Alerts`,
      verified: true,
      transactions: `641 transactions totalling USD $285,564,288`,
    },
    socialMedia: [
      `55 followers`,
    ],
    expenses: [
      {
        item: `Data hosting`,
        amount: `GBP £1,801 /month`,
      },
    ],
    saleIncludes: [
      `Assets`,
      `Domains`,
      `Website files`,
      `Email address`,
      `Social media accounts`,
      `Email subscriber list`,
      `Brand assets (logos, etc)`,
      `Phone number(s)`,
      `Supplier contracts`,
      `Trademarks/patents`,
      `Custom technology`,
      `Unique content`,
      `Unique design`,
      `WordPress 6.8`,
      `Included.`,
      `55 followers`,
      `45 subscribers`,
      `9,000 subscribers`,
      `Attachments`,
      `XLSX`,
      `FF Financials`,
      `XLSX`,
      `Folder Fort Income Statement`,
      `No comments`,
      `Managed by Flippa`,
      `Editor's Choice`,
      `Show all`,
      `Open for nego`,
    ],
    postSaleSupport: `Included.`,
    badges: [
      `Editor's Choice`,
      `Sponsored`,
      `Managed by Flippa`,
    ],
    ga: {},
    integrations: [
      `Stripe`,
      `Google Analytics`,
      `Amazon`,
      `WooCommerce`,
    ],
    tech: [
      `WordPress`,
      `Shopify`,
      `WooCommerce`,
      `Stripe`,
    ],
    views: 4519,
    watchers: 305,
    about: `FolderFort.com is a turnkey cloud storage brand with multiple revenue streams, proven partnerships, and strong growth potential. While the business has benefited from the popularity of subscription fatique and lifetime storage plans, the platform is not limited to this model — it also supports regular subscriptions and can be further developed to include enterprise offerings or white-label services.

Revenue Model

Cloud Storage

Current focus on lifetime deals sold via direct sales and StackSocial (no upfront marketing cost, we keep ~50% of sale price).

Buyers prepay for capacity they rarely use in full — on average, customers use only ~5% of purchased space.

Recurring Subscriptions (Growth Opportunity)

Platform has subscribers on monthly/annual subscriptions to provide predictable, long-term recurring revenue. This can be focused on greatly to increase the stability of the business.

Physical Storage Products

Branded Folder Fort memory cards sold via Amazon.ca (Prime) with excellent reviews and hands-off fulfillment. They also serve as a sort of lead generation as each card comes with a cloud storage trial.

Easily expandable into the US, other marketplaces, and more SKUs.

------------------------------------------------------------------

Technology & Operations

Hosted on a scalable Vultr VPS running HestiaCP — auto-updates, requires near-zero server maintenance.

Storage powered by Backblaze B2 (S3-compatible), easily portable to alternate providers for cost or regional advantages.

Automated systems: no customer acquisition spend (StackSocial handles marketing) and no fulfillment workload (Amazon Prime FBA).

Minimal support: a few emails or chats per day, typically password resets or account issues. Easily outsourced,  automated with AI/ticketing, or self managed.

Efficiency & Margins

Most customers prepay for maximum space, but average usage is only ~5%, creating high margins.

Capital is largely frontloaded as opposed to scaling debt for custom acquisitions.
No developer costs - except if to add new features.

Brand Strength

Domain & Brand: FolderFort.com – short, memorable, and authoritative brand.

Pending Trademark: Pending trademark in Canada for the name on digital storage services and physical storage products.

Reputation: Excellent Trustpilot reviews, positive Reddit mentions, and engaged customer base.

Amazon credibility: Strong product reviews reinforce consumer trust in storage products.

Growth Opportunities

Focus beyond lifetime deals into recurring subscriptions for steady cash flow.

Develop white-label or enterprise accounts, multi-bucket support, or bring-your-own-storage options.

Monetize unused bandwidth for streaming, CDN, or media storage.

Grow Amazon product line into US and international markets with more SKUs.

Re-engage mailing list (rarely tapped) with new promotions and launches.

Bundle add-ons like VPN, SFTP access, or file editing tools.

Why Buy

FolderFort is a rare mix of SaaS, e-commerce, and`,
  }
];
