import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsDownUp;
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
  ChevronsDownUp = createLucideIcon("ChevronsDownUp", [
    [
      "path",
      {
        d: "m7 20 5-5 5 5",
        key: "13a0gw"
      }
    ],
    [
      "path",
      {
        d: "m7 4 5 5 5-5",
        key: "1kwcof"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsDownUp as default
};
