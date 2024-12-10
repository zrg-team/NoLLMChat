import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquarePi;
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
  SquarePi = createLucideIcon("SquarePi", [
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
        d: "M7 7h10",
        key: "udp07y"
      }
    ],
    [
      "path",
      {
        d: "M10 7v10",
        key: "i1d9ee"
      }
    ],
    [
      "path",
      {
        d: "M16 17a2 2 0 0 1-2-2V7",
        key: "ftwdc7"
      }
    ]
  ]);
});
export {
  __tla,
  SquarePi as default
};
