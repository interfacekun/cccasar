const e=require("fire-path"),t=Editor.require("app://editor/page/refine-sourcemap");module.exports={compile:function(r,o,c,i){var s=e.basenameNoExt(o);let u=e.relative(Editor.Project.path,o),n=e.join(Editor.Project.path,"temp","quick-scripts",u),a=e.relative(e.dirname(n),e.dirname(o));c.sourceMapObject.sources=[u],c.sourceMapObject.sourceRoot=a,function(e,r,o,c){var i,s=o.outputText,u=(Editor.assetdb.getRelativePath(r)||"").replace(/\\/g,"/"),n=s[s.length-1],a="\n"===n||"\r"===n;i=e?'"use strict";\n'+`cc._RF.push(module, '${e=Editor.Utils.UuidUtils.compressUuid(e)}', '${c}');\n`+`// ${u}\n\n`:'"use strict";\n'+`cc._RF.push(module, '${c}');\n`+`// ${u}\n\n`;var p="\ncc._RF.pop();";a||(p="\n"+p),o.outputText=i+s+p,o.sourceMapObject=t.offsetLines(o.sourceMapObject,4)}(r,o,c,s),i(null,c)}};