import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let WifiHigh;
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
  WifiHigh = createLucideIcon("WifiHigh", [
    [
      "path",
      {
        d: "M12 20h.01",
        key: "zekei9"
      }
    ],
    [
      "path",
      {
        d: "M5 12.859a10 10 0 0 1 14 0",
        key: "1x1e6c"
      }
    ],
    [
      "path",
      {
        d: "M8.5 16.429a5 5 0 0 1 7 0",
        key: "1bycff"
      }
    ]
  ]);
});
export {
  __tla,
  WifiHigh as default
};
