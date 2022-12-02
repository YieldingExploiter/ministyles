const fs = require('fs')
let README = fs.readFileSync('index.md','utf-8');
let importMd = '';

let itemCount = 1;

const getCount = (str)=>(str.match(/\+/gi) ?? []).length

let alrHas = [];

fs.readdirSync('.').filter(v=>v.endsWith('.css')).sort((a,b)=>getCount(a)>getCount(b)?1:getCount(a)<getCount(b)?-1:0).forEach((v,idx)=>{
  if (v.includes('all') && v!=='all.css') return;
  const generic = v.replace('.css','').split('+').sort((a,b)=>a>b?1:a<b?-1:0).join('+');
  if (alrHas[generic]) return;
  alrHas.push(generic)
  const thisItemCount = getCount(v);
  if (thisItemCount > 3) return;
  importMd+=`${thisItemCount>itemCount?`\n\n### Combination Depth ${thisItemCount}\n`:''}<a href="https://ministyles.astolfo.gay/${v}"><kbd>
  <br/>
  &nbsp;&nbsp;${v}&nbsp;&nbsp;
  <br/>
  <br/>
</kbd></a>
`;
  itemCount = thisItemCount
})

README = README.split('%IMPORTLIST%').join(importMd)+'\n\n<br/>*Combinations above depth 3 aren\'t listed here, however you can still load them. See above for instructions.*'

fs.writeFileSync('index.md', README)
