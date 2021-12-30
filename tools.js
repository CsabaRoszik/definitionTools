const fs = require('fs');
const path = require('path');
const { REPLACES, TEMPLATE_FOLDER, OUTPUT_FOLDER } = require("./constants");

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
    return definitions;
  },
  generateFilename: title => {
    let result = title.toLowerCase();
    for (const [from, to] of REPLACES) {
      result = result.replace(new RegExp(from, 'gi'), to);
    }
    return result;
  },
};
