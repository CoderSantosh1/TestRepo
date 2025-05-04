module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    // Add your custom rules here
  },
};

// Remove deprecated options
module.exports = {
  useEslintrc: false,
  extensions: false,
};