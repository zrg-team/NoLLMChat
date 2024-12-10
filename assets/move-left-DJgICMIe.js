import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MoveLeft;
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
  MoveLeft = createLucideIcon("MoveLeft", [
    [
      "path",
      {
        d: "M6 8L2 12L6 16",
        key: "kyvwex"
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
  MoveLeft as default
};
