"use strict";const e=0,r=1,c=2,t=3;let n=function(a){let i=function(n){return n._prefab?n._prefab.root?n._prefab.root._prefab.asset?n._prefab.root._prefab.sync?c:r:t:r:e}(a),o=null;return a._children&&a._children.length>0&&(o=a._children.map(n)),{name:a.name,id:a.uuid,children:o,prefabState:i,locked:!!(a._objFlags&cc.Object.Flags.LockedInEditor),isActive:a._activeInHierarchy,hidden:a instanceof cc.PrivateNode}};module.exports={node:(e,r)=>(e=e||cc.director.getScene(),((r?[e]:e._children)||[]).map(n))};