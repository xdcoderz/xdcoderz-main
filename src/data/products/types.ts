export type DownloadAsset = {
  label: string;
  fileName: string;
  href: string;
  size: string;
  sha256: string;
  primary?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  platformGroup:
    | "Desktop Apps"
    | "Android Apps"
    | "Web Apps"
    | "SaaS Products"
    | "Developer Tools"
    | "Automation Tools"
    | "Utilities"
    | "Experiments";
  status: "Available" | "Coming soon";
  platforms: string[];
  tagline: string;
  summary: string;
  description: string;
  highlights: string[];
  outputs?: string[];
  downloads?: DownloadAsset[];
};
