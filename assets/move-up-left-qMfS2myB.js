import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MoveUpLeft;
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
  MoveUpLeft = createLucideIcon("MoveUpLeft", [
    [
      "path",
      {
        d: "M5 11V5H11",
        key: "3q78g9"
      }
    ],
    [
      "path",
      {
        d: "M5 5L19 19",
        key: "5zm2fv"
      }
    ]
  ]);
});
export {
  __tla,
  MoveUpLeft as default
};
