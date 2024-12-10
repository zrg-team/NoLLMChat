import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let UserCheck;
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
  UserCheck = createLucideIcon("UserCheck", [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
      }
    ],
    [
      "polyline",
      {
        points: "16 11 18 13 22 9",
        key: "1pwet4"
      }
    ]
  ]);
});
export {
  __tla,
  UserCheck as default
};
