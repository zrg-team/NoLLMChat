var Z=Object.defineProperty;var ee=(t,e,n)=>e in t?Z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>ee(t,typeof e!="symbol"?e+"":e,n);import{N as W,Q as te,U as ne}from"./index-Dm1R2z7R.js";const re="https://stackblitz.com",se=new Error;se.stack="";const O={};let v=null;const ie={get editorOrigin(){return v==null&&(v=new URL(globalThis.WEBCONTAINER_API_IFRAME_URL??re).origin),v},set editorOrigin(t){v=new URL(t).origin},setQueryParam(t,e){O[t]=e},get url(){const t=new URL(this.editorOrigin);t.pathname="/headless";for(const e in O)t.searchParams.set(e,O[e]);return t.searchParams.set("version","1.5.1-internal.1"),t}};function oe(){let t,e;function n(){e=new Promise(r=>t=r)}return n(),{get promise(){return e},resolve(r){return t(r)},reset:n}}oe();var g;(function(t){t.UncaughtException="PREVIEW_UNCAUGHT_EXCEPTION",t.UnhandledRejection="PREVIEW_UNHANDLED_REJECTION",t.ConsoleError="PREVIEW_CONSOLE_ERROR"})(g||(g={}));var ae=Object.defineProperty,ce=(t,e)=>{for(var n in e)ae(t,n,{get:e[n],enumerable:!0})},d={};ce(d,{createEndpoint:()=>z,expose:()=>R,proxy:()=>G,proxyMarker:()=>S,releaseProxy:()=>F,transfer:()=>V,transferHandlers:()=>I,windowEndpoint:()=>de,wrap:()=>J});var S=Symbol("Comlink.proxy"),z=Symbol("Comlink.endpoint"),F=Symbol("Comlink.releaseProxy"),L=Symbol("Comlink.thrown"),D=t=>typeof t=="object"&&t!==null||typeof t=="function",le={canHandle:t=>D(t)&&t[S],serialize(t){const{port1:e,port2:n}=new MessageChannel;return R(t,e),[n,[n]]},deserialize(t){return t.start(),J(t)}},ue={canHandle:t=>D(t)&&L in t,serialize({value:t}){let e;return t instanceof Error?e={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:e={isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},I=new Map([["proxy",le],["throw",ue]]);function R(t,e=self){e.addEventListener("message",function n(r){if(!r||!r.data)return;const{id:s,type:o,path:i}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(m);let l;try{const u=i.slice(0,-1).reduce((h,w)=>h[w],t),f=i.reduce((h,w)=>h[w],t);switch(o){case 0:l=f;break;case 1:u[i.slice(-1)[0]]=m(r.data.value),l=!0;break;case 2:l=f.apply(u,c);break;case 3:{const h=new f(...c);l=G(h)}break;case 4:{const{port1:h,port2:w}=new MessageChannel;R(t,w),l=V(h,[h])}break;case 5:l=void 0;break}}catch(u){l={value:u,[L]:0}}Promise.resolve(l).catch(u=>({value:u,[L]:0})).then(u=>{const[f,h]=j(u);e.postMessage(Object.assign(Object.assign({},f),{id:s}),h),o===5&&(e.removeEventListener("message",n),H(e))})}),e.start&&e.start()}function he(t){return t.constructor.name==="MessagePort"}function H(t){he(t)&&t.close()}function J(t,e){return A(t,[],e)}function E(t){if(t)throw new Error("Proxy has been released and is not useable")}function A(t,e=[],n=function(){}){let r=!1;const s=new Proxy(n,{get(o,i){if(E(r),i===F)return()=>_(t,{type:5,path:e.map(c=>c.toString())}).then(()=>{H(t),r=!0});if(i==="then"){if(e.length===0)return{then:()=>s};const c=_(t,{type:0,path:e.map(l=>l.toString())}).then(m);return c.then.bind(c)}return A(t,[...e,i])},set(o,i,c){E(r);const[l,u]=j(c);return _(t,{type:1,path:[...e,i].map(f=>f.toString()),value:l},u).then(m)},apply(o,i,c){E(r);const l=e[e.length-1];if(l===z)return _(t,{type:4}).then(m);if(l==="bind")return A(t,e.slice(0,-1));const[u,f]=q(c);return _(t,{type:2,path:e.map(h=>h.toString()),argumentList:u},f).then(m)},construct(o,i){E(r);const[c,l]=q(i);return _(t,{type:3,path:e.map(u=>u.toString()),argumentList:c},l).then(m)}});return s}function fe(t){return Array.prototype.concat.apply([],t)}function q(t){const e=t.map(j);return[e.map(n=>n[0]),fe(e.map(n=>n[1]))]}var B=new WeakMap;function V(t,e){return B.set(t,e),t}function G(t){return Object.assign(t,{[S]:!0})}function de(t,e=self,n="*"){return{postMessage:(r,s)=>t.postMessage(r,n,s),addEventListener:e.addEventListener.bind(e),removeEventListener:e.removeEventListener.bind(e)}}function j(t){for(const[e,n]of I)if(n.canHandle(t)){const[r,s]=n.serialize(t);return[{type:3,name:e,value:r},s]}return[{type:0,value:t},B.get(t)||[]]}function m(t){switch(t.type){case 3:return I.get(t.name).deserialize(t.value);case 0:return t.value}}function _(t,e,n){return new Promise(r=>{const s=pe();t.addEventListener("message",function o(i){!i.data||!i.data.id||i.data.id!==s||(t.removeEventListener("message",o),r(i.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:s},e),n)})}function pe(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const we=[g.ConsoleError,g.UncaughtException,g.UnhandledRejection];function me(t){return!(t==null||typeof t!="object"||!("type"in t)||!we.includes(t.type))}function b(t){const e=Object.create(null);return t?Object.assign(e,t):e}function Q(t){const e={d:{}};for(const n of Object.keys(t)){const r=t[n];if("file"in r){if("symlink"in r.file){e.d[n]={f:{l:r.file.symlink}};continue}const o=r.file.contents,i=typeof o=="string"?o:ye(o),c=typeof o=="string"?{}:{b:!0};e.d[n]={f:{c:i,...c}};continue}const s=Q(r.directory);e.d[n]=s}return e}function X(t){const e=b();if("f"in t)throw new Error("It is not possible to export a single file in the JSON format.");if("d"in t)for(const n of Object.keys(t.d)){const r=t.d[n];"d"in r?e[n]=b({directory:X(r)}):"f"in r&&("c"in r.f?e[n]=b({file:b({contents:r.f.c})}):"l"in r.f&&(e[n]=b({file:b({symlink:r.f.l})})))}return e}function ye(t){let e="";for(const n of t)e+=String.fromCharCode(n);return e}let P=null,x=null,N={};const $=new TextDecoder,_e=new TextEncoder,y=class y{constructor(e,n,r){a(this,"_instance");a(this,"_runtimeInfo");a(this,"fs");a(this,"internal");a(this,"_tornDown",!1);a(this,"_unsubscribeFromTokenChangedListener",()=>{});this._instance=e,this._runtimeInfo=r,this.fs=new ke(n),this.internal=new be(e)}async spawn(e,n,r){let s=[];Array.isArray(n)?s=n:r=n;let o,i=new ReadableStream;if((r==null?void 0:r.output)!==!1){const p=M();o=p.push,i=p.stream}let c,l,u,f;if(l=new ReadableStream,f=new ReadableStream,r==null?void 0:r.stdout){const p=M();c=p.push,l=p.stream}if(r!=null&&r.stderr){const p=M();u=p.push,f=p.stream}const h=C(U(o)),w=C(U(c)),K=C(U(u)),Y=await this._instance.run({command:e,args:s,cwd:r==null?void 0:r.cwd,env:r==null?void 0:r.env,terminal:r==null?void 0:r.terminal},w,K,h);return new xe(Y,i,l,f)}async export(e,n){const r={format:(n==null?void 0:n.format)??"json",includes:n==null?void 0:n.includes,excludes:n==null?void 0:n.excludes,external:!0},s=await this._instance.serialize(e,r);if(r.format==="json"){const o=JSON.parse($.decode(s));return X(o)}return s}on(e,n){if(e==="preview-message"){const o=n;n=i=>{me(i)&&o(i)}}const{listener:r,subscribe:s}=T(n);return s(this._instance.on(e,d.proxy(r)))}mount(e,n){const r=e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):_e.encode(JSON.stringify(Q(e)));return this._instance.loadFiles(d.transfer(r,[r.buffer]),{mountPoints:n==null?void 0:n.mountPoint})}setPreviewScript(e,n){return this._instance.setPreviewScript(e,n)}get path(){return this._runtimeInfo.path}get workdir(){return this._runtimeInfo.cwd}teardown(){if(this._tornDown)throw new Error("WebContainer already torn down");this._tornDown=!0,this._unsubscribeFromTokenChangedListener(),this.fs._teardown(),this._instance.teardown(),this._instance[d.releaseProxy](),y._instance===this&&(y._instance=null)}static async boot(e={}){const{workdirName:n}=e;if(window.crossOriginIsolated&&e.coep==="none"&&console.warn(`A Cross-Origin-Embedder-Policy header is required in cross origin isolated environments.
Set the 'coep' option to 'require-corp'.`),(n==null?void 0:n.includes("/"))||n===".."||n===".")throw new Error("workdirName should be a valid folder name");for(;P;)await P;if(y._instance)throw new Error("Only a single WebContainer instance can be booted");const r=Ce(e);P=r.catch(()=>{});try{const s=await r;return y._instance=s,s}finally{P=null}}};a(y,"_instance",null);let k=y;class be{constructor(e){a(this,"_instance");this._instance=e}watchPaths(e,n){const{listener:r,subscribe:s}=T(n);return s(this._instance.watchPaths(e,d.proxy(r)))}getProcesses(){return this._instance.getProcesses()}onProcessesRemove(e){const{listener:n,subscribe:r}=T(e);return r(this._instance.onProcessesRemove(d.proxy(n)))}serialize(e,n){return this._instance.serialize(e,n)}}const ge=1,ve=2;class Ee{constructor(e,n){a(this,"name");a(this,"_type");this.name=e,this._type=n}isFile(){return this._type===ge}isDirectory(){return this._type===ve}}class Pe{constructor(e,n,r,s){a(this,"_apiClient");a(this,"_path");a(this,"_options");a(this,"_listener");a(this,"_wrappedListener");a(this,"_watcher");a(this,"_closed",!1);this._apiClient=e,this._path=n,this._options=r,this._listener=s,this._apiClient._watchers.add(this),this._wrappedListener=(o,i)=>{this._listener&&!this._closed&&this._listener(o,i)},this._apiClient._fs.watch(this._path,this._options,C(this._wrappedListener)).then(o=>{this._watcher=o,this._closed&&this._teardown()}).catch(console.error)}close(){this._closed||(this._closed=!0,this._apiClient._watchers.delete(this),this._teardown())}_teardown(){var e;(e=this._watcher)==null||e.close().finally(()=>{var n;(n=this._watcher)==null||n[d.releaseProxy]()})}}class xe{constructor(e,n,r,s){a(this,"output");a(this,"input");a(this,"exit");a(this,"_process");a(this,"stdout");a(this,"stderr");this.output=n,this._process=e,this.input=new WritableStream({write:o=>{var i;(i=this._getProcess())==null||i.write(o).catch(()=>{})}}),this.exit=this._onExit(),this.stdout=r,this.stderr=s}kill(){var e;(e=this._getProcess())==null||e.kill()}resize(e){var n;(n=this._getProcess())==null||n.resize(e)}async _onExit(){var e;try{return await this._process.onExit}finally{(e=this._process)==null||e[d.releaseProxy](),this._process=null}}_getProcess(){return this._process==null&&console.warn("This process already exited"),this._process}}class ke{constructor(e){a(this,"_fs");a(this,"_watchers",new Set([]));this._fs=e}rm(...e){return this._fs.rm(...e)}async readFile(e,n){return await this._fs.readFile(e,n)}async rename(e,n){return await this._fs.rename(e,n)}async writeFile(e,n,r){if(n instanceof Uint8Array){const s=n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength);n=d.transfer(new Uint8Array(s),[s])}await this._fs.writeFile(e,n,r)}async readdir(e,n){const r=await this._fs.readdir(e,n);return Se(r)||Le(r)?r:r.map(s=>new Ee(s.name,s["Symbol(type)"]))}async mkdir(e,n){return await this._fs.mkdir(e,n)}watch(e,n,r){return typeof n=="function"&&(r=n,n=null),new Pe(this,e,n,r)}_teardown(){this._fs[d.releaseProxy]();for(const e of this._watchers)e.close()}}async function Ce(t){const{serverPromise:e}=Oe(t),n=await(await e).build({host:window.location.host,version:"1.5.1-internal.1",workdirName:t.workdirName,forwardPreviewErrors:t.forwardPreviewErrors}),r=await n.fs(),s=await n.runtimeInfo();return new k(n,r,s)}function U(t){if(t!=null)return e=>{e instanceof Uint8Array?t($.decode(e)):e==null&&t(null)}}function C(t){if(t!=null)return d.proxy(t)}function Oe(t){if(x!=null)return t.coep!==N.coep&&(console.warn(`Attempting to boot WebContainer with 'coep: ${t.coep}'`),console.warn(`First boot had 'coep: ${N.coep}', new settings will not take effect!`)),{serverPromise:x};const e=document.createElement("iframe");e.style.display="none",e.setAttribute("allow","cross-origin-isolated");const n=ie.url;t.coep&&n.searchParams.set("coep",t.coep),e.src=n.toString();const{origin:r}=n;return N={...t},x=new Promise(s=>{const o=i=>{if(i.origin!==r)return;const{data:c}=i;if(c.type==="init"){s(d.wrap(i.ports[0]));return}if(c.type==="warning"){console[c.level].call(console,c.message);return}};window.addEventListener("message",o)}),document.body.insertBefore(e,null),{serverPromise:x}}function Se(t){return typeof t[0]=="string"}function Le(t){return t[0]instanceof Uint8Array}function M(){let t=null;return{stream:new ReadableStream({start(e){t=e}}),push:e=>{e!=null?t==null||t.enqueue(e):(t==null||t.close(),t=null)}}}function T(t){let e=!1,n=()=>{};return{subscribe(r){return r.then(s=>{n=s,e&&n()}),()=>{e=!0,n()}},listener:(...r)=>{e||t(...r)}}}const Ie=(t,e)=>({init:async n=>{try{let r=e().webcontainerInstance;if(r){const o=e().onWebContainerTeardown;r.teardown(),o==null||o(),r=void 0,await new Promise(i=>setTimeout(i,250))}const s=await k.boot({coep:"credentialless"});return t({webcontainerInstance:s,onWebContainerTeardown:n}),s}catch(r){W("Init Web Container",r)}finally{t({ready:!0})}},teardown:async()=>{const n=e().webcontainerInstance;n&&n.teardown(),t({webcontainerInstance:void 0})},mounts:async n=>{try{const r=e().webcontainerInstance;if(!r)throw new Error("WebContainer instance is not ready");await r.mount(n)}catch(r){W("Mount Web Container:",r)}}}),Re={},Ae=te()(ne((t,e)=>({...Re,...Ie(t,e)})));export{Ae as u};
