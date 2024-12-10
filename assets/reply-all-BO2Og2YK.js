import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ReplyAll;
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
  ReplyAll = createLucideIcon("ReplyAll", [
    [
      "polyline",
      {
        points: "7 17 2 12 7 7",
        key: "t83bqg"
      }
    ],
    [
      "polyline",
      {
        points: "12 17 7 12 12 7",
        key: "1g4ajm"
      }
    ],
    [
      "path",
      {
        d: "M22 18v-2a4 4 0 0 0-4-4H7",
        key: "1fcyog"
      }
    ]
  ]);
});
export {
  __tla,
  ReplyAll as default
};
