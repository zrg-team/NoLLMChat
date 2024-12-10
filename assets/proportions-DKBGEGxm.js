import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Proportions;
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
  Proportions = createLucideIcon("Proportions", [
    [
      "rect",
      {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2",
        key: "18n3k1"
      }
    ],
    [
      "path",
      {
        d: "M12 9v11",
        key: "1fnkrn"
      }
    ],
    [
      "path",
      {
        d: "M2 9h13a2 2 0 0 1 2 2v9",
        key: "11z3ex"
      }
    ]
  ]);
});
export {
  __tla,
  Proportions as default
};
