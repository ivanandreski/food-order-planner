if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-5MpWJD4X.js",revision:null},{url:"assets/index-DV675q1O.css",revision:null},{url:"assets/workbox-window.prod.es5-prqDwDSL.js",revision:null},{url:"index.html",revision:"1f9875fd1d15ce5b18358485d2c143db"},{url:"manifest.webmanifest",revision:"5fe69bed8321bfe495e1855f63aca6b2"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"manifest.webmanifest",revision:"5fe69bed8321bfe495e1855f63aca6b2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
