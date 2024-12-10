import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Terminal;
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
  Terminal = createLucideIcon("Terminal", [
    [
      "polyline",
      {
        points: "4 17 10 11 4 5",
        key: "akl6gq"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "20",
        y1: "19",
        y2: "19",
        key: "q2wloq"
      }
    ]
  ]);
});
export {
  __tla,
  Terminal as default
};
