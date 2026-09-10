# Third-Party Licenses

This project's own code is proprietary (see `LICENSE`). The following
third-party assets are bundled in this repository and remain under their
own licenses — they are **not** covered by SEVIMA's proprietary license.

## Instrument Sans (font)

- **Location:** `assets/fonts/InstrumentSans/`
- **Copyright:** 2022 The Instrument Sans Project Authors
  (https://github.com/Instrument/instrument-sans)
- **License:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Full license text:** `assets/fonts/InstrumentSans/OFL.txt`
- **Source:** sourced from SEVIMA's Quantum design system
  (`D:\laragon\QUANTUM\pwa-laravel\public\fonts\InstrumentSans`), which in
  turn bundles the font as distributed via Google Fonts.

The OFL permits bundling, embedding, and redistributing the font (including
in a proprietary product) as long as the font itself is not sold on its own
and the license text travels with it — both conditions are met here.

## Tailwind CSS

- **License:** MIT
- **Copyright:** Tailwind Labs, Inc.
- Used as a build dependency (`devDependencies` in `package.json`) to
  compile `src/input.css` into `dist/output.css`. Not bundled as source in
  this repository beyond the generated CSS output, which is a compiled
  artifact of this project's own token/component definitions.

## Icons

All icons used in `index.html` and `dashboard.html` are hand-authored inline
SVG (outline style, stroke-based), not sourced from a third-party icon
library requiring attribution.
