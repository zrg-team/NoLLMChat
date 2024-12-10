import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Vibrate;
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
  Vibrate = createLucideIcon("Vibrate", [
    [
      "path",
      {
        d: "m2 8 2 2-2 2 2 2-2 2",
        key: "sv1b1"
      }
    ],
    [
      "path",
      {
        d: "m22 8-2 2 2 2-2 2 2 2",
        key: "101i4y"
      }
    ],
    [
      "rect",
      {
        width: "8",
        height: "14",
        x: "8",
        y: "5",
        rx: "1",
        key: "1oyrl4"
      }
    ]
  ]);
});
export {
  __tla,
  Vibrate as default
};
