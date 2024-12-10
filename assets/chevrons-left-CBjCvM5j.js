import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsLeft;
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
  ChevronsLeft = createLucideIcon("ChevronsLeft", [
    [
      "path",
      {
        d: "m11 17-5-5 5-5",
        key: "13zhaf"
      }
    ],
    [
      "path",
      {
        d: "m18 17-5-5 5-5",
        key: "h8a8et"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsLeft as default
};
