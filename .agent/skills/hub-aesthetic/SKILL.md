---
name: hub-aesthetic
description: Instructions for implementing the 'Industrial Hub' aesthetic for Personal HUB, integrated with the user's specific Teal accent and Pixel-Art branding.
---

# Hub Aesthetic Skill

Use this skill when developing or refactoring the Personal HUB project. It combines high-tech industrial precision with a personal "Bem-vindo" pixel-art touch.

## Core Design Principles

### 1. Palette & Personal Branding
- **Base**: `bg-gray-50` or `#f8f9fa` for the page background.
- **Core Dark**: `bg-[#121212]` (Rich Deep Black) for navigation and header containers.
- **Brand Accent (Teal)**: `bg-[#49a296]` / `text-[#49a296]`. Use this for:
  - Active navigation indicators.
  - Call-to-action buttons.
  - Key status highlights (e.g., Shipping "In Transit").
- **Secondary Accent**: Soft Slate-Blues and muted Grays.

### 2. Branding & Logo
- **Logo**: The provided "Bem-vindo" pixel art head is the primary logo.
  - Placement: Top-left of the Dashboard or within a circular container in the Nav Bar.
  - Style: Sharp pixels (use `image-rendering: pixelated;` if scaling).
- **Greeting Style**: Use "Bem-vindo" in a monospace font specifically for user welcome sections to match the branding.

### 3. Typography Strategy
- **Headings**: Bold sans-serif (Inter/Geist) with `tracking-tight`. All caps (`uppercase`) for dashboard labels.
- **Technical Data**: **Monospace** (Geist Mono/JetBrains Mono) for IDs, timestamps, and metadata.
- **Body**: Clean, readable sans-serif at 13px-15px.

### 4. Layout & Geometry
- **High Curvatures**: Main cards must use `rounded-3xl` (24px).
- **Density**: Balance high information density with functional whitespace. Use technical sectioning (hairline borders) to separate data.
- **Contrast**: Bold transitions between white surfaces and deep black nav bars.

## Implementation Snippets (Tailwind)

### The "Personal Hub" Nav Item (Active)
```html
<div class="px-4 py-2 bg-[#49a296]/10 text-[#49a296] rounded-full border border-[#49a296]/20 font-bold">
  Dashboard
</div>
```

### Technical Section Label (Teal Tint)
```html
<span class="text-[10px] uppercase tracking-widest text-[#49a296] font-sans font-bold opacity-80">
  Technical Origin
</span>
```

### Brand Logo Container
```html
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800">
  <img src="/logo.png" class="w-full h-full object-cover" style="image-rendering: pixelated;" alt="Logo" />
</div>
```
