import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ChevronsUpDown;
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
  ChevronsUpDown = createLucideIcon("ChevronsUpDown", [
    [
      "path",
      {
        d: "m7 15 5 5 5-5",
        key: "1hf1tw"
      }
    ],
    [
      "path",
      {
        d: "m7 9 5-5 5 5",
        key: "sgt6xg"
      }
    ]
  ]);
});
export {
  __tla,
  ChevronsUpDown as default
};
