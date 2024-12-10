import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Axis3d;
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
  Axis3d = createLucideIcon("Axis3d", [
    [
      "path",
      {
        d: "M4 4v16h16",
        key: "1s015l"
      }
    ],
    [
      "path",
      {
        d: "m4 20 7-7",
        key: "17qe9y"
      }
    ]
  ]);
});
export {
  __tla,
  Axis3d as default
};
