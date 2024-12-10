import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowUp;
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
  SquareArrowUp = createLucideIcon("SquareArrowUp", [
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
        d: "m16 12-4-4-4 4",
        key: "177agl"
      }
    ],
    [
      "path",
      {
        d: "M12 16V8",
        key: "1sbj14"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowUp as default
};
