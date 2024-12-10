import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowDownLeft;
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
  SquareArrowDownLeft = createLucideIcon("SquareArrowDownLeft", [
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
        d: "m16 8-8 8",
        key: "166keh"
      }
    ],
    [
      "path",
      {
        d: "M16 16H8V8",
        key: "1w2ppm"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowDownLeft as default
};
