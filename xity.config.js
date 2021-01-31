module.exports = {
  /**
   * Site data
   */
  name: 'XITY - Eleventy blog/site starter',
  shortDesc:
    "I'm Mattia Astorino, UX Engineer in Milan and member of Open Source Design.",
  url: 'https://xity-starter.netlify.app',
  lang: 'en',
  /**
   * Socials and monetisation
   */
  authorHandle: '@equinusocio',
  authorName: 'Mattia Astorino',
  paymentPointer: '$ilp.uphold.com/9ebKEYaNiGUf',
  /**
   * Content settings
   */
  syntaxTheme: 'prism-material-light.css',
  permalinkClass: ['permalink'],
  iframeClass: ['iframes-wrapper'],
  codeClass: ['code-wrapper'],
  figureClass: ['figure'],
  /**
   * Main navigation items.
   * Used by components/header.njk
   */
  navigation: [
    {
      text: 'О проекте',
      url: '/',
      hidden: false,
      external: false,
    },
    {
      text: 'Блог',
      url: '/blog/',
      hidden: false,
      external: false,
    },
    {
      text: 'Sample Page',
      url: '/sample-page/',
      hidden: true,
      external: false,
    },
    {
      text: 'GitHub',
      url: 'https://github.com/htmlShit',
      hidden: true,
      external: true,
    },
  ],
}
