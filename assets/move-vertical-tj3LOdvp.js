import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MoveVertical;
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
  MoveVertical = createLucideIcon("MoveVertical", [
    [
      "path",
      {
        d: "M12 2v20",
        key: "t6zp3m"
      }
    ],
    [
      "path",
      {
        d: "m8 18 4 4 4-4",
        key: "bh5tu3"
      }
    ],
    [
      "path",
      {
        d: "m8 6 4-4 4 4",
        key: "ybng9g"
      }
    ]
  ]);
});
export {
  __tla,
  MoveVertical as default
};
