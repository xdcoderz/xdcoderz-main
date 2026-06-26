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
  status: "Available" | "Coming soon";
  platform: string;
  tagline: string;
  summary: string;
  description: string;
  highlights: string[];
  outputs?: string[];
  downloads?: DownloadAsset[];
};
