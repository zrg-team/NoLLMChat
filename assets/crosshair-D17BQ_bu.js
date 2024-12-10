import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Crosshair;
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
  Crosshair = createLucideIcon("Crosshair", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "18",
        y1: "12",
        y2: "12",
        key: "l9bcsi"
      }
    ],
    [
      "line",
      {
        x1: "6",
        x2: "2",
        y1: "12",
        y2: "12",
        key: "13hhkx"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "6",
        y2: "2",
        key: "10w3f3"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "22",
        y2: "18",
        key: "15g9kq"
      }
    ]
  ]);
});
export {
  __tla,
  Crosshair as default
};
