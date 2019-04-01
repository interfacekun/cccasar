"use strict";let e;const t=require("chroma-js"),i=require("./utils"),s=require("../utils/resource-mgr"),l=require("../utils/dom-utils"),a=require("../utils/focus-mgr"),h=require("../behaviors/focusable"),u=require("../behaviors/disable"),n=require("../behaviors/readonly");module.exports=i.registerElement("ui-color",{get value(){return this._value},set value(e){e||(e=[0,0,0,1]);var i=this._value;this._value=e,i+""==this._value+""||this._multiValues||(this._draw=t(e).rgba(),this._updateRGB(),this._updateAlpha())},get values(){return this._values},set values(e){var i=this._values;this._values=e,i+""!=e+""&&this._multiValues&&(this._draw=t(e[0]).rgba(),this._updateRGB(),this._updateAlpha())},get multiValues(){return this._multiValues},set multiValues(e){var t;(e=!(null==e||!1===e),this._multiValues!==e)&&(this._multiValues=e,e?(this._values&&(t=this._values[0]),this.setAttribute("multi-values","")):(t=this._value,this.removeAttribute("multi-values")),t&&(this._updateRGB(),this._updateAlpha()))},attributeChangedCallback(e,t,i){if("multi-values"==e){this[e.replace(/\-(\w)/g,function(e,t){return t.toUpperCase()})]=i}},behaviors:[h,u,n],template:'\n    <div class="inner">\n      <div class="rgb"></div>\n      <div class="alpha"></div>\n    </div>\n    <div class="mask"></div>\n  ',style:s.getResource("theme://elements/color.css"),$:{rgb:".rgb",alpha:".alpha"},factoryImpl(e){e&&(this.value=e)},ready(){this._showing=!1;let t=this.getAttribute("value");this.value=null!==t?t:[255,255,255,1],this.multiValues=this.getAttribute("multi-values"),this._updateRGB(),this._updateAlpha(),this._initFocusable(this),this._initDisable(!1),this._initReadonly(!1),this._initEvents(),e||((e=document.createElement("ui-color-picker")).style.position="fixed",e.style.zIndex=999,e.style.display="none")},detachedCallback(){this._showColorPicker(!1)},_initEvents(){this.addEventListener("mousedown",t=>{this.disabled||(l.acceptEvent(t),a._setFocusElement(this),this.readonly||(this._showing?this._showColorPicker(!1):(e.value=this._draw,this._showColorPicker(!0))))}),this.addEventListener("keydown",t=>{this.readonly||this.disabled||13!==t.keyCode&&32!==t.keyCode||(l.acceptEvent(t),e.value=this._draw,this._showColorPicker(!0))}),this._hideFn=(e=>{this._changed&&(this._changed=!1,e.detail.confirm?(this._initValue=this._value,l.fire(this,"confirm",{bubbles:!1,detail:{value:this._value}})):(this._initValue!==this._value&&(this.value=this._initValue,l.fire(this,"change",{bubbles:!1,detail:{value:this._value}})),l.fire(this,"cancel",{bubbles:!1,detail:{value:this._value}}))),this._showColorPicker(!1)}),this._changeFn=(e=>{this._changed=!0,this.multiValues=!1,l.acceptEvent(e),this.value=e.detail.value.map(e=>e),l.fire(this,"change",{bubbles:!1,detail:{value:this._value}})})},_updateRGB(){this.$rgb.style.backgroundColor=t(this._draw).hex()},_updateAlpha(){this.$alpha.style.width=`${100*this._draw[3]}%`},_equals(e){return this._value.length===e.length&&(this._value[0]===e[0]&&this._value[1]===e[1]&&this._value[2]===e[2]&&this._value[3]===e[3])},_showColorPicker(t){this._showing!==t&&(this._showing=t,t?(this._initValue=this._draw,e.addEventListener("hide",this._hideFn),e.addEventListener("change",this._changeFn),e.addEventListener("confirm",this._confirmFn),e.addEventListener("cancel",this._cancelFn),l.addHitGhost("default",998,()=>{e.hide(!0)}),document.body.appendChild(e),e._target=this,e.style.display="block",this._updateColorPickerPosition(),a._setFocusElement(e)):(e.removeEventListener("hide",this._hideFn),e.removeEventListener("change",this._changeFn),e.removeEventListener("confirm",this._confirmFn),e.removeEventListener("cancel",this._cancelFn),l.removeHitGhost(),e._target=null,e.remove(),e.style.display="none",a._setFocusElement(this)))},_updateColorPickerPosition(){window.requestAnimationFrame(()=>{if(!this._showing)return;let t=document.body.getBoundingClientRect(),i=this.getBoundingClientRect(),s=e.getBoundingClientRect(),l=e.style;l.left=i.right-s.width+"px",t.height-i.bottom<=s.height+10?l.top=t.bottom-s.height-10+"px":l.top=i.bottom-t.top+10+"px",t.width-i.left<=s.width?l.left=t.right-s.width-10+"px":l.left=i.left-t.left+"px",this._updateColorPickerPosition()})}});