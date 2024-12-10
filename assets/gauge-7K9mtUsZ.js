import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Gauge;
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
  Gauge = createLucideIcon("Gauge", [
    [
      "path",
      {
        d: "m12 14 4-4",
        key: "9kzdfg"
      }
    ],
    [
      "path",
      {
        d: "M3.34 19a10 10 0 1 1 17.32 0",
        key: "19p75a"
      }
    ]
  ]);
});
export {
  __tla,
  Gauge as default
};
