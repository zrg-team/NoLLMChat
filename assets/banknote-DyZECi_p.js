import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Banknote;
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
  Banknote = createLucideIcon("Banknote", [
    [
      "rect",
      {
        width: "20",
        height: "12",
        x: "2",
        y: "6",
        rx: "2",
        key: "9lu3g6"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "2",
        key: "1c9p78"
      }
    ],
    [
      "path",
      {
        d: "M6 12h.01M18 12h.01",
        key: "113zkx"
      }
    ]
  ]);
});
export {
  __tla,
  Banknote as default
};
