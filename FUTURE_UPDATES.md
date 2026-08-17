# AURIC — Future Updates & Architectural Blueprint

> **Master Specification, Design System, Motion Guidelines & Roadmap Document**  
> *Targeting Awwwards Site of the Year, FWA of the Day, and CSS Design Awards.*

---

## 1. Executive Summary & Vision

AURIC is a next-generation luxury guitar e-commerce platform built for players, collectors, and master luthiers. Designed with an ultra-premium dark aesthetic, gold-leaf accents, 3D real-time rendering, procedural canvas materials, Web Audio synthesis, and 60 FPS Framer Motion micro-interactions, AURIC redefines luxury digital retail.

---

## 2. Technical Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router with Turbopack & React 19) |
| **Styling & Tokens** | Tailwind CSS v4 + Inline Theme Design Tokens |
| **3D Rendering** | Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`) |
| **Motion & FX** | Framer Motion + GSAP ScrollTrigger + Lenis Smooth Scroll |
| **Audio Engine** | Custom Web Audio API Tone Synthesizer & Impulse Response Sampler |
| **State Management**| Zustand (Persisted Cart, Wishlist, Bespoke Custom Builds & Audio State) |
| **Icons** | Lucide React |

---

## 3. Design System Tokens

```css
:root {
  --background: #09090b;       /* Deep Obsidian Night */
  --surface: #101014;          /* Matte Charcoal Surface */
  --surface-2: #17171d;        /* Elevated Slate */
  --surface-3: #1f1f27;        /* Highlight Border Layer */
  --foreground: #f4f1e8;       /* Aged Parchment */
  --muted: #9b958a;            /* Muted Warm Brass */
  --gold: #c9a86b;             /* Auric Liquid Gold */
  --gold-light: #ecd5a4;       /* Champagne Foil */
  --gold-deep: #8a6c38;        /* Aged Bronze */
  --ember: #c96b4a;            /* Sunburst Crimson */
  --line: rgba(244, 241, 232, 0.09);
  --glass: rgba(16, 16, 20, 0.55);
}
```

---

## 4. Key Platform Features & Modules

### 4.1. Bespoke 3D Custom Shop Configurator (`/custom-shop`)
- **Real-Time 3D Procedural Studio**: Interactive canvas with 3D model rotation, zoom, camera tilt, and interactive lighting.
- **Finish Options**: Sunburst, Obsidian Black, Champagne Gold, Emerald Burst, Crimson Pearl, Vintage Natural Amber.
- **Tonewood Selection**: Flamed Maple, Honduran Mahogany, African Ebony, Roasted Flame Maple.
- **Pickups & Electronics**: HSS Custom Alnico, HH Gold Foil, Vintage P90s, active tone circuit.
- **Hardware Finish**: Brushed Gold, Chrome, Matte Black, Aged Nickel.
- **Personalized Neck-Plate Engraving**: Custom text engraved live onto 3D backplate.
- **Real Audio Tone Sampler**: Live audio preview switching between neck, middle, and bridge pickup settings.
- **Quote & Spec Sheet Generation**: Itemized build summary export and direct booking with master luthiers.

### 4.2. Web Audio Tone Sampler Engine (`ToneSamplerModal.tsx` & `audioEngine.ts`)
- Synthesizes realistic electric/acoustic waveforms directly inside the browser using Web Audio API oscillators, GainNodes, and Convolver filters.
- Tones included: *Clean Velvet*, *Crunch Overdrive*, *Liquid Solo Lead*, *Acoustic Ambient Shimmer*, *Warm Jazz Hollowbody*.
- Integrated across PDP, Product Cards, and Custom Shop.

### 4.3. Side-by-Side Instrument Comparison Studio (`/compare`)
- Spec matrix comparing up to 4 instruments concurrently.
- Compares: Body Tonewood, Neck Profile, Scale Length, Fret Wire, Pickups, Electronics, Weight, Price, and Stock Status.

### 4.4. PDP 360° Hotspot & Luthier Craft Explorer
- Interactive 360-degree hotspot pins on Product Detail Pages.
- Hotspot targets: Hand-wound Pickups, Bone Nut, Custom Tuners, Nitrocotton Finish Grain, Tone Capacitor, Chambered Body interior.

---

## 5. Future Roadmap & API Enhancements

- [ ] **Augmented Reality (AR) QuickLook Integration**: USDZ / GLTF exported 3D guitar models viewable directly in Apple AR QuickLook and WebXR Android Viewers.
- [ ] **Full Backend E-Commerce API (Stripe / Shopify Storefront API)**: Webhook order processing, real-time stock sync, and currency conversion.
- [ ] **Luthier Build Tracker (Client Portal)**: Real-time progress tracker with step-by-step photos of custom builds sent to customers during crafting.
- [ ] **AI Tonewood Acoustic Matcher**: Interactive questionnaire recommending tonewood combinations based on user playstyle and musical genre.

---

*Documentation Version: 2.0 | AURIC Atelier Digital Experience*
