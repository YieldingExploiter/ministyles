// unoptimized semi-spaghetti from hell
const fs = require('fs');
const readCache = {};
const _allPossibleCases = (arr) => {
  if (arr.length == 1) {
    return arr[0];
  } else {
    const result = [];
    const allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
    for (let i = 0; i < allCasesOfRest.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] + ' ' + allCasesOfRest[i]);
      }
    }
    return result;
  }
}
const allPossibleCases = (arr)=>{
  const unUniqueItems = _allPossibleCases(arr.map(v=>v.map(v=>encodeURIComponent(v))))
  const uniqueItems = [];
  unUniqueItems.map(v=>v.trim()).forEach(v=>!uniqueItems.includes(v)?uniqueItems.push(v):void 0)
  return uniqueItems;
}
const unique = (table) => {
  const table2 = [];
  table.forEach(v => table2.includes(v) ? void 0 : table2.push(v));
  return table2
}
const files = fs.readdirSync(process.cwd()).filter(v => v.toLowerCase().endsWith('.css'))
files.forEach(v=>readCache[v]=fs.readFileSync(v,'utf-8'))
let query = [];
for (let i = 0; i < files.length; i++) {
  query.push([...files,''])
}
const items1 = allPossibleCases(query).map(v=>v.split(' '))
const items2 = items1.map(v=>v.map(x=>{return decodeURIComponent(x)}))
const items3 = items2.map(v=>v.filter(fs.existsSync)).filter(v=>v.length>0)
const items4 = [];
items3.map(v=>JSON.stringify(unique(v))).forEach(v=>items4.includes(v)?void 0:items4.push(v))
const items5 = items4.map(v=>JSON.parse(v))

items5.forEach(v=>{
  const combinationFilename = v.map(v=>{
    const split = v.split('.');
    split.pop();
    return split.join('.')
  }).join('+')+'.css'
  const fileContent = v.map(v=>'/* '+v+' */\n'+readCache[v]).join('\n/* ============================= */\n')
  fs.writeFileSync(combinationFilename,fileContent)
})
