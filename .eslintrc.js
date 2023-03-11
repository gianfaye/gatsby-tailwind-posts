module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ["react-app", "airbnb-typescript", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  parserOptions: {
    project: ["./tsconfig.json"]
  },
};
