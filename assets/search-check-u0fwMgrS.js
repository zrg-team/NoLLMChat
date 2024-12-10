import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SearchCheck;
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
  SearchCheck = createLucideIcon("SearchCheck", [
    [
      "path",
      {
        d: "m8 11 2 2 4-4",
        key: "1sed1v"
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
  SearchCheck as default
};
