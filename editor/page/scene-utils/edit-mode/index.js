"use strict";const e=require("../lib/sandbox"),n=require("../lib/tasks"),t={scene:require("./modes/scene"),animation:require("./modes/animation"),prefab:require("./modes/prefab")},o=[t.scene];let r=function(){return o[o.length-1]},s=function(t,s,l){s=s||{};n.push({name:`pop-edit-mode:[${t}]`,run:function(l){let i=!0;if(void 0!==s.closeResult&&(i=!1),1===o.length)return l();if(e.reloading)return l(new Error("Can not change editmode when scripts are reloading, try again please."));let u=r();return t&&t!==u.name?l(new Error(`Pop mode [${t}] not match current mode [${u.name}]`)):(i&&(s.closeResult=u.confirmClose()),1===s.closeResult?(n.kill(),l(null,1)):(u.close(s.closeResult,e=>{if(1===o.length)return;o.pop();let n=o[o.length-1];_Scene.updateTitle(n.title),_Scene.view.mode=n.name,l(e,s.closeResult)}),void 0))}},l)},l=function(){for(let e=o.length-1;e>0;e--)s(o[e].name)},i=function(e,o){e=e||{};n.push({name:"close-scene",run:function(n){let o=!0;void 0!==e.closeResult?o=!1:e.closeResult=2,o&&(e.closeResult=t.scene.confirmClose()),t.scene.close(e.closeResult,(e,t)=>{e&&Editor.error(e),n&&n(e,t)})}},(e,n)=>{1!==n&&o&&o(e,n)})};module.exports={push:function(e,s,l){n.push({name:`push-edit-mode:[${e}]`,run:function(i){let u=t[e];if(!u)return cb(new Error(`Can't find register for mode name [${e}]`));s=s||[],l=l||function(){},Array.isArray(s)||(s=[s]);let c=r();n.stash(),c.beforePushOther&&c.beforePushOther(u,...s),n.push({name:`open-edit-mode:[${u.name}]`,run(e){u.open(...s,()=>{o.push(u),_Scene.view.mode=u.name,_Scene.updateTitle(c.title),e()})}},l),n.unshiftStash(),i()}},l)},pop:s,popAll:l,close:function(e){l(),i({},e)},closeScene:i,softReload:function(){for(let e=0;e<o.length;e++){let n=o[e];n&&n.softReload&&n.softReload()}},title:function(){let e=r();return e===t.scene?"":e.title},curMode:r,save:function(e){let t=r();n.push({name:`save-editor-mode:[${t.name}]`,run:function(e){t.save(n=>{if(n)return Editor.error(n.message),e(n);_Scene.stashScene(()=>{Editor.Profile.load("profile://global/settings.json",(n,t)=>{t.data["auto-refresh"]&&Editor.Ipc.sendToMain("app:reload-on-device"),e()})})})}},e)},dirtyMode:function(){for(let e=o.length-1;e>=0;e--){let n=o[e];if(n.dirty())return n}return null}};