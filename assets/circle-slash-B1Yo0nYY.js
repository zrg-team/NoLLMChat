import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleSlash;
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
  CircleSlash = createLucideIcon("CircleSlash", [
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
        x1: "9",
        x2: "15",
        y1: "15",
        y2: "9",
        key: "1dfufj"
      }
    ]
  ]);
});
export {
  __tla,
  CircleSlash as default
};
