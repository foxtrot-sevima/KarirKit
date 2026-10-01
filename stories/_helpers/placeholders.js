// Inline SVG placeholders so avatar / card examples need no image assets.
const GRADS = [
  ["#2361e7", "#98b6f6"],
  ["#f67e28", "#fcd3b6"],
  ["#059669", "#a7f3d0"],
  ["#7c3aed", "#ddd6fe"],
  ["#db2777", "#fbcfe8"],
  ["#0284c7", "#bae6fd"],
];

const uri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

/** Person-silhouette avatar on a gradient (64x64). */
export const avatarSrc = (i = 0) => {
  const [a, b] = GRADS[i % GRADS.length];
  return uri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="25" r="11" fill="#fff" fill-opacity=".92"/><path d="M10 64c2-15 12-22 22-22s20 7 22 22z" fill="#fff" fill-opacity=".92"/></svg>`
  );
};

/** Abstract cover image (16:9) for card examples. */
export const coverSrc = (i = 0) => {
  const [a, b] = GRADS[i % GRADS.length];
  return uri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="225" fill="url(#g)"/><circle cx="320" cy="60" r="70" fill="#fff" fill-opacity=".18"/><circle cx="70" cy="190" r="90" fill="#fff" fill-opacity=".14"/><rect x="120" y="82" width="160" height="14" rx="7" fill="#fff" fill-opacity=".7"/><rect x="120" y="110" width="110" height="10" rx="5" fill="#fff" fill-opacity=".5"/></svg>`
  );
};

export const avatarImg = (i, cls = "avatar avatar-md", alt = "Foto profil") =>
  `<span class="${cls}"><img src="${avatarSrc(i)}" alt="${alt}"></span>`;
