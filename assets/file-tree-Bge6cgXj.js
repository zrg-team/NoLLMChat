import{c8 as u,c9 as y,ca as h,cb as g,cc as m,cd as b,ce as j,__tla as O}from"./routes-B-PH-_IA.js";import{a7 as S,__tla as M}from"./index-DtEubEwZ.js";let f,d,p,_,P=Promise.all([(()=>{try{return O}catch{}})(),(()=>{try{return M}catch{}})()]).then(async()=>{d=Object.freeze(Object.defineProperty({__proto__:null,LoggerWithoutDebug:u,Model:b,ModelManager:j,ModelValidationStatus:m,POLYFILL_ETAG:g,Wllama:h,WllamaError:y},Symbol.toStringTag,{value:"Module"})),f=function(l){const r=l.trim().split(`
`),n={};return r.forEach(c=>{const{file:a,content:i}=JSON.parse(c),e=a.split("/");let o=n;for(let t=0;t<e.length;t++){const s=e[t];t===e.length-1?o[s]={file:{contents:i}}:(o[s]||(o[s]={directory:{}}),o=o[s].directory)}}),n},p=function(l){const r=[];function n(c,a=[]){for(const[i,e]of Object.entries(c))if("file"in e){const o=[...a,i].join("/");if("contents"in e.file){const t=e.file.contents;r.push(JSON.stringify({file:o,content:t}))}}else"directory"in e&&n(e.directory,[...a,i])}return n(l),r.join(`
`)},_=function(l,r){return S(`[UpdateCodeContainerFile] Changes ${r.map(n=>`${n.type||"create_or_update"}:${n.path}`).join(", ")}`),r.forEach(({path:n,content:c,type:a="create_or_update"})=>{const i=n.replace(/^\.\//,"").split("/");let e=l;for(let o=0;o<i.length;o++){const t=i[o];if(o===i.length-1)a==="delete"?t in e&&"file"in e[t]?delete e[t]:console.warn(`Path "${n}" is not a file or does not exist.`):t in e&&"file"in e[t]?e[t].file.contents=c:e[t]={file:{contents:c}};else if(t in e&&"directory"in e[t])e=e[t].directory;else if(a==="delete"){console.warn(`Path "${n}" does not exist.`);break}else e[t]={directory:{}},e=e[t].directory}}),l}});export{P as __tla,f as a,d as i,p,_ as u};
