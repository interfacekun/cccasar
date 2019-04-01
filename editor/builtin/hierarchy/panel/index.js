"use strict";const e=require("fire-fs"),t=(require("fire-path"),Editor.require("packages://hierarchy/panel/utils/event")),o=Editor.require("packages://hierarchy/panel/utils/cache"),n=Editor.require("packages://hierarchy/panel/utils/operation"),r=Editor.require("packages://hierarchy/panel/manager"),i=Editor.require("packages://hierarchy/panel/utils/communication");Editor.Panel.extend({listeners:{"panel-resize"(){this._vm.length=(this.clientHeight-56)/20+3}},style:e.readFileSync(Editor.url("packages://hierarchy/panel/style/index.css")),template:e.readFileSync(Editor.url("packages://hierarchy/panel/template/index.html")),messages:{"scene:ready"(){r.startup()},"scene:reloading"(){r.stop()},"selection:selected"(e,t,r){if("node"!==t)return;r.forEach(e=>{n.select(e,!0)});let i=r[r.length-1];if(!i)return;let l=o.queryNode(i);l&&(n.foldAllParentNodeState(l,!1),requestAnimationFrame(()=>{let e=20*l.showIndex,t=this._vm.$els.nodes.clientHeight,o=this._vm.$els.nodes.scrollTop;e>o+t-20?this._vm.$els.nodes.scrollTop=e-t+20:e<o&&(this._vm.$els.nodes.scrollTop=e)}))},"selection:unselected"(e,t,o){"node"===t&&o.forEach(e=>{n.select(e,!1)})},"scene:animation-record-changed"(e,t,o){i.setRecord(!!t),n.ignore(o,t)},"change-filter"(e,t){this._vm.filter=t},delete(e,t){Editor.Selection.unselect("node",t,!0),Editor.Ipc.sendToPanel("scene","scene:delete-nodes",t)},rename(e,t){n.rename(t)},"show-path"(e,t){n.print(t)},duplicate(e,t){Editor.Ipc.sendToPanel("scene","scene:duplicate-nodes",t)},filter(e,t){this._vm.filter=t},hint(e,t){n.hint(t)},"hierarchy:hint"(e,t){n.hint(t)}},ready(){this._vm=function(e,o){return new Vue({el:e,data:{length:0,filter:""},watch:{},methods:{},components:{tools:Editor.require("packages://hierarchy/panel/component/tools"),nodes:Editor.require("packages://hierarchy/panel/component/nodes"),search:Editor.require("packages://hierarchy/panel/component/search")},created(){Editor.Ipc.sendToPanel("scene","scene:is-ready",(e,t)=>{t&&r.startup()},-1),t.on("filter-changed",e=>{this.filter=e})}})}(this.shadowRoot),this._vm.length=(this.clientHeight-56)/20+3,o.initNodeState(),o.initNodeStateProfile()},close(){o.saveNodeTreeStateProfile()},selectAll(e){e&&(e.stopPropagation(),e.preventDefault());let t=[];o.queryNodes().forEach(e=>{t.push(e.id),e.children.length>0&&n.fold(e.id,!1)}),Editor.Selection.select("node",t,!0,!1)},delete(e){e&&(e.stopPropagation(),e.preventDefault());let t=[];o.queryNodes().forEach(e=>{e.selected&&t.push(e.id)}),Editor.Selection.unselect("node",t,!0),Editor.Ipc.sendToPanel("scene","scene:delete-nodes",t)},up(e){e&&(e.stopPropagation(),e.preventDefault());let t=o.queryNodes();for(let e=0;e<t.length;e++){let o=t[e],n=o.showIndex;if(o&&o.selected){for(e;e>=0;e--){let o=t[e];if(o.showIndex>=0&&o.showIndex<n){Editor.Selection.select("node",o.id,!0,!0);break}}break}}},down(e){e&&(e.stopPropagation(),e.preventDefault());let t=o.queryNodes();for(let e=t.length-1;e>=0;e--){let o=t[e],n=o.showIndex;if(o&&o.selected){for(e;e<t.length;e++){let o=t[e];if(o.showIndex>n){Editor.Selection.select("node",o.id,!0,!0);break}}break}}},left(e){e&&(e.stopPropagation(),e.preventDefault()),o.queryNodes().forEach(e=>{e.selected&&n.fold(e.id,!0)})},right(e){e&&(e.stopPropagation(),e.preventDefault()),o.queryNodes().forEach(e=>{e.selected&&n.fold(e.id,!1)})},shiftUp(){},shiftDown(){},f2(e){e&&(e.stopPropagation(),e.preventDefault());let t=o.queryNodes();for(let e=0;e<t.length;e++){let o=t[e];if(o&&o.selected){n.rename(o.id,!0);break}}},find(e){e&&(e.stopPropagation(),e.preventDefault());let t=Editor.Selection.curSelection("node");Editor.Ipc.sendToWins("scene:center-nodes",t)},copy(){let e=Editor.Selection.curSelection("node");Editor.Ipc.sendToPanel("scene","scene:copy-nodes",e)},paste(){let e=Editor.Selection.curActivate("node");if(!e)return;let t=o.queryNode(e);t&&t.parent&&(e=t.parent),Editor.Ipc.sendToPanel("scene","scene:paste-nodes",e)},duplicate(){let e=Editor.Selection.curSelection("node");e.length>0&&Editor.Ipc.sendToPanel("hierarchy","duplicate",e)}});