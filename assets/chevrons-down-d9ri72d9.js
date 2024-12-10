import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsDown;
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
  ChevronsDown = createLucideIcon("ChevronsDown", [
    [
      "path",
      {
        d: "m7 6 5 5 5-5",
        key: "1lc07p"
      }
    ],
    [
      "path",
      {
        d: "m7 13 5 5 5-5",
        key: "1d48rs"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsDown as default
};
