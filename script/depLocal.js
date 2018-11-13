var path=require("path");
var pkg=require("../package.json");
var deps=pkg.dependencies;
var psdetchPkgs=[];
var exec=require("child_process").execSync;
for (var key in deps){
  if (key.indexOf("uxele-")===0){
    psdetchPkgs.push(key);
  }
}
console.log(pkg.name,"links to:", psdetchPkgs);
psdetchPkgs.forEach(function(pkg){
  exec("npm link "+pkg);
});