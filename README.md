[![Node CI](https://github.com/HTMLShit/htmlshit.site/actions/workflows/nodeCI.yml/badge.svg)](https://github.com/HTMLShit/htmlshit.site/actions)
![XITY Starter](https://repository-images.githubusercontent.com/234711727/fbefa980-45e0-11ea-8f4e-1250f14a82a5)

A blog-ready 11ty starter based on PostCSS and Snowpack, with a RSS feed and Native Elements.

## Key features

📰 Integrated RSS Feed.

💅 [PostCSS][] with [PostCSS Preset Env][] and [cssnano][] to enhance and clean your css.

🏅 No <abbr title="Cascading Style Sheets">CSS</abbr> or <abbr title="JavaScript">JS</abbr> frameworks to remove. Just add what you need.

📝 Basic blog structure.

📦 Basic building with [Snowpack][].

🎚 Configuration file to set meta data and global settings.

🎨 Code highlights which you can disable with a flag.

⚡️ Superpowered HTML elements with [Native Elements][].

⚠️ Custom 404 page layout

🤖 Custom blog posts parser to create `<figure>` and wrap iframes

## Preconfigured tools

- [Eleventy][] for templates and site generation
- [PostCSS][] and [PostCSS Preset Env][] to process your CSS
- [cssnano][] to minimize, merge and optimize the CSS output
- [Snowpack][] for a simple asset build pipeline
- [What Input][] to show outline only when navigating with keyboard

[eleventy]: https://11ty.dev 'Static site generator'
[postcss]: https://postcss.org 'A tool for transforming CSS with JavaScript'
[postcss preset env]: https://preset-env.cssdb.org 'Use tomorrow’s CSS today'
[cssnano]: https://cssnano.co 'A modular minifier based on the PostCSS ecosystem'
[snowpack]: https://www.snowpack.dev/ 'Web application bundler'
[what input]: https://github.com/ten1seven/what-input 'A global utility for tracking the current input method'
[native elements]: https://native-elements.dev
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.com/ 'Package Manager'

---

## Prerequisites

- [Node.js][] & npm
- [Yarn][]

## Usage

You can download the scaffolding to create a new project structure with one command:

```bash
npx degit equinusocio/xity-starter
```

This command will download the project to your current working directory and remove the `.github` and `.vscode` folders. After the project structure has been downloaded, you should install the required dependencies:

```bash
yarn install
```

### Running the local development mode

This command will run `eleventy` and the `snowpack` with auto reload.

```bash
yarn start
```

### Building the production version

To generate your static site you can run the following command. It will build the project and run optimisations for a production release inside the `/build` folder.

```bash
yarn build
```

### More commands

XITY provides also two more commands useful to update dependencies and the cssdb used by Browserslist and PostCSS:

```bash
# Update dependencies interactively
yarn update:deps

# Update the cssdb definitions. Run it every month.
yarn update:cssdb

# Run prettier against md, css, and js files
yarn lint
```

## Configurations

You can easily configure your site by changing the settings inside the `xity.config.js` configuration file.

Here are the default settings you will get with this project structure:

```js
{
  // Site name used as default site title
  "name": "Eleventy blog/site starter",

  // Short description used as default page description
  "shortDesc": "A starting point to make blogs and sites. It’s not a template.",

  // Default document language
  "lang": "en",

  // The default website base url
  "url": "localhost",

  // Social shares author username
  "authorHandle": "@equinusocio",

  // Social shares author name
  "authorName": "Mattia Astorino",

  // Tip payment url, if you want to monetize your site
  "paymentPointer": "$twitter.xrptipbot.com/equinusocio",

  // Code highlight theme, must reflect the file name inside /assets/css.
  // Remove to disable it
  "syntaxTheme": "prism-material-light.css",

  // CSS classes applied to the "#" anchor elements inside headings
  "permalinkClass": ["permalink"],

  // CSS classes applied to the iframes wrapper
  "iframesClass": ["iframes-wrapper"],

  // CSS classes applied to highlighted code snippets
  "codeClass": ["code-wrapper"],
}
```
