import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Monitor;
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
  Monitor = createLucideIcon("Monitor", [
    [
      "rect",
      {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2",
        key: "48i651"
      }
    ],
    [
      "line",
      {
        x1: "8",
        x2: "16",
        y1: "21",
        y2: "21",
        key: "1svkeh"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "17",
        y2: "21",
        key: "vw1qmm"
      }
    ]
  ]);
});
export {
  __tla,
  Monitor as default
};
