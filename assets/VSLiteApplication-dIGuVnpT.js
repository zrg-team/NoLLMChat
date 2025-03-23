const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-TU_g0_YJ.js","assets/index-DtEubEwZ.js","assets/index-Cw9j2N9-.css","assets/routes-B-PH-_IA.js","assets/index-DzU9ekqw.js","assets/chevron-right-Ch9V8aNj.js","assets/createLucideIcon-DuPqHR91.js","assets/check-CL8wQGK-.js","assets/circle-DqC_YmqE.js","assets/popover-CIexJCax.js","assets/index-B-RPFZha.js","assets/index-HSnfLTSA.css"])))=>i.map(i=>d[i]);
import{r as i,d as E,e as F,_ as T,j as m,c as D,L as k,D as O,__tla as z}from"./index-DtEubEwZ.js";import{a as A,u as I,b as P,L as w,I as R,p as U,S as H,c as V,__tla as Y}from"./LLMIcon-Cgp-myVh.js";import{u as M,S as q,A as B,H as N,g as x,F as G,e as J,f as K,h as Q,i as W,__tla as X}from"./routes-B-PH-_IA.js";import{p as Z,u as $,a as ee,__tla as ae}from"./file-tree-Bge6cgXj.js";import"./dot-CjJRbLGS.js";import"./createLucideIcon-DuPqHR91.js";let S,te=Promise.all([(()=>{try{return z}catch{}})(),(()=>{try{return Y}catch{}})(),(()=>{try{return X}catch{}})(),(()=>{try{return ae}catch{}})()]).then(async()=>{let C,j,b;C=()=>{const[a,e]=i.useState(!1),[t,o]=i.useState(),s=M(c=>c.currentSession),{t:u}=E("flows"),{toast:l}=F(),{loadModel:n}=A(),{stream:p}=I(),{modalRef:y}=P(H),v=i.useCallback(async(c,f,d)=>{if(s!=null&&s.main_node_id){if(!(t!=null&&t.llm)){l({variant:"destructive",description:u("editor_node.errors.llm_not_found")});return}(t==null?void 0:t.status)!==w.Loaded&&(await n(t.llm.provider,t.llm.name,{provider:t.llm.provider,callback:r=>{o(_=>_&&{..._,progress:r.text})}}),o(r=>r&&{...r,status:w.Loaded,progress:""}));try{const r=f.map(h=>h.role==="system"?new q(h.content):h.role==="assistant"?new B(h.content):new N(h.content)),_=await p(t.llm.provider,[...r,new N(c)],{onMessageUpdate:({content:h})=>{d==null||d(h)},llm:t.llm});return d==null||d((_==null?void 0:_.content)||""),_==null?void 0:_.content}catch(r){if(r instanceof Error&&r.message.includes("LLM_NOT_LOADED_YET")){l({title:u("editor_node.errors.llm_not_loaded_yet")});return}l({variant:"destructive",title:u("editor_node.errors.stream_message_failed")})}}},[s==null?void 0:s.main_node_id,t==null?void 0:t.llm,t==null?void 0:t.status,l,u,n,p]),g=i.useCallback(async()=>{try{if(e(!0),!(s!=null&&s.main_node_id))return;const c=await x("FlowEdge").find({where:{target:s.main_node_id}}),f=(await x("FlowNode").find({where:{id:R(c.map(r=>r.source))}})).find(r=>r.source_type===G.LLM);if(!f)return;const d=await x("LLM").findOne({where:{id:f.source_id}});if(!d)return;s.passphrase&&await U(s.passphrase,y.current),await n(d.provider,d.name,{provider:d.provider,callback:r=>{o(_=>_&&{..._,llm:d,progress:r.text})}}),o({llm:d,status:w.Loaded})}finally{e(!1)}},[s==null?void 0:s.main_node_id,s==null?void 0:s.passphrase,n,y]),L=i.useCallback(async()=>{try{if(e(!0),!(t!=null&&t.llm))return;await n(t.llm.provider,t.llm.name,{provider:t.llm.provider,callback:c=>{o(f=>f&&{...f,progress:c.text})}}),o(c=>c&&{...c,status:w.Loaded,progress:""})}finally{e(!1)}},[n,t==null?void 0:t.llm]);return i.useEffect(()=>{s!=null&&s.main_node_id&&g()},[s==null?void 0:s.main_node_id,g]),{loading:a,mainLLMInfo:t,createMessage:v,loadCurrentModel:L}},j=()=>{const a=M(l=>l.currentSession),[e,t]=i.useState(),o=i.useCallback(async(l,n)=>{await x("FlowNode").update(l,{raw:Z(n)})},[]),s=i.useCallback(async l=>{a!=null&&a.main_node_id&&t(n=>{if(!(a!=null&&a.main_node_id))return n;const p=$(n||{},l);return o(a==null?void 0:a.main_node_id,p),p})},[a==null?void 0:a.main_node_id,o]),u=i.useCallback(async()=>{if(!(a!=null&&a.main_node_id))return;const l=await x("FlowNode").findOne({where:{id:a==null?void 0:a.main_node_id}});l&&t(l.raw?ee(l.raw):{})},[a==null?void 0:a.main_node_id]);return i.useEffect(()=>{a!=null&&a.main_node_id&&u()},[a==null?void 0:a.main_node_id,u]),{fileSystemTree:e,updateCodeContainerFile:s,updateCodeContainerData:o}},b=i.lazy(()=>T(()=>import("./index-TU_g0_YJ.js").then(async a=>(await a.__tla,a)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))),S=i.memo(()=>{var n,p,y,v;const{loading:a,mainLLMInfo:e,loadCurrentModel:t,createMessage:o}=C(),{fileSystemTree:s,updateCodeContainerFile:u}=j(),l=i.useCallback((g,L,c)=>o(g,L,c),[o]);return m.jsxs("div",{className:"h-full w-full relative","data-registry":"plate",children:[m.jsx(J,{children:m.jsx(K,{children:m.jsxs("div",{className:D("flex absolute !z-[51] right-1 top-0 max-w-28 h-9 items-center justify-center flex-row"),children:[(e==null?void 0:e.status)===w.Loaded&&((n=e==null?void 0:e.llm)!=null&&n.name)?m.jsx(V,{name:(p=e==null?void 0:e.llm)==null?void 0:p.name,className:"w-5 h-5 mr-1"}):void 0,m.jsxs(Q,{className:"overflow-hidden !text-ellipsis w-full max-w-full max-h-full whitespace-nowrap text-sm",children:[e!=null&&e.progress?e.progress:(e==null?void 0:e.status)===w.Loaded?((y=e==null?void 0:e.llm)==null?void 0:y.name)||"":a?m.jsx(k,{size:16,name:"loader-circle",className:"animate-spin ml-2"}):void 0,e!=null&&e.llm&&(e==null?void 0:e.status)!==w.Loaded?m.jsx(k,{size:16,name:"loader-circle",onClick:t,className:"animate-spin ml-2"}):void 0]}),m.jsx(W,{children:m.jsx("p",{children:(e==null?void 0:e.progress)||((v=e==null?void 0:e.llm)==null?void 0:v.name)||""})})]})})}),m.jsx(i.Suspense,{fallback:m.jsx(O,{simple:!0}),children:s!==void 0?m.jsx(b,{autoLoad:!0,hideAppName:!0,llm:e==null?void 0:e.llm,fileSystemTree:s,onUpdateFileContent:u,sendMessage:l}):void 0})]})})});export{te as __tla,S as default};
