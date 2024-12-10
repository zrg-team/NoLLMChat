import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Joystick;
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
  Joystick = createLucideIcon("Joystick", [
    [
      "path",
      {
        d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
        key: "jg2n2t"
      }
    ],
    [
      "path",
      {
        d: "M6 15v-2",
        key: "gd6mvg"
      }
    ],
    [
      "path",
      {
        d: "M12 15V9",
        key: "8c7uyn"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "6",
        r: "3",
        key: "1gm2ql"
      }
    ]
  ]);
});
export {
  __tla,
  Joystick as default
};
