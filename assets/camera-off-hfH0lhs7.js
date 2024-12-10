import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let CameraOff;
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
  CameraOff = createLucideIcon("CameraOff", [
    [
      "line",
      {
        x1: "2",
        x2: "22",
        y1: "2",
        y2: "22",
        key: "a6p6uj"
      }
    ],
    [
      "path",
      {
        d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16",
        key: "qmtpty"
      }
    ],
    [
      "path",
      {
        d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5",
        key: "1ufyfc"
      }
    ],
    [
      "path",
      {
        d: "M14.121 15.121A3 3 0 1 1 9.88 10.88",
        key: "11zox6"
      }
    ]
  ]);
});
export {
  __tla,
  CameraOff as default
};
