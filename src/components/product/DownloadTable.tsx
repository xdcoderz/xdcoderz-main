import { Download } from "lucide-react";
import type { DownloadAsset } from "@/data/products/types";

export function DownloadTable({ downloads }: { downloads: DownloadAsset[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="grid gap-0">
        {downloads.map((download) => (
          <div
            key={download.fileName}
            className="grid gap-4 border-b border-neutral-200 p-5 last:border-b-0 lg:grid-cols-[1.2fr_0.4fr_1.5fr_auto]"
          >
            <div>
              <h3 className="font-semibold text-neutral-950">{download.label}</h3>
              <p className="mt-1 break-all text-sm text-neutral-600">
                {download.fileName}
              </p>
            </div>
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-950">Size</span>
              <p className="mt-1">{download.size}</p>
            </div>
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-950">SHA-256</span>
              <p className="mt-1 break-all font-mono text-xs">{download.sha256}</p>
            </div>
            <a
              href={download.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <Download size={16} aria-hidden="true" />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
