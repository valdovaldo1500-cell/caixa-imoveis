const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Flattens `@layer` (CSS Cascade Layers) into plain rules with adjusted
    // specificity so browsers that don't support cascade layers (pre-Chrome 99 /
    // Firefox 97 / Safari 15.4) don't silently drop the ENTIRE stylesheet.
    // Tailwind v4 wraps all of its generated CSS (theme, base reset, utilities)
    // in `@layer` blocks; an unsupported `@layer` at-rule is dropped whole by
    // legacy engines, which is the "white page + blue links" symptom this fixes.
    // Must run AFTER @tailwindcss/postcss, since `@layer` only exists in the
    // CSS once Tailwind has expanded `@import "tailwindcss"` into it.
    "@csstools/postcss-cascade-layers": {},
  },
};

export default config;
