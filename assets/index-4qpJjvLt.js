import{C as Qt,E as X,L as Yt,__tla as At}from"./index-CNxYyn7-.js";import{s as Ct,t as g,r as Mt,L as Rt,E as Zt,a as ot,b as Et,e as Bt,f as zt,k as Wt,u as Dt,__tla as Gt}from"./CodeContainerApp-BoW64Nj9.js";import{cssLanguage as Ot,css as jt,__tla as It}from"./index-BJRSowQ2.js";import{typescriptLanguage as Ut,jsxLanguage as Nt,tsxLanguage as Lt,javascriptLanguage as z,javascript as Ft,__tla as Ht}from"./index-BPLhmEWw.js";import{__tla as Kt}from"./index-Do6NR0Ei.js";import{__tla as Jt}from"./routes-afMQRdB6.js";import{__tla as te}from"./copy-DrLcBSuN.js";import{__tla as ee}from"./createLucideIcon-6pS0vrIF.js";import{__tla as ae}from"./refresh-ccw-CIsqjCcz.js";import{__tla as le}from"./volume-2-Jbq4_S3c.js";import{__tla as re}from"./use-prevent-pitch-zoom-ynBTFhe5.js";import{__tla as ne}from"./index-CzGT-BA6.js";import"./objectWithoutPropertiesLoose-BjXSgPXB.js";import{__tla as se}from"./folder-open-B0hsXO89.js";import{__tla as oe}from"./folder-Cr17cRwP.js";import{__tla as Oe}from"./file-kzIEBsaV.js";let W,it,D,V,k,ie=Promise.all([(()=>{try{return At}catch{}})(),(()=>{try{return Gt}catch{}})(),(()=>{try{return It}catch{}})(),(()=>{try{return Ht}catch{}})(),(()=>{try{return Kt}catch{}})(),(()=>{try{return Jt}catch{}})(),(()=>{try{return te}catch{}})(),(()=>{try{return ee}catch{}})(),(()=>{try{return ae}catch{}})(),(()=>{try{return le}catch{}})(),(()=>{try{return re}catch{}})(),(()=>{try{return ne}catch{}})(),(()=>{try{return se}catch{}})(),(()=>{try{return oe}catch{}})(),(()=>{try{return Oe}catch{}})()]).then(async()=>{const ut={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},ct={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},G={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}};function pt(t){return t==45||t==46||t==58||t>=65&&t<=90||t==95||t>=97&&t<=122||t>=161}function j(t){return t==9||t==10||t==13||t==32}let I=null,U=null,N=0;function $(t,a){let r=t.pos+a;if(N==r&&U==t)return I;let l=t.peek(a);for(;j(l);)l=t.peek(++a);let e="";for(;pt(l);)e+=String.fromCharCode(l),l=t.peek(++a);return U=t,N=r,I=e?e.toLowerCase():l==dt||l==mt?void 0:null}const L=60,y=62,q=47,dt=63,mt=33,ft=45;function F(t,a){this.name=t,this.parent=a}const St=[6,10,7,8,9],ht=new Qt({start:null,shift(t,a,r,l){return St.indexOf(a)>-1?new F($(l,1)||"",t):t},reduce(t,a){return a==20&&t?t.parent:t},reuse(t,a,r,l){let e=a.type.id;return e==6||e==36?new F($(l,1)||"",t):t},strict:!1}),gt=new X((t,a)=>{if(t.next!=L){t.next<0&&a.context&&t.acceptToken(57);return}t.advance();let r=t.next==q;r&&t.advance();let l=$(t,0);if(l===void 0)return;if(!l)return t.acceptToken(r?14:6);let e=a.context?a.context.name:null;if(r){if(l==e)return t.acceptToken(11);if(e&&ct[e])return t.acceptToken(57,-2);if(a.dialectEnabled(0))return t.acceptToken(12);for(let s=a.context;s;s=s.parent)if(s.name==l)return;t.acceptToken(13)}else{if(l=="script")return t.acceptToken(7);if(l=="style")return t.acceptToken(8);if(l=="textarea")return t.acceptToken(9);if(ut.hasOwnProperty(l))return t.acceptToken(10);e&&G[e]&&G[e][l]?t.acceptToken(57,-1):t.acceptToken(6)}},{contextual:!0}),xt=new X(t=>{for(let a=0,r=0;;r++){if(t.next<0){r&&t.acceptToken(58);break}if(t.next==ft)a++;else if(t.next==y&&a>=2){r>=3&&t.acceptToken(58,-2);break}else a=0;t.advance()}});function bt(t){for(;t;t=t.parent)if(t.name=="svg"||t.name=="math")return!0;return!1}const Pt=new X((t,a)=>{if(t.next==q&&t.peek(1)==y){let r=a.dialectEnabled(1)||bt(a.context);t.acceptToken(r?5:4,2)}else t.next==y&&t.acceptToken(4,1)});function Q(t,a,r){let l=2+t.length;return new X(e=>{for(let s=0,o=0,O=0;;O++){if(e.next<0){O&&e.acceptToken(a);break}if(s==0&&e.next==L||s==1&&e.next==q||s>=2&&s<l&&e.next==t.charCodeAt(s-2))s++,o++;else if((s==2||s==l)&&j(e.next))o++;else if(s==l&&e.next==y){O>o?e.acceptToken(a,-o):e.acceptToken(r,-(o-2));break}else if((e.next==10||e.next==13)&&O){e.acceptToken(a,1);break}else s=o=0;e.advance()}})}const _t=Q("script",54,1),Vt=Q("style",55,2),wt=Q("textarea",56,3),yt=Ct({"Text RawText":g.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":g.angleBracket,TagName:g.tagName,"MismatchedCloseTag/TagName":[g.tagName,g.invalid],AttributeName:g.attributeName,"AttributeValue UnquotedAttributeValue":g.attributeValue,Is:g.definitionOperator,"EntityReference CharacterReference":g.character,Comment:g.blockComment,ProcessingInst:g.processingInstruction,DoctypeDecl:g.documentMeta}),Tt=Yt.deserialize({version:14,states:",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",stateData:",]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",goto:"%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:"\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",maxTerm:67,context:ht,nodeProps:[["closedBy",-10,1,2,3,7,8,9,10,11,12,13,"EndTag",6,"EndTag SelfClosingEndTag",-4,21,30,33,36,"CloseTag"],["openedBy",4,"StartTag StartCloseTag",5,"StartTag",-4,29,32,35,37,"OpenTag"],["group",-9,14,17,18,19,20,39,40,41,42,"Entity",16,"Entity TextContent",-3,28,31,34,"TextContent Entity"],["isolate",-11,21,29,30,32,33,35,36,37,38,41,42,"ltr",-3,26,27,39,""]],propSources:[yt],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[_t,Vt,wt,Pt,gt,xt,0,1,2,3,4,5],topRules:{Document:[0,15]},dialects:{noMatch:0,selfClosing:509},tokenPrec:511});function H(t,a){let r=Object.create(null);for(let l of t.getChildren(23)){let e=l.getChild(24),s=l.getChild(26)||l.getChild(27);e&&(r[a.read(e.from,e.to)]=s?s.type.id==26?a.read(s.from+1,s.to-1):a.read(s.from,s.to):"")}return r}function K(t,a){let r=t.getChild(22);return r?a.read(r.from,r.to):" "}function Y(t,a,r){let l;for(let e of r)if(!e.attrs||e.attrs(l||(l=H(t.node.parent.firstChild,a))))return{parser:e.parser};return null}function J(t=[],a=[]){let r=[],l=[],e=[],s=[];for(let O of t)(O.tag=="script"?r:O.tag=="style"?l:O.tag=="textarea"?e:s).push(O);let o=a.length?Object.create(null):null;for(let O of a)(o[O.name]||(o[O.name]=[])).push(O);return Mt((O,i)=>{let f=O.type.id;if(f==28)return Y(O,i,r);if(f==31)return Y(O,i,l);if(f==34)return Y(O,i,e);if(f==20&&s.length){let d=O.node,c=d.firstChild,m=c&&K(c,i),u;if(m){for(let p of s)if(p.tag==m&&(!p.attrs||p.attrs(u||(u=H(c,i))))){let h=d.lastChild,x=h.type.id==37?h.from:d.to;if(x>c.to)return{parser:p.parser,overlay:[{from:c.to,to:x}]}}}}if(o&&f==23){let d=O.node,c;if(c=d.firstChild){let m=o[i.read(c.from,c.to)];if(m)for(let u of m){if(u.tagName&&u.tagName!=K(d.parent,i))continue;let p=d.lastChild;if(p.type.id==26){let h=p.from+1,x=p.lastChild,_=p.to-(x&&x.isError?0:1);if(_>h)return{parser:u.parser,overlay:[{from:h,to:_}]}}else if(p.type.id==27)return{parser:u.parser,overlay:[{from:p.from,to:p.to}]}}}}return null})}const w=["_blank","_self","_top","_parent"],A=["ascii","utf-8","utf-16","latin1","latin1"],C=["get","post","put","delete"],M=["application/x-www-form-urlencoded","multipart/form-data","text/plain"],S=["true","false"],n={},vt={a:{attrs:{href:null,ping:null,type:null,media:null,target:w,hreflang:null}},abbr:n,address:n,area:{attrs:{alt:null,coords:null,href:null,target:null,ping:null,media:null,hreflang:null,type:null,shape:["default","rect","circle","poly"]}},article:n,aside:n,audio:{attrs:{src:null,mediagroup:null,crossorigin:["anonymous","use-credentials"],preload:["none","metadata","auto"],autoplay:["autoplay"],loop:["loop"],controls:["controls"]}},b:n,base:{attrs:{href:null,target:w}},bdi:n,bdo:n,blockquote:{attrs:{cite:null}},body:n,br:n,button:{attrs:{form:null,formaction:null,name:null,value:null,autofocus:["autofocus"],disabled:["autofocus"],formenctype:M,formmethod:C,formnovalidate:["novalidate"],formtarget:w,type:["submit","reset","button"]}},canvas:{attrs:{width:null,height:null}},caption:n,center:n,cite:n,code:n,col:{attrs:{span:null}},colgroup:{attrs:{span:null}},command:{attrs:{type:["command","checkbox","radio"],label:null,icon:null,radiogroup:null,command:null,title:null,disabled:["disabled"],checked:["checked"]}},data:{attrs:{value:null}},datagrid:{attrs:{disabled:["disabled"],multiple:["multiple"]}},datalist:{attrs:{data:null}},dd:n,del:{attrs:{cite:null,datetime:null}},details:{attrs:{open:["open"]}},dfn:n,div:n,dl:n,dt:n,em:n,embed:{attrs:{src:null,type:null,width:null,height:null}},eventsource:{attrs:{src:null}},fieldset:{attrs:{disabled:["disabled"],form:null,name:null}},figcaption:n,figure:n,footer:n,form:{attrs:{action:null,name:null,"accept-charset":A,autocomplete:["on","off"],enctype:M,method:C,novalidate:["novalidate"],target:w}},h1:n,h2:n,h3:n,h4:n,h5:n,h6:n,head:{children:["title","base","link","style","meta","script","noscript","command"]},header:n,hgroup:n,hr:n,html:{attrs:{manifest:null}},i:n,iframe:{attrs:{src:null,srcdoc:null,name:null,width:null,height:null,sandbox:["allow-top-navigation","allow-same-origin","allow-forms","allow-scripts"],seamless:["seamless"]}},img:{attrs:{alt:null,src:null,ismap:null,usemap:null,width:null,height:null,crossorigin:["anonymous","use-credentials"]}},input:{attrs:{alt:null,dirname:null,form:null,formaction:null,height:null,list:null,max:null,maxlength:null,min:null,name:null,pattern:null,placeholder:null,size:null,src:null,step:null,value:null,width:null,accept:["audio/*","video/*","image/*"],autocomplete:["on","off"],autofocus:["autofocus"],checked:["checked"],disabled:["disabled"],formenctype:M,formmethod:C,formnovalidate:["novalidate"],formtarget:w,multiple:["multiple"],readonly:["readonly"],required:["required"],type:["hidden","text","search","tel","url","email","password","datetime","date","month","week","time","datetime-local","number","range","color","checkbox","radio","file","submit","image","reset","button"]}},ins:{attrs:{cite:null,datetime:null}},kbd:n,keygen:{attrs:{challenge:null,form:null,name:null,autofocus:["autofocus"],disabled:["disabled"],keytype:["RSA"]}},label:{attrs:{for:null,form:null}},legend:n,li:{attrs:{value:null}},link:{attrs:{href:null,type:null,hreflang:null,media:null,sizes:["all","16x16","16x16 32x32","16x16 32x32 64x64"]}},map:{attrs:{name:null}},mark:n,menu:{attrs:{label:null,type:["list","context","toolbar"]}},meta:{attrs:{content:null,charset:A,name:["viewport","application-name","author","description","generator","keywords"],"http-equiv":["content-language","content-type","default-style","refresh"]}},meter:{attrs:{value:null,min:null,low:null,high:null,max:null,optimum:null}},nav:n,noscript:n,object:{attrs:{data:null,type:null,name:null,usemap:null,form:null,width:null,height:null,typemustmatch:["typemustmatch"]}},ol:{attrs:{reversed:["reversed"],start:null,type:["1","a","A","i","I"]},children:["li","script","template","ul","ol"]},optgroup:{attrs:{disabled:["disabled"],label:null}},option:{attrs:{disabled:["disabled"],label:null,selected:["selected"],value:null}},output:{attrs:{for:null,form:null,name:null}},p:n,param:{attrs:{name:null,value:null}},pre:n,progress:{attrs:{value:null,max:null}},q:{attrs:{cite:null}},rp:n,rt:n,ruby:n,samp:n,script:{attrs:{type:["text/javascript"],src:null,async:["async"],defer:["defer"],charset:A}},section:n,select:{attrs:{form:null,name:null,size:null,autofocus:["autofocus"],disabled:["disabled"],multiple:["multiple"]}},slot:{attrs:{name:null}},small:n,source:{attrs:{src:null,type:null,media:null}},span:n,strong:n,style:{attrs:{type:["text/css"],media:null,scoped:null}},sub:n,summary:n,sup:n,table:n,tbody:n,td:{attrs:{colspan:null,rowspan:null,headers:null}},template:n,textarea:{attrs:{dirname:null,form:null,maxlength:null,name:null,placeholder:null,rows:null,cols:null,autofocus:["autofocus"],disabled:["disabled"],readonly:["readonly"],required:["required"],wrap:["soft","hard"]}},tfoot:n,th:{attrs:{colspan:null,rowspan:null,headers:null,scope:["row","col","rowgroup","colgroup"]}},thead:n,time:{attrs:{datetime:null}},title:n,tr:n,track:{attrs:{src:null,label:null,default:null,kind:["subtitles","captions","descriptions","chapters","metadata"],srclang:null}},ul:{children:["li","script","template","ul","ol"]},var:n,video:{attrs:{src:null,poster:null,width:null,height:null,crossorigin:["anonymous","use-credentials"],preload:["auto","metadata","none"],autoplay:["autoplay"],mediagroup:["movie"],muted:["muted"],controls:["controls"]}},wbr:n},tt={accesskey:null,class:null,contenteditable:S,contextmenu:null,dir:["ltr","rtl","auto"],draggable:["true","false","auto"],dropzone:["copy","move","link","string:","file:"],hidden:["hidden"],id:null,inert:["inert"],itemid:null,itemprop:null,itemref:null,itemscope:["itemscope"],itemtype:null,lang:["ar","bn","de","en-GB","en-US","es","fr","hi","id","ja","pa","pt","ru","tr","zh"],spellcheck:S,autocorrect:S,autocapitalize:S,style:null,tabindex:null,title:null,translate:["yes","no"],rel:["stylesheet","alternate","author","bookmark","help","license","next","nofollow","noreferrer","prefetch","prev","search","tag"],role:"alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),"aria-activedescendant":null,"aria-atomic":S,"aria-autocomplete":["inline","list","both","none"],"aria-busy":S,"aria-checked":["true","false","mixed","undefined"],"aria-controls":null,"aria-describedby":null,"aria-disabled":S,"aria-dropeffect":null,"aria-expanded":["true","false","undefined"],"aria-flowto":null,"aria-grabbed":["true","false","undefined"],"aria-haspopup":S,"aria-hidden":S,"aria-invalid":["true","false","grammar","spelling"],"aria-label":null,"aria-labelledby":null,"aria-level":null,"aria-live":["off","polite","assertive"],"aria-multiline":S,"aria-multiselectable":S,"aria-owns":null,"aria-posinset":null,"aria-pressed":["true","false","mixed","undefined"],"aria-readonly":S,"aria-relevant":null,"aria-required":S,"aria-selected":["true","false","undefined"],"aria-setsize":null,"aria-sort":["ascending","descending","none","other"],"aria-valuemax":null,"aria-valuemin":null,"aria-valuenow":null,"aria-valuetext":null},et="beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map(t=>"on"+t);for(let t of et)tt[t]=null;class T{constructor(a,r){this.tags=Object.assign(Object.assign({},vt),a),this.globalAttrs=Object.assign(Object.assign({},tt),r),this.allTags=Object.keys(this.tags),this.globalAttrNames=Object.keys(this.globalAttrs)}}T.default=new T;function b(t,a,r=t.length){if(!a)return"";let l=a.firstChild,e=l&&l.getChild("TagName");return e?t.sliceString(e.from,Math.min(e.to,r)):""}function P(t,a=!1){for(;t;t=t.parent)if(t.name=="Element")if(a)a=!1;else return t;return null}function at(t,a,r){let l=r.tags[b(t,P(a))];return(l==null?void 0:l.children)||r.allTags}function R(t,a){let r=[];for(let l=P(a);l&&!l.type.isTop;l=P(l.parent)){let e=b(t,l);if(e&&l.lastChild.name=="CloseTag")break;e&&r.indexOf(e)<0&&(a.name=="EndTag"||a.from>=l.firstChild.to)&&r.push(e)}return r}const lt=/^[:\-\.\w\u00b7-\uffff]*$/;function rt(t,a,r,l,e){let s=/\s*>/.test(t.sliceDoc(e,e+5))?"":">",o=P(r,!0);return{from:l,to:e,options:at(t.doc,o,a).map(O=>({label:O,type:"type"})).concat(R(t.doc,r).map((O,i)=>({label:"/"+O,apply:"/"+O+s,type:"type",boost:99-i}))),validFor:/^\/?[:\-\.\w\u00b7-\uffff]*$/}}function nt(t,a,r,l){let e=/\s*>/.test(t.sliceDoc(l,l+5))?"":">";return{from:r,to:l,options:R(t.doc,a).map((s,o)=>({label:s,apply:s+e,type:"type",boost:99-o})),validFor:lt}}function Xt(t,a,r,l){let e=[],s=0;for(let o of at(t.doc,r,a))e.push({label:"<"+o,type:"type"});for(let o of R(t.doc,r))e.push({label:"</"+o+">",type:"type",boost:99-s++});return{from:l,to:l,options:e,validFor:/^<\/?[:\-\.\w\u00b7-\uffff]*$/}}function kt(t,a,r,l,e){let s=P(r),o=s?a.tags[b(t.doc,s)]:null,O=o&&o.attrs?Object.keys(o.attrs):[],i=o&&o.globalAttrs===!1?O:O.length?O.concat(a.globalAttrNames):a.globalAttrNames;return{from:l,to:e,options:i.map(f=>({label:f,type:"property"})),validFor:lt}}function $t(t,a,r,l,e){var s;let o=(s=r.parent)===null||s===void 0?void 0:s.getChild("AttributeName"),O=[],i;if(o){let f=t.sliceDoc(o.from,o.to),d=a.globalAttrs[f];if(!d){let c=P(r),m=c?a.tags[b(t.doc,c)]:null;d=(m==null?void 0:m.attrs)&&m.attrs[f]}if(d){let c=t.sliceDoc(l,e).toLowerCase(),m='"',u='"';/^['"]/.test(c)?(i=c[0]=='"'?/^[^"]*$/:/^[^']*$/,m="",u=t.sliceDoc(e,e+1)==c[0]?"":c[0],c=c.slice(1),l++):i=/^[^\s<>='"]*$/;for(let p of d)O.push({label:p,apply:m+p+u,type:"constant"})}}return{from:l,to:e,options:O,validFor:i}}function qt(t,a){let{state:r,pos:l}=a,e=ot(r).resolveInner(l,-1),s=e.resolve(l);for(let o=l,O;s==e&&(O=e.childBefore(o));){let i=O.lastChild;if(!i||!i.type.isError||i.from<i.to)break;s=e=O,o=i.from}return e.name=="TagName"?e.parent&&/CloseTag$/.test(e.parent.name)?nt(r,e,e.from,l):rt(r,t,e,e.from,l):e.name=="StartTag"?rt(r,t,e,l,l):e.name=="StartCloseTag"||e.name=="IncompleteCloseTag"?nt(r,e,l,l):e.name=="OpenTag"||e.name=="SelfClosingTag"||e.name=="AttributeName"?kt(r,t,e,e.name=="AttributeName"?e.from:l,l):e.name=="Is"||e.name=="AttributeValue"||e.name=="UnquotedAttributeValue"?$t(r,t,e,e.name=="Is"?l:e.from,l):a.explicit&&(s.name=="Element"||s.name=="Text"||s.name=="Document")?Xt(r,t,e,l):null}D=function(t){let{extraTags:a,extraGlobalAttributes:r}=t,l=r||a?new T(a,r):T.default;return e=>qt(l,e)};let st,Z,E;st=z.parser.configure({top:"SingleExpression"}),Z=[{tag:"script",attrs:t=>t.type=="text/typescript"||t.lang=="ts",parser:Ut.parser},{tag:"script",attrs:t=>t.type=="text/babel"||t.type=="text/jsx",parser:Nt.parser},{tag:"script",attrs:t=>t.type=="text/typescript-jsx",parser:Lt.parser},{tag:"script",attrs(t){return/^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(t.type)},parser:st},{tag:"script",attrs(t){return!t.type||/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(t.type)},parser:z.parser},{tag:"style",attrs(t){return(!t.lang||t.lang=="css")&&(!t.type||/^(text\/)?(x-)?(stylesheet|css)$/i.test(t.type))},parser:Ot.parser}],E=[{name:"style",parser:Ot.parser.configure({top:"Styles"})}].concat(et.map(t=>({name:t,parser:z.parser}))),k=Bt.define({name:"html",parser:Tt.configure({props:[zt.add({Element(t){let a=/^(\s*)(<\/)?/.exec(t.textAfter);return t.node.to<=t.pos+a[0].length?t.continue():t.lineIndent(t.node.from)+(a[2]?0:t.unit)},"OpenTag CloseTag SelfClosingTag"(t){return t.column(t.node.from)+t.unit},Document(t){if(t.pos+/\s*/.exec(t.textAfter)[0].length<t.node.to)return t.continue();let a=null,r;for(let l=t.node;;){let e=l.lastChild;if(!e||e.name!="Element"||e.to!=l.to)break;a=l=e}return a&&!((r=a.lastChild)&&(r.name=="CloseTag"||r.name=="SelfClosingTag"))?t.lineIndent(a.from)+t.unit:null}}),Wt.add({Element(t){let a=t.firstChild,r=t.lastChild;return!a||a.name!="OpenTag"?null:{from:a.to,to:r.name=="CloseTag"?r.from:t.to}}}),Dt.add({"OpenTag CloseTag":t=>t.getChild("TagName")})]}),languageData:{commentTokens:{block:{open:"<!--",close:"-->"}},indentOnInput:/^\s*<\/\w+\W$/,wordChars:"-._"}}),V=k.configure({wrap:J(Z,E)}),it=function(t={}){let a="",r;t.matchClosingTags===!1&&(a="noMatch"),t.selfClosingTags===!0&&(a=(a?a+" ":"")+"selfClosing"),(t.nestedLanguages&&t.nestedLanguages.length||t.nestedAttributes&&t.nestedAttributes.length)&&(r=J((t.nestedLanguages||[]).concat(Z),(t.nestedAttributes||[]).concat(E)));let l=r?k.configure({wrap:r,dialect:a}):a?V.configure({dialect:a}):V;return new Rt(l,[V.data.of({autocomplete:D(t)}),t.autoCloseTags!==!1?W:[],Ft().support,jt().support])};let B;B=new Set("area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" ")),W=Zt.inputHandler.of((t,a,r,l,e)=>{if(t.composing||t.state.readOnly||a!=r||l!=">"&&l!="/"||!V.isActiveAt(t.state,a,-1))return!1;let s=e(),{state:o}=s,O=o.changeByRange(i=>{var f,d,c;let m=o.doc.sliceString(i.from-1,i.to)==l,{head:u}=i,p=ot(o).resolveInner(u,-1),h;if(m&&l==">"&&p.name=="EndTag"){let x=p.parent;if(((d=(f=x.parent)===null||f===void 0?void 0:f.lastChild)===null||d===void 0?void 0:d.name)!="CloseTag"&&(h=b(o.doc,x.parent,u))&&!B.has(h)){let _=u+(o.doc.sliceString(u,u+1)===">"?1:0),v=`</${h}>`;return{range:i,changes:{from:u,to:_,insert:v}}}}else if(m&&l=="/"&&p.name=="IncompleteCloseTag"){let x=p.parent;if(p.from==u-2&&((c=x.lastChild)===null||c===void 0?void 0:c.name)!="CloseTag"&&(h=b(o.doc,x,u))&&!B.has(h)){let _=u+(o.doc.sliceString(u,u+1)===">"?1:0),v=`${h}>`;return{range:Et.cursor(u+v.length,-1),changes:{from:u,to:_,insert:v}}}}return{range:i}});return O.changes.empty?!1:(t.dispatch([s,o.update(O,{userEvent:"input.complete",scrollIntoView:!0})]),!0)})});export{ie as __tla,W as autoCloseTags,it as html,D as htmlCompletionSourceWith,V as htmlLanguage,k as htmlPlain};
