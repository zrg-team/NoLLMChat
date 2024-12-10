import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Webcam;
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
  Webcam = createLucideIcon("Webcam", [
    [
      "circle",
      {
        cx: "12",
        cy: "10",
        r: "8",
        key: "1gshiw"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "10",
        r: "3",
        key: "ilqhr7"
      }
    ],
    [
      "path",
      {
        d: "M7 22h10",
        key: "10w4w3"
      }
    ],
    [
      "path",
      {
        d: "M12 22v-4",
        key: "1utk9m"
      }
    ]
  ]);
});
export {
  __tla,
  Webcam as default
};
