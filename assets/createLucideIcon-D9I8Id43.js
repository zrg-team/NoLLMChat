import{r as i}from"./index-CMO0DEG8.js";/**
* @license lucide-react v0.525.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const f=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,o)=>o?o.toUpperCase():t.toLowerCase()),c=r=>{const e=w(r);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim(),p=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
* @license lucide-react v0.525.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var N={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
* @license lucide-react v0.525.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const g=i.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:a="",children:s,iconNode:d,...n},h)=>i.createElement("svg",{ref:h,...N,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:l("lucide",a),...!s&&!p(n)&&{"aria-hidden":"true"},...n},[...d.map(([m,u])=>i.createElement(m,u)),...Array.isArray(s)?s:[s]]));/**
* @license lucide-react v0.525.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const k=(r,e)=>{const t=i.forwardRef(({className:o,...a},s)=>i.createElement(g,{ref:s,iconNode:e,className:l(`lucide-${f(c(r))}`,`lucide-${r}`,o),...a}));return t.displayName=c(r),t};export{k as c};
