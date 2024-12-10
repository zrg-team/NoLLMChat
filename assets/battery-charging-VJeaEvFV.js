import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BatteryCharging;
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
  BatteryCharging = createLucideIcon("BatteryCharging", [
    [
      "path",
      {
        d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2",
        key: "1sdynx"
      }
    ],
    [
      "path",
      {
        d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1",
        key: "1gkd3k"
      }
    ],
    [
      "path",
      {
        d: "m11 7-3 5h4l-3 5",
        key: "b4a64w"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "22",
        y1: "11",
        y2: "13",
        key: "4dh1rd"
      }
    ]
  ]);
});
export {
  __tla,
  BatteryCharging as default
};
