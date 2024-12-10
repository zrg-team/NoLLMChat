import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Undo;
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
  Undo = createLucideIcon("Undo", [
    [
      "path",
      {
        d: "M3 7v6h6",
        key: "1v2h90"
      }
    ],
    [
      "path",
      {
        d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
        key: "1r6uu6"
      }
    ]
  ]);
});
export {
  __tla,
  Undo as default
};
