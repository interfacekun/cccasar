"use strict";require("electron-cookies");const e=require("../../@base/electron-base-ipc"),{EventEmitter:t}=require("events");(function(e,t,c,a,n,r,s){e.GoogleAnalyticsObject=n,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,r=t.createElement(c),s=t.getElementsByTagName(c)[0],r.async=1,r.src="app://share/metrics/plugin/ga-analytics.js",s.parentNode.insertBefore(r,s)})(window,document,"script",0,"ga");const c=require("../lib/config").trackID;module.exports=new class extends t{trackEvent(t,c,a){return e.send("metrics:track-event",{category:t,action:c,label:a})}trackException(t){e.send("metrics:track-exception",t)}},ga("create",c,"auto"),ga("set","checkProtocolTask",function(){});