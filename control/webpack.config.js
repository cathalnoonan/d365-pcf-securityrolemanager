// @ts-check

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  // Generate a source map to make debugging easier.
  devtool: 'source-map',

  // Support older browsers.
  target: ['web', 'es5'],
}
