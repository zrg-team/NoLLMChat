import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ClockAlert;
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
  ClockAlert = createLucideIcon("ClockAlert", [
    [
      "path",
      {
        d: "M12 6v6l4 2",
        key: "mmk7yg"
      }
    ],
    [
      "path",
      {
        d: "M16 21.16a10 10 0 1 1 5-13.516",
        key: "cxo92l"
      }
    ],
    [
      "path",
      {
        d: "M20 11.5v6",
        key: "2ei3xq"
      }
    ],
    [
      "path",
      {
        d: "M20 21.5h.01",
        key: "1r2dzp"
      }
    ]
  ]);
});
export {
  __tla,
  ClockAlert as default
};
