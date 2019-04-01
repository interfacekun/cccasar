"use strict";let e=!0;function n(e){let n=cc.js.getClassName(e),i=_Scene.gizmos[n];i&&(e.gizmo=new i(_Scene.gizmosView,e),e.gizmo.update()),cc.engine.repaintInEditMode()}function i(e){e.gizmo&&(e.gizmo.remove(),e.gizmo=null),e.trajectoryGizmo&&(e.trajectoryGizmo.remove(),e.trajectoryGizmo=null),cc.engine.repaintInEditMode()}function c(e){let n,i=cc.engine.getInstanceById(e),c=cc.js.getClassName(i),o=Editor.gizmos[c];if(o)try{n=Editor.require(o)}catch(e){Editor.error(e)}if(n||(n=_Scene.gizmos.components[c]),n){i.gizmo=new n(_Scene.gizmosView,i),i.gizmo.update();let e=i.node;e&&e.gizmo&&(i.gizmo.selecting=e.gizmo.selecting,i.gizmo.editing=e.gizmo.editing)}cc.engine.updateAnimatingInEditMode(),cc.engine.repaintInEditMode()}function o(e){let n=cc.engine.getInstanceById(e);n&&n.gizmo&&(n.gizmo.remove(),n.gizmo=null),cc.engine.updateAnimatingInEditMode(),cc.engine.repaintInEditMode()}function t(n){n.gizmo&&(n.gizmo._dirty=n.gizmo._dirty||e,n.gizmo.update()),n.trajectoryGizmo&&n.trajectoryGizmo.update();let i=n._components;for(let n=0,c=i.length;n<c;n++){let c=i[n];c.gizmo&&(c.gizmo._dirty=c.gizmo._dirty||e,c.gizmo.update())}n._children.forEach(t)}function g(){let n=cc.director.getScene();n&&!_Scene.isLoadingScene&&(_Scene.gizmosView.update(),n._children.forEach(t),e=!1)}function d(){let e=cc.engine.getDesignResolutionSize();_Scene.gizmosView.designSize=[e.width,e.height]}function r(){cc.engine.isPlaying||(_Scene.view.adjustToCenter(20),cc.engine.repaintInEditMode())}function m(n){e=!0}let a={isLoaded:!1,register(){this.isLoaded||(this.isLoaded=!0,cc.director.on(cc.Director.EVENT_AFTER_UPDATE,g),cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH,r),cc.engine.on("node-attach-to-scene",n),cc.engine.on("node-detach-from-scene",i),cc.engine.on("component-enabled",c),cc.engine.on("component-disabled",o),cc.engine.on("design-resolution-changed",d),_Scene.Undo.on("changed",m))},unregister(){this.isLoaded=!1,cc.director.off(cc.Director.EVENT_AFTER_UPDATE,g),cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH,r),cc.engine.off("node-attach-to-scene",n),cc.engine.off("node-detach-from-scene",i),cc.engine.off("component-enabled",c),cc.engine.off("component-disabled",o),cc.engine.off("design-resolution-changed",d),_Scene.Undo.off("changed",m)}};module.exports=a;