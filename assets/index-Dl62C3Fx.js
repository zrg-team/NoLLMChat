import{E as S,L as J,a as A,__tla as H}from"./index-CqJiq7hs.js";import{s as M,t as o,L as ee,e as Oe,f as ae,g as te,k as oe,l as re,a as le,I as ie,N as ne,__tla as se}from"./CodeContainerApp-CHhIz3CV.js";import{__tla as de}from"./index-BIHT-eIT.js";import{__tla as ce}from"./HomePage-BZPH_dNJ.js";import{__tla as pe}from"./mustache-DdglZc0Z.js";import{__tla as Qe}from"./routes-BRfdgdq0.js";import{__tla as me}from"./use-prevent-pitch-zoom-B5YCzPFk.js";import{__tla as ue}from"./index-RF71vUFF.js";import"./objectWithoutPropertiesLoose-BjXSgPXB.js";import{__tla as Se}from"./folder-open-0TLCdc6E.js";import{__tla as ge}from"./createLucideIcon-gGEb5FtZ.js";import{__tla as he}from"./folder-C0RmV9XC.js";import{__tla as ye}from"./file-CXCmit68.js";let k,g,Q,h,fe=Promise.all([(()=>{try{return H}catch{}})(),(()=>{try{return se}catch{}})(),(()=>{try{return de}catch{}})(),(()=>{try{return ce}catch{}})(),(()=>{try{return pe}catch{}})(),(()=>{try{return Qe}catch{}})(),(()=>{try{return me}catch{}})(),(()=>{try{return ue}catch{}})(),(()=>{try{return Se}catch{}})(),(()=>{try{return ge}catch{}})(),(()=>{try{return he}catch{}})(),(()=>{try{return ye}catch{}})()]).then(async()=>{const y=[9,10,11,12,13,32,133,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288],_=58,v=40,f=95,z=91,c=45,x=46,T=35,W=37,R=38,U=92,Y=10;function d(e){return e>=65&&e<=90||e>=97&&e<=122||e>=161}function $(e){return e>=48&&e<=57}const q=new S((e,t)=>{for(let l=!1,a=0,O=0;;O++){let{next:r}=e;if(d(r)||r==c||r==f||l&&$(r))!l&&(r!=c||O>0)&&(l=!0),a===O&&r==c&&a++,e.advance();else if(r==U&&e.peek(1)!=Y)e.advance(),e.next>-1&&e.advance(),l=!0;else{l&&e.acceptToken(r==v?100:a==2&&t.canShift(2)?2:101);break}}}),Z=new S(e=>{if(y.includes(e.peek(-1))){let{next:t}=e;(d(t)||t==f||t==T||t==x||t==z||t==_&&d(e.peek(1))||t==c||t==R)&&e.acceptToken(99)}}),E=new S(e=>{if(!y.includes(e.peek(-1))){let{next:t}=e;if(t==W&&(e.advance(),e.acceptToken(1)),d(t)){do e.advance();while(d(e.next)||$(e.next));e.acceptToken(1)}}}),G=M({"AtKeyword import charset namespace keyframes media supports":o.definitionKeyword,"from to selector":o.keyword,NamespaceName:o.namespace,KeyframeName:o.labelName,KeyframeRangeName:o.operatorKeyword,TagName:o.tagName,ClassName:o.className,PseudoClassName:o.constant(o.className),IdName:o.labelName,"FeatureName PropertyName":o.propertyName,AttributeName:o.attributeName,NumberLiteral:o.number,KeywordQuery:o.keyword,UnaryQueryOp:o.operatorKeyword,"CallTag ValueName":o.atom,VariableName:o.variableName,Callee:o.operatorKeyword,Unit:o.unit,"UniversalSelector NestingSelector":o.definitionOperator,MatchOp:o.compareOperator,"ChildOp SiblingOp, LogicOp":o.logicOperator,BinOp:o.arithmeticOperator,Important:o.modifier,Comment:o.blockComment,ColorLiteral:o.color,"ParenthesizedContent StringLiteral":o.string,":":o.punctuation,"PseudoOp #":o.derefOperator,"; ,":o.separator,"( )":o.paren,"[ ]":o.squareBracket,"{ }":o.brace}),C={__proto__:null,lang:32,"nth-child":32,"nth-last-child":32,"nth-of-type":32,"nth-last-of-type":32,dir:32,"host-context":32,url:60,"url-prefix":60,domain:60,regexp:60,selector:138},V={__proto__:null,"@import":118,"@media":142,"@charset":146,"@namespace":150,"@keyframes":156,"@supports":168},N={__proto__:null,not:132,only:132},j=J.deserialize({version:14,states:":jQYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DTO$vQ[O'#DWOOQP'#Em'#EmO${QdO'#DgO%jQ[O'#DtO${QdO'#DvO%{Q[O'#DxO&WQ[O'#D{O&`Q[O'#ERO&nQ[O'#ETOOQS'#El'#ElOOQS'#EW'#EWQYQ[OOO&uQXO'#CdO'jQWO'#DcO'oQWO'#EsO'zQ[O'#EsQOQWOOP(UO#tO'#C_POOO)C@[)C@[OOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(aQ[O'#E[O({QWO,58{O)TQ[O,59SO$qQ[O,59oO$vQ[O,59rO(aQ[O,59uO(aQ[O,59wO(aQ[O,59xO)`Q[O'#DbOOQS,58{,58{OOQP'#Ck'#CkOOQO'#DR'#DROOQP,59S,59SO)gQWO,59SO)lQWO,59SOOQP'#DV'#DVOOQP,59o,59oOOQO'#DX'#DXO)qQ`O,59rOOQS'#Cp'#CpO${QdO'#CqO)yQvO'#CsO+ZQtO,5:ROOQO'#Cx'#CxO)lQWO'#CwO+oQWO'#CyO+tQ[O'#DOOOQS'#Ep'#EpOOQO'#Dj'#DjO+|Q[O'#DqO,[QWO'#EtO&`Q[O'#DoO,jQWO'#DrOOQO'#Eu'#EuO)OQWO,5:`O,oQpO,5:bOOQS'#Dz'#DzO,wQWO,5:dO,|Q[O,5:dOOQO'#D}'#D}O-UQWO,5:gO-ZQWO,5:mO-cQWO,5:oOOQS-E8U-E8UO-kQdO,59}O-{Q[O'#E^O.YQWO,5;_O.YQWO,5;_POOO'#EV'#EVP.eO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO/[QXO,5:vOOQO-E8Y-E8YOOQS1G.g1G.gOOQP1G.n1G.nO)gQWO1G.nO)lQWO1G.nOOQP1G/Z1G/ZO/iQ`O1G/^O0SQXO1G/aO0jQXO1G/cO1QQXO1G/dO1hQWO,59|O1mQ[O'#DSO1tQdO'#CoOOQP1G/^1G/^O${QdO1G/^O1{QpO,59]OOQS,59_,59_O${QdO,59aO2TQWO1G/mOOQS,59c,59cO2YQ!bO,59eOOQS'#DP'#DPOOQS'#EY'#EYO2eQ[O,59jOOQS,59j,59jO2mQWO'#DjO2xQWO,5:VO2}QWO,5:]O&`Q[O,5:XO&`Q[O'#E_O3VQWO,5;`O3bQWO,5:ZO(aQ[O,5:^OOQS1G/z1G/zOOQS1G/|1G/|OOQS1G0O1G0OO3sQWO1G0OO3xQdO'#EOOOQS1G0R1G0ROOQS1G0X1G0XOOQS1G0Z1G0ZO4TQtO1G/iOOQO1G/i1G/iOOQO,5:x,5:xO4kQ[O,5:xOOQO-E8[-E8[O4xQWO1G0yPOOO-E8T-E8TPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$x7+$xO${QdO7+$xOOQS1G/h1G/hO5TQXO'#ErO5[QWO,59nO5aQtO'#EXO6XQdO'#EoO6cQWO,59ZO6hQpO7+$xOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%X7+%XOOQS1G/P1G/PO6pQWO1G/POOQS-E8W-E8WOOQS1G/U1G/UO${QdO1G/qOOQO1G/w1G/wOOQO1G/s1G/sO6uQWO,5:yOOQO-E8]-E8]O7TQXO1G/xOOQS7+%j7+%jO7[QYO'#CsOOQO'#EQ'#EQO7gQ`O'#EPOOQO'#EP'#EPO7rQWO'#E`O7zQdO,5:jOOQS,5:j,5:jO8VQtO'#E]O${QdO'#E]O9WQdO7+%TOOQO7+%T7+%TOOQO1G0d1G0dO9kQpO<<HdO9sQWO,5;^OOQP1G/Y1G/YOOQS-E8V-E8VO${QdO'#EZO9{QWO,5;ZOOQT1G.u1G.uOOQP<<Hd<<HdOOQS7+$k7+$kO:TQdO7+%]OOQO7+%d7+%dOOQO,5:k,5:kO3{QdO'#EaO7rQWO,5:zOOQS,5:z,5:zOOQS-E8^-E8^OOQS1G0U1G0UO:[QtO,5:wOOQS-E8Z-E8ZOOQO<<Ho<<HoOOQPAN>OAN>OO;]QdO,5:uOOQO-E8X-E8XOOQO<<Hw<<HwOOQO,5:{,5:{OOQO-E8_-E8_OOQS1G0f1G0f",stateData:";o~O#ZOS#[QQ~OUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XRO#bTO~OQfOUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XeO#bTO~O#U#gP~P!ZO#[jO~O#XlO~O]qO^qOqsOtoOxrO!OtO!RvO#VuO#bnO~O!TwO~P#pO`}O#WzO#XyO~O#X!OO~O#X!QO~OQ![Ob!TOf![Oh![On!YOq!ZO#W!WO#X!SO#e!UO~Ob!^O!d!`O!g!aO#X!]O!T#hP~Oh!fOn!YO#X!eO~Oh!hO#X!hO~Ob!^O!d!`O!g!aO#X!]O~O!Y#hP~P%jO]WX]!WX^WXqWXtWXxWX!OWX!RWX!TWX#VWX#bWX~O]!mO~O!Y!nO#U#gX!S#gX~O#U#gX!S#gX~P!ZO#]!qO#^!qO#_!sO~OUYOXYO]VO^VOqXOxWO#XRO#bTO~OtoO!TwO~O`!zO#WzO#XyO~O!S#gP~P!ZOb#RO~Ob#SO~Op#TO|#UO~OP#WObgXjgX!YgX!dgX!ggX#XgXagXQgXfgXhgXngXqgXtgX!XgX#UgX#WgX#egXpgX!SgX~Ob!^Oj#XO!d!`O!g!aO#X!]O!Y#hP~Ob#[O~Op#`O#X#]O~Ob!^O!d!`O!g!aO#X#aO~Ot#eO!b#dO!T#hX!Y#hX~Ob#hO~Oj#XO!Y#jO~O!Y#kO~Oh#lOn!YO~O!T#mO~O!TwO!b#dO~O!TwO!Y#pO~O!X#rO!Y!Va#U!Va!S!Va~P${O!Y#QX#U#QX!S#QX~P!ZO!Y!nO#U#ga!S#ga~O#]!qO#^!qO#_#xO~O]qO^qOqsOxrO!OtO!RvO#VuO#bnO~Ot#Oa!T#Oaa#Oa~P.pOp#zO|#{O~O]qO^qOqsOxrO#bnO~Ot}i!O}i!R}i!T}i#V}ia}i~P/qOt!Pi!O!Pi!R!Pi!T!Pi#V!Pia!Pi~P/qOt!Qi!O!Qi!R!Qi!T!Qi#V!Qia!Qi~P/qO!S#|O~Oa#fP~P(aOa#cP~P${Oa$TOj#XO~O!Y$VO~Oa$WOh$XOo$XO~Op$ZO#X#]O~O]!`Xa!^X!b!^X~O]$[O~Oa$]O!b#dO~Ot#eO!T#ha!Y#ha~O!b#dOt!ca!T!ca!Y!caa!ca~O!Y$bO~O!S$iO#X$dO#e$cO~Oj#XOt$kO!X$mO!Y!Vi#U!Vi!S!Vi~P${O!Y#Qa#U#Qa!S#Qa~P!ZO!Y!nO#U#gi!S#gi~Oa#fX~P#pOa$qO~Oj#XOQ!{Xa!{Xb!{Xf!{Xh!{Xn!{Xq!{Xt!{X#W!{X#X!{X#e!{X~Ot$sOa#cX~P${Oa$uO~Oj#XOp$vO~Oa$wO~O!b#dOt#Ra!T#Ra!Y#Ra~Oa$yO~P.pOP#WOtgX!TgX~O#e$cOt!sX!T!sX~Ot${O!TwO~O!S%PO#X$dO#e$cO~Oj#XOQ#PXb#PXf#PXh#PXn#PXq#PXt#PX!X#PX!Y#PX#U#PX#W#PX#X#PX#e#PX!S#PX~Ot$kO!X%SO!Y!Vq#U!Vq!S!Vq~P${Oj#XOp%TO~OtoOa#fa~Ot$sOa#ca~Oa%WO~P${Oj#XOQ#Pab#Paf#Pah#Pan#Paq#Pat#Pa!X#Pa!Y#Pa#U#Pa#W#Pa#X#Pa#e#Pa!S#Pa~Oa!}at!}a~P${O#Zo#[#ej!R#e~",goto:"-g#jPPP#kP#nP#w$WP#w$g#wPP$mPPP$s$|$|P%`P$|P$|%z&^PPPP$|&vP&z'Q#wP'W#w'^P#wP#w#wPPP'd'y(WPP#nPP(_(_(i(_P(_P(_(_P#nP#nP#nP(l#nP(o(r(u(|#nP#nP)R)X)h)v)|*S*^*d*n*t*zPPPPPPPPPP+Q+ZP+v+yP,o,r,x-RRkQ_bOPdhw!n#tkYOPdhotuvw!n#R#h#tkSOPdhotuvw!n#R#h#tQmTR!tnQ{VR!xqQ!x}Q#Z!XR#y!zq![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UU$f#m$h${R$z$eq!XZ]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UQ!f^R#l!gT#^!Z#_Q|VR!yqQ!x|R#y!yQ!PWR!{rQ!RXR!|sQxUQ!wpQ#i!cQ#o!jQ#p!kQ$}$gR%Z$|SgPwQ!phQ#s!nR$n#tZfPhw!n#ta!b[`a!V!^!`#d#eR#b!^R!g^R!i_R#n!iS$g#m$hR%X${V$e#m$h${Q!rjR#w!rQdOShPwU!ldh#tR#t!nQ$Q#SU$r$Q$x%UQ$x$[R%U$sQ#_!ZR$Y#_Q$t$QR%V$tQpUS!vp$pR$p#}Q$l#qR%R$lQ!ogS#u!o#vR#v!pQ#f!_R$`#fQ$h#mR%O$hQ$|$gR%Y$|_cOPdhw!n#t^UOPdhw!n#tQ!uoQ!}tQ#OuQ#PvQ#}#RR$a#hR$R#SQ!VZQ!d]Q#V!TQ#q!m[$P#S$Q$[$s$x%UQ$S#UQ$U#XS$j#q$lQ$o#{R%Q$kR$O#RQiPR#QwQ!c[Q!kaR#Y!VU!_[a!VQ!j`Q#c!^Q#g!`Q$^#dR$_#e",nodeNames:"\u26A0 Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent ] [ LineNames LineName , PseudoClassName ArgList IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",maxTerm:117,nodeProps:[["isolate",-2,3,24,""],["openedBy",17,"(",32,"[",50,"{"],["closedBy",18,")",33,"]",51,"}"]],propSources:[G],skippedNodes:[0,3,87],repeatNodeCount:11,tokenData:"J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#Z~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#Z~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!X[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYxQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QS|So`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!RQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#e[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#e[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSt^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#bQOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#[~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!Y^Oy%^z;'S%^;'S;=`%o<%lO%^dCoS|SOy%^z;'S%^;'S;=`%o<%lO%^bDQU!OQOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS!OQo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[![Qo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^nFfSq^Oy%^z;'S%^;'S;=`%o<%lO%^nFwSp^Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!bQo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!TUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!S^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!RQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",tokenizers:[Z,E,q,1,2,3,4,new A("m~RRYZ[z{a~~g~aO#^~~dP!P!Qg~lO#_~~",28,105)],topRules:{StyleSheet:[0,4],Styles:[1,86]},specialized:[{term:100,get:e=>C[e]||-1},{term:58,get:e=>V[e]||-1},{term:101,get:e=>N[e]||-1}],tokenPrec:1219});let m=null;function u(){if(!m&&typeof document=="object"&&document.body){let{style:e}=document.body,t=[],l=new Set;for(let a in e)a!="cssText"&&a!="cssFloat"&&typeof e[a]=="string"&&(/[A-Z]/.test(a)&&(a=a.replace(/[A-Z]/g,O=>"-"+O.toLowerCase())),l.has(a)||(t.push(a),l.add(a)));m=t.sort().map(a=>({type:"property",label:a,apply:a+": "}))}return m||[]}const b=["active","after","any-link","autofill","backdrop","before","checked","cue","default","defined","disabled","empty","enabled","file-selector-button","first","first-child","first-letter","first-line","first-of-type","focus","focus-visible","focus-within","fullscreen","has","host","host-context","hover","in-range","indeterminate","invalid","is","lang","last-child","last-of-type","left","link","marker","modal","not","nth-child","nth-last-child","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","part","placeholder","placeholder-shown","read-only","read-write","required","right","root","scope","selection","slotted","target","target-text","valid","visited","where"].map(e=>({type:"class",label:e})),P=["above","absolute","activeborder","additive","activecaption","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","antialiased","appworkspace","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","axis-pan","background","backwards","baseline","below","bidi-override","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic-abegede-gez","ethiopic-halehame-aa-er","ethiopic-halehame-gez","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fill-box","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","graytext","grid","groove","hand","hard-light","help","hidden","hide","higher","highlight","highlighttext","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","justify","keep-all","landscape","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-hexadecimal","lower-latin","lower-norwegian","lowercase","ltr","luminosity","manipulation","match","matrix","matrix3d","medium","menu","menutext","message-box","middle","min-intrinsic","mix","monospace","move","multiple","multiple_mask_images","multiply","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","opacity","open-quote","optimizeLegibility","optimizeSpeed","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","perspective","pinch-zoom","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","start","static","status-bar","stretch","stroke","stroke-box","sub","subpixel-antialiased","svg_masks","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","text","text-bottom","text-top","textarea","textfield","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","to","top","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unidirectional-pan","unset","up","upper-latin","uppercase","url","var","vertical","vertical-text","view-box","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"].map(e=>({type:"keyword",label:e})).concat(["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"].map(e=>({type:"constant",label:e}))),D=["a","abbr","address","article","aside","b","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","dd","del","details","dfn","dialog","div","dl","dt","em","figcaption","figure","footer","form","header","hgroup","h1","h2","h3","h4","h5","h6","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","meter","nav","ol","output","p","pre","ruby","section","select","small","source","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","tr","u","ul"].map(e=>({type:"type",label:e})),I=["@charset","@color-profile","@container","@counter-style","@font-face","@font-feature-values","@font-palette-values","@import","@keyframes","@layer","@media","@namespace","@page","@position-try","@property","@scope","@starting-style","@supports","@view-transition"].map(e=>({type:"keyword",label:e})),s=/^(\w[\w-]*|-\w[\w-]*|)$/,F=/^-(-[\w-]*)?$/;function B(e,t){var l;if((e.name=="("||e.type.isError)&&(e=e.parent||e),e.name!="ArgList")return!1;let a=(l=e.parent)===null||l===void 0?void 0:l.firstChild;return(a==null?void 0:a.name)!="Callee"?!1:t.sliceString(a.from,a.to)=="var"}const X=new ne,K=["Declaration"];function L(e){for(let t=e;;){if(t.type.isTop)return t;if(!(t=t.parent))return e}}function w(e,t,l){if(t.to-t.from>4096){let a=X.get(t);if(a)return a;let O=[],r=new Set,i=t.cursor(ie.IncludeAnonymous);if(i.firstChild())do for(let n of w(e,i.node,l))r.has(n.label)||(r.add(n.label),O.push(n));while(i.nextSibling());return X.set(t,O),O}else{let a=[],O=new Set;return t.cursor().iterate(r=>{var i;if(l(r)&&r.matchContext(K)&&((i=r.node.nextSibling)===null||i===void 0?void 0:i.name)==":"){let n=e.sliceString(r.from,r.to);O.has(n)||(O.add(n),a.push({label:n,type:"variable"}))}}),a}}h=e=>t=>{let{state:l,pos:a}=t,O=le(l).resolveInner(a,-1),r=O.type.isError&&O.from==O.to-1&&l.doc.sliceString(O.from,O.to)=="-";if(O.name=="PropertyName"||(r||O.name=="TagName")&&/^(Block|Styles)$/.test(O.resolve(O.to).name))return{from:O.from,options:u(),validFor:s};if(O.name=="ValueName")return{from:O.from,options:P,validFor:s};if(O.name=="PseudoClassName")return{from:O.from,options:b,validFor:s};if(e(O)||(t.explicit||r)&&B(O,l.doc))return{from:e(O)||r?O.from:a,options:w(l.doc,L(O),e),validFor:F};if(O.name=="TagName"){for(let{parent:p}=O;p;p=p.parent)if(p.name=="Block")return{from:O.from,options:u(),validFor:s};return{from:O.from,options:D,validFor:s}}if(O.name=="AtKeyword")return{from:O.from,options:I,validFor:s};if(!t.explicit)return null;let i=O.resolve(a),n=i.childBefore(a);return n&&n.name==":"&&i.name=="PseudoClassSelector"?{from:a,options:b,validFor:s}:n&&n.name==":"&&i.name=="Declaration"||i.name=="ArgList"?{from:a,options:P,validFor:s}:i.name=="Block"||i.name=="Styles"?{from:a,options:u(),validFor:s}:null},g=h(e=>e.name=="VariableName"),Q=Oe.define({name:"css",parser:j.configure({props:[ae.add({Declaration:te()}),oe.add({"Block KeyframeList":re})]}),languageData:{commentTokens:{block:{open:"/*",close:"*/"}},indentOnInput:/^\s*\}$/,wordChars:"-"}}),k=function(){return new ee(Q,Q.data.of({autocomplete:g}))}});export{fe as __tla,k as css,g as cssCompletionSource,Q as cssLanguage,h as defineCSSCompletionSource};
