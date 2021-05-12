module.exports = {
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
    }
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'themes/**/components/*.vue',
      'themes/**/*.vue',
      'themes/*.scss',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts'
    ],
    options: {
      safelist: ["ml-0", "ml-4", "ml-8"],
    }
  }
}
