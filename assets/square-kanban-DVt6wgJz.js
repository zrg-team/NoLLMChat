import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareKanban;
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
  SquareKanban = createLucideIcon("SquareKanban", [
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
        d: "M8 7v7",
        key: "1x2jlm"
      }
    ],
    [
      "path",
      {
        d: "M12 7v4",
        key: "xawao1"
      }
    ],
    [
      "path",
      {
        d: "M16 7v9",
        key: "1hp2iy"
      }
    ]
  ]);
});
export {
  __tla,
  SquareKanban as default
};
