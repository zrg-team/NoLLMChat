import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CornerUpLeft;
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
  CornerUpLeft = createLucideIcon("CornerUpLeft", [
    [
      "polyline",
      {
        points: "9 14 4 9 9 4",
        key: "881910"
      }
    ],
    [
      "path",
      {
        d: "M20 20v-7a4 4 0 0 0-4-4H4",
        key: "1nkjon"
      }
    ]
  ]);
});
export {
  __tla,
  CornerUpLeft as default
};
