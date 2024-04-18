/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
// "https://a.ppy.sh/9710804?1598784007.jpeg"
/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "a.ppy.sh" }],
  },
};

export default config;
