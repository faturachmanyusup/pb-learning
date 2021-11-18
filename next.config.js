const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')

module.exports = withBundleAnalyzer(withPWA({
  pwa: {
    disable: process.env.PWA === 'DISABLE',
    register: true,
    dest: 'public'
  }
}))