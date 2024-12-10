import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let DollarSign;
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
  DollarSign = createLucideIcon("DollarSign", [
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "2",
        y2: "22",
        key: "7eqyqh"
      }
    ],
    [
      "path",
      {
        d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        key: "1b0p4s"
      }
    ]
  ]);
});
export {
  __tla,
  DollarSign as default
};
