import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Tablet;
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
  Tablet = createLucideIcon("Tablet", [
    [
      "rect",
      {
        width: "16",
        height: "20",
        x: "4",
        y: "2",
        rx: "2",
        ry: "2",
        key: "76otgf"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12.01",
        y1: "18",
        y2: "18",
        key: "1dp563"
      }
    ]
  ]);
});
export {
  __tla,
  Tablet as default
};
