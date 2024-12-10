import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareStack;
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
  SquareStack = createLucideIcon("SquareStack", [
    [
      "path",
      {
        d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",
        key: "4i38lg"
      }
    ],
    [
      "path",
      {
        d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",
        key: "mlte4a"
      }
    ],
    [
      "rect",
      {
        width: "8",
        height: "8",
        x: "14",
        y: "14",
        rx: "2",
        key: "1fa9i4"
      }
    ]
  ]);
});
export {
  __tla,
  SquareStack as default
};
