"use struct";require("path");const t=require("electron"),e=require("../lib/utils"),a=require("../lib/log"),r=require("../lib/downloader");exports.template=e.getTemplate("download"),exports.props=["language"],exports.data=function(){return{installLock:!1,log:a.list}},exports.methods={translate:t=>Editor.T(`store.download.${t}`),_onStopClick(t){t.preventDefault(),t.stopPropagation()},_onInstall(e){if(this.installLock)return Editor.Dialog.messageBox({title:this.translate("install_error"),message:this.translate("install_locked"),buttons:[this.translate("confirm")],defaultId:0,noLink:!0}),void 0;this.installLock=!0,r.install(e,(a,i)=>{if(this.installLock=!1,a){if(Editor.warn(a),1===Editor.Dialog.messageBox({title:this.translate("install_error"),message:this.translate("install_info"),buttons:[this.translate("confirm"),this.translate("cancel")],defaultId:0,cancelId:1,noLink:!0}))return;return r.copy(e,(e,a,r)=>{if(r&&t.shell.showItemInFolder(r),e)return Editor.warn(e),void 0;Editor.log(this.translate("copy_1")+` ${r} `+this.translate("copy_2"))}),void 0}i&&Editor.log(this._getPackageName(e)+this.translate("install_success"))})},_onRemove(t){r.remove(t,t=>{if(t)return Editor.warn(t),void 0})},_onCopyFile(t){r.unzip(t,e=>{if(e){if(1===Editor.Dialog.messageBox({title:this.translate("unzip_error"),message:this.translate("unzip_info"),buttons:[this.translate("confirm"),this.translate("cancel")],defaultId:0,cancelId:1,noLink:!0}))return;return r.copy(t,(t,e,a)=>{if(t)return Editor.warn(t),void 0;Editor.log(this.translate("copy_1")+` ${a}`)}),void 0}Editor.log(`解压 ${this._getPackageName(t)} 成功`)})},_onClearAll(){0==Editor.Dialog.messageBox({title:this.translate("clearAll"),message:this.translate("clearall_inquiry"),buttons:[this.translate("clear"),this.translate("cancel")],defaultId:0,cancelId:1,noLink:!0})&&this.log.forEach(t=>{r.remove(t,t=>{t&&Editor.warn(t)},!0)})},_getDate(t){var e=new Date,a=new Date(t);if(e-t<864e5&&e.getDate()==a.getDate()){let t=a.getHours(),e=a.getMinutes();return t<10&&(t=`0${t}`),e<10&&(e=`0${e}`),`${t}:${e}`}return a.toLocaleDateString()},_getPackageName(t){var e="";return"en"==this.language&&(e=t.name_en),e||(e=t.name),e}},exports.watch={},exports.ready=function(){};