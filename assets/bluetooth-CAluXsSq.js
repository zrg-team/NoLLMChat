import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Bluetooth;
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
  Bluetooth = createLucideIcon("Bluetooth", [
    [
      "path",
      {
        d: "m7 7 10 10-5 5V2l5 5L7 17",
        key: "1q5490"
      }
    ]
  ]);
});
export {
  __tla,
  Bluetooth as default
};
