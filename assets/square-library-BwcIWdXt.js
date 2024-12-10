import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareLibrary;
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
  SquareLibrary = createLucideIcon("SquareLibrary", [
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
        d: "M7 7v10",
        key: "d5nglc"
      }
    ],
    [
      "path",
      {
        d: "M11 7v10",
        key: "pptsnr"
      }
    ],
    [
      "path",
      {
        d: "m15 7 2 10",
        key: "1m7qm5"
      }
    ]
  ]);
});
export {
  __tla,
  SquareLibrary as default
};
