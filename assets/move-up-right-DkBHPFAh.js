import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MoveUpRight;
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
  MoveUpRight = createLucideIcon("MoveUpRight", [
    [
      "path",
      {
        d: "M13 5H19V11",
        key: "1n1gyv"
      }
    ],
    [
      "path",
      {
        d: "M19 5L5 19",
        key: "72u4yj"
      }
    ]
  ]);
});
export {
  __tla,
  MoveUpRight as default
};
