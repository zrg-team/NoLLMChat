import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Computer;
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
  Computer = createLucideIcon("Computer", [
    [
      "rect",
      {
        width: "14",
        height: "8",
        x: "5",
        y: "2",
        rx: "2",
        key: "wc9tft"
      }
    ],
    [
      "rect",
      {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2",
        key: "w68u3i"
      }
    ],
    [
      "path",
      {
        d: "M6 18h2",
        key: "rwmk9e"
      }
    ],
    [
      "path",
      {
        d: "M12 18h6",
        key: "aqd8w3"
      }
    ]
  ]);
});
export {
  __tla,
  Computer as default
};
