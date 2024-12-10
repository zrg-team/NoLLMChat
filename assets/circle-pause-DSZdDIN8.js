import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CirclePause;
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
  CirclePause = createLucideIcon("CirclePause", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "line",
      {
        x1: "10",
        x2: "10",
        y1: "15",
        y2: "9",
        key: "c1nkhi"
      }
    ],
    [
      "line",
      {
        x1: "14",
        x2: "14",
        y1: "15",
        y2: "9",
        key: "h65svq"
      }
    ]
  ]);
});
export {
  __tla,
  CirclePause as default
};
