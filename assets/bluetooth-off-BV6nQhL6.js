import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BluetoothOff;
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
  BluetoothOff = createLucideIcon("BluetoothOff", [
    [
      "path",
      {
        d: "m17 17-5 5V12l-5 5",
        key: "v5aci6"
      }
    ],
    [
      "path",
      {
        d: "m2 2 20 20",
        key: "1ooewy"
      }
    ],
    [
      "path",
      {
        d: "M14.5 9.5 17 7l-5-5v4.5",
        key: "1kddfz"
      }
    ]
  ]);
});
export {
  __tla,
  BluetoothOff as default
};
