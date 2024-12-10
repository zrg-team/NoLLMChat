import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ToyBrick;
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
  ToyBrick = createLucideIcon("ToyBrick", [
    [
      "rect",
      {
        width: "18",
        height: "12",
        x: "3",
        y: "8",
        rx: "1",
        key: "158fvp"
      }
    ],
    [
      "path",
      {
        d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3",
        key: "s0042v"
      }
    ],
    [
      "path",
      {
        d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3",
        key: "9wmeh2"
      }
    ]
  ]);
});
export {
  __tla,
  ToyBrick as default
};
