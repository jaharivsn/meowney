# Stitch color ground truth (project 16777229921405218590)

Source: Stitch MCP `get_project` + `list_design_systems` + screen HTML Tailwind configs
(`stitch-exports/html/*.html`), fetched 2026-08-06.

## Brand accents

| Token | Hex | Role |
|-------|-----|------|
| Sakura Pink | `#FFB7C5` | CTAs, active nav, brand presence |
| Cream Milk | `#FFFDD0` | Cards / financial containers |
| Mint Fresh | `#A3E4D7` | Growth / success |
| Lavender | `#D7BDE2` | Info badges / tags |
| Soft Charcoal | `#2B2B2B` | Emphasis text on pastel |
| Surface Off-White | `#FAF9F6` | Alternate base layer |

## Material / screen tokens (exact namedColors)

| Token | Hex |
|-------|-----|
| background / surface / surface_bright | `#fcf9f8` |
| on_background / on_surface | `#1b1c1c` |
| on_surface_variant | `#514345` |
| outline | `#837375` |
| outline_variant | `#d6c2c4` |
| primary / surface_tint | `#864e5a` |
| primary_container | `#ffb7c5` |
| on_primary_container | `#7b4551` |
| on_primary_fixed | `#360c19` |
| on_primary_fixed_variant | `#6b3743` |

## Screen usage pattern

- Page bg: `bg-background` (`#fcf9f8`) — cream cards pop
- Cards: `bg-cream-milk`
- Primary button: `bg-sakura-pink` + `text-soft-charcoal` (or `text-on-primary-fixed`)
- Labels / links: `text-primary` (`#864e5a`)
- Body emphasis: `text-soft-charcoal`
- Secondary copy: `text-on-surface-variant`

## Exported assets

See `stitch-exports/*.png` and `stitch-exports/html/`.
