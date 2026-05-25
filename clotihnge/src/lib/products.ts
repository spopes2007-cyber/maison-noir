export type Category = "Hoodies" | "T-Shirts" | "Pants" | "Jackets" | "Sneakers" | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  sizes: string[];
  colors: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  gradient: string;
  accentColor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "k001",
    name: "Void Shadow Hoodie",
    category: "Hoodies",
    price: 189,
    originalPrice: 240,
    description: "Heavy premium fleece with obsidian wash. Interior satin lining. KONANE embossed chest plate.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#0D0D0D", "#1A1A1A", "#C41230"],
    badge: "BESTSELLER",
    isBestseller: true,
    gradient: "from-zinc-900 via-zinc-800 to-stone-900",
    accentColor: "#C41230",
  },
  {
    id: "k002",
    name: "Phantom Zip Hoodie",
    category: "Hoodies",
    price: 219,
    description: "Full-zip technical hoodie with hidden pockets and reflective KONANE side tape.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#141414", "#2A2A2A"],
    isNew: true,
    gradient: "from-neutral-900 via-stone-900 to-zinc-900",
    accentColor: "#E8153A",
  },
  {
    id: "k003",
    name: "Crimson Aura Tee",
    category: "T-Shirts",
    price: 89,
    description: "Japanese heavyweight cotton. Acid-washed deep black. Subtle crimson logo embroidery at chest.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#0A0A0A", "#C41230"],
    badge: "HOT",
    gradient: "from-red-950 via-zinc-900 to-black",
    accentColor: "#C41230",
  },
  {
    id: "k004",
    name: "Silent Force Tee",
    category: "T-Shirts",
    price: 79,
    description: "Minimal elongated cut. Raw edge hem. KONANE monogram back print.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#111111", "#1E1E1E"],
    gradient: "from-zinc-900 to-neutral-900",
    accentColor: "#666666",
  },
  {
    id: "k005",
    name: "Eclipse Cargo Pants",
    category: "Pants",
    price: 249,
    originalPrice: 310,
    description: "Wide-leg tactical cargo with matte hardware. Six utility pockets. Water-resistant ripstop.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#0D0D0D", "#1C1C1C"],
    isBestseller: true,
    gradient: "from-stone-900 via-neutral-900 to-zinc-900",
    accentColor: "#C41230",
  },
  {
    id: "k006",
    name: "Obsidian Slim Trousers",
    category: "Pants",
    price: 189,
    description: "Tailored slim trousers in Japanese wool blend. Satin stripe detail. Elite silhouette.",
    sizes: ["28", "30", "32", "34"],
    colors: ["#0A0A0A"],
    isNew: true,
    gradient: "from-zinc-950 to-neutral-900",
    accentColor: "#888888",
  },
  {
    id: "k007",
    name: "Raven Trench Coat",
    category: "Jackets",
    price: 489,
    originalPrice: 590,
    description: "Structured trench in premium matte polyester. Kimono-inspired collar. Oversized silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#0D0D0D"],
    badge: "ICONIC",
    isBestseller: true,
    gradient: "from-zinc-900 via-stone-900 to-neutral-950",
    accentColor: "#C41230",
  },
  {
    id: "k008",
    name: "Stealth Bomber Jacket",
    category: "Jackets",
    price: 359,
    description: "MA-1 bomber in coated nylon. Signature KONANE patch. Ribbed crimson interior collar.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#111111", "#C41230"],
    isNew: true,
    gradient: "from-red-950 via-zinc-900 to-neutral-900",
    accentColor: "#E8153A",
  },
  {
    id: "k009",
    name: "Phantom Low Sneakers",
    category: "Sneakers",
    price: 329,
    description: "Premium leather upper with suede overlays. KONANE embossed sole. Japanese micro-pattern insole.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#0D0D0D", "#FFFFFF"],
    badge: "NEW DROP",
    isNew: true,
    gradient: "from-stone-900 via-zinc-900 to-neutral-900",
    accentColor: "#C41230",
  },
  {
    id: "k010",
    name: "Obsidian High Tops",
    category: "Sneakers",
    price: 279,
    description: "High-top canvas with leather toe cap. Crimson woven laces. Hidden KONANE side stamp.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#0D0D0D"],
    gradient: "from-zinc-950 to-neutral-900",
    accentColor: "#C41230",
  },
  {
    id: "k011",
    name: "Shadow Signet Ring",
    category: "Accessories",
    price: 89,
    description: "Matte black surgical steel. KONANE embossed crest. Available in all sizes.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["#111111", "#C41230"],
    gradient: "from-zinc-900 to-stone-900",
    accentColor: "#C41230",
  },
  {
    id: "k012",
    name: "Void Cap",
    category: "Accessories",
    price: 69,
    description: "6-panel structured cap in heavyweight twill. Tonal embroidery. Adjustable strap.",
    sizes: ["ONE SIZE"],
    colors: ["#0D0D0D", "#1A1A1A"],
    isBestseller: true,
    gradient: "from-neutral-900 to-zinc-900",
    accentColor: "#888888",
  },
];

export const CATEGORIES: Category[] = ["Hoodies", "T-Shirts", "Pants", "Jackets", "Sneakers", "Accessories"];
