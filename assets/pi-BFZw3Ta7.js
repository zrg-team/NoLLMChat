import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Pi;
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
  Pi = createLucideIcon("Pi", [
    [
      "line",
      {
        x1: "9",
        x2: "9",
        y1: "4",
        y2: "20",
        key: "ovs5a5"
      }
    ],
    [
      "path",
      {
        d: "M4 7c0-1.7 1.3-3 3-3h13",
        key: "10pag4"
      }
    ],
    [
      "path",
      {
        d: "M18 20c-1.7 0-3-1.3-3-3V4",
        key: "1gaosr"
      }
    ]
  ]);
});
export {
  __tla,
  Pi as default
};
