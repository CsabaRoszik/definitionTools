const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const collection = { definitions: [] };

fs.createReadStream(path.resolve(__dirname, 'assets', 'definitions.csv'))
    .pipe(csv.parse({ headers: true, delimiter: ';' }))
    .on('error', error => console.error(error))
    .on('data', row => { if (row.id) { collection.definitions.push(row); }})
    .on('end', () => fs.writeFileSync(path.resolve(__dirname, 'assets', 'definitions.json'), JSON.stringify(collection)));
