import type { NextConfig } from 'next';

// Allow images from any remote source. This uses wide remotePatterns to match any host and path.
// Note: Broadly allowing all hosts can have security/performance implications.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
      { protocol: 'http', hostname: '**', pathname: '/**' },
    ],
  },
};

export default nextConfig;
