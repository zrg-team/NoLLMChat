import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let LockKeyhole;
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
  LockKeyhole = createLucideIcon("LockKeyhole", [
    [
      "circle",
      {
        cx: "12",
        cy: "16",
        r: "1",
        key: "1au0dj"
      }
    ],
    [
      "rect",
      {
        x: "3",
        y: "10",
        width: "18",
        height: "12",
        rx: "2",
        key: "6s8ecr"
      }
    ],
    [
      "path",
      {
        d: "M7 10V7a5 5 0 0 1 10 0v3",
        key: "1pqi11"
      }
    ]
  ]);
});
export {
  __tla,
  LockKeyhole as default
};
