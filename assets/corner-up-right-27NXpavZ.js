import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CornerUpRight;
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
  CornerUpRight = createLucideIcon("CornerUpRight", [
    [
      "polyline",
      {
        points: "15 14 20 9 15 4",
        key: "1tbx3s"
      }
    ],
    [
      "path",
      {
        d: "M4 20v-7a4 4 0 0 1 4-4h12",
        key: "1lu4f8"
      }
    ]
  ]);
});
export {
  __tla,
  CornerUpRight as default
};
