import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let DoorClosed;
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
  DoorClosed = createLucideIcon("DoorClosed", [
    [
      "path",
      {
        d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14",
        key: "36qu9e"
      }
    ],
    [
      "path",
      {
        d: "M2 20h20",
        key: "owomy5"
      }
    ],
    [
      "path",
      {
        d: "M14 12v.01",
        key: "xfcn54"
      }
    ]
  ]);
});
export {
  __tla,
  DoorClosed as default
};
