import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let PersonStanding;
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
  PersonStanding = createLucideIcon("PersonStanding", [
    [
      "circle",
      {
        cx: "12",
        cy: "5",
        r: "1",
        key: "gxeob9"
      }
    ],
    [
      "path",
      {
        d: "m9 20 3-6 3 6",
        key: "se2kox"
      }
    ],
    [
      "path",
      {
        d: "m6 8 6 2 6-2",
        key: "4o3us4"
      }
    ],
    [
      "path",
      {
        d: "M12 10v4",
        key: "1kjpxc"
      }
    ]
  ]);
});
export {
  __tla,
  PersonStanding as default
};
