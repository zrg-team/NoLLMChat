import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BluetoothConnected;
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
  BluetoothConnected = createLucideIcon("BluetoothConnected", [
    [
      "path",
      {
        d: "m7 7 10 10-5 5V2l5 5L7 17",
        key: "1q5490"
      }
    ],
    [
      "line",
      {
        x1: "18",
        x2: "21",
        y1: "12",
        y2: "12",
        key: "1rsjjs"
      }
    ],
    [
      "line",
      {
        x1: "3",
        x2: "6",
        y1: "12",
        y2: "12",
        key: "11yl8c"
      }
    ]
  ]);
});
export {
  __tla,
  BluetoothConnected as default
};
