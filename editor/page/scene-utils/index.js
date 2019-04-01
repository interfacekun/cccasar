"use strict";const e=require("async"),t=require("fire-url"),i=(require("fire-path"),Editor.require("unpack://engine-dev/cocos2d/core/platform/CCClass").getDefault,require("./edit-mode")),r=require("./lib/sandbox"),n=require("./lib/tasks"),o=require("./utils/prefab"),s=require("./utils/node"),c=require("./utils/animation"),a=require("./utils/scene");let d={_UndoImpl:require("./undo/scene-undo-impl"),Undo:require("./undo"),EngineEvents:require("./lib/engine-events"),DetectConflict:require("./lib/detect-conflict"),AssetsWatcher:require("./lib/asset-watcher"),StashInPage:require("./lib/stash-scene"),PhysicsUtils:require("./utils/physics"),PrefabUtils:require("./utils/prefab"),AnimUtils:require("./utils/animation"),SceneUtils:require("./utils/scene"),transformTool:"move",pivot:"pivot",coordinate:"local",isLoadingScene:!1,gizmos:{},Sandbox:Editor.require("scene://lib/sandbox"),init(e){this.view||(this.view=document.createElement("scene-view"),this.view.id="sceneView",this.view.classList.add("fit"),this.view.tabIndex=-1),this.gizmosView||(this.gizmosView=this.view.$.gizmosView,this.gizmosView.transformTool=this.transformTool,this.gizmosView.coordinate=this.coordinate,this.gizmosView.pivot=this.pivot),this.Undo.init(),this.Undo.on("changed",()=>{this.updateTitle(this.title())})},reset(){Editor.Selection.clear("node"),this.gizmosView.reset(),cc.engine.animatingInEditMode=!1,c.pauseAnimation()},newScene(e){this.reset();let t=a.createDefaultScene();a.loadScene(t),e&&e()},loadSceneByUuid(e,t){this.reset(),a.loadSceneByUuid(e,()=>{t&&t()})},initScene(t){let i=Editor.remote.stashedScene,n=i&&i.sceneJson;n?e.waterfall([r.loadScripts,e=>{_Scene.reset(),cc.AssetLibrary.loadJson(n,e)},(e,t)=>{cc.director.runSceneImmediate(e.scene),t()},_Scene.loadWorkspace.bind(this,i)],t):e.waterfall([r.loadScripts,e=>{let t=Editor.remote.currentSceneUuid;if(t)cc.director._loadSceneByUuid(t,t=>{e(t,null)});else{let t=a.createDefaultScene();a.loadScene(t),e(null,null)}},_Scene.loadWorkspace],t)},getEditingWorkspace(){let e=Editor.Selection.curGlobalActivate();return{sceneScale:this.view.scale,sceneOffsetX:this.view.$.grid.xAxisOffset,sceneOffsetY:this.view.$.grid.yAxisOffset,designWidth:this.gizmosView.designSize[0],designHeight:this.gizmosView.designSize[1],sceneSelection:Editor.Selection.curSelection("node"),activeType:e?e.type:null}},loadWorkspace(e,t){if(e){if(Editor.Selection.select("node",e.sceneSelection,!0,!0),e.activeType&&"node"!==e.activeType){let t=Editor.Selection.curActivate(e.activeType);Editor.Selection.select(e.activeType,t)}_Scene.view.initPosition(e.sceneOffsetX,e.sceneOffsetY,e.sceneScale)}t&&t()},stashScene(e){let t,r=i.curMode();if(r&&r.getPreviewScene)t=r.getPreviewScene();else{var n=cc.director.getScene();let e=new cc.SceneAsset;e.scene=n,e.name=n.name,t=Editor.serialize(e,{stringify:!0})}var o=this.getEditingWorkspace();o.sceneJson=t,Editor.remote.stashedScene=o,e&&e(null,t)},_applyCanvasPreferences(e,t){(e=e||cc.Canvas.instance)&&Editor.Profile.load("profile://project/project.json",(i,r)=>{let n=r.data,o=n["design-resolution-width"],s=n["design-resolution-height"];e.designResolution=cc.size(o,s),e.fitWidth=n["fit-width"],e.fitHeight=n["fit-height"],t&&t()})},currentScene:()=>cc.director.getScene(),title:()=>i.title(),updateTitle(e){Editor.Ipc.sendToMain("scene:update-title",this.Undo.dirty(),e)},adjustNumber(e,t){return t=t||Editor.Math.numOfDecimalsF(1/this.view.scale),Editor.Math.toPrecision(e,t)},adjustVec2(e,t){return t=t||Editor.Math.numOfDecimalsF(1/this.view.scale),e.x=Editor.Math.toPrecision(e.x,t),e.y=Editor.Math.toPrecision(e.y,t),e},adjustSize(e,t){return t=t||Editor.Math.numOfDecimalsF(1/this.view.scale),e.width=Editor.Math.toPrecision(e.width,t),e.height=Editor.Math.toPrecision(e.height,t),e},adjustNodePosition(e,t){void 0===t&&(t=Editor.Math.numOfDecimalsF(1/this.view.scale)),e.setPosition(Editor.Math.toPrecision(e.position.x,t),Editor.Math.toPrecision(e.position.y,t),Editor.Math.toPrecision(e.position.z,t))},adjustNodeScale(e,t){void 0===t&&(t=Editor.Math.numOfDecimalsF(1/this.view.scale)),e.setScale(Editor.Math.toPrecision(e.scaleX,t),Editor.Math.toPrecision(e.scaleY,t),Editor.Math.toPrecision(e.scaleX,t))},adjustNodeRotation(e,t){void 0===t&&(t=Editor.Math.numOfDecimalsF(1/this.view.scale)),e.angle=Editor.Math.toPrecision(e.angle,t)},adjustNodeSize(e,t){void 0===t&&(t=Editor.Math.numOfDecimalsF(1/this.view.scale)),e.setContentSize(Editor.Math.toPrecision(e.width,t),Editor.Math.toPrecision(e.height,t))},adjustNodeAnchor(e,t){void 0===t&&(t=Editor.Math.numOfDecimalsF(1/this.view.scale)),e.setAnchorPoint(Editor.Math.toPrecision(e.anchorX,t),Editor.Math.toPrecision(e.anchorY,t))},walk(e,t,i){if(e){if(!i)return Editor.warn("walk need a callback"),void 0;if(t){if(i(e))return}(function e(t,i){let r=t._children;for(let t=0;t<r.length;t++){let n=r[t];i(n)||e(n,i)}})(e,i)}},ajustSceneToNodes(e,t){var i=cc.director.getScene();let r;i.position=cc.Vec2.ZERO,i.scale=1,t=t||50;let n=-1e10,o=-1e10,s=1e10,c=1e10;e.forEach(e=>{let t=cc.engine.getInstanceById(e);r=t.getBoundingBoxToWorld(),n=Math.max(r.xMax,n),o=Math.max(r.yMax,o),s=Math.min(r.xMin,s),c=Math.min(r.yMin,c)}),r=cc.rect(s,c,n-s,o-c),_Scene.view.adjustToCenter(t,r)},createPrefab(e,i){let r=cc.engine.getInstanceById(e),n=o.createPrefabFrom(r),s=t.join(i,r.name+".prefab"),c=Editor.serialize(n);Editor.Ipc.sendToMain("scene:create-prefab",s,c,(e,t)=>{if(e)return Editor.error(e),o.unlinkPrefab(r),void 0;n._uuid=t,Editor.globalProfile.data["auto-sync-prefab"]&&o._setPrefabSync(r,!0)})},applyPrefab(e){let t=cc.engine.getInstanceById(e);if(!t||!t._prefab)return;let r=t._prefab.asset._uuid;if(!!!Editor.assetdb.remote.uuidToFspath(r))return Editor.error(`Failed to apply "${t._prefab.root.name}" because the prefab asset is missing, please save the prefab to a new asset by dragging and drop the node from Node Tree into Assets.`);let n=o.createAppliedPrefab(t),s=Editor.serialize(n);Editor.Ipc.sendToMain("scene:apply-prefab",r,s),"prefab"===i.curMode().name&&_Scene.Undo.save(),_Scene.Undo.syncedPrefabSave()},revertPrefab(e){let t=cc.engine.getInstanceById(e);t&&t._prefab&&(t=t._prefab.root,o.revertPrefab(t),_Scene.Undo.syncedPrefabSave())},setPrefabSync(e){let t=cc.engine.getInstanceById(e);t&&t._prefab&&(t=t._prefab.root,o.setPrefabSync(t,!t._prefab.sync))},breakPrefabInstance(e){if(e.length>0){let t=!1;for(let i of e){let e=cc.engine.getInstanceById(i);e&&e._prefab&&(this.Undo.recordNode(i),t=!0,e=e._prefab.root,o.unlinkPrefab(e),Editor.Utils.refreshSelectedInspector("node",i))}t&&this.Undo.commit()}else Editor.Dialog.messageBox({type:"info",buttons:[Editor.T("MESSAGE.ok")],message:Editor.T("MESSAGE.prefab.select_prefab_first"),noLink:!0})},linkPrefab(){let e={type:"info",buttons:[Editor.T("MESSAGE.sure")],message:Editor.T("MESSAGE.prefab.select_asset_first")},t={type:"info",buttons:[Editor.T("MESSAGE.sure")],message:Editor.T("MESSAGE.prefab.select_node_first")},i=Editor.Selection.curActivate("node"),r=i&&cc.engine.getInstanceById(i);if(!r)return Editor.Dialog.messageBox(t);let n=Editor.Selection.curActivate("asset");n?Editor.assetdb.queryInfoByUuid(n,(t,i)=>{!t&&i&&("prefab"===i.type?cc.AssetLibrary.loadAsset(n,(e,t)=>{t&&(_Scene.Undo.recordNode(r.uuid),r._prefab&&o.unlinkPrefab(r._prefab.root),o.linkPrefab(t,r),_Scene.Undo.commit(),r.name.endsWith(o.MISSING_PREFAB_SUFFIX)&&o.setPrefabSync(r,!0,!0)&&(r.name=r.name.slice(0,-o.MISSING_PREFAB_SUFFIX.length)))}):Editor.Dialog.messageBox(e))}):Editor.Dialog.messageBox(e)},dumpNode(e){let t=cc.engine.getInstanceById(e);return Editor.getNodeDump(t)},select(e){this.gizmosView.select(e)},unselect(e){this.gizmosView.unselect(e)},hoverin(e){this.gizmosView.hoverin(e)},hoverout(e){this.gizmosView.hoverout(e)},activate(e){let t=cc.engine.getInstanceById(e);if(t){c.activate(t);for(let e=0;e<t._components.length;++e){let i=t._components[e];if(i.constructor._executeInEditMode&&i.isValid&&i.onFocusInEditor)try{i.onFocusInEditor()}catch(e){cc._throw(e)}}cc.engine.updateAnimatingInEditMode()}},deactivate(e){let t=cc.engine.getInstanceById(e);if(t&&t.isValid){if(!(n.runningTask&&n.runningTask.run===this._softReload)&&t._prefab&&t._prefab.root&&t._prefab.root._prefab.sync){"prefab"===i.curMode().name||o.confirmPrefabSyncedLater(t._prefab.root)}c.deactivate(t);for(let e=0;e<t._components.length;++e){let i=t._components[e];if(i.constructor._executeInEditMode&&i.isValid&&i.onLostFocusInEditor)try{i.onLostFocusInEditor()}catch(e){cc._throw(e)}}cc.engine.updateAnimatingInEditMode()}},hitTest(e,t){let i,r=this.view.pixelToWorld(cc.v2(e,t)),n=Number.MAX_VALUE;return cc.engine.getIntersectionList(new cc.Rect(r.x,r.y,1,1)).forEach(e=>{let t=e.node;if(!t)return;let o=e.aabb||s.getWorldBounds(t),c=r.sub(o.center).magSqr();!(c-n<-1e-6)||t._objFlags&cc.Object.Flags.LockedInEditor||t instanceof cc.PrivateNode||(n=c,i=t)}),i},rectHitTest(e,t,i,r){let n=this.view.pixelToWorld(cc.v2(e,t)),o=this.view.pixelToWorld(cc.v2(e+i,t+r)),s=cc.Rect.fromMinMax(n,o),c=[];return cc.engine.getIntersectionList(s,!0).forEach(e=>{let t=e.node;!t||t._objFlags&cc.Object.Flags.LockedInEditor||c.push(t)}),c},_syncPrefab(e,t){let i=Editor.Selection.curActivate("node"),r=i&&cc.engine.getInstanceById(i);if(r&&r._prefab&&r._prefab.asset._uuid===e.uuid&&r._prefab.root&&r._prefab.root._prefab.sync){if(o.confirmPrefabSynced(r._prefab.root))return t()}o.syncPrefab(e.uuid),t()},syncPrefab(e){n.push({name:"sync-prefab",target:this,run:this._syncPrefab,params:[e]})},assetChanged(e){if(c.assetChanged(e),"prefab"===e.type){let t=i.curMode();"prefab"===t.name?t.prefabAssetChanged(e):this.syncPrefab(e)}},assetsMoved(e){c.assetsMoved(e)},setTransformTool(e){this.transformTool=e,this.gizmosView&&(this.gizmosView.transformTool=e),cc.engine.isInitialized&&cc.engine.repaintInEditMode()},setPivot(e){this.pivot=e,this.gizmosView&&(this.gizmosView.pivot=e),cc.engine.isInitialized&&cc.engine.repaintInEditMode()},setCoordinate(e){this.coordinate=e,this.gizmosView&&(this.gizmosView.coordinate=e),cc.engine.isInitialized&&cc.engine.repaintInEditMode()},alignSelection(e){let t=Editor.Selection.curSelection("node");if(t.length<=1)return;let i=1e10,r=1e10,n=-1e10,o=-1e10,c=(t=(t=t.map(e=>cc.engine.getInstanceById(e))).filter(e=>{let i=e.parent;for(;i;){if(-1!==t.indexOf(i))return!1;i=i.parent}return!0})).map(e=>{let t=s.getWorldBounds(e);return i=Math.min(i,t.x),r=Math.min(r,t.y),n=Math.max(n,t.xMax),o=Math.max(o,t.yMax),{node:e,bounds:t}}),a=cc.rect(i,r,n-i,o-r);c.forEach(t=>{let i,r=t.node;switch(this.Undo.recordNode(r.uuid),e){case"top":i=cc.v2(0,a.yMax-t.bounds.yMax);break;case"v-center":i=cc.v2(0,a.center.y-t.bounds.center.y);break;case"bottom":i=cc.v2(0,a.y-t.bounds.y);break;case"left":i=cc.v2(a.x-t.bounds.x,0);break;case"h-center":i=cc.v2(a.center.x-t.bounds.center.x,0);break;case"right":i=cc.v2(a.xMax-t.bounds.xMax,0);break;default:i=cc.v2()}let n=s.getWorldPosition(r);s.setWorldPosition(r,n.add(i));var o=Editor.Math.numOfDecimalsF(1/this.view.scale);this.adjustNodePosition(r,o),cc.engine.repaintInEditMode()}),this.Undo.commit()},distributeSelection:function(e){let t=Editor.Selection.curSelection("node");if(t.length<=2)return;let i=(t=(t=t.map(e=>cc.engine.getInstanceById(e))).filter(e=>{let i=e.parent;for(;i;){if(-1!==t.indexOf(i))return!1;i=i.parent}return!0})).map(e=>{return{node:e,bounds:s.getWorldBounds(e)}});i.sort((t,i)=>{let r=!0;switch(e){case"top":r=t.bounds.yMax>i.bounds.yMax;break;case"v-center":r=t.bounds.center.y>i.bounds.center.y;break;case"bottom":r=t.bounds.y>i.bounds.y;break;case"left":r=t.bounds.x>i.bounds.x;break;case"h-center":r=t.bounds.center.x>i.bounds.center.x;break;case"right":r=t.bounds.center.xMax>i.bounds.center.xMax}return r});let r=i.length-1,n=i[0].bounds,o=i[r].bounds;i.forEach((t,i)=>{let c,a=t.node,d=t.bounds;switch(this.Undo.recordNode(a.uuid),e){case"top":c=cc.v2(0,n.yMax+(o.yMax-n.yMax)*i/r-d.yMax);break;case"v-center":c=cc.v2(0,n.center.y+(o.center.y-n.center.y)*i/r-d.center.y);break;case"bottom":c=cc.v2(0,n.y+(o.y-n.y)*i/r-d.y);break;case"left":c=cc.v2(n.x+(o.x-n.x)*i/r-d.x,0);break;case"h-center":c=cc.v2(n.center.x+(o.center.x-n.center.x)*i/r-d.center.x,0);break;case"right":c=cc.v2(n.xMax+(o.xMax-n.xMax)*i/r-d.xMax,0);break;default:c=cc.v2()}let l=s.getWorldPosition(a);s.setWorldPosition(a,l.add(c));var u=Editor.Math.numOfDecimalsF(1/this.view.scale);this.adjustNodePosition(a,u),cc.engine.repaintInEditMode()}),this.Undo.commit()},projectProfileUpdated:function(e){cc.game.collisionMatrix=e["collision-matrix"],cc.game.groupList=e["group-list"]}};window._Scene=d,require("./engine-extends"),Object.assign(Editor,require("./debug-helper")),require("./reset-node");const l=require("./editor-engine");cc.engine=new l(!1),Editor.getNodeDump=require("./dump/get-node-dump"),Editor.getNodeFunctions=require("./dump/get-node-functions");let u=require("./set-property-by-path");Editor.setAsset=u.setAsset,Editor.setPropertyByPath=u.setPropertyByPath,Editor.resetPropertyByPath=u.resetPropertyByPath,Editor.setDeepPropertyByPath=u.setDeepPropertyByPath,Editor.fillDefaultValue=u.fillDefaultValue,Editor.setNodePropertyByPath=u.setNodePropertyByPath,Editor.preprocessForSetProperty=u.preprocessForSetProperty;