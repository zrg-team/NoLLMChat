import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsLeftRight;
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
  ChevronsLeftRight = createLucideIcon("ChevronsLeftRight", [
    [
      "path",
      {
        d: "m9 7-5 5 5 5",
        key: "j5w590"
      }
    ],
    [
      "path",
      {
        d: "m15 7 5 5-5 5",
        key: "1bl6da"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsLeftRight as default
};
