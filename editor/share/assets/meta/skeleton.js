"use strict";module.exports=class extends Editor.metas.asset{constructor(e){super(e),this.modelUuid="",this.skinID=-1}static version(){return"1.0.0"}static defaultType(){return"skeleton"}import(e,s){let t=new(Editor.require("unpack://engine-dev/cocos2d/core/3d/CCSkeleton"));t._skinID=this.skinID,t._modelUuid=this.modelUuid,this._assetdb.saveAssetToLibrary(this.uuid,t),s()}};