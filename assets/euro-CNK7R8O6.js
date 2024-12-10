import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Euro;
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
  Euro = createLucideIcon("Euro", [
    [
      "path",
      {
        d: "M4 10h12",
        key: "1y6xl8"
      }
    ],
    [
      "path",
      {
        d: "M4 14h9",
        key: "1loblj"
      }
    ],
    [
      "path",
      {
        d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
        key: "1j6lzo"
      }
    ]
  ]);
});
export {
  __tla,
  Euro as default
};
