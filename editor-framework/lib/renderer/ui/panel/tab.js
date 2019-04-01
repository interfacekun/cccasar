"use strict";const t=require("../utils/dock-utils"),e=require("../utils/dom-utils");module.exports=class extends window.HTMLElement{static get tagName(){return"UI-DOCK-TAB"}createdCallback(){let t=this.createShadowRoot();t.innerHTML='\n      <div class="border">\n        <div class="inner">\n          <div class="title">\n            <div id="icon"></div>\n            <span id="name"></span>\n          </div>\n        </div>\n      </div>\n    ',t.insertBefore(e.createStyleElement("theme://elements/tab.css"),t.firstChild),this.addEventListener("dragstart",this._onDragStart.bind(this)),this.addEventListener("dragend",this._onDragEnd.bind(this)),this.addEventListener("mousedown",t=>{t.stopPropagation()}),this.addEventListener("click",this._onClick.bind(this)),this.$={name:this.shadowRoot.querySelector("#name"),icon:this.shadowRoot.querySelector("#icon")},this.frameEL=null,this.setIcon(null)}get name(){return this.$.name.innerText}set name(t){this.$.name.innerText=t}get outOfDate(){return null!==this.getAttribute("out-of-date")}set outOfDate(t){t?this.setAttribute("out-of-date",""):this.removeAttribute("out-of-date")}get focused(){return null!==this.getAttribute("focused")}set focused(t){t?this.setAttribute("focused",""):this.removeAttribute("focused")}_onDragStart(e){e.stopPropagation(),t.dragstart(e,this)}_onDragEnd(e){e.stopPropagation(),t.dragend()}_onClick(t){t.stopPropagation(),e.fire(this,"tab-click",{bubbles:!0})}setIcon(t){let e=this.$.icon;if(t)return e.style.display="inline",e.children.length&&e.removeChild(e.firstChild),e.appendChild(t),t.setAttribute("draggable","false"),void 0;e.style.display="none",e.children.length&&e.removeChild(e.firstChild)}};