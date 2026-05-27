# sivapanyam.dev // Visual Brand Identity Manual

Welcome to the official visual identity specifications manual for **sivapanyam.dev**. This document serves as the single source of truth for the brand's aesthetic direction, logo architectures, layout systems, responsive rules, and interactive assets.

---

## 1. Brand Core & Strategy

The brand identity combines a **monochrome, futuristic, and developer-oriented aesthetic** with abstract generative geometry, reflecting a passion for building AI infrastructure and scalable distributed platforms.

### Core Pillars
* **Neural Intelligence**: The design patterns should always evoke neural pathways, connections, dimensional mathematics, and latent folding spaces.
* **Futuristic Precision**: Fine lines, drafting grids, and mathematical notations represent precision-engineered system architectures.
* **Premium Developer Focus**: Standardized dark layouts, clean typography, code block structures, and rich micro-animations create an interface that feels highly optimized and cohesive to engineers and technical recruiters.

---

## 2. The "Neural Lattice" Logo Symbol

The primary corporate mark is the **Neural Lattice** (also known as the *Synapse Core*). It is designed strictly on geometric grids to allow infinitely sharp vector rendering at all sizes.

```
       .---.          <- Concentric dashed outer orbits
      /     \
     |   O   |        <- Primary star lattice connection
      \     /
       '---'          <- Singularity Core (radial glow core)
```

### Logo Variants

| File Name | Placement | Purpose / Usage | Sizing Target |
| :--- | :--- | :--- | :--- |
| [`favicon.svg`](file:///c:/Users/sivap/OneDrive/Desktop/Portfolio/frontend/public/favicon.svg) | Browser Tab & Manifest | Simplified high-contrast silhouette for perfect 16px/32px legibility. | `16px` to `64px` |
| [`logo-icon.svg`](file:///c:/Users/sivap/OneDrive/Desktop/Portfolio/frontend/src/assets/logo-icon.svg) | Page Headers / Core pulse | Standalone brand symbol with standard double orbits and detailed meshes. | `64px` to `256px` |
| [`logo-full.svg`](file:///c:/Users/sivap/OneDrive/Desktop/Portfolio/frontend/src/assets/logo-full.svg) | Hero Sections / Official branding | Horizontal typographic lockup. Pairs the symbol with custom geometric weight Outfit title. | `240px` to `900px` width |
| [`logo-blueprint.svg`](file:///c:/Users/sivap/OneDrive/Desktop/Portfolio/frontend/src/assets/logo-blueprint.svg) | Technical Overlays / Sandboxes | Detailed architectural wireframe showing angles, grids, axes, and coordinate indicators. | `128px` to `512px` |

### Exclusion Zones & Sizing Rules
1. **Exclusion Zone**: Always maintain an exclusion space of at least **25% of the logo's height** on all four sides to prevent visual noise.
2. **Alignment**: When used in headers, the logo icon should align perfectly to the top-left margin of the grid system.

---

## 3. Typographic System

We utilize a hybrid typeface pairing that bridges clean premium consumer engineering with precise developer tools:

### Primary Heading Font: **Outfit**
* **Aesthetics**: Highly geometric sans-serif, inspired by technical drafting and premium corporate platforms.
* **Header Scale Hierarchy**:
  * `h1` (Main Hero title): `56px` / Line Height: `100%` / Tracking: `-0.03em` (Compressed Outfit Bold)
  * `h2` (Section headers): `24px` / Line Height: `120%` / Tracking: `0.15em` (Wide Uppercase Outfit Regular)
  * `h3` (Component headers): `16px` / Line Height: `130%` / Tracking: `0.05em` (Outfit Bold)

### Monospace Code Font: **JetBrains Mono** / System Mono
* **Aesthetics**: Highly legible, uniform width, and visually familiar to programmers.
* **Code Scale Hierarchy**:
  * `code` (Input terminals): `13px` / Line Height: `135%` / Tracking: `normal`
  * `labels` (System status widgets): `10px` / Line Height: `110%` / Tracking: `0.2em` (Uppercase, medium weight)

---

## 4. Color & Swatch Variables

The brand operates in a **high-contrast monochrome scheme**, adapting seamlessly to standard light/dark web rules and an interactive developer green overlay.

```
+-------------------------------------------------------------------------+
|  01 Onyx Absolute  |  02 Carbon Zinc   |  03 Infrastructure  |  04 Polar  |
|  #000000           |  #09090B          |  #71717A            |  #FFFFFF   |
|  (Canvas Base bg)  |  (Container Fill) |  (Grids & Muted t)  |  (Headings)|
+-------------------------------------------------------------------------+
|  05 Matrix Neon    |  06 Deep Forest   |
|  #39FF14           |  #15803D          |
|  (Dev Mode Accent) |  (Dev Mode Sub)   |
+--------------------+-------------------+
```

### HSL & Variable Mapping
* **Base Background**: `hsl(0, 0%, 0%)` // `#000000`
* **Card Surface**: `rgba(9, 9, 11, 0.4)` (Zinc-950 at 40% opacity)
* **Glass Panel Surface**: `rgba(9, 9, 11, 0.75)` with `backdrop-filter: blur(12px)`
* **Active Accent (Normal)**: `hsl(0, 0%, 100%)` // `#FFFFFF`
* **Active Accent (Dev Mode)**: `hsl(100, 100%, 54%)` // `#39FF14`

---

## 5. Spacing Grid System

All structural components must conform strictly to a **mathematical grid built on multiples of 8px** (with 4px adjustments for micro-spacers):

```
Spacing Factor: 4px | 8px | 16px | 24px | 32px | 48px | 64px | 96px | 128px
Layout Token:   -   | sm  | md   | lg   | xl   | 2xl  | 3xl  | 4xl  | 5xl
```

### Layout Implementation Guidelines
* **Section Padding**: Always separate sections on the vertical axis using `py-24` (96px) or `py-36` (144px).
* **Grid Gaps**: Interactive lists and layouts must utilize `gap-6` (24px) or `gap-8` (32px) to prevent element overlapping.
* **Component Padding**: Inside glass panels, use `p-6` (24px) on desktop and `p-4` (16px) on mobile viewports.

---

## 6. Motion & Animation Presets

Transitions are the heart of the interactive portfolio, providing a smooth, high-fidelity tactile feedback loop.

### Transition Timing Presets
* **Standard hover duration**: `150ms` (snappy response for buttons and links)
* **Card expansions & transitions**: `300ms`
* **Cinematic mounts / boot sequence fade-outs**: `800ms`

### Easing Formulas
We utilize two primary animation behaviors via CSS or Framer Motion:

1. **Cinematic Ease-Out**: A gorgeous, friction-heavy deceleration curve for pages and containers:
   ```css
   transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
   ```
2. **Snappy Dock Spring**: A bouncy, physics-based spring loop for navbar magnifications:
   ```typescript
   { type: "spring", stiffness: 400, damping: 28 }
   ```

### Logo Rotation Guidelines
* **Outer Ring**: Clockwise spin, complete 360-degree rotation every **35-40 seconds**.
* **Inner Ring**: Counter-clockwise spin, complete 360-degree rotation every **15-20 seconds**.
* **Hover Interaction**: On hover, reduce the rotation cycle duration to **12 seconds** (outer) and **6 seconds** (inner) with a spring stretch multiplier of `1.04` to create an active "compiling/processing" feedback.

---

## 7. UI Elevation Tiers

We establish three distinct elevation panels over the absolute black base canvas:

### Level 01: Low-Priority Layout Cards
* **Style**: `bg-zinc-950/40 border border-zinc-900`
* **Usage**: Inactive grid items, timeline containers, skill lists.

### Level 02: Floating Widgets & Navbar
* **Style**: `bg-zinc-950/75 backdrop-blur-xl border border-zinc-800 shadow-[0_0_35px_-5px_rgba(255,255,255,0.08)]`
* **Usage**: Persistent overlay panels, float widgets, global Dock navigation bar.

### Level 03: Modal Focus Focus
* **Style**: `bg-zinc-950/95 backdrop-blur-2xl border border-zinc-700 shadow-[0_0_50px_-5px_rgba(255,255,255,0.12)]`
* **Usage**: Deep detail modal dialogs, primary terminal shell overlays.

---

*Document compiled successfully. Stable state resolved.*
*Bangalore Edge Node. Copyright © 2026 sivapanyam.dev*
