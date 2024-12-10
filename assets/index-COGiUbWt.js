import{ax as Pt,aj as Mt,a0 as Ze,r as E,__tla as ta}from"./index-CaXIolPw.js";import{s as ra,__tla as aa}from"./text-to-speech-Be9gUbmA.js";let jt,na=Promise.all([(()=>{try{return ta}catch{}})(),(()=>{try{return aa}catch{}})()]).then(async()=>{var et="vercel.ai.error",Ut=Symbol.for(et),tt,Bt=class Jt extends Error{constructor({name:t,message:r,cause:a}){super(r),this[tt]=!0,this.name=t,this.cause=a}static isInstance(t){return Jt.hasMarker(t,et)}static hasMarker(t,r){const a=Symbol.for(r);return t!=null&&typeof t=="object"&&a in t&&typeof t[a]=="boolean"&&t[a]===!0}};tt=Ut;var oe=Bt;function rt(e){return e==null?"unknown error":typeof e=="string"?e:e instanceof Error?e.message:JSON.stringify(e)}var at="AI_InvalidArgumentError",nt=`vercel.ai.error.${at}`,Yt=Symbol.for(nt),ot,$t=class extends oe{constructor({message:e,cause:t,argument:r}){super({name:at,message:e,cause:t}),this[ot]=!0,this.argument=r}static isInstance(e){return oe.hasMarker(e,nt)}};ot=Yt;var st="AI_JSONParseError",lt=`vercel.ai.error.${st}`,Wt=Symbol.for(lt),it,ct=class extends oe{constructor({text:e,cause:t}){super({name:st,message:`JSON parsing failed: Text: ${e}.
Error message: ${rt(t)}`,cause:t}),this[it]=!0,this.text=e}static isInstance(e){return oe.hasMarker(e,lt)}};it=Wt;var ut="AI_TypeValidationError",dt=`vercel.ai.error.${ut}`,Kt=Symbol.for(dt),pt,qt=class Qe extends oe{constructor({value:t,cause:r}){super({name:ut,message:`Type validation failed: Value: ${JSON.stringify(t)}.
Error message: ${rt(r)}`,cause:r}),this[pt]=!0,this.value=t}static isInstance(t){return oe.hasMarker(t,dt)}static wrap({value:t,cause:r}){return Qe.isInstance(r)&&r.value===t?r:new Qe({value:t,cause:r})}};pt=Kt;var ft=qt;let Gt=(e,t=21)=>(r=t)=>{let a="",o=r;for(;o--;)a+=e[Math.random()*e.length|0];return a};var se={exports:{}};const Ht=typeof Pt<"u",ht=/"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,gt=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;function mt(e,t,r){r==null&&t!==null&&typeof t=="object"&&(r=t,t=void 0),Ht&&Pt.isBuffer(e)&&(e=e.toString()),e&&e.charCodeAt(0)===65279&&(e=e.slice(1));const a=JSON.parse(e,t);if(a===null||typeof a!="object")return a;const o=r&&r.protoAction||"error",l=r&&r.constructorAction||"error";if(o==="ignore"&&l==="ignore")return a;if(o!=="ignore"&&l!=="ignore"){if(ht.test(e)===!1&&gt.test(e)===!1)return a}else if(o!=="ignore"&&l==="ignore"){if(ht.test(e)===!1)return a}else if(gt.test(e)===!1)return a;return Et(a,{protoAction:o,constructorAction:l,safe:r&&r.safe})}function Et(e,{protoAction:t="error",constructorAction:r="error",safe:a}={}){let o=[e];for(;o.length;){const l=o;o=[];for(const u of l){if(t!=="ignore"&&Object.prototype.hasOwnProperty.call(u,"__proto__")){if(a===!0)return null;if(t==="error")throw new SyntaxError("Object contains forbidden prototype property");delete u.__proto__}if(r!=="ignore"&&Object.prototype.hasOwnProperty.call(u,"constructor")&&Object.prototype.hasOwnProperty.call(u.constructor,"prototype")){if(a===!0)return null;if(r==="error")throw new SyntaxError("Object contains forbidden prototype property");delete u.constructor}for(const c in u){const s=u[c];s&&typeof s=="object"&&o.push(s)}}}return e}function Fe(e,t,r){const a=Error.stackTraceLimit;Error.stackTraceLimit=0;try{return mt(e,t,r)}finally{Error.stackTraceLimit=a}}function zt(e,t){const r=Error.stackTraceLimit;Error.stackTraceLimit=0;try{return mt(e,t,{safe:!0})}catch{return null}finally{Error.stackTraceLimit=r}}se.exports=Fe,se.exports.default=Fe,se.exports.parse=Fe,se.exports.safeParse=zt,se.exports.scan=Et;var Xt=se.exports;const Zt=Mt(Xt);var Qt=({prefix:e,size:t=16,alphabet:r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",separator:a="-"}={})=>{const o=Gt(r,t);if(e==null)return o;if(r.includes(a))throw new $t({argument:"separator",message:`The separator "${a}" must not be part of the alphabet "${r}".`});return l=>`${e}${a}${o(l)}`},_t=Qt(),Le=Symbol.for("vercel.ai.validator");function er(e){return{[Le]:!0,validate:e}}function tr(e){return typeof e=="object"&&e!==null&&Le in e&&e[Le]===!0&&"validate"in e}function rr(e){return tr(e)?e:ar(e)}function ar(e){return er(t=>{const r=e.safeParse(t);return r.success?{success:!0,value:r.data}:{success:!1,error:r.error}})}function nr({value:e,schema:t}){const r=rr(t);try{if(r.validate==null)return{success:!0,value:e};const a=r.validate(e);return a.success?a:{success:!1,error:ft.wrap({value:e,cause:a.error})}}catch(a){return{success:!1,error:ft.wrap({value:e,cause:a})}}}function yt({text:e,schema:t}){try{const r=Zt.parse(e);return t==null?{success:!0,value:r}:nr({value:r,schema:t})}catch(r){return{success:!1,error:ct.isInstance(r)?r:new ct({text:e,cause:r})}}}var Te={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},ve={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},Re={code:"4",name:"assistant_message",parse:e=>{if(e==null||typeof e!="object"||!("id"in e)||!("role"in e)||!("content"in e)||typeof e.id!="string"||typeof e.role!="string"||e.role!=="assistant"||!Array.isArray(e.content)||!e.content.every(t=>t!=null&&typeof t=="object"&&"type"in t&&t.type==="text"&&"text"in t&&t.text!=null&&typeof t.text=="object"&&"value"in t.text&&typeof t.text.value=="string"))throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');return{type:"assistant_message",value:e}}},Ae={code:"5",name:"assistant_control_data",parse:e=>{if(e==null||typeof e!="object"||!("threadId"in e)||!("messageId"in e)||typeof e.threadId!="string"||typeof e.messageId!="string")throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');return{type:"assistant_control_data",value:{threadId:e.threadId,messageId:e.messageId}}}},ke={code:"6",name:"data_message",parse:e=>{if(e==null||typeof e!="object"||!("role"in e)||!("data"in e)||typeof e.role!="string"||e.role!=="data")throw new Error('"data_message" parts expect an object with a "role" and "data" property.');return{type:"data_message",value:e}}},or=[Te,ve,Re,Ae,ke];Te.code+"",ve.code+"",Re.code+"",Ae.code+"",ke.code+"",Te.name+"",Te.code,ve.name+"",ve.code,Re.name+"",Re.code,Ae.name+"",Ae.code,ke.name+"",ke.code,or.map(e=>e.code);function sr(e){const t=["ROOT"];let r=-1,a=null;function o(s,i,f){switch(s){case'"':{r=i,t.pop(),t.push(f),t.push("INSIDE_STRING");break}case"f":case"t":case"n":{r=i,a=i,t.pop(),t.push(f),t.push("INSIDE_LITERAL");break}case"-":{t.pop(),t.push(f),t.push("INSIDE_NUMBER");break}case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":{r=i,t.pop(),t.push(f),t.push("INSIDE_NUMBER");break}case"{":{r=i,t.pop(),t.push(f),t.push("INSIDE_OBJECT_START");break}case"[":{r=i,t.pop(),t.push(f),t.push("INSIDE_ARRAY_START");break}}}function l(s,i){switch(s){case",":{t.pop(),t.push("INSIDE_OBJECT_AFTER_COMMA");break}case"}":{r=i,t.pop();break}}}function u(s,i){switch(s){case",":{t.pop(),t.push("INSIDE_ARRAY_AFTER_COMMA");break}case"]":{r=i,t.pop();break}}}for(let s=0;s<e.length;s++){const i=e[s];switch(t[t.length-1]){case"ROOT":o(i,s,"FINISH");break;case"INSIDE_OBJECT_START":{switch(i){case'"':{t.pop(),t.push("INSIDE_OBJECT_KEY");break}case"}":{r=s,t.pop();break}}break}case"INSIDE_OBJECT_AFTER_COMMA":{switch(i){case'"':{t.pop(),t.push("INSIDE_OBJECT_KEY");break}}break}case"INSIDE_OBJECT_KEY":{switch(i){case'"':{t.pop(),t.push("INSIDE_OBJECT_AFTER_KEY");break}}break}case"INSIDE_OBJECT_AFTER_KEY":{switch(i){case":":{t.pop(),t.push("INSIDE_OBJECT_BEFORE_VALUE");break}}break}case"INSIDE_OBJECT_BEFORE_VALUE":{o(i,s,"INSIDE_OBJECT_AFTER_VALUE");break}case"INSIDE_OBJECT_AFTER_VALUE":{l(i,s);break}case"INSIDE_STRING":{switch(i){case'"':{t.pop(),r=s;break}case"\\":{t.push("INSIDE_STRING_ESCAPE");break}default:r=s}break}case"INSIDE_ARRAY_START":{switch(i){case"]":{r=s,t.pop();break}default:{r=s,o(i,s,"INSIDE_ARRAY_AFTER_VALUE");break}}break}case"INSIDE_ARRAY_AFTER_VALUE":{switch(i){case",":{t.pop(),t.push("INSIDE_ARRAY_AFTER_COMMA");break}case"]":{r=s,t.pop();break}default:{r=s;break}}break}case"INSIDE_ARRAY_AFTER_COMMA":{o(i,s,"INSIDE_ARRAY_AFTER_VALUE");break}case"INSIDE_STRING_ESCAPE":{t.pop(),r=s;break}case"INSIDE_NUMBER":{switch(i){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":{r=s;break}case"e":case"E":case"-":case".":break;case",":{t.pop(),t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&u(i,s),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"&&l(i,s);break}case"}":{t.pop(),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"&&l(i,s);break}case"]":{t.pop(),t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&u(i,s);break}default:{t.pop();break}}break}case"INSIDE_LITERAL":{const f=e.substring(a,s+1);!"false".startsWith(f)&&!"true".startsWith(f)&&!"null".startsWith(f)?(t.pop(),t[t.length-1]==="INSIDE_OBJECT_AFTER_VALUE"?l(i,s):t[t.length-1]==="INSIDE_ARRAY_AFTER_VALUE"&&u(i,s)):r=s;break}}}let c=e.slice(0,r+1);for(let s=t.length-1;s>=0;s--)switch(t[s]){case"INSIDE_STRING":{c+='"';break}case"INSIDE_OBJECT_KEY":case"INSIDE_OBJECT_AFTER_KEY":case"INSIDE_OBJECT_AFTER_COMMA":case"INSIDE_OBJECT_START":case"INSIDE_OBJECT_BEFORE_VALUE":case"INSIDE_OBJECT_AFTER_VALUE":{c+="}";break}case"INSIDE_ARRAY_START":case"INSIDE_ARRAY_AFTER_COMMA":case"INSIDE_ARRAY_AFTER_VALUE":{c+="]";break}case"INSIDE_LITERAL":{const i=e.substring(a,e.length);"true".startsWith(i)?c+="true".slice(i.length):"false".startsWith(i)?c+="false".slice(i.length):"null".startsWith(i)&&(c+="null".slice(i.length))}}return c}function lr(e){if(e===void 0)return{value:void 0,state:"undefined-input"};let t=yt({text:e});return t.success?{value:t.value,state:"successful-parse"}:(t=yt({text:sr(e)}),t.success?{value:t.value,state:"repaired-parse"}:{value:void 0,state:"failed-parse"})}var ue={code:"0",name:"text",parse:e=>{if(typeof e!="string")throw new Error('"text" parts expect a string value.');return{type:"text",value:e}}},de={code:"2",name:"data",parse:e=>{if(!Array.isArray(e))throw new Error('"data" parts expect an array value.');return{type:"data",value:e}}},pe={code:"3",name:"error",parse:e=>{if(typeof e!="string")throw new Error('"error" parts expect a string value.');return{type:"error",value:e}}},fe={code:"8",name:"message_annotations",parse:e=>{if(!Array.isArray(e))throw new Error('"message_annotations" parts expect an array value.');return{type:"message_annotations",value:e}}},he={code:"9",name:"tool_call",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("toolName"in e)||typeof e.toolName!="string"||!("args"in e)||typeof e.args!="object")throw new Error('"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.');return{type:"tool_call",value:e}}},ge={code:"a",name:"tool_result",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("result"in e))throw new Error('"tool_result" parts expect an object with a "toolCallId" and a "result" property.');return{type:"tool_result",value:e}}},me={code:"b",name:"tool_call_streaming_start",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("toolName"in e)||typeof e.toolName!="string")throw new Error('"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.');return{type:"tool_call_streaming_start",value:e}}},Ee={code:"c",name:"tool_call_delta",parse:e=>{if(e==null||typeof e!="object"||!("toolCallId"in e)||typeof e.toolCallId!="string"||!("argsTextDelta"in e)||typeof e.argsTextDelta!="string")throw new Error('"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.');return{type:"tool_call_delta",value:e}}},_e={code:"d",name:"finish_message",parse:e=>{if(e==null||typeof e!="object"||!("finishReason"in e)||typeof e.finishReason!="string")throw new Error('"finish_message" parts expect an object with a "finishReason" property.');const t={finishReason:e.finishReason};return"usage"in e&&e.usage!=null&&typeof e.usage=="object"&&"promptTokens"in e.usage&&"completionTokens"in e.usage&&(t.usage={promptTokens:typeof e.usage.promptTokens=="number"?e.usage.promptTokens:Number.NaN,completionTokens:typeof e.usage.completionTokens=="number"?e.usage.completionTokens:Number.NaN}),{type:"finish_message",value:t}}},ye={code:"e",name:"finish_step",parse:e=>{if(e==null||typeof e!="object"||!("finishReason"in e)||typeof e.finishReason!="string")throw new Error('"finish_step" parts expect an object with a "finishReason" property.');const t={finishReason:e.finishReason,isContinued:!1};return"usage"in e&&e.usage!=null&&typeof e.usage=="object"&&"promptTokens"in e.usage&&"completionTokens"in e.usage&&(t.usage={promptTokens:typeof e.usage.promptTokens=="number"?e.usage.promptTokens:Number.NaN,completionTokens:typeof e.usage.completionTokens=="number"?e.usage.completionTokens:Number.NaN}),"isContinued"in e&&typeof e.isContinued=="boolean"&&(t.isContinued=e.isContinued),{type:"finish_step",value:t}}},ir=[ue,de,pe,fe,he,ge,me,Ee,_e,ye],cr={[ue.code]:ue,[de.code]:de,[pe.code]:pe,[fe.code]:fe,[he.code]:he,[ge.code]:ge,[me.code]:me,[Ee.code]:Ee,[_e.code]:_e,[ye.code]:ye};ue.name+"",ue.code,de.name+"",de.code,pe.name+"",pe.code,fe.name+"",fe.code,he.name+"",he.code,ge.name+"",ge.code,me.name+"",me.code,Ee.name+"",Ee.code,_e.name+"",_e.code,ye.name+"",ye.code;var ur=ir.map(e=>e.code),dr=e=>{const t=e.indexOf(":");if(t===-1)throw new Error("Failed to parse stream string. No separator found.");const r=e.slice(0,t);if(!ur.includes(r))throw new Error(`Failed to parse stream string. Invalid code ${r}.`);const a=r,o=e.slice(t+1),l=JSON.parse(o);return cr[a].parse(l)},pr=10;function fr(e,t){const r=new Uint8Array(t);let a=0;for(const o of e)r.set(o,a),a+=o.length;return e.length=0,r}async function hr({stream:e,onTextPart:t,onDataPart:r,onErrorPart:a,onToolCallStreamingStartPart:o,onToolCallDeltaPart:l,onToolCallPart:u,onToolResultPart:c,onMessageAnnotationsPart:s,onFinishMessagePart:i,onFinishStepPart:f}){const m=e.getReader(),T=new TextDecoder,g=[];let A=0;for(;;){const{value:d}=await m.read();if(d&&(g.push(d),A+=d.length,d[d.length-1]!==pr))continue;if(g.length===0)break;const v=fr(g,A);A=0;const n=T.decode(v,{stream:!0}).split(`
`).filter(h=>h!=="").map(dr);for(const{type:h,value:y}of n)switch(h){case"text":await(t==null?void 0:t(y));break;case"data":await(r==null?void 0:r(y));break;case"error":await(a==null?void 0:a(y));break;case"message_annotations":await(s==null?void 0:s(y));break;case"tool_call_streaming_start":await(o==null?void 0:o(y));break;case"tool_call_delta":await(l==null?void 0:l(y));break;case"tool_call":await(u==null?void 0:u(y));break;case"tool_result":await(c==null?void 0:c(y));break;case"finish_message":await(i==null?void 0:i(y));break;case"finish_step":await(f==null?void 0:f(y));break;default:{const x=h;throw new Error(`Unknown stream part type: ${x}`)}}}}function gr({promptTokens:e,completionTokens:t}){return{promptTokens:e,completionTokens:t,totalTokens:e+t}}async function mr({stream:e,update:t,onToolCall:r,onFinish:a,generateId:o=_t,getCurrentDate:l=()=>new Date}){const u=l();let c,s=!0;const i=[],f=[];let m;const T={};let g={completionTokens:NaN,promptTokens:NaN,totalTokens:NaN},A="unknown";function d(){const n=[...f];if(c==null){t(i,n);return}m!=null&&m.length&&(c.annotations=m);const h={...JSON.parse(JSON.stringify(c)),revisionId:o()};t([...i,h],n)}function v(){return(s||c==null)&&(c!=null&&i.push(c),s=!1,c={id:o(),role:"assistant",content:"",createdAt:u}),c}await hr({stream:e,onTextPart(n){const h=v();c={...h,content:h.content+n},d()},onToolCallStreamingStartPart(n){const h=v();h.toolInvocations==null&&(h.toolInvocations=[]),T[n.toolCallId]={text:"",toolName:n.toolName,index:h.toolInvocations.length},h.toolInvocations.push({state:"partial-call",toolCallId:n.toolCallId,toolName:n.toolName,args:void 0}),d()},onToolCallDeltaPart(n){const h=v(),y=T[n.toolCallId];y.text+=n.argsTextDelta;const{value:x}=lr(y.text);h.toolInvocations[y.index]={state:"partial-call",toolCallId:n.toolCallId,toolName:y.toolName,args:x},d()},async onToolCallPart(n){const h=v();if(T[n.toolCallId]!=null?h.toolInvocations[T[n.toolCallId].index]={state:"call",...n}:(h.toolInvocations==null&&(h.toolInvocations=[]),h.toolInvocations.push({state:"call",...n})),r){const y=await r({toolCall:n});y!=null&&(h.toolInvocations[h.toolInvocations.length-1]={state:"result",...n,result:y})}d()},onToolResultPart(n){const h=v().toolInvocations;if(h==null)throw new Error("tool_result must be preceded by a tool_call");const y=h.findIndex(x=>x.toolCallId===n.toolCallId);if(y===-1)throw new Error("tool_result must be preceded by a tool_call with the same toolCallId");h[y]={...h[y],state:"result",...n},d()},onDataPart(n){f.push(...n),d()},onMessageAnnotationsPart(n){m==null?m=[...n]:m.push(...n),d()},onFinishStepPart(n){s=!n.isContinued},onFinishMessagePart(n){A=n.finishReason,n.usage!=null&&(g=gr(n.usage))},onErrorPart(n){throw new Error(n)}}),a==null||a({message:c,finishReason:A,usage:g})}async function Er({stream:e,onTextPart:t}){const r=e.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:a,value:o}=await r.read();if(a)break;await t(o)}}var _r=()=>fetch;async function yr({api:e,body:t,streamProtocol:r="data",credentials:a,headers:o,abortController:l,restoreMessagesOnFailure:u,onResponse:c,onUpdate:s,onFinish:i,onToolCall:f,generateId:m,fetch:T=_r()}){var g,A;const d=await T(e,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",...o},signal:(g=l==null?void 0:l())==null?void 0:g.signal,credentials:a}).catch(v=>{throw u(),v});if(c)try{await c(d)}catch(v){throw v}if(!d.ok)throw u(),new Error((A=await d.text())!=null?A:"Failed to fetch the chat response.");if(!d.body)throw new Error("The response body is empty.");switch(r){case"text":{const v={id:m(),createdAt:new Date,role:"assistant",content:""};await Er({stream:d.body,onTextPart:n=>{v.content+=n,s([{...v}],[])}}),i==null||i(v,{usage:{completionTokens:NaN,promptTokens:NaN,totalTokens:NaN},finishReason:"unknown"});return}case"data":{await mr({stream:d.body,update:s,onToolCall:f,onFinish({message:v,finishReason:n,usage:h}){i&&v!=null&&i(v,{usage:h,finishReason:n})},generateId:m});return}default:{const v=r;throw new Error(`Unknown stream protocol: ${v}`)}}}const Q=()=>{},P=Q(),Ve=Object,_=e=>e===P,q=e=>typeof e=="function",ee=(e,t)=>({...e,...t}),br=e=>q(e.then),Ne=new WeakMap;let wr=0;const be=e=>{const t=typeof e,r=e&&e.constructor,a=r==Date;let o,l;if(Ve(e)===e&&!a&&r!=RegExp){if(o=Ne.get(e),o)return o;if(o=++wr+"~",Ne.set(e,o),r==Array){for(o="@",l=0;l<e.length;l++)o+=be(e[l])+",";Ne.set(e,o)}if(r==Ve){o="#";const u=Ve.keys(e).sort();for(;!_(l=u.pop());)_(e[l])||(o+=l+":"+be(e[l])+",");Ne.set(e,o)}}else o=a?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return o},H=new WeakMap,Pe={},Se={},Me="undefined",Ce=typeof window!=Me,je=typeof document!=Me,Ir=()=>Ce&&typeof window.requestAnimationFrame!=Me,bt=(e,t)=>{const r=H.get(e);return[()=>!_(t)&&e.get(t)||Pe,a=>{if(!_(t)){const o=e.get(t);t in Se||(Se[t]=o),r[5](t,ee(o,a),o||Pe)}},r[6],()=>!_(t)&&t in Se?Se[t]:!_(t)&&e.get(t)||Pe]};let Je=!0;const Tr=()=>Je,[Ue,Be]=Ce&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[Q,Q],vr=()=>{const e=je&&document.visibilityState;return _(e)||e!=="hidden"},Rr=e=>(je&&document.addEventListener("visibilitychange",e),Ue("focus",e),()=>{je&&document.removeEventListener("visibilitychange",e),Be("focus",e)}),Ar=e=>{const t=()=>{Je=!0,e()},r=()=>{Je=!1};return Ue("online",t),Ue("offline",r),()=>{Be("online",t),Be("offline",r)}},kr={isOnline:Tr,isVisible:vr},Nr={initFocus:Rr,initReconnect:Ar},wt=!Ze.useId,we=!Ce||"Deno"in window,Sr=e=>Ir()?window.requestAnimationFrame(e):setTimeout(e,1),Ye=we?E.useEffect:E.useLayoutEffect,$e=typeof navigator<"u"&&navigator.connection,It=!we&&$e&&(["slow-2g","2g"].includes($e.effectiveType)||$e.saveData),We=e=>{if(q(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?be(e):"",[e,t]};let Cr=0;const Ke=()=>++Cr,Tt=0,vt=1,Rt=2;var Ie={__proto__:null,ERROR_REVALIDATE_EVENT:3,FOCUS_EVENT:Tt,MUTATE_EVENT:Rt,RECONNECT_EVENT:vt};async function At(...e){const[t,r,a,o]=e,l=ee({populateCache:!0,throwOnError:!0},typeof o=="boolean"?{revalidate:o}:o||{});let u=l.populateCache;const c=l.rollbackOnError;let s=l.optimisticData;const i=T=>typeof c=="function"?c(T):c!==!1,f=l.throwOnError;if(q(r)){const T=r,g=[],A=t.keys();for(const d of A)!/^\$(inf|sub)\$/.test(d)&&T(t.get(d)._k)&&g.push(d);return Promise.all(g.map(m))}return m(r);async function m(T){const[g]=We(T);if(!g)return;const[A,d]=bt(t,g),[v,n,h,y]=H.get(t),x=()=>{const U=v[g];return(q(l.revalidate)?l.revalidate(A().data,T):l.revalidate!==!1)&&(delete h[g],delete y[g],U&&U[0])?U[0](Rt).then(()=>A().data):A().data};if(e.length<3)return x();let k=a,S;const M=Ke();n[g]=[M,0];const R=!_(s),C=A(),O=C.data,$=C._c,J=_($)?O:$;if(R&&(s=q(s)?s(J,O):s,d({data:s,_c:J})),q(k))try{k=k(J)}catch(U){S=U}if(k&&br(k))if(k=await k.catch(U=>{S=U}),M!==n[g][0]){if(S)throw S;return k}else S&&R&&i(S)&&(u=!0,d({data:J,_c:P}));if(u&&!S)if(q(u)){const U=u(k,J);d({data:U,error:P,_c:P})}else d({data:k,error:P,_c:P});if(n[g][1]=Ke(),Promise.resolve(x()).then(()=>{d({_c:P})}),S){if(f)throw S;return}return k}}const kt=(e,t)=>{for(const r in e)e[r][0]&&e[r][0](t)},Dr=(e,t)=>{if(!H.has(e)){const r=ee(Nr,t),a={},o=At.bind(P,e);let l=Q;const u={},c=(f,m)=>{const T=u[f]||[];return u[f]=T,T.push(m),()=>T.splice(T.indexOf(m),1)},s=(f,m,T)=>{e.set(f,m);const g=u[f];if(g)for(const A of g)A(m,T)},i=()=>{if(!H.has(e)&&(H.set(e,[a,{},{},{},o,s,c]),!we)){const f=r.initFocus(setTimeout.bind(P,kt.bind(P,a,Tt))),m=r.initReconnect(setTimeout.bind(P,kt.bind(P,a,vt)));l=()=>{f&&f(),m&&m(),H.delete(e)}}};return i(),[e,o,i,l]}return[e,H.get(e)[4]]},xr=(e,t,r,a,o)=>{const l=r.errorRetryCount,u=o.retryCount,c=~~((Math.random()+.5)*(1<<(u<8?u:8)))*r.errorRetryInterval;!_(l)&&u>l||setTimeout(a,c,o)},Or=(e,t)=>be(e)==be(t),[Nt,Fr]=Dr(new Map),Lr=ee({onLoadingSlow:Q,onSuccess:Q,onError:Q,onErrorRetry:xr,onDiscarded:Q,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:It?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:It?5e3:3e3,compare:Or,isPaused:()=>!1,cache:Nt,mutate:Fr,fallback:{}},kr),Vr=(e,t)=>{const r=ee(e,t);if(t){const{use:a,fallback:o}=e,{use:l,fallback:u}=t;a&&l&&(r.use=a.concat(l)),o&&u&&(r.fallback=ee(o,u))}return r},Pr=E.createContext({}),Mr="$inf$",St=Ce&&window.__SWR_DEVTOOLS_USE__,jr=St?window.__SWR_DEVTOOLS_USE__:[],Jr=()=>{St&&(window.__SWR_DEVTOOLS_REACT__=Ze)},Ur=e=>q(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}],Br=()=>ee(Lr,E.useContext(Pr)),Yr=e=>(t,r,a)=>e(t,r&&((...o)=>{const[l]=We(t),[,,,u]=H.get(Nt);if(l.startsWith(Mr))return r(...o);const c=u[l];return _(c)?r(...o):(delete u[l],c)}),a),$r=jr.concat(Yr),Wr=e=>function(...t){const r=Br(),[a,o,l]=Ur(t),u=Vr(r,l);let c=e;const{use:s}=u,i=(s||[]).concat($r);for(let f=i.length;f--;)c=i[f](c);return c(a,o||u.fetcher||null,u)},Kr=(e,t,r)=>{const a=t[e]||(t[e]=[]);return a.push(r),()=>{const o=a.indexOf(r);o>=0&&(a[o]=a[a.length-1],a.pop())}};Jr();const Ct=Ze.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)}),qe={dedupe:!0},qr=(e,t,r)=>{const{cache:a,compare:o,suspense:l,fallbackData:u,revalidateOnMount:c,revalidateIfStale:s,refreshInterval:i,refreshWhenHidden:f,refreshWhenOffline:m,keepPreviousData:T}=r,[g,A,d,v]=H.get(a),[n,h]=We(e),y=E.useRef(!1),x=E.useRef(!1),k=E.useRef(n),S=E.useRef(t),M=E.useRef(r),R=()=>M.current,C=()=>R().isVisible()&&R().isOnline(),[O,$,J,U]=bt(a,n),z=E.useRef({}).current,Ge=_(u)?r.fallback[n]:u,le=(p,w)=>{for(const D in z){const I=D;if(I==="data"){if(!o(p[I],w[I])&&(!_(p[I])||!o(G,w[I])))return!1}else if(w[I]!==p[I])return!1}return!0},W=E.useMemo(()=>{const p=!n||!t?!1:_(c)?R().isPaused()||l?!1:_(s)?!0:s:c,w=V=>{const ae=ee(V);return delete ae._k,p?{isValidating:!0,isLoading:!0,...ae}:ae},D=O(),I=U(),X=w(D),ne=D===I?X:w(I);let j=X;return[()=>{const V=w(O());return le(V,j)?(j.data=V.data,j.isLoading=V.isLoading,j.isValidating=V.isValidating,j.error=V.error,j):(j=V,V)},()=>ne]},[a,n]),B=ra.useSyncExternalStore(E.useCallback(p=>J(n,(w,D)=>{le(D,w)||p()}),[a,n]),W[0],W[1]),K=!y.current,He=g[n]&&g[n].length>0,te=B.data,re=_(te)?Ge:te,ie=B.error,xe=E.useRef(re),G=T?_(te)?xe.current:te:re,ce=He&&!_(ie)?!1:K&&!_(c)?c:R().isPaused()?!1:l?_(re)?!1:s:_(re)||s,Oe=!!(n&&t&&K&&ce),b=_(B.isValidating)?Oe:B.isValidating,L=_(B.isLoading)?Oe:B.isLoading,N=E.useCallback(async p=>{const w=S.current;if(!n||!w||x.current||R().isPaused())return!1;let D,I,X=!0;const ne=p||{},j=!d[n]||!ne.dedupe,V=()=>wt?!x.current&&n===k.current&&y.current:n===k.current,ae={isValidating:!1,isLoading:!1},Ft=()=>{$(ae)},Lt=()=>{const Y=d[n];Y&&Y[1]===I&&delete d[n]},Vt={isValidating:!0};_(O().data)&&(Vt.isLoading=!0);try{if(j&&($(Vt),r.loadingTimeout&&_(O().data)&&setTimeout(()=>{X&&V()&&R().onLoadingSlow(n,r)},r.loadingTimeout),d[n]=[w(h),Ke()]),[D,I]=d[n],D=await D,j&&setTimeout(Lt,r.dedupingInterval),!d[n]||d[n][1]!==I)return j&&V()&&R().onDiscarded(n),!1;ae.error=P;const Y=A[n];if(!_(Y)&&(I<=Y[0]||I<=Y[1]||Y[1]===0))return Ft(),j&&V()&&R().onDiscarded(n),!1;const Z=O().data;ae.data=o(Z,D)?Z:D,j&&V()&&R().onSuccess(D,n,r)}catch(Y){Lt();const Z=R(),{shouldRetryOnError:ze}=Z;Z.isPaused()||(ae.error=Y,j&&V()&&(Z.onError(Y,n,Z),(ze===!0||q(ze)&&ze(Y))&&(!R().revalidateOnFocus||!R().revalidateOnReconnect||C())&&Z.onErrorRetry(Y,n,Z,ea=>{const Xe=g[n];Xe&&Xe[0]&&Xe[0](Ie.ERROR_REVALIDATE_EVENT,ea)},{retryCount:(ne.retryCount||0)+1,dedupe:!0})))}return X=!1,Ft(),!0},[n,a]),F=E.useCallback((...p)=>At(a,k.current,...p),[]);if(Ye(()=>{S.current=t,M.current=r,_(te)||(xe.current=te)}),Ye(()=>{if(!n)return;const p=N.bind(P,qe);let w=0;const D=Kr(n,g,(I,X={})=>{if(I==Ie.FOCUS_EVENT){const ne=Date.now();R().revalidateOnFocus&&ne>w&&C()&&(w=ne+R().focusThrottleInterval,p())}else if(I==Ie.RECONNECT_EVENT)R().revalidateOnReconnect&&C()&&p();else{if(I==Ie.MUTATE_EVENT)return N();if(I==Ie.ERROR_REVALIDATE_EVENT)return N(X)}});return x.current=!1,k.current=n,y.current=!0,$({_k:h}),ce&&(_(re)||we?p():Sr(p)),()=>{x.current=!0,D()}},[n]),Ye(()=>{let p;function w(){const I=q(i)?i(O().data):i;I&&p!==-1&&(p=setTimeout(D,I))}function D(){!O().error&&(f||R().isVisible())&&(m||R().isOnline())?N(qe).then(w):w()}return w(),()=>{p&&(clearTimeout(p),p=-1)}},[i,f,m,n]),E.useDebugValue(G),l&&_(re)&&n){if(!wt&&we)throw new Error("Fallback data is required when using suspense in SSR.");S.current=t,M.current=r,x.current=!1;const p=v[n];if(!_(p)){const w=F(p);Ct(w)}if(_(ie)){const w=N(qe);_(G)||(w.status="fulfilled",w.value=!0),Ct(w)}else throw ie}return{mutate:F,get data(){return z.data=!0,G},get error(){return z.error=!0,ie},get isValidating(){return z.isValidating=!0,b},get isLoading(){return z.isLoading=!0,L}}},De=Wr(qr);function Gr(e,t){if(typeof e!="function")throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof e}\`.`);let r,a=0;return function(...o){clearTimeout(r);const l=Date.now(),u=l-a,c=t-u;c<=0?(a=l,e.apply(this,o)):r=setTimeout(()=>{a=Date.now(),e.apply(this,o)},c)}}var Hr=Gr;const zr=Mt(Hr);function Dt(e,t){return t!=null?zr(e,t):e}var Xr=async(e,t,r,a,o,l,u,c,s,i,f,m,T,g,A,d,v)=>{var n;const h=u.current;r(t.messages,!1);const y=g?t.messages:t.messages.map(({role:k,content:S,experimental_attachments:M,data:R,annotations:C,toolInvocations:O})=>({role:k,content:S,...M!==void 0&&{experimental_attachments:M},...R!==void 0&&{data:R},...C!==void 0&&{annotations:C},...O!==void 0&&{toolInvocations:O}})),x=o.current;return await yr({api:e,body:(n=A==null?void 0:A({messages:t.messages,requestData:t.data,requestBody:t.body}))!=null?n:{messages:y,data:t.data,...l.current.body,...t.body},streamProtocol:i,credentials:l.current.credentials,headers:{...l.current.headers,...t.headers},abortController:()=>c.current,restoreMessagesOnFailure(){v||r(h,!1)},onResponse:m,onUpdate(k,S){r([...t.messages,...k],!1),S!=null&&S.length&&a([...x??[],...S],!1)},onToolCall:T,onFinish:f,generateId:s,fetch:d})};function Zr({api:e="/api/chat",id:t,initialMessages:r,initialInput:a="",sendExtraMessageFields:o,onToolCall:l,experimental_prepareRequestBody:u,maxSteps:c=1,streamProtocol:s="data",onResponse:i,onFinish:f,onError:m,credentials:T,headers:g,body:A,generateId:d=_t,fetch:v,keepLastMessageOnError:n=!0,experimental_throttle:h}={}){const y=E.useId(),x=t??y,k=typeof e=="string"?[e,x]:x,[S]=E.useState([]),{data:M,mutate:R}=De([k,"messages"],null,{fallbackData:r??S}),C=E.useRef(M||[]);E.useEffect(()=>{C.current=M||[]},[M]);const{data:O,mutate:$}=De([k,"streamData"],null),J=E.useRef(O);E.useEffect(()=>{J.current=O},[O]);const{data:U=!1,mutate:z}=De([k,"loading"],null),{data:Ge=void 0,mutate:le}=De([k,"error"],null),W=E.useRef(null),B=E.useRef({credentials:T,headers:g,body:A});E.useEffect(()=>{B.current={credentials:T,headers:g,body:A}},[T,g,A]);const K=E.useCallback(async b=>{const L=C.current.length;try{z(!0),le(void 0);const p=new AbortController;W.current=p,await Xr(e,b,Dt(R,h),Dt($,h),J,B,C,W,d,s,f,i,l,o,u,v,n),W.current=null}catch(p){if(p.name==="AbortError")return W.current=null,null;m&&p instanceof Error&&m(p),le(p)}finally{z(!1)}const N=C.current,F=N[N.length-1];N.length>L&&F!=null&&c>1&&xt(F)&&Qr(N)<c&&await K({messages:N})},[R,z,e,B,i,f,m,le,$,J,s,o,u,l,c,C,W,d,v,n,h]),He=E.useCallback(async(b,{data:L,headers:N,body:F,experimental_attachments:p}={})=>{var w,D;b.id||(b.id=d());const I=await Ot(p),X=C.current.concat({...b,id:(w=b.id)!=null?w:d(),createdAt:(D=b.createdAt)!=null?D:new Date,experimental_attachments:I.length>0?I:void 0});return K({messages:X,headers:N,body:F,data:L})},[K,d]),te=E.useCallback(async({data:b,headers:L,body:N}={})=>{const F=C.current;if(F.length===0)return null;const p=F[F.length-1];return K({messages:p.role==="assistant"?F.slice(0,-1):F,headers:L,body:N,data:b})},[K]),re=E.useCallback(()=>{W.current&&(W.current.abort(),W.current=null)},[]),ie=E.useCallback(b=>{typeof b=="function"&&(b=b(C.current)),R(b,!1),C.current=b},[R]),xe=E.useCallback(b=>{typeof b=="function"&&(b=b(J.current)),$(b,!1),J.current=b},[$]),[G,ce]=E.useState(a),Oe=E.useCallback(async(b,L={},N)=>{var F;if((F=b==null?void 0:b.preventDefault)==null||F.call(b),!G&&!L.allowEmptySubmit)return;N&&(B.current={...B.current,...N});const p=await Ot(L.experimental_attachments),w={messages:!G&&!p.length&&L.allowEmptySubmit?C.current:C.current.concat({id:d(),createdAt:new Date,role:"user",content:G,experimental_attachments:p.length>0?p:void 0}),headers:L.headers,body:L.body,data:L.data};K(w),ce("")},[G,d,K]);return{messages:M||[],setMessages:ie,data:O,setData:xe,error:Ge,append:He,reload:te,stop:re,input:G,setInput:ce,handleInputChange:b=>{ce(b.target.value)},handleSubmit:Oe,isLoading:U,addToolResult:({toolCallId:b,result:L})=>{const N=C.current.map((p,w,D)=>w===D.length-1&&p.role==="assistant"&&p.toolInvocations?{...p,toolInvocations:p.toolInvocations.map(I=>I.toolCallId===b?{...I,result:L,state:"result"}:I)}:p);R(N,!1);const F=N[N.length-1];xt(F)&&K({messages:N})}}}function xt(e){return e.role==="assistant"&&e.toolInvocations&&e.toolInvocations.length>0&&e.toolInvocations.every(t=>"result"in t)}function Qr(e){let t=0;for(let r=e.length-1;r>=0&&e[r].role==="assistant";r--)t++;return t}async function Ot(e){if(e==null)return[];if(e instanceof FileList)return Promise.all(Array.from(e).map(async t=>{const{name:r,type:a}=t,o=await new Promise((l,u)=>{const c=new FileReader;c.onload=s=>{var i;l((i=s.target)==null?void 0:i.result)},c.onerror=s=>u(s),c.readAsDataURL(t)});return{name:r,contentType:a,url:o}}));if(Array.isArray(e))return e;throw new Error("Invalid attachments type")}jt=Zr});export{na as __tla,jt as u};
