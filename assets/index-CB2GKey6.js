var Le=Object.defineProperty;var Re=(y,p,w)=>p in y?Le(y,p,{enumerable:!0,configurable:!0,writable:!0,value:w}):y[p]=w;var a=(y,p,w)=>Re(y,typeof p!="symbol"?p+"":p,w);import{o as ee,a_ as Ie,b0 as Ae,__tla as je}from"./index-pPURH_gm.js";let te,Ne=Promise.all([(()=>{try{return je}catch{}})()]).then(async()=>{const y="https://stackblitz.com",p=new Error;p.stack="";const w={};let x=null;const ne={get editorOrigin(){return x==null&&(x=new URL(globalThis.WEBCONTAINER_API_IFRAME_URL??y).origin),x},set editorOrigin(t){x=new URL(t).origin},setQueryParam(t,e){w[t]=e},get url(){const t=new URL(this.editorOrigin);t.pathname="/headless";for(const e in w)t.searchParams.set(e,w[e]);return t.searchParams.set("version","1.5.1-internal.1"),t}};function re(){let t,e;function n(){e=new Promise(r=>t=r)}return n(),{get promise(){return e},resolve(r){return t(r)},reset:n}}re();var P;(function(t){t.UncaughtException="PREVIEW_UNCAUGHT_EXCEPTION",t.UnhandledRejection="PREVIEW_UNHANDLED_REJECTION",t.ConsoleError="PREVIEW_CONSOLE_ERROR"})(P||(P={}));var se=Object.defineProperty,ie=(t,e)=>{for(var n in e)se(t,n,{get:e[n],enumerable:!0})},d={};ie(d,{createEndpoint:()=>W,expose:()=>j,proxy:()=>X,proxyMarker:()=>R,releaseProxy:()=>D,transfer:()=>G,transferHandlers:()=>A,windowEndpoint:()=>ue,wrap:()=>q});var R=Symbol("Comlink.proxy"),W=Symbol("Comlink.endpoint"),D=Symbol("Comlink.releaseProxy"),I=Symbol("Comlink.thrown"),H=t=>typeof t=="object"&&t!==null||typeof t=="function",oe={canHandle:t=>H(t)&&t[R],serialize(t){const{port1:e,port2:n}=new MessageChannel;return j(t,e),[n,[n]]},deserialize(t){return t.start(),q(t)}},ae={canHandle:t=>H(t)&&I in t,serialize({value:t}){let e;return t instanceof Error?e={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:e={isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},A=new Map([["proxy",oe],["throw",ae]]);function j(t,e=self){e.addEventListener("message",function n(r){if(!r||!r.data)return;const{id:s,type:o,path:i}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(_);let l;try{const u=i.slice(0,-1).reduce((h,g)=>h[g],t),f=i.reduce((h,g)=>h[g],t);switch(o){case 0:l=f;break;case 1:u[i.slice(-1)[0]]=_(r.data.value),l=!0;break;case 2:l=f.apply(u,c);break;case 3:{const h=new f(...c);l=X(h)}break;case 4:{const{port1:h,port2:g}=new MessageChannel;j(t,g),l=G(h,[h])}break;case 5:l=void 0;break}}catch(u){l={value:u,[I]:0}}Promise.resolve(l).catch(u=>({value:u,[I]:0})).then(u=>{const[f,h]=U(u);e.postMessage(Object.assign(Object.assign({},f),{id:s}),h),o===5&&(e.removeEventListener("message",n),J(e))})}),e.start&&e.start()}function ce(t){return t.constructor.name==="MessagePort"}function J(t){ce(t)&&t.close()}function q(t,e){return N(t,[],e)}function k(t){if(t)throw new Error("Proxy has been released and is not useable")}function N(t,e=[],n=function(){}){let r=!1;const s=new Proxy(n,{get(o,i){if(k(r),i===D)return()=>v(t,{type:5,path:e.map(c=>c.toString())}).then(()=>{J(t),r=!0});if(i==="then"){if(e.length===0)return{then:()=>s};const c=v(t,{type:0,path:e.map(l=>l.toString())}).then(_);return c.then.bind(c)}return N(t,[...e,i])},set(o,i,c){k(r);const[l,u]=U(c);return v(t,{type:1,path:[...e,i].map(f=>f.toString()),value:l},u).then(_)},apply(o,i,c){k(r);const l=e[e.length-1];if(l===W)return v(t,{type:4}).then(_);if(l==="bind")return N(t,e.slice(0,-1));const[u,f]=B(c);return v(t,{type:2,path:e.map(h=>h.toString()),argumentList:u},f).then(_)},construct(o,i){k(r);const[c,l]=B(i);return v(t,{type:3,path:e.map(u=>u.toString()),argumentList:c},l).then(_)}});return s}function le(t){return Array.prototype.concat.apply([],t)}function B(t){const e=t.map(U);return[e.map(n=>n[0]),le(e.map(n=>n[1]))]}var V=new WeakMap;function G(t,e){return V.set(t,e),t}function X(t){return Object.assign(t,{[R]:!0})}function ue(t,e=self,n="*"){return{postMessage:(r,s)=>t.postMessage(r,n,s),addEventListener:e.addEventListener.bind(e),removeEventListener:e.removeEventListener.bind(e)}}function U(t){for(const[e,n]of A)if(n.canHandle(t)){const[r,s]=n.serialize(t);return[{type:3,name:e,value:r},s]}return[{type:0,value:t},V.get(t)||[]]}function _(t){switch(t.type){case 3:return A.get(t.name).deserialize(t.value);case 0:return t.value}}function v(t,e,n){return new Promise(r=>{const s=he();t.addEventListener("message",function o(i){!i.data||!i.data.id||i.data.id!==s||(t.removeEventListener("message",o),r(i.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:s},e),n)})}function he(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const fe=[P.ConsoleError,P.UncaughtException,P.UnhandledRejection];function de(t){return!(t==null||typeof t!="object"||!("type"in t)||!fe.includes(t.type))}function E(t){const e=Object.create(null);return t?Object.assign(e,t):e}function $(t){const e={d:{}};for(const n of Object.keys(t)){const r=t[n];if("file"in r){if("symlink"in r.file){e.d[n]={f:{l:r.file.symlink}};continue}const o=r.file.contents,i=typeof o=="string"?o:pe(o),c=typeof o=="string"?{}:{b:!0};e.d[n]={f:{c:i,...c}};continue}const s=$(r.directory);e.d[n]=s}return e}function Q(t){const e=E();if("f"in t)throw new Error("It is not possible to export a single file in the JSON format.");if("d"in t)for(const n of Object.keys(t.d)){const r=t.d[n];"d"in r?e[n]=E({directory:Q(r)}):"f"in r&&("c"in r.f?e[n]=E({file:E({contents:r.f.c})}):"l"in r.f&&(e[n]=E({file:E({symlink:r.f.l})})))}return e}function pe(t){let e="";for(const n of t)e+=String.fromCharCode(n);return e}let C=null,O=null,M={};const K=new TextDecoder,we=new TextEncoder,b=class b{constructor(e,n,r){a(this,"_instance");a(this,"_runtimeInfo");a(this,"fs");a(this,"internal");a(this,"_tornDown",!1);a(this,"_unsubscribeFromTokenChangedListener",()=>{});this._instance=e,this._runtimeInfo=r,this.fs=new Ee(n),this.internal=new me(e)}async spawn(e,n,r){let s=[];Array.isArray(n)?s=n:r=n;let o,i=new ReadableStream;if((r==null?void 0:r.output)!==!1){const m=F();o=m.push,i=m.stream}let c,l,u,f;if(l=new ReadableStream,f=new ReadableStream,r==null?void 0:r.stdout){const m=F();c=m.push,l=m.stream}if(r!=null&&r.stderr){const m=F();u=m.push,f=m.stream}const h=L(T(o)),g=L(T(c)),Oe=L(T(u)),Se=await this._instance.run({command:e,args:s,cwd:r==null?void 0:r.cwd,env:r==null?void 0:r.env,terminal:r==null?void 0:r.terminal},g,Oe,h);return new ve(Se,i,l,f)}async export(e,n){const r={format:(n==null?void 0:n.format)??"json",includes:n==null?void 0:n.includes,excludes:n==null?void 0:n.excludes,external:!0},s=await this._instance.serialize(e,r);if(r.format==="json"){const o=JSON.parse(K.decode(s));return Q(o)}return s}on(e,n){if(e==="preview-message"){const o=n;n=i=>{de(i)&&o(i)}}const{listener:r,subscribe:s}=z(n);return s(this._instance.on(e,d.proxy(r)))}mount(e,n){const r=e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):we.encode(JSON.stringify($(e)));return this._instance.loadFiles(d.transfer(r,[r.buffer]),{mountPoints:n==null?void 0:n.mountPoint})}setPreviewScript(e,n){return this._instance.setPreviewScript(e,n)}get path(){return this._runtimeInfo.path}get workdir(){return this._runtimeInfo.cwd}teardown(){if(this._tornDown)throw new Error("WebContainer already torn down");this._tornDown=!0,this._unsubscribeFromTokenChangedListener(),this.fs._teardown(),this._instance.teardown(),this._instance[d.releaseProxy](),b._instance===this&&(b._instance=null)}static async boot(e={}){const{workdirName:n}=e;if(window.crossOriginIsolated&&e.coep==="none"&&console.warn(`A Cross-Origin-Embedder-Policy header is required in cross origin isolated environments.
Set the 'coep' option to 'require-corp'.`),(n==null?void 0:n.includes("/"))||n===".."||n===".")throw new Error("workdirName should be a valid folder name");for(;C;)await C;if(b._instance)throw new Error("Only a single WebContainer instance can be booted");const r=Pe(e);C=r.catch(()=>{});try{const s=await r;return b._instance=s,s}finally{C=null}}};a(b,"_instance",null);let S=b;class me{constructor(e){a(this,"_instance");this._instance=e}watchPaths(e,n){const{listener:r,subscribe:s}=z(n);return s(this._instance.watchPaths(e,d.proxy(r)))}getProcesses(){return this._instance.getProcesses()}onProcessesRemove(e){const{listener:n,subscribe:r}=z(e);return r(this._instance.onProcessesRemove(d.proxy(n)))}serialize(e,n){return this._instance.serialize(e,n)}}const ye=1,_e=2;class be{constructor(e,n){a(this,"name");a(this,"_type");this.name=e,this._type=n}isFile(){return this._type===ye}isDirectory(){return this._type===_e}}class ge{constructor(e,n,r,s){a(this,"_apiClient");a(this,"_path");a(this,"_options");a(this,"_listener");a(this,"_wrappedListener");a(this,"_watcher");a(this,"_closed",!1);this._apiClient=e,this._path=n,this._options=r,this._listener=s,this._apiClient._watchers.add(this),this._wrappedListener=(o,i)=>{this._listener&&!this._closed&&this._listener(o,i)},this._apiClient._fs.watch(this._path,this._options,L(this._wrappedListener)).then(o=>{this._watcher=o,this._closed&&this._teardown()}).catch(console.error)}close(){this._closed||(this._closed=!0,this._apiClient._watchers.delete(this),this._teardown())}_teardown(){var e;(e=this._watcher)==null||e.close().finally(()=>{var n;(n=this._watcher)==null||n[d.releaseProxy]()})}}class ve{constructor(e,n,r,s){a(this,"output");a(this,"input");a(this,"exit");a(this,"_process");a(this,"stdout");a(this,"stderr");this.output=n,this._process=e,this.input=new WritableStream({write:o=>{var i;(i=this._getProcess())==null||i.write(o).catch(()=>{})}}),this.exit=this._onExit(),this.stdout=r,this.stderr=s}kill(){var e;(e=this._getProcess())==null||e.kill()}resize(e){var n;(n=this._getProcess())==null||n.resize(e)}async _onExit(){var e;try{return await this._process.onExit}finally{(e=this._process)==null||e[d.releaseProxy](),this._process=null}}_getProcess(){return this._process==null&&console.warn("This process already exited"),this._process}}class Ee{constructor(e){a(this,"_fs");a(this,"_watchers",new Set([]));this._fs=e}rm(...e){return this._fs.rm(...e)}async readFile(e,n){return await this._fs.readFile(e,n)}async rename(e,n){return await this._fs.rename(e,n)}async writeFile(e,n,r){if(n instanceof Uint8Array){const s=n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength);n=d.transfer(new Uint8Array(s),[s])}await this._fs.writeFile(e,n,r)}async readdir(e,n){const r=await this._fs.readdir(e,n);return ke(r)||Ce(r)?r:r.map(s=>new be(s.name,s["Symbol(type)"]))}async mkdir(e,n){return await this._fs.mkdir(e,n)}watch(e,n,r){return typeof n=="function"&&(r=n,n=null),new ge(this,e,n,r)}_teardown(){this._fs[d.releaseProxy]();for(const e of this._watchers)e.close()}}async function Pe(t){const{serverPromise:e}=xe(t),n=await(await e).build({host:window.location.host,version:"1.5.1-internal.1",workdirName:t.workdirName,forwardPreviewErrors:t.forwardPreviewErrors}),r=await n.fs(),s=await n.runtimeInfo();return new S(n,r,s)}function T(t){if(t!=null)return e=>{e instanceof Uint8Array?t(K.decode(e)):e==null&&t(null)}}function L(t){if(t!=null)return d.proxy(t)}function xe(t){if(O!=null)return t.coep!==M.coep&&(console.warn(`Attempting to boot WebContainer with 'coep: ${t.coep}'`),console.warn(`First boot had 'coep: ${M.coep}', new settings will not take effect!`)),{serverPromise:O};const e=document.createElement("iframe");e.style.display="none",e.setAttribute("allow","cross-origin-isolated");const n=ne.url;t.coep&&n.searchParams.set("coep",t.coep),e.src=n.toString();const{origin:r}=n;return M={...t},O=new Promise(s=>{const o=i=>{if(i.origin!==r)return;const{data:c}=i;if(c.type==="init"){s(d.wrap(i.ports[0]));return}if(c.type==="warning"){console[c.level].call(console,c.message);return}};window.addEventListener("message",o)}),document.body.insertBefore(e,null),{serverPromise:O}}function ke(t){return typeof t[0]=="string"}function Ce(t){return t[0]instanceof Uint8Array}function F(){let t=null;return{stream:new ReadableStream({start(e){t=e}}),push:e=>{e!=null?t==null||t.enqueue(e):(t==null||t.close(),t=null)}}}function z(t){let e=!1,n=()=>{};return{subscribe(r){return r.then(s=>{n=s,e&&n()}),()=>{e=!0,n()}},listener:(...r)=>{e||t(...r)}}}let Y,Z;Y=(t,e)=>({init:async n=>{try{let r=e().webcontainerInstance;if(r){const o=e().onWebContainerTeardown;r.teardown(),o==null||o(),r=void 0,await new Promise(i=>setTimeout(i,250))}const s=await S.boot({coep:"credentialless"});return t({webcontainerInstance:s,onWebContainerTeardown:n}),s}catch(r){ee("Failed init:",r)}finally{t({ready:!0})}},teardown:async()=>{const n=e().webcontainerInstance;n&&n.teardown(),t({webcontainerInstance:void 0})},mounts:async n=>{try{const r=e().webcontainerInstance;if(!r)throw new Error("WebContainer instance is not ready");await r.mount(n)}catch(r){ee("Failed startContainer:",r)}}}),Z={},te=Ie()(Ae((t,e)=>({...Z,...Y(t,e)})))});export{Ne as __tla,te as u};
