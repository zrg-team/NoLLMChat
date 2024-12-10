import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let LockOpen;
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
  LockOpen = createLucideIcon("LockOpen", [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1"
      }
    ],
    [
      "path",
      {
        d: "M7 11V7a5 5 0 0 1 9.9-1",
        key: "1mm8w8"
      }
    ]
  ]);
});
export {
  __tla,
  LockOpen as default
};
