"use strct";const e=require("./cache"),t=require("./event");let o=!1;exports.updateShowIndex=function(){o||(o=!0,process.nextTick(()=>{o=!1;let r=0;e.queryNodes().forEach(e=>{e.show?e.showIndex=r++:e.showIndex=-1}),t.emit("update-show-index")}))},exports.show=function(t,o){let r=e.queryNode(t);return!!r&&(r.show=o,exports.updateShowIndex(),!0)},exports.recFoldNodes=function(t,o){let r=e.queryNode(t);return!!r&&(r.children&&r.children.forEach(e=>{this.fold(e,o),this.recFoldNodes(e,o)}),!0)},exports.fold=function(t,o){let r=e.queryNode(t);if(!r)return!1;return r.fold=o,r.children.forEach(t=>{(function t(n){let d=e.queryNode(n);r.show?exports.show(n,!o):exports.show(n,!1),o?d.children.forEach(e=>{t(e)}):o===d.fold&&d.children.forEach(e=>{t(e)})})(t)}),exports.updateShowIndex(),e.saveNodeFoldState(r.id,o),!0},exports.foldAllParentNodeState=function(t,o){let r=t.parent;if(r){this.fold(r,o);let t=e.queryNode(r);t&&this.foldAllParentNodeState(t,o)}},exports.ignore=function(t,o){if(e.queryNodes().forEach(e=>{e.ignore=o}),o){(function t(o){let r=e.queryNode(o);r.ignore=!1,r.children&&r.children.forEach(e=>{t(e)})})(t)}},exports.rename=function(t){return e.queryNodes().forEach(e=>{e.rename=e.id===t}),!0},exports.select=function(t,o){let r=e.queryNode(t);return!!r&&(r.selected=o,!0)},exports.print=function(t){let o=e.queryNode(t);if(!o)return;let r=o.name;for(;o.parent;)r=`${(o=e.queryNode(o.parent)).name}/${r}`;Editor.info(`Path: ${r}, UUID: ${t}`)},exports.move=function(t,o,r){t=t.filter(e=>e!==o);let n,d,i=e.queryCache();o=i[o],1===r?(n=i[o.id].parent,d=o.id):2===r?(n=o.id,d=null,exports.fold(n,!1)):(n=i[o.id].parent,d=i[o.id].next),Editor.Ipc.sendToPanel("scene","scene:move-nodes",t,n,d)},exports.prefab=function(t,o,r,n){let d,i,s=e.queryCache();o=s[o],1===r?(d=s[o.id].parent,i=o.id):2===r?(d=o.id,i=null,exports.fold(d,!1)):(d=s[o.id].parent,i=s[o.id].next),Editor.Ipc.sendToPanel("scene","scene:create-nodes-by-uuids",t,d,n,i)},exports.hint=function(t){let o=e.queryNode(t);if(!o||o.hint)return!1;o.hint=!0,exports.foldAllParentNodeState(o,!1),setTimeout(()=>{o.hint=!1},500)};let r=[];exports.staging=function(t){let o=e.queryNodes();r.length=0,o.forEach(e=>{e.selected&&r.push(e.id),e.selected=-1!==t.indexOf(e.id)})},exports.restore=function(){let t=[];return e.queryNodes().forEach(e=>{e.selected&&t.push(e.id),e.selected=-1!==r.indexOf(e.id)}),r=[],t};