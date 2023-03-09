module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'airbnb-base',
    'plugin:react/recommended',
    'prettier'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
