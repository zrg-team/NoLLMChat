import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Torus;
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
  Torus = createLucideIcon("Torus", [
    [
      "ellipse",
      {
        cx: "12",
        cy: "11",
        rx: "3",
        ry: "2",
        key: "1b2qxu"
      }
    ],
    [
      "ellipse",
      {
        cx: "12",
        cy: "12.5",
        rx: "10",
        ry: "8.5",
        key: "h8emeu"
      }
    ]
  ]);
});
export {
  __tla,
  Torus as default
};
