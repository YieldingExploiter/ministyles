const fs = require('fs')
let README = fs.readFileSync('index.md','utf-8');
let importMd = '';

fs.readdirSync('.').forEach((v,idx)=>{
  if (v.includes('all') && v!=='all.css') return;
  importMd+=`<a href="https://ministyles.astolfo.gay/${v}"><kbd>
  <br/>
  &nbsp;&nbsp;${v}&nbsp;&nbsp;
  <br/>
  <br/>
</kbd></a>
`;
})

README = README.split('%IMPORTLIST%').join(importMd)

fs.writeFileSync('index.md',README)
