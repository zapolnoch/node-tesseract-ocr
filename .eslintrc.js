module.exports = {
  plugins: ["prettier"],

  extends: ["silence"],

  rules: {
    "prettier/prettier": "error",
    "global-require": "off",
  },
}
