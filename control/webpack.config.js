// @ts-check

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  // Generate a source map to make debugging easier.
  devtool: 'source-map',

  // Use "ES5" to support older browsers.
  // IE11 is end of support, so this shouldn't be necessary anymore.
  target: ['web', 'es2015'],
}
