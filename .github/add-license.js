/*!
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <pleasego@nuke.africa> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return | YieldingExploiter
 */
// config
const author = 'YieldingExploiter'
const email = 'pleasego@nuke.africa'
/* mappings for beerware license */
const beerWare = {
  ts: `/*!
 * @license "THE BEER-WARE LICENSE" (Revision 42):
 * <${email}> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return | ${author}
 */`,
  html: `<!--
 @license "THE BEER-WARE LICENSE" (Revision 42):
 <${email}> wrote this file. As long as you retain this notice you
 can do whatever you want with this stuff. If we meet some day, and you think
 this stuff is worth it, you can buy me a beer in return | ${author}
-->`,
  yaml: `# "THE BEER-WARE LICENSE" (Revision 42):
# <${email}> wrote this file. As long as you retain this notice you
# can do whatever you want with this stuff. If we meet some day, and you think
# this stuff is worth it, you can buy me a beer in return | ${author}`,
  lua: `--[[
  @license "THE BEER-WARE LICENSE" (Revision 42):
  <${email}> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return | ${author}
--]]`,
}
// aliases
beerWare.js=beerWare.ts;
beerWare.css=beerWare.ts;
beerWare.scss=beerWare.ts;
beerWare.sass=beerWare.ts;
beerWare.yml=beerWare.yaml;
beerWare.htm=beerWare.html;
beerWare.xml=beerWare.html;
beerWare.xaml=beerWare.html;
beerWare.md=beerWare.html+'\n\n';
// recursive readdirsync - https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
const fs = require("fs")
const path = require("path")
const recursiveReadDirSync = root => {
  let files = [];
  const recurse = (dir) => {
    if (fs.statSync(dir).isDirectory())
      fs.readdirSync(dir).forEach(v=>recurse(path.join(dir,v)))
    else
      files.push(dir)
  }
  recurse(root)
  return files
}
// perform shit
const ignore = require('ignore')()
let p = process.cwd();
for(i=0;i<50;i++) {
  if (fs.existsSync(path.join(p,'.beerignore'))){
    p = path.join(p,'.beerignore')
  }
  if (fs.existsSync(path.join(p,'.licenseignore'))){
    p = path.join(p,'.licenseignore')
    break;
  }
  const p2 = path.resolve(p,'..')
  if (p2 === p)break;
  p = p2;
}
if (fs.statSync(p).isFile())ignore.add(fs.readFileSync(p))
recursiveReadDirSync(process.cwd()).forEach(v=>{
  if (v.includes('.git/')) return;
  const relPath = path.relative(process.cwd(),v);
  if (ignore.ignores(relPath)) return;
  const ext = v.split('.').pop().toLowerCase();
  let file = fs.readFileSync(v, 'utf-8');
  const fileNoNl = file.split('\r\n').join('\n').split('\n').map(v=>v.trim()).join('')
  if (beerWare[ext] && !file.trim().startsWith(beerWare[ext]) && !file.includes('@beerware-ignore') && !file.includes('@no-add-license') && !file.includes('@license') && !fileNoNl.includes('The above copyright notice and this permission notice shall be included in all') && !fileNoNl.includes('MIT') && !fileNoNl.includes('GNU Affero General Public License') && !fileNoNl.includes('GNU General Public License')) {
    console.log('Beer-ing',relPath)
    fs.writeFileSync(v,`${beerWare[ext]}
${file}`)
  }
})
