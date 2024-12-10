import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FlagTriangleLeft;
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
  FlagTriangleLeft = createLucideIcon("FlagTriangleLeft", [
    [
      "path",
      {
        d: "M17 22V2L7 7l10 5",
        key: "1rmf0r"
      }
    ]
  ]);
});
export {
  __tla,
  FlagTriangleLeft as default
};
