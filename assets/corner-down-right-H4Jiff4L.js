import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CornerDownRight;
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
  CornerDownRight = createLucideIcon("CornerDownRight", [
    [
      "polyline",
      {
        points: "15 10 20 15 15 20",
        key: "1q7qjw"
      }
    ],
    [
      "path",
      {
        d: "M4 4v7a4 4 0 0 0 4 4h12",
        key: "z08zvw"
      }
    ]
  ]);
});
export {
  __tla,
  CornerDownRight as default
};
