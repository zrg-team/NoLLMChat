import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Pause;
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
  Pause = createLucideIcon("Pause", [
    [
      "rect",
      {
        x: "14",
        y: "4",
        width: "4",
        height: "16",
        rx: "1",
        key: "zuxfzm"
      }
    ],
    [
      "rect",
      {
        x: "6",
        y: "4",
        width: "4",
        height: "16",
        rx: "1",
        key: "1okwgv"
      }
    ]
  ]);
});
export {
  __tla,
  Pause as default
};
