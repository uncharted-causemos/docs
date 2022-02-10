const fs = require('fs');
const args = process.argv;

if (args.length !== 3) {
  console.log('Usage: node ./convertMay2021.js <path_to_model_json>');
  process.exit(0);
}
const content = fs.readFileSync(args[2]);
const jsContent = JSON.parse(content);

const statements = [];
const conceptIndicators = {};

for (const edge of jsContent.edges) {
  for (const statement of edge.statements) {
    statements.push(statement);
  }
}

for (const node of jsContent.nodes) {
  conceptIndicators[node.concept] = {
    func: 'last',
    maxValue: node.maxValue,
    minValue: node.minValue,
    name: node.indicator,
    numLevels: node.numLevels,
    period: node.period,
    resolution: node.resolution,
    values: node.values
  };
}

const payload = {
  id: jsContent.id,
  conceptIndicators,
  statements
}

console.log(JSON.stringify(payload));
