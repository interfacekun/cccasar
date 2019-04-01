"use strict";let e={};module.exports=e;const n=require("./ipc"),r=require("./console");e.checkTemplate=function(n){for(var t=0;t<n.length;++t){var u=n[t];if(u.click)return r.error("The `click` event is not currently implemented for a page-level menu declaration due to known IPC deadlock problems in Electron"),!1;if(u.submenu&&!e.checkTemplate(u.submenu))return!1}return!0},e.popup=function(r,t,u){e.checkTemplate(r)&&n.sendToMain("menu:popup",r,t,u)},e.register=function(r,t,u){e.checkTemplate(t)&&n.sendToMain("menu:register",r,t,u)},e.walk=function(n,r){Array.isArray(n)||(n=[n]),n.forEach(n=>{r(n),n.submenu&&e.walk(n.submenu,r)})};