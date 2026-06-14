/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Next.js image optimizer (/_next/image) isn't available on this host, so
  // next/image returned broken images in production. Serve images as-is.
  images: {
    unoptimized: true,
  },
  experimental: {
    // Rewrite barrel imports (e.g. `import { Drawer } from "antd"`) so the
    // bundler only pulls in what's actually used instead of the library's
    // whole module graph. This is the single biggest win for dev compile
    // time here, since antd and heroicons are imported across most pages.
    optimizePackageImports: [
      "antd",
      "@ant-design/icons",
      "@heroicons/react",
      "@headlessui/react",
      "@fortawesome/react-fontawesome",
    ],
  },
};

module.exports = nextConfig;
