import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BatteryWarning;
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
  BatteryWarning = createLucideIcon("BatteryWarning", [
    [
      "path",
      {
        d: "M10 17h.01",
        key: "nbq80n"
      }
    ],
    [
      "path",
      {
        d: "M10 7v6",
        key: "nne03l"
      }
    ],
    [
      "path",
      {
        d: "M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2",
        key: "1x5o8m"
      }
    ],
    [
      "path",
      {
        d: "M22 11v2",
        key: "1wo06k"
      }
    ],
    [
      "path",
      {
        d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
        key: "1mdjgh"
      }
    ]
  ]);
});
export {
  __tla,
  BatteryWarning as default
};
