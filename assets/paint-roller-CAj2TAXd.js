import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let PaintRoller;
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
  PaintRoller = createLucideIcon("PaintRoller", [
    [
      "rect",
      {
        width: "16",
        height: "6",
        x: "2",
        y: "2",
        rx: "2",
        key: "jcyz7m"
      }
    ],
    [
      "path",
      {
        d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
        key: "1b9h7c"
      }
    ],
    [
      "rect",
      {
        width: "4",
        height: "6",
        x: "8",
        y: "16",
        rx: "1",
        key: "d6e7yl"
      }
    ]
  ]);
});
export {
  __tla,
  PaintRoller as default
};
