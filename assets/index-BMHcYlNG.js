import{L as o,__tla as s}from"./index-v667yjQx.js";import{s as P,t as O,L as c,e as Q,f as l,g as e,k as n,l as i,__tla as p}from"./CodeContainerApp-CIhAZ72W.js";import{__tla as m}from"./index-D_9kVGFY.js";import{__tla as u}from"./routes-KWtUkNI-.js";import{__tla as h}from"./copy-DKaidUj_.js";import{__tla as y}from"./createLucideIcon-BBIEaggm.js";import{__tla as R}from"./refresh-ccw-DkhWmUKv.js";import{__tla as f}from"./volume-2-DANY14-y.js";import{__tla as g}from"./use-prevent-pitch-zoom-CSm0W8iR.js";import{__tla as T}from"./index-C6PDtfHy.js";import"./objectWithoutPropertiesLoose-BjXSgPXB.js";import{__tla as b}from"./folder-open-BT5AfRZV.js";import{__tla as d}from"./folder-D3qotw2I.js";import{__tla as $}from"./file-CPIWJrQu.js";let _,t,V=Promise.all([(()=>{try{return s}catch{}})(),(()=>{try{return p}catch{}})(),(()=>{try{return m}catch{}})(),(()=>{try{return u}catch{}})(),(()=>{try{return h}catch{}})(),(()=>{try{return y}catch{}})(),(()=>{try{return R}catch{}})(),(()=>{try{return f}catch{}})(),(()=>{try{return g}catch{}})(),(()=>{try{return T}catch{}})(),(()=>{try{return b}catch{}})(),(()=>{try{return d}catch{}})(),(()=>{try{return $}catch{}})()]).then(async()=>{let r,a;r=P({String:O.string,Number:O.number,"True False":O.bool,PropertyName:O.propertyName,Null:O.null,",":O.separator,"[ ]":O.squareBracket,"{ }":O.brace}),a=o.deserialize({version:14,states:"$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",stateData:"#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",goto:"!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",nodeNames:"\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",maxTerm:25,nodeProps:[["isolate",-2,6,11,""],["openedBy",7,"{",12,"["],["closedBy",8,"}",13,"]"]],propSources:[r],skippedNodes:[0],repeatNodeCount:2,tokenData:"(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oc~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Oe~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zOh~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yOg~~'OO]~~'TO[~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",tokenizers:[0],topRules:{JsonText:[0,1]},tokenPrec:0}),t=Q.define({name:"json",parser:a.configure({props:[l.add({Object:e({except:/^\s*\}/}),Array:e({except:/^\s*\]/})}),n.add({"Object Array":i})]}),languageData:{closeBrackets:{brackets:["[","{",'"']},indentOnInput:/^\s*[\}\]]$/}}),_=function(){return new c(t)}});export{V as __tla,_ as json,t as jsonLanguage};