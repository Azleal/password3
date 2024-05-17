/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    "postcss-pxtorem": {
      rootValue: 16,
      minPixelValue: 2,
      propList: ["*"],
    },
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {},
    "postcss-normalize": {
      allowDuplicates: false,
    },
    autoprefixer: {},
  },
};

export default config;
