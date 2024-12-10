import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleGauge;
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
  CircleGauge = createLucideIcon("CircleGauge", [
    [
      "path",
      {
        d: "M15.6 2.7a10 10 0 1 0 5.7 5.7",
        key: "1e0p6d"
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
        d: "M13.4 10.6 19 5",
        key: "1kr7tw"
      }
    ]
  ]);
});
export {
  __tla,
  CircleGauge as default
};
