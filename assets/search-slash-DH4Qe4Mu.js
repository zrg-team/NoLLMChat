import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SearchSlash;
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
  })()
]).then(async () => {
  SearchSlash = createLucideIcon("SearchSlash", [
    [
      "path",
      {
        d: "m13.5 8.5-5 5",
        key: "1cs55j"
      }
    ],
    [
      "circle",
      {
        cx: "11",
        cy: "11",
        r: "8",
        key: "4ej97u"
      }
    ],
    [
      "path",
      {
        d: "m21 21-4.3-4.3",
        key: "1qie3q"
      }
    ]
  ]);
});
export {
  __tla,
  SearchSlash as default
};
