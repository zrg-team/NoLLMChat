import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FileLock;
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
  FileLock = createLucideIcon("FileLock", [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7"
      }
    ],
    [
      "rect",
      {
        width: "8",
        height: "6",
        x: "8",
        y: "12",
        rx: "1",
        key: "3yr8at"
      }
    ],
    [
      "path",
      {
        d: "M10 12v-2a2 2 0 1 1 4 0v2",
        key: "j4i8d"
      }
    ]
  ]);
});
export {
  __tla,
  FileLock as default
};
