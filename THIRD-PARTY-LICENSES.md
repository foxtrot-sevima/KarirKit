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

## Icons (Phosphor Icons)

- **Location:** `assets/icons/{regular,thin,light,bold,fill,duotone}/`
  (self-hosted SVG source files — the canonical copy of each icon token,
  one per Phosphor weight; base64-encoded into the `.kk-*` CSS mask-image
  rules in `src/input.css`, used as `<i class="kk kk-name">` — add a
  `kk-thin`/`kk-light`/`kk-bold`/`kk-fill`/`kk-duotone` modifier class for
  a weight other than Regular — in `index.html`,
  `templates/dashboard.html`, and `templates/karirlink/index.html`)
- **Copyright:** 2023 Phosphor Icons
  (https://github.com/phosphor-icons/core)
- **License:** MIT

The MIT license permits bundling, embedding, and redistributing the icons
(including in a proprietary product) without attribution in the product UI
itself, as long as the copyright/license notice is retained somewhere in the
project — this file is that notice. The icons are presented to end users as
part of KarirKit's own icon set, not branded as Phosphor Icons.
