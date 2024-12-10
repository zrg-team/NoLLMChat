import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareArrowDown;
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
  SquareArrowDown = createLucideIcon("SquareArrowDown", [
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
        d: "M12 8v8",
        key: "napkw2"
      }
    ],
    [
      "path",
      {
        d: "m8 12 4 4 4-4",
        key: "k98ssh"
      }
    ]
  ]);
});
export {
  __tla,
  SquareArrowDown as default
};
