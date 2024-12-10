import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Timer;
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
  Timer = createLucideIcon("Timer", [
    [
      "line",
      {
        x1: "10",
        x2: "14",
        y1: "2",
        y2: "2",
        key: "14vaq8"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "15",
        y1: "14",
        y2: "11",
        key: "17fdiu"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "14",
        r: "8",
        key: "1e1u0o"
      }
    ]
  ]);
});
export {
  __tla,
  Timer as default
};
