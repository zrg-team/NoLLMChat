import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Grid3x3;
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
  Grid3x3 = createLucideIcon("Grid3x3", [
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
        d: "M3 9h18",
        key: "1pudct"
      }
    ],
    [
      "path",
      {
        d: "M3 15h18",
        key: "5xshup"
      }
    ],
    [
      "path",
      {
        d: "M9 3v18",
        key: "fh3hqa"
      }
    ],
    [
      "path",
      {
        d: "M15 3v18",
        key: "14nvp0"
      }
    ]
  ]);
});
export {
  __tla,
  Grid3x3 as default
};
