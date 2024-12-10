import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FlagTriangleRight;
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
  FlagTriangleRight = createLucideIcon("FlagTriangleRight", [
    [
      "path",
      {
        d: "M7 22V2l10 5-10 5",
        key: "17n18y"
      }
    ]
  ]);
});
export {
  __tla,
  FlagTriangleRight as default
};
