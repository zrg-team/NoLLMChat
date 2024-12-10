import { L as LRParser, __tla as __tla_0 } from "./index-DMdK_k-l.js";
import { s as styleTags, t as tags, L as LanguageSupport, e as LRLanguage, f as indentNodeProp, g as continuedIndent, k as foldNodeProp, l as foldInside, __tla as __tla_1 } from "./CodeContainerApp-BGMyJ1po.js";
import { __tla as __tla_2 } from "./index-Bs2EL0Mm.js";
import { __tla as __tla_3 } from "./HomePage-D_Hs-RaH.js";
import { __tla as __tla_4 } from "./use-llm-Kc_COJca.js";
import { __tla as __tla_5 } from "./routes-Q3DgWzwS.js";
import { __tla as __tla_6 } from "./use-prevent-pitch-zoom-DzGgDOPg.js";
import { __tla as __tla_7 } from "./index-Br76-WZb.js";
import "./objectWithoutPropertiesLoose-CoJdz_cg.js";
import { __tla as __tla_8 } from "./folder-open-dIe9OhV5.js";
import { __tla as __tla_9 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_10 } from "./folder-Dbc0RVEZ.js";
import { __tla as __tla_11 } from "./file-Cu_wxXYl.js";
let json, jsonLanguage;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_7;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_8;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_9;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_10;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_11;
    } catch {
    }
  })()
]).then(async () => {
  const jsonHighlighting = styleTags({
    String: tags.string,
    Number: tags.number,
    "True False": tags.bool,
    PropertyName: tags.propertyName,
    Null: tags.null,
    ",": tags.separator,
    "[ ]": tags.squareBracket,
    "{ }": tags.brace
  });
  const parser = LRParser.deserialize({
    version: 14,
    states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",
    stateData: "#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",
    goto: "!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
    nodeNames: "\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",
    maxTerm: 25,
    nodeProps: [
      [
        "isolate",
        -2,
        6,
        11,
        ""
      ],
      [
        "openedBy",
        7,
        "{",
        12,
        "["
      ],
      [
        "closedBy",
        8,
        "}",
        13,
        "]"
      ]
    ],
    propSources: [
      jsonHighlighting
    ],
    skippedNodes: [
      0
    ],
    repeatNodeCount: 2,
    tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oc~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Oe~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zOh~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yOg~~'OO]~~'TO[~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
    tokenizers: [
      0
    ],
    topRules: {
      "JsonText": [
        0,
        1
      ]
    },
    tokenPrec: 0
  });
  jsonLanguage = LRLanguage.define({
    name: "json",
    parser: parser.configure({
      props: [
        indentNodeProp.add({
          Object: continuedIndent({
            except: /^\s*\}/
          }),
          Array: continuedIndent({
            except: /^\s*\]/
          })
        }),
        foldNodeProp.add({
          "Object Array": foldInside
        })
      ]
    }),
    languageData: {
      closeBrackets: {
        brackets: [
          "[",
          "{",
          '"'
        ]
      },
      indentOnInput: /^\s*[\}\]]$/
    }
  });
  json = function() {
    return new LanguageSupport(jsonLanguage);
  };
});
export {
  __tla,
  json,
  jsonLanguage
};
