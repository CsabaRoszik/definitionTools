const path = require('path');

module.exports = {
  LIST_PLACEHOLDER: '%LIST%',
  TITLE_PLACEHOLDER: '%TITLE%',
  DESCRIPTION_PLACEHOLDER: '%DESCRIPTION%',
  FILE_NAME_PLACEHOLDER: '%FILE_NAME%',
  TEMPLATE_FOLDER: path.resolve(__dirname, 'templates'),
  OUTPUT_FOLDER: path.resolve(__dirname, 'dist'),
  ASSETS_FOLDER: path.resolve(__dirname, 'assets'),
  ASSETS_TO_COPY: [ 'jquery-3.6.0.min.js', 'search.js'],
  BR: '<br />',
  FILENAME_REPLACES: [
    ['á', 'a'],
    ['é', 'e'],
    ['í', 'i'],
    ['ó', 'o'],
    ['ö', 'o'],
    ['ő', 'o'],
    ['ú', 'u'],
    ['ü', 'u'],
    ['ű', 'u'],
    [' ', '_'],
    ['/', '_'],
  ],
};
