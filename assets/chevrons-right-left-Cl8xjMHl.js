import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsRightLeft;
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
  ChevronsRightLeft = createLucideIcon("ChevronsRightLeft", [
    [
      "path",
      {
        d: "m20 17-5-5 5-5",
        key: "30x0n2"
      }
    ],
    [
      "path",
      {
        d: "m4 17 5-5-5-5",
        key: "16spf4"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsRightLeft as default
};
