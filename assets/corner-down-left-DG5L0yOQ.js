import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CornerDownLeft;
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
  CornerDownLeft = createLucideIcon("CornerDownLeft", [
    [
      "polyline",
      {
        points: "9 10 4 15 9 20",
        key: "r3jprv"
      }
    ],
    [
      "path",
      {
        d: "M20 4v7a4 4 0 0 1-4 4H4",
        key: "6o5b7l"
      }
    ]
  ]);
});
export {
  __tla,
  CornerDownLeft as default
};
