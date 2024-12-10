import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowUpRight;
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
  SquareArrowUpRight = createLucideIcon("SquareArrowUpRight", [
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
        d: "M8 8h8v8",
        key: "b65dnt"
      }
    ],
    [
      "path",
      {
        d: "m8 16 8-8",
        key: "13b9ih"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowUpRight as default
};
