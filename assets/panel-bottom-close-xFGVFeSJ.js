import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let PanelBottomClose;
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
  PanelBottomClose = createLucideIcon("PanelBottomClose", [
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
        d: "M3 15h18",
        key: "5xshup"
      }
    ],
    [
      "path",
      {
        d: "m15 8-3 3-3-3",
        key: "1oxy1z"
      }
    ]
  ]);
});
export {
  __tla,
  PanelBottomClose as default
};
