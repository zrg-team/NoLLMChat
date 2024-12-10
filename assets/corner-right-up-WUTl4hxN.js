import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CornerRightUp;
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
  CornerRightUp = createLucideIcon("CornerRightUp", [
    [
      "polyline",
      {
        points: "10 9 15 4 20 9",
        key: "1lr6px"
      }
    ],
    [
      "path",
      {
        d: "M4 20h7a4 4 0 0 0 4-4V4",
        key: "1plgdj"
      }
    ]
  ]);
});
export {
  __tla,
  CornerRightUp as default
};
