"use strict";const e=require("fire-fs"),n=require("path"),r=require("./log"),t=require("./utils"),o=require("./package"),i=require("request"),s=require("request-progress"),a=require("../lib/network");var l=function(e){return Editor.T(`store.downloader.${e}`)},u=n.join(Editor.remote.App.home,"download");e.ensureDirSync(u);var c=function(o,a){var c=t.md5(`${o.name}-${o.name_en}`);if(r.exists(o)){if(1===Editor.Dialog.messageBox({title:l("exists"),message:`${o.name} ${l("redownload")}`,buttons:[l("continue"),l("cancel")],defaultId:0,cancelId:1,noLink:!0}))return a(null,!1),!1;var f=r.remove(o);try{e.removeSync(f.file)}catch(e){Editor.warn(e)}}var d=n.join(u,`${c}.zip`);o.file=d;var m=r.add(o);s(i(o.url),{delay:200}).on("progress",function(e){r.update({id:m,progress:e.percent||0,status:"download"}),console.log(`${o.name}(${o.name_en}) - ${e.percent}`)}).on("error",function(e){r.update({id:m,progress:0,status:"error"}),console.log(`${o.name}(${o.name_en}) - -1`),a(e,!1)}).on("end",function(){r.update({id:m,progress:1,status:"finish"}),console.log(`${o.name}(${o.name_en}) - 1`),a(null,!0),"package"===o.type&&setTimeout(function(){require("../component/download").methods._onInstall(o)},1e3)}).pipe(e.createWriteStream(d))};exports.downloadPackage=function(e,n){n=n||function(){},a.get(e.request_url,{user_id:Editor.remote.User.getUserId(),os:"win32"==process.platform?"win":"mac"},(r,t)=>r?n(r):"FAIL"==t.status?n(t.error_msg):(e.url=t.download_url,e.type="package",c(e,(e,r)=>{n(e,r)}),void 0))},exports.downloadOther=function(e,n){n=n||function(){},a.get(e.request_url,{user_id:Editor.remote.User.getUserId(),os:"win32"==process.platform?"win":"mac"},(r,t)=>r?n(r):"FAIL"==t.status?n(t.error_msg):(e.url=t.download_url,e.type="other",c(e,(e,r)=>{n(e,r)}),void 0))},exports.install=function(n,r){if(r=r||function(){},!e.existsSync(n.file))return r(new Error(l("notexists")),!1);n.status="install";var t=n.name;"zh"!=Editor.lang&&(t=n.name_en);var i=Editor.Dialog.messageBox({title:l("install"),message:`${l("info_1")} ${t} ${l("info_2")}`,buttons:[l("global"),l("project"),l("cancel")],defaultId:0,cancelId:2,noLink:!0});if(2==i)return n.status="finish",r(null,!1);o.install(n.file,0==i?"global":"project",(e,t)=>{n.status="finish",r(e,t)})},exports.unzip=function(r,t){if(t=t||function(){},!e.existsSync(r.file))return t(new Error(l("notexists")),!1);r.status="unzip",require("electron").remote.dialog.showOpenDialog({properties:["openDirectory"],filters:[{name:"output",extensions:["*"]}],defaultPath:process.env.HOME||u},i=>{if(!i||!i[0])return r.status="finish";var s="";s="zh"==Editor.lang?r.name||r.name_en:r.name_en||r.name;for(var a=n.join(i[0],s),l=a,u=0;e.existsSync(a);)a=`${l}_${++u}`;o.unzip(r.file,a,e=>{r.status="finish",t(e)})})},exports.copy=function(r,o){if(o=o||function(){},!e.existsSync(r.file))return o(new Error(l("notexists")),!1);require("electron").remote.dialog.showOpenDialog({properties:["openDirectory"],filters:[{name:"output",extensions:["*"]}],defaultPath:process.env.HOME||u},i=>{if(!i||!i[0])return o(null,!1);var s=n.extname(r.file),a="";a="zh"==Editor.lang?r.name||r.name_en:r.name_en||r.name,a+=s;var u=n.join(i[0],a);if(e.existsSync(u))return o(l("exists"),!1,u);t.copy(r.file,u,e=>{if(e)return o(e,!1);o(null,!0,u)})})},exports.remove=function(n,t,o){t=t||function(){};var i="";if((i="zh"==Editor.lang?n.name||n.name_en:n.name_en||n.name,!o)&&1==Editor.Dialog.messageBox({title:l("remove"),message:`${l("remove_info")}${i}`,buttons:[l("continue"),l("cancel")],defaultId:0,cancelId:1,noLink:!0}))return t(null,!1);if(e.existsSync(n.file)){e.statSync(n.file);e.remove(n.file,e=>{if(e)return t(e,!1);r.remove(n),t(null,!0)})}else r.remove(n),t(null)};