import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SeparatorHorizontal;
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
  SeparatorHorizontal = createLucideIcon("SeparatorHorizontal", [
    [
      "line",
      {
        x1: "3",
        x2: "21",
        y1: "12",
        y2: "12",
        key: "10d38w"
      }
    ],
    [
      "polyline",
      {
        points: "8 8 12 4 16 8",
        key: "zo8t4w"
      }
    ],
    [
      "polyline",
      {
        points: "16 16 12 20 8 16",
        key: "1oyrid"
      }
    ]
  ]);
});
export {
  __tla,
  SeparatorHorizontal as default
};
