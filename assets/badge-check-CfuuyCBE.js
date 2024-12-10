import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BadgeCheck;
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
  BadgeCheck = createLucideIcon("BadgeCheck", [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        key: "3c2336"
      }
    ],
    [
      "path",
      {
        d: "m9 12 2 2 4-4",
        key: "dzmm74"
      }
    ]
  ]);
});
export {
  __tla,
  BadgeCheck as default
};
