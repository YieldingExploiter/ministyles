// Import
const fs = require('fs');
// Define Var
let all = '/* Combination of all files */';
// Concat all files
fs.readdirSync(process.cwd()).filter(v=>v.toLowerCase().endsWith('.css')).forEach(v=>{
  all=`${all}
/* ${v} */
${fs.readFileSync(v,'utf-8')}`;
});
// move @imports to the top
const lineSplit = all.split('\n').map(v=>v.trimStart()).filter(v=>!v.startsWith('@charset'))
const importLines = lineSplit.filter(v=>v.startsWith('@import'));
const nonImportLines = lineSplit.filter(v=>!v.startsWith('@import'));
all = `${importLines.join('\n')}
${nonImportLines.join('\n')}`;
fs.writeFileSync('all.css', all);
