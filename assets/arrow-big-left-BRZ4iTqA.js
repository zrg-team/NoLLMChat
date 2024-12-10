import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ArrowBigLeft;
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
  ArrowBigLeft = createLucideIcon("ArrowBigLeft", [
    [
      "path",
      {
        d: "M18 15h-6v4l-7-7 7-7v4h6v6z",
        key: "lbrdak"
      }
    ]
  ]);
});
export {
  __tla,
  ArrowBigLeft as default
};
