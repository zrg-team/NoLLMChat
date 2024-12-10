import { x as x$1, u as ur, L as L$1, P as P$1, g, h, R as R$1, c as cr } from './database.worker-8jWyu_u9.js';

x$1();var $="state.txt",G="data",T={DIR:16384,FILE:32768},H,v,F,M,y,b,m,x,P,D,S,n,C,O,k,w,f,I,W,j,L=class extends ur{constructor(e,{initialPoolSize:t=1e3,maintainedPoolSize:o=100,debug:i=!1}={}){super(e,{debug:i});L$1(this,n);L$1(this,H);L$1(this,v);L$1(this,F);L$1(this,M);L$1(this,y);L$1(this,b,new Map);L$1(this,m,new Map);L$1(this,x,0);L$1(this,P,new Map);L$1(this,D,new Map);this.lastCheckpoint=0;this.checkpointInterval=1e3*60;this.poolCounter=0;L$1(this,S,new Set);this.initialPoolSize=t,this.maintainedPoolSize=o;}async init(e,t){return await P$1(this,n,C).call(this),super.init(e,t)}async syncToFs(e=!1){await this.maybeCheckpointState(),await this.maintainPool(),e||this.flush();}async closeFs(){for(let e of g(this,m).values())e.close();g(this,y).flush(),g(this,y).close(),this.pg.Module.FS.quit();}async maintainPool(e){e=e||this.maintainedPoolSize;let t=e-this.state.pool.length,o=[];for(let i=0;i<t;i++)o.push(new Promise(async c=>{++this.poolCounter;let a=`${(Date.now()-1704063600).toString(16).padStart(8,"0")}-${this.poolCounter.toString(16).padStart(8,"0")}`,h=await g(this,F).getFileHandle(a,{create:!0}),d=await h.createSyncAccessHandle();g(this,b).set(a,h),g(this,m).set(a,d),P$1(this,n,k).call(this,{opp:"createPoolFile",args:[a]}),this.state.pool.push(a),c();}));for(let i=0;i>t;i--)o.push(new Promise(async c=>{let a=this.state.pool.pop();P$1(this,n,k).call(this,{opp:"deletePoolFile",args:[a]});let h=g(this,b).get(a);g(this,m).get(a)?.close(),await g(this,F).removeEntry(h.name),g(this,b).delete(a),g(this,m).delete(a),c();}));await Promise.all(o);}_createPoolFileState(e){this.state.pool.push(e);}_deletePoolFileState(e){let t=this.state.pool.indexOf(e);t>-1&&this.state.pool.splice(t,1);}async maybeCheckpointState(){Date.now()-this.lastCheckpoint>this.checkpointInterval&&await this.checkpointState();}async checkpointState(){let e=new TextEncoder().encode(JSON.stringify(this.state));g(this,y).truncate(0),g(this,y).write(e,{at:0}),g(this,y).flush(),this.lastCheckpoint=Date.now();}flush(){for(let e of g(this,S))try{e.flush();}catch{}g(this,S).clear();}chmod(e,t){P$1(this,n,O).call(this,{opp:"chmod",args:[e,t]},()=>{this._chmodState(e,t);});}_chmodState(e,t){let o=P$1(this,n,f).call(this,e);o.mode=t;}close(e){let t=P$1(this,n,I).call(this,e);g(this,P).delete(e),g(this,D).delete(t);}fstat(e){let t=P$1(this,n,I).call(this,e);return this.lstat(t)}lstat(e){let t=P$1(this,n,f).call(this,e),o=t.type==="file"?g(this,m).get(t.backingFilename).getSize():0,i=4096;return {dev:0,ino:0,mode:t.mode,nlink:1,uid:0,gid:0,rdev:0,size:o,blksize:i,blocks:Math.ceil(o/i),atime:t.lastModified,mtime:t.lastModified,ctime:t.lastModified}}mkdir(e,t){P$1(this,n,O).call(this,{opp:"mkdir",args:[e,t]},()=>{this._mkdirState(e,t);});}_mkdirState(e,t){let o=P$1(this,n,w).call(this,e),i=o.pop(),c=[],a=this.state.root;for(let d of o){if(c.push(e),!Object.prototype.hasOwnProperty.call(a.children,d))if(t?.recursive)this.mkdir(c.join("/"));else throw new p("ENOENT","No such file or directory");if(a.children[d].type!=="directory")throw new p("ENOTDIR","Not a directory");a=a.children[d];}if(Object.prototype.hasOwnProperty.call(a.children,i))throw new p("EEXIST","File exists");let h={type:"directory",lastModified:Date.now(),mode:t?.mode||T.DIR,children:{}};a.children[i]=h;}open(e,t,o){if(P$1(this,n,f).call(this,e).type!=="file")throw new p("EISDIR","Is a directory");let c=P$1(this,n,W).call(this);return g(this,P).set(c,e),g(this,D).set(e,c),c}readdir(e){let t=P$1(this,n,f).call(this,e);if(t.type!=="directory")throw new p("ENOTDIR","Not a directory");return Object.keys(t.children)}read(e,t,o,i,c){let a=P$1(this,n,I).call(this,e),h=P$1(this,n,f).call(this,a);if(h.type!=="file")throw new p("EISDIR","Is a directory");return g(this,m).get(h.backingFilename).read(new Uint8Array(t.buffer,o,i),{at:c})}rename(e,t){P$1(this,n,O).call(this,{opp:"rename",args:[e,t]},()=>{this._renameState(e,t,!0);});}_renameState(e,t,o=!1){let i=P$1(this,n,w).call(this,e),c=i.pop(),a=P$1(this,n,f).call(this,i.join("/"));if(!Object.prototype.hasOwnProperty.call(a.children,c))throw new p("ENOENT","No such file or directory");let h=P$1(this,n,w).call(this,t),d=h.pop(),l=P$1(this,n,f).call(this,h.join("/"));if(o&&Object.prototype.hasOwnProperty.call(l.children,d)){let u=l.children[d];g(this,m).get(u.backingFilename).truncate(0),this.state.pool.push(u.backingFilename);}l.children[d]=a.children[c],delete a.children[c];}rmdir(e){P$1(this,n,O).call(this,{opp:"rmdir",args:[e]},()=>{this._rmdirState(e);});}_rmdirState(e){let t=P$1(this,n,w).call(this,e),o=t.pop(),i=P$1(this,n,f).call(this,t.join("/"));if(!Object.prototype.hasOwnProperty.call(i.children,o))throw new p("ENOENT","No such file or directory");let c=i.children[o];if(c.type!=="directory")throw new p("ENOTDIR","Not a directory");if(Object.keys(c.children).length>0)throw new p("ENOTEMPTY","Directory not empty");delete i.children[o];}truncate(e,t=0){let o=P$1(this,n,f).call(this,e);if(o.type!=="file")throw new p("EISDIR","Is a directory");let i=g(this,m).get(o.backingFilename);if(!i)throw new p("ENOENT","No such file or directory");i.truncate(t),g(this,S).add(i);}unlink(e){P$1(this,n,O).call(this,{opp:"unlink",args:[e]},()=>{this._unlinkState(e,!0);});}_unlinkState(e,t=!1){let o=P$1(this,n,w).call(this,e),i=o.pop(),c=P$1(this,n,f).call(this,o.join("/"));if(!Object.prototype.hasOwnProperty.call(c.children,i))throw new p("ENOENT","No such file or directory");let a=c.children[i];if(a.type!=="file")throw new p("EISDIR","Is a directory");if(delete c.children[i],t){let h=g(this,m).get(a.backingFilename);h?.truncate(0),g(this,S).add(h),g(this,D).has(e)&&(g(this,P).delete(g(this,D).get(e)),g(this,D).delete(e));}this.state.pool.push(a.backingFilename);}utimes(e,t,o){P$1(this,n,O).call(this,{opp:"utimes",args:[e,t,o]},()=>{this._utimesState(e,t,o);});}_utimesState(e,t,o){let i=P$1(this,n,f).call(this,e);i.lastModified=o;}writeFile(e,t,o){let i=P$1(this,n,w).call(this,e),c=i.pop(),a=P$1(this,n,f).call(this,i.join("/"));if(Object.prototype.hasOwnProperty.call(a.children,c)){let l=a.children[c];l.lastModified=Date.now(),P$1(this,n,k).call(this,{opp:"setLastModified",args:[e,l.lastModified]});}else {if(this.state.pool.length===0)throw new Error("No more file handles available in the pool");let l={type:"file",lastModified:Date.now(),mode:o?.mode||T.FILE,backingFilename:this.state.pool.pop()};a.children[c]=l,P$1(this,n,k).call(this,{opp:"createFileNode",args:[e,l]});}let h=a.children[c],d=g(this,m).get(h.backingFilename);t.length>0&&(d.write(typeof t=="string"?new TextEncoder().encode(t):new Uint8Array(t),{at:0}),e.startsWith("/pg_wal")&&g(this,S).add(d));}_createFileNodeState(e,t){let o=P$1(this,n,w).call(this,e),i=o.pop(),c=P$1(this,n,f).call(this,o.join("/"));c.children[i]=t;let a=this.state.pool.indexOf(t.backingFilename);return a>-1&&this.state.pool.splice(a,1),t}_setLastModifiedState(e,t){let o=P$1(this,n,f).call(this,e);o.lastModified=t;}write(e,t,o,i,c){let a=P$1(this,n,I).call(this,e),h=P$1(this,n,f).call(this,a);if(h.type!=="file")throw new p("EISDIR","Is a directory");let d=g(this,m).get(h.backingFilename);if(!d)throw new p("EBADF","Bad file descriptor");let l=d.write(new Uint8Array(t,o,i),{at:c});return a.startsWith("/pg_wal")&&g(this,S).add(d),l}};H=new WeakMap,v=new WeakMap,F=new WeakMap,M=new WeakMap,y=new WeakMap,b=new WeakMap,m=new WeakMap,x=new WeakMap,P=new WeakMap,D=new WeakMap,S=new WeakMap,n=new WeakSet,C=async function(){h(this,H,await navigator.storage.getDirectory()),h(this,v,await P$1(this,n,j).call(this,this.dataDir,{create:!0})),h(this,F,await P$1(this,n,j).call(this,G,{from:g(this,v),create:!0})),h(this,M,await g(this,v).getFileHandle($,{create:!0})),h(this,y,await g(this,M).createSyncAccessHandle());let e=new ArrayBuffer(g(this,y).getSize());g(this,y).read(e,{at:0});let t,o=new TextDecoder().decode(e).split(`
`),i=!1;try{t=JSON.parse(o[0]);}catch{t={root:{type:"directory",lastModified:Date.now(),mode:T.DIR,children:{}},pool:[]},g(this,y).truncate(0),g(this,y).write(new TextEncoder().encode(JSON.stringify(t)),{at:0}),i=!0;}this.state=t;let c=o.slice(1).filter(Boolean).map(l=>JSON.parse(l));for(let l of c){let u=`_${l.opp}State`;if(typeof this[u]=="function")try{this[u].bind(this)(...l.args);}catch(N){console.warn("Error applying OPFS AHP WAL entry",l,N);}}let a=[],h$1=async l=>{if(l.type==="file")try{let u=await g(this,F).getFileHandle(l.backingFilename),N=await u.createSyncAccessHandle();g(this,b).set(l.backingFilename,u),g(this,m).set(l.backingFilename,N);}catch(u){console.error("Error opening file handle for node",l,u);}else for(let u of Object.values(l.children))a.push(h$1(u));};await h$1(this.state.root);let d=[];for(let l of this.state.pool)d.push(new Promise(async u=>{g(this,b).has(l)&&console.warn("File handle already exists for pool file",l);let N=await g(this,F).getFileHandle(l),U=await N.createSyncAccessHandle();g(this,b).set(l,N),g(this,m).set(l,U),u();}));await Promise.all([...a,...d]),await this.maintainPool(i?this.initialPoolSize:this.maintainedPoolSize);},O=function(e,t){let o=P$1(this,n,k).call(this,e);try{t();}catch(i){throw g(this,y).truncate(o),i}},k=function(e){let t=JSON.stringify(e),o=new TextEncoder().encode(`
${t}`),i=g(this,y).getSize();return g(this,y).write(o,{at:i}),g(this,S).add(g(this,y)),i},w=function(e){return e.split("/").filter(Boolean)},f=function(e,t){let o=P$1(this,n,w).call(this,e),i=t||this.state.root;for(let c of o){if(i.type!=="directory")throw new p("ENOTDIR","Not a directory");if(!Object.prototype.hasOwnProperty.call(i.children,c))throw new p("ENOENT","No such file or directory");i=i.children[c];}return i},I=function(e){let t=g(this,P).get(e);if(!t)throw new p("EBADF","Bad file descriptor");return t},W=function(){let e=++R$1(this,x)._;for(;g(this,P).has(e);)R$1(this,x)._++;return e},j=async function(e,t){let o=P$1(this,n,w).call(this,e),i=t?.from||g(this,H);for(let c of o)i=await i.getDirectoryHandle(c,{create:t?.create});return i};var p=class extends Error{constructor(A,e){super(e),typeof A=="number"?this.code=A:typeof A=="string"&&(this.code=cr[A]);}};

export { L as OpfsAhpFS };
//# sourceMappingURL=opfs-ahp-OoptZhUh.js.map
