/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com',
              'cdn.sanity.io',
              'platform-lookaside.fbsbx.com',
              'lh3.googleusercontent.com'
            ]
  },
}

module.exports = nextConfig
