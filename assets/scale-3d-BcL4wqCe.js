import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Scale3d;
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
  Scale3d = createLucideIcon("Scale3d", [
    [
      "path",
      {
        d: "M5 7v11a1 1 0 0 0 1 1h11",
        key: "13dt1j"
      }
    ],
    [
      "path",
      {
        d: "M5.293 18.707 11 13",
        key: "ezgbsx"
      }
    ],
    [
      "circle",
      {
        cx: "19",
        cy: "19",
        r: "2",
        key: "17f5cg"
      }
    ],
    [
      "circle",
      {
        cx: "5",
        cy: "5",
        r: "2",
        key: "1gwv83"
      }
    ]
  ]);
});
export {
  __tla,
  Scale3d as default
};
