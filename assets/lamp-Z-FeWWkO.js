import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Lamp;
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
  Lamp = createLucideIcon("Lamp", [
    [
      "path",
      {
        d: "M8 2h8l4 10H4L8 2Z",
        key: "9dma5w"
      }
    ],
    [
      "path",
      {
        d: "M12 12v6",
        key: "3ahymv"
      }
    ],
    [
      "path",
      {
        d: "M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z",
        key: "mwf4oh"
      }
    ]
  ]);
});
export {
  __tla,
  Lamp as default
};
