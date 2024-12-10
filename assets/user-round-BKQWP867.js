import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let UserRound;
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
  UserRound = createLucideIcon("UserRound", [
    [
      "circle",
      {
        cx: "12",
        cy: "8",
        r: "5",
        key: "1hypcn"
      }
    ],
    [
      "path",
      {
        d: "M20 21a8 8 0 0 0-16 0",
        key: "rfgkzh"
      }
    ]
  ]);
});
export {
  __tla,
  UserRound as default
};
