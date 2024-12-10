import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowUpLeft;
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
  SquareArrowUpLeft = createLucideIcon("SquareArrowUpLeft", [
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
        d: "M8 16V8h8",
        key: "19xb1h"
      }
    ],
    [
      "path",
      {
        d: "M16 16 8 8",
        key: "1qdy8n"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowUpLeft as default
};
