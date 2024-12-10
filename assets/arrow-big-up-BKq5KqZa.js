import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowBigUp;
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
  ArrowBigUp = createLucideIcon("ArrowBigUp", [
    [
      "path",
      {
        d: "M9 18v-6H5l7-7 7 7h-4v6H9z",
        key: "1x06kx"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowBigUp as default
};
