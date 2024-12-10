import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let AppWindow;
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
  AppWindow = createLucideIcon("AppWindow", [
    [
      "rect",
      {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "2",
        key: "izxlao"
      }
    ],
    [
      "path",
      {
        d: "M10 4v4",
        key: "pp8u80"
      }
    ],
    [
      "path",
      {
        d: "M2 8h20",
        key: "d11cs7"
      }
    ],
    [
      "path",
      {
        d: "M6 4v4",
        key: "1svtjw"
      }
    ]
  ]);
});
export {
  __tla,
  AppWindow as default
};
