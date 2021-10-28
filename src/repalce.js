const fs = require("fs");
const path = require("path");

let num = 0;

function readDirRecursion(dirName) {
  let dirPath = path.join(__dirname, dirName);
  // console.log(dirPath);
  fs.readdir(dirPath, (error, files) => {
    if (error) throw error;
    for (const name of files) {
      if (name.indexOf(".") === -1) {
        let newDirName = `${dirName}/${name}`;
        // console.log(dirName);
        readDirRecursion(newDirName);
      } else if (name.endsWith(".ts") || name.endsWith(".vue")) {
        // console.log(name);
        let newDirName = `${dirName}/${name}`;
        fs.readFile(path.join(__dirname, newDirName), "utf8", (error, data) => {
          if (error) throw error;
          const newText = repalceText(data);
          fs.writeFile(path.join(__dirname, newDirName), newText, (err) => {
            if (err) throw err;
          });
          // console.log(newText);
          // fs.writeFile()
          // fs.writeFile()
        });
      }
    }
  });
}

function repalceText(data) {
  return data.replace(/ \.catch\((.*)\)\s*=>\s*\{\s*(comTips\(.*\))/g, (match, p1, p2) => {
    // console.log(match);
    // console.log(p1,p2);
    // console.log(`.catch(${p1}) => {\n//${p2}`);
    num++;
    return `.catch(${p1}) => {\n    //${p2}`;
  });
}

readDirRecursion("");
// console.log(__dirname);
process.on("exit", () => {
  console.log("运行结束!");
  console.log(`修改了${num}处!`);
});
