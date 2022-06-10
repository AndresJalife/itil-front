module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {stats: {warnings:false}, ignoreWarnings: [
        (warning) => true,
      ],},
  },
  ignoreWarnings: [
    (warning) => true,
  ],
}
