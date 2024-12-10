import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Share;
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
  Share = createLucideIcon("Share", [
    [
      "path",
      {
        d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
        key: "1b2hhj"
      }
    ],
    [
      "polyline",
      {
        points: "16 6 12 2 8 6",
        key: "m901s6"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "2",
        y2: "15",
        key: "1p0rca"
      }
    ]
  ]);
});
export {
  __tla,
  Share as default
};
