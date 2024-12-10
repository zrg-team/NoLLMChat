import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareUser;
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
  SquareUser = createLucideIcon("SquareUser", [
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
      "circle",
      {
        cx: "12",
        cy: "10",
        r: "3",
        key: "ilqhr7"
      }
    ],
    [
      "path",
      {
        d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",
        key: "1m6ac2"
      }
    ]
  ]);
});
export {
  __tla,
  SquareUser as default
};
