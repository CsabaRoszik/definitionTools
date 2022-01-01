const fs = require('fs');
const path = require('path');
const { TITLE_PLACEHOLDER, FILE_NAME_PLACEHOLDER, DESCRIPTION_PLACEHOLDER, LIST_PLACEHOLDER, OUTPUT_FOLDER, ASSETS_FOLDER, ASSETS_TO_COPY } = require('./constants');
const { getDefinitions, getTemplates, generateFilename, nl2br } = require('./tools');

const definitions = getDefinitions();
const { indexTemplate, definitionTemplate, itemTemplate } = getTemplates();
const list = [];

definitions.forEach(({ title, description }) => {
  const fileName = generateFilename(title);
  list.push(
    itemTemplate
      .replace(TITLE_PLACEHOLDER, title)
      .replace(FILE_NAME_PLACEHOLDER, fileName)
  );
  const definition = definitionTemplate
    .replace(TITLE_PLACEHOLDER, title)
    .replace(DESCRIPTION_PLACEHOLDER, nl2br(description));
  fs.writeFileSync(path.resolve(OUTPUT_FOLDER, 'definitions', `${fileName}.html`), definition);
});
const indexContent = indexTemplate
  .replace(LIST_PLACEHOLDER, list.join(''));
fs.writeFileSync(path.resolve(OUTPUT_FOLDER, 'index.html'), indexContent);

ASSETS_TO_COPY.forEach(asset => fs.copyFileSync(
  path.resolve(ASSETS_FOLDER, asset),
  path.resolve(OUTPUT_FOLDER, asset)
));