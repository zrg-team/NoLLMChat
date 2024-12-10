import { x, s as sr, C } from './database.worker-8jWyu_u9.js';

x();var m=class extends sr{constructor(t){super(t),this.rootDir=undefined(t),undefined(undefined(this.rootDir))||undefined(this.rootDir);}async init(t,e){return this.pg=t,{emscriptenOpts:{...e,preRun:[...e.preRun||[],r=>{let c=r.FS.filesystems.NODEFS;r.FS.mkdir(C),r.FS.mount(c,{root:this.rootDir},C);}]}}}async closeFs(){this.pg.Module.FS.quit();}};

export { m as NodeFS };
//# sourceMappingURL=nodefs-yxBKoaWQ.js.map
