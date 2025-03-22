/****************
 * Filters {{{1 *
 ****************/
// First create variables that require() any packages we need
// const plugin = require('some-eleventy-plugin-package');
const { DateTime } = require('luxon');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const yaml = require('js-yaml');
const nodePandoc = require('node-pandoc');
/********************************
 * eleventyConfig function {{{1 *
 ********************************/
// Use module.exports to export a configuration funcion.
// This is a standard function in Node.js projects
module.exports = async function(eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  // Run any code needed including built-in 11ty methods
 /*************************
  * Passthrough copy {{{2 *
  *************************/
  // Copy assets/ to _site/assets
  eleventyConfig.addPassthroughCopy(".gitattributes");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/slides");
  eleventyConfig.addPassthroughCopy({"node_modules/jquery/dist/jquery.min.js": "assets/js/jquery.min.js"});
  eleventyConfig.addPassthroughCopy({"node_modules/reveal.js": "slides/reveal.js"});
  eleventyConfig.addPassthroughCopy({"node_modules/bootstrap-icons/icons": "assets/icons"});
  eleventyConfig.addPassthroughCopy({"node_modules/bootstrap-icons/bootstrap-icons.svg": "assets/bootstrap-icons.svg"});
  // emulate passthrough during --serve:
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
 /*****************
  * Markdown {{{2 *
  *****************/
  async function convertMarkdownToHtml(markdown) {
    return new Promise((resolve, reject) => {
      nodePandoc(markdown, '-d _data/html.yml', (err, result) => {
        if (err) return console.error(`Pandoc error: ${err.message}`);
        resolve(result);
      });
    });
  }
  eleventyConfig.setLibrary("md", {
    render: async function(content) {
      return await convertMarkdownToHtml(content);
    }
  });
 /*************************
  * Activate plugins {{{2 *
  *************************/
  // Call filters defined outside this function
  eleventyConfig.addFilter("dateFilter", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone("utc").setLocale('pt').toLocaleString(DateTime.DATE_SHORT);
  });
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
  eleventyConfig.addDataExtension('yml, yaml', contents => yaml.load(contents));
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
 /********************
  * Setup views {{{2 *
  ********************/
  eleventyConfig.addLayoutAlias("base",    "layouts/base.njk");
  eleventyConfig.addLayoutAlias("home",    "layouts/base.njk");
  eleventyConfig.addLayoutAlias("single",  "layouts/base.njk");
  eleventyConfig.addLayoutAlias("archive", "layouts/archive.njk");
 /*******************************************************
  * Return is the last instruction to be evaluated {{{2 *
  *******************************************************/
  // If needed, return an object configuration
  return {
    htmlTemplateEngine: "njk",
    //markdownTemplateEngine: "njk",
    dir: {
      templateFormats: ["html", "liquid", "njk"],
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
};
// vim: shiftwidth=2 tabstop=2 expandtab foldmethod=indent
