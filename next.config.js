/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy', 'api.themoviedb.org']
  },
  videos: {
    domains: ['api.themoviedb.org']
  }
}
