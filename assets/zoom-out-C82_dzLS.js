import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ZoomOut;
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
  ZoomOut = createLucideIcon("ZoomOut", [
    [
      "circle",
      {
        cx: "11",
        cy: "11",
        r: "8",
        key: "4ej97u"
      }
    ],
    [
      "line",
      {
        x1: "21",
        x2: "16.65",
        y1: "21",
        y2: "16.65",
        key: "13gj7c"
      }
    ],
    [
      "line",
      {
        x1: "8",
        x2: "14",
        y1: "11",
        y2: "11",
        key: "durymu"
      }
    ]
  ]);
});
export {
  __tla,
  ZoomOut as default
};
