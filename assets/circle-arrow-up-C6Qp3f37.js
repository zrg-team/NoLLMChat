import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircleArrowUp;
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
  CircleArrowUp = createLucideIcon("CircleArrowUp", [
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
        d: "m16 12-4-4-4 4",
        key: "177agl"
      }
    ],
    [
      "path",
      {
        d: "M12 16V8",
        key: "1sbj14"
      }
    ]
  ]);
});
export {
  __tla,
  CircleArrowUp as default
};
