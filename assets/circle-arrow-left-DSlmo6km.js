import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleArrowLeft;
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
  CircleArrowLeft = createLucideIcon("CircleArrowLeft", [
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
        d: "M16 12H8",
        key: "1fr5h0"
      }
    ],
    [
      "path",
      {
        d: "m12 8-4 4 4 4",
        key: "15vm53"
      }
    ]
  ]);
});
export {
  __tla,
  CircleArrowLeft as default
};
