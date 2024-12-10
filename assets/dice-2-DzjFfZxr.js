import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Dice2;
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
  Dice2 = createLucideIcon("Dice2", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2",
        key: "1m3agn"
      }
    ],
    [
      "path",
      {
        d: "M15 9h.01",
        key: "x1ddxp"
      }
    ],
    [
      "path",
      {
        d: "M9 15h.01",
        key: "fzyn71"
      }
    ]
  ]);
});
export {
  __tla,
  Dice2 as default
};
