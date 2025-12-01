/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudflare Images optimization
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent XSS attacks
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer policy for privacy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          // Strict Transport Security (HTTPS only)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ]
  },
  // Compression
  compress: true,
  // Optimize packages
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
}

export default nextConfig
