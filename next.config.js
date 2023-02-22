/** @type {import('next').NextConfig} */

// add Content Security Policy directives using a template string.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' *.youtube.com *.googleads.g.doubleclick.net;
  style-src 'self' 'unsafe-inline' *.googleads.g.doubleclick.net;
  font-src 'self';
  connect-src * data: blob: *.google.com *.localhost:3000;
  media-src * data: blob: *.api.themoviedb.org;
  img-src 'self' * data: blob: *.rb.gy;
  frame-src * data: blob: *.youtube.com;
`

// Add list to headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: '*.www.youtube.com'
  },
  // {
  //   key: 'Referrer-Policy',
  //   value: 'origin-when-cross-origin'
  // }
];

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy', 'api.themoviedb.org']
  },
  // videos: {
  //   domains: ['api.themoviedb.org']
  // },
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  }
}
