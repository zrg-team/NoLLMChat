import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let PanelsTopLeft;
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
  PanelsTopLeft = createLucideIcon("PanelsTopLeft", [
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
        d: "M9 21V9",
        key: "1oto5p"
      }
    ]
  ]);
});
export {
  __tla,
  PanelsTopLeft as default
};
