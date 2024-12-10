import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Flashlight;
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
  Flashlight = createLucideIcon("Flashlight", [
    [
      "path",
      {
        d: "M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z",
        key: "1orkel"
      }
    ],
    [
      "line",
      {
        x1: "6",
        x2: "18",
        y1: "6",
        y2: "6",
        key: "1z11jq"
      }
    ],
    [
      "line",
      {
        x1: "12",
        x2: "12",
        y1: "12",
        y2: "12",
        key: "1f4yc1"
      }
    ]
  ]);
});
export {
  __tla,
  Flashlight as default
};
