import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Gamepad;
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
  Gamepad = createLucideIcon("Gamepad", [
    [
      "line",
      {
        x1: "6",
        x2: "10",
        y1: "12",
        y2: "12",
        key: "161bw2"
      }
    ],
    [
      "line",
      {
        x1: "8",
        x2: "8",
        y1: "10",
        y2: "14",
        key: "1i6ji0"
      }
    ],
    [
      "line",
      {
        x1: "15",
        x2: "15.01",
        y1: "13",
        y2: "13",
        key: "dqpgro"
      }
    ],
    [
      "line",
      {
        x1: "18",
        x2: "18.01",
        y1: "11",
        y2: "11",
        key: "meh2c"
      }
    ],
    [
      "rect",
      {
        width: "20",
        height: "12",
        x: "2",
        y: "6",
        rx: "2",
        key: "9lu3g6"
      }
    ]
  ]);
});
export {
  __tla,
  Gamepad as default
};
