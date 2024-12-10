import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Currency;
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
  Currency = createLucideIcon("Currency", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "8",
        key: "46899m"
      }
    ],
    [
      "line",
      {
        x1: "3",
        x2: "6",
        y1: "3",
        y2: "6",
        key: "1jkytn"
      }
    ],
    [
      "line",
      {
        x1: "21",
        x2: "18",
        y1: "3",
        y2: "6",
        key: "14zfjt"
      }
    ],
    [
      "line",
      {
        x1: "3",
        x2: "6",
        y1: "21",
        y2: "18",
        key: "iusuec"
      }
    ],
    [
      "line",
      {
        x1: "21",
        x2: "18",
        y1: "21",
        y2: "18",
        key: "yj2dd7"
      }
    ]
  ]);
});
export {
  __tla,
  Currency as default
};
