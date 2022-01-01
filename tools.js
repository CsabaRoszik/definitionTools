const fs = require('fs');
const path = require('path');
const { FILENAME_REPLACES, TEMPLATE_FOLDER, OUTPUT_FOLDER, BR } = require("./constants");

const byTitle = ({ title: titleA }, { title: titleB }) => {
  const titleAlc = titleA.toLowerCase();
  const titleBlc = titleB.toLowerCase();
  if (titleAlc === titleBlc) return 0;
  return titleAlc < titleBlc ? -1 : 1;
};

module.exports = {
  getTemplates: () => {
    const indexTemplate = fs.readFileSync(path.resolve(TEMPLATE_FOLDER, 'index.template.html'), 'utf8');
    const definitionTemplate = fs.readFileSync(path.resolve(TEMPLATE_FOLDER, 'definition.template.html'), 'utf8');
    const itemTemplate = fs.readFileSync(path.resolve(TEMPLATE_FOLDER, 'item.template.html'), 'utf8');
    return {
      indexTemplate,
      definitionTemplate,
      itemTemplate,
    };
  },
  getDefinitions: () => {
    const data = fs.readFileSync(path.resolve(OUTPUT_FOLDER, 'definitions.json'), 'utf8');
    const { definitions } = JSON.parse(data);
    return definitions.sort(byTitle);
  },
  generateFilename: title => {
    let result = title.toLowerCase();
    for (const [from, to] of FILENAME_REPLACES) {
      result = result.replace(new RegExp(from, 'gi'), to);
    }
    return result;
  },
  nl2br: text => {
    return text
      .replace(new RegExp('\r\n', 'gi'), BR)
      .replace(new RegExp('\r', 'gi'), BR)
      .replace(new RegExp('\n', 'gi'), BR)
  },
};
