"use strict";const e=require("../libs/manager"),{promisify:i}=require("util"),s=require("../libs/advice");module.exports={async"asset-changed"(t,a){if("animation-clip"!==a.type||!e.isExists(a.uuid))return;let r=await i(cc.AssetLibrary.loadAsset)(a.uuid);if(e.equal(a.uuid,r))return;let l=e.Clip.queryInfo(a.uuid);if(0===Editor.Dialog.messageBox({type:"question",buttons:[Editor.T("timeline.message.ignore"),Editor.T("timeline.message.read_hard_disk")],title:"",message:`Clip - ${l.name}`,detail:Editor.T("timeline.message.external_changes"),defaultId:0,cancelId:0,noLink:!0}))return e.sync(a.uuid),void 0;let d=this.vm.clips.map(e=>e.id),n=[];for(let e=0;e<d.length;e++){let s=d[e],t=await i(cc.AssetLibrary.loadAsset)(s);n.push(t)}s.emit("change-clips",n)},"assets-deleted"(){},"assets-moved"(){}};