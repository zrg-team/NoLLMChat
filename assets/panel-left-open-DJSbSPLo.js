import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let PanelLeftOpen;
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
  PanelLeftOpen = createLucideIcon("PanelLeftOpen", [
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
        d: "M9 3v18",
        key: "fh3hqa"
      }
    ],
    [
      "path",
      {
        d: "m14 9 3 3-3 3",
        key: "8010ee"
      }
    ]
  ]);
});
export {
  __tla,
  PanelLeftOpen as default
};
