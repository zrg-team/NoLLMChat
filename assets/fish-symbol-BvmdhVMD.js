import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FishSymbol;
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
  FishSymbol = createLucideIcon("FishSymbol", [
    [
      "path",
      {
        d: "M2 16s9-15 20-4C11 23 2 8 2 8",
        key: "h4oh4o"
      }
    ]
  ]);
});
export {
  __tla,
  FishSymbol as default
};
