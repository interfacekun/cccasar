var e=require("fire-url"),t=require("../../share/engine-extends/object-walker"),s=Editor.require("app://editor/page/scene-utils/utils/node"),i=require("./missing-reporter");function o(e){i.call(this,e)}cc.js.extend(o,i),o.prototype.doReport=function(e,t,o,n,r){var c,a,d="";(c=e instanceof cc.Component||e instanceof cc.Asset?e:_.findLast(o,e=>e instanceof cc.Component||e instanceof cc.Asset))instanceof cc.Component?d=` by ${i.getObjectType(c)} "${cc.js.getClassName(c)}"`:(c=_.findLast(o,e=>e instanceof cc.Node))&&(d=` by node "${c.name}"`);if("string"==typeof t)a=`Asset "${t}" used${d}${r} is missing.`;else{var u=cc.js.getClassName(t);u.startsWith("cc.")&&(u=u.slice(3)),a=t instanceof cc.Asset?`The ${u} used${d}${r} is missing.`:`The ${u} referenced${d}${r} is invalid.`}a+=i.INFO_DETAILED,c instanceof cc.Component&&(c=c.node),c instanceof cc.Node&&(a+=`Node path: "${s.getNodePath(c)}"\n`),n&&(a+=`Asset url: "${n}"\n`),t instanceof cc.Asset&&t._uuid&&(a+=`Missing uuid: "${t._uuid}"\n`),a.slice(0,-1),Editor.warn(a)},o.prototype.report=function(){var s;this.root instanceof cc.Asset&&(s=Editor.assetdb.remote.uuidToUrl(this.root._uuid));var o=i.getObjectType(this.root),n=s?` in ${o} "${e.basename(s)}"`:"";t.walk(this.root,(e,t,i,o,r)=>{this.missingObjects.has(i)&&this.doReport(e,i,o,s,n)})},o.prototype.reportByOwner=function(){var s;this.root instanceof cc.Asset&&(s=Editor.assetdb.remote.uuidToUrl(this.root._uuid));var o=i.getObjectType(this.root),n=s?` in ${o} "${e.basename(s)}"`:"";t.walkProperties(this.root,(e,t,i,o)=>{var r=this.missingOwners.get(e);if(r&&t in r){var c=r[t];this.doReport(e,c||i,o,s,n)}},{dontSkipNull:!0})},module.exports=o;