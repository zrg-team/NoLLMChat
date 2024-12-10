import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Bike;
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
  Bike = createLucideIcon("Bike", [
    [
      "circle",
      {
        cx: "18.5",
        cy: "17.5",
        r: "3.5",
        key: "15x4ox"
      }
    ],
    [
      "circle",
      {
        cx: "5.5",
        cy: "17.5",
        r: "3.5",
        key: "1noe27"
      }
    ],
    [
      "circle",
      {
        cx: "15",
        cy: "5",
        r: "1",
        key: "19l28e"
      }
    ],
    [
      "path",
      {
        d: "M12 17.5V14l-3-3 4-3 2 3h2",
        key: "1npguv"
      }
    ]
  ]);
});
export {
  __tla,
  Bike as default
};
