import type { Product } from "./types";

export const gridforge: Product = {
  slug: "gridforge",
  name: "GridForge",
  category: "Desktop utility",
  status: "Available",
  platform: "Windows",
  tagline: "Messy table in. Clean Excel out.",
  summary:
    "A free Windows utility that converts table images into JSON, CSV, and Excel files using AI or offline OCR.",
  description:
    "GridForge helps students, office users, and small teams turn photographed, scanned, or digital table images into usable spreadsheet files. Use AI Mode for harder images or install the Offline Pack when privacy and no-internet workflows matter more.",
  highlights: [
    "Convert photographed, scanned, or screenshot tables",
    "Choose online AI extraction or local offline OCR",
    "Export JSON, CSV, and Excel files",
    "Free Windows installer with optional Offline Pack",
  ],
  outputs: ["table.json", "data.csv", "output.xlsx"],
  downloads: [
    {
      label: "GridForge Installer",
      fileName: "GridForge-Setup-0.1.0.exe",
      href: "/downloads/gridforge/GridForge-Setup-0.1.0.exe",
      size: "24 MB",
      sha256:
        "073BBBAAF95802549CAAC069D8D48969CA708C3DF5D91A3BF52B97BCF232853B",
      primary: true,
    },
    {
      label: "Offline Pack Installer",
      fileName: "GridForge-Offline-Pack-0.1.0.exe",
      href: "/downloads/gridforge/GridForge-Offline-Pack-0.1.0.exe",
      size: "88 MB",
      sha256:
        "152D031F6D6BB8574CA5768B1F995321024B13D19229741265E1EDE3C94DA581",
    },
    {
      label: "GridForge ZIP Backup",
      fileName: "GridForge-0.1.0-win-x64.zip",
      href: "/downloads/gridforge/GridForge-0.1.0-win-x64.zip",
      size: "32 MB",
      sha256:
        "A31E77CF0F47C18FAF762F52FB1082D4271149BA2438EE4D6D902C51D7BD0C81",
    },
    {
      label: "Offline Pack ZIP Backup",
      fileName: "GridForge-Offline-Pack-0.1.0.zip",
      href: "/downloads/gridforge/GridForge-Offline-Pack-0.1.0.zip",
      size: "98 MB",
      sha256:
        "5569C76C63DC3D3C552970869C04A3C8BF2A65C56334BF822916863C22207C2F",
    },
  ],
};
