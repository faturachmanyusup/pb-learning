module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run serve:lhci',
      url: 'http://localhost:3000'
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        canonical: 'off',
        'image-aspect-ratio': 'off',
        'color-contrast': 'off',
        'font-display': 'off'
      }
    }
  },
};