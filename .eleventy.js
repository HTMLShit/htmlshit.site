const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const contentParser = require('./utils/transforms/contentParser.js');
const htmlDate = require('./utils/filters/htmlDate.js');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const date = require('./utils/filters/date.js');
const codepenEmbed = require('@kevingimbel/eleventy-plugin-codepen');

/**
 * Define Eleventy custom paths
 */
const PATHS = {
  // => /pages
  input: 'pages',
  // => /components
  includes: '../components',
  // => /components/layouts
  layouts: `../components/layouts`,
  // => /data
  data: '../data',
  // => /_output
  output: '_output',
  // => /[PATH.INPUT]/blog
  blog: 'blog',
  // => /static
  static: 'static',
};

module.exports = function (eleventyConfig) {
  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy({
    './static': '.',
  });
  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  // human friendly date format
  eleventyConfig.addFilter('dateFilter', date);
  // robot friendly date format for crawlers
  eleventyConfig.addFilter('htmlDate', htmlDate);

  /**
   * Add Transforms
   *
   * @link https://www.11ty.io/docs/config/#transforms
   */
  // Parse the page HTML content and perform some manipulation
  eleventyConfig.addTransform('contentParser', contentParser);

  /**
   * Add Plugins
   * @link https://github.com/11ty/eleventy-plugin-rss
   * @link https://github.com/11ty/eleventy-plugin-syntaxhighlight
   */
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(codepenEmbed);

  const markdownIt = require('markdown-it');
  const markdownItAttrs = require('markdown-it-attrs');
  const options = {
    html: true,
  };
  const markdownLib = markdownIt(options).use(markdownItAttrs);

  eleventyConfig.setLibrary('md', markdownLib);

  /**
   * Create custom data collections
   * for blog and feed
   * Code from https://github.com/hankchizljaw/hylia
   */
  // Blog posts collection
  const now = new Date();
  const livePosts = (post) => post.date <= now && !post.data.draft;
  eleventyConfig.addCollection('posts', (collection) => {
    return [
      ...collection
        .getFilteredByGlob(`./${PATHS.input}/${PATHS.blog}/**/*`)
        .filter(livePosts),
    ];
  });

  /*
   * Disable use gitignore for avoiding ignoring of /bundle folder during watch
   * https://www.11ty.dev/docs/ignores/#opt-out-of-using-.gitignore
   */
  eleventyConfig.setUseGitIgnore(false);

  /**
   * Eleventy configuration object
   */
  return {
    dir: {
      input: PATHS.input,
      includes: PATHS.includes,
      layouts: PATHS.layouts,
      data: PATHS.data,
      output: PATHS.output,
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: [
      // Templates:
      'md',
      'njk',
      'html',
      // Static Assets:
      'css',
      'jpeg',
      'jpg',
      'png',
      'webp',
      'avif',
      'svg',
      'woff',
      'woff2',
    ],
  };
};
