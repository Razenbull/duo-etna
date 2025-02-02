/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {},
  variants: {
    margin: ['responsive', 'first', 'last', 'focus'],
    borderWidth: ['last'],
  },
  plugins: [require('@tailwindcss/typography')],
};
