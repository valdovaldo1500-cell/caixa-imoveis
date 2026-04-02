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

export const PORTFOLIO_ASSESSMENTS: ExpertAssessment[] = [];
