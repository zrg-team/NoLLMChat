import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowDownLeft;
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
  ArrowDownLeft = createLucideIcon("ArrowDownLeft", [
    [
      "path",
      {
        d: "M17 7 7 17",
        key: "15tmo1"
      }
    ],
    [
      "path",
      {
        d: "M17 17H7V7",
        key: "1org7z"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowDownLeft as default
};
