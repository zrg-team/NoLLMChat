import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsUp;
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
  ChevronsUp = createLucideIcon("ChevronsUp", [
    [
      "path",
      {
        d: "m17 11-5-5-5 5",
        key: "e8nh98"
      }
    ],
    [
      "path",
      {
        d: "m17 18-5-5-5 5",
        key: "2avn1x"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsUp as default
};
