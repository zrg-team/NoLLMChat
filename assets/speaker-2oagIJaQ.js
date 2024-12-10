import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Speaker;
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
  Speaker = createLucideIcon("Speaker", [
    [
      "rect",
      {
        width: "16",
        height: "20",
        x: "4",
        y: "2",
        rx: "2",
        key: "1nb95v"
      }
    ],
    [
      "path",
      {
        d: "M12 6h.01",
        key: "1vi96p"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "14",
        r: "4",
        key: "1jruaj"
      }
    ],
    [
      "path",
      {
        d: "M12 14h.01",
        key: "1etili"
      }
    ]
  ]);
});
export {
  __tla,
  Speaker as default
};
