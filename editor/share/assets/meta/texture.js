"use strict";const e=require("fire-path"),t=require("./native-asset"),s=require("./sprite-frame");module.exports=class extends t{constructor(e){super(e),this.type="sprite",this.wrapMode="clamp",this.filterMode="bilinear",this.premultiplyAlpha=!1,this.platformSettings={}}static defaultType(){return"texture"}static version(){return"2.3.0"}deserialize(e){super.deserialize(e);let t={};for(let i in e.subMetas){let r=e.subMetas[i],a=new s(this._assetdb);a.deserialize(r),t[i]=a}this.updateSubMetas(t)}dests(){let e=super.dests();if("sprite"===this.type)for(let t in this.__subMetas__){let s=this.__subMetas__[t].uuid;e.push(this._assetdb._uuidToImportPathNoExt(s)+".json")}return e}createAsset(){let e=new cc.Texture2D,t=cc.Texture2D.WrapMode;switch(this.wrapMode){case"clamp":e.setWrapMode(t.CLAMP_TO_EDGE,t.CLAMP_TO_EDGE);break;case"repeat":e.setWrapMode(t.REPEAT,t.REPEAT)}let s=cc.Texture2D.Filter;switch(this.filterMode){case"point":e.setFilters(s.NEAREST,s.NEAREST);break;case"bilinear":case"trilinear":e.setFilters(s.LINEAR,s.LINEAR)}return e.setPremultiplyAlpha(this.premultiplyAlpha),e}import(t,s){super.import(t,i=>{if(i)return s(i);if("raw"===this.type)this.updateSubMetas({});else if("sprite"===this.type){const s=Editor.metas["sprite-frame"];let i=e.basenameNoExt(t),r=this.getSubMetas(),a=Object.keys(r),u=null;a.length&&(u=r[a[0]]),u||(u=new s(this._assetdb)),u.rawTextureUuid=this.uuid,r={[i]:u},this.updateSubMetas(r)}s()})}};