import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SignalLow;
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
  SignalLow = createLucideIcon("SignalLow", [
    [
      "path",
      {
        d: "M2 20h.01",
        key: "4haj6o"
      }
    ],
    [
      "path",
      {
        d: "M7 20v-4",
        key: "j294jx"
      }
    ]
  ]);
});
export {
  __tla,
  SignalLow as default
};
