import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowUpLeft;
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
  ArrowUpLeft = createLucideIcon("ArrowUpLeft", [
    [
      "path",
      {
        d: "M7 17V7h10",
        key: "11bw93"
      }
    ],
    [
      "path",
      {
        d: "M17 17 7 7",
        key: "2786uv"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowUpLeft as default
};
