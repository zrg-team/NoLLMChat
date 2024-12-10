import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MoveRight;
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
  MoveRight = createLucideIcon("MoveRight", [
    [
      "path",
      {
        d: "M18 8L22 12L18 16",
        key: "1r0oui"
      }
    ],
    [
      "path",
      {
        d: "M2 12H22",
        key: "1m8cig"
      }
    ]
  ]);
});
export {
  __tla,
  MoveRight as default
};
