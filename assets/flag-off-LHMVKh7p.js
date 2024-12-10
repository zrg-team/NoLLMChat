import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let FlagOff;
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
  FlagOff = createLucideIcon("FlagOff", [
    [
      "path",
      {
        d: "M8 2c3 0 5 2 8 2s4-1 4-1v11",
        key: "9rwyz9"
      }
    ],
    [
      "path",
      {
        d: "M4 22V4",
        key: "1plyxx"
      }
    ],
    [
      "path",
      {
        d: "M4 15s1-1 4-1 5 2 8 2",
        key: "1myooe"
      }
    ],
    [
      "line",
      {
        x1: "2",
        x2: "22",
        y1: "2",
        y2: "22",
        key: "a6p6uj"
      }
    ]
  ]);
});
export {
  __tla,
  FlagOff as default
};
