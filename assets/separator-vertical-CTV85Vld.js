import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SeparatorVertical;
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
  SeparatorVertical = createLucideIcon("SeparatorVertical", [
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "3",
        y2: "21",
        key: "1efggb"
      }
    ],
    [
      "polyline",
      {
        points: "8 8 4 12 8 16",
        key: "bnfmv4"
      }
    ],
    [
      "polyline",
      {
        points: "16 16 20 12 16 8",
        key: "u90052"
      }
    ]
  ]);
});
export {
  __tla,
  SeparatorVertical as default
};
