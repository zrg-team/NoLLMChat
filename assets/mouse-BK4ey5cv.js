import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Mouse;
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
  Mouse = createLucideIcon("Mouse", [
    [
      "rect",
      {
        x: "5",
        y: "2",
        width: "14",
        height: "20",
        rx: "7",
        key: "11ol66"
      }
    ],
    [
      "path",
      {
        d: "M12 6v4",
        key: "16clxf"
      }
    ]
  ]);
});
export {
  __tla,
  Mouse as default
};
