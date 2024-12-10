import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Fullscreen;
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
  Fullscreen = createLucideIcon("Fullscreen", [
    [
      "path",
      {
        d: "M3 7V5a2 2 0 0 1 2-2h2",
        key: "aa7l1z"
      }
    ],
    [
      "path",
      {
        d: "M17 3h2a2 2 0 0 1 2 2v2",
        key: "4qcy5o"
      }
    ],
    [
      "path",
      {
        d: "M21 17v2a2 2 0 0 1-2 2h-2",
        key: "6vwrx8"
      }
    ],
    [
      "path",
      {
        d: "M7 21H5a2 2 0 0 1-2-2v-2",
        key: "ioqczr"
      }
    ],
    [
      "rect",
      {
        width: "10",
        height: "8",
        x: "7",
        y: "8",
        rx: "1",
        key: "vys8me"
      }
    ]
  ]);
});
export {
  __tla,
  Fullscreen as default
};
