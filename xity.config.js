module.exports = {
  /**
   * Site data
   */
  name: '@htmlshit',
  shortDesc:
    'Будни верстальщика: канал о вёрстке, фронтенде и веб-разработке вообще',
  url: 'https://t.me/htmlshit',
  lang: 'ru',
  /**
   * Socials and monetisation
   */
  authorHandle: '@bekharsky',
  authorName: 'Sergey Bekharsky',
  /**
   * Content settings
   */
  syntaxTheme: 'prism-okaidia.css',
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
};
