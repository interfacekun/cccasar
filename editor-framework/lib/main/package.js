"use strict";let e={};module.exports=e;const n=require("electron"),a=require("fire-path"),t=require("fire-fs"),r=require("async"),i=require("semver"),o=require("lodash"),l=require("electron-profile"),d=require("./console"),s=require("./main-menu"),c=require("./ipc"),f=require("./app"),u=require("./i18n"),p=require("../share/ipc-listener");let m="en",h={},g={},y={},$={},k={},P=[];function v(e,n){return-1===n.indexOf(":")?`${e}:${n}`:n}e.load=function(P,b){if(g[P]||y[P])return b&&b(),void 0;y[P]="load";let j,q=a.join(P,"package.json");try{j=JSON.parse(t.readFileSync(q))}catch(e){return delete y[P],b&&b(new Error(`Failed to load 'package.json': ${e.message}`)),void 0}j.name!==j.name.toLowerCase()&&(j.name=j.name.toLowerCase(),d.warn(`Invalid package name: ${j.name}: do not contains uppercase characters.`));for(let e in j.hosts){let n=h[e];if(!n)return delete y[P],b&&b(new Error(`Host '${e}' does not exist.`)),void 0;let a=j.hosts[e];if(!i.satisfies(n,a))return delete y[P],b&&b(new Error(`Host '${e}' require ver ${a}`)),void 0}r.series([n=>{let a=j.packages;if(j.pkgDependencies&&(d.warn(`Package ${j.name} parse warning: "pkgDependencies" is deprecated, use "packages" instead.`),a=j.pkgDependencies),!a)return n(),void 0;r.eachSeries(Object.keys(a),(n,a)=>{let t=e.find(n);if(!t)return a(new Error(`Cannot find dependent package ${n}`));e.load(t,a)},n)},r=>{j._path=P,j._destPath=P,j["entry-dir"]&&(j._destPath=a.join(j._path,j["entry-dir"]));let i=a.join(j._destPath,"i18n",`${m}.js`);if(t.existsSync(i))try{u.extend({[j.name]:require(i)})}catch(e){return r(new Error(`Failed to load ${i}: ${e.stack}`)),void 0}let c=null;if(j.main){let e=a.join(j._destPath,j.main);try{c=require(e)}catch(e){return r(new Error(`Failed to load ${j.main}: ${e.stack}`)),void 0}}if(c){let e=new p;for(let n in c.messages){let a=c.messages[n];"function"==typeof a&&e.on(v(j.name,n),a.bind(c))}j._ipc=e}let f=j["main-menu"];if(f&&"object"==typeof f)for(let e in f){let t=u.formatPath(e),r=a.dirname(t);if("."===r){d.failed(`Failed to add menu ${t}`);continue}let i=f[e],o=Object.assign({label:a.basename(t)},i);if(i.icon){let e=n.nativeImage.createFromPath(a.join(j._destPath,i.icon));o.icon=e}s.add(r,o)}let h=j,b=!1;j.panels&&(d._temporaryConnent(),d.warn(`\n           Package ${j.name} parse warning: "panels" is deprecated, use "panel" instead.\n           For multiple panel, use "panel.x", "panel.y" as your register field.\n           NOTE: Don't forget to change your "Editor.Ipc.sendToPanel" message, since your panelID has changed.\n        `),d._restoreConnect(),h=j.panels,b=!0);for(let e in h){if(0!==e.indexOf("panel"))continue;let n=h[e];for(let e in n.profiles){d._temporaryConnent(),d.warn(`The profile of the panel (${j.name}) needs to be moved to the package root`),d._restoreConnect(),j.profiles||(j.profiles={}),j.profiles[e]||(j.profiles[e]={});let a=n.profiles[e],t=j.profiles[e];Object.keys(a).forEach(e=>{t[e]=a[e]})}}for(let e in j.profiles){let n=j.profiles[e];l.setDefault(`profile://${e}/${j.name}.json`,n)}for(let e in h){let n;if(b)n=`${j.name}.${e}`;else{if(0!==e.indexOf("panel"))continue;n=e.replace(/^panel/,j.name)}if(k[n]){d.failed(`Failed to load panel "${e}" from "${j.name}", the panelID ${n} already exists`);continue}let r=h[e];o.defaults(r,{path:j._destPath,type:"dockable",title:n,popable:!0,"shadow-dom":!0,frame:!0,resizable:!0,devTools:!0,profileTypes:Object.keys(j.profiles||{})}),r.main?t.existsSync(a.join(j._destPath,r.main))?k[n]=r:d.failed(`Failed to load panel "${e}" from "${j.name}", main file "${r.main}" not found.`):d.failed(`Failed to load panel "${e}" from "${j.name}", "main" field not found.`)}if(g[P]=j,$[j.name]=P,c&&c.load)try{c.load(),y[P]="ready"}catch(n){return e.unload(P,()=>{r(new Error(`Failed to execute load() function: ${n.stack}`))}),void 0}r()},e=>{if(f.loadPackage)return f.loadPackage(j,e),void 0;e()},e=>{d.success(`${j.name} loaded`),c.sendToWins("editor:package-loaded",j.name),e()}],e=>{e?delete y[P]:y[P]="ready",b&&b(e)})},e.unload=function(e,n){let t=g[e];if(!t||"ready"!==y[e])return n&&n(),void 0;const i=y[e];y[e]="unload",r.series([e=>{if(f.unloadPackage)return f.unloadPackage(t,e),void 0;e()},n=>{u.unset([t.name]);let r=t,i=!1;t.panels&&(r=t.panels,i=!0);for(let e in r){let n;if(i)n=`${t.name}.${e}`;else{if(0!==e.indexOf("panel"))continue;n=e.replace(/^panel/,t.name)}delete k[n]}let o=t["main-menu"];if(o&&"object"==typeof o)for(let e in o){let n=u.formatPath(e);s.remove(n)}if(t._ipc&&t._ipc.clear(),t.main){let e=require.cache,n=a.join(t._destPath,t.main),r=e[n];if(r){let a=r.exports;if(a&&a.unload)try{a.unload()}catch(e){d.failed(`Failed to unload "${t.main}" from "${t.name}": ${e.stack}.`)}(function e(n,a){if(!n)return;let t=[];a.forEach(e=>{let a=e.filename;0===a.indexOf(n)&&(e.children.forEach(e=>{t.push(e)}),delete require.cache[a])});t.length>0&&e(n,t)})(t._destPath,r.children),delete e[n]}else d.failed(`Failed to uncache module ${t.main}: Cannot find it.`)}delete g[e],delete $[t.name],d.success(`${t.name} unloaded`),c.sendToWins("editor:package-unloaded",t.name),n()}],a=>{a?y[e]=i:delete y[e],n&&n(a)})},e.reload=function(n,a){const t=y[n];t&&"ready"!==t||r.series([e=>{if(!g[n])return e(),void 0;e()},a=>{e.unload(n,a)},a=>{e.load(n,a)}],e=>{a&&a(e)})},e.panelInfo=function(e){return k[e]},e.packageInfo=function(e){for(let n in g)if(a.contains(n,e))return g[n];return null},e.packagePath=function(e){return $[e]},e.addPath=function(e){Array.isArray(e)||(e=[e]),P=o.union(P,e)},e.removePath=function(e){let n=P.indexOf(e);-1!==n&&P.splice(n,1)},e.resetPath=function(){P=[]},e.find=function(e){for(let n=0;n<P.length;++n){let r=P[n];if(t.isDirSync(r)){if(-1!==t.readdirSync(r).indexOf(e))return a.join(r,e)}}return null},Object.defineProperty(e,"paths",{enumerable:!0,get:()=>P.slice()}),Object.defineProperty(e,"lang",{enumerable:!0,set(e){m=e},get:()=>m}),Object.defineProperty(e,"versions",{enumerable:!0,set(e){h=e},get:()=>h});const b=n.ipcMain;b.on("editor:package-query-infos",e=>{let n=[];for(let e in g)n.push({path:e,enabled:!0,info:g[e]});e.reply(null,n)}),b.on("editor:package-query-info",(e,n)=>{let a=$[n],t=g[a=a||""];e.reply(null,{path:a,enabled:!0,info:t})}),b.on("editor:package-reload",(n,a)=>{let t=$[a];if(!t)return d.error(`Failed to reload package ${a}, not found`),void 0;e.reload(t)});