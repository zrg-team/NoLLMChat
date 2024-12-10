import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BringToFront;
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
  BringToFront = createLucideIcon("BringToFront", [
    [
      "rect",
      {
        x: "8",
        y: "8",
        width: "8",
        height: "8",
        rx: "2",
        key: "yj20xf"
      }
    ],
    [
      "path",
      {
        d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2",
        key: "1ltk23"
      }
    ],
    [
      "path",
      {
        d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2",
        key: "1q24h9"
      }
    ]
  ]);
});
export {
  __tla,
  BringToFront as default
};
