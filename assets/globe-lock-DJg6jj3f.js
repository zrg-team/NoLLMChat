import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let GlobeLock;
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
  GlobeLock = createLucideIcon("GlobeLock", [
    [
      "path",
      {
        d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
        key: "qkt0x6"
      }
    ],
    [
      "path",
      {
        d: "M2 12h8.5",
        key: "ovaggd"
      }
    ],
    [
      "path",
      {
        d: "M20 6V4a2 2 0 1 0-4 0v2",
        key: "1of5e8"
      }
    ],
    [
      "rect",
      {
        width: "8",
        height: "5",
        x: "14",
        y: "6",
        rx: "1",
        key: "1fmf51"
      }
    ]
  ]);
});
export {
  __tla,
  GlobeLock as default
};
