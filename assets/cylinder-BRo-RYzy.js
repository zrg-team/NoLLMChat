import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Cylinder;
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
  Cylinder = createLucideIcon("Cylinder", [
    [
      "ellipse",
      {
        cx: "12",
        cy: "5",
        rx: "9",
        ry: "3",
        key: "msslwz"
      }
    ],
    [
      "path",
      {
        d: "M3 5v14a9 3 0 0 0 18 0V5",
        key: "aqi0yr"
      }
    ]
  ]);
});
export {
  __tla,
  Cylinder as default
};
