const fs = require("fs");
fs.writeFile("built-time.ts", `module.exports = '${new Date()}'`, (err:any) => {
  if (err) throw err;
  console.log("Build time file created successfully!");
});
