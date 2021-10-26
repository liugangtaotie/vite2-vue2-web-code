const fs = require("fs");

let text = fs.readFileSync("./_systemManageRouter.ts", "utf-8");

const res = text.replace(
  /component: \(res: \(...modules: any\[\]\) => void\) => require\(\[(.*)\], res\),/g,
  function(match, p1) {
    return `component: ()=> import(${p1}),`;
  }
);

const res1 = res.replace(
  /component: \(res: \(...modules: any\[\]\) => void\) =>\n\s*require\(\[(.*)\], res\),/g,
  function(match, p1) {
    return `component: ()=> import(${p1}),`;
  }
);

const res2 = res1.replace(
  /component: \(res: \(...modules: any\[\]\) => void\) =>\n\s*require\(\[\n\s*(.*)\n\s*\], res\),/g,
  function(match, p1) {
    return `component: ()=> import(${p1})`;
  }
);

console.log(res2.toString());
