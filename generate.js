const fs = require('fs');
const path = require('path');
const { TITLE_PLACEHOLDER, FILE_NAME_PLACEHOLDER, DESCRIPTION_PLACEHOLDER, LIST_PLACEHOLDER, OUTPUT_FOLDER } = require('./constants');
const { getDefinitions, getTemplates, generateFilename } = require('./tools');

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
    .replace(DESCRIPTION_PLACEHOLDER, description);
  fs.writeFileSync(path.resolve(OUTPUT_FOLDER, 'definitions', `${fileName}.html`), definition);
});
const indexContent = indexTemplate
  .replace(LIST_PLACEHOLDER, list.join(''));
fs.writeFileSync(path.resolve(OUTPUT_FOLDER, 'index.html'), indexContent);
