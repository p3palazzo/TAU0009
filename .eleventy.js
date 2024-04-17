/****************
 * Filters {{{1 *
 ****************/
// First create variables that require() any packages we need
// const plugin = require('some-eleventy-plugin-package');
const { DateTime } = require('luxon');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const htmlmin = require('html-minifier');
const yaml = require('js-yaml');
const nodePandoc = require('node-pandoc');
/********************************
 * eleventyConfig function {{{1 *
 ********************************/
// Use module.exports to export a configuration funcion.
// This is a standard function in Node.js projects
module.exports = function(eleventyConfig) {
  // Run any code needed including built-in 11ty methods
 /*************************
  * Passthrough copy {{{2 *
  *************************/
  // Copy assets/ to _site/assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("src/.domains");
  eleventyConfig.addPassthroughCopy(".gitattributes");
  eleventyConfig.addPassthroughCopy({"node_modules/reveal.js": "slides/reveal.js"});
  // emulate passthrough during --serve:
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
 /*****************
  * Markdown {{{2 *
  *****************/
  async function convertMarkdownToHtml(markdown) {
    return new Promise((resolve, reject) => {
      nodePandoc(markdown, '-d _data/defaults.yaml', (err, result) => {
        if (err) {
          // If an error occurred, reject the promise with the error
          reject(new Error(`Pandoc error: ${err.message}`));
        } else {
          resolve(result);
        }
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
 /********************
  * Setup views {{{2 *
  ********************/
  eleventyConfig.addLayoutAlias("base",    "layouts/base.liquid");
  eleventyConfig.addLayoutAlias("home",    "layouts/home.liquid");
  eleventyConfig.addLayoutAlias("single",  "layouts/single.liquid");
  eleventyConfig.addLayoutAlias("archive", "layouts/archive.liquid");
    eleventyConfig.addTransform("htmlmin", function(content) {
      // Prior to Eleventy 2.0: use this.outputPath instead
      if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });
 /*******************************************************
  * Return is the last instruction to be evaluated {{{2 *
  *******************************************************/
  // If needed, return an object configuration
  return {
    dir: {
      htmlTemplateEngine: "njk",
      templateFormats: ["html", "liquid", "njk"],
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
};
// vim: shiftwidth=2 tabstop=2 expandtab foldmethod=indent
