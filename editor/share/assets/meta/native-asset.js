"use strict";const t=require("fire-fs"),s=require("fire-path");module.exports=class extends Editor.metas.asset{static version(){return"1.0.0"}static defaultType(){return"asset"}dests(){let t=this._assetdb.uuidToFspath(this.uuid),e=this._assetdb._uuidToImportPathNoExt(this.uuid);return[e+".json",e+s.extname(t)]}createAsset(){return new cc.Asset}import(e,i){let r=s.extname(e),a=this._assetdb._uuidToImportPathNoExt(this.uuid)+r;t.copy(e,a,t=>{if(t)return i(t);let a=this.createAsset();a.name=s.basenameNoExt(e),a._setRawAsset(r),this._assetdb.saveAssetToLibrary(this.uuid,a),i()})}};