import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Battery;
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
  Battery = createLucideIcon("Battery", [
    [
      "rect",
      {
        width: "16",
        height: "10",
        x: "2",
        y: "7",
        rx: "2",
        ry: "2",
        key: "1w10f2"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "22",
        y1: "11",
        y2: "13",
        key: "4dh1rd"
      }
    ]
  ]);
});
export {
  __tla,
  Battery as default
};
