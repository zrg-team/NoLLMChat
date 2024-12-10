import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Tablets;
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
  Tablets = createLucideIcon("Tablets", [
    [
      "circle",
      {
        cx: "7",
        cy: "7",
        r: "5",
        key: "x29byf"
      }
    ],
    [
      "circle",
      {
        cx: "17",
        cy: "17",
        r: "5",
        key: "1op1d2"
      }
    ],
    [
      "path",
      {
        d: "M12 17h10",
        key: "ls21zv"
      }
    ],
    [
      "path",
      {
        d: "m3.46 10.54 7.08-7.08",
        key: "1rehiu"
      }
    ]
  ]);
});
export {
  __tla,
  Tablets as default
};
