module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run serve:lhci'
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};