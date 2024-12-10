import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowDownRight;
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
  ArrowDownRight = createLucideIcon("ArrowDownRight", [
    [
      "path",
      {
        d: "m7 7 10 10",
        key: "1fmybs"
      }
    ],
    [
      "path",
      {
        d: "M17 7v10H7",
        key: "6fjiku"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowDownRight as default
};
