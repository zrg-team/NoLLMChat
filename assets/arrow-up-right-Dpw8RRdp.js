import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowUpRight;
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
  ArrowUpRight = createLucideIcon("ArrowUpRight", [
    [
      "path",
      {
        d: "M7 7h10v10",
        key: "1tivn9"
      }
    ],
    [
      "path",
      {
        d: "M7 17 17 7",
        key: "1vkiza"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowUpRight as default
};
