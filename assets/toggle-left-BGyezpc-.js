import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ToggleLeft;
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
  ToggleLeft = createLucideIcon("ToggleLeft", [
    [
      "rect",
      {
        width: "20",
        height: "12",
        x: "2",
        y: "6",
        rx: "6",
        ry: "6",
        key: "f2vt7d"
      }
    ],
    [
      "circle",
      {
        cx: "8",
        cy: "12",
        r: "2",
        key: "1nvbw3"
      }
    ]
  ]);
});
export {
  __tla,
  ToggleLeft as default
};
