"use strict";let e={};module.exports=e;const o=require("util"),n=require("./ipc");e.trace=function(e,r,...t){r=t.length?o.format.apply(o,[r,...t]):""+r,console.trace(r);let l=new Error("dummy").stack.split("\n");l.shift(),l[0]=r,r=l.join("\n"),n.sendToMain("editor:renderer-console-trace",e,r)},e.log=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.log(e),n.sendToMain("editor:renderer-console-log",e)},e.success=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.log("%c"+e,"color: green"),n.sendToMain("editor:renderer-console-success",e)},e.failed=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.log("%c"+e,"color: red"),n.sendToMain("editor:renderer-console-failed",e)},e.info=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.info(e),n.sendToMain("editor:renderer-console-info",e)},e.warn=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.warn(e),n.sendToMain("editor:renderer-console-warn",e)},e.error=function(e,...r){e=r.length?o.format.apply(o,arguments):""+e,console.error(e);let t=new Error("dummy").stack.split("\n");t.shift(),t[0]=e,e=t.join("\n"),n.sendToMain("editor:renderer-console-error",e)};