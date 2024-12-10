import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareMenu;
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
  SquareMenu = createLucideIcon("SquareMenu", [
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
        d: "M7 8h10",
        key: "1jw688"
      }
    ],
    [
      "path",
      {
        d: "M7 12h10",
        key: "b7w52i"
      }
    ],
    [
      "path",
      {
        d: "M7 16h10",
        key: "wp8him"
      }
    ]
  ]);
});
export {
  __tla,
  SquareMenu as default
};
