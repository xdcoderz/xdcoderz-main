export type BlogCategory =
  | "Build Logs"
  | "Automation"
  | "Web Development"
  | "SaaS Notes"
  | "Productivity"
  | "Case Studies"
  | "Founder Notes"
  | "Market Signals";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  author: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  format: "markdown" | "weekly-market-digest-v3";
};

export type BlogPost = BlogPostMeta & {
  content: string;
  readingTime: string;
  digest?: WeeklyMarketDigest;
};

export type DigestTimeHorizon = "days" | "weeks" | "months" | "years";
export type DigestImpactDuration = "temporary" | "persistent" | "structural";
export type DigestPrimaryDriver =
  | "technology"
  | "company"
  | "market"
  | "regulatory"
  | "geopolitical"
  | "social"
  | "environmental";

export type WeeklyDigestEvent = {
  id: string;
  headline: string;
  description: string;
  impactArea: string;
  indiaLinkage: "direct" | "indirect";
  indiaRelevance: string;
  hitsFirst: string;
  timeHorizon: DigestTimeHorizon;
  impactDuration: DigestImpactDuration;
  primaryDriver: DigestPrimaryDriver;
  source: {
    name: string;
    url: string;
    publishedAt?: string;
    imageUrl?: string;
    imageAlt: string;
  };
  analysis: {
    bottomLine: string;
    commercialImpact: string;
    winnersAndPressure: string;
    watchNext: string;
  };
  opportunity: {
    name: string;
    targetCustomer: string;
    problem: string;
    solution: string;
    weekendMvp: string;
    whyNow: string;
    validation: string;
  };
};

export type WeeklyMarketDigest = {
  format: "weekly-market-digest-v3";
  slug: string;
  title: string;
  subtitle: string;
  seoDescription: string;
  date: string;
  category: "Market Signals";
  author: "XDCoderz";
  tags: string[];
  featured: boolean;
  coverage: {
    start: string;
    end: string;
    timeZone: "Asia/Kolkata";
  };
  closingSynthesis?: string;
  events: WeeklyDigestEvent[];
};
