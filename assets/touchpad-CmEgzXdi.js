import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Touchpad;
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
  Touchpad = createLucideIcon("Touchpad", [
    [
      "rect",
      {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2",
        key: "18n3k1"
      }
    ],
    [
      "path",
      {
        d: "M2 14h20",
        key: "myj16y"
      }
    ],
    [
      "path",
      {
        d: "M12 20v-6",
        key: "1rm09r"
      }
    ]
  ]);
});
export {
  __tla,
  Touchpad as default
};
