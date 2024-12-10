import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CircuitBoard;
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
  CircuitBoard = createLucideIcon("CircuitBoard", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "path",
      {
        d: "M11 9h4a2 2 0 0 0 2-2V3",
        key: "1ve2rv"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "9",
        r: "2",
        key: "af1f0g"
      }
    ],
    [
      "path",
      {
        d: "M7 21v-4a2 2 0 0 1 2-2h4",
        key: "1fwkro"
      }
    ],
    [
      "circle",
      {
        cx: "15",
        cy: "15",
        r: "2",
        key: "3i40o0"
      }
    ]
  ]);
});
export {
  __tla,
  CircuitBoard as default
};
