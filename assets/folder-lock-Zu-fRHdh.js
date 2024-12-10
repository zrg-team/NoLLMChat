import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FolderLock;
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
  FolderLock = createLucideIcon("FolderLock", [
    [
      "rect",
      {
        width: "8",
        height: "5",
        x: "14",
        y: "17",
        rx: "1",
        key: "19aais"
      }
    ],
    [
      "path",
      {
        d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
        key: "1w6v7t"
      }
    ],
    [
      "path",
      {
        d: "M20 17v-2a2 2 0 1 0-4 0v2",
        key: "pwaxnr"
      }
    ]
  ]);
});
export {
  __tla,
  FolderLock as default
};
