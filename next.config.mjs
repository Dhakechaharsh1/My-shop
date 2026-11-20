/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No server code is needed any more (orders go through Instagram),
  // so `npm run build` writes a plain static site to /out.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
