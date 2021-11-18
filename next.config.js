const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.PWA === 'DISABLE',
    dest: 'public',
    runtimeCaching: []
  }
})