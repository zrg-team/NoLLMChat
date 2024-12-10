import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Grid2x2;
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
  Grid2x2 = createLucideIcon("Grid2x2", [
    [
      "path",
      {
        d: "M12 3v18",
        key: "108xh3"
      }
    ],
    [
      "path",
      {
        d: "M3 12h18",
        key: "1i2n21"
      }
    ],
    [
      "rect",
      {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        key: "h1oib"
      }
    ]
  ]);
});
export {
  __tla,
  Grid2x2 as default
};
