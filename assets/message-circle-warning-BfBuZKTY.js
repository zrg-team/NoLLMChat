import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MessageCircleWarning;
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
  MessageCircleWarning = createLucideIcon("MessageCircleWarning", [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd"
      }
    ],
    [
      "path",
      {
        d: "M12 8v4",
        key: "1got3b"
      }
    ],
    [
      "path",
      {
        d: "M12 16h.01",
        key: "1drbdi"
      }
    ]
  ]);
});
export {
  __tla,
  MessageCircleWarning as default
};
