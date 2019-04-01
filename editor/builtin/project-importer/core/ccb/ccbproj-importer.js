"use strict";const r=require("async"),e=require("path"),t=require("fire-fs"),o=require("plist"),i=require("fire-url"),n=require("./ccb-importer"),s="resources-auto",c="db://assets",a="temp";var u="",d="",f="",l="",y="",p=[],m=[];function S(r){t.existsSync(r)&&(t.readdirSync(r).forEach(function(o){var i=e.join(r,o);t.lstatSync(i).isDirectory()?S(i):t.unlinkSync(i)}),t.rmdirSync(r))}function h(r,o,i){if(!t.existsSync(r))return Editor.warn("%s is not found!",r),void 0;t.readdirSync(r).forEach(function(n){var c=e.join(r,n),a=e.join(o,n);t.lstatSync(c).isDirectory()?(n===s&&(a=o),t.existsSync(a)||t.mkdirsSync(a),h(c,a,i)):".ccb"===e.extname(c)?(a=e.join(d,e.relative(i,c)),t.copySync(c,a),m.push(a)):t.existsSync(a)||t.copySync(c,a)})}module.exports={name:"Cocos Builder",exts:"ccbproj",importer:function(s,j){Editor.log("Import Cocos Builder project %s",s);try{(function(r){f=e.dirname(r),y=e.basename(r,e.extname(r)),l=i.join(c,y);for(var n=1;t.existsSync(Editor.assetdb.remote._fspath(l));)l=i.join(c,y+"_"+n),n++;var s=t.readFileSync(r,"utf8"),a=o.parse(s),u=a.resourcePaths.length;for(n=0;n<u;n++){var d=a.resourcePaths[n],m=e.normalize(e.join(f,d.path));p.push(m)}})(s)}catch(r){return j(new Error("Illegal format of project file."))}if(0===p.length)return j(new Error("There is not any resources."));var E,x;for(function(){var r=i.basename(l);u=e.join(Editor.remote.Project.path,a,r),t.existsSync(u)&&S(u),t.mkdirsSync(u),d=u+"_ccbs",t.existsSync(d)&&S(d),t.mkdirsSync(d)}(),E=0,x=p.length;E<x;E++)h(p[E],u,p[E]);r.waterfall([function(r){Editor.assetdb.import([u],c,!1,function(e,t){r()})},function(r){n.importCCBFiles(m,u,d,l,r)}],function(){Editor.log("Import Cocos Builder project finished."),Editor.log("Resources are imported to folder : %s",l),function(){try{S(u),S(d)}catch(r){Editor.warn("Delete temp path %s failed, please delete it manually!",u)}}(),j()})}};