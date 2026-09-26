---
version: 2.0
name: Equinoia-design-system
description: A dark, monochrome marketing site for Equinoia, a local-first Windows reference manager. The system anchors on a near-black canvas with a serif display face (Fraunces) for headlines, and a native system-font sans (SF Pro on Mac/iOS via -apple-system, matched natively on other platforms) for body copy, with an off-white accent used for CTAs and highlights instead of a hue. The one deliberate exception is the app-window mockup's own "content" (photo/palette/texture tiles), which keeps real color to read as the user's actual colorful reference library inside an otherwise monochrome shell.

colors:
  bg: "#0E0E0D"
  bg-alt: "#161614"
  paper: "#1F1F1C"
  ink: "#F3F2EE"
  ink-soft: "#A8A59C"
  ink-faint: "#706D66"
  line: "rgba(255,255,255,0.12)"
  line-soft: "rgba(255,255,255,0.07)"
  accent: "#F3F2EE"
  accent-dark: "#D6D4CC"
  accent-soft: "rgba(243,242,238,0.10)"
  teal: "#8C8A82"
  dark-bg: "#000000"
  dark-bg-alt: "#0C0C0B"
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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Inter', Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    note: "Native system font: SF Pro on Mac/iOS, Segoe UI on Windows, Roboto on Android, Inter as the loaded-web-font fallback everywhere else. SF Pro itself is never embedded — Apple's license doesn't permit distributing it as a web font."
  body-lead:
    fontFamily: "{typography.body-md.fontFamily}"
    fontSize: "1.04rem–1.12rem"
    fontWeight: 400
    lineHeight: 1.55
    note: "hero-sub, feature-copy p, pricing-head p"
  label-sm:
    fontFamily: "{typography.body-md.fontFamily}"
    fontSize: 0.9rem
    fontWeight: 500
  kicker:
    fontFamily: "{typography.body-md.fontFamily}"
    fontSize: 0.8rem
    fontWeight: 700
    letterSpacing: 0.06em
    textTransform: uppercase
  caption:
    fontFamily: "{typography.body-md.fontFamily}"
    fontSize: "0.66rem–0.85rem"
    fontWeight: 400-600
  button:
    fontFamily: "{typography.body-md.fontFamily}"
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
  card: "0 1px 2px rgba(0,0,0,0.4), 0 14px 30px -12px rgba(0,0,0,0.55)"
  window: "0 30px 80px -20px rgba(0,0,0,0.7), 0 6px 18px -6px rgba(0,0,0,0.5)"

components:
  btn-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    hoverBackground: "{colors.accent-dark}"
    rounded: pill
    padding: "12px 22px"
    note: "Off-white fill with dark text, the site's only high-contrast button. Never pair a light accent background with light text."
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
    note: "Used on the true-black surfaces (dark-bg) only."
  btn-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
  eyebrow-pill:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-dark}"
    rounded: pill
    fontSize: 0.82rem
    fontWeight: 600
    note: "Legacy token, superseded by hero-frame-tag in the hero itself but still the pattern for any future inline eyebrow pill elsewhere on the page."
  hero-frame:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line}"
    rounded: 32px
    shadow: "{shadows.card}"
    note: "The whole hero is one large rounded card (structure adapted from an IntegratedBio/Mobbin reference the user provided): a floating tag+dot pill top-left, the headline, the real app-window mockup as the card's central visual (recessed to {colors.bg}, not {colors.paper}, so it reads as a well inset into the card), then a bottom bar with supporting copy left and CTAs right. This pattern is scoped to the hero only — don't extend the framed-card treatment to other sections without being asked."
  hero-frame-tag:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-soft}"
    rounded: pill
    typography: "{typography.kicker}"
    note: "Small pill with a leading {tag-dot} (6px circle, accent-colored, soft accent-soft halo). Floats at the top of hero-frame, replacing the old standalone eyebrow pill."
  hero-cta-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: pill
    note: "Primary hero CTA: pill with left-padded label text and a trailing circular badge (cta-arrow: {colors.bg} fill, {colors.accent} arrow glyph) — an inverted-contrast accent nested inside the pill, echoing the reference's dark-pill-plus-light-circle pairing but flipped for this site's light-on-dark primary button convention."
  app-window-mockup:
    backgroundColor: "{colors.bg}"
    shadow: "none (border only, per {colors.line})"
    rounded: 14px
    note: "The hero's signature visual — a fake app titlebar + sidebar + masonry tile grid. Now nested inside hero-frame rather than floating on its own, so it sits on {colors.bg} (recessed) instead of {colors.paper} (would blend into the frame) and carries no shadow of its own. The chrome (titlebar, sidebar, cards) is monochrome; the tile CONTENT (photo gradients, palette swatches, texture) stays in real color deliberately, representing the user's actual colorful reference library inside the app."
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
    shadow: "0 1px 2px rgba(0,0,0,0.3), 0 24px 48px -20px rgba(243,242,238,0.14)"
    note: "Featured plan is signaled by an off-white ribbon + border + soft white glow, not a color/surface inversion."
  dark-panel:
    backgroundColor: "{colors.dark-bg}"
    textColor: "{colors.cream}"
    note: "privacy section — true black, a step darker than the page's base {colors.bg}, faint white radial glow at low opacity, holds a fake filetree card (dark-bg-alt)."
  cta-band:
    backgroundColor: "{colors.dark-bg}"
    textColor: "{colors.cream}"
    note: "Final CTA reuses {colors.dark-bg} (true black), the same deepest tone as the privacy section — the page's two 'punctuation' moments, not adjacent to each other so the repetition reads as a deliberate device, not a rhythm break."
  faq-item:
    backgroundColor: "{colors.paper}"
    border: "1px solid {colors.line}"
    rounded: m
  nav:
    backgroundColor: transparent
    note: "Sticky, no fill of its own — .nav-inner runs mix-blend-mode: difference so the logo/links/buttons invert against whatever scrolls underneath."
---

## Overview

Equinoia's marketing site is dark and monochrome: a near-black canvas
(`{colors.bg}` — #0E0E0D), off-white ink text (`{colors.ink}` —
#F3F2EE), and an off-white accent (`{colors.accent}`, the same value as
`{colors.ink}`) used for primary buttons, the logo mark, check-list
dots, and active states, instead of a hue. There is no brand color in
the traditional sense: contrast and value (light vs. dark) carry the
hierarchy that a saturated accent used to.

The one deliberate exception is the app-window mockup's tile grid: the
photo-gradient, palette-swatch, and texture tiles keep their real
color. That's intentional, not an oversight — it reads as "your actual
colorful reference library, inside a restrained monochrome tool,"
and it's the single moment of color on the page. Don't desaturate it
and don't add color anywhere else to compensate.

Headlines run **Fraunces** (serif, weight 600, tight `-0.01em`
tracking). Body copy runs the **native system sans** (SF Pro on
Mac/iOS via `-apple-system`/`BlinkMacSystemFont`, Segoe UI on Windows,
Roboto on Android, with the loaded Inter web font as the fallback on
anything else) — do not swap in another product's exact hex codes,
wordmark, or licensed typefaces when iterating here. SF Pro itself is
never bundled as a web font asset; Apple's license doesn't allow
distributing it that way, so the only correct way to get it is the OS
substituting it in for the system-font keywords on Apple devices.

The page alternates surfaces for pacing, now all dark, distinguished by
value rather than hue:
1. **Base dark canvas** (`{colors.bg}`) — hero, feature rows, stats
2. **Elevated dark cards** (`{colors.paper}`) — the app-window mockup, feature visuals, stat tiles, price cards, FAQ items
3. **True black** (`{colors.dark-bg}`) — the privacy section and the final CTA band, the page's two darkest "punctuation" moments
4. **Soft dark** (`{colors.bg-alt}`) — footer

## Logo mark

A 2×2 grid of rounded squares (`logo-mark` SVG in the nav): top-left
and bottom-right squares solid `currentColor` (now off-white, was
terracotta), top-right and bottom-left at 35-40% opacity. Paired with
the "Equinoia" wordmark in Fraunces 600. This is the site's own mark —
do not substitute a different glyph system (e.g. an asterisk/spike
mark) when redesigning, and don't reintroduce color into it.

## Colors

- **Accent / Accent Dark** (`{colors.accent}` / `{colors.accent-dark}` — #F3F2EE / #D6D4CC): off-white, not a hue. The site's only "loud" values, used for primary buttons, the logo, check-list dots, active states, price highlight border. `accent-dark` is the hover/press state (dims slightly toward gray) and the kicker text color.
- **Teal** (`{colors.teal}` — #8C8A82): a desaturated gray, formerly a teal hue. Used only for the tag-pill in the search mockup. Keep it that scarce.
- **Ink / Ink Soft / Ink Faint**: three-step text hierarchy on dark surfaces (#F3F2EE / #A8A59C / #706D66), lightest to dimmest.
- **Cream / Cream Soft**: text on the true-black surfaces (#F3EEE3 and 68%-alpha variant) — unchanged from before the conversion, since those sections were already dark.
- **Dark Bg / Dark Bg Alt**: true black and its slightly-elevated card tone (#000000 / #0C0C0B), a step darker than the page's base `{colors.bg}`. Used for the privacy section and the final CTA band.
- **Content color exception**: the app-window mockup's tile grid (`.t-shot`, `.t-palette`, `.t-texture` swatches) keeps real, varied color. This is the one place hue is allowed — see Overview.

## Typography

- Display: **Fraunces**, weight 600 only, tight negative tracking (`-0.01em`). Used for h1/h2, price amounts, and stat numbers.
- Body: **native system sans** (SF Pro on Mac/iOS, Segoe UI on Windows, Roboto on Android, Inter as the web-font fallback elsewhere), weight 400 for paragraphs, 500–700 for labels/kickers/buttons.
- Kickers (`{typography.kicker}`) are small, bold, uppercase, wide-tracked, colored `{colors.accent-dark}`.
- Never bold the Fraunces display weight beyond 600.

## Layout

- Max content width `{spacing.container}` (1180px), centered, 24px side padding.
- Feature rows: 2-column grid (copy + visual), alternating order (`.feature-row.reverse`), collapsing to 1 column under 980px.
- Section vertical rhythm is generous and uneven by design (72px hero top, 100–120px major sections) — match the nearest existing section's padding rather than inventing a new value.

## Elevation

- `{shadows.card}` / `{shadows.window}` are now black-based (`rgba(0,0,0,...)`), since a light-tinted shadow doesn't read on a dark canvas. Card definition on dark surfaces comes primarily from the 1px light-alpha `{colors.line}` border, with the shadow reinforcing depth rather than doing all the work.
- Hover states add a soft off-white glow (`rgba(243,242,238,0.14-0.18)`) on the featured price card only, to reinforce its "elevated/chosen" status without reintroducing color.

## Do's and Don'ts

### Do
- Keep the accent achromatic — off-white for emphasis, never a hue, anywhere in the site chrome.
- Let the app-window mockup's tile content stay colorful; it's the intentional single exception, not a loophole to widen.
- Use Fraunces for anything that needs to feel like a headline or a "big number" (price, stat); use the system-sans body stack for everything else.
- Alternate base-dark → elevated-card → true-black → soft-dark for section pacing; the two true-black sections (privacy, final CTA) are not adjacent, so reusing the same tone for both reads as a deliberate bookend, not a mistake.
- Reuse the existing radius scale (`{rounded.s..xl}`, plus `pill`) instead of introducing new radii.
- When pairing an off-white background with text (buttons, ribbons), always use a dark text color (`{colors.bg}`), never white-on-white.

### Don't
- Don't introduce a second saturated accent color anywhere in the chrome; `{colors.teal}` stays a desaturated one-off, not a second brand color.
- Don't desaturate the mockup's tile content to "match" the monochrome shell; the contrast is the point.
- Don't copy another product's exact typeface, color values, or logo mark onto this site, even structurally-similar ones — Fraunces, the system-sans body stack, and the 2×2 mark are Equinoia's own identity.
- Don't add colored/tinted shadows; all elevation on the dark canvas is black-based, with an off-white glow reserved for the one "featured" moment (price-card-highlight).
- If a future full-screen decorative animation is added, don't regenerate it from scratch every frame — a large-area synchronized flash is a genuine photosensitive-seizure risk, not just a performance concern. Use desynchronized, rate-limited change per element instead.
- Don't try to embed "SF Pro" as a downloadable web font file; Apple's license doesn't permit it. The system-font stack (`-apple-system`, `BlinkMacSystemFont`) is the only correct way to render it on the web.
- Don't extend the hero-frame's rounded-card treatment to other sections without being asked; it was scoped deliberately to the hero when adapting a reference site's layout. Feature rows, pricing, FAQ, etc. keep their existing flat/card patterns.

## Known gaps

- No component library/CSS framework — this is hand-written CSS in `css/styles.css` against custom properties in `:root`. Any new component should follow that pattern (define via `var(--token)`, not new hex values).
- No light-mode toggle; the site is dark-only by design, not a theme with two states.
- No documented empty/error/loading states — the site is marketing-only, no app screens beyond the illustrative mockups.
