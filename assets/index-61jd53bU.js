import{__tla as Qr}from"./routes-B-PH-_IA.js";import{B as Lt,g as Vt,R as Qe,r as _,__tla as Zr}from"./index-DtEubEwZ.js";import{s as ea}from"./toNumber-Dl0-IZOl.js";let Pt,ta=Promise.all([(()=>{try{return Qr}catch{}})(),(()=>{try{return Zr}catch{}})()]).then(async()=>{var et="vercel.ai.error",jt=Symbol.for(et),tt,Jt=class Mt extends Error{constructor({name:t,message:r,cause:s}){super(r),this[tt]=!0,this.name=t,this.cause=s}static isInstance(t){return Mt.hasMarker(t,et)}static hasMarker(t,r){const s=Symbol.for(r);return t!=null&&typeof t=="object"&&s in t&&typeof t[s]=="boolean"&&t[s]===!0}};tt=jt;var se=Jt;function rt(e){return e==null?"unknown error":typeof e=="string"?e:e instanceof Error?e.message:JSON.stringify(e)}var at="AI_InvalidArgumentError",nt=`vercel.ai.error.${at}`,Ut=Symbol.for(nt),ot,Bt=class extends se{constructor({message:e,cause:t,argument:r}){super({name:at,message:e,cause:t}),this[ot]=!0,this.argument=r}static isInstance(e){return se.hasMarker(e,nt)}};ot=Ut;var st="AI_JSONParseError",it=`vercel.ai.error.${st}`,Yt=Symbol.for(it),lt,ct=class extends se{constructor({text:e,cause:t}){super({name:st,message:`JSON parsing failed: Text: ${e}.
Error message: ${rt(t)}`,cause:t}),this[lt]=!0,this.text=e}static isInstance(e){return se.hasMarker(e,it)}};lt=Yt;var ut="AI_TypeValidationError",dt=`vercel.ai.error.${ut}`,$t=Symbol.for(dt),pt,Wt=class Ze extends se{constructor({value:t,cause:r}){super({name:ut,message:`Type validation failed: Value: ${JSON.stringify(t)}.
Error message: ${rt(r)}`,cause:r}),this[pt]=!0,this.value=t}static isInstance(t){return se.hasMarker(t,dt)}static wrap({value:t,cause:r}){return Ze.isInstance(r)&&r.value===t?r:new Ze({value:t,cause:r})}};pt=$t;var ft=Wt;let Kt=(e,t=21)=>(r=t)=>{let s="",i=r;for(;i--;)s+=e[Math.random()*e.length|0];return s};var ne={exports:{}},ht;function qt(){if(ht)return ne.exports;ht=1;const e=typeof Lt<"u",t=/"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,r=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;function s(l,o,n){n==null&&o!==null&&typeof o=="object"&&(n=o,o=void 0),e&&Lt.isBuffer(l)&&(l=l.toString()),l&&l.charCodeAt(0)===65279&&(l=l.slice(1));const u=JSON.parse(l,o);if(u===null||typeof u!="object")return u;const h=n&&n.protoAction||"error",E=n&&n.constructorAction||"error";if(h==="ignore"&&E==="ignore")return u;if(h!=="ignore"&&E!=="ignore"){if(t.test(l)===!1&&r.test(l)===!1)return u}else if(h!=="ignore"&&E==="ignore"){if(t.test(l)===!1)return u}else if(r.test(l)===!1)return u;return i(u,{protoAction:h,constructorAction:E,safe:n&&n.safe})}function i(l,{protoAction:o="error",constructorAction:n="error",safe:u}={}){let h=[l];for(;h.length;){const E=h;h=[];for(const g of E){if(o!=="ignore"&&Object.prototype.hasOwnProperty.call(g,"__proto__")){if(u===!0)return null;if(o==="error")throw new SyntaxError("Object contains forbidden prototype property");delete g.__proto__}if(n!=="ignore"&&Object.prototype.hasOwnProperty.call(g,"constructor")&&Object.prototype.hasOwnProperty.call(g.constructor,"prototype")){if(u===!0)return null;if(n==="error")throw new SyntaxError("Object contains forbidden prototype property");delete g.constructor}for(const v in g){const p=g[v];p&&typeof p=="object"&&h.push(p)}}}return l}function c(l,o,n){const u=Error.stackTraceLimit;Error.stackTraceLimit=0;try{return s(l,o,n)}finally{Error.stackTraceLimit=u}}function d(l,o){const n=Error.stackTraceLimit;Error.stackTraceLimit=0;try{return s(l,o,{safe:!0})}catch{return null}finally{Error.stackTraceLimit=n}}return ne.exports=c,ne.exports.default=c,ne.exports.parse=c,ne.exports.safeParse=d,ne.exports.scan=i,ne.exports}var Gt=qt();const Ht=Vt(Gt);var zt=({prefix:e,size:t=16,alphabet:r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",separator:s="-"}={})=>{const i=Kt(r,t);if(e==null)return i;if(r.includes(s))throw new Bt({argument:"separator",message:`The separator "${s}" must not be part of the alphabet "${r}".`});return c=>`${e}${s}${i(c)}`},gt=zt(),Fe=Symbol.for("vercel.ai.validator");function Xt(e){return{[Fe]:!0,validate:e}}function Qt(e){return typeof e=="object"&&e!==null&&Fe in e&&e[Fe]===!0&&"validate"in e}function Zt(e){return Qt(e)?e:er(e)}function er(e){return Xt(t=>{const r=e.safeParse(t);return r.success?{success:!0,value:r.data}:{success:!1,error:r.error}})}function tr({value:e,schema:t}){const r=Zt(t);try{if(r.validate==null)return{success:!0,value:e};const s=r.validate(e);return s.success?s:{success:!1,error:ft.wrap({value:e,cause:s.error})}}catch(s){return{success:!1,error:ft.wrap({value:e,cause:s})}}}function mt({text:e,schema:t}){try{const r=Ht.parse(e);return t==null?{success:!0,value:r}:tr({value:r,schema:t})}catch(r){return{success:!1,error:ct.isInstance(r)?r:new ct({text:e,cause:r})}}}var Te={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},ve={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},Re={code:"4",name:"assistant_message",parse:e=>{if(e==null||typeof e!="object"||!("id"in e)||!("role"in e)||!("content"in e)||typeof e.id!="string"||typeof e.role!="string"||e.role!=="assistant"||!Array.isArray(e.content)||!e.content.every(t=>t!=null&&typeof t=="object"&&"type"in t&&t.type==="text"&&"text"in t&&t.text!=null&&typeof t.text=="object"&&"value"in t.text&&typeof t.text.value=="string"))throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');return{type:"assistant_message",value:e}}},Ae={code:"5",name:"assistant_control_data",parse:e=>{if(e==null||typeof e!="object"||!("threadId"in e)||!("messageId"in e)||typeof e.threadId!="string"||typeof e.messageId!="string")throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');return{type:"assistant_control_data",value:{threadId:e.threadId,messageId:e.messageId}}}},ke={code:"6",name:"data_message",parse:e=>{if(e==null||typeof e!="object"||!("role"in e)||!("data"in e)||typeof e.role!="string"||e.role!=="data")throw new Error('"data_message" parts expect an object with a "role" and "data" property.');return{type:"data_message",value:e}}},rr=[Te,ve,Re,Ae,ke];Te.code+"",ve.code+"",Re.code+"",Ae.code+"",ke.code+"",Te.name+"",Te.code,ve.name+"",ve.code,Re.name+"",Re.code,Ae.name+"",Ae.code,ke.name+"",ke.code,rr.map(e=>e.code);function ar(e){const t=["ROOT"];let r=-1,s=null;function i(o,n,u){switch(o){case'"':{r=n,t.pop(),t.push(u),t.push("INSIDE_STRING");break}case"f":case"t":case"n":{r=n,s=n,t.pop(),t.push(u),t.push("INSIDE_LITERAL");break}case"-":{t.pop(),t.push(u),t.push("INSIDE_NUMBER");break}case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":{r=n,t.pop(),t.push(u),t.push("INSIDE_NUMBER");break}case"{":{r=n,t.pop(),t.push(u),t.push("INSIDE_OBJECT_START");break}case"[":{r=n,t.pop(),t.push(u),t.push("INSIDE_ARRAY_START");break}}}function c(o,n){switch(o){case",":{t.pop(),t.push("INSIDE_OBJECT_AFTER_COMMA");break}case"}":{r=n,t.pop();break}}}function d(o,n){switch(o){case",":{t.pop(),t.push("INSIDE_ARRAY_AFTER_COMMA");break}case"]":{r=n,t.pop();break}}}for(let o=0;o<e.length;o++){const n=e[o];switch(t[t.length-1]){case"ROOT":i(n,o,"FINISH");break;case"INSIDE_OBJECT_START":{switch(n){case'"':{t.pop(),t.push("INSIDE_OBJECT_KEY");break}case"}":{r=o,t.pop();break}}break}case"INSIDE_OBJECT_AFTER_COMMA":{switch(n){case'"':{t.pop(),t.push("INSIDE_OBJECT_KEY");break}}break}case"INSIDE_OBJECT_KEY":{switch(n){case'"':{t.pop(),t.push("INSIDE_OBJECT_AFTER_KEY");break}}break}case"INSIDE_OBJECT_AFTER_KEY":{switch(n){case":":{t.pop(),t.push("INSIDE_OBJECT_BEFORE_VALUE");break}}break}case"INSIDE_OBJECT_BEFORE_VALUE":{i(n,o,"INSIDE_OBJECT_AFTER_VALUE");break}case"INSIDE_OBJECT_AFTER_VALUE":{c(n,o);break}case"INSIDE_STRING":{switch(n){case'"':{t.pop(),r=o;break}case"\\":{t.push("INSIDE_STRING_ESCAPE");break}default:r=o}break}case"INSIDE_ARRAY_START":{switch(n){case"]":{r=o,t.pop();break}default:{r=o,i(n,o,"INSIDE_ARRAY_AFTER_VALUE");break}}break}case"INSIDE_ARRAY_AFTER_VALUE":{switch(n){case",":{t.pop(),t.push("INSIDE_ARRAY_AFTER_COMMA");break}case"]":{r=o,t.pop();break}default:{r=o;break}}break}case"INSIDE_ARRAY_AFTER_COMMA":{i(n,o,"INSIDE_ARRAY_AFTER_VALUE");break}case"INSIDE_STRING_ESCAPE":{t.pop(),r=o;break}case"INSIDE_NUMBER":{switch(n){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":{r=o;break}case"e":case"E":case"-":case".":break;case",":{t.pop(),t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&d(n,o),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"&&c(n,o);break}case"}":{t.pop(),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"&&c(n,o);break}case"]":{t.pop(),t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&d(n,o);break}default:{t.pop();break}}break}case"INSIDE_LITERAL":{const u=e.substring(s,o+1);!"false".startsWith(u)&&!"true".startsWith(u)&&!"null".startsWith(u)?(t.pop(),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"?c(n,o):t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&d(n,o)):r=o;break}}}let l=e.slice(0,r+1);for(let o=t.length-1;o>=0;o--)switch(t[o]){case"INSIDE_STRING":{l+='"';break}case"INSIDE_OBJECT_KEY":case"INSIDE_OBJECT_AFTER_KEY":case"INSIDE_OBJECT_AFTER_COMMA":case"INSIDE_OBJECT_START":case"INSIDE_OBJECT_BEFORE_VALUE":case"INSIDE_OBJECT_AFTER_VALUE":{l+="}";break}case"INSIDE_ARRAY_START":case"INSIDE_ARRAY_AFTER_COMMA":case"INSIDE_ARRAY_AFTER_VALUE":{l+="]";break}case"INSIDE_LITERAL":{const n=e.substring(s,e.length);"true".startsWith(n)?l+="true".slice(n.length):"false".startsWith(n)?l+="false".slice(n.length):"null".startsWith(n)&&(l+="null".slice(n.length))}}return l}function nr(e){if(e===void 0)return{value:void 0,state:"undefined-input"};let t=mt({text:e});return t.success?{value:t.value,state:"successful-parse"}:(t=mt({text:ar(e)}),t.success?{value:t.value,state:"repaired-parse"}:{value:void 0,state:"failed-parse"})}var ue={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},de={code:"2",name:"data",parse:e=>{if(!Array.isArray(e))throw new Error('"data" parts expect an array value.');return{type:"data",value:e}}},pe={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},fe={code:"8",name:"message_annotations",parse:e=>{if(!Array.isArray(e))throw new Error('"message_annotations" parts expect an array value.');return{type:"message_annotations",value:e}}},he={code:"9",name:"tool_call",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("toolName"in e)||typeof e.toolName!="string"||!("args"in e)||typeof e.args!="object")throw new Error('"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.');return{type:"tool_call",value:e}}},ge={code:"a",name:"tool_result",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("result"in e))throw new Error('"tool_result" parts expect an object with a "toolCallId" and a "result" property.');return{type:"tool_result",value:e}}},me={code:"b",name:"tool_call_streaming_start",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("toolName"in e)||typeof e.toolName!="string")throw new Error('"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.');return{type:"tool_call_streaming_start",value:e}}},Ee={code:"c",name:"tool_call_delta",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("argsTextDelta"in e)||typeof e.argsTextDelta!="string")throw new Error('"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.');return{type:"tool_call_delta",value:e}}},_e={code:"d",name:"finish_message",parse:e=>{if(e==null||typeof e!="object"||!("finishReason"in e)||typeof e.finishReason!="string")throw new Error('"finish_message" parts expect an object with a "finishReason" property.');const t={finishReason:e.finishReason};return"usage"in e&&e.usage!=null&&typeof e.usage=="object"&&"promptTokens"in e.usage&&"completionTokens"in e.usage&&(t.usage={promptTokens:typeof e.usage.promptTokens=="number"?e.usage.promptTokens:Number.NaN,completionTokens:typeof e.usage.completionTokens=="number"?e.usage.completionTokens:Number.NaN}),{type:"finish_message",value:t}}},Ie={code:"e",name:"finish_step",parse:e=>{if(e==null||typeof e!="object"||!("finishReason"in e)||typeof e.finishReason!="string")throw new Error('"finish_step" parts expect an object with a "finishReason" property.');const t={finishReason:e.finishReason,isContinued:!1};return"usage"in e&&e.usage!=null&&typeof e.usage=="object"&&"promptTokens"in e.usage&&"completionTokens"in e.usage&&(t.usage={promptTokens:typeof e.usage.promptTokens=="number"?e.usage.promptTokens:Number.NaN,completionTokens:typeof e.usage.completionTokens=="number"?e.usage.completionTokens:Number.NaN}),"isContinued"in e&&typeof e.isContinued=="boolean"&&(t.isContinued=e.isContinued),{type:"finish_step",value:t}}},or=[ue,de,pe,fe,he,ge,me,Ee,_e,Ie],sr={[ue.code]:ue,[de.code]:de,[pe.code]:pe,[fe.code]:fe,[he.code]:he,[ge.code]:ge,[me.code]:me,[Ee.code]:Ee,[_e.code]:_e,[Ie.code]:Ie};ue.name+"",ue.code,de.name+"",de.code,pe.name+"",pe.code,fe.name+"",fe.code,he.name+"",he.code,ge.name+"",ge.code,me.name+"",me.code,Ee.name+"",Ee.code,_e.name+"",_e.code,Ie.name+"",Ie.code;var ir=or.map(e=>e.code),lr=e=>{const t=e.indexOf(":");if(t===-1)throw new Error("Failed to parse stream string. No separator found.");const r=e.slice(0,t);if(!ir.includes(r))throw new Error(`Failed to parse stream string. Invalid code ${r}.`);const s=r,i=e.slice(t+1),c=JSON.parse(i);return sr[s].parse(c)},cr=10;function ur(e,t){const r=new Uint8Array(t);let s=0;for(const i of e)r.set(i,s),s+=i.length;return e.length=0,r}async function dr({stream:e,onTextPart:t,onDataPart:r,onErrorPart:s,onToolCallStreamingStartPart:i,onToolCallDeltaPart:c,onToolCallPart:d,onToolResultPart:l,onMessageAnnotationsPart:o,onFinishMessagePart:n,onFinishStepPart:u}){const h=e.getReader(),E=new TextDecoder,g=[];let v=0;for(;;){const{value:p}=await h.read();if(p&&(g.push(p),v+=p.length,p[p.length-1]!==cr))continue;if(g.length===0)break;const R=ur(g,v);v=0;const a=E.decode(R,{stream:!0}).split(`
`).filter(m=>m!=="").map(lr);for(const{type:m,value:y}of a)switch(m){case"text":await(t==null?void 0:t(y));break;case"data":await(r==null?void 0:r(y));break;case"error":await(s==null?void 0:s(y));break;case"message_annotations":await(o==null?void 0:o(y));break;case"tool_call_streaming_start":await(i==null?void 0:i(y));break;case"tool_call_delta":await(c==null?void 0:c(y));break;case"tool_call":await(d==null?void 0:d(y));break;case"tool_result":await(l==null?void 0:l(y));break;case"finish_message":await(n==null?void 0:n(y));break;case"finish_step":await(u==null?void 0:u(y));break;default:{const x=m;throw new Error(`Unknown stream part type: ${x}`)}}}}function pr({promptTokens:e,completionTokens:t}){return{promptTokens:e,completionTokens:t,totalTokens:e+t}}async function fr({stream:e,update:t,onToolCall:r,onFinish:s,generateId:i=gt,getCurrentDate:c=()=>new Date}){const d=c();let l,o=!0;const n=[],u=[];let h;const E={};let g={completionTokens:NaN,promptTokens:NaN,totalTokens:NaN},v="unknown";function p(){const a=[...u];if(l==null){t(n,a);return}h!=null&&h.length&&(l.annotations=h);const m={...JSON.parse(JSON.stringify(l)),revisionId:i()};t([...n,m],a)}function R(){return(o||l==null)&&(l!=null&&n.push(l),o=!1,l={id:i(),role:"assistant",content:"",createdAt:d}),l}await dr({stream:e,onTextPart(a){const m=R();l={...m,content:m.content+a},p()},onToolCallStreamingStartPart(a){const m=R();m.toolInvocations==null&&(m.toolInvocations=[]),E[a.toolCallId]={text:"",toolName:a.toolName,index:m.toolInvocations.length},m.toolInvocations.push({state:"partial-call",toolCallId:a.toolCallId,toolName:a.toolName,args:void 0}),p()},onToolCallDeltaPart(a){const m=R(),y=E[a.toolCallId];y.text+=a.argsTextDelta;const{value:x}=nr(y.text);m.toolInvocations[y.index]={state:"partial-call",toolCallId:a.toolCallId,toolName:y.toolName,args:x},p()},async onToolCallPart(a){const m=R();if(E[a.toolCallId]!=null?m.toolInvocations[E[a.toolCallId].index]={state:"call",...a}:(m.toolInvocations==null&&(m.toolInvocations=[]),m.toolInvocations.push({state:"call",...a})),r){const y=await r({toolCall:a});y!=null&&(m.toolInvocations[m.toolInvocations.length-1]={state:"result",...a,result:y})}p()},onToolResultPart(a){const m=R().toolInvocations;if(m==null)throw new Error("tool_result must be preceded by a tool_call");const y=m.findIndex(x=>x.toolCallId===a.toolCallId);if(y===-1)throw new Error("tool_result must be preceded by a tool_call with the same toolCallId");m[y]={...m[y],state:"result",...a},p()},onDataPart(a){u.push(...a),p()},onMessageAnnotationsPart(a){h==null?h=[...a]:h.push(...a),p()},onFinishStepPart(a){o=!a.isContinued},onFinishMessagePart(a){v=a.finishReason,a.usage!=null&&(g=pr(a.usage))},onErrorPart(a){throw new Error(a)}}),s==null||s({message:l,finishReason:v,usage:g})}async function hr({stream:e,onTextPart:t}){const r=e.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:s,value:i}=await r.read();if(s)break;await t(i)}}var gr=()=>fetch;async function mr({api:e,body:t,streamProtocol:r="data",credentials:s,headers:i,abortController:c,restoreMessagesOnFailure:d,onResponse:l,onUpdate:o,onFinish:n,onToolCall:u,generateId:h,fetch:E=gr()}){var g,v;const p=await E(e,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",...i},signal:(g=c==null?void 0:c())==null?void 0:g.signal,credentials:s}).catch(R=>{throw d(),R});if(l)try{await l(p)}catch(R){throw R}if(!p.ok)throw d(),new Error((v=await p.text())!=null?v:"Failed to fetch the chat response.");if(!p.body)throw new Error("The response body is empty.");switch(r){case"text":{const R={id:h(),createdAt:new Date,role:"assistant",content:""};await hr({stream:p.body,onTextPart:a=>{R.content+=a,o([{...R}],[])}}),n==null||n(R,{usage:{completionTokens:NaN,promptTokens:NaN,totalTokens:NaN},finishReason:"unknown"});return}case"data":{await fr({stream:p.body,update:o,onToolCall:u,onFinish({message:R,finishReason:a,usage:m}){n&&R!=null&&n(R,{usage:m,finishReason:a})},generateId:h});return}default:{const R=r;throw new Error(`Unknown stream protocol: ${R}`)}}}const Z=()=>{},P=Z(),Le=Object,I=e=>e===P,q=e=>typeof e=="function",ee=(e,t)=>({...e,...t}),Er=e=>q(e.then),Ne=new WeakMap;let _r=0;const ye=e=>{const t=typeof e,r=e&&e.constructor,s=r==Date;let i,c;if(Le(e)===e&&!s&&r!=RegExp){if(i=Ne.get(e),i)return i;if(i=++_r+"~",Ne.set(e,i),r==Array){for(i="@",c=0;c<e.length;c++)i+=ye(e[c])+",";Ne.set(e,i)}if(r==Le){i="#";const d=Le.keys(e).sort();for(;!I(c=d.pop());)I(e[c])||(i+=c+":"+ye(e[c])+",");Ne.set(e,i)}}else i=s?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return i},H=new WeakMap,Ve={},Se={},Pe="undefined",Ce=typeof window!=Pe,Me=typeof document!=Pe,Ir=()=>Ce&&typeof window.requestAnimationFrame!=Pe,Et=(e,t)=>{const r=H.get(e);return[()=>!I(t)&&e.get(t)||Ve,s=>{if(!I(t)){const i=e.get(t);t in Se||(Se[t]=i),r[5](t,ee(i,s),i||Ve)}},r[6],()=>!I(t)&&t in Se?Se[t]:!I(t)&&e.get(t)||Ve]};let je=!0;const yr=()=>je,[Je,Ue]=Ce&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[Z,Z],br=()=>{const e=Me&&document.visibilityState;return I(e)||e!=="hidden"},wr=e=>(Me&&document.addEventListener("visibilitychange",e),Je("focus",e),()=>{Me&&document.removeEventListener("visibilitychange",e),Ue("focus",e)}),Tr=e=>{const t=()=>{je=!0,e()},r=()=>{je=!1};return Je("online",t),Je("offline",r),()=>{Ue("online",t),Ue("offline",r)}},vr={isOnline:yr,isVisible:br},Rr={initFocus:wr,initReconnect:Tr},_t=!Qe.useId,be=!Ce||"Deno"in window,Ar=e=>Ir()?window.requestAnimationFrame(e):setTimeout(e,1),Be=be?_.useEffect:_.useLayoutEffect,Ye=typeof navigator<"u"&&navigator.connection,It=!be&&Ye&&(["slow-2g","2g"].includes(Ye.effectiveType)||Ye.saveData),$e=e=>{if(q(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?ye(e):"",[e,t]};let kr=0;const We=()=>++kr,yt=0,bt=1,wt=2;var we={__proto__:null,ERROR_REVALIDATE_EVENT:3,FOCUS_EVENT:yt,MUTATE_EVENT:wt,RECONNECT_EVENT:bt};async function Tt(...e){const[t,r,s,i]=e,c=ee({populateCache:!0,throwOnError:!0},typeof i=="boolean"?{revalidate:i}:i||{});let d=c.populateCache;const l=c.rollbackOnError;let o=c.optimisticData;const n=E=>typeof l=="function"?l(E):l!==!1,u=c.throwOnError;if(q(r)){const E=r,g=[],v=t.keys();for(const p of v)!/^\$(inf|sub)\$/.test(p)&&E(t.get(p)._k)&&g.push(p);return Promise.all(g.map(h))}return h(r);async function h(E){const[g]=$e(E);if(!g)return;const[v,p]=Et(t,g),[R,a,m,y]=H.get(t),x=()=>{const U=R[g];return(q(c.revalidate)?c.revalidate(v().data,E):c.revalidate!==!1)&&(delete m[g],delete y[g],U&&U[0])?U[0](wt).then(()=>v().data):v().data};if(e.length<3)return x();let k=s,S;const M=We();a[g]=[M,0];const A=!I(o),C=v(),O=C.data,$=C._c,J=I($)?O:$;if(A&&(o=q(o)?o(J,O):o,p({data:o,_c:J})),q(k))try{k=k(J)}catch(U){S=U}if(k&&Er(k))if(k=await k.catch(U=>{S=U}),M!==a[g][0]){if(S)throw S;return k}else S&&A&&n(S)&&(d=!0,p({data:J,_c:P}));if(d&&!S)if(q(d)){const U=d(k,J);p({data:U,error:P,_c:P})}else p({data:k,error:P,_c:P});if(a[g][1]=We(),Promise.resolve(x()).then(()=>{p({_c:P})}),S){if(u)throw S;return}return k}}const vt=(e,t)=>{for(const r in e)e[r][0]&&e[r][0](t)},Nr=(e,t)=>{if(!H.has(e)){const r=ee(Rr,t),s={},i=Tt.bind(P,e);let c=Z;const d={},l=(u,h)=>{const E=d[u]||[];return d[u]=E,E.push(h),()=>E.splice(E.indexOf(h),1)},o=(u,h,E)=>{e.set(u,h);const g=d[u];if(g)for(const v of g)v(h,E)},n=()=>{if(!H.has(e)&&(H.set(e,[s,{},{},{},i,o,l]),!be)){const u=r.initFocus(setTimeout.bind(P,vt.bind(P,s,yt))),h=r.initReconnect(setTimeout.bind(P,vt.bind(P,s,bt)));c=()=>{u&&u(),h&&h(),H.delete(e)}}};return n(),[e,i,n,c]}return[e,H.get(e)[4]]},Sr=(e,t,r,s,i)=>{const c=r.errorRetryCount,d=i.retryCount,l=~~((Math.random()+.5)*(1<<(d<8?d:8)))*r.errorRetryInterval;!I(c)&&d>c||setTimeout(s,l,i)},Cr=(e,t)=>ye(e)==ye(t),[Rt,Dr]=Nr(new Map),xr=ee({onLoadingSlow:Z,onSuccess:Z,onError:Z,onErrorRetry:Sr,onDiscarded:Z,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:It?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:It?5e3:3e3,compare:Cr,isPaused:()=>!1,cache:Rt,mutate:Dr,fallback:{}},vr),Or=(e,t)=>{const r=ee(e,t);if(t){const{use:s,fallback:i}=e,{use:c,fallback:d}=t;s&&c&&(r.use=s.concat(c)),i&&d&&(r.fallback=ee(i,d))}return r},Fr=_.createContext({}),Lr="$inf$",At=Ce&&window.__SWR_DEVTOOLS_USE__,Vr=At?window.__SWR_DEVTOOLS_USE__:[],Pr=()=>{At&&(window.__SWR_DEVTOOLS_REACT__=Qe)},Mr=e=>q(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}],jr=()=>ee(xr,_.useContext(Fr)),Jr=e=>(t,r,s)=>e(t,r&&((...i)=>{const[c]=$e(t),[,,,d]=H.get(Rt);if(c.startsWith(Lr))return r(...i);const l=d[c];return I(l)?r(...i):(delete d[c],l)}),s),Ur=Vr.concat(Jr),Br=e=>function(...t){const r=jr(),[s,i,c]=Mr(t),d=Or(r,c);let l=e;const{use:o}=d,n=(o||[]).concat(Ur);for(let u=n.length;u--;)l=n[u](l);return l(s,i||d.fetcher||null,d)},Yr=(e,t,r)=>{const s=t[e]||(t[e]=[]);return s.push(r),()=>{const i=s.indexOf(r);i>=0&&(s[i]=s[s.length-1],s.pop())}};Pr();const kt=Qe.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)}),Ke={dedupe:!0},$r=(e,t,r)=>{const{cache:s,compare:i,suspense:c,fallbackData:d,revalidateOnMount:l,revalidateIfStale:o,refreshInterval:n,refreshWhenHidden:u,refreshWhenOffline:h,keepPreviousData:E}=r,[g,v,p,R]=H.get(s),[a,m]=$e(e),y=_.useRef(!1),x=_.useRef(!1),k=_.useRef(a),S=_.useRef(t),M=_.useRef(r),A=()=>M.current,C=()=>A().isVisible()&&A().isOnline(),[O,$,J,U]=Et(s,a),z=_.useRef({}).current,Ge=I(d)?r.fallback[a]:d,ie=(f,w)=>{for(const D in z){const T=D;if(T==="data"){if(!i(f[T],w[T])&&(!I(f[T])||!i(G,w[T])))return!1}else if(w[T]!==f[T])return!1}return!0},W=_.useMemo(()=>{const f=!a||!t?!1:I(l)?A().isPaused()||c?!1:I(o)?!0:o:l,w=V=>{const ae=ee(V);return delete ae._k,f?{isValidating:!0,isLoading:!0,...ae}:ae},D=O(),T=U(),X=w(D),oe=D===T?X:w(T);let j=X;return[()=>{const V=w(O());return ie(V,j)?(j.data=V.data,j.isLoading=V.isLoading,j.isValidating=V.isValidating,j.error=V.error,j):(j=V,V)},()=>oe]},[s,a]),B=ea.useSyncExternalStore(_.useCallback(f=>J(a,(w,D)=>{ie(D,w)||f()}),[s,a]),W[0],W[1]),K=!y.current,He=g[a]&&g[a].length>0,te=B.data,re=I(te)?Ge:te,le=B.error,xe=_.useRef(re),G=E?I(te)?xe.current:te:re,ce=He&&!I(le)?!1:K&&!I(l)?l:A().isPaused()?!1:c?I(re)?!1:o:I(re)||o,Oe=!!(a&&t&&K&&ce),b=I(B.isValidating)?Oe:B.isValidating,L=I(B.isLoading)?Oe:B.isLoading,N=_.useCallback(async f=>{const w=S.current;if(!a||!w||x.current||A().isPaused())return!1;let D,T,X=!0;const oe=f||{},j=!p[a]||!oe.dedupe,V=()=>_t?!x.current&&a===k.current&&y.current:a===k.current,ae={isValidating:!1,isLoading:!1},xt=()=>{$(ae)},Ot=()=>{const Y=p[a];Y&&Y[1]===T&&delete p[a]},Ft={isValidating:!0};I(O().data)&&(Ft.isLoading=!0);try{if(j&&($(Ft),r.loadingTimeout&&I(O().data)&&setTimeout(()=>{X&&V()&&A().onLoadingSlow(a,r)},r.loadingTimeout),p[a]=[w(m),We()]),[D,T]=p[a],D=await D,j&&setTimeout(Ot,r.dedupingInterval),!p[a]||p[a][1]!==T)return j&&V()&&A().onDiscarded(a),!1;ae.error=P;const Y=v[a];if(!I(Y)&&(T<=Y[0]||T<=Y[1]||Y[1]===0))return xt(),j&&V()&&A().onDiscarded(a),!1;const Q=O().data;ae.data=i(Q,D)?Q:D,j&&V()&&A().onSuccess(D,a,r)}catch(Y){Ot();const Q=A(),{shouldRetryOnError:ze}=Q;Q.isPaused()||(ae.error=Y,j&&V()&&(Q.onError(Y,a,Q),(ze===!0||q(ze)&&ze(Y))&&(!A().revalidateOnFocus||!A().revalidateOnReconnect||C())&&Q.onErrorRetry(Y,a,Q,Xr=>{const Xe=g[a];Xe&&Xe[0]&&Xe[0](we.ERROR_REVALIDATE_EVENT,Xr)},{retryCount:(oe.retryCount||0)+1,dedupe:!0})))}return X=!1,xt(),!0},[a,s]),F=_.useCallback((...f)=>Tt(s,k.current,...f),[]);if(Be(()=>{S.current=t,M.current=r,I(te)||(xe.current=te)}),Be(()=>{if(!a)return;const f=N.bind(P,Ke);let w=0;const D=Yr(a,g,(T,X={})=>{if(T==we.FOCUS_EVENT){const oe=Date.now();A().revalidateOnFocus&&oe>w&&C()&&(w=oe+A().focusThrottleInterval,f())}else if(T==we.RECONNECT_EVENT)A().revalidateOnReconnect&&C()&&f();else{if(T==we.MUTATE_EVENT)return N();if(T==we.ERROR_REVALIDATE_EVENT)return N(X)}});return x.current=!1,k.current=a,y.current=!0,$({_k:m}),ce&&(I(re)||be?f():Ar(f)),()=>{x.current=!0,D()}},[a]),Be(()=>{let f;function w(){const T=q(n)?n(O().data):n;T&&f!==-1&&(f=setTimeout(D,T))}function D(){!O().error&&(u||A().isVisible())&&(h||A().isOnline())?N(Ke).then(w):w()}return w(),()=>{f&&(clearTimeout(f),f=-1)}},[n,u,h,a]),_.useDebugValue(G),c&&I(re)&&a){if(!_t&&be)throw new Error("Fallback data is required when using suspense in SSR.");S.current=t,M.current=r,x.current=!1;const f=R[a];if(!I(f)){const w=F(f);kt(w)}if(I(le)){const w=N(Ke);I(G)||(w.status="fulfilled",w.value=!0),kt(w)}else throw le}return{mutate:F,get data(){return z.data=!0,G},get error(){return z.error=!0,le},get isValidating(){return z.isValidating=!0,b},get isLoading(){return z.isLoading=!0,L}}},De=Br($r);var qe,Nt;function Wr(){if(Nt)return qe;Nt=1;function e(t,r){if(typeof t!="function")throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof t}\`.`);let s,i=0;return function(...c){clearTimeout(s);const d=Date.now(),l=d-i,o=r-l;o<=0?(i=d,t.apply(this,c)):s=setTimeout(()=>{i=Date.now(),t.apply(this,c)},o)}}return qe=e,qe}var Kr=Wr();const qr=Vt(Kr);function St(e,t){return t!=null?qr(e,t):e}var Gr=async(e,t,r,s,i,c,d,l,o,n,u,h,E,g,v,p,R)=>{var a;const m=d.current;r(t.messages,!1);const y=g?t.messages:t.messages.map(({role:k,content:S,experimental_attachments:M,data:A,annotations:C,toolInvocations:O})=>({role:k,content:S,...M!==void 0&&{experimental_attachments:M},...A!==void 0&&{data:A},...C!==void 0&&{annotations:C},...O!==void 0&&{toolInvocations:O}})),x=i.current;return await mr({api:e,body:(a=v==null?void 0:v({messages:t.messages,requestData:t.data,requestBody:t.body}))!=null?a:{messages:y,data:t.data,...c.current.body,...t.body},streamProtocol:n,credentials:c.current.credentials,headers:{...c.current.headers,...t.headers},abortController:()=>l.current,restoreMessagesOnFailure(){R||r(m,!1)},onResponse:h,onUpdate(k,S){r([...t.messages,...k],!1),S!=null&&S.length&&s([...x??[],...S],!1)},onToolCall:E,onFinish:u,generateId:o,fetch:p})};function Hr({api:e="/api/chat",id:t,initialMessages:r,initialInput:s="",sendExtraMessageFields:i,onToolCall:c,experimental_prepareRequestBody:d,maxSteps:l=1,streamProtocol:o="data",onResponse:n,onFinish:u,onError:h,credentials:E,headers:g,body:v,generateId:p=gt,fetch:R,keepLastMessageOnError:a=!0,experimental_throttle:m}={}){const y=_.useId(),x=t??y,k=typeof e=="string"?[e,x]:x,[S]=_.useState([]),{data:M,mutate:A}=De([k,"messages"],null,{fallbackData:r??S}),C=_.useRef(M||[]);_.useEffect(()=>{C.current=M||[]},[M]);const{data:O,mutate:$}=De([k,"streamData"],null),J=_.useRef(O);_.useEffect(()=>{J.current=O},[O]);const{data:U=!1,mutate:z}=De([k,"loading"],null),{data:Ge=void 0,mutate:ie}=De([k,"error"],null),W=_.useRef(null),B=_.useRef({credentials:E,headers:g,body:v});_.useEffect(()=>{B.current={credentials:E,headers:g,body:v}},[E,g,v]);const K=_.useCallback(async b=>{const L=C.current.length;try{z(!0),ie(void 0);const f=new AbortController;W.current=f,await Gr(e,b,St(A,m),St($,m),J,B,C,W,p,o,u,n,c,i,d,R,a),W.current=null}catch(f){if(f.name==="AbortError")return W.current=null,null;h&&f instanceof Error&&h(f),ie(f)}finally{z(!1)}const N=C.current,F=N[N.length-1];N.length>L&&F!=null&&l>1&&Ct(F)&&zr(N)<l&&await K({messages:N})},[A,z,e,B,n,u,h,ie,$,J,o,i,d,c,l,C,W,p,R,a,m]),He=_.useCallback(async(b,{data:L,headers:N,body:F,experimental_attachments:f}={})=>{var w,D;b.id||(b.id=p());const T=await Dt(f),X=C.current.concat({...b,id:(w=b.id)!=null?w:p(),createdAt:(D=b.createdAt)!=null?D:new Date,experimental_attachments:T.length>0?T:void 0});return K({messages:X,headers:N,body:F,data:L})},[K,p]),te=_.useCallback(async({data:b,headers:L,body:N}={})=>{const F=C.current;if(F.length===0)return null;const f=F[F.length-1];return K({messages:f.role==="assistant"?F.slice(0,-1):F,headers:L,body:N,data:b})},[K]),re=_.useCallback(()=>{W.current&&(W.current.abort(),W.current=null)},[]),le=_.useCallback(b=>{typeof b=="function"&&(b=b(C.current)),A(b,!1),C.current=b},[A]),xe=_.useCallback(b=>{typeof b=="function"&&(b=b(J.current)),$(b,!1),J.current=b},[$]),[G,ce]=_.useState(s),Oe=_.useCallback(async(b,L={},N)=>{var F;if((F=b==null?void 0:b.preventDefault)==null||F.call(b),!G&&!L.allowEmptySubmit)return;N&&(B.current={...B.current,...N});const f=await Dt(L.experimental_attachments),w={messages:!G&&!f.length&&L.allowEmptySubmit?C.current:C.current.concat({id:p(),createdAt:new Date,role:"user",content:G,experimental_attachments:f.length>0?f:void 0}),headers:L.headers,body:L.body,data:L.data};K(w),ce("")},[G,p,K]);return{messages:M||[],setMessages:le,data:O,setData:xe,error:Ge,append:He,reload:te,stop:re,input:G,setInput:ce,handleInputChange:b=>{ce(b.target.value)},handleSubmit:Oe,isLoading:U,addToolResult:({toolCallId:b,result:L})=>{const N=C.current.map((f,w,D)=>w===D.length-1&&f.role==="assistant"&&f.toolInvocations?{...f,toolInvocations:f.toolInvocations.map(T=>T.toolCallId===b?{...T,result:L,state:"result"}:T)}:f);A(N,!1);const F=N[N.length-1];Ct(F)&&K({messages:N})}}}function Ct(e){return e.role==="assistant"&&e.toolInvocations&&e.toolInvocations.length>0&&e.toolInvocations.every(t=>"result"in t)}function zr(e){let t=0;for(let r=e.length-1;r>=0&&e[r].role==="assistant";r--)t++;return t}async function Dt(e){if(e==null)return[];if(e instanceof FileList)return Promise.all(Array.from(e).map(async t=>{const{name:r,type:s}=t,i=await new Promise((c,d)=>{const l=new FileReader;l.onload=o=>{var n;c((n=o.target)==null?void 0:n.result)},l.onerror=o=>d(o),l.readAsDataURL(t)});return{name:r,contentType:s,url:i}}));if(Array.isArray(e))return e;throw new Error("Invalid attachments type")}Pt=Hr});export{ta as __tla,Pt as u};
