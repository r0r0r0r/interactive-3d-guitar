export type BodyShape =
  | "single-cut"
  | "double-cut"
  | "offset"
  | "vee"
  | "acoustic"
  | "hollow";

export type Finish = {
  id: string;
  name: string;
  /** top of the burst */
  from: string;
  /** center of body */
  via: string;
  /** rim of the burst */
  to: string;
  hardware: "gold" | "chrome" | "black";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "electric" | "acoustic" | "bass" | "custom-shop";
  collection: "aurora" | "nocturne" | "heritage" | "vanguard";
  shape: BodyShape;
  price: number; // cents
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock" | "made-to-order";
  limited?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  finishes: Finish[];
  description: string;
  story: string;
  specs: { label: string; value: string }[];
  materials: { name: string; part: string; note: string }[];
  features: string[];
};

const f = (
  id: string,
  name: string,
  from: string,
  via: string,
  to: string,
  hardware: Finish["hardware"] = "gold"
): Finish => ({ id, name, from, via, to, hardware });

export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-solstice",
    name: "Aurora Solstice",
    tagline: "Where dawn meets distortion",
    category: "electric",
    collection: "aurora",
    shape: "single-cut",
    price: 489900,
    compareAt: 549900,
    rating: 4.9,
    reviews: 128,
    stock: "in-stock",
    bestSeller: true,
    finishes: [
      f("amber-dawn", "Amber Dawn", "#f5c96b", "#c97a2e", "#5e2f10"),
      f("obsidian", "Obsidian Night", "#4a4a52", "#1b1b21", "#050507", "black"),
      f("oxblood", "Oxblood", "#a3402e", "#5e1f14", "#230a06"),
    ],
    description:
      "A single-cut masterpiece carved from century-old flame maple, voiced by hand-wound Alnico V humbuckers with a response so dynamic it feels alive.",
    story:
      "The Solstice began as a single question: what if sunrise had a sound? Eighteen months of tonal research later, our luthiers found it — in a maple cap harvested from a 1920s Appalachian barn beam.",
    specs: [
      { label: "Body", value: "Mahogany, flame maple cap" },
      { label: "Neck", value: "One-piece mahogany, hand-rolled C" },
      { label: "Fingerboard", value: "Ebony, 22 medium-jumbo frets" },
      { label: "Scale", value: "24.75\" / 628 mm" },
      { label: "Pickups", value: "Auric AV-5 hand-wound humbuckers" },
      { label: "Hardware", value: "24k gold-plated, locking tuners" },
      { label: "Weight", value: "3.9 kg / 8.6 lbs" },
      { label: "Case", value: "Vegan leather flight case included" },
    ],
    materials: [
      { name: "Flame Maple", part: "Top", note: "Air-dried 14 years, AAAA grade" },
      { name: "Honduran Mahogany", part: "Body & neck", note: "FSC-certified reclaimed stock" },
      { name: "Gabon Ebony", part: "Fingerboard", note: "Jet-black, hand-oiled" },
    ],
    features: [
      "Hand-wound Alnico V humbuckers",
      "Coil-split push-pull pots",
      "Locking gold tuners",
      "Bone nut, hand-cut",
    ],
  },
  {
    id: "p2",
    slug: "nocturne-eclipse",
    name: "Nocturne Eclipse",
    tagline: "Darkness, engineered",
    category: "electric",
    collection: "nocturne",
    shape: "offset",
    price: 619900,
    rating: 5.0,
    reviews: 74,
    stock: "low-stock",
    limited: true,
    isNew: true,
    finishes: [
      f("void", "Void Black", "#33333b", "#101015", "#000000", "black"),
      f("nebula", "Nebula Violet", "#8a63c9", "#3d2470", "#120a24", "chrome"),
    ],
    description:
      "An offset silhouette in satin void-black, with active ceramic pickups and a carbon-reinforced neck built for velocity in total darkness.",
    story:
      "Limited to 88 instruments worldwide. The Eclipse was designed with session players who live on midnight stages — every surface is anti-reflective, every note is surgical.",
    specs: [
      { label: "Body", value: "Chambered alder, satin finish" },
      { label: "Neck", value: "Roasted maple, carbon rods" },
      { label: "Fingerboard", value: "Richlite, 24 stainless frets" },
      { label: "Scale", value: "25.5\" / 648 mm" },
      { label: "Pickups", value: "Auric Dark-Coil actives" },
      { label: "Hardware", value: "Black nickel, locking" },
      { label: "Weight", value: "3.4 kg / 7.5 lbs" },
      { label: "Case", value: "Matte black hardshell included" },
    ],
    materials: [
      { name: "Chambered Alder", part: "Body", note: "Weight-relieved, resonant" },
      { name: "Roasted Maple", part: "Neck", note: "Torrefied for stability" },
      { name: "Richlite", part: "Fingerboard", note: "Carbon-neutral composite" },
    ],
    features: [
      "Active Dark-Coil pickups",
      "24 stainless steel frets",
      "Luminescent side dots",
      "Zero-fret design",
    ],
  },
  {
    id: "p3",
    slug: "heritage-1959",
    name: "Heritage 1959",
    tagline: "A love letter to the golden era",
    category: "electric",
    collection: "heritage",
    shape: "double-cut",
    price: 799900,
    rating: 4.8,
    reviews: 203,
    stock: "made-to-order",
    bestSeller: true,
    finishes: [
      f("sunburst", "Tobacco Burst", "#e8b45a", "#9c5a20", "#2e1608"),
      f("cherry", "Cherry Fade", "#d4553a", "#8a2318", "#330d08"),
    ],
    description:
      "Every curve, every ounce of lacquer replicates the holy-grail instruments of 1959 — then quietly improves what six decades taught us.",
    story:
      "Our master builder spent three years with original '59 instruments, mapping their necks with sub-millimeter scans. The Heritage 1959 is that data, made wood.",
    specs: [
      { label: "Body", value: "Lightweight mahogany, maple cap" },
      { label: "Neck", value: "'59 profile, hide-glue set" },
      { label: "Fingerboard", value: "Indian rosewood" },
      { label: "Scale", value: "24.75\" / 628 mm" },
      { label: "Pickups", value: "Auric PAF-style, unpotted" },
      { label: "Hardware", value: "Aged nickel" },
      { label: "Weight", value: "3.8 kg / 8.4 lbs" },
      { label: "Case", value: "Vintage brown hardshell" },
    ],
    materials: [
      { name: "Mahogany", part: "Body", note: "Old-growth, one-piece" },
      { name: "Flame Maple", part: "Top", note: "Book-matched, nitro finish" },
      { name: "Rosewood", part: "Fingerboard", note: "CITES-compliant" },
    ],
    features: [
      "Unpotted PAF-style pickups",
      "Hide-glue neck joint",
      "Nitrocellulose lacquer",
      "Aged aniline dye",
    ],
  },
  {
    id: "p4",
    slug: "vanguard-prism",
    name: "Vanguard Prism",
    tagline: "The future has six strings",
    category: "electric",
    collection: "vanguard",
    shape: "vee",
    price: 559900,
    rating: 4.7,
    reviews: 51,
    isNew: true,
    stock: "in-stock",
    finishes: [
      f("prism", "Prismatic Silver", "#e8e8f0", "#9a9aac", "#3c3c4a", "chrome"),
      f("cobalt", "Cobalt Rush", "#5a8ad4", "#1f3f8a", "#0a1433", "chrome"),
    ],
    description:
      "An angular statement piece with a multi-scale fretboard, titanium-saddle bridge and a finish that refracts stage light into moving color.",
    story:
      "The Prism was born in a wind tunnel — literally. We borrowed aerospace modeling software to sculpt a body that balances perfectly on strap or knee, despite its radical geometry.",
    specs: [
      { label: "Body", value: "Basswood core, poplar wings" },
      { label: "Neck", value: "Wenge-maple 5-ply, bolt-on" },
      { label: "Fingerboard", value: "Pale moon ebony, multi-scale" },
      { label: "Scale", value: "25.5\"–26.5\" fanned" },
      { label: "Pickups", value: "Auric Flux ceramic rails" },
      { label: "Hardware", value: "Titanium saddles, chrome" },
      { label: "Weight", value: "3.2 kg / 7.1 lbs" },
      { label: "Case", value: "Form-fit ABS flight case" },
    ],
    materials: [
      { name: "Basswood", part: "Core", note: "Resonant, lightweight" },
      { name: "Wenge", part: "Neck", note: "Self-lubricating feel" },
      { name: "Pale Moon Ebony", part: "Fingerboard", note: "Striking figure" },
    ],
    features: [
      "Multi-scale fanned frets",
      "Titanium saddle bridge",
      "Refractive prism finish",
      "Ergonomic wind-tunnel body",
    ],
  },
  {
    id: "p5",
    slug: "grand-atelier",
    name: "Grand Atelier",
    tagline: "A concert hall in your hands",
    category: "acoustic",
    collection: "heritage",
    shape: "acoustic",
    price: 689900,
    rating: 4.9,
    reviews: 167,
    stock: "in-stock",
    bestSeller: true,
    finishes: [
      f("natural", "Natural Sitka", "#e8c98a", "#c9a05e", "#7a5228"),
      f("bourbon", "Bourbon Burst", "#d49a4a", "#8a5a1f", "#33200a"),
    ],
    description:
      "A grand auditorium acoustic with a torrefied Sitka top that sounds 40 years played-in from the very first strum.",
    story:
      "Each Atelier top is tap-tuned by ear in a silent room, then torrefied in small batches. No two are identical; every one is unmistakable.",
    specs: [
      { label: "Top", value: "Torrefied Sitka spruce" },
      { label: "Back & sides", value: "East Indian rosewood" },
      { label: "Neck", value: "Mahogany, dovetail joint" },
      { label: "Scale", value: "25.4\" / 645 mm" },
      { label: "Electronics", value: "Auric Aura mic-blend system" },
      { label: "Nut width", value: "44.5 mm / 1.75\"" },
      { label: "Weight", value: "2.2 kg / 4.9 lbs" },
      { label: "Case", value: "Humidified hardshell" },
    ],
    materials: [
      { name: "Sitka Spruce", part: "Top", note: "Torrefied, tap-tuned" },
      { name: "Indian Rosewood", part: "Back & sides", note: "Book-matched" },
      { name: "Bone & Abalone", part: "Nut & inlay", note: "Hand-cut" },
    ],
    features: [
      "Torrefied tap-tuned top",
      "Hand-scalloped X bracing",
      "Mic-blend pickup system",
      "Beveled armrest",
    ],
  },
  {
    id: "p6",
    slug: "nocturne-lowline",
    name: "Nocturne Lowline",
    tagline: "Gravity, amplified",
    category: "bass",
    collection: "nocturne",
    shape: "offset",
    price: 529900,
    rating: 4.8,
    reviews: 89,
    stock: "in-stock",
    finishes: [
      f("graphite", "Graphite Mist", "#6a6a74", "#2e2e36", "#0c0c10", "black"),
      f("deep-sea", "Deep Sea", "#3a6a8a", "#14304a", "#050e18", "chrome"),
    ],
    description:
      "A 34-inch scale bass with a sculpted offset body, active 3-band EQ and a low end you feel in your sternum.",
    story:
      "Designed with touring bassists who asked for one thing: a five-hour set with zero fatigue. The Lowline's balance point sits exactly where physics says it should.",
    specs: [
      { label: "Body", value: "Swamp ash, sculpted" },
      { label: "Neck", value: "Maple-bubinga 7-ply, through-body" },
      { label: "Fingerboard", value: "Ebony, 24 frets" },
      { label: "Scale", value: "34\" / 864 mm" },
      { label: "Pickups", value: "Auric Deep-Field soapbars" },
      { label: "Electronics", value: "Active 3-band EQ, 18v" },
      { label: "Weight", value: "4.1 kg / 9.0 lbs" },
      { label: "Case", value: "Padded gig bag + hardshell" },
    ],
    materials: [
      { name: "Swamp Ash", part: "Body", note: "Two-piece, resonant" },
      { name: "Bubinga", part: "Neck laminates", note: "Stiff, punchy attack" },
      { name: "Ebony", part: "Fingerboard", note: "Fast, bright" },
    ],
    features: [
      "Neck-through construction",
      "18-volt active preamp",
      "Deep-Field soapbar pickups",
      "Perfect-balance body",
    ],
  },
  {
    id: "p7",
    slug: "custom-one-of-one",
    name: "Atelier One-of-One",
    tagline: "Yours. Only yours.",
    category: "custom-shop",
    collection: "vanguard",
    shape: "hollow",
    price: 1899900,
    rating: 5.0,
    reviews: 12,
    stock: "made-to-order",
    limited: true,
    finishes: [
      f("bespoke", "Bespoke", "#c9a86b", "#8a6c38", "#33260e"),
    ],
    description:
      "A fully bespoke commission. You choose the woods, the voice, the inlay story. Our master builder builds exactly one.",
    story:
      "Every One-of-One begins with a conversation and ends, ten months later, with an instrument that exists nowhere else on Earth. Includes two atelier visits and a signed build journal.",
    specs: [
      { label: "Body", value: "Client-selected tonewoods" },
      { label: "Neck", value: "Hand-carved to your hand" },
      { label: "Fingerboard", value: "Your choice, custom inlay" },
      { label: "Scale", value: "Custom" },
      { label: "Pickups", value: "Voiced to your reference tracks" },
      { label: "Hardware", value: "Gold, nickel or black" },
      { label: "Build time", value: "10 months" },
      { label: "Includes", value: "Build journal, atelier visits" },
    ],
    materials: [
      { name: "Your Selection", part: "All", note: "Chosen from our vault" },
    ],
    features: [
      "Master-builder commission",
      "Custom inlay artwork",
      "Voiced pickups",
      "Signed build journal",
    ],
  },
  {
    id: "p8",
    slug: "aurora-daybreak",
    name: "Aurora Daybreak",
    tagline: "First light, first chord",
    category: "acoustic",
    collection: "aurora",
    shape: "acoustic",
    price: 379900,
    compareAt: 419900,
    rating: 4.7,
    reviews: 244,
    stock: "in-stock",
    isNew: true,
    finishes: [
      f("dawn", "Dawn Gold", "#f0d494", "#cfa050", "#6e4418"),
      f("dusk-rose", "Dusk Rose", "#d49a8a", "#a05a4a", "#3d1a12"),
    ],
    description:
      "A parlor-sized acoustic with a surprisingly huge voice — solid cedar top, walnut back, and an armrest bevel that disappears into you.",
    story:
      "The Daybreak was tuned for songwriters' desks and sunrise balconies. Small enough to live beside your sofa, serious enough to record with.",
    specs: [
      { label: "Top", value: "Solid Western red cedar" },
      { label: "Back & sides", value: "Black walnut" },
      { label: "Neck", value: "Mahogany, satin" },
      { label: "Scale", value: "24.9\" / 632 mm" },
      { label: "Electronics", value: "Auric Whisper under-saddle" },
      { label: "Nut width", value: "43 mm / 1.69\"" },
      { label: "Weight", value: "1.9 kg / 4.2 lbs" },
      { label: "Case", value: "Premium gig bag" },
    ],
    materials: [
      { name: "Red Cedar", part: "Top", note: "Warm, immediate response" },
      { name: "Black Walnut", part: "Back & sides", note: "Focused midrange" },
      { name: "Mahogany", part: "Neck", note: "Satin, fast" },
    ],
    features: [
      "Parlor body, big voice",
      "Armrest bevel",
      "Under-saddle pickup",
      "Songwriter scale length",
    ],
  },
];

export const collections = [
  {
    id: "aurora",
    name: "Aurora",
    line: "Instruments of first light",
    description: "Warm bursts, golden hardware, sunrise voicing.",
  },
  {
    id: "nocturne",
    name: "Nocturne",
    line: "Built for midnight stages",
    description: "Satin blacks, active voices, surgical precision.",
  },
  {
    id: "heritage",
    name: "Heritage",
    line: "The golden era, perfected",
    description: "Vintage souls with sixty years of quiet improvement.",
  },
  {
    id: "vanguard",
    name: "Vanguard",
    line: "The future has six strings",
    description: "Radical geometry, aerospace materials, new voices.",
  },
] as const;

export const categories = [
  { id: "electric", name: "Electric", count: products.filter(p => p.category === "electric").length },
  { id: "acoustic", name: "Acoustic", count: products.filter(p => p.category === "acoustic").length },
  { id: "bass", name: "Bass", count: products.filter(p => p.category === "bass").length },
  { id: "custom-shop", name: "Custom Shop", count: products.filter(p => p.category === "custom-shop").length },
] as const;

export const testimonials = [
  {
    quote:
      "I've played instruments for thirty years. The Solstice is the first one that felt like it was playing me back.",
    name: "Maya Reyes",
    role: "Session guitarist, Los Angeles",
  },
  {
    quote:
      "The Eclipse disappears on stage. No glare, no weight, no compromise. Just the note you meant.",
    name: "Jonas Feld",
    role: "Touring artist, Berlin",
  },
  {
    quote:
      "My Atelier commission took ten months. I would have waited ten years. It is, simply, mine.",
    name: "A. Okafor",
    role: "Composer, London",
  },
  {
    quote:
      "The Heritage 1959 has the neck I've chased through forty vintage shops. It was here all along.",
    name: "Sam Delacroix",
    role: "Collector, Nashville",
  },
];

export const artists = [
  { name: "Maya Reyes", genre: "Neo-soul", instrument: "Aurora Solstice" },
  { name: "Jonas Feld", genre: "Post-rock", instrument: "Nocturne Eclipse" },
  { name: "The Hollow Suns", genre: "Indie folk", instrument: "Grand Atelier" },
  { name: "Vera Lin", genre: "Progressive", instrument: "Vanguard Prism" },
  { name: "Delta Mode", genre: "Electronic", instrument: "Nocturne Lowline" },
];

export const faqs = [
  {
    q: "How long does a made-to-order instrument take?",
    a: "Standard made-to-order builds ship in 8–12 weeks. Custom Shop One-of-One commissions take approximately 10 months, including two atelier consultations.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship to 60+ countries with fully insured, climate-controlled freight. Every instrument is set up for your destination's humidity before it leaves the atelier.",
  },
  {
    q: "What does the lifetime warranty cover?",
    a: "Every AURIC instrument carries a transferable lifetime warranty covering materials and workmanship, including free annual setups at any of our ateliers.",
  },
  {
    q: "Can I return an instrument?",
    a: "You have 30 days with any stock instrument. If it isn't the one, return it in original condition for a full refund. Custom commissions are non-returnable but infinitely adjustable.",
  },
  {
    q: "Are your woods sustainably sourced?",
    a: "All tonewoods are FSC-certified or reclaimed. For every instrument sold we fund the planting of 100 trees through our Forest Forward program.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes — 0% APR financing over 12, 24 or 36 months is available at checkout for qualified customers in most regions.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
