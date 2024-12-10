import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Blocks;
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
  Blocks = createLucideIcon("Blocks", [
    [
      "rect",
      {
        width: "7",
        height: "7",
        x: "14",
        y: "3",
        rx: "1",
        key: "6d4xhi"
      }
    ],
    [
      "path",
      {
        d: "M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3",
        key: "1fpvtg"
      }
    ]
  ]);
});
export {
  __tla,
  Blocks as default
};
