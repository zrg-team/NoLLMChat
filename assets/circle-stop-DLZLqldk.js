import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleStop;
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
  CircleStop = createLucideIcon("CircleStop", [
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
      "rect",
      {
        x: "9",
        y: "9",
        width: "6",
        height: "6",
        rx: "1",
        key: "1ssd4o"
      }
    ]
  ]);
});
export {
  __tla,
  CircleStop as default
};
