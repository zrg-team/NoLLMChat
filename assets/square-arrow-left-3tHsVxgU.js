import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowLeft;
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
  SquareArrowLeft = createLucideIcon("SquareArrowLeft", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "path",
      {
        d: "m12 8-4 4 4 4",
        key: "15vm53"
      }
    ],
    [
      "path",
      {
        d: "M16 12H8",
        key: "1fr5h0"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowLeft as default
};
