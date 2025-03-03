import{r as a}from"./index-D8zyPWIn.js";/**
* @license lucide-react v0.462.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const f=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),c=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();/**
* @license lucide-react v0.462.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
* @license lucide-react v0.462.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const u=a.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:i="",children:s,iconNode:n,...l},d)=>a.createElement("svg",{ref:d,...w,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:c("lucide",i),...l},[...n.map(([m,h])=>a.createElement(m,h)),...Array.isArray(s)?s:[s]]));/**
* @license lucide-react v0.462.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const N=(r,e)=>{const t=a.forwardRef(({className:o,...i},s)=>a.createElement(u,{ref:s,iconNode:e,className:c(`lucide-${f(r)}`,o),...i}));return t.displayName=`${r}`,t};export{N as c};
