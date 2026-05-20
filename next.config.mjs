/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/routerShim.tsx',
    },
  },
};

export default nextConfig;
