const fs = require('fs')
let README = fs.readFileSync('index.md','utf-8');
let importMd = '';

let itemCount = 1;

const getCount = (str)=>(str.match(/\+/gi) ?? []).length

fs.readdirSync('.').filter(v=>v.endsWith('.css')).sort((a,b)=>getCount(a)>getCount(b)?1:getCount(a)<getCount(b)?-1:0).forEach((v,idx)=>{
  if (v.includes('all') && v!=='all.css') return;
  const thisItemCount = getCount(v);
  importMd+=`${thisItemCount>itemCount?'<br/>\n':''}<a href="https://ministyles.astolfo.gay/${v}"><kbd>
  <br/>
  &nbsp;&nbsp;${v}&nbsp;&nbsp;
  <br/>
  <br/>
</kbd></a>
`;
  itemCount = thisItemCount
})

README = README.split('%IMPORTLIST%').join(importMd)

fs.writeFileSync('index.md',README)
