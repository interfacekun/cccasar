"use strict";const e=require("electron"),r=require("./core/importers");var o=!1;function t(t,i){let n=r.getMenuItemLabel(t,i),p=null;(p=i?e.dialog.showOpenDialog({title:n,filters:[{name:t,extensions:i}],properties:["openFile"]}):e.dialog.showOpenDialog({title:n,properties:["openDirectory"]}))&&function(t,i){var n,p=r.getImporterByName(i);if(!p)return Editor.warn('Not found importer for "%s"',t),void 0;function c(e,r){if(n&&!o){var t=n;n=null,t.nativeWin.destroy()}Editor.error(r)}e.ipcMain.once("app:import-project-abort",c);var a=!1;Editor.App.spawnWorker("app://editor/builtin/project-importer/core/import-worker",function(r,i){var s;n=r,a||(a=!0,i.once("closed",function(){s||e.ipcMain.removeListener("app:import-project-abort",c)})),n.send("app:init-import-worker",function(e){e?(Editor.error(e),s=!0,!n||o||(n.close(),n=null)):n&&(Editor.Metrics.trackEvent({category:"Project",action:"Import Project",label:p.name}),n.send("app:import-project",t,p,function(e){e&&Editor.error(e),!n||o||(n.close(),n=null)},-1))},-1)},o)}(p[0],t)}module.exports={messages:{"open-studio":function(e){let r=require("./core/studio/studio-importer");t(r.name,r.exts)},"open-builder":function(e){let r=require("./core/ccb/ccbproj-importer");t(r.name,r.exts)}}};