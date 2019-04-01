"use strict";let e={};module.exports=e;let t={};const r=require("chroma-js"),n=require("../../console"),o=require("../../../share/js-utils"),s=require("../utils/resource-mgr"),i=require("../utils/dom-utils");function l(e,t,r){let n;if(t.hasUserContent){let t=e.querySelector(".user-content");(t=t||e).children.length&&(n=[].slice.call(t.children,0))}i.clear(e);let s=e.shadowRoot.getElementById("custom-style");if(s&&s.remove(),o.assignExcept(e,t,["template","style","attrs","value","hasUserContent"]),void 0===e._attrs&&t.attrs){let r={};for(let n in t.attrs){let o=e.getAttribute(n);if(null!==o){let e=t.attrs[n];r[n]=e(o)}}e._attrs=r}if(void 0===e._value){let r=e.getAttribute("value");null!==r&&(e._value=t.value(r))}if(t.template){let r=typeof t.template;"string"===r?e.innerHTML=t.template:"function"===r&&(e.innerHTML=t.template(e._attrs))}if(t.hasUserContent&&n){let t=document.createElement("div");t.classList=["user-content"],n.forEach(e=>{t.appendChild(e.cloneNode(!0))}),e.insertBefore(t,e.firstChild)}if(t.style){let r=document.createElement("style");r.type="text/css",r.textContent=t.style,r.id="custom-style",e.shadowRoot.insertBefore(r,e.shadowRoot.firstChild)}e._propgateDisable(),e._propgateReadonly(),e.ready&&e.ready(n),r&&r()}e.registerElement=function(e,t){let r=t.template,s=t.style,i=t.listeners,l=t.behaviors,a=t.$,c=t.factoryImpl,u=!0;void 0!==t.shadowDOM&&(u=!!t.shadowDOM);let p=function(){let t=document.createElement(e);return c&&c.apply(t,arguments),t};return p.prototype=Object.create(HTMLElement.prototype),o.assignExcept(p.prototype,t,["shadowDOM","dependencies","factoryImpl","template","style","listeners","behaviors","$"]),l&&l.forEach(e=>{o.addon(p.prototype,e)}),p.prototype.constructor=p,p.prototype.createdCallback=function(){let e=this;if(u&&(e=this.createShadowRoot()),r&&(e.innerHTML=r),s)if(u){let t=document.createElement("style");t.type="text/css",t.textContent=s,e.insertBefore(t,e.firstChild)}else n.warn("Can not use style in light DOM");if(a)for(let t in a)this[`$${t}`]?n.warn(`Failed to assign selector $${t}, already used`):this[`$${t}`]=e.querySelector(a[t]);if(i)for(let e in i)this.addEventListener(e,i[e].bind(this));this.ready&&this.ready()},Object.defineProperty(p,"tagName",{get:()=>e.toUpperCase()}),document.registerElement(e,p),p},e.registerProperty=function(e,r){t[e]=r},e.unregisterProperty=function(e){delete t[e]},e.getProperty=function(e){return t[e]},e.regenProperty=function(e,r){let o=t[e._type];if(!o)return n.warn(`Failed to regen property ${e._type}: type not registered.`),void 0;if("string"==typeof o)return s.importScript(o).then(t=>{try{l(e,t,r)}catch(e){n.error(e.stack),r&&r(e)}}).catch(e=>{n.error(e.stack),r&&r(e)}),void 0;try{l(e,o,r)}catch(e){n.error(e.stack),r&&r(e)}},e.parseString=function(e){return e},e.parseBoolean=function(e){return"false"!==e&&null!==e},e.parseColor=function(e){return r(e).rgba()},e.parseArray=function(e){return JSON.parse(e)},e.parseObject=function(e){return JSON.parse(e)};