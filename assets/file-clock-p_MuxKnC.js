import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FileClock;
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
  FileClock = createLucideIcon("FileClock", [
    [
      "path",
      {
        d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
        key: "37hlfg"
      }
    ],
    [
      "path",
      {
        d: "M14 2v4a2 2 0 0 0 2 2h4",
        key: "tnqrlb"
      }
    ],
    [
      "circle",
      {
        cx: "8",
        cy: "16",
        r: "6",
        key: "10v15b"
      }
    ],
    [
      "path",
      {
        d: "M9.5 17.5 8 16.25V14",
        key: "1o80t2"
      }
    ]
  ]);
});
export {
  __tla,
  FileClock as default
};
