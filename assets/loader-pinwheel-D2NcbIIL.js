import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let LoaderPinwheel;
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
  LoaderPinwheel = createLucideIcon("LoaderPinwheel", [
    [
      "path",
      {
        d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0",
        key: "1lzz15"
      }
    ],
    [
      "path",
      {
        d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6",
        key: "1gnrpi"
      }
    ],
    [
      "path",
      {
        d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6",
        key: "u9yy5q"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ]
  ]);
});
export {
  __tla,
  LoaderPinwheel as default
};
