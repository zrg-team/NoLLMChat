import{a8 as K,__tla as Q}from"./index-DlgZvHNC.js";import{P as V,o as X,p as Y,D as Z,q as w,T as A,I as tt,__tla as et}from"./CodeContainerApp-C8e8kkPq.js";let M,$,y,N,st=Promise.all([(()=>{try{return Q}catch{}})(),(()=>{try{return et}catch{}})()]).then(async()=>{var R={};class b{constructor(t,e,s,r,n,i,o,a,l,u=0,c){this.p=t,this.stack=e,this.state=s,this.reducePos=r,this.pos=n,this.score=i,this.buffer=o,this.bufferBase=a,this.curContext=l,this.lookAhead=u,this.parent=c}toString(){return`[${this.stack.filter((t,e)=>e%3==0).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`}static start(t,e,s=0){let r=t.parser.context;return new b(t,[],e,s,s,0,[],0,r?new z(r,r.start):null,0,null)}get context(){return this.curContext?this.curContext.context:null}pushState(t,e){this.stack.push(this.state,e,this.bufferBase+this.buffer.length),this.state=t}reduce(t){var e;let s=t>>19,r=t&65535,{parser:n}=this.p,i=this.reducePos<this.pos-25;i&&this.setLookAhead(this.pos);let o=n.dynamicPrecedence(r);if(o&&(this.score+=o),s==0){this.pushState(n.getGoto(this.state,r,!0),this.reducePos),r<n.minRepeatTerm&&this.storeNode(r,this.reducePos,this.reducePos,i?8:4,!0),this.reduceContext(r,this.reducePos);return}let a=this.stack.length-(s-1)*3-(t&262144?6:0),l=a?this.stack[a-2]:this.p.ranges[0].from,u=this.reducePos-l;u>=2e3&&!(!((e=this.p.parser.nodeSet.types[r])===null||e===void 0)&&e.isAnonymous)&&(l==this.p.lastBigReductionStart?(this.p.bigReductionCount++,this.p.lastBigReductionSize=u):this.p.lastBigReductionSize<u&&(this.p.bigReductionCount=1,this.p.lastBigReductionStart=l,this.p.lastBigReductionSize=u));let c=a?this.stack[a-1]:0,p=this.bufferBase+this.buffer.length-c;if(r<n.minRepeatTerm||t&131072){let f=n.stateFlag(this.state,1)?this.pos:this.reducePos;this.storeNode(r,l,f,p+4,!0)}if(t&262144)this.state=this.stack[a];else{let f=this.stack[a-3];this.state=n.getGoto(f,r,!0)}for(;this.stack.length>a;)this.stack.pop();this.reduceContext(r,l)}storeNode(t,e,s,r=4,n=!1){if(t==0&&(!this.stack.length||this.stack[this.stack.length-1]<this.buffer.length+this.bufferBase)){let i=this,o=this.buffer.length;if(o==0&&i.parent&&(o=i.bufferBase-i.parent.bufferBase,i=i.parent),o>0&&i.buffer[o-4]==0&&i.buffer[o-1]>-1){if(e==s)return;if(i.buffer[o-2]>=e){i.buffer[o-2]=s;return}}}if(!n||this.pos==s)this.buffer.push(t,e,s,r);else{let i=this.buffer.length;if(i>0&&this.buffer[i-4]!=0){let o=!1;for(let a=i;a>0&&this.buffer[a-2]>s;a-=4)if(this.buffer[a-1]>=0){o=!0;break}if(o)for(;i>0&&this.buffer[i-2]>s;)this.buffer[i]=this.buffer[i-4],this.buffer[i+1]=this.buffer[i-3],this.buffer[i+2]=this.buffer[i-2],this.buffer[i+3]=this.buffer[i-1],i-=4,r>4&&(r-=4)}this.buffer[i]=t,this.buffer[i+1]=e,this.buffer[i+2]=s,this.buffer[i+3]=r}}shift(t,e,s,r){if(t&131072)this.pushState(t&65535,this.pos);else if(t&262144)this.pos=r,this.shiftContext(e,s),e<=this.p.parser.maxNode&&this.buffer.push(e,s,r,4);else{let n=t,{parser:i}=this.p;(r>this.pos||e<=i.maxNode)&&(this.pos=r,i.stateFlag(n,1)||(this.reducePos=r)),this.pushState(n,s),this.shiftContext(e,s),e<=i.maxNode&&this.buffer.push(e,s,r,4)}}apply(t,e,s,r){t&65536?this.reduce(t):this.shift(t,e,s,r)}useNode(t,e){let s=this.p.reused.length-1;(s<0||this.p.reused[s]!=t)&&(this.p.reused.push(t),s++);let r=this.pos;this.reducePos=this.pos=r+t.length,this.pushState(e,r),this.buffer.push(s,r,this.reducePos,-1),this.curContext&&this.updateContext(this.curContext.tracker.reuse(this.curContext.context,t,this,this.p.stream.reset(this.pos-t.length)))}split(){let t=this,e=t.buffer.length;for(;e>0&&t.buffer[e-2]>t.reducePos;)e-=4;let s=t.buffer.slice(e),r=t.bufferBase+e;for(;t&&r==t.bufferBase;)t=t.parent;return new b(this.p,this.stack.slice(),this.state,this.reducePos,this.pos,this.score,s,r,this.curContext,this.lookAhead,t)}recoverByDelete(t,e){let s=t<=this.p.parser.maxNode;s&&this.storeNode(t,this.pos,e,4),this.storeNode(0,this.pos,e,s?8:4),this.pos=this.reducePos=e,this.score-=190}canShift(t){for(let e=new E(this);;){let s=this.p.parser.stateSlot(e.state,4)||this.p.parser.hasAction(e.state,t);if(s==0)return!1;if(!(s&65536))return!0;e.reduce(s)}}recoverByInsert(t){if(this.stack.length>=300)return[];let e=this.p.parser.nextStates(this.state);if(e.length>8||this.stack.length>=120){let r=[];for(let n=0,i;n<e.length;n+=2)(i=e[n+1])!=this.state&&this.p.parser.hasAction(i,t)&&r.push(e[n],i);if(this.stack.length<120)for(let n=0;r.length<8&&n<e.length;n+=2){let i=e[n+1];r.some((o,a)=>a&1&&o==i)||r.push(e[n],i)}e=r}let s=[];for(let r=0;r<e.length&&s.length<4;r+=2){let n=e[r+1];if(n==this.state)continue;let i=this.split();i.pushState(n,this.pos),i.storeNode(0,i.pos,i.pos,4,!0),i.shiftContext(e[r],this.pos),i.reducePos=this.pos,i.score-=200,s.push(i)}return s}forceReduce(){let{parser:t}=this.p,e=t.stateSlot(this.state,5);if(!(e&65536))return!1;if(!t.validAction(this.state,e)){let s=e>>19,r=e&65535,n=this.stack.length-s*3;if(n<0||t.getGoto(this.stack[n],r,!1)<0){let i=this.findForcedReduction();if(i==null)return!1;e=i}this.storeNode(0,this.pos,this.pos,4,!0),this.score-=100}return this.reducePos=this.pos,this.reduce(e),!0}findForcedReduction(){let{parser:t}=this.p,e=[],s=(r,n)=>{if(!e.includes(r))return e.push(r),t.allActions(r,i=>{if(!(i&393216))if(i&65536){let o=(i>>19)-n;if(o>1){let a=i&65535,l=this.stack.length-o*3;if(l>=0&&t.getGoto(this.stack[l],a,!1)>=0)return o<<19|65536|a}}else{let o=s(i,n+1);if(o!=null)return o}})};return s(this.state,0)}forceAll(){for(;!this.p.parser.stateFlag(this.state,2);)if(!this.forceReduce()){this.storeNode(0,this.pos,this.pos,4,!0);break}return this}get deadEnd(){if(this.stack.length!=3)return!1;let{parser:t}=this.p;return t.data[t.stateSlot(this.state,1)]==65535&&!t.stateSlot(this.state,4)}restart(){this.storeNode(0,this.pos,this.pos,4,!0),this.state=this.stack[0],this.stack.length=0}sameState(t){if(this.state!=t.state||this.stack.length!=t.stack.length)return!1;for(let e=0;e<this.stack.length;e+=3)if(this.stack[e]!=t.stack[e])return!1;return!0}get parser(){return this.p.parser}dialectEnabled(t){return this.p.parser.dialect.flags[t]}shiftContext(t,e){this.curContext&&this.updateContext(this.curContext.tracker.shift(this.curContext.context,t,this,this.p.stream.reset(e)))}reduceContext(t,e){this.curContext&&this.updateContext(this.curContext.tracker.reduce(this.curContext.context,t,this,this.p.stream.reset(e)))}emitContext(){let t=this.buffer.length-1;(t<0||this.buffer[t]!=-3)&&this.buffer.push(this.curContext.hash,this.pos,this.pos,-3)}emitLookAhead(){let t=this.buffer.length-1;(t<0||this.buffer[t]!=-4)&&this.buffer.push(this.lookAhead,this.pos,this.pos,-4)}updateContext(t){if(t!=this.curContext.context){let e=new z(this.curContext.tracker,t);e.hash!=this.curContext.hash&&this.emitContext(),this.curContext=e}}setLookAhead(t){t>this.lookAhead&&(this.emitLookAhead(),this.lookAhead=t)}close(){this.curContext&&this.curContext.tracker.strict&&this.emitContext(),this.lookAhead>0&&this.emitLookAhead()}}class z{constructor(t,e){this.tracker=t,this.context=e,this.hash=t.strict?t.hash(e):0}}class E{constructor(t){this.start=t,this.state=t.state,this.stack=t.stack,this.base=this.stack.length}reduce(t){let e=t&65535,s=t>>19;s==0?(this.stack==this.start.stack&&(this.stack=this.stack.slice()),this.stack.push(this.state,0,0),this.base+=3):this.base-=(s-1)*3;let r=this.start.p.parser.getGoto(this.stack[this.base-3],e,!0);this.state=r}}class S{constructor(t,e,s){this.stack=t,this.pos=e,this.index=s,this.buffer=t.buffer,this.index==0&&this.maybeNext()}static create(t,e=t.bufferBase+t.buffer.length){return new S(t,e,e-t.bufferBase)}maybeNext(){let t=this.stack.parent;t!=null&&(this.index=this.stack.bufferBase-t.bufferBase,this.stack=t,this.buffer=t.buffer)}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}next(){this.index-=4,this.pos-=4,this.index==0&&this.maybeNext()}fork(){return new S(this.stack,this.pos,this.index)}}function x(h,t=Uint16Array){if(typeof h!="string")return h;let e=null;for(let s=0,r=0;s<h.length;){let n=0;for(;;){let i=h.charCodeAt(s++),o=!1;if(i==126){n=65535;break}i>=92&&i--,i>=34&&i--;let a=i-32;if(a>=46&&(a-=46,o=!0),n+=a,o)break;n*=46}e?e[r++]=n:e=new t(n)}return e}class P{constructor(){this.start=-1,this.value=-1,this.end=-1,this.extended=-1,this.lookAhead=0,this.mask=0,this.context=0}}const I=new P;class G{constructor(t,e){this.input=t,this.ranges=e,this.chunk="",this.chunkOff=0,this.chunk2="",this.chunk2Pos=0,this.next=-1,this.token=I,this.rangeIndex=0,this.pos=this.chunkPos=e[0].from,this.range=e[0],this.end=e[e.length-1].to,this.readNext()}resolveOffset(t,e){let s=this.range,r=this.rangeIndex,n=this.pos+t;for(;n<s.from;){if(!r)return null;let i=this.ranges[--r];n-=s.from-i.to,s=i}for(;e<0?n>s.to:n>=s.to;){if(r==this.ranges.length-1)return null;let i=this.ranges[++r];n+=i.from-s.to,s=i}return n}clipPos(t){if(t>=this.range.from&&t<this.range.to)return t;for(let e of this.ranges)if(e.to>t)return Math.max(t,e.from);return this.end}peek(t){let e=this.chunkOff+t,s,r;if(e>=0&&e<this.chunk.length)s=this.pos+t,r=this.chunk.charCodeAt(e);else{let n=this.resolveOffset(t,1);if(n==null)return-1;if(s=n,s>=this.chunk2Pos&&s<this.chunk2Pos+this.chunk2.length)r=this.chunk2.charCodeAt(s-this.chunk2Pos);else{let i=this.rangeIndex,o=this.range;for(;o.to<=s;)o=this.ranges[++i];this.chunk2=this.input.chunk(this.chunk2Pos=s),s+this.chunk2.length>o.to&&(this.chunk2=this.chunk2.slice(0,o.to-s)),r=this.chunk2.charCodeAt(0)}}return s>=this.token.lookAhead&&(this.token.lookAhead=s+1),r}acceptToken(t,e=0){let s=e?this.resolveOffset(e,-1):this.pos;if(s==null||s<this.token.start)throw new RangeError("Token end out of bounds");this.token.value=t,this.token.end=s}acceptTokenTo(t,e){this.token.value=t,this.token.end=e}getChunk(){if(this.pos>=this.chunk2Pos&&this.pos<this.chunk2Pos+this.chunk2.length){let{chunk:t,chunkPos:e}=this;this.chunk=this.chunk2,this.chunkPos=this.chunk2Pos,this.chunk2=t,this.chunk2Pos=e,this.chunkOff=this.pos-this.chunkPos}else{this.chunk2=this.chunk,this.chunk2Pos=this.chunkPos;let t=this.input.chunk(this.pos),e=this.pos+t.length;this.chunk=e>this.range.to?t.slice(0,this.range.to-this.pos):t,this.chunkPos=this.pos,this.chunkOff=0}}readNext(){return this.chunkOff>=this.chunk.length&&(this.getChunk(),this.chunkOff==this.chunk.length)?this.next=-1:this.next=this.chunk.charCodeAt(this.chunkOff)}advance(t=1){for(this.chunkOff+=t;this.pos+t>=this.range.to;){if(this.rangeIndex==this.ranges.length-1)return this.setDone();t-=this.range.to-this.pos,this.range=this.ranges[++this.rangeIndex],this.pos=this.range.from}return this.pos+=t,this.pos>=this.token.lookAhead&&(this.token.lookAhead=this.pos+1),this.readNext()}setDone(){return this.pos=this.chunkPos=this.end,this.range=this.ranges[this.rangeIndex=this.ranges.length-1],this.chunk="",this.next=-1}reset(t,e){if(e?(this.token=e,e.start=t,e.lookAhead=t+1,e.value=e.extended=-1):this.token=I,this.pos!=t){if(this.pos=t,t==this.end)return this.setDone(),this;for(;t<this.range.from;)this.range=this.ranges[--this.rangeIndex];for(;t>=this.range.to;)this.range=this.ranges[++this.rangeIndex];t>=this.chunkPos&&t<this.chunkPos+this.chunk.length?this.chunkOff=t-this.chunkPos:(this.chunk="",this.chunkOff=0),this.readNext()}return this}read(t,e){if(t>=this.chunkPos&&e<=this.chunkPos+this.chunk.length)return this.chunk.slice(t-this.chunkPos,e-this.chunkPos);if(t>=this.chunk2Pos&&e<=this.chunk2Pos+this.chunk2.length)return this.chunk2.slice(t-this.chunk2Pos,e-this.chunk2Pos);if(t>=this.range.from&&e<=this.range.to)return this.input.read(t,e);let s="";for(let r of this.ranges){if(r.from>=e)break;r.to>t&&(s+=this.input.read(Math.max(r.from,t),Math.min(r.to,e)))}return s}}class m{constructor(t,e){this.data=t,this.id=e}token(t,e){let{parser:s}=e.p;B(this.data,t,e,this.id,s.data,s.tokenPrecTable)}}m.prototype.contextual=m.prototype.fallback=m.prototype.extend=!1,N=class{constructor(h,t,e){this.precTable=t,this.elseToken=e,this.data=typeof h=="string"?x(h):h}token(h,t){let e=h.pos,s=0;for(;;){let r=h.next<0,n=h.resolveOffset(1,1);if(B(this.data,h,t,0,this.data,this.precTable),h.token.value>-1)break;if(this.elseToken==null)return;if(r||s++,n==null)break;h.reset(n,h.token)}s&&(h.reset(e,h.token),h.acceptToken(this.elseToken,s))}},N.prototype.contextual=m.prototype.fallback=m.prototype.extend=!1,$=class{constructor(h,t={}){this.token=h,this.contextual=!!t.contextual,this.fallback=!!t.fallback,this.extend=!!t.extend}};function B(h,t,e,s,r,n){let i=0,o=1<<s,{dialect:a}=e.p.parser;t:for(;o&h[i];){let l=h[i+1];for(let f=i+3;f<l;f+=2)if((h[f+1]&o)>0){let d=h[f];if(a.allows(d)&&(t.token.value==-1||t.token.value==d||j(d,t.token.value,r,n))){t.acceptToken(d);break}}let u=t.next,c=0,p=h[i+2];if(t.next<0&&p>c&&h[l+p*3-3]==65535){i=h[l+p*3-1];continue t}for(;c<p;){let f=c+p>>1,d=l+f+(f<<1),v=h[d],J=h[d+1]||65536;if(u<v)p=f;else if(u>=J)c=f+1;else{i=h[d+2],t.advance();continue t}}break}}function D(h,t,e){for(let s=t,r;(r=h[s])!=65535;s++)if(r==e)return s-t;return-1}function j(h,t,e,s){let r=D(e,s,t);return r<0||D(e,s,h)<r}const k=typeof K<"u"&&R&&/\bparse\b/.test(R.LOG);let C=null;function O(h,t,e){let s=h.cursor(tt.IncludeAnonymous);for(s.moveTo(t);;)if(!(e<0?s.childBefore(t):s.childAfter(t)))for(;;){if((e<0?s.to<t:s.from>t)&&!s.type.isError)return e<0?Math.max(0,Math.min(s.to-1,t-25)):Math.min(h.length,Math.max(s.from+1,t+25));if(e<0?s.prevSibling():s.nextSibling())break;if(!s.parent())return e<0?0:h.length}}class _{constructor(t,e){this.fragments=t,this.nodeSet=e,this.i=0,this.fragment=null,this.safeFrom=-1,this.safeTo=-1,this.trees=[],this.start=[],this.index=[],this.nextFragment()}nextFragment(){let t=this.fragment=this.i==this.fragments.length?null:this.fragments[this.i++];if(t){for(this.safeFrom=t.openStart?O(t.tree,t.from+t.offset,1)-t.offset:t.from,this.safeTo=t.openEnd?O(t.tree,t.to+t.offset,-1)-t.offset:t.to;this.trees.length;)this.trees.pop(),this.start.pop(),this.index.pop();this.trees.push(t.tree),this.start.push(-t.offset),this.index.push(0),this.nextStart=this.safeFrom}else this.nextStart=1e9}nodeAt(t){if(t<this.nextStart)return null;for(;this.fragment&&this.safeTo<=t;)this.nextFragment();if(!this.fragment)return null;for(;;){let e=this.trees.length-1;if(e<0)return this.nextFragment(),null;let s=this.trees[e],r=this.index[e];if(r==s.children.length){this.trees.pop(),this.start.pop(),this.index.pop();continue}let n=s.children[r],i=this.start[e]+s.positions[r];if(i>t)return this.nextStart=i,null;if(n instanceof A){if(i==t){if(i<this.safeFrom)return null;let o=i+n.length;if(o<=this.safeTo){let a=n.prop(w.lookAhead);if(!a||o+a<this.fragment.to)return n}}this.index[e]++,i+n.length>=Math.max(this.safeFrom,t)&&(this.trees.push(n),this.start.push(i),this.index.push(0))}else this.index[e]++,this.nextStart=i+n.length}}}class U{constructor(t,e){this.stream=e,this.tokens=[],this.mainToken=null,this.actions=[],this.tokens=t.tokenizers.map(s=>new P)}getActions(t){let e=0,s=null,{parser:r}=t.p,{tokenizers:n}=r,i=r.stateSlot(t.state,3),o=t.curContext?t.curContext.hash:0,a=0;for(let l=0;l<n.length;l++){if(!(1<<l&i))continue;let u=n[l],c=this.tokens[l];if(!(s&&!u.fallback)&&((u.contextual||c.start!=t.pos||c.mask!=i||c.context!=o)&&(this.updateCachedToken(c,u,t),c.mask=i,c.context=o),c.lookAhead>c.end+25&&(a=Math.max(c.lookAhead,a)),c.value!=0)){let p=e;if(c.extended>-1&&(e=this.addActions(t,c.extended,c.end,e)),e=this.addActions(t,c.value,c.end,e),!u.extend&&(s=c,e>p))break}}for(;this.actions.length>e;)this.actions.pop();return a&&t.setLookAhead(a),!s&&t.pos==this.stream.end&&(s=new P,s.value=t.p.parser.eofTerm,s.start=s.end=t.pos,e=this.addActions(t,s.value,s.end,e)),this.mainToken=s,this.actions}getMainToken(t){if(this.mainToken)return this.mainToken;let e=new P,{pos:s,p:r}=t;return e.start=s,e.end=Math.min(s+1,r.stream.end),e.value=s==r.stream.end?r.parser.eofTerm:0,e}updateCachedToken(t,e,s){let r=this.stream.clipPos(s.pos);if(e.token(this.stream.reset(r,t),s),t.value>-1){let{parser:n}=s.p;for(let i=0;i<n.specialized.length;i++)if(n.specialized[i]==t.value){let o=n.specializers[i](this.stream.read(t.start,t.end),s);if(o>=0&&s.p.parser.dialect.allows(o>>1)){o&1?t.extended=o>>1:t.value=o>>1;break}}}else t.value=0,t.end=this.stream.clipPos(r+1)}putAction(t,e,s,r){for(let n=0;n<r;n+=3)if(this.actions[n]==t)return r;return this.actions[r++]=t,this.actions[r++]=e,this.actions[r++]=s,r}addActions(t,e,s,r){let{state:n}=t,{parser:i}=t.p,{data:o}=i;for(let a=0;a<2;a++)for(let l=i.stateSlot(n,a?2:1);;l+=3){if(o[l]==65535)if(o[l+1]==1)l=g(o,l+2);else{r==0&&o[l+1]==2&&(r=this.putAction(g(o,l+2),e,s,r));break}o[l]==e&&(r=this.putAction(g(o,l+1),e,s,r))}return r}}class W{constructor(t,e,s,r){this.parser=t,this.input=e,this.ranges=r,this.recovering=0,this.nextStackID=9812,this.minStackPos=0,this.reused=[],this.stoppedAt=null,this.lastBigReductionStart=-1,this.lastBigReductionSize=0,this.bigReductionCount=0,this.stream=new G(e,r),this.tokens=new U(t,this.stream),this.topTerm=t.top[1];let{from:n}=r[0];this.stacks=[b.start(this,t.top[0],n)],this.fragments=s.length&&this.stream.end-n>t.bufferLength*4?new _(s,t.nodeSet):null}get parsedPos(){return this.minStackPos}advance(){let t=this.stacks,e=this.minStackPos,s=this.stacks=[],r,n;if(this.bigReductionCount>300&&t.length==1){let[i]=t;for(;i.forceReduce()&&i.stack.length&&i.stack[i.stack.length-2]>=this.lastBigReductionStart;);this.bigReductionCount=this.lastBigReductionSize=0}for(let i=0;i<t.length;i++){let o=t[i];for(;;){if(this.tokens.mainToken=null,o.pos>e)s.push(o);else{if(this.advanceStack(o,s,t))continue;{r||(r=[],n=[]),r.push(o);let a=this.tokens.getMainToken(o);n.push(a.value,a.end)}}break}}if(!s.length){let i=r&&H(r);if(i)return k&&console.log("Finish with "+this.stackID(i)),this.stackToTree(i);if(this.parser.strict)throw k&&r&&console.log("Stuck with token "+(this.tokens.mainToken?this.parser.getName(this.tokens.mainToken.value):"none")),new SyntaxError("No parse at "+e);this.recovering||(this.recovering=5)}if(this.recovering&&r){let i=this.stoppedAt!=null&&r[0].pos>this.stoppedAt?r[0]:this.runRecovery(r,n,s);if(i)return k&&console.log("Force-finish "+this.stackID(i)),this.stackToTree(i.forceAll())}if(this.recovering){let i=this.recovering==1?1:this.recovering*3;if(s.length>i)for(s.sort((o,a)=>a.score-o.score);s.length>i;)s.pop();s.some(o=>o.reducePos>e)&&this.recovering--}else if(s.length>1){t:for(let i=0;i<s.length-1;i++){let o=s[i];for(let a=i+1;a<s.length;a++){let l=s[a];if(o.sameState(l)||o.buffer.length>500&&l.buffer.length>500)if((o.score-l.score||o.buffer.length-l.buffer.length)>0)s.splice(a--,1);else{s.splice(i--,1);continue t}}}s.length>12&&s.splice(12,s.length-12)}this.minStackPos=s[0].pos;for(let i=1;i<s.length;i++)s[i].pos<this.minStackPos&&(this.minStackPos=s[i].pos);return null}stopAt(t){if(this.stoppedAt!=null&&this.stoppedAt<t)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=t}advanceStack(t,e,s){let r=t.pos,{parser:n}=this,i=k?this.stackID(t)+" -> ":"";if(this.stoppedAt!=null&&r>this.stoppedAt)return t.forceReduce()?t:null;if(this.fragments){let l=t.curContext&&t.curContext.tracker.strict,u=l?t.curContext.hash:0;for(let c=this.fragments.nodeAt(r);c;){let p=this.parser.nodeSet.types[c.type.id]==c.type?n.getGoto(t.state,c.type.id):-1;if(p>-1&&c.length&&(!l||(c.prop(w.contextHash)||0)==u))return t.useNode(c,p),k&&console.log(i+this.stackID(t)+` (via reuse of ${n.getName(c.type.id)})`),!0;if(!(c instanceof A)||c.children.length==0||c.positions[0]>0)break;let f=c.children[0];if(f instanceof A&&c.positions[0]==0)c=f;else break}}let o=n.stateSlot(t.state,4);if(o>0)return t.reduce(o),k&&console.log(i+this.stackID(t)+` (via always-reduce ${n.getName(o&65535)})`),!0;if(t.stack.length>=8400)for(;t.stack.length>6e3&&t.forceReduce(););let a=this.tokens.getActions(t);for(let l=0;l<a.length;){let u=a[l++],c=a[l++],p=a[l++],f=l==a.length||!s,d=f?t:t.split(),v=this.tokens.mainToken;if(d.apply(u,c,v?v.start:d.pos,p),k&&console.log(i+this.stackID(d)+` (via ${u&65536?`reduce of ${n.getName(u&65535)}`:"shift"} for ${n.getName(c)} @ ${r}${d==t?"":", split"})`),f)return!0;d.pos>r?e.push(d):s.push(d)}return!1}advanceFully(t,e){let s=t.pos;for(;;){if(!this.advanceStack(t,null,null))return!1;if(t.pos>s)return F(t,e),!0}}runRecovery(t,e,s){let r=null,n=!1;for(let i=0;i<t.length;i++){let o=t[i],a=e[i<<1],l=e[(i<<1)+1],u=k?this.stackID(o)+" -> ":"";if(o.deadEnd&&(n||(n=!0,o.restart(),k&&console.log(u+this.stackID(o)+" (restarted)"),this.advanceFully(o,s))))continue;let c=o.split(),p=u;for(let f=0;c.forceReduce()&&f<10&&(k&&console.log(p+this.stackID(c)+" (via force-reduce)"),!this.advanceFully(c,s));f++)k&&(p=this.stackID(c)+" -> ");for(let f of o.recoverByInsert(a))k&&console.log(u+this.stackID(f)+" (via recover-insert)"),this.advanceFully(f,s);this.stream.end>o.pos?(l==o.pos&&(l++,a=0),o.recoverByDelete(a,l),k&&console.log(u+this.stackID(o)+` (via recover-delete ${this.parser.getName(a)})`),F(o,s)):(!r||r.score<o.score)&&(r=o)}return r}stackToTree(t){return t.close(),A.build({buffer:S.create(t),nodeSet:this.parser.nodeSet,topID:this.topTerm,maxBufferLength:this.parser.bufferLength,reused:this.reused,start:this.ranges[0].from,length:t.pos-this.ranges[0].from,minRepeatType:this.parser.minRepeatTerm})}stackID(t){let e=(C||(C=new WeakMap)).get(t);return e||C.set(t,e=String.fromCodePoint(this.nextStackID++)),e+t}}function F(h,t){for(let e=0;e<t.length;e++){let s=t[e];if(s.pos==h.pos&&s.sameState(h)){t[e].score<h.score&&(t[e]=h);return}}t.push(h)}class q{constructor(t,e,s){this.source=t,this.flags=e,this.disabled=s}allows(t){return!this.disabled||this.disabled[t]==0}}const T=h=>h;M=class{constructor(h){this.start=h.start,this.shift=h.shift||T,this.reduce=h.reduce||T,this.reuse=h.reuse||T,this.hash=h.hash||(()=>0),this.strict=h.strict!==!1}},y=class extends V{constructor(h){if(super(),this.wrappers=[],h.version!=14)throw new RangeError(`Parser version (${h.version}) doesn't match runtime version (14)`);let t=h.nodeNames.split(" ");this.minRepeatTerm=t.length;for(let i=0;i<h.repeatNodeCount;i++)t.push("");let e=Object.keys(h.topRules).map(i=>h.topRules[i][1]),s=[];for(let i=0;i<t.length;i++)s.push([]);function r(i,o,a){s[i].push([o,o.deserialize(String(a))])}if(h.nodeProps)for(let i of h.nodeProps){let o=i[0];typeof o=="string"&&(o=w[o]);for(let a=1;a<i.length;){let l=i[a++];if(l>=0)r(l,o,i[a++]);else{let u=i[a+-l];for(let c=-l;c>0;c--)r(i[a++],o,u);a++}}}this.nodeSet=new X(t.map((i,o)=>Y.define({name:o>=this.minRepeatTerm?void 0:i,id:o,props:s[o],top:e.indexOf(o)>-1,error:o==0,skipped:h.skippedNodes&&h.skippedNodes.indexOf(o)>-1}))),h.propSources&&(this.nodeSet=this.nodeSet.extend(...h.propSources)),this.strict=!1,this.bufferLength=Z;let n=x(h.tokenData);this.context=h.context,this.specializerSpecs=h.specialized||[],this.specialized=new Uint16Array(this.specializerSpecs.length);for(let i=0;i<this.specializerSpecs.length;i++)this.specialized[i]=this.specializerSpecs[i].term;this.specializers=this.specializerSpecs.map(L),this.states=x(h.states,Uint32Array),this.data=x(h.stateData),this.goto=x(h.goto),this.maxTerm=h.maxTerm,this.tokenizers=h.tokenizers.map(i=>typeof i=="number"?new m(n,i):i),this.topRules=h.topRules,this.dialects=h.dialects||{},this.dynamicPrecedences=h.dynamicPrecedences||null,this.tokenPrecTable=h.tokenPrec,this.termNames=h.termNames||null,this.maxNode=this.nodeSet.types.length-1,this.dialect=this.parseDialect(),this.top=this.topRules[Object.keys(this.topRules)[0]]}createParse(h,t,e){let s=new W(this,h,t,e);for(let r of this.wrappers)s=r(s,h,t,e);return s}getGoto(h,t,e=!1){let s=this.goto;if(t>=s[0])return-1;for(let r=s[t+1];;){let n=s[r++],i=n&1,o=s[r++];if(i&&e)return o;for(let a=r+(n>>1);r<a;r++)if(s[r]==h)return o;if(i)return-1}}hasAction(h,t){let e=this.data;for(let s=0;s<2;s++)for(let r=this.stateSlot(h,s?2:1),n;;r+=3){if((n=e[r])==65535)if(e[r+1]==1)n=e[r=g(e,r+2)];else{if(e[r+1]==2)return g(e,r+2);break}if(n==t||n==0)return g(e,r+1)}return 0}stateSlot(h,t){return this.states[h*6+t]}stateFlag(h,t){return(this.stateSlot(h,0)&t)>0}validAction(h,t){return!!this.allActions(h,e=>e==t?!0:null)}allActions(h,t){let e=this.stateSlot(h,4),s=e?t(e):void 0;for(let r=this.stateSlot(h,1);s==null;r+=3){if(this.data[r]==65535)if(this.data[r+1]==1)r=g(this.data,r+2);else break;s=t(g(this.data,r+1))}return s}nextStates(h){let t=[];for(let e=this.stateSlot(h,1);;e+=3){if(this.data[e]==65535)if(this.data[e+1]==1)e=g(this.data,e+2);else break;if(!(this.data[e+2]&1)){let s=this.data[e+1];t.some((r,n)=>n&1&&r==s)||t.push(this.data[e],s)}}return t}configure(h){let t=Object.assign(Object.create(y.prototype),this);if(h.props&&(t.nodeSet=this.nodeSet.extend(...h.props)),h.top){let e=this.topRules[h.top];if(!e)throw new RangeError(`Invalid top rule name ${h.top}`);t.top=e}return h.tokenizers&&(t.tokenizers=this.tokenizers.map(e=>{let s=h.tokenizers.find(r=>r.from==e);return s?s.to:e})),h.specializers&&(t.specializers=this.specializers.slice(),t.specializerSpecs=this.specializerSpecs.map((e,s)=>{let r=h.specializers.find(i=>i.from==e.external);if(!r)return e;let n=Object.assign(Object.assign({},e),{external:r.to});return t.specializers[s]=L(n),n})),h.contextTracker&&(t.context=h.contextTracker),h.dialect&&(t.dialect=this.parseDialect(h.dialect)),h.strict!=null&&(t.strict=h.strict),h.wrap&&(t.wrappers=t.wrappers.concat(h.wrap)),h.bufferLength!=null&&(t.bufferLength=h.bufferLength),t}hasWrappers(){return this.wrappers.length>0}getName(h){return this.termNames?this.termNames[h]:String(h<=this.maxNode&&this.nodeSet.types[h].name||h)}get eofTerm(){return this.maxNode+1}get topNode(){return this.nodeSet.types[this.top[1]]}dynamicPrecedence(h){let t=this.dynamicPrecedences;return t==null?0:t[h]||0}parseDialect(h){let t=Object.keys(this.dialects),e=t.map(()=>!1);if(h)for(let r of h.split(" ")){let n=t.indexOf(r);n>=0&&(e[n]=!0)}let s=null;for(let r=0;r<t.length;r++)if(!e[r])for(let n=this.dialects[t[r]],i;(i=this.data[n++])!=65535;)(s||(s=new Uint8Array(this.maxTerm+1)))[i]=1;return new q(h,e,s)}static deserialize(h){return new y(h)}};function g(h,t){return h[t]|h[t+1]<<16}function H(h){let t=null;for(let e of h){let s=e.p.stoppedAt;(e.pos==e.p.stream.end||s!=null&&e.pos>s)&&e.p.parser.stateFlag(e.state,2)&&(!t||t.score<e.score)&&(t=e)}return t}function L(h){if(h.external){let t=h.extend?1:0;return(e,s)=>h.external(e,s)<<1|t}return h.get}});export{M as C,$ as E,y as L,st as __tla,N as a};
