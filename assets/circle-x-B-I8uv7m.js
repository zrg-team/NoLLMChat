import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleX;
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
  CircleX = createLucideIcon("CircleX", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "m15 9-6 6",
        key: "1uzhvr"
      }
    ],
    [
      "path",
      {
        d: "m9 9 6 6",
        key: "z0biqf"
      }
    ]
  ]);
});
export {
  __tla,
  CircleX as default
};
