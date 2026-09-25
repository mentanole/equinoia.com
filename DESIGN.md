---
version: 1.0
name: Equinoia-design-system
description: A warm paper-and-ink marketing site for Equinoia, a local-first Windows reference manager. The system anchors on a warm cream canvas with a serif display face (Fraunces) for headlines, a humanist sans (Inter) for body copy, and a burnt-terracotta accent used sparingly on CTAs and highlights. A deep warm-black section (not pure black) carries the "your files stay local" privacy pitch. Voice is calm, editorial, and understated — closer to a design-tool product page than a typical SaaS gradient landing page.

colors:
  bg: "#F7F4EE"
  bg-alt: "#EFEAE0"
  paper: "#FFFFFF"
  ink: "#1C1A16"
  ink-soft: "#58544A"
  ink-faint: "#8C8677"
  line: "rgba(28,26,22,0.12)"
  line-soft: "rgba(28,26,22,0.07)"
  accent: "#B84E1C"
  accent-dark: "#953D13"
  accent-soft: "#F0D9C4"
  teal: "#33534B"
  dark-bg: "#17140F"
  dark-bg-alt: "#211D16"
  cream: "#F3EEE3"
  cream-soft: "rgba(243,238,227,0.68)"

typography:
  display-hero:
    fontFamily: "Fraunces, 'Iowan Old Style', serif"
    fontSize: "clamp(2.3rem, 5.4vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.01em
  display-section:
    fontFamily: "Fraunces, 'Iowan Old Style', serif"
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.01em
  display-cta:
    fontFamily: "Fraunces, 'Iowan Old Style', serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.08
  display-number:
    fontFamily: "Fraunces, 'Iowan Old Style', serif"
    fontSize: "2.1rem–2.6rem"
    fontWeight: 600
    note: "Used for price amounts and stat numbers, not just headlines."
  body-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.04rem–1.12rem"
    fontWeight: 400
    lineHeight: 1.55
    note: "hero-sub, feature-copy p, pricing-head p"
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.9rem
    fontWeight: 500
  kicker:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.8rem
    fontWeight: 700
    letterSpacing: 0.06em
    textTransform: uppercase
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.66rem–0.85rem"
    fontWeight: 400-600
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 0.95rem
    fontWeight: 600

rounded:
  s: 6px
  m: 12px
  l: 20px
  xl: 28px
  pill: 999px

spacing:
  section-sm: 40px
  section-md: 80px
  section-lg: 100px
  section-xl: 120px
  card-padding: 30px-34px
  container: 1180px

shadows:
  card: "0 1px 2px rgba(28,26,22,0.06), 0 12px 28px -12px rgba(28,26,22,0.18)"
  window: "0 30px 70px -25px rgba(28,26,22,0.35), 0 4px 14px -6px rgba(28,26,22,0.18)"

components:
  btn-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    hoverBackground: "{colors.accent-dark}"
    rounded: pill
    padding: "12px 22px"
  btn-outline:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.line}"
    rounded: pill
  btn-outline-light:
    backgroundColor: transparent
    textColor: "{colors.cream}"
    border: "1px solid rgba(243,238,227,0.35)"
    rounded: pill
    note: "Used on dark surfaces only."
  btn-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
  eyebrow-pill:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-dark}"
    rounded: pill
    fontSize: 0.82rem
    fontWeight: 600
  app-window-mockup:
    backgroundColor: "{colors.paper}"
    shadow: "{shadows.window}"
    rounded: 14px
    note: "The hero's signature visual — a fake app titlebar + sidebar + masonry tile grid representing the product UI."
  feature-card-visual:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line}"
    rounded: l
    shadow: "{shadows.card}"
    note: "import-card, palette-mock — small product-chrome illustrations paired with each feature row."
  stat-tile:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line-soft}"
    rounded: m
    numberTypography: "{typography.display-number}"
  price-card:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line}"
    rounded: l
    shadow: "{shadows.card}"
  price-card-highlight:
    borderColor: "{colors.accent}"
    shadow: "0 1px 2px rgba(184,78,28,0.08), 0 24px 48px -20px rgba(184,78,28,0.35)"
    note: "Featured plan is signaled by an accent-colored ribbon + border glow, not a color/surface inversion."
  dark-panel:
    backgroundColor: "{colors.dark-bg}"
    textColor: "{colors.cream}"
    note: "privacy section — deep warm-black, radial accent glow at low opacity, holds a fake filetree card (dark-bg-alt)."
  cta-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    note: "Final CTA uses --ink (#1C1A16), a shade lighter/warmer than the privacy section's --dark-bg (#17140F) — the two darks are intentionally distinct, not reused."
  faq-item:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line}"
    rounded: m
  nav:
    backgroundColor: "rgba(247,244,238,0.82)"
    note: "Sticky, backdrop-blur, border appears only after scroll (.nav.scrolled)."
---

## Overview

Equinoia's marketing site reads as **paper, not glass** — a warm cream
canvas (`{colors.bg}` — #F7F4EE), off-black ink text (`{colors.ink}` —
#1C1A16), and a single burnt-terracotta accent (`{colors.accent}` —
#B84E1C) used sparingly: primary buttons, the logo mark, check-list dots,
active sidebar state, price ribbons. It is not the now-common
purple/blue-gradient AI-tool look — closer to an editorial or
design-tool product page.

Headlines run **Fraunces** (serif, weight 600, tight `-0.01em` tracking).
Body copy runs **Inter**. The serif/sans split is the same *shape* as a
lot of premium product marketing (serif display + humanist sans body),
but the values are the site's own — do not swap in another product's
exact hex codes, wordmark, or licensed typefaces when iterating here.

The page alternates surfaces for pacing:
1. **Cream canvas** (`{colors.bg}`) — hero, feature rows, stats
2. **White paper cards** (`{colors.paper}`) — the app-window mockup, feature visuals, stat tiles, price cards, FAQ items
3. **Deep warm-black** (`{colors.dark-bg}`) — the "your files stay local" privacy section
4. **Ink band** (`{colors.ink}`) — the final CTA, one shade warmer/lighter than the privacy section's black
5. **Soft cream** (`{colors.bg-alt}`) — footer

## Logo mark

A 2×2 grid of rounded squares (`logo-mark` SVG in the nav): top-left and
bottom-right squares solid `currentColor` (accent), top-right and
bottom-left at 35% opacity. Paired with the "Equinoia" wordmark in
Fraunces 600. This is the site's own mark — do not substitute a
different glyph system (e.g. an asterisk/spike mark) when redesigning.

## Colors

- **Accent** (`{colors.accent}` — #B84E1C): burnt terracotta/rust. The only saturated color on the page. Buttons, logo, check-list dots, active states, price highlight border.
- **Accent Dark** (`{colors.accent-dark}` — #953D13): hover/press state for accent buttons, kicker text.
- **Accent Soft** (`{colors.accent-soft}` — #F0D9C4): eyebrow pill background, inline `<code>` background.
- **Teal** (`{colors.teal}` — #33534B): a single secondary accent, used only for the tag-pill in the search mockup. Keep it that scarce — do not promote it to a second primary color.
- **Ink / Ink Soft / Ink Faint**: three-step text hierarchy on light surfaces (#1C1A16 / #58544A / #8C8677).
- **Cream / Cream Soft**: text on dark surfaces (#F3EEE3 and 68%-alpha variant).
- **Dark Bg / Dark Bg Alt**: the privacy section's black and its elevated card tone (#17140F / #211D16) — distinct from `{colors.ink}`, which is used only for the final CTA band. Don't merge these two darks into one token; they read as intentionally different depths.

## Typography

- Display: **Fraunces**, weight 600 only, tight negative tracking (`-0.01em`). Used for h1/h2, price amounts, and stat numbers — the serif appears anywhere a number or headline needs weight, not just in `<h1>`/`<h2>` tags.
- Body: **Inter**, weight 400 for paragraphs, 500–700 for labels/kickers/buttons.
- Kickers (`{typography.kicker}`) are small, bold, uppercase, wide-tracked, and always colored `{colors.accent-dark}` — they mark the start of a feature row or section.
- Never bold the Fraunces display weight beyond 600; the system has no 700 serif usage.

## Layout

- Max content width `{spacing.container}` (1180px), centered, 24px side padding.
- Feature rows: 2-column grid (copy + visual), alternating order (`.feature-row.reverse`) to break monotony, collapsing to 1 column under 980px.
- Section vertical rhythm is generous and uneven by design (72px hero top, 100–120px major sections) rather than one fixed token — match the nearest existing section's padding rather than inventing a new value.

## Elevation

- `{shadows.card}` — soft, for paper cards on the cream canvas (price cards, feature visuals, stat tiles).
- `{shadows.window}` — heavier, reserved for the hero's app-window mockup only; it's the page's single "hero" elevation moment.
- Dark surfaces (`dark-panel`, `cta-band`) use no shadow — depth there comes from the color-block contrast against neighboring sections, same philosophy as the light side.

## Do's and Don'ts

### Do
- Keep `{colors.accent}` scarce — one primary color, used with intent (CTAs, active/highlight states), not decoratively.
- Use Fraunces for anything that needs to feel like a headline or a "big number" (price, stat); use Inter for everything else.
- Alternate cream → paper-card → dark-panel → ink-band → soft-footer for section pacing; don't stack two dark sections back to back.
- Reuse the existing radius scale (`{rounded.s..xl}`, plus `pill` for buttons/badges) instead of introducing new radii.
- Keep the logo mark and wordmark as-is when adding new instances of the brand (nav, footer, favicon).

### Don't
- Don't introduce a second saturated accent color; `{colors.teal}` stays a one-off detail, not a second brand color.
- Don't copy another product's exact typeface, color values, or logo mark onto this site, even structurally-similar ones — Fraunces/Inter/terracotta and the 2×2 mark are Equinoia's own identity.
- Don't collapse `{colors.dark-bg}` and `{colors.ink}` into a single dark token; they're deliberately two adjacent-but-different depths.
- Don't add drop shadows to the dark sections; the light-side elevation model (shadow-card/shadow-window) is a light-surface-only pattern here.

## Known gaps

- No component library/CSS framework — this is hand-written CSS in `css/styles.css` against custom properties in `:root`. Any new component should follow that pattern (define via `var(--token)`, not new hex values).
- No dark-mode toggle; the "dark" sections are fixed content blocks, not a theme.
- No documented empty/error/loading states — the site is marketing-only, no app screens beyond the illustrative mockups.
