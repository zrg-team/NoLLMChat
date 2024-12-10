import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CreditCard;
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
  CreditCard = createLucideIcon("CreditCard", [
    [
      "rect",
      {
        width: "20",
        height: "14",
        x: "2",
        y: "5",
        rx: "2",
        key: "ynyp8z"
      }
    ],
    [
      "line",
      {
        x1: "2",
        x2: "22",
        y1: "10",
        y2: "10",
        key: "1b3vmo"
      }
    ]
  ]);
});
export {
  __tla,
  CreditCard as default
};
