import{L as s,__tla as o}from"./index-BvAtw5Lk.js";import{s as Q,t as O,L as c,e as _,f as n,g as e,k as l,l as i,__tla as p}from"./CodeEditor-JtcZq3XJ.js";import{__tla as m}from"./index-efRx8hXw.js";import"./objectWithoutPropertiesLoose-BjXSgPXB.js";import{__tla as u}from"./home-Bm0RSP1Y.js";import{__tla as R}from"./routes-BaOXv3Yu.js";import{__tla as h}from"./folder-open-O4zOXOhk.js";import{__tla as y}from"./createLucideIcon-DRmIFhaL.js";import{__tla as g}from"./folder-8sZr_ZXO.js";import{__tla as T}from"./file-B4eUEVEO.js";let P,r,f=Promise.all([(()=>{try{return o}catch{}})(),(()=>{try{return p}catch{}})(),(()=>{try{return m}catch{}})(),(()=>{try{return u}catch{}})(),(()=>{try{return R}catch{}})(),(()=>{try{return h}catch{}})(),(()=>{try{return y}catch{}})(),(()=>{try{return g}catch{}})(),(()=>{try{return T}catch{}})()]).then(async()=>{let t,a;t=Q({String:O.string,Number:O.number,"True False":O.bool,PropertyName:O.propertyName,Null:O.null,",":O.separator,"[ ]":O.squareBracket,"{ }":O.brace}),a=s.deserialize({version:14,states:"$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",stateData:"#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",goto:"!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",nodeNames:"\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",maxTerm:25,nodeProps:[["isolate",-2,6,11,""],["openedBy",7,"{",12,"["],["closedBy",8,"}",13,"]"]],propSources:[t],skippedNodes:[0],repeatNodeCount:2,tokenData:"(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oc~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Oe~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zOh~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yOg~~'OO]~~'TO[~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",tokenizers:[0],topRules:{JsonText:[0,1]},tokenPrec:0}),r=_.define({name:"json",parser:a.configure({props:[n.add({Object:e({except:/^\s*\}/}),Array:e({except:/^\s*\]/})}),l.add({"Object Array":i})]}),languageData:{closeBrackets:{brackets:["[","{",'"']},indentOnInput:/^\s*[\}\]]$/}}),P=function(){return new c(r)}});export{f as __tla,P as json,r as jsonLanguage};
