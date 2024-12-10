import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let RailSymbol;
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
  RailSymbol = createLucideIcon("RailSymbol", [
    [
      "path",
      {
        d: "M5 15h14",
        key: "m0yey3"
      }
    ],
    [
      "path",
      {
        d: "M5 9h14",
        key: "7tsvo6"
      }
    ],
    [
      "path",
      {
        d: "m14 20-5-5 6-6-5-5",
        key: "1jo42i"
      }
    ]
  ]);
});
export {
  __tla,
  RailSymbol as default
};
