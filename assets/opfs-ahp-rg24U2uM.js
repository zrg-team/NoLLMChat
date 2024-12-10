import{x as A,u as $,L as m,P as o,g as s,h as M,R,c as C}from"./database.worker-C7R6V5Gd.js";A();var L="state.txt",B="data",W={DIR:16384,FILE:32768},_,I,N,T,f,k,y,j,F,O,S,l,v,E,P,g,w,D,z,x,U=class extends ${constructor(t,{initialPoolSize:e=1e3,maintainedPoolSize:a=100,debug:i=!1}={}){super(t,{debug:i}),m(this,l),m(this,_),m(this,I),m(this,N),m(this,T),m(this,f),m(this,k,new Map),m(this,y,new Map),m(this,j,0),m(this,F,new Map),m(this,O,new Map),this.lastCheckpoint=0,this.checkpointInterval=1e3*60,this.poolCounter=0,m(this,S,new Set),this.initialPoolSize=e,this.maintainedPoolSize=a}async init(t,e){return await o(this,l,v).call(this),super.init(t,e)}async syncToFs(t=!1){await this.maybeCheckpointState(),await this.maintainPool(),t||this.flush()}async closeFs(){for(let t of s(this,y).values())t.close();s(this,f).flush(),s(this,f).close(),this.pg.Module.FS.quit()}async maintainPool(t){t=t||this.maintainedPoolSize;let e=t-this.state.pool.length,a=[];for(let i=0;i<e;i++)a.push(new Promise(async r=>{++this.poolCounter;let h=`${(Date.now()-1704063600).toString(16).padStart(8,"0")}-${this.poolCounter.toString(16).padStart(8,"0")}`,c=await s(this,N).getFileHandle(h,{create:!0}),d=await c.createSyncAccessHandle();s(this,k).set(h,c),s(this,y).set(h,d),o(this,l,P).call(this,{opp:"createPoolFile",args:[h]}),this.state.pool.push(h),r()}));for(let i=0;i>e;i--)a.push(new Promise(async r=>{let h=this.state.pool.pop();o(this,l,P).call(this,{opp:"deletePoolFile",args:[h]});let c=s(this,k).get(h);s(this,y).get(h)?.close(),await s(this,N).removeEntry(c.name),s(this,k).delete(h),s(this,y).delete(h),r()}));await Promise.all(a)}_createPoolFileState(t){this.state.pool.push(t)}_deletePoolFileState(t){let e=this.state.pool.indexOf(t);e>-1&&this.state.pool.splice(e,1)}async maybeCheckpointState(){Date.now()-this.lastCheckpoint>this.checkpointInterval&&await this.checkpointState()}async checkpointState(){let t=new TextEncoder().encode(JSON.stringify(this.state));s(this,f).truncate(0),s(this,f).write(t,{at:0}),s(this,f).flush(),this.lastCheckpoint=Date.now()}flush(){for(let t of s(this,S))try{t.flush()}catch{}s(this,S).clear()}chmod(t,e){o(this,l,E).call(this,{opp:"chmod",args:[t,e]},()=>{this._chmodState(t,e)})}_chmodState(t,e){let a=o(this,l,w).call(this,t);a.mode=e}close(t){let e=o(this,l,D).call(this,t);s(this,F).delete(t),s(this,O).delete(e)}fstat(t){let e=o(this,l,D).call(this,t);return this.lstat(e)}lstat(t){let e=o(this,l,w).call(this,t),a=e.type==="file"?s(this,y).get(e.backingFilename).getSize():0,i=4096;return{dev:0,ino:0,mode:e.mode,nlink:1,uid:0,gid:0,rdev:0,size:a,blksize:i,blocks:Math.ceil(a/i),atime:e.lastModified,mtime:e.lastModified,ctime:e.lastModified}}mkdir(t,e){o(this,l,E).call(this,{opp:"mkdir",args:[t,e]},()=>{this._mkdirState(t,e)})}_mkdirState(t,e){let a=o(this,l,g).call(this,t),i=a.pop(),r=[],h=this.state.root;for(let d of a){if(r.push(t),!Object.prototype.hasOwnProperty.call(h.children,d))if(e?.recursive)this.mkdir(r.join("/"));else throw new p("ENOENT","No such file or directory");if(h.children[d].type!=="directory")throw new p("ENOTDIR","Not a directory");h=h.children[d]}if(Object.prototype.hasOwnProperty.call(h.children,i))throw new p("EEXIST","File exists");let c={type:"directory",lastModified:Date.now(),mode:e?.mode||W.DIR,children:{}};h.children[i]=c}open(t,e,a){if(o(this,l,w).call(this,t).type!=="file")throw new p("EISDIR","Is a directory");let i=o(this,l,z).call(this);return s(this,F).set(i,t),s(this,O).set(t,i),i}readdir(t){let e=o(this,l,w).call(this,t);if(e.type!=="directory")throw new p("ENOTDIR","Not a directory");return Object.keys(e.children)}read(t,e,a,i,r){let h=o(this,l,D).call(this,t),c=o(this,l,w).call(this,h);if(c.type!=="file")throw new p("EISDIR","Is a directory");return s(this,y).get(c.backingFilename).read(new Uint8Array(e.buffer,a,i),{at:r})}rename(t,e){o(this,l,E).call(this,{opp:"rename",args:[t,e]},()=>{this._renameState(t,e,!0)})}_renameState(t,e,a=!1){let i=o(this,l,g).call(this,t),r=i.pop(),h=o(this,l,w).call(this,i.join("/"));if(!Object.prototype.hasOwnProperty.call(h.children,r))throw new p("ENOENT","No such file or directory");let c=o(this,l,g).call(this,e),d=c.pop(),n=o(this,l,w).call(this,c.join("/"));if(a&&Object.prototype.hasOwnProperty.call(n.children,d)){let u=n.children[d];s(this,y).get(u.backingFilename).truncate(0),this.state.pool.push(u.backingFilename)}n.children[d]=h.children[r],delete h.children[r]}rmdir(t){o(this,l,E).call(this,{opp:"rmdir",args:[t]},()=>{this._rmdirState(t)})}_rmdirState(t){let e=o(this,l,g).call(this,t),a=e.pop(),i=o(this,l,w).call(this,e.join("/"));if(!Object.prototype.hasOwnProperty.call(i.children,a))throw new p("ENOENT","No such file or directory");let r=i.children[a];if(r.type!=="directory")throw new p("ENOTDIR","Not a directory");if(Object.keys(r.children).length>0)throw new p("ENOTEMPTY","Directory not empty");delete i.children[a]}truncate(t,e=0){let a=o(this,l,w).call(this,t);if(a.type!=="file")throw new p("EISDIR","Is a directory");let i=s(this,y).get(a.backingFilename);if(!i)throw new p("ENOENT","No such file or directory");i.truncate(e),s(this,S).add(i)}unlink(t){o(this,l,E).call(this,{opp:"unlink",args:[t]},()=>{this._unlinkState(t,!0)})}_unlinkState(t,e=!1){let a=o(this,l,g).call(this,t),i=a.pop(),r=o(this,l,w).call(this,a.join("/"));if(!Object.prototype.hasOwnProperty.call(r.children,i))throw new p("ENOENT","No such file or directory");let h=r.children[i];if(h.type!=="file")throw new p("EISDIR","Is a directory");if(delete r.children[i],e){let c=s(this,y).get(h.backingFilename);c?.truncate(0),s(this,S).add(c),s(this,O).has(t)&&(s(this,F).delete(s(this,O).get(t)),s(this,O).delete(t))}this.state.pool.push(h.backingFilename)}utimes(t,e,a){o(this,l,E).call(this,{opp:"utimes",args:[t,e,a]},()=>{this._utimesState(t,e,a)})}_utimesState(t,e,a){let i=o(this,l,w).call(this,t);i.lastModified=a}writeFile(t,e,a){let i=o(this,l,g).call(this,t),r=i.pop(),h=o(this,l,w).call(this,i.join("/"));if(Object.prototype.hasOwnProperty.call(h.children,r)){let n=h.children[r];n.lastModified=Date.now(),o(this,l,P).call(this,{opp:"setLastModified",args:[t,n.lastModified]})}else{if(this.state.pool.length===0)throw new Error("No more file handles available in the pool");let n={type:"file",lastModified:Date.now(),mode:a?.mode||W.FILE,backingFilename:this.state.pool.pop()};h.children[r]=n,o(this,l,P).call(this,{opp:"createFileNode",args:[t,n]})}let c=h.children[r],d=s(this,y).get(c.backingFilename);e.length>0&&(d.write(typeof e=="string"?new TextEncoder().encode(e):new Uint8Array(e),{at:0}),t.startsWith("/pg_wal")&&s(this,S).add(d))}_createFileNodeState(t,e){let a=o(this,l,g).call(this,t),i=a.pop(),r=o(this,l,w).call(this,a.join("/"));r.children[i]=e;let h=this.state.pool.indexOf(e.backingFilename);return h>-1&&this.state.pool.splice(h,1),e}_setLastModifiedState(t,e){let a=o(this,l,w).call(this,t);a.lastModified=e}write(t,e,a,i,r){let h=o(this,l,D).call(this,t),c=o(this,l,w).call(this,h);if(c.type!=="file")throw new p("EISDIR","Is a directory");let d=s(this,y).get(c.backingFilename);if(!d)throw new p("EBADF","Bad file descriptor");let n=d.write(new Uint8Array(e,a,i),{at:r});return h.startsWith("/pg_wal")&&s(this,S).add(d),n}};_=new WeakMap,I=new WeakMap,N=new WeakMap,T=new WeakMap,f=new WeakMap,k=new WeakMap,y=new WeakMap,j=new WeakMap,F=new WeakMap,O=new WeakMap,S=new WeakMap,l=new WeakSet,v=async function(){M(this,_,await navigator.storage.getDirectory()),M(this,I,await o(this,l,x).call(this,this.dataDir,{create:!0})),M(this,N,await o(this,l,x).call(this,B,{from:s(this,I),create:!0})),M(this,T,await s(this,I).getFileHandle(L,{create:!0})),M(this,f,await s(this,T).createSyncAccessHandle());let t=new ArrayBuffer(s(this,f).getSize());s(this,f).read(t,{at:0});let e,a=new TextDecoder().decode(t).split(`
`),i=!1;try{e=JSON.parse(a[0])}catch{e={root:{type:"directory",lastModified:Date.now(),mode:W.DIR,children:{}},pool:[]},s(this,f).truncate(0),s(this,f).write(new TextEncoder().encode(JSON.stringify(e)),{at:0}),i=!0}this.state=e;let r=a.slice(1).filter(Boolean).map(n=>JSON.parse(n));for(let n of r){let u=`_${n.opp}State`;if(typeof this[u]=="function")try{this[u].bind(this)(...n.args)}catch(b){console.warn("Error applying OPFS AHP WAL entry",n,b)}}let h=[],c=async n=>{if(n.type==="file")try{let u=await s(this,N).getFileHandle(n.backingFilename),b=await u.createSyncAccessHandle();s(this,k).set(n.backingFilename,u),s(this,y).set(n.backingFilename,b)}catch(u){console.error("Error opening file handle for node",n,u)}else for(let u of Object.values(n.children))h.push(c(u))};await c(this.state.root);let d=[];for(let n of this.state.pool)d.push(new Promise(async u=>{s(this,k).has(n)&&console.warn("File handle already exists for pool file",n);let b=await s(this,N).getFileHandle(n),H=await b.createSyncAccessHandle();s(this,k).set(n,b),s(this,y).set(n,H),u()}));await Promise.all([...h,...d]),await this.maintainPool(i?this.initialPoolSize:this.maintainedPoolSize)},E=function(t,e){let a=o(this,l,P).call(this,t);try{e()}catch(i){throw s(this,f).truncate(a),i}},P=function(t){let e=JSON.stringify(t),a=new TextEncoder().encode(`
${e}`),i=s(this,f).getSize();return s(this,f).write(a,{at:i}),s(this,S).add(s(this,f)),i},g=function(t){return t.split("/").filter(Boolean)},w=function(t,e){let a=o(this,l,g).call(this,t),i=e||this.state.root;for(let r of a){if(i.type!=="directory")throw new p("ENOTDIR","Not a directory");if(!Object.prototype.hasOwnProperty.call(i.children,r))throw new p("ENOENT","No such file or directory");i=i.children[r]}return i},D=function(t){let e=s(this,F).get(t);if(!e)throw new p("EBADF","Bad file descriptor");return e},z=function(){let t=++R(this,j)._;for(;s(this,F).has(t);)R(this,j)._++;return t},x=async function(t,e){let a=o(this,l,g).call(this,t),i=e?.from||s(this,_);for(let r of a)i=await i.getDirectoryHandle(r,{create:e?.create});return i};var p=class extends Error{constructor(t,e){super(e),typeof t=="number"?this.code=t:typeof t=="string"&&(this.code=C[t])}};export{U as OpfsAhpFS};
